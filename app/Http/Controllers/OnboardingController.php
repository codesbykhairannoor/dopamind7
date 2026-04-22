<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OnboardingController extends Controller
{
    /**
     * Show the onboarding form.
     */
    public function index()
    {
        // If already completed, redirect to dashboard
        if (Auth::user()->onboarding_completed) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Onboarding/Show');
    }

    /**
     * Store the onboarding data and complete the process.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'goal' => 'required|string',
            'pain_point' => 'required|string',
            'ambition' => 'required|string',
            'persona' => 'required|string',
        ]);

        $user = Auth::user();
        // 🔥 FIX POSTGRES BOOLEAN: Pakai DB::statement biar true jadi boolean beneran di Postgres
        \Illuminate\Support\Facades\DB::statement(
            "UPDATE users SET onboarding_completed = true, onboarding_data = ?::jsonb WHERE id = ?",
            [json_encode($validated), $user->id]
        );

        return redirect()->route('dashboard')->with('success', __('onboarding_finish_success'));
    }
}
