<?php
$idRoot = json_decode(file_get_contents('c:/Users/Axioo/dopmymind/lang/id.json'), true);
$enRoot = json_decode(file_get_contents('c:/Users/Axioo/dopmymind/lang/en.json'), true);

$jsDir = 'c:/Users/Axioo/dopmymind/resources/js';
$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($jsDir));
$missingInId = [];
$missingInEn = [];
$missingInBoth = [];

foreach ($iterator as $file) {
    if ($file->isFile() && ($file->getExtension() === 'vue' || $file->getExtension() === 'js')) {
        $content = file_get_contents($file->getPathname());
        preg_match_all('/(trans|\$t)\([\'"]([^\'"]+)[\'"]\)/', $content, $matches);
        if (!empty($matches[2])) {
            foreach ($matches[2] as $key) {
                if (str_starts_with($key, '$') || str_contains($key, '${'))
                    continue;

                $inId = isset($idRoot[$key]);
                $inEn = isset($enRoot[$key]);

                if (!$inId && !$inEn) {
                    $missingInBoth[$key][] = basename($file->getPathname());
                } elseif (!$inId) {
                    $missingInId[$key][] = basename($file->getPathname());
                } elseif (!$inEn) {
                    $missingInEn[$key][] = basename($file->getPathname());
                }
            }
        }
    }
}

echo "TOTAL MISSING IN BOTH: " . count($missingInBoth) . "\n";
echo "TOTAL MISSING IN ID: " . count($missingInId) . "\n";
echo "TOTAL MISSING IN EN: " . count($missingInEn) . "\n";

echo "\n--- MISSING IN BOTH ---\n";
ksort($missingInBoth);
foreach (array_slice($missingInBoth, 0, 20) as $key => $files) {
    echo "$key (in " . implode(', ', array_unique($files)) . ")\n";
}
