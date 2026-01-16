<?php

namespace App\Http\Controllers;

use App\Enums\HabitStatus;
use App\Http\Requests\StoreHabitRequest;
use App\Http\Resources\HabitResource;
use App\Models\Habit;
use App\Models\HabitLog; // ✅ Panggil Request yang baru dibuat
use App\Models\Mood;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class HabitController extends Controller
{
    use AuthorizesRequests;

    /**
     * Tampilkan Halaman Utama Habit Tracker
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // Default ke bulan sekarang kalau tidak ada request
        $monthQuery = $request->input('month', Carbon::now()->format('Y-m'));
        $dateObj = Carbon::createFromFormat('Y-m', $monthQuery);

        // 🔥 OPTIMASI QUERY: Eager Load logs cuma untuk bulan yang dipilih
        $habits = Habit::where('user_id', $user->id)
            ->where('period', $monthQuery)
            ->with(['logs' => fn ($q) => $q->whereMonth('date', $dateObj->month)->whereYear('date', $dateObj->year)])
            ->withCount(['logs as completed_count' => fn ($q) => $q->where('status', 'completed')])
            ->get();

        // Data pendukung (Mood & Habit bulan lalu)
        $currentMood = Mood::where('user_id', $user->id)->where('period', $monthQuery)->first();
        $prevMonth = $dateObj->copy()->subMonth()->format('Y-m');
        $hasPrevHabits = Habit::where('user_id', $user->id)->where('period', $prevMonth)->exists();

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
     * Simpan Habit Baru (CLEAN VERSION ✨)
     */
    public function store(StoreHabitRequest $request)
    {
        // Gak perlu validasi manual lagi, Laravel otomatis cek StoreHabitRequest
        Habit::create(array_merge(
            ['user_id' => Auth::id()],
            $request->validated() // Ambil data yang sudah lolos validasi
        ));

        return back();
    }

    /**
     * Update Habit (Edit Nama/Target)
     */
    public function update(Request $request, Habit $habit)
    {
        $this->authorize('update', $habit);

        // Validasi inline sederhana (karena update biasanya optional/sedikit)
        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'icon' => 'sometimes|string|max:10',
            'color' => 'sometimes|string|max:7',
            'monthly_target' => 'sometimes|integer|min:1|max:31',
        ]);

        $habit->update($validated);

        return back();
    }

    /**
     * Centang / Log Harian
     */
    public function storeLog(Request $request, Habit $habit)
    {
        $this->authorize('log', $habit);

        $validated = $request->validate([
            'date' => 'required|date',
            'status' => ['required', Rule::enum(HabitStatus::class)],
        ]);

        if ($validated['status'] === 'uncheck') {
            HabitLog::where('habit_id', $habit->id)
                ->where('date', $validated['date'])
                ->delete();
        } else {
            HabitLog::updateOrCreate(
                ['habit_id' => $habit->id, 'date' => $validated['date']],
                ['status' => $validated['status']]
            );
        }

        return back();
    }

    /**
     * Update Mood User
     */
    public function updateMood(Request $request)
    {
        $validated = $request->validate([
            'mood_code' => 'required|string|max:20',
            'period' => 'required|string|max:7',
        ]);

        Mood::updateOrCreate(
            ['user_id' => Auth::id(), 'period' => $validated['period']],
            ['mood_code' => $validated['mood_code']]
        );

        return back();
    }

    /**
     * Copy Habit dari Bulan Lalu
     */
    public function copyFromPrevious(Request $request)
    {
        // Validasi input biar aman
        $request->validate([
            'current_period' => 'required|date_format:Y-m',
            'prev_period' => 'required|date_format:Y-m',
        ]);

        $oldHabits = Habit::where('user_id', Auth::id())
            ->where('period', $request->prev_period)
            ->get();

        foreach ($oldHabits as $old) {
            Habit::create([
                'user_id' => Auth::id(),
                'period' => $request->current_period, // Pakai periode baru
                'name' => $old->name,
                'icon' => $old->icon,
                'color' => $old->color,
                'monthly_target' => $old->monthly_target,
            ]);
        }

        return back();
    }

    /**
     * Hapus Habit
     */
    public function destroy(Habit $habit)
    {
        $this->authorize('delete', $habit);
        $habit->delete();

        return back();
    }
}
