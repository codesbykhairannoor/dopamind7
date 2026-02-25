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
        // 1. Cek Session
        if (Session::has('locale')) {
            App::setLocale(Session::get('locale'));
        } 
        // 2. Cek Cookie
        elseif ($cookieLocale = $request->cookie('selected_locale')) {
            if (in_array($cookieLocale, ['id', 'en'])) {
                App::setLocale($cookieLocale);
                Session::put('locale', $cookieLocale);
            }
        } 
        // 3. Fallback
        else {
            App::setLocale(config('app.locale'));
        }

        $response = $next($request);

        /**
         * FIX: Cek apakah response mendukung method cookie.
         * Jika ada error di Controller, $response mungkin bukan objek 
         * yang bisa ditempeli cookie, jadi kita harus aman di sini.
         */
        if (Session::has('locale') && method_exists($response, 'cookie')) {
            return $response->cookie('selected_locale', Session::get('locale'), 60 * 24 * 30);
        }

        return $response;
    }
}