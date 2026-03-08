<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GoalMilestoneResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'goal_id' => $this->goal_id,
            'title' => $this->title,
            'order' => $this->order,
            'position' => $this->order,
            'completed' => (bool)$this->completed,
            'is_completed' => (bool)$this->completed,
            'target_date' => $this->target_date ? $this->target_date->format('Y-m-d') : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
