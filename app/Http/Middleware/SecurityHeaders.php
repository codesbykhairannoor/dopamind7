<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // 1. Header Dasar (Best Practice)
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // URL Vite untuk Lokal
        $viteUrl = "http://127.0.0.1:5173 http://localhost:5173 ws://127.0.0.1:5173 ws://localhost:5173";

        // 2. CSP (Content Security Policy)
        if (app()->environment('local', 'development', 'testing')) {
            // LOKAL: Sangat longgar agar Vite, Hot Reload (HMR), dan Debugbar lancar
            $csp = "default-src 'self' 'unsafe-inline' 'unsafe-eval' $viteUrl; " .
                   "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: data: blob: $viteUrl; " .
                   "style-src 'self' 'unsafe-inline' https: http: $viteUrl; " .
                   "img-src 'self' data: https: http: blob:; " .
                   "font-src 'self' data: https: http:; " .
                   "connect-src 'self' https: http: ws: wss: $viteUrl;";
        } else {
            // KETAT DI PRODUCTION (Tapi mengizinkan GTM & Analytics)
            $csp = "default-src 'self'; ";
            $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://unpkg.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://instant.page https://static.cloudflareinsights.com; ";
            $csp .= "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://cdnjs.cloudflare.com; ";
            $csp .= "img-src 'self' data: blob: https: https://www.google-analytics.com https://www.googletagmanager.com; ";
            $csp .= "font-src 'self' data: https://fonts.bunny.net; ";
            $csp .= "connect-src 'self' https://cloudflareinsights.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; ";
            $csp .= "upgrade-insecure-requests;";
        }

        // Membersihkan karakter baris baru
        $cleanCsp = str_replace(["\r", "\n"], '', $csp);
        $response->headers->set('Content-Security-Policy', $cleanCsp);

        return $response;
    }
}