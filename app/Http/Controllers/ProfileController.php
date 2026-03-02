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
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'hasPassword' => !is_null($request->user()->password), 
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user->fill($request->only(['name', 'email']));

        if ($request->hasFile('avatar')) {
            // 🔥 Sama, fallback public agar gambar tidak error
            $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');

            if ($user->avatar_path && !str_starts_with($user->avatar_path, 'http')) {
                Storage::disk($disk)->delete($user->avatar_path);
            }

            $path = $request->file('avatar')->store('avatars', $disk);
            $user->avatar_path = $path;
        }

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');

        Auth::logout();

        if ($user->avatar_path && !str_starts_with($user->avatar_path, 'http')) {
            Storage::disk($disk)->delete($user->avatar_path);
        }

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}