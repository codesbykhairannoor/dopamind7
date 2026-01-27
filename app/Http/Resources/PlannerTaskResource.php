<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlannerTaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => (string) $this->title,
            'start_time' => $this->start_time ? substr($this->start_time, 0, 5) : null, // Format HH:mm
            'end_time' => $this->end_time ? substr($this->end_time, 0, 5) : null,
            'type' => (int) $this->type, // 1, 2, atau 3
            'notes' =>$this->notes,
            'is_completed' => (bool) $this->is_completed,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}