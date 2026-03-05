<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::find(1);
echo "User ID: {$user->id}\n";
echo "Timezone: {$user->timezone}\n";
echo "app.timezone: " . config('app.timezone') . "\n";
echo "now(Asia/Jakarta): " . now()->timezone('Asia/Jakarta')->format('Y-m-d H:i:s') . "\n";
echo "now(user_timezone): " . now()->timezone($user->timezone ?? 'Asia/Jakarta')->format('Y-m-d H:i:s') . "\n";
