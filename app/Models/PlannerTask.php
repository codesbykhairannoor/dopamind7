<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlannerTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'date', 'title', 'start_time', 'end_time', 'type', 'notes', 'is_completed',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'type'         => 'integer',
        'date'         => 'date', 
    ];

    public function getStartTimeAttribute($value) {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function getEndTimeAttribute($value) {
        return $value ? Carbon::parse($value)->format('H:i') : null;
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    // 🔥 TAMBAHKAN LOCAL SCOPES INI 🔥
    public function scopeOfUser($query, $userId) {
        return $query->where('user_id', $userId);
    }

    public function scopeForDate($query, $date) {
        return $query->where('date', $date);
    }

    public function scopeOrdered($query) {
        return $query->orderBy('start_time', 'asc');
    }
}