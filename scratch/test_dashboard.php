<?php
try {
    $user = \App\Models\User::first();
    if (!$user) {
        echo "No user found!\n";
    } else {
        echo "Logging in User ID: {$user->id}\n";
        \Illuminate\Support\Facades\Auth::login($user);
        
        echo "Testing Inertia::render('Dashboard') resolved via App container...\n";
        $controller = app(\App\Http\Controllers\DashboardController::class);
        
        $request = \Illuminate\Http\Request::create('/dashboard', 'GET');
        $request->setUserResolver(fn() => $user);
        
        $response = $controller($request);
        echo "Inertia::render succeeded!\n";
        print_r($response);
    }
} catch (\Throwable $e) {
    echo "ERROR OCCURRED: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}
