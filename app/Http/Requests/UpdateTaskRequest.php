<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool 
    { 
        // Ambil data task dari URL route parameter
        $task = $this->route('plannerTask');
        
        // Pengecekan otomatis! Pastikan task ini milik user yang sedang login
        return $task && $task->user_id === $this->user()->id; 
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:150',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i', 
            'type' => 'sometimes|integer|in:1,2,3',
            'notes' => 'nullable|string',
        ];
    }
}