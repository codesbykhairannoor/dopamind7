<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'company' => $this->company,
            'status' => $this->status,
            'salary' => $this->salary ? (float) $this->salary : null,
            'notes' => $this->notes,
            'applied_date' => $this->applied_date ? $this->applied_date->format('Y-m-d') : null,
            'location' => $this->location,
            'job_url' => $this->job_url,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
