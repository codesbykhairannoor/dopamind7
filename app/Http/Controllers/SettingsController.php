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

    /**
     * Semua tab Settings di-render oleh satu Inertia component (Settings/Index).
     * Tab switching terjadi di client-side tanpa server round-trip.
     * initialTab dikirim agar deep-link (/settings/security) langsung buka tab yang benar.
     */
    private function renderSettings(Request $request, string $tab): \Inertia\Response
    {
        return Inertia::render('Settings/Index', [
            'mustVerifyEmail' => $request->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status'          => session('status'),
            'hasPassword'     => !is_null($request->user()->password),
            'userSettings'    => $request->user()->settings,
            'initialTab'      => $tab,
        ]);
    }

    public function general(Request $request)
    {
        return $this->renderSettings($request, 'general');
    }

    public function security(Request $request)
    {
        return $this->renderSettings($request, 'security');
    }

    public function modules(Request $request)
    {
        return $this->renderSettings($request, 'modules');
    }

    public function notifications(Request $request)
    {
        return $this->renderSettings($request, 'notifications');
    }

    public function billing(Request $request)
    {
        return $this->renderSettings($request, 'billing');
    }

    public function privacy(Request $request)
    {
        return $this->renderSettings($request, 'privacy');
    }

    public function help(Request $request)
    {
        return $this->renderSettings($request, 'help');
    }

    public function sendSupportMail(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $user = Auth::user();

        // 🔥 LOGIC: Kirim email ke oneformindapp@gmail.com
        try {
            \Illuminate\Support\Facades\Mail::raw("From: {$user->name} ({$user->email})\n\nSubject: {$validated['subject']}\n\nMessage:\n{$validated['message']}", function ($message) use ($user, $validated) {
                $message->to('oneformindapp@gmail.com')
                    ->subject("[Support] {$validated['subject']} - From {$user->name}");
            });

            return back()->with('success', 'Your message has been sent to our support team!');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("Support Mail Failed: " . $e->getMessage());
            return back()->with('error', 'Failed to send message. Please try again later.');
        }
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        // Merge dengan settingan lama biar gak ilang data lain
        $currentSettings = $user->settings ?? [];
        $newSettings = array_merge($currentSettings, $request->input('settings'));

        $user->settings = $newSettings;
        $user->save();

        return back()->with('success', 'Tampilan berhasil diatur!');
    }
}
