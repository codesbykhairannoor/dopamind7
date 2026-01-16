<?php

use App\Models\Habit;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

// Wajib pakai RefreshDatabase biar data test dihapus lagi setelah selesai
uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('halaman dashboard bisa dibuka user login', function () {
    // 1. Kita pura-pura jadi User
    $user = User::factory()->create();

    // 2. Kita coba akses halaman dashboard
    $response = $this->actingAs($user)->get('/dashboard');

    // 3. Harapannya: Status OK (200)
    $response->assertStatus(200);
});

test('halaman dashboard menampilkan data habit', function () {
    // 1. Setup Data
    $user = User::factory()->create();
    Habit::create([
        'user_id' => $user->id,
        'name' => 'Lari Pagi', // Kita cari ini nanti
        'period' => '2026-01',
        'monthly_target' => 30,
    ]);

    // 2. Action
    $response = $this->actingAs($user)->get('/dashboard?month=2026-01');

    // 3. Assertion (Pengecekan Ala Pro)
    // Kita gak cek HTML, tapi cek DATA yang dikirim ke Vue
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Habits/Index') // Pastikan komponennya benar
        ->has('habits.data', 1) // Pastikan ada 1 habit di dalam array data
        ->where('habits.data.0.name', 'Lari Pagi') // Pastikan namanya bener
    );
});
