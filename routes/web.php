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
use App\Models\Waitlist; // 👈 Import Model Waitlist
use Illuminate\Http\Request; // 👈 Import Request
// use Inertia\Inertia; // already imported above, duplicate removed
// --- UTILITY: SWITCH LANGUAGE ---
// Perbaikan: response harus sensitif terhadap Inertia
// di production Inertia masih menganggap ini request AJAX karena
// `X-Inertia` header tersisa, sehingga kita kadang mendapat JSON
// dan modal yang terbuka.
// solusinya: pakai `Inertia::location()` untuk *paksa reload penuh*.
Route::get('/lang/{locale}', function (Request $request, $locale) {
    if (in_array($locale, ['id', 'en'])) {
        Session::put('locale', $locale);
        Session::save(); // 🔥 Paksa simpan session ke database/file
        app()->setLocale($locale);
    }

    // Ambil URL asal, jika tidak ada atau mengandung loop, balik ke home
    $url = url()->previous();
    if (!$url || str_contains($url, '/lang/')) {
        // Inertia::location akan menghasilkan redirect JavaScript
        return $request->header('X-Inertia') ? Inertia::location(route('home')) : redirect()->to('/');
    }

    // Jika ini datang dari Inertia (SPA), kita ingin memaksa
    // browser melakukan full reload dan menghapus header Inertia.
    if ($request->header('X-Inertia')) {
        return Inertia::location($url);
    }

    // Default: normal redirect biasa (guest atau non-Inertia)
    return redirect()->to($url);
})->name('lang.switch');

// --- GROUP 1: PUBLIC PAGES (Guest) ---
Route::get('/', function () {
    // Jika sudah login, langsung lempar ke dashboard (Vue)
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    
    // Landing page pake Blade
    return view('welcome'); 
})->name('home');

// 🔥 ROUTE WAITLIST
Route::post('/waitlist', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email|unique:waitlists,email'
    ]);

    \App\Models\Waitlist::create($validated);

    return redirect()->back()->with('success', 'You have been added to the waitlist!');
})->name('waitlist.store');

// Route About pake Blade
Route::get('/about', function () {
    return view('about');
})->name('about');

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
        Route::post('/batch', [PlannerController::class, 'batchStore'])->name('batchStore');
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
    Route::post('/income-target', [App\Http\Controllers\FinanceController::class, 'updateIncomeTarget'])
        ->name('income-target.update');
    // Transaksi
    Route::post('/transaction', [FinanceController::class, 'storeTransaction'])->name('transaction.store');
    Route::patch('/transaction/{financeTransaction}', [FinanceController::class, 'updateTransaction'])->name('transaction.update');
    Route::delete('/transaction/{financeTransaction}', [FinanceController::class, 'destroyTransaction'])->name('transaction.destroy');
    Route::get('/category/check/{category}', [FinanceController::class, 'checkCategoryUsage'])->name('category.check');
    Route::post('/category/rename', [FinanceController::class, 'renameCategory'])->name('category.rename');
    // Budget (Pastikan pakai {financeBudget} agar sinkron dengan Controller)
    Route::post('/budget', [FinanceController::class, 'storeBudget'])->name('budget.store');
    Route::put('/budget/{financeBudget}', [FinanceController::class, 'updateBudget'])->name('budget.update');
    Route::delete('/budget/{financeBudget}', [FinanceController::class, 'destroyBudget'])->name('budget.destroy');

    Route::post('/categories', [FinanceController::class, 'storeCategory'])->name('categories.store');
    Route::put('/categories/{category}', [FinanceController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{category}', [FinanceController::class, 'destroyCategory'])->name('categories.destroy');
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