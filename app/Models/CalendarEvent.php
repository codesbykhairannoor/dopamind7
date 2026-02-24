<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalendarEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'type',
        'color',
        'start_date',
        'end_date',
        'is_all_day',
        'start_time',
        'end_time'
    ];

    // Otomatis ubah nilai 0/1 dari database jadi true/false di backend/frontend
    protected $casts = [
        'is_all_day' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    // Relasi Pemilik Event
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}