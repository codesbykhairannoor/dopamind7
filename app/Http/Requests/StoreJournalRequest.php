<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJournalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Asumsinya middleware auth sudah menangani ini di route
    }

    public function rules(): array
    {
        return [
            'title'   => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'mood'    => 'nullable|string|max:50',
        ];
    }
}