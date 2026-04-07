<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinanceSaving extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'target_amount',
        'current_amount',
        'icon',
        'color',
    ];

    protected $casts = [
        'target_amount' => 'decimal:2',
        'current_amount' => 'decimal:2',
    ];

    /**
     * 🔥 FIX: Handle Optimistic IDs (temp_...) from Frontend
     * Prevents PostgreSQL from throwing a "bigint" syntax error when it sees a string ID.
     */
    public function resolveRouteBinding($value, $field = null)
    {
        if (is_string($value) && str_starts_with($value, 'temp_')) {
            return new self();
        }

        return parent::resolveRouteBinding($value, $field);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
