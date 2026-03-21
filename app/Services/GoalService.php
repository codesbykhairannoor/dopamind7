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
        $baseQuery = Goal::ofUser($userId);
        
        // 1. Basic Status Counts (Efficient single query)
        $statsRaw = $baseQuery->clone()
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status');

        $total = $statsRaw->sum();
        
        // 2. Milestone Aggregates ( menggunakan subqueries / withCount agar hemat memory)
        $milestoneStats = DB::table('goal_milestones')
            ->join('goals', 'goal_milestones.goal_id', '=', 'goals.id')
            ->where('goals.user_id', $userId)
            ->select(
                DB::raw('count(*) as total'),
                DB::raw('sum(case when completed = true then 1 else 0 end) as completed')
            )->first();

        // 3. Progress Calculation (Dihitung di DB lebih cepat)
        // Kita ambil rata-rata progress dari goal yang aktif
        $avgProgress = DB::table('goals')
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->leftJoin(DB::raw('(SELECT goal_id, count(*) as total, sum(case when completed = true then 1 else 0 end) as comp FROM goal_milestones GROUP BY goal_id) as ms'), 'goals.id', '=', 'ms.goal_id')
            ->select(DB::raw('AVG(CASE WHEN ms.total > 0 THEN (ms.comp * 100.0 / ms.total) ELSE 0 END) as avg_p'))
            ->value('avg_p') ?? 0;

        // 4. Specific Goals (Top & Urgent) - Tetap ambil model tapi limited
        $topGoal = Goal::ofUser($userId)->byStatus('active')
            ->withCount(['milestones as total_ms', 'milestones as completed_ms' => fn($q) => $q->where('completed', true)])
            ->get()
            ->sortByDesc(fn($g) => $g->total_ms > 0 ? $g->completed_ms / $g->total_ms : 0)
            ->first();

        $urgentGoal = $baseQuery->clone()->byStatus('active')
            ->whereNotNull('end_date')
            ->orderBy('end_date', 'asc')
            ->first();

        $upcomingDeadlines = $baseQuery->clone()->byStatus('active')
            ->whereNotNull('end_date')
            ->whereBetween('end_date', [now(), now()->addDays(7)])
            ->count();

        return [
            'total' => $total,
            'active' => $statsRaw->get('active', 0),
            'completed' => $statsRaw->get('completed', 0),
            'paused' => $statsRaw->get('paused', 0),
            'cancelled' => $statsRaw->get('cancelled', 0),
            'avg_progress' => (int) round($avgProgress),
            'milestones_total' => (int) ($milestoneStats->total ?? 0),
            'milestones_completed' => (int) ($milestoneStats->completed ?? 0),
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
