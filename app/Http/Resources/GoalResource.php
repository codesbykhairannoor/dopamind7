<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\GoalMilestoneResource;

class GoalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request)
    {
        $milestones = $this->whenLoaded('milestones');
        $total = $milestones instanceof \Illuminate\Support\Collection || is_array($milestones) ? count($milestones) : 0;
        $completed = $milestones instanceof \Illuminate\Support\Collection ? $milestones->where('completed', true)->count() : 0;
        $progress = $total ? round(($completed / $total) * 100, 2) : 0;

        $daysRemaining = null;
        $isOverdue = false;
        $timeProgress = 0;
        $durationLabel = null;

        if ($this->start_date && $this->end_date) {
            $start = $this->start_date;
            $end = $this->end_date;
            $now = now();

            $totalDays = $start->diffInDays($end);
            $elapsedDays = $start->diffInDays($now);

            if ($totalDays > 0) {
                $timeProgress = min(100, max(0, round(($elapsedDays / $totalDays) * 100, 2)));
            }

            $daysRemaining = $now->diffInDays($end, false);
            $isOverdue = $daysRemaining < 0;

            $durationLabel = $totalDays . ' ' . ($totalDays == 1 ? 'Day' : 'Days');
            if ($totalDays >= 30) {
                $months = round($totalDays / 30, 1);
                $durationLabel = $months . ' ' . ($months == 1 ? 'Month' : 'Months');
            }
            elseif ($totalDays >= 7) {
                $weeks = round($totalDays / 7, 1);
                $durationLabel = $weeks . ' ' . ($weeks == 1 ? 'Week' : 'Weeks');
            }
        }

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'category' => $this->category,
            'type' => $this->type,
            'target_value' => $this->target_value,
            'current_value' => $this->current_value,
            'start_date' => $this->start_date ? $this->start_date->format('Y-m-d') : null,
            'end_date' => $this->end_date ? $this->end_date->format('Y-m-d') : null,
            'days_remaining' => $daysRemaining,
            'is_overdue' => $isOverdue,
            'time_progress' => $timeProgress,
            'duration_label' => $durationLabel,
            'specific_days' => $this->specific_days,
            'status' => $this->status,
            'progress' => $progress,
            'milestones' => GoalMilestoneResource::collection($this->relationLoaded('milestones') ? $this->milestones : []),
        ];
    }
}
