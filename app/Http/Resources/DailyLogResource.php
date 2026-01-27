<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DailyLogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'notes' => (string) $this->notes,
            // Pastikan meals selalu object/array yang valid
            'meals' => is_string($this->meals) ? json_decode($this->meals) : $this->meals,
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}