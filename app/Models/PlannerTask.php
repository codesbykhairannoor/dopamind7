<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlannerTask extends Model
{
    use HasFactory;

    // 🔥 FIX: Ijinkan semua kolom diisi kecuali ID
    protected $guarded = ['id'];
protected $fillable = [
    'user_id',
    'title',
    'start_time',
    'end_time',
    'type',
    'notes',
    'is_completed', // tambahin ini juga kalau ada
];
    protected $casts = [
        'is_completed' => 'boolean',
        'type' => 'integer',
    ];

    // Format jam biar bersih (18:20:00 -> 18:20)
    public function getStartTimeAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getEndTimeAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }
}
