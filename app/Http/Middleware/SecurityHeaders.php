<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // 1. Header Dasar (Tetap sama)
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // 2. CSP (Content Security Policy)
        if (app()->environment('local')) {
            $csp = "default-src 'self' 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: data: blob:; style-src 'self' 'unsafe-inline' https: http:; img-src 'self' data: https: http:; font-src 'self' data: https: http:; connect-src 'self' https: http: ws: wss:;";
        } else {
            // JIKA DI PRODUCTION: Pastikan SEMUA ditaruh dalam satu baris panjang tanpa ENTER
            $csp = "default-src 'self'; ";
            $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://instant.page https://static.cloudflareinsights.com; ";
            $csp .= "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://cdnjs.cloudflare.com; ";
            $csp .= "img-src 'self' data: https:; ";
            $csp .= "font-src 'self' data: https://fonts.bunny.net; ";
            $csp .= "connect-src 'self' https://cloudflareinsights.com; ";
            $csp .= "upgrade-insecure-requests;";
        }

        // Membersihkan jika ada karakter baris baru yang tidak sengaja terbawa
        $cleanCsp = str_replace(["\r", "\n"], '', $csp);

        $response->headers->set('Content-Security-Policy', $cleanCsp);

        return $response;
    }
}