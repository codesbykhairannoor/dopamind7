<?php

namespace App\Services;

use App\Models\CalendarEvent;
use App\Models\Journal;
use App\Models\FinanceTransaction;
use App\Models\PlannerTask;
use App\Models\Habit;
use Carbon\Carbon;

class DashboardService
{
    public function getTodaySynergy(int $userId, string $timezone): array
    {
        $now = now()->timezone($timezone);
        $todayStr = $now->format('Y-m-d');
        $currentMonth = $now->format('Y-m');

        // 1. Data Habit Hari Ini
        $habits = Habit::where('user_id', $userId)
            ->where('period', $currentMonth)
            ->with(['logs' => fn($q) => $q->where('date', $todayStr)])
            ->get();
        
        $totalHabits = $habits->count();
        $completedHabits = $habits->filter(fn($h) => $h->logs->where('status', 'completed')->isNotEmpty())->count();

        // 2. Data Planner Hari Ini
        $tasks = PlannerTask::where('user_id', $userId)->where('date', $todayStr)->orderBy('start_time')->get();
        $totalTasks = $tasks->count();
        $completedTasks = $tasks->where('is_completed', true)->count();
        $upcomingTasks = $tasks->where('is_completed', false)->take(3)->values(); // Ambil 3 tugas belum selesai

        // 3. Data Finance Hari Ini
        $finances = FinanceTransaction::where('user_id', $userId)->where('date', $todayStr)->get();
        $todayExpense = $finances->where('type', 'expense')->sum('amount');
        $todayIncome = $finances->where('type', 'income')->sum('amount');

        // 4. Data Journal Hari Ini
        $journal = Journal::where('user_id', $userId)->where('date', $todayStr)->first();

        // 5. Event Kalender Hari Ini
        $events = CalendarEvent::where('user_id', $userId)
            ->where('start_date', '<=', $todayStr)
            ->where(fn($q) => $q->where('end_date', '>=', $todayStr)->orWhereNull('end_date'))
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
            'events' => $events->take(2), // Tampilkan maks 2 event terdekat
        ];
    }
}