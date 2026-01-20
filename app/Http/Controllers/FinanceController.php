<?php

namespace App\Http\Controllers;

use App\Models\FinanceBudget;
use App\Models\FinanceTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class FinanceController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // 1. Ambil Filter Bulan & Tahun (Default: Hari ini)
        $date = $request->input('date', now()->format('Y-m-d'));
        $carbonDate = Carbon::parse($date);
        $month = $carbonDate->month;
        $year = $carbonDate->year;

        // 2. Ambil Transaksi di Bulan Tersebut
        $transactions = FinanceTransaction::where('user_id', $user->id)
            ->whereMonth('date', $month)
            ->whereYear('date', $year)
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        // 3. Ambil Budget di Bulan Tersebut
        $budgets = FinanceBudget::where('user_id', $user->id)
            ->where('month', $carbonDate->format('Y-m'))
            ->get();

        // 4. Hitung Statistik Sederhana (Backend Calculation)
        $income = $transactions->where('type', 'income')->sum('amount');
        $expense = $transactions->where('type', 'expense')->sum('amount');
        
        // Kelompokkan pengeluaran per kategori buat progress bar budget
        $expenseByCategory = $transactions->where('type', 'expense')
            ->groupBy('category')
            ->map(fn($row) => $row->sum('amount'));

        return Inertia::render('Finance/Index', [
            'transactions' => $transactions,
            'budgets' => $budgets,
            'stats' => [
                'total_income' => $income,
                'total_expense' => $expense,
                'balance' => $income - $expense,
                'expense_by_category' => $expenseByCategory
            ],
            'filters' => [
                'date' => $carbonDate->format('Y-m-d'), // Balikin tanggal biar UI tau posisi sekarang
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

    public function destroyTransaction(FinanceTransaction $financeTransaction)
    {
        if ($financeTransaction->user_id !== Auth::id()) {
            abort(403);
        }

        $financeTransaction->delete();
        return back();
    }

    public function storeBudget(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'limit_amount' => 'required|numeric|min:1',
            'month' => 'required|date_format:Y-m', // Format: 2026-01
        ]);

        // Pakai updateOrCreate biar gak duplikat budget di kategori & bulan yang sama
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

        return back()->with('success', 'Budget berhasil diupdate!');
    }
}