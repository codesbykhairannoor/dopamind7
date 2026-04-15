<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TrialController extends Controller
{
    public function start(Request $request)
    {
        $user = $request->user();

        if ($user->has_used_trial) {
            return back()->with('error', 'Anda sudah pernah menggunakan masa percobaan gratis.');
        }

        if ($user->is_premium && $user->plan_type !== 'trial') {
            return back()->with('error', 'Anda sudah memiliki paket premium aktif.');
        }

        $user->update([
            'is_premium' => true,
            'plan_type' => 'architect', // Mengikuti paket trial yang diminta user
            'premium_until' => now()->addDays(10),
            'has_used_trial' => true,
        ]);

        return back()->with('success', 'Masa percobaan 10 Hari Architect Anda telah dimulai!');
    }
}
