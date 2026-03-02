<?php

namespace App\Services;

use App\Models\DailyLog;
use App\Models\PlannerTask;
use Illuminate\Support\Facades\DB;

class PlannerService
{
    /**
     * Menyimpan banyak task sekaligus secara aman.
     */
    public function batchStoreTasks(int $userId, string $date, array $tasks, string $timezone): void
    {
        $now = now()->timezone($timezone)->toDateTimeString();
        $tasksData = [];

        foreach ($tasks as $task) {
            $tasksData[] = [
                'user_id'      => $userId,
                'date'         => $date,
                'title'        => $task['title'],
                'start_time'   => $task['start_time'],
                'end_time'     => $task['end_time'],
                'type'         => $task['type'],
                'notes'        => $task['notes'] ?? null,
                'is_completed' => false,
                'created_at'   => $now,
                'updated_at'   => $now,
            ];
        }

        if (!empty($tasksData)) {
            DB::transaction(fn () => PlannerTask::insert($tasksData));
        }
    }

    /**
     * Update atau buat catatan harian (Daily Log).
     */
    public function updateDailyLog(int $userId, string $date, array $data): DailyLog
    {
        $log = DailyLog::firstOrCreate(
            ['user_id' => $userId, 'date' => $date],
            [
                'meals'    => ['breakfast' => '', 'lunch' => '', 'dinner' => ''], 
                'notes'    => '',
                'water'    => 0,
                'task_box' => []
            ]
        );

        $log->update($data);
        return $log;
    }

    /**
     * Reset board: Hapus semua task dan kembalikan daily log ke state kosong.
     */
    public function resetBoard(int $userId, string $date): void
    {
        DB::transaction(function () use ($userId, $date) {
            PlannerTask::where('user_id', $userId)
                ->where('date', $date)
                ->delete();

            DailyLog::where('user_id', $userId)
                ->where('date', $date)
                ->update([
                    'notes'    => '',
                    'meals'    => ['breakfast' => '', 'lunch' => '', 'dinner' => ''],
                    'water'    => 0,   
                    'task_box' => []   
                ]);
        });
    }
}