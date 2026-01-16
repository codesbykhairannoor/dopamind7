<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PlannerTask extends Model
{
    use HasFactory;

    // 🔥 FIX: Ijinkan semua kolom diisi kecuali ID
    protected $guarded = ['id'];

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