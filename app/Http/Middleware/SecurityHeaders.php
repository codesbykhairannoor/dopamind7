<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // 1. Header Dasar
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // 2. CSP Versi Cerdas (Auto-Detect Local vs Production)
        if (app()->environment('local')) {
            // JIKA DI LOCAL: Izinkan semua yang berhubungan dengan localhost/Vite
            $csp = "default-src 'self' 'unsafe-inline' 'unsafe-eval'; ";
            $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: data: blob:; ";
            $csp .= "style-src 'self' 'unsafe-inline' https: http:; ";
            $csp .= "img-src 'self' data: https: http:; ";
            $csp .= "font-src 'self' data: https: http:; ";
            $csp .= "connect-src 'self' https: http: ws: wss:; ";
        } else {
            // JIKA DI PRODUCTION: Sangat Ketat
            $csp = "default-src 'self'; ";
            $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net; ";
            $csp .= "style-src 'self' 'unsafe-inline' https://fonts.bunny.net; ";
            $csp .= "img-src 'self' data: https:; ";
            $csp .= "font-src 'self' data: https://fonts.bunny.net; ";
            $csp .= "connect-src 'self'; ";
            $csp .= "upgrade-insecure-requests;";
        }

        $response->headers->set('Content-Security-Policy', $csp);

        return $response;
    }
}