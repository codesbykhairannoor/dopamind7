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
                    'avatar_url' => $request->user()->avatar_url,
                    'resume_text' => $request->user()->resume_text,
                    'resume_filename' => $request->user()->resume_filename,
                    'is_premium' => true, // Temporarily unlocked for everyone globally.
                    'premium_until' => now()->addYears(10), // Give arbitrarily long time
                    'tier'       => 2, // Force Architect Tier (2) or higher
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
            'csrf_token' => csrf_token(),
            'midtrans_is_production' => config('midtrans.is_production'),
        ]);
    }
}