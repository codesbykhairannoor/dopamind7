<?php

namespace App\Http\Controllers;

use App\Enums\HabitStatus;
use App\Http\Requests\LogHabitRequest;   // ✅ Request Baru
use App\Http\Requests\StoreHabitRequest; // ✅ Request Create
use App\Http\Requests\UpdateHabitRequest; // ✅ Request Update Baru
use App\Http\Resources\HabitResource;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\Mood;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HabitController extends Controller
{
    use AuthorizesRequests;

    /**
     * Tampilkan Halaman Utama & Data API
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $monthQuery = $request->input('month', Carbon::now()->format('Y-m'));
        $dateObj = Carbon::createFromFormat('Y-m', $monthQuery);

        // --- QUERY DATABASE ---
        $habits = Habit::where('user_id', $user->id)
            ->where('period', $monthQuery)
            // Eager load logs hanya bulan yang diminta
            ->with(['logs' => fn ($q) => $q->whereMonth('date', $dateObj->month)->whereYear('date', $dateObj->year)])
            ->withCount(['logs as completed_count' => fn ($q) => $q->where('status', 'completed')])
            ->get();

        $dataResource = HabitResource::collection($habits);

        // 📱 JIKA MOBILE APP (API)
        if ($request->wantsJson()) {
            return $dataResource;
        }

        // 💻 JIKA WEB (INERTIA)
        $currentMood = Mood::where('user_id', $user->id)->where('period', $monthQuery)->first();
        $prevMonth = $dateObj->copy()->subMonth()->format('Y-m');
        $hasPrevHabits = Habit::where('user_id', $user->id)->where('period', $prevMonth)->exists();

        return Inertia::render('Habits/Index', [
            'habits' => $dataResource,
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
    public function store(StoreHabitRequest $request)
    {
        $habit = Habit::create(array_merge(
            ['user_id' => Auth::id()],
            $request->validated()
        ));

        // 📱 API Response
        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Habit created successfully',
                'data' => new HabitResource($habit)
            ], 201);
        }

        // 💻 Web Redirect
        return back();
    }

    /**
     * Update Habit (Edit Nama/Target)
     */
    public function update(UpdateHabitRequest $request, Habit $habit)
    {
        $this->authorize('update', $habit);

        $habit->update($request->validated());

        // 📱 API Response
        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Habit updated',
                'data' => new HabitResource($habit)
            ]);
        }

        return back();
    }

    /**
     * Centang / Log Harian
     * Menggunakan LogHabitRequest untuk validasi
     */
    public function storeLog(LogHabitRequest $request, Habit $habit)
    {
        $this->authorize('log', $habit);

        // Validasi sudah ditangani LogHabitRequest, tinggal ambil
        $data = $request->validated();

        if ($data['status'] === 'uncheck') {
            HabitLog::where('habit_id', $habit->id)
                ->where('date', $data['date'])
                ->delete();
        } else {
            HabitLog::updateOrCreate(
                ['habit_id' => $habit->id, 'date' => $data['date']],
                ['status' => $data['status']]
            );
        }

        // 📱 API Response
        if ($request->wantsJson()) {
            return response()->json(['message' => 'Log updated successfully']);
        }

        return back();
    }

    /**
     * Update Mood User
     */
    public function updateMood(Request $request)
    {
        // Tetap validasi manual disini karena simpel & jarang dipanggil
        $validated = $request->validate([
            'mood_code' => 'required|string|max:20',
            'period' => 'required|string|max:7',
        ]);

        $mood = Mood::updateOrCreate(
            ['user_id' => Auth::id(), 'period' => $validated['period']],
            ['mood_code' => $validated['mood_code']]
        );

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Mood saved', 'data' => $mood]);
        }

        return back();
    }

    /**
     * Copy Habit dari Bulan Lalu
     */
    public function copyFromPrevious(Request $request)
    {
        $request->validate([
            'current_period' => 'required|date_format:Y-m',
            'prev_period' => 'required|date_format:Y-m',
        ]);

        $oldHabits = Habit::where('user_id', Auth::id())
            ->where('period', $request->prev_period)
            ->get();

        $count = 0;
        foreach ($oldHabits as $old) {
            Habit::create([
                'user_id' => Auth::id(),
                'period' => $request->current_period,
                'name' => $old->name,
                'icon' => $old->icon,
                'color' => $old->color,
                'monthly_target' => $old->monthly_target,
            ]);
            $count++;
        }

        if ($request->wantsJson()) {
            return response()->json(['message' => "$count habits copied successfully"]);
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

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Habit deleted'], 200);
        }

        return back();
    }
}