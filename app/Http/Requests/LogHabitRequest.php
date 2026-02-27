<?php

namespace App\Http\Requests;

use App\Enums\HabitStatus;
use Illuminate\Foundation\Http\FormRequest;

class LogHabitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => ['required', 'date', 'date_format:Y-m-d'],
            // Bikin custom rule: Boleh string 'uncheck' ATAU harus sesuai isi Enum
            'status' => [
                'required', 
                function ($attribute, $value, $fail) {
                    if ($value !== 'uncheck' && !HabitStatus::tryFrom($value)) {
                        $fail("Status habit tidak valid.");
                    }
                }
            ], 
        ];
    }
}