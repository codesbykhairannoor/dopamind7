<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$user = User::where('email', 'oneformindapp@gmail.com')->first();
if ($user) {
    echo "Current Prefs: " . json_encode($user->notification_preferences) . "\n";
    
    $newPrefs = [
        'habit' => ['enabled' => false, 'time' => '07:00'],
        'planner' => ['enabled' => false, 'time' => '08:00'],
        'journal' => ['enabled' => false, 'time' => '20:00'],
        'finance' => ['enabled' => true, 'time' => '09:00'],
    ];
    
    $user->update(['notification_preferences' => $newPrefs]);
    $user->save();
    
    $user->refresh();
    echo "Updated Prefs: " . json_encode($user->notification_preferences) . "\n";
} else {
    echo "User not found\n";
}
