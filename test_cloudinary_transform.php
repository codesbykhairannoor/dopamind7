<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $cloudinary = new \Cloudinary\Cloudinary(env('CLOUDINARY_URL'));
    $image = $cloudinary->image('test')->extension('pdf');
    $image->addTransformation(\Cloudinary\Transformation\Delivery::attachment('test'));
    echo "Success: " . $image->toUrl();
} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage();
}
