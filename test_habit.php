<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$habits = \App\Models\Habit::where('user_id', 1)->get()->toArray();
$logs = \App\Models\HabitLog::all()->toArray();

file_put_contents('habit_debug.json', json_encode([
    'habits' => $habits,
    'logs' => $logs
], JSON_PRETTY_PRINT));
echo "DONE";
