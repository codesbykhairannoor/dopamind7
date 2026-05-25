<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $cloudinary = app('cloudinary');
    echo get_class($cloudinary) . "\n";
    // try to sign a URL
    $url = $cloudinary->url('academic_archives/EZX0jYEPAKwHnyYKUKkoihxrBnD1kO0dl5VdELBY.pdf');
    echo "URL: " . $url . "\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}
