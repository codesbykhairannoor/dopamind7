<?php

namespace App\Services;

use App\Models\FinanceBudget;
use App\Models\FinanceCategory;
use App\Models\FinanceTransaction;
use App\Models\FinanceSaving;
use App\Models\DailyLog;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FinanceService
{
    /**
     * Mengambil dan mengkalkulasi semua data dashboard Finance dalam satu tempat
     */
    public function getDashboardData(int $userId, string $dateStr, string $timezone): array
    {
        try {
            $carbonDate = Carbon::parse($dateStr)->timezone($timezone);
        } catch (\Exception $e) {
            $carbonDate = now()->timezone($timezone);
        }
        
        $startOfMonth = $carbonDate->copy()->startOfMonth()->format('Y-m-d');
        $endOfMonth = $carbonDate->copy()->endOfMonth()->format('Y-m-d');
        $monthKey = $carbonDate->format('Y-m');

        // 1. Ambil Kategori (Cached atau limited)
        $categories = FinanceCategory::ofUser($userId)->get();

        // 2. Transaksi - Aggregation di DB
        $transactionStats = FinanceTransaction::ofUser($userId)
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->select('type', 'category', DB::raw('SUM(amount) as total'))
            ->groupBy('type', 'category')
            ->get();

        $totalIncome = $transactionStats->where('type', 'income')->sum('total');
        $totalExpense = $transactionStats->where('type', 'expense')->sum('total');
        
        $expenseStats = $transactionStats->where('type', 'expense')->pluck('total', 'category');
        $incomeStats = $transactionStats->where('type', 'income')->pluck('total', 'category');

        // 3. Ambil List Transaksi (Tetap dibutuhkan untuk list, tapi sudah difilter)
        $transactions = FinanceTransaction::ofUser($userId)
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->orderBy('date', 'desc')
            ->get();

        // 4. Budget dengan spent Ter-kalkulasi
        $budgets = FinanceBudget::ofUser($userId)
            ->where('month', $monthKey)
            ->get()
            ->map(function ($budget) use ($expenseStats) {
                $budget->spent = (float) ($expenseStats[$budget->category] ?? 0);
                return $budget;
            });

        // 5. Target Income
        $incomeTarget = DailyLog::where('user_id', $userId)
            ->whereDate('date', $startOfMonth)
            ->value('income_target') ?? 0;
        
        // 6. Savings
        $savings = FinanceSaving::where('user_id', $userId)->get();
        $totalSavings = $savings->sum('current_amount');
        
        return [
            'transactions' => $transactions,
            'budgets'      => $budgets,
            'categories'   => $categories,
            'savings'      => $savings,
            'stats'        => [
                'total_income'        => (float) $totalIncome,
                'total_expense'       => (float) $totalExpense,
                'total_savings'       => (float) $totalSavings,
                'income_target'       => (float) $incomeTarget,
                'balance'             => (float) (($incomeTarget + $totalIncome) - $totalExpense),
                'expense_by_category' => $expenseStats,
                'income_by_category'  => $incomeStats,
            ],
            'filters'      => [
                'date'       => $carbonDate->format('Y-m-d'), 
                'month_name' => $carbonDate->translatedFormat('F Y')
            ]
        ];
    }

    public function updateCategoryCascade(FinanceCategory $category, string $newName, ?string $icon): void
    {
        $oldSlug = $category->slug;
        $newSlug = Str::slug($newName, '_');

        DB::transaction(function () use ($category, $newName, $oldSlug, $newSlug, $icon) {
            $category->update(['name' => $newName, 'slug' => $newSlug, 'icon' => $icon]);

            if ($oldSlug !== $newSlug) {
                FinanceTransaction::ofUser($category->user_id)->where('category', $oldSlug)->update(['category' => $newSlug]);
                FinanceBudget::ofUser($category->user_id)->where('category', $oldSlug)->update(['category' => $newSlug]);
            }
        });
    }

    public function destroyCategorySafely(FinanceCategory $category): void
    {
        DB::transaction(function () use ($category) {
            FinanceTransaction::ofUser($category->user_id)
                ->where('category', $category->slug)
                ->update(['category' => 'uncategorized']);
            
            FinanceBudget::ofUser($category->user_id)
                ->where('category', $category->slug)
                ->delete();

            $category->delete();
        });
    }

    public function storeBudget(int $userId, array $data): void
    {
        DB::transaction(function () use ($userId, $data) {
            $exists = FinanceCategory::ofUser($userId)->where('slug', $data['category'])->exists();

            if (!$exists && isset($data['name'])) {
                FinanceCategory::create([
                    'user_id' => $userId,
                    'slug'    => $data['category'],
                    'name'    => $data['name'],
                    'icon'    => $data['icon'] ?? '💸',
                    'type'    => 'expense'
                ]);
            }

            FinanceBudget::updateOrCreate(
                ['user_id' => $userId, 'category' => $data['category'], 'month' => $data['month']],
                ['limit_amount' => $data['limit_amount']]
            );
        });
    }

    public function updateBudgetCascade(FinanceBudget $budget, array $data): void
    {
        DB::transaction(function () use ($budget, $data) {
            $oldSlug = $budget->category;
            $masterCategory = FinanceCategory::ofUser($budget->user_id)->where('slug', $oldSlug)->first();

            if ($masterCategory && isset($data['name'])) {
                $newSlug = Str::slug($data['name'], '_');
                $masterCategory->update([
                    'name' => $data['name'], 
                    'slug' => $newSlug, 
                    'icon' => $data['icon'] ?? $masterCategory->icon
                ]);

                if ($oldSlug !== $newSlug) {
                    FinanceBudget::ofUser($budget->user_id)->where('category', $oldSlug)->update(['category' => $newSlug]);
                    FinanceTransaction::ofUser($budget->user_id)->where('category', $oldSlug)->update(['category' => $newSlug]);
                }
            }
            $budget->update(['limit_amount' => $data['limit_amount']]);
        });
    }

    public function batchStoreTransactions(int $userId, string $date, array $transactions, string $timezone): void
    {
        $now = now()->timezone($timezone)->toDateTimeString(); 
        $insertData = [];

        foreach ($transactions as $trx) {
            $insertData[] = [
                'user_id'    => $userId,
                'date'       => $date,
                'title'      => $trx['title'],
                'amount'     => $trx['amount'],
                'type'       => $trx['type'],
                'category'   => $trx['category'],
                'notes'      => $trx['notes'] ?? null,
                'created_at' => $now, 
                'updated_at' => $now,
            ];
        }

        if (!empty($insertData)) {
            DB::transaction(fn () => FinanceTransaction::insert($insertData));
        }
    }

    public function depositToSaving(int $userId, int $savingId, float $amount, string $date, string $timezone): void
    {
        DB::transaction(function () use ($userId, $savingId, $amount, $date, $timezone) {
            $saving = FinanceSaving::where('user_id', $userId)->findOrFail($savingId);
            $saving->increment('current_amount', $amount);

            FinanceTransaction::create([
                'user_id' => $userId,
                'date'    => $date,
                'title'   => "Deposit to: {$saving->title}",
                'type'    => 'expense', // Acts as expense to reduce available balance
                'category' => 'saving',
                'amount'  => $amount,
                'notes'   => "Saving allocation for {$saving->title}"
            ]);
        });
    }

    public function withdrawFromSaving(int $userId, int $savingId, float $amount, string $date, string $timezone): void
    {
        DB::transaction(function () use ($userId, $savingId, $amount, $date, $timezone) {
            $saving = FinanceSaving::where('user_id', $userId)->findOrFail($savingId);
            
            if ($saving->current_amount < $amount) {
                throw new \Exception("Insufficient balance in {$saving->title}");
            }

            $saving->decrement('current_amount', $amount);

            FinanceTransaction::create([
                'user_id' => $userId,
                'date'    => $date,
                'title'   => "Withdraw from: {$saving->title}",
                'type'    => 'income', // Acts as income to increase available balance
                'category' => 'saving',
                'amount'  => $amount,
                'notes'   => "Withdrawal from {$saving->title}"
            ]);
        });
    }

    public function destroySavingSafely(int $userId, int $savingId, string $date): void
    {
        DB::transaction(function () use ($userId, $savingId, $date) {
            $saving = FinanceSaving::where('user_id', $userId)->findOrFail($savingId);
            $remainingAmount = (float) $saving->current_amount;

            if ($remainingAmount > 0) {
                FinanceTransaction::create([
                    'user_id' => $userId,
                    'date'    => $date,
                    'title'   => "Closed Vault: {$saving->title} (Refund)",
                    'type'    => 'income',
                    'category' => 'saving',
                    'amount'  => $remainingAmount,
                    'notes'   => "Balance returned from closing the vault."
                ]);
            }

            $saving->delete();
        });
    }
}