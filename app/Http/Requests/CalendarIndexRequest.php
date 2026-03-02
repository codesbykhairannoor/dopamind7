<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalendarIndexRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'month' => 'nullable|date_format:Y-m', 
        ];
    }

    public function getValidMonth(?string $timezone = 'Asia/Jakarta'): string
    {
        return $this->validated('month') ?: now()->timezone($timezone)->format('Y-m');
    }
}