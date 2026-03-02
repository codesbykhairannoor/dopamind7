<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\FinanceCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class GenerateStressTestUsers extends Command
{
    protected $signature = 'stress:generate-users';
    protected $description = 'Generate 1000 users and their Sanctum tokens for k6 stress testing';

public function handle()
{
    $this->info('Syncing 50 test users. No data will be deleted...');

    $tokens = [];
    
    for ($i = 1; $i <= 50; $i++) {
        $email = "stress_user_{$i}@test.com";
        
        // updateOrCreate: Kalau user email ini ada, ambil. Kalau gak ada, buat baru.
        // Data user lain (user asli kamu) aman, gak bakal kesenggol.
        $user = \App\Models\User::updateOrCreate(
            ['email' => $email],
            [
                'name' => "Stress User {$i}",
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Pastikan user punya kategori keuangan
        $category = $user->financeCategories()->firstOrCreate([
            'name' => 'Stress Test Category',
            'type' => 'expense',
            'slug' => 'stress-test-' . $user->id,
            'icon' => '💰',
        ]);

        // Hapus token lama biar gak menumpuk di DB, lalu buat yang baru
        $user->tokens()->delete();
        $token = $user->createToken('stress-test')->plainTextToken;
        
        $tokens[] = [
            'user_id' => $user->id,
            'token' => $token,
            'category_id' => $category->id,
        ];
    }

    file_put_contents(base_path('stress_tokens.json'), json_encode($tokens, JSON_PRETTY_PRINT));
    $this->info('Tokens synced successfully to stress_tokens.json!');
}
}