<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadJournalImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048', // Tambahan limit max 2MB biar aman
            'id'    => 'nullable|exists:journals,id'
        ];
    }
}