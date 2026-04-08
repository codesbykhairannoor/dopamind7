<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSubscription
{
    public function handle(Request $request, Closure $next, string $feature = 'pro'): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        if ($feature === 'ai') {
            if (!$user->hasAiFeature()) {
                if ($request->wantsJson()) {
                    return response()->json(['message' => 'Quantum (AI) subscription required.'], 403);
                }
                return redirect()->route('pricing')->with('error', 'Quantum (AI) subscription required.');
            }
        } else {
            if (!$user->isArchitect()) {
                if ($request->wantsJson()) {
                    return response()->json(['message' => 'Architect (Pro) subscription required.'], 403);
                }
                return redirect()->route('pricing')->with('error', 'Architect (Pro) subscription required.');
            }
        }

        return $next($request);
    }
}
