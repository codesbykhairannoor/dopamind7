<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Update user's notification preferences.
     */
    public function updatePreferences(Request $request)
    {
        $validated = $request->validate([
            'preferences' => 'required|array',
            'preferences.*.enabled' => 'required|boolean',
            'preferences.*.time' => 'required|string|regex:/^[0-2][0-9]:[0-5][0-9]$/',
        ]);

        $user = $request->user();
        $user->update([
            'notification_preferences' => $validated['preferences']
        ]);

        return back()->with('success', 'Pengaturan notifikasi berhasil diperbarui!');
    }
}
