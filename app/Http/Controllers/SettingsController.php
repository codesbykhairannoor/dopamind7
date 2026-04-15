<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index(Request $request)
    {
        // Backward-compatible landing: /settings -> /settings/general
        return redirect()->route('settings.general');
    }

    private function baseProps(Request $request): array
    {
        return [
            'mustVerifyEmail' => $request->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
            'hasPassword' => !is_null($request->user()->password),
            'userSettings' => $request->user()->settings,
        ];
    }

    public function general(Request $request)
    {
        return Inertia::render('Settings/General', $this->baseProps($request));
    }

    public function security(Request $request)
    {
        return Inertia::render('Settings/Security', $this->baseProps($request));
    }

    public function modules(Request $request)
    {
        return Inertia::render('Settings/Modules', $this->baseProps($request));
    }

    public function notifications(Request $request)
    {
        return Inertia::render('Settings/Notifications', $this->baseProps($request));
    }

    public function billing(Request $request)
    {
        return Inertia::render('Settings/Billing', $this->baseProps($request));
    }

    public function privacy(Request $request)
    {
        return Inertia::render('Settings/Privacy', $this->baseProps($request));
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
