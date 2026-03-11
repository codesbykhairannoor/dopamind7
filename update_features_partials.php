<?php
$en_file = 'c:/Users/Axioo/dopmymind/lang/partials/en/features.json';
$id_file = 'c:/Users/Axioo/dopmymind/lang/partials/id/features.json';

$en_data = json_decode(file_get_contents($en_file), true);
$id_data = json_decode(file_get_contents($id_file), true);

$new_en = [
    // Planner
    "planner_timeline_stat_1_value" => "4 Hours",
    "planner_timeline_stat_2_value" => "2 Hours",
    "planner_timeline_time_1" => "08:00 - 10:00",
    "planner_timeline_time_2" => "10:30 - 12:00",
    "planner_timeline_time_3" => "13:00 - 14:00",
    "planner_matrix_axis_y" => "Importance",
    "planner_matrix_axis_x" => "Urgency",
    
    // Journal
    "journal_analytics_banner_text" => "Join thousands reflecting daily with AI-powered clarity.",
    
    // Finance
    "finance_mockup_balance_value" => "Rp 25.000.000",
    "finance_brand" => "OneForMind",
    "finance_mockup_income" => "Rp 128.450k",
    "finance_mockup_expense" => "Rp 12.000k",
    "finance_mockup_saving" => "Rp 5.200k",
    "finance_fire_date_label" => "Estimated FIRE Date",
    "finance_compound_title" => "Compound Growth Engine",
    "finance_compound_desc" => "Visualization of asset accumulation over time",
    "finance_compound_legend_1" => "Projected",
    "finance_compound_legend_2" => "Baseline",
    "finance_quote_legend" => "Legendary Investor",
    "finance_flow_percentage_1" => "45%",
    "finance_flow_percentage_2" => "20%",

    // Habit
    "habit_mockup_days" => "365",
    "habit_mockup_percent" => "98%",
    "habit_bento_action_label" => "The Action",
    "habit_bento_action_desc" => "Setting up digital cues and environmental nudges to eliminate friction.",

    // Job
    "job_mockup_grade_1" => "G",
    "job_mockup_grade_2" => "S",
    "job_mockup_grade_3" => "A",
    "job_funnel_stat_1" => "42",
    "job_funnel_stat_2" => "8",
    "job_funnel_stage_1_stat" => "24",
    "job_funnel_stage_2_stat" => "6",
    "job_funnel_stage_3_stat" => "2",
    "job_radar_title" => "Negotiation Radar",
    "job_radar_live" => "LIVE DATA",
    "job_radar_role_1" => "Senior Developer",
    "job_radar_prev_1" => "85M",
    "job_radar_curr_1" => "115M",
    "job_radar_gain_1" => "+35%",
    "job_radar_role_2" => "Product Manager",
    "job_radar_prev_2" => "70M",
    "job_radar_curr_2" => "95M",
    "job_radar_gain_2" => "+35%",
    "job_radar_role_3" => "Data Scientist",
    "job_radar_prev_3" => "90M",
    "job_radar_curr_3" => "130M",
    "job_radar_gain_3" => "+44%",
    
    // Calendar
    "calendar_days_s" => "S",
    "calendar_days_m" => "M",
    "calendar_days_t" => "T",
    "calendar_days_w" => "W",
    "calendar_days_f" => "F"
];

$new_id = [
    // Planner
    "planner_timeline_stat_1_value" => "4 Jam",
    "planner_timeline_stat_2_value" => "2 Jam",
    "planner_timeline_time_1" => "08:00 - 10:00",
    "planner_timeline_time_2" => "10:30 - 12:00",
    "planner_timeline_time_3" => "13:00 - 14:00",
    "planner_matrix_axis_y" => "Penting",
    "planner_matrix_axis_x" => "Mendesak",
    
    // Journal
    "journal_analytics_banner_text" => "Bergabunglah dengan ribuan orang yang berefleksi setiap hari dengan kejernihan berteknologi AI.",
    
    // Finance
    "finance_mockup_balance_value" => "Rp 25.000.000",
    "finance_brand" => "OneForMind",
    "finance_mockup_income" => "Rp 128.450k",
    "finance_mockup_expense" => "Rp 12.000k",
    "finance_mockup_saving" => "Rp 5.200k",
    "finance_fire_date_label" => "Estimasi Tanggal FIRE",
    "finance_compound_title" => "Mesin Pertumbuhan Majemuk",
    "finance_compound_desc" => "Visualisasi akumulasi aset dari waktu ke waktu",
    "finance_compound_legend_1" => "Proyeksi",
    "finance_compound_legend_2" => "Batas Dasar",
    "finance_quote_legend" => "Investor Legendaris",
    "finance_flow_percentage_1" => "45%",
    "finance_flow_percentage_2" => "20%",

    // Habit
    "habit_mockup_days" => "365",
    "habit_mockup_percent" => "98%",
    "habit_bento_action_label" => "Aksi Nyata",
    "habit_bento_action_desc" => "Menyiapkan isyarat digital dan dorongan lingkungan untuk menghilangkan gesekan.",

    // Job
    "job_mockup_grade_1" => "G",
    "job_mockup_grade_2" => "S",
    "job_mockup_grade_3" => "A",
    "job_funnel_stat_1" => "42",
    "job_funnel_stat_2" => "8",
    "job_funnel_stage_1_stat" => "24",
    "job_funnel_stage_2_stat" => "6",
    "job_funnel_stage_3_stat" => "2",
    "job_radar_title" => "Radar Negosiasi",
    "job_radar_live" => "DATA LANGSUNG",
    "job_radar_role_1" => "Senior Developer",
    "job_radar_prev_1" => "85M",
    "job_radar_curr_1" => "115M",
    "job_radar_gain_1" => "+35%",
    "job_radar_role_2" => "Product Manager",
    "job_radar_prev_2" => "70M",
    "job_radar_curr_2" => "95M",
    "job_radar_gain_2" => "+35%",
    "job_radar_role_3" => "Data Scientist",
    "job_radar_prev_3" => "90M",
    "job_radar_curr_3" => "130M",
    "job_radar_gain_3" => "+44%",
    
    // Calendar
    "calendar_days_s" => "M",
    "calendar_days_m" => "S",
    "calendar_days_t" => "S",
    "calendar_days_w" => "R",
    "calendar_days_f" => "J"
];

$en_data = array_merge($en_data, $new_en);
$id_data = array_merge($id_data, $new_id);

file_put_contents($en_file, json_encode($en_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
file_put_contents($id_file, json_encode($id_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

echo "Partials updated successfully.\n";
