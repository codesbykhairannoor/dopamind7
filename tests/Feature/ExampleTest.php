<?php

use App\Models\Habit;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('halaman dashboard bisa dibuka user login', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get('/dashboard');
    $response->assertStatus(200);
});

test('halaman dashboard menampilkan data habit', function () {
    $user = User::factory()->create();
    Habit::create([
        'user_id' => $user->id,
        'name' => 'Lari Pagi',
        'period' => '2026-01',
        'monthly_target' => 30,
        'status' => 1,
    ]);

    $response = $this->actingAs($user)->get('/dashboard?month=2026-01');

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Dashboard') // Samakan dengan komponen Dashboard utama lu
        ->has('habits.data', 1)
        ->where('habits.data.0.name', 'Lari Pagi')
    );
});
