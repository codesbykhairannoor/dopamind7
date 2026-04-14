<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndexChainSuggestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "source_type" => ["required", "string", "in:habit,goal,planner_task,finance_transaction,journal,job,calendar_event"],
            "source_id" => ["required", "integer", "min:1"],
        ];
    }
}
