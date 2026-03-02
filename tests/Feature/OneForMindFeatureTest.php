<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class OneForMindFeatureTest extends TestCase
{
    // Tetap gunakan ini agar database lokal tetap bersih
    use DatabaseTransactions;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Ambil user pertama atau buat baru
        $this->user = User::first() ?? User::factory()->create();
    }

    /** @test */
    public function test_mega_seluruh_fitur_berjalan_mulus()
    {
        $user = $this->user;

        // ==========================================
        // 1. TEST DASHBOARD & LOGIN
        // ==========================================
        $response = $this->actingAs($user)->get('/dashboard');
        $response->assertStatus(200);

        // ==========================================
        // 2. TEST INPUT FINANCE (KEUANGAN)
        // ==========================================
        $this->actingAs($user)->post('/finance/transactions', [
            'amount'   => 25000,
            'category' => 'Makan',          // Sesuai migration: string('category')
            'type'     => 'expense',
            'title'    => 'Test Beli Makan', // Sesuai migration: string('title')
            'date'     => now()->format('Y-m-d'),
        ]);

        $this->assertDatabaseHas('finance_transactions', [
            'user_id' => $user->id,
            'title'   => 'Test Beli Makan'   // Cek berdasarkan 'title'
        ]);

        // ==========================================
        // 3. TEST INPUT JOURNAL (JURNAL)
        // ==========================================
        $this->actingAs($user)->post('/journal', [
            'title' => 'Test Jurnal Hari Ini',
            'body'  => 'Sistem berhasil berjalan tanpa error!',
            'date'  => now()->format('Y-m-d'),
        ]);

        $this->assertDatabaseHas('journals', [
            'user_id' => $user->id,
            'title'   => 'Test Jurnal Hari Ini'
        ]);

        // ==========================================
        // 4. TEST INPUT HABIT (KEBIASAAN)
        // ==========================================
        $this->actingAs($user)->post('/habits', [
            'name'           => 'Ngoding 2 Jam',
            'icon'           => '💻',
            'color'          => '#10b981',
            'goal_value'     => 1,
            'frequency_type' => 'daily',
        ]);

        $this->assertDatabaseHas('habits', [
            'user_id' => $user->id,
            'name'    => 'Ngoding 2 Jam'
        ]);
        
        $this->assertTrue(true);
    }
}