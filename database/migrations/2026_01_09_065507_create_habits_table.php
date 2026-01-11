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
    Schema::create('habits', function (Blueprint $table) {
        $table->id();
        // Hubungkan ke User (Penting!)
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('period');
        $table->string('name'); // Contoh: "Lari Pagi"
        $table->string('icon')->nullable(); // Contoh: "🏃‍♂️" (Kita simpan emojinya langsung)
        $table->string('color')->default('#6366f1'); // Warna tema (Default Indigo)
        
        // Target Bulanan (Volume over Streak)
        $table->integer('monthly_target')->default(30); // Target berapa kali sebulan
        
        // Buat arsip kalau bulan depan mau ganti habit
        $table->boolean('is_archived')->default(false);
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habits');
    }
};
