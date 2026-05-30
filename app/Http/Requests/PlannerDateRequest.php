<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlannerDateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => 'nullable|date_format:Y-m-d',
        ];
    }

    /**
     * Helper kustom untuk mendapatkan tanggal aman sesuai timezone
     */
    public function getValidDate(?string $timezone = 'Asia/Jakarta'): string
    {
        $date = $this->query('date') ?? $this->input('date');
        if ($date && preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            return $date;
        }
        return now()->timezone($timezone)->format('Y-m-d');
    }
}