<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $cloudinary = new \Cloudinary\Cloudinary(env('CLOUDINARY_URL'));
    // Attempt to download the file using Cloudinary Admin API
    $asset = $cloudinary->adminApi()->asset('academic_archives/GP0uPcP1lraNLWCaIorMN95qrBGu8MZGVRhngkNC', ['resource_type' => 'image']);
    echo "Asset details: \n";
    print_r($asset);
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}
