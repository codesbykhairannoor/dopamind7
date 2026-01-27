<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            /** @var \Laravel\Socialite\Two\User $googleUser */
            $googleUser = Socialite::driver('google')->user();

            // Cek user berdasarkan google_id
            $user = User::where('google_id', $googleUser->id)->first();

            if ($user) {
                // LOGIN DENGAN REMEMBER ME TRUE
                Auth::login($user, true);
                return redirect()->intended('/dashboard');
            } 

            // Cek berdasarkan email jika google_id belum ada
            $existingUser = User::where('email', $googleUser->email)->first();

            if ($existingUser) {
                $existingUser->update(['google_id' => $googleUser->id]);
                Auth::login($existingUser, true);
            } else {
                // Buat user baru jika belum terdaftar
                $newUser = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'password' => bcrypt(Str::random(16)),
                    // Inisialisasi settings default jika diperlukan
                    'settings' => [
                        'modules' => [
                            'habit' => true,
                            'planner' => true,
                            'finance' => true,
                        ]
                    ]
                ]);
                Auth::login($newUser, true);
            }

            return redirect()->intended('/dashboard');

        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Login Google Gagal: ' . $e->getMessage());
        }
    }
}