<?php

namespace App\Http\Controllers;

use App\Models\FinanceBudget;
use App\Models\FinanceTransaction;
use App\Models\FinanceCategory; 
use App\Models\DailyLog;
use App\Http\Resources\FinanceBudgetResource;
use App\Http\Resources\FinanceTransactionResource;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class FinanceController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $date = $request->input('date', now()->format('Y-m-d'));
        $carbonDate = Carbon::parse($date);

        $categories = FinanceCategory::where('user_id', $user->id)->get();

        $transactions = FinanceTransaction::where('user_id', $user->id)
            ->whereMonth('date', $carbonDate->month)
            ->whereYear('date', $carbonDate->year)
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        $totalIncome = $transactions->where('type', 'income')->sum('amount');
        $totalExpense = $transactions->where('type', 'expense')->sum('amount');
        
        $expenseStats = $transactions->where('type', 'expense')
            ->groupBy('category')
            ->map(fn($row) => $row->sum('amount'));

        $incomeStats = $transactions->where('type', 'income')
            ->groupBy('category')
            ->map(fn($row) => $row->sum('amount'));

        $budgets = FinanceBudget::where('user_id', $user->id)
            ->where('month', $carbonDate->format('Y-m'))
            ->get()
            ->map(function ($budget) use ($expenseStats) {
                $budget->spent = $expenseStats[$budget->category] ?? 0;
                return $budget;
            });

        $log = DailyLog::where('user_id', $user->id)->whereDate('date', $carbonDate->startOfMonth())->first();
        $incomeTarget = $log ? (float) $log->income_target : 0;
        $balance = ($incomeTarget + $totalIncome) - $totalExpense;

        return Inertia::render('Finance/Index', [
            'transactions' => FinanceTransactionResource::collection($transactions)->resolve(),
            'budgets'      => FinanceBudgetResource::collection($budgets)->resolve(),
            'categories'   => $categories,
            'stats'        => [
                'total_income'        => (float) $totalIncome,
                'total_expense'       => (float) $totalExpense,
                'income_target'       => (float) $incomeTarget,
                'balance'             => (float) $balance,
                'expense_by_category' => $expenseStats,
                'income_by_category'  => $incomeStats,
            ],
            'filters'      => ['date' => $date, 'month_name' => $carbonDate->translatedFormat('F Y')]
        ]);
    }

    // --- KATEGORI & SINKRONISASI ---

    public function storeCategory(Request $request)
    {
        $request->validate(['name' => 'required', 'type' => 'required']);
        $slug = \Str::slug($request->name, '_'); 

        FinanceCategory::updateOrCreate(
            ['user_id' => Auth::id(), 'slug' => $slug],
            ['name' => $request->name, 'type' => $request->type, 'icon' => $request->icon ?? '💰']
        );

        return response()->json(['success' => true, 'slug' => $slug]);
    }

    public function updateCategory(Request $request, FinanceCategory $category)
    {
        if ($category->user_id !== Auth::id()) abort(403);

        $oldSlug = $category->slug;
        $newSlug = \Str::slug($request->name, '_');

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

    // 🔥 FIX: Method yang tadi bikin error BadMethodCallException
    public function destroyCategory(FinanceCategory $category)
    {
        if ($category->user_id !== Auth::id()) abort(403);

        // Logic: Baru boleh hapus kalau transaksi KOSONG
        $hasTransactions = FinanceTransaction::where('user_id', Auth::id())
            ->where('category', $category->slug)
            ->exists();

        if ($hasTransactions) {
            return back()->withErrors(['error' => 'Gagal hapus! Masih ada data transaksi di kategori ini.']);
        }

        $category->delete();
        return back()->with('success', 'Kategori dihapus.');
    }

    public function renameCategory(Request $request)
    {
        $request->validate(['old_category' => 'required', 'new_category' => 'required']);

        $userId = Auth::id();
        $oldSlug = $request->old_category;
        $newSlug = $request->new_category;

        DB::transaction(function () use ($userId, $oldSlug, $newSlug) {
            FinanceCategory::where('user_id', $userId)->where('slug', $oldSlug)
                ->update(['slug' => $newSlug, 'name' => str_replace('_', ' ', $newSlug)]);

            FinanceTransaction::where('user_id', $userId)->where('category', $oldSlug)->update(['category' => $newSlug]);
            FinanceBudget::where('user_id', $userId)->where('category', $oldSlug)->update(['category' => $newSlug]);
        });

        return response()->json(['success' => true]);
    }

    public function checkCategoryUsage($slug)
    {
        $userId = Auth::id();
        $trxCount = FinanceTransaction::where('user_id', $userId)->where('category', $slug)->count();
        $budgetCount = FinanceBudget::where('user_id', $userId)->where('category', $slug)->count();

        return response()->json([
            'used' => ($trxCount > 0 || $budgetCount > 0),
            'count' => $trxCount + $budgetCount
        ]);
    }

    // --- TRANSAKSI ---
    public function storeTransaction(Request $request): RedirectResponse
    {
        $data = $request->only(['title', 'amount', 'type', 'category', 'date', 'notes']);
        $request->user()->financeTransactions()->create($data);
        return back()->with('success', 'Transaksi berhasil disimpan!');
    }

    public function updateTransaction(Request $request, FinanceTransaction $financeTransaction): RedirectResponse
    {
        $data = $request->only(['title', 'amount', 'type', 'category', 'date', 'notes']);
        $financeTransaction->update($data);
        return back()->with('success', 'Transaksi berhasil diperbarui!');
    }

    public function destroyTransaction(FinanceTransaction $financeTransaction): RedirectResponse
    {
        if ($financeTransaction->user_id !== Auth::id()) abort(403);
        $financeTransaction->delete();
        return back()->with('success', 'Transaksi dihapus.');
    }

    // --- BUDGET ---
    public function storeBudget(Request $request): RedirectResponse
    {
        $data = $request->only(['category', 'limit_amount', 'month']);
        FinanceBudget::updateOrCreate(
            ['user_id' => Auth::id(), 'category' => $data['category'], 'month' => $data['month']],
            ['limit_amount' => $data['limit_amount']]
        );
        return back()->with('success', 'Budget berhasil diatur!');
    }

    public function updateBudget(Request $request, FinanceBudget $financeBudget): RedirectResponse
    {
        $data = $request->only(['category', 'limit_amount', 'month']);
        $financeBudget->update($data);
        return back()->with('success', 'Budget berhasil diperbarui!');
    }

    public function destroyBudget(FinanceBudget $financeBudget): RedirectResponse
    {
        if ($financeBudget->user_id !== Auth::id()) abort(403);
        
        // Proteksi budget: Gak boleh hapus budget kalau ada transaksi pengeluaran
        $hasTransactions = FinanceTransaction::where('user_id', Auth::id())
            ->where('category', $financeBudget->category)
            ->exists();

        if ($hasTransactions) {
             return back()->withErrors(['error' => 'Gagal hapus! Masih ada transaksi di budget ini.']);
        }

        $financeBudget->delete();
        return back()->with('success', 'Budget dihapus.');
    }

    public function updateIncomeTarget(Request $request): RedirectResponse
    {
        $request->validate(['month' => 'required', 'amount' => 'required|numeric']);
        DailyLog::updateOrCreate(
            ['user_id' => Auth::id(), 'date' => $request->month . '-01'],
            ['income_target' => $request->amount]
        );
        return back()->with('success', 'Gaji bulanan diatur!');
    }
}