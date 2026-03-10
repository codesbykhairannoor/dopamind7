<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration 
{
    public function up(): void
    {
        if (!collect(DB::select("SHOW INDEX FROM journals"))->contains('Key_name', 'journals_user_id_index')) {
            Schema::table('journals', function (Blueprint $table) {
                $table->index('user_id');
            });
        }

    // 2. Sekarang baru hapus unique constraint-nya (Hanya jika ada)
    /*
     $indexExists = DB::select("SHOW INDEX FROM journals WHERE Key_name = 'journals_user_id_date_unique'");
     if (!empty($indexExists)) {
     Schema::table('journals', function (Blueprint $table) {
     $table->dropUnique('journals_user_id_date_unique');
     });
     }
     */
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