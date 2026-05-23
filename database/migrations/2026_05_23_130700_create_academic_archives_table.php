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
        // First drop the old columns from academic_records
        Schema::table('academic_records', function (Blueprint $table) {
            $table->dropColumn(['file_name', 'file_path', 'link_url']);
        });

        Schema::create('academic_archives', function (Blueprint $table) {
            $table->id();
            $table->foreignId('academic_record_id')->constrained('academic_records')->onDelete('cascade');
            $table->string('file_name')->nullable();
            $table->string('file_path')->nullable();
            $table->string('link_url', 2083)->nullable();
            $table->string('meeting_tag')->nullable();
            $table->string('type')->default('document');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_archives');

        Schema::table('academic_records', function (Blueprint $table) {
            $table->string('file_name')->nullable();
            $table->string('file_path')->nullable();
            $table->string('link_url', 2083)->nullable();
        });
    }
};
