<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class JournalResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // 🔥 FIX FATAL: Deteksi dinamis apakah pakai Local Storage atau Cloud Storage
        $imageUrl = null;
        if ($this->image_path) {
            if (str_starts_with($this->image_path, 'http')) {
                $imageUrl = $this->image_path;
            } else {
                $disk = config('filesystems.default');
                // Jika lokal, pakai asset('storage/'). Jika production, pakai Storage::url()
                $imageUrl = ($disk === 'local') 
                    ? asset('storage/' . $this->image_path) 
                    : Storage::disk($disk)->url($this->image_path);
            }
        }

        return [
            'id'         => $this->id,
            'title'      => $this->title,
            'content'    => $this->content,
            'mood'       => $this->mood,
            'date'       => $this->date,
            'is_pinned'  => $this->is_pinned,
            'image_url'  => $imageUrl, // 🔥 Sekarang ini 100% akurat di semua env!
            'ai_sentiment' => $this->ai_sentiment,
            'mood_score'   => $this->mood_score,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}