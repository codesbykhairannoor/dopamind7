<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GoalMilestoneResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'completed' => $this->completed,
            'order' => $this->order,
            'target_date' => $this->target_date ? $this->target_date->format('Y-m-d') : null,
        ];
    }
}
