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
        $goals = Goal::ofUser($userId)->with(['milestones'])->get();

        $statsRaw = $goals->groupBy('status')->map->count();
        $total = $goals->count();

        $milestonesTotal = 0;
        $milestonesCompleted = 0;
        $totalProgress = 0;
        $activeGoals = $goals->where('status', 'active');

        foreach ($goals as $goal) {
            $mCount = $goal->milestones->count();
            $mComp = $goal->milestones->where('completed', true)->count();
            $milestonesTotal += $mCount;
            $milestonesCompleted += $mComp;

            if ($mCount > 0) {
                $totalProgress += ($mComp / $mCount) * 100;
            }
        }

        $avgProgress = $activeGoals->count() > 0 ? round($totalProgress / $activeGoals->count(), 0) : 0;
        if ($avgProgress > 100)
            $avgProgress = 100;

        $topGoal = $activeGoals->sortByDesc(function ($g) {
            $mCount = $g->milestones->count();
            if ($mCount === 0)
                return 0;
            return $g->milestones->where('completed', true)->count() / $mCount;
        })->first();

        $urgentGoal = $activeGoals->whereNotNull('end_date')
            ->sortBy('end_date')
            ->first();

        $upcomingDeadlines = $activeGoals->whereNotNull('end_date')
            ->filter(fn($g) => $g->end_date->isFuture() && $g->end_date->diffInDays(now()) <= 7)
            ->count();

        return [
            'total' => $total,
            'active' => $statsRaw['active'] ?? 0,
            'completed' => $statsRaw['completed'] ?? 0,
            'paused' => $statsRaw['paused'] ?? 0,
            'cancelled' => $statsRaw['cancelled'] ?? 0,
            'avg_progress' => (int)$avgProgress,
            'milestones_total' => $milestonesTotal,
            'milestones_completed' => $milestonesCompleted,
            'top_goal_title' => $topGoal ? $topGoal->title : null,
            'urgent_goal_title' => $urgentGoal ? $urgentGoal->title : null,
            'upcoming_deadlines_count' => $upcomingDeadlines,
        ];
    }

    public function createGoal(int $userId, array $data): Goal
    {
        return DB::transaction(function () use ($userId, $data) {
            $milestones = $data['milestones'] ?? [];
            unset($data['milestones']);

            $goal = Goal::create([
                'user_id' => $userId,
                ...$data
            ]);

            foreach ($milestones as $index => $milestone) {
                $goal->milestones()->create([
                    'title' => $milestone['title'],
                    'order' => $index,
                    'completed' => $milestone['completed'] ?? false,
                ]);
            }

            return $goal->load('milestones');
        });
    }

    public function updateGoal(Goal $goal, array $data): Goal
    {
        $goal->update($data);
        return $goal->load('milestones');
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
        return $goal->milestones()->create([
            'title' => $data['title'],
            'order' => $data['order'] ?? $order,
            'completed' => false,
            'target_date' => $data['target_date'] ?? null,
        ]);
    }

    public function updateMilestone(GoalMilestone $milestone, array $data): GoalMilestone
    {
        $milestone->update($data);
        return $milestone;
    }

    public function toggleMilestone(GoalMilestone $milestone): GoalMilestone
    {
        $milestone->update([
            'completed' => !$milestone->completed
        ]);
        return $milestone;
    }

    public function deleteMilestone(GoalMilestone $milestone): bool
    {
        return $milestone->delete();
    }
}
