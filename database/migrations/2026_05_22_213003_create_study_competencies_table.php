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
        Schema::create('study_competencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->json('competencies')->nullable(); // radar chart data e.g. {"Python": 85, "Data Science": 75}
            $table->json('archetypes')->nullable();   // predicted career archetypes e.g. {"Data Engineer": 92}
            $table->text('verdict')->nullable();      // AI verdict/recommendation
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('study_competencies');
    }
};
