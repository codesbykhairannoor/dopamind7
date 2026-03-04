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
        $jobs = Job::ofUser($userId)->get();

        return [
            'total' => $jobs->count(),
            'wishlist' => $jobs->where('status', 'wishlist')->count(),
            'applied' => $jobs->where('status', 'applied')->count(),
            'interview' => $jobs->where('status', 'interview')->count(),
            'offer' => $jobs->where('status', 'offer')->count(),
            'rejected' => $jobs->where('status', 'rejected')->count(),
            'accepted' => $jobs->where('status', 'accepted')->count(),
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
