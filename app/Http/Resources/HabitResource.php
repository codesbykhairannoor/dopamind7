<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HabitResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // PENTING: Kita pakai 'completed_count' yang dihitung otomatis sama Database (lebih cepat)
        // Kalau gak ada (misal dipanggil manual), baru hitung manual.
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
            
            // Logs tetap dikirim buat kalender (tapi nanti kita filter di controller)
            'logs' => $this->whenLoaded('logs', function () {
                return $this->logs->map(fn($log) => [
                    'date' => $log->date,
                    'status' => $log->status
                ]);
            }),
        ];
    }
}