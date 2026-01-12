<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();
        $currentMonth = Carbon::now()->format('Y-m');

        // 1. Ambil Statistik Sederhana
        $totalHabits = Habit::where('user_id', $user->id)
            ->where('period', $currentMonth)
            ->count();

        // 2. Hitung Streak / Persentase Global Bulan Ini (Opsional, buat gaya)
        // Kita ambil habit beserta log bulan ini aja
        $habits = Habit::where('user_id', $user->id)
            ->where('period', $currentMonth)
            ->withCount(['logs as completed_count' => function ($query) {
                $query->where('status', 'completed');
            }])
            ->get();

        $totalCompleted = $habits->sum('completed_count');
        
        // Rumus: (Total Centang / (Total Habit * Hari yg sudah lewat)) * 100
        // Ini estimasi kasar buat motivasi
        $daysPassed = Carbon::now()->day;
        $potential = $totalHabits * $daysPassed;
        $consistency = ($potential > 0) ? round(($totalCompleted / $potential) * 100) : 0;

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_habits' => $totalHabits,
                'consistency' => $consistency,
                'streak' => 12, // Nanti bisa dibikin logic real-nya
                'is_premium' => $user->is_premium ?? false, // Asumsi ada kolom ini atau false
            ]
        ]);
    }
}