<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePageRequest extends FormRequest
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
        $pageId = $this->route('page')?->id ?? $this->route('id');
        
        return [
            'slug' => ['sometimes', 'required', 'string', 'max:255', 'unique:pages,slug,' . $pageId],
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'blocks' => ['sometimes', 'required', 'array'],
            'seo' => ['nullable', 'array'],
            'status' => ['sometimes', 'required', 'string', 'in:draft,published'],
        ];
    }
}
