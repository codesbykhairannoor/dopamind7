<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ChainLink extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "source_type",
        "source_id",
        "target_type",
        "target_id",
        "relation_type",
        "is_active",
    ];

    protected $casts = [
        "is_active" => "boolean",
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function rules(): HasMany
    {
        return $this->hasMany(ChainRule::class)->orderBy("position");
    }

    public function scopeOfUser($query, int $userId)
    {
        return $query->where("user_id", $userId);
    }
}
