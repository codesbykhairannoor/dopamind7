<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('journals', function (Blueprint $table) {
            // 1. Buat index biasa dulu untuk user_id agar Foreign Key tidak error
            $table->index('user_id');

            // 2. Sekarang baru hapus unique constraint-nya
            $table->dropUnique('journals_user_id_date_unique');
        });
    }

    public function down(): void
    {
        Schema::table('journals', function (Blueprint $table) {
            // Balikin lagi ke unik
            $table->unique(['user_id', 'date']);
            
            // Hapus index bantuan tadi
            $table->dropIndex(['user_id']);
        });
    }
};