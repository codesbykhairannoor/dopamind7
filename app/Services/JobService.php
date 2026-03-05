<?php

namespace App\Services;

use App\Models\Job;
use Illuminate\Support\Facades\DB;

class JobService
{
    public function getJobsWithFilters(int $userId, ?string $search = null, ?string $status = null, int $perPage = 15)
    {
        $query = Job::ofUser($userId)
            ->orderBy('created_at', 'desc');

        if ($search) {
            $query->search($search);
        }

        if ($status && $status !== 'all') {
            $query->byStatus($status);
        }

        return $query->paginate($perPage);
    }

    public function getJobStats(int $userId): array
    {
        $statsRaw = Job::ofUser($userId)
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        $total = array_sum($statsRaw);

        return [
            'total' => $total,
            'wishlist' => $statsRaw['wishlist'] ?? 0,
            'applied' => $statsRaw['applied'] ?? 0,
            'interview' => $statsRaw['interview'] ?? 0,
            'offer' => $statsRaw['offer'] ?? 0,
            'rejected' => $statsRaw['rejected'] ?? 0,
            'accepted' => $statsRaw['accepted'] ?? 0,
        ];
    }

    public function createJob(int $userId, array $data): Job
    {
        return Job::create([
            'user_id' => $userId,
            ...$data
        ]);
    }

    public function updateJob(Job $job, array $data): Job
    {
        $job->update($data);
        return $job->fresh();
    }

    public function deleteJob(Job $job): bool
    {
        return $job->delete();
    }

    public function bulkUpdateStatus(int $userId, array $jobIds, string $status): int
    {
        return Job::ofUser($userId)
            ->whereIn('id', $jobIds)
            ->update(['status' => $status]);
    }

    public function bulkDelete(int $userId, array $jobIds): int
    {
        return Job::ofUser($userId)
            ->whereIn('id', $jobIds)
            ->delete();
    }
}
