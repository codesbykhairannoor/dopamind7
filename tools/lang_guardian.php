<?php

/**
 * Translation Guardian Script
 * This script identifies translation keys used in the code but missing from JSON.
 * It also optionally creates placeholders to prevent raw IDs from showing in UI.
 */

$root = 'c:/Users/Axioo/dopmymind';
$enPath = $root . '/lang/en.json';
$partialsDir = $root . '/lang/partials';

if (!file_exists($enPath))
    die("Error: en.json not found. Run sync first.\n");
$enKeys = json_decode(file_get_contents($enPath), true);

$searchDirs = [
    $root . '/resources/js',
    $root . '/resources/views',
];

$foundMissing = [];

foreach ($searchDirs as $dir) {
    if (!is_dir($dir))
        continue;

    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach ($iterator as $file) {
        if ($file->isDir())
            continue;
        if (!in_array($file->getExtension(), ['php', 'vue', 'js']))
            continue;

        $content = file_get_contents($file->getPathname());

        // Match $t('key'), __('key'), trans('key'), @lang('key')
        $patterns = [
            '/\$t\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/',
            '/__\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/',
            '/@lang\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/',
            '/trans\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/'
        ];

        foreach ($patterns as $pattern) {
            if (preg_match_all($pattern, $content, $matches)) {
                foreach ($matches[1] as $key) {
                    if (strpos($key, '$') !== false)
                        continue;
                    if (!isset($enKeys[$key])) {
                        $foundMissing[$key] = true;
                    }
                }
            }
        }
    }
}

if (empty($foundMissing)) {
    echo "✅ SUCCESS: All " . count($enKeys) . " keys are synced and valid!\n";
    exit(0);
}

echo "⚠️ WARNING: Found " . count($foundMissing) . " keys used in code but missing from JSON files!\n";
echo "----------------------------------------------------------------------------------\n";

$missingLangFile = $partialsDir . '/en/missing_auto.json';
$missingIdFile = $partialsDir . '/id/missing_auto.json';

$existingEnMissing = file_exists($missingLangFile) ? json_decode(file_get_contents($missingLangFile), true) : [];
$existingIdMissing = file_exists($missingIdFile) ? json_decode(file_get_contents($missingIdFile), true) : [];

$newCount = 0;
foreach (array_keys($foundMissing) as $key) {
    if (!isset($existingEnMissing[$key])) {
        echo "   [+] New missing key found: $key\n";
        $existingEnMissing[$key] = "[TODO: $key]";
        $existingIdMissing[$key] = "[TODO: $key]";
        $newCount++;
    }
}

if ($newCount > 0) {
    ksort($existingEnMissing);
    ksort($existingIdMissing);

    file_put_contents($missingLangFile, json_encode($existingEnMissing, JSON_PRETTY_PRINT));
    file_put_contents($missingIdFile, json_encode($existingIdMissing, JSON_PRETTY_PRINT));

    echo "----------------------------------------------------------------------------------\n";
    echo "💡 ACTION: Created placeholders in 'lang/partials/en/missing_auto.json'\n";
    echo "   Please update them with real translations and they will be synced automatically.\n";
} else {
    echo "   (Wait, those keys are already in missing_auto.json - you just need to fill them!)\n";
}

exit(1);
