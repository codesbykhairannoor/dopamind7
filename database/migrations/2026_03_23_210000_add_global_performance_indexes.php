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
        // 1. Planner Tasks Optimization
        try { Schema::table('planner_tasks', function (Blueprint $table) { $table->index(['user_id', 'date', 'is_completed']); }); } catch (\Exception $e) {}

        // 2. Finance Transactions & Budgets Optimization
        try { Schema::table('finance_transactions', function (Blueprint $table) { $table->index(['user_id', 'date', 'type', 'category']); }); } catch (\Exception $e) {}
        try { Schema::table('finance_budgets', function (Blueprint $table) { $table->index(['user_id', 'month', 'category']); }); } catch (\Exception $e) {}

        // 3. Journal Optimization
        try { Schema::table('journals', function (Blueprint $table) { $table->index(['user_id', 'date']); }); } catch (\Exception $e) {}

        // 4. Calendar Events Optimization
        try { Schema::table('calendar_events', function (Blueprint $table) { $table->index(['user_id', 'start_date', 'end_date']); }); } catch (\Exception $e) {}

        // 5. Daily Logs (Wide Usage)
        try { Schema::table('daily_logs', function (Blueprint $table) { $table->index(['user_id', 'date']); }); } catch (\Exception $e) {}

        // 6. Jobs Optimization
        try { Schema::table('jobs', function (Blueprint $table) { $table->index(['user_id', 'status', 'applied_date']); }); } catch (\Exception $e) {}
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'status', 'applied_date']);
        });

        Schema::table('planner_tasks', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'date', 'is_completed']);
        });

        Schema::table('finance_transactions', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'date', 'type', 'category']);
        });

        Schema::table('finance_budgets', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'month', 'category']);
        });

        Schema::table('journals', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'date']);
        });

        Schema::table('calendar_events', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'start_date', 'end_date']);
        });

        Schema::table('daily_logs', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'date']);
        });
    }
};
