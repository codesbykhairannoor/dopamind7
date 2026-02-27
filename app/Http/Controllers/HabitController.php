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

    public function index(Request $request)
    {
        $user = Auth::user();
        $monthQuery = $request->input('month', Carbon::now()->format('Y-m'));
        
        $dateObj = Carbon::parse($monthQuery . '-01');
        $startOfMonth = $dateObj->copy()->startOfMonth()->format('Y-m-d');
        $endOfMonth = $dateObj->copy()->endOfMonth()->format('Y-m-d');

        $habits = Habit::where('user_id', $user->id)
            ->where('period', $monthQuery)
            ->with(['logs' => fn ($q) => $q->whereBetween('date', [$startOfMonth, $endOfMonth])])
            ->withCount(['logs as completed_count' => fn ($q) => $q->where('status', 'completed')])
            ->get();

        $dataResource = HabitResource::collection($habits);

        if ($request->wantsJson()) {
            return $dataResource;
        }

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

    public function copyFromPrevious(Request $request)
    {
        $request->validate([
            'current_period' => 'required|date_format:Y-m',
            'prev_period' => 'required|date_format:Y-m',
        ]);

        $alreadyHasHabits = Habit::where('user_id', Auth::id())
            ->where('period', $request->current_period)
            ->exists();

        if ($alreadyHasHabits) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Habit bulan ini sudah ada!'], 400);
            }
            return back()->with('error', 'Habit untuk bulan ini sudah ada! Tidak bisa copy lagi.');
        }

        $oldHabits = Habit::where('user_id', Auth::id())
            ->where('period', $request->prev_period)
            ->get();

        $newHabits = [];
        // 🔥 FIX 1: Konversi Object Carbon jadi String SQL
        $now = Carbon::now()->toDateTimeString(); 

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
            Habit::insert($newHabits);
        }

        $count = count($newHabits);
        if ($request->wantsJson()) {
            return response()->json(['message' => "$count habits copied successfully"]);
        }

        return back()->with('success', "$count habits berhasil disalin!");
    }

    public function destroy(Habit $habit)
    {
        $this->authorize('delete', $habit);
        $habit->delete();

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Habit deleted'], 200);
        }

        return back();
    }

    public function batchStore(Request $request)
    {
        $request->validate([
            'period' => 'required|date_format:Y-m',
            'habits' => 'required|array|min:1',
            'habits.*.name' => 'required|string|max:255',
            'habits.*.icon' => 'required|string',
            'habits.*.color' => 'required|string',
            'habits.*.monthly_target' => 'required|integer|min:1|max:31',
        ]);

        // 🔥 FIX 2: Konversi Object Carbon jadi String SQL
        $now = now()->toDateTimeString(); 
        $habitsData = [];

        foreach ($request->habits as $habit) {
            $habitsData[] = [
                'user_id' => Auth::id(),
                'period' => $request->period,
                'name' => $habit['name'],
                'icon' => $habit['icon'],
                'color' => $habit['color'],
                'monthly_target' => $habit['monthly_target'],
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        if (!empty($habitsData)) {
            Habit::insert($habitsData);
        }

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Batch habits saved successfully.']);
        }

        return back()->with('success', 'Habit berhasil ditambahkan secara massal!');
    }
}