<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Habit;
use App\Models\HabitLog;
use Carbon\Carbon;

class HistorySeeder extends Seeder
{
    public function run()
    {
        // 1. Ambil User Pertama (Khairan)
        $user = User::first(); 

        if (!$user) {
            $this->command->info('Belum ada user! Bikin user dulu lewat Register.');
            return;
        }

        // 2. Bikin Habit Edisi Desember (Kalau belum ada)
        $habit = Habit::firstOrCreate(
            ['user_id' => $user->id, 'name' => 'Latihan Coding Masa Lalu'],
            [
                'icon' => '💻',
                'color' => '#f59e0b', // Amber
                'monthly_target' => 25
            ]
        );

        // 3. Isi Log Secara Acak di Bulan DESEMBER 2025
        $startDate = Carbon::create(2025, 12, 1);
        $daysInMonth = $startDate->daysInMonth; // 31 Hari

        for ($i = 1; $i <= $daysInMonth; $i++) {
            $date = Carbon::create(2025, 12, $i)->format('Y-m-d');

            // Random status: Completed, Skipped, atau Kosong
            $rand = rand(1, 3); 
            $status = match($rand) {
                1 => 'completed',
                2 => 'skipped',
                default => null
            };

            if ($status) {
                HabitLog::updateOrCreate(
                    ['habit_id' => $habit->id, 'date' => $date],
                    ['status' => $status]
                );
            }
        }

        $this->command->info('Data Desember 2025 berhasil dibuat untuk user: ' . $user->name);
    }
}