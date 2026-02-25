<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class JournalResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'title'      => $this->title,
            'content'    => $this->content,
            'mood'       => $this->mood,
            'date'       => $this->date,
            'is_pinned'  => $this->is_pinned,
            'image_url'  => $this->image_path ? asset('storage/' . $this->image_path) : null,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}