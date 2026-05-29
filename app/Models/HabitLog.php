<?php

namespace App\Models;

use App\Enums\HabitStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HabitLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'habit_id', 'date', 'status', 'notes',
    ];

    protected $casts = [
        'status' => HabitStatus::class,
    ];

    // Relasi: Log ini milik Habit siapa?
    public function habit()
    {
        return $this->belongsTo(Habit::class);
    }

    protected static function booted()
    {
        static::saved(function ($log) {
            $habit = $log->habit;
            if ($habit) {
                \Illuminate\Support\Facades\Cache::forget("dash_synergy_{$habit->user_id}");
                \Illuminate\Support\Facades\Cache::forget("dash_trend_{$habit->user_id}");
            }
        });
        static::deleted(function ($log) {
            $habit = $log->habit;
            if ($habit) {
                \Illuminate\Support\Facades\Cache::forget("dash_synergy_{$habit->user_id}");
                \Illuminate\Support\Facades\Cache::forget("dash_trend_{$habit->user_id}");
            }
        });
    }
}
