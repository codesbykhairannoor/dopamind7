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

        // Semua data dikirim langsung (tidak defer) agar halaman langsung tampil penuh.
        // getDashboardData sudah query semua data sekaligus — defer hanya menambah round-trip.
        $data = $this->financeService->getDashboardData($user->id, $validDate, $timezone);

        return Inertia::render('Finance/Index', [
            'transactions' => FinanceTransactionResource::collection($data['transactions'])->resolve(),
            'budgets'      => FinanceBudgetResource::collection($data['budgets'])->resolve(),
            'categories'   => $data['categories'],
            'savings'      => $data['savings'],
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

        // Improved Excel HTML Styling
        $html = "
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
            <style>
                .header-main { background-color: #1e293b; color: #ffffff; font-size: 14pt; font-weight: bold; text-align: center; height: 40px; }
                .sub-header { background-color: #f8fafc; color: #64748b; font-size: 10pt; text-align: center; }
                .col-header { background-color: #4f46e5; color: #ffffff; font-weight: bold; text-align: center; border: 0.5pt solid #312e81; }
                .income { color: #059669; font-weight: bold; }
                .expense { color: #dc2626; font-weight: bold; }
                .border { border: 0.5pt solid #e2e8f0; }
                .text-right { text-align: right; }
                .text-center { text-align: center; }
                td { padding: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            </style>
        </head>
        <body>
            <table>
                <tr>
                    <td colspan='6' class='header-main'>ONEFORMIND FINANCIAL REPORT</td>
                </tr>
                <tr>
                    <td colspan='6' class='sub-header'>Period: " . date('F Y', strtotime($month . '-01')) . " | Generated for: " . $user->name . "</td>
                </tr>
                <tr></tr>
                <thead>
                    <tr>
                        <th class='col-header'>DATE</th>
                        <th class='col-header'>TITLE</th>
                        <th class='col-header'>TYPE</th>
                        <th class='col-header'>CATEGORY</th>
                        <th class='col-header'>AMOUNT</th>
                        <th class='col-header'>NOTES</th>
                    </tr>
                </thead>
                <tbody>";

        $totalIncome = 0;
        $totalExpense = 0;

        foreach ($transactions as $trx) {
            $typeClass = $trx->type === 'income' ? 'income' : 'expense';
            $amount = (float) $trx->amount;
            if ($trx->type === 'income') $totalIncome += $amount; else $totalExpense += $amount;

            $html .= "
                <tr>
                    <td class='border text-center'>" . date('d M Y', strtotime($trx->date)) . "</td>
                    <td class='border'>{$trx->title}</td>
                    <td class='border text-center {$typeClass}'>" . strtoupper($trx->type) . "</td>
                    <td class='border text-center'>" . strtoupper($trx->category) . "</td>
                    <td class='border text-right {$typeClass}'>" . number_format($amount, 2) . "</td>
                    <td class='border'>{$trx->notes}</td>
                </tr>";
        }

        $html .= "
                <tr></tr>
                <tr>
                    <td colspan='4' class='text-right' style='font-weight: bold;'>TOTAL INCOME</td>
                    <td class='border text-right income'>" . number_format($totalIncome, 2) . "</td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan='4' class='text-right' style='font-weight: bold;'>TOTAL EXPENSE</td>
                    <td class='border text-right expense'>" . number_format($totalExpense, 2) . "</td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan='4' class='text-right' style='font-weight: bold; background-color: #f1f5f9;'>NET BALANCE</td>
                    <td class='border text-right' style='font-weight: bold; background-color: #f1f5f9;'>" . number_format($totalIncome - $totalExpense, 2) . "</td>
                    <td style='background-color: #f1f5f9;'></td>
                </tr>
            </tbody>
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
