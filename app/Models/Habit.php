<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'period','name', 'icon', 'color', 'monthly_target', 'is_archived'
    ];

    // Relasi: Satu Habit punya banyak Log harian
    public function logs()
    {
        return $this->hasMany(HabitLog::class);
    }
    
    // Helper buat ambil log hari ini
    public function todayLog()
    {
        return $this->hasOne(HabitLog::class)->where('date', date('Y-m-d'));
    }
}