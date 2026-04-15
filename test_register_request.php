<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$request = \Illuminate\Http\Request::create("/register", "POST", [
    "name" => "Test Post User",
    "email" => "test_post_register@example.com",
    "password" => "password",
    "password_confirmation" => "password"
]);

$response = $app->handle($request);
echo "Status Code: " . $response->getStatusCode() . "\n";
echo "Content: " . substr($response->getContent(), 0, 500) . "\n";
