<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
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
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
            'image_id' => ['nullable', 'exists:media_files,id'],
            'cover_id' => ['nullable', 'exists:media_files,id'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string'],
            'cta_label' => ['sometimes', 'required', 'string', 'max:255'],
            'cta_link' => ['sometimes', 'required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'status' => ['sometimes', 'required', 'string', 'in:draft,published'],
        ];
    }
}
