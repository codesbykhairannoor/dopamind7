<?php
$en = json_decode(file_get_contents('c:/Users/Axioo/dopmymind/lang/en.json'), true);
$id = json_decode(file_get_contents('c:/Users/Axioo/dopmymind/lang/id.json'), true);

$enKeys = array_keys($en);
$idKeys = array_keys($id);

$onlyEn = array_diff($enKeys, $idKeys);
$onlyId = array_diff($idKeys, $enKeys);

echo "Keys in EN but not in ID (" . count($onlyEn) . "):\n";
print_r($onlyEn);

echo "\nKeys in ID but not in EN (" . count($onlyId) . "):\n";
print_r($onlyId);
