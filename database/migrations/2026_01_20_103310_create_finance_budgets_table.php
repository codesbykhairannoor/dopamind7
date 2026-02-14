<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('finance_budgets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            
            // 🔥 PERBAIKAN: Tambahkan ->index() agar update/pencarian kategori instan
            $table->string('category')->index(); 
            
            $table->decimal('limit_amount', 15, 2); 
            
            // 🔥 PERBAIKAN: Tambahkan ->index() karena sering difilter per bulan di controller
            $table->string('month')->index(); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('finance_budgets');
    }
};