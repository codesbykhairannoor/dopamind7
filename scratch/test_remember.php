try {
    $user = \App\Models\User::first();
    if (!$user) {
        echo "No user found!\n";
    } else {
        echo "Testing Auth::login(\$user, true) with database write...\n";
        \Illuminate\Support\Facades\Auth::login($user, true);
        echo "Login and remember token save succeeded! Remember token: {$user->getRememberToken()}\n";
    }
} catch (\Throwable $e) {
    echo "ERROR OCCURRED: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}
