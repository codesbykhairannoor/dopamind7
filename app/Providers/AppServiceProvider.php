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
         * Paksa HTTPS HANYA jika bukan di lokal dan bukan di localhost.
         */
        $isLocalHost = in_array(request()->getHost(), ['127.0.0.1', 'localhost']);
        if (!$this->app->environment('local') && !$isLocalHost) {
            URL::forceScheme('https');
        }
    }
}