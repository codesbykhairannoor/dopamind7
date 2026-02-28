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

        // 2. CSP (Content Security Policy)
        if (app()->environment('local')) {
            // Longgar di lokal agar Vite dan Debugbar lancar
            // 🔥 FIX: Ditambahkan 'blob:' pada img-src agar preview gambar URL.createObjectURL() diizinkan
            $csp = "default-src 'self' 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: data: blob:; style-src 'self' 'unsafe-inline' https: http:; img-src 'self' data: https: http: blob:; font-src 'self' data: https: http:; connect-src 'self' https: http: ws: wss:;";
        } else {
            // KETAT DI PRODUCTION (Tapi mengizinkan GTM & Analytics)
            $csp = "default-src 'self'; ";
            
            // Script: Tambah unpkg, cdnjs, Google Tag Manager, dan Google Analytics
            $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://unpkg.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://instant.page https://static.cloudflareinsights.com; ";
            
            // Style: Tambah fonts.bunny dan cdnjs
            $csp .= "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://cdnjs.cloudflare.com; ";
            
            // Image: Tambah Google Analytics (untuk tracking pixel)
            // 🔥 FIX: Ditambahkan 'blob:' agar saat Production preview foto tetep jalan
            $csp .= "img-src 'self' data: blob: https: https://www.google-analytics.com https://www.googletagmanager.com; ";
            
            // Fonts
            $csp .= "font-src 'self' data: https://fonts.bunny.net; ";
            
            // Connection: Tambah Cloudflare & Google Analytics (untuk kirim data event)
            $csp .= "connect-src 'self' https://cloudflareinsights.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; ";
            
            $csp .= "upgrade-insecure-requests;";
        }

        // Membersihkan jika ada karakter baris baru yang tidak sengaja terbawa agar tidak error di browser
        $cleanCsp = str_replace(["\r", "\n"], '', $csp);

        $response->headers->set('Content-Security-Policy', $cleanCsp);

        return $response;
    }
}