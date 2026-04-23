<?php

namespace App\Http\Controllers\Api;

use App\Models\FinanceTransaction;
use Illuminate\Http\Request;

class FinanceApiController extends ApiController
{
    /**
     * Get finance summary and recent transactions
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Simple summary for current month
        $startOfMonth = now()->startOfMonth();
        $endOfMonth = now()->endOfMonth();

        $income = FinanceTransaction::where('user_id', $user->id)
            ->where('type', 'income')
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        $expense = FinanceTransaction::where('user_id', $user->id)
            ->where('type', 'expense')
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        $recentTransactions = FinanceTransaction::with('category')
            ->where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->limit(10)
            ->get();

        return $this->success([
            'summary' => [
                'income' => (float) $income,
                'expense' => (float) $expense,
                'balance' => (float) ($income - $expense),
                'month' => now()->format('F Y'),
            ],
            'recent' => $recentTransactions
        ]);
    }

    /**
     * Store a new transaction
     */
    public function store(Request $request)
    {
        $request->validate([
            'finance_category_id' => 'required|exists:finance_categories,id',
            'amount' => 'required|numeric|min:1',
            'type' => 'required|in:income,expense',
            'description' => 'nullable|string',
            'date' => 'required|date',
        ]);

        $transaction = FinanceTransaction::create([
            'user_id' => $request->user()->id,
            'finance_category_id' => $request->finance_category_id,
            'amount' => $request->amount,
            'type' => $request->type,
            'description' => $request->description,
            'date' => $request->date,
        ]);

        return $this->success($transaction, 'Transaction created successfully', 201);
    }
}
