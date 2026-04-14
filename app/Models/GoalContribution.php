<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoalContribution extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "goal_id",
        "chain_rule_id",
        "source_type",
        "source_id",
        "event_ref",
        "value_delta",
    ];
}
