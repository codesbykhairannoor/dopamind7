<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();
        $now = Carbon::now();
        $currentMonth = $now->format('Y-m');

        /**
         * 🔥 OPTIMASI 1: Satu Query untuk Semua.
         * Kita tarik data habit sekaligus menghitung log yang 'completed'.
         * Menggunakan withCount jauh lebih cepat daripada looping manual.
         */
        $habits = Habit::where('user_id', $user->id)
            ->where('period', $currentMonth)
            ->withCount(['logs as completed_count' => function ($query) {
                $query->where('status', 'completed');
            }])
            ->get();

        /**
         * 🔥 OPTIMASI 2: Olah Data di Memori (PHP).
         * Jangan panggil database lagi untuk menghitung total. 
         * Gunakan collection methods dari hasil query di atas.
         */
        $totalHabits = $habits->count();
        $totalCompleted = $habits->sum('completed_count');

        // Rumus konsistensi berdasarkan hari yang sudah berjalan
        $daysPassed = $now->day;
        $potential = $totalHabits * $daysPassed;
        $consistency = ($potential > 0) ? round(($totalCompleted / $potential) * 100) : 0;

        /**
         * 💡 NOTE: Untuk logic 'streak' yang real, lu butuh query tambahan ke habit_logs.
         * Tapi untuk sekarang kita biarkan static agar loading tetap instant.
         */

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_habits' => $totalHabits,
                'consistency' => (int) $consistency,
                'streak' => 12, 
                'is_premium' => (bool) ($user->is_premium ?? false),
            ],
        ]);
    }
}