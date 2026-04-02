<?php
$idRoot = json_decode(file_get_contents('c:/Users/Axioo/dopmymind/lang/id.json'), true);
$enRoot = json_decode(file_get_contents('c:/Users/Axioo/dopmymind/lang/en.json'), true);

$jsDir = 'c:/Users/Axioo/dopmymind/resources/js';
$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($jsDir));
$missingInBoth = [];

foreach ($iterator as $file) {
    if ($file->isFile() && ($file->getExtension() === 'vue' || $file->getExtension() === 'js')) {
        $content = file_get_contents($file->getPathname());
        preg_match_all('/(trans|\$t)\([\'"]([^\'"]+)[\'"]\)/', $content, $matches);
        if (!empty($matches[2])) {
            foreach ($matches[2] as $key) {
                if (str_starts_with($key, '$') || str_contains($key, '${'))
                    continue;
                if (!isset($idRoot[$key]) && !isset($enRoot[$key])) {
                    $missingInBoth[$key][] = basename($file->getPathname());
                }
            }
        }
    }
}

ksort($missingInBoth);
foreach ($missingInBoth as $key => $files) {
    echo "$key|" . implode(',', array_unique($files)) . "\n";
}
