<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Hanya daftarkan Telescope di environment local
        if ($this->app->environment('local') && class_exists(\App\Providers\TelescopeServiceProvider::class)) {
            $this->app->register(\App\Providers\TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * Mencegah lazy loading, silent assignment, dan akses atribut yang tidak ada.
         */
        Model::shouldBeStrict(!$this->app->environment('production'));

        /**
         * 🛡️ BODYGUARD LOKAL (Bulletproof Local Mode)
         * Jika diakses lewat 127.0.0.1 atau localhost, paksa aplikasi pakai config lokal
         * terlepas dari file .env mana yang dimuat (menghindari salah redirect ke production).
         */
        $host = request()->getHost();
        $isLocalHost = in_array($host, ['127.0.0.1', 'localhost']);

        if ($isLocalHost) {
            \Illuminate\Support\Facades\Log::info("Bodyguard Lokal Aktif: Host {$host}");
            // Paksa APP_URL agar tidak lari ke production (oneformind.com)
            $port = request()->getPort();
            $localUrl = "http://{$host}" . ($port && $port != 80 ? ":{$port}" : "");
            config(['app.url' => $localUrl]);

            // Matikan Secure Cookie biar bisa login lewat HTTP biasa
            config(['session.secure' => false]);

            // Paksa Socialite Redirect ke Lokal Callback
            config(['services.google.redirect' => "{$localUrl}/auth/google/callback"]);

            // Opsional: Matikan Asset URL jika ada
            config(['app.asset_url' => null]);

            // Paksa APP_ENV agar tidak dianggap production
            config(['app.env' => 'local']);

            // Paksa DB_CONNECTION ke mysql agar tidak nyangkut ke production (Supabase)
            config(['database.default' => 'mysql']);
        }

        /**
         * Paksa HTTPS HANYA jika bukan di lokal dan bukan di localhost.
         */
        if (!$this->app->environment('local') && !$isLocalHost) {
            URL::forceScheme('https');
        }
    }
}