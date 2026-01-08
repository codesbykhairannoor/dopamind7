<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tracker extends Model
{
    use HasFactory;

    protected $fillable = [
        'period_id',
        'type',        // habit, finance, goal
        'name',
        'icon',
        'target_value',
        'unit',
    ];

    // Relasi ke Period
    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    // Relasi ke Entries (Satu tracker punya banyak data harian)
    public function entries()
    {
        return $this->hasMany(TrackerEntry::class);
    }
}