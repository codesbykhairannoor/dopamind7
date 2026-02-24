<?php

use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\PlannerController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\CalendarController;

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
})->name('waitlist.store')->middleware('throttle:waitlist'); // 👈 Tambahan di sini


Route::get('/about', function () {
    return view('about');
})->name('about');

Route::get('/pricing', function () {
    return view('pricing');
})->name('pricing');
// ==========================================
// 🔥 SEO: DYNAMIC SITEMAP GENERATOR
// ==========================================
Route::get('/sitemap.xml', function () {
    $pages = [];

    // 1. HALAMAN UTAMA (Priority: High)
    // Halaman statis paling penting
    $statics = [
        '/' => '1.0',
        '/about' => '0.8',
        '/pricing' => '0.9',
        '/login' => '0.8',
        '/register' => '0.8',
    ];

    foreach ($statics as $uri => $priority) {
        $pages[] = [
            'url' => url($uri),
            'priority' => $priority,
            'freq' => 'weekly'
        ];
    }

    // 2. FEATURES (Prefix: /features/...)
    // Ini halaman "jualan" utama lu
    $features = ['habit', 'finance', 'planner', 'journal', 'calendar'];
    foreach ($features as $feature) {
        $pages[] = [
            'url' => url("/features/{$feature}"), // Fix: Tambah prefix /features/
            'priority' => '0.9',
            'freq' => 'weekly'
        ];
    }

    // 3. SOLUTIONS (Prefix: /solutions/...)
    // Target audience spesifik
    $solutions = ['student', 'freelancer', 'personalgrowth'];
    foreach ($solutions as $solution) {
        $pages[] = [
            'url' => url("/solutions/{$solution}"),
            'priority' => '0.8',
            'freq' => 'monthly'
        ];
    }

    // 4. RESOURCES (Prefix: /resources/...)
    // Konten edukasi
    $resources = ['guide', 'blog', 'stories'];
    foreach ($resources as $resource) {
        $pages[] = [
            'url' => url("/resources/{$resource}"),
            'priority' => '0.7', // Sedikit lebih rendah dari fitur
            'freq' => 'weekly'
        ];
    }

    // 5. COMPARE & COMPANY (Campuran)
    // Halaman pendukung SEO (vs competitor) & Legal
    $others = [
        // Compare Pages (Penting buat SEO "Alternative to...")
        '/compare/paper', 
        '/compare/sheets', 
        '/compare/management-tools', 
        '/compare/habit-apps',
        
        // Legal Pages
        '/company/privacy', 
        '/company/terms'
    ];

    foreach ($others as $uri) {
        $pages[] = [
            'url' => url($uri),
            'priority' => '0.6',
            'freq' => 'monthly'
        ];
    }

    // 6. Render ke View Blade XML
    return response()->view('seo.sitemap', [
        'pages' => $pages,
        'date' => now()->toAtomString()
    ])->header('Content-Type', 'text/xml');

})->name('sitemap');
// ==========================================

// ==========================================
// FEATURES
// ==========================================

Route::get('/features/habit', function () {
    return view('features.habit');
})->name('features.habit');

Route::get('/features/finance', function () {
    return view('features.finance');
})->name('features.finance');

Route::get('/features/planner', function () {
    return view('features.planner');
})->name('features.planner');

Route::get('/features/journal', function () {
    return view('features.journal');
})->name('features.journal');

Route::get('/features/calendar', function () {
    return view('features.calendar');
})->name('features.calendar');


// ==========================================
// SOLUTIONS
// ==========================================

Route::get('/solutions/student', function () {
    return view('solutions.student');
})->name('solutions.student');


Route::get('/solutions/freelancer', function () {
    return view('solutions.freelancer');
})->name('solutions.freelancer');

Route::get('/solutions/personalgrowth', function () {
    return view('solutions.personalgrowth');
})->name('solutions.personalgrowth');


// ==========================================
// RESOURCES
// ==========================================

Route::get('resources/guide', function () {
    return view('resources.guide');
})->name('resources.guide');


Route::get('resources/blog', function () {
    return view('resources.blog');
})->name('resources.blog');

Route::get('resources/stories', function () {
    return view('resources.stories');
})->name('resources.stories');



// ==========================================
// COMPANY
// ==========================================


Route::get('company/privacy', function () {
    return view('company.privacy');
})->name('company.privacy');

Route::get('company/terms', function () {
    return view('company.terms');
})->name('company.terms');

// ==========================================
// COMPARE
// ==========================================


Route::get('compare/paper', function () {
    return view('compare.paper');
})->name('compare.paper');

Route::get('compare/sheets', function () {
    return view('compare.sheets');
})->name('compare.sheets');

Route::get('compare/management-tools', function () {
    return view('compare.management-tools');
})->name('compare.management-tools');

Route::get('compare/habit-apps', function () {
    return view('compare.habit-apps');
})->name('compare.habit-apps');


// --- GROUP 2: SOCIAL LOGIN ---
Route::get('/auth/google', [SocialController::class, 'redirect'])->name('google.login');
Route::get('/auth/google/callback', [SocialController::class, 'callback']);


// --- GROUP 3: AUTHENTICATED APP ---
Route::middleware(['auth', 'throttle:global'])->group(function () { // 👈 Tambahan di sini

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
    
    // Transaksi Singel
    Route::post('/transaction', [FinanceController::class, 'storeTransaction'])->name('transaction.store');
    Route::patch('/transaction/{financeTransaction}', [FinanceController::class, 'updateTransaction'])->name('transaction.update');
    Route::delete('/transaction/{financeTransaction}', [FinanceController::class, 'destroyTransaction'])->name('transaction.destroy');
    
    // 🔥 FIX BATCH ENTRY: Hilangkan kata 'finance' di URL dan Name
    Route::post('/transactions-batch', [FinanceController::class, 'batchStoreTransaction'])->name('transaction.batchStore');  

    Route::get('/category/check/{category}', [FinanceController::class, 'checkCategoryUsage'])->name('category.check');
    Route::post('/category/rename', [FinanceController::class, 'renameCategory'])->name('category.rename');
    
    Route::post('/budget', [FinanceController::class, 'storeBudget'])->name('budget.store');
    Route::put('/budget/{financeBudget}', [FinanceController::class, 'updateBudget'])->name('budget.update');
    Route::delete('/budget/{financeBudget}', [FinanceController::class, 'destroyBudget'])->name('budget.destroy');
    
    Route::post('/categories', [FinanceController::class, 'storeCategory'])->name('categories.store');
    Route::put('/categories/{category}', [FinanceController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{category}', [FinanceController::class, 'destroyCategory'])->name('categories.destroy');
});
// --- MODULE: JOURNAL ---
Route::middleware(['module:journal'])->prefix('journal')->name('journal.')->group(function () {
    Route::get('/', [JournalController::class, 'index'])->name('index');
    Route::get('/write/{id?}', [JournalController::class, 'write'])->name('write');
    
    // Sistem CRUD
    Route::post('/', [JournalController::class, 'store'])->name('store');
    Route::patch('/{id}', [JournalController::class, 'update'])->name('update');
    Route::delete('/{id}', [JournalController::class, 'destroy'])->name('destroy');
    
    // Image Upload
    Route::post('/image', [JournalController::class, 'uploadImage'])->name('uploadImage');
    Route::delete('/image/{id}', [JournalController::class, 'deleteImage'])->name('deleteImage');
});


// --- MODULE: CALENDAR ---
Route::middleware(['module:calendar'])->prefix('calendar')->name('calendar.')->group(function () {
    Route::get('/', [CalendarController::class, 'index'])->name('index');
    
    // CRUD untuk Event
    Route::post('/events', [CalendarController::class, 'storeEvent'])->name('events.store');
    Route::put('/events/{id}', [CalendarController::class, 'updateEvent'])->name('events.update');
    Route::delete('/events/{id}', [CalendarController::class, 'destroyEvent'])->name('events.destroy');
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