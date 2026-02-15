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
        // 🔥 Hanya daftarkan Telescope di environment local
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
         * Kita matikan fitur ini khusus di environment 'production'.
         */
        Model::shouldBeStrict(! $this->app->environment('production'));

        /**
         * 🔥 THE REAL FIX: Paksa HTTPS di Production.
         * Supaya redirect ganti bahasa nggak bikin web lo jadi teks JSON.
         */
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}