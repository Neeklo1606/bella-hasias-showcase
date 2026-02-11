<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
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
            'description' => $this->description,
            'category' => $this->category,
            'image' => $this->whenLoaded('image', fn() => [
                'id' => $this->image->id,
                'url' => $this->image->url,
                'alt' => $this->image->alt,
            ]),
            'cover' => $this->whenLoaded('cover', fn() => [
                'id' => $this->cover->id,
                'url' => $this->cover->url,
                'alt' => $this->cover->alt,
            ]),
            'tags' => $this->tags ?? [],
            'ctaLabel' => $this->cta_label,
            'ctaLink' => $this->cta_link,
            'sortOrder' => $this->sort_order,
            'status' => $this->status,
            'updatedAt' => $this->updated_at?->toISOString(),
            'createdAt' => $this->created_at?->toISOString(),
        ];
    }
}
