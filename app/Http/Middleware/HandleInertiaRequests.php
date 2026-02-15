<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root view that is loaded on the first page visit.
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            // 1. DATA USER (Sudah rapi & aman)
            'auth' => [
                'user' => $request->user() ? [
                    'id'       => $request->user()->id,
                    'name'     => $request->user()->name,
                    'email'    => $request->user()->email,
                    'settings' => $request->user()->settings,
                    'timezone' => $request->user()->timezone ?? config('app.timezone'),
                ] : null,
            ],

            // 2. CONFIG GLOBAL (Dibuat Guest-Safe agar tidak error pas belum login)
            'app_config' => [
                'name'        => config('app.name'),
                'currency'    => $request->user()?->settings['currency'] ?? 'IDR',
                'date_format' => $request->user()?->settings['date_format'] ?? 'Y-m-d',
            ],

            // 3. FLASH MESSAGES (Notifikasi)
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error'   => fn () => $request->session()->get('error'),
                'success' => fn () => $request->session()->get('success'),
            ],

            // 4. 🔥 BRIDGE BAHASA (Ini nyawa buat laravel-vue-i18n lo)
            'locale' => function () {
                return app()->getLocale();
            },
        ]);
    }
}