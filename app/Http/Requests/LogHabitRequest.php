<?php

namespace App\Http\Requests;

use App\Enums\HabitStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LogHabitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Logika authorize user sudah ada di Controller/Policy
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'date' => ['required', 'date', 'date_format:Y-m-d'],
            // Pastikan status sesuai dengan Enum HabitStatus
            'status' => ['required', Rule::enum(HabitStatus::class)], 
        ];
    }
}