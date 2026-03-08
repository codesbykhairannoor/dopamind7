<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\GoalMilestone;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'cover_image_url',
        'cover_image_path',
        'category',
        'type',
        'target_value',
        'current_value',
        'start_date',
        'end_date',
        'specific_days',
        'status',
        'priority',
        'reward',
    ];

    protected $casts = [
        'target_value' => 'decimal:2',
        'current_value' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date',
        'specific_days' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeOfUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where('title', 'like', "%{$search}%");
    }

    public function milestones(): HasMany
    {
        return $this->hasMany(GoalMilestone::class)->orderBy('order');
    }

    /**
     * Sync milestones for this goal.
     * 
     * @param array $milestones
     * @return void
     */
    public function syncMilestones(array $milestones): void
    {
        $existingIds = collect($milestones)->pluck('id')->filter()->toArray();
        $this->milestones()->whereNotIn('id', $existingIds)->delete();

        foreach ($milestones as $index => $m) {
            $milestoneData = [
                'title' => $m['title'],
                'order' => $index,
                'completed' => $m['completed'] ?? false,
                'target_date' => $m['target_date'] ?? null,
            ];

            if (!empty($m['id']) && !str_starts_with($m['id'], 'temp_')) {
                $this->milestones()->where('id', $m['id'])->update($milestoneData);
            }
            else {
                $this->milestones()->create($milestoneData);
            }
        }
    }
}
