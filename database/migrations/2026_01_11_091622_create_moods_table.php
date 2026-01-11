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
        Schema::create('moods', function (Blueprint $table) {
            $table->id();
            // Hubungkan ke tabel users
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Simpan periode (misal: "2026-01")
            $table->string('period')->index(); 
            
            // Simpan kode mood (misal: "fire", "happy")
            $table->string('mood_code'); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('moods');
    }
};
