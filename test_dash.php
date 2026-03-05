<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$dashSvc = new \App\Services\DashboardService();
$calSvc = new \App\Services\CalendarService();

$userId = 1;
$timezone = 'Asia/Jakarta';

$dash = $dashSvc->getTodaySynergy($userId, $timezone);
$cal = $calSvc->getMonthlyDashboardData($userId, '2026-03', $timezone);

$output = [
    'dashboard_todayStr' => now()->timezone($timezone)->format('Y-m-d'),
    'dashboard_habits' => $dash['habits'],
    'calendar_habits_array' => $cal['habits']
];

file_put_contents('habit_compare.json', json_encode($output, JSON_PRETTY_PRINT));
echo "DONE";
