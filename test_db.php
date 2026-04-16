<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "--- STARTING DATABASE INTEGRITY TEST ---\n";

try {
    echo "[1/3] Testing DB Connection...\n";
    DB::connection()->getPdo();
    echo "✅ Connection Successful.\n\n";

    echo "[2/3] Checking Table Structure for 'users'...\n";
    $columns = DB::select("SELECT column_name, data_type, is_nullable, column_default 
                           FROM information_schema.columns 
                           WHERE table_name = 'users'");
    
    foreach ($columns as $column) {
        echo sprintf("- %s (%s) | Null: %s | Default: %s\n", 
            $column->column_name, 
            $column->data_type, 
            $column->is_nullable, 
            $column->column_default
        );
    }
    echo "\n";

    echo "[3/3] Attempting Manual User Creation (Simulating Register)...\n";
    $testEmail = 'test_debug_' . time() . '@example.com';
    
    $user = User::create([
        'name' => 'Debug Test',
        'email' => $testEmail,
        'password' => Hash::make('password123'),
        'settings' => [
            'modules' => ['habit' => true],
            'currency' => 'IDR'
        ]
    ]);

    echo "✅ SUCCESS! User created with ID: " . $user->id . "\n";
    
    // Clean up
    $user->delete();
    echo "🗑️ Test user cleaned up.\n";

} catch (\Illuminate\Database\QueryException $e) {
    echo "❌ DATABASE QUERY ERROR DETECTED!\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "SQL: " . $e->getSql() . "\n";
} catch (\Exception $e) {
    echo "❌ GENERAL ERROR DETECTED!\n";
    echo "Message: " . $e->getMessage() . "\n";
}

echo "\n--- TEST FINISHED ---\n";
