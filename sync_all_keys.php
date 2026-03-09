<?php
$id_path = 'c:/Users/Axioo/dopmymind/lang/id.json';
$en_path = 'c:/Users/Axioo/dopmymind/lang/en.json';

$all_keys_id = [
    // Help Center Keys
    "help_status_all_ok" => "Seluruh Sistem Berjalan Normal",
    "help_popular_title" => "Artikel Populer",
    "help_popular_q1" => "Cara mengimpor data finansial?",
    "help_popular_q2" => "Menambahkan widget ke Home Screen.",
    "help_popular_q3" => "Tips membangun habit yang bertahan lama.",
    "help_popular_q4" => "Integrasi Kalender Google.",
    "help_popular_q5" => "Mengelola kolaborasi tim.",
    "help_popular_q6" => "Backup data secara manual.",
    "help_cat_1_title" => "Memulai Cepat",
    "help_cat_2_title" => "Keamanan & Akun",
    "help_cat_3_title" => "Panduan Modul",
    "help_cat_4_title" => "Billing & Pro",

    // Community Page Keys
    "comm_meta_title" => "Komunitas OneForMind",
    "comm_meta_desc" => "Bergabunglah dengan ribuan pengguna OneForMind untuk berbagi inspirasi dan sistem produktivitas.",
    "comm_hero_badge" => "Ekosistem OneForMind",
    "comm_hero_title" => "Tumbuh Bersama di<br><span class='text-indigo-600'>Satu Komunitas</span>",
    "comm_hero_desc" => "Temukan teman perjalanan, bagikan setup workspace-mu, dan dapatkan inspirasi harian dari pengguna di seluruh dunia.",
    "comm_discord_title" => "Discord Server",
    "comm_discord_desc" => "Tempat diskusi real-time, berbagi template, dan update fitur tercepat.",
    "comm_tg_title" => "Telegram Channel",
    "comm_tg_desc" => "Update harian, tips singkat, dan pengumuman penting.",
    "comm_guidelines_title" => "Aturan Komunitas",
    "comm_guide_1" => "Saling Menghormati",
    "comm_guide_2" => "Tanpa Spam",
    "comm_guide_3" => "Bantu Sesama Pengguna",
    "comm_events_title" => "Event Mendatang",
    "comm_event_1" => "Webinar: Setup Second Brain",
    "comm_event_2" => "Showcase: My Life OS 2026",
    "comm_cta_title" => "Siap Bergabung?",
    "comm_nav_title" => "Komunitas"
];

$all_keys_en = [
    // Help Center Keys
    "help_status_all_ok" => "All Systems Operational",
    "help_popular_title" => "Popular Articles",
    "help_popular_q1" => "How to import financial data?",
    "help_popular_q2" => "Adding widgets to Home Screen.",
    "help_popular_q3" => "Tips for building long-lasting habits.",
    "help_popular_q4" => "Google Calendar integration.",
    "help_popular_q5" => "Managing team collaboration.",
    "help_popular_q6" => "Manual data backup.",
    "help_cat_1_title" => "Quick Start",
    "help_cat_2_title" => "Security & Account",
    "help_cat_3_title" => "Module Guides",
    "help_cat_4_title" => "Billing & Pro",

    // Community Page Keys
    "comm_meta_title" => "OneForMind Community",
    "comm_meta_desc" => "Join thousands of OneForMind users to share inspiration and productivity systems.",
    "comm_hero_badge" => "OneForMind Ecosystem",
    "comm_hero_title" => "Grow Together in<br><span class='text-indigo-600'>One Community</span>",
    "comm_hero_desc" => "Find journey partners, share your workspace setup, and get daily inspiration from users around the world.",
    "comm_discord_title" => "Discord Server",
    "comm_discord_desc" => "Real-time discussions, template sharing, and fastest feature updates.",
    "comm_tg_title" => "Telegram Channel",
    "comm_tg_desc" => "Daily updates, quick tips, and important announcements.",
    "comm_guidelines_title" => "Community Guidelines",
    "comm_guide_1" => "Mutual Respect",
    "comm_guide_2" => "No Spamming",
    "comm_guide_3" => "Help Other Users",
    "comm_events_title" => "Upcoming Events",
    "comm_event_1" => "Webinar: Second Brain Setup",
    "comm_event_2" => "Showcase: My Life OS 2026",
    "comm_cta_title" => "Ready to Join?",
    "comm_nav_title" => "Community"
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

updateJson($id_path, $all_keys_id);
updateJson($en_path, $all_keys_en);
echo "SYNC_COMPLETE\n";
