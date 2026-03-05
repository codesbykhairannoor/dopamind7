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
        try {
            Schema::table('planner_tasks', function (Blueprint $table) {
                $table->index(['user_id', 'date']);
            });
        }
        catch (\Exception $e) {
        }

        try {
            Schema::table('habit_logs', function (Blueprint $table) {
                $table->index(['user_id', 'date']);
            });
        }
        catch (\Exception $e) {
        }

        try {
            Schema::table('journals', function (Blueprint $table) {
                $table->index(['user_id', 'date']);
            });
        }
        catch (\Exception $e) {
        }

        try {
            Schema::table('daily_logs', function (Blueprint $table) {
                $table->index(['user_id', 'date']);
            });
        }
        catch (\Exception $e) {
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        try {
            Schema::table('planner_tasks', function (Blueprint $table) {
                $table->dropIndex(['user_id', 'date']);
            });
        }
        catch (\Exception $e) {
        }

        try {
            Schema::table('habit_logs', function (Blueprint $table) {
                $table->dropIndex(['user_id', 'date']);
            });
        }
        catch (\Exception $e) {
        }

        try {
            Schema::table('journals', function (Blueprint $table) {
                $table->dropIndex(['user_id', 'date']);
            });
        }
        catch (\Exception $e) {
        }

        try {
            Schema::table('daily_logs', function (Blueprint $table) {
                $table->dropIndex(['user_id', 'date']);
            });
        }
        catch (\Exception $e) {
        }
    }
};
