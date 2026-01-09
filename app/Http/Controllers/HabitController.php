<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\HabitLog; // Jangan lupa import ini
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class HabitController extends Controller
{
    /**
     * Tampilkan Halaman Utama Habit Tracker
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // 1. Tentukan Tanggal Acuan (Default: Hari Ini, atau ambil dari Request)
        // Kalau ada ?month=2025-12, pake itu. Kalau gak ada, pake Now.
        $queryDate = $request->input('month') 
            ? Carbon::parse($request->input('month') . '-01') 
            : Carbon::now();

        // 2. Ambil Habit & Filter Log Sesuai Bulan Yang Dipilih
        $habits = Habit::where('user_id', $user->id)
            ->where('is_archived', false)
            ->with(['logs' => function ($query) use ($queryDate) {
                $query->whereMonth('date', $queryDate->month)
                      ->whereYear('date', $queryDate->year);
            }])
            ->get()
            ->map(function ($habit) use ($queryDate) {
                // Hitung progress bulan TERSEBUT (Bukan bulan ini)
                $completedCount = $habit->logs->where('status', 'completed')->count();
                
                return [
                    'id' => $habit->id,
                    'name' => $habit->name,
                    'icon' => $habit->icon,
                    'color' => $habit->color,
                    'monthly_target' => $habit->monthly_target,
                    'progress_count' => $completedCount,
                    'progress_percent' => $habit->monthly_target > 0 
                        ? min(100, round(($completedCount / $habit->monthly_target) * 100)) 
                        : 0,
                    
                    // Kita kirim logs biar frontend bisa render
                    'logs' => $habit->logs->map(function ($log) {
                        return ['date' => $log->date, 'status' => $log->status];
                    })
                ];
            });

        return Inertia::render('Habits/Index', [
            'habits' => $habits,
            // Kirim info bulan ke Frontend biar judulnya bener (Desember 2025 / Januari 2026)
            'currentMonth' => $queryDate->isoFormat('MMMM Y'), 
            // Kirim raw date buat navigasi (2025-12)
            'monthQuery' => $queryDate->format('Y-m'), 
        ]);
    }
    
    /**
     * Fungsi buat Nyentang / Skip Habit (Akan dipake nanti)
     */
    public function storeLog(Request $request, Habit $habit)
    {
        // Validasi: Pastikan habit ini punya user yang login
        if ($habit->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'date' => 'required|date',
            'status' => 'required|in:completed,skipped,uncheck' // 'uncheck' buat batalin centang
        ]);

        $date = $request->date;
        $status = $request->status;

        if ($status === 'uncheck') {
            // Kalau user mau batalin centang (apus log)
            HabitLog::where('habit_id', $habit->id)->where('date', $date)->delete();
        } else {
            // Kalau completed/skipped, update atau bikin baru (updateOrCreate)
            HabitLog::updateOrCreate(
                ['habit_id' => $habit->id, 'date' => $date],
                ['status' => $status]
            );
        }

        return back(); // Refresh halaman otomatis (Inertia magic)
    }

    /**
     * Simpan Habit Baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'required|string|max:10', // Emoji
            'color' => 'required|string|max:7', // Hex code
            'monthly_target' => 'required|integer|min:1|max:31',
        ]);

        Habit::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'icon' => $request->icon,
            'color' => $request->color,
            'monthly_target' => $request->monthly_target,
        ]);

        return back();
    }

    /**
     * Hapus Habit
     */
    public function destroy(Habit $habit)
    {
        if ($habit->user_id !== Auth::id()) abort(403);
        
        $habit->delete();
        return back();
    }

    /**
     * Update Habit
     */
    public function update(Request $request, Habit $habit)
    {
        // Pastikan yang edit adalah pemilik habit
        if ($habit->user_id !== Auth::id()) abort(403);

        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'required|string|max:10',
            'color' => 'required|string|max:7',
            'monthly_target' => 'required|integer|min:1|max:31',
        ]);

        $habit->update([
            'name' => $request->name,
            'icon' => $request->icon,
            'color' => $request->color,
            'monthly_target' => $request->monthly_target,
        ]);

        return back();
    }
}