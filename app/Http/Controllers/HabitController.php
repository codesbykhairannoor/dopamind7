<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexHabitRequest;
use App\Http\Requests\LogHabitRequest;   
use App\Http\Requests\StoreHabitRequest; 
use App\Http\Requests\UpdateHabitRequest; 
use App\Http\Resources\HabitResource;
use App\Models\Habit;
use App\Models\Mood;
use App\Services\HabitService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HabitController extends Controller
{
    use AuthorizesRequests;

    public function __construct(private HabitService $habitService) 
    {
        // Service di-inject secara otomatis oleh Laravel
    }

    public function index(IndexHabitRequest $request)
    {
        $user = Auth::user();
        $timezone = $user->timezone ?? 'Asia/Jakarta';
        
        // 1. Ambil perhitungan tanggal yang sudah bersih dari Request Class
        $dates = $request->getMonthData($timezone);

        // 2. Tarik Data menggunakan Model Scopes (Sangat Terbaca / Human Readable)
        $habits = Habit::ofUser($user->id)
            ->forPeriod($dates['query'])
            ->ordered()
            ->withLogStats($dates['start'], $dates['end'])
            ->get();

        $dataResource = HabitResource::collection($habits);

        if ($request->wantsJson()) return $dataResource;

        return Inertia::render('Habits/Index', [
            'habits' => $dataResource,
            'currentMonth' => $dates['translated'],
            'monthQuery' => $dates['query'],
            'hasPrevHabits' => Habit::ofUser($user->id)->forPeriod($dates['prev'])->exists(),
            'prevMonthQuery' => $dates['prev'],
            'savedMood' => Mood::where('user_id', $user->id)->where('period', $dates['query'])->value('mood_code'),
        ]);
    }

    public function store(StoreHabitRequest $request)
    {
        $user = Auth::user();
        
        if ($user->isExplorer()) {
            $count = Habit::ofUser($user->id)->forPeriod($request->period)->count();
            if ($count >= 5) {
                if ($request->wantsJson()) {
                    return response()->json(['message' => 'Explorer limit reached. Only 5 habits allowed.'], 403);
                }
                return back()->with('error', 'Explorer limit reached (max 5 habits). Upgrade to Architect to add more!');
            }
        }

        $habit = $this->habitService->createHabit($user->id, $request->validated());

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Habit created', 'data' => new HabitResource($habit)], 201);
        }
        return back();
    }

    public function update(UpdateHabitRequest $request, Habit $habit)
    {
        $this->authorize('update', $habit);
        $habit->update($request->validated());

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Habit updated', 'data' => new HabitResource($habit)]);
        }
        return back();
    }

    public function destroy(Habit $habit)
    {
        $this->authorize('delete', $habit);
        $habit->delete();

        if (request()->wantsJson()) return response()->json(['message' => 'Habit deleted'], 200);
        return back();
    }

    public function storeLog(LogHabitRequest $request, Habit $habit)
    {
        $this->authorize('log', $habit);
        $this->habitService->logHabit($habit, $request->date, $request->status);

        if ($request->wantsJson()) return response()->json(['message' => 'Log updated']);
        return back();
    }

    public function copyFromPrevious(Request $request)
    {
        $request->validate([
            'current_period' => 'required|date_format:Y-m',
            'prev_period' => 'required|date_format:Y-m',
        ]);

        try {
            $count = $this->habitService->copyFromPreviousMonth(
                Auth::id(), 
                $request->prev_period, 
                $request->current_period, 
                Auth::user()->timezone ?? 'Asia/Jakarta'
            );

            if ($request->wantsJson()) return response()->json(['message' => "$count habits copied"]);
            return back()->with('success', "$count habits berhasil disalin!");

        } catch (\Exception $e) {
            if ($request->wantsJson()) return response()->json(['message' => $e->getMessage()], 400);
            return back()->with('error', $e->getMessage());
        }
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

        $user = Auth::user();
        if ($user->isExplorer()) {
            $currentCount = Habit::ofUser($user->id)->forPeriod($request->period)->count();
            $newCount = count($request->habits);
            
            if (($currentCount + $newCount) > 5) {
                if ($request->wantsJson()) {
                    return response()->json(['message' => 'Explorer limit exceeded. Maximum 5 habits total.'], 403);
                }
                return back()->with('error', 'Explorer limit exceeded. You can only have 5 habits total.');
            }
        }

        $this->habitService->batchStore($user->id, $request->period, $request->habits, $user->timezone ?? 'Asia/Jakarta');

        if ($request->wantsJson()) return response()->json(['message' => 'Batch habits saved.']);
        return back()->with('success', 'Habit berhasil ditambahkan secara massal!');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'habits' => 'required|array',
            'habits.*.id' => 'required|exists:habits,id',
            'habits.*.position' => 'required|integer',
        ]);

        $this->habitService->reorder(Auth::id(), $request->habits);
        return response()->json(['message' => 'Urutan disimpan']);
    }

    public function batchLog(Request $request)
    {
        $request->validate([
            'logs' => 'required|array',
            'logs.*.habit_id' => 'required|exists:habits,id',
            'logs.*.date' => 'required|date',
            'logs.*.status' => 'required|string'
        ]);

        $this->habitService->batchLog(Auth::id(), $request->logs);
        return response()->json(['message' => 'Batch logs updated!']);
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

        if ($request->wantsJson()) return response()->json(['message' => 'Mood saved', 'data' => $mood]);
        return back();
    }
}