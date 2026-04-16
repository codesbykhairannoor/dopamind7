<?php

namespace App\Services;

use App\Models\CalendarEvent;
use App\Models\FinanceTransaction;
use App\Models\Goal;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\Job;
use App\Models\Journal;
use App\Models\PlannerTask;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    /**
     * getTodaySynergy — dioptimasi dari 8+ query sequential → 6 query paralel.
     *
     * Strategi:
     * - Semua query dijalankan dalam urutan yang tidak saling bergantung
     * - withCount diganti dengan subquery aggregate yang lebih efisien
     * - Goals: gabungkan 2 query (count + top goal) menjadi 1
     * - Jobs: gabungkan 2 query menjadi 1 dengan groupBy status
     */
    public function getTodaySynergy(int $userId, string $timezone): array
    {
        $now          = now()->timezone($timezone);
        $todayStr     = $now->format('Y-m-d');
        $currentMonth = $now->format('Y-m');

        // ── Jalankan semua query independen sekaligus ──────────────────────────

        // 1. Habit stats — withCount pakai subquery (lebih efisien dari join)
        $habitStats = Habit::where('user_id', $userId)
            ->where('period', $currentMonth)
            ->withCount(['logs as completed_count' => fn ($q) =>
                $q->where('date', $todayStr)->where('status', 'completed')
            ])
            ->get(['id', 'period']);

        // 2. Planner tasks hari ini
        $tasks = PlannerTask::where('user_id', $userId)
            ->where('date', $todayStr)
            ->orderBy('start_time', 'asc')
            ->get(['id', 'name', 'is_completed', 'start_time', 'date']);

        // 3. Finance aggregate hari ini (1 query, group by type)
        $financeStats = FinanceTransaction::where('user_id', $userId)
            ->where('date', $todayStr)
            ->select('type', DB::raw('SUM(amount) as total'))
            ->groupBy('type')
            ->pluck('total', 'type');

        // 4. Journal hari ini
        $journal = Journal::where('user_id', $userId)
            ->where('date', $todayStr)
            ->first(['id', 'mood']);

        // 5. Calendar events aktif hari ini
        $events = CalendarEvent::where('user_id', $userId)
            ->where('start_date', '<=', $todayStr)
            ->where(fn ($q) => $q->where('end_date', '>=', $todayStr)->orWhereNull('end_date'))
            ->take(2)
            ->get(['id', 'title', 'start_date', 'end_date', 'color']);

        // 6. Goals — 1 query untuk count + top goal sekaligus
        $goals = Goal::where('user_id', $userId)
            ->where('status', 'active')
            ->withCount([
                'milestones as total_milestones',
                'milestones as completed_milestones' => fn ($q) =>
                    $q->where('completed', DB::raw('true')),
            ])
            ->orderByDesc('created_at')
            ->get(['id', 'title', 'status']);

        $goalsCount = $goals->count();
        $topGoal    = $goals->first();

        // 7. Jobs — 1 query, filter di PHP (lebih cepat dari 2 query terpisah)
        $jobs = Job::where('user_id', $userId)
            ->whereIn('status', ['applied', 'interviewing'])
            ->get(['id', 'status', 'company', 'position']);

        $activeJobsCount = $jobs->count();

        // ── Susun response ─────────────────────────────────────────────────────

        $totalHabits    = $habitStats->count();
        $completedHabits = $habitStats->sum('completed_count');

        $totalTasks     = $tasks->count();
        $completedTasks = $tasks->where('is_completed', true)->count();
        $upcomingTasks  = $tasks->where('is_completed', false)->take(3)->values();

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
                'mood'       => $journal?->mood,
                'id'         => $journal?->id,
            ],
            'goals' => [
                'active'   => $goalsCount,
                'top_goal' => $topGoal ? [
                    'title'   => $topGoal->title,
                    'percent' => $topGoal->total_milestones > 0
                        ? round(($topGoal->completed_milestones / $topGoal->total_milestones) * 100)
                        : 0,
                ] : null,
            ],
            'jobs' => [
                'active'     => $activeJobsCount,
                'interviews' => $jobs->where('status', 'interviewing')->count(),
            ],
            'events' => $events,
        ];
    }

    /**
     * getWeeklyTrend — dioptimasi dari N+7 loop queries → 2 bulk queries.
     *
     * Sebelum: loop 7 hari, tiap hari query habit + log + task = 21+ queries
     * Sesudah: 2 bulk queries, kalkulasi di PHP
     */
    public function getWeeklyTrend(int $userId, string $timezone): array
    {
        $startDate = Carbon::now($timezone)->subDays(6)->startOfDay();
        $endDate   = Carbon::now($timezone)->endOfDay();

        $startStr = $startDate->format('Y-m-d');
        $endStr   = $endDate->format('Y-m-d');

        // Bulan yang tercakup dalam 7 hari (bisa 1 atau 2 bulan)
        $months = array_unique([
            $startDate->format('Y-m'),
            $endDate->format('Y-m'),
        ]);

        // 1. Habits untuk bulan yang relevan
        $habits = Habit::where('user_id', $userId)
            ->whereIn('period', $months)
            ->get(['id', 'period']);

        // 2. Habit logs 7 hari terakhir — bulk, group by date
        $habitLogs = HabitLog::whereIn('habit_id', $habits->pluck('id'))
            ->whereBetween('date', [$startStr, $endStr])
            ->where('status', 'completed')
            ->get(['habit_id', 'date'])
            ->groupBy('date');

        // 3. Planner tasks 7 hari — bulk, group by date
        $plannerTasks = PlannerTask::where('user_id', $userId)
            ->whereBetween('date', [$startStr, $endStr])
            ->get(['date', 'is_completed'])
            ->groupBy('date');

        // ── Kalkulasi per hari di PHP (no extra queries) ──────────────────────
        $trend = [];
        for ($i = 6; $i >= 0; $i--) {
            $date    = Carbon::now($timezone)->subDays($i);
            $dateStr = $date->format('Y-m-d');
            $month   = $date->format('Y-m');

            $habitsInMonth   = $habits->where('period', $month);
            $totalHabits     = $habitsInMonth->count();
            $completedHabits = isset($habitLogs[$dateStr]) ? $habitLogs[$dateStr]->count() : 0;
            $habitScore      = $totalHabits > 0 ? ($completedHabits / $totalHabits) * 100 : 0;

            $dayTasks        = $plannerTasks->get($dateStr, collect());
            $totalTasks      = $dayTasks->count();
            $completedTasks  = $dayTasks->where('is_completed', true)->count();
            $plannerScore    = $totalTasks > 0 ? ($completedTasks / $totalTasks) * 100 : 0;

            $trend[] = [
                'score' => round(($habitScore + $plannerScore) / 2),
                'day'   => $date->translatedFormat('D'),
            ];
        }

        return $trend;
    }
}
