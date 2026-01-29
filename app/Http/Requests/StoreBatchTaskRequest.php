<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBatchTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tasks'              => ['required', 'array', 'min:1'],
            'tasks.*.title'      => ['required', 'string', 'max:255'],
            'tasks.*.start_time' => ['required', 'date_format:H:i'],
            'tasks.*.end_time'   => ['required', 'date_format:H:i', 'after:tasks.*.start_time'],
            'tasks.*.type'       => ['required', 'integer', 'in:1,2,3'],
            'tasks.*.notes'      => ['nullable', 'string'],
        ];
    }
}