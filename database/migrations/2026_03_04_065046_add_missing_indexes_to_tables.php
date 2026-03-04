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
        // Add indexes to journals table
        Schema::table('journals', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('date');
            $table->index(['user_id', 'date']);
        });

        // Add indexes to calendar_events table
        Schema::table('calendar_events', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('start_date');
            $table->index(['user_id', 'start_date']);
        });

        // Add indexes to planner_tasks table
        Schema::table('planner_tasks', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('date');
            $table->index(['user_id', 'date']);
        });

        // Add indexes to daily_logs table
        Schema::table('daily_logs', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('date');
            $table->index(['user_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('journals', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['date']);
            $table->dropIndex(['user_id', 'date']);
        });

        Schema::table('calendar_events', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['start_date']);
            $table->dropIndex(['user_id', 'start_date']);
        });

        Schema::table('planner_tasks', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['date']);
            $table->dropIndex(['user_id', 'date']);
        });

        Schema::table('daily_logs', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['date']);
            $table->dropIndex(['user_id', 'date']);
        });
    }
};
