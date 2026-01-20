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
        $table->string('category'); // Kategori yang mau di-budget-in
        $table->decimal('limit_amount', 15, 2); // Batas maksimal (Rp)
        $table->string('month'); // Format: "2026-01" (Biar gampang filter per bulan)
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
