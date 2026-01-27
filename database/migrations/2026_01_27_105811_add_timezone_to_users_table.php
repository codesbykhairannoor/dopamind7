<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_add_timezone_to_users_table.php
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        // Default ke UTC agar aman secara global
        $table->string('timezone')->default('UTC')->after('email');
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('timezone');
    });
}
};
