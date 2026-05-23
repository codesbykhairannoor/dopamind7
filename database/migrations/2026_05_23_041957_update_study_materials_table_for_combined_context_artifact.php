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
        Schema::table('study_materials', function (Blueprint $table) {
            $table->json('context_data')->nullable()->after('course_name');
            $table->json('artifact_data')->nullable()->after('context_data');
            
            $table->dropColumn(['type', 'file_path', 'file_name', 'embed_url', 'rich_text']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('study_materials', function (Blueprint $table) {
            $table->string('type')->nullable();
            $table->string('file_path')->nullable();
            $table->string('file_name')->nullable();
            $table->string('embed_url')->nullable();
            $table->text('rich_text')->nullable();
            
            $table->dropColumn(['context_data', 'artifact_data']);
        });
    }
};
