<?php

namespace App\Services;

use App\Models\Goal;
use App\Models\GoalMilestone;
use Illuminate\Support\Facades\DB;

class GoalService
{
    public function getGoalsWithFilters(int $userId, ?string $search = null, ?string $status = null, ?string $type = null, int $perPage = 50)
    {
        $query = Goal::ofUser($userId)
            ->with(['milestones'])
            ->orderBy('created_at', 'desc');

        if ($search) {
            $query->search($search);
        }

        if ($status && $status !== 'all') {
            $query->byStatus($status);
        }

        if ($type && $type !== 'all') {
            $query->byType($type);
        }

        return $query->paginate($perPage);
    }

    public function getGoalStats(int $userId): array
    {
        // 1. Unified Status Counts & Total (Efficient single query)
        $statsRaw = Goal::ofUser($userId)
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status');

        $total = $statsRaw->sum();
        
        // 2. Optimized Milestone Aggregations using Eloquent for DB-agnostic boolean handling
        $activeGoals = Goal::ofUser($userId)->byStatus('active')->with('milestones')->get();
        
        $allMilestones = $activeGoals->pluck('milestones')->flatten();
        $milestonesTotal = $allMilestones->count();
        $milestonesCompleted = $allMilestones->where('completed', true)->count();
        
        $avgProgress = $activeGoals->count() > 0 ? $activeGoals->avg(function ($g) {
            $total = $g->milestones->count();
            return $total > 0 ? ($g->milestones->where('completed', true)->count() / $total) * 100 : 0;
        }) : 0;
            
        // 3. Specific Goals (Top & Urgent)
        $topGoal = $activeGoals->sortByDesc(function ($g) {
            $total = $g->milestones->count();
            return $total > 0 ? $g->milestones->where('completed', true)->count() / $total : 0;
        })->first();

        $topGoalProgress = ($topGoal && $topGoal->milestones->count() > 0) 
            ? (int) round(($topGoal->milestones->where('completed', true)->count() / $topGoal->milestones->count()) * 100) 
            : 0;

        $urgentGoal = Goal::ofUser($userId)->byStatus('active')
            ->whereNotNull('end_date')
            ->orderBy('end_date', 'asc')
            ->first();

        // Upcoming deadlines (Efficient count)
        $upcomingDeadlines = Goal::ofUser($userId)->byStatus('active')
            ->whereNotNull('end_date')
            ->whereBetween('end_date', [now(), now()->addDays(7)])
            ->count();

        $urgentDaysLeft = ($urgentGoal && $urgentGoal->end_date) 
            ? (int) now()->diffInDays($urgentGoal->end_date, false) 
            : null;

        return [
            'total' => (int) $total,
            'active' => (int) $statsRaw->get('active', 0),
            'completed' => (int) $statsRaw->get('completed', 0),
            'paused' => (int) $statsRaw->get('paused', 0),
            'cancelled' => (int) $statsRaw->get('cancelled', 0),
            'avg_progress' => (int) round($avgProgress),
            'milestones_total' => $milestonesTotal,
            'milestones_completed' => $milestonesCompleted,
            'top_goal_title' => $topGoal ? $topGoal->title : null,
            'top_goal_progress' => $topGoalProgress,
            'urgent_goal_title' => $urgentGoal ? $urgentGoal->title : null,
            'urgent_goal_days_left' => $urgentDaysLeft,
            'upcoming_deadlines_count' => $upcomingDeadlines,
        ];
    }

    public function createGoal(int $userId, array $data): Goal
    {
        return DB::transaction(function () use ($userId, $data) {
            $milestones = $data['milestones'] ?? [];
            unset($data['milestones']);

            $data['target_value'] = $data['target_value'] ?? 0;
            $data['current_value'] = $data['current_value'] ?? 0;

            $goal = Goal::create([
                'user_id' => $userId,
                ...$data
            ]);

            $goal->syncMilestones($milestones);

            return $goal->load('milestones');
        });
    }

    public function updateGoal(Goal $goal, array $data): Goal
    {
        return DB::transaction(function () use ($goal, $data) {
            $milestones = $data['milestones'] ?? null;
            unset($data['milestones']);

            if (array_key_exists('target_value', $data) && $data['target_value'] === null) {
                $data['target_value'] = 0;
            }
            if (array_key_exists('current_value', $data) && $data['current_value'] === null) {
                $data['current_value'] = 0;
            }

            $goal->update($data);

            if ($milestones !== null) {
                $goal->syncMilestones($milestones);
            }

            return $goal->load('milestones');
        });
    }

    public function deleteGoal(Goal $goal): bool
    {
        return $goal->delete();
    }

    public function bulkUpdateStatus(int $userId, array $goalIds, string $status): int
    {
        return Goal::ofUser($userId)
            ->whereIn('id', $goalIds)
            ->update(['status' => $status]);
    }

    public function bulkDelete(int $userId, array $goalIds): int
    {
        return Goal::ofUser($userId)
            ->whereIn('id', $goalIds)
            ->delete();
    }

    public function addMilestone(Goal $goal, array $data): GoalMilestone
    {
        $order = $goal->milestones()->max('order') + 1;
        $milestone = new GoalMilestone();
        $milestone->goal_id = $goal->id;
        $milestone->title = $data['title'];
        $milestone->order = $data['position'] ?? $data['order'] ?? $order;
        $milestone->completed = filter_var($data['is_completed'] ?? $data['completed'] ?? false, FILTER_VALIDATE_BOOLEAN) ? \DB::raw('true') : \DB::raw('false');
        if (isset($data['target_date'])) {
            $milestone->target_date = $data['target_date'];
        }
        $milestone->save();
        
        return $milestone;
    }

    public function updateMilestone(GoalMilestone $milestone, array $data): GoalMilestone
    {
        if (isset($data['title']))
            $milestone->title = $data['title'];
        if (isset($data['order']))
            $milestone->order = $data['order'];
        if (isset($data['position']))
            $milestone->order = $data['position'];
        if (isset($data['target_date']))
            $milestone->target_date = $data['target_date'];

        // Handle field parity with explicit boolean assignment using PostgreSQL-safe DB::raw
        if (isset($data['is_completed'])) {
            $milestone->completed = filter_var($data['is_completed'], FILTER_VALIDATE_BOOLEAN) ? \DB::raw('true') : \DB::raw('false');
        } elseif (isset($data['completed'])) {
            $milestone->completed = filter_var($data['completed'], FILTER_VALIDATE_BOOLEAN) ? \DB::raw('true') : \DB::raw('false');
        }

        $milestone->save();
        $milestone->refresh();
        return $milestone;
    }

    public function toggleMilestone(GoalMilestone $milestone): GoalMilestone
    {
        $milestone->completed = !$milestone->completed ? \DB::raw('true') : \DB::raw('false');
        $milestone->save();
        $milestone->refresh();
        return $milestone;
    }

    public function deleteMilestone(GoalMilestone $milestone): bool
    {
        return $milestone->delete();
    }
}
