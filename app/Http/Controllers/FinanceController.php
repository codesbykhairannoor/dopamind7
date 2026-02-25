<?php

namespace App\Http\Controllers;

use App\Models\FinanceBudget;
use App\Models\FinanceTransaction;
use App\Models\FinanceCategory;
use App\Models\DailyLog;
use App\Http\Resources\FinanceBudgetResource;
use App\Http\Resources\FinanceTransactionResource;
use App\Http\Requests\TransactionRequest;
use App\Http\Requests\BudgetRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class FinanceController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $date = $request->input('date', now()->format('Y-m-d'));
        $carbonDate = Carbon::parse($date);
        
        $startOfMonth = $carbonDate->copy()->startOfMonth()->format('Y-m-d');
        $endOfMonth = $carbonDate->copy()->endOfMonth()->format('Y-m-d');

        // 1. Ambil Data Dasar dari Database
        $categories = FinanceCategory::where('user_id', $user->id)->get();

        // 🔥 OPTIMASI UTAMA: Tarik SEMUA transaksi bulan ini sekaligus dalam SATU query saja.
        $allMonthTransactions = FinanceTransaction::where('user_id', $user->id)
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        // 2. Olah Data di RAM (PHP Collections) - Jauh lebih cepat daripada bolak-balik SQL
        $incomeTransactions = $allMonthTransactions->where('type', 'income');
        $expenseTransactions = $allMonthTransactions->where('type', 'expense');

        $totalIncome = $incomeTransactions->sum('amount');
        $totalExpense = $expenseTransactions->sum('amount');

        // Hitung stats per kategori tanpa query tambahan
        $expenseStats = $expenseTransactions->groupBy('category')
            ->map(fn($group) => $group->sum('amount'));

        $incomeStats = $incomeTransactions->groupBy('category')
            ->map(fn($group) => $group->sum('amount'));

        // 3. Tarik & Map Budget
        $budgets = FinanceBudget::where('user_id', $user->id)
            ->where('month', $carbonDate->format('Y-m'))
            ->get()
            ->map(function ($budget) use ($expenseStats) {
                $budget->spent = $expenseStats[$budget->category] ?? 0;
                return $budget;
            });

        // 4. Daily Log & Kalkulasi Balance
        $log = DailyLog::where('user_id', $user->id)->whereDate('date', $startOfMonth)->first();
        $incomeTarget = $log ? (float) $log->income_target : 0;
        $balance = ($incomeTarget + $totalIncome) - $totalExpense;

        return Inertia::render('Finance/Index', [
            'transactions' => FinanceTransactionResource::collection($allMonthTransactions)->resolve(),
            'budgets'      => FinanceBudgetResource::collection($budgets)->resolve(),
            'categories'   => $categories,
            'stats'        => [
                'total_income'        => $totalIncome,
                'total_expense'       => $totalExpense,
                'income_target'       => $incomeTarget,
                'balance'             => $balance,
                'expense_by_category' => $expenseStats,
                'income_by_category'  => $incomeStats,
            ],
            'filters'      => [
                'date' => $date, 
                'month_name' => $carbonDate->translatedFormat('F Y')
            ]
        ]);
    }

    // --- KATEGORI (Income & Umum) ---
    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255', 
            'type' => 'required|in:income,expense',
            'icon' => 'nullable|string|max:50'
        ]);
        
        $slug = Str::slug($request->name, '_');

        FinanceCategory::firstOrCreate(
            ['user_id' => Auth::id(), 'slug' => $slug],
            ['name' => $request->name, 'type' => $request->type, 'icon' => $request->icon ?? '💰']
        );

        return back()->with('success', 'Kategori berhasil disimpan.');
    }

    public function updateCategory(Request $request, FinanceCategory $category)
    {
        if ($category->user_id !== Auth::id()) abort(403);

        // 🔥 FIX: Validasi ditambahkan agar aplikasi tidak crash jika input 'name' kosong
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:50'
        ]);

        $oldSlug = $category->slug;
        $newSlug = Str::slug($request->name, '_');

        DB::transaction(function () use ($category, $request, $oldSlug, $newSlug) {
            $category->update([
                'name' => $request->name,
                'slug' => $newSlug,
                'icon' => $request->icon
            ]);

            // Cascade update ke transaksi dan budget jika slug berubah
            if ($oldSlug !== $newSlug) {
                FinanceTransaction::where('user_id', Auth::id())
                    ->where('category', $oldSlug)
                    ->update(['category' => $newSlug]);
                FinanceBudget::where('user_id', Auth::id())
                    ->where('category', $oldSlug)
                    ->update(['category' => $newSlug]);
            }
        });

        return back()->with('success', 'Kategori diperbarui.');
    }

    public function destroyCategory(FinanceCategory $category)
    {
        if ($category->user_id !== Auth::id()) abort(403);
        $category->delete();
        return back();
    }

    // --- TRANSAKSI ---
    public function storeTransaction(TransactionRequest $request)
    {
        $request->user()->financeTransactions()->create($request->validated());
        return back();
    }

    public function updateTransaction(TransactionRequest $request, FinanceTransaction $financeTransaction)
    {
        $financeTransaction->update($request->validated());
        return back();
    }

    public function destroyTransaction(FinanceTransaction $financeTransaction)
    {
        if ($financeTransaction->user_id !== Auth::id()) abort(403);
        $financeTransaction->delete();
        return back();
    }

    // --- BUDGET ---
    public function storeBudget(BudgetRequest $request)
    {
        DB::transaction(function () use ($request) {
            $exists = FinanceCategory::where('user_id', Auth::id())
                ->where('slug', $request->category)
                ->exists();

            if (!$exists && $request->has('name')) {
                FinanceCategory::create([
                    'user_id' => Auth::id(),
                    'slug' => $request->category,
                    'name' => $request->name,
                    'icon' => $request->icon ?? '💸',
                    'type' => 'expense'
                ]);
            }

            FinanceBudget::updateOrCreate(
                ['user_id' => Auth::id(), 'category' => $request->category, 'month' => $request->month],
                ['limit_amount' => $request->limit_amount]
            );
        });

        return back();
    }

    public function updateBudget(BudgetRequest $request, FinanceBudget $financeBudget)
    {
        DB::transaction(function () use ($request, $financeBudget) {
            $oldSlug = $financeBudget->category;
            $masterCategory = FinanceCategory::where('user_id', Auth::id())
                ->where('slug', $oldSlug)
                ->first();

            if ($masterCategory && $request->has('name')) {
                $newSlug = Str::slug($request->name, '_');
                $masterCategory->update([
                    'name' => $request->name, 
                    'slug' => $newSlug, 
                    'icon' => $request->icon
                ]);

                if ($oldSlug !== $newSlug) {
                    FinanceBudget::where('user_id', Auth::id())
                        ->where('category', $oldSlug)
                        ->update(['category' => $newSlug]);
                    FinanceTransaction::where('user_id', Auth::id())
                        ->where('category', $oldSlug)
                        ->update(['category' => $newSlug]);
                }
            }
            $financeBudget->update(['limit_amount' => $request->limit_amount]);
        });

        return back();
    }

    public function destroyBudget(FinanceBudget $financeBudget)
    {
        if ($financeBudget->user_id !== Auth::id()) abort(403);
        $financeBudget->delete();
        return back();
    }

    public function updateIncomeTarget(Request $request)
    {
        $request->validate(['month' => 'required', 'amount' => 'required|numeric']);
        DailyLog::updateOrCreate(
            ['user_id' => Auth::id(), 'date' => $request->month . '-01'],
            ['income_target' => $request->amount]
        );
        return back();
    }

    // --- BATCH TRANSAKSI ---
    public function batchStoreTransaction(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'transactions' => 'required|array|min:1',
            'transactions.*.title' => 'required|string|max:255',
            'transactions.*.amount' => 'required|numeric|min:1',
            'transactions.*.type' => 'required|in:income,expense',
            'transactions.*.category' => 'required|string',
        ]);

        $userId = Auth::id();
        $date = $request->date;

        DB::transaction(function () use ($request, $userId, $date) {
            foreach ($request->transactions as $trx) {
                FinanceTransaction::create([
                    'user_id' => $userId,
                    'date' => $date,
                    'title' => $trx['title'],
                    'amount' => $trx['amount'],
                    'type' => $trx['type'],
                    'category' => $trx['category'],
                    'notes' => $trx['notes'] ?? null,
                ]);
            }
        });

        return back();
    }
}