<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('daily_logs', function (Blueprint $table) {
            // 🔥 Tambah kolom tanpa merusak data lama
            $table->integer('water')->default(0)->after('meals');
            $table->json('task_box')->nullable()->after('water');
        });
    }

    public function down(): void
    {
        Schema::table('daily_logs', function (Blueprint $table) {
            $table->dropColumn(['water', 'task_box']);
        });
    }
};