<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $id = 102;
    
    // Check initial state
    $initial = \DB::select('select is_premium from users where id = ?', [$id]);
    echo "Initial DB value: ";
    var_dump($initial[0]->is_premium ?? null);
    
    // 1. Force update to true using DB::raw('true')
    echo "Forcing true using DB::statement...\n";
    \DB::statement('update users set is_premium = true where id = ?', [$id]);
    $check = \DB::select('select is_premium from users where id = ?', [$id]);
    echo "DB value after forcing true: ";
    var_dump($check[0]->is_premium ?? null);
    
    // 2. Try updating to false using Eloquent with DB::raw('false')
    echo "Updating via Eloquent using DB::raw('false')...\n";
    $user = \App\Models\User::find($id);
    // Force set it dirty
    $user->is_premium = \DB::raw('false');
    $user->save();
    
    $check = \DB::select('select is_premium from users where id = ?', [$id]);
    echo "DB value after Eloquent DB::raw('false'): ";
    var_dump($check[0]->is_premium ?? null);
    
    // 3. Try updating to false using DB::statement with PHP boolean false
    echo "Updating via DB::statement with PHP boolean false...\n";
    try {
        \DB::update('update users set is_premium = ? where id = ?', [false, $id]);
        echo "SUCCESS!\n";
    } catch (\Throwable $e) {
        echo "FAILED: " . $e->getMessage() . "\n";
    }
    
    // 4. Try updating to false using DB::statement with string 'false'
    echo "Updating via DB::statement with string 'false'...\n";
    \DB::statement("update users set is_premium = 'false' where id = ?", [$id]);
    $check = \DB::select('select is_premium from users where id = ?', [$id]);
    echo "DB value after DB::statement 'false': ";
    var_dump($check[0]->is_premium ?? null);
    
} catch (\Throwable $e) {
    echo "MAIN ERROR: " . $e->getMessage() . "\n";
}
