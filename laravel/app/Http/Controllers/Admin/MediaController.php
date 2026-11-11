<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MediaFileResource;
use App\Models\MediaFile;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = MediaFile::query();

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Search
        if ($request->has('q')) {
            $q = $request->q;
            $query->where(function ($qry) use ($q) {
                $qry->where('filename', 'like', "%{$q}%")
                    ->orWhere('alt', 'like', "%{$q}%");
            });
        }

        // Sort
        $sort = $request->get('sort', '-created_at');
        if (str_starts_with($sort, '-')) {
            $query->orderBy(substr($sort, 1), 'desc');
        } else {
            $query->orderBy($sort, 'asc');
        }

        $perPage = $request->get('per_page', 30);
        $media = $query->paginate($perPage);

        return MediaFileResource::collection($media)->response();
    }

    public function upload(Request $request): JsonResponse
    {
        // Strict validation
        $request->validate([
            'file' => [
                'required',
                'file',
                'max:20480', // 20MB: фото с телефона; при сохранении сжимаются (optimizeImage)
                'mimes:jpeg,jpg,png,webp,pdf', // Only allowed MIME types
            ],
            'category' => ['nullable', 'string', 'max:255'],
            'alt' => ['nullable', 'string', 'max:255'],
        ]);

        $file = $request->file('file');
        
        // Additional security checks
        $allowedMimeTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
            'application/pdf',
        ];
        
        $mimeType = $file->getMimeType();
        if (!in_array($mimeType, $allowedMimeTypes, true)) {
            return response()->json([
                'message' => 'Invalid file type. Allowed: JPEG, PNG, WebP, PDF',
            ], 422);
        }

        // Check file extension (double check)
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];
        $extension = strtolower($file->getClientOriginalExtension());
        if (!in_array($extension, $allowedExtensions, true)) {
            return response()->json([
                'message' => 'Invalid file extension. Allowed: jpg, jpeg, png, webp, pdf',
            ], 422);
        }

        // Sanitize filename: remove dangerous characters, normalize
        $originalName = $file->getClientOriginalName();
        $safeBasename = Str::slug(pathinfo($originalName, PATHINFO_FILENAME));
        // Remove any remaining dangerous characters
        $safeBasename = preg_replace('/[^a-z0-9\-_]/i', '', $safeBasename);
        // Limit length
        $safeBasename = substr($safeBasename, 0, 100);
        
        // Generate unique filename: timestamp + random + safe basename + extension
        $filename = time() . '-' . Str::random(8) . '-' . $safeBasename . '.' . $extension;
        
        // Ensure filename is safe (no path traversal)
        $filename = basename($filename);
        
        // Фото уменьшаем до 2000px и сохраняем в WebP: сайт не тянет оригиналы по 5–10 МБ
        $optimized = $this->optimizeImage($file->getRealPath(), $mimeType);
        if ($optimized !== null) {
            $filename = preg_replace('/\.[a-z0-9]+$/i', '.webp', $filename);
            $path = 'media/'.$filename;
            Storage::disk('public')->put($path, $optimized);
            $mimeType = 'image/webp';
            $size = strlen($optimized);
        } else {
            $path = $file->storeAs('media', $filename, 'public');
            $size = $file->getSize();
        }
        
        // Verify file was stored correctly
        if (!$path) {
            return response()->json([
                'message' => 'Failed to store file',
            ], 500);
        }
        
        $mediaFile = MediaFile::create([
            'filename' => $filename,
            'original_filename' => $originalName,
            'path' => $path,
            'mime_type' => $mimeType,
            'size' => $size,
            'category' => $request->category ?? 'Прочее',
            'alt' => $request->alt ?? pathinfo($originalName, PATHINFO_FILENAME),
            'user_id' => $request->user()?->id,
        ]);
        
        // Log audit
        AuditService::logUpload($mediaFile, $request);

        return (new MediaFileResource($mediaFile))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, MediaFile $media): JsonResponse
    {
        $request->validate([
            'category' => ['sometimes', 'string', 'max:255'],
            'alt' => ['nullable', 'string', 'max:255'],
        ]);

        // Get original values before update
        $original = $media->getOriginal();
        $updateData = $request->only(['category', 'alt']);
        $media->update($updateData);
        
        // Get changed fields after update
        $media->refresh();
        $newAttributes = $media->getAttributes();
        $oldValues = [];
        $newValues = [];
        
        foreach ($updateData as $key => $value) {
            if (isset($original[$key]) && $original[$key] !== $newAttributes[$key]) {
                $oldValues[$key] = $original[$key];
                $newValues[$key] = $newAttributes[$key];
            }
        }
        
        // Log audit if there are changes
        if (!empty($newValues)) {
            AuditService::logUpdate($media, $newValues, $request, $oldValues);
        }

        return (new MediaFileResource($media))->response();
    }

    public function destroy(MediaFile $media, Request $request): JsonResponse
    {
        // Log audit before deletion
        AuditService::logDelete($media, $request);
        
        // Delete file from storage
        if (Storage::disk('public')->exists($media->path)) {
            Storage::disk('public')->delete($media->path);
        }

        $media->delete();

        return response()->json(['message' => 'Media file deleted successfully']);
    }

    /**
     * Уменьшить фото до 2000px по длинной стороне, повернуть по EXIF и сжать в WebP (q=82).
     * Возвращает байты WebP или null (не картинка / нет GD / ошибка) — тогда сохраняется оригинал.
     */
    private function optimizeImage(string $sourcePath, string $mimeType): ?string
    {
        if (!function_exists('imagewebp') || !in_array($mimeType, ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'], true)) {
            return null;
        }
        try {
            $img = match ($mimeType) {
                'image/png' => @imagecreatefrompng($sourcePath),
                'image/webp' => @imagecreatefromwebp($sourcePath),
                default => @imagecreatefromjpeg($sourcePath),
            };
            if (!$img) {
                return null;
            }
            if (in_array($mimeType, ['image/jpeg', 'image/jpg'], true) && function_exists('exif_read_data')) {
                $orientation = (int) (@exif_read_data($sourcePath)['Orientation'] ?? 1);
                $angle = [3 => 180, 6 => -90, 8 => 90][$orientation] ?? 0;
                if ($angle !== 0) {
                    $rotated = imagerotate($img, $angle, 0);
                    if ($rotated) {
                        imagedestroy($img);
                        $img = $rotated;
                    }
                }
            }
            $w = imagesx($img);
            $h = imagesy($img);
            $max = 2000;
            if (max($w, $h) > $max) {
                $scale = $max / max($w, $h);
                $resized = imagescale($img, (int) round($w * $scale), (int) round($h * $scale), IMG_BICUBIC);
                if ($resized) {
                    imagedestroy($img);
                    $img = $resized;
                }
            }
            imagepalettetotruecolor($img);
            imagealphablending($img, true);
            imagesavealpha($img, true);
            ob_start();
            imagewebp($img, null, 82);
            $data = ob_get_clean();
            imagedestroy($img);

            return $data !== false && $data !== '' ? $data : null;
        } catch (\Throwable $e) {
            report($e);

            return null;
        }
    }
}
