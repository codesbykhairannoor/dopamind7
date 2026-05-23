<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $id = 102;
    $user = \App\Models\User::find($id);
    if (!$user) {
        throw new \Exception("User $id not found");
    }

    echo "Initial state for User $id:\n";
    echo "  is_premium: " . var_export($user->is_premium, true) . "\n";
    echo "  plan_type: " . var_export($user->plan_type, true) . "\n";
    echo "  premium_until: " . var_export($user->premium_until, true) . "\n";

    // Clear cache to force check
    \Illuminate\Support\Facades\Cache::forget("trial_check_{$id}");

    // Set premium_until to yesterday to trigger expiry update
    echo "Setting premium_until to yesterday to trigger expiry logic...\n";
    $user->is_premium = true;
    $user->plan_type = 'quantum'; // premium plan
    $user->premium_until = now()->subDay();
    $user->save();

    echo "Simulating HandleInertiaRequests middleware share() call...\n";
    $request = \Illuminate\Http\Request::create('/dashboard', 'GET');
    $request->setUserResolver(fn() => $user);
    $session = new \Illuminate\Session\Store('test_session', new \Illuminate\Session\NullSessionHandler());
    $request->setLaravelSession($session);

    $middleware = new \App\Http\Middleware\HandleInertiaRequests();
    $sharedData = $middleware->share($request);

    // Refresh model state
    $user->refresh();
    echo "Resulting state for User $id:\n";
    echo "  is_premium: " . var_export($user->is_premium, true) . "\n";
    echo "  plan_type: " . var_export($user->plan_type, true) . "\n";
    echo "  premium_until: " . var_export($user->premium_until, true) . "\n";
    
    echo "SUCCESS!\n";
} catch (\Throwable $e) {
    echo "FAILED: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}
