<?php
$id_path = 'c:/Users/Axioo/dopmymind/lang/id.json';
$en_path = 'c:/Users/Axioo/dopmymind/lang/en.json';

$new_keys_id = [
    "help_status_all_ok" => "Seluruh Sistem Berjalan Normal",
    "help_video_title" => "Tutorial Video",
    "help_video_desc" => "Pelajari cara kerja sistem secara visual.",
    "help_v1_title" => "Panduan Pengaturan Awal",
    "help_v2_title" => "Mastering Habit Tracker",
    "help_v3_title" => "Manajemen Keuangan Pro",

    "help_guide_module_title" => "Panduan Per Modul",
    "help_guide_module_desc" => "Pilih fitur yang ingin kamu pelajari lebih dalam.",

    "help_popular_title" => "Artikel Populer",
    "help_popular_q1" => "Cara mengimpor data finansial?",
    "help_popular_q2" => "Menambahkan widget ke Home Screen.",
    "help_popular_q3" => "Tips membangun habit yang bertahan lama.",
    "help_popular_q4" => "Integrasi Kalender Google.",

    "help_community_badge" => "Forum & Komunitas",
    "help_community_title" => "Belajar Bersama User Lain",
    "help_community_desc" => "Bergabunglah dengan ribuan pengguna OneForMind di Discord untuk berbagi tips, template, dan inspirasi harian."
];

$new_keys_en = [
    "help_status_all_ok" => "All Systems Operational",
    "help_video_title" => "Video Tutorials",
    "help_video_desc" => "Learn how the system works visually.",
    "help_v1_title" => "Initial Setup Guide",
    "help_v2_title" => "Mastering Habit Tracker",
    "help_v3_title" => "Pro Finance Management",

    "help_guide_module_title" => "Guides by Module",
    "help_guide_module_desc" => "Choose the feature you want to learn more about.",

    "help_popular_title" => "Popular Articles",
    "help_popular_q1" => "How to import financial data?",
    "help_popular_q2" => "Adding widgets to Home Screen.",
    "help_popular_q3" => "Tips for building long-lasting habits.",
    "help_popular_q4" => "Google Calendar integration.",

    "help_community_badge" => "Forum & Community",
    "help_community_title" => "Learn with Other Users",
    "help_community_desc" => "Join thousands of OneForMind users on Discord to share tips, templates, and daily inspiration."
];

function updateJson($path, $newKeys)
{
    if (!file_exists($path))
        return;
    $content = file_get_contents($path);
    $json = json_decode($content, true);
    if (!$json)
        return;
    foreach ($newKeys as $k => $v)
        $json[$k] = $v;
    file_put_contents($path, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

updateJson($id_path, $new_keys_id);
updateJson($en_path, $new_keys_en);
echo "DONE_ALL_KEYS";
