<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\Mood;
use App\Http\Resources\HabitResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
// 👇 Tambahan Trait ini penting buat fitur 'authorize' (Satpam)
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class HabitController extends Controller
{
    // Pasang "Jimat" Security
    use AuthorizesRequests;

    /**
     * Tampilkan Halaman Utama Habit Tracker
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // 1. Tentukan Bulan
        $monthQuery = $request->input('month', Carbon::now()->format('Y-m'));
        $dateObj = Carbon::createFromFormat('Y-m', $monthQuery);

        // 🔥 OPTIMASI QUERY (RAHASIA 10.000 USER) 🔥
        $habits = Habit::where('user_id', $user->id)
            ->where('period', $monthQuery)
            
            // A. Ambil Log CUMA bulan ini (Hemat RAM)
            ->with(['logs' => function ($query) use ($dateObj) {
                $query->whereMonth('date', $dateObj->month)
                      ->whereYear('date', $dateObj->year);
            }])
            
            // B. withCount: Biarkan Database yang ngitung jumlah centang 
            // (Jauh lebih cepat daripada PHP looping satu-satu)
            ->withCount(['logs as completed_count' => function ($query) {
                $query->where('status', 'completed');
            }])
            ->get();

        // Data pendukung lain
        $currentMood = Mood::where('user_id', $user->id)->where('period', $monthQuery)->first();
        $prevMonth = $dateObj->copy()->subMonth()->format('Y-m');
        $hasPrevHabits = Habit::where('user_id', $user->id)->where('period', $prevMonth)->exists();

        // 👇 Render ke 'Dashboard' (sesuai file Vue kamu)
        return Inertia::render('Habits/Index', [
            'habits' => HabitResource::collection($habits),
            'currentMonth' => $dateObj->translatedFormat('F Y'),
            'monthQuery' => $monthQuery,
            'hasPrevHabits' => $hasPrevHabits,
            'prevMonthQuery' => $prevMonth,
            'savedMood' => $currentMood ? $currentMood->mood_code : null,
        ]);
    }

    /**
     * Simpan Habit Baru
     */
    public function store(Request $request)
    {
        // Validasi
        $request->validate([
            'name' => 'required|string|max:100', // Sesuai database baru (max 100)
            'icon' => 'required|string|max:10',
            'color' => 'required|string|max:7',
            'monthly_target' => 'required|integer|min:1|max:31',
            'period' => 'required|string|max:7',
        ]);

        // Create gak butuh Policy karena user bikin untuk dirinya sendiri
        Habit::create([
            'user_id' => Auth::id(),
            'period' => $request->period,
            'name' => $request->name,
            'icon' => $request->icon,
            'color' => $request->color,
            'monthly_target' => $request->monthly_target,
        ]);

        return back();
    }

    /**
     * Update Mood User
     */
    public function updateMood(Request $request)
    {
        $request->validate([
            'mood_code' => 'required|string|max:20',
            'period' => 'required|string|max:7',
        ]);

        Mood::updateOrCreate(
            ['user_id' => Auth::id(), 'period' => $request->period],
            ['mood_code' => $request->mood_code]
        );

        return back();
    }

    /**
     * Copy Habit dari Bulan Lalu
     */
    public function copyFromPrevious(Request $request)
    {
        $currentPeriod = $request->input('current_period');
        $prevPeriod = $request->input('prev_period');

        // Ambil habit milik user sendiri (Aman, gak perlu policy)
        $oldHabits = Habit::where('user_id', Auth::id())->where('period', $prevPeriod)->get();

        foreach ($oldHabits as $old) {
            Habit::create([
                'user_id' => Auth::id(),
                'period' => $currentPeriod,
                'name' => $old->name,
                'icon' => $old->icon,
                'color' => $old->color,
                'monthly_target' => $old->monthly_target,
            ]);
        }

        return back();
    }

    /**
     * Centang / Log Harian
     */
    public function storeLog(Request $request, Habit $habit)
    {
        // 👮‍♂️ SECURITY: Panggil Satpam (Policy)
        // Pastikan di HabitPolicy.php sudah ada function 'log'
        $this->authorize('log', $habit);

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
     * Update Habit (Edit Nama/Target)
     */
    public function update(Request $request, Habit $habit)
    {
        // 👮‍♂️ SECURITY: Cek Hak Akses
        $this->authorize('update', $habit);

        $habit->update($request->all());
        return back();
    }

    /**
     * Hapus Habit
     */
    public function destroy(Habit $habit)
    {
        // 👮‍♂️ SECURITY: Cek Hak Akses
        $this->authorize('delete', $habit);

        $habit->delete(); // Ini bakal jadi Soft Delete kalau di Model udah dipasang
        return back();
    }
}