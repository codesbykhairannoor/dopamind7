<?php

$files = [
    'c:/Users/Axioo/dopmymind/lang/en.json',
    'c:/Users/Axioo/dopmymind/lang/id.json'
];

foreach ($files as $file) {
    if (!file_exists($file)) continue;
    
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    
    $replacement = (str_contains($file, 'en.json')) ? 'and' : 'dan';
    $changed = false;

    foreach ($data as $key => $value) {
        if (!is_string($value)) continue;
        
        // Target specifically keys that often end up in browser tab titles
        if (str_contains($key, 'meta_title') || 
            str_contains($key, 'meta_og_title') || 
            str_contains($key, 'welcome_meta_') ||
            str_contains($key, 'solution_') ||
            str_contains($key, 'pricing_') ||
            $key === 'Manifesto & Filosofi' // Specific matches
        ) {
            if (str_contains($value, '&')) {
                // Replace all variants of ampersands
                $newValue = str_replace(' & ', " $replacement ", $value);
                $newValue = str_replace('&amp;', "$replacement", $newValue); // Just in case
                $newValue = str_replace('&', "$replacement", $newValue);
                
                if ($newValue !== $value) {
                    $data[$key] = $newValue;
                    $changed = true;
                }
            }
        }
    }
    
    if ($changed) {
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo "✅ Robustly fixed ampersands in " . basename($file) . "\n";
    }
}
