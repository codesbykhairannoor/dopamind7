<?php

use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\PlannerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
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
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/about', fn () => Inertia::render('About'))->name('about');

// --- GROUP 2: SOCIAL LOGIN ---
Route::get('/auth/google', [SocialController::class, 'redirect'])->name('google.login');
Route::get('/auth/google/callback', [SocialController::class, 'callback']);

// --- GROUP 3: AUTHENTICATED APP ---
Route::middleware(['auth'])->group(function () {

    // 1. DASHBOARD
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    // 2. PLANNER (Task Management) - PROTECTED
    Route::middleware(['module:planner'])->prefix('planner')->name('planner.')->group(function () {
        Route::get('/', [PlannerController::class, 'index'])->name('index');
        Route::post('/', [PlannerController::class, 'store'])->name('store');
        Route::patch('/{plannerTask}', [PlannerController::class, 'update'])->name('update');
        Route::delete('/{plannerTask}', [PlannerController::class, 'destroy'])->name('destroy');
        Route::patch('/{plannerTask}/toggle', [PlannerController::class, 'toggle'])->name('toggle');
        Route::post('/log', [PlannerController::class, 'updateLog'])->name('updateLog');
        Route::post('/reset', [PlannerController::class, 'resetBoard'])->name('reset');
    });

    // 3. HABIT TRACKER - PROTECTED
    Route::middleware(['module:habit'])->prefix('habits')->name('habits.')->group(function () {
        Route::get('/', [HabitController::class, 'index'])->name('index');
        Route::post('/', [HabitController::class, 'store'])->name('store');
        Route::post('/copy', [HabitController::class, 'copyFromPrevious'])->name('copy');
        Route::post('/mood', [HabitController::class, 'updateMood'])->name('mood');
        Route::patch('/{habit}', [HabitController::class, 'update'])->name('update');
        Route::delete('/{habit}', [HabitController::class, 'destroy'])->name('destroy');
        Route::post('/{habit}/log', [HabitController::class, 'storeLog'])->name('log');
    });

   // 4. FINANCE - PROTECTED
Route::middleware(['module:finance'])->prefix('finance')->name('finance.')->group(function () {
    Route::get('/', [FinanceController::class, 'index'])->name('index');
    
    // Transaksi
    Route::post('/transaction', [FinanceController::class, 'storeTransaction'])->name('transaction.store');
    Route::patch('/transaction/{financeTransaction}', [FinanceController::class, 'updateTransaction'])->name('transaction.update');
    Route::delete('/transaction/{financeTransaction}', [FinanceController::class, 'destroyTransaction'])->name('transaction.destroy');
    
    // Budget (Pastikan pakai {financeBudget} agar sinkron dengan Controller)
    Route::post('/budget', [FinanceController::class, 'storeBudget'])->name('budget.store');
    Route::put('/budget/{financeBudget}', [FinanceController::class, 'updateBudget'])->name('budget.update');
    Route::delete('/budget/{financeBudget}', [FinanceController::class, 'destroyBudget'])->name('budget.destroy');
});

    // 5. SETTINGS & PROFILE (Always Accessible)
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__.'/auth.php';