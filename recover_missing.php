<?php
/**
 * System-Wide Translation Recovery
 * Replaces [TODO: key] with sensible defaults for main sections.
 */

$root = 'c:/Users/Axioo/dopmymind';
$files = [
    $root . '/lang/partials/en/missing_auto.json',
    $root . '/lang/partials/id/missing_auto.json'
];

foreach ($files as $filePath) {
    if (!file_exists($filePath))
        continue;
    $isId = strpos($filePath, '/id/') !== false;
    $data = json_decode(file_get_contents($filePath), true);

    foreach ($data as $key => $value) {
        if (strpos($value, '[TODO:') === false)
            continue;

        // Smart Guessing Logic
        $clean = str_replace(['solve_', 'meta_', 'hero_', 'desc', 'title', '_'], ' ', $key);
        $clean = trim(ucwords($clean));

        if ($isId) {
            // Basic ID mapping for common terms
            $val = $clean;
            if (strpos($key, 'title') !== false)
                $val = "Judul " . $clean;
            if (strpos($key, 'desc') !== false)
                $val = "Deskripsi " . $clean;
            if (strpos($key, 'badge') !== false)
                $val = "Badge " . $clean;
            if (strpos($key, 'cta') !== false)
                $val = "Tombol " . $clean;
            $data[$key] = "[ID] " . $val;
        } else {
            $data[$key] = "[EN] " . $clean;
        }
    }

    file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));
}

echo "✅ Recovered missing keys with labeled placeholders.\n";
