<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

$tableName = 'journals';
if (!Schema::hasTable($tableName)) {
    echo "Table $tableName does not exist.\n";
    exit;
}

$indexes = DB::select("SHOW INDEX FROM journals");
foreach ($indexes as $index) {
    echo $index->Key_name . "\n";
}
