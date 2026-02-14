<?php

namespace App\Http\Controllers;

use App\Models\FinanceBudget;
use App\Models\FinanceTransaction;
use App\Models\FinanceCategory;
use App\Models\DailyLog;
use App\Http\Resources\FinanceBudgetResource;
use App\Http\Resources\FinanceTransactionResource;
use App\Http\Requests\TransactionRequest; // 🔥 Import Request Anda
use App\Http\Requests\BudgetRequest;      // 🔥 Import Request Anda
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

        // 1. Ambil Semua Kategori
        $categories = FinanceCategory::where('user_id', $user->id)->get();

        // 🔥 OPTIMASI: Buat Base Query, jangan di-get() dulu!
        $baseQuery = FinanceTransaction::where('user_id', $user->id)
            ->whereBetween('date', [$startOfMonth, $endOfMonth]);

        // 🔥 OPTIMASI: Biarkan Database (SQL) yang berhitung, eksekusi cuma 1-2 ms!
        $totalIncome = (clone $baseQuery)->where('type', 'income')->sum('amount');
        $totalExpense = (clone $baseQuery)->where('type', 'expense')->sum('amount');

        // Hitung pengeluaran/pemasukan per kategori dari Database langsung
        $expenseStats = (clone $baseQuery)->where('type', 'expense')
            ->selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->pluck('total', 'category'); // Hasilnya array: ['food' => 50000, 'transport' => 20000]

        $incomeStats = (clone $baseQuery)->where('type', 'income')
            ->selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->pluck('total', 'category');

        // 2. Tarik Transaksi untuk List di Frontend
        $transactions = (clone $baseQuery)
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        // 3. Budget
        $budgets = FinanceBudget::where('user_id', $user->id)
            ->where('month', $carbonDate->format('Y-m'))
            ->get()
            ->map(function ($budget) use ($expenseStats) {
                // Ambil nilai pengeluaran dari hasil kalkulasi SQL di atas
                $budget->spent = $expenseStats[$budget->category] ?? 0;
                return $budget;
            });

        // 4. Daily Log (Income Target)
        $log = DailyLog::where('user_id', $user->id)->whereDate('date', $startOfMonth)->first();
        $incomeTarget = $log ? (float) $log->income_target : 0;
        $balance = ($incomeTarget + $totalIncome) - $totalExpense;

        return Inertia::render('Finance/Index', [
            'transactions' => FinanceTransactionResource::collection($transactions)->resolve(),
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
            'filters'      => ['date' => $date, 'month_name' => $carbonDate->translatedFormat('F Y')]
        ]);
    }

    // --- KATEGORI (Income & Umum) ---

    public function storeCategory(Request $request)
    {
        $request->validate(['name' => 'required', 'type' => 'required']);
        $slug = Str::slug($request->name, '_');

        FinanceCategory::firstOrCreate(
            ['user_id' => Auth::id(), 'slug' => $slug],
            [
                'name' => $request->name,
                'type' => $request->type,
                'icon' => $request->icon ?? '💰'
            ]
        );

        return back()->with('success', 'Kategori berhasil disimpan.');
    }

    public function updateCategory(Request $request, FinanceCategory $category)
    {
        if ($category->user_id !== Auth::id()) abort(403);

        $oldSlug = $category->slug;
        $newSlug = Str::slug($request->name, '_');

        DB::transaction(function () use ($category, $request, $oldSlug, $newSlug) {
            $category->update([
                'name' => $request->name,
                'slug' => $newSlug,
                'icon' => $request->icon
            ]);

            if ($oldSlug !== $newSlug) {
                FinanceTransaction::where('user_id', Auth::id())->where('category', $oldSlug)->update(['category' => $newSlug]);
                FinanceBudget::where('user_id', Auth::id())->where('category', $oldSlug)->update(['category' => $newSlug]);
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

    // 🔥 PERBAIKAN: Gunakan TransactionRequest, hapus validasi & otorisasi manual!
    public function storeTransaction(TransactionRequest $request)
    {
        $request->user()->financeTransactions()->create($request->validated());
        return back();
    }

    // 🔥 PERBAIKAN: Gunakan TransactionRequest, hapus validasi & otorisasi manual!
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

    // 🔥 PERBAIKAN: Gunakan BudgetRequest!
    public function storeBudget(BudgetRequest $request)
    {
        DB::transaction(function () use ($request) {
            $exists = FinanceCategory::where('user_id', Auth::id())
                ->where('slug', $request->category)->exists();

            if (!$exists && $request->has('name')) {
                FinanceCategory::create([
                    'user_id' => Auth::id(),
                    'slug' => $request->category,
                    'name' => $request->name,
                    'icon' => $request->icon ?? '💸',
                    'type' => 'expense'
                ]);
            } else if ($exists && $request->has('name')) {
                FinanceCategory::where('user_id', Auth::id())
                    ->where('slug', $request->category)
                    ->update([
                        'name' => $request->name,
                        'icon' => $request->icon
                    ]);
            }

            FinanceBudget::updateOrCreate(
                ['user_id' => Auth::id(), 'category' => $request->category, 'month' => $request->month],
                ['limit_amount' => $request->limit_amount]
            );
        });

        return back();
    }

    // 🔥 PERBAIKAN: Gunakan BudgetRequest!
    public function updateBudget(BudgetRequest $request, FinanceBudget $financeBudget)
    {
        DB::transaction(function () use ($request, $financeBudget) {
            $oldSlug = $financeBudget->category;
            $masterCategory = FinanceCategory::where('user_id', Auth::id())->where('slug', $oldSlug)->first();

            if ($masterCategory && $request->has('name') && ($request->name !== $masterCategory->name || $request->icon !== $masterCategory->icon)) {
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
}