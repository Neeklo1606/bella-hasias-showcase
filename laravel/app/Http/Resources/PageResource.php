<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
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
            'slug' => $this->slug,
            'title' => $this->title,
            'blocks' => $this->blocks ?? [],
            'seo' => $this->seo,
            'status' => $this->status,
            'updatedAt' => $this->updated_at?->toISOString(),
        ];
    }
}
