<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\MediaFileResource;
use App\Models\MediaFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\NotFoundHttpException;

class MediaController extends Controller
{
    /**
     * Get a single media file by ID (public)
     */
    public function show(int $id): JsonResponse
    {
        $media = MediaFile::find($id);
        
        if (!$media) {
            throw new NotFoundHttpException('Media file not found');
        }

        return (new MediaFileResource($media))->response();
    }
}
