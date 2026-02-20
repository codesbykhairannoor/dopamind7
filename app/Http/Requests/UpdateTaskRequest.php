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
        return [
            'date'       => 'sometimes|date', // 🔥 TAMBAHAN: Izinkan update tanggal
            'title'      => 'sometimes|string|max:150',
            'start_time' => 'nullable|date_format:H:i',
            'end_time'   => 'nullable|date_format:H:i', 
            'type'       => 'sometimes|integer|in:1,2,3',
            'notes'      => 'nullable|string',
        ];
    }
}