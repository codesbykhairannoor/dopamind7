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
        return [
            // 🔥 WAJIB: Pastikan tanggal dikirim dan formatnya benar
            'date'       => ['required', 'date'], 
            
            // Task Content
            'title'      => ['required', 'string', 'max:150'], // Sesuai limit di migration kamu
            'type'       => ['required', 'integer', 'in:1,2,3'],
            'start_time' => ['nullable', 'date_format:H:i'],
            'end_time'   => ['nullable', 'date_format:H:i', 'after:start_time'],
            'notes'      => ['nullable', 'string'],
        ];
    }
}