<?php
function checkJson($file)
{
    if (!file_exists($file))
        return "File not found: $file\n";
    $content = file_get_contents($file);
    json_decode($content);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return "Error in $file: " . json_last_error_msg() . " at offset " . json_last_error() . "\n";
    }
    return "$file is VALID JSON.\n";
}

echo checkJson('c:/Users/Axioo/dopmymind/lang/en.json');
echo checkJson('c:/Users/Axioo/dopmymind/lang/id.json');
foreach (glob('c:/Users/Axioo/dopmymind/lang/partials/en/*.json') as $file) {
    echo checkJson($file);
}
foreach (glob('c:/Users/Axioo/dopmymind/lang/partials/id/*.json') as $file) {
    echo checkJson($file);
}
