<?php
$id_path = 'c:/Users/Axioo/dopmymind/lang/id.json';
$en_path = 'c:/Users/Axioo/dopmymind/lang/en.json';

function updateJson($path, $newKeys)
{
    if (!file_exists($path))
        return;
    $json = json_decode(file_get_contents($path), true);
    if (!$json)
        $json = [];
    foreach ($newKeys as $k => $v)
        $json[$k] = $v;
    file_put_contents($path, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

updateJson($id_path, [
    "nav_help_title" => "Pusat Bantuan",
    "nav_help_desc" => "Cari solusi & FAQ."
]);

updateJson($en_path, [
    "nav_help_title" => "Help Center",
    "nav_help_desc" => "Find solutions & FAQ."
]);

echo "DONE";
