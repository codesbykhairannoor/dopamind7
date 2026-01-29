<?php

namespace App\Http\Requests\Finance;

use Illuminate\Foundation\Http\FormRequest;

class BudgetRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Cek: Apakah ini request update? (Ada parameter 'financeBudget' di route?)
        $budget = $this->route('financeBudget');

        if ($budget) {
            return $budget->user_id === $this->user()->id;
        }

        return true;
    }

    public function rules(): array
    {
        $rules = [
            'category'     => ['required', 'string'],
            'limit_amount' => ['required', 'numeric', 'min:1'],
        ];

        // KHUSUS CREATE (POST): Wajib ada bulan
        if ($this->isMethod('post')) {
            $rules['month'] = ['required', 'date_format:Y-m'];
        }

        return $rules;
    }
}