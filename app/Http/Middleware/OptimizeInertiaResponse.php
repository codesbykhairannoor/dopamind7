<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * OptimizeInertiaResponse
 *
 * Menambahkan HTTP caching headers yang tepat untuk Inertia responses:
 * - Inertia XHR requests: no-store (data selalu fresh dari server)
 * - Static assets (JS/CSS): cache panjang via Vite fingerprinting
 * - HTML shell: cache singkat dengan revalidation
 *
 * Ini memastikan browser tidak re-download JS/CSS yang sama,
 * tapi data halaman selalu fresh.
 */
class OptimizeInertiaResponse
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Inertia XHR request (navigasi antar halaman)
        if ($request->header('X-Inertia')) {
            $response->headers->set('Cache-Control', 'no-cache, no-store, must-revalidate');
            $response->headers->set('Pragma', 'no-cache');
            return $response;
        }

        // Full page load (HTML shell) — bisa di-cache singkat karena Inertia
        // akan re-fetch data via XHR saat navigasi
        if ($request->isMethod('GET') && !$request->expectsJson()) {
            // Vary: Accept header penting untuk Inertia agar CDN tidak cache HTML untuk XHR
            $response->headers->set('Vary', 'Accept, X-Inertia');
        }

        return $response;
    }
}
