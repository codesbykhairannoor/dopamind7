<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Habit
 */
class HabitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // 1. Hitung completed count secara aman
        // Cek apakah completed_count ada (dari withCount), jika tidak cek logs, jika logs null kasih 0
        $completedCount = $this->completed_count 
            ?? ($this->relationLoaded('logs') ? $this->logs->where('status', 'completed')->count() : 0);

        return [
            'id' => $this->id,
            'name' => (string) $this->name,
            'icon' => (string) $this->icon,
            'color' => (string) $this->color,
            'monthly_target' => (int) $this->monthly_target,

            // Statistik
            'progress_count' => (int) $completedCount,
            'progress_percent' => (int) ($this->monthly_target > 0
                ? min(100, round(($completedCount / $this->monthly_target) * 100))
                : 0),

            // 🔥 SPREADSHEET SPEED LOGIC 🔥
            // Hanya diproses jika relasi 'logs' di-load untuk menghindari error null
            'logs' => $this->whenLoaded('logs', function () {
                return $this->logs->mapWithKeys(function ($log) {
                    // Pastikan format tanggal konsisten YYYY-MM-DD
                    $dateKey = is_string($log->date) 
                        ? substr($log->date, 0, 10) 
                        : $log->date->format('Y-m-d');
                    
                    return [$dateKey => $log->status];
                });
            }, (object)[]), // Jika tidak di-load, kembalikan object kosong bukan null

            // Metadata untuk Mobile Sync
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}