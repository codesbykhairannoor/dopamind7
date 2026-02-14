<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('finance_categories', function (Blueprint $table) {
            $table->id();
            // user_id otomatis ter-index karena constrained foreign key
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); 
            $table->string('name');
            
            // 🔥 PERBAIKAN: Tambahkan ->index() di sini agar query pemanggilan kategori melesat cepat
            $table->string('slug')->index(); 
            
            $table->string('type'); // 'income' atau 'expense'
            $table->string('icon')->default('💰');
            $table->string('color')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('finance_categories');
    }
};