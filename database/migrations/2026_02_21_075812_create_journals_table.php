<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->string('title')->nullable(); // Opsional, jika user ingin ngasih judul hari itu
            $table->longText('content')->nullable(); // Isi teks jurnal
            $table->string('mood', 50)->nullable(); // Emoji / slug mood
            $table->string('image_path')->nullable(); // Lokasi gambar kecil yang diupload
            $table->boolean('is_pinned')->default(false); // Untuk fitur bookmark masa depan
            $table->timestamps();

            // Indexing agar pencarian jurnal per user dan tanggal secepat kilat!
            // $table->unique(['user_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('journals');
    }
};