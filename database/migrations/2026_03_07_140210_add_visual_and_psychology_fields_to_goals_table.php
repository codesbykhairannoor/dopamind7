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
        Schema::table('goals', function (Blueprint $table) {
            $table->string('cover_image_url')->nullable()->after('title');
            $table->string('reward')->nullable()->after('status');
            $table->enum('priority', ['vital', 'important', 'optional'])->default('important')->after('status');
        });

        Schema::table('goal_milestones', function (Blueprint $table) {
            $table->date('target_date')->nullable()->after('completed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('goals', function (Blueprint $table) {
            $table->dropColumn(['cover_image_url', 'reward', 'priority']);
        });

        Schema::table('goal_milestones', function (Blueprint $table) {
            $table->dropColumn('target_date');
        });
    }
};
