<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinanceTransaction extends Model
{
    use HasFactory;

    /**
     * Kolom yang boleh diisi (Mass Assignment).
     */
    protected $fillable = [
        'user_id',
        'title',
        'amount',
        'type',      // 'income' atau 'expense'
        'category',  // 'food', 'transport', dll
        'date',
        'notes',
    ];

    /**
     * Casting tipe data otomatis.
     * Penting: 'date' dicast jadi object Carbon biar bisa diformat enak di frontend/backend.
     * 'amount' dicast jadi integer/float biar gak dianggap string.
     */
    protected $casts = [
        'date' => 'date',
        'amount' => 'decimal:2',
    ];

    /**
     * Relasi balik ke User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}