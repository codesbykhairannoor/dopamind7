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
        // 1. Cek Session (Prioritas utama buat user yang sedang berinteraksi)
        if (Session::has('locale')) {
            App::setLocale(Session::get('locale'));
        } 
        // 2. Cek Cookie (Penyelamat buat halaman About/Blade murni & Session timeout)
        elseif ($cookieLocale = $request->cookie('selected_locale')) {
            // Pastikan locale yang di cookie valid
            if (in_array($cookieLocale, ['id', 'en'])) {
                App::setLocale($cookieLocale);
                Session::put('locale', $cookieLocale);
            }
        } 
        // 3. Fallback: Pakai default dari config/app.php
        else {
            App::setLocale(config('app.locale'));
        }

        $response = $next($request);

        /**
         * 🔥 MAGIC SAUCE:
         * Kita tempelkan cookie ke SETIAP response selama session locale ada.
         * Ini yang bikin halaman About (Blade) nggak bakal "lupa" bahasa 
         * karena browser megang fisik pilihannya.
         */
        if (Session::has('locale')) {
            $response->cookie('selected_locale', Session::get('locale'), 60 * 24 * 30); // Valid buat 30 hari
        }

        return $response;
    }
}