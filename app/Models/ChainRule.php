<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChainRule extends Model
{
    use HasFactory;

    protected $fillable = [
        "chain_link_id",
        "trigger_event",
        "action_type",
        "conditions",
        "action_payload",
        "position",
        "is_active",
    ];

    protected $casts = [
        "conditions" => "array",
        "action_payload" => "array",
        "is_active" => "boolean",
    ];

    public function link(): BelongsTo
    {
        return $this->belongsTo(ChainLink::class, "chain_link_id");
    }
}
