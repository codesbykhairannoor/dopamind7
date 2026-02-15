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
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use App\Models\Waitlist;
use Illuminate\Http\Request;


// --- UTILITY: SWITCH LANGUAGE ---
Route::get('/lang/{locale}', function (Request $request, $locale) {
    if (in_array($locale, ['id', 'en'])) {
        Session::put('locale', $locale);
        Session::save(); // Mastiin session kesimpen detik ini juga
        
        // Simpan di cookie buat backup halaman Blade murni
        cookie()->queue('selected_locale', $locale, 60 * 24 * 30); 
        App::setLocale($locale);
    }

    $referer = $request->headers->get('referer') ?? url('/');

    // JURUS PAMUNGKAS: Kalau dari Inertia, harus pake Inertia::location 
    // biar state SPA bener-bener ke-reset.
    if ($request->hasHeader('X-Inertia')) {
        return Inertia::location($referer);
    }

    return redirect()->to($referer);
})->middleware('web')->name('lang.switch');


// --- GROUP 1: PUBLIC PAGES (Guest) ---
Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return view('welcome'); 
})->name('home');


// 🔥 ROUTE WAITLIST
Route::post('/waitlist', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email|unique:waitlists,email'
    ]);

    Waitlist::create($validated);
    return redirect()->back()->with('success', 'You have been added to the waitlist!');
})->name('waitlist.store');


Route::get('/about', function () {
    return view('about');
})->name('about');


// --- GROUP 2: SOCIAL LOGIN ---
Route::get('/auth/google', [SocialController::class, 'redirect'])->name('google.login');
Route::get('/auth/google/callback', [SocialController::class, 'callback']);


// --- GROUP 3: AUTHENTICATED APP ---
Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::middleware(['module:planner'])->prefix('planner')->name('planner.')->group(function () {
        Route::get('/', [PlannerController::class, 'index'])->name('index');
        Route::post('/', [PlannerController::class, 'store'])->name('store');
        Route::patch('/{plannerTask}', [PlannerController::class, 'update'])->name('update');
        Route::delete('/{plannerTask}', [PlannerController::class, 'destroy'])->name('destroy');
        Route::patch('/{plannerTask}/toggle', [PlannerController::class, 'toggle'])->name('toggle');
        Route::post('/log', [PlannerController::class, 'updateLog'])->name('updateLog');
        Route::post('/reset', [PlannerController::class, 'resetBoard'])->name('reset');
        Route::post('/batch', [PlannerController::class, 'batchStore'])->name('batchStore');
    });

    Route::middleware(['module:habit'])->prefix('habits')->name('habits.')->group(function () {
        Route::get('/', [HabitController::class, 'index'])->name('index');
        Route::post('/', [HabitController::class, 'store'])->name('store');
        Route::post('/copy', [HabitController::class, 'copyFromPrevious'])->name('copy');
        Route::post('/mood', [HabitController::class, 'updateMood'])->name('mood');
        Route::patch('/{habit}', [HabitController::class, 'update'])->name('update');
        Route::delete('/{habit}', [HabitController::class, 'destroy'])->name('destroy');
        Route::post('/{habit}/log', [HabitController::class, 'storeLog'])->name('log');
    });

    Route::middleware(['module:finance'])->prefix('finance')->name('finance.')->group(function () {
        Route::get('/', [FinanceController::class, 'index'])->name('index');
        Route::post('/income-target', [FinanceController::class, 'updateIncomeTarget'])->name('income-target.update');
        Route::post('/transaction', [FinanceController::class, 'storeTransaction'])->name('transaction.store');
        Route::patch('/transaction/{financeTransaction}', [FinanceController::class, 'updateTransaction'])->name('transaction.update');
        Route::delete('/transaction/{financeTransaction}', [FinanceController::class, 'destroyTransaction'])->name('transaction.destroy');
        Route::get('/category/check/{category}', [FinanceController::class, 'checkCategoryUsage'])->name('category.check');
        Route::post('/category/rename', [FinanceController::class, 'renameCategory'])->name('category.rename');
        Route::post('/budget', [FinanceController::class, 'storeBudget'])->name('budget.store');
        Route::put('/budget/{financeBudget}', [FinanceController::class, 'updateBudget'])->name('budget.update');
        Route::delete('/budget/{financeBudget}', [FinanceController::class, 'destroyBudget'])->name('budget.destroy');
        Route::post('/categories', [FinanceController::class, 'storeCategory'])->name('categories.store');
        Route::put('/categories/{category}', [FinanceController::class, 'updateCategory'])->name('categories.update');
        Route::delete('/categories/{category}', [FinanceController::class, 'destroyCategory'])->name('categories.destroy');
    });

    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__.'/auth.php';