<?php

namespace App\Http\Controllers;

use App\Http\Requests\FinanceDateRequest;
use App\Http\Requests\TransactionRequest;
use App\Http\Requests\BudgetRequest;
use App\Http\Resources\FinanceBudgetResource;
use App\Http\Resources\FinanceTransactionResource;
use App\Models\FinanceBudget;
use App\Models\FinanceCategory;
use App\Models\FinanceTransaction;
use App\Models\DailyLog;
use App\Services\FinanceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class FinanceController extends Controller
{
    public function __construct(private FinanceService $financeService)
    {
        // Service injected otomatis
    }

    public function index(FinanceDateRequest $request): Response
    {
        $user = Auth::user();
        $timezone = $user->timezone ?? 'Asia/Jakarta';
        $validDate = $request->getValidDate($timezone);

        // Lempar semua kalkulasi berat ke Service
        $data = $this->financeService->getDashboardData($user->id, $validDate, $timezone);

        return Inertia::render('Finance/Index', [
            'transactions' => FinanceTransactionResource::collection($data['transactions'])->resolve(),
            'budgets'      => FinanceBudgetResource::collection($data['budgets'])->resolve(),
            'categories'   => $data['categories'],
            'stats'        => $data['stats'],
            'filters'      => $data['filters']
        ]);
    }

    // --- KATEGORI ---
    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255', 
            'type' => 'required|in:income,expense',
            'icon' => 'nullable|string|max:50'
        ]);
        
        FinanceCategory::firstOrCreate(
            ['user_id' => Auth::id(), 'slug' => Str::slug($validated['name'], '_')],
            ['name' => $validated['name'], 'type' => $validated['type'], 'icon' => $validated['icon'] ?? '💰']
        );

        return back()->with('success', 'Kategori berhasil disimpan.');
    }

    public function updateCategory(Request $request, FinanceCategory $category)
    {
        if ($category->user_id !== Auth::id()) abort(403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:50'
        ]);

        $this->financeService->updateCategoryCascade($category, $validated['name'], $validated['icon']);
        return back()->with('success', 'Kategori diperbarui.');
    }

    public function destroyCategory(FinanceCategory $category)
    {
        if ($category->user_id !== Auth::id()) abort(403);
        $this->financeService->destroyCategorySafely($category);
        return back();
    }

    // --- TRANSAKSI TUNGGAL ---
    public function storeTransaction(TransactionRequest $request)
    {
        Auth::user()->financeTransactions()->create($request->validated());
        return back();
    }

    public function updateTransaction(TransactionRequest $request, FinanceTransaction $financeTransaction)
    {
        if ($financeTransaction->user_id !== Auth::id()) abort(403);
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
        $this->financeService->storeBudget(Auth::id(), $request->all());
        return back();
    }

    public function updateBudget(BudgetRequest $request, FinanceBudget $financeBudget)
    {
        if ($financeBudget->user_id !== Auth::id()) abort(403);
        $this->financeService->updateBudgetCascade($financeBudget, $request->all());
        return back();
    }

    public function destroyBudget(FinanceBudget $financeBudget)
    {
        if ($financeBudget->user_id !== Auth::id()) abort(403);
        $financeBudget->delete();
        return back();
    }

    // --- TARGET INCOME & BATCH ---
    public function updateIncomeTarget(Request $request)
    {
        $validated = $request->validate([
            'month'  => 'required|date_format:Y-m', 
            'amount' => 'required|numeric|min:0'
        ]);
        
        DailyLog::updateOrCreate(
            ['user_id' => Auth::id(), 'date' => $validated['month'] . '-01'],
            ['income_target' => $validated['amount']]
        );
        
        return back();
    }

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

        $this->financeService->batchStoreTransactions(
            Auth::id(), 
            $request->date, 
            $request->transactions, 
            Auth::user()->timezone ?? 'Asia/Jakarta'
        );

        return back();
    }
}