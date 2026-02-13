<?php

namespace Database\Seeders;

use App\Models\Period;
use App\Models\Tracker;
use App\Models\TrackerEntry;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Bikin User Test
        $user = User::create([
            'name' => 'Test User',
            'email' => 'admin@OneForMind.com',
            'password' => Hash::make('password'), // Password gampang
        ]);
        $this->call(HabitSeeder::class);
        echo "✅ User dibuat: admin@OneForMind.com\n";

        // 2. Bikin Periode (Januari 2026)
        $period = Period::create([
            'user_id' => $user->id,
            'month' => 1,
            'year' => 2026,
            'is_active' => true,
        ]);

        echo "✅ Periode Januari 2026 dibuat\n";

        // 3. Bikin Tracker: Habit "Lari Pagi"
        $habitTracker = Tracker::create([
            'period_id' => $period->id,
            'type' => 'habit',
            'name' => 'Lari Pagi',
            'icon' => '🏃',
            'target_value' => 15, // Target 15x sebulan
            'unit' => 'kali',
        ]);

        // 4. Bikin Tracker: Finance "Jajan Kopi"
        $financeTracker = Tracker::create([
            'period_id' => $period->id,
            'type' => 'expense',
            'name' => 'Jajan Kopi',
            'icon' => '☕',
            'target_value' => 500000, // Budget 500rb
            'unit' => 'IDR',
        ]);

        echo "✅ Tracker dibuat\n";

        // 5. Isi Data Palsu (Tanggal 1 - 8 Jan)
        $startDate = Carbon::create(2026, 1, 1);

        for ($i = 0; $i < 8; $i++) {
            $date = $startDate->copy()->addDays($i)->format('Y-m-d');

            // Random: Kadang lari, kadang enggak
            if (rand(0, 1)) {
                TrackerEntry::create([
                    'tracker_id' => $habitTracker->id,
                    'date' => $date,
                    'value' => 1, // Done
                ]);
            }

            // Random: Kadang jajan kopi
            if (rand(0, 1)) {
                TrackerEntry::create([
                    'tracker_id' => $financeTracker->id,
                    'date' => $date,
                    'value' => rand(20000, 50000), // Harga kopi random
                    'note' => 'Kopi Kenangan mantan',
                ]);
            }
        }

        echo "✅ Data dummy harian berhasil diisi!\n";
    }
}
