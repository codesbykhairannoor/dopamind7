<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyLog extends Model
{
    use HasFactory;

    /**
     * White-list kolom yang boleh diisi massal.
     * Kita tambahkan 'date' di sini.
     */
    protected $fillable = [
        'user_id',
        'date',   // 🔥 WAJIB ADA untuk sistem agenda harian
        'meals', 'water', 'task_box',
        'notes',
    ];

    /**
     * Konversi otomatis data JSON dari database menjadi Array PHP.
     */
    protected $casts = [
        'meals' => 'array',
        'task_box' => 'array',
        'date'  => 'date', // Memastikan format tanggal konsisten
    ];

    /**
     * Relasi balik ke User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}