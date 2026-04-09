<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$email = 'khairking6@gmail.com';
$user = User::where('email', $email)->first();

if ($user) {
    $user->plan_type = 'quantum';
    $user->is_premium = true;
    $user->premium_until = now()->addYears(100);
    $user->save();
    echo "SUCCESS: User $email has been updated to Legendary (lifetime).\n";
} else {
    echo "ERROR: User $email not found in database.\n";
}
