<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Habit;
use App\Models\HabitLog;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class HabitSeeder extends Seeder
{
    public function run(): void
    {
        // ==========================================
        // 🔥 EMAIL SPESIFIK KAMU 🔥
        // ==========================================
        $targetEmail = 'khairking6@gmail.com'; 

        // 1. Cari User / Buat User
        $user = User::firstOrCreate(
            ['email' => $targetEmail],
            [
                'name' => 'Khairan',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Daftar Kebiasaan
        $habits = [
            ['name' => 'Lari Pagi', 'icon' => '🏃‍♂️', 'color' => '#10b981', 'monthly_target' => 20],
            ['name' => 'Baca Buku', 'icon' => '📚', 'color' => '#6366f1', 'monthly_target' => 15],
            ['name' => 'Minum Air 2L', 'icon' => '💧', 'color' => '#3b82f6', 'monthly_target' => 30],
            ['name' => 'Deep Work', 'icon' => '💻', 'color' => '#f59e0b', 'monthly_target' => 25],
        ];

        // 3. Masukkan ke Database
        // 🔥 KITA SET PERIODE KE BULAN INI (BIAR MUNCUL DI DASHBOARD) 🔥
        $currentPeriod = Carbon::now()->format('Y-m'); // Contoh: "2026-01"

        foreach ($habits as $data) {
            $habit = Habit::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'name' => $data['name'],
                    'period' => $currentPeriod // <--- INI PERBAIKANNYA!
                ],
                [
                    'icon' => $data['icon'],
                    'color' => $data['color'],
                    'monthly_target' => $data['monthly_target'],
                ]
            );

            // 4. Bikin Log Centang/Skip
            $startDate = Carbon::now()->startOfMonth();
            $today = Carbon::now();

            HabitLog::where('habit_id', $habit->id)->delete();

            for ($date = $startDate; $date->lte($today); $date->addDay()) {
                $chance = rand(1, 100);
                if ($chance <= 60) {
                    HabitLog::create(['habit_id' => $habit->id, 'date' => $date->format('Y-m-d'), 'status' => 'completed']);
                } elseif ($chance > 60 && $chance <= 70) {
                    HabitLog::create(['habit_id' => $habit->id, 'date' => $date->format('Y-m-d'), 'status' => 'skipped']);
                }
            }
        }
    }
}