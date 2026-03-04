<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'company' => ['sometimes', 'required', 'string', 'max:255'],
            'status' => ['sometimes', 'required', 'in:wishlist,applied,interview,offer,rejected,accepted'],
            'salary' => ['nullable', 'numeric', 'min:0'],
            'notes' => ['nullable', 'string'],
            'applied_date' => ['nullable', 'date'],
            'location' => ['nullable', 'string', 'max:255'],
            'job_url' => ['nullable', 'url', 'max:500'],
        ];
    }
}
