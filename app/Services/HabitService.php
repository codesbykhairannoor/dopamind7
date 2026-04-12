<?php

namespace App\Services;

use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class HabitService
{
    /**
     * Membuat habit baru dan mengatur posisinya otomatis di urutan terbawah
     */
    public function createHabit(int $userId, array $data): Habit
    {
        $maxPosition = Habit::where('user_id', $userId)
            ->where('period', $data['period'])
            ->max('position') ?? 0;

        $data['user_id'] = $userId;
        $data['position'] = $maxPosition + 1;

        $habit = Habit::create($data);
        Cache::forget("user_{$userId}_habit_streak");
        return $habit;
    }

    /**
     * Menyimpan atau menghapus checklist harian
     */
    public function logHabit(Habit $habit, string $date, string $status): void
    {
        if ($status === 'uncheck') {
            HabitLog::where('habit_id', $habit->id)->where('date', $date)->delete();
        } else {
            HabitLog::updateOrCreate(
                ['habit_id' => $habit->id, 'date' => $date],
                ['status' => $status]
            );
        }
        Cache::forget("user_{$habit->user_id}_habit_streak");
    }

    /**
     * Menyalin data dari bulan sebelumnya dengan mempertahankan posisi dan timezone
     */
    public function copyFromPreviousMonth(int $userId, string $prevPeriod, string $currentPeriod, string $timezone): int
    {
        if (Habit::where('user_id', $userId)->where('period', $currentPeriod)->exists()) {
            throw new \Exception('Habit bulan ini sudah ada! Tidak bisa copy lagi.');
        }

        $user = User::find($userId);
        $query = Habit::where('user_id', $userId)->where('period', $prevPeriod)->orderBy('position', 'asc');

        // 🔥 TIER GATE: Explorer hanya boleh copy max 5 habit teratas
        if ($user && $user->isExplorer()) {
            $query->limit(5);
        }

        $oldHabits = $query->get();

        if ($oldHabits->isEmpty()) return 0;

        $now = now()->timezone($timezone)->toDateTimeString(); 
        
        $newHabits = $oldHabits->map(function ($old) use ($userId, $currentPeriod, $now) {
            return [
                'user_id' => $userId,
                'period' => $currentPeriod,
                'name' => $old->name,
                'icon' => $old->icon,
                'color' => $old->color,
                'monthly_target' => $old->monthly_target,
                'position' => $old->position,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        })->toArray();

        Habit::insert($newHabits);
        Cache::forget("user_{$userId}_habit_streak");

        return count($newHabits);
    }

    /**
     * Menyimpan banyak habit sekaligus (Bulk Insert)
     */
    public function batchStore(int $userId, string $period, array $habits, string $timezone): void
    {
        $now = now()->timezone($timezone)->toDateTimeString(); 
        $maxPosition = Habit::where('user_id', $userId)->where('period', $period)->max('position') ?? 0;

        $habitsData = [];
        foreach ($habits as $index => $habit) {
            $habitsData[] = [
                'user_id' => $userId,
                'period' => $period,
                'name' => $habit['name'],
                'icon' => $habit['icon'],
                'color' => $habit['color'],
                'monthly_target' => $habit['monthly_target'],
                'position' => $maxPosition + $index + 1,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        if (!empty($habitsData)) {
            DB::transaction(fn () => Habit::insert($habitsData));
            Cache::forget("user_{$userId}_habit_streak");
        }
    }

    /**
     * Menyimpan susunan re-order hasil Drag & Drop
     */
    public function reorder(int $userId, array $habits): void
    {
        DB::transaction(function () use ($userId, $habits) {
            foreach ($habits as $habitData) {
                Habit::where('id', $habitData['id'])
                    ->where('user_id', $userId)
                    ->update(['position' => $habitData['position']]);
            }
        });
    }

    /**
     * Mengeksekusi banyak checklist log sekaligus (Select massal dari mouse drag)
     */
    public function batchLog(int $userId, array $logs): void
    {
        DB::transaction(function () use ($userId, $logs) {
            // Otorisasi massal: Pastikan semua habit_id milik user yang bersangkutan
            $habitIds = collect($logs)->pluck('habit_id')->unique();
            $validHabitsCount = Habit::whereIn('id', $habitIds)->where('user_id', $userId)->count();
            
            if ($validHabitsCount !== $habitIds->count()) {
                abort(403, 'Unauthorized habit modification');
            }

            foreach ($logs as $log) {
                if ($log['status'] === 'uncheck') {
                    HabitLog::where('habit_id', $log['habit_id'])->where('date', $log['date'])->delete();
                } else {
                    HabitLog::updateOrCreate(
                        ['habit_id' => $log['habit_id'], 'date' => $log['date']],
                        ['status' => $log['status']]
                    );
                }
            }
            Cache::forget("user_{$userId}_habit_streak");
        });
    }
}