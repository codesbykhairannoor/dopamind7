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
        $user->update([
            'onboarding_completed' => true,
            'onboarding_data' => $validated,
        ]);

        return redirect()->route('dashboard')->with('success', __('onboarding.finish_success', 'Welcome aboard! Your Neural OS is ready.'));
    }
}
