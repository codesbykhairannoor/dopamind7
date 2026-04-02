<?php
$enPath = 'c:/Users/Axioo/dopmymind/lang/en.json';
$idPath = 'c:/Users/Axioo/dopmymind/lang/id.json';

echo "Checking $enPath\n";
$enContent = file_get_contents($enPath);
json_decode($enContent);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo "ERROR EN: " . json_last_error_msg() . "\n";
} else {
    echo "EN is VALID\n";
}

echo "Checking $idPath\n";
$idContent = file_get_contents($idPath);
json_decode($idContent);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo "ERROR ID: " . json_last_error_msg() . "\n";
} else {
    echo "ID is VALID\n";
}
