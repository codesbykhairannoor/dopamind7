<?php

namespace App\Http\Controllers;

use App\Http\Resources\FinanceBudgetResource;
use App\Http\Resources\FinanceTransactionResource;
use App\Models\FinanceBudget;
use App\Models\FinanceTransaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FinanceController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // 1. Filter Tanggal
        $date = $request->input('date', now()->format('Y-m-d'));
        $carbonDate = Carbon::parse($date);
        
        // 2. Ambil Transaksi
        $transactions = FinanceTransaction::where('user_id', $user->id)
            ->whereMonth('date', $carbonDate->month)
            ->whereYear('date', $carbonDate->year)
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        // 3. Hitung Statistik
        $income = $transactions->where('type', 'income')->sum('amount');
        $expense = $transactions->where('type', 'expense')->sum('amount');
        
        // 4. Kelompokkan pengeluaran per kategori
        $expenseByCategory = $transactions->where('type', 'expense')
            ->groupBy('category')
            ->map(fn($row) => $row->sum('amount'));

        // 5. Ambil Budget & Suntikkan Data 'Spent'
        $budgets = FinanceBudget::where('user_id', $user->id)
            ->where('month', $carbonDate->format('Y-m'))
            ->get()
            ->map(function ($budget) use ($expenseByCategory) {
                $budget->spent = $expenseByCategory[$budget->category] ?? 0;
                return $budget;
            });

        return Inertia::render('Finance/Index', [
            'transactions' => FinanceTransactionResource::collection($transactions)->resolve(),
            'budgets' => FinanceBudgetResource::collection($budgets)->resolve(),
            'stats' => [
                'total_income' => (float) $income,
                'total_expense' => (float) $expense,
                'balance' => (float) ($income - $expense),
                'expense_by_category' => $expenseByCategory,
            ],
            'filters' => [
                'date' => $carbonDate->format('Y-m-d'),
                'month_name' => $carbonDate->translatedFormat('F Y'),
            ]
        ]);
    }

    public function storeTransaction(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:1',
            'type' => 'required|in:income,expense',
            'category' => 'required|string',
            'date' => 'required|date',
            'notes' => 'nullable|string'
        ]);

        $request->user()->financeTransactions()->create($validated);

        return back()->with('success', 'Transaksi berhasil disimpan!');
    }

    public function updateTransaction(Request $request, FinanceTransaction $financeTransaction)
    {
        if ($financeTransaction->user_id !== Auth::id()) abort(403);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:1',
            'type' => 'required|in:income,expense',
            'category' => 'required|string',
            'date' => 'required|date',
            'notes' => 'nullable|string'
        ]);

        $financeTransaction->update($validated);

        return back()->with('success', 'Transaksi berhasil diperbarui!');
    }

    public function destroyTransaction(FinanceTransaction $financeTransaction)
    {
        if ($financeTransaction->user_id !== Auth::id()) abort(403);

        $financeTransaction->delete();
        return back()->with('success', 'Transaksi dihapus.');
    }

    public function storeBudget(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'limit_amount' => 'required|numeric|min:1',
            'month' => 'required|date_format:Y-m',
        ]);

        FinanceBudget::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'category' => $validated['category'],
                'month' => $validated['month']
            ],
            [
                'limit_amount' => $validated['limit_amount']
            ]
        );

        return back()->with('success', 'Budget berhasil diatur!');
    }

    public function destroyBudget(FinanceBudget $financeBudget)
    {
        if ($financeBudget->user_id !== Auth::id()) abort(403);

        $financeBudget->delete();
        return back()->with('success', 'Budget dihapus.');
    }
}