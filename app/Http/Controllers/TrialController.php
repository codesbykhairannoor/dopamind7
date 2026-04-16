<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TrialController extends Controller
{
    public function start(Request $request)
    {
        $user = $request->user();

        if ($user->has_used_trial) {
            return back()->with('error', __('authentication.auth_error_trial_used') ?: 'Anda sudah pernah menggunakan masa percobaan gratis.');
        }

        if ($user->is_premium && $user->plan_type !== 'explorer') {
            return back()->with('error', 'Anda sudah memiliki paket premium aktif.');
        }

        $user->update([
            'is_premium' => true,
            'plan_type' => 'architect', // User trial mendapatkan akses setara Architect
            'premium_until' => now()->addDays(10),
            'has_used_trial' => true,
        ]);

        // Meta Pixel & CAPI Event
        $eventId = $request->input('meta_event_id') ?? ('ofm-starttrial-' . \Illuminate\Support\Str::uuid());
        
        try {
            $metaCapi = new \App\Services\MetaCapiService();
            $metaCapi->startTrial([
                'id' => $user->id,
                'email' => $user->email,
                'first_name' => explode(' ', trim($user->name))[0] ?? $user->name,
            ], $eventId);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Meta CAPI Error on Start Trial: ' . $e->getMessage());
        }

        return back()->with('success', __('global.trial_success_text') ?: 'Masa percobaan 10 Hari Architect Anda telah dimulai!');
    }
}
