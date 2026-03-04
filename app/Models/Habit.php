<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'period',
        'position',
        'color',
        'icon',
    ];

    public function logs()
    {
        return $this->hasMany(HabitLog::class);
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
            ->with(['logs' => fn ($q) => $q->whereBetween('date', [$startOfMonth, $endOfMonth])])
            ->withCount(['logs as completed_count' => fn ($q) => $q->where('status', 'completed')]);
    }
}