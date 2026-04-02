<?php
$enRoot = json_decode(file_get_contents('c:/Users/Axioo/dopmymind/lang/en.json'), true);
$partialsPath = 'c:/Users/Axioo/dopmymind/lang/partials/en/';
$files = glob($partialsPath . '*.json');

$missingInRoot = [];
foreach ($files as $file) {
    $partial = json_decode(file_get_contents($file), true);
    foreach ($partial as $key => $value) {
        if (!isset($enRoot[$key])) {
            $missingInRoot[$file][] = $key;
        }
    }
}

foreach ($missingInRoot as $file => $keys) {
    echo "In " . basename($file) . " but missing in en.json (" . count($keys) . "):\n";
    // print_r($keys); // Commented out to avoid huge output, just print the first few
    echo implode(", ", array_slice($keys, 0, 10)) . "...\n\n";
}
