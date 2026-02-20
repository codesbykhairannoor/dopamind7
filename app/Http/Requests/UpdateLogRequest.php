<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLogRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'notes' => 'nullable|string',
            'meals' => 'nullable|array', // Pastikan meals dikirim sebagai array/json object
            'meals.breakfast' => 'nullable|string',
            'meals.lunch' => 'nullable|string',
            'meals.dinner' => 'nullable|string',
            'water' => 'nullable|integer|min:0|max:8',
            'task_box' => 'nullable|array',
        ];
    }
}