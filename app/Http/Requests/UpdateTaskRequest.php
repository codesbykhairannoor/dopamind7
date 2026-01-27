<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest // ✅ Perhatikan nama class ini beda
{
    public function authorize(): bool 
    { 
        return true; 
    }

    public function rules(): array
    {
        return [
            // Gunakan 'sometimes' karena user mungkin cuma mau edit judul doang,
            // tanpa ngirim jam atau tipe lagi.
            'title' => 'sometimes|string|max:150',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i', 
            'type' => 'sometimes|integer|in:1,2,3',
            'notes' => 'nullable|string',
        ];
    }
}