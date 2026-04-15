<?php

declare(strict_types=1);

function readJson(string $path): array
{
    $raw = @file_get_contents($path);
    if ($raw === false) {
        return [];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function collectFiles(string $pattern): array
{
    $files = glob($pattern, GLOB_BRACE);
    return is_array($files) ? $files : [];
}

$en = readJson(__DIR__ . '/../lang/en.json');
$id = readJson(__DIR__ . '/../lang/id.json');

$files = array_merge(
    collectFiles(__DIR__ . '/../resources/views/**/*.blade.php'),
    collectFiles(__DIR__ . '/../resources/js/**/*.vue'),
);

$keys = [];

$bladeKeyPattern = "/__\\(\\s*[\"']([^\"']+)[\"']\\s*\\)/";
$vueKeyPattern = "/\\$t\\(\\s*[\"']([^\"']+)[\"']/";

foreach ($files as $file) {
    $contents = @file_get_contents($file);
    if ($contents === false) {
        continue;
    }

    if (str_ends_with($file, '.blade.php')) {
        if (preg_match_all($bladeKeyPattern, $contents, $m)) {
            foreach ($m[1] as $k) {
                $keys[$k] = true;
            }
        }
        if (preg_match_all($vueKeyPattern, $contents, $m2)) {
            foreach ($m2[1] as $k) {
                $keys[$k] = true;
            }
        }
    } else {
        if (preg_match_all($vueKeyPattern, $contents, $m3)) {
            foreach ($m3[1] as $k) {
                $keys[$k] = true;
            }
        }
    }
}

$missingEn = [];
$missingId = [];

foreach (array_keys($keys) as $k) {
    if (!array_key_exists($k, $en)) {
        $missingEn[] = $k;
    }
    if (!array_key_exists($k, $id)) {
        $missingId[] = $k;
    }
}

sort($missingEn);
sort($missingId);

echo "missing_en=" . count($missingEn) . PHP_EOL;
foreach (array_slice($missingEn, 0, 200) as $k) {
    echo $k . PHP_EOL;
}
echo "---" . PHP_EOL;
echo "missing_id=" . count($missingId) . PHP_EOL;
foreach (array_slice($missingId, 0, 200) as $k) {
    echo $k . PHP_EOL;
}

