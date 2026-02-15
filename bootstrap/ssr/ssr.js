import { createSSRApp, h as h$1 } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { r as resolvePageComponent } from "./assets/vendor-core-koWuargk.js";
import { i18nVue } from "laravel-vue-i18n";
const nav_home$2 = "Home";
const nav_about$2 = "About Us";
const nav_login$2 = "Log In";
const nav_register$2 = "Get Started";
const nav_dashboard$2 = "Dashboard";
const nav_settings$1 = "App Settings";
const nav_logout$1 = "Log Out";
const hero_badge$2 = "✨ v1.0: The Anti-Burnout System";
const hero_title_1$2 = "One System";
const hero_title_2$2 = "For a Clear Mind.";
const hero_desc$2 = "A personal operating system that combines every aspect of your life. Focus on what matters today, and forget the mental clutter with OneForMind.";
const hero_cta_primary$2 = "Start for Free Now";
const hero_cta_secondary$2 = "Learn the Philosophy";
const eco_badge$2 = "THE ECOSYSTEM";
const eco_title$2 = "What's Inside?";
const eco_desc$2 = "Not just Habits. This is a complete toolkit to manage every aspect of your life in one single dashboard.";
const eco_habit_title$2 = "Habit Tracker";
const eco_habit_desc$2 = "The core feature. Build new habits with a daily checklist system. Visualize your streaks to stay motivated.";
const eco_finance_title$2 = "Finance Flow";
const eco_finance_desc$2 = "Simple income & expense tracking. Stop the silent leaks in your wallet.";
const eco_daily_title$2 = "Daily Plan";
const eco_daily_desc$2 = "Just today's To-Do List. Focus on what actually needs to get done right now.";
const eco_goal_title$2 = "Goal Tracker";
const eco_goal_desc$2 = "Break down big yearly dreams into reasonable and executable targets.";
const eco_journal_title$2 = "Journal";
const eco_journal_desc$2 = "Pour out your thoughts. Daily reflection to keep your mind sane.";
const eco_job_title$2 = "Job & Content Planner";
const eco_job_desc$2 = "Track your job applications (Sent, Interview, Offer) or schedule your social media posts.";
const eco_coming_soon$2 = "COMING SOON";
const prob_1_title$2 = "The Problem: Mental Clutter";
const prob_1_desc$2 = "Too many apps clutter the mind. Scattered tasks, finances, and habits everywhere only become a mental burden for you.";
const prob_1_point_1$2 = "Losing focus due to complicated systems.";
const prob_1_point_2$2 = "Burnout from switching between too many apps.";
const prob_2_title$2 = "The Problem: App-Switching Fatigue";
const prob_2_desc$2 = "Habits on your phone, finances on your laptop, journal in a notebook. Your energy is drained just trying to remember which app to open.";
const prob_2_solution$2 = "OneForMind combines Habits, Finances, and Planners into one simple Dashboard.";
const sol_badge$2 = "OUR SOLUTION";
const sol_title$2 = "One Place. One Mindset.";
const sol_card_1_title$2 = "Habit Tracker";
const sol_card_1_desc$2 = "Hassle-free daily checklists. Track your progress visually. Green means go, gray means skip.";
const sol_card_2_title$2 = "Money Flow";
const sol_card_2_desc$2 = "Input expenses in just 3 seconds. 'Coffee - $2'. Done. See exactly where your money is leaking this month.";
const sol_card_3_title$2 = "The OneForMind Space";
const sol_card_3_desc$2 = "All the features you need, perfectly integrated. Give your mind room to breathe without fragmented apps.";
const about_badge$2 = "👋 Hello, Humans.";
const about_title_1$2 = "We Built This Because";
const about_title_2$2 = "We Were Exhausted.";
const about_desc$2 = "An honest story about burnout, red notifications, and the search for sanity in a digital world.";
const story_1_title$2 = "Where the Chaos Began";
const story_1_p1$2 = "Our phones used to be filled with productivity apps. Trello for work, Notion for notes, Excel for finances. We thought it made us productive.";
const story_1_p2$2 = "The reality? We became slaves to the apps. We spent more time 'managing' the system than actually getting things done.";
const story_1_card_1$2 = "Mental Clutter";
const story_1_card_2$2 = "Notification Anxiety";
const story_2_title$2 = "Humans Aren't Machines";
const story_2_p1$2 = "We realized something was wrong. Modern apps force us to run a marathon with no finish line. Miss one task, and rigid systems instantly kill your motivation.";
const story_2_quote$2 = "We need a system that forgives, not one that punishes.";
const story_2_p2$2 = "Finally, we created OneForMind. A calm ecosystem that unites all your productivity needs without the overwhelm.";
const manifesto_badge$2 = "OUR MANIFESTO";
const manifesto_title$2 = "3 Pillars of Sanity";
const manifesto_1_title$2 = "Privacy First";
const manifesto_1_desc$2 = "Your data is your business. We are not an ad company. We don't sell your habit data to third parties.";
const manifesto_2_title$2 = "Unified System";
const manifesto_2_desc$2 = "One dashboard for everything. You no longer need to open multiple apps just to log finances, habits, and schedules.";
const manifesto_3_title$2 = "Less is More";
const manifesto_3_desc$2 = "Anti-bloatware. We only include features you genuinely need to keep your life organized. No tacky gamification.";
const team_title$2 = "Behind the Scenes of OneForMind";
const dev_name$2 = "The Indie Maker";
const dev_role$2 = "Coder & Designer";
const dev_desc$2 = "Built solo out of frustration with complicated habit apps. I coded this to solve my own problems, and hopefully, it helps you too.";
const user_name$2 = "The Early Adopters";
const user_role$2 = "The Visionaries (All of You)";
const user_desc$2 = "The first users brave enough to try this system. The ones reporting bugs at 2 AM and pitching crazy feature ideas. You aren't just users; you're Co-Founders.";
const team_connect$2 = "Want to discuss features or just vent about burnout?";
const cta_about_title$2 = "Read Enough?";
const cta_about_desc$2 = "Time to stop scrolling and start organizing your life. It only takes 2 minutes to set up.";
const cta_about_btn$2 = "Join for Free";
const cta_about_sub$2 = "No Credit Card Required. Cancel anytime.";
const cta_final_title$2 = "Ready to Organize Your Life?";
const cta_final_desc$2 = "Don't wait until later to get organized. Start now, regain your focus. Risk-free.";
const cta_final_btn$2 = "Create a Free Account";
const cta_final_sub$2 = "✨ Join 100+ Early Adopters";
const faq_title$2 = "Frequently Asked Questions";
const faq_q1$2 = "Is my data securely stored?";
const faq_a1$2 = "Absolutely. All your data is securely stored in the cloud. You can look back at your finance or habit history anytime for evaluation.";
const faq_q2$2 = "Is it really free?";
const faq_a2$2 = "Yes. The Habit & Finance Tracker features you see now are FREE. We will release Premium features later, but the core foundation will remain free.";
const faq_q3$2 = "Can I use it on my phone?";
const faq_a3$2 = "Definitely! This website is fully responsive. If you open it in mobile Chrome/Safari, it feels just like a native app.";
const auth_login_title$2 = "Welcome Back.";
const auth_login_subtitle$2 = "Continue your life's progress.";
const auth_register_title$2 = "Start Fresh.";
const auth_register_subtitle$2 = "Create an account in 30 seconds. It's free.";
const auth_label_email$2 = "Email";
const auth_label_password$2 = "Password";
const auth_label_name$2 = "Nickname";
const auth_label_pass_confirm$2 = "Confirm Password";
const auth_placeholder_email$2 = "name@email.com";
const auth_placeholder_name$2 = "Alex";
const auth_placeholder_pass$2 = "Min. 8 characters";
const auth_placeholder_pass_confirm$2 = "Re-enter your password";
const auth_forgot_pass$2 = "Forgot password?";
const auth_remember$2 = "Remember me";
const auth_btn_login$2 = "Enter Dashboard";
const auth_btn_register$2 = "Register Now";
const auth_btn_google_in$2 = "Sign in with Google";
const auth_btn_google_up$2 = "Sign up with Google";
const auth_divider$2 = "OR";
const auth_no_account$2 = "Don't have an account?";
const auth_has_account$2 = "Already have an account?";
const auth_link_register$2 = "Register here";
const auth_link_login$2 = "Log in here";
const auth_confirm_title$2 = "Security Check.";
const auth_confirm_desc$2 = "This is a sensitive area. Please confirm your password before proceeding to keep things secure.";
const auth_btn_confirm$2 = "Confirm Password";
const auth_reset_title$2 = "Forgot Password?";
const auth_reset_desc$2 = "Relax, don't panic. Enter your email below, and we'll send you a link to reset your password.";
const auth_btn_reset$2 = "Send Reset Link";
const auth_back_login$2 = "← Back to Login";
const reset_page_title$2 = "Reset Password";
const reset_title$2 = "New Password";
const reset_desc$2 = "Please create a secure new password.";
const reset_label_email$2 = "Email";
const reset_label_pass$2 = "New Password";
const reset_label_confirm$2 = "Confirm New Password";
const reset_placeholder_pass$2 = "Min. 8 characters";
const reset_btn$2 = "Save Password";
const waitlist_title$1 = "OneForMind in Your Pocket.";
const waitlist_desc$1 = "We're building a mobile app to help you stay productive anywhere. Be the first to know when we launch on the App Store & Play Store.";
const waitlist_input_placeholder$1 = "Enter your email address...";
const waitlist_btn$1 = "Get Early Access";
const waitlist_note$1 = "Don't worry, we won't spam you. Just launch news.";
const dash_greet_morning$1 = "Good Morning";
const dash_greet_afternoon$1 = "Good Afternoon";
const dash_greet_evening$1 = "Good Evening";
const dash_greet_night$1 = "Good Night";
const dash_welcome_sub$1 = "Ready to make 1% progress today? Manage your habits, schedule, and finances all in one place.";
const dash_habit_desc$1 = "Track your daily habits and build long-term consistency.";
const dash_planner_desc$1 = "Organize your daily tasks to stay focused and productive.";
const dash_finance_desc$1 = "Record expenses and income to maintain your financial health.";
const dash_open_module$1 = "Open Module";
const dash_status_label$1 = "Account Status";
const today_is$1 = "Today";
const greet_morning$1 = "Good Morning";
const greet_noon$1 = "Good Afternoon";
const greet_afternoon$1 = "Good Afternoon";
const greet_night$1 = "Good Evening";
const greet_subtitle$1 = "Focus on today. Tomorrow is another day.";
const habit_page_title$1 = "Habit Tracker";
const habit_subtitle$1 = "Build consistency, slow but sure.";
const habit_name$1 = "Habit Name";
const habit_progress$1 = "Monthly Progress";
const habit_target$1 = "Target";
const habit_sessions$1 = "Sessions";
const habit_today$1 = "Today";
const habit_empty$1 = "No active habits yet. Let's add one!";
const habit_btn_add$1 = "Add New Habit";
const habit_btn_new$1 = "New Habit";
const habit_create_title$1 = "New Habit";
const habit_create_desc$1 = "What do you want to track?";
const habit_modal_title$1 = "New Habit";
const habit_modal_question$1 = "What to track?";
const habit_label_name$1 = "Habit Name";
const habit_label_icon$1 = "Icon (Emoji)";
const habit_modal_icon$1 = "Pick Icon";
const habit_label_target$1 = "Target (Times/Month)";
const habit_modal_target$1 = "Target";
const habit_label_color$1 = "Theme Color";
const habit_modal_color$1 = "Color";
const habit_btn_save$1 = "Save Habit";
const habit_modal_btn_save$1 = "Start Habit";
const habit_table_target$1 = "Target";
const habit_table_total$1 = "Total";
const habit_table_progress$1 = "Progress";
const stats_consistency$1 = "Avg. Consistency";
const stats_total_check$1 = "Total Checks";
const stats_mood$1 = "Mood Tracker";
const stats_mood_desc$1 = "On Fire!";
const habit_empty_title$1 = "Fresh Start";
const habit_empty_desc$1 = "No habits for this month yet.";
const habit_delete_title$1 = "Delete this Habit?";
const habit_delete_desc$1 = "Are you sure you want to delete";
const habit_btn_delete_confirm$1 = "Yes, Delete!";
const habit_delete_confirm$1 = "Are you sure you want to delete this?";
const habit_btn_cancel$1 = "Cancel";
const habit_copy_title$1 = "Copy Habits";
const habit_copy_desc$1 = "Do you want to copy all habits from the previous month? Check history will be reset.";
const habit_btn_copy_confirm$1 = "Yes, Copy Now";
const habit_salin_btn$1 = "Copy From Previous Month";
const mood_title$1 = "Your Mood";
const mood_fire$1 = "On Fire!";
const mood_happy$1 = "Happy";
const mood_neutral$1 = "Neutral";
const mood_sad$1 = "Sad";
const mood_stress$1 = "Stressed";
const mood_sick$1 = "Sick";
const legend_instruction$1 = "How to use:";
const legend_left_click$1 = "Left Click: Done";
const legend_right_click$1 = "Right Click: Skip";
const legend_reset$1 = "Click Again: Reset";
const label_period$1 = "Period";
const label_daily$1 = "Daily";
const btn_add_habit$1 = "Habit";
const hint_click_done$1 = "Left Click: Done";
const hint_click_skip$1 = "Right Click: Skip";
const hint_tap_done$1 = "One Tap: Done";
const hint_hold_skip$1 = "Long Press: Skip";
const label_consistency$1 = "Consistency";
const label_mvp_habit$1 = "MVP Habit";
const label_checkins$1 = "Check-ins";
const label_mood_status$1 = "Mood Status";
const planner_title$1 = "Daily Timeline";
const planner_time_fmt$1 = "AM/PM";
const planner_click_hint$1 = "Click to add schedule";
const timeline_title$1 = "Daily Schedule";
const timeline_now$1 = "NOW";
const header_title$1 = "Daily Planner";
const header_progress$1 = "Progress";
const header_done_suffix$1 = "Done";
const header_completed$1 = "Completed";
const header_pending$1 = "Pending";
const sidebar_daily_focus$1 = "Daily Focus";
const sidebar_target_daily$1 = "Daily Target";
const sidebar_tasks_done$1 = "Tasks Done";
const sidebar_tasks_unit$1 = "Tasks";
const sidebar_done_suffix$1 = "Done";
const sidebar_all_done_msg$1 = "Awesome! All clear! 🎉";
const sidebar_keep_going_msg$1 = "Keep pushing forward! 💪";
const sidebar_msg_complete$1 = "Awesome! All done 🚀";
const sidebar_msg_progress$1 = "Keep the momentum going! 🔥";
const sidebar_inbox_title$1 = "Inbox";
const sidebar_inbox_focus$1 = "INBOX STATUS";
const sidebar_inbox_empty$1 = "No backlog tasks.";
const sidebar_inbox_subtitle$1 = "Drag to timeline to schedule";
const sidebar_meals_title$1 = "Meal Plan";
const sidebar_meal_title$1 = "MEAL PLAN";
const meal_breakfast$1 = "Breakfast...";
const meal_lunch$1 = "Lunch...";
const meal_dinner$1 = "Dinner...";
const placeholder_breakfast$1 = "What's for breakfast?";
const placeholder_lunch$1 = "Lunch...";
const placeholder_dinner$1 = "Dinner...";
const sidebar_notes_title$1 = "Quick Notes";
const sidebar_notes_placeholder$1 = "Type quick ideas here...";
const task_notes$1 = "Notes";
const cat_work$1 = "Work";
const cat_life$1 = "Life";
const cat_urgent$1 = "Urgent";
const cat_other$1 = "Other";
const label_urgent$1 = "URGENT";
const label_routine$1 = "ROUTINE";
const label_chill$1 = "CHILL";
const label_todo$1 = "TODO";
const label_work$1 = "WORK";
const label_break$1 = "BREAK";
const prio_important$1 = "Urgent / Important";
const prio_important_desc$1 = "Must be done, do not delay.";
const prio_normal$1 = "Normal";
const prio_normal_desc$1 = "Standard workflow routine.";
const prio_optional$1 = "Optional";
const prio_optional_desc$1 = "Only if you have extra time.";
const priority_work$1 = "💼 Optional";
const priority_normal$1 = "🧘 Normal";
const priority_urgent$1 = "🔥 Priority";
const modal_new_title$1 = "New Task";
const modal_new_simple_title$1 = "New Task";
const modal_title_new$1 = "✨ New Plan";
const modal_edit_title$1 = "Edit Task";
const modal_edit_simple_title$1 = "Edit Task";
const modal_title_edit$1 = "✏️ Edit Plan";
const modal_label_task_name$1 = "Task Name";
const modal_placeholder_task_name$1 = "Ex: Buy Coffee...";
const modal_placeholder_simple_task$1 = "What needs to be done?";
const label_activity$1 = "Activity Name";
const placeholder_activity$1 = "Example: Coding Study...";
const modal_label_color$1 = "Category";
const modal_label_priority$1 = "PRIORITY";
const label_priority$1 = "Priority / Category";
const icon_tooltip$1 = "Priority Icon";
const label_start_time$1 = "Start Time";
const label_end_time$1 = "End Time (Optional)";
const error_conflict$1 = "⛔ Please choose an empty slot!";
const label_notes$1 = "Notes";
const placeholder_notes$1 = "Additional details...";
const btn_add_task$1 = "Add Task";
const btn_add_task_short$1 = "Task";
const btn_add_schedule$1 = "Add Schedule";
const btn_create$1 = "Create Schedule";
const btn_reset$1 = "Reset";
const btn_reset_tooltip$1 = "Delete all tasks for today";
const modal_reset_title$1 = "Are you sure to Reset Today's Schedule?";
const modal_reset_desc$1 = "This will delete all tasks for today and start fresh.";
const modal_reset_confirm$1 = "Yes, Reset Now";
const btn_confirm_reset$1 = "Confirm Reset";
const batch_mode_title$1 = "Batch Entry Mode";
const btn_single_mode$1 = "Single";
const col_activity$1 = "Activity Name";
const col_start$1 = "Start";
const col_end$1 = "End";
const col_priority$1 = "Priority";
const prio_urgent$1 = "🔥 Urgent";
const prio_work$1 = "⚡ Work";
const btn_add_another$1 = "Add Another Task";
const total_label$1 = "Total:";
const total_suffix$1 = "tasks";
const btn_saving$1 = "Saving...";
const btn_save_all$1 = "💾 Save All Tasks";
const sidebar_persistent$1 = "Auto Persistence";
const sidebar_water_title$1 = "HYDRATION";
const delete_activity_title$1 = "Delete Activity?";
const delete_activity_desc$1 = "Are you sure you want to delete this activity? This action cannot be undone.";
const default_activity_name$1 = "this activity";
const label_start$1 = "START";
const btn_add_timeline$1 = "ADD";
const label_now$1 = "NOW";
const select_hour$1 = "Select Hour";
const err_min_15_mins$1 = "Minimum 15 minutes!";
const err_schedule_conflict$1 = "Schedule conflict!";
const warn_empty_time$1 = "Set start & end time!";
const err_save_failed$1 = "Failed to save to server!";
const err_delete_failed$1 = "Failed to delete data!";
const record_transaction$1 = "Record Transaction";
const expense$1 = "Expense";
const income$1 = "Income";
const description$1 = "Description";
const desc_placeholder$1 = "What did you buy / From where...";
const amount$1 = "Amount";
const amount_placeholder$1 = "0";
const category$1 = "Category";
const select_placeholder$1 = "Select...";
const create_budget_first$1 = "Create a budget first!";
const date$1 = "Date";
const daily_detail$1 = "Daily Details";
const edit$1 = "Edit";
const cancel$1 = "Cancel";
const save$1 = "Save";
const saving$1 = "Saving...";
const budget_target$1 = "Budget Target";
const set_budget$1 = "Manage";
const no_budget$1 = "No budget set.";
const fund_source$1 = "Fund Sources";
const add_category$1 = "Category";
const no_fund_source$1 = "No fund sources yet.";
const active$1 = "Active";
const empty$1 = "Empty";
const edit_budget$1 = "Edit Budget";
const new_budget$1 = "New Budget";
const category_name$1 = "Category Name";
const budget_limit$1 = "Budget Limit";
const budget_warning$1 = "Renaming this will affect historical transactions.";
const placeholder_name$1 = "E.g. Snacks / Salary";
const edit_source$1 = "Edit Source";
const add_source$1 = "Add Source";
const delete_confirm_title$1 = "Delete Data?";
const delete_confirm_msg$1 = "This data will be permanently deleted.";
const yes_delete$1 = "Yes, Delete!";
const success_saved$1 = "Saved successfully!";
const success_deleted$1 = "Deleted successfully!";
const error_title$1 = "Error";
const date_format$1 = "dddd, MMMM D, YYYY";
const finance_trend$1 = "Finance Trend";
const daily_chart$1 = "Daily Chart";
const insight_radar_title$1 = "Burn Rate Radar";
const insight_day_suffix$1 = "day";
const insight_status_fast$1 = "🏃‍♂️ You are spending too fast!";
const insight_status_safe$1 = "🚶‍♂️ Spending speed is safe.";
const insight_efficiency_label$1 = "Efficiency";
const insight_target_diff$1 = "from daily target";
const insight_cold_money_label$1 = "Cold Money (Net)";
const insight_milestone_label$1 = "Milestone Progress";
const insight_cold_money_hint$1 = "*Use this ammunition when your stock chart bounces off support, bro!,";
const date_filter$1 = "Date Filter";
const finance_plan$1 = "Finance Plan";
const btn_transaction$1 = "Transaction";
const month_jan$1 = "January";
const month_feb$1 = "February";
const month_mar$1 = "March";
const month_apr$1 = "April";
const month_may$1 = "May";
const month_jun$1 = "June";
const month_jul$1 = "July";
const month_aug$1 = "August";
const month_sep$1 = "September";
const month_oct$1 = "October";
const month_nov$1 = "November";
const month_dec$1 = "December";
const available_balance$1 = "Available Balance";
const monthly_finance_desc$1 = "Your finance this month";
const base_capital$1 = "Base / Capital";
const daily_history$1 = "Daily History";
const last_5$1 = "Last 4";
const search_result$1 = "Search Results";
const no_transaction$1 = "No transactions this month";
const daily_net$1 = "Daily Net";
const transaction_count$1 = ":count Transactions";
const old_data_hint$1 = "Use date filter to see older data";
const warn_empty_category_name$1 = "Name Empty";
const warn_empty_category_name_text$1 = "Please provide a name for this category.";
const warn_empty_category$1 = "Please select a category!";
const btn_add$1 = "Add";
const btn_save$1 = "Save";
const btn_update$1 = "Update";
const btn_delete$1 = "Delete";
const btn_cancel$1 = "Cancel";
const confirm_delete_title$1 = "Are you sure?";
const confirm_delete_text$1 = "You won't be able to revert this!";
const btn_yes_delete$1 = "Yes, Delete!";
const warn_empty_title$1 = "Empty Title";
const warn_empty_title_text$1 = "Please provide a transaction title.";
const warn_empty_amount$1 = "Empty Amount";
const warn_empty_amount_text$1 = "How much is it?";
const warn_empty_budget_name$1 = "Budget Name?";
const warn_empty_budget_name_text$1 = "Please provide a budget name.";
const success_transaction_saved$1 = "Transaction saved";
const success_budget_saved$1 = "Budget saved";
const delete_trx_title$1 = "Delete Transaction?";
const delete_trx_text$1 = "It will be gone forever.";
const delete_budget_title$1 = "Delete Budget?";
const delete_budget_text$1 = "History remains, but monthly target will be deleted.";
const en = {
  "____ SECTION_1 ____": "=== NAVIGATION & GLOBAL ===",
  nav_home: nav_home$2,
  nav_about: nav_about$2,
  nav_login: nav_login$2,
  nav_register: nav_register$2,
  nav_dashboard: nav_dashboard$2,
  nav_settings: nav_settings$1,
  nav_logout: nav_logout$1,
  "____ SECTION_2 ____": "=== PRE-LOGIN (LANDING PAGE) ===",
  hero_badge: hero_badge$2,
  hero_title_1: hero_title_1$2,
  hero_title_2: hero_title_2$2,
  hero_desc: hero_desc$2,
  hero_cta_primary: hero_cta_primary$2,
  hero_cta_secondary: hero_cta_secondary$2,
  eco_badge: eco_badge$2,
  eco_title: eco_title$2,
  eco_desc: eco_desc$2,
  eco_habit_title: eco_habit_title$2,
  eco_habit_desc: eco_habit_desc$2,
  eco_finance_title: eco_finance_title$2,
  eco_finance_desc: eco_finance_desc$2,
  eco_daily_title: eco_daily_title$2,
  eco_daily_desc: eco_daily_desc$2,
  eco_goal_title: eco_goal_title$2,
  eco_goal_desc: eco_goal_desc$2,
  eco_journal_title: eco_journal_title$2,
  eco_journal_desc: eco_journal_desc$2,
  eco_job_title: eco_job_title$2,
  eco_job_desc: eco_job_desc$2,
  eco_coming_soon: eco_coming_soon$2,
  prob_1_title: prob_1_title$2,
  prob_1_desc: prob_1_desc$2,
  prob_1_point_1: prob_1_point_1$2,
  prob_1_point_2: prob_1_point_2$2,
  prob_2_title: prob_2_title$2,
  prob_2_desc: prob_2_desc$2,
  prob_2_solution: prob_2_solution$2,
  sol_badge: sol_badge$2,
  sol_title: sol_title$2,
  sol_card_1_title: sol_card_1_title$2,
  sol_card_1_desc: sol_card_1_desc$2,
  sol_card_2_title: sol_card_2_title$2,
  sol_card_2_desc: sol_card_2_desc$2,
  sol_card_3_title: sol_card_3_title$2,
  sol_card_3_desc: sol_card_3_desc$2,
  about_badge: about_badge$2,
  about_title_1: about_title_1$2,
  about_title_2: about_title_2$2,
  about_desc: about_desc$2,
  story_1_title: story_1_title$2,
  story_1_p1: story_1_p1$2,
  story_1_p2: story_1_p2$2,
  story_1_card_1: story_1_card_1$2,
  story_1_card_2: story_1_card_2$2,
  story_2_title: story_2_title$2,
  story_2_p1: story_2_p1$2,
  story_2_quote: story_2_quote$2,
  story_2_p2: story_2_p2$2,
  manifesto_badge: manifesto_badge$2,
  manifesto_title: manifesto_title$2,
  manifesto_1_title: manifesto_1_title$2,
  manifesto_1_desc: manifesto_1_desc$2,
  manifesto_2_title: manifesto_2_title$2,
  manifesto_2_desc: manifesto_2_desc$2,
  manifesto_3_title: manifesto_3_title$2,
  manifesto_3_desc: manifesto_3_desc$2,
  team_title: team_title$2,
  dev_name: dev_name$2,
  dev_role: dev_role$2,
  dev_desc: dev_desc$2,
  user_name: user_name$2,
  user_role: user_role$2,
  user_desc: user_desc$2,
  team_connect: team_connect$2,
  cta_about_title: cta_about_title$2,
  cta_about_desc: cta_about_desc$2,
  cta_about_btn: cta_about_btn$2,
  cta_about_sub: cta_about_sub$2,
  cta_final_title: cta_final_title$2,
  cta_final_desc: cta_final_desc$2,
  cta_final_btn: cta_final_btn$2,
  cta_final_sub: cta_final_sub$2,
  faq_title: faq_title$2,
  faq_q1: faq_q1$2,
  faq_a1: faq_a1$2,
  faq_q2: faq_q2$2,
  faq_a2: faq_a2$2,
  faq_q3: faq_q3$2,
  faq_a3: faq_a3$2,
  "____ SECTION_3 ____": "=== AUTHENTICATION (LOGIN & REGISTER) ===",
  auth_login_title: auth_login_title$2,
  auth_login_subtitle: auth_login_subtitle$2,
  auth_register_title: auth_register_title$2,
  auth_register_subtitle: auth_register_subtitle$2,
  auth_label_email: auth_label_email$2,
  auth_label_password: auth_label_password$2,
  auth_label_name: auth_label_name$2,
  auth_label_pass_confirm: auth_label_pass_confirm$2,
  auth_placeholder_email: auth_placeholder_email$2,
  auth_placeholder_name: auth_placeholder_name$2,
  auth_placeholder_pass: auth_placeholder_pass$2,
  auth_placeholder_pass_confirm: auth_placeholder_pass_confirm$2,
  auth_forgot_pass: auth_forgot_pass$2,
  auth_remember: auth_remember$2,
  auth_btn_login: auth_btn_login$2,
  auth_btn_register: auth_btn_register$2,
  auth_btn_google_in: auth_btn_google_in$2,
  auth_btn_google_up: auth_btn_google_up$2,
  auth_divider: auth_divider$2,
  auth_no_account: auth_no_account$2,
  auth_has_account: auth_has_account$2,
  auth_link_register: auth_link_register$2,
  auth_link_login: auth_link_login$2,
  auth_confirm_title: auth_confirm_title$2,
  auth_confirm_desc: auth_confirm_desc$2,
  auth_btn_confirm: auth_btn_confirm$2,
  auth_reset_title: auth_reset_title$2,
  auth_reset_desc: auth_reset_desc$2,
  auth_btn_reset: auth_btn_reset$2,
  auth_back_login: auth_back_login$2,
  reset_page_title: reset_page_title$2,
  reset_title: reset_title$2,
  reset_desc: reset_desc$2,
  reset_label_email: reset_label_email$2,
  reset_label_pass: reset_label_pass$2,
  reset_label_confirm: reset_label_confirm$2,
  reset_placeholder_pass: reset_placeholder_pass$2,
  reset_btn: reset_btn$2,
  waitlist_title: waitlist_title$1,
  waitlist_desc: waitlist_desc$1,
  waitlist_input_placeholder: waitlist_input_placeholder$1,
  waitlist_btn: waitlist_btn$1,
  waitlist_note: waitlist_note$1,
  "____ SECTION_4 ____": "=== DASHBOARD GENERAL ===",
  dash_greet_morning: dash_greet_morning$1,
  dash_greet_afternoon: dash_greet_afternoon$1,
  dash_greet_evening: dash_greet_evening$1,
  dash_greet_night: dash_greet_night$1,
  dash_welcome_sub: dash_welcome_sub$1,
  dash_habit_desc: dash_habit_desc$1,
  dash_planner_desc: dash_planner_desc$1,
  dash_finance_desc: dash_finance_desc$1,
  dash_open_module: dash_open_module$1,
  dash_status_label: dash_status_label$1,
  today_is: today_is$1,
  greet_morning: greet_morning$1,
  greet_noon: greet_noon$1,
  greet_afternoon: greet_afternoon$1,
  greet_night: greet_night$1,
  greet_subtitle: greet_subtitle$1,
  "____ SECTION_5 ____": "=== HABIT TRACKER ===",
  habit_page_title: habit_page_title$1,
  habit_subtitle: habit_subtitle$1,
  habit_name: habit_name$1,
  habit_progress: habit_progress$1,
  habit_target: habit_target$1,
  habit_sessions: habit_sessions$1,
  habit_today: habit_today$1,
  habit_empty: habit_empty$1,
  habit_btn_add: habit_btn_add$1,
  habit_btn_new: habit_btn_new$1,
  habit_create_title: habit_create_title$1,
  habit_create_desc: habit_create_desc$1,
  habit_modal_title: habit_modal_title$1,
  habit_modal_question: habit_modal_question$1,
  habit_label_name: habit_label_name$1,
  habit_label_icon: habit_label_icon$1,
  habit_modal_icon: habit_modal_icon$1,
  habit_label_target: habit_label_target$1,
  habit_modal_target: habit_modal_target$1,
  habit_label_color: habit_label_color$1,
  habit_modal_color: habit_modal_color$1,
  habit_btn_save: habit_btn_save$1,
  habit_modal_btn_save: habit_modal_btn_save$1,
  habit_table_target: habit_table_target$1,
  habit_table_total: habit_table_total$1,
  habit_table_progress: habit_table_progress$1,
  stats_consistency: stats_consistency$1,
  stats_total_check: stats_total_check$1,
  stats_mood: stats_mood$1,
  stats_mood_desc: stats_mood_desc$1,
  habit_empty_title: habit_empty_title$1,
  habit_empty_desc: habit_empty_desc$1,
  habit_delete_title: habit_delete_title$1,
  habit_delete_desc: habit_delete_desc$1,
  habit_btn_delete_confirm: habit_btn_delete_confirm$1,
  habit_delete_confirm: habit_delete_confirm$1,
  habit_btn_cancel: habit_btn_cancel$1,
  habit_copy_title: habit_copy_title$1,
  habit_copy_desc: habit_copy_desc$1,
  habit_btn_copy_confirm: habit_btn_copy_confirm$1,
  habit_salin_btn: habit_salin_btn$1,
  mood_title: mood_title$1,
  mood_fire: mood_fire$1,
  mood_happy: mood_happy$1,
  mood_neutral: mood_neutral$1,
  mood_sad: mood_sad$1,
  mood_stress: mood_stress$1,
  mood_sick: mood_sick$1,
  legend_instruction: legend_instruction$1,
  legend_left_click: legend_left_click$1,
  legend_right_click: legend_right_click$1,
  legend_reset: legend_reset$1,
  label_period: label_period$1,
  label_daily: label_daily$1,
  btn_add_habit: btn_add_habit$1,
  hint_click_done: hint_click_done$1,
  hint_click_skip: hint_click_skip$1,
  hint_tap_done: hint_tap_done$1,
  hint_hold_skip: hint_hold_skip$1,
  label_consistency: label_consistency$1,
  label_mvp_habit: label_mvp_habit$1,
  label_checkins: label_checkins$1,
  label_mood_status: label_mood_status$1,
  "____ SECTION_6 ____": "=== DAILY PLANNER ===",
  planner_title: planner_title$1,
  planner_time_fmt: planner_time_fmt$1,
  planner_click_hint: planner_click_hint$1,
  timeline_title: timeline_title$1,
  timeline_now: timeline_now$1,
  header_title: header_title$1,
  header_progress: header_progress$1,
  header_done_suffix: header_done_suffix$1,
  header_completed: header_completed$1,
  header_pending: header_pending$1,
  sidebar_daily_focus: sidebar_daily_focus$1,
  sidebar_target_daily: sidebar_target_daily$1,
  sidebar_tasks_done: sidebar_tasks_done$1,
  sidebar_tasks_unit: sidebar_tasks_unit$1,
  sidebar_done_suffix: sidebar_done_suffix$1,
  sidebar_all_done_msg: sidebar_all_done_msg$1,
  sidebar_keep_going_msg: sidebar_keep_going_msg$1,
  sidebar_msg_complete: sidebar_msg_complete$1,
  sidebar_msg_progress: sidebar_msg_progress$1,
  sidebar_inbox_title: sidebar_inbox_title$1,
  sidebar_inbox_focus: sidebar_inbox_focus$1,
  sidebar_inbox_empty: sidebar_inbox_empty$1,
  sidebar_inbox_subtitle: sidebar_inbox_subtitle$1,
  sidebar_meals_title: sidebar_meals_title$1,
  sidebar_meal_title: sidebar_meal_title$1,
  meal_breakfast: meal_breakfast$1,
  meal_lunch: meal_lunch$1,
  meal_dinner: meal_dinner$1,
  placeholder_breakfast: placeholder_breakfast$1,
  placeholder_lunch: placeholder_lunch$1,
  placeholder_dinner: placeholder_dinner$1,
  sidebar_notes_title: sidebar_notes_title$1,
  sidebar_notes_placeholder: sidebar_notes_placeholder$1,
  task_notes: task_notes$1,
  cat_work: cat_work$1,
  cat_life: cat_life$1,
  cat_urgent: cat_urgent$1,
  cat_other: cat_other$1,
  label_urgent: label_urgent$1,
  label_routine: label_routine$1,
  label_chill: label_chill$1,
  label_todo: label_todo$1,
  label_work: label_work$1,
  label_break: label_break$1,
  prio_important: prio_important$1,
  prio_important_desc: prio_important_desc$1,
  prio_normal: prio_normal$1,
  prio_normal_desc: prio_normal_desc$1,
  prio_optional: prio_optional$1,
  prio_optional_desc: prio_optional_desc$1,
  priority_work: priority_work$1,
  priority_normal: priority_normal$1,
  priority_urgent: priority_urgent$1,
  modal_new_title: modal_new_title$1,
  modal_new_simple_title: modal_new_simple_title$1,
  modal_title_new: modal_title_new$1,
  modal_edit_title: modal_edit_title$1,
  modal_edit_simple_title: modal_edit_simple_title$1,
  modal_title_edit: modal_title_edit$1,
  modal_label_task_name: modal_label_task_name$1,
  modal_placeholder_task_name: modal_placeholder_task_name$1,
  modal_placeholder_simple_task: modal_placeholder_simple_task$1,
  label_activity: label_activity$1,
  placeholder_activity: placeholder_activity$1,
  modal_label_color: modal_label_color$1,
  modal_label_priority: modal_label_priority$1,
  label_priority: label_priority$1,
  icon_tooltip: icon_tooltip$1,
  label_start_time: label_start_time$1,
  label_end_time: label_end_time$1,
  error_conflict: error_conflict$1,
  label_notes: label_notes$1,
  placeholder_notes: placeholder_notes$1,
  btn_add_task: btn_add_task$1,
  btn_add_task_short: btn_add_task_short$1,
  btn_add_schedule: btn_add_schedule$1,
  btn_create: btn_create$1,
  btn_reset: btn_reset$1,
  btn_reset_tooltip: btn_reset_tooltip$1,
  modal_reset_title: modal_reset_title$1,
  modal_reset_desc: modal_reset_desc$1,
  modal_reset_confirm: modal_reset_confirm$1,
  btn_confirm_reset: btn_confirm_reset$1,
  batch_mode_title: batch_mode_title$1,
  btn_single_mode: btn_single_mode$1,
  col_activity: col_activity$1,
  col_start: col_start$1,
  col_end: col_end$1,
  col_priority: col_priority$1,
  prio_urgent: prio_urgent$1,
  prio_work: prio_work$1,
  btn_add_another: btn_add_another$1,
  total_label: total_label$1,
  total_suffix: total_suffix$1,
  btn_saving: btn_saving$1,
  btn_save_all: btn_save_all$1,
  sidebar_persistent: sidebar_persistent$1,
  sidebar_water_title: sidebar_water_title$1,
  delete_activity_title: delete_activity_title$1,
  delete_activity_desc: delete_activity_desc$1,
  default_activity_name: default_activity_name$1,
  label_start: label_start$1,
  btn_add_timeline: btn_add_timeline$1,
  label_now: label_now$1,
  select_hour: select_hour$1,
  err_min_15_mins: err_min_15_mins$1,
  err_schedule_conflict: err_schedule_conflict$1,
  warn_empty_time: warn_empty_time$1,
  err_save_failed: err_save_failed$1,
  err_delete_failed: err_delete_failed$1,
  "____ SECTION_7 ____": "=== FINANCE FLOW ===",
  record_transaction: record_transaction$1,
  expense: expense$1,
  income: income$1,
  description: description$1,
  desc_placeholder: desc_placeholder$1,
  amount: amount$1,
  amount_placeholder: amount_placeholder$1,
  category: category$1,
  select_placeholder: select_placeholder$1,
  create_budget_first: create_budget_first$1,
  date: date$1,
  daily_detail: daily_detail$1,
  edit: edit$1,
  "delete": "Delete",
  cancel: cancel$1,
  save: save$1,
  saving: saving$1,
  budget_target: budget_target$1,
  set_budget: set_budget$1,
  no_budget: no_budget$1,
  fund_source: fund_source$1,
  add_category: add_category$1,
  no_fund_source: no_fund_source$1,
  active: active$1,
  empty: empty$1,
  edit_budget: edit_budget$1,
  new_budget: new_budget$1,
  category_name: category_name$1,
  budget_limit: budget_limit$1,
  budget_warning: budget_warning$1,
  placeholder_name: placeholder_name$1,
  edit_source: edit_source$1,
  add_source: add_source$1,
  delete_confirm_title: delete_confirm_title$1,
  delete_confirm_msg: delete_confirm_msg$1,
  yes_delete: yes_delete$1,
  success_saved: success_saved$1,
  success_deleted: success_deleted$1,
  error_title: error_title$1,
  date_format: date_format$1,
  finance_trend: finance_trend$1,
  daily_chart: daily_chart$1,
  insight_radar_title: insight_radar_title$1,
  insight_day_suffix: insight_day_suffix$1,
  insight_status_fast: insight_status_fast$1,
  insight_status_safe: insight_status_safe$1,
  insight_efficiency_label: insight_efficiency_label$1,
  insight_target_diff: insight_target_diff$1,
  insight_cold_money_label: insight_cold_money_label$1,
  insight_milestone_label: insight_milestone_label$1,
  insight_cold_money_hint: insight_cold_money_hint$1,
  date_filter: date_filter$1,
  finance_plan: finance_plan$1,
  btn_transaction: btn_transaction$1,
  month_jan: month_jan$1,
  month_feb: month_feb$1,
  month_mar: month_mar$1,
  month_apr: month_apr$1,
  month_may: month_may$1,
  month_jun: month_jun$1,
  month_jul: month_jul$1,
  month_aug: month_aug$1,
  month_sep: month_sep$1,
  month_oct: month_oct$1,
  month_nov: month_nov$1,
  month_dec: month_dec$1,
  available_balance: available_balance$1,
  monthly_finance_desc: monthly_finance_desc$1,
  base_capital: base_capital$1,
  daily_history: daily_history$1,
  last_5: last_5$1,
  search_result: search_result$1,
  no_transaction: no_transaction$1,
  daily_net: daily_net$1,
  transaction_count: transaction_count$1,
  old_data_hint: old_data_hint$1,
  warn_empty_category_name: warn_empty_category_name$1,
  warn_empty_category_name_text: warn_empty_category_name_text$1,
  warn_empty_category: warn_empty_category$1,
  "____ SECTION_8 ____": "=== BUTTONS & GENERAL LABELS ===",
  btn_add: btn_add$1,
  btn_save: btn_save$1,
  btn_update: btn_update$1,
  btn_delete: btn_delete$1,
  btn_cancel: btn_cancel$1,
  confirm_delete_title: confirm_delete_title$1,
  confirm_delete_text: confirm_delete_text$1,
  btn_yes_delete: btn_yes_delete$1,
  warn_empty_title: warn_empty_title$1,
  warn_empty_title_text: warn_empty_title_text$1,
  warn_empty_amount: warn_empty_amount$1,
  warn_empty_amount_text: warn_empty_amount_text$1,
  warn_empty_budget_name: warn_empty_budget_name$1,
  warn_empty_budget_name_text: warn_empty_budget_name_text$1,
  success_transaction_saved: success_transaction_saved$1,
  success_budget_saved: success_budget_saved$1,
  delete_trx_title: delete_trx_title$1,
  delete_trx_text: delete_trx_text$1,
  delete_budget_title: delete_budget_title$1,
  delete_budget_text: delete_budget_text$1
};
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  about_badge: about_badge$2,
  about_desc: about_desc$2,
  about_title_1: about_title_1$2,
  about_title_2: about_title_2$2,
  active: active$1,
  add_category: add_category$1,
  add_source: add_source$1,
  amount: amount$1,
  amount_placeholder: amount_placeholder$1,
  auth_back_login: auth_back_login$2,
  auth_btn_confirm: auth_btn_confirm$2,
  auth_btn_google_in: auth_btn_google_in$2,
  auth_btn_google_up: auth_btn_google_up$2,
  auth_btn_login: auth_btn_login$2,
  auth_btn_register: auth_btn_register$2,
  auth_btn_reset: auth_btn_reset$2,
  auth_confirm_desc: auth_confirm_desc$2,
  auth_confirm_title: auth_confirm_title$2,
  auth_divider: auth_divider$2,
  auth_forgot_pass: auth_forgot_pass$2,
  auth_has_account: auth_has_account$2,
  auth_label_email: auth_label_email$2,
  auth_label_name: auth_label_name$2,
  auth_label_pass_confirm: auth_label_pass_confirm$2,
  auth_label_password: auth_label_password$2,
  auth_link_login: auth_link_login$2,
  auth_link_register: auth_link_register$2,
  auth_login_subtitle: auth_login_subtitle$2,
  auth_login_title: auth_login_title$2,
  auth_no_account: auth_no_account$2,
  auth_placeholder_email: auth_placeholder_email$2,
  auth_placeholder_name: auth_placeholder_name$2,
  auth_placeholder_pass: auth_placeholder_pass$2,
  auth_placeholder_pass_confirm: auth_placeholder_pass_confirm$2,
  auth_register_subtitle: auth_register_subtitle$2,
  auth_register_title: auth_register_title$2,
  auth_remember: auth_remember$2,
  auth_reset_desc: auth_reset_desc$2,
  auth_reset_title: auth_reset_title$2,
  available_balance: available_balance$1,
  base_capital: base_capital$1,
  batch_mode_title: batch_mode_title$1,
  btn_add: btn_add$1,
  btn_add_another: btn_add_another$1,
  btn_add_habit: btn_add_habit$1,
  btn_add_schedule: btn_add_schedule$1,
  btn_add_task: btn_add_task$1,
  btn_add_task_short: btn_add_task_short$1,
  btn_add_timeline: btn_add_timeline$1,
  btn_cancel: btn_cancel$1,
  btn_confirm_reset: btn_confirm_reset$1,
  btn_create: btn_create$1,
  btn_delete: btn_delete$1,
  btn_reset: btn_reset$1,
  btn_reset_tooltip: btn_reset_tooltip$1,
  btn_save: btn_save$1,
  btn_save_all: btn_save_all$1,
  btn_saving: btn_saving$1,
  btn_single_mode: btn_single_mode$1,
  btn_transaction: btn_transaction$1,
  btn_update: btn_update$1,
  btn_yes_delete: btn_yes_delete$1,
  budget_limit: budget_limit$1,
  budget_target: budget_target$1,
  budget_warning: budget_warning$1,
  cancel: cancel$1,
  cat_life: cat_life$1,
  cat_other: cat_other$1,
  cat_urgent: cat_urgent$1,
  cat_work: cat_work$1,
  category: category$1,
  category_name: category_name$1,
  col_activity: col_activity$1,
  col_end: col_end$1,
  col_priority: col_priority$1,
  col_start: col_start$1,
  confirm_delete_text: confirm_delete_text$1,
  confirm_delete_title: confirm_delete_title$1,
  create_budget_first: create_budget_first$1,
  cta_about_btn: cta_about_btn$2,
  cta_about_desc: cta_about_desc$2,
  cta_about_sub: cta_about_sub$2,
  cta_about_title: cta_about_title$2,
  cta_final_btn: cta_final_btn$2,
  cta_final_desc: cta_final_desc$2,
  cta_final_sub: cta_final_sub$2,
  cta_final_title: cta_final_title$2,
  daily_chart: daily_chart$1,
  daily_detail: daily_detail$1,
  daily_history: daily_history$1,
  daily_net: daily_net$1,
  dash_finance_desc: dash_finance_desc$1,
  dash_greet_afternoon: dash_greet_afternoon$1,
  dash_greet_evening: dash_greet_evening$1,
  dash_greet_morning: dash_greet_morning$1,
  dash_greet_night: dash_greet_night$1,
  dash_habit_desc: dash_habit_desc$1,
  dash_open_module: dash_open_module$1,
  dash_planner_desc: dash_planner_desc$1,
  dash_status_label: dash_status_label$1,
  dash_welcome_sub: dash_welcome_sub$1,
  date: date$1,
  date_filter: date_filter$1,
  date_format: date_format$1,
  default: en,
  default_activity_name: default_activity_name$1,
  delete_activity_desc: delete_activity_desc$1,
  delete_activity_title: delete_activity_title$1,
  delete_budget_text: delete_budget_text$1,
  delete_budget_title: delete_budget_title$1,
  delete_confirm_msg: delete_confirm_msg$1,
  delete_confirm_title: delete_confirm_title$1,
  delete_trx_text: delete_trx_text$1,
  delete_trx_title: delete_trx_title$1,
  desc_placeholder: desc_placeholder$1,
  description: description$1,
  dev_desc: dev_desc$2,
  dev_name: dev_name$2,
  dev_role: dev_role$2,
  eco_badge: eco_badge$2,
  eco_coming_soon: eco_coming_soon$2,
  eco_daily_desc: eco_daily_desc$2,
  eco_daily_title: eco_daily_title$2,
  eco_desc: eco_desc$2,
  eco_finance_desc: eco_finance_desc$2,
  eco_finance_title: eco_finance_title$2,
  eco_goal_desc: eco_goal_desc$2,
  eco_goal_title: eco_goal_title$2,
  eco_habit_desc: eco_habit_desc$2,
  eco_habit_title: eco_habit_title$2,
  eco_job_desc: eco_job_desc$2,
  eco_job_title: eco_job_title$2,
  eco_journal_desc: eco_journal_desc$2,
  eco_journal_title: eco_journal_title$2,
  eco_title: eco_title$2,
  edit: edit$1,
  edit_budget: edit_budget$1,
  edit_source: edit_source$1,
  empty: empty$1,
  err_delete_failed: err_delete_failed$1,
  err_min_15_mins: err_min_15_mins$1,
  err_save_failed: err_save_failed$1,
  err_schedule_conflict: err_schedule_conflict$1,
  error_conflict: error_conflict$1,
  error_title: error_title$1,
  expense: expense$1,
  faq_a1: faq_a1$2,
  faq_a2: faq_a2$2,
  faq_a3: faq_a3$2,
  faq_q1: faq_q1$2,
  faq_q2: faq_q2$2,
  faq_q3: faq_q3$2,
  faq_title: faq_title$2,
  finance_plan: finance_plan$1,
  finance_trend: finance_trend$1,
  fund_source: fund_source$1,
  greet_afternoon: greet_afternoon$1,
  greet_morning: greet_morning$1,
  greet_night: greet_night$1,
  greet_noon: greet_noon$1,
  greet_subtitle: greet_subtitle$1,
  habit_btn_add: habit_btn_add$1,
  habit_btn_cancel: habit_btn_cancel$1,
  habit_btn_copy_confirm: habit_btn_copy_confirm$1,
  habit_btn_delete_confirm: habit_btn_delete_confirm$1,
  habit_btn_new: habit_btn_new$1,
  habit_btn_save: habit_btn_save$1,
  habit_copy_desc: habit_copy_desc$1,
  habit_copy_title: habit_copy_title$1,
  habit_create_desc: habit_create_desc$1,
  habit_create_title: habit_create_title$1,
  habit_delete_confirm: habit_delete_confirm$1,
  habit_delete_desc: habit_delete_desc$1,
  habit_delete_title: habit_delete_title$1,
  habit_empty: habit_empty$1,
  habit_empty_desc: habit_empty_desc$1,
  habit_empty_title: habit_empty_title$1,
  habit_label_color: habit_label_color$1,
  habit_label_icon: habit_label_icon$1,
  habit_label_name: habit_label_name$1,
  habit_label_target: habit_label_target$1,
  habit_modal_btn_save: habit_modal_btn_save$1,
  habit_modal_color: habit_modal_color$1,
  habit_modal_icon: habit_modal_icon$1,
  habit_modal_question: habit_modal_question$1,
  habit_modal_target: habit_modal_target$1,
  habit_modal_title: habit_modal_title$1,
  habit_name: habit_name$1,
  habit_page_title: habit_page_title$1,
  habit_progress: habit_progress$1,
  habit_salin_btn: habit_salin_btn$1,
  habit_sessions: habit_sessions$1,
  habit_subtitle: habit_subtitle$1,
  habit_table_progress: habit_table_progress$1,
  habit_table_target: habit_table_target$1,
  habit_table_total: habit_table_total$1,
  habit_target: habit_target$1,
  habit_today: habit_today$1,
  header_completed: header_completed$1,
  header_done_suffix: header_done_suffix$1,
  header_pending: header_pending$1,
  header_progress: header_progress$1,
  header_title: header_title$1,
  hero_badge: hero_badge$2,
  hero_cta_primary: hero_cta_primary$2,
  hero_cta_secondary: hero_cta_secondary$2,
  hero_desc: hero_desc$2,
  hero_title_1: hero_title_1$2,
  hero_title_2: hero_title_2$2,
  hint_click_done: hint_click_done$1,
  hint_click_skip: hint_click_skip$1,
  hint_hold_skip: hint_hold_skip$1,
  hint_tap_done: hint_tap_done$1,
  icon_tooltip: icon_tooltip$1,
  income: income$1,
  insight_cold_money_hint: insight_cold_money_hint$1,
  insight_cold_money_label: insight_cold_money_label$1,
  insight_day_suffix: insight_day_suffix$1,
  insight_efficiency_label: insight_efficiency_label$1,
  insight_milestone_label: insight_milestone_label$1,
  insight_radar_title: insight_radar_title$1,
  insight_status_fast: insight_status_fast$1,
  insight_status_safe: insight_status_safe$1,
  insight_target_diff: insight_target_diff$1,
  label_activity: label_activity$1,
  label_break: label_break$1,
  label_checkins: label_checkins$1,
  label_chill: label_chill$1,
  label_consistency: label_consistency$1,
  label_daily: label_daily$1,
  label_end_time: label_end_time$1,
  label_mood_status: label_mood_status$1,
  label_mvp_habit: label_mvp_habit$1,
  label_notes: label_notes$1,
  label_now: label_now$1,
  label_period: label_period$1,
  label_priority: label_priority$1,
  label_routine: label_routine$1,
  label_start: label_start$1,
  label_start_time: label_start_time$1,
  label_todo: label_todo$1,
  label_urgent: label_urgent$1,
  label_work: label_work$1,
  last_5: last_5$1,
  legend_instruction: legend_instruction$1,
  legend_left_click: legend_left_click$1,
  legend_reset: legend_reset$1,
  legend_right_click: legend_right_click$1,
  manifesto_1_desc: manifesto_1_desc$2,
  manifesto_1_title: manifesto_1_title$2,
  manifesto_2_desc: manifesto_2_desc$2,
  manifesto_2_title: manifesto_2_title$2,
  manifesto_3_desc: manifesto_3_desc$2,
  manifesto_3_title: manifesto_3_title$2,
  manifesto_badge: manifesto_badge$2,
  manifesto_title: manifesto_title$2,
  meal_breakfast: meal_breakfast$1,
  meal_dinner: meal_dinner$1,
  meal_lunch: meal_lunch$1,
  modal_edit_simple_title: modal_edit_simple_title$1,
  modal_edit_title: modal_edit_title$1,
  modal_label_color: modal_label_color$1,
  modal_label_priority: modal_label_priority$1,
  modal_label_task_name: modal_label_task_name$1,
  modal_new_simple_title: modal_new_simple_title$1,
  modal_new_title: modal_new_title$1,
  modal_placeholder_simple_task: modal_placeholder_simple_task$1,
  modal_placeholder_task_name: modal_placeholder_task_name$1,
  modal_reset_confirm: modal_reset_confirm$1,
  modal_reset_desc: modal_reset_desc$1,
  modal_reset_title: modal_reset_title$1,
  modal_title_edit: modal_title_edit$1,
  modal_title_new: modal_title_new$1,
  month_apr: month_apr$1,
  month_aug: month_aug$1,
  month_dec: month_dec$1,
  month_feb: month_feb$1,
  month_jan: month_jan$1,
  month_jul: month_jul$1,
  month_jun: month_jun$1,
  month_mar: month_mar$1,
  month_may: month_may$1,
  month_nov: month_nov$1,
  month_oct: month_oct$1,
  month_sep: month_sep$1,
  monthly_finance_desc: monthly_finance_desc$1,
  mood_fire: mood_fire$1,
  mood_happy: mood_happy$1,
  mood_neutral: mood_neutral$1,
  mood_sad: mood_sad$1,
  mood_sick: mood_sick$1,
  mood_stress: mood_stress$1,
  mood_title: mood_title$1,
  nav_about: nav_about$2,
  nav_dashboard: nav_dashboard$2,
  nav_home: nav_home$2,
  nav_login: nav_login$2,
  nav_logout: nav_logout$1,
  nav_register: nav_register$2,
  nav_settings: nav_settings$1,
  new_budget: new_budget$1,
  no_budget: no_budget$1,
  no_fund_source: no_fund_source$1,
  no_transaction: no_transaction$1,
  old_data_hint: old_data_hint$1,
  placeholder_activity: placeholder_activity$1,
  placeholder_breakfast: placeholder_breakfast$1,
  placeholder_dinner: placeholder_dinner$1,
  placeholder_lunch: placeholder_lunch$1,
  placeholder_name: placeholder_name$1,
  placeholder_notes: placeholder_notes$1,
  planner_click_hint: planner_click_hint$1,
  planner_time_fmt: planner_time_fmt$1,
  planner_title: planner_title$1,
  prio_important: prio_important$1,
  prio_important_desc: prio_important_desc$1,
  prio_normal: prio_normal$1,
  prio_normal_desc: prio_normal_desc$1,
  prio_optional: prio_optional$1,
  prio_optional_desc: prio_optional_desc$1,
  prio_urgent: prio_urgent$1,
  prio_work: prio_work$1,
  priority_normal: priority_normal$1,
  priority_urgent: priority_urgent$1,
  priority_work: priority_work$1,
  prob_1_desc: prob_1_desc$2,
  prob_1_point_1: prob_1_point_1$2,
  prob_1_point_2: prob_1_point_2$2,
  prob_1_title: prob_1_title$2,
  prob_2_desc: prob_2_desc$2,
  prob_2_solution: prob_2_solution$2,
  prob_2_title: prob_2_title$2,
  record_transaction: record_transaction$1,
  reset_btn: reset_btn$2,
  reset_desc: reset_desc$2,
  reset_label_confirm: reset_label_confirm$2,
  reset_label_email: reset_label_email$2,
  reset_label_pass: reset_label_pass$2,
  reset_page_title: reset_page_title$2,
  reset_placeholder_pass: reset_placeholder_pass$2,
  reset_title: reset_title$2,
  save: save$1,
  saving: saving$1,
  search_result: search_result$1,
  select_hour: select_hour$1,
  select_placeholder: select_placeholder$1,
  set_budget: set_budget$1,
  sidebar_all_done_msg: sidebar_all_done_msg$1,
  sidebar_daily_focus: sidebar_daily_focus$1,
  sidebar_done_suffix: sidebar_done_suffix$1,
  sidebar_inbox_empty: sidebar_inbox_empty$1,
  sidebar_inbox_focus: sidebar_inbox_focus$1,
  sidebar_inbox_subtitle: sidebar_inbox_subtitle$1,
  sidebar_inbox_title: sidebar_inbox_title$1,
  sidebar_keep_going_msg: sidebar_keep_going_msg$1,
  sidebar_meal_title: sidebar_meal_title$1,
  sidebar_meals_title: sidebar_meals_title$1,
  sidebar_msg_complete: sidebar_msg_complete$1,
  sidebar_msg_progress: sidebar_msg_progress$1,
  sidebar_notes_placeholder: sidebar_notes_placeholder$1,
  sidebar_notes_title: sidebar_notes_title$1,
  sidebar_persistent: sidebar_persistent$1,
  sidebar_target_daily: sidebar_target_daily$1,
  sidebar_tasks_done: sidebar_tasks_done$1,
  sidebar_tasks_unit: sidebar_tasks_unit$1,
  sidebar_water_title: sidebar_water_title$1,
  sol_badge: sol_badge$2,
  sol_card_1_desc: sol_card_1_desc$2,
  sol_card_1_title: sol_card_1_title$2,
  sol_card_2_desc: sol_card_2_desc$2,
  sol_card_2_title: sol_card_2_title$2,
  sol_card_3_desc: sol_card_3_desc$2,
  sol_card_3_title: sol_card_3_title$2,
  sol_title: sol_title$2,
  stats_consistency: stats_consistency$1,
  stats_mood: stats_mood$1,
  stats_mood_desc: stats_mood_desc$1,
  stats_total_check: stats_total_check$1,
  story_1_card_1: story_1_card_1$2,
  story_1_card_2: story_1_card_2$2,
  story_1_p1: story_1_p1$2,
  story_1_p2: story_1_p2$2,
  story_1_title: story_1_title$2,
  story_2_p1: story_2_p1$2,
  story_2_p2: story_2_p2$2,
  story_2_quote: story_2_quote$2,
  story_2_title: story_2_title$2,
  success_budget_saved: success_budget_saved$1,
  success_deleted: success_deleted$1,
  success_saved: success_saved$1,
  success_transaction_saved: success_transaction_saved$1,
  task_notes: task_notes$1,
  team_connect: team_connect$2,
  team_title: team_title$2,
  timeline_now: timeline_now$1,
  timeline_title: timeline_title$1,
  today_is: today_is$1,
  total_label: total_label$1,
  total_suffix: total_suffix$1,
  transaction_count: transaction_count$1,
  user_desc: user_desc$2,
  user_name: user_name$2,
  user_role: user_role$2,
  waitlist_btn: waitlist_btn$1,
  waitlist_desc: waitlist_desc$1,
  waitlist_input_placeholder: waitlist_input_placeholder$1,
  waitlist_note: waitlist_note$1,
  waitlist_title: waitlist_title$1,
  warn_empty_amount: warn_empty_amount$1,
  warn_empty_amount_text: warn_empty_amount_text$1,
  warn_empty_budget_name: warn_empty_budget_name$1,
  warn_empty_budget_name_text: warn_empty_budget_name_text$1,
  warn_empty_category: warn_empty_category$1,
  warn_empty_category_name: warn_empty_category_name$1,
  warn_empty_category_name_text: warn_empty_category_name_text$1,
  warn_empty_time: warn_empty_time$1,
  warn_empty_title: warn_empty_title$1,
  warn_empty_title_text: warn_empty_title_text$1,
  yes_delete: yes_delete$1
}, Symbol.toStringTag, { value: "Module" }));
const nav_home$1 = "Beranda";
const nav_about$1 = "Tentang Kami";
const nav_login$1 = "Masuk";
const nav_register$1 = "Mulai Gratis";
const nav_dashboard$1 = "Dashboard";
const nav_settings = "Pengaturan Aplikasi";
const nav_logout = "Keluar";
const hero_badge$1 = "✨ v1.0: Sistem Anti-Burnout";
const hero_title_1$1 = "Satu Sistem.";
const hero_title_2$1 = "Untuk Jernihkan Pikiran.";
const hero_desc$1 = "Sistem operasi personal yang menggabungkan semua aspek hidup kamu. Fokus pada apa yang penting hari ini, lupakan mental clutter dengan OneForMind.";
const hero_cta_primary$1 = "Mulai Gratis Sekarang";
const hero_cta_secondary$1 = "Pelajari Filosofinya";
const eco_badge$1 = "THE ECOSYSTEM";
const eco_title$1 = "Apa Aja Isinya?";
const eco_desc$1 = "Gak cuma Habit. Ini adalah toolkit lengkap buat ngatur seluruh aspek hidup kamu dalam satu dashboard.";
const eco_habit_title$1 = "Habit Tracker";
const eco_habit_desc$1 = "Fitur inti. Bangun kebiasaan baru dengan sistem checklist harian. Visualisasikan streak kamu biar makin semangat.";
const eco_finance_title$1 = "Finance Flow";
const eco_finance_desc$1 = "Catat pemasukan & pengeluaran simpel. Stop bocor halus.";
const eco_daily_title$1 = "Daily Plan";
const eco_daily_desc$1 = "To-Do List hari ini aja. Fokus ke apa yang harus selesai sekarang.";
const eco_goal_title$1 = "Goal Tracker";
const eco_goal_desc$1 = "Pecah mimpi besar tahunan jadi target yang masuk akal dan bisa dieksekusi.";
const eco_journal_title$1 = "Journal";
const eco_journal_desc$1 = "Tumpahkan isi kepala kamu. Refleksi harian biar mental tetap waras.";
const eco_job_title$1 = "Job & Content Planner";
const eco_job_desc$1 = "Lacak lamaran kerja kamu (Sent, Interview, Offer) atau atur jadwal posting konten sosmed kamu.";
const eco_coming_soon$1 = "SEGERA HADIR";
const prob_1_title$1 = "Masalah: Mental Clutter";
const prob_1_desc$1 = "Terlalu banyak aplikasi bikin pikiran penuh. Tugas, keuangan, dan habit yang berantakan di mana-mana cuma jadi beban mental buat kamu.";
const prob_1_point_1$1 = "Kehilangan fokus karena sistem yang rumit.";
const prob_1_point_2$1 = "Burnout karena harus buka banyak aplikasi.";
const prob_2_title$1 = "Masalah: Otak Kamu Capek Switch App";
const prob_2_desc$1 = "Habit di HP, Keuangan di Laptop, Jurnal di Buku. Energi kamu habis cuma buat inget harus buka aplikasi yang mana.";
const prob_2_solution$1 = "OneForMind menggabungkan Habit, Finance, dan Planner dalam satu Dashboard simpel.";
const sol_badge$1 = "SOLUSI KAMI";
const sol_title$1 = "Satu Tempat. Satu Mindset.";
const sol_card_1_title$1 = "Habit Tracker";
const sol_card_1_desc$1 = "Ceklis harian tanpa ribet. Lacak progress kamu secara visual. Hijau artinya jalan, abu-abu artinya skip.";
const sol_card_2_title$1 = "Money Flow";
const sol_card_2_desc$1 = "Input pengeluaran cuma 3 detik. 'Kopi - 25k'. Selesai. Liat kemana uang kamu bocor bulan ini.";
const sol_card_3_title$1 = "The OneForMind Space";
const sol_card_3_desc$1 = "Semua fitur yang kamu butuhkan menyatu sempurna. Beri ruang bernapas untuk pikiran kamu tanpa aplikasi yang terpisah-pisah.";
const about_badge$1 = "👋 Hello, Humans.";
const about_title_1$1 = "Kami Membuat Ini Karena";
const about_title_2$1 = "Kami Lelah.";
const about_desc$1 = "Sebuah cerita jujur tentang burnout, notifikasi merah, dan pencarian kewarasan di dunia digital.";
const story_1_title$1 = "Awal Mula Kekacauan";
const story_1_p1$1 = "Dulu, HP kami penuh dengan aplikasi produktivitas. Trello buat kerja, Notion buat catat ide, Excel buat keuangan. Kami pikir itu bikin produktif.";
const story_1_p2$1 = "Kenyataannya? Kami malah jadi budak aplikasi. Kami menghabiskan lebih banyak waktu 'mengatur' sistem daripada mengerjakannya.";
const story_1_card_1$1 = "Mental Clutter";
const story_1_card_2$1 = "Notif Anxiety";
const story_2_title$1 = "Manusia Bukan Mesin";
const story_2_p1$1 = "Kami sadar ada yang salah. Aplikasi modern memaksa kita lari maraton tanpa garis finish. Kalau kamu kelewat satu task, sistem yang kaku bikin semangat langsung turun.";
const story_2_quote$1 = "Kita butuh sistem yang memaafkan (forgiving), bukan yang menghukum.";
const story_2_p2$1 = "Akhirnya kami menciptakan OneForMind. Sebuah ekosistem tenang yang menyatukan semua kebutuhan produktivitas kamu tanpa bikin overwhelm.";
const manifesto_badge$1 = "MANIFESTO KAMI";
const manifesto_title$1 = "3 Pilar Kewarasan";
const manifesto_1_title$1 = "Privacy First";
const manifesto_1_desc$1 = "Data kamu adalah urusan kamu. Kami bukan perusahaan iklan. Kami gak jual data kebiasaan kamu ke pihak ketiga.";
const manifesto_2_title$1 = "Unified System";
const manifesto_2_desc$1 = "Satu dashboard untuk semua. Kamu gak perlu lagi buka banyak aplikasi cuma untuk mencatat keuangan, habit, dan jadwal.";
const manifesto_3_title$1 = "Less is More";
const manifesto_3_desc$1 = "Anti fitur sampah. Kami cuma masukin fitur yang benar-benar kamu butuhkan buat hidup teratur. Gak ada gamification norak.";
const team_title$1 = "Dibalik Layar OneForMind";
const dev_name$1 = "The Indie Maker";
const dev_role$1 = "Tukang Kode & Desain";
const dev_desc$1 = "Dibangun sendirian (Solo Dev) karena frustasi sama aplikasi habit yang ribet. Aku coding ini buat solusi masalahku sendiri, dan semoga bisa bantu kamu juga.";
const user_name$1 = "The Early Adopters";
const user_role$1 = "Para Visioner (Kalian Semua)";
const user_desc$1 = "User pertama yang berani nyoba sistem ini. Kalian yang lapor bug jam 2 pagi dan kasih ide fitur gila. Kalian bukan cuma user, kalian adalah Co-Founders.";
const team_connect$1 = "Mau diskusi fitur atau sekedar curhat burnout?";
const cta_about_title$1 = "Udah Cukup Bacanya?";
const cta_about_desc$1 = "Waktunya berhenti scrolling dan mulai atur hidup kamu. Cuma butuh 2 menit buat setup.";
const cta_about_btn$1 = "Gabung Gratis";
const cta_about_sub$1 = "Tanpa Kartu Kredit. Batal kapan aja.";
const cta_final_title$1 = "Siap Atur Hidup Kamu?";
const cta_final_desc$1 = "Jangan tunggu nanti buat mulai jadi teratur. Mulai sekarang, kembalikan fokus kamu. Tanpa resiko.";
const cta_final_btn$1 = "Bikin Akun Gratis";
const cta_final_sub$1 = "✨ Bergabung dengan 100+ Early Adopters";
const faq_title$1 = "Yang Sering Ditanyain";
const faq_q1$1 = "Apakah datanya aman tersimpan?";
const faq_a1$1 = "Pasti dong. Semua data kamu aman tersimpan di cloud. Kamu bisa lihat kembali riwayat keuangan atau habit kamu kapan saja untuk bahan evaluasi.";
const faq_q2$1 = "Ini beneran gratis?";
const faq_a2$1 = "Yes. Fitur Habit & Finance Tracker yang kamu lihat sekarang itu GRATIS. Nanti kami rilis fitur Premium, tapi versi dasarnya tetap gratis.";
const faq_q3$1 = "Bisa dipake di HP gak?";
const faq_a3$1 = "Bisa banget! Website ini responsif. Kalau kamu buka di Chrome/Safari HP, tampilannya bakal berasa kayak aplikasi native.";
const auth_login_title$1 = "Welcome Back.";
const auth_login_subtitle$1 = "Lanjutkan progress hidup kamu.";
const auth_register_title$1 = "Mulai Fresh.";
const auth_register_subtitle$1 = "Bikin akun dalam 30 detik. Gratis.";
const auth_label_email$1 = "Email";
const auth_label_password$1 = "Password";
const auth_label_name$1 = "Nama Panggilan";
const auth_label_pass_confirm$1 = "Ulangi Password";
const auth_placeholder_email$1 = "nama@email.com";
const auth_placeholder_name$1 = "Alex";
const auth_placeholder_pass$1 = "Min. 8 karakter";
const auth_placeholder_pass_confirm$1 = "Masukkan password lagi";
const auth_forgot_pass$1 = "Lupa password?";
const auth_remember$1 = "Ingat saya";
const auth_btn_login$1 = "Masuk Dashboard";
const auth_btn_register$1 = "Daftar Sekarang";
const auth_btn_google_in$1 = "Masuk dengan Google";
const auth_btn_google_up$1 = "Daftar dengan Google";
const auth_divider$1 = "ATAU";
const auth_no_account$1 = "Belum punya akun?";
const auth_has_account$1 = "Sudah punya akun?";
const auth_link_register$1 = "Daftar sekarang";
const auth_link_login$1 = "Masuk disini";
const auth_confirm_title$1 = "Security Check.";
const auth_confirm_desc$1 = "Ini area sensitif. Tolong konfirmasi password kamu dulu sebelum lanjut biar aman.";
const auth_btn_confirm$1 = "Konfirmasi Password";
const auth_reset_title$1 = "Lupa Password?";
const auth_reset_desc$1 = "Santai, jangan panik. Masukkan email kamu di bawah, kita kirimkan link buat reset passwordnya.";
const auth_btn_reset$1 = "Kirim Link Reset";
const auth_back_login$1 = "← Kembali ke Login";
const reset_page_title$1 = "Reset Password";
const reset_title$1 = "Password Baru";
const reset_desc$1 = "Silakan buat password baru yang aman.";
const reset_label_email$1 = "Email";
const reset_label_pass$1 = "Password Baru";
const reset_label_confirm$1 = "Ulangi Password Baru";
const reset_placeholder_pass$1 = "Min. 8 karakter";
const reset_btn$1 = "Simpan Password";
const waitlist_title = "OneForMind di Saku Kamu.";
const waitlist_desc = "Kami sedang membangun aplikasi mobile untuk membantu kamu tetap produktif di mana saja. Jadilah yang pertama tahu saat kami meluncur di App Store & Play Store.";
const waitlist_input_placeholder = "Masukkan alamat email kamu...";
const waitlist_btn = "Dapatkan Akses Awal";
const waitlist_note = "Tenang, kami tidak akan mengirim spam. Hanya berita peluncuran.";
const dash_greet_morning = "Selamat Pagi";
const dash_greet_afternoon = "Selamat Siang";
const dash_greet_evening = "Selamat Sore";
const dash_greet_night = "Selamat Malam";
const dash_welcome_sub = "Siap membuat progres 1% lebih baik hari ini? Kelola habit, jadwal, dan keuanganmu di satu tempat.";
const dash_habit_desc = "Pantau kebiasaan harianmu dan bangun konsistensi jangka panjang.";
const dash_planner_desc = "Susun tugas harianmu agar tetap fokus dan produktif setiap saat.";
const dash_finance_desc = "Catat pengeluaran dan pemasukan untuk menjaga kesehatan finansialmu.";
const dash_open_module = "Buka Modul";
const dash_status_label = "Status Akun";
const today_is = "Hari Ini";
const greet_morning = "Selamat Pagi";
const greet_noon = "Selamat Siang";
const greet_afternoon = "Selamat Sore";
const greet_night = "Selamat Malam";
const greet_subtitle = "Fokus satu hari aja. Besok urusan besok.";
const habit_page_title = "Habit Tracker";
const habit_subtitle = "Bangun konsistensi, pelan tapi pasti.";
const habit_name = "Nama Habit";
const habit_progress = "Progress Bulan Ini";
const habit_target = "Target";
const habit_sessions = "Sesi";
const habit_today = "Hari Ini";
const habit_empty = "Belum ada habit aktif. Tambah satu yuk!";
const habit_btn_add = "Tambah Habit Baru";
const habit_btn_new = "Habit Baru";
const habit_create_title = "Habit Baru";
const habit_create_desc = "Mau rutin ngapain bulan ini?";
const habit_label_name = "Nama Kebiasaan";
const habit_label_icon = "Ikon (Emoji)";
const habit_label_target = "Target (Kali/Bulan)";
const habit_label_color = "Warna Tema";
const habit_btn_save = "Simpan Habit";
const habit_modal_title = "Habit Baru";
const habit_modal_question = "Mau rutin ngapain?";
const habit_modal_icon = "Pilih Ikon";
const habit_modal_color = "Warna";
const habit_modal_target = "Target";
const habit_modal_btn_save = "Mulai Kebiasaan";
const habit_table_target = "Target";
const habit_table_total = "Total";
const habit_table_progress = "Progress";
const stats_consistency = "Rata-rata Konsistensi";
const stats_total_check = "Total Checklist";
const stats_mood = "Mood Tracker";
const stats_mood_desc = "On Fire!";
const habit_empty_title = "Mulai Bersih";
const habit_empty_desc = "Belum ada habit bulan ini.";
const habit_delete_title = "Hapus Habit Ini?";
const habit_delete_desc = "Yakin mau menghapus habit";
const habit_btn_delete_confirm = "Ya, Hapus!";
const habit_delete_confirm = "Yakin mau hapus habit ini?";
const habit_btn_cancel = "Batal";
const habit_copy_title = "Salin Kebiasaan";
const habit_copy_desc = "Kamu yakin ingin menyalin semua kebiasaan dari bulan lalu ke bulan ini? Progres centang akan di-reset.";
const habit_btn_copy_confirm = "Ya, Salin Sekarang";
const habit_salin_btn = "Salin Dari Bulan Lalu";
const mood_title = "Mood Kamu";
const mood_fire = "Semangat Membara!";
const mood_happy = "Bahagia";
const mood_neutral = "Biasa Aja";
const mood_sad = "Sedih";
const mood_stress = "Stres Berat";
const mood_sick = "Lagi Sakit";
const legend_instruction = "Cara Pakai:";
const legend_left_click = "Klik Kiri: Selesai";
const legend_right_click = "Klik Kanan: Skip";
const legend_reset = "Klik Lagi: Hapus";
const label_period = "Periode";
const label_daily = "Harian";
const btn_add_habit = "Habit";
const hint_click_done = "Klik Kiri: Selesai";
const hint_click_skip = "Klik Kanan: Lewati";
const hint_tap_done = "Pencet Sekali: Selesai";
const hint_hold_skip = "Pencet Lama: Lewati";
const label_consistency = "Konsistensi";
const label_mvp_habit = "Habit Terbaik";
const label_checkins = "Check-in";
const label_mood_status = "Status Mood";
const planner_title = "Jadwal Harian";
const planner_time_fmt = "WIB";
const planner_click_hint = "Klik untuk tambah jadwal";
const timeline_title = "Jadwal Harian";
const timeline_now = "SEKARANG";
const header_title = "Daily Planner";
const header_progress = "Progress";
const header_done_suffix = "Selesai";
const header_completed = "Selesai";
const header_pending = "Pending";
const sidebar_daily_focus = "Fokus Hari Ini";
const sidebar_target_daily = "Target Harian";
const sidebar_tasks_done = "Tugas Selesai";
const sidebar_tasks_unit = "Tugas";
const sidebar_done_suffix = "Selesai";
const sidebar_all_done_msg = "Luar biasa! Semua beres! 🎉";
const sidebar_keep_going_msg = "Ayo, selesaikan sisanya! 💪";
const sidebar_msg_complete = "Luar biasa! Semua tuntas 🚀";
const sidebar_msg_progress = "Ayo gas terus, kamu bisa! 🔥";
const sidebar_inbox_title = "Kotak Masuk";
const sidebar_inbox_focus = "STATUS INBOX";
const sidebar_inbox_empty = "Belum ada tugas antre.";
const sidebar_inbox_subtitle = "Drag ke timeline untuk jadwal";
const sidebar_meals_title = "Menu Makan";
const sidebar_meal_title = "MENU MAKAN";
const sidebar_notes_title = "Catatan Cepat";
const sidebar_notes_placeholder = "Tulis ide dadakan disini...";
const task_notes = "Catatan";
const meal_breakfast = "Sarapan...";
const meal_lunch = "Makan Siang...";
const meal_dinner = "Makan Malam...";
const placeholder_breakfast = "Sarapan apa?";
const placeholder_lunch = "Makan Siang...";
const placeholder_dinner = "Makan Malam...";
const cat_work = "Kerjaan";
const cat_life = "Pribadi";
const cat_urgent = "Penting";
const cat_other = "Lainnya";
const label_urgent = "PENTING";
const label_routine = "RUTIN";
const label_chill = "SANTAI";
const label_todo = "TODO";
const label_work = "KERJA";
const label_break = "ISTIRAHAT";
const prio_important = "Penting Banget";
const prio_important_desc = "Harus selesai, jangan ditunda.";
const prio_normal = "Normal";
const prio_normal_desc = "Kerjakan sesuai alur biasa.";
const prio_optional = "Opsional";
const prio_optional_desc = "Kalau ada waktu sisa aja.";
const priority_work = "💼 Opsional";
const priority_normal = "🧘 Normal";
const priority_urgent = "🔥 Prioritas";
const modal_new_title = "Tugas Baru";
const modal_new_simple_title = "Tugas Baru";
const modal_title_new = "✨ Rencana Baru";
const modal_edit_title = "Edit Tugas";
const modal_edit_simple_title = "Edit Tugas";
const modal_title_edit = "✏️ Edit Rencana";
const modal_label_task_name = "Apa tugasnya?";
const modal_placeholder_task_name = "Contoh: Beli Kopi...";
const modal_placeholder_simple_task = "Mau ngerjain apa?";
const modal_label_color = "Kategori";
const modal_label_priority = "PRIORITAS";
const modal_reset_title = "Reset Jadwal Hari Ini?";
const modal_reset_desc = "Yakin mau hapus semua tugas hari ini dan mulai dari awal?";
const modal_reset_confirm = "Ya, Reset Sekarang";
const label_activity = "Nama Kegiatan";
const label_start_time = "Jam Mulai";
const label_end_time = "Jam Selesai (Opsional)";
const label_priority = "Prioritas / Kategori";
const label_notes = "Catatan / Notes";
const placeholder_notes = "Detail tambahan...";
const error_conflict = "⛔ Pilih jam yang kosong ya!";
const icon_tooltip = "Ikon Prioritas";
const batch_mode_title = "Mode Entri Massal";
const btn_single_mode = "Satuan";
const col_activity = "Nama Aktivitas";
const col_start = "Mulai";
const col_end = "Selesai";
const col_priority = "Prioritas";
const prio_urgent = "🔥 Mendesak";
const prio_work = "⚡ Kerja";
const btn_add_another = "Tambah Task Lain";
const total_label = "Total:";
const total_suffix = "task";
const btn_saving = "Menyimpan...";
const btn_save_all = "💾 Simpan Semua";
const sidebar_persistent = "Tersimpan Otomatis";
const sidebar_water_title = "HIDRASI";
const delete_activity_title = "Hapus Aktivitas?";
const delete_activity_desc = "Yakin mau hapus aktivitas ini? Tindakan ini tidak bisa dibatalkan.";
const default_activity_name = "aktivitas ini";
const label_start = "MULAI";
const btn_add_timeline = "TAMBAH";
const label_now = "SEKARANG";
const select_hour = "Pilih Jam";
const record_transaction = "Catat Transaksi";
const expense = "Pengeluaran";
const income = "Pemasukan";
const description = "Keterangan";
const desc_placeholder = "Beli apa / Dari mana...";
const amount = "Nominal";
const amount_placeholder = "0";
const category = "Kategori";
const select_placeholder = "Pilih...";
const create_budget_first = "Buat budget dulu!";
const placeholder_activity = "Misal: Jajan, Gaji, Transport";
const date = "Tanggal";
const daily_detail = "Detail Harian";
const edit = "Edit";
const cancel = "Batal";
const save = "Simpan";
const saving = "Menyimpan...";
const budget_target = "Target Budget";
const set_budget = "Atur";
const no_budget = "Belum ada budget.";
const fund_source = "Sumber Dana";
const add_category = "Kategori";
const no_fund_source = "Belum ada sumber dana.";
const active = "Aktif";
const empty = "Kosong";
const edit_budget = "Edit Budget";
const new_budget = "Budget Baru";
const category_name = "Nama Kategori";
const budget_limit = "Batas Budget";
const budget_warning = "Mengubah nama akan merubah data di riwayat transaksi juga.";
const placeholder_name = "Misal: Jajan / Gaji";
const edit_source = "Edit Sumber Dana";
const add_source = "Tambah Sumber Dana";
const delete_confirm_title = "Hapus Data?";
const delete_confirm_msg = "Data ini akan dihapus permanen.";
const yes_delete = "Ya, Hapus!";
const success_saved = "Berhasil disimpan!";
const success_deleted = "Berhasil dihapus!";
const error_title = "Gagal";
const date_format = "dddd, D MMMM YYYY";
const finance_trend = "Trend Keuangan";
const daily_chart = "Grafik Harian";
const finance_plan = "Finance Plan";
const btn_transaction = "Transaksi";
const month_jan = "Januari";
const month_feb = "Februari";
const month_mar = "Maret";
const month_apr = "April";
const month_may = "Mei";
const month_jun = "Juni";
const month_jul = "Juli";
const month_aug = "Agustus";
const month_sep = "September";
const month_oct = "Oktober";
const month_nov = "November";
const month_dec = "Desember";
const err_min_15_mins = "Minimal 15 menit!";
const err_schedule_conflict = "Jadwal bentrok!";
const warn_empty_time = "Tentukan jam mulai & selesai!";
const err_save_failed = "Gagal menyimpan ke server!";
const err_delete_failed = "Gagal menghapus data!";
const available_balance = "Sisa Saldo Tersedia";
const monthly_finance_desc = "Keuanganmu bulan ini";
const base_capital = "Base / Modal";
const daily_history = "Riwayat Harian";
const last_5 = "4 Terakhir";
const search_result = "Hasil Pencarian";
const no_transaction = "Belum ada transaksi di bulan ini";
const daily_net = "Net Harian";
const old_data_hint = "Gunakan filter tanggal untuk melihat data lama";
const transaction_count = ":count Transaksi";
const date_filter = "Filter Tanggal";
const warn_empty_category_name = "Nama Kosong";
const warn_empty_category_name_text = "Kasih nama dulu buat kategorinya ya.";
const warn_empty_category = "Pilih kategori terlebih dahulu!";
const insight_radar_title = "Burn Rate Radar";
const insight_day_suffix = "hari";
const insight_status_fast = "🏃‍♂️ Lu belanja terlalu kencang!";
const insight_status_safe = "🚶‍♂️ Kecepatan belanja aman.";
const insight_efficiency_label = "Efisiensi";
const insight_target_diff = "dari target harian";
const insight_cold_money_label = "Uang Dingin (Net)";
const insight_milestone_label = "Progress Milestone";
const insight_cold_money_hint = "*Gunakan amunisi ini pas chart saham lu udah mantul dari support bro!";
const btn_add = "Tambah";
const btn_save = "Simpan";
const btn_update = "Perbarui";
const btn_delete = "Hapus";
const btn_cancel = "Batal";
const btn_add_task = "Simpan Tugas";
const btn_add_task_short = "Task";
const btn_add_schedule = "Tambah Jadwal";
const btn_create = "Buat Jadwal";
const btn_reset = "Reset";
const btn_reset_tooltip = "Hapus semua task hari ini";
const btn_confirm_reset = "Ya";
const confirm_delete_title = "Yakin hapus?";
const confirm_delete_text = "Data tidak bisa dikembalikan!";
const btn_yes_delete = "Ya, Hapus!";
const warn_empty_title = "Judul Kosong";
const warn_empty_title_text = "Kasih nama transaksinya dulu ya.";
const warn_empty_amount = "Nominal Kosong";
const warn_empty_amount_text = "Berapa duit nih?";
const warn_empty_budget_name = "Nama Budget?";
const warn_empty_budget_name_text = "Isi dulu nama budgetnya.";
const success_transaction_saved = "Transaksi tersimpan";
const success_budget_saved = "Budget disimpan";
const delete_trx_title = "Hapus Transaksi?";
const delete_trx_text = "Hilang selamanya nih.";
const delete_budget_title = "Hapus Budget?";
const delete_budget_text = "Riwayat transaksi tetap ada, tapi target dihapus.";
const id = {
  "____ SECTION_1 ____": "=== NAVIGASI & GLOBAL ===",
  nav_home: nav_home$1,
  nav_about: nav_about$1,
  nav_login: nav_login$1,
  nav_register: nav_register$1,
  nav_dashboard: nav_dashboard$1,
  nav_settings,
  nav_logout,
  "____ SECTION_2 ____": "=== TAMPILAN SEBELUM LOGIN (LANDING PAGE) ===",
  hero_badge: hero_badge$1,
  hero_title_1: hero_title_1$1,
  hero_title_2: hero_title_2$1,
  hero_desc: hero_desc$1,
  hero_cta_primary: hero_cta_primary$1,
  hero_cta_secondary: hero_cta_secondary$1,
  eco_badge: eco_badge$1,
  eco_title: eco_title$1,
  eco_desc: eco_desc$1,
  eco_habit_title: eco_habit_title$1,
  eco_habit_desc: eco_habit_desc$1,
  eco_finance_title: eco_finance_title$1,
  eco_finance_desc: eco_finance_desc$1,
  eco_daily_title: eco_daily_title$1,
  eco_daily_desc: eco_daily_desc$1,
  eco_goal_title: eco_goal_title$1,
  eco_goal_desc: eco_goal_desc$1,
  eco_journal_title: eco_journal_title$1,
  eco_journal_desc: eco_journal_desc$1,
  eco_job_title: eco_job_title$1,
  eco_job_desc: eco_job_desc$1,
  eco_coming_soon: eco_coming_soon$1,
  prob_1_title: prob_1_title$1,
  prob_1_desc: prob_1_desc$1,
  prob_1_point_1: prob_1_point_1$1,
  prob_1_point_2: prob_1_point_2$1,
  prob_2_title: prob_2_title$1,
  prob_2_desc: prob_2_desc$1,
  prob_2_solution: prob_2_solution$1,
  sol_badge: sol_badge$1,
  sol_title: sol_title$1,
  sol_card_1_title: sol_card_1_title$1,
  sol_card_1_desc: sol_card_1_desc$1,
  sol_card_2_title: sol_card_2_title$1,
  sol_card_2_desc: sol_card_2_desc$1,
  sol_card_3_title: sol_card_3_title$1,
  sol_card_3_desc: sol_card_3_desc$1,
  about_badge: about_badge$1,
  about_title_1: about_title_1$1,
  about_title_2: about_title_2$1,
  about_desc: about_desc$1,
  story_1_title: story_1_title$1,
  story_1_p1: story_1_p1$1,
  story_1_p2: story_1_p2$1,
  story_1_card_1: story_1_card_1$1,
  story_1_card_2: story_1_card_2$1,
  story_2_title: story_2_title$1,
  story_2_p1: story_2_p1$1,
  story_2_quote: story_2_quote$1,
  story_2_p2: story_2_p2$1,
  manifesto_badge: manifesto_badge$1,
  manifesto_title: manifesto_title$1,
  manifesto_1_title: manifesto_1_title$1,
  manifesto_1_desc: manifesto_1_desc$1,
  manifesto_2_title: manifesto_2_title$1,
  manifesto_2_desc: manifesto_2_desc$1,
  manifesto_3_title: manifesto_3_title$1,
  manifesto_3_desc: manifesto_3_desc$1,
  team_title: team_title$1,
  dev_name: dev_name$1,
  dev_role: dev_role$1,
  dev_desc: dev_desc$1,
  user_name: user_name$1,
  user_role: user_role$1,
  user_desc: user_desc$1,
  team_connect: team_connect$1,
  cta_about_title: cta_about_title$1,
  cta_about_desc: cta_about_desc$1,
  cta_about_btn: cta_about_btn$1,
  cta_about_sub: cta_about_sub$1,
  cta_final_title: cta_final_title$1,
  cta_final_desc: cta_final_desc$1,
  cta_final_btn: cta_final_btn$1,
  cta_final_sub: cta_final_sub$1,
  faq_title: faq_title$1,
  faq_q1: faq_q1$1,
  faq_a1: faq_a1$1,
  faq_q2: faq_q2$1,
  faq_a2: faq_a2$1,
  faq_q3: faq_q3$1,
  faq_a3: faq_a3$1,
  "____ SECTION_3 ____": "=== OTENTIKASI (LOGIN & REGISTER) ===",
  auth_login_title: auth_login_title$1,
  auth_login_subtitle: auth_login_subtitle$1,
  auth_register_title: auth_register_title$1,
  auth_register_subtitle: auth_register_subtitle$1,
  auth_label_email: auth_label_email$1,
  auth_label_password: auth_label_password$1,
  auth_label_name: auth_label_name$1,
  auth_label_pass_confirm: auth_label_pass_confirm$1,
  auth_placeholder_email: auth_placeholder_email$1,
  auth_placeholder_name: auth_placeholder_name$1,
  auth_placeholder_pass: auth_placeholder_pass$1,
  auth_placeholder_pass_confirm: auth_placeholder_pass_confirm$1,
  auth_forgot_pass: auth_forgot_pass$1,
  auth_remember: auth_remember$1,
  auth_btn_login: auth_btn_login$1,
  auth_btn_register: auth_btn_register$1,
  auth_btn_google_in: auth_btn_google_in$1,
  auth_btn_google_up: auth_btn_google_up$1,
  auth_divider: auth_divider$1,
  auth_no_account: auth_no_account$1,
  auth_has_account: auth_has_account$1,
  auth_link_register: auth_link_register$1,
  auth_link_login: auth_link_login$1,
  auth_confirm_title: auth_confirm_title$1,
  auth_confirm_desc: auth_confirm_desc$1,
  auth_btn_confirm: auth_btn_confirm$1,
  auth_reset_title: auth_reset_title$1,
  auth_reset_desc: auth_reset_desc$1,
  auth_btn_reset: auth_btn_reset$1,
  auth_back_login: auth_back_login$1,
  reset_page_title: reset_page_title$1,
  reset_title: reset_title$1,
  reset_desc: reset_desc$1,
  reset_label_email: reset_label_email$1,
  reset_label_pass: reset_label_pass$1,
  reset_label_confirm: reset_label_confirm$1,
  reset_placeholder_pass: reset_placeholder_pass$1,
  reset_btn: reset_btn$1,
  waitlist_title,
  waitlist_desc,
  waitlist_input_placeholder,
  waitlist_btn,
  waitlist_note,
  "____ SECTION_4 ____": "=== DASHBOARD GENERAL ===",
  dash_greet_morning,
  dash_greet_afternoon,
  dash_greet_evening,
  dash_greet_night,
  dash_welcome_sub,
  dash_habit_desc,
  dash_planner_desc,
  dash_finance_desc,
  dash_open_module,
  dash_status_label,
  today_is,
  greet_morning,
  greet_noon,
  greet_afternoon,
  greet_night,
  greet_subtitle,
  "____ SECTION_5 ____": "=== HABIT TRACKER ===",
  habit_page_title,
  habit_subtitle,
  habit_name,
  habit_progress,
  habit_target,
  habit_sessions,
  habit_today,
  habit_empty,
  habit_btn_add,
  habit_btn_new,
  habit_create_title,
  habit_create_desc,
  habit_label_name,
  habit_label_icon,
  habit_label_target,
  habit_label_color,
  habit_btn_save,
  habit_modal_title,
  habit_modal_question,
  habit_modal_icon,
  habit_modal_color,
  habit_modal_target,
  habit_modal_btn_save,
  habit_table_target,
  habit_table_total,
  habit_table_progress,
  stats_consistency,
  stats_total_check,
  stats_mood,
  stats_mood_desc,
  habit_empty_title,
  habit_empty_desc,
  habit_delete_title,
  habit_delete_desc,
  habit_btn_delete_confirm,
  habit_delete_confirm,
  habit_btn_cancel,
  habit_copy_title,
  habit_copy_desc,
  habit_btn_copy_confirm,
  habit_salin_btn,
  mood_title,
  mood_fire,
  mood_happy,
  mood_neutral,
  mood_sad,
  mood_stress,
  mood_sick,
  legend_instruction,
  legend_left_click,
  legend_right_click,
  legend_reset,
  label_period,
  label_daily,
  btn_add_habit,
  hint_click_done,
  hint_click_skip,
  hint_tap_done,
  hint_hold_skip,
  label_consistency,
  label_mvp_habit,
  label_checkins,
  label_mood_status,
  "____ SECTION_6 ____": "=== DAILY PLANNER ===",
  planner_title,
  planner_time_fmt,
  planner_click_hint,
  timeline_title,
  timeline_now,
  header_title,
  header_progress,
  header_done_suffix,
  header_completed,
  header_pending,
  sidebar_daily_focus,
  sidebar_target_daily,
  sidebar_tasks_done,
  sidebar_tasks_unit,
  sidebar_done_suffix,
  sidebar_all_done_msg,
  sidebar_keep_going_msg,
  sidebar_msg_complete,
  sidebar_msg_progress,
  sidebar_inbox_title,
  sidebar_inbox_focus,
  sidebar_inbox_empty,
  sidebar_inbox_subtitle,
  sidebar_meals_title,
  sidebar_meal_title,
  sidebar_notes_title,
  sidebar_notes_placeholder,
  task_notes,
  meal_breakfast,
  meal_lunch,
  meal_dinner,
  placeholder_breakfast,
  placeholder_lunch,
  placeholder_dinner,
  cat_work,
  cat_life,
  cat_urgent,
  cat_other,
  label_urgent,
  label_routine,
  label_chill,
  label_todo,
  label_work,
  label_break,
  prio_important,
  prio_important_desc,
  prio_normal,
  prio_normal_desc,
  prio_optional,
  prio_optional_desc,
  priority_work,
  priority_normal,
  priority_urgent,
  modal_new_title,
  modal_new_simple_title,
  modal_title_new,
  modal_edit_title,
  modal_edit_simple_title,
  modal_title_edit,
  modal_label_task_name,
  modal_placeholder_task_name,
  modal_placeholder_simple_task,
  modal_label_color,
  modal_label_priority,
  modal_reset_title,
  modal_reset_desc,
  modal_reset_confirm,
  label_activity,
  label_start_time,
  label_end_time,
  label_priority,
  label_notes,
  placeholder_notes,
  error_conflict,
  icon_tooltip,
  batch_mode_title,
  btn_single_mode,
  col_activity,
  col_start,
  col_end,
  col_priority,
  prio_urgent,
  prio_work,
  btn_add_another,
  total_label,
  total_suffix,
  btn_saving,
  btn_save_all,
  sidebar_persistent,
  sidebar_water_title,
  delete_activity_title,
  delete_activity_desc,
  default_activity_name,
  label_start,
  btn_add_timeline,
  label_now,
  select_hour,
  "____ SECTION_7 ____": "=== FINANCE TRACKER ===",
  record_transaction,
  expense,
  income,
  description,
  desc_placeholder,
  amount,
  amount_placeholder,
  category,
  select_placeholder,
  create_budget_first,
  placeholder_activity,
  date,
  daily_detail,
  edit,
  "delete": "Hapus",
  cancel,
  save,
  saving,
  budget_target,
  set_budget,
  no_budget,
  fund_source,
  add_category,
  no_fund_source,
  active,
  empty,
  edit_budget,
  new_budget,
  category_name,
  budget_limit,
  budget_warning,
  placeholder_name,
  edit_source,
  add_source,
  delete_confirm_title,
  delete_confirm_msg,
  yes_delete,
  success_saved,
  success_deleted,
  error_title,
  date_format,
  finance_trend,
  daily_chart,
  finance_plan,
  btn_transaction,
  month_jan,
  month_feb,
  month_mar,
  month_apr,
  month_may,
  month_jun,
  month_jul,
  month_aug,
  month_sep,
  month_oct,
  month_nov,
  month_dec,
  err_min_15_mins,
  err_schedule_conflict,
  warn_empty_time,
  err_save_failed,
  err_delete_failed,
  available_balance,
  monthly_finance_desc,
  base_capital,
  daily_history,
  last_5,
  search_result,
  no_transaction,
  daily_net,
  old_data_hint,
  transaction_count,
  date_filter,
  warn_empty_category_name,
  warn_empty_category_name_text,
  warn_empty_category,
  insight_radar_title,
  insight_day_suffix,
  insight_status_fast,
  insight_status_safe,
  insight_efficiency_label,
  insight_target_diff,
  insight_cold_money_label,
  insight_milestone_label,
  insight_cold_money_hint,
  "____ SECTION_8 ____": "=== TOMBOL & LABEL UMUM ===",
  btn_add,
  btn_save,
  btn_update,
  btn_delete,
  btn_cancel,
  btn_add_task,
  btn_add_task_short,
  btn_add_schedule,
  btn_create,
  btn_reset,
  btn_reset_tooltip,
  btn_confirm_reset,
  confirm_delete_title,
  confirm_delete_text,
  btn_yes_delete,
  warn_empty_title,
  warn_empty_title_text,
  warn_empty_amount,
  warn_empty_amount_text,
  warn_empty_budget_name,
  warn_empty_budget_name_text,
  success_transaction_saved,
  success_budget_saved,
  delete_trx_title,
  delete_trx_text,
  delete_budget_title,
  delete_budget_text
};
const __vite_glob_1_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  about_badge: about_badge$1,
  about_desc: about_desc$1,
  about_title_1: about_title_1$1,
  about_title_2: about_title_2$1,
  active,
  add_category,
  add_source,
  amount,
  amount_placeholder,
  auth_back_login: auth_back_login$1,
  auth_btn_confirm: auth_btn_confirm$1,
  auth_btn_google_in: auth_btn_google_in$1,
  auth_btn_google_up: auth_btn_google_up$1,
  auth_btn_login: auth_btn_login$1,
  auth_btn_register: auth_btn_register$1,
  auth_btn_reset: auth_btn_reset$1,
  auth_confirm_desc: auth_confirm_desc$1,
  auth_confirm_title: auth_confirm_title$1,
  auth_divider: auth_divider$1,
  auth_forgot_pass: auth_forgot_pass$1,
  auth_has_account: auth_has_account$1,
  auth_label_email: auth_label_email$1,
  auth_label_name: auth_label_name$1,
  auth_label_pass_confirm: auth_label_pass_confirm$1,
  auth_label_password: auth_label_password$1,
  auth_link_login: auth_link_login$1,
  auth_link_register: auth_link_register$1,
  auth_login_subtitle: auth_login_subtitle$1,
  auth_login_title: auth_login_title$1,
  auth_no_account: auth_no_account$1,
  auth_placeholder_email: auth_placeholder_email$1,
  auth_placeholder_name: auth_placeholder_name$1,
  auth_placeholder_pass: auth_placeholder_pass$1,
  auth_placeholder_pass_confirm: auth_placeholder_pass_confirm$1,
  auth_register_subtitle: auth_register_subtitle$1,
  auth_register_title: auth_register_title$1,
  auth_remember: auth_remember$1,
  auth_reset_desc: auth_reset_desc$1,
  auth_reset_title: auth_reset_title$1,
  available_balance,
  base_capital,
  batch_mode_title,
  btn_add,
  btn_add_another,
  btn_add_habit,
  btn_add_schedule,
  btn_add_task,
  btn_add_task_short,
  btn_add_timeline,
  btn_cancel,
  btn_confirm_reset,
  btn_create,
  btn_delete,
  btn_reset,
  btn_reset_tooltip,
  btn_save,
  btn_save_all,
  btn_saving,
  btn_single_mode,
  btn_transaction,
  btn_update,
  btn_yes_delete,
  budget_limit,
  budget_target,
  budget_warning,
  cancel,
  cat_life,
  cat_other,
  cat_urgent,
  cat_work,
  category,
  category_name,
  col_activity,
  col_end,
  col_priority,
  col_start,
  confirm_delete_text,
  confirm_delete_title,
  create_budget_first,
  cta_about_btn: cta_about_btn$1,
  cta_about_desc: cta_about_desc$1,
  cta_about_sub: cta_about_sub$1,
  cta_about_title: cta_about_title$1,
  cta_final_btn: cta_final_btn$1,
  cta_final_desc: cta_final_desc$1,
  cta_final_sub: cta_final_sub$1,
  cta_final_title: cta_final_title$1,
  daily_chart,
  daily_detail,
  daily_history,
  daily_net,
  dash_finance_desc,
  dash_greet_afternoon,
  dash_greet_evening,
  dash_greet_morning,
  dash_greet_night,
  dash_habit_desc,
  dash_open_module,
  dash_planner_desc,
  dash_status_label,
  dash_welcome_sub,
  date,
  date_filter,
  date_format,
  default: id,
  default_activity_name,
  delete_activity_desc,
  delete_activity_title,
  delete_budget_text,
  delete_budget_title,
  delete_confirm_msg,
  delete_confirm_title,
  delete_trx_text,
  delete_trx_title,
  desc_placeholder,
  description,
  dev_desc: dev_desc$1,
  dev_name: dev_name$1,
  dev_role: dev_role$1,
  eco_badge: eco_badge$1,
  eco_coming_soon: eco_coming_soon$1,
  eco_daily_desc: eco_daily_desc$1,
  eco_daily_title: eco_daily_title$1,
  eco_desc: eco_desc$1,
  eco_finance_desc: eco_finance_desc$1,
  eco_finance_title: eco_finance_title$1,
  eco_goal_desc: eco_goal_desc$1,
  eco_goal_title: eco_goal_title$1,
  eco_habit_desc: eco_habit_desc$1,
  eco_habit_title: eco_habit_title$1,
  eco_job_desc: eco_job_desc$1,
  eco_job_title: eco_job_title$1,
  eco_journal_desc: eco_journal_desc$1,
  eco_journal_title: eco_journal_title$1,
  eco_title: eco_title$1,
  edit,
  edit_budget,
  edit_source,
  empty,
  err_delete_failed,
  err_min_15_mins,
  err_save_failed,
  err_schedule_conflict,
  error_conflict,
  error_title,
  expense,
  faq_a1: faq_a1$1,
  faq_a2: faq_a2$1,
  faq_a3: faq_a3$1,
  faq_q1: faq_q1$1,
  faq_q2: faq_q2$1,
  faq_q3: faq_q3$1,
  faq_title: faq_title$1,
  finance_plan,
  finance_trend,
  fund_source,
  greet_afternoon,
  greet_morning,
  greet_night,
  greet_noon,
  greet_subtitle,
  habit_btn_add,
  habit_btn_cancel,
  habit_btn_copy_confirm,
  habit_btn_delete_confirm,
  habit_btn_new,
  habit_btn_save,
  habit_copy_desc,
  habit_copy_title,
  habit_create_desc,
  habit_create_title,
  habit_delete_confirm,
  habit_delete_desc,
  habit_delete_title,
  habit_empty,
  habit_empty_desc,
  habit_empty_title,
  habit_label_color,
  habit_label_icon,
  habit_label_name,
  habit_label_target,
  habit_modal_btn_save,
  habit_modal_color,
  habit_modal_icon,
  habit_modal_question,
  habit_modal_target,
  habit_modal_title,
  habit_name,
  habit_page_title,
  habit_progress,
  habit_salin_btn,
  habit_sessions,
  habit_subtitle,
  habit_table_progress,
  habit_table_target,
  habit_table_total,
  habit_target,
  habit_today,
  header_completed,
  header_done_suffix,
  header_pending,
  header_progress,
  header_title,
  hero_badge: hero_badge$1,
  hero_cta_primary: hero_cta_primary$1,
  hero_cta_secondary: hero_cta_secondary$1,
  hero_desc: hero_desc$1,
  hero_title_1: hero_title_1$1,
  hero_title_2: hero_title_2$1,
  hint_click_done,
  hint_click_skip,
  hint_hold_skip,
  hint_tap_done,
  icon_tooltip,
  income,
  insight_cold_money_hint,
  insight_cold_money_label,
  insight_day_suffix,
  insight_efficiency_label,
  insight_milestone_label,
  insight_radar_title,
  insight_status_fast,
  insight_status_safe,
  insight_target_diff,
  label_activity,
  label_break,
  label_checkins,
  label_chill,
  label_consistency,
  label_daily,
  label_end_time,
  label_mood_status,
  label_mvp_habit,
  label_notes,
  label_now,
  label_period,
  label_priority,
  label_routine,
  label_start,
  label_start_time,
  label_todo,
  label_urgent,
  label_work,
  last_5,
  legend_instruction,
  legend_left_click,
  legend_reset,
  legend_right_click,
  manifesto_1_desc: manifesto_1_desc$1,
  manifesto_1_title: manifesto_1_title$1,
  manifesto_2_desc: manifesto_2_desc$1,
  manifesto_2_title: manifesto_2_title$1,
  manifesto_3_desc: manifesto_3_desc$1,
  manifesto_3_title: manifesto_3_title$1,
  manifesto_badge: manifesto_badge$1,
  manifesto_title: manifesto_title$1,
  meal_breakfast,
  meal_dinner,
  meal_lunch,
  modal_edit_simple_title,
  modal_edit_title,
  modal_label_color,
  modal_label_priority,
  modal_label_task_name,
  modal_new_simple_title,
  modal_new_title,
  modal_placeholder_simple_task,
  modal_placeholder_task_name,
  modal_reset_confirm,
  modal_reset_desc,
  modal_reset_title,
  modal_title_edit,
  modal_title_new,
  month_apr,
  month_aug,
  month_dec,
  month_feb,
  month_jan,
  month_jul,
  month_jun,
  month_mar,
  month_may,
  month_nov,
  month_oct,
  month_sep,
  monthly_finance_desc,
  mood_fire,
  mood_happy,
  mood_neutral,
  mood_sad,
  mood_sick,
  mood_stress,
  mood_title,
  nav_about: nav_about$1,
  nav_dashboard: nav_dashboard$1,
  nav_home: nav_home$1,
  nav_login: nav_login$1,
  nav_logout,
  nav_register: nav_register$1,
  nav_settings,
  new_budget,
  no_budget,
  no_fund_source,
  no_transaction,
  old_data_hint,
  placeholder_activity,
  placeholder_breakfast,
  placeholder_dinner,
  placeholder_lunch,
  placeholder_name,
  placeholder_notes,
  planner_click_hint,
  planner_time_fmt,
  planner_title,
  prio_important,
  prio_important_desc,
  prio_normal,
  prio_normal_desc,
  prio_optional,
  prio_optional_desc,
  prio_urgent,
  prio_work,
  priority_normal,
  priority_urgent,
  priority_work,
  prob_1_desc: prob_1_desc$1,
  prob_1_point_1: prob_1_point_1$1,
  prob_1_point_2: prob_1_point_2$1,
  prob_1_title: prob_1_title$1,
  prob_2_desc: prob_2_desc$1,
  prob_2_solution: prob_2_solution$1,
  prob_2_title: prob_2_title$1,
  record_transaction,
  reset_btn: reset_btn$1,
  reset_desc: reset_desc$1,
  reset_label_confirm: reset_label_confirm$1,
  reset_label_email: reset_label_email$1,
  reset_label_pass: reset_label_pass$1,
  reset_page_title: reset_page_title$1,
  reset_placeholder_pass: reset_placeholder_pass$1,
  reset_title: reset_title$1,
  save,
  saving,
  search_result,
  select_hour,
  select_placeholder,
  set_budget,
  sidebar_all_done_msg,
  sidebar_daily_focus,
  sidebar_done_suffix,
  sidebar_inbox_empty,
  sidebar_inbox_focus,
  sidebar_inbox_subtitle,
  sidebar_inbox_title,
  sidebar_keep_going_msg,
  sidebar_meal_title,
  sidebar_meals_title,
  sidebar_msg_complete,
  sidebar_msg_progress,
  sidebar_notes_placeholder,
  sidebar_notes_title,
  sidebar_persistent,
  sidebar_target_daily,
  sidebar_tasks_done,
  sidebar_tasks_unit,
  sidebar_water_title,
  sol_badge: sol_badge$1,
  sol_card_1_desc: sol_card_1_desc$1,
  sol_card_1_title: sol_card_1_title$1,
  sol_card_2_desc: sol_card_2_desc$1,
  sol_card_2_title: sol_card_2_title$1,
  sol_card_3_desc: sol_card_3_desc$1,
  sol_card_3_title: sol_card_3_title$1,
  sol_title: sol_title$1,
  stats_consistency,
  stats_mood,
  stats_mood_desc,
  stats_total_check,
  story_1_card_1: story_1_card_1$1,
  story_1_card_2: story_1_card_2$1,
  story_1_p1: story_1_p1$1,
  story_1_p2: story_1_p2$1,
  story_1_title: story_1_title$1,
  story_2_p1: story_2_p1$1,
  story_2_p2: story_2_p2$1,
  story_2_quote: story_2_quote$1,
  story_2_title: story_2_title$1,
  success_budget_saved,
  success_deleted,
  success_saved,
  success_transaction_saved,
  task_notes,
  team_connect: team_connect$1,
  team_title: team_title$1,
  timeline_now,
  timeline_title,
  today_is,
  total_label,
  total_suffix,
  transaction_count,
  user_desc: user_desc$1,
  user_name: user_name$1,
  user_role: user_role$1,
  waitlist_btn,
  waitlist_desc,
  waitlist_input_placeholder,
  waitlist_note,
  waitlist_title,
  warn_empty_amount,
  warn_empty_amount_text,
  warn_empty_budget_name,
  warn_empty_budget_name_text,
  warn_empty_category,
  warn_empty_category_name,
  warn_empty_category_name_text,
  warn_empty_time,
  warn_empty_title,
  warn_empty_title_text,
  yes_delete
}, Symbol.toStringTag, { value: "Module" }));
const nav_home = "主页";
const nav_about = "关于我们";
const nav_login = "登录";
const nav_register = "免费注册";
const nav_dashboard = "仪表盘";
const hero_badge = "✨ v1.0: 抗倦怠系统";
const hero_title_1 = "掌控生活。";
const hero_title_2 = "每月重置。";
const hero_desc = "一个会在每月1号自动清理数据的生命操作系统。专注于这个月，忘掉上个月的负担。";
const hero_cta_primary = "立即免费开始";
const hero_cta_secondary = "了解理念";
const eco_badge = "生态系统";
const eco_title = "里面有什么？";
const eco_desc = "不仅仅是习惯追踪。这是一个完整的工具包，在一个仪表盘中管理你生活的方方面面。";
const eco_habit_title = "习惯追踪";
const eco_habit_desc = "核心功能。通过每日清单建立新习惯。可视化你的连胜记录以保持动力。";
const eco_finance_title = "资金流";
const eco_finance_desc = "简单记录收入和支出。停止不知不觉的漏财。";
const eco_daily_title = "每日计划";
const eco_daily_desc = "仅限今天的待办事项。专注于现在必须完成的事情。";
const eco_goal_title = "目标追踪";
const eco_goal_desc = "将年度大梦想分解为合理的月度目标。";
const eco_journal_title = "日记";
const eco_journal_desc = "倾诉你的想法。每日反思以保持心理健康。";
const eco_job_title = "求职与内容规划";
const eco_job_desc = "追踪你的求职申请（已发送、面试、录取）或安排你的社交媒体内容。";
const eco_coming_soon = "即将推出";
const prob_1_title = "问题：过去的“罪孽”";
const prob_1_desc = "普通的应用程序会保存你所有的失败。上个月未勾选的清单今天仍然出现。那不是动力，那是精神负担。";
const prob_1_point_1 = "堆积如山的“逾期”通知。";
const prob_1_point_2 = "连胜中断让你不想继续。";
const prob_2_title = "问题：切换App让你大脑疲惫";
const prob_2_desc = "习惯在手机上，财务在电脑上，日记在书本上。你光是记住要打开哪个App就耗尽了精力。";
const prob_2_solution = "OneForMind 将习惯和财务结合在一个简单的仪表盘中。";
const sol_badge = "我们的解决方案";
const sol_title = "一个月。一个系统。";
const sol_card_1_title = "习惯追踪";
const sol_card_1_desc = "每日打卡，毫不费力。可视化你的进度。绿色代表完成，灰色代表跳过。简单。";
const sol_card_2_title = "资金流";
const sol_card_2_desc = "输入支出仅需3秒。“咖啡 - 25k”。完成。看看这个月你的钱漏到哪里去了。";
const sol_card_3_title = "自动重置";
const sol_card_3_desc = "每月1号00:00，系统将归档旧数据。你将获得一张干净的新白纸。";
const faq_title = "常见问题";
const faq_q1 = "上个月的数据会永远消失吗？";
const faq_a1 = "不会。你的数据安全地存储在历史档案中。你可以随时查看以进行评估。但在主仪表盘上，它们被隐藏了，以免你感到负担。";
const faq_q2 = "这真的免费吗？";
const faq_a2 = "是的。你现在看到的习惯和财务追踪功能是完全免费的。稍后我们将发布高级功能，但基础功能将永远免费。";
const faq_q3 = "可以在手机上使用吗？";
const faq_a3 = "当然！该网站是响应式的。在手机Chrome/Safari上打开它，体验就像原生App一样。";
const cta_final_title = "准备好重置你的生活了吗？";
const cta_final_desc = "不要等到新年才开始。现在开始，下个月评估。零风险。";
const cta_final_btn = "创建免费账户";
const cta_final_sub = "✨ 加入 100+ 位早期采用者";
const about_badge = "👋 你好，人类。";
const about_title_1 = "我们做这个是因为";
const about_title_2 = "我们累了。";
const about_desc = "一个关于倦怠、红色通知以及在数字世界中寻找理智的诚实故事。";
const story_1_title = "混乱的开始";
const story_1_p1 = "以前，我们的手机里装满了生产力App。Trello用于工作，Notion用于记录想法，Excel用于财务。我们以为这能让我们高效。";
const story_1_p2 = "现实呢？我们反而成了App的奴隶。我们花在“整理”任务上的时间比实际做任务的时间还多。";
const story_1_card_1 = "精神杂乱";
const story_1_card_2 = "通知焦虑";
const story_2_title = "人类不是机器";
const story_2_p1 = "我们意识到有些不对劲。现代App强迫我们跑一场没有终点的马拉松。如果你有一天没完成习惯打卡，你就会因为连胜中断而受到惩罚。";
const story_2_quote = "我们需要一个宽容的系统，而不是一个惩罚的系统。";
const story_2_p2 = "于是我们创造了“每月重置”的概念。一个在每月1号自动按下的“重启”按钮。";
const manifesto_badge = "我们的宣言";
const manifesto_title = "理智的三大支柱";
const manifesto_1_title = "隐私至上";
const manifesto_1_desc = "你的数据是你自己的事。我们不是广告公司。我们不会将你的习惯数据出售给第三方。";
const manifesto_2_title = "全新开始";
const manifesto_2_desc = "新月份 = 新篇章。旧数据被归档。你不需要把上个月失败的包袱带到这个月。";
const manifesto_3_title = "少即是多";
const manifesto_3_desc = "拒绝垃圾功能。我们只包含你真正需要的、让生活井井有条的功能。没有俗气的游戏化。";
const team_title = "OneForMind 幕后";
const dev_name = "独立开发者";
const dev_role = "代码与设计";
const dev_desc = "因对复杂的习惯App感到沮丧而独自构建（Solo Dev）。我编写这个是为了解决我自己的混乱，希望它也能解决你的问题。";
const user_name = "早期采用者";
const user_role = "远见者 (你们)";
const user_desc = "第一批敢于尝试这个系统的勇敢灵魂。你们在凌晨2点报告Bug并提出疯狂的功能建议。你们不仅是用户，你们是联合创始人。";
const team_connect = "想讨论功能或仅仅是发泄倦怠？";
const cta_about_title = "读够了吗？";
const cta_about_desc = "是时候停止滑动屏幕，开始整理你的生活了。只需2分钟即可设置。";
const cta_about_btn = "免费加入";
const cta_about_sub = "无需信用卡。随时取消。";
const auth_login_title = "欢迎回来。";
const auth_login_subtitle = "继续你的生活进度。";
const auth_register_title = "全新开始。";
const auth_register_subtitle = "30秒内创建账户。免费。";
const auth_label_email = "电子邮箱";
const auth_label_password = "密码";
const auth_label_name = "昵称";
const auth_label_pass_confirm = "确认密码";
const auth_placeholder_email = "name@email.com";
const auth_placeholder_name = "Alex";
const auth_placeholder_pass = "最少8个字符";
const auth_placeholder_pass_confirm = "再次输入密码";
const auth_forgot_pass = "忘记密码？";
const auth_remember = "记住我";
const auth_btn_login = "进入仪表盘";
const auth_btn_register = "立即注册";
const auth_btn_google_in = "使用 Google 登录";
const auth_btn_google_up = "使用 Google 注册";
const auth_divider = "或者";
const auth_no_account = "还没有账户？";
const auth_has_account = "已经有账户了？";
const auth_link_register = "立即注册";
const auth_link_login = "在这里登录";
const auth_confirm_title = "安全检查。";
const auth_confirm_desc = "这是敏感区域，兄弟。为了安全起见，请先确认你的密码。";
const auth_btn_confirm = "确认密码";
const auth_reset_title = "忘记密码？";
const auth_reset_desc = "放松，别惊慌。在下方输入你的邮箱，我们会发送重置密码链接。";
const auth_btn_reset = "发送重置链接";
const auth_back_login = "← 返回登录";
const reset_page_title = "重置密码";
const reset_title = "新密码";
const reset_desc = "请创建一个安全的新密码。";
const reset_label_email = "电子邮箱";
const reset_label_pass = "新密码";
const reset_label_confirm = "确认新密码";
const reset_placeholder_pass = "最少8个字符";
const reset_btn = "保存密码";
const footer_rights = "版权所有。";
const zh = {
  nav_home,
  nav_about,
  nav_login,
  nav_register,
  nav_dashboard,
  hero_badge,
  hero_title_1,
  hero_title_2,
  hero_desc,
  hero_cta_primary,
  hero_cta_secondary,
  eco_badge,
  eco_title,
  eco_desc,
  eco_habit_title,
  eco_habit_desc,
  eco_finance_title,
  eco_finance_desc,
  eco_daily_title,
  eco_daily_desc,
  eco_goal_title,
  eco_goal_desc,
  eco_journal_title,
  eco_journal_desc,
  eco_job_title,
  eco_job_desc,
  eco_coming_soon,
  prob_1_title,
  prob_1_desc,
  prob_1_point_1,
  prob_1_point_2,
  prob_2_title,
  prob_2_desc,
  prob_2_solution,
  sol_badge,
  sol_title,
  sol_card_1_title,
  sol_card_1_desc,
  sol_card_2_title,
  sol_card_2_desc,
  sol_card_3_title,
  sol_card_3_desc,
  faq_title,
  faq_q1,
  faq_a1,
  faq_q2,
  faq_a2,
  faq_q3,
  faq_a3,
  cta_final_title,
  cta_final_desc,
  cta_final_btn,
  cta_final_sub,
  about_badge,
  about_title_1,
  about_title_2,
  about_desc,
  story_1_title,
  story_1_p1,
  story_1_p2,
  story_1_card_1,
  story_1_card_2,
  story_2_title,
  story_2_p1,
  story_2_quote,
  story_2_p2,
  manifesto_badge,
  manifesto_title,
  manifesto_1_title,
  manifesto_1_desc,
  manifesto_2_title,
  manifesto_2_desc,
  manifesto_3_title,
  manifesto_3_desc,
  team_title,
  dev_name,
  dev_role,
  dev_desc,
  user_name,
  user_role,
  user_desc,
  team_connect,
  cta_about_title,
  cta_about_desc,
  cta_about_btn,
  cta_about_sub,
  auth_login_title,
  auth_login_subtitle,
  auth_register_title,
  auth_register_subtitle,
  auth_label_email,
  auth_label_password,
  auth_label_name,
  auth_label_pass_confirm,
  auth_placeholder_email,
  auth_placeholder_name,
  auth_placeholder_pass,
  auth_placeholder_pass_confirm,
  auth_forgot_pass,
  auth_remember,
  auth_btn_login,
  auth_btn_register,
  auth_btn_google_in,
  auth_btn_google_up,
  auth_divider,
  auth_no_account,
  auth_has_account,
  auth_link_register,
  auth_link_login,
  auth_confirm_title,
  auth_confirm_desc,
  auth_btn_confirm,
  auth_reset_title,
  auth_reset_desc,
  auth_btn_reset,
  auth_back_login,
  reset_page_title,
  reset_title,
  reset_desc,
  reset_label_email,
  reset_label_pass,
  reset_label_confirm,
  reset_placeholder_pass,
  reset_btn,
  footer_rights
};
const __vite_glob_1_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  about_badge,
  about_desc,
  about_title_1,
  about_title_2,
  auth_back_login,
  auth_btn_confirm,
  auth_btn_google_in,
  auth_btn_google_up,
  auth_btn_login,
  auth_btn_register,
  auth_btn_reset,
  auth_confirm_desc,
  auth_confirm_title,
  auth_divider,
  auth_forgot_pass,
  auth_has_account,
  auth_label_email,
  auth_label_name,
  auth_label_pass_confirm,
  auth_label_password,
  auth_link_login,
  auth_link_register,
  auth_login_subtitle,
  auth_login_title,
  auth_no_account,
  auth_placeholder_email,
  auth_placeholder_name,
  auth_placeholder_pass,
  auth_placeholder_pass_confirm,
  auth_register_subtitle,
  auth_register_title,
  auth_remember,
  auth_reset_desc,
  auth_reset_title,
  cta_about_btn,
  cta_about_desc,
  cta_about_sub,
  cta_about_title,
  cta_final_btn,
  cta_final_desc,
  cta_final_sub,
  cta_final_title,
  default: zh,
  dev_desc,
  dev_name,
  dev_role,
  eco_badge,
  eco_coming_soon,
  eco_daily_desc,
  eco_daily_title,
  eco_desc,
  eco_finance_desc,
  eco_finance_title,
  eco_goal_desc,
  eco_goal_title,
  eco_habit_desc,
  eco_habit_title,
  eco_job_desc,
  eco_job_title,
  eco_journal_desc,
  eco_journal_title,
  eco_title,
  faq_a1,
  faq_a2,
  faq_a3,
  faq_q1,
  faq_q2,
  faq_q3,
  faq_title,
  footer_rights,
  hero_badge,
  hero_cta_primary,
  hero_cta_secondary,
  hero_desc,
  hero_title_1,
  hero_title_2,
  manifesto_1_desc,
  manifesto_1_title,
  manifesto_2_desc,
  manifesto_2_title,
  manifesto_3_desc,
  manifesto_3_title,
  manifesto_badge,
  manifesto_title,
  nav_about,
  nav_dashboard,
  nav_home,
  nav_login,
  nav_register,
  prob_1_desc,
  prob_1_point_1,
  prob_1_point_2,
  prob_1_title,
  prob_2_desc,
  prob_2_solution,
  prob_2_title,
  reset_btn,
  reset_desc,
  reset_label_confirm,
  reset_label_email,
  reset_label_pass,
  reset_page_title,
  reset_placeholder_pass,
  reset_title,
  sol_badge,
  sol_card_1_desc,
  sol_card_1_title,
  sol_card_2_desc,
  sol_card_2_title,
  sol_card_3_desc,
  sol_card_3_title,
  sol_title,
  story_1_card_1,
  story_1_card_2,
  story_1_p1,
  story_1_p2,
  story_1_title,
  story_2_p1,
  story_2_p2,
  story_2_quote,
  story_2_title,
  team_connect,
  team_title,
  user_desc,
  user_name,
  user_role
}, Symbol.toStringTag, { value: "Module" }));
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t4) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2) ({}).hasOwnProperty.call(r2, n2) && (t4[n2] = r2[n2]);
    }
    return t4;
  }, t.apply(null, arguments);
}
var e = String.prototype.replace, r = /%20/g, n = "RFC3986", o = { default: n, formatters: { RFC1738: function(t4) {
  return e.call(t4, r, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738" }, i = Object.prototype.hasOwnProperty, u = Array.isArray, a = function() {
  for (var t4 = [], e2 = 0; e2 < 256; ++e2) t4.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t4;
}(), s = function(t4, e2) {
  for (var r2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2) void 0 !== t4[n2] && (r2[n2] = t4[n2]);
  return r2;
}, f = { arrayToObject: s, assign: function(t4, e2) {
  return Object.keys(e2).reduce(function(t5, r2) {
    return t5[r2] = e2[r2], t5;
  }, t4);
}, combine: function(t4, e2) {
  return [].concat(t4, e2);
}, compact: function(t4) {
  for (var e2 = [{ obj: { o: t4 }, prop: "o" }], r2 = [], n2 = 0; n2 < e2.length; ++n2) for (var o2 = e2[n2], i2 = o2.obj[o2.prop], a2 = Object.keys(i2), s2 = 0; s2 < a2.length; ++s2) {
    var f2 = a2[s2], c2 = i2[f2];
    "object" == typeof c2 && null !== c2 && -1 === r2.indexOf(c2) && (e2.push({ obj: i2, prop: f2 }), r2.push(c2));
  }
  return function(t5) {
    for (; t5.length > 1; ) {
      var e3 = t5.pop(), r3 = e3.obj[e3.prop];
      if (u(r3)) {
        for (var n3 = [], o3 = 0; o3 < r3.length; ++o3) void 0 !== r3[o3] && n3.push(r3[o3]);
        e3.obj[e3.prop] = n3;
      }
    }
  }(e2), t4;
}, decode: function(t4, e2, r2) {
  var n2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === r2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t5) {
    return n2;
  }
}, encode: function(t4, e2, r2, n2, i2) {
  if (0 === t4.length) return t4;
  var u2 = t4;
  if ("symbol" == typeof t4 ? u2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (u2 = String(t4)), "iso-8859-1" === r2) return escape(u2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
    return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
  });
  for (var s2 = "", f2 = 0; f2 < u2.length; ++f2) {
    var c2 = u2.charCodeAt(f2);
    45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || i2 === o.RFC1738 && (40 === c2 || 41 === c2) ? s2 += u2.charAt(f2) : c2 < 128 ? s2 += a[c2] : c2 < 2048 ? s2 += a[192 | c2 >> 6] + a[128 | 63 & c2] : c2 < 55296 || c2 >= 57344 ? s2 += a[224 | c2 >> 12] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2] : (c2 = 65536 + ((1023 & c2) << 10 | 1023 & u2.charCodeAt(f2 += 1)), s2 += a[240 | c2 >> 18] + a[128 | c2 >> 12 & 63] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2]);
  }
  return s2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, e2) {
  if (u(t4)) {
    for (var r2 = [], n2 = 0; n2 < t4.length; n2 += 1) r2.push(e2(t4[n2]));
    return r2;
  }
  return e2(t4);
}, merge: function t2(e2, r2, n2) {
  if (!r2) return e2;
  if ("object" != typeof r2) {
    if (u(e2)) e2.push(r2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, r2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, r2)) && (e2[r2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) return [e2].concat(r2);
  var o2 = e2;
  return u(e2) && !u(r2) && (o2 = s(e2, n2)), u(e2) && u(r2) ? (r2.forEach(function(r3, o3) {
    if (i.call(e2, o3)) {
      var u2 = e2[o3];
      u2 && "object" == typeof u2 && r3 && "object" == typeof r3 ? e2[o3] = t2(u2, r3, n2) : e2.push(r3);
    } else e2[o3] = r3;
  }), e2) : Object.keys(r2).reduce(function(e3, o3) {
    var u2 = r2[o3];
    return e3[o3] = i.call(e3, o3) ? t2(e3[o3], u2, n2) : u2, e3;
  }, o2);
} }, c = Object.prototype.hasOwnProperty, l = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, e2) {
  return t4 + "[" + e2 + "]";
}, repeat: function(t4) {
  return t4;
} }, p = Array.isArray, h = String.prototype.split, y = Array.prototype.push, d = function(t4, e2) {
  y.apply(t4, p(e2) ? e2 : [e2]);
}, g = Date.prototype.toISOString, b = o.default, v = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: f.encode, encodeValuesOnly: false, format: b, formatter: o.formatters[b], indices: false, serializeDate: function(t4) {
  return g.call(t4);
}, skipNulls: false, strictNullHandling: false }, m = function t3(e2, r2, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2) {
  var j2, w2 = e2;
  if ("function" == typeof a2 ? w2 = a2(r2, w2) : w2 instanceof Date ? w2 = l2(w2) : "comma" === n2 && p(w2) && (w2 = f.maybeMap(w2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === w2) {
    if (o2) return u2 && !b2 ? u2(r2, v.encoder, m2, "key", y2) : r2;
    w2 = "";
  }
  if ("string" == typeof (j2 = w2) || "number" == typeof j2 || "boolean" == typeof j2 || "symbol" == typeof j2 || "bigint" == typeof j2 || f.isBuffer(w2)) {
    if (u2) {
      var $2 = b2 ? r2 : u2(r2, v.encoder, m2, "key", y2);
      if ("comma" === n2 && b2) {
        for (var O2 = h.call(String(w2), ","), E2 = "", R2 = 0; R2 < O2.length; ++R2) E2 += (0 === R2 ? "" : ",") + g2(u2(O2[R2], v.encoder, m2, "value", y2));
        return [g2($2) + "=" + E2];
      }
      return [g2($2) + "=" + g2(u2(w2, v.encoder, m2, "value", y2))];
    }
    return [g2(r2) + "=" + g2(String(w2))];
  }
  var S2, x2 = [];
  if (void 0 === w2) return x2;
  if ("comma" === n2 && p(w2)) S2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (p(a2)) S2 = a2;
  else {
    var N2 = Object.keys(w2);
    S2 = s2 ? N2.sort(s2) : N2;
  }
  for (var T2 = 0; T2 < S2.length; ++T2) {
    var k2 = S2[T2], C = "object" == typeof k2 && void 0 !== k2.value ? k2.value : w2[k2];
    if (!i2 || null !== C) {
      var _ = p(w2) ? "function" == typeof n2 ? n2(r2, k2) : r2 : r2 + (c2 ? "." + k2 : "[" + k2 + "]");
      d(x2, t3(C, _, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2));
    }
  }
  return x2;
}, j = Object.prototype.hasOwnProperty, w = Array.isArray, $ = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: f.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, E = function(t4, e2) {
  return t4 && "string" == typeof t4 && e2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, R = function(t4, e2, r2, n2) {
  if (t4) {
    var o2 = r2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = r2.depth > 0 && /(\[[^[\]]*])/.exec(o2), a2 = u2 ? o2.slice(0, u2.index) : o2, s2 = [];
    if (a2) {
      if (!r2.plainObjects && j.call(Object.prototype, a2) && !r2.allowPrototypes) return;
      s2.push(a2);
    }
    for (var f2 = 0; r2.depth > 0 && null !== (u2 = i2.exec(o2)) && f2 < r2.depth; ) {
      if (f2 += 1, !r2.plainObjects && j.call(Object.prototype, u2[1].slice(1, -1)) && !r2.allowPrototypes) return;
      s2.push(u2[1]);
    }
    return u2 && s2.push("[" + o2.slice(u2.index) + "]"), function(t5, e3, r3, n3) {
      for (var o3 = n3 ? e3 : E(e3, r3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, a3 = t5[i3];
        if ("[]" === a3 && r3.parseArrays) u3 = [].concat(o3);
        else {
          u3 = r3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var s3 = "[" === a3.charAt(0) && "]" === a3.charAt(a3.length - 1) ? a3.slice(1, -1) : a3, f3 = parseInt(s3, 10);
          r3.parseArrays || "" !== s3 ? !isNaN(f3) && a3 !== s3 && String(f3) === s3 && f3 >= 0 && r3.parseArrays && f3 <= r3.arrayLimit ? (u3 = [])[f3] = o3 : "__proto__" !== s3 && (u3[s3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(s2, e2, r2, n2);
  }
}, S = function(t4, e2) {
  var r2 = /* @__PURE__ */ function(t5) {
    return $;
  }();
  if ("" === t4 || null == t4) return r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? function(t5, e3) {
    var r3, n3 = {}, o3 = (e3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit), i3 = -1, u3 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < o3.length; ++r3) 0 === o3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[r3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[r3] && (u3 = "iso-8859-1"), i3 = r3, r3 = o3.length);
    for (r3 = 0; r3 < o3.length; ++r3) if (r3 !== i3) {
      var a3, s3, c2 = o3[r3], l2 = c2.indexOf("]="), p2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
      -1 === p2 ? (a3 = e3.decoder(c2, $.decoder, u3, "key"), s3 = e3.strictNullHandling ? null : "") : (a3 = e3.decoder(c2.slice(0, p2), $.decoder, u3, "key"), s3 = f.maybeMap(E(c2.slice(p2 + 1), e3), function(t6) {
        return e3.decoder(t6, $.decoder, u3, "value");
      })), s3 && e3.interpretNumericEntities && "iso-8859-1" === u3 && (s3 = O(s3)), c2.indexOf("[]=") > -1 && (s3 = w(s3) ? [s3] : s3), n3[a3] = j.call(n3, a3) ? f.combine(n3[a3], s3) : s3;
    }
    return n3;
  }(t4, r2) : t4, o2 = r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var a2 = i2[u2], s2 = R(a2, n2[a2], r2, "string" == typeof t4);
    o2 = f.merge(o2, s2, r2);
  }
  return f.compact(o2);
};
class x {
  constructor(t4, e2, r2) {
    var n2, o2;
    this.name = t4, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (o2 = e2.wheres) ? o2 : {}, this.config = r2;
  }
  get template() {
    const t4 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t4 ? "/" : t4;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t4, e2;
    return null != (t4 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t5) => ({ name: t5.replace(/{|\??}/g, ""), required: !/\?}$/.test(t5) }))) ? t4 : [];
  }
  matchesUrl(t4) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const r2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t5, e3, r3, n3) => {
      var o3;
      const i3 = `(?<${r3}>${(null == (o3 = this.wheres[r3]) ? void 0 : o3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, o2] = t4.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${r2}/?$`).exec(n2)) ? e2 : new RegExp(`^${r2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t5 in i2.groups) i2.groups[t5] = "string" == typeof i2.groups[t5] ? decodeURIComponent(i2.groups[t5]) : i2.groups[t5];
      return { params: i2.groups, query: S(o2) };
    }
    return false;
  }
  compile(t4) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, r2, n2) => {
      var o2, i2;
      if (!n2 && [null, void 0].includes(t4[r2])) throw new Error(`Ziggy error: '${r2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[r2] && !new RegExp(`^${n2 ? `(${this.wheres[r2]})?` : this.wheres[r2]}$`).test(null != (i2 = t4[r2]) ? i2 : "")) throw new Error(`Ziggy error: '${r2}' parameter '${t4[r2]}' does not match required format '${this.wheres[r2]}' for route '${this.name}'.`);
      return encodeURI(null != (o2 = t4[r2]) ? o2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class N extends String {
  constructor(e2, r2, n2 = true, o2) {
    if (super(), this.t = null != o2 ? o2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(r2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t4) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t4)).filter((t4) => "_query" !== t4).reduce((e3, r2) => t({}, e3, { [r2]: this.u[r2] }), {});
    return this.i.compile(this.u) + function(t4, e3) {
      var r2, n2 = t4, i2 = function(t5) {
        if (!t5) return v;
        if (null != t5.encoder && "function" != typeof t5.encoder) throw new TypeError("Encoder has to be a function.");
        var e4 = t5.charset || v.charset;
        if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var r3 = o.default;
        if (void 0 !== t5.format) {
          if (!c.call(o.formatters, t5.format)) throw new TypeError("Unknown format option provided.");
          r3 = t5.format;
        }
        var n3 = o.formatters[r3], i3 = v.filter;
        return ("function" == typeof t5.filter || p(t5.filter)) && (i3 = t5.filter), { addQueryPrefix: "boolean" == typeof t5.addQueryPrefix ? t5.addQueryPrefix : v.addQueryPrefix, allowDots: void 0 === t5.allowDots ? v.allowDots : !!t5.allowDots, charset: e4, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : v.charsetSentinel, delimiter: void 0 === t5.delimiter ? v.delimiter : t5.delimiter, encode: "boolean" == typeof t5.encode ? t5.encode : v.encode, encoder: "function" == typeof t5.encoder ? t5.encoder : v.encoder, encodeValuesOnly: "boolean" == typeof t5.encodeValuesOnly ? t5.encodeValuesOnly : v.encodeValuesOnly, filter: i3, format: r3, formatter: n3, serializeDate: "function" == typeof t5.serializeDate ? t5.serializeDate : v.serializeDate, skipNulls: "boolean" == typeof t5.skipNulls ? t5.skipNulls : v.skipNulls, sort: "function" == typeof t5.sort ? t5.sort : null, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : v.strictNullHandling };
      }(e3);
      "function" == typeof i2.filter ? n2 = (0, i2.filter)("", n2) : p(i2.filter) && (r2 = i2.filter);
      var u2 = [];
      if ("object" != typeof n2 || null === n2) return "";
      var a2 = l[e3 && e3.arrayFormat in l ? e3.arrayFormat : e3 && "indices" in e3 ? e3.indices ? "indices" : "repeat" : "indices"];
      r2 || (r2 = Object.keys(n2)), i2.sort && r2.sort(i2.sort);
      for (var s2 = 0; s2 < r2.length; ++s2) {
        var f2 = r2[s2];
        i2.skipNulls && null === n2[f2] || d(u2, m(n2[f2], f2, a2, i2.strictNullHandling, i2.skipNulls, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset));
      }
      var h2 = u2.join(i2.delimiter), y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? y2 + h2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t4, e3) => "boolean" == typeof t4 ? Number(t4) : e3(t4) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.v();
    let r2 = {};
    const [n2, o2] = Object.entries(this.t.routes).find(([t4, n3]) => r2 = new x(t4, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, r2, { route: o2 });
  }
  v() {
    const { host: t4, pathname: e2, search: r2 } = this.h();
    return (this.t.absolute ? t4 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + r2;
  }
  current(e2, r2) {
    const { name: n2, params: o2, query: i2, route: u2 } = this.p();
    if (!e2) return n2;
    const a2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r2) || !a2) return a2;
    const s2 = new x(n2, u2, this.t);
    r2 = this.l(r2, s2);
    const f2 = t({}, o2, i2);
    if (Object.values(r2).every((t4) => !t4) && !Object.values(f2).some((t4) => void 0 !== t4)) return true;
    const c2 = (t4, e3) => Object.entries(t4).every(([t5, r3]) => Array.isArray(r3) && Array.isArray(e3[t5]) ? r3.every((r4) => e3[t5].includes(r4)) : "object" == typeof r3 && "object" == typeof e3[t5] && null !== r3 && null !== e3[t5] ? c2(r3, e3[t5]) : e3[t5] == r3);
    return c2(r2, f2);
  }
  h() {
    var t4, e2, r2, n2, o2, i2;
    const { host: u2 = "", pathname: a2 = "", search: s2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t4 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t4 : u2, pathname: null != (r2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? r2 : a2, search: null != (o2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? o2 : s2 };
  }
  get params() {
    const { params: e2, query: r2 } = this.p();
    return t({}, e2, r2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t4) {
    return this.t.routes.hasOwnProperty(t4);
  }
  l(e2 = {}, r2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = r2.parameterSegments.filter(({ name: t4 }) => !this.t.defaults[t4]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, r3, o2) => t({}, e3, n2[o2] ? { [n2[o2].name]: r3 } : "object" == typeof r3 ? r3 : { [r3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(r2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.m(r2), this.j(e2, r2));
  }
  m(e2) {
    return e2.parameterSegments.filter(({ name: t4 }) => this.t.defaults[t4]).reduce((e3, { name: r2 }, n2) => t({}, e3, { [r2]: this.t.defaults[r2] }), {});
  }
  j(e2, { bindings: r2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [o2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t4 }) => t4 === o2)) return t({}, e3, { [o2]: i2 });
      if (!i2.hasOwnProperty(r2[o2])) {
        if (!i2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${o2}' parameter is missing route model binding key '${r2[o2]}'.`);
        r2[o2] = "id";
      }
      return t({}, e3, { [o2]: i2[r2[o2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function T(t4, e2, r2, n2) {
  const o2 = new N(t4, e2, r2, n2);
  return t4 ? o2.toString() : o2;
}
const k = { install(t4, e2) {
  const r2 = (t5, r3, n2, o2 = e2) => T(t5, r3, n2, o2);
  parseInt(t4.version) > 2 ? (t4.config.globalProperties.route = r2, t4.provide("route", r2)) : t4.mixin({ methods: { route: r2 } });
} };
const Ziggy$1 = { "url": "https://oneformindapp.up.railway.app", "port": null, "defaults": {}, "routes": { "debugbar.openhandler": { "uri": "_debugbar/open", "methods": ["GET", "HEAD"] }, "debugbar.clockwork": { "uri": "_debugbar/clockwork/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "debugbar.telescope": { "uri": "_debugbar/telescope/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "debugbar.assets.css": { "uri": "_debugbar/assets/stylesheets", "methods": ["GET", "HEAD"] }, "debugbar.assets.js": { "uri": "_debugbar/assets/javascript", "methods": ["GET", "HEAD"] }, "debugbar.cache.delete": { "uri": "_debugbar/cache/{key}/{tags?}", "methods": ["DELETE"], "parameters": ["key", "tags"] }, "debugbar.queries.explain": { "uri": "_debugbar/queries/explain", "methods": ["POST"] }, "sanctum.csrf-cookie": { "uri": "sanctum/csrf-cookie", "methods": ["GET", "HEAD"] }, "telescope": { "uri": "telescope/{view?}", "methods": ["GET", "HEAD"], "wheres": { "view": "(.*)" }, "parameters": ["view"] }, "ignition.healthCheck": { "uri": "_ignition/health-check", "methods": ["GET", "HEAD"] }, "ignition.executeSolution": { "uri": "_ignition/execute-solution", "methods": ["POST"] }, "ignition.updateConfig": { "uri": "_ignition/update-config", "methods": ["POST"] }, "lang.switch": { "uri": "lang/{locale}", "methods": ["GET", "HEAD"], "parameters": ["locale"] }, "home": { "uri": "/", "methods": ["GET", "HEAD"] }, "waitlist.store": { "uri": "waitlist", "methods": ["POST"] }, "about": { "uri": "about", "methods": ["GET", "HEAD"] }, "google.login": { "uri": "auth/google", "methods": ["GET", "HEAD"] }, "dashboard": { "uri": "dashboard", "methods": ["GET", "HEAD"] }, "planner.index": { "uri": "planner", "methods": ["GET", "HEAD"] }, "planner.store": { "uri": "planner", "methods": ["POST"] }, "planner.update": { "uri": "planner/{plannerTask}", "methods": ["PATCH"], "parameters": ["plannerTask"], "bindings": { "plannerTask": "id" } }, "planner.destroy": { "uri": "planner/{plannerTask}", "methods": ["DELETE"], "parameters": ["plannerTask"], "bindings": { "plannerTask": "id" } }, "planner.toggle": { "uri": "planner/{plannerTask}/toggle", "methods": ["PATCH"], "parameters": ["plannerTask"], "bindings": { "plannerTask": "id" } }, "planner.updateLog": { "uri": "planner/log", "methods": ["POST"] }, "planner.reset": { "uri": "planner/reset", "methods": ["POST"] }, "planner.batchStore": { "uri": "planner/batch", "methods": ["POST"] }, "habits.index": { "uri": "habits", "methods": ["GET", "HEAD"] }, "habits.store": { "uri": "habits", "methods": ["POST"] }, "habits.copy": { "uri": "habits/copy", "methods": ["POST"] }, "habits.mood": { "uri": "habits/mood", "methods": ["POST"] }, "habits.update": { "uri": "habits/{habit}", "methods": ["PATCH"], "parameters": ["habit"], "bindings": { "habit": "id" } }, "habits.destroy": { "uri": "habits/{habit}", "methods": ["DELETE"], "parameters": ["habit"], "bindings": { "habit": "id" } }, "habits.log": { "uri": "habits/{habit}/log", "methods": ["POST"], "parameters": ["habit"], "bindings": { "habit": "id" } }, "finance.index": { "uri": "finance", "methods": ["GET", "HEAD"] }, "finance.income-target.update": { "uri": "finance/income-target", "methods": ["POST"] }, "finance.transaction.store": { "uri": "finance/transaction", "methods": ["POST"] }, "finance.transaction.update": { "uri": "finance/transaction/{financeTransaction}", "methods": ["PATCH"], "parameters": ["financeTransaction"], "bindings": { "financeTransaction": "id" } }, "finance.transaction.destroy": { "uri": "finance/transaction/{financeTransaction}", "methods": ["DELETE"], "parameters": ["financeTransaction"], "bindings": { "financeTransaction": "id" } }, "finance.category.check": { "uri": "finance/category/check/{category}", "methods": ["GET", "HEAD"], "parameters": ["category"] }, "finance.category.rename": { "uri": "finance/category/rename", "methods": ["POST"] }, "finance.budget.store": { "uri": "finance/budget", "methods": ["POST"] }, "finance.budget.update": { "uri": "finance/budget/{financeBudget}", "methods": ["PUT"], "parameters": ["financeBudget"], "bindings": { "financeBudget": "id" } }, "finance.budget.destroy": { "uri": "finance/budget/{financeBudget}", "methods": ["DELETE"], "parameters": ["financeBudget"], "bindings": { "financeBudget": "id" } }, "finance.categories.store": { "uri": "finance/categories", "methods": ["POST"] }, "finance.categories.update": { "uri": "finance/categories/{category}", "methods": ["PUT"], "parameters": ["category"], "bindings": { "category": "id" } }, "finance.categories.destroy": { "uri": "finance/categories/{category}", "methods": ["DELETE"], "parameters": ["category"], "bindings": { "category": "id" } }, "settings.index": { "uri": "settings", "methods": ["GET", "HEAD"] }, "settings.update": { "uri": "settings", "methods": ["POST"] }, "profile.edit": { "uri": "profile", "methods": ["GET", "HEAD"] }, "profile.update": { "uri": "profile", "methods": ["PATCH"] }, "profile.destroy": { "uri": "profile", "methods": ["DELETE"] }, "register": { "uri": "register", "methods": ["GET", "HEAD"] }, "login": { "uri": "login", "methods": ["GET", "HEAD"] }, "password.request": { "uri": "forgot-password", "methods": ["GET", "HEAD"] }, "password.email": { "uri": "forgot-password", "methods": ["POST"] }, "password.reset": { "uri": "reset-password/{token}", "methods": ["GET", "HEAD"], "parameters": ["token"] }, "password.store": { "uri": "reset-password", "methods": ["POST"] }, "verification.notice": { "uri": "verify-email", "methods": ["GET", "HEAD"] }, "verification.verify": { "uri": "verify-email/{id}/{hash}", "methods": ["GET", "HEAD"], "parameters": ["id", "hash"] }, "verification.send": { "uri": "email/verification-notification", "methods": ["POST"] }, "password.confirm": { "uri": "confirm-password", "methods": ["GET", "HEAD"] }, "password.update": { "uri": "password", "methods": ["PUT"] }, "logout": { "uri": "logout", "methods": ["POST"] } } };
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy$1.routes, window.Ziggy.routes);
}
const appName = "OneForMind";
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/About.vue": () => import("./assets/About-BwnpTEfO.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-DZ79a5QK.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-DTvKFgs8.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-C-uKCUN9.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-PnAXSbEY.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-BgOb2ozW.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-Dae2NPP0.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-C9Aj5L2h.js"), "./Pages/Error.vue": () => import("./assets/Error-CR45xnbP.js"), "./Pages/Finance/ArchiveModal.vue": () => import("./assets/ArchiveModal-9Jsuj87o.js"), "./Pages/Finance/BudgetModal.vue": () => import("./assets/BudgetModal-CfxiaRiu.js"), "./Pages/Finance/BudgetSidebar.vue": () => import("./assets/BudgetSidebar-DTOzfZFR.js"), "./Pages/Finance/CategoryModal.vue": () => import("./assets/CategoryModal-DYpCHnR4.js"), "./Pages/Finance/DailyTrendChart.vue": () => import("./assets/DailyTrendChart-CXp2VHmQ.js"), "./Pages/Finance/FinanceDatePicker.vue": () => import("./assets/FinanceDatePicker-St-Mq15S.js"), "./Pages/Finance/FinanceHeader.vue": () => import("./assets/FinanceHeader-BJ8CV00e.js"), "./Pages/Finance/FinanceInsights.vue": () => import("./assets/FinanceInsights-CpA838YJ.js").then((n2) => n2.a), "./Pages/Finance/FinanceStats.vue": () => import("./assets/FinanceStats-DtovxEUs.js"), "./Pages/Finance/Index.vue": () => import("./assets/Index-CHsodp-X.js"), "./Pages/Finance/TransactionList.vue": () => import("./assets/TransactionList-DbmE5xgI.js"), "./Pages/Finance/TransactionModal.vue": () => import("./assets/TransactionModal-Ct0_JNG9.js"), "./Pages/Habits/HabitGrid.vue": () => import("./assets/HabitGrid-DS2mRgp4.js"), "./Pages/Habits/HabitHeader.vue": () => import("./assets/HabitHeader-D7De_7e0.js"), "./Pages/Habits/HabitModals.vue": () => import("./assets/HabitModals-Ctd51TO4.js"), "./Pages/Habits/HabitStats.vue": () => import("./assets/HabitStats-mtvxIp2G.js"), "./Pages/Habits/Index.vue": () => import("./assets/Index-C2SThE-W.js"), "./Pages/Planner/Index.vue": () => import("./assets/Index-vXAurBSM.js"), "./Pages/Planner/PlannerBatchModal.vue": () => import("./assets/PlannerBatchModal-6tLhH1zi.js"), "./Pages/Planner/PlannerHeader.vue": () => import("./assets/PlannerHeader-DG43UKy5.js"), "./Pages/Planner/PlannerModal.vue": () => import("./assets/PlannerModal-CDIK_4qp.js"), "./Pages/Planner/PlannerSidebar.vue": () => import("./assets/PlannerSidebar-B2n1lTXm.js"), "./Pages/Planner/PlannerTimeline.vue": () => import("./assets/PlannerTimeline-CKj6FvIl.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-ZT0Fwm6m.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-dr_yCB-k.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-JQWqzoYf.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-DYjWslze.js"), "./Pages/Settings/Index.vue": () => import("./assets/Index-BxQhOHYP.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-ClqITOnP.js") })),
    setup({ App, props, plugin }) {
      var _a;
      const activeLang = page.props.locale || "id";
      const ziggyConfig = {
        ...Ziggy$1,
        location: new URL(((_a = page.props.ziggy) == null ? void 0 : _a.location) || "https://oneformind.com")
      };
      return createSSRApp({ render: () => h$1(App, props) }).use(plugin).use(k, ziggyConfig).use(i18nVue, {
        lang: activeLang,
        resolve: (lang) => {
          const langs = /* @__PURE__ */ Object.assign({ "../../lang/en.json": __vite_glob_1_0, "../../lang/id.json": __vite_glob_1_1, "../../lang/zh.json": __vite_glob_1_2 });
          return langs[`../../lang/${lang}.json`].default;
        }
      });
    }
  })
);
