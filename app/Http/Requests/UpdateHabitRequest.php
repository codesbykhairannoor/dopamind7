<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHabitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:100',
            'icon' => 'sometimes|string|max:10',
            'color' => 'sometimes|string|max:7',
            'monthly_target' => 'sometimes|integer|min:1|max:31',
            // Period biasanya tidak diedit, tapi kalau perlu bisa ditambahkan
        ];
    }
}