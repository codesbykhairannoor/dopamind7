<?php

namespace App\Http\Controllers;

use App\Models\FinanceBudget;
use App\Models\FinanceTransaction;
use App\Models\FinanceCategory;
use App\Models\DailyLog;
use App\Http\Resources\FinanceBudgetResource;
use App\Http\Resources\FinanceTransactionResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class FinanceController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $date = $request->input('date', now()->format('Y-m-d'));
        $carbonDate = Carbon::parse($date);

        // 1. Ambil Semua Kategori (Untuk Dropdown & List Income)
        $categories = FinanceCategory::where('user_id', $user->id)->get();

        // 2. Transaksi
        $transactions = FinanceTransaction::where('user_id', $user->id)
            ->whereMonth('date', $carbonDate->month)
            ->whereYear('date', $carbonDate->year)
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        // 3. Statistik (SQL Aggregate)
        $statsRaw = FinanceTransaction::where('user_id', $user->id)
            ->whereMonth('date', $carbonDate->month)
            ->whereYear('date', $carbonDate->year)
            ->select('type', 'category', DB::raw('sum(amount) as total'))
            ->groupBy('type', 'category')
            ->get();

        $expenseStats = $statsRaw->where('type', 'expense')->pluck('total', 'category');
        $incomeStats = $statsRaw->where('type', 'income')->pluck('total', 'category');

        $totalIncome = $statsRaw->where('type', 'income')->sum('total');
        $totalExpense = $statsRaw->where('type', 'expense')->sum('total');

        // 4. Budget
        $budgets = FinanceBudget::where('user_id', $user->id)
            ->where('month', $carbonDate->format('Y-m'))
            ->get()
            ->map(function ($budget) use ($expenseStats) {
                $budget->spent = $expenseStats[$budget->category] ?? 0;
                return $budget;
            });

        // 5. Daily Log (Income Target)
        $log = DailyLog::where('user_id', $user->id)->whereDate('date', $carbonDate->startOfMonth())->first();
        $incomeTarget = $log ? (float) $log->income_target : 0;
        $balance = ($incomeTarget + $totalIncome) - $totalExpense;

        return Inertia::render('Finance/Index', [
            'transactions' => FinanceTransactionResource::collection($transactions)->resolve(),
            'budgets'      => FinanceBudgetResource::collection($budgets)->resolve(),
            'categories'   => $categories,
            'stats'        => [
                'total_income'        => $totalIncome,
                'total_expense'       => $totalExpense,
                'income_target'       => $incomeTarget,
                'balance'             => $balance,
                'expense_by_category' => $expenseStats,
                'income_by_category'  => $incomeStats,
            ],
            'filters'      => ['date' => $date, 'month_name' => $carbonDate->translatedFormat('F Y')]
        ]);
    }

    // --- KATEGORI (Income & Umum) ---

    public function storeCategory(Request $request)
    {
        $request->validate(['name' => 'required', 'type' => 'required']);
        $slug = Str::slug($request->name, '_');

        FinanceCategory::firstOrCreate(
            ['user_id' => Auth::id(), 'slug' => $slug],
            [
                'name' => $request->name,
                'type' => $request->type,
                'icon' => $request->icon ?? '💰'
            ]
        );

        return back()->with('success', 'Kategori berhasil disimpan.');
    }

    public function updateCategory(Request $request, FinanceCategory $category)
    {
        if ($category->user_id !== Auth::id()) abort(403);

        // Logic rename master category (untuk Income/Expense manual)
        $oldSlug = $category->slug;
        $newSlug = Str::slug($request->name, '_');

        DB::transaction(function () use ($category, $request, $oldSlug, $newSlug) {
            $category->update([
                'name' => $request->name,
                'slug' => $newSlug,
                'icon' => $request->icon
            ]);

            // Jika nama berubah, update semua history transaksi & budget terkait
            if ($oldSlug !== $newSlug) {
                FinanceTransaction::where('user_id', Auth::id())->where('category', $oldSlug)->update(['category' => $newSlug]);
                FinanceBudget::where('user_id', Auth::id())->where('category', $oldSlug)->update(['category' => $newSlug]);
            }
        });

        return back()->with('success', 'Kategori diperbarui.');
    }

    public function destroyCategory(FinanceCategory $category)
    {
        if ($category->user_id !== Auth::id()) abort(403);

        // 🔥 UPDATE: Langsung hapus tanpa cek transaksi!
        // Kategori hilang dari pilihan dropdown/sidebar,
        // tapi history transaksi dengan kategori ini TETAP ADA 
        // (karena di tabel transaksi yang disimpan adalah slug/text-nya, bukan ID relasi).
        
        $category->delete();
        
        return back();
    }
    // --- TRANSAKSI ---

    public function storeTransaction(Request $request)
    {
        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'amount'   => 'required|numeric|min:1',
            'type'     => 'required|in:expense,income',
            'category' => 'required|string',
            'date'     => 'required|date',
            'notes'    => 'nullable|string'
        ]);

        $request->user()->financeTransactions()->create($validated);
        return back();
    }

    public function updateTransaction(Request $request, FinanceTransaction $financeTransaction)
    {
        if ($financeTransaction->user_id !== Auth::id()) abort(403);

        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'amount'   => 'required|numeric|min:1',
            'type'     => 'required|in:expense,income',
            'category' => 'required|string',
            'date'     => 'required|date',
            'notes'    => 'nullable|string'
        ]);

        $financeTransaction->update($validated);
        return back();
    }

    public function destroyTransaction(FinanceTransaction $financeTransaction)
    {
        if ($financeTransaction->user_id !== Auth::id()) abort(403);
        $financeTransaction->delete();
        return back();
    }

    // --- BUDGET (Logic Ganti Nama & Hapus Aman) ---

    public function storeBudget(Request $request)
    {
        $request->validate([
            'category' => 'required',
            'limit_amount' => 'required|numeric|min:1',
            'month' => 'required'
        ]);

        DB::transaction(function () use ($request) {
            // Cek Master Category
            $exists = FinanceCategory::where('user_id', Auth::id())
                ->where('slug', $request->category)->exists();

            // Jika kategori belum ada di master, buat baru.
            // Jika sudah ada, update namanya (jaga-jaga user ganti nama pas create).
            if (!$exists && $request->has('name')) {
                FinanceCategory::create([
                    'user_id' => Auth::id(),
                    'slug' => $request->category,
                    'name' => $request->name,
                    'icon' => $request->icon ?? '💸',
                    'type' => 'expense'
                ]);
            } else if ($exists && $request->has('name')) {
                FinanceCategory::where('user_id', Auth::id())
                    ->where('slug', $request->category)
                    ->update([
                        'name' => $request->name,
                        'icon' => $request->icon
                    ]);
            }

            // Simpan Budget
            FinanceBudget::updateOrCreate(
                ['user_id' => Auth::id(), 'category' => $request->category, 'month' => $request->month],
                ['limit_amount' => $request->limit_amount]
            );
        });

        return back();
    }

    public function updateBudget(Request $request, FinanceBudget $financeBudget)
    {
        if ($financeBudget->user_id !== Auth::id()) abort(403);
        $request->validate(['limit_amount' => 'required|numeric|min:1']);

        DB::transaction(function () use ($request, $financeBudget) {
            
            // 1. CEK PERUBAHAN NAMA KATEGORI
            // Ambil master category berdasarkan slug lama di budget
            $oldSlug = $financeBudget->category;
            $masterCategory = FinanceCategory::where('user_id', Auth::id())->where('slug', $oldSlug)->first();

            // Jika user mengirim nama baru dan berbeda dengan database
            if ($masterCategory && $request->has('name') && ($request->name !== $masterCategory->name || $request->icon !== $masterCategory->icon)) {
                
                $newSlug = Str::slug($request->name, '_');

                // Update Master Category
                $masterCategory->update([
                    'name' => $request->name,
                    'slug' => $newSlug, // Slug berubah jadi jajan_1
                    'icon' => $request->icon
                ]);

                // Update Foreign Key di Budget & Transaksi
                if ($oldSlug !== $newSlug) {
                    // Update Budget ini (dan budget bulan lain yang pakai kategori sama)
                    FinanceBudget::where('user_id', Auth::id())
                        ->where('category', $oldSlug)
                        ->update(['category' => $newSlug]);
                    
                    // Update History Transaksi (Jajan -> Jajan1)
                    FinanceTransaction::where('user_id', Auth::id())
                        ->where('category', $oldSlug)
                        ->update(['category' => $newSlug]);
                }
            }

            // 2. Update Limit Budget
            // Kita refresh model budget karena slug-nya mungkin barusan diupdate query di atas
            $financeBudget->refresh(); 
            $financeBudget->update(['limit_amount' => $request->limit_amount]);
        });

        return back();
    }

    public function destroyBudget(FinanceBudget $financeBudget)
    {
        if ($financeBudget->user_id !== Auth::id()) abort(403);

        // Hapus target budget-nya saja.
        // History transaksi TETAP ADA.
        // Kategori Master (FinanceCategory) TETAP ADA (supaya nama/icon di history transaksi tidak error).
        $financeBudget->delete();

        return back();
    }

    public function updateIncomeTarget(Request $request)
    {
        $request->validate(['month' => 'required', 'amount' => 'required|numeric']);
        DailyLog::updateOrCreate(
            ['user_id' => Auth::id(), 'date' => $request->month . '-01'],
            ['income_target' => $request->amount]
        );
        return back();
    }
}