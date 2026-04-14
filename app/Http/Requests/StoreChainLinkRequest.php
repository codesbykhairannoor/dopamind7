<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreChainLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "source_type" => ["required", "string", "in:habit,goal,planner_task,finance_transaction,finance_saving,journal,job,calendar_event"],
            "source_id" => ["required", "integer", "min:0"],
            "target_type" => ["required", "string", "in:habit,goal,planner_task,finance_transaction,finance_saving,journal,job,calendar_event"],
            "target_id" => ["required", "integer", "min:0"],
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
