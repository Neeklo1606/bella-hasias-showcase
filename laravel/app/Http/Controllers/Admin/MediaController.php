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
                'max:5120', // 5MB max (5120 KB)
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
        
        $path = $file->storeAs('media', $filename, 'public');
        
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
            'size' => $file->getSize(),
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
}
