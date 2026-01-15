<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HabitController; // DashboardController kita buang aja
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\Auth\SocialController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

// --- UTILITY: SWITCH LANGUAGE ---
Route::get('/lang/{locale}', function ($locale) {
    if (in_array($locale, ['id', 'en'])) {
        Session::put('locale', $locale);
    }
    return back();
})->name('lang.switch');

// --- GROUP 1: PUBLIC PAGES (Guest) ---
Route::get('/', function () {
    // Kalau user udah login, lempar langsung ke Dashboard (Habit Tracker)
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// --- GROUP 2: SOCIAL LOGIN ---
Route::get('/auth/google', [SocialController::class, 'redirect'])->name('google.login');
Route::get('/auth/google/callback', [SocialController::class, 'callback']);

// --- GROUP 3: AUTHENTICATED APP (Sidebar Area) ---
Route::middleware(['auth'])->group(function () {
    
    // 1. DASHBOARD (Halaman Depan / Rangkuman)
    // Pake DashboardController yang baru kita buat
    Route::get('/dashboard', \App\Http\Controllers\DashboardController::class)->name('dashboard');

    // 2. HABIT TRACKER (Manajemen Habit)
    // Aksesnya via url '/habits', bukan dashboard lagi
    Route::prefix('habits')->name('habits.')->group(function () {
        Route::get('/', [\App\Http\Controllers\HabitController::class, 'index'])->name('index'); 
        Route::post('/', [\App\Http\Controllers\HabitController::class, 'store'])->name('store');
        Route::post('/copy', [\App\Http\Controllers\HabitController::class, 'copyFromPrevious'])->name('copy');
        Route::post('/mood', [\App\Http\Controllers\HabitController::class, 'updateMood'])->name('mood');
        
        Route::patch('/{habit}', [\App\Http\Controllers\HabitController::class, 'update'])->name('update');
        Route::delete('/{habit}', [\App\Http\Controllers\HabitController::class, 'destroy'])->name('destroy');
        Route::post('/{habit}/log', [\App\Http\Controllers\HabitController::class, 'storeLog'])->name('log');
    });

    // ... settings & profile tetap sama ...
    Route::get('/settings', [\App\Http\Controllers\SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\SettingsController::class, 'update'])->name('settings.update');

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [\App\Http\Controllers\ProfileController::class, 'update'])->name('update');
        Route::delete('/', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__.'/auth.php';