<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckModuleStatus
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $module): Response
    {
        $user = $request->user();

        // Cek apakah settingan module tersebut bernilai false
        // Kita gunakan default true (?? true) jika settingan belum ada
        $isAllowed = $user->settings['modules'][$module] ?? true;

        if (!$isAllowed) {
            // Jika modul dimatikan, lempar ke dashboard dengan pesan error
            return redirect()->route('dashboard')->with('error', "Modul {$module} sedang dinonaktifkan.");
        }

        return $next($request);
    }
}