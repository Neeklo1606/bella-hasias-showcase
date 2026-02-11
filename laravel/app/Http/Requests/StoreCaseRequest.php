<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:cases,slug'],
            'description' => ['required', 'string'],
            'service_id' => ['nullable', 'exists:services,id'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string'],
            'media_ids' => ['nullable', 'array'],
            'media_ids.*' => ['exists:media_files,id'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'string', 'in:draft,published'],
        ];
    }
}
