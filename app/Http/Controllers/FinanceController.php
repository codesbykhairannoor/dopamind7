<?php

namespace App\Http\Controllers;

use App\Http\Requests\BudgetRequest;
use App\Http\Requests\TransactionRequest;
use App\Http\Resources\FinanceBudgetResource;
use App\Http\Resources\FinanceTransactionResource;
use App\Models\FinanceBudget;
use App\Models\FinanceTransaction;
use App\Models\DailyLog;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FinanceController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();
        
        // 1. Filter Tanggal
        $date = $request->input('date', now()->format('Y-m-d'));
        $carbonDate = Carbon::parse($date);
        
        // 2. AMBIL DATA GAJI / TARGET BULAN INI
        $log = DailyLog::where('user_id', $user->id)
            ->whereDate('date', $carbonDate->startOfMonth()->format('Y-m-d'))
            ->first();
            
        $incomeTarget = $log ? (float) $log->income_target : 0;

        // 3. Ambil Transaksi
        $transactions = FinanceTransaction::where('user_id', $user->id)
            ->whereMonth('date', $carbonDate->month)
            ->whereYear('date', $carbonDate->year)
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        // 4. Hitung Total Masuk & Keluar
        $totalIncome = $transactions->where('type', 'income')->sum('amount');
        $totalExpense = $transactions->where('type', 'expense')->sum('amount');
        
        // Grouping Pengeluaran
        $expenseByCategory = $transactions->where('type', 'expense')
            ->groupBy('category')
            ->map(fn($row) => $row->sum('amount'));

        // 🔥 Grouping Pemasukan (Baru)
        $incomeByCategory = $transactions->where('type', 'income')
            ->groupBy('category')
            ->map(fn($row) => $row->sum('amount'));

        // 5. Ambil Budget
        $budgets = FinanceBudget::where('user_id', $user->id)
            ->where('month', $carbonDate->format('Y-m'))
            ->get()
            ->map(function ($budget) use ($expenseByCategory) {
                $budget->spent = $expenseByCategory[$budget->category] ?? 0;
                return $budget;
            });

        // 6. Hitung Saldo
        $balance = ($incomeTarget + $totalIncome) - $totalExpense;

        return Inertia::render('Finance/Index', [
            'transactions' => FinanceTransactionResource::collection($transactions)->resolve(),
            'budgets'      => FinanceBudgetResource::collection($budgets)->resolve(),
            'stats'        => [
                'total_income'        => (float) $totalIncome,
                'total_expense'       => (float) $totalExpense,
                'income_target'       => (float) $incomeTarget,
                'balance'             => (float) $balance,
                'expense_by_category' => $expenseByCategory,
                'income_by_category'  => $incomeByCategory, // 🔥 Kirim data ini ke frontend
            ],
            'filters' => [
                'date'       => $carbonDate->format('Y-m-d'),
                'month_name' => $carbonDate->translatedFormat('F Y'),
            ]
        ]);
    }

    // --- FITUR UPDATE GAJI ---
    public function updateIncomeTarget(Request $request): RedirectResponse
    {
        $request->validate([
            'month'  => 'required|date_format:Y-m',
            'amount' => 'required|numeric|min:0'
        ]);

        DailyLog::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'date'    => $request->month . '-01'
            ],
            ['income_target' => $request->amount]
        );

        return back()->with('success', 'Gaji bulanan berhasil diatur!');
    }

    // --- TRANSACTIONS ---
    public function storeTransaction(TransactionRequest $request): RedirectResponse
    {
        $request->user()->financeTransactions()->create($request->validated());
        return back()->with('success', 'Transaksi berhasil disimpan!');
    }

    public function updateTransaction(TransactionRequest $request, FinanceTransaction $financeTransaction): RedirectResponse
    {
        $financeTransaction->update($request->validated());
        return back()->with('success', 'Transaksi berhasil diperbarui!');
    }

    public function destroyTransaction(FinanceTransaction $financeTransaction): RedirectResponse
    {
        if ($financeTransaction->user_id !== Auth::id()) {
            abort(403);
        }
        $financeTransaction->delete();
        return back()->with('success', 'Transaksi dihapus.');
    }

    // --- BUDGETS ---
    public function storeBudget(BudgetRequest $request): RedirectResponse
    {
        $data = $request->validated();
        FinanceBudget::updateOrCreate(
            [
                'user_id'  => Auth::id(),
                'category' => $data['category'],
                'month'    => $data['month']
            ],
            ['limit_amount' => $data['limit_amount']]
        );
        return back()->with('success', 'Budget berhasil diatur!');
    }

    public function updateBudget(BudgetRequest $request, FinanceBudget $financeBudget): RedirectResponse
    {
        $financeBudget->update($request->validated());
        return back()->with('success', 'Budget berhasil diperbarui!');
    }

    public function destroyBudget(FinanceBudget $financeBudget): RedirectResponse
    {
        if ($financeBudget->user_id !== Auth::id()) {
            abort(403);
        }
        $financeBudget->delete();
        return back()->with('success', 'Budget dihapus.');
    }
}