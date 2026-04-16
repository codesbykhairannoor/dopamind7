<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
     *
     * Optimasi:
     * - Trial expiry check di-cache per user (tidak query DB setiap request)
     * - resume_text & resume_filename lazy (fn) — hanya di-load saat dibutuhkan
     * - Tidak ada query DB berat di sini
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $trialExpired = false;

        // Cek trial expiry hanya sekali per 5 menit per user (bukan setiap request)
        if ($user && $user->premium_until) {
            $cacheKey = "trial_check_{$user->id}";
            $trialExpired = Cache::remember($cacheKey, 300, function () use ($user) {
                if (now()->greaterThan($user->premium_until)) {
                    $user->update([
                        'is_premium'    => 'false',
                        'plan_type'     => 'explorer',
                        'premium_until' => null,
                    ]);
                    return true;
                }
                return false;
            });
        }

        return array_merge(parent::share($request), [
            // 1. DATA USER
            'auth' => [
                'user' => $user ? [
                    'id'              => $user->id,
                    'name'            => $user->name,
                    'email'           => $user->email,
                    'settings'        => $user->settings,
                    'timezone'        => $user->timezone ?? config('app.timezone'),
                    'avatar_url'      => $user->avatar_url,
                    // Lazy: hanya di-load saat halaman yang butuh (Jobs/Profile)
                    'resume_text'     => fn () => $user->resume_text,
                    'resume_filename' => fn () => $user->resume_filename,
                    'is_premium'      => $user->is_premium,
                    'plan_type'       => $user->plan_type,
                    'premium_until'   => $user->premium_until,
                    'has_used_trial'  => $user->has_used_trial,
                ] : null,
            ],

            // 2. CONFIG GLOBAL
            'app_config' => [
                'name'          => config('app.name'),
                'currency'      => $user?->settings['currency'] ?? 'IDR',
                'date_format'   => $user?->settings['date_format'] ?? 'Y-m-d',
                'trial_expired' => $trialExpired,
            ],

            // 3. FLASH MESSAGES (lazy — hanya di-resolve saat ada)
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error'   => fn () => $request->session()->get('error'),
                'success' => fn () => $request->session()->get('success'),
            ],

            // 4. LOCALE & MISC
            'locale'                 => fn () => app()->getLocale(),
            'csrf_token'             => csrf_token(),
            'midtrans_is_production' => config('midtrans.is_production'),
            'paypal_client_id'       => config('paypal.' . config('paypal.mode', 'live') . '.client_id'),
            'recaptcha_site_key'     => config('services.recaptcha.site_key'),
            'session_id'             => $request->session()->getId(),
        ]);
    }
}