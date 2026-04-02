<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class HandleLocalization
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = config('app.locale');

        // 1. Cek Session (Manual Toggle Terkini)
        if (Session::has('locale')) {
            $locale = Session::get('locale');
        }
        // 2. Cek Cookie (Persistence)
        elseif ($cookieLocale = $request->cookie('selected_locale')) {
            if (in_array($cookieLocale, ['id', 'en'])) {
                $locale = $cookieLocale;
                Session::put('locale', $locale);
            }
        }
        // 3. Fallback: Deteksi otomatis Browser (International SEO Friendly)
        else {
            $browserLocale = substr($request->getLanguages()[0] ?? 'en', 0, 2);
            $locale = (in_array($browserLocale, ['id'])) ? 'id' : 'en'; // Default ke 'en' untuk global

            Session::put('locale', $locale);
        }

        App::setLocale($locale);

        $response = $next($request);

        // Pastikan cookie selalu sinkron dengan locale yang aktif
        if (method_exists($response, 'cookie')) {
            $response->cookie('selected_locale', $locale, 60 * 24 * 30);
        }

        return $response;
    }
}