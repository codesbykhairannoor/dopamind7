<?php

namespace App\Services;

class DashboardService
{
    public function getTodaySynergy(int $userId, string $timezone): array
    {
        $now = now()->timezone($timezone);
        $todayStr = $now->format('Y-m-d');
        $currentMonth = $now->format('Y-m');

        // 1. Habit Stats (Optimized Join)
        $habitStats = \App\Models\Habit::where('user_id', $userId)
            ->where('period', $currentMonth)
            ->withCount(['logs as completed_count' => function($q) use ($todayStr) {
                $q->where('date', $todayStr)->where('status', 'completed');
            }])
            ->get();

        $totalHabits = $habitStats->count();
        $completedHabits = $habitStats->sum('completed_count');

        // 2. Planner Tasks (Single Query)
        $tasks = \App\Models\PlannerTask::where('user_id', $userId)
            ->where('date', $todayStr)
            ->orderBy('start_time', 'asc')
            ->get();
        
        $totalTasks = $tasks->count();
        $completedTasks = $tasks->where('is_completed', true)->count();
        $upcomingTasks = $tasks->where('is_completed', false)->take(3)->values();

        // 3. Finances (Optimized Aggregate)
        $financeStats = \App\Models\FinanceTransaction::where('user_id', $userId)
            ->where('date', $todayStr)
            ->select('type', \DB::raw('SUM(amount) as total'))
            ->groupBy('type')
            ->pluck('total', 'type');

        // 4. Journal & Events
        $journal = \App\Models\Journal::where('user_id', $userId)->where('date', $todayStr)->first();
        $events = \App\Models\CalendarEvent::where('user_id', $userId)
            ->where('start_date', '<=', $todayStr)
            ->where(function($q) use ($todayStr) {
                $q->where('end_date', '>=', $todayStr)->orWhereNull('end_date');
            })->take(2)->get();

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
                'expense' => (float) ($financeStats['expense'] ?? 0),
                'income'  => (float) ($financeStats['income'] ?? 0),
            ],
            'journal' => [
                'is_written' => (bool) $journal,
                'mood'       => $journal ? $journal->mood : null,
                'id'         => $journal ? $journal->id : null,
            ],
            'events' => $events,
        ];
    }

    public function getWeeklyTrend(int $userId, string $timezone): array
    {
        $startDate = \Carbon\Carbon::now($timezone)->subDays(6)->startOfDay();
        $endDate = \Carbon\Carbon::now($timezone)->endOfDay();
        
        // 1. Fetch all needed data in bulk
        $habits = \App\Models\Habit::where('user_id', $userId)
            ->whereIn('period', [
                $startDate->format('Y-m'),
                $endDate->format('Y-m')
            ])->get();

        $habitLogs = \App\Models\HabitLog::whereIn('habit_id', $habits->pluck('id'))
            ->whereBetween('date', [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')])
            ->where('status', 'completed')
            ->get()
            ->groupBy('date');

        $plannerTasks = \App\Models\PlannerTask::where('user_id', $userId)
            ->whereBetween('date', [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')])
            ->get()
            ->groupBy('date');

        $trend = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = \Carbon\Carbon::now($timezone)->subDays($i);
            $dateStr = $date->format('Y-m-d');
            $month = $date->format('Y-m');

            // Habits Score
            $habitsInMonth = $habits->where('period', $month);
            $totalHabits = $habitsInMonth->count();
            $completedHabits = isset($habitLogs[$dateStr]) ? $habitLogs[$dateStr]->count() : 0;
            $habitScore = $totalHabits > 0 ? ($completedHabits / $totalHabits) * 100 : 0;

            // Planner Score
            $dayTasks = $plannerTasks->get($dateStr, collect());
            $totalTasks = $dayTasks->count();
            $completedTasks = $dayTasks->where('is_completed', true)->count();
            $plannerScore = $totalTasks > 0 ? ($completedTasks / $totalTasks) * 100 : 0;

            $trend[] = [
                'score' => round(($habitScore + $plannerScore) / 2),
                'day' => $date->translatedFormat('D'),
            ];
        }
        return $trend;
    }
}
