<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChainSyncLog extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "chain_link_id",
        "chain_rule_id",
        "event_name",
        "status",
        "message",
        "context",
    ];

    protected $casts = [
        "context" => "array",
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function link(): BelongsTo
    {
        return $this->belongsTo(ChainLink::class, "chain_link_id");
    }

    public function rule(): BelongsTo
    {
        return $this->belongsTo(ChainRule::class, "chain_rule_id");
    }
}
