<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // HARUS TRUE
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // INI YANG BIKIN ERROR SEBELUMNYA KARENA KOSONG
            'title'      => 'required|string|max:255',
            'type'       => 'required|integer|in:1,2,3',
            'start_time' => 'nullable|date_format:H:i',
            'end_time'   => 'nullable|date_format:H:i',
            'notes'      => 'nullable|string',
        ];
    }
}