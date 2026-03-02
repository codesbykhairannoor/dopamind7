<?php

namespace App\Services;

use App\Models\Journal;
use App\Models\PlannerTask;
use App\Models\FinanceTransaction;
use App\Models\Habit;
use Illuminate\Support\Facades\Storage;

class JournalService
{
    public function getSynergyStats(int $userId, string $timezone): array
    {
        $todayStr = now()->timezone($timezone)->format('Y-m-d');

        // 🔥 SUDAH AMAN UNTUK POSTGRESQL (CASE WHEN)
        $taskStats = PlannerTask::where('user_id', $userId)
            ->where('date', $todayStr)
            ->selectRaw('COUNT(*) as total, SUM(CASE WHEN is_completed = true THEN 1 ELSE 0 END) as completed')
            ->first();

        $expenseTotal = FinanceTransaction::where('user_id', $userId)
            ->where('date', $todayStr)
            ->where('type', 'expense')
            ->sum('amount');

        $habitsCompleted = Habit::where('user_id', $userId)
            ->whereHas('logs', fn($q) => $q->where('date', $todayStr)->where('status', 'completed'))
            ->count();

        return [
            'todayDate' => $todayStr,
            'synergy' => [
                'tasks_completed'  => (int) ($taskStats->completed ?? 0),
                'tasks_total'      => (int) ($taskStats->total ?? 0),
                'expense_total'    => (float) $expenseTotal,
                'habits_completed' => $habitsCompleted,
            ]
        ];
    }

    public function deleteImage(?string $path): void
    {
        if ($path && !str_starts_with($path, 'http')) {
            $disk = config('filesystems.default');
            Storage::disk($disk)->delete($path);
        }
    }

    public function isEmpty(Journal $journal, array $input): bool
    {
        return empty($input['title']) && 
               empty(trim(strip_tags($input['content'] ?? ''))) && 
               empty($input['mood']) && 
               empty($journal->image_path);
    }
}