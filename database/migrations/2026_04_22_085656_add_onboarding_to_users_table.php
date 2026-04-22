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
        Schema::table('users', function (Blueprint $wrapper) {
            $wrapper->boolean('onboarding_completed')->default(false)->after('notification_preferences');
            $wrapper->json('onboarding_data')->nullable()->after('onboarding_completed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $wrapper) {
            $wrapper->dropColumn(['onboarding_completed', 'onboarding_data']);
        });
    }
};
