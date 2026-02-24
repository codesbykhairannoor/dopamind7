<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalendarEventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'type'        => $this->type,
            'color'       => $this->color ?? '#4f46e5', // Default color fallback
            'start_date'  => $this->start_date,
            'end_date'    => $this->end_date,
            'is_all_day'  => (bool) $this->is_all_day, // Pastikan jadi Boolean
            
            // Format waktu ke H:i (Jam:Menit) karena Vue <input type="time"> butuh format ini
            'start_time'  => $this->start_time ? substr($this->start_time, 0, 5) : null,
            'end_time'    => $this->end_time ? substr($this->end_time, 0, 5) : null,
        ];
    }
}