<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Laravel\Telescope\IncomingEntry;
use Laravel\Telescope\Telescope;
use Laravel\Telescope\TelescopeApplicationServiceProvider;

// CEK APAKAH CLASS TELESCOPE ADA (Hanya ada di Local/Dev)
if (class_exists(TelescopeApplicationServiceProvider::class)) {

    class TelescopeServiceProvider extends TelescopeApplicationServiceProvider
    {
        /**
         * Register any application services.
         */
        public function register(): void
        {
            // Telescope::night();

            $this->hideSensitiveRequestDetails();

            $isLocal = $this->app->environment('local');

            Telescope::filter(function (IncomingEntry $entry) use ($isLocal) {
                return $isLocal ||
                       $entry->isReportableException() ||
                       $entry->isFailedRequest() ||
                       $entry->isFailedJob() ||
                       $entry->isScheduledTask() ||
                       $entry->hasMonitoredTag();
            });
        }

        /**
         * Prevent sensitive request details from being logged by Telescope.
         */
        protected function hideSensitiveRequestDetails(): void
        {
            if ($this->app->environment('local')) {
                return;
            }

            Telescope::hideRequestParameters(['_token']);

            Telescope::hideRequestHeaders([
                'cookie',
                'x-csrf-token',
                'x-xsrf-token',
            ]);
        }

        /**
         * Register the Telescope gate.
         */
        protected function gate(): void
        {
            Gate::define('viewTelescope', function ($user) {
                $admins = env('TELESCOPE_ADMINS', '');
                $adminEmails = array_filter(array_map('trim', explode(',', $admins)));
                return in_array($user->email, $adminEmails);
            });
        }
    }

} else {
    /**
     * Fallback class jika Telescope tidak diinstall (Production)
     */
    class TelescopeServiceProvider extends \Illuminate\Support\ServiceProvider 
    {
        public function register(): void {}
        public function boot(): void {}
    }
}