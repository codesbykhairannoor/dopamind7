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
    Schema::table('daily_logs', function (Blueprint $table) {
        if (!Schema::hasColumn('daily_logs', 'date')) {
            $table->date('date')->nullable()->index();
        }
        if (!Schema::hasColumn('daily_logs', 'income_target')) {
            $table->decimal('income_target', 15, 2)->default(0);
        }
    });
}

public function down()
{
    Schema::table('daily_logs', function (Blueprint $table) {
        $table->dropColumn(['date', 'income_target']);
    });
}
};
