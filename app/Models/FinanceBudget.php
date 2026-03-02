<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinanceBudget extends Model
{
    use HasFactory;

    // 🔥 FIX: Guarded ID saja
    protected $guarded = ['id'];

    protected $casts = [
        'limit_amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeOfUser($query, $userId) {
    return $query->where('user_id', $userId);
}

public function scopeForMonth($query, $month) {
    return $query->where('month', $month);
}
}