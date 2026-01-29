<?php

namespace App\Http\Requests\Finance;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Cek: Apakah ini request update? (Ada parameter 'financeTransaction' di route?)
        $transaction = $this->route('financeTransaction');

        if ($transaction) {
            // Kalau update, pastikan punya user yang login
            return $transaction->user_id === $this->user()->id;
        }

        // Kalau create, return true aja (udah dijaga middleware auth)
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title'    => ['required', 'string', 'max:255'],
            'amount'   => ['required', 'numeric', 'min:1'],
            'type'     => ['required', 'in:income,expense'],
            'category' => ['required', 'string'],
            'date'     => ['required', 'date'],
            'notes'    => ['nullable', 'string'],
        ];
    }
}