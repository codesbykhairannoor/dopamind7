<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('periods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            
            // Urutan yang benar: Definisikan kolom dulu, baru Index!
            $table->unsignedTinyInteger('month'); // Hemat memori (cuma butuh 1 byte)
            $table->unsignedSmallInteger('year'); // Hemat memori (cuma butuh 2 byte)
            $table->boolean('is_active')->default(false);
            $table->json('summary')->nullable();
            $table->timestamps();

            // Constraint & Indexing
            $table->unique(['user_id', 'month', 'year']);
            
            // 🔥 INDEX CEPAT: Buat nyari periode aktif user
            $table->index(['user_id', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('periods');
    }
};