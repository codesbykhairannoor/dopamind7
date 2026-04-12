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
        Schema::table('users', function (Blueprint $table) {
            $table->json('notification_preferences')->nullable()->after('timezone');
        });

        // Initialize default preferences for existing users
        $defaultPrefs = json_encode([
            'habit' => ['enabled' => true, 'time' => '07:00'],
            'planner' => ['enabled' => true, 'time' => '08:00'],
            'journal' => ['enabled' => false, 'time' => '20:00'],
            'finance' => ['enabled' => false, 'time' => '09:00'],
        ]);

        \DB::table('users')->update(['notification_preferences' => $defaultPrefs]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('notification_preferences');
        });
    }
};
