<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'service' => $this->whenLoaded('service', fn() => [
                'id' => $this->service->id,
                'title' => $this->service->title,
            ]),
            'serviceId' => $this->service_id,
            'media' => $this->whenLoaded('media', fn() => MediaFileResource::collection($this->media)),
            'mediaIds' => $this->when($this->relationLoaded('media'), fn() => $this->media->pluck('id')->toArray()),
            'tags' => $this->tags ?? [],
            'sortOrder' => $this->sort_order,
            'status' => $this->status,
            'createdAt' => $this->created_at?->toISOString(),
            'updatedAt' => $this->updated_at?->toISOString(),
        ];
    }
}
