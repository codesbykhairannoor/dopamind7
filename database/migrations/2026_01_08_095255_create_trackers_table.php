<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tracker_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tracker_id')->constrained('trackers')->cascadeOnDelete();
            
            $table->date('date');
            $table->decimal('value', 15, 2);
            $table->string('note', 255)->nullable(); // Ganti text ke string (lebih ringan) kalau cuma catetan pendek
            
            $table->timestamps();

            // 🔥 THE KING OF INDEX: Ini penyelamat performa Chart & Kalender
            $table->index(['tracker_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tracker_entries');
    }
};