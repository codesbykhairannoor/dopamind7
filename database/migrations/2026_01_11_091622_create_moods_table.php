<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('moods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Hemat size
            $table->string('period', 7); // "2026-01"
            $table->string('mood_code', 20); // "fire", "sad" (Cukup 20 char)
            
            $table->timestamps();

            // 🔥 COMPOSITE INDEX: Query mood user langsung ketemu tanpa scan satu tabel
            $table->index(['user_id', 'period']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('moods');
    }
};