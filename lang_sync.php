<?php

/**
 * Translation Sync Script for OneForMind
 * This script merges modular translation files from lang/partials/{lang}/*.json
 * into the main lang/{lang}.json files.
 */

$langs = ['en', 'id', 'zh'];

foreach ($langs as $lang) {
    $partialsPath = "lang/partials/{$lang}/";
    $rootPath = "lang/{$lang}.json";

    if (!is_dir($partialsPath)) {
        echo "No partials found for language: {$lang}\n";
        continue;
    }

    $mergedData = [];
    $files = glob($partialsPath . "*.json");

    foreach ($files as $file) {
        $content = file_get_contents($file);
        $data = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "Error parsing JSON in {$file}: " . json_last_error_msg() . "\n";
            continue;
        }

        if (is_array($data)) {
            $mergedData = array_merge($mergedData, $data);
        }
    }

    // Sort alphabetically by key
    ksort($mergedData);

    // Save back to root
    $result = file_put_contents(
        $rootPath,
        json_encode($mergedData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
    );

    if ($result !== false) {
        echo "Successfully synced {$lang}.json from " . count($files) . " partials (" . count($mergedData) . " keys total).\n";
    } else {
        echo "Failed to write to {$rootPath}\n";
    }
}
