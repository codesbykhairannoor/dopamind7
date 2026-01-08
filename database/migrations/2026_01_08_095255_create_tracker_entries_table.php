<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trackers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('period_id')->constrained()->cascadeOnDelete();
            $table->string('type')->index(); // 'habit', 'finance', 'goal'
            $table->string('name'); // 'Lari Pagi', 'Uang Makan'
            $table->string('icon')->nullable();
            $table->decimal('target_value', 15, 2)->default(0); // Target angka
            $table->string('unit')->nullable(); // 'km', 'IDR', 'kali'
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trackers');
    }
};