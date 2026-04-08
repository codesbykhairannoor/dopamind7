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
        // Midtrans Snap needs to be in an iframe, so use SAMEORIGIN instead of DENY
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // URL Vite untuk Lokal (Range port 5173-5176 jika port default terpakai)
        $viteUrl = "http://127.0.0.1:5173 http://localhost:5173 ws://127.0.0.1:5173 ws://localhost:5173 " .
            "http://127.0.0.1:5174 http://localhost:5174 ws://127.0.0.1:5174 ws://localhost:5174 " .
            "http://127.0.0.1:5175 http://localhost:5175 ws://127.0.0.1:5175 ws://localhost:5175 " .
            "http://127.0.0.1:5176 http://localhost:5176 ws://127.0.0.1:5176 ws://localhost:5176";

        $midtransUrls = "https://*.midtrans.com https://snap-assets.al-pc-id-b.cdn.gtflabs.io https://pay.google.com https://gwk.gopayapi.com";
        $googleUrls = "https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com";
        $assetUrl = config('app.asset_url') ? config('app.asset_url') : "";
        $appUrl = config('app.url') ? config('app.url') : "";
        $externalSources = "$assetUrl $appUrl";

        // 2. Deteksi Environment yang akurat
        $host = $request->getHost();
        $isLocal = app()->isLocal() ||
            config('app.debug') === true ||
            in_array($host, ['127.0.0.1', 'localhost']);

        if ($isLocal) {
            // LOKAL: Longgar agar Vite HMR lancar + Izinkan font & analytics umum
            $csp = "default-src 'self' 'unsafe-inline' 'unsafe-eval' $viteUrl $midtransUrls $googleUrls $externalSources; " .
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https://unpkg.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://instant.page $viteUrl $midtransUrls $googleUrls $externalSources; " .
                "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://fonts.googleapis.com https://cdnjs.cloudflare.com $viteUrl $externalSources; " .
                "img-src 'self' data: blob: *; " .
                "font-src 'self' data: https://fonts.bunny.net https://fonts.gstatic.com https://fonts.googleapis.com; " .
                "frame-src *; " .
                "connect-src 'self' ws: wss: $viteUrl $midtransUrls $googleUrls $externalSources;";
        }
        else {
            // PRODUCTION: Ketat tapi tetap izinkan Midtrans
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
            
            $csp = "default-src 'self'; ";
            $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://unpkg.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://instant.page https://static.cloudflareinsights.com $midtransUrls $externalSources; ";
            $csp .= "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://fonts.googleapis.com https://cdnjs.cloudflare.com $externalSources; ";
            $csp .= "img-src 'self' data: blob: https: https://www.google-analytics.com https://www.googletagmanager.com; ";
            $csp .= "font-src 'self' data: https://fonts.bunny.net https://fonts.gstatic.com https://fonts.googleapis.com; ";
            $csp .= "worker-src 'self' blob:; ";
            $csp .= "frame-src 'self' $midtransUrls; "; // Batasi frame hanya untuk self & midtrans
            $csp .= "frame-ancestors 'self'; "; // Cegah clickjacking ketat
            $csp .= "connect-src 'self' https://cloudflareinsights.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com $midtransUrls $externalSources; ";
            $csp .= "upgrade-insecure-requests;";
        }

        // 3. Permissions Policy (Matikan fitur hardware yang tidak dipakai)
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(self)');

        $cleanCsp = str_replace(["\r", "\n"], '', $csp);
        $response->headers->set('Content-Security-Policy', $cleanCsp);

        return $response;
    }
}