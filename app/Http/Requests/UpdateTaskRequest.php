<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool 
    { 
        $task = $this->route('plannerTask');
        return $task && $task->user_id === $this->user()->id; 
    }

    public function rules(): array
    {
        $timezone = auth()->user()->timezone ?? 'Asia/Jakarta';
        $today = now()->timezone($timezone)->format('Y-m-d');
        $maxDate = now()->timezone($timezone)->addDays(10)->format('Y-m-d');

        return [
            'date'       => ['sometimes', 'date', 'after_or_equal:' . $today, 'before_or_equal:' . $maxDate], 
            'title'      => 'sometimes|string|max:150',
            'start_time' => 'nullable|date_format:H:i',
            'end_time'   => 'nullable|date_format:H:i', 
            'type'       => 'sometimes|integer|in:1,2,3',
            'notes'      => 'nullable|string',
        ];
    }
}