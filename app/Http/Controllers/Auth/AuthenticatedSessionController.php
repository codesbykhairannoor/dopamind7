<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        // 🔒 Stay Logged In: Force remember me to prevent accidental kick-outs
        $request->merge(['remember' => true]);
        
        $request->authenticate();

        $request->session()->regenerate();

        // 🔥 Role-Based Redirect: Admin go to Power Room, Users go to Dashboard
        if ($request->user()->is_admin) {
            return redirect()->intended(route('admin.blog.index'));
        }

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // 🔥 Memaksa keluar dari mode SPA dan memuat ulang halaman secara penuh ke Blade
        return Inertia::location('/');
    }
}