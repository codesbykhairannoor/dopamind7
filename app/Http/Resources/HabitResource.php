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
        // PENTING: Kita pakai 'completed_count' yang dihitung otomatis sama Database (lebih cepat)
        // Kalau gak ada (misal dipanggil manual tanpa withCount), baru hitung manual dari relation logs.
        
        // Catatan: completed_count adalah properti dinamis dari withCount() di Controller
        $completedCount = $this->completed_count ?? $this->logs->where('status', 'completed')->count();
        
        return [
            'id' => $this->id,
            'name' => $this->name,
            'icon' => $this->icon,
            'color' => $this->color,
            'monthly_target' => $this->monthly_target,
            
            // Hitung Persen (Logic dipindah kesini biar Controller bersih)
            'progress_count' => $completedCount,
            'progress_percent' => $this->monthly_target > 0 
                ? min(100, round(($completedCount / $this->monthly_target) * 100)) 
                : 0,
            
            // Logs tetap dikirim buat kalender
            // Kita pakai whenLoaded biar hemat memori kalau relation logs gak dipanggil di controller
            'logs' => $this->whenLoaded('logs', function () {
                return $this->logs->map(fn($log) => [
                    'date' => $log->date,
                    // Pastikan log->status ini sesuai sama Enum/String yang lo pake
                    'status' => $log->status 
                ]);
            }),
        ];
    }
}