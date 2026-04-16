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

        // 4. Journal (Simple existence check)
        $journal = \App\Models\Journal::where('user_id', $userId)
            ->where('date', $todayStr)
            ->select('id', 'mood')
            ->first();

        // 5. Calendar Events
        $events = \App\Models\CalendarEvent::where('user_id', $userId)
            ->where('start_date', '<=', $todayStr)
            ->where(function($q) use ($todayStr) {
                $q->where('end_date', '>=', $todayStr)->orWhereNull('end_date');
            })
            ->select('id', 'title', 'start_time')
            ->take(2)
            ->get();

        // 6. Goals & Jobs (Consolidated Goal query)
        $topGoal = \App\Models\Goal::where('user_id', $userId)
            ->where('status', 'active')
            ->withCount(['milestones as completed_milestones' => fn($q) => $q->where('completed', \DB::raw('true'))])
            ->withCount('milestones as total_milestones')
            ->first();

        // Separate count for active goals to keep it simple but fast
        $goalsCount = \App\Models\Goal::where('user_id', $userId)->where('status', 'active')->count();

        $activeJobsCount = \App\Models\Job::where('user_id', $userId)->whereIn('status', ['applied', 'interviewing'])->count();
        $upcomingInterviews = \App\Models\Job::where('user_id', $userId)->where('status', 'interviewing')->take(2)->get();

        return [
            'date_formatted' => $now->translatedFormat('l, d F Y'),
            'habits' => [
                'total'     => $totalHabits,
                'completed' => (int) $completedHabits,
                'percent'   => $totalHabits > 0 ? round(($completedHabits / $totalHabits) * 100) : 0,
            ],
            'planner' => [
                'total'     => $totalTasks,
                'completed' => (int) $completedTasks,
                'percent'   => $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0,
                'upcoming'  => $upcomingTasks,
            ],
            'finance' => [
                'expense' => (float) ($financeStats['expense'] ?? 0),
                'income'  => (float) ($financeStats['income'] ?? 0),
            ],
            'journal' => [
                'is_written' => (bool) $journal,
                'mood'       => $journal?->mood,
                'id'         => $journal?->id,
            ],
            'goals' => [
                'active' => $goalsCount,
                'top_goal' => $topGoal ? [
                    'title' => $topGoal->title,
                    'percent' => $topGoal->total_milestones > 0 ? round(($topGoal->completed_milestones / $topGoal->total_milestones) * 100) : 0,
                ] : null,
            ],
            'jobs' => [
                'active' => $activeJobsCount,
                'interviews' => $upcomingInterviews->count(),
            ],
            'events' => $events,
        ];
    }

    public function getWeeklyTrend(int $userId, string $timezone): array
    {
        $startDate = \Carbon\Carbon::now($timezone)->subDays(6)->startOfDay();
        $startDateStr = $startDate->format('Y-m-d');
        $endDateStr = \Carbon\Carbon::now($timezone)->endOfDay()->format('Y-m-d');
        
        // 1. Fetch Habit Stats per day using SQL Aggregation (Much faster than loops)
        $habitStats = \DB::table('habit_logs')
            ->join('habits', 'habit_logs.habit_id', '=', 'habits.id')
            ->where('habits.user_id', $userId)
            ->whereBetween('habit_logs.date', [$startDateStr, $endDateStr])
            ->where('habit_logs.status', 'completed')
            ->select('habit_logs.date', \DB::raw('count(*) as completed_count'))
            ->groupBy('habit_logs.date')
            ->pluck('completed_count', 'date');

        // Get total active habits per month for these dates
        // (Assuming total habits don't change drastically within the week, 
        // using a simple count for the current user's active habits)
        $totalActiveHabits = \App\Models\Habit::where('user_id', $userId)
            ->where('is_archived', 'false')
            ->count();

        // 2. Fetch Planner Stats per day using SQL Aggregation
        $plannerStats = \DB::table('planner_tasks')
            ->where('user_id', $userId)
            ->whereBetween('date', [$startDateStr, $endDateStr])
            ->select('date', 
                \DB::raw('count(*) as total'),
                \DB::raw('sum(case when is_completed = true then 1 else 0 end) as completed')
            )
            ->groupBy('date')
            ->get()
            ->keyBy('date');

        $trend = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = \Carbon\Carbon::now($timezone)->subDays($i);
            $dateStr = $date->format('Y-m-d');

            // Habits Score
            $completedHabits = $habitStats->get($dateStr, 0);
            $habitScore = $totalActiveHabits > 0 ? ($completedHabits / $totalActiveHabits) * 100 : 0;

            // Planner Score
            $dayPlanner = $plannerStats->get($dateStr);
            $plannerScore = 0;
            if ($dayPlanner && $dayPlanner->total > 0) {
                $plannerScore = ($dayPlanner->completed / $dayPlanner->total) * 100;
            }

            $trend[] = [
                'score' => (int) round(($habitScore + $plannerScore) / 2),
                'day' => $date->translatedFormat('D'),
            ];
        }
        return $trend;
    }
}
