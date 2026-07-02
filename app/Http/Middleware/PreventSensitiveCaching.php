<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PreventSensitiveCaching
{
    /**
     * Handle an incoming request.
     * Prevents browser and CDN caching for authenticated/sensitive routes.
     * (OWASP A01: Broken Access Control & Security Misconfiguration)
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Append Cache-Control headers to ensure sensitive data is not stored locally
        // We only apply this strictly for authenticated sessions to not ruin SEO/Edge caching for public pages.
        if (auth()->check()) {
            $response->headers->set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
            $response->headers->set('Pragma', 'no-cache');
            $response->headers->set('Expires', '0');
        }

        return $response;
    }
}
