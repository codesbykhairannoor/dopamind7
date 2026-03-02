<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class IndexHabitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'month' => 'nullable|date_format:Y-m',
        ];
    }

    /**
     * Helper kustom untuk mengolah data bulan dengan timezone pengguna
     */
    public function getMonthData(string $timezone): array
    {
        $monthInput = $this->validated('month') ?: now()->timezone($timezone)->format('Y-m');

        try {
            $dateObj = Carbon::parse($monthInput . '-01')->timezone($timezone);
        } catch (\Exception $e) {
            $dateObj = now()->timezone($timezone)->startOfMonth();
            $monthInput = $dateObj->format('Y-m');
        }

        return [
            'query' => $monthInput,
            'start' => $dateObj->copy()->startOfMonth()->format('Y-m-d'),
            'end' => $dateObj->copy()->endOfMonth()->format('Y-m-d'),
            'prev' => $dateObj->copy()->subMonth()->format('Y-m'),
            'translated' => $dateObj->translatedFormat('F Y'),
        ];
    }
}