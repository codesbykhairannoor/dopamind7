<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
try {
    $res = \Illuminate\Support\Facades\Storage::disk('cloudinary')->put('test.txt', 'hello');
    echo 'Success: ' . $res;
} catch (\Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
