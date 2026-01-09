<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HabitController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\SocialController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;



Route::get('/lang/{locale}', function ($locale) {
    if (in_array($locale, ['id', 'en'])) {
        Session::put('locale', $locale);
    }
    return back(); // Kembali ke halaman sebelumnya
})->name('lang.switch');

// --- GROUP 1: PUBLIC PAGES (GuestLayout) ---
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('about');

// --- GROUP 2: APP PAGES (AuthenticatedLayout - Sidebar) ---
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Habits (INI YANG BARU)
    Route::get('/habits', [HabitController::class, 'index'])->name('habits.index');
    Route::post('/habits', [HabitController::class, 'store'])->name('habits.store'); // <-- BARU: Simpan
    Route::delete('/habits/{habit}', [HabitController::class, 'destroy'])->name('habits.destroy'); // <-- BARU: Hapus
    Route::patch('/habits/{habit}', [HabitController::class, 'update'])->name('habits.update');
    Route::post('/habits/{habit}/log', [HabitController::class, 'storeLog'])->name('habits.log');

    // Profile (System)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/auth/google', [SocialController::class, 'redirect'])->name('google.login');
Route::get('/auth/google/callback', [SocialController::class, 'callback']);

require __DIR__.'/auth.php';