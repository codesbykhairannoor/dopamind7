<?php
namespace App\Services;
class DashboardService
{
    public function getTodaySynergy(int $userId, string $timezone): array
    {
        $now = now()->timezone($timezone);
        $todayStr = $now->format('Y-m-d');
        $currentMonth = $now->format('Y-m');

        $totalHabits = \App\Models\Habit::where('user_id', $userId)->where('period', $currentMonth)->count();
        $completedHabits = \App\Models\HabitLog::join('habits', 'habit_logs.habit_id', '=', 'habits.id')
            ->where('habits.user_id', $userId)
            ->where('habits.period', $currentMonth) 
            ->where('habit_logs.date', $todayStr)   
            ->where('habit_logs.status', 'completed')
            ->count('habit_logs.id');

        $tasks = \App\Models\PlannerTask::where('user_id', $userId)->where('date', $todayStr)->orderBy('start_time')->get();
        $totalTasks = $tasks->count();
        $completedTasks = $tasks->filter(fn($t) => filter_var($t->is_completed, \FILTER_VALIDATE_BOOLEAN))->count();
        $upcomingTasks = $tasks->filter(fn($t) => !filter_var($t->is_completed, \FILTER_VALIDATE_BOOLEAN))->take(3)->values();

        $finances = \App\Models\FinanceTransaction::where('user_id', $userId)->where('date', $todayStr)->get();
        $todayExpense = $finances->where('type', 'expense')->sum('amount');
        $todayIncome = $finances->where('type', 'income')->sum('amount');

        $journal = \App\Models\Journal::where('user_id', $userId)->where('date', $todayStr)->first();

        $events = \App\Models\CalendarEvent::where('user_id', $userId)
            ->where('start_date', '<=', $todayStr)
            ->where(function($q) use ($todayStr) {
                $q->where('end_date', '>=', $todayStr)->orWhereNull('end_date');
            })->get();

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
{
    public function getWeeklyTrend(int $userId, string $timezone): array
    {
        $trend = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = \Carbon\Carbon::now($timezone)->subDays($i);
            $dateStr = $date->format('Y-m-d');
            $month = $date->format('Y-m');

            $totalHabits = \App\Models\Habit::where('user_id', $userId)->where('period', $month)->count();
            $completedHabits = \App\Models\HabitLog::join('habits', 'habit_logs.habit_id', '=', 'habits.id')
                ->where('habits.user_id', $userId)
                ->where('habits.period', $month)
                ->where('habit_logs.date', $dateStr)
                ->where('habit_logs.status', 'completed')
                ->count();
            $habitScore = $totalHabits > 0 ? ($completedHabits / $totalHabits) * 100 : 0;

            $tasks = \App\Models\PlannerTask::where('user_id', $userId)->where('date', $dateStr)->get();
            $totalTasks = $tasks->count();
            $completedTasks = $tasks->filter(fn($t) => filter_var($t->is_completed, \FILTER_VALIDATE_BOOLEAN))->count();
            $plannerScore = $totalTasks > 0 ? ($completedTasks / $totalTasks) * 100 : 0;

            $trend[] = [
                'score' => round(($habitScore + $plannerScore) / 2),
                'day' => $date->translatedFormat('D'),
            ];
        }
        return $trend;
    }
}
