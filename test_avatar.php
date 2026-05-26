<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
echo "URL: " . \Illuminate\Support\Facades\Storage::disk('cloudinary')->url('test.txt') . "\n";
