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
    Schema::table('habits', function (Blueprint $table) {
        // Biar nyari habit berdasarkan user & bulan jadi secepat kilat
        $table->index(['user_id', 'period']); 
    });

    Schema::table('habit_logs', function (Blueprint $table) {
        // Biar ngitung status 'completed' ga berat
        $table->index(['habit_id', 'status']); 
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
