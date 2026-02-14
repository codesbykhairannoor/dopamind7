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
        Schema::create('finance_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title'); 
            $table->decimal('amount', 15, 2); 
            $table->enum('type', ['income', 'expense']); 
            
            // 🔥 PERBAIKAN: Tambahkan ->index() agar update nama kategori dari Settings/Finance tidak ngehang
            $table->string('category')->index(); 
            
            // 🔥 PERBAIKAN: Tambahkan ->index() WAJIB ada karena dipakai di whereBetween (filter bulanan)
            $table->date('date')->index(); 
            
            $table->text('notes')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('finance_transactions');
    }
};