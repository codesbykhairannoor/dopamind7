<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $user = \App\Models\User::latest('id')->first();
    $user->update([
        'has_used_trial' => true,
    ]);
    echo "User updated successfully: " . $user->has_used_trial . "\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
