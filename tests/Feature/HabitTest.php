<?php

use App\Models\Habit;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('dashboard menampilkan daftar habit user', function () {
    $user = User::factory()->create();
    Habit::create([
        'user_id' => $user->id,
        'name' => 'Baca Buku 1 Jam',
        'icon' => '📚',
        'color' => '#ffffff',
        'monthly_target' => 10,
        'status' => 1, // Tambahkan status
        'period' => Carbon::now()->format('Y-m'),
    ]);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard') // Sesuai UI baru
            ->has('habits.data', 1)
            ->where('habits.data.0.name', 'Baca Buku 1 Jam')
        );
});

test('user bisa membuat habit baru', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/habits', [
        'name' => 'Olahraga Pagi',
        'icon' => '🏃',
        'color' => '#ff0000',
        'monthly_target' => 20,
        'period' => '2026-01',
        'status' => 1, // Tambahkan status agar tidak fail validasi
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('habits', [
        'name' => 'Olahraga Pagi',
        'user_id' => $user->id,
    ]);
});

test('user TIDAK BISA edit habit milik orang lain (Security Check)', function () {
    $userA = User::factory()->create();
    $userB = User::factory()->create();

    $habitMilikA = Habit::create([
        'user_id' => $userA->id,
        'name' => 'Rahasia A',
        'period' => '2026-01',
        'monthly_target' => 1,
        'icon' => '🔒',
        'color' => '#000',
        'status' => 1,
    ]);

    $response = $this->actingAs($userB)->patch("/habits/{$habitMilikA->id}", [
        'name' => 'Hacked by B',
    ]);

    $response->assertStatus(403);
});

test('user bisa melakukan log (centang) habit', function () {
    $user = User::factory()->create();
    $habit = Habit::create([
        'user_id' => $user->id,
        'name' => 'Minum Air',
        'period' => '2026-01',
        'monthly_target' => 30,
        'icon' => '💧',
        'color' => '#fff',
        'status' => 1,
    ]);

    $date = '2026-01-01';

    $response = $this->actingAs($user)->post("/habits/{$habit->id}/log", [
        'date' => $date,
        'status' => 'completed',
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('habit_logs', [
        'habit_id' => $habit->id,
        'date' => $date,
        'status' => 'completed',
    ]);
});
