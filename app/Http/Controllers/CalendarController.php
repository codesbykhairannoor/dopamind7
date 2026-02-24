<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use App\Models\Journal;
use App\Models\FinanceTransaction;
use App\Models\PlannerTask;
use App\Models\HabitLog; // 🔥 IMPORT HABIT DI SINI
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
                $query->whereBetween('start_date', [$startDate, $endDate])
                      ->orWhereBetween('end_date', [$startDate, $endDate]);
            })
            ->orderBy('start_date', 'asc')
            ->get();

        // 2. Ambil Jurnal 
        $journals = Journal::where('user_id', $user->id)
            ->whereBetween('date', [$startDate, $endDate])
            ->get(['id', 'date', 'title', 'mood'])
            ->keyBy('date'); 

        // 3. Ambil Rangkuman Pengeluaran (Finance)
        $finances = FinanceTransaction::where('user_id', $user->id)
            ->whereBetween('date', [$startDate, $endDate])
            ->where('type', 'expense')
            ->selectRaw('date, SUM(amount) as total_expense')
            ->groupBy('date')
            ->pluck('total_expense', 'date'); 

        // 4. Ambil Rangkuman Tugas (Planner)
        $planners = PlannerTask::where('user_id', $user->id)
            ->whereBetween('date', [$startDate, $endDate])
            ->selectRaw('date, COUNT(*) as total_tasks, SUM(is_completed) as completed_tasks')
            ->groupBy('date')
            ->get()
            ->keyBy('date');

        // 5. 🔥 Ambil Rangkuman Habit Selesai
        // Menghitung berapa habit yang statusnya 'completed' per hari
        $habits = HabitLog::selectRaw('date, COUNT(*) as completed_habits')
            ->whereIn('habit_id', function ($query) use ($user) {
                $query->select('id')->from('habits')->where('user_id', $user->id);
            })
            ->whereBetween('date', [$startDate, $endDate])
            ->where('status', 'completed')
            ->groupBy('date')
            ->pluck('completed_habits', 'date');

        // ==========================================
        // Return Data ke Vue via Inertia
        // ==========================================
        return Inertia::render('Calendar/Index', [
            'currentMonth' => $activeDate->format('Y-m'),
            'data' => [
                'events' => $events,
                'journals' => $journals,
                'finances' => $finances,
                'planners' => $planners,
                'habits' => $habits, // 🔥 KIRIM DATA HABIT KE VUE
            ]
        ]);
    }

    // --- CRUD KHUSUS CALENDAR EVENT ---

    public function storeEvent(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'nullable|string',
            'color' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_all_day' => 'boolean',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
        ]);

        $validated['user_id'] = Auth::id();
        CalendarEvent::create($validated);

        return back();
    }

    public function updateEvent(Request $request, $id)
    {
        $event = CalendarEvent::where('user_id', Auth::id())->findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'nullable|string',
            'color' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_all_day' => 'boolean',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
        ]);

        $event->update($validated);

        return back();
    }

    public function destroyEvent($id)
    {
        $event = CalendarEvent::where('user_id', Auth::id())->findOrFail($id);
        $event->delete();

        return back();
    }
}