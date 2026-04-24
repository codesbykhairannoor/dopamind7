<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLogRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $timezone = auth()->user()->timezone ?? 'Asia/Jakarta';
        $today = now()->timezone($timezone)->format('Y-m-d');
        $maxDate = now()->timezone($timezone)->addDays(10)->format('Y-m-d');

        return [
            'date'            => ['required', 'date', 'after_or_equal:' . $today, 'before_or_equal:' . $maxDate],
            'notes'           => 'nullable|string',
            'meals'           => 'nullable|array', 
            'meals.breakfast' => 'nullable|string',
            'meals.lunch'     => 'nullable|string',
            'meals.dinner'    => 'nullable|string',
            'water'           => 'nullable|integer|min:0|max:8',
            'task_box'        => 'nullable|array',
        ];
    }
}