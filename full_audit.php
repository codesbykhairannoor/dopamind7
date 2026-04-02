<?php

/**
 * Massive Translation Audit Script
 * Scans all source files and identifies every key that is used but missing from en.json.
 */

$root = 'c:/Users/Axioo/dopmymind';
$enPath = $root . '/lang/en.json';
$idPath = $root . '/lang/id.json';

if (!file_exists($enPath))
    die("Main en.json not found!");
$enKeys = json_decode(file_get_contents($enPath), true);
$idKeys = json_decode(file_get_contents($idPath), true);

$searchDirs = [
    $root . '/resources/js',
    $root . '/resources/views',
    $root . '/app'
];

$usedKeys = [];
$missing = [];

foreach ($searchDirs as $dir) {
    if (!is_dir($dir))
        continue;

    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach ($iterator as $file) {
        if ($file->isDir())
            continue;

        $ext = $file->getExtension();
        if (!in_array($ext, ['php', 'vue', 'js']))
            continue;

        $content = file_get_contents($file->getPathname());
        $relativePath = str_replace($root, '', $file->getPathname());

        // Regex for various translation patterns:
        // 1. $t('key') or $t("key")
        // 2. __('key') or __("key")
        // 3. @lang('key')
        // 4. trans('key')
        $patterns = [
            '/\$t\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/',
            '/__\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/',
            '/@lang\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/',
            '/trans\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/'
        ];

        foreach ($patterns as $pattern) {
            if (preg_match_all($pattern, $content, $matches)) {
                foreach ($matches[1] as $key) {
                    // Ignore dynamic keys with template literals or variables
                    if (strpos($key, '$') !== false)
                        continue;

                    $usedKeys[$key][] = $relativePath;
                }
            }
        }
    }
}

ksort($usedKeys);

echo "AUDIT RESULTS:\n";
echo "====================================\n";
foreach ($usedKeys as $key => $files) {
    $inEn = isset($enKeys[$key]);
    $inId = isset($idKeys[$key]);

    if (!$inEn || !$inId) {
        $status = "";
        if (!$inEn && !$inId)
            $status = "[MISSING IN BOTH]";
        elseif (!$inEn)
            $status = "[MISSING IN EN]";
        else
            $status = "[MISSING IN ID]";

        echo sprintf("%-40s %-20s (Files: %s)\n", $key, $status, implode(', ', array_unique($files)));
        $missing[] = $key;
    }
}

echo "====================================\n";
echo "TOTAL UNIQUE KEYS USED: " . count($usedKeys) . "\n";
echo "TOTAL MISSING KEYS: " . count($missing) . "\n";
