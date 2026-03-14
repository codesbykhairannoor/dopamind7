<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Settings/Index', [
            'mustVerifyEmail' => $request->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
            'hasPassword' => !is_null($request->user()->password),
            'midtrans_client_key' => config('midtrans.client_key'),
            'userSettings' => $request->user()->settings,
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        // Update kolom JSON
        // Kita merge dengan settingan lama biar gak ilang data lain
        $currentSettings = $user->settings ?? [];
        $newSettings = array_merge($currentSettings, $request->input('settings'));

        $user->settings = $newSettings;
        $user->save();

        return back()->with('success', 'Tampilan berhasil diatur!');
    }
}
