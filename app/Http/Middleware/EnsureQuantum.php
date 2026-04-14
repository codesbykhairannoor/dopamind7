<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureQuantum
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route("login");
        }

        if (!($user->isQuantum() || $user->isLegendary())) {
            if ($request->wantsJson()) {
                return response()->json(["message" => "Quantum monthly or Legendary lifetime subscription required."], 403);
            }

            return redirect()->route("billing")->with("error", "Quantum monthly or Legendary lifetime subscription required.");
        }

        return $next($request);
    }
}
