try {
    echo "Forcing cache driver to 'file'...\n";
    config(['cache.default' => 'file']);
    
    // Set file cache path to /tmp/cache/data (or a local temp dir if we want to simulate)
    // On local Windows, we can use the default or a temp path.
    // Let's verify what config says:
    echo "Current file cache path: " . config('cache.stores.file.path') . "\n";
    
    echo "Testing Cache::remember with file driver...\n";
    $val = \Illuminate\Support\Facades\Cache::remember("test_file_key", 10, fn() => "Hello File Cache!");
    echo "Value: {$val}\n";
    echo "Cache::remember with file driver succeeded!\n";
} catch (\Throwable $e) {
    echo "ERROR OCCURRED: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}
