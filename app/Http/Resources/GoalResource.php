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
            'specific_days' => $this->specific_days,
            'status' => $this->status,
            'progress' => $progress,
            'milestones' => GoalMilestoneResource::collection($this->relationLoaded('milestones') ? $this->milestones : []),
        ];
    }
}
