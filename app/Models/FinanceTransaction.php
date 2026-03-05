<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinanceTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'title',
        'type',
        'category',
        'amount',
        'notes',
    ];

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

    public function scopeOfUser($query, $userId)
    {
        return $query->where('user_id', $userId);    }
    public function scopeInMonth($query, $start, $end)
    {
        return $query->whereBetween('date', [$start, $end])
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc');    }
}