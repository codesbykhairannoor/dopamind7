<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use App\Models\Journal;
use App\Models\FinanceTransaction;
use App\Models\PlannerTask;
use App\Models\HabitLog;

// 🔥 IMPORT REQUEST DAN RESOURCE YANG BARU DIBUAT
use App\Http\Requests\StoreCalendarEventRequest;
use App\Http\Requests\UpdateCalendarEventRequest;
use App\Http\Resources\CalendarEventResource;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        $activeDate = $request->query('month') ? Carbon::parse($request->query('month')) : now();
        $startDate = $activeDate->copy()->startOfMonth()->format('Y-m-d');
        $endDate = $activeDate->copy()->endOfMonth()->format('Y-m-d');

        // ==========================================
        // 🔥 AGREGASI DATA DALAM 1 BULAN (SUPER FAST)
        // ==========================================

        // 1. Ambil Events 
        $events = CalendarEvent::where('user_id', $user->id)
            ->where(function($query) use ($startDate, $endDate) {
                $query->where('start_date', '<=', $endDate)
                      ->where(function($q) use ($startDate) {
                          $q->where('end_date', '>=', $startDate)
                            ->orWhereNull('end_date');
                      });
            })
            ->orderBy('start_date', 'asc')
            ->get();

        // 2. Ambil Jurnal 
        $journals = Journal::where('user_id', $user->id)
            ->whereBetween('date', [$startDate, $endDate])
            ->get(['id', 'date', 'title', 'mood'])
            ->mapWithKeys(function ($item) {
                return [Carbon::parse($item->date)->format('Y-m-d') => $item];
            });

        // 3. Ambil Rangkuman Pengeluaran (Finance)
        $finances = FinanceTransaction::where('user_id', $user->id)
            ->whereBetween('date', [$startDate, $endDate])
            ->where('type', 'expense')
            ->selectRaw('date, SUM(amount) as total_expense')
            ->groupBy('date')
            ->pluck('total_expense', 'date'); 

        // 4. Ambil Rangkuman Tugas (Planner) - 🔥 FIXED UNTUK POSTGRESQL (RAILWAY)
        $planners = PlannerTask::where('user_id', $user->id)
            ->whereBetween('date', [$startDate, $endDate])
            ->selectRaw("date, COUNT(*) as total_tasks, SUM(CASE WHEN is_completed = true THEN 1 ELSE 0 END) as completed_tasks")
            ->groupBy('date')
            ->get()
            ->mapWithKeys(function ($item) {
                return [
                    Carbon::parse($item->date)->format('Y-m-d') => [
                        'total_tasks' => (int) $item->total_tasks,
                        'completed_tasks' => (int) $item->completed_tasks,
                    ]
                ];
            });

        // 5. Ambil Rangkuman Habit Selesai - 🔥 FIXED DENGAN toArray()
        $habits = HabitLog::selectRaw('date, COUNT(*) as completed_habits')
            ->whereIn('habit_id', function ($query) use ($user) {
                $query->select('id')->from('habits')->where('user_id', $user->id);
            })
            ->whereBetween('date', [$startDate, $endDate])
            ->where('status', 'completed')
            ->groupBy('date')
            ->pluck('completed_habits', 'date')
            ->toArray();

        // ==========================================
        // Return Data ke Vue via Inertia
        // ==========================================
        return Inertia::render('Calendar/Index', [
            'currentMonth' => $activeDate->format('Y-m'),
            'data' => [
                'events' => CalendarEventResource::collection($events)->resolve(),
                'journals' => $journals,
                'finances' => $finances,
                'planners' => $planners,
                'habits' => $habits, 
            ]
        ]);
    }

    // --- CRUD KHUSUS CALENDAR EVENT (SKINNY CONTROLLER!) ---

    public function storeEvent(StoreCalendarEventRequest $request)
    {
        // Langsung tangkap data yang sudah divalidasi oleh Request Class
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();
        
        CalendarEvent::create($validated);

        return back();
    }

    public function updateEvent(UpdateCalendarEventRequest $request, $id)
    {
        $event = CalendarEvent::where('user_id', Auth::id())->findOrFail($id);
        
        // Langsung update dengan data yang sudah bersih
        $event->update($request->validated());

        return back();
    }

    public function destroyEvent($id)
    {
        $event = CalendarEvent::where('user_id', Auth::id())->findOrFail($id);
        $event->delete();

        return back();
    }
}