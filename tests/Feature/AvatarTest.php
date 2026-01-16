<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('user bisa upload avatar profil', function () {
    // Gunakan disk 'public' karena biasanya itu yang di-set di CI/Lokal
    Storage::fake('public');

    $user = User::factory()->create();

    $file = UploadedFile::fake()->image('avatar.jpg');

    $response = $this->actingAs($user)->patch('/profile', [
        'name' => 'User Ganteng',
        'email' => 'ganteng@example.com',
        'avatar' => $file,
    ]);

    $user->refresh();

    // Pastikan path tersimpan
    expect($user->avatar_path)->not->toBeNull();

    // Pastikan file beneran ada di disk palsu
    Storage::disk('public')->assertExists($user->avatar_path);
});
