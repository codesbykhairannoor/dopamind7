<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\HabitLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\Mood;

class HabitController extends Controller
{
    /**
     * Tampilkan Halaman Utama Habit Tracker
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // 1. Tentukan Bulan Yang Mau Dilihat (Format: YYYY-MM)
        // Kalau user minta ?month=2026-02, pake itu. Kalau gak, pake bulan sekarang.
        $monthQuery = $request->input('month', Carbon::now()->format('Y-m'));
        
        // Buat objek Carbon buat manipulasi tanggal
        $dateObj = Carbon::createFromFormat('Y-m', $monthQuery);
$currentMood = \App\Models\Mood::where('user_id', $user->id)
            ->where('period', $monthQuery)
            ->first();
        // 2. Ambil Habit HANYA di bulan tersebut (Filter by Period)
        $habits = Habit::where('user_id', $user->id)
            ->where('period', $monthQuery) // <--- INI KUNCINYA: Cuma ambil habit bulan ini
            ->with(['logs' => function ($query) use ($dateObj) {
                // Ambil logs cuma di bulan yg dipilih
                $query->whereMonth('date', $dateObj->month)
                      ->whereYear('date', $dateObj->year);
            }])
            ->get()
            ->map(function ($habit) {
                // Hitung progress (Sama kayak kode lama)
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
                    'logs' => $habit->logs->map(function ($log) {
                        return ['date' => $log->date, 'status' => $log->status];
                    })
                ];
            });

        // 3. Cek Bulan Sebelumnya (Buat fitur Copy)
        $prevMonth = $dateObj->copy()->subMonth()->format('Y-m');
        $hasPrevHabits = Habit::where('user_id', $user->id)
            ->where('period', $prevMonth)
            ->exists();

        return Inertia::render('Habits/Index', [
            'habits' => $habits,
            'currentMonth' => $dateObj->translatedFormat('F Y'), // Contoh: "Januari 2026"
            'monthQuery' => $monthQuery, // "2026-01"
            'hasPrevHabits' => $hasPrevHabits, // True/False buat tombol Copy
            'prevMonthQuery' => $prevMonth,    // "2025-12"
            'savedMood' => $currentMood ? $currentMood->mood_code : null,
        ]);
    }

    /**
     * Simpan Habit Baru (Wajib ada Period)
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'required|string|max:10',
            'color' => 'required|string|max:7',
            'monthly_target' => 'required|integer|min:1|max:31',
            'period' => 'required|string', // <--- HARUS ADA PERIODE
        ]);

        Habit::create([
            'user_id' => Auth::id(),
            'period' => $request->period, // Simpan periode (misal: 2026-01)
            'name' => $request->name,
            'icon' => $request->icon,
            'color' => $request->color,
            'monthly_target' => $request->monthly_target,
        ]);

        return back();
    }

    public function updateMood(Request $request)
    {
        $request->validate([
            'mood_code' => 'required|string',
            'period' => 'required|string',
        ]);

        // Simpan atau Update Mood
        Mood::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'period' => $request->period // Kunci unik (User + Bulan)
            ],
            [
                'mood_code' => $request->mood_code // Data yang diupdate
            ]
        );

        return back();
    }
    /**
     * FITUR BARU: Copy Habit dari Bulan Lalu
     */
    public function copyFromPrevious(Request $request)
    {
        $currentPeriod = $request->input('current_period'); // Bulan yg lagi dibuka (kosong)
        $prevPeriod = $request->input('prev_period');       // Bulan lalu (sumber data)

        // Ambil semua habit bulan lalu
        $oldHabits = Habit::where('user_id', Auth::id())
            ->where('period', $prevPeriod)
            ->get();

        // Duplikat satu per satu ke bulan sekarang
        foreach ($oldHabits as $old) {
            Habit::create([
                'user_id' => Auth::id(),
                'period' => $currentPeriod, // Set ke bulan baru
                'name' => $old->name,
                'icon' => $old->icon,
                'color' => $old->color,
                'monthly_target' => $old->monthly_target,
            ]);
        }

        return back();
    }

    /**
     * Fungsi Centang/Log (Gak berubah dari yg lama)
     */
    public function storeLog(Request $request, Habit $habit)
    {
        if ($habit->user_id !== Auth::id()) abort(403);

        $request->validate([
            'date' => 'required|date',
            'status' => 'required|in:completed,skipped,uncheck'
        ]);

        if ($request->status === 'uncheck') {
            HabitLog::where('habit_id', $habit->id)->where('date', $request->date)->delete();
        } else {
            HabitLog::updateOrCreate(
                ['habit_id' => $habit->id, 'date' => $request->date],
                ['status' => $request->status]
            );
        }

        return back();
    }

    /**
     * Update & Destroy (Gak berubah logic intinya)
     */
    public function update(Request $request, Habit $habit)
    {
        if ($habit->user_id !== Auth::id()) abort(403);
        $habit->update($request->all());
        return back();
    }

    public function destroy(Habit $habit)
    {
        if ($habit->user_id !== Auth::id()) abort(403);
        $habit->delete();
        return back();
    }
}