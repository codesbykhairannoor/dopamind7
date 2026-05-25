<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $cloudinary = new \Cloudinary\Cloudinary(env('CLOUDINARY_URL'));
    $url = $cloudinary->image('academic_archives/EZX0jYEPAKwHnyYKUKkoihxrBnD1kO0dl5VdELBY.pdf')->signUrl();
    echo "URL: " . $url . "\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}
