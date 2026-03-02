<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\FinanceTransaction;
use App\Models\Journal;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    
    // 1. Endpoint Simulasi Input Transaksi Keuangan
    Route::post('/stress/transaction', function (Request $request) {
        // Ambil kategori pertama milik user ini agar tidak Not Null Violation
        $category = $request->user()->financeCategories()->first();

        // Jika user belum punya kategori (backup), kita buatkan satu secara instan
        if (!$category) {
            $category = \App\Models\FinanceCategory::create([
                'user_id' => $request->user()->id,
                'name'    => 'Auto Generated Category',
                'slug'    => 'auto-' . uniqid(),
                'type'    => 'expense',
                'icon'    => '💰',
            ]);
        }

        return FinanceTransaction::create([
            'user_id' => $request->user()->id,
            'finance_category_id' => $category->id,
            'amount' => rand(10000, 100000),
            'type' => 'expense',
            'description' => 'Transaksi Stress Test - ' . uniqid(),
            'date' => now(),
        ]);
    });

    // 2. Endpoint Simulasi Input Jurnal
    Route::post('/stress/journal', function (Request $request) {
        return Journal::create([
            'user_id' => $request->user()->id,
            'title' => 'Jurnal Stress Test - ' . uniqid(),
            'body' => 'Ini adalah isi jurnal yang di-generate saat stress testing oleh k6.',
            'date' => now(),
        ]);
    });

});