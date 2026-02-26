<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Menggunakan Raw SQL dengan IF NOT EXISTS agar PostgreSQL tidak error
        // jika indeks ternyata sudah terlanjur terbuat sebelumnya.
        
        DB::statement('CREATE INDEX IF NOT EXISTS habits_user_id_period_index ON habits (user_id, period)');
        DB::statement('CREATE INDEX IF NOT EXISTS habit_logs_habit_id_status_index ON habit_logs (habit_id, status)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP INDEX IF EXISTS habits_user_id_period_index');
        DB::statement('DROP INDEX IF EXISTS habit_logs_habit_id_status_index');
    }
};