<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/User/Index', [
            'users' => User::latest()->get()
        ]);
    }

    public function togglePremium(User $user)
    {
        $user->update([
            'is_premium' => !$user->is_premium,
            'premium_until' => !$user->is_premium ? now()->addYear() : null,
        ]);

        return redirect()->back()->with('success', 'User status updated.');
    }

    public function toggleAdmin(User $user)
    {
        // Prevent self-demote
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'You cannot demote yourself.');
        }

        $user->update([
            'is_admin' => !$user->is_admin
        ]);

        return redirect()->back()->with('success', 'User admin status updated.');
    }
}
