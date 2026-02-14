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

            // 🕒 WAKTU (Bisa null kalau cuma to-do list biasa)
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();

            // 📝 KONTEN
            $table->string('title', 150);
            $table->text('notes')->nullable();

            // 🎨 TYPE (Kategori buat warna-warni di UI)
            // 1: Work (Biru), 2: Personal (Hijau), 3: Urgent (Merah)
            $table->unsignedTinyInteger('type')->default(1);

            // ✅ STATUS
            $table->boolean('is_completed')->default(false);

            // Kita GAK PAKAI 'DATE' karena ini konsepnya "Papan Tulis Harian".
            // Apa yang ada di tabel, itu yang tampil hari ini.

            $table->timestamps();

         
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('planner_tasks');
    }
};
