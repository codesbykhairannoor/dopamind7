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
        $table->string('title'); // Contoh: "Nasi Padang"
        $table->decimal('amount', 15, 2); // Nominal (cukup sampe Triliun)
        $table->enum('type', ['income', 'expense']); // Pemasukan / Pengeluaran
        $table->string('category'); // food, transport, bills, salary, etc
        $table->date('date'); // Tanggal transaksi
        $table->text('notes')->nullable(); // Catatan tambahan
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
