<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add composite index to planner_tasks
        try {
            Schema::table('planner_tasks', function (Blueprint $table) {
                $table->index(['user_id', 'date'], 'idx_planner_tasks_user_date');
            });
        } catch (\Exception $e) {
            // ignore if exists
        }

        // Add composite index to daily_logs
        try {
            Schema::table('daily_logs', function (Blueprint $table) {
                $table->index(['user_id', 'date'], 'idx_daily_logs_user_date');
            });
        } catch (\Exception $e) {
            // ignore if exists
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planner_tasks', function (Blueprint $table) {
            $table->dropIndex('idx_planner_tasks_user_date');
        });

        Schema::table('daily_logs', function (Blueprint $table) {
            $table->dropIndex('idx_daily_logs_user_date');
        });
    }
};
