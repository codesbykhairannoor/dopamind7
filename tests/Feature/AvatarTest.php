<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('user bisa upload avatar profil', function () {
    // 1. Pura-pura kita punya Storage S3 (Mocking)
    // Jadi gak beneran upload ke cloud, cuma di memori aja
    Storage::fake('s3');

    $user = User::factory()->create();

    // 2. Bikin file gambar palsu
    $file = UploadedFile::fake()->image('ganteng.jpg');

    // 3. Upload via endpoint profile
    $response = $this->actingAs($user)->patch('/profile', [
        'name' => 'User Ganteng',
        'email' => 'ganteng@example.com',
        'avatar' => $file, // Kirim filenya
    ]);

    // 4. Reload data user dari DB
    $user->refresh();

    // 5. Cek Database: Kolom avatar_path harus terisi
    expect($user->avatar_path)->not->toBeNull();

    // 6. Cek Storage Palsu: Filenya harusnya ada disitu
    Storage::disk('s3')->assertExists($user->avatar_path);
});
