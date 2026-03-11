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
    // Columns already created in 2026_03_10_135512_create_blog_posts_table.php
    // Left empty to prevent PostgreSQL transaction errors.
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    //
    }
};
