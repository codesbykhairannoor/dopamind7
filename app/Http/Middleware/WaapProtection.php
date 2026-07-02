<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class WaapProtection
{
    /**
     * Handle an incoming request.
     * Web Application & API Protection (WAAP) Middleware (Enterprise 2026)
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Bot Protection (Block known malicious/scraper user agents)
        $userAgent = strtolower($request->header('User-Agent', ''));
        
        $blockedBots = [
            'sqlmap', 'nmap', 'curl', 'wget', 'python-requests', 'python-urllib', 
            'java/', 'go-http-client', 'ruby', 'postmanruntime', 'scrapy', 'botnet',
            'libwww-perl', 'semrushbot', 'ahrefsbot', 'mj12bot', 'dotbot', 'petalbot'
        ];

        // Allowed AI/Search bots
        $allowedBots = [
            'googlebot', 'bingbot', 'gptbot', 'chatgpt-user', 'claude-web', 'anthropic'
        ];

        $isBlocked = false;
        foreach ($blockedBots as $bot) {
            if (str_contains($userAgent, $bot)) {
                $isBlocked = true;
                break;
            }
        }

        // Whitelist if matches allowed bot (basic heuristic)
        if ($isBlocked) {
            foreach ($allowedBots as $abot) {
                if (str_contains($userAgent, $abot)) {
                    $isBlocked = false;
                    break;
                }
            }
        }

        if ($isBlocked) {
            Log::warning("WAAP Bot Protection triggered. Blocked UA: {$userAgent} | IP: {$request->ip()}");
            abort(403, 'Access denied by WAAP policy.');
        }

        // 2. Basic IPS (Intrusion Prevention System)
        // Detect basic SQLi or XSS patterns in URL query strings (Defense in Depth)
        $queryString = strtolower($request->getQueryString() ?? '');
        $maliciousPatterns = [
            'select%20', 'insert%20', 'update%20', 'delete%20', 'drop%20', 'union%20',
            'script%3e', 'javascript:', 'onerror=', 'onload=', 'document.cookie'
        ];

        foreach ($maliciousPatterns as $pattern) {
            if (str_contains($queryString, $pattern)) {
                Log::warning("WAAP IPS triggered. Malicious payload detected: {$pattern} | IP: {$request->ip()}");
                abort(403, 'Request rejected by Security Policy.');
            }
        }

        // 3. Prevent HTTP Parameter Pollution (HPP)
        // Ensure no duplicate query parameters (can bypass some WAFs)
        // (Handled by PHP natively as it takes the last one, but we can enforce strictly if needed. Skipping for now as it's complex to parse perfectly without side effects on legitimate arrays like id[]=1&id[]=2).

        return $next($request);
    }
}
