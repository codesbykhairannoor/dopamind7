<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    use HasFactory;

    // Kolom mana aja yang boleh diisi lewat kodingan
    protected $fillable = [
        'user_id',
        'month',
        'year',
        'is_active',
        'summary',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'summary' => 'array',
    ];

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Trackers (Satu periode punya banyak tracker)
    public function trackers()
    {
        return $this->hasMany(Tracker::class);
    }
}
