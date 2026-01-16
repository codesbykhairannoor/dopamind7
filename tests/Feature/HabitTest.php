<?php

use App\Models\Habit;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

// Wajib pake ini biar database test selalu bersih & steril
uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('dashboard menampilkan daftar habit user', function () {
    // 1. Siapkan User & Data Dummy
    $user = User::factory()->create();
    Habit::create([
        'user_id' => $user->id,
        'name' => 'Baca Buku 1 Jam',
        'icon' => '📚',
        'color' => '#ffffff',
        'monthly_target' => 10,
        'period' => Carbon::now()->format('Y-m'),
    ]);

    // 2. Login & Buka Dashboard
    $response = $this->actingAs($user)->get('/dashboard');

    // 3. Cek apakah Inertia mengirim data yang benar
    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('Habits/Index') // Pastikan file Vue-nya bener
            ->has('habits.data', 1)  // Harus ada 1 habit
            ->where('habits.data.0.name', 'Baca Buku 1 Jam') // Namanya harus sama
        );
});

test('user bisa membuat habit baru', function () {
    $user = User::factory()->create();

    // Kirim data POST seolah-olah dari form
    $response = $this->actingAs($user)->post('/habits', [
        'name' => 'Olahraga Pagi',
        'icon' => '🏃',
        'color' => '#ff0000',
        'monthly_target' => 20,
        'period' => '2026-01',
    ]);

    // Harapannya: Redirect kembali (back)
    $response->assertRedirect();

    // Cek Database: Datanya masuk gak?
    $this->assertDatabaseHas('habits', [
        'name' => 'Olahraga Pagi',
        'user_id' => $user->id,
    ]);
});

test('user TIDAK BISA edit habit milik orang lain (Security Check)', function () {
    // Skenario: Hacker (User B) mau ubah Habit User A
    $userA = User::factory()->create();
    $userB = User::factory()->create(); // Hacker

    $habitMilikA = Habit::create([
        'user_id' => $userA->id, // Punya A
        'name' => 'Rahasia A',
        'period' => '2026-01',
        'monthly_target' => 1,
        'icon' => '🔒',
        'color' => '#000',
    ]);

    // User B mencoba maksa Update
    $response = $this->actingAs($userB)->patch("/habits/{$habitMilikA->id}", [
        'name' => 'Hacked by B',
    ]);

    // Harapannya: Ditolak Satpam (403 Forbidden)
    $response->assertStatus(403);

    // Pastikan data di database GAK BERUBAH
    $this->assertDatabaseHas('habits', [
        'id' => $habitMilikA->id,
        'name' => 'Rahasia A', // Masih nama lama
    ]);
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
    ]);

    $date = '2026-01-01';

    // Aksi: Centang habit
    $response = $this->actingAs($user)->post("/habits/{$habit->id}/log", [
        'date' => $date,
        'status' => 'completed',
    ]);

    $response->assertRedirect();

    // Cek tabel logs
    $this->assertDatabaseHas('habit_logs', [
        'habit_id' => $habit->id,
        'date' => $date,
        'status' => 'completed',
    ]);
});
