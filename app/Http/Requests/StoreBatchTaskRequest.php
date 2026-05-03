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
        $timezone = auth()->user()->timezone ?? 'Asia/Jakarta';
        $minDate = now()->timezone($timezone)->subYear()->format('Y-m-d');
        $maxDate = now()->timezone($timezone)->addYear()->format('Y-m-d');

        return [
            'date'               => ['required', 'date', 'after_or_equal:' . $minDate, 'before_or_equal:' . $maxDate],

            // Array Tasks
            'tasks'              => ['required', 'array', 'min:1'],
            'tasks.*.title'      => ['required', 'string', 'max:150'],
            'tasks.*.start_time' => ['required', 'date_format:H:i'],
            'tasks.*.end_time'   => ['required', 'date_format:H:i', 'after:tasks.*.start_time'],
            'tasks.*.type'       => ['required', 'integer', 'in:1,2,3'],
            'tasks.*.notes'      => ['nullable', 'string'],
        ];
    }
}