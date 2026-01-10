<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings/Index', [
            // Kirim settingan user saat ini
            'userSettings' => Auth::user()->settings,
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