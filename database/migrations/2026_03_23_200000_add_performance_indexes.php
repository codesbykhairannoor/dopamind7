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
        // 1. Goal Milestones Optimization
        Schema::table('goal_milestones', function (Blueprint $table) {
            if (Schema::hasColumn('goal_milestones', 'completed')) {
                $table->index(['goal_id', 'completed']);
            }
        });

        // 2. Habit Logs Optimization
        Schema::table('habit_logs', function (Blueprint $table) {
            $table->index(['habit_id', 'date']);
            $table->index('status');
        });

        // 3. Goal Urgency Optimization
        Schema::table('goals', function (Blueprint $table) {
            $table->index(['user_id', 'status', 'end_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('goal_milestones', function (Blueprint $table) {
            $table->dropIndex(['goal_id', 'completed']);
        });

        Schema::table('habit_logs', function (Blueprint $table) {
            $table->dropIndex(['habit_id', 'date']);
            $table->dropIndex(['status']);
        });

        Schema::table('goals', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'status', 'end_date']);
        });
    }
};
