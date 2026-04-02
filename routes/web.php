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
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\AdminPostController;
use App\Http\Controllers\AdminUserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use App\Models\Waitlist;
use Illuminate\Http\Request;


// --- UTILITY: SWITCH LANGUAGE ---
Route::get('/lang/{locale}', function (Request $request, $locale) {
    if (in_array($locale, ['id', 'en'])) {
        // 1. Simpan di Session
        Session::put('locale', $locale);
        Session::save();

        // 2. Set Locale Aplikasi Saat Ini
        App::setLocale($locale);

        // 3. Siapkan Cookie (30 Hari)
        $cookie = cookie('selected_locale', $locale, 60 * 24 * 30);

        $referer = $request->headers->get('referer') ?? url('/');

        // JURUS PAMUNGKAS: Kalau dari Inertia, harus pake Inertia::location 
        // biar state SPA bener-bener ke-reset.
        if ($request->hasHeader('X-Inertia')) {
            return Inertia::location($referer);
        }

        // Redirect dengan melampirkan cookie agar Blade langsung dapet
        return redirect()->to($referer)->withCookie($cookie);
    }

    return redirect()->back();
})->middleware('web')->name('lang.switch');


// --- GROUP 1: PUBLIC PAGES (Guest) ---
Route::get('/', function () {
    return view('welcome');
})->name('home');


// 🔥 ROUTE WAITLIST
Route::post('/waitlist', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email|unique:waitlists,email'
    ]);

    Waitlist::create($validated);
    return redirect()->back()->with('success', 'You have been added to the waitlist!');
})->name('waitlist.store')->middleware('throttle:waitlist');

Route::post('/settings/cookie-consent', function (Request $request) {
    if (auth()->check()) {
        auth()->user()->update(['cookie_consent' => $request->consent]);
    }
    return response()->json(['status' => 'success']);
})->name('settings.cookie-consent');


Route::get('/about', function () {
    return view('about');
})->name('about');

Route::get('/pricing', function () {
    return auth()->check() ? Inertia::render('Pricing') : view('pricing');
})->name('pricing.index');

// Alias name 'pricing' for backward compatibility
Route::get('/pricing-alias', function () {
    return redirect()->route('pricing.index');
})->name('pricing');
// ==========================================
Route::get('/sitemap.xml', function () {
    $pages = [];
    // 0. DATE FALLBACK
    $defaultDate = now()->toAtomString();

    // 1. HALAMAN UTAMA (Priority: High)
    $statics = [
        '/' => ['1.0', 'weekly'],
        '/about' => ['0.8', 'monthly'],
        '/pricing' => ['0.9', 'weekly'],
        '/login' => ['0.8', 'monthly'],
        '/register' => ['0.8', 'monthly'],
    ];

    foreach ($statics as $uri => $meta) {
        $pages[] = [
            'url' => url($uri),
            'priority' => $meta[0],
            'freq' => $meta[1],
            'lastmod' => $defaultDate
        ];
    }

    // 2. FEATURES
    $features = ['habit', 'finance', 'planner', 'journal', 'calendar', 'goal', 'job'];
    foreach ($features as $feature) {
        $pages[] = [
            'url' => url("/features/{$feature}"),
            'priority' => '0.9',
            'freq' => 'weekly',
            'lastmod' => $defaultDate
        ];
    }

    // 3. BLOG POSTS (Dinamis dari Database)
    $posts = \App\Models\BlogPost::where('is_published', true)
        ->where('published_at', '<=', now())
        ->get();

    foreach ($posts as $post) {
        $pages[] = [
            'url' => route('resources.blog.show', $post->slug),
            'priority' => '0.8',
            'freq' => 'monthly',
            'lastmod' => ($post->updated_at ?? $post->created_at)->toAtomString()
        ];
    }

    // 4. SOLUTIONS
    $solutions = ['student', 'freelancer', 'personalgrowth', 'finance-mastery', 'career-accelerator', 'mental-clarity', 'atomic-system', 'deep-work', 'second-brain'];
    foreach ($solutions as $solution) {
        $pages[] = [
            'url' => url("/solutions/{$solution}"),
            'priority' => '0.8',
            'freq' => 'monthly',
            'lastmod' => $defaultDate
        ];
    }

    // 5. RESOURCES & OTHERS
    $others = [
        '/resources/guide' => '0.7',
        '/resources/blog' => '0.7',
        '/resources/stories' => '0.6',
        '/resources/changelog' => '0.7',
        '/company/privacy' => '0.5',
        '/company/terms' => '0.5',
        '/compare/paper' => '0.7',
        '/compare/sheets' => '0.7',
        '/compare/finance-apps' => '0.7',
    ];

    foreach ($others as $uri => $priority) {
        $pages[] = [
            'url' => url($uri),
            'priority' => $priority,
            'freq' => 'monthly',
            'lastmod' => $defaultDate
        ];
    }

    return response()->view('seo.sitemap', [
        'pages' => $pages,
        'date' => $defaultDate
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

Route::get('/features/goal', function () {
    return view('features.goal');
})->name('features.goal');

Route::get('/features/job', function () {
    return view('features.job');
})->name('features.job');

Route::get('/features/neural-os', function () {
    return view('features.neural-os');
})->name('features.neural-os');


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

Route::get('/solutions/finance-mastery', function () {
    return view('solutions.finance-mastery');
})->name('solutions.finance');

Route::get('/solutions/career-accelerator', function () {
    return view('solutions.career-accelerator');
})->name('solutions.career');

Route::get('/solutions/mental-clarity', function () {
    return view('solutions.mental-clarity');
})->name('solutions.mental');

Route::get('/solutions/atomic-system', function () {
    return view('solutions.atomic-system');
})->name('solutions.atomic');

Route::get('/solutions/deep-work', function () {
    return view('solutions.deep-work');
})->name('solutions.deepwork');

Route::get('/solutions/second-brain', function () {
    return view('solutions.second-brain');
})->name('solutions.secondbrain');

// ==========================================
// RESOURCES
// ==========================================

Route::get('/resources/guide', function () {
    return view('resources.guide');
})->name('resources.guide');

Route::get('/resources/blog', function () {
    $posts = \App\Models\BlogPost::with('category')->where('is_published', true)
        ->where(
            function ($query) {
                $query->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            }
        )
        ->orderBy('published_at', 'desc')
        ->orderBy('created_at', 'desc')
        ->paginate(12);

    return view('resources.blog', compact('posts'));
})->name('resources.blog');

Route::get('/resources/blog/{slug}', function ($slug) {
    $post = \App\Models\BlogPost::with('category')->where('slug', $slug)
        ->where('is_published', true)
        ->where(
            function ($query) {
                $query->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            }
        )
        ->firstOrFail();

    return view('resources.post', compact('post'));
})->name('resources.blog.show');

Route::get('/resources/stories', function () {
    return view('resources.stories');
})->name('resources.stories');

Route::get('/resources/help', function () {
    return view('resources.help');
})->name('resources.help');

Route::get('/resources/community', function () {
    return view('resources.community');
})->name('resources.community');

Route::get('/resources/changelog', function () {
    return view('resources.changelog');
})->name('resources.changelog');

Route::get('/resources/neural-os-transparency', function () {
    return view('resources.ai-trust');
})->name('resources.ai-trust');



// ==========================================
// COMPANY
// ==========================================


Route::get('/company/contact', [CompanyController::class, 'contact'])->name('company.contact');
Route::post('/company/contact', [CompanyController::class, 'sendContact'])->name('contact.send');

Route::get('/company/privacy', [CompanyController::class, 'privacy'])->name('company.privacy');
Route::get('/company/terms', [CompanyController::class, 'terms'])->name('company.terms');
Route::get('/company/refund', [CompanyController::class, 'refund'])->name('company.refund');
Route::get('/company/security', [CompanyController::class, 'security'])->name('company.security');

Route::get('/company/status', function () {
    return view('company.status');
})->name('company.status');

Route::get('/company/press-kit', function () {
    return view('company.press-kit');
})->name('company.press-kit');

// ==========================================
// COMPARE
// ==========================================


Route::get('/compare/paper', function () {
    return view('compare.paper');
})->name('compare.paper');

Route::get('/compare/sheets', function () {
    return view('compare.sheets');
})->name('compare.sheets');

Route::get('/compare/management-tools', function () {
    return view('compare.management-tools');
})->name('compare.management-tools');

Route::get('/compare/habit-apps', function () {
    return view('compare.habit-apps');
})->name('compare.habit-apps');

Route::get('/compare/finance-apps', function () {
    return view('compare.finance-apps');
})->name('compare.finance-apps');

Route::get('/compare/planner-apps', function () {
    return view('compare.planner-apps');
})->name('compare.planner-apps');

Route::get('/compare/five-apps', function () {
    return view('compare.five-apps');
})->name('compare.five-apps');


// --- GROUP 2: SOCIAL LOGIN ---
Route::get('/auth/google', [SocialController::class, 'redirect'])->name('google.login');
Route::get('/auth/google/callback', [SocialController::class, 'callback']);


// --- GROUP 3: AUTHENTICATED APP ---
Route::middleware(['auth', 'throttle:global'])->group(function () { // 👈 Tambahan di sini

    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::middleware(['module:planner'])->prefix('planner')->name('planner.')->group(
        function () {
            Route::get('/', [PlannerController::class, 'index'])->name('index');
            Route::post('/', [PlannerController::class, 'store'])->name('store');
            Route::patch('/{plannerTask}', [PlannerController::class, 'update'])->name('update');
            Route::delete('/{plannerTask}', [PlannerController::class, 'destroy'])->name('destroy');
            Route::patch('/{plannerTask}/toggle', [PlannerController::class, 'toggle'])->name('toggle');
            Route::post('/log', [PlannerController::class, 'updateLog'])->name('updateLog');
            Route::post('/reset', [PlannerController::class, 'resetBoard'])->name('reset');
            Route::post('/batch', [PlannerController::class, 'batchStore'])->name('batchStore');
        }
    );

    Route::middleware(['module:habit'])->prefix('habits')->name('habits.')->group(
        function () {
            Route::get('/', [HabitController::class, 'index'])->name('index');
            Route::post('/', [HabitController::class, 'store'])->name('store');

            Route::post('/batch', [HabitController::class, 'batchStore'])->name('batchStore');
            Route::post('/copy', [HabitController::class, 'copyFromPrevious'])->name('copy');
            Route::post('/mood', [HabitController::class, 'updateMood'])->name('mood');

            // 🔥 PERBAIKAN DI SINI: hapus '/habits' dan 'habits.' karena sudah ada di grup atas
            Route::post('/reorder', [HabitController::class, 'reorder'])->name('reorder');
            Route::post('/batch-log', [HabitController::class, 'batchLog'])->name('batch-log');

            // Ini harus di bawah supaya tidak bentrok (Laravel membaca /reorder dulu baru /{habit})
            Route::patch('/{habit}', [HabitController::class, 'update'])->name('update');
            Route::delete('/{habit}', [HabitController::class, 'destroy'])->name('destroy');
            Route::post('/{habit}/log', [HabitController::class, 'storeLog'])->name('log');
        }
    );

    Route::middleware(['module:finance'])->prefix('finance')->name('finance.')->group(
        function () {
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

            // Exports & Settings
            Route::get('/export/excel', [FinanceController::class, 'exportExcel'])->name('export.excel');
            Route::get('/export/tax', [FinanceController::class, 'exportTax'])->name('export.tax');
            Route::post('/export/audit', [FinanceController::class, 'runAudit'])->name('export.audit');
            Route::post('/settings/currency', [FinanceController::class, 'updateCurrency'])->name('settings.currency');
        }
    );

    // --- MODULE: JOURNAL ---
    Route::middleware(['module:journal'])->prefix('journal')->name('journal.')->group(
        function () {
            Route::get('/', [JournalController::class, 'index'])->name('index');
            Route::get('/write/{id?}', [JournalController::class, 'write'])->name('write');

            // Sistem CRUD
            Route::post('/', [JournalController::class, 'store'])->name('store');
            Route::patch('/{id}', [JournalController::class, 'update'])->name('update');
            Route::delete('/{id}', [JournalController::class, 'destroy'])->name('destroy');

            // Image Upload
            Route::post('/image', [JournalController::class, 'uploadImage'])->name('uploadImage');
            Route::delete('/image/{id}', [JournalController::class, 'deleteImage'])->name('deleteImage');
            Route::post('/analyze', [JournalController::class, 'analyze'])->name('analyze');
        }
    );

    // --- MODULE: CALENDAR ---
    Route::middleware(['module:calendar'])->prefix('calendar')->name('calendar.')->group(
        function () {
            Route::get('/', [CalendarController::class, 'index'])->name('index');

            // CRUD untuk Event
            Route::post('/events', [CalendarController::class, 'storeEvent'])->name('events.store');
            Route::put('/events/{id}', [CalendarController::class, 'updateEvent'])->name('events.update');
            Route::delete('/events/{id}', [CalendarController::class, 'destroyEvent'])->name('events.destroy');
        }
    );

    // Job Tracker Routes
    Route::middleware(['module:job'])->prefix('jobs')->name('jobs.')->group(
        function () {
            Route::get('/', [\App\Http\Controllers\JobController::class, 'index'])->name('index');
            Route::post('/', [\App\Http\Controllers\JobController::class, 'store'])->name('store');
            Route::patch('/{job}', [\App\Http\Controllers\JobController::class, 'update'])->name('update');
            Route::delete('/{job}', [\App\Http\Controllers\JobController::class, 'destroy'])->name('destroy');
            Route::post('/bulk-update-status', [\App\Http\Controllers\JobController::class, 'bulkUpdateStatus'])->name('bulk-update-status');
            Route::post('/bulk-delete', [\App\Http\Controllers\JobController::class, 'bulkDelete'])->name('bulk-delete');
            Route::post('/ai-scan', [\App\Http\Controllers\JobController::class, 'scanResume'])->name('ai-scan');
            Route::post('/master-cv', [\App\Http\Controllers\JobController::class, 'uploadMasterCv'])->name('master-cv');
        }
    );

    // Goal Tracker Routes
    Route::middleware(['module:goal'])->prefix('goals')->name('goals.')->group(
        function () {
            Route::get('/', [\App\Http\Controllers\GoalController::class, 'index'])->name('index');
            Route::post('/', [\App\Http\Controllers\GoalController::class, 'store'])->name('store');
            Route::patch('/{goal}', [\App\Http\Controllers\GoalController::class, 'update'])->name('update');
            Route::delete('/{goal}', [\App\Http\Controllers\GoalController::class, 'destroy'])->name('destroy');
            Route::post('/bulk-update-status', [\App\Http\Controllers\GoalController::class, 'bulkUpdateStatus'])->name('bulk-update-status');
            Route::post('/bulk-delete', [\App\Http\Controllers\GoalController::class, 'bulkDelete'])->name('bulk-delete');

            // Image
            Route::post('/image', [\App\Http\Controllers\GoalController::class, 'uploadCoverImage'])->name('uploadImage');
            Route::delete('/image/{id}', [\App\Http\Controllers\GoalController::class, 'deleteCoverImage'])->name('deleteImage');

            // Milestones
            Route::post('/{goal}/milestones', [\App\Http\Controllers\GoalController::class, 'storeMilestone'])->name('milestones.store');
            Route::patch('/{goal}/milestones/{milestone}', [\App\Http\Controllers\GoalController::class, 'updateMilestone'])->name('milestones.update');
            Route::post('/{goal}/milestones/{milestone}/toggle', [\App\Http\Controllers\GoalController::class, 'toggleMilestone'])->name('milestones.toggle');
            Route::delete('/{goal}/milestones/{milestone}', [\App\Http\Controllers\GoalController::class, 'destroyMilestone'])->name('milestones.destroy');
        }
    );

    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');


    Route::get('/more', function () {
        return Inertia::render('More/Index');
    })->name('more.index');

    Route::prefix('profile')->name('profile.')->group(
        function () {
            Route::get('/', [ProfileController::class, 'edit'])->name('edit');
            Route::patch('/', [ProfileController::class, 'update'])->name('update');
            Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
        }
    );

    // Duitku Payments
    Route::post('/payment/checkout', [\App\Http\Controllers\PaymentController::class, 'checkout'])->name('payment.checkout');
    Route::get('/payment/finish', [\App\Http\Controllers\PaymentController::class, 'finish'])->name('payment.finish');
    Route::get('/payment/unfinish', [\App\Http\Controllers\PaymentController::class, 'unfinish'])->name('payment.unfinish');
    Route::get('/payment/error', [\App\Http\Controllers\PaymentController::class, 'error'])->name('payment.error');

    // AI Coach
    Route::get('/dashboard/insight', [\App\Http\Controllers\DashboardController::class, 'getInsight'])->name('dashboard.insight');
    
    Route::prefix('coach')->name('coach.')->group(function () {
        Route::get('/', [\App\Http\Controllers\AiCoachController::class, 'index'])->name('index');
        Route::post('/chat', [\App\Http\Controllers\AiCoachController::class, 'chat'])->name('chat');
        Route::post('/synergy', [\App\Http\Controllers\AiCoachController::class, 'synergy'])->name('synergy');

        // AI Habits (Ideas 2, 4, 7)
        Route::post('/habit-stack', [\App\Http\Controllers\AiHabitController::class, 'suggestStack'])->name('habit.stack');
        Route::post('/habit-mood', [\App\Http\Controllers\AiHabitController::class, 'adaptToMood'])->name('habit.mood');
        Route::post('/habit-audit', [\App\Http\Controllers\AiHabitController::class, 'auditFriction'])->name('habit.audit');
        Route::post('/habit-stagnation', [\App\Http\Controllers\AiHabitController::class, 'auditStagnation'])->name('habit.stagnation');

        // Debugging
        Route::get('/debug-gemini', [\App\Http\Controllers\AiDebugController::class, 'testGemini']);
    });

    // --- ADMIN CENTRAL (Inertia Custom) ---
    Route::middleware(['can:admin'])->prefix('admin')->name('admin.')->group(function () {
        // Blog
        Route::prefix('blog')->name('blog.')->group(function () {
            Route::get('/', [AdminPostController::class, 'index'])->name('index');
            Route::get('/create', [AdminPostController::class, 'create'])->name('create');
            Route::post('/', [AdminPostController::class, 'store'])->name('store');
            Route::get('/{post}/edit', [AdminPostController::class, 'edit'])->name('edit');
            Route::patch('/{post}', [AdminPostController::class, 'update'])->name('update');
            Route::delete('/{post}', [AdminPostController::class, 'destroy'])->name('destroy');
        });

        // Users
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/', [AdminUserController::class, 'index'])->name('index');
            Route::post('/{user}/toggle-premium', [AdminUserController::class, 'togglePremium'])->name('toggle-premium');
            Route::post('/{user}/toggle-admin', [AdminUserController::class, 'toggleAdmin'])->name('toggle-admin');
        });
    });
});

Route::post('/callback', [\App\Http\Controllers\PaymentController::class, 'callback'])->name('payment.callback');

require __DIR__ . '/auth.php';