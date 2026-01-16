<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('habit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('habit_id')->constrained('habits')->onDelete('cascade');

            $table->date('date');

            // Status Enum (Ringan)
            $table->enum('status', ['completed', 'skipped'])->default('completed');

            // Catatan: Kalau user jarang ngisi, nullable text gapapa.
            $table->text('notes')->nullable();

            $table->timestamps();

            // 🔥 SUPER INDEX:
            // 1. Mencegah duplikat (Data Integrity)
            // 2. Sekaligus jadi Index pencarian (Performance)
            $table->unique(['habit_id', 'date']);

            // 🔥 INDEX TAMBAHAN: Buat ngitung progress bar persenan (completed vs total)
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('habit_logs');
    }
};
