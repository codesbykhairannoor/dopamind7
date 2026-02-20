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
        Schema::create('daily_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            
            // 🔥 TANGGAL: Kunci utama agar catatan tidak bercampur antar hari
            $table->date('date');

            // 📝 JURNAL / CATATAN HARIAN
            $table->text('notes')->nullable();

            // 🍱 MEALS: Disimpan dalam format JSON 
            // Contoh isi: {"breakfast": "Nasi Goreng", "lunch": "Sate Ayam", "dinner": ""}
            $table->json('meals')->nullable(); 

            $table->timestamps();

            // OPTIONAL: Mencegah duplikasi log untuk user yang sama di tanggal yang sama
            $table->unique(['user_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_logs');
    }
};