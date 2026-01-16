<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage; // <--- WAJIB: Buat akses S3/Local
use Inertia\Inertia; // <--- WAJIB: Buat kompres gambar
use Inertia\Response;
use Intervention\Image\Laravel\Facades\Image;

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

        // 1. Validasi Data Teks (Nama & Email)
        $user->fill($request->validated());

        // =========================================================
        // 📸 LOGIC UPLOAD AVATAR (ANTI NYESEL MASA DEPAN)
        // =========================================================
        if ($request->hasFile('avatar')) {
            // Validasi Khusus Gambar (Max 2MB)
            $request->validate([
                'avatar' => ['image', 'mimes:jpeg,png,jpg', 'max:2048'],
            ]);

            // A. Hapus Avatar Lama (Jika ada)
            // Biar storage gak penuh sama foto mantan (file lama)
            if ($user->avatar_path) {
                Storage::delete($user->avatar_path);
            }

            // B. Proses Kompresi & Resize
            // Kita paksa jadi kotak 300x300 biar rapi di lingkaran CSS
            $image = Image::read($request->file('avatar'))
                ->cover(300, 300) // Crop tengah (Center)
                ->toJpeg(80);     // Convert ke JPG kualitas 80% (Hemat Size)

            // C. Buat Nama File Unik
            // Format: avatars/USERID-TIMESTAMP.jpg
            $filename = 'avatars/'.$user->id.'-'.time().'.jpg';

            // D. Upload ke Storage (Otomatis detect S3 atau Local dari .env)
            Storage::put($filename, $image);

            // E. Simpan Path ke Database
            $user->avatar_path = $filename;
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
            Storage::delete($user->avatar_path);
        }

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
