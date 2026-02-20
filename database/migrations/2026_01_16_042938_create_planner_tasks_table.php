<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('planner_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // 🔥 TAMBAHAN BARU: Tanggal spesifik untuk task ini
            $table->date('date');

            // 🕒 WAKTU
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();

            // 📝 KONTEN
            $table->string('title', 150);
            $table->text('notes')->nullable();

            // 🎨 TYPE
            $table->unsignedTinyInteger('type')->default(1);

            // ✅ STATUS
            $table->boolean('is_completed')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('planner_tasks');
    }
};