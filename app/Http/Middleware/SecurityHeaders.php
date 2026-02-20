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

        // 2. CSP Versi Cerdas
        if (app()->environment('local')) {
            // JIKA DI LOCAL: Sangat longgar untuk kebutuhan Vite & Debugging
            $csp = "default-src 'self' 'unsafe-inline' 'unsafe-eval'; ";
            $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: data: blob:; ";
            $csp .= "style-src 'self' 'unsafe-inline' https: http:; ";
            $csp .= "img-src 'self' data: https: http:; ";
            $csp .= "font-src 'self' data: https: http:; ";
            $csp .= "connect-src 'self' https: http: ws: wss:; ";
        } else {
            // JIKA DI PRODUCTION: Ketat tapi mengizinkan CDN yang kamu pakai
            $csp = "default-src 'self'; ";

            // SCRIPT: Izinkan unpkg, jsdelivr, cdnjs (untuk nprogress), instant.page, dan cloudflare insights
            $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' 
                https://unpkg.com 
                https://cdn.jsdelivr.net 
                https://cdnjs.cloudflare.com 
                https://instant.page 
                https://static.cloudflareinsights.com; ";

            // STYLE: Izinkan fonts bunny dan cdnjs (untuk css nprogress)
            $csp .= "style-src 'self' 'unsafe-inline' 
                https://fonts.bunny.net 
                https://cdnjs.cloudflare.com; ";

            // IMG: Izinkan data: (untuk favicon/svg) dan https:
            $csp .= "img-src 'self' data: https:; ";

            // FONT: Izinkan fonts bunny
            $csp .= "font-src 'self' data: https://fonts.bunny.net; ";

            // CONNECT: Izinkan analytics cloudflare (biar ga error di konsol)
            $csp .= "connect-src 'self' https://cloudflareinsights.com; ";

            $csp .= "upgrade-insecure-requests;";
        }

        $response->headers->set('Content-Security-Policy', $csp);

        return $response;
    }
}