<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlannerTask extends Model
{
    use HasFactory;

    /**
     * White-list kolom yang boleh diisi secara massal (Mass Assignment).
     * Pastikan 'date' sudah ada di sini agar fitur pindah tanggal jalan.
     */
    protected $fillable = [
        'user_id',
        'date',
        'title',
        'start_time',
        'end_time',
        'type',
        'notes',
        'is_completed',
    ];

    /**
     * Casting tipe data agar otomatis dikonversi saat ditarik dari database.
     */
    protected $casts = [
        'is_completed' => 'boolean',
        'type'         => 'integer',
        'date'         => 'date', // Otomatis jadi object Carbon
    ];

    /**
     * Accessor: Format jam saat diambil dari database (18:20:00 -> 18:20)
     * Ini penting agar input type="time" di Vue/Frontend bisa membaca nilainya.
     */
    public function getStartTimeAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getEndTimeAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    /**
     * Relasi balik ke User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}