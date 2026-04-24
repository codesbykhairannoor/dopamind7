<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Tentukan apakah user diizinkan melakukan request ini.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Aturan validasi.
     */
    public function rules(): array
    {
        $timezone = auth()->user()->timezone ?? 'Asia/Jakarta';
        $today = now()->timezone($timezone)->format('Y-m-d');
        $maxDate = now()->timezone($timezone)->addDays(10)->format('Y-m-d');

        return [
            // 🔥 LIMIT: Rentang 10 hari ke depan saja
            'date'       => ['required', 'date', 'after_or_equal:' . $today, 'before_or_equal:' . $maxDate], 
            
            // Task Content
            'title'      => ['required', 'string', 'max:150'], 
            'type'       => ['required', 'integer', 'in:1,2,3'],
            'start_time' => ['nullable', 'date_format:H:i'],
            'end_time'   => ['nullable', 'date_format:H:i', 'after:start_time'],
            'notes'      => ['nullable', 'string'],
        ];
    }
}