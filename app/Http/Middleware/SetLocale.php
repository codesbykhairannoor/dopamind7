<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        // 1. Priority: Query Parameter (for SEO crawlers following hreflang)
        if ($request->has('hl') && in_array($request->query('hl'), ['id', 'en'])) {
            $locale = $request->query('hl');
            App::setLocale($locale);
            // Optionally store in session for next requests
            Session::put('locale', $locale);
        }
        // 2. Global Session
        elseif (Session::has('locale')) {
            App::setLocale(Session::get('locale'));
        }

        return $next($request);
    }
}