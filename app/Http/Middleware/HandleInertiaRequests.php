<?php

namespace App\Http\Middleware;

use App\Models\Habit;
use App\Models\HabitLog;
use Carbon\Carbon;
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
        $manifestPath = public_path('build/manifest.json');
        return file_exists($manifestPath) ? md5_file($manifestPath) : parent::version($request);
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
                    'is_premium' => $request->user()->is_premium,
                    'plan_type'  => $request->user()->plan_type,
                    'premium_until' => $request->user()->premium_until,
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

            // 4. 🔥 BRIDGE BAHASA
            'locale' => function () {
                return app()->getLocale();
            },
            'csrf_token' => csrf_token(),
            'midtrans_is_production' => config('midtrans.is_production'),
            'session_id' => $request->session()->getId(),

            // 5. 🔥 GLOBAL HEADER: Habit streak & today progress
            // Optimized with Caching to prevent back-breaking DB loops on every request

        ]);
    }
}