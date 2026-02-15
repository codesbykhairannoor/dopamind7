<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id'       => $request->user()->id,
                    'name'     => $request->user()->name,
                    'email'    => $request->user()->email,
                    'settings' => $request->user()->settings,
                    'timezone' => $request->user()->timezone ?? config('app.timezone'),
                ] : null,
            ],

            'app_config' => [
                'name'      => config('app.name'),
                'currency'  => $request->user()->settings['currency'] ?? 'USD',
                'date_format' => $request->user()->settings['date_format'] ?? 'Y-m-d',
            ],

            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error'   => fn () => $request->session()->get('error'),
                'success' => fn () => $request->session()->get('success'),
            ],

            // 🔥 SHARE LOCALE KE VUE
            'locale' => app()->getLocale(),
        ]);
    }
}