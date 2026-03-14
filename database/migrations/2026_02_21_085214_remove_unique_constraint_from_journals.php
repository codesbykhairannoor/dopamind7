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
        $indexes = Schema::getIndexes('journals');
        $indexName = 'journals_user_id_date_unique';
        
        $hasIndex = false;
        foreach ($indexes as $index) {
            if ($index['name'] === $indexName) {
                $hasIndex = true;
                break;
            }
        }

        if ($hasIndex) {
            Schema::table('journals', function (Blueprint $table) use ($indexName) {
                $table->dropUnique($indexName);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $indexes = Schema::getIndexes('journals');
        $indexName = 'journals_user_id_date_unique';

        $hasIndex = false;
        foreach ($indexes as $index) {
            if ($index['name'] === $indexName) {
                $hasIndex = true;
                break;
            }
        }

        if (!$hasIndex) {
            Schema::table('journals', function (Blueprint $table) {
                $table->unique(['user_id', 'date']);
            });
        }
    }
};
