<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $user = \App\Models\User::create([
        'name' => 'Test User 4',
        'email' => 'test_register_500_4@example.com',
        'password' => \Illuminate\Support\Facades\Hash::make('password'),
        'settings' => [
            'modules' => [
                'habit' => true,
                'planner' => true,
                'finance' => true,
            ],
            'currency' => 'IDR',
            'timezone' => 'Asia/Jakarta'
        ]
    ]);
    echo "User created successfully: " . $user->id . "\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
