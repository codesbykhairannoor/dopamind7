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
use App\Services\GeminiService;
use App\Services\FinanceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class FinanceController extends Controller
{
    public function __construct(
        private FinanceService $financeService,
        private GeminiService $geminiService
    ) {}

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
            'filters'      => $data['filters'],
            'aiAudit'      => session('ai_audit'),
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

    public function exportExcel(Request $request)
    {
        $user = Auth::user();
        $month = $request->query('month', now()->format('Y-m'));
        
        $transactions = FinanceTransaction::ofUser($user->id)
            ->where('date', 'like', $month . '%')
            ->orderBy('date', 'asc')
            ->get();

        $filename = "OneForMind_Finance_{$month}.xls";

        $html = "
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
            <style>
                .header { background-color: #4f46e5; color: white; font-weight: bold; }
                .income { color: #059669; }
                .expense { color: #dc2626; }
                td { border: 0.5pt solid #e2e8f0; padding: 5px; }
            </style>
        </head>
        <body>
            <table>
                <tr>
                    <td colspan='6' style='font-size: 16pt; font-weight: bold;'>Finance Report - " . $month . "</td>
                </tr>
                <tr>
                    <td colspan='6' style='color: #64748b;'>Generated for: " . $user->name . " (" . $user->email . ")</td>
                </tr>
                <tr></tr>
                <tr class='header'>
                    <td>Date</td>
                    <td>Title</td>
                    <td>Type</td>
                    <td>Category</td>
                    <td>Amount</td>
                    <td>Notes</td>
                </tr>";

        foreach ($transactions as $trx) {
            $typeClass = $trx->type === 'income' ? 'income' : 'expense';
            $html .= "
                <tr>
                    <td>{$trx->date}</td>
                    <td>{$trx->title}</td>
                    <td class='{$typeClass}'>" . ucfirst($trx->type) . "</td>
                    <td>" . strtoupper($trx->category) . "</td>
                    <td style='text-align: right;'>" . number_format($trx->amount, 2) . "</td>
                    <td>{$trx->notes}</td>
                </tr>";
        }

        $html .= "
            </table>
        </body>
        </html>";

        return response($html)
            ->header('Content-Type', 'application/vnd.ms-excel')
            ->header('Content-Disposition', "attachment; filename={$filename}")
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0');
    }

    public function exportTax(Request $request)
    {
        $user = Auth::user();
        $month = $request->query('month', now()->format('Y-m'));
        $data = $this->financeService->getDashboardData($user->id, $month . '-01', $user->timezone ?? 'Asia/Jakarta');

        return view('finance.tax_report', [
            'user' => $user,
            'month' => $month,
            'transactions' => $data['transactions'],
            'stats' => $data['stats'],
            'categories' => $data['categories']
        ]);
    }

    public function updateCurrency(Request $request)
    {
        $validated = $request->validate([
            'currency' => 'required|string|max:10',
            'currency_symbol' => 'required|string|max:10'
        ]);

        Auth::user()->update($validated);
        return back()->with('success', 'Currency updated.');
    }

    public function runAudit(Request $request)
    {
        $user = Auth::user();
        $month = $request->input('month', now()->format('Y-m'));
        
        $stats = $this->financeService->getDashboardData($user->id, $month, $user->timezone ?? 'Asia/Jakarta')['stats'];
        
        $data = [
            'user_name' => $user->name,
            'total_income' => $stats['total_income'],
            'total_expense' => $stats['total_expense'],
            'categories' => $stats['expense_by_category']
        ];

        $audit = $this->geminiService->auditFinance($data, $month);
        
        return back()->with('ai_audit', $audit);
    }
}