<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            $user = $request->user();
            $user->sendEmailVerificationNotification();
            \Illuminate\Support\Facades\Log::info('Resent verification email to: ' . $user->email);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Resend verification email FAILED on Production: ' . $e->getMessage());
            // Berikan pesan ramah alih-alih melempar Error 500 yang "Oops"
            return back()->with('error', 'Gagal memicu pengiriman email. Silakan coba 1 menit lagi atau cek folder spam Anda.');
        }

        return back()->with('status', 'verification-link-sent');
    }
}
