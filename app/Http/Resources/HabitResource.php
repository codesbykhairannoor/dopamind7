<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Habit
 */
class HabitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $completedCount = $this->completed_count 
            ?? ($this->relationLoaded('logs') ? $this->logs->where('status', 'completed')->count() : 0);

        return [
            'id' => $this->id,
            'name' => (string) $this->name,
            'icon' => (string) $this->icon,
            'color' => (string) $this->color,
            'monthly_target' => (int) $this->monthly_target,
            'position' => (int) $this->position, // 🔥 FIX: Wajib disertakan agar drag-drop tidak tereset!

            // Statistik
            'progress_count' => (int) $completedCount,
            'progress_percent' => (int) ($this->monthly_target > 0
                ? min(100, round(($completedCount / $this->monthly_target) * 100))
                : 0),

            // 🔥 SPREADSHEET SPEED LOGIC 🔥
            'logs' => $this->whenLoaded('logs', function () {
                return $this->logs->mapWithKeys(function ($log) {
                    $dateKey = is_string($log->date) 
                        ? substr($log->date, 0, 10) 
                        : $log->date->format('Y-m-d');
                    
                    $statusValue = $log->status instanceof \BackedEnum 
                        ? $log->status->value 
                        : $log->status;

                    return [$dateKey => $statusValue];
                });
            }, (object)[]),

            // 🔥 STAGNANCY DETECTION 🔥
            'is_stagnant' => $this->whenLoaded('logs', function() {
                // If habit is newly created (last 3 days), it's not stagnant yet
                if ($this->created_at->diffInDays(now()) < 4) return false;
                
                // If it has logs in the last 7 days, it's NOT stagnant
                $hasRecentLogs = $this->logs->contains(function($log) {
                    $date = is_string($log->date) ? \Carbon\Carbon::parse($log->date) : $log->date;
                    return $date->isAfter(now()->subDays(8)) && $log->status->value === 'completed';
                });

                return !$hasRecentLogs;
            }, false),

            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}