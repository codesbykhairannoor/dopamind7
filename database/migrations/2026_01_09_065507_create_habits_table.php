<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('habits', function (Blueprint $table) {
            $table->id();
            
            // Relasi User
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // 🔥 OPTIMASI 1: Period cuma butuh 7 char ("2026-01")
            $table->string('period', 7); 
            
            $table->string('name', 100); // Nama habit cukup 100 char
            $table->string('icon', 10)->nullable(); // Emoji pendek
            
            // 🔥 OPTIMASI 2: Warna cuma butuh 7 char (#123456)
            $table->string('color', 7)->default('#6366f1'); 
            
            // 🔥 OPTIMASI 3: Target max 31 hari. Pake TinyInteger (Hemat 300% storage vs Integer biasa)
            $table->unsignedTinyInteger('monthly_target')->default(30); 
            
            $table->boolean('is_archived')->default(false);
            $table->timestamps();

            // 🔥 INDEXING: Filter habit user per bulan jadi 0.00ms
            $table->index(['user_id', 'period']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('habits');
    }
};