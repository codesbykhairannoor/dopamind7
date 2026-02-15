<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;

class SocialController extends Controller
{
    public function redirect()
    {
        // 🔥 Pakai stateless() juga di sini biar gak nyimpen state di session
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function callback()
    {
        try {
            /** @var \Laravel\Socialite\Two\User $googleUser */
            // 🔥 KUNCI UTAMA: stateless() mematikan verifikasi state session. 
            // Ini wajib di production (Railway) biar gak kena "Page Expired" / InvalidStateException
            $googleUser = Socialite::driver('google')->stateless()->user();

            // 1. Cek user berdasarkan google_id
            $user = User::where('google_id', $googleUser->id)->first();

            if ($user) {
                // Login dan paksa simpan kuki remember me
                Auth::login($user, true);
                return redirect()->route('dashboard');
            } 

            // 2. Cek berdasarkan email jika google_id belum ada (User lama daftar manual)
            $existingUser = User::where('email', $googleUser->email)->first();

            if ($existingUser) {
                $existingUser->update([
                    'google_id' => $googleUser->id,
                    'email_verified_at' => now(), // Auto verify karena login Google
                ]);
                Auth::login($existingUser, true);
            } else {
                // 3. Buat user baru jika benar-benar baru
                $newUser = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'password' => bcrypt(Str::random(16)), // Password acak
                    'email_verified_at' => now(),
                    'settings' => [
                        'modules' => [
                            'habit' => true,
                            'planner' => true,
                            'finance' => true,
                        ],
                        'currency' => 'IDR',
                        'timezone' => 'Asia/Jakarta'
                    ]
                ]);
                Auth::login($newUser, true);
            }

            // Lempar ke dashboard (Inertia/Vue)
            return redirect()->route('dashboard');

        } catch (\Exception $e) {
            // Log error ke storage/logs biar lo bisa cek di terminal Railway
            Log::error('ERROR GOOGLE LOGIN: ' . $e->getMessage());

            // Tampilkan error mentah di layar buat debug (hapus kalau sudah fix)
            if (config('app.debug')) {
                dd([
                    'message' => 'Gagal Login Google',
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
            }

            return redirect()->route('login')->with('error', 'Login Google Gagal, silakan coba lagi.');
        }
    }
}