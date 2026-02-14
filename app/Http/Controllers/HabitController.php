<?php

namespace App\Http\Controllers;

use App\Enums\HabitStatus;
use App\Http\Requests\LogHabitRequest;   
use App\Http\Requests\StoreHabitRequest; 
use App\Http\Requests\UpdateHabitRequest; 
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
        
        // 🔥 PERBAIKAN 1: Cegah BUG Carbon Overflow di akhir bulan (tanggal 29, 30, 31)
        // Kita paksa baca dari tanggal 1 agar kalkulasi bulan tidak pernah meleset
        $dateObj = Carbon::parse($monthQuery . '-01');

        $startOfMonth = $dateObj->copy()->startOfMonth()->format('Y-m-d');
        $endOfMonth = $dateObj->copy()->endOfMonth()->format('Y-m-d');

        // --- QUERY DATABASE ---
        $habits = Habit::where('user_id', $user->id)
            ->where('period', $monthQuery)
            ->with(['logs' => fn ($q) => $q->whereBetween('date', [$startOfMonth, $endOfMonth])])
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

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Habit created successfully',
                'data' => new HabitResource($habit)
            ], 201);
        }

        return back();
    }

    /**
     * Update Habit (Edit Nama/Target)
     */
    public function update(UpdateHabitRequest $request, Habit $habit)
    {
        $this->authorize('update', $habit);

        $habit->update($request->validated());

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
     */
    public function storeLog(LogHabitRequest $request, Habit $habit)
    {
        $this->authorize('log', $habit);

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

        // 🔥 PERBAIKAN 2: Mencegah user mem-paste data berulang-ulang (Jebakan Duplikasi)
        $alreadyHasHabits = Habit::where('user_id', Auth::id())
            ->where('period', $request->current_period)
            ->exists();

        if ($alreadyHasHabits) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Habit bulan ini sudah ada!'], 400);
            }
            // Kembalikan error agar frontend Inertia bisa memunculkan toast notification
            return back()->with('error', 'Habit untuk bulan ini sudah ada! Tidak bisa copy lagi.');
        }

        $oldHabits = Habit::where('user_id', Auth::id())
            ->where('period', $request->prev_period)
            ->get();

        $newHabits = [];
        $now = Carbon::now();

        foreach ($oldHabits as $old) {
            $newHabits[] = [
                'user_id' => Auth::id(),
                'period' => $request->current_period,
                'name' => $old->name,
                'icon' => $old->icon,
                'color' => $old->color,
                'monthly_target' => $old->monthly_target,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        if (!empty($newHabits)) {
            Habit::insert($newHabits); // Tetap pertahankan Bulk Insert ini, sangat kencang!
        }

        $count = count($newHabits);

        if ($request->wantsJson()) {
            return response()->json(['message' => "$count habits copied successfully"]);
        }

        return back()->with('success', "$count habits berhasil disalin!");
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