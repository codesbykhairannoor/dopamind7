<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndexChainLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "source_type" => ["nullable", "string", "in:habit,goal,planner_task,finance_transaction,journal,job,calendar_event"],
            "source_id" => ["nullable", "integer", "min:1"],
            "target_type" => ["nullable", "string", "in:habit,goal,planner_task,finance_transaction,journal,job,calendar_event"],
            "target_id" => ["nullable", "integer", "min:1"],
        ];
    }
}
