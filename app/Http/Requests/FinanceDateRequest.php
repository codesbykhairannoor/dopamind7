<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FinanceDateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'date' => 'nullable|date_format:Y-m-d',
        ];
    }

    public function getValidDate(?string $timezone = 'Asia/Jakarta'): string
    {
        return $this->validated('date') ?: now()->timezone($timezone)->format('Y-m-d');
    }
}