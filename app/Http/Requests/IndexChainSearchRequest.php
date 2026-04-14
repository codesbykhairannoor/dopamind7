<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndexChainSearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "q" => ["nullable", "string", "max:120"],
            "types" => ["nullable", "array"],
            "types.*" => ["string", "in:habit,goal,planner_task,finance_transaction,finance_category,finance_saving,journal,job,calendar_event"],
        ];
    }
}
