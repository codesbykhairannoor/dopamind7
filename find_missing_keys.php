<?php
$idRoot = json_decode(file_get_contents('c:/Users/Axioo/dopmymind/lang/id.json'), true);
$enRoot = json_decode(file_get_contents('c:/Users/Axioo/dopmymind/lang/en.json'), true);

$jsDir = 'c:/Users/Axioo/dopmymind/resources/js';
$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($jsDir));
$missingKeys = [];

foreach ($iterator as $file) {
    if ($file->isFile() && $file->getExtension() === 'vue' || $file->getExtension() === 'js') {
        $content = file_get_contents($file->getPathname());
        // Match trans('key') or $t('key') or trans("key")
        preg_match_all('/(trans|\$t)\([\'"]([^\'"]+)[\'"]\)/', $content, $matches);
        if (!empty($matches[2])) {
            foreach ($matches[2] as $key) {
                if (!isset($idRoot[$key]) && !str_starts_with($key, '$') && !str_contains($key, '${')) {
                    $missingKeys[$key][] = basename($file->getPathname());
                }
            }
        }
    }
}

ksort($missingKeys);
echo "Total Missing Keys in id.json: " . count($missingKeys) . "\n";
foreach ($missingKeys as $key => $files) {
    echo "$key (in " . implode(', ', array_unique($files)) . ")\n";
}
