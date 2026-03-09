<?php
$id_path = 'c:/Users/Axioo/dopmymind/lang/id.json';
$en_path = 'c:/Users/Axioo/dopmymind/lang/en.json';

$help_keys_id = [
    "help_meta_title" => "Pusat Bantuan OneForMind",
    "help_meta_desc" => "Cari jawaban, panduan, dan solusi untuk memaksimalkan penggunaan OneForMind Life OS-mu.",
    "help_hero_badge" => "Dukungan OneForMind",
    "help_hero_title_1" => "Ada yang Bisa Kami",
    "help_hero_title_2" => "Bantu Hari Ini?",
    "help_hero_desc" => "Cari di dokumentasi kami atau telusuri kategori di bawah untuk menemukan apa yang kamu butuhkan.",
    "help_search_placeholder" => "Cari pertanyaan atau kata kunci...",

    "help_cat_1_title" => "Memulai",
    "help_cat_1_desc" => "Pelajari dasar-dasar OneForMind dan cara setup workspace pertamamu.",
    "help_cat_2_title" => "Akun & Keamanan",
    "help_cat_2_desc" => "Kelola profil, password, dan pengaturan privasi datamu.",
    "help_cat_3_title" => "Panduan Fitur",
    "help_cat_3_desc" => "Tutorial mendalam untuk Habit, Finance, Planner, dan lainnya.",
    "help_cat_4_title" => "Pembayaran & Billing",
    "help_cat_4_desc" => "Info langganan, invoice, dan metode pembayaran.",

    "help_faq_title" => "Pertanyaan Umum",
    "help_faq_q1" => "Apakah dataku aman di OneForMind?",
    "help_faq_a1" => "Ya, kami menggunakan enkripsi standar industri dan tidak akan pernah menjual datamu ke pihak ketiga.",
    "help_faq_q2" => "Bagaimana cara sinkronisasi antar perangkat?",
    "help_faq_a2" => "OneForMind berbasis cloud secara native. Cukup login dengan akun yang sama di perangkat manapun.",
    "help_faq_q3" => "Apakah ada versi gratis selamanya?",
    "help_faq_a3" => "Tentu! Versi Lite kami gratis selamanya untuk penggunaan personal dasar.",

    "help_cta_title" => "Masih belum menemukan jawaban?",
    "help_cta_desc" => "Tim dukungan kami siap membantumu kapan saja.",
    "help_cta_btn" => "Hubungi Kami",
    "help_cta_community" => "Tanya Komunitas"
];

$help_keys_en = [
    "help_meta_title" => "OneForMind Help Center",
    "help_meta_desc" => "Find answers, guides, and solutions to maximize your OneForMind Life OS experience.",
    "help_hero_badge" => "OneForMind Support",
    "help_hero_title_1" => "How Can We",
    "help_hero_title_2" => "Help You Today?",
    "help_hero_desc" => "Search our documentation or browse categories below to find what you need.",
    "help_search_placeholder" => "Search for questions or keywords...",

    "help_cat_1_title" => "Getting Started",
    "help_cat_1_desc" => "Learn the basics of OneForMind and how to setup your first workspace.",
    "help_cat_2_title" => "Account & Security",
    "help_cat_2_desc" => "Manage your profile, password, and data privacy settings.",
    "help_cat_3_title" => "Feature Guides",
    "help_cat_3_desc" => "In-depth tutorials for Habit, Finance, Planner, and more.",
    "help_cat_4_title" => "Billing & Payments",
    "help_cat_4_desc" => "Subscription info, invoices, and payment methods.",

    "help_faq_title" => "Frequently Asked Questions",
    "help_faq_q1" => "Is my data safe in OneForMind?",
    "help_faq_a1" => "Yes, we use industry-standard encryption and will never sell your data to third parties.",
    "help_faq_q2" => "How do I sync across devices?",
    "help_faq_a2" => "OneForMind is cloud-native. Simply log in with the same account on any device.",
    "help_faq_q3" => "Is there a free forever version?",
    "help_faq_a3" => "Absolutely! Our Lite version is free forever for basic personal use.",

    "help_cta_title" => "Still can't find the answer?",
    "help_cta_desc" => "Our support team is ready to help you anytime.",
    "help_cta_btn" => "Contact Us",
    "help_cta_community" => "Ask Community"
];

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

updateJson($id_path, $help_keys_id);
updateJson($en_path, $help_keys_en);
echo "DONE";
