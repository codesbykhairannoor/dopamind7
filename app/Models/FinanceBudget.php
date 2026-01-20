<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinanceBudget extends Model
{
    use HasFactory;

    /**
     * Kolom yang boleh diisi.
     */
    protected $fillable = [
        'user_id',
        'category',     // 'food', 'bills', dll
        'limit_amount', // Batas maksimal rupiah
        'month',        // Format string: "YYYY-MM" (Contoh: "2026-01")
    ];

    /**
     * Casting tipe data.
     */
    protected $casts = [
        'limit_amount' => 'decimal:2',
    ];

    /**
     * Relasi balik ke User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}