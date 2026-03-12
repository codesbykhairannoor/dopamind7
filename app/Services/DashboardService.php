<?php

namespace App\Services;

use App\Models\CalendarEvent;
use App\Models\Journal;
use App\Models\FinanceTransaction;
use App\Models\PlannerTask;
use App\Models\Habit;
use App\Models\HabitLog; // 🔥 Wajib import HabitLog
use Carbon\Carbon;

class DashboardService
{
    public function getTodaySynergy(int $userId, string $timezone): array
    {
        $now = now()->timezone($timezone);
        $todayStr = $now->format('Y-m-d');
        $currentMonth = $now->format('Y-m');

        // ==========================================
        // 1. DATA HABIT HARI INI (TEKNIK CALENDAR SERVICE)
        // ==========================================
        
        // Hitung total target habit bulan ini
        $totalHabits = Habit::where('user_id', $userId)
            ->where('period', $currentMonth)
            ->count();

        // Hitung yang SELESAI HARI INI pakai teknik JOIN persis seperti CalendarService!
        $completedHabits = HabitLog::join('habits', 'habit_logs.habit_id', '=', 'habits.id')
            ->where('habits.user_id', $userId)
            ->where('habits.period', $currentMonth) // Filter ke habit bulan ini saja
            ->where('habit_logs.date', $todayStr)   // Tanggal hari ini
            ->where('habit_logs.status', 'completed')
            ->count('habit_logs.id');

        // ==========================================
        // 2. DATA PLANNER HARI INI
        // ==========================================
        $tasks = PlannerTask::where('user_id', $userId)
            ->where('date', $todayStr)
            ->orderBy('start_time')
            ->get();
            
        $totalTasks = $tasks->count();
        
        // Memaksa boolean agar aman di PostgreSQL/MySQL
        $completedTasks = $tasks->filter(function($t) {
            return filter_var($t->is_completed, FILTER_VALIDATE_BOOLEAN);
        })->count();
        
        $upcomingTasks = $tasks->filter(function($t) {
            return !filter_var($t->is_completed, FILTER_VALIDATE_BOOLEAN);
        })->take(3)->values();

        // ==========================================
        // 3. DATA FINANCE HARI INI
        // ==========================================
        $finances = FinanceTransaction::where('user_id', $userId)->where('date', $todayStr)->get();
        $todayExpense = $finances->where('type', 'expense')->sum('amount');
        $todayIncome = $finances->where('type', 'income')->sum('amount');

        // ==========================================
        // 4. DATA JOURNAL HARI INI
        // ==========================================
        $journal = Journal::where('user_id', $userId)->where('date', $todayStr)->first();

        // ==========================================
        // 5. EVENT KALENDER HARI INI
        // ==========================================
        $events = CalendarEvent::where('user_id', $userId)
            ->where('start_date', '<=', $todayStr)
            ->where(function($q) use ($todayStr) {
                $q->where('end_date', '>=', $todayStr)->orWhereNull('end_date');
            })
            ->get();

        return [
            'date_formatted' => $now->translatedFormat('l, d F Y'),
            'habits' => [
                'total'     => $totalHabits,
                'completed' => $completedHabits,
                'percent'   => $totalHabits > 0 ? round(($completedHabits / $totalHabits) * 100) : 0,
            ],
            'planner' => [
                'total'     => $totalTasks,
                'completed' => $completedTasks,
                'percent'   => $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0,
                'upcoming'  => $upcomingTasks,
            ],
            'finance' => [
                'expense' => (float) $todayExpense,
                'income'  => (float) $todayIncome,
            ],
            'journal' => [
                'is_written' => (bool) $journal,
                'mood'       => $journal ? $journal->mood : null,
                'id'         => $journal ? $journal->id : null,
            ],
            'events' => $events->take(2),
        ];
    }
}