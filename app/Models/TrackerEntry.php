<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackerEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'tracker_id',
        'date',
        'value',
        'note',
    ];

    protected $casts = [
        'date' => 'date', // Biar otomatis jadi object tanggal pas ditarik
    ];

    // Relasi ke Tracker
    public function tracker()
    {
        return $this->belongsTo(Tracker::class);
    }
}