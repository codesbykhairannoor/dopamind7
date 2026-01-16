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
}
