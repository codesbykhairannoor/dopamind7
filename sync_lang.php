<?php
/**
 * OneForMind Translation Synchronization Script
 * 
 * This script merges all JSON files from lang/partials/{locale}/*.json
 * into the main lang/{locale}.json files.
 */

$baseDir = __DIR__ . '/lang';
$locales = ['en', 'id'];

foreach ($locales as $locale) {
    $partialDir = $baseDir . '/partials/' . $locale;
    $targetFile = $baseDir . '/' . $locale . '.json';

    echo "Processing locale: " . strtoupper($locale) . "\n";

    if (!is_dir($partialDir)) {
        echo "Warn: Partial directory not found: $partialDir\n";
        continue;
    }

    $merged = [];
    $files = glob($partialDir . '/*.json');

    if (empty($files)) {
        echo "Warn: No JSON files found in $partialDir\n";
        continue;
    }

    foreach ($files as $file) {
        $filename = basename($file);
        $content = file_get_contents($file);
        $data = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "Error parsing $filename: " . json_last_error_msg() . "\n";
            continue;
        }

        if (is_array($data)) {
            $beforeCount = count($merged);
            $merged = array_merge($merged, $data);
            $afterCount = count($merged);
            echo "  - Merged $filename (" . count($data) . " keys)\n";
        }
        else {
            echo "  - Skipped $filename (Not an object/array)\n";
        }
    }

    // Sort keys alphabetically for clean diffs
    ksort($merged);

    $jsonOutput = json_encode($merged, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    if (file_put_contents($targetFile, $jsonOutput)) {
        echo "Done: $targetFile updated with " . count($merged) . " total keys.\n\n";
    }
    else {
        echo "Fail: Could not write to $targetFile\n\n";
    }
}

echo "All sync operations completed.\n";
