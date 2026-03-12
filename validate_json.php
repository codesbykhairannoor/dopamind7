<?php
$locales = ['en', 'id'];
foreach ($locales as $locale) {
    $dir = __DIR__ . "/lang/partials/$locale";
    echo "Checking $locale...\n";
    $files = glob("$dir/*.json");
    foreach ($files as $file) {
        $content = file_get_contents($file);
        $data = json_decode($content, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "ERROR: " . basename($file) . " - " . json_last_error_msg() . "\n";
            // Show some context around error if possible
        } else {
            echo "OK: " . basename($file) . " (" . count($data) . " keys)\n";
        }
    }
}
