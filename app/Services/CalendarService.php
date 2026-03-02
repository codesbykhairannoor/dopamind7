<?php

namespace App\Services;

use App\Models\CalendarEvent;
use App\Models\Journal;
use App\Models\FinanceTransaction;
use App\Models\PlannerTask;
use App\Models\HabitLog;
use Carbon\Carbon;

class CalendarService
{
    /**
     * Mengumpulkan semua rekap data kalender (Events, Journals, Finances, Planners, Habits)
     */
    public function getMonthlyDashboardData(int $userId, string $monthQuery, string $timezone): array
    {
        // 1. Tentukan rentang waktu dengan aman (Try-Catch untuk perlindungan ekstra)
        try {
            $activeDate = Carbon::parse($monthQuery . '-01')->timezone($timezone);
        } catch (\Exception $e) {
            $activeDate = now()->timezone($timezone);
        }

        $startDate = $activeDate->copy()->startOfMonth()->format('Y-m-d');
        $endDate = $activeDate->copy()->endOfMonth()->format('Y-m-d');

        // 2. Ambil Events (menggunakan Model Scope)
        $events = CalendarEvent::ofUser($userId)
            ->overlappingMonth($startDate, $endDate)
            ->orderBy('start_date', 'asc')
            ->get();

        // 3. Ambil Jurnal
        $journals = Journal::where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate])
            ->get(['id', 'date', 'title', 'mood'])
            ->mapWithKeys(fn ($item) => [Carbon::parse($item->date)->format('Y-m-d') => $item]);

        // 4. Ambil Keuangan
        $finances = FinanceTransaction::where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate])
            ->where('type', 'expense')
            ->selectRaw('date, SUM(amount) as total_expense')
            ->groupBy('date')
            ->pluck('total_expense', 'date'); 

        // 5. Ambil Planner
        $planners = PlannerTask::where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate])
            ->selectRaw("date, COUNT(*) as total_tasks, SUM(CASE WHEN is_completed = true THEN 1 ELSE 0 END) as completed_tasks")
            ->groupBy('date')
            ->get()
            ->mapWithKeys(fn ($item) => [
                Carbon::parse($item->date)->format('Y-m-d') => [
                    'total_tasks' => (int) $item->total_tasks,
                    'completed_tasks' => (int) $item->completed_tasks,
                ]
            ]);
        // 6. Ambil Habit
        $habits = HabitLog::selectRaw('date, COUNT(*) as completed_habits')
            ->whereIn('habit_id', fn ($query) => $query->select('id')->from('habits')->where('user_id', $userId))
            ->whereBetween('date', [$startDate, $endDate])
            ->where('status', 'completed')
            ->groupBy('date')
            ->pluck('completed_habits', 'date')
            ->toArray();

        return [
            'currentMonth' => $activeDate->format('Y-m'),
            'events'       => $events,
            'journals'     => $journals,
            'finances'     => $finances,
            'planners'     => $planners,
            'habits'       => $habits,
        ];
    }
}