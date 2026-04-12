<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckModuleStatus
{
    /**
     * Modules only available to Architect+ tier.
     */
    private const ARCHITECT_MODULES = ['journal', 'calendar', 'job', 'goal'];

    /**
     * Modules only available to Quantum/AI tier.
     */
    private const AI_MODULES = ['ai_coach', 'neural_os'];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $module): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // 1. Enforce tier-based access
        if (in_array($module, self::AI_MODULES)) {
            if (!$user->hasAiFeature()) {
                if ($request->wantsJson()) {
                    return response()->json([
                        'message' => 'Quantum plan required for AI features.',
                        'required_plan' => 'quantum',
                    ], 403);
                }
                return redirect()->route('billing')->with('error', 'Fitur AI memerlukan paket Quantum.');
            }
        } elseif (in_array($module, self::ARCHITECT_MODULES)) {
            if (!$user->isArchitect()) {
                if ($request->wantsJson()) {
                    return response()->json([
                        'message' => 'Architect plan required.',
                        'required_plan' => 'architect',
                    ], 403);
                }
                return redirect()->route('billing')->with('error', 'Modul ' . ucfirst($module) . ' memerlukan paket Architect.');
            }
        }

        // 2. Check user-level module toggle (user can disable their own modules)
        $isEnabled = $user->settings['modules'][$module] ?? true;

        if (!$isEnabled) {
            return redirect()->route('dashboard')->with('error', "Modul {$module} sedang kamu nonaktifkan.");
        }

        return $next($request);
    }
}