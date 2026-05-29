<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'period',
        'monthly_target',
        'position',
        'color',
        'icon',
        'is_archived',
    ];

    public function logs()
    {
        return $this->hasMany(HabitLog::class);
    }

    protected static function booted()
    {
        static::saved(fn ($habit) => static::clearCache($habit->user_id));
        static::deleted(fn ($habit) => static::clearCache($habit->user_id));
    }

    protected static function clearCache($userId)
    {
        \Illuminate\Support\Facades\Cache::forget("dash_synergy_{$userId}");
        \Illuminate\Support\Facades\Cache::forget("dash_trend_{$userId}");
    }

    // --- LOCAL SCOPES (Clean Query Helpers) ---

    public function scopeOfUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeForPeriod($query, $period)
    {
        return $query->where('period', $period);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('position', 'asc')->orderBy('created_at', 'asc');
    }

    public function scopeWithLogStats($query, $startOfMonth, $endOfMonth)
    {
        return $query
            ->with(['logs' => fn($q) => $q->whereBetween('date', [$startOfMonth, $endOfMonth])])
            ->withCount(['logs as completed_count' => fn($q) => $q->where('status', 'completed')]);
    }
}