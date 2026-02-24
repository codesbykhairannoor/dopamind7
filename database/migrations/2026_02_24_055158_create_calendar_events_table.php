<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calendar_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Info Utama
            $table->string('title');
            $table->text('description')->nullable();
            
            // Kategori & UI
            $table->string('type')->default('event'); // event, reminder, academic, dll
            $table->string('color')->default('#4f46e5'); // Default warna Indigo
            
            // Waktu
            $table->date('start_date');
            $table->date('end_date')->nullable(); // Kalau eventnya berhari-hari
            $table->boolean('is_all_day')->default(true);
            $table->time('start_time')->nullable(); // Opsional kalau misal mau detail per jam
            $table->time('end_time')->nullable();   // Opsional
            
            $table->timestamps();

            // 🔥 RAHASIA 0ms QUERY: Composite Indexing 🔥
            // Ini bikin database nggak perlu nyari data satu per satu, langsung lompat ke user & tanggal yang dicari!
            $table->index(['user_id', 'start_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calendar_events');
    }
};