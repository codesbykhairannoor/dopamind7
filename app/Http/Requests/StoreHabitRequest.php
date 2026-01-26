<?php

namespace App\Http\Requests;

use App\Enums\HabitStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreHabitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // ⚠️ PENTING: Ubah ini jadi TRUE, kalau false nanti error 403
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // Ini aturan yang kita pindahin dari Controller
            'name' => 'required|string|max:100',
            'icon' => 'required|string|max:10',
            'color' => 'required|string|max:7',
            'monthly_target' => 'required|integer|min:1|max:31',
            'period' => 'required|string|max:7',
        ];
    }
}
