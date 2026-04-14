<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChainEffect extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "chain_link_id",
        "chain_rule_id",
        "idempotency_key",
        "event_ref",
        "effect_type",
        "target_type",
        "target_id",
        "effect_delta",
        "effect_payload",
        "is_reverted",
    ];

    protected $casts = [
        "effect_payload" => "array",
        "is_reverted" => "boolean",
    ];
}
