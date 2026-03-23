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
        
        // 2. Optimized Milestone Aggregations (Single query for all milestone-related stats)
        // We calculate both the total/completed counts AND the average progress in one go
        $milestoneStats = DB::table('goal_milestones')
            ->join('goals', 'goal_milestones.goal_id', '=', 'goals.id')
            ->where('goals.user_id', $userId)
            ->where('goals.status', 'active')
            ->select(
                DB::raw('count(*) as total'),
                DB::raw('sum(case when completed = true then 1 else 0 end) as completed'),
                DB::raw('AVG(case when 1=1 then (SELECT count(*) from goal_milestones m2 where m2.goal_id = goals.id AND m2.completed = true) * 100.0 / NULLIF((SELECT count(*) from goal_milestones m3 where m3.goal_id = goals.id), 0) else 0 end) as avg_p')
            )->first();
            
        // 3. Specific Goals (Top & Urgent) - Use eager loading wisely
        $topGoal = Goal::ofUser($userId)->byStatus('active')
            ->withCount(['milestones as total_ms', 'milestones as completed_ms' => fn($q) => $q->where('completed', true)])
            ->get()
            ->sortByDesc(fn($g) => $g->total_ms > 0 ? $g->completed_ms / $g->total_ms : 0)
            ->first();

        $topGoalProgress = ($topGoal && $topGoal->total_ms > 0) 
            ? (int) round(($topGoal->completed_ms / $topGoal->total_ms) * 100) 
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
            'avg_progress' => (int) round($milestoneStats->avg_p ?? 0),
            'milestones_total' => (int) ($milestoneStats->total ?? 0),
            'milestones_completed' => (int) ($milestoneStats->completed ?? 0),
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
        return $goal->milestones()->create([
            'title' => $data['title'],
            'order' => $data['position'] ?? $data['order'] ?? $order,
            'completed' => $data['is_completed'] ?? $data['completed'] ?? false,
            'target_date' => $data['target_date'] ?? null,
        ]);
    }

    public function updateMilestone(GoalMilestone $milestone, array $data): GoalMilestone
    {
        $updateData = [];
        if (isset($data['title']))
            $updateData['title'] = $data['title'];
        if (isset($data['order']))
            $updateData['order'] = $data['order'];
        if (isset($data['position']))
            $updateData['order'] = $data['position'];
        if (isset($data['target_date']))
            $updateData['target_date'] = $data['target_date'];

        // Handle field parity
        if (isset($data['is_completed']))
            $updateData['completed'] = $data['is_completed'];
        elseif (isset($data['completed']))
            $updateData['completed'] = $data['completed'];

        $milestone->update($updateData);
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
