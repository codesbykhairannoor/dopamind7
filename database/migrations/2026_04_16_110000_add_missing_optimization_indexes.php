<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // 1. Planner Tasks Optimization
        if (Schema::hasTable('planner_tasks')) {
            Schema::table('planner_tasks', function (Blueprint $table) {
                $table->index(['user_id', 'date'], 'idx_planner_user_date');
                $table->index(['user_id', 'is_completed', 'date'], 'idx_planner_user_status_date');
            });
        }

        // 2. Journals Optimization
        if (Schema::hasTable('journals')) {
            Schema::table('journals', function (Blueprint $table) {
                $table->index(['user_id', 'date'], 'idx_journal_user_date');
            });
        }

        // 3. Finance Transactions - additional group optimization
        if (Schema::hasTable('finance_transactions')) {
            Schema::table('finance_transactions', function (Blueprint $table) {
                // For faster filtering in the last X days
                $table->index(['date'], 'idx_finance_date_only');
            });
        }
        
        // 4. Calendar Events - range search optimization
        if (Schema::hasTable('calendar_events')) {
            Schema::table('calendar_events', function (Blueprint $table) {
                $table->index(['user_id', 'start_date', 'end_date'], 'idx_event_user_range');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('planner_tasks')) {
            Schema::table('planner_tasks', function (Blueprint $table) {
                $table->dropIndex('idx_planner_user_date');
                $table->dropIndex('idx_planner_user_status_date');
            });
        }

        if (Schema::hasTable('journals')) {
            Schema::table('journals', function (Blueprint $table) {
                $table->dropIndex('idx_journal_user_date');
            });
        }

        if (Schema::hasTable('finance_transactions')) {
            Schema::table('finance_transactions', function (Blueprint $table) {
                $table->dropIndex('idx_finance_date_only');
            });
        }
        
        if (Schema::hasTable('calendar_events')) {
            Schema::table('calendar_events', function (Blueprint $table) {
                $table->dropIndex('idx_event_user_range');
            });
        }
    }
};
