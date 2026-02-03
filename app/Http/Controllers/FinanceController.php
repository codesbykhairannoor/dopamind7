<?php

namespace App\Http\Controllers;

use App\Http\Requests\BudgetRequest;       // 👈 Cuma import ini
use App\Http\Requests\TransactionRequest;  // 👈 Sama ini
use App\Http\Resources\FinanceBudgetResource;
use App\Http\Resources\FinanceTransactionResource;
use App\Models\FinanceBudget;
use App\Models\FinanceTransaction;
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
        
        // 2. Ambil Transaksi (Logic tetap sama sesuai file asli lo)
        $transactions = FinanceTransaction::where('user_id', $user->id)
            ->whereMonth('date', $carbonDate->month)
            ->whereYear('date', $carbonDate->year)
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        // 3. Hitung Statistik
        $income = $transactions->where('type', 'income')->sum('amount');
        $expense = $transactions->where('type', 'expense')->sum('amount');
        
        $expenseByCategory = $transactions->where('type', 'expense')
            ->groupBy('category')
            ->map(fn($row) => $row->sum('amount'));

        // 4. Ambil Budget
        $budgets = FinanceBudget::where('user_id', $user->id)
            ->where('month', $carbonDate->format('Y-m'))
            ->get()
            ->map(function ($budget) use ($expenseByCategory) {
                $budget->spent = $expenseByCategory[$budget->category] ?? 0;
                return $budget;
            });

        return Inertia::render('Finance/Index', [
            'transactions' => FinanceTransactionResource::collection($transactions)->resolve(),
            'budgets'      => FinanceBudgetResource::collection($budgets)->resolve(),
            'stats'        => [
                'total_income'        => (float) $income,
                'total_expense'       => (float) $expense,
                'balance'             => (float) ($income - $expense),
                'expense_by_category' => $expenseByCategory,
            ],
            'filters'      => [
                'date'       => $carbonDate->format('Y-m-d'),
                'month_name' => $carbonDate->translatedFormat('F Y'),
            ]
        ]);
    }

    // --- TRANSACTIONS ---

    /**
     * Pake TransactionRequest buat Store
     */
    public function storeTransaction(TransactionRequest $request): RedirectResponse
    {
        $request->user()->financeTransactions()->create($request->validated());
        
        return back()->with('success', 'Transaksi berhasil disimpan!');
    }

    /**
     * Pake TransactionRequest buat Update juga
     */
    public function updateTransaction(TransactionRequest $request, FinanceTransaction $financeTransaction): RedirectResponse
    {
        // Auth check udah otomatis jalan di TransactionRequest::authorize()
        
        $financeTransaction->update($request->validated());
        
        return back()->with('success', 'Transaksi berhasil diperbarui!');
    }

    public function destroyTransaction(FinanceTransaction $financeTransaction): RedirectResponse
    {
        // Delete simple tetep manual check, atau bisa pake Policy kalau mau lebih rapi lagi
        if ($financeTransaction->user_id !== Auth::id()) {
            abort(403);
        }

        $financeTransaction->delete();
        
        return back()->with('success', 'Transaksi dihapus.');
    }

    // --- BUDGETS ---

    /**
     * Pake BudgetRequest buat Store
     */
    public function storeBudget(BudgetRequest $request): RedirectResponse
    {
        $data = $request->validated();

        FinanceBudget::updateOrCreate(
            [
                'user_id'  => Auth::id(),
                'category' => $data['category'],
                'month'    => $data['month'] // Field ini pasti ada karena validasi conditional di Request
            ],
            ['limit_amount' => $data['limit_amount']]
        );

        return back()->with('success', 'Budget berhasil diatur!');
    }

    /**
     * Pake BudgetRequest buat Update juga
     */
    public function updateBudget(BudgetRequest $request, FinanceBudget $financeBudget): RedirectResponse
    {
        // Auth check udah otomatis jalan di BudgetRequest::authorize()
        
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