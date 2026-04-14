<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndexChainTimelineRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "entity_type" => ["required", "string", "in:habit,goal,planner_task,finance_transaction,journal,job,calendar_event"],
            "entity_id" => ["required", "integer", "min:1"],
            "limit" => ["nullable", "integer", "min:1", "max:100"],
        ];
    }
}
