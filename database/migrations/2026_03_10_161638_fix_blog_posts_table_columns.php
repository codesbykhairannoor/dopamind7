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
        Schema::table('blog_posts', function (Blueprint $table) {
            if (!Schema::hasColumn('blog_posts', 'status')) {
                $table->enum('status', ['draft', 'published'])->default('draft')->after('featured_image');
            }
            if (!Schema::hasColumn('blog_posts', 'published_at')) {
                $table->timestamp('published_at')->nullable()->after('status');
            }
            if (!Schema::hasColumn('blog_posts', 'meta_title')) {
                $table->string('meta_title')->nullable()->after('published_at');
            }
            if (!Schema::hasColumn('blog_posts', 'meta_description')) {
                $table->text('meta_description')->nullable()->after('meta_title');
            }
            if (!Schema::hasColumn('blog_posts', 'meta_keywords')) {
                $table->string('meta_keywords')->nullable()->after('meta_description');
            }
            if (!Schema::hasColumn('blog_posts', 'location_name')) {
                $table->string('location_name')->nullable()->after('meta_keywords');
            }
            if (!Schema::hasColumn('blog_posts', 'latitude')) {
                $table->decimal('latitude', 10, 8)->nullable()->after('location_name');
            }
            if (!Schema::hasColumn('blog_posts', 'longitude')) {
                $table->decimal('longitude', 11, 8)->nullable()->after('latitude');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn([
                'status',
                'published_at',
                'meta_title',
                'meta_description',
                'meta_keywords',
                'location_name',
                'latitude',
                'longitude',
            ]);
        });
    }
};
