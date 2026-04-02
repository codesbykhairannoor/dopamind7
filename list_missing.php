<?php
$root = 'c:/Users/Axioo/dopmymind';
$enKeys = json_decode(file_get_contents($root . '/lang/en.json'), true);
$idKeys = json_decode(file_get_contents($root . '/lang/id.json'), true);

$searchDirs = [$root . '/resources/js', $root . '/resources/views', $root . '/app'];
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
        $patterns = ['/\$t\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/', '/__\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/', '/@lang\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/', '/trans\([\'"]([a-zA-Z0-9_\.]+)[\'"]\)/'];
        foreach ($patterns as $pattern) {
            if (preg_match_all($pattern, $content, $matches)) {
                foreach ($matches[1] as $key) {
                    if (strpos($key, '$') !== false)
                        continue;
                    if (!isset($enKeys[$key]) || !isset($idKeys[$key])) {
                        $missing[$key][] = str_replace($root, '', $file->getPathname());
                    }
                }
            }
        }
    }
}

ksort($missing);
foreach ($missing as $key => $files) {
    echo "$key|" . implode(',', array_unique($files)) . "\n";
}
echo "TOTAL_MISSING:" . count($missing) . "\n";
