<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$logs = \App\Models\HabitLog::orderBy('id', 'desc')->take(5)->get()->toArray();
file_put_contents('recent_logs.json', json_encode($logs, JSON_PRETTY_PRINT));
echo "DONE";
