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
            
            // 🚨 INI YANG TADI HILANG DI KODE KAMU 🚨
            $table->foreignId('period_id')->constrained()->cascadeOnDelete();
            
            // 🔥 DIET DATA: Batasi panjang string biar hemat storage
            $table->string('type', 20); // Cukup 20 char (habit, finance, goal)
            $table->string('name', 100); // Nama habit gak mungkin novel
            $table->string('icon', 10)->nullable(); // Emoji pendek
            
            $table->decimal('target_value', 15, 2)->default(0); 
            $table->string('unit', 10)->nullable(); // km, ltr, IDR (pendek aja)
            
            $table->timestamps();

            // 🔥 COMPOSITE INDEX: Filter tipe habit dalam 1 periode ngebut
            $table->index(['period_id', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trackers');
    }
};