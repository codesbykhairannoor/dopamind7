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
Route::middleware(['auth', 'verified'])->group(function () {
    
    // 🔥 PERUBAHAN UTAMA: Dashboard sekarang dipegang HabitController
    // Jadi '/dashboard' itu isinya Habit Tracker. Gak perlu '/habits' terpisah.
    Route::get('/dashboard', [HabitController::class, 'index'])->name('dashboard');

    // === ROUTE HABITS (Logic) ===
    // Kita group biar rapi dan depannya otomatis '/habits'
    Route::prefix('habits')->name('habits.')->group(function () {
        // Karena halaman utamanya udah di '/dashboard', index di sini opsional.
        // Tapi kalau sidebar lu ngarah ke route('habits.index'), kita arahin ke controller yg sama.
        Route::get('/', [HabitController::class, 'index'])->name('index'); 
        
        Route::post('/', [HabitController::class, 'store'])->name('store');
        Route::post('/copy', [HabitController::class, 'copyFromPrevious'])->name('copy');
        Route::post('/mood', [HabitController::class, 'updateMood'])->name('mood');
        
        // Route yang butuh ID spesifik
        Route::patch('/{habit}', [HabitController::class, 'update'])->name('update');
        Route::delete('/{habit}', [HabitController::class, 'destroy'])->name('destroy');
        Route::post('/{habit}/log', [HabitController::class, 'storeLog'])->name('log');
    });

    // === ROUTE SETTINGS ===
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');

    // === ROUTE PROFILE ===
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__.'/auth.php';