<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinanceTransaction extends Model
{
    use HasFactory;

    // 🔥 FIX: Ijinkan semua kolom diisi massal KECUALI 'id'
    // Ini solusi biar gak perlu nulis $fillable panjang lebar dan menghindari error 'id' null.
    protected $guarded = ['id'];

    /**
     * Casting tipe data otomatis.
     */
    protected $casts = [
        'date' => 'date',
        'amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}