<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $id = 102;
    echo "Testing direct connection update...\n";
    
    $config = config('database.connections.pgsql');
    
    // Helper function to force toggle
    function testConnection($connectionName) {
        $id = 102;
        // 1. Force to true
        echo "  Setting to true...\n";
        $user = \App\Models\User::on($connectionName)->find($id);
        $user->is_premium = true;
        $user->save();
        
        // 2. Set to false
        echo "  Setting to false...\n";
        $user = \App\Models\User::on($connectionName)->find($id);
        $user->is_premium = false;
        $user->save();
        echo "  SUCCESS!\n";
    }
    
    // Case A: Current Config
    echo "--- Case A: Current Config ---\n";
    echo "Host: {$config['host']}, Port: {$config['port']}\n";
    echo "Emulate Prepares: " . ($config['options'][PDO::ATTR_EMULATE_PREPARES] ?? 'not set') . "\n";
    try {
        testConnection('pgsql');
        echo "Case A SUCCESS!\n";
    } catch (\Throwable $e) {
        echo "Case A FAILED: " . $e->getMessage() . "\n";
    }
    
    // Case B: Emulate Prepares = false on port 6543
    echo "\n--- Case B: Emulate Prepares = false on port 6543 ---\n";
    $configB = $config;
    $configB['options'][PDO::ATTR_EMULATE_PREPARES] = false;
    \Config::set('database.connections.pgsql_temp', $configB);
    \DB::purge('pgsql_temp');
    try {
        testConnection('pgsql_temp');
        echo "Case B SUCCESS!\n";
    } catch (\Throwable $e) {
        echo "Case B FAILED: " . $e->getMessage() . "\n";
    }
    
    // Case C: Port 5432, Emulate Prepares = false
    echo "\n--- Case C: Port 5432, Emulate Prepares = false ---\n";
    $configC = $config;
    $configC['port'] = '5432';
    $configC['options'][PDO::ATTR_EMULATE_PREPARES] = false;
    \Config::set('database.connections.pgsql_temp2', $configC);
    \DB::purge('pgsql_temp2');
    try {
        testConnection('pgsql_temp2');
        echo "Case C SUCCESS!\n";
    } catch (\Throwable $e) {
        echo "Case C FAILED: " . $e->getMessage() . "\n";
    }
    
} catch (\Throwable $e) {
    echo "MAIN ERROR: " . $e->getMessage() . "\n";
}
