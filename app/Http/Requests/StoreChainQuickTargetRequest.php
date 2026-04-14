<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreChainQuickTargetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "source_type" => ["nullable", "string", "in:habit,goal,planner_task,finance_transaction,journal,job,calendar_event"],
            "source_id" => ["nullable", "integer", "min:0"],
            "target_type" => ["required", "string", "in:goal,planner_task,journal"],
            "target_title" => ["required", "string", "max:255"],
            "target_payload" => ["nullable", "array"],
            "relation_type" => ["nullable", "string", "max:100"],
            "rule" => ["nullable", "array"],
            "rule.trigger_event" => ["required_with:rule", "string", "max:100"],
            "rule.action_type" => ["required_with:rule", "string", "max:100"],
            "rule.conditions" => ["nullable", "array"],
            "rule.action_payload" => ["nullable", "array"],
            "rule.is_active" => ["nullable", "boolean"],
        ];
    }
}
