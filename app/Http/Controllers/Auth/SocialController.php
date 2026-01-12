<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialController extends Controller
{
    // 1. Lempar User ke Google
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    // 2. Google Balikin User ke Kita
    public function callback()
    {
        try {
            // 🔥 TAMBAHAN: Kasih tau PHPStan kalau ini User dari Socialite v2
            /** @var \Laravel\Socialite\Two\User $googleUser */
            $googleUser = Socialite::driver('google')->user();

            // Cek: Apakah user ini udah ada di database?
            $user = User::where('google_id', $googleUser->id)->first();

            if ($user) {
                // Kalau ada, langsung login
                Auth::login($user);
                return redirect('/dashboard');
            } else {
                // Cek lagi: Apakah emailnya udah dipake daftar manual?
                $existingUser = User::where('email', $googleUser->email)->first();

                if ($existingUser) {
                    // Kalau email sama, kita sambungin akun Google-nya
                    $existingUser->update(['google_id' => $googleUser->id]);
                    Auth::login($existingUser);
                } else {
                    // Kalau belum ada sama sekali, bikin user baru
                    $newUser = User::create([
                        'name' => $googleUser->name,
                        'email' => $googleUser->email,
                        'google_id' => $googleUser->id,
                        'password' => bcrypt(Str::random(16)), // Password acak (dummy)
                    ]);
                    Auth::login($newUser);
                }
                
                return redirect('/dashboard');
            }
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Login Google Gagal.');
        }
    }
}