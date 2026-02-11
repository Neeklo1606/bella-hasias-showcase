<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MediaFileResource;
use App\Models\MediaFile;
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
        $request->validate([
            'file' => ['required', 'file', 'max:10240'], // 10MB max
            'category' => ['nullable', 'string', 'max:255'],
            'alt' => ['nullable', 'string', 'max:255'],
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $filename = Str::slug(pathinfo($originalName, PATHINFO_FILENAME)) . '-' . time() . '.' . $extension;
        
        $path = $file->storeAs('media', $filename, 'public');
        
        $mediaFile = MediaFile::create([
            'filename' => $filename,
            'original_filename' => $originalName,
            'path' => $path,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'category' => $request->category ?? 'Прочее',
            'alt' => $request->alt ?? pathinfo($originalName, PATHINFO_FILENAME),
            'user_id' => $request->user()?->id,
        ]);

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

        $media->update($request->only(['category', 'alt']));

        return (new MediaFileResource($media))->response();
    }

    public function destroy(MediaFile $media): JsonResponse
    {
        // Delete file from storage
        if (Storage::disk('public')->exists($media->path)) {
            Storage::disk('public')->delete($media->path);
        }

        $media->delete();

        return response()->json(['message' => 'Media file deleted successfully']);
    }
}
