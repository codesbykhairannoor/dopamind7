<?php

namespace App\Services;

use App\Models\CalendarEvent;
use App\Models\Journal;
use App\Models\FinanceTransaction;
use App\Models\PlannerTask;
use App\Models\HabitLog;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CalendarService
{
    /**
     * Mengumpulkan semua rekap data kalender (Events, Journals, Finances, Planners, Habits)
     *
     * Cache dihapus — data kalender sering berubah (tambah event, log habit, dll)
     * dan cache 1 jam menyebabkan bulan sebelumnya tampil data stale.
     */
    public function getMonthlyDashboardData(int $userId, string $monthQuery, string $timezone): array
    {
        try {
            $activeDate = Carbon::parse($monthQuery . '-01')->timezone($timezone);
        } catch (\Exception $e) {
            $activeDate = now()->timezone($timezone);
        }

        $startDate = $activeDate->copy()->startOfMonth()->format('Y-m-d');
        $endDate   = $activeDate->copy()->endOfMonth()->format('Y-m-d');

        // Events
        $events = CalendarEvent::ofUser($userId)
            ->overlappingMonth($startDate, $endDate)
            ->orderBy('start_date', 'asc')
            ->get();

        // Jurnal — key by date string
        $journals = Journal::where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate])
            ->select('id', 'date', 'title', 'mood')
            ->get()
            ->mapWithKeys(fn($item) => [Carbon::parse($item->date)->format('Y-m-d') => $item]);

        // Keuangan — aggregate expense per hari
        $finances = FinanceTransaction::where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate])
            ->where('type', 'expense')
            ->selectRaw('date, SUM(amount) as total_expense')
            ->groupBy('date')
            ->pluck('total_expense', 'date');

        // Planner — task count per hari
        $planners = PlannerTask::where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate])
            ->select(
                'date',
                DB::raw('COUNT(id) as total_tasks'),
                DB::raw("SUM(CASE WHEN is_completed = true THEN 1 ELSE 0 END) as completed_tasks")
            )
            ->groupBy('date')
            ->get()
            ->mapWithKeys(fn($item) => [
                Carbon::parse($item->date)->format('Y-m-d') => [
                    'total_tasks'      => (int) $item->total_tasks,
                    'completed_tasks'  => (int) $item->completed_tasks,
                ]
            ]);

        // Habit logs — completed count per hari
        $habits = HabitLog::join('habits', 'habit_logs.habit_id', '=', 'habits.id')
            ->where('habits.user_id', $userId)
            ->whereBetween('habit_logs.date', [$startDate, $endDate])
            ->where('habit_logs.status', 'completed')
            ->selectRaw('habit_logs.date, COUNT(habit_logs.id) as completed_habits')
            ->groupBy('habit_logs.date')
            ->pluck('completed_habits', 'habit_logs.date')
            ->toArray();

        // Goal Milestones
        $milestones = \App\Models\GoalMilestone::join('goals', 'goal_milestones.goal_id', '=', 'goals.id')
            ->where('goals.user_id', $userId)
            ->whereBetween('goal_milestones.target_date', [$startDate, $endDate])
            ->select('goal_milestones.*', 'goals.title as goal_title', 'goals.color as goal_color')
            ->get()
            ->map(function ($m) {
                $m->is_completed = (bool) $m->completed;
                return $m;
            })
            ->groupBy(fn($m) => Carbon::parse($m->target_date)->format('Y-m-d'));

        return [
            'currentMonth' => $activeDate->format('Y-m'),
            'events'       => $events,
            'journals'     => $journals,
            'finances'     => $finances,
            'planners'     => $planners,
            'habits'       => $habits,
            'milestones'   => $milestones,
        ];
    }
}