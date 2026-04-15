<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$conn = \Illuminate\Support\Facades\DB::connection();
echo "Driver: " . $conn->getDriverName() . "\n";
echo "Grammar: " . get_class($conn->getQueryGrammar()) . "\n";
