<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        // 🔥 FIX: Hanya ambil 'name' dan 'email' untuk di-fill. 
        // Jangan masukkan 'avatar' karena 'avatar' itu berupa file gambar, bukan teks biasa!
        $user->fill($request->only(['name', 'email']));

        // =========================================================
        // 📸 LOGIC UPLOAD AVATAR (NATIVE LARAVEL - TANPA EXTENSION GD)
        // =========================================================
        if ($request->hasFile('avatar')) {
            
            // A. Hapus Avatar Lama (Jika ada) supaya storage tidak penuh
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }

            // B. Simpan file asli langsung ke storage (storage/app/public/avatars)
            // Otomatis membuat nama file hash yang unik
            $path = $request->file('avatar')->store('avatars', 'public');

            // C. Simpan Path ke Database (Tabel kita pakainya avatar_path)
            $user->avatar_path = $path;
        }
        // =========================================================

        // Reset verifikasi email kalau email diganti
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        // 🔥 TAMBAHAN: Hapus foto profil dari storage pas akun dihapus
        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}