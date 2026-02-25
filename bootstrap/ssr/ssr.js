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
const seo_meta_desc_1$1 = "Oneformind is an all-in-one productivity tracker that efficiently combines finance management, habit tracking, and daily planning.";
const footer_rights$2 = "© 2026 Oneformind. All rights reserved.";
const nav_features$1 = "Features";
const nav_solutions$1 = "Solutions";
const nav_resources$1 = "Resources";
const nav_pricing$1 = "Pricing";
const modal_logout_title$1 = "Want to say goodbye?";
const modal_logout_subtitle$1 = "Don't forget to come back soon, your progress for today has been saved securely!";
const modal_logout_confirm$1 = "Yes, Logout";
const modal_logout_cancel$1 = "Cancel";
const seo_about_desc$1 = "Discover the vision behind OneForMind. We are building the unified workspace for your daily habits, finances, and goals.";
const footer_legal$1 = "Privacy & Terms";
const legal_title$1 = "Legal Information";
const legal_ref$1 = "Official Privacy Reference:";
const privacy_title$1 = "Privacy Policy for Oneformind";
const privacy_p1$1 = "At Oneformind, accessible from https://oneformind.com, one of our main priorities is the privacy of our visitors.";
const privacy_consent_title$1 = "Consent";
const privacy_consent_p$1 = "By using our website, you hereby consent to our Privacy Policy and agree to its terms.";
const privacy_info_title$1 = "Information we collect";
const privacy_info_p$1 = "The personal information that you are asked to provide will be made clear to you at the point we ask you to provide it.";
const tos_title$1 = "Terms of Service";
const tos_intro$1 = "By accessing and using Oneformind, you agree to be bound by the following terms:";
const tos_service_title$1 = "1. Service Availability";
const tos_service_p$1 = 'Oneformind is provided on an "as is" and "as available" basis. While we strive for maximum uptime, we do not guarantee that the service will be uninterrupted, error-free, or completely secure.';
const tos_data_title$1 = "2. Data Accuracy & Responsibility";
const tos_data_p$1 = "You are solely responsible for the financial, habit, and planner data you input. Oneformind is a productivity tool, not a certified financial advisor. We are not liable for any financial losses or decisions made based on the data displayed.";
const tos_security_title$1 = "3. Fair Use & Security";
const tos_security_p$1 = "Users are strictly prohibited from attempting to breach system security, conducting SQL injections, scraping data, or disrupting the platform's infrastructure.";
const tos_termination_title$1 = "4. Account Termination";
const tos_termination_p$1 = "We reserve the right to suspend or terminate accounts immediately, without prior notice, if a user is found violating these terms or abusing system resources.";
const legal_close$1 = "Close & Understand";
const habit_meta_title$1 = "Habit Tracker - OneForMind";
const habit_meta_desc$1 = "Track your daily habits, build solid routines, and become the best version of yourself with OneForMind's Habit Tracker.";
const habit_meta_og_title$1 = "Habit Tracker - OneForMind";
const habit_meta_og_desc$1 = "Track your daily habits, build solid routines, and become the best version of yourself.";
const habit_hero_badge$1 = "Habit Tracker";
const habit_hero_title_1$1 = "Build Routines,";
const habit_hero_title_2$1 = "Shape Your Future.";
const habit_hero_desc$1 = "Stop relying on motivation. Our system helps you track habits, maintain your streak, and hit your daily goals effortlessly.";
const habit_hero_cta_1$1 = "Start Tracking Now";
const habit_hero_cta_2$1 = "See How It Works";
const habit_mockup_title$1 = "Morning Routine";
const habit_mockup_streak$1 = "7 Day Streak!";
const habit_mockup_task_1$1 = "Drink 500ml Water";
const habit_mockup_time_1$1 = "06:00 AM";
const habit_mockup_task_2$1 = "10 Min Meditation";
const habit_mockup_time_2$1 = "06:15 AM";
const habit_mockup_task_3$1 = "Read 10 Pages";
const habit_mockup_time_3$1 = "06:30 AM";
const habit_mockup_alert_1$1 = "Level Up!";
const habit_mockup_alert_2$1 = "Habit Master";
const habit_prob_title_1$1 = "Tracking on paper is";
const habit_prob_title_strike$1 = "outdated";
const habit_prob_title_2$1 = "& messy.";
const habit_prob_1_title$1 = "Forgetting to Track";
const habit_prob_1_desc$1 = "Notes get lost, you forget to check boxes, and eventually, good habits just fade away.";
const habit_prob_2_title$1 = "Losing Motivation";
const habit_prob_2_desc$1 = "No visual system to keep you excited about your daily progress.";
const habit_prob_3_title$1 = "Disorganized Chaos";
const habit_prob_3_desc$1 = "Juggling different apps for habits, finances, and tasks. It's overwhelming.";
const habit_feature_1_title$1 = "Monitor Progress with Clear Visuals";
const habit_feature_1_desc$1 = "See exactly how consistent you've been over the past week, month, or year. The color indicator deepens as you maintain your habits.";
const habit_feature_1_point_1$1 = "GitHub-style heatmap for habit contributions";
const habit_feature_1_point_2$1 = "Weekly success rate statistics";
const habit_feature_2_title$1 = "Build Streaks & Don't Break the Chain";
const habit_feature_2_desc$1 = "Our gamification system triggers dopamine every time you complete a habit. Don't let your fire go out just because you skipped a day!";
const habit_feature_2_point_1$1 = "Consecutive day streak counter";
const habit_feature_2_point_2$1 = "Achievement badges for hitting milestones";
const habit_bento_title$1 = "Everything You Need";
const habit_bento_desc$1 = "One unified template, packed with powerful tools.";
const habit_bento_1_title$1 = "Smart Reminders";
const habit_bento_1_desc$1 = "Set specific reminders for each habit. We'll send you notifications so you never miss an important routine again.";
const habit_bento_2_title$1 = "Dark Mode Ready";
const habit_bento_2_desc$1 = "Easy on the eyes, no matter when you open OneForMind.";
const habit_bento_3_title$1 = "Fully Integrated";
const habit_bento_3_desc$1 = "Your daily habits sync directly with your Daily Tracker & To-Do List dashboard.";
const habit_bento_4_title$1 = "Access Anywhere";
const habit_bento_4_desc$1 = "A responsive design that works flawlessly on your Desktop, Tablet, or Smartphone.";
const habit_quote_text$1 = "People do not decide their futures, they decide their habits and their habits decide their futures.";
const habit_quote_author$1 = "— F.M. Alexander";
const habit_cta_title$1 = "Ready to Build Your Best Self?";
const habit_cta_desc$1 = "Join now and experience the difference of having a unified workspace for all your habits, goals, and tasks in OneForMind.";
const habit_cta_btn$1 = "Try OneForMind for Free";
const habit_cta_note$1 = "No credit card required. Setup takes less than 2 minutes.";
const finance_meta_title$1 = "Finance Manager - OneForMind";
const finance_meta_desc$1 = "Track expenses, manage budgets, and monitor your finances easily in one app.";
const finance_meta_og_title$1 = "Finance Manager - OneForMind";
const finance_meta_og_desc$1 = "Track expenses, manage budgets, and monitor your finances easily.";
const finance_hero_badge$1 = "Finance Manager";
const finance_hero_title_1$1 = "Control Your Money,";
const finance_hero_title_2$1 = "Not the Other Way Around.";
const finance_hero_desc$1 = "Track every transaction, monitor monthly budgets, and hit your financial goals without dealing with complex Excel spreadsheets.";
const finance_hero_cta_1$1 = "Start Managing Finances";
const finance_hero_cta_2$1 = "Explore Features";
const finance_mockup_title$1 = "Main Wallet";
const finance_mockup_balance$1 = "Healthy";
const finance_mockup_task_1$1 = "Monthly Salary";
const finance_mockup_time_1$1 = "Feb 25 • Income";
const finance_mockup_task_2$1 = "Iced Brown Sugar Latte";
const finance_mockup_time_2$1 = "Today • Food & Drink";
const finance_mockup_task_3$1 = "Internet Subscription";
const finance_mockup_time_3$1 = "Yesterday • Bills";
const finance_mockup_alert_1$1 = "Goal Reached!";
const finance_mockup_alert_2$1 = "Emergency Fund Filled";
const finance_prob_title_1$1 = "Manual tracking is";
const finance_prob_title_strike$1 = "clunky";
const finance_prob_title_2$1 = "& leaky.";
const finance_prob_1_title$1 = "Money Just Disappears";
const finance_prob_1_desc$1 = "Your salary comes in and quickly vanishes, and you have no idea where it all went.";
const finance_prob_2_title$1 = "Overbudget by Month-End";
const finance_prob_2_desc$1 = "Constantly running out of money before the next payday because there are no spending limits.";
const finance_prob_3_title$1 = "Overcomplicated Apps";
const finance_prob_3_desc$1 = "You need a simple tracker, not corporate accounting software that gives you a headache.";
const finance_feature_1_title$1 = "Clear Expense Visualization";
const finance_feature_1_desc$1 = "Know exactly where your money goes. We turn boring rows of numbers into charts and percentages that are easy to understand in seconds.";
const finance_feature_1_point_1$1 = "Automatic & custom categorization";
const finance_feature_1_point_2$1 = "Monthly summary with pie/bar charts";
const finance_feature_2_title$1 = "Set Budgets & Save Faster";
const finance_feature_2_desc$1 = "Set spending limits for each category. We'll warn you if you're getting close, so you can save more for what matters.";
const finance_feature_2_point_1$1 = "Spending limits per category";
const finance_feature_2_point_2$1 = "Progress bars for savings/dream goals";
const finance_bento_title$1 = "Smart Financial Features";
const finance_bento_desc$1 = "Designed for real people, not accountants.";
const finance_bento_1_title$1 = "Bill Reminders";
const finance_bento_1_desc$1 = "No more late fees. The system will remind you when your electricity, internet, or subscriptions are due.";
const finance_bento_2_title$1 = "Easy on the Eyes";
const finance_bento_2_desc$1 = "Elegant dark mode for checking your balance at night before bed.";
const finance_bento_3_title$1 = "Multi-Account Wallets";
const finance_bento_3_desc$1 = "Keep separate ledgers for your Cash, Bank Accounts, and favorite E-Wallets.";
const finance_bento_4_title$1 = "Access on Your Phone";
const finance_bento_4_desc$1 = "Log expenses right after buying a snack via your smartphone without opening a laptop.";
const finance_privacy_title$1 = "Security is Our Priority";
const finance_privacy_desc$1 = "Financial information is highly sensitive. OneForMind was built with privacy in mind from day one, so you can track your money with peace of mind.";
const finance_privacy_point_1_title$1 = "Secure Encryption";
const finance_privacy_point_1_desc$1 = "Your transaction data is encrypted in our database.";
const finance_privacy_point_2_title$1 = "No Bank Access";
const finance_privacy_point_2_desc$1 = "We do not ask for PINs or direct connections to your real bank accounts.";
const finance_privacy_point_3_title$1 = "Your Data is Yours";
const finance_privacy_point_3_desc$1 = "We never sell your financial data to third parties.";
const finance_quote_text$1 = "Do not save what is left after spending, but spend what is left after saving.";
const finance_quote_author$1 = "— Warren Buffett";
const finance_cta_title$1 = "Ready to Manage Your Money Better?";
const finance_cta_desc$1 = "Start logging your first transaction and track your habits and finances in one place with OneForMind.";
const finance_cta_btn$1 = "Open Your Free Account";
const finance_cta_note$1 = "Secure. Private. No credit card required.";
const planner_meta_title$1 = "Daily Planner - OneForMind";
const planner_meta_desc$1 = "Manage your daily schedule, block your time, and get important tasks done without distractions using OneForMind's Daily Planner.";
const planner_meta_og_title$1 = "Daily Planner - OneForMind";
const planner_meta_og_desc$1 = "Manage your daily schedule, block your time, and get important tasks done without distractions.";
const planner_hero_badge$1 = "Daily Planner";
const planner_hero_title_1$1 = "Master Your Time,";
const planner_hero_title_2$1 = "Get More Done.";
const planner_hero_desc$1 = "Stop feeling busy but unproductive. Organize your daily schedule, prioritize tasks, and achieve flow state with our smart To-Do List system.";
const planner_hero_cta_1$1 = "Start Planning";
const planner_hero_cta_2$1 = "Explore Features";
const planner_mockup_title$1 = "Today's Schedule";
const planner_mockup_status$1 = "On Track";
const planner_mockup_task_1$1 = "Team Sprint Planning";
const planner_mockup_time_1$1 = "09:00 AM • Done";
const planner_mockup_task_2$1 = "Review Laravel Code";
const planner_mockup_time_2$1 = "01:00 PM • In Progress";
const planner_mockup_task_3$1 = "Reply to Client Emails";
const planner_mockup_time_3$1 = "04:00 PM • Pending";
const planner_mockup_alert_1$1 = "Focus Time";
const planner_mockup_alert_2$1 = "Pomodoro is Running...";
const planner_prob_title_1$1 = "Keeping schedules in your head is";
const planner_prob_title_strike$1 = "messy";
const planner_prob_title_2$1 = "& stressful.";
const planner_prob_1_title$1 = "Overwhelmed Mind";
const planner_prob_1_desc$1 = "Too much to do, not knowing where to start, and eventually ending up scrolling social media.";
const planner_prob_2_title$1 = "Constant Procrastination";
const planner_prob_2_desc$1 = "Tasks pile up because there is no clear time allocation to actually get them done.";
const planner_prob_3_title$1 = "Missed Deadlines";
const planner_prob_3_desc$1 = "Forgetting important meetings because you relied solely on memory without a solid tracking system.";
const planner_feature_1_title$1 = "Time Blocking & Task Management";
const planner_feature_1_desc$1 = "Don't just list tasks, allocate time for them. With Time Blocking, you visualize your day and prevent work from expanding beyond its limits.";
const planner_feature_1_point_1$1 = "Daily & weekly calendar views";
const planner_feature_1_point_2$1 = "Time estimation for each task";
const planner_feature_2_title$1 = "Focus on What Truly Matters";
const planner_feature_2_desc$1 = "Not all tasks are created equal. Tag your tasks with priority levels (High, Medium, Low) so your best energy goes to the most impactful work.";
const planner_feature_2_point_1$1 = "Color-coded priority label system";
const planner_feature_2_point_2$1 = "Hide non-essential tasks during focus mode";
const planner_bento_title$1 = "Limitless Productivity";
const planner_bento_desc$1 = "More than just a basic checklist.";
const planner_bento_1_title$1 = "Recurring Tasks";
const planner_bento_1_desc$1 = "Automatically generate repeating tasks (daily, weekly, monthly) without retyping them.";
const planner_bento_2_title$1 = "Focus Timer";
const planner_bento_2_desc$1 = "Use our built-in Pomodoro technique to maintain concentration and prevent burnout.";
const planner_bento_3_title$1 = "Habit Sync";
const planner_bento_3_desc$1 = "See your daily habits directly inside your Planner agenda without switching tabs.";
const planner_bento_4_title$1 = "Drag & Drop";
const planner_bento_4_desc$1 = "Easily reschedule tasks by simply dragging and dropping them across your calendar.";
const planner_quote_text$1 = "The key is in not spending time, but in investing it.";
const planner_quote_author$1 = "— Stephen R. Covey";
const planner_cta_title$1 = "Ready to Conquer Your Day?";
const planner_cta_desc$1 = "Design a successful routine, get more tasks done, and reclaim your free time with OneForMind.";
const planner_cta_btn$1 = "Use Planner for Free";
const planner_cta_note$1 = "Instant access. Easy to use. No credit card required.";
const planner_mechanism_1_title$1 = "The Perfect Mechanism.";
const planner_mechanism_1_desc$1 = "We designed this planner system to keep your mind clear. Everything you need for task execution is right here.";
const journal_meta_title$1 = "Digital Journal - OneForMind";
const journal_meta_desc$1 = "A safe place for your thoughts. Write journals, track moods, and find peace.";
const journal_meta_og_title$1 = "Digital Journal - OneForMind";
const journal_meta_og_desc$1 = "A safe place for your thoughts. Write journals, track moods, and find peace.";
const journal_hero_badge$1 = "Digital Journal";
const journal_hero_title_1$1 = "Clear Your Mind,";
const journal_hero_title_2$1 = "Understand Yourself.";
const journal_hero_desc$1 = "Log your daily journey, track your mood, and discover patterns in your thoughts with a distraction-free writing space.";
const journal_hero_cta_1$1 = "Start Writing";
const journal_hero_cta_2$1 = "Explore Journal";
const journal_mockup_title$1 = "A wonderful day at campus";
const journal_mockup_date$1 = "Tuesday, February 17";
const journal_mockup_text_1$1 = "Today I managed to finish the coding revision that was erroring since yesterday...";
const journal_mockup_text_2$1 = "It feels so relieving. Finally can take a breather before...";
const journal_mockup_typing$1 = "Typing...";
const journal_prob_title_1$1 = "Keeping stress";
const journal_prob_title_strike$1 = "inside your chest";
const journal_prob_title_2$1 = "exhausts you quickly.";
const journal_prob_main_desc$1 = "Tangled thoughts need a place to unravel. Otherwise, anxiety will take over your day.";
const journal_prob_1_title$1 = "Noisy Mind";
const journal_prob_1_desc$1 = "Overthinking that prevents a good night's sleep.";
const journal_prob_2_title$1 = "Forgetting Gratitude";
const journal_prob_2_desc$1 = "Too focused on problems, making you forget small achievements.";
const journal_prob_3_title$1 = "Pent-up Emotions";
const journal_prob_3_desc$1 = "Failing to recognize your own emotional patterns that keep fluctuating.";
const journal_feature_1_title$1 = "Distraction-Free Writing";
const journal_feature_1_desc$1 = "As you type, all other UI elements fade away. Enter 'Zen Mode' where it's just you, your keyboard, and your thoughts.";
const journal_feature_1_point_1$1 = "Sometimes all you need is a blank canvas to pour your head out.";
const journal_feature_1_point_2$1 = "Release the burden, write honestly.";
const journal_feature_2_title$1 = "Track Daily Mood";
const journal_feature_2_desc$1 = "Choose an emoji that describes your feelings every time you journal. Monitor your emotional fluctuations over a month to better understand yourself.";
const journal_feature_2_point_1$1 = "Monthly Mood Board";
const journal_feature_2_point_2$1 = "Mood & Productivity Correlation";
const journal_bento_title$1 = "Your Safe Space";
const journal_bento_desc$1 = "Private, beautiful, and profound.";
const journal_bento_1_title$1 = "Locked Journal";
const journal_bento_1_desc$1 = "Your writings are your secrets. Access with a PIN or biometrics.";
const journal_bento_2_title$1 = "Insert Photos";
const journal_bento_2_desc$1 = "Capture visual memories to complete your daily story.";
const journal_bento_3_title$1 = "Flashbacks";
const journal_bento_3_desc$1 = "The system will remind you of writings you made a year ago.";
const journal_quote_text$1 = "Journal writing is a voyage to the interior.";
const journal_quote_author$1 = "Christina Baldwin";
const journal_cta_title$1 = "Start Your First Entry.";
const journal_cta_desc$1 = "Sit back, take a deep breath, and let your fingers dance to tell your day.";
const journal_cta_btn$1 = "Turn a New Page";
const journal_cta_note$1 = "Your writing space is 100% private.";
const calendar_meta_title$1 = "Smart Calendar - OneForMind";
const calendar_meta_desc$1 = "Manage your time better. Sync all your schedules, use time-blocking, and never miss an important meeting again.";
const calendar_meta_og_title$1 = "Smart Calendar - OneForMind";
const calendar_meta_og_desc$1 = "Manage your time better with OneForMind Calendar.";
const calendar_hero_badge$1 = "Smart Calendar";
const calendar_hero_title_1$1 = "Master Your Time,";
const calendar_hero_title_2$1 = "Win Your Day.";
const calendar_hero_desc$1 = "Turn chaotic schedules into seamless workflows. Sync all your calendars in one place, block time for deep work, and get more done.";
const calendar_hero_cta_1$1 = "Set Your Schedule";
const calendar_hero_cta_2$1 = "Explore Calendar";
const calendar_mockup_month$1 = "February 2026";
const calendar_mockup_today$1 = "Today's Agenda";
const calendar_mockup_date$1 = "Tuesday, February 17";
const calendar_mockup_event_1$1 = "Weekly Team Sync";
const calendar_mockup_event_1_time$1 = "09:00 - 10:30";
const calendar_mockup_location_1$1 = "Google Meet";
const calendar_mockup_event_2$1 = "Client Pitch: Project Alpha";
const calendar_mockup_event_2_time$1 = "13:00 - 14:00";
const calendar_mockup_location_2$1 = "Zoom Video";
const calendar_mockup_event_3$1 = "Deep Work & Review Session";
const calendar_mockup_event_3_time$1 = "19:00 - 20:00";
const calendar_mockup_location_3$1 = "Personal Focus";
const calendar_mockup_alert_1$1 = "Up Next";
const calendar_mockup_alert_2$1 = "Client Pitch in 15 mins!";
const calendar_prob_title_1$1 = "Relying on";
const calendar_prob_title_strike$1 = "just your memory";
const calendar_prob_title_2$1 = "is a recipe for disaster.";
const calendar_prob_1_title$1 = "Double Booking";
const calendar_prob_1_desc$1 = "Often agreeing to two meetings at the same time because you forgot to check your schedule.";
const calendar_prob_2_title$1 = "Busy, but Unfocused";
const calendar_prob_2_desc$1 = "Days filled with meetings, leaving absolutely no time to actually get the real work done.";
const calendar_prob_3_title$1 = "Isolated Calendars";
const calendar_prob_3_desc$1 = "Switching back and forth between work Google Calendar and personal Apple Calendar is a headache.";
const calendar_feature_1_title$1 = "One Calendar to Rule Them All";
const calendar_feature_1_desc$1 = "No more app switching. Connect your Google Calendar, Outlook, and Apple Calendar into one clean and neat OneForMind dashboard.";
const calendar_feature_2_title$1 = "Simple Time-Blocking";
const calendar_feature_2_desc$1 = "Protect your time. Allocate specific time blocks for answering emails, coding, or resting, so your day isn't entirely consumed by meetings.";
const calendar_feature_2_point_1$1 = "Drag & Drop Duration";
const calendar_feature_2_point_2$1 = "Focus Time Protection";
const calendar_bento_title$1 = "Time is Your Greatest Asset";
const calendar_bento_desc$1 = "Maximize every second of it with these tools.";
const calendar_bento_1_title$1 = "Auto Timezones";
const calendar_bento_1_desc$1 = "Schedules automatically adjust when you travel or meet with international clients.";
const calendar_bento_2_title$1 = "Color Coding";
const calendar_bento_2_desc$1 = "Assign different colors for work, personal, or family matters.";
const calendar_bento_3_title$1 = "Smart Notifications";
const calendar_bento_3_desc$1 = "Get reminders on your phone or email before your events start.";
const calendar_bento_4_title$1 = "Share Your Availability";
const calendar_bento_4_desc$1 = "Send one link to clients to let them automatically pick your empty slots without endless back-and-forth chats.";
const calendar_quote_text$1 = "The key is in not spending time, but in investing it.";
const calendar_quote_author$1 = "Stephen R. Covey";
const calendar_cta_title$1 = "Stop Chasing Time.";
const calendar_cta_desc$1 = "It's time you take control of your hours. Build a schedule that works for you, not against you.";
const calendar_cta_btn$1 = "Open Your Calendar";
const calendar_cta_note$1 = "Syncs in seconds.";
const student_meta_title$1 = "Solutions for Students - OneForMind";
const student_meta_desc$1 = "Manage assignments, class schedules, and student finances in one place. Stop feeling overwhelmed and start mastering your college life.";
const student_meta_og_title$1 = "OneForMind for Students";
const student_meta_og_desc$1 = "The all-in-one productivity operating system for ambitious students.";
const student_hero_badge$1 = "For Students";
const student_hero_title_1$1 = "Grades Secured,";
const student_hero_title_2$1 = "Sanity Intact.";
const student_hero_desc$1 = "From final projects and organization meetings to managing tight monthly dorm budgets. OneForMind helps unify all that chaos into one neat screen.";
const student_hero_cta_1$1 = "Organize Your Life";
const student_hero_social_proof$1 = "Join hundreds of other students.";
const student_prob_title$1 = "Student Struggles 101";
const student_prob_desc$1 = "We know exactly what keeps you overthinking every night.";
const student_prob_1_title$1 = "Piling Assignments";
const student_prob_1_desc$1 = "Deadlines from 5 different courses arrive in the same week. You don't know where to start.";
const student_prob_2_title$1 = "Broke by Month-End";
const student_prob_2_desc$1 = "Your allowance or freelance money vanishes into thin air before the 20th.";
const student_prob_3_title$1 = "Clashing Schedules";
const student_prob_3_desc$1 = "Committee meetings always collide with group project times or your much-needed rest.";
const student_feat_1_visual_badge$1 = "Project Manager";
const student_feat_1_title$1 = "Track All College & Portfolio Projects";
const student_feat_1_desc$1 = "From working on final assignments to building a personal portfolio. Break massive tasks into logical small steps to avoid procrastination.";
const student_feat_1_point_1$1 = "Kanban boards for progress tracking.";
const student_feat_1_point_2$1 = "Sub-tasks to divide teamwork clearly.";
const student_feat_2_title$1 = "Survive on a Student Budget";
const student_feat_2_desc$1 = "Monitor your remaining monthly balance in real-time. Know exactly your daily food allowance so you don't have to keep leeching off cafe WiFi.";
const student_feat_2_point_1$1 = "Daily Spending Limits";
const student_feat_2_point_2$1 = "Savings for New Tech Setup";
const student_bento_title$1 = "Student Survival Kit";
const student_bento_desc$1 = "Supplementary features to survive the fierce campus life.";
const student_bento_1_title$1 = "Overthinking Journal";
const student_bento_1_desc$1 = "Pour out your revision stress or rants into a secure, private journal.";
const student_bento_2_title$1 = "All-Nighter Mode";
const student_bento_2_desc$1 = "Eye-friendly dark mode for doing assignments until 3 AM.";
const student_bento_3_title$1 = "Cloud Sync";
const student_bento_3_desc$1 = "Safely access via phone in class, or laptop at the library.";
const student_cta_title$1 = "Don't Just Survive, Be an Achiever.";
const student_cta_desc$1 = "A good system separates students who merely pass from those who truly shine on campus.";
const student_cta_btn$1 = "Sign Up for Free Now";
const student_cta_note$1 = "Basic features are free, forever.";
const freelance_meta_title$1 = "Solutions for Freelancers & Remote Workers - OneForMind";
const freelance_meta_desc$1 = "The all-in-one workspace for freelancers. Manage multiple clients, track invoices, and hit deadlines without the stress.";
const freelance_meta_og_title$1 = "OneForMind for Freelancers";
const freelance_meta_og_desc$1 = "Level up your professionalism with a streamlined system.";
const freelance_hero_badge$1 = "For Freelancers";
const freelance_hero_title_1$1 = "Work Freely,";
const freelance_hero_title_2$1 = "Not Chaotically.";
const freelance_hero_desc$1 = "Manage multiple clients, track unpaid invoices, and conquer deadlines across different time zones. All from one professional dashboard.";
const freelance_hero_cta_1$1 = "Start Working Like a Pro";
const freelance_hero_social_proof$1 = "Trusted by remote workers and digital agencies.";
const freelance_prob_title$1 = "The Freelance Rollercoaster";
const freelance_prob_desc$1 = "The inevitable phases when you don't have a solid system in place.";
const freelance_prob_1_title$1 = "Overwhelmed";
const freelance_prob_1_desc$1 = "Revisions piling up from 3 different clients at once. You have no idea where to start.";
const freelance_prob_2_title$1 = "Unpaid Invoices";
const freelance_prob_2_desc$1 = "The work was done last month, but the money isn't in because you forgot to follow up.";
const freelance_prob_3_title$1 = "Severe Burnout";
const freelance_prob_3_desc$1 = "Working 24/7 with no clear boundaries because your bedroom is your office.";
const freelance_feat_1_title$1 = "Your Project Command Center";
const freelance_feat_1_desc$1 = "Track every revision, set daily targets, and monitor client progress without opening dozens of headache-inducing tabs.";
const freelance_feat_1_point_1$1 = "Multi-Client Kanban Boards";
const freelance_feat_1_point_2$1 = "Real-Time Progress Tracking";
const freelance_feat_2_title$1 = "Track Finances & Invoices";
const freelance_feat_2_desc$1 = "Don't let your hard work go unpaid. The system helps you track which projects are settled and which invoices are still pending.";
const freelance_feat_2_point_1$1 = "Income Tracked";
const freelance_feat_2_point_2$1 = "Automated Reminders";
const freelance_bento_title$1 = "The Freelancer's Arsenal";
const freelance_bento_desc$1 = "Features that make you look like a top-tier agency.";
const freelance_bento_1_title$1 = "Client Management";
const freelance_bento_1_desc$1 = "Store client briefs, assets, and revision histories neatly.";
const freelance_bento_2_title$1 = "Time Tracker";
const freelance_bento_2_desc$1 = "Track how many hours you spend per project for hourly rate billing.";
const freelance_bento_3_title$1 = "Tax Recaps";
const freelance_bento_3_desc$1 = "Ready-to-use income data to simplify your annual tax reporting.";
const freelance_bento_4_title$1 = "Client Portal (Soon)";
const freelance_bento_4_desc$1 = "Share a custom link so clients can view your work progress without constantly asking for updates via chat.";
const freelance_cta_title$1 = "Ready to Scale Your Freelance Biz?";
const freelance_cta_desc$1 = "Clients love working with organized freelancers, and you deserve to be paid well for it.";
const freelance_cta_btn$1 = "Upgrade Your Workspace";
const freelance_cta_note$1 = "Take control of your business today.";
const growth_meta_title$1 = "Personal Growth & Self-Improvement - OneForMind";
const growth_meta_desc$1 = "Build good habits, clear your mind with journaling, and achieve the best version of yourself every day.";
const growth_meta_og_title$1 = "OneForMind for Personal Growth";
const growth_meta_og_desc$1 = "A system to build new identities and unstoppable habits.";
const growth_hero_badge$1 = "For Personal Growth";
const growth_hero_title_1$1 = "Stop Planning,";
const growth_hero_title_2$1 = "Start Executing.";
const growth_hero_desc$1 = "A comprehensive system to track your habits, reflect on your thoughts, and build the best version of yourself every single day. Little by little, step by step.";
const growth_hero_cta_1$1 = "Start Your Transformation";
const growth_hero_social_proof$1 = "Trusted by thousands of dream chasers.";
const growth_prob_title_dark$1 = "The Vicious Rut";
const growth_prob_desc_dark$1 = "A noisy mind, recurring bad habits, and motivation spikes that only last for two days before vanishing.";
const growth_prob_point_1$1 = "Endless scrolling and cheap dopamine.";
const growth_prob_point_2$1 = "Starting many things, finishing none.";
const growth_prob_title_light$1 = "The Growth Loop";
const growth_prob_desc_light$1 = "Mental clarity, automated systems, and a new identity built upon small but consistent daily habits.";
const growth_prob_point_3$1 = "Laser-sharp, distraction-free focus.";
const growth_prob_point_4$1 = "Compounding 1% daily growth.";
const growth_feat_1_title$1 = "Forge a New Identity Through Habits";
const growth_feat_1_desc$1 = "Every time you complete a habit, you cast a vote for the type of person you wish to become. Build your winning streak and never break the chain.";
const growth_feat_1_point_1$1 = "Precision Habit Tracking";
const growth_feat_1_point_2$1 = "Milestones & Consistency Rewards";
const growth_feat_2_title$1 = "A Quiet Space For Your Mind";
const growth_feat_2_desc$1 = "Step away from the digital noise. Enter 'Zen Mode' and start untangling the knots in your head through daily reflective journaling without noisy UI distractions.";
const growth_feat_2_quote_title$1 = "Sometimes, the best productivity hack is a pause to understand yourself.";
const growth_feat_2_quote_body$1 = "Writing down how you feel helps you master what you will do next.";
const growth_bento_title$1 = "Your Growth Ecosystem";
const growth_bento_desc$1 = "Supporting tools to hack your maximum potential.";
const growth_bento_1_title$1 = "Audio Focus";
const growth_bento_1_desc$1 = "Lofi and nature sound integrations to enter your flow state (Soon).";
const growth_bento_2_title$1 = "Dark Mode";
const growth_bento_2_desc$1 = "A soothing dark theme for deep late-night reflections.";
const growth_bento_3_title$1 = "Long-Term Resolutions";
const growth_bento_3_desc$1 = "Break down your massive yearly goals into actionable daily steps. When vision meets routine, nothing is impossible.";
const growth_bento_4_title$1 = "Mood Analytics";
const growth_bento_4_desc$1 = "Understand your emotional cycles and their impact on your output.";
const growth_bento_5_title$1 = "Daily Inspirations";
const growth_bento_5_desc$1 = "Stoic quotes and philosophy on your dashboard to spark your drive.";
const growth_cta_title$1 = "Today is Day One.";
const growth_cta_desc$1 = "Your future is shaped by what you do today, not tomorrow. Take that first step right now.";
const growth_cta_btn$1 = "Start Your Growth Journey";
const growth_cta_note$1 = "100% free to start taking small steps.";
const guide_meta_title$1 = "Guide & Knowledge Base - OneForMind";
const guide_meta_desc$1 = "Everything you need to master your workflow and mindset.";
const guide_meta_og_title$1 = "OneForMind Knowledge Base";
const guide_meta_og_desc$1 = "Master your mind with our comprehensive guides.";
const guide_hero_badge$1 = "Official Knowledge Base";
const guide_hero_title_1$1 = "Master Your Workflow";
const guide_hero_title_2$1 = "Knowledge Base";
const guide_hero_desc$1 = "Explore our comprehensive library of guides, tutorials, and best practices to help you achieve peak productivity.";
const guide_search_placeholder$1 = "What are you looking for?";
const guide_search_btn$1 = "Search";
const guide_popular_search$1 = "Popular:";
const guide_tag_1$1 = "Budgeting";
const guide_tag_2$1 = "Calendar Sync";
const guide_tag_3$1 = "Zen Mode";
const guide_modules_badge$1 = "Curated Lessons";
const guide_modules_title$1 = "Explore by Category";
const guide_mod_1_title$1 = "Mindset Growth";
const guide_mod_1_desc$1 = "Learn the fundamentals of cognitive psychology for productivity.";
const guide_mod_2_title$1 = "Financial Zen";
const guide_mod_2_desc$1 = "Master your money with our automated budgeting workflows.";
const guide_mod_3_title$1 = "Time Mastery";
const guide_mod_3_desc$1 = "Advanced scheduling techniques to reclaim your time.";
const guide_mod_4_title$1 = "Journaling";
const guide_mod_4_desc$1 = "How to reflect effectively using our digital journals.";
const guide_btn_learn$1 = "Learn more";
const guide_start_title$1 = "Get Started Fast";
const guide_start_desc$1 = "New to OneForMind? Follow these three simple steps.";
const guide_start_step_1_title$1 = "Create Your Account";
const guide_start_step_1_desc$1 = "Set up your profile and choose your primary goals.";
const guide_start_step_2_title$1 = "Sync Your Tools";
const guide_start_step_2_desc$1 = "Connect your calendar and bank for full automation.";
const guide_start_step_3_title$1 = "Build Habits";
const guide_start_step_3_desc$1 = "Start with 5 minutes of daily reflection.";
const guide_articles_title$1 = "Featured Articles";
const guide_articles_desc$1 = "Deep dives into specific topics.";
const guide_btn_all$1 = "View All";
const guide_btn_read$1 = "Read";
const guide_read_time$1 = "min read";
const guide_support_title$1 = "Need more help?";
const guide_support_desc$1 = "Our team and community are here to support your journey.";
const guide_btn_contact$1 = "Contact Support";
const guide_btn_community$1 = "Discord Community";
const guide_art_1_title$1 = "How to Start with OneForMind";
const guide_art_1_desc$1 = "Step-by-step guide to kickstart your productivity journey.";
const guide_art_2_title$1 = "5 Tips to Maximize Your Habit Tracker";
const guide_art_2_desc$1 = "Strategies for building unstoppable habits.";
const guide_art_3_title$1 = "Using Time Blocking for Maximum Focus";
const guide_art_3_desc$1 = "How to structure your day for peak productivity and deep work sessions.";
const blog_meta_title$1 = "Blog & Articles - OneForMind";
const blog_meta_desc$1 = "Read the latest insights on productivity, personal growth, and feature updates from the OneForMind team.";
const blog_meta_og_title$1 = "OneForMind Blog";
const blog_meta_og_desc$1 = "Insights and strategies to work smarter.";
const blog_hero_badge$1 = "Featured Editorial";
const blog_feat_title$1 = "Building a Bulletproof Productivity System This Year";
const blog_cat_all$1 = "All Articles";
const blog_cat_prod$1 = "Product";
const blog_cat_student$1 = "Student";
const blog_cat_freelance$1 = "Freelance";
const blog_cat_updates$1 = "Updates";
const blog_grid_1_title$1 = "Why Motivation Alone Isn't Enough";
const blog_grid_1_desc$1 = "We often get trapped seeking motivation. What you really need is a fail-proof environment design system.";
const blog_grid_1_date$1 = "Feb 18, 2026";
const blog_grid_2_title$1 = "How to Setup a 50/30/20 Budget";
const blog_grid_2_desc$1 = "A guide to automating your salary so you can invest while still enjoying good food.";
const blog_grid_2_date$1 = "Feb 15, 2026";
const blog_grid_3_title$1 = "Book Review: Atomic Habits";
const blog_grid_3_desc$1 = "Key lessons from James Clear's book and how we applied them to our Habit Tracker.";
const blog_grid_3_date$1 = "Feb 10, 2026";
const blog_grid_4_title$1 = "Moving to Laravel: Our Engineering Story";
const blog_grid_4_desc$1 = "The reasons why our team decided to use Laravel to build the OneForMind architecture.";
const blog_grid_4_date$1 = "Feb 05, 2026";
const blog_grid_5_title$1 = "Update v1.2: Dark Mode & Calendar";
const blog_grid_5_desc$1 = "The most requested features are finally here. Read the full changelog.";
const blog_grid_5_date$1 = "Jan 28, 2026";
const blog_news_badge$1 = "Weekly Insight";
const blog_news_title$1 = "Never Miss an Update";
const blog_news_desc$1 = "Get one email every Monday packed with actionable productivity tips, no spam.";
const blog_news_placeholder$1 = "Enter your email address...";
const blog_news_btn$1 = "Subscribe";
const blog_news_note$1 = "Free subscription. Unsubscribe anytime.";
const blog_hero_title_1$1 = "Curated Thoughts on";
const blog_hero_title_2$1 = "Mindset & Growth";
const blog_meta_date$1 = "Feb 18, 2026";
const blog_feat_label$1 = "Featured Article";
const blog_feat_desc$1 = "How we rebuilt our focus by stripping away the noise and focusing on what truly matters for our cognitive health.";
const privacy_meta_title$1 = "Trust Center & Privacy Policy";
const privacy_meta_desc$1 = "Learn how OneForMind protects your data, privacy, and ensures your security.";
const privacy_meta_og_title$1 = "Trust Center — OneForMind";
const privacy_meta_og_desc$1 = "We believe your habits and finances are your own business. Read our privacy policy.";
const privacy_badge$1 = "Trust & Privacy Center";
const privacy_title_1$1 = "Your Data.";
const privacy_title_2$1 = "Your Rules.";
const privacy_subtitle$1 = "We build tools to help you take control of your life, not to exploit your personal information. Transparency is our default.";
const privacy_last_updated$1 = "Last Updated: Feb 18, 2026";
const privacy_status$1 = "Active Version";
const privacy_toc_title$1 = "Contents";
const privacy_download_pdf$1 = "Download as PDF";
const privacy_tldr_title$1 = "The TL;DR Version";
const privacy_tldr_1_title$1 = "No Selling Data";
const privacy_tldr_1_desc$1 = "We never sell your personal information or financial data to third parties.";
const privacy_tldr_2_title$1 = "Right to Delete";
const privacy_tldr_2_desc$1 = "You own your data. You can export or permanently delete your account at any time.";
const privacy_tldr_3_title$1 = "Bank-Grade Security";
const privacy_tldr_3_desc$1 = "Your financial records and habits are encrypted in transit and at rest.";
const privacy_tldr_4_title$1 = "Minimal Tracking";
const privacy_tldr_4_desc$1 = "We only use essential cookies to keep you logged in and functional analytics.";
const privacy_doc_intro$1 = 'This Privacy Policy describes how OneForMind ("we", "us", or "our") collects, uses, and shares your personal information when you use our web application, tools, and services.';
const privacy_h2_collection$1 = "2. Information We Collect";
const privacy_p_collection$1 = "We believe in data minimization. We only collect what is strictly necessary to make the app work for you.";
const privacy_li_collection_1_title$1 = "Account Information";
const privacy_li_collection_1_desc$1 = "Name, email address, and authentication credentials (if not using Google OAuth).";
const privacy_li_collection_2_title$1 = "User-Generated Content";
const privacy_li_collection_2_desc$1 = "Habit logs, financial entries, journal notes, and planner tasks.";
const privacy_li_collection_2_strong$1 = "This data is strictly private to your account.";
const privacy_li_collection_3_title$1 = "Device & Usage Data";
const privacy_li_collection_3_desc$1 = "Basic analytics such as IP address, browser type, and operating system to help us debug errors.";
const privacy_h2_usage$1 = "3. How We Use Your Data";
const privacy_p_usage$1 = "Your data is used exclusively to provide and improve the OneForMind experience. Specifically, we use it to:";
const privacy_li_usage_1$1 = "Provide you with the core functionalities (habit tracking, financial insights, task management).";
const privacy_li_usage_2$1 = "Send you important account notifications (e.g., password resets).";
const privacy_li_usage_3$1 = "Analyze anonymous, aggregated usage patterns to improve our UI/UX.";
const privacy_finance_note_title$1 = "Important Note on Finances";
const privacy_finance_note_desc$1 = "We are not a bank. We do not connect directly to your bank accounts. All financial data is manually inputted by you and is used solely to generate personal insights.";
const privacy_h2_security$1 = "4. Data Security";
const privacy_p_security$1 = "We implement standard industry practices to protect your data. Our databases are secured, and we enforce HTTPS/SSL for all communications. Passwords are securely hashed using modern cryptographic algorithms.";
const privacy_h2_cookies$1 = "5. Cookies and Tracking";
const privacy_p_cookies$1 = 'OneForMind uses "cookies" to remember your session and preferences (like Dark mode). We do not use intrusive third-party advertising trackers on our dashboard.';
const privacy_h2_rights$1 = "6. Your Rights";
const privacy_p_rights$1 = "Depending on your location, you have the right to:";
const privacy_li_rights_1$1 = "Access the personal information we hold about you.";
const privacy_li_rights_2$1 = "Request the correction of inaccurate data.";
const privacy_li_rights_3$1 = "Request the permanent deletion of your account and all associated data.";
const privacy_h2_contact$1 = "7. Contact Us";
const privacy_p_contact$1 = "If you have any questions or data deletion requests, please reach out to us:";
const privacy_contact_role$1 = "Data Protection Officer";
const privacy_contact_email$1 = "privacy@oneformind.com";
const privacy_contact_sla$1 = "We typically respond within 24-48 business hours.";
const privacy_export_title$1 = "Data Portability";
const privacy_export_desc$1 = "We don't hold your data hostage. You can download a complete backup of your habits, finances, and journals anytime.";
const privacy_export_point_1$1 = "Export to raw JSON format";
const privacy_export_point_2$1 = "Instant generation, no waiting required";
const privacy_export_code_comment$1 = "Your data is strictly yours.";
const privacy_faq_title$1 = "Frequently Asked Questions";
const privacy_faq_1_q$1 = "Can your team read my private journal entries?";
const privacy_faq_1_a$1 = "No. We have strict internal access controls. Unless you explicitly share an error log with our support team, your user-generated content remains entirely private.";
const privacy_faq_2_q$1 = "Do you sell my data to advertisers?";
const privacy_faq_2_a$1 = "Absolutely not. Our business model is based on providing a great productivity tool, not acting as a data broker.";
const privacy_faq_3_q$1 = "How do I delete my account?";
const privacy_faq_3_a$1 = "You can delete your account permanently directly from your Profile Settings inside the dashboard. This action will wipe all your data from our servers.";
const privacy_cta_title$1 = "Ready to take control?";
const privacy_cta_desc$1 = "Join thousands of users who trust OneForMind for their daily productivity.";
const privacy_cta_btn$1 = "Start Your Journey";
const terms_meta_title$1 = "Terms of Service - The Rulebook";
const terms_meta_desc$1 = "Read the rules regarding the use of OneForMind. Clear, transparent, and fair terms of service.";
const terms_meta_og_title$1 = "OneForMind Terms of Service";
const terms_meta_og_desc$1 = "The agreement between you and OneForMind.";
const terms_badge$1 = "Legal Blueprint";
const terms_title_1$1 = "Rules of";
const terms_title_2$1 = "Engagement";
const terms_subtitle$1 = "By using OneForMind, you agree to these terms. Think of this as the handshake before we start building your productivity system together.";
const terms_effective_date$1 = "Effective: Feb 18, 2026";
const terms_nav_title$1 = "Table of Contents";
const terms_intro_text$1 = "Welcome to OneForMind. These Terms of Service ('Terms') govern your access to and use of our services.";
const terms_intro_sub$1 = "Please read them carefully. By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.";
const terms_h2_eligibility$1 = "2. Eligibility";
const terms_p_eligibility$1 = "Our services are not for everyone. To maintain a safe and legal environment, you must meet the following criteria:";
const terms_eligibility_1$1 = "Must be at least 13 years old";
const terms_eligibility_2$1 = "Not a robot (Human users only)";
const terms_h2_rules$1 = "3. Code of Conduct";
const terms_p_rules$1 = "We encourage productivity, not chaos. When using OneForMind, you agree to play by the rules.";
const terms_rules_do_title$1 = "You Should";
const terms_rules_do_1$1 = "Use the app to track your own habits and finances.";
const terms_rules_do_2$1 = "Keep your password secure.";
const terms_rules_do_3$1 = "Export your data regularly for backups.";
const terms_rules_dont_title$1 = "You Must Not";
const terms_rules_dont_1$1 = "Attempt to hack or reverse engineer the API.";
const terms_rules_dont_2$1 = "Use the service for illegal activities.";
const terms_rules_dont_3$1 = "Share your account with multiple people.";
const terms_h2_payment$1 = "4. Payments & Subscriptions";
const terms_p_payment$1 = "Some features of OneForMind are billed on a subscription basis ('Subscription(s)'). You will be billed in advance on a recurring and periodic basis.";
const terms_li_payment_1_title$1 = "Free Trial";
const terms_li_payment_1_desc$1 = "You may be required to enter your billing information to sign up for the Free Trial.";
const terms_li_payment_2_title$1 = "Refunds";
const terms_li_payment_2_desc$1 = "Certain refund requests for Subscriptions may be considered by OneForMind on a case-by-case basis.";
const terms_h2_termination$1 = "5. Termination";
const terms_p_termination$1 = "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.";
const terms_h2_liability$1 = "6. Limitation of Liability";
const terms_legal_caps$1 = "IN NO EVENT SHALL ONEFORMIND, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES.";
const terms_cta_title$1 = "Ready to get started?";
const terms_cta_desc$1 = "By clicking 'I Agree & Register', you acknowledge that you have read and understood these terms.";
const terms_cta_btn_agree$1 = "I Agree & Register";
const terms_cta_btn_decline$1 = "I Decline";
const terms_cta_note$1 = "Clicking 'I Decline' will return you to the home page.";
const stories_meta_title$1 = "User Stories & Inspiration - OneForMind";
const stories_meta_desc$1 = "Hear real stories from people who have transformed their lives, managed their finances, and built new habits with OneForMind.";
const stories_meta_og_title$1 = "OneForMind Success Stories";
const stories_meta_og_desc$1 = "Real inspiration from users who mastered their time and mind.";
const stories_hero_badge$1 = "Social Proof";
const stories_hero_title_1$1 = "Real Stories,";
const stories_hero_title_2$1 = "Real Results.";
const stories_hero_desc$1 = "OneForMind is more than just an app; it's the space where thousands of people start taking back control of their lives.";
const stories_main_quote$1 = "This app is my second brain.";
const stories_main_body$1 = "Building Sharesa Studio while being a final-year student was crazy. Without a system that unified habits, finances, and planners in one place, I would have given up a long time ago.";
const stories_wall_title$1 = "Wall of Love";
const stories_wall_desc$1 = "Love notes and short stories from our user community.";
const stories_user_1_text$1 = "I used to track my finances in 3 different apps. Now I just use OneForMind. Simple, clean, and very helpful for students.";
const stories_user_2_text$1 = "The Planner feature is insane! It helps my social media team coordinate campaigns without the hassle of opening spreadsheets.";
const stories_user_3_text$1 = "As a freelance designer, maintaining mood is hard. The Zen Mode in Journal is truly a mental health lifesaver.";
const stories_user_4_text$1 = "Achieved a 100-day workout streak thanks to the habit reminders. The most tangible life change I've ever experienced.";
const stories_stat_1$1 = "Active Users";
const stories_stat_2$1 = "Tasks Completed";
const stories_stat_3$1 = "Satisfaction Rate";
const stories_stat_4$1 = "Average Rating";
const stories_cta_title$1 = "Have a Story to Tell?";
const stories_cta_desc$1 = "Share how OneForMind helps your daily life. We'd love to hear your small wins and big achievements.";
const stories_cta_btn$1 = "Submit Your Story";
const stories_cta_note$1 = "We'll send exclusive merch for selected stories.";
const pricing_meta_title$1 = "Pricing | Choose Your Growth Path";
const pricing_meta_desc$1 = "Simple and transparent pricing for OneForMind. Choose the plan that fits your productivity needs.";
const pricing_meta_og_title$1 = "OneForMind Pricing — Invest in Yourself";
const pricing_badge$1 = "Flexible Plans";
const pricing_title_1$1 = "Invest in";
const pricing_title_2$1 = "Yourself.";
const pricing_subtitle$1 = "No hidden fees. No complicated tiers. Choose a system that grows with your habits and goals.";
const pricing_monthly$1 = "Monthly";
const pricing_yearly$1 = "Yearly";
const pricing_save_amount$1 = "Save 25%";
const pricing_free_name$1 = "Explorer";
const pricing_forever$1 = "forever";
const pricing_free_desc$1 = "Perfect for beginners who want to start tracking habits and basic finances.";
const pricing_feat_habits_limit$1 = "Up to 5 Active Habits";
const pricing_feat_finance_basic$1 = "Basic Expense Tracking";
const pricing_free_btn$1 = "Start for Free";
const pricing_pro_name$1 = "Architect";
const pricing_pro_badge$1 = "Most Popular";
const pricing_month$1 = "mo";
const pricing_billed_annually$1 = "Billed annually";
const pricing_pro_desc$1 = "For power users who want deep insights and unlimited productivity tools.";
const pricing_feat_unlimited_habits$1 = "Unlimited Habit Tracking";
const pricing_feat_ai_insights$1 = "AI Financial Insights";
const pricing_feat_custom_themes$1 = "Custom UI Themes";
const pricing_pro_btn$1 = "Get Started Now";
const pricing_life_name$1 = "Mind Master";
const pricing_once$1 = "once";
const pricing_life_desc$1 = "The ultimate investment. Pay once, own the entire system forever.";
const pricing_feat_lifetime_access$1 = "Lifetime Feature Access";
const pricing_feat_priority_support$1 = "Priority Discord Support";
const pricing_life_btn$1 = "Buy Lifetime";
const pricing_compare_title$1 = "Compare Features";
const pricing_compare_subtitle$1 = "See exactly what you get in each plan.";
const pricing_feat_label$1 = "Feature Name";
const pricing_trust_1_title$1 = "Safe & Secure";
const pricing_trust_1_desc$1 = "Your data is encrypted and strictly private. We never sell your personal information.";
const pricing_trust_2_title$1 = "Lightning Fast";
const pricing_trust_2_desc$1 = "Built with high-performance tech to ensure your workflow stays smooth and lag-free.";
const pricing_trust_3_title$1 = "Weekly Updates";
const pricing_trust_3_desc$1 = "We ship new improvements and features every week based on user feedback.";
const pricing_faq_title$1 = "Common Questions";
const pricing_faq_1_q$1 = "Can I switch plans later?";
const pricing_faq_1_a$1 = "Absolutely! You can upgrade or downgrade your plan at any time from your account settings.";
const pricing_faq_2_q$1 = "Do you offer a money-back guarantee?";
const pricing_faq_2_a$1 = "Yes, we offer a 14-day full refund policy for our Pro and Lifetime plans if you're not satisfied.";
const pricing_bottom_cta_title$1 = "Ready to build a better life?";
const pricing_bottom_cta_desc$1 = "Join hundreds of users who use OneForMind to stay focused, organized, and productive.";
const pricing_bottom_cta_btn$1 = "Create Your Account";
const notes_meta_title$1 = "Notes App vs OneForMind — Stop Digital Hoarding";
const notes_meta_desc$1 = "Standard notes are passive. OneForMind is active. See the difference and stop hoarding ideas without execution.";
const notes_meta_og_title$1 = "Your Notes App is Where Ideas Go to Die.";
const notes_meta_og_desc$1 = "Stop hoarding ideas in passive note apps. Switch to a system that forces execution.";
const notes_badge$1 = "The Reality Check";
const notes_hero_title_1$1 = "Paper accepts ink.";
const notes_hero_title_2$1 = "But it refuses accountability.";
const notes_hero_desc$1 = "Notes apps are <strong>static graveyards</strong> for your brilliant ideas. They don't nudge you. They don't track progress. They just sit there.";
const notes_hero_cta$1 = "Build a Real System";
const notes_hero_note$1 = "No credit card required.";
const notes_mockup_status$1 = "Active";
const notes_mockup_title$1 = "Launch Business";
const notes_mockup_deadline$1 = "Deadline: Next Friday";
const notes_mockup_task_1$1 = "domain bought";
const notes_mockup_task_2$1 = "logo designed";
const notes_mockup_task_3$1 = "marketing plan";
const notes_prob_title_1$1 = "It's just";
const notes_prob_title_highlight$1 = "Digital Hoarding";
const notes_prob_desc$1 = `Writing it down feels productive, but it's a trap. Without a system to remind you, your "million-dollar ideas" get buried under grocery lists and random passwords.`;
const notes_prob_point_1$1 = "No feedback loop (Silent)";
const notes_prob_point_2$1 = "No connection to your calendar";
const notes_prob_point_3$1 = "Impossible to track progress";
const notes_chaos_title$1 = "Untitled Note";
const notes_chaos_date$1 = "Edited 2024";
const notes_chaos_item_1$1 = "Buy milk";
const notes_chaos_item_2$1 = "Netflix password: 1234...";
const notes_chaos_item_3$1 = "Start a gym habit!!";
const notes_chaos_item_4$1 = "Link: youtube.com/...";
const notes_chaos_item_5$1 = "Call Mom";
const notes_chaos_badge$1 = "Forgot this?";
const notes_hub_finance$1 = "Finance";
const notes_hub_goals$1 = "Goals";
const notes_hub_tracking$1 = "Active Tracking";
const notes_hub_habits$1 = "Daily Habits";
const notes_hub_connected$1 = "Connected";
const notes_sol_title_1$1 = "Everything is";
const notes_sol_title_highlight$1 = "Connected";
const notes_sol_desc$1 = "Stop treating your life like a grocery list. In OneForMind, a goal isn't just text. It's connected to your calendar, your habits, and even your budget.";
const notes_sol_box_title$1 = "The difference:";
const notes_sol_box_desc$1 = 'If you want to "Save Money", a note just sits there. <br> <strong>OneForMind</strong> creates a budget, tracks expenses, and shows you the graph.';
const notes_compare_title$1 = "Compare the Logic";
const notes_compare_desc$1 = "Why swapping your notebook for an OS changes everything.";
const notes_table_head_1$1 = "Feature / Benefit";
const notes_table_head_2$1 = "Standard Notes";
const notes_table_row_1_title$1 = "Actionability";
const notes_table_row_1_col_1$1 = "Zero (Static Text)";
const notes_table_row_1_col_2$1 = "High (Trackers)";
const notes_table_row_2_title$1 = 'The "Nag" Factor';
const notes_table_row_2_col_1$1 = "Silent";
const notes_table_row_2_col_2$1 = "Smart Reminders";
const notes_table_row_3_title$1 = "Visual Clarity";
const notes_table_row_3_col_1$1 = "Wall of Text";
const notes_table_row_3_col_2$1 = "Charts & Dashboard";
const notes_table_row_4_title$1 = "Result";
const notes_table_row_4_col_1$1 = "Digital Hoarding";
const notes_table_row_4_col_2$1 = "Personal Growth";
const notes_cta_title$1 = "Stop writing.<br>Start building.";
const notes_cta_desc$1 = "Move your goals out of the notebook and into a system designed to make them happen.";
const notes_cta_btn$1 = "Start Your System Free";
const notes_cta_sub$1 = "Free Forever Plan Available";
const notes_cycle_title$1 = "The Lifecycle of a Note";
const notes_cycle_desc$1 = "How a billion-dollar idea turns into digital dust.";
const notes_cycle_1_title$1 = "The Dopamine Hit";
const notes_cycle_1_desc$1 = "You get a brilliant idea. You feel great. You quickly write it down in your 'Ideas' folder.";
const notes_cycle_2_title$1 = "The Burial";
const notes_cycle_2_desc$1 = "Next day, you add a grocery list. Then a password. Your idea gets pushed down, out of sight.";
const notes_cycle_3_title$1 = "The Void";
const notes_cycle_3_desc$1 = "6 months later, you find the note. The context is gone. The momentum is dead.";
const blank_cycle_title$1 = "The 'Productivity' Trap";
const blank_cycle_desc$1 = "Why starting from scratch is actually procrastination.";
const blank_cycle_1_title$1 = "The Architect Mode";
const blank_cycle_1_desc$1 = "You open a blank page. 'I will build the perfect system,' you tell yourself.";
const blank_cycle_2_title$1 = "The Rabbit Hole";
const blank_cycle_2_desc$1 = "5 hours later, you're still watching tutorials on how to link databases and fix formulas.";
const blank_cycle_3_title$1 = "The Abandonment";
const blank_cycle_3_desc$1 = "The system is too complex to use on mobile. You stop using it after 3 days.";
const blank_meta_title$1 = "Notion & Excel vs OneForMind — Stop Building Tools";
const blank_meta_desc$1 = "Stop spending hours designing dashboards. Use a system that works out of the box. Compare OneForMind with blank workspace tools.";
const blank_meta_og_title$1 = "You are not a UI Designer. Stop pretending.";
const blank_meta_og_desc$1 = "Don't spend 10 hours building a tracker just to use it for 10 minutes. Get a real system.";
const blank_badge$1 = "The Productivity Trap";
const blank_hero_title_1$1 = "You are a Doer.";
const blank_hero_title_2$1 = "Stop playing Builder.";
const blank_hero_desc$1 = "Blank pages (like Notion or Excel) force you to <strong>build your own apps</strong>. You waste hours tweaking fonts, colors, and formulas instead of actually hitting your goals.";
const blank_hero_cta$1 = "Get a Finished System";
const blank_hero_note$1 = "No setup required.";
const blank_mockup_status$1 = "Automated";
const blank_mockup_title$1 = "Monthly Overview";
const blank_mockup_subtitle$1 = "Data auto-calculated";
const blank_mockup_stat_1$1 = "Budget Usage";
const blank_mockup_insight$1 = "You are on track!";
const blank_prob_title_1$1 = "Beware of";
const blank_prob_title_highlight$1 = "The Builder's Trap";
const blank_prob_desc$1 = "It feels productive to design a perfect dashboard. But it's just procrastination in disguise. When the formula breaks, your productivity breaks.";
const blank_prob_point_1$1 = "Infinite setup time (Hours wasted)";
const blank_prob_point_2$1 = "Fragile systems (Formulas break)";
const blank_prob_point_3$1 = "Clunky on mobile devices";
const blank_chaos_badge$1 = "Spent 5 hours on this?";
const blank_hub_finance$1 = "Finance";
const blank_hub_focus$1 = "Focus";
const blank_hub_ready$1 = "Ready to use";
const blank_hub_system$1 = "Life OS";
const blank_hub_automated$1 = "Automated";
const blank_sol_title_1$1 = "System over";
const blank_sol_title_highlight$1 = "Syntax";
const blank_sol_desc$1 = "You shouldn't need a PhD in formulas to track your habits. OneForMind gives you a proven structure so you can focus on execution, not configuration.";
const blank_sol_box_title$1 = "The reality:";
const blank_sol_box_desc$1 = "In Notion, you have to build the database, relations, and views. <br> <strong>OneForMind</strong> is ready the second you sign up.";
const blank_compare_title$1 = "Logic vs. Lego";
const blank_compare_desc$1 = "Why a dedicated OS beats a box of lego blocks.";
const blank_table_head_1$1 = "Comparison";
const blank_table_head_2$1 = "Blank Workspace";
const blank_table_row_1_title$1 = "Setup Time";
const blank_table_row_1_col_1$1 = "Hours / Days";
const blank_table_row_1_col_2$1 = "Instant (0s)";
const blank_table_row_2_title$1 = "Structure";
const blank_table_row_2_col_1$1 = "Do It Yourself";
const blank_table_row_2_col_2$1 = "Proven System";
const blank_table_row_3_title$1 = "Mobile Experience";
const blank_table_row_3_col_1$1 = "Clunky / Slow";
const blank_table_row_3_col_2$1 = "Native App Feel";
const blank_table_row_4_title$1 = "Goal";
const blank_table_row_4_col_1$1 = "Building Tools";
const blank_table_row_4_col_2$1 = "Doing Work";
const blank_cta_title$1 = "Stop configuring.<br>Start achieving.";
const blank_cta_desc$1 = "Your life is not a database project. Use a tool that respects your time.";
const blank_cta_btn$1 = "Use The Finished System";
const blank_cta_sub$1 = "Free Forever Plan Available";
const pm_meta_title$1 = "ClickUp, Trello & Monday vs OneForMind — Stop The Noise";
const pm_meta_desc$1 = "Project management tools are for teams, not individuals. Stop paying for features you don't need. Switch to a personal growth OS.";
const pm_meta_og_title$1 = "You are not a Corporation. Stop acting like one.";
const pm_meta_og_desc$1 = "Why use enterprise tools for personal life? Get a system built for YOU.";
const pm_badge$1 = "The Corporate Trap";
const pm_hero_title_1$1 = "You are a Person.";
const pm_hero_title_2$1 = "Not a Project.";
const pm_hero_desc$1 = "Tools like <strong>ClickUp, Monday, or Asana</strong> are built for managers to track employees. When you use them alone, you are just micromanaging yourself with expensive bloatware.";
const pm_hero_cta$1 = "Get Personal Focus";
const pm_hero_note$1 = "No 'Per Seat' Pricing.";
const pm_mockup_status$1 = "Focused";
const pm_mockup_title$1 = "My Vision";
const pm_mockup_desc$1 = "Zero distractions.";
const pm_mockup_item_1$1 = "Habit Completed";
const pm_mockup_item_2$1 = "Journal Written";
const pm_mockup_item_3$1 = "Deep Work";
const pm_cycle_title$1 = "The 'Manager' Fatigue";
const pm_cycle_desc$1 = "Why treating your life like a JIRA ticket kills your soul.";
const pm_cycle_1_title$1 = "The CEO Fantasy";
const pm_cycle_1_desc$1 = "You set up Trello or ClickUp. You create columns, tags, and assign tasks to yourself. You feel like a boss.";
const pm_cycle_2_title$1 = "The Data Entry Hell";
const pm_cycle_2_desc$1 = "Every task needs a status, priority, and due date. You spend more time managing tickets than doing the actual work.";
const pm_cycle_3_title$1 = "The Burnout";
const pm_cycle_3_desc$1 = "The notifications pile up. The complex views are overwhelming. You quit and go back to notes.";
const pm_prob_title_1$1 = "Suffering from";
const pm_prob_title_highlight$1 = "Feature Obesity";
const pm_prob_desc$1 = "Gantt charts? Dependencies? Team permissions? You don't need them. These features just add friction between you and your goals.";
const pm_prob_point_1$1 = "Designed for Teams (Not You)";
const pm_prob_point_2$1 = "Notification Spam";
const pm_prob_point_3$1 = "Slow & Complex UI";
const pm_hub_you$1 = "You";
const pm_hub_vision$1 = "Vision";
const pm_hub_yours$1 = "Only yours";
const pm_hub_growth$1 = "Self Growth";
const pm_hub_private$1 = "Private";
const pm_sol_title_1$1 = "Reclaim Your";
const pm_sol_title_highlight$1 = "Sovereignty";
const pm_sol_desc$1 = "OneForMind is a Personal OS. No team chats, no 'assignees', no noise. Just a clean space for your habits, finance, and goals.";
const pm_sol_box_title$1 = "Think about it:";
const pm_sol_box_desc$1 = "Why do you need to 'Assign' a task to yourself? <br> In <strong>OneForMind</strong>, everything is yours by default.";
const pm_compare_title$1 = "Bloatware vs. Growthware";
const pm_compare_desc$1 = "The difference between managing others and leading yourself.";
const pm_table_head_1$1 = "Comparison";
const pm_table_head_2$1 = "PM Tools (ClickUp/Asana)";
const pm_table_row_1_title$1 = "Primary Focus";
const pm_table_row_1_col_1$1 = "Team Collaboration";
const pm_table_row_1_col_2$1 = "Personal Growth";
const pm_table_row_2_title$1 = "Complexity";
const pm_table_row_2_col_1$1 = "Enterprise / High";
const pm_table_row_2_col_2$1 = "Minimalist / Zen";
const pm_table_row_3_title$1 = "Notification Style";
const pm_table_row_3_col_1$1 = "Noisy (Email Spam)";
const pm_table_row_3_col_2$1 = "Calm & Intentional";
const pm_table_row_4_title$1 = "Cost Model";
const pm_table_row_4_col_1$1 = "Pay Per User / Seat";
const pm_table_row_4_col_2$1 = "Free Forever Plan";
const pm_cta_title$1 = "Fire your manager.<br>Be the leader.";
const pm_cta_desc$1 = "Stop reporting to a piece of software. Start using a system that empowers you.";
const pm_cta_btn$1 = "Start Leading Yourself";
const pm_cta_sub$1 = "No Credit Card Required";
const habitap_meta_title$1 = "Habit System - OneForMind";
const habitap_meta_desc$1 = "Transform your habits into a lifestyle. OneForMind helps you build a lasting identity beyond just simple streaks.";
const habitap_meta_og_title$1 = "Build Better Habits with OneForMind";
const habitap_meta_og_desc$1 = "The habit tracker designed for human growth, not just pixelated rewards.";
const habitap_badge$1 = "Atomic Habit System";
const habitap_hero_title_1$1 = "Build Identity,";
const habitap_hero_title_2$1 = "Not Just Streaks.";
const habitap_hero_desc$1 = "Most habit apps feel like a game. OneForMind feels like <strong>real growth.</strong> Focus on who you are becoming.";
const habitap_hero_cta$1 = "Create My First Habit";
const habitap_hero_note$1 = "Free forever for 3 habits.";
const habitap_mockup_status$1 = "Streak: 12 Days";
const habitap_mockup_title$1 = "Identity: Athlete";
const habitap_mockup_desc$1 = "5km Morning Run";
const habitap_mockup_stat_1$1 = "Atomic Progress";
const habitap_mockup_stat_2$1 = "1% better today";
const habitap_cycle_title$1 = "The Gamification Trap";
const habitap_cycle_desc$1 = "Why streaks actually hurt you.";
const habitap_cycle_1_title$1 = "The Dopamine";
const habitap_cycle_1_desc$1 = "High on numbers and shiny pixel badges.";
const habitap_cycle_2_title$1 = "The Anxiety";
const habitap_cycle_2_desc$1 = "Terrified of losing a streak if you miss one day.";
const habitap_cycle_3_title$1 = "The Burnout";
const habitap_cycle_3_desc$1 = "Streak breaks. Motivation dies. You quit.";
const habitap_prob_title_1$1 = "Don't be a";
const habitap_prob_title_highlight$1 = "Streak Slave";
const habitap_prob_desc$1 = "Habits should serve you, not pressure you.";
const habitap_prob_point_1$1 = "Demotivation after missing a day";
const habitap_prob_point_2$1 = "Focusing on quantity over quality";
const habitap_prob_point_3$1 = "No connection to long-term goals";
const habitap_sol_title_1$1 = "Systems over";
const habitap_sol_title_highlight$1 = "Motivation";
const habitap_sol_desc$1 = "We use the 'Never Miss Twice' rule to keep you consistent.";
const habitap_sol_1_title$1 = "Organic Growth";
const habitap_sol_1_desc$1 = "Focus on the person you want to become.";
const habitap_sol_2_title$1 = "Goal Sync";
const habitap_sol_2_desc$1 = "Connect habits directly to your life goals.";
const habitap_sol_3_title$1 = "Deep Insights";
const habitap_sol_3_desc$1 = "Data that tells a story, not just numbers.";
const habitap_compare_title$1 = "Game vs. Reality";
const habitap_compare_desc$1 = "Don't play with your life. Build it for real.";
const habitap_table_head_2$1 = "Habitica / Others";
const habitap_table_row_1_title$1 = "Primary Goal";
const habitap_table_row_1_col_1$1 = "Leveling Up Avatar";
const habitap_table_row_1_col_2$1 = "Leveling Up You";
const habitap_table_row_2_title$1 = "Missed a Day?";
const habitap_table_row_2_col_1$1 = "Punishment & Guilt";
const habitap_table_row_2_col_2$1 = "Adapt & Recover";
const habitap_table_row_3_title$1 = "Mindset";
const habitap_table_row_3_col_1$1 = "Addictive Streak";
const habitap_table_row_3_col_2$1 = "Atomic Growth";
const habitap_cta_title$1 = "Stop playing games. <br/>Start growing.";
const habitap_cta_desc$1 = "Build an identity that lasts longer than a pixelated heart.";
const habitap_cta_btn$1 = "Build Your Habit System";
const habitap_cta_sub$1 = "No streak-shaming. Just growth.";
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
const about_badge$2 = "About Us";
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
const journal_title$1 = "My Journal";
const journal_subtitle$1 = "Keep track of your thoughts and feelings every day.";
const journal_tasks$1 = "Tasks";
const journal_habit$1 = "Habits";
const journal_habit_done$1 = "Done";
const journal_expense$1 = "Expense";
const journal_history$1 = "Story History";
const journal_add$1 = "Add Journal";
const journal_empty_title$1 = "No stories yet.";
const journal_empty_subtitle$1 = "Start writing your first journal today!";
const journal_untitled$1 = "Today's Story";
const journal_no_content$1 = "No text content...";
const journal_confirm_delete$1 = "Delete Journal?";
const journal_delete_warn$1 = "This data will be lost forever.";
const status_deleted$1 = "Successfully Deleted!";
const status_image_saved$1 = "Image Saved!";
const status_image_deleted$1 = "Image Deleted!";
const calendar_more$1 = "more";
const journal_filled$1 = "Journal written";
const calendar_tasks$1 = "Tasks";
const calendar_expense$1 = "Expense";
const habit_completed$1 = "Habits completed";
const calendar_day_summary$1 = "Daily Summary";
const calendar_events_schedule$1 = "Events / Schedule";
const calendar_no_events$1 = "No events today.";
const btn_edit$1 = "Edit";
const calendar_life_os_summary$1 = "Life OS Summary";
const calendar_journal$1 = "Journal";
const calendar_journal_written$1 = "✓ Written";
const calendar_empty$1 = "Empty";
const calendar_daily_tasks$1 = "Daily Tasks";
const calendar_tasks_done$1 = "Done";
const calendar_no_tasks$1 = "No tasks";
const calendar_habits$1 = "Habits";
const calendar_habits_done$1 = "Completed";
const calendar_title$1 = "Master Calendar";
const calendar_subtitle$1 = "Your bird-eye view";
const calendar_new_event$1 = "New Event";
const calendar_edit_event$1 = "Edit Event";
const label_title$1 = "Event Title";
const label_start_date$1 = "Start Date";
const label_end_date$1 = "End Date (Optional)";
const label_color$1 = "Label Color";
const label_description$1 = "Additional Notes";
const ph_event_title$1 = "e.g., Team Meeting";
const ph_event_desc$1 = "Write event details here...";
const btn_add_event$1 = "Event";
const color_indigo$1 = "Indigo";
const color_sky$1 = "Sky";
const color_emerald$1 = "Emerald";
const color_amber$1 = "Amber";
const color_rose$1 = "Rose";
const color_purple$1 = "Purple";
const calendar_expense_short$1 = "Spent";
const calendar_expense_label$1 = "Expenses";
const calendar_no_events_title$1 = "Empty Day";
const calendar_no_events_desc$1 = "No events are scheduled for today.";
const calendar_today$1 = "Today";
const calendar_open$1 = "Open";
const calendar_more_events$1 = "more events";
const calendar_focus$1 = "Focus";
const calendar_events$1 = "Events";
const calendar_planner$1 = "Planner";
const calendar_finance$1 = "Finance";
const calendar_journal_short$1 = "Journal";
const calendar_habits_short$1 = "Habit";
const calendar_tasks_short$1 = "Tasks";
const btn_back_dashboard$1 = "Back to Dashboard";
const status_saving$1 = "Saving...";
const status_saved$1 = "Saved";
const btn_save_manual$1 = "Save";
const journal_mood_label$1 = "Today's Mood:";
const journal_add_photo$1 = "Insert Journal Photo";
const journal_write_placeholder$1 = "Start writing your story...";
const journal_title_placeholder$1 = "Give your day a title...";
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
  seo_meta_desc_1: seo_meta_desc_1$1,
  footer_rights: footer_rights$2,
  nav_features: nav_features$1,
  nav_solutions: nav_solutions$1,
  nav_resources: nav_resources$1,
  nav_pricing: nav_pricing$1,
  modal_logout_title: modal_logout_title$1,
  modal_logout_subtitle: modal_logout_subtitle$1,
  modal_logout_confirm: modal_logout_confirm$1,
  modal_logout_cancel: modal_logout_cancel$1,
  seo_about_desc: seo_about_desc$1,
  footer_legal: footer_legal$1,
  legal_title: legal_title$1,
  legal_ref: legal_ref$1,
  privacy_title: privacy_title$1,
  privacy_p1: privacy_p1$1,
  privacy_consent_title: privacy_consent_title$1,
  privacy_consent_p: privacy_consent_p$1,
  privacy_info_title: privacy_info_title$1,
  privacy_info_p: privacy_info_p$1,
  tos_title: tos_title$1,
  tos_intro: tos_intro$1,
  tos_service_title: tos_service_title$1,
  tos_service_p: tos_service_p$1,
  tos_data_title: tos_data_title$1,
  tos_data_p: tos_data_p$1,
  tos_security_title: tos_security_title$1,
  tos_security_p: tos_security_p$1,
  tos_termination_title: tos_termination_title$1,
  tos_termination_p: tos_termination_p$1,
  legal_close: legal_close$1,
  "____ SECTION_1 ____HABIT": "=== HABIT ===",
  habit_meta_title: habit_meta_title$1,
  habit_meta_desc: habit_meta_desc$1,
  habit_meta_og_title: habit_meta_og_title$1,
  habit_meta_og_desc: habit_meta_og_desc$1,
  habit_hero_badge: habit_hero_badge$1,
  habit_hero_title_1: habit_hero_title_1$1,
  habit_hero_title_2: habit_hero_title_2$1,
  habit_hero_desc: habit_hero_desc$1,
  habit_hero_cta_1: habit_hero_cta_1$1,
  habit_hero_cta_2: habit_hero_cta_2$1,
  habit_mockup_title: habit_mockup_title$1,
  habit_mockup_streak: habit_mockup_streak$1,
  habit_mockup_task_1: habit_mockup_task_1$1,
  habit_mockup_time_1: habit_mockup_time_1$1,
  habit_mockup_task_2: habit_mockup_task_2$1,
  habit_mockup_time_2: habit_mockup_time_2$1,
  habit_mockup_task_3: habit_mockup_task_3$1,
  habit_mockup_time_3: habit_mockup_time_3$1,
  habit_mockup_alert_1: habit_mockup_alert_1$1,
  habit_mockup_alert_2: habit_mockup_alert_2$1,
  habit_prob_title_1: habit_prob_title_1$1,
  habit_prob_title_strike: habit_prob_title_strike$1,
  habit_prob_title_2: habit_prob_title_2$1,
  habit_prob_1_title: habit_prob_1_title$1,
  habit_prob_1_desc: habit_prob_1_desc$1,
  habit_prob_2_title: habit_prob_2_title$1,
  habit_prob_2_desc: habit_prob_2_desc$1,
  habit_prob_3_title: habit_prob_3_title$1,
  habit_prob_3_desc: habit_prob_3_desc$1,
  habit_feature_1_title: habit_feature_1_title$1,
  habit_feature_1_desc: habit_feature_1_desc$1,
  habit_feature_1_point_1: habit_feature_1_point_1$1,
  habit_feature_1_point_2: habit_feature_1_point_2$1,
  habit_feature_2_title: habit_feature_2_title$1,
  habit_feature_2_desc: habit_feature_2_desc$1,
  habit_feature_2_point_1: habit_feature_2_point_1$1,
  habit_feature_2_point_2: habit_feature_2_point_2$1,
  habit_bento_title: habit_bento_title$1,
  habit_bento_desc: habit_bento_desc$1,
  habit_bento_1_title: habit_bento_1_title$1,
  habit_bento_1_desc: habit_bento_1_desc$1,
  habit_bento_2_title: habit_bento_2_title$1,
  habit_bento_2_desc: habit_bento_2_desc$1,
  habit_bento_3_title: habit_bento_3_title$1,
  habit_bento_3_desc: habit_bento_3_desc$1,
  habit_bento_4_title: habit_bento_4_title$1,
  habit_bento_4_desc: habit_bento_4_desc$1,
  habit_quote_text: habit_quote_text$1,
  habit_quote_author: habit_quote_author$1,
  habit_cta_title: habit_cta_title$1,
  habit_cta_desc: habit_cta_desc$1,
  habit_cta_btn: habit_cta_btn$1,
  habit_cta_note: habit_cta_note$1,
  finance_meta_title: finance_meta_title$1,
  finance_meta_desc: finance_meta_desc$1,
  finance_meta_og_title: finance_meta_og_title$1,
  finance_meta_og_desc: finance_meta_og_desc$1,
  finance_hero_badge: finance_hero_badge$1,
  finance_hero_title_1: finance_hero_title_1$1,
  finance_hero_title_2: finance_hero_title_2$1,
  finance_hero_desc: finance_hero_desc$1,
  finance_hero_cta_1: finance_hero_cta_1$1,
  finance_hero_cta_2: finance_hero_cta_2$1,
  finance_mockup_title: finance_mockup_title$1,
  finance_mockup_balance: finance_mockup_balance$1,
  finance_mockup_task_1: finance_mockup_task_1$1,
  finance_mockup_time_1: finance_mockup_time_1$1,
  finance_mockup_task_2: finance_mockup_task_2$1,
  finance_mockup_time_2: finance_mockup_time_2$1,
  finance_mockup_task_3: finance_mockup_task_3$1,
  finance_mockup_time_3: finance_mockup_time_3$1,
  finance_mockup_alert_1: finance_mockup_alert_1$1,
  finance_mockup_alert_2: finance_mockup_alert_2$1,
  finance_prob_title_1: finance_prob_title_1$1,
  finance_prob_title_strike: finance_prob_title_strike$1,
  finance_prob_title_2: finance_prob_title_2$1,
  finance_prob_1_title: finance_prob_1_title$1,
  finance_prob_1_desc: finance_prob_1_desc$1,
  finance_prob_2_title: finance_prob_2_title$1,
  finance_prob_2_desc: finance_prob_2_desc$1,
  finance_prob_3_title: finance_prob_3_title$1,
  finance_prob_3_desc: finance_prob_3_desc$1,
  finance_feature_1_title: finance_feature_1_title$1,
  finance_feature_1_desc: finance_feature_1_desc$1,
  finance_feature_1_point_1: finance_feature_1_point_1$1,
  finance_feature_1_point_2: finance_feature_1_point_2$1,
  finance_feature_2_title: finance_feature_2_title$1,
  finance_feature_2_desc: finance_feature_2_desc$1,
  finance_feature_2_point_1: finance_feature_2_point_1$1,
  finance_feature_2_point_2: finance_feature_2_point_2$1,
  finance_bento_title: finance_bento_title$1,
  finance_bento_desc: finance_bento_desc$1,
  finance_bento_1_title: finance_bento_1_title$1,
  finance_bento_1_desc: finance_bento_1_desc$1,
  finance_bento_2_title: finance_bento_2_title$1,
  finance_bento_2_desc: finance_bento_2_desc$1,
  finance_bento_3_title: finance_bento_3_title$1,
  finance_bento_3_desc: finance_bento_3_desc$1,
  finance_bento_4_title: finance_bento_4_title$1,
  finance_bento_4_desc: finance_bento_4_desc$1,
  finance_privacy_title: finance_privacy_title$1,
  finance_privacy_desc: finance_privacy_desc$1,
  finance_privacy_point_1_title: finance_privacy_point_1_title$1,
  finance_privacy_point_1_desc: finance_privacy_point_1_desc$1,
  finance_privacy_point_2_title: finance_privacy_point_2_title$1,
  finance_privacy_point_2_desc: finance_privacy_point_2_desc$1,
  finance_privacy_point_3_title: finance_privacy_point_3_title$1,
  finance_privacy_point_3_desc: finance_privacy_point_3_desc$1,
  finance_quote_text: finance_quote_text$1,
  finance_quote_author: finance_quote_author$1,
  finance_cta_title: finance_cta_title$1,
  finance_cta_desc: finance_cta_desc$1,
  finance_cta_btn: finance_cta_btn$1,
  finance_cta_note: finance_cta_note$1,
  planner_meta_title: planner_meta_title$1,
  planner_meta_desc: planner_meta_desc$1,
  planner_meta_og_title: planner_meta_og_title$1,
  planner_meta_og_desc: planner_meta_og_desc$1,
  planner_hero_badge: planner_hero_badge$1,
  planner_hero_title_1: planner_hero_title_1$1,
  planner_hero_title_2: planner_hero_title_2$1,
  planner_hero_desc: planner_hero_desc$1,
  planner_hero_cta_1: planner_hero_cta_1$1,
  planner_hero_cta_2: planner_hero_cta_2$1,
  planner_mockup_title: planner_mockup_title$1,
  planner_mockup_status: planner_mockup_status$1,
  planner_mockup_task_1: planner_mockup_task_1$1,
  planner_mockup_time_1: planner_mockup_time_1$1,
  planner_mockup_task_2: planner_mockup_task_2$1,
  planner_mockup_time_2: planner_mockup_time_2$1,
  planner_mockup_task_3: planner_mockup_task_3$1,
  planner_mockup_time_3: planner_mockup_time_3$1,
  planner_mockup_alert_1: planner_mockup_alert_1$1,
  planner_mockup_alert_2: planner_mockup_alert_2$1,
  planner_prob_title_1: planner_prob_title_1$1,
  planner_prob_title_strike: planner_prob_title_strike$1,
  planner_prob_title_2: planner_prob_title_2$1,
  planner_prob_1_title: planner_prob_1_title$1,
  planner_prob_1_desc: planner_prob_1_desc$1,
  planner_prob_2_title: planner_prob_2_title$1,
  planner_prob_2_desc: planner_prob_2_desc$1,
  planner_prob_3_title: planner_prob_3_title$1,
  planner_prob_3_desc: planner_prob_3_desc$1,
  planner_feature_1_title: planner_feature_1_title$1,
  planner_feature_1_desc: planner_feature_1_desc$1,
  planner_feature_1_point_1: planner_feature_1_point_1$1,
  planner_feature_1_point_2: planner_feature_1_point_2$1,
  planner_feature_2_title: planner_feature_2_title$1,
  planner_feature_2_desc: planner_feature_2_desc$1,
  planner_feature_2_point_1: planner_feature_2_point_1$1,
  planner_feature_2_point_2: planner_feature_2_point_2$1,
  planner_bento_title: planner_bento_title$1,
  planner_bento_desc: planner_bento_desc$1,
  planner_bento_1_title: planner_bento_1_title$1,
  planner_bento_1_desc: planner_bento_1_desc$1,
  planner_bento_2_title: planner_bento_2_title$1,
  planner_bento_2_desc: planner_bento_2_desc$1,
  planner_bento_3_title: planner_bento_3_title$1,
  planner_bento_3_desc: planner_bento_3_desc$1,
  planner_bento_4_title: planner_bento_4_title$1,
  planner_bento_4_desc: planner_bento_4_desc$1,
  planner_quote_text: planner_quote_text$1,
  planner_quote_author: planner_quote_author$1,
  planner_cta_title: planner_cta_title$1,
  planner_cta_desc: planner_cta_desc$1,
  planner_cta_btn: planner_cta_btn$1,
  planner_cta_note: planner_cta_note$1,
  planner_mechanism_1_title: planner_mechanism_1_title$1,
  planner_mechanism_1_desc: planner_mechanism_1_desc$1,
  journal_meta_title: journal_meta_title$1,
  journal_meta_desc: journal_meta_desc$1,
  journal_meta_og_title: journal_meta_og_title$1,
  journal_meta_og_desc: journal_meta_og_desc$1,
  journal_hero_badge: journal_hero_badge$1,
  journal_hero_title_1: journal_hero_title_1$1,
  journal_hero_title_2: journal_hero_title_2$1,
  journal_hero_desc: journal_hero_desc$1,
  journal_hero_cta_1: journal_hero_cta_1$1,
  journal_hero_cta_2: journal_hero_cta_2$1,
  journal_mockup_title: journal_mockup_title$1,
  journal_mockup_date: journal_mockup_date$1,
  journal_mockup_text_1: journal_mockup_text_1$1,
  journal_mockup_text_2: journal_mockup_text_2$1,
  journal_mockup_typing: journal_mockup_typing$1,
  journal_prob_title_1: journal_prob_title_1$1,
  journal_prob_title_strike: journal_prob_title_strike$1,
  journal_prob_title_2: journal_prob_title_2$1,
  journal_prob_main_desc: journal_prob_main_desc$1,
  journal_prob_1_title: journal_prob_1_title$1,
  journal_prob_1_desc: journal_prob_1_desc$1,
  journal_prob_2_title: journal_prob_2_title$1,
  journal_prob_2_desc: journal_prob_2_desc$1,
  journal_prob_3_title: journal_prob_3_title$1,
  journal_prob_3_desc: journal_prob_3_desc$1,
  journal_feature_1_title: journal_feature_1_title$1,
  journal_feature_1_desc: journal_feature_1_desc$1,
  journal_feature_1_point_1: journal_feature_1_point_1$1,
  journal_feature_1_point_2: journal_feature_1_point_2$1,
  journal_feature_2_title: journal_feature_2_title$1,
  journal_feature_2_desc: journal_feature_2_desc$1,
  journal_feature_2_point_1: journal_feature_2_point_1$1,
  journal_feature_2_point_2: journal_feature_2_point_2$1,
  journal_bento_title: journal_bento_title$1,
  journal_bento_desc: journal_bento_desc$1,
  journal_bento_1_title: journal_bento_1_title$1,
  journal_bento_1_desc: journal_bento_1_desc$1,
  journal_bento_2_title: journal_bento_2_title$1,
  journal_bento_2_desc: journal_bento_2_desc$1,
  journal_bento_3_title: journal_bento_3_title$1,
  journal_bento_3_desc: journal_bento_3_desc$1,
  journal_quote_text: journal_quote_text$1,
  journal_quote_author: journal_quote_author$1,
  journal_cta_title: journal_cta_title$1,
  journal_cta_desc: journal_cta_desc$1,
  journal_cta_btn: journal_cta_btn$1,
  journal_cta_note: journal_cta_note$1,
  calendar_meta_title: calendar_meta_title$1,
  calendar_meta_desc: calendar_meta_desc$1,
  calendar_meta_og_title: calendar_meta_og_title$1,
  calendar_meta_og_desc: calendar_meta_og_desc$1,
  calendar_hero_badge: calendar_hero_badge$1,
  calendar_hero_title_1: calendar_hero_title_1$1,
  calendar_hero_title_2: calendar_hero_title_2$1,
  calendar_hero_desc: calendar_hero_desc$1,
  calendar_hero_cta_1: calendar_hero_cta_1$1,
  calendar_hero_cta_2: calendar_hero_cta_2$1,
  calendar_mockup_month: calendar_mockup_month$1,
  calendar_mockup_today: calendar_mockup_today$1,
  calendar_mockup_date: calendar_mockup_date$1,
  calendar_mockup_event_1: calendar_mockup_event_1$1,
  calendar_mockup_event_1_time: calendar_mockup_event_1_time$1,
  calendar_mockup_location_1: calendar_mockup_location_1$1,
  calendar_mockup_event_2: calendar_mockup_event_2$1,
  calendar_mockup_event_2_time: calendar_mockup_event_2_time$1,
  calendar_mockup_location_2: calendar_mockup_location_2$1,
  calendar_mockup_event_3: calendar_mockup_event_3$1,
  calendar_mockup_event_3_time: calendar_mockup_event_3_time$1,
  calendar_mockup_location_3: calendar_mockup_location_3$1,
  calendar_mockup_alert_1: calendar_mockup_alert_1$1,
  calendar_mockup_alert_2: calendar_mockup_alert_2$1,
  calendar_prob_title_1: calendar_prob_title_1$1,
  calendar_prob_title_strike: calendar_prob_title_strike$1,
  calendar_prob_title_2: calendar_prob_title_2$1,
  calendar_prob_1_title: calendar_prob_1_title$1,
  calendar_prob_1_desc: calendar_prob_1_desc$1,
  calendar_prob_2_title: calendar_prob_2_title$1,
  calendar_prob_2_desc: calendar_prob_2_desc$1,
  calendar_prob_3_title: calendar_prob_3_title$1,
  calendar_prob_3_desc: calendar_prob_3_desc$1,
  calendar_feature_1_title: calendar_feature_1_title$1,
  calendar_feature_1_desc: calendar_feature_1_desc$1,
  calendar_feature_2_title: calendar_feature_2_title$1,
  calendar_feature_2_desc: calendar_feature_2_desc$1,
  calendar_feature_2_point_1: calendar_feature_2_point_1$1,
  calendar_feature_2_point_2: calendar_feature_2_point_2$1,
  calendar_bento_title: calendar_bento_title$1,
  calendar_bento_desc: calendar_bento_desc$1,
  calendar_bento_1_title: calendar_bento_1_title$1,
  calendar_bento_1_desc: calendar_bento_1_desc$1,
  calendar_bento_2_title: calendar_bento_2_title$1,
  calendar_bento_2_desc: calendar_bento_2_desc$1,
  calendar_bento_3_title: calendar_bento_3_title$1,
  calendar_bento_3_desc: calendar_bento_3_desc$1,
  calendar_bento_4_title: calendar_bento_4_title$1,
  calendar_bento_4_desc: calendar_bento_4_desc$1,
  calendar_quote_text: calendar_quote_text$1,
  calendar_quote_author: calendar_quote_author$1,
  calendar_cta_title: calendar_cta_title$1,
  calendar_cta_desc: calendar_cta_desc$1,
  calendar_cta_btn: calendar_cta_btn$1,
  calendar_cta_note: calendar_cta_note$1,
  student_meta_title: student_meta_title$1,
  student_meta_desc: student_meta_desc$1,
  student_meta_og_title: student_meta_og_title$1,
  student_meta_og_desc: student_meta_og_desc$1,
  student_hero_badge: student_hero_badge$1,
  student_hero_title_1: student_hero_title_1$1,
  student_hero_title_2: student_hero_title_2$1,
  student_hero_desc: student_hero_desc$1,
  student_hero_cta_1: student_hero_cta_1$1,
  student_hero_social_proof: student_hero_social_proof$1,
  student_prob_title: student_prob_title$1,
  student_prob_desc: student_prob_desc$1,
  student_prob_1_title: student_prob_1_title$1,
  student_prob_1_desc: student_prob_1_desc$1,
  student_prob_2_title: student_prob_2_title$1,
  student_prob_2_desc: student_prob_2_desc$1,
  student_prob_3_title: student_prob_3_title$1,
  student_prob_3_desc: student_prob_3_desc$1,
  student_feat_1_visual_badge: student_feat_1_visual_badge$1,
  student_feat_1_title: student_feat_1_title$1,
  student_feat_1_desc: student_feat_1_desc$1,
  student_feat_1_point_1: student_feat_1_point_1$1,
  student_feat_1_point_2: student_feat_1_point_2$1,
  student_feat_2_title: student_feat_2_title$1,
  student_feat_2_desc: student_feat_2_desc$1,
  student_feat_2_point_1: student_feat_2_point_1$1,
  student_feat_2_point_2: student_feat_2_point_2$1,
  student_bento_title: student_bento_title$1,
  student_bento_desc: student_bento_desc$1,
  student_bento_1_title: student_bento_1_title$1,
  student_bento_1_desc: student_bento_1_desc$1,
  student_bento_2_title: student_bento_2_title$1,
  student_bento_2_desc: student_bento_2_desc$1,
  student_bento_3_title: student_bento_3_title$1,
  student_bento_3_desc: student_bento_3_desc$1,
  student_cta_title: student_cta_title$1,
  student_cta_desc: student_cta_desc$1,
  student_cta_btn: student_cta_btn$1,
  student_cta_note: student_cta_note$1,
  freelance_meta_title: freelance_meta_title$1,
  freelance_meta_desc: freelance_meta_desc$1,
  freelance_meta_og_title: freelance_meta_og_title$1,
  freelance_meta_og_desc: freelance_meta_og_desc$1,
  freelance_hero_badge: freelance_hero_badge$1,
  freelance_hero_title_1: freelance_hero_title_1$1,
  freelance_hero_title_2: freelance_hero_title_2$1,
  freelance_hero_desc: freelance_hero_desc$1,
  freelance_hero_cta_1: freelance_hero_cta_1$1,
  freelance_hero_social_proof: freelance_hero_social_proof$1,
  freelance_prob_title: freelance_prob_title$1,
  freelance_prob_desc: freelance_prob_desc$1,
  freelance_prob_1_title: freelance_prob_1_title$1,
  freelance_prob_1_desc: freelance_prob_1_desc$1,
  freelance_prob_2_title: freelance_prob_2_title$1,
  freelance_prob_2_desc: freelance_prob_2_desc$1,
  freelance_prob_3_title: freelance_prob_3_title$1,
  freelance_prob_3_desc: freelance_prob_3_desc$1,
  freelance_feat_1_title: freelance_feat_1_title$1,
  freelance_feat_1_desc: freelance_feat_1_desc$1,
  freelance_feat_1_point_1: freelance_feat_1_point_1$1,
  freelance_feat_1_point_2: freelance_feat_1_point_2$1,
  freelance_feat_2_title: freelance_feat_2_title$1,
  freelance_feat_2_desc: freelance_feat_2_desc$1,
  freelance_feat_2_point_1: freelance_feat_2_point_1$1,
  freelance_feat_2_point_2: freelance_feat_2_point_2$1,
  freelance_bento_title: freelance_bento_title$1,
  freelance_bento_desc: freelance_bento_desc$1,
  freelance_bento_1_title: freelance_bento_1_title$1,
  freelance_bento_1_desc: freelance_bento_1_desc$1,
  freelance_bento_2_title: freelance_bento_2_title$1,
  freelance_bento_2_desc: freelance_bento_2_desc$1,
  freelance_bento_3_title: freelance_bento_3_title$1,
  freelance_bento_3_desc: freelance_bento_3_desc$1,
  freelance_bento_4_title: freelance_bento_4_title$1,
  freelance_bento_4_desc: freelance_bento_4_desc$1,
  freelance_cta_title: freelance_cta_title$1,
  freelance_cta_desc: freelance_cta_desc$1,
  freelance_cta_btn: freelance_cta_btn$1,
  freelance_cta_note: freelance_cta_note$1,
  growth_meta_title: growth_meta_title$1,
  growth_meta_desc: growth_meta_desc$1,
  growth_meta_og_title: growth_meta_og_title$1,
  growth_meta_og_desc: growth_meta_og_desc$1,
  growth_hero_badge: growth_hero_badge$1,
  growth_hero_title_1: growth_hero_title_1$1,
  growth_hero_title_2: growth_hero_title_2$1,
  growth_hero_desc: growth_hero_desc$1,
  growth_hero_cta_1: growth_hero_cta_1$1,
  growth_hero_social_proof: growth_hero_social_proof$1,
  growth_prob_title_dark: growth_prob_title_dark$1,
  growth_prob_desc_dark: growth_prob_desc_dark$1,
  growth_prob_point_1: growth_prob_point_1$1,
  growth_prob_point_2: growth_prob_point_2$1,
  growth_prob_title_light: growth_prob_title_light$1,
  growth_prob_desc_light: growth_prob_desc_light$1,
  growth_prob_point_3: growth_prob_point_3$1,
  growth_prob_point_4: growth_prob_point_4$1,
  growth_feat_1_title: growth_feat_1_title$1,
  growth_feat_1_desc: growth_feat_1_desc$1,
  growth_feat_1_point_1: growth_feat_1_point_1$1,
  growth_feat_1_point_2: growth_feat_1_point_2$1,
  growth_feat_2_title: growth_feat_2_title$1,
  growth_feat_2_desc: growth_feat_2_desc$1,
  growth_feat_2_quote_title: growth_feat_2_quote_title$1,
  growth_feat_2_quote_body: growth_feat_2_quote_body$1,
  growth_bento_title: growth_bento_title$1,
  growth_bento_desc: growth_bento_desc$1,
  growth_bento_1_title: growth_bento_1_title$1,
  growth_bento_1_desc: growth_bento_1_desc$1,
  growth_bento_2_title: growth_bento_2_title$1,
  growth_bento_2_desc: growth_bento_2_desc$1,
  growth_bento_3_title: growth_bento_3_title$1,
  growth_bento_3_desc: growth_bento_3_desc$1,
  growth_bento_4_title: growth_bento_4_title$1,
  growth_bento_4_desc: growth_bento_4_desc$1,
  growth_bento_5_title: growth_bento_5_title$1,
  growth_bento_5_desc: growth_bento_5_desc$1,
  growth_cta_title: growth_cta_title$1,
  growth_cta_desc: growth_cta_desc$1,
  growth_cta_btn: growth_cta_btn$1,
  growth_cta_note: growth_cta_note$1,
  guide_meta_title: guide_meta_title$1,
  guide_meta_desc: guide_meta_desc$1,
  guide_meta_og_title: guide_meta_og_title$1,
  guide_meta_og_desc: guide_meta_og_desc$1,
  guide_hero_badge: guide_hero_badge$1,
  guide_hero_title_1: guide_hero_title_1$1,
  guide_hero_title_2: guide_hero_title_2$1,
  guide_hero_desc: guide_hero_desc$1,
  guide_search_placeholder: guide_search_placeholder$1,
  guide_search_btn: guide_search_btn$1,
  guide_popular_search: guide_popular_search$1,
  guide_tag_1: guide_tag_1$1,
  guide_tag_2: guide_tag_2$1,
  guide_tag_3: guide_tag_3$1,
  guide_modules_badge: guide_modules_badge$1,
  guide_modules_title: guide_modules_title$1,
  guide_mod_1_title: guide_mod_1_title$1,
  guide_mod_1_desc: guide_mod_1_desc$1,
  guide_mod_2_title: guide_mod_2_title$1,
  guide_mod_2_desc: guide_mod_2_desc$1,
  guide_mod_3_title: guide_mod_3_title$1,
  guide_mod_3_desc: guide_mod_3_desc$1,
  guide_mod_4_title: guide_mod_4_title$1,
  guide_mod_4_desc: guide_mod_4_desc$1,
  guide_btn_learn: guide_btn_learn$1,
  guide_start_title: guide_start_title$1,
  guide_start_desc: guide_start_desc$1,
  guide_start_step_1_title: guide_start_step_1_title$1,
  guide_start_step_1_desc: guide_start_step_1_desc$1,
  guide_start_step_2_title: guide_start_step_2_title$1,
  guide_start_step_2_desc: guide_start_step_2_desc$1,
  guide_start_step_3_title: guide_start_step_3_title$1,
  guide_start_step_3_desc: guide_start_step_3_desc$1,
  guide_articles_title: guide_articles_title$1,
  guide_articles_desc: guide_articles_desc$1,
  guide_btn_all: guide_btn_all$1,
  guide_btn_read: guide_btn_read$1,
  guide_read_time: guide_read_time$1,
  guide_support_title: guide_support_title$1,
  guide_support_desc: guide_support_desc$1,
  guide_btn_contact: guide_btn_contact$1,
  guide_btn_community: guide_btn_community$1,
  guide_art_1_title: guide_art_1_title$1,
  guide_art_1_desc: guide_art_1_desc$1,
  guide_art_2_title: guide_art_2_title$1,
  guide_art_2_desc: guide_art_2_desc$1,
  guide_art_3_title: guide_art_3_title$1,
  guide_art_3_desc: guide_art_3_desc$1,
  blog_meta_title: blog_meta_title$1,
  blog_meta_desc: blog_meta_desc$1,
  blog_meta_og_title: blog_meta_og_title$1,
  blog_meta_og_desc: blog_meta_og_desc$1,
  blog_hero_badge: blog_hero_badge$1,
  blog_feat_title: blog_feat_title$1,
  blog_cat_all: blog_cat_all$1,
  blog_cat_prod: blog_cat_prod$1,
  blog_cat_student: blog_cat_student$1,
  blog_cat_freelance: blog_cat_freelance$1,
  blog_cat_updates: blog_cat_updates$1,
  blog_grid_1_title: blog_grid_1_title$1,
  blog_grid_1_desc: blog_grid_1_desc$1,
  blog_grid_1_date: blog_grid_1_date$1,
  blog_grid_2_title: blog_grid_2_title$1,
  blog_grid_2_desc: blog_grid_2_desc$1,
  blog_grid_2_date: blog_grid_2_date$1,
  blog_grid_3_title: blog_grid_3_title$1,
  blog_grid_3_desc: blog_grid_3_desc$1,
  blog_grid_3_date: blog_grid_3_date$1,
  blog_grid_4_title: blog_grid_4_title$1,
  blog_grid_4_desc: blog_grid_4_desc$1,
  blog_grid_4_date: blog_grid_4_date$1,
  blog_grid_5_title: blog_grid_5_title$1,
  blog_grid_5_desc: blog_grid_5_desc$1,
  blog_grid_5_date: blog_grid_5_date$1,
  blog_news_badge: blog_news_badge$1,
  blog_news_title: blog_news_title$1,
  blog_news_desc: blog_news_desc$1,
  blog_news_placeholder: blog_news_placeholder$1,
  blog_news_btn: blog_news_btn$1,
  blog_news_note: blog_news_note$1,
  blog_hero_title_1: blog_hero_title_1$1,
  blog_hero_title_2: blog_hero_title_2$1,
  blog_meta_date: blog_meta_date$1,
  blog_feat_label: blog_feat_label$1,
  blog_feat_desc: blog_feat_desc$1,
  privacy_meta_title: privacy_meta_title$1,
  privacy_meta_desc: privacy_meta_desc$1,
  privacy_meta_og_title: privacy_meta_og_title$1,
  privacy_meta_og_desc: privacy_meta_og_desc$1,
  privacy_badge: privacy_badge$1,
  privacy_title_1: privacy_title_1$1,
  privacy_title_2: privacy_title_2$1,
  privacy_subtitle: privacy_subtitle$1,
  privacy_last_updated: privacy_last_updated$1,
  privacy_status: privacy_status$1,
  privacy_toc_title: privacy_toc_title$1,
  privacy_download_pdf: privacy_download_pdf$1,
  privacy_tldr_title: privacy_tldr_title$1,
  privacy_tldr_1_title: privacy_tldr_1_title$1,
  privacy_tldr_1_desc: privacy_tldr_1_desc$1,
  privacy_tldr_2_title: privacy_tldr_2_title$1,
  privacy_tldr_2_desc: privacy_tldr_2_desc$1,
  privacy_tldr_3_title: privacy_tldr_3_title$1,
  privacy_tldr_3_desc: privacy_tldr_3_desc$1,
  privacy_tldr_4_title: privacy_tldr_4_title$1,
  privacy_tldr_4_desc: privacy_tldr_4_desc$1,
  privacy_doc_intro: privacy_doc_intro$1,
  privacy_h2_collection: privacy_h2_collection$1,
  privacy_p_collection: privacy_p_collection$1,
  privacy_li_collection_1_title: privacy_li_collection_1_title$1,
  privacy_li_collection_1_desc: privacy_li_collection_1_desc$1,
  privacy_li_collection_2_title: privacy_li_collection_2_title$1,
  privacy_li_collection_2_desc: privacy_li_collection_2_desc$1,
  privacy_li_collection_2_strong: privacy_li_collection_2_strong$1,
  privacy_li_collection_3_title: privacy_li_collection_3_title$1,
  privacy_li_collection_3_desc: privacy_li_collection_3_desc$1,
  privacy_h2_usage: privacy_h2_usage$1,
  privacy_p_usage: privacy_p_usage$1,
  privacy_li_usage_1: privacy_li_usage_1$1,
  privacy_li_usage_2: privacy_li_usage_2$1,
  privacy_li_usage_3: privacy_li_usage_3$1,
  privacy_finance_note_title: privacy_finance_note_title$1,
  privacy_finance_note_desc: privacy_finance_note_desc$1,
  privacy_h2_security: privacy_h2_security$1,
  privacy_p_security: privacy_p_security$1,
  privacy_h2_cookies: privacy_h2_cookies$1,
  privacy_p_cookies: privacy_p_cookies$1,
  privacy_h2_rights: privacy_h2_rights$1,
  privacy_p_rights: privacy_p_rights$1,
  privacy_li_rights_1: privacy_li_rights_1$1,
  privacy_li_rights_2: privacy_li_rights_2$1,
  privacy_li_rights_3: privacy_li_rights_3$1,
  privacy_h2_contact: privacy_h2_contact$1,
  privacy_p_contact: privacy_p_contact$1,
  privacy_contact_role: privacy_contact_role$1,
  privacy_contact_email: privacy_contact_email$1,
  privacy_contact_sla: privacy_contact_sla$1,
  privacy_export_title: privacy_export_title$1,
  privacy_export_desc: privacy_export_desc$1,
  privacy_export_point_1: privacy_export_point_1$1,
  privacy_export_point_2: privacy_export_point_2$1,
  privacy_export_code_comment: privacy_export_code_comment$1,
  privacy_faq_title: privacy_faq_title$1,
  privacy_faq_1_q: privacy_faq_1_q$1,
  privacy_faq_1_a: privacy_faq_1_a$1,
  privacy_faq_2_q: privacy_faq_2_q$1,
  privacy_faq_2_a: privacy_faq_2_a$1,
  privacy_faq_3_q: privacy_faq_3_q$1,
  privacy_faq_3_a: privacy_faq_3_a$1,
  privacy_cta_title: privacy_cta_title$1,
  privacy_cta_desc: privacy_cta_desc$1,
  privacy_cta_btn: privacy_cta_btn$1,
  terms_meta_title: terms_meta_title$1,
  terms_meta_desc: terms_meta_desc$1,
  terms_meta_og_title: terms_meta_og_title$1,
  terms_meta_og_desc: terms_meta_og_desc$1,
  terms_badge: terms_badge$1,
  terms_title_1: terms_title_1$1,
  terms_title_2: terms_title_2$1,
  terms_subtitle: terms_subtitle$1,
  terms_effective_date: terms_effective_date$1,
  terms_nav_title: terms_nav_title$1,
  terms_intro_text: terms_intro_text$1,
  terms_intro_sub: terms_intro_sub$1,
  terms_h2_eligibility: terms_h2_eligibility$1,
  terms_p_eligibility: terms_p_eligibility$1,
  terms_eligibility_1: terms_eligibility_1$1,
  terms_eligibility_2: terms_eligibility_2$1,
  terms_h2_rules: terms_h2_rules$1,
  terms_p_rules: terms_p_rules$1,
  terms_rules_do_title: terms_rules_do_title$1,
  terms_rules_do_1: terms_rules_do_1$1,
  terms_rules_do_2: terms_rules_do_2$1,
  terms_rules_do_3: terms_rules_do_3$1,
  terms_rules_dont_title: terms_rules_dont_title$1,
  terms_rules_dont_1: terms_rules_dont_1$1,
  terms_rules_dont_2: terms_rules_dont_2$1,
  terms_rules_dont_3: terms_rules_dont_3$1,
  terms_h2_payment: terms_h2_payment$1,
  terms_p_payment: terms_p_payment$1,
  terms_li_payment_1_title: terms_li_payment_1_title$1,
  terms_li_payment_1_desc: terms_li_payment_1_desc$1,
  terms_li_payment_2_title: terms_li_payment_2_title$1,
  terms_li_payment_2_desc: terms_li_payment_2_desc$1,
  terms_h2_termination: terms_h2_termination$1,
  terms_p_termination: terms_p_termination$1,
  terms_h2_liability: terms_h2_liability$1,
  terms_legal_caps: terms_legal_caps$1,
  terms_cta_title: terms_cta_title$1,
  terms_cta_desc: terms_cta_desc$1,
  terms_cta_btn_agree: terms_cta_btn_agree$1,
  terms_cta_btn_decline: terms_cta_btn_decline$1,
  terms_cta_note: terms_cta_note$1,
  stories_meta_title: stories_meta_title$1,
  stories_meta_desc: stories_meta_desc$1,
  stories_meta_og_title: stories_meta_og_title$1,
  stories_meta_og_desc: stories_meta_og_desc$1,
  stories_hero_badge: stories_hero_badge$1,
  stories_hero_title_1: stories_hero_title_1$1,
  stories_hero_title_2: stories_hero_title_2$1,
  stories_hero_desc: stories_hero_desc$1,
  stories_main_quote: stories_main_quote$1,
  stories_main_body: stories_main_body$1,
  stories_wall_title: stories_wall_title$1,
  stories_wall_desc: stories_wall_desc$1,
  stories_user_1_text: stories_user_1_text$1,
  stories_user_2_text: stories_user_2_text$1,
  stories_user_3_text: stories_user_3_text$1,
  stories_user_4_text: stories_user_4_text$1,
  stories_stat_1: stories_stat_1$1,
  stories_stat_2: stories_stat_2$1,
  stories_stat_3: stories_stat_3$1,
  stories_stat_4: stories_stat_4$1,
  stories_cta_title: stories_cta_title$1,
  stories_cta_desc: stories_cta_desc$1,
  stories_cta_btn: stories_cta_btn$1,
  stories_cta_note: stories_cta_note$1,
  pricing_meta_title: pricing_meta_title$1,
  pricing_meta_desc: pricing_meta_desc$1,
  pricing_meta_og_title: pricing_meta_og_title$1,
  pricing_badge: pricing_badge$1,
  pricing_title_1: pricing_title_1$1,
  pricing_title_2: pricing_title_2$1,
  pricing_subtitle: pricing_subtitle$1,
  pricing_monthly: pricing_monthly$1,
  pricing_yearly: pricing_yearly$1,
  pricing_save_amount: pricing_save_amount$1,
  pricing_free_name: pricing_free_name$1,
  pricing_forever: pricing_forever$1,
  pricing_free_desc: pricing_free_desc$1,
  pricing_feat_habits_limit: pricing_feat_habits_limit$1,
  pricing_feat_finance_basic: pricing_feat_finance_basic$1,
  pricing_free_btn: pricing_free_btn$1,
  pricing_pro_name: pricing_pro_name$1,
  pricing_pro_badge: pricing_pro_badge$1,
  pricing_month: pricing_month$1,
  pricing_billed_annually: pricing_billed_annually$1,
  pricing_pro_desc: pricing_pro_desc$1,
  pricing_feat_unlimited_habits: pricing_feat_unlimited_habits$1,
  pricing_feat_ai_insights: pricing_feat_ai_insights$1,
  pricing_feat_custom_themes: pricing_feat_custom_themes$1,
  pricing_pro_btn: pricing_pro_btn$1,
  pricing_life_name: pricing_life_name$1,
  pricing_once: pricing_once$1,
  pricing_life_desc: pricing_life_desc$1,
  pricing_feat_lifetime_access: pricing_feat_lifetime_access$1,
  pricing_feat_priority_support: pricing_feat_priority_support$1,
  pricing_life_btn: pricing_life_btn$1,
  pricing_compare_title: pricing_compare_title$1,
  pricing_compare_subtitle: pricing_compare_subtitle$1,
  pricing_feat_label: pricing_feat_label$1,
  pricing_trust_1_title: pricing_trust_1_title$1,
  pricing_trust_1_desc: pricing_trust_1_desc$1,
  pricing_trust_2_title: pricing_trust_2_title$1,
  pricing_trust_2_desc: pricing_trust_2_desc$1,
  pricing_trust_3_title: pricing_trust_3_title$1,
  pricing_trust_3_desc: pricing_trust_3_desc$1,
  pricing_faq_title: pricing_faq_title$1,
  pricing_faq_1_q: pricing_faq_1_q$1,
  pricing_faq_1_a: pricing_faq_1_a$1,
  pricing_faq_2_q: pricing_faq_2_q$1,
  pricing_faq_2_a: pricing_faq_2_a$1,
  pricing_bottom_cta_title: pricing_bottom_cta_title$1,
  pricing_bottom_cta_desc: pricing_bottom_cta_desc$1,
  pricing_bottom_cta_btn: pricing_bottom_cta_btn$1,
  notes_meta_title: notes_meta_title$1,
  notes_meta_desc: notes_meta_desc$1,
  notes_meta_og_title: notes_meta_og_title$1,
  notes_meta_og_desc: notes_meta_og_desc$1,
  notes_badge: notes_badge$1,
  notes_hero_title_1: notes_hero_title_1$1,
  notes_hero_title_2: notes_hero_title_2$1,
  notes_hero_desc: notes_hero_desc$1,
  notes_hero_cta: notes_hero_cta$1,
  notes_hero_note: notes_hero_note$1,
  notes_mockup_status: notes_mockup_status$1,
  notes_mockup_title: notes_mockup_title$1,
  notes_mockup_deadline: notes_mockup_deadline$1,
  notes_mockup_task_1: notes_mockup_task_1$1,
  notes_mockup_task_2: notes_mockup_task_2$1,
  notes_mockup_task_3: notes_mockup_task_3$1,
  notes_prob_title_1: notes_prob_title_1$1,
  notes_prob_title_highlight: notes_prob_title_highlight$1,
  notes_prob_desc: notes_prob_desc$1,
  notes_prob_point_1: notes_prob_point_1$1,
  notes_prob_point_2: notes_prob_point_2$1,
  notes_prob_point_3: notes_prob_point_3$1,
  notes_chaos_title: notes_chaos_title$1,
  notes_chaos_date: notes_chaos_date$1,
  notes_chaos_item_1: notes_chaos_item_1$1,
  notes_chaos_item_2: notes_chaos_item_2$1,
  notes_chaos_item_3: notes_chaos_item_3$1,
  notes_chaos_item_4: notes_chaos_item_4$1,
  notes_chaos_item_5: notes_chaos_item_5$1,
  notes_chaos_badge: notes_chaos_badge$1,
  notes_hub_finance: notes_hub_finance$1,
  notes_hub_goals: notes_hub_goals$1,
  notes_hub_tracking: notes_hub_tracking$1,
  notes_hub_habits: notes_hub_habits$1,
  notes_hub_connected: notes_hub_connected$1,
  notes_sol_title_1: notes_sol_title_1$1,
  notes_sol_title_highlight: notes_sol_title_highlight$1,
  notes_sol_desc: notes_sol_desc$1,
  notes_sol_box_title: notes_sol_box_title$1,
  notes_sol_box_desc: notes_sol_box_desc$1,
  notes_compare_title: notes_compare_title$1,
  notes_compare_desc: notes_compare_desc$1,
  notes_table_head_1: notes_table_head_1$1,
  notes_table_head_2: notes_table_head_2$1,
  notes_table_row_1_title: notes_table_row_1_title$1,
  notes_table_row_1_col_1: notes_table_row_1_col_1$1,
  notes_table_row_1_col_2: notes_table_row_1_col_2$1,
  notes_table_row_2_title: notes_table_row_2_title$1,
  notes_table_row_2_col_1: notes_table_row_2_col_1$1,
  notes_table_row_2_col_2: notes_table_row_2_col_2$1,
  notes_table_row_3_title: notes_table_row_3_title$1,
  notes_table_row_3_col_1: notes_table_row_3_col_1$1,
  notes_table_row_3_col_2: notes_table_row_3_col_2$1,
  notes_table_row_4_title: notes_table_row_4_title$1,
  notes_table_row_4_col_1: notes_table_row_4_col_1$1,
  notes_table_row_4_col_2: notes_table_row_4_col_2$1,
  notes_cta_title: notes_cta_title$1,
  notes_cta_desc: notes_cta_desc$1,
  notes_cta_btn: notes_cta_btn$1,
  notes_cta_sub: notes_cta_sub$1,
  notes_cycle_title: notes_cycle_title$1,
  notes_cycle_desc: notes_cycle_desc$1,
  notes_cycle_1_title: notes_cycle_1_title$1,
  notes_cycle_1_desc: notes_cycle_1_desc$1,
  notes_cycle_2_title: notes_cycle_2_title$1,
  notes_cycle_2_desc: notes_cycle_2_desc$1,
  notes_cycle_3_title: notes_cycle_3_title$1,
  notes_cycle_3_desc: notes_cycle_3_desc$1,
  blank_cycle_title: blank_cycle_title$1,
  blank_cycle_desc: blank_cycle_desc$1,
  blank_cycle_1_title: blank_cycle_1_title$1,
  blank_cycle_1_desc: blank_cycle_1_desc$1,
  blank_cycle_2_title: blank_cycle_2_title$1,
  blank_cycle_2_desc: blank_cycle_2_desc$1,
  blank_cycle_3_title: blank_cycle_3_title$1,
  blank_cycle_3_desc: blank_cycle_3_desc$1,
  blank_meta_title: blank_meta_title$1,
  blank_meta_desc: blank_meta_desc$1,
  blank_meta_og_title: blank_meta_og_title$1,
  blank_meta_og_desc: blank_meta_og_desc$1,
  blank_badge: blank_badge$1,
  blank_hero_title_1: blank_hero_title_1$1,
  blank_hero_title_2: blank_hero_title_2$1,
  blank_hero_desc: blank_hero_desc$1,
  blank_hero_cta: blank_hero_cta$1,
  blank_hero_note: blank_hero_note$1,
  blank_mockup_status: blank_mockup_status$1,
  blank_mockup_title: blank_mockup_title$1,
  blank_mockup_subtitle: blank_mockup_subtitle$1,
  blank_mockup_stat_1: blank_mockup_stat_1$1,
  blank_mockup_insight: blank_mockup_insight$1,
  blank_prob_title_1: blank_prob_title_1$1,
  blank_prob_title_highlight: blank_prob_title_highlight$1,
  blank_prob_desc: blank_prob_desc$1,
  blank_prob_point_1: blank_prob_point_1$1,
  blank_prob_point_2: blank_prob_point_2$1,
  blank_prob_point_3: blank_prob_point_3$1,
  blank_chaos_badge: blank_chaos_badge$1,
  blank_hub_finance: blank_hub_finance$1,
  blank_hub_focus: blank_hub_focus$1,
  blank_hub_ready: blank_hub_ready$1,
  blank_hub_system: blank_hub_system$1,
  blank_hub_automated: blank_hub_automated$1,
  blank_sol_title_1: blank_sol_title_1$1,
  blank_sol_title_highlight: blank_sol_title_highlight$1,
  blank_sol_desc: blank_sol_desc$1,
  blank_sol_box_title: blank_sol_box_title$1,
  blank_sol_box_desc: blank_sol_box_desc$1,
  blank_compare_title: blank_compare_title$1,
  blank_compare_desc: blank_compare_desc$1,
  blank_table_head_1: blank_table_head_1$1,
  blank_table_head_2: blank_table_head_2$1,
  blank_table_row_1_title: blank_table_row_1_title$1,
  blank_table_row_1_col_1: blank_table_row_1_col_1$1,
  blank_table_row_1_col_2: blank_table_row_1_col_2$1,
  blank_table_row_2_title: blank_table_row_2_title$1,
  blank_table_row_2_col_1: blank_table_row_2_col_1$1,
  blank_table_row_2_col_2: blank_table_row_2_col_2$1,
  blank_table_row_3_title: blank_table_row_3_title$1,
  blank_table_row_3_col_1: blank_table_row_3_col_1$1,
  blank_table_row_3_col_2: blank_table_row_3_col_2$1,
  blank_table_row_4_title: blank_table_row_4_title$1,
  blank_table_row_4_col_1: blank_table_row_4_col_1$1,
  blank_table_row_4_col_2: blank_table_row_4_col_2$1,
  blank_cta_title: blank_cta_title$1,
  blank_cta_desc: blank_cta_desc$1,
  blank_cta_btn: blank_cta_btn$1,
  blank_cta_sub: blank_cta_sub$1,
  pm_meta_title: pm_meta_title$1,
  pm_meta_desc: pm_meta_desc$1,
  pm_meta_og_title: pm_meta_og_title$1,
  pm_meta_og_desc: pm_meta_og_desc$1,
  pm_badge: pm_badge$1,
  pm_hero_title_1: pm_hero_title_1$1,
  pm_hero_title_2: pm_hero_title_2$1,
  pm_hero_desc: pm_hero_desc$1,
  pm_hero_cta: pm_hero_cta$1,
  pm_hero_note: pm_hero_note$1,
  pm_mockup_status: pm_mockup_status$1,
  pm_mockup_title: pm_mockup_title$1,
  pm_mockup_desc: pm_mockup_desc$1,
  pm_mockup_item_1: pm_mockup_item_1$1,
  pm_mockup_item_2: pm_mockup_item_2$1,
  pm_mockup_item_3: pm_mockup_item_3$1,
  pm_cycle_title: pm_cycle_title$1,
  pm_cycle_desc: pm_cycle_desc$1,
  pm_cycle_1_title: pm_cycle_1_title$1,
  pm_cycle_1_desc: pm_cycle_1_desc$1,
  pm_cycle_2_title: pm_cycle_2_title$1,
  pm_cycle_2_desc: pm_cycle_2_desc$1,
  pm_cycle_3_title: pm_cycle_3_title$1,
  pm_cycle_3_desc: pm_cycle_3_desc$1,
  pm_prob_title_1: pm_prob_title_1$1,
  pm_prob_title_highlight: pm_prob_title_highlight$1,
  pm_prob_desc: pm_prob_desc$1,
  pm_prob_point_1: pm_prob_point_1$1,
  pm_prob_point_2: pm_prob_point_2$1,
  pm_prob_point_3: pm_prob_point_3$1,
  pm_hub_you: pm_hub_you$1,
  pm_hub_vision: pm_hub_vision$1,
  pm_hub_yours: pm_hub_yours$1,
  pm_hub_growth: pm_hub_growth$1,
  pm_hub_private: pm_hub_private$1,
  pm_sol_title_1: pm_sol_title_1$1,
  pm_sol_title_highlight: pm_sol_title_highlight$1,
  pm_sol_desc: pm_sol_desc$1,
  pm_sol_box_title: pm_sol_box_title$1,
  pm_sol_box_desc: pm_sol_box_desc$1,
  pm_compare_title: pm_compare_title$1,
  pm_compare_desc: pm_compare_desc$1,
  pm_table_head_1: pm_table_head_1$1,
  pm_table_head_2: pm_table_head_2$1,
  pm_table_row_1_title: pm_table_row_1_title$1,
  pm_table_row_1_col_1: pm_table_row_1_col_1$1,
  pm_table_row_1_col_2: pm_table_row_1_col_2$1,
  pm_table_row_2_title: pm_table_row_2_title$1,
  pm_table_row_2_col_1: pm_table_row_2_col_1$1,
  pm_table_row_2_col_2: pm_table_row_2_col_2$1,
  pm_table_row_3_title: pm_table_row_3_title$1,
  pm_table_row_3_col_1: pm_table_row_3_col_1$1,
  pm_table_row_3_col_2: pm_table_row_3_col_2$1,
  pm_table_row_4_title: pm_table_row_4_title$1,
  pm_table_row_4_col_1: pm_table_row_4_col_1$1,
  pm_table_row_4_col_2: pm_table_row_4_col_2$1,
  pm_cta_title: pm_cta_title$1,
  pm_cta_desc: pm_cta_desc$1,
  pm_cta_btn: pm_cta_btn$1,
  pm_cta_sub: pm_cta_sub$1,
  habitap_meta_title: habitap_meta_title$1,
  habitap_meta_desc: habitap_meta_desc$1,
  habitap_meta_og_title: habitap_meta_og_title$1,
  habitap_meta_og_desc: habitap_meta_og_desc$1,
  habitap_badge: habitap_badge$1,
  habitap_hero_title_1: habitap_hero_title_1$1,
  habitap_hero_title_2: habitap_hero_title_2$1,
  habitap_hero_desc: habitap_hero_desc$1,
  habitap_hero_cta: habitap_hero_cta$1,
  habitap_hero_note: habitap_hero_note$1,
  habitap_mockup_status: habitap_mockup_status$1,
  habitap_mockup_title: habitap_mockup_title$1,
  habitap_mockup_desc: habitap_mockup_desc$1,
  habitap_mockup_stat_1: habitap_mockup_stat_1$1,
  habitap_mockup_stat_2: habitap_mockup_stat_2$1,
  habitap_cycle_title: habitap_cycle_title$1,
  habitap_cycle_desc: habitap_cycle_desc$1,
  habitap_cycle_1_title: habitap_cycle_1_title$1,
  habitap_cycle_1_desc: habitap_cycle_1_desc$1,
  habitap_cycle_2_title: habitap_cycle_2_title$1,
  habitap_cycle_2_desc: habitap_cycle_2_desc$1,
  habitap_cycle_3_title: habitap_cycle_3_title$1,
  habitap_cycle_3_desc: habitap_cycle_3_desc$1,
  habitap_prob_title_1: habitap_prob_title_1$1,
  habitap_prob_title_highlight: habitap_prob_title_highlight$1,
  habitap_prob_desc: habitap_prob_desc$1,
  habitap_prob_point_1: habitap_prob_point_1$1,
  habitap_prob_point_2: habitap_prob_point_2$1,
  habitap_prob_point_3: habitap_prob_point_3$1,
  habitap_sol_title_1: habitap_sol_title_1$1,
  habitap_sol_title_highlight: habitap_sol_title_highlight$1,
  habitap_sol_desc: habitap_sol_desc$1,
  habitap_sol_1_title: habitap_sol_1_title$1,
  habitap_sol_1_desc: habitap_sol_1_desc$1,
  habitap_sol_2_title: habitap_sol_2_title$1,
  habitap_sol_2_desc: habitap_sol_2_desc$1,
  habitap_sol_3_title: habitap_sol_3_title$1,
  habitap_sol_3_desc: habitap_sol_3_desc$1,
  habitap_compare_title: habitap_compare_title$1,
  habitap_compare_desc: habitap_compare_desc$1,
  habitap_table_head_2: habitap_table_head_2$1,
  habitap_table_row_1_title: habitap_table_row_1_title$1,
  habitap_table_row_1_col_1: habitap_table_row_1_col_1$1,
  habitap_table_row_1_col_2: habitap_table_row_1_col_2$1,
  habitap_table_row_2_title: habitap_table_row_2_title$1,
  habitap_table_row_2_col_1: habitap_table_row_2_col_1$1,
  habitap_table_row_2_col_2: habitap_table_row_2_col_2$1,
  habitap_table_row_3_title: habitap_table_row_3_title$1,
  habitap_table_row_3_col_1: habitap_table_row_3_col_1$1,
  habitap_table_row_3_col_2: habitap_table_row_3_col_2$1,
  habitap_cta_title: habitap_cta_title$1,
  habitap_cta_desc: habitap_cta_desc$1,
  habitap_cta_btn: habitap_cta_btn$1,
  habitap_cta_sub: habitap_cta_sub$1,
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
  journal_title: journal_title$1,
  journal_subtitle: journal_subtitle$1,
  journal_tasks: journal_tasks$1,
  journal_habit: journal_habit$1,
  journal_habit_done: journal_habit_done$1,
  journal_expense: journal_expense$1,
  journal_history: journal_history$1,
  journal_add: journal_add$1,
  journal_empty_title: journal_empty_title$1,
  journal_empty_subtitle: journal_empty_subtitle$1,
  journal_untitled: journal_untitled$1,
  journal_no_content: journal_no_content$1,
  journal_confirm_delete: journal_confirm_delete$1,
  journal_delete_warn: journal_delete_warn$1,
  status_deleted: status_deleted$1,
  status_image_saved: status_image_saved$1,
  status_image_deleted: status_image_deleted$1,
  calendar_more: calendar_more$1,
  journal_filled: journal_filled$1,
  calendar_tasks: calendar_tasks$1,
  calendar_expense: calendar_expense$1,
  habit_completed: habit_completed$1,
  calendar_day_summary: calendar_day_summary$1,
  calendar_events_schedule: calendar_events_schedule$1,
  calendar_no_events: calendar_no_events$1,
  btn_edit: btn_edit$1,
  calendar_life_os_summary: calendar_life_os_summary$1,
  calendar_journal: calendar_journal$1,
  calendar_journal_written: calendar_journal_written$1,
  calendar_empty: calendar_empty$1,
  calendar_daily_tasks: calendar_daily_tasks$1,
  calendar_tasks_done: calendar_tasks_done$1,
  calendar_no_tasks: calendar_no_tasks$1,
  calendar_habits: calendar_habits$1,
  calendar_habits_done: calendar_habits_done$1,
  calendar_title: calendar_title$1,
  calendar_subtitle: calendar_subtitle$1,
  calendar_new_event: calendar_new_event$1,
  calendar_edit_event: calendar_edit_event$1,
  label_title: label_title$1,
  label_start_date: label_start_date$1,
  label_end_date: label_end_date$1,
  label_color: label_color$1,
  label_description: label_description$1,
  ph_event_title: ph_event_title$1,
  ph_event_desc: ph_event_desc$1,
  btn_add_event: btn_add_event$1,
  color_indigo: color_indigo$1,
  color_sky: color_sky$1,
  color_emerald: color_emerald$1,
  color_amber: color_amber$1,
  color_rose: color_rose$1,
  color_purple: color_purple$1,
  calendar_expense_short: calendar_expense_short$1,
  calendar_expense_label: calendar_expense_label$1,
  calendar_no_events_title: calendar_no_events_title$1,
  calendar_no_events_desc: calendar_no_events_desc$1,
  calendar_today: calendar_today$1,
  calendar_open: calendar_open$1,
  calendar_more_events: calendar_more_events$1,
  calendar_focus: calendar_focus$1,
  calendar_events: calendar_events$1,
  calendar_planner: calendar_planner$1,
  calendar_finance: calendar_finance$1,
  calendar_journal_short: calendar_journal_short$1,
  calendar_habits_short: calendar_habits_short$1,
  calendar_tasks_short: calendar_tasks_short$1,
  btn_back_dashboard: btn_back_dashboard$1,
  status_saving: status_saving$1,
  status_saved: status_saved$1,
  btn_save_manual: btn_save_manual$1,
  journal_mood_label: journal_mood_label$1,
  journal_add_photo: journal_add_photo$1,
  journal_write_placeholder: journal_write_placeholder$1,
  journal_title_placeholder: journal_title_placeholder$1,
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
  blank_badge: blank_badge$1,
  blank_chaos_badge: blank_chaos_badge$1,
  blank_compare_desc: blank_compare_desc$1,
  blank_compare_title: blank_compare_title$1,
  blank_cta_btn: blank_cta_btn$1,
  blank_cta_desc: blank_cta_desc$1,
  blank_cta_sub: blank_cta_sub$1,
  blank_cta_title: blank_cta_title$1,
  blank_cycle_1_desc: blank_cycle_1_desc$1,
  blank_cycle_1_title: blank_cycle_1_title$1,
  blank_cycle_2_desc: blank_cycle_2_desc$1,
  blank_cycle_2_title: blank_cycle_2_title$1,
  blank_cycle_3_desc: blank_cycle_3_desc$1,
  blank_cycle_3_title: blank_cycle_3_title$1,
  blank_cycle_desc: blank_cycle_desc$1,
  blank_cycle_title: blank_cycle_title$1,
  blank_hero_cta: blank_hero_cta$1,
  blank_hero_desc: blank_hero_desc$1,
  blank_hero_note: blank_hero_note$1,
  blank_hero_title_1: blank_hero_title_1$1,
  blank_hero_title_2: blank_hero_title_2$1,
  blank_hub_automated: blank_hub_automated$1,
  blank_hub_finance: blank_hub_finance$1,
  blank_hub_focus: blank_hub_focus$1,
  blank_hub_ready: blank_hub_ready$1,
  blank_hub_system: blank_hub_system$1,
  blank_meta_desc: blank_meta_desc$1,
  blank_meta_og_desc: blank_meta_og_desc$1,
  blank_meta_og_title: blank_meta_og_title$1,
  blank_meta_title: blank_meta_title$1,
  blank_mockup_insight: blank_mockup_insight$1,
  blank_mockup_stat_1: blank_mockup_stat_1$1,
  blank_mockup_status: blank_mockup_status$1,
  blank_mockup_subtitle: blank_mockup_subtitle$1,
  blank_mockup_title: blank_mockup_title$1,
  blank_prob_desc: blank_prob_desc$1,
  blank_prob_point_1: blank_prob_point_1$1,
  blank_prob_point_2: blank_prob_point_2$1,
  blank_prob_point_3: blank_prob_point_3$1,
  blank_prob_title_1: blank_prob_title_1$1,
  blank_prob_title_highlight: blank_prob_title_highlight$1,
  blank_sol_box_desc: blank_sol_box_desc$1,
  blank_sol_box_title: blank_sol_box_title$1,
  blank_sol_desc: blank_sol_desc$1,
  blank_sol_title_1: blank_sol_title_1$1,
  blank_sol_title_highlight: blank_sol_title_highlight$1,
  blank_table_head_1: blank_table_head_1$1,
  blank_table_head_2: blank_table_head_2$1,
  blank_table_row_1_col_1: blank_table_row_1_col_1$1,
  blank_table_row_1_col_2: blank_table_row_1_col_2$1,
  blank_table_row_1_title: blank_table_row_1_title$1,
  blank_table_row_2_col_1: blank_table_row_2_col_1$1,
  blank_table_row_2_col_2: blank_table_row_2_col_2$1,
  blank_table_row_2_title: blank_table_row_2_title$1,
  blank_table_row_3_col_1: blank_table_row_3_col_1$1,
  blank_table_row_3_col_2: blank_table_row_3_col_2$1,
  blank_table_row_3_title: blank_table_row_3_title$1,
  blank_table_row_4_col_1: blank_table_row_4_col_1$1,
  blank_table_row_4_col_2: blank_table_row_4_col_2$1,
  blank_table_row_4_title: blank_table_row_4_title$1,
  blog_cat_all: blog_cat_all$1,
  blog_cat_freelance: blog_cat_freelance$1,
  blog_cat_prod: blog_cat_prod$1,
  blog_cat_student: blog_cat_student$1,
  blog_cat_updates: blog_cat_updates$1,
  blog_feat_desc: blog_feat_desc$1,
  blog_feat_label: blog_feat_label$1,
  blog_feat_title: blog_feat_title$1,
  blog_grid_1_date: blog_grid_1_date$1,
  blog_grid_1_desc: blog_grid_1_desc$1,
  blog_grid_1_title: blog_grid_1_title$1,
  blog_grid_2_date: blog_grid_2_date$1,
  blog_grid_2_desc: blog_grid_2_desc$1,
  blog_grid_2_title: blog_grid_2_title$1,
  blog_grid_3_date: blog_grid_3_date$1,
  blog_grid_3_desc: blog_grid_3_desc$1,
  blog_grid_3_title: blog_grid_3_title$1,
  blog_grid_4_date: blog_grid_4_date$1,
  blog_grid_4_desc: blog_grid_4_desc$1,
  blog_grid_4_title: blog_grid_4_title$1,
  blog_grid_5_date: blog_grid_5_date$1,
  blog_grid_5_desc: blog_grid_5_desc$1,
  blog_grid_5_title: blog_grid_5_title$1,
  blog_hero_badge: blog_hero_badge$1,
  blog_hero_title_1: blog_hero_title_1$1,
  blog_hero_title_2: blog_hero_title_2$1,
  blog_meta_date: blog_meta_date$1,
  blog_meta_desc: blog_meta_desc$1,
  blog_meta_og_desc: blog_meta_og_desc$1,
  blog_meta_og_title: blog_meta_og_title$1,
  blog_meta_title: blog_meta_title$1,
  blog_news_badge: blog_news_badge$1,
  blog_news_btn: blog_news_btn$1,
  blog_news_desc: blog_news_desc$1,
  blog_news_note: blog_news_note$1,
  blog_news_placeholder: blog_news_placeholder$1,
  blog_news_title: blog_news_title$1,
  btn_add: btn_add$1,
  btn_add_another: btn_add_another$1,
  btn_add_event: btn_add_event$1,
  btn_add_habit: btn_add_habit$1,
  btn_add_schedule: btn_add_schedule$1,
  btn_add_task: btn_add_task$1,
  btn_add_task_short: btn_add_task_short$1,
  btn_add_timeline: btn_add_timeline$1,
  btn_back_dashboard: btn_back_dashboard$1,
  btn_cancel: btn_cancel$1,
  btn_confirm_reset: btn_confirm_reset$1,
  btn_create: btn_create$1,
  btn_delete: btn_delete$1,
  btn_edit: btn_edit$1,
  btn_reset: btn_reset$1,
  btn_reset_tooltip: btn_reset_tooltip$1,
  btn_save: btn_save$1,
  btn_save_all: btn_save_all$1,
  btn_save_manual: btn_save_manual$1,
  btn_saving: btn_saving$1,
  btn_single_mode: btn_single_mode$1,
  btn_transaction: btn_transaction$1,
  btn_update: btn_update$1,
  btn_yes_delete: btn_yes_delete$1,
  budget_limit: budget_limit$1,
  budget_target: budget_target$1,
  budget_warning: budget_warning$1,
  calendar_bento_1_desc: calendar_bento_1_desc$1,
  calendar_bento_1_title: calendar_bento_1_title$1,
  calendar_bento_2_desc: calendar_bento_2_desc$1,
  calendar_bento_2_title: calendar_bento_2_title$1,
  calendar_bento_3_desc: calendar_bento_3_desc$1,
  calendar_bento_3_title: calendar_bento_3_title$1,
  calendar_bento_4_desc: calendar_bento_4_desc$1,
  calendar_bento_4_title: calendar_bento_4_title$1,
  calendar_bento_desc: calendar_bento_desc$1,
  calendar_bento_title: calendar_bento_title$1,
  calendar_cta_btn: calendar_cta_btn$1,
  calendar_cta_desc: calendar_cta_desc$1,
  calendar_cta_note: calendar_cta_note$1,
  calendar_cta_title: calendar_cta_title$1,
  calendar_daily_tasks: calendar_daily_tasks$1,
  calendar_day_summary: calendar_day_summary$1,
  calendar_edit_event: calendar_edit_event$1,
  calendar_empty: calendar_empty$1,
  calendar_events: calendar_events$1,
  calendar_events_schedule: calendar_events_schedule$1,
  calendar_expense: calendar_expense$1,
  calendar_expense_label: calendar_expense_label$1,
  calendar_expense_short: calendar_expense_short$1,
  calendar_feature_1_desc: calendar_feature_1_desc$1,
  calendar_feature_1_title: calendar_feature_1_title$1,
  calendar_feature_2_desc: calendar_feature_2_desc$1,
  calendar_feature_2_point_1: calendar_feature_2_point_1$1,
  calendar_feature_2_point_2: calendar_feature_2_point_2$1,
  calendar_feature_2_title: calendar_feature_2_title$1,
  calendar_finance: calendar_finance$1,
  calendar_focus: calendar_focus$1,
  calendar_habits: calendar_habits$1,
  calendar_habits_done: calendar_habits_done$1,
  calendar_habits_short: calendar_habits_short$1,
  calendar_hero_badge: calendar_hero_badge$1,
  calendar_hero_cta_1: calendar_hero_cta_1$1,
  calendar_hero_cta_2: calendar_hero_cta_2$1,
  calendar_hero_desc: calendar_hero_desc$1,
  calendar_hero_title_1: calendar_hero_title_1$1,
  calendar_hero_title_2: calendar_hero_title_2$1,
  calendar_journal: calendar_journal$1,
  calendar_journal_short: calendar_journal_short$1,
  calendar_journal_written: calendar_journal_written$1,
  calendar_life_os_summary: calendar_life_os_summary$1,
  calendar_meta_desc: calendar_meta_desc$1,
  calendar_meta_og_desc: calendar_meta_og_desc$1,
  calendar_meta_og_title: calendar_meta_og_title$1,
  calendar_meta_title: calendar_meta_title$1,
  calendar_mockup_alert_1: calendar_mockup_alert_1$1,
  calendar_mockup_alert_2: calendar_mockup_alert_2$1,
  calendar_mockup_date: calendar_mockup_date$1,
  calendar_mockup_event_1: calendar_mockup_event_1$1,
  calendar_mockup_event_1_time: calendar_mockup_event_1_time$1,
  calendar_mockup_event_2: calendar_mockup_event_2$1,
  calendar_mockup_event_2_time: calendar_mockup_event_2_time$1,
  calendar_mockup_event_3: calendar_mockup_event_3$1,
  calendar_mockup_event_3_time: calendar_mockup_event_3_time$1,
  calendar_mockup_location_1: calendar_mockup_location_1$1,
  calendar_mockup_location_2: calendar_mockup_location_2$1,
  calendar_mockup_location_3: calendar_mockup_location_3$1,
  calendar_mockup_month: calendar_mockup_month$1,
  calendar_mockup_today: calendar_mockup_today$1,
  calendar_more: calendar_more$1,
  calendar_more_events: calendar_more_events$1,
  calendar_new_event: calendar_new_event$1,
  calendar_no_events: calendar_no_events$1,
  calendar_no_events_desc: calendar_no_events_desc$1,
  calendar_no_events_title: calendar_no_events_title$1,
  calendar_no_tasks: calendar_no_tasks$1,
  calendar_open: calendar_open$1,
  calendar_planner: calendar_planner$1,
  calendar_prob_1_desc: calendar_prob_1_desc$1,
  calendar_prob_1_title: calendar_prob_1_title$1,
  calendar_prob_2_desc: calendar_prob_2_desc$1,
  calendar_prob_2_title: calendar_prob_2_title$1,
  calendar_prob_3_desc: calendar_prob_3_desc$1,
  calendar_prob_3_title: calendar_prob_3_title$1,
  calendar_prob_title_1: calendar_prob_title_1$1,
  calendar_prob_title_2: calendar_prob_title_2$1,
  calendar_prob_title_strike: calendar_prob_title_strike$1,
  calendar_quote_author: calendar_quote_author$1,
  calendar_quote_text: calendar_quote_text$1,
  calendar_subtitle: calendar_subtitle$1,
  calendar_tasks: calendar_tasks$1,
  calendar_tasks_done: calendar_tasks_done$1,
  calendar_tasks_short: calendar_tasks_short$1,
  calendar_title: calendar_title$1,
  calendar_today: calendar_today$1,
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
  color_amber: color_amber$1,
  color_emerald: color_emerald$1,
  color_indigo: color_indigo$1,
  color_purple: color_purple$1,
  color_rose: color_rose$1,
  color_sky: color_sky$1,
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
  finance_bento_1_desc: finance_bento_1_desc$1,
  finance_bento_1_title: finance_bento_1_title$1,
  finance_bento_2_desc: finance_bento_2_desc$1,
  finance_bento_2_title: finance_bento_2_title$1,
  finance_bento_3_desc: finance_bento_3_desc$1,
  finance_bento_3_title: finance_bento_3_title$1,
  finance_bento_4_desc: finance_bento_4_desc$1,
  finance_bento_4_title: finance_bento_4_title$1,
  finance_bento_desc: finance_bento_desc$1,
  finance_bento_title: finance_bento_title$1,
  finance_cta_btn: finance_cta_btn$1,
  finance_cta_desc: finance_cta_desc$1,
  finance_cta_note: finance_cta_note$1,
  finance_cta_title: finance_cta_title$1,
  finance_feature_1_desc: finance_feature_1_desc$1,
  finance_feature_1_point_1: finance_feature_1_point_1$1,
  finance_feature_1_point_2: finance_feature_1_point_2$1,
  finance_feature_1_title: finance_feature_1_title$1,
  finance_feature_2_desc: finance_feature_2_desc$1,
  finance_feature_2_point_1: finance_feature_2_point_1$1,
  finance_feature_2_point_2: finance_feature_2_point_2$1,
  finance_feature_2_title: finance_feature_2_title$1,
  finance_hero_badge: finance_hero_badge$1,
  finance_hero_cta_1: finance_hero_cta_1$1,
  finance_hero_cta_2: finance_hero_cta_2$1,
  finance_hero_desc: finance_hero_desc$1,
  finance_hero_title_1: finance_hero_title_1$1,
  finance_hero_title_2: finance_hero_title_2$1,
  finance_meta_desc: finance_meta_desc$1,
  finance_meta_og_desc: finance_meta_og_desc$1,
  finance_meta_og_title: finance_meta_og_title$1,
  finance_meta_title: finance_meta_title$1,
  finance_mockup_alert_1: finance_mockup_alert_1$1,
  finance_mockup_alert_2: finance_mockup_alert_2$1,
  finance_mockup_balance: finance_mockup_balance$1,
  finance_mockup_task_1: finance_mockup_task_1$1,
  finance_mockup_task_2: finance_mockup_task_2$1,
  finance_mockup_task_3: finance_mockup_task_3$1,
  finance_mockup_time_1: finance_mockup_time_1$1,
  finance_mockup_time_2: finance_mockup_time_2$1,
  finance_mockup_time_3: finance_mockup_time_3$1,
  finance_mockup_title: finance_mockup_title$1,
  finance_plan: finance_plan$1,
  finance_privacy_desc: finance_privacy_desc$1,
  finance_privacy_point_1_desc: finance_privacy_point_1_desc$1,
  finance_privacy_point_1_title: finance_privacy_point_1_title$1,
  finance_privacy_point_2_desc: finance_privacy_point_2_desc$1,
  finance_privacy_point_2_title: finance_privacy_point_2_title$1,
  finance_privacy_point_3_desc: finance_privacy_point_3_desc$1,
  finance_privacy_point_3_title: finance_privacy_point_3_title$1,
  finance_privacy_title: finance_privacy_title$1,
  finance_prob_1_desc: finance_prob_1_desc$1,
  finance_prob_1_title: finance_prob_1_title$1,
  finance_prob_2_desc: finance_prob_2_desc$1,
  finance_prob_2_title: finance_prob_2_title$1,
  finance_prob_3_desc: finance_prob_3_desc$1,
  finance_prob_3_title: finance_prob_3_title$1,
  finance_prob_title_1: finance_prob_title_1$1,
  finance_prob_title_2: finance_prob_title_2$1,
  finance_prob_title_strike: finance_prob_title_strike$1,
  finance_quote_author: finance_quote_author$1,
  finance_quote_text: finance_quote_text$1,
  finance_trend: finance_trend$1,
  footer_legal: footer_legal$1,
  footer_rights: footer_rights$2,
  freelance_bento_1_desc: freelance_bento_1_desc$1,
  freelance_bento_1_title: freelance_bento_1_title$1,
  freelance_bento_2_desc: freelance_bento_2_desc$1,
  freelance_bento_2_title: freelance_bento_2_title$1,
  freelance_bento_3_desc: freelance_bento_3_desc$1,
  freelance_bento_3_title: freelance_bento_3_title$1,
  freelance_bento_4_desc: freelance_bento_4_desc$1,
  freelance_bento_4_title: freelance_bento_4_title$1,
  freelance_bento_desc: freelance_bento_desc$1,
  freelance_bento_title: freelance_bento_title$1,
  freelance_cta_btn: freelance_cta_btn$1,
  freelance_cta_desc: freelance_cta_desc$1,
  freelance_cta_note: freelance_cta_note$1,
  freelance_cta_title: freelance_cta_title$1,
  freelance_feat_1_desc: freelance_feat_1_desc$1,
  freelance_feat_1_point_1: freelance_feat_1_point_1$1,
  freelance_feat_1_point_2: freelance_feat_1_point_2$1,
  freelance_feat_1_title: freelance_feat_1_title$1,
  freelance_feat_2_desc: freelance_feat_2_desc$1,
  freelance_feat_2_point_1: freelance_feat_2_point_1$1,
  freelance_feat_2_point_2: freelance_feat_2_point_2$1,
  freelance_feat_2_title: freelance_feat_2_title$1,
  freelance_hero_badge: freelance_hero_badge$1,
  freelance_hero_cta_1: freelance_hero_cta_1$1,
  freelance_hero_desc: freelance_hero_desc$1,
  freelance_hero_social_proof: freelance_hero_social_proof$1,
  freelance_hero_title_1: freelance_hero_title_1$1,
  freelance_hero_title_2: freelance_hero_title_2$1,
  freelance_meta_desc: freelance_meta_desc$1,
  freelance_meta_og_desc: freelance_meta_og_desc$1,
  freelance_meta_og_title: freelance_meta_og_title$1,
  freelance_meta_title: freelance_meta_title$1,
  freelance_prob_1_desc: freelance_prob_1_desc$1,
  freelance_prob_1_title: freelance_prob_1_title$1,
  freelance_prob_2_desc: freelance_prob_2_desc$1,
  freelance_prob_2_title: freelance_prob_2_title$1,
  freelance_prob_3_desc: freelance_prob_3_desc$1,
  freelance_prob_3_title: freelance_prob_3_title$1,
  freelance_prob_desc: freelance_prob_desc$1,
  freelance_prob_title: freelance_prob_title$1,
  fund_source: fund_source$1,
  greet_afternoon: greet_afternoon$1,
  greet_morning: greet_morning$1,
  greet_night: greet_night$1,
  greet_noon: greet_noon$1,
  greet_subtitle: greet_subtitle$1,
  growth_bento_1_desc: growth_bento_1_desc$1,
  growth_bento_1_title: growth_bento_1_title$1,
  growth_bento_2_desc: growth_bento_2_desc$1,
  growth_bento_2_title: growth_bento_2_title$1,
  growth_bento_3_desc: growth_bento_3_desc$1,
  growth_bento_3_title: growth_bento_3_title$1,
  growth_bento_4_desc: growth_bento_4_desc$1,
  growth_bento_4_title: growth_bento_4_title$1,
  growth_bento_5_desc: growth_bento_5_desc$1,
  growth_bento_5_title: growth_bento_5_title$1,
  growth_bento_desc: growth_bento_desc$1,
  growth_bento_title: growth_bento_title$1,
  growth_cta_btn: growth_cta_btn$1,
  growth_cta_desc: growth_cta_desc$1,
  growth_cta_note: growth_cta_note$1,
  growth_cta_title: growth_cta_title$1,
  growth_feat_1_desc: growth_feat_1_desc$1,
  growth_feat_1_point_1: growth_feat_1_point_1$1,
  growth_feat_1_point_2: growth_feat_1_point_2$1,
  growth_feat_1_title: growth_feat_1_title$1,
  growth_feat_2_desc: growth_feat_2_desc$1,
  growth_feat_2_quote_body: growth_feat_2_quote_body$1,
  growth_feat_2_quote_title: growth_feat_2_quote_title$1,
  growth_feat_2_title: growth_feat_2_title$1,
  growth_hero_badge: growth_hero_badge$1,
  growth_hero_cta_1: growth_hero_cta_1$1,
  growth_hero_desc: growth_hero_desc$1,
  growth_hero_social_proof: growth_hero_social_proof$1,
  growth_hero_title_1: growth_hero_title_1$1,
  growth_hero_title_2: growth_hero_title_2$1,
  growth_meta_desc: growth_meta_desc$1,
  growth_meta_og_desc: growth_meta_og_desc$1,
  growth_meta_og_title: growth_meta_og_title$1,
  growth_meta_title: growth_meta_title$1,
  growth_prob_desc_dark: growth_prob_desc_dark$1,
  growth_prob_desc_light: growth_prob_desc_light$1,
  growth_prob_point_1: growth_prob_point_1$1,
  growth_prob_point_2: growth_prob_point_2$1,
  growth_prob_point_3: growth_prob_point_3$1,
  growth_prob_point_4: growth_prob_point_4$1,
  growth_prob_title_dark: growth_prob_title_dark$1,
  growth_prob_title_light: growth_prob_title_light$1,
  guide_art_1_desc: guide_art_1_desc$1,
  guide_art_1_title: guide_art_1_title$1,
  guide_art_2_desc: guide_art_2_desc$1,
  guide_art_2_title: guide_art_2_title$1,
  guide_art_3_desc: guide_art_3_desc$1,
  guide_art_3_title: guide_art_3_title$1,
  guide_articles_desc: guide_articles_desc$1,
  guide_articles_title: guide_articles_title$1,
  guide_btn_all: guide_btn_all$1,
  guide_btn_community: guide_btn_community$1,
  guide_btn_contact: guide_btn_contact$1,
  guide_btn_learn: guide_btn_learn$1,
  guide_btn_read: guide_btn_read$1,
  guide_hero_badge: guide_hero_badge$1,
  guide_hero_desc: guide_hero_desc$1,
  guide_hero_title_1: guide_hero_title_1$1,
  guide_hero_title_2: guide_hero_title_2$1,
  guide_meta_desc: guide_meta_desc$1,
  guide_meta_og_desc: guide_meta_og_desc$1,
  guide_meta_og_title: guide_meta_og_title$1,
  guide_meta_title: guide_meta_title$1,
  guide_mod_1_desc: guide_mod_1_desc$1,
  guide_mod_1_title: guide_mod_1_title$1,
  guide_mod_2_desc: guide_mod_2_desc$1,
  guide_mod_2_title: guide_mod_2_title$1,
  guide_mod_3_desc: guide_mod_3_desc$1,
  guide_mod_3_title: guide_mod_3_title$1,
  guide_mod_4_desc: guide_mod_4_desc$1,
  guide_mod_4_title: guide_mod_4_title$1,
  guide_modules_badge: guide_modules_badge$1,
  guide_modules_title: guide_modules_title$1,
  guide_popular_search: guide_popular_search$1,
  guide_read_time: guide_read_time$1,
  guide_search_btn: guide_search_btn$1,
  guide_search_placeholder: guide_search_placeholder$1,
  guide_start_desc: guide_start_desc$1,
  guide_start_step_1_desc: guide_start_step_1_desc$1,
  guide_start_step_1_title: guide_start_step_1_title$1,
  guide_start_step_2_desc: guide_start_step_2_desc$1,
  guide_start_step_2_title: guide_start_step_2_title$1,
  guide_start_step_3_desc: guide_start_step_3_desc$1,
  guide_start_step_3_title: guide_start_step_3_title$1,
  guide_start_title: guide_start_title$1,
  guide_support_desc: guide_support_desc$1,
  guide_support_title: guide_support_title$1,
  guide_tag_1: guide_tag_1$1,
  guide_tag_2: guide_tag_2$1,
  guide_tag_3: guide_tag_3$1,
  habit_bento_1_desc: habit_bento_1_desc$1,
  habit_bento_1_title: habit_bento_1_title$1,
  habit_bento_2_desc: habit_bento_2_desc$1,
  habit_bento_2_title: habit_bento_2_title$1,
  habit_bento_3_desc: habit_bento_3_desc$1,
  habit_bento_3_title: habit_bento_3_title$1,
  habit_bento_4_desc: habit_bento_4_desc$1,
  habit_bento_4_title: habit_bento_4_title$1,
  habit_bento_desc: habit_bento_desc$1,
  habit_bento_title: habit_bento_title$1,
  habit_btn_add: habit_btn_add$1,
  habit_btn_cancel: habit_btn_cancel$1,
  habit_btn_copy_confirm: habit_btn_copy_confirm$1,
  habit_btn_delete_confirm: habit_btn_delete_confirm$1,
  habit_btn_new: habit_btn_new$1,
  habit_btn_save: habit_btn_save$1,
  habit_completed: habit_completed$1,
  habit_copy_desc: habit_copy_desc$1,
  habit_copy_title: habit_copy_title$1,
  habit_create_desc: habit_create_desc$1,
  habit_create_title: habit_create_title$1,
  habit_cta_btn: habit_cta_btn$1,
  habit_cta_desc: habit_cta_desc$1,
  habit_cta_note: habit_cta_note$1,
  habit_cta_title: habit_cta_title$1,
  habit_delete_confirm: habit_delete_confirm$1,
  habit_delete_desc: habit_delete_desc$1,
  habit_delete_title: habit_delete_title$1,
  habit_empty: habit_empty$1,
  habit_empty_desc: habit_empty_desc$1,
  habit_empty_title: habit_empty_title$1,
  habit_feature_1_desc: habit_feature_1_desc$1,
  habit_feature_1_point_1: habit_feature_1_point_1$1,
  habit_feature_1_point_2: habit_feature_1_point_2$1,
  habit_feature_1_title: habit_feature_1_title$1,
  habit_feature_2_desc: habit_feature_2_desc$1,
  habit_feature_2_point_1: habit_feature_2_point_1$1,
  habit_feature_2_point_2: habit_feature_2_point_2$1,
  habit_feature_2_title: habit_feature_2_title$1,
  habit_hero_badge: habit_hero_badge$1,
  habit_hero_cta_1: habit_hero_cta_1$1,
  habit_hero_cta_2: habit_hero_cta_2$1,
  habit_hero_desc: habit_hero_desc$1,
  habit_hero_title_1: habit_hero_title_1$1,
  habit_hero_title_2: habit_hero_title_2$1,
  habit_label_color: habit_label_color$1,
  habit_label_icon: habit_label_icon$1,
  habit_label_name: habit_label_name$1,
  habit_label_target: habit_label_target$1,
  habit_meta_desc: habit_meta_desc$1,
  habit_meta_og_desc: habit_meta_og_desc$1,
  habit_meta_og_title: habit_meta_og_title$1,
  habit_meta_title: habit_meta_title$1,
  habit_mockup_alert_1: habit_mockup_alert_1$1,
  habit_mockup_alert_2: habit_mockup_alert_2$1,
  habit_mockup_streak: habit_mockup_streak$1,
  habit_mockup_task_1: habit_mockup_task_1$1,
  habit_mockup_task_2: habit_mockup_task_2$1,
  habit_mockup_task_3: habit_mockup_task_3$1,
  habit_mockup_time_1: habit_mockup_time_1$1,
  habit_mockup_time_2: habit_mockup_time_2$1,
  habit_mockup_time_3: habit_mockup_time_3$1,
  habit_mockup_title: habit_mockup_title$1,
  habit_modal_btn_save: habit_modal_btn_save$1,
  habit_modal_color: habit_modal_color$1,
  habit_modal_icon: habit_modal_icon$1,
  habit_modal_question: habit_modal_question$1,
  habit_modal_target: habit_modal_target$1,
  habit_modal_title: habit_modal_title$1,
  habit_name: habit_name$1,
  habit_page_title: habit_page_title$1,
  habit_prob_1_desc: habit_prob_1_desc$1,
  habit_prob_1_title: habit_prob_1_title$1,
  habit_prob_2_desc: habit_prob_2_desc$1,
  habit_prob_2_title: habit_prob_2_title$1,
  habit_prob_3_desc: habit_prob_3_desc$1,
  habit_prob_3_title: habit_prob_3_title$1,
  habit_prob_title_1: habit_prob_title_1$1,
  habit_prob_title_2: habit_prob_title_2$1,
  habit_prob_title_strike: habit_prob_title_strike$1,
  habit_progress: habit_progress$1,
  habit_quote_author: habit_quote_author$1,
  habit_quote_text: habit_quote_text$1,
  habit_salin_btn: habit_salin_btn$1,
  habit_sessions: habit_sessions$1,
  habit_subtitle: habit_subtitle$1,
  habit_table_progress: habit_table_progress$1,
  habit_table_target: habit_table_target$1,
  habit_table_total: habit_table_total$1,
  habit_target: habit_target$1,
  habit_today: habit_today$1,
  habitap_badge: habitap_badge$1,
  habitap_compare_desc: habitap_compare_desc$1,
  habitap_compare_title: habitap_compare_title$1,
  habitap_cta_btn: habitap_cta_btn$1,
  habitap_cta_desc: habitap_cta_desc$1,
  habitap_cta_sub: habitap_cta_sub$1,
  habitap_cta_title: habitap_cta_title$1,
  habitap_cycle_1_desc: habitap_cycle_1_desc$1,
  habitap_cycle_1_title: habitap_cycle_1_title$1,
  habitap_cycle_2_desc: habitap_cycle_2_desc$1,
  habitap_cycle_2_title: habitap_cycle_2_title$1,
  habitap_cycle_3_desc: habitap_cycle_3_desc$1,
  habitap_cycle_3_title: habitap_cycle_3_title$1,
  habitap_cycle_desc: habitap_cycle_desc$1,
  habitap_cycle_title: habitap_cycle_title$1,
  habitap_hero_cta: habitap_hero_cta$1,
  habitap_hero_desc: habitap_hero_desc$1,
  habitap_hero_note: habitap_hero_note$1,
  habitap_hero_title_1: habitap_hero_title_1$1,
  habitap_hero_title_2: habitap_hero_title_2$1,
  habitap_meta_desc: habitap_meta_desc$1,
  habitap_meta_og_desc: habitap_meta_og_desc$1,
  habitap_meta_og_title: habitap_meta_og_title$1,
  habitap_meta_title: habitap_meta_title$1,
  habitap_mockup_desc: habitap_mockup_desc$1,
  habitap_mockup_stat_1: habitap_mockup_stat_1$1,
  habitap_mockup_stat_2: habitap_mockup_stat_2$1,
  habitap_mockup_status: habitap_mockup_status$1,
  habitap_mockup_title: habitap_mockup_title$1,
  habitap_prob_desc: habitap_prob_desc$1,
  habitap_prob_point_1: habitap_prob_point_1$1,
  habitap_prob_point_2: habitap_prob_point_2$1,
  habitap_prob_point_3: habitap_prob_point_3$1,
  habitap_prob_title_1: habitap_prob_title_1$1,
  habitap_prob_title_highlight: habitap_prob_title_highlight$1,
  habitap_sol_1_desc: habitap_sol_1_desc$1,
  habitap_sol_1_title: habitap_sol_1_title$1,
  habitap_sol_2_desc: habitap_sol_2_desc$1,
  habitap_sol_2_title: habitap_sol_2_title$1,
  habitap_sol_3_desc: habitap_sol_3_desc$1,
  habitap_sol_3_title: habitap_sol_3_title$1,
  habitap_sol_desc: habitap_sol_desc$1,
  habitap_sol_title_1: habitap_sol_title_1$1,
  habitap_sol_title_highlight: habitap_sol_title_highlight$1,
  habitap_table_head_2: habitap_table_head_2$1,
  habitap_table_row_1_col_1: habitap_table_row_1_col_1$1,
  habitap_table_row_1_col_2: habitap_table_row_1_col_2$1,
  habitap_table_row_1_title: habitap_table_row_1_title$1,
  habitap_table_row_2_col_1: habitap_table_row_2_col_1$1,
  habitap_table_row_2_col_2: habitap_table_row_2_col_2$1,
  habitap_table_row_2_title: habitap_table_row_2_title$1,
  habitap_table_row_3_col_1: habitap_table_row_3_col_1$1,
  habitap_table_row_3_col_2: habitap_table_row_3_col_2$1,
  habitap_table_row_3_title: habitap_table_row_3_title$1,
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
  journal_add: journal_add$1,
  journal_add_photo: journal_add_photo$1,
  journal_bento_1_desc: journal_bento_1_desc$1,
  journal_bento_1_title: journal_bento_1_title$1,
  journal_bento_2_desc: journal_bento_2_desc$1,
  journal_bento_2_title: journal_bento_2_title$1,
  journal_bento_3_desc: journal_bento_3_desc$1,
  journal_bento_3_title: journal_bento_3_title$1,
  journal_bento_desc: journal_bento_desc$1,
  journal_bento_title: journal_bento_title$1,
  journal_confirm_delete: journal_confirm_delete$1,
  journal_cta_btn: journal_cta_btn$1,
  journal_cta_desc: journal_cta_desc$1,
  journal_cta_note: journal_cta_note$1,
  journal_cta_title: journal_cta_title$1,
  journal_delete_warn: journal_delete_warn$1,
  journal_empty_subtitle: journal_empty_subtitle$1,
  journal_empty_title: journal_empty_title$1,
  journal_expense: journal_expense$1,
  journal_feature_1_desc: journal_feature_1_desc$1,
  journal_feature_1_point_1: journal_feature_1_point_1$1,
  journal_feature_1_point_2: journal_feature_1_point_2$1,
  journal_feature_1_title: journal_feature_1_title$1,
  journal_feature_2_desc: journal_feature_2_desc$1,
  journal_feature_2_point_1: journal_feature_2_point_1$1,
  journal_feature_2_point_2: journal_feature_2_point_2$1,
  journal_feature_2_title: journal_feature_2_title$1,
  journal_filled: journal_filled$1,
  journal_habit: journal_habit$1,
  journal_habit_done: journal_habit_done$1,
  journal_hero_badge: journal_hero_badge$1,
  journal_hero_cta_1: journal_hero_cta_1$1,
  journal_hero_cta_2: journal_hero_cta_2$1,
  journal_hero_desc: journal_hero_desc$1,
  journal_hero_title_1: journal_hero_title_1$1,
  journal_hero_title_2: journal_hero_title_2$1,
  journal_history: journal_history$1,
  journal_meta_desc: journal_meta_desc$1,
  journal_meta_og_desc: journal_meta_og_desc$1,
  journal_meta_og_title: journal_meta_og_title$1,
  journal_meta_title: journal_meta_title$1,
  journal_mockup_date: journal_mockup_date$1,
  journal_mockup_text_1: journal_mockup_text_1$1,
  journal_mockup_text_2: journal_mockup_text_2$1,
  journal_mockup_title: journal_mockup_title$1,
  journal_mockup_typing: journal_mockup_typing$1,
  journal_mood_label: journal_mood_label$1,
  journal_no_content: journal_no_content$1,
  journal_prob_1_desc: journal_prob_1_desc$1,
  journal_prob_1_title: journal_prob_1_title$1,
  journal_prob_2_desc: journal_prob_2_desc$1,
  journal_prob_2_title: journal_prob_2_title$1,
  journal_prob_3_desc: journal_prob_3_desc$1,
  journal_prob_3_title: journal_prob_3_title$1,
  journal_prob_main_desc: journal_prob_main_desc$1,
  journal_prob_title_1: journal_prob_title_1$1,
  journal_prob_title_2: journal_prob_title_2$1,
  journal_prob_title_strike: journal_prob_title_strike$1,
  journal_quote_author: journal_quote_author$1,
  journal_quote_text: journal_quote_text$1,
  journal_subtitle: journal_subtitle$1,
  journal_tasks: journal_tasks$1,
  journal_title: journal_title$1,
  journal_title_placeholder: journal_title_placeholder$1,
  journal_untitled: journal_untitled$1,
  journal_write_placeholder: journal_write_placeholder$1,
  label_activity: label_activity$1,
  label_break: label_break$1,
  label_checkins: label_checkins$1,
  label_chill: label_chill$1,
  label_color: label_color$1,
  label_consistency: label_consistency$1,
  label_daily: label_daily$1,
  label_description: label_description$1,
  label_end_date: label_end_date$1,
  label_end_time: label_end_time$1,
  label_mood_status: label_mood_status$1,
  label_mvp_habit: label_mvp_habit$1,
  label_notes: label_notes$1,
  label_now: label_now$1,
  label_period: label_period$1,
  label_priority: label_priority$1,
  label_routine: label_routine$1,
  label_start: label_start$1,
  label_start_date: label_start_date$1,
  label_start_time: label_start_time$1,
  label_title: label_title$1,
  label_todo: label_todo$1,
  label_urgent: label_urgent$1,
  label_work: label_work$1,
  last_5: last_5$1,
  legal_close: legal_close$1,
  legal_ref: legal_ref$1,
  legal_title: legal_title$1,
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
  modal_logout_cancel: modal_logout_cancel$1,
  modal_logout_confirm: modal_logout_confirm$1,
  modal_logout_subtitle: modal_logout_subtitle$1,
  modal_logout_title: modal_logout_title$1,
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
  nav_features: nav_features$1,
  nav_home: nav_home$2,
  nav_login: nav_login$2,
  nav_logout: nav_logout$1,
  nav_pricing: nav_pricing$1,
  nav_register: nav_register$2,
  nav_resources: nav_resources$1,
  nav_settings: nav_settings$1,
  nav_solutions: nav_solutions$1,
  new_budget: new_budget$1,
  no_budget: no_budget$1,
  no_fund_source: no_fund_source$1,
  no_transaction: no_transaction$1,
  notes_badge: notes_badge$1,
  notes_chaos_badge: notes_chaos_badge$1,
  notes_chaos_date: notes_chaos_date$1,
  notes_chaos_item_1: notes_chaos_item_1$1,
  notes_chaos_item_2: notes_chaos_item_2$1,
  notes_chaos_item_3: notes_chaos_item_3$1,
  notes_chaos_item_4: notes_chaos_item_4$1,
  notes_chaos_item_5: notes_chaos_item_5$1,
  notes_chaos_title: notes_chaos_title$1,
  notes_compare_desc: notes_compare_desc$1,
  notes_compare_title: notes_compare_title$1,
  notes_cta_btn: notes_cta_btn$1,
  notes_cta_desc: notes_cta_desc$1,
  notes_cta_sub: notes_cta_sub$1,
  notes_cta_title: notes_cta_title$1,
  notes_cycle_1_desc: notes_cycle_1_desc$1,
  notes_cycle_1_title: notes_cycle_1_title$1,
  notes_cycle_2_desc: notes_cycle_2_desc$1,
  notes_cycle_2_title: notes_cycle_2_title$1,
  notes_cycle_3_desc: notes_cycle_3_desc$1,
  notes_cycle_3_title: notes_cycle_3_title$1,
  notes_cycle_desc: notes_cycle_desc$1,
  notes_cycle_title: notes_cycle_title$1,
  notes_hero_cta: notes_hero_cta$1,
  notes_hero_desc: notes_hero_desc$1,
  notes_hero_note: notes_hero_note$1,
  notes_hero_title_1: notes_hero_title_1$1,
  notes_hero_title_2: notes_hero_title_2$1,
  notes_hub_connected: notes_hub_connected$1,
  notes_hub_finance: notes_hub_finance$1,
  notes_hub_goals: notes_hub_goals$1,
  notes_hub_habits: notes_hub_habits$1,
  notes_hub_tracking: notes_hub_tracking$1,
  notes_meta_desc: notes_meta_desc$1,
  notes_meta_og_desc: notes_meta_og_desc$1,
  notes_meta_og_title: notes_meta_og_title$1,
  notes_meta_title: notes_meta_title$1,
  notes_mockup_deadline: notes_mockup_deadline$1,
  notes_mockup_status: notes_mockup_status$1,
  notes_mockup_task_1: notes_mockup_task_1$1,
  notes_mockup_task_2: notes_mockup_task_2$1,
  notes_mockup_task_3: notes_mockup_task_3$1,
  notes_mockup_title: notes_mockup_title$1,
  notes_prob_desc: notes_prob_desc$1,
  notes_prob_point_1: notes_prob_point_1$1,
  notes_prob_point_2: notes_prob_point_2$1,
  notes_prob_point_3: notes_prob_point_3$1,
  notes_prob_title_1: notes_prob_title_1$1,
  notes_prob_title_highlight: notes_prob_title_highlight$1,
  notes_sol_box_desc: notes_sol_box_desc$1,
  notes_sol_box_title: notes_sol_box_title$1,
  notes_sol_desc: notes_sol_desc$1,
  notes_sol_title_1: notes_sol_title_1$1,
  notes_sol_title_highlight: notes_sol_title_highlight$1,
  notes_table_head_1: notes_table_head_1$1,
  notes_table_head_2: notes_table_head_2$1,
  notes_table_row_1_col_1: notes_table_row_1_col_1$1,
  notes_table_row_1_col_2: notes_table_row_1_col_2$1,
  notes_table_row_1_title: notes_table_row_1_title$1,
  notes_table_row_2_col_1: notes_table_row_2_col_1$1,
  notes_table_row_2_col_2: notes_table_row_2_col_2$1,
  notes_table_row_2_title: notes_table_row_2_title$1,
  notes_table_row_3_col_1: notes_table_row_3_col_1$1,
  notes_table_row_3_col_2: notes_table_row_3_col_2$1,
  notes_table_row_3_title: notes_table_row_3_title$1,
  notes_table_row_4_col_1: notes_table_row_4_col_1$1,
  notes_table_row_4_col_2: notes_table_row_4_col_2$1,
  notes_table_row_4_title: notes_table_row_4_title$1,
  old_data_hint: old_data_hint$1,
  ph_event_desc: ph_event_desc$1,
  ph_event_title: ph_event_title$1,
  placeholder_activity: placeholder_activity$1,
  placeholder_breakfast: placeholder_breakfast$1,
  placeholder_dinner: placeholder_dinner$1,
  placeholder_lunch: placeholder_lunch$1,
  placeholder_name: placeholder_name$1,
  placeholder_notes: placeholder_notes$1,
  planner_bento_1_desc: planner_bento_1_desc$1,
  planner_bento_1_title: planner_bento_1_title$1,
  planner_bento_2_desc: planner_bento_2_desc$1,
  planner_bento_2_title: planner_bento_2_title$1,
  planner_bento_3_desc: planner_bento_3_desc$1,
  planner_bento_3_title: planner_bento_3_title$1,
  planner_bento_4_desc: planner_bento_4_desc$1,
  planner_bento_4_title: planner_bento_4_title$1,
  planner_bento_desc: planner_bento_desc$1,
  planner_bento_title: planner_bento_title$1,
  planner_click_hint: planner_click_hint$1,
  planner_cta_btn: planner_cta_btn$1,
  planner_cta_desc: planner_cta_desc$1,
  planner_cta_note: planner_cta_note$1,
  planner_cta_title: planner_cta_title$1,
  planner_feature_1_desc: planner_feature_1_desc$1,
  planner_feature_1_point_1: planner_feature_1_point_1$1,
  planner_feature_1_point_2: planner_feature_1_point_2$1,
  planner_feature_1_title: planner_feature_1_title$1,
  planner_feature_2_desc: planner_feature_2_desc$1,
  planner_feature_2_point_1: planner_feature_2_point_1$1,
  planner_feature_2_point_2: planner_feature_2_point_2$1,
  planner_feature_2_title: planner_feature_2_title$1,
  planner_hero_badge: planner_hero_badge$1,
  planner_hero_cta_1: planner_hero_cta_1$1,
  planner_hero_cta_2: planner_hero_cta_2$1,
  planner_hero_desc: planner_hero_desc$1,
  planner_hero_title_1: planner_hero_title_1$1,
  planner_hero_title_2: planner_hero_title_2$1,
  planner_mechanism_1_desc: planner_mechanism_1_desc$1,
  planner_mechanism_1_title: planner_mechanism_1_title$1,
  planner_meta_desc: planner_meta_desc$1,
  planner_meta_og_desc: planner_meta_og_desc$1,
  planner_meta_og_title: planner_meta_og_title$1,
  planner_meta_title: planner_meta_title$1,
  planner_mockup_alert_1: planner_mockup_alert_1$1,
  planner_mockup_alert_2: planner_mockup_alert_2$1,
  planner_mockup_status: planner_mockup_status$1,
  planner_mockup_task_1: planner_mockup_task_1$1,
  planner_mockup_task_2: planner_mockup_task_2$1,
  planner_mockup_task_3: planner_mockup_task_3$1,
  planner_mockup_time_1: planner_mockup_time_1$1,
  planner_mockup_time_2: planner_mockup_time_2$1,
  planner_mockup_time_3: planner_mockup_time_3$1,
  planner_mockup_title: planner_mockup_title$1,
  planner_prob_1_desc: planner_prob_1_desc$1,
  planner_prob_1_title: planner_prob_1_title$1,
  planner_prob_2_desc: planner_prob_2_desc$1,
  planner_prob_2_title: planner_prob_2_title$1,
  planner_prob_3_desc: planner_prob_3_desc$1,
  planner_prob_3_title: planner_prob_3_title$1,
  planner_prob_title_1: planner_prob_title_1$1,
  planner_prob_title_2: planner_prob_title_2$1,
  planner_prob_title_strike: planner_prob_title_strike$1,
  planner_quote_author: planner_quote_author$1,
  planner_quote_text: planner_quote_text$1,
  planner_time_fmt: planner_time_fmt$1,
  planner_title: planner_title$1,
  pm_badge: pm_badge$1,
  pm_compare_desc: pm_compare_desc$1,
  pm_compare_title: pm_compare_title$1,
  pm_cta_btn: pm_cta_btn$1,
  pm_cta_desc: pm_cta_desc$1,
  pm_cta_sub: pm_cta_sub$1,
  pm_cta_title: pm_cta_title$1,
  pm_cycle_1_desc: pm_cycle_1_desc$1,
  pm_cycle_1_title: pm_cycle_1_title$1,
  pm_cycle_2_desc: pm_cycle_2_desc$1,
  pm_cycle_2_title: pm_cycle_2_title$1,
  pm_cycle_3_desc: pm_cycle_3_desc$1,
  pm_cycle_3_title: pm_cycle_3_title$1,
  pm_cycle_desc: pm_cycle_desc$1,
  pm_cycle_title: pm_cycle_title$1,
  pm_hero_cta: pm_hero_cta$1,
  pm_hero_desc: pm_hero_desc$1,
  pm_hero_note: pm_hero_note$1,
  pm_hero_title_1: pm_hero_title_1$1,
  pm_hero_title_2: pm_hero_title_2$1,
  pm_hub_growth: pm_hub_growth$1,
  pm_hub_private: pm_hub_private$1,
  pm_hub_vision: pm_hub_vision$1,
  pm_hub_you: pm_hub_you$1,
  pm_hub_yours: pm_hub_yours$1,
  pm_meta_desc: pm_meta_desc$1,
  pm_meta_og_desc: pm_meta_og_desc$1,
  pm_meta_og_title: pm_meta_og_title$1,
  pm_meta_title: pm_meta_title$1,
  pm_mockup_desc: pm_mockup_desc$1,
  pm_mockup_item_1: pm_mockup_item_1$1,
  pm_mockup_item_2: pm_mockup_item_2$1,
  pm_mockup_item_3: pm_mockup_item_3$1,
  pm_mockup_status: pm_mockup_status$1,
  pm_mockup_title: pm_mockup_title$1,
  pm_prob_desc: pm_prob_desc$1,
  pm_prob_point_1: pm_prob_point_1$1,
  pm_prob_point_2: pm_prob_point_2$1,
  pm_prob_point_3: pm_prob_point_3$1,
  pm_prob_title_1: pm_prob_title_1$1,
  pm_prob_title_highlight: pm_prob_title_highlight$1,
  pm_sol_box_desc: pm_sol_box_desc$1,
  pm_sol_box_title: pm_sol_box_title$1,
  pm_sol_desc: pm_sol_desc$1,
  pm_sol_title_1: pm_sol_title_1$1,
  pm_sol_title_highlight: pm_sol_title_highlight$1,
  pm_table_head_1: pm_table_head_1$1,
  pm_table_head_2: pm_table_head_2$1,
  pm_table_row_1_col_1: pm_table_row_1_col_1$1,
  pm_table_row_1_col_2: pm_table_row_1_col_2$1,
  pm_table_row_1_title: pm_table_row_1_title$1,
  pm_table_row_2_col_1: pm_table_row_2_col_1$1,
  pm_table_row_2_col_2: pm_table_row_2_col_2$1,
  pm_table_row_2_title: pm_table_row_2_title$1,
  pm_table_row_3_col_1: pm_table_row_3_col_1$1,
  pm_table_row_3_col_2: pm_table_row_3_col_2$1,
  pm_table_row_3_title: pm_table_row_3_title$1,
  pm_table_row_4_col_1: pm_table_row_4_col_1$1,
  pm_table_row_4_col_2: pm_table_row_4_col_2$1,
  pm_table_row_4_title: pm_table_row_4_title$1,
  pricing_badge: pricing_badge$1,
  pricing_billed_annually: pricing_billed_annually$1,
  pricing_bottom_cta_btn: pricing_bottom_cta_btn$1,
  pricing_bottom_cta_desc: pricing_bottom_cta_desc$1,
  pricing_bottom_cta_title: pricing_bottom_cta_title$1,
  pricing_compare_subtitle: pricing_compare_subtitle$1,
  pricing_compare_title: pricing_compare_title$1,
  pricing_faq_1_a: pricing_faq_1_a$1,
  pricing_faq_1_q: pricing_faq_1_q$1,
  pricing_faq_2_a: pricing_faq_2_a$1,
  pricing_faq_2_q: pricing_faq_2_q$1,
  pricing_faq_title: pricing_faq_title$1,
  pricing_feat_ai_insights: pricing_feat_ai_insights$1,
  pricing_feat_custom_themes: pricing_feat_custom_themes$1,
  pricing_feat_finance_basic: pricing_feat_finance_basic$1,
  pricing_feat_habits_limit: pricing_feat_habits_limit$1,
  pricing_feat_label: pricing_feat_label$1,
  pricing_feat_lifetime_access: pricing_feat_lifetime_access$1,
  pricing_feat_priority_support: pricing_feat_priority_support$1,
  pricing_feat_unlimited_habits: pricing_feat_unlimited_habits$1,
  pricing_forever: pricing_forever$1,
  pricing_free_btn: pricing_free_btn$1,
  pricing_free_desc: pricing_free_desc$1,
  pricing_free_name: pricing_free_name$1,
  pricing_life_btn: pricing_life_btn$1,
  pricing_life_desc: pricing_life_desc$1,
  pricing_life_name: pricing_life_name$1,
  pricing_meta_desc: pricing_meta_desc$1,
  pricing_meta_og_title: pricing_meta_og_title$1,
  pricing_meta_title: pricing_meta_title$1,
  pricing_month: pricing_month$1,
  pricing_monthly: pricing_monthly$1,
  pricing_once: pricing_once$1,
  pricing_pro_badge: pricing_pro_badge$1,
  pricing_pro_btn: pricing_pro_btn$1,
  pricing_pro_desc: pricing_pro_desc$1,
  pricing_pro_name: pricing_pro_name$1,
  pricing_save_amount: pricing_save_amount$1,
  pricing_subtitle: pricing_subtitle$1,
  pricing_title_1: pricing_title_1$1,
  pricing_title_2: pricing_title_2$1,
  pricing_trust_1_desc: pricing_trust_1_desc$1,
  pricing_trust_1_title: pricing_trust_1_title$1,
  pricing_trust_2_desc: pricing_trust_2_desc$1,
  pricing_trust_2_title: pricing_trust_2_title$1,
  pricing_trust_3_desc: pricing_trust_3_desc$1,
  pricing_trust_3_title: pricing_trust_3_title$1,
  pricing_yearly: pricing_yearly$1,
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
  privacy_badge: privacy_badge$1,
  privacy_consent_p: privacy_consent_p$1,
  privacy_consent_title: privacy_consent_title$1,
  privacy_contact_email: privacy_contact_email$1,
  privacy_contact_role: privacy_contact_role$1,
  privacy_contact_sla: privacy_contact_sla$1,
  privacy_cta_btn: privacy_cta_btn$1,
  privacy_cta_desc: privacy_cta_desc$1,
  privacy_cta_title: privacy_cta_title$1,
  privacy_doc_intro: privacy_doc_intro$1,
  privacy_download_pdf: privacy_download_pdf$1,
  privacy_export_code_comment: privacy_export_code_comment$1,
  privacy_export_desc: privacy_export_desc$1,
  privacy_export_point_1: privacy_export_point_1$1,
  privacy_export_point_2: privacy_export_point_2$1,
  privacy_export_title: privacy_export_title$1,
  privacy_faq_1_a: privacy_faq_1_a$1,
  privacy_faq_1_q: privacy_faq_1_q$1,
  privacy_faq_2_a: privacy_faq_2_a$1,
  privacy_faq_2_q: privacy_faq_2_q$1,
  privacy_faq_3_a: privacy_faq_3_a$1,
  privacy_faq_3_q: privacy_faq_3_q$1,
  privacy_faq_title: privacy_faq_title$1,
  privacy_finance_note_desc: privacy_finance_note_desc$1,
  privacy_finance_note_title: privacy_finance_note_title$1,
  privacy_h2_collection: privacy_h2_collection$1,
  privacy_h2_contact: privacy_h2_contact$1,
  privacy_h2_cookies: privacy_h2_cookies$1,
  privacy_h2_rights: privacy_h2_rights$1,
  privacy_h2_security: privacy_h2_security$1,
  privacy_h2_usage: privacy_h2_usage$1,
  privacy_info_p: privacy_info_p$1,
  privacy_info_title: privacy_info_title$1,
  privacy_last_updated: privacy_last_updated$1,
  privacy_li_collection_1_desc: privacy_li_collection_1_desc$1,
  privacy_li_collection_1_title: privacy_li_collection_1_title$1,
  privacy_li_collection_2_desc: privacy_li_collection_2_desc$1,
  privacy_li_collection_2_strong: privacy_li_collection_2_strong$1,
  privacy_li_collection_2_title: privacy_li_collection_2_title$1,
  privacy_li_collection_3_desc: privacy_li_collection_3_desc$1,
  privacy_li_collection_3_title: privacy_li_collection_3_title$1,
  privacy_li_rights_1: privacy_li_rights_1$1,
  privacy_li_rights_2: privacy_li_rights_2$1,
  privacy_li_rights_3: privacy_li_rights_3$1,
  privacy_li_usage_1: privacy_li_usage_1$1,
  privacy_li_usage_2: privacy_li_usage_2$1,
  privacy_li_usage_3: privacy_li_usage_3$1,
  privacy_meta_desc: privacy_meta_desc$1,
  privacy_meta_og_desc: privacy_meta_og_desc$1,
  privacy_meta_og_title: privacy_meta_og_title$1,
  privacy_meta_title: privacy_meta_title$1,
  privacy_p1: privacy_p1$1,
  privacy_p_collection: privacy_p_collection$1,
  privacy_p_contact: privacy_p_contact$1,
  privacy_p_cookies: privacy_p_cookies$1,
  privacy_p_rights: privacy_p_rights$1,
  privacy_p_security: privacy_p_security$1,
  privacy_p_usage: privacy_p_usage$1,
  privacy_status: privacy_status$1,
  privacy_subtitle: privacy_subtitle$1,
  privacy_title: privacy_title$1,
  privacy_title_1: privacy_title_1$1,
  privacy_title_2: privacy_title_2$1,
  privacy_tldr_1_desc: privacy_tldr_1_desc$1,
  privacy_tldr_1_title: privacy_tldr_1_title$1,
  privacy_tldr_2_desc: privacy_tldr_2_desc$1,
  privacy_tldr_2_title: privacy_tldr_2_title$1,
  privacy_tldr_3_desc: privacy_tldr_3_desc$1,
  privacy_tldr_3_title: privacy_tldr_3_title$1,
  privacy_tldr_4_desc: privacy_tldr_4_desc$1,
  privacy_tldr_4_title: privacy_tldr_4_title$1,
  privacy_tldr_title: privacy_tldr_title$1,
  privacy_toc_title: privacy_toc_title$1,
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
  seo_about_desc: seo_about_desc$1,
  seo_meta_desc_1: seo_meta_desc_1$1,
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
  status_deleted: status_deleted$1,
  status_image_deleted: status_image_deleted$1,
  status_image_saved: status_image_saved$1,
  status_saved: status_saved$1,
  status_saving: status_saving$1,
  stories_cta_btn: stories_cta_btn$1,
  stories_cta_desc: stories_cta_desc$1,
  stories_cta_note: stories_cta_note$1,
  stories_cta_title: stories_cta_title$1,
  stories_hero_badge: stories_hero_badge$1,
  stories_hero_desc: stories_hero_desc$1,
  stories_hero_title_1: stories_hero_title_1$1,
  stories_hero_title_2: stories_hero_title_2$1,
  stories_main_body: stories_main_body$1,
  stories_main_quote: stories_main_quote$1,
  stories_meta_desc: stories_meta_desc$1,
  stories_meta_og_desc: stories_meta_og_desc$1,
  stories_meta_og_title: stories_meta_og_title$1,
  stories_meta_title: stories_meta_title$1,
  stories_stat_1: stories_stat_1$1,
  stories_stat_2: stories_stat_2$1,
  stories_stat_3: stories_stat_3$1,
  stories_stat_4: stories_stat_4$1,
  stories_user_1_text: stories_user_1_text$1,
  stories_user_2_text: stories_user_2_text$1,
  stories_user_3_text: stories_user_3_text$1,
  stories_user_4_text: stories_user_4_text$1,
  stories_wall_desc: stories_wall_desc$1,
  stories_wall_title: stories_wall_title$1,
  story_1_card_1: story_1_card_1$2,
  story_1_card_2: story_1_card_2$2,
  story_1_p1: story_1_p1$2,
  story_1_p2: story_1_p2$2,
  story_1_title: story_1_title$2,
  story_2_p1: story_2_p1$2,
  story_2_p2: story_2_p2$2,
  story_2_quote: story_2_quote$2,
  story_2_title: story_2_title$2,
  student_bento_1_desc: student_bento_1_desc$1,
  student_bento_1_title: student_bento_1_title$1,
  student_bento_2_desc: student_bento_2_desc$1,
  student_bento_2_title: student_bento_2_title$1,
  student_bento_3_desc: student_bento_3_desc$1,
  student_bento_3_title: student_bento_3_title$1,
  student_bento_desc: student_bento_desc$1,
  student_bento_title: student_bento_title$1,
  student_cta_btn: student_cta_btn$1,
  student_cta_desc: student_cta_desc$1,
  student_cta_note: student_cta_note$1,
  student_cta_title: student_cta_title$1,
  student_feat_1_desc: student_feat_1_desc$1,
  student_feat_1_point_1: student_feat_1_point_1$1,
  student_feat_1_point_2: student_feat_1_point_2$1,
  student_feat_1_title: student_feat_1_title$1,
  student_feat_1_visual_badge: student_feat_1_visual_badge$1,
  student_feat_2_desc: student_feat_2_desc$1,
  student_feat_2_point_1: student_feat_2_point_1$1,
  student_feat_2_point_2: student_feat_2_point_2$1,
  student_feat_2_title: student_feat_2_title$1,
  student_hero_badge: student_hero_badge$1,
  student_hero_cta_1: student_hero_cta_1$1,
  student_hero_desc: student_hero_desc$1,
  student_hero_social_proof: student_hero_social_proof$1,
  student_hero_title_1: student_hero_title_1$1,
  student_hero_title_2: student_hero_title_2$1,
  student_meta_desc: student_meta_desc$1,
  student_meta_og_desc: student_meta_og_desc$1,
  student_meta_og_title: student_meta_og_title$1,
  student_meta_title: student_meta_title$1,
  student_prob_1_desc: student_prob_1_desc$1,
  student_prob_1_title: student_prob_1_title$1,
  student_prob_2_desc: student_prob_2_desc$1,
  student_prob_2_title: student_prob_2_title$1,
  student_prob_3_desc: student_prob_3_desc$1,
  student_prob_3_title: student_prob_3_title$1,
  student_prob_desc: student_prob_desc$1,
  student_prob_title: student_prob_title$1,
  success_budget_saved: success_budget_saved$1,
  success_deleted: success_deleted$1,
  success_saved: success_saved$1,
  success_transaction_saved: success_transaction_saved$1,
  task_notes: task_notes$1,
  team_connect: team_connect$2,
  team_title: team_title$2,
  terms_badge: terms_badge$1,
  terms_cta_btn_agree: terms_cta_btn_agree$1,
  terms_cta_btn_decline: terms_cta_btn_decline$1,
  terms_cta_desc: terms_cta_desc$1,
  terms_cta_note: terms_cta_note$1,
  terms_cta_title: terms_cta_title$1,
  terms_effective_date: terms_effective_date$1,
  terms_eligibility_1: terms_eligibility_1$1,
  terms_eligibility_2: terms_eligibility_2$1,
  terms_h2_eligibility: terms_h2_eligibility$1,
  terms_h2_liability: terms_h2_liability$1,
  terms_h2_payment: terms_h2_payment$1,
  terms_h2_rules: terms_h2_rules$1,
  terms_h2_termination: terms_h2_termination$1,
  terms_intro_sub: terms_intro_sub$1,
  terms_intro_text: terms_intro_text$1,
  terms_legal_caps: terms_legal_caps$1,
  terms_li_payment_1_desc: terms_li_payment_1_desc$1,
  terms_li_payment_1_title: terms_li_payment_1_title$1,
  terms_li_payment_2_desc: terms_li_payment_2_desc$1,
  terms_li_payment_2_title: terms_li_payment_2_title$1,
  terms_meta_desc: terms_meta_desc$1,
  terms_meta_og_desc: terms_meta_og_desc$1,
  terms_meta_og_title: terms_meta_og_title$1,
  terms_meta_title: terms_meta_title$1,
  terms_nav_title: terms_nav_title$1,
  terms_p_eligibility: terms_p_eligibility$1,
  terms_p_payment: terms_p_payment$1,
  terms_p_rules: terms_p_rules$1,
  terms_p_termination: terms_p_termination$1,
  terms_rules_do_1: terms_rules_do_1$1,
  terms_rules_do_2: terms_rules_do_2$1,
  terms_rules_do_3: terms_rules_do_3$1,
  terms_rules_do_title: terms_rules_do_title$1,
  terms_rules_dont_1: terms_rules_dont_1$1,
  terms_rules_dont_2: terms_rules_dont_2$1,
  terms_rules_dont_3: terms_rules_dont_3$1,
  terms_rules_dont_title: terms_rules_dont_title$1,
  terms_subtitle: terms_subtitle$1,
  terms_title_1: terms_title_1$1,
  terms_title_2: terms_title_2$1,
  timeline_now: timeline_now$1,
  timeline_title: timeline_title$1,
  today_is: today_is$1,
  tos_data_p: tos_data_p$1,
  tos_data_title: tos_data_title$1,
  tos_intro: tos_intro$1,
  tos_security_p: tos_security_p$1,
  tos_security_title: tos_security_title$1,
  tos_service_p: tos_service_p$1,
  tos_service_title: tos_service_title$1,
  tos_termination_p: tos_termination_p$1,
  tos_termination_title: tos_termination_title$1,
  tos_title: tos_title$1,
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
const nav_features = "Features";
const nav_solutions = "Solutions";
const nav_resources = "Resources";
const nav_pricing = "Pricing";
const modal_logout_title = "Mau pamit dulu?";
const modal_logout_subtitle = "Jangan lupa balik lagi ya, progres kamu hari ini sudah tersimpan dengan aman!";
const modal_logout_confirm = "Iya, Keluar";
const modal_logout_cancel = "Batal";
const seo_about_desc = "Temukan visi di balik OneForMind. Kami membangun ruang kerja terpadu untuk melacak kebiasaan harian, keuangan, dan tujuan Anda.";
const footer_legal = "Privasi & Ketentuan";
const legal_title = "Informasi Legal";
const legal_ref = "Referensi Privasi Resmi:";
const privacy_title = "Kebijakan Privasi Oneformind";
const privacy_p1 = "Di Oneformind, yang dapat diakses dari https://oneformind.com, salah satu prioritas utama kami adalah privasi pengunjung kami.";
const privacy_consent_title = "Persetujuan";
const privacy_consent_p = "Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui ketentuan-ketentuannya.";
const privacy_info_title = "Informasi yang kami kumpulkan";
const privacy_info_p = "Informasi pribadi yang diminta dari Anda akan dijelaskan secara transparan pada saat kami meminta Anda untuk memberikannya.";
const tos_title = "Syarat dan Ketentuan (ToS)";
const tos_intro = "Dengan mengakses dan menggunakan Oneformind, Anda menyetujui aturan berikut:";
const tos_service_title = "1. Ketersediaan Layanan";
const tos_service_p = 'Oneformind disediakan "sebagaimana adanya" dan "sebagaimana tersedia". Meskipun kami berusaha menjaga stabilitas, kami tidak menjamin layanan 100% tanpa gangguan, bebas dari kesalahan, atau sepenuhnya aman.';
const tos_data_title = "2. Akurasi Data & Tanggung Jawab";
const tos_data_p = "Anda bertanggung jawab penuh atas data finansial, habit, dan perencana yang Anda masukkan. Oneformind adalah alat produktivitas, bukan penasihat keuangan bersertifikat. Kami tidak bertanggung jawab atas kerugian finansial atau keputusan yang diambil berdasarkan data di platform ini.";
const tos_security_title = "3. Penggunaan Wajar & Keamanan";
const tos_security_p = "Pengguna dilarang keras mencoba merusak keamanan sistem, melakukan injeksi SQL, mengambil data secara paksa (scraping), atau mengganggu infrastruktur platform.";
const tos_termination_title = "4. Pemutusan Akun";
const tos_termination_p = "Kami berhak menangguhkan atau menghapus akun secara sepihak dan tanpa pemberitahuan sebelumnya jika pengguna terbukti melanggar ketentuan ini atau menyalahgunakan sumber daya sistem.";
const legal_close = "Tutup & Pahami";
const habit_meta_title = "Habit Tracker - OneForMind";
const habit_meta_desc = "Lacak kebiasaan harianmu, bangun rutinitas solid, dan jadilah versi terbaik dirimu dengan fitur Habit Tracker dari OneForMind.";
const habit_meta_og_title = "Habit Tracker - OneForMind";
const habit_meta_og_desc = "Lacak kebiasaan harianmu, bangun rutinitas solid, dan jadilah versi terbaik dirimu dengan Habit Tracker.";
const habit_hero_badge = "Habit Tracker";
const habit_hero_title_1 = "Bangun Rutinitas,";
const habit_hero_title_2 = "Bentuk Masa Depan.";
const habit_hero_desc = "Berhenti mengandalkan motivasi. Sistem kami membantu kamu melacak kebiasaan, mempertahankan *streak*, dan mencapai tujuan harian dengan mudah.";
const habit_hero_cta_1 = "Mulai Lacak Sekarang";
const habit_hero_cta_2 = "Lihat Cara Kerjanya";
const habit_mockup_title = "Rutinitas Pagi";
const habit_mockup_streak = "7 Hari Streak!";
const habit_mockup_task_1 = "Minum Air 500ml";
const habit_mockup_time_1 = "06:00 AM";
const habit_mockup_task_2 = "Meditasi 10 Menit";
const habit_mockup_time_2 = "06:15 AM";
const habit_mockup_task_3 = "Baca 10 Halaman Buku";
const habit_mockup_time_3 = "06:30 AM";
const habit_mockup_alert_1 = "Level Up!";
const habit_mockup_alert_2 = "Habit Master";
const habit_prob_title_1 = "Mencatat di kertas itu";
const habit_prob_title_strike = "kuno";
const habit_prob_title_2 = "& berantakan.";
const habit_prob_1_title = "Lupa Melacak";
const habit_prob_1_desc = "Catatan hilang, lupa centang, akhirnya kebiasaan baik berhenti di tengah jalan.";
const habit_prob_2_title = "Hilang Motivasi";
const habit_prob_2_desc = "Tidak ada sistem visual yang membuatmu semangat melihat progress harianmu.";
const habit_prob_3_title = "Tidak Terorganisir";
const habit_prob_3_desc = "Banyak aplikasi berbeda untuk habit, keuangan, dan tugas. Bikin pusing.";
const habit_feature_1_title = "Pantau Progress dengan Visual yang Jelas";
const habit_feature_1_desc = "Lihat seberapa konsisten kamu dalam seminggu, sebulan, atau setahun terakhir. Warna indikator akan semakin pekat seiring dengan konsistensi kamu menjaga kebiasaan.";
const habit_feature_1_point_1 = "Heatmap ala GitHub untuk kontribusi habit";
const habit_feature_1_point_2 = "Statistik tingkat keberhasilan mingguan";
const habit_feature_2_title = "Bangun Streak dan Jangan Putuskan Rantainya";
const habit_feature_2_desc = "Sistem Gamification kami memicu dopamin kamu setiap kali menyelesaikan habit. Jangan biarkan streak api kamu padam karena bolos satu hari!";
const habit_feature_2_point_1 = "Penghitung rentetan hari beruntun (Streaks)";
const habit_feature_2_point_2 = "Lencana penghargaan saat mencapai milestone";
const habit_bento_title = "Semua yang Kamu Butuhkan";
const habit_bento_desc = "Satu template, beragam tools di dalamnya.";
const habit_bento_1_title = "Smart Reminders";
const habit_bento_1_desc = "Atur pengingat spesifik untuk setiap kebiasaan. Kami akan mengirimkan notifikasi agar kamu tidak pernah lupa jadwal pentingmu lagi.";
const habit_bento_2_title = "Dark Mode Ready";
const habit_bento_2_desc = "Nyaman di mata, kapanpun kamu membuka OneForMind.";
const habit_bento_3_title = "Terintegrasi";
const habit_bento_3_desc = "Kebiasaan harianmu menyatu langsung dengan halaman Daily Tracker & To-Do List.";
const habit_bento_4_title = "Akses di Mana Saja";
const habit_bento_4_desc = "Desain responsif yang bekerja sempurna di Desktop, Tablet, maupun Smartphone kesayanganmu.";
const habit_quote_text = "Kamu tidak menentukan masa depanmu. Kamu menentukan kebiasaanmu, dan kebiasaanmu-lah yang menentukan masa depanmu.";
const habit_quote_author = "— F.M. Alexander";
const habit_cta_title = "Siap Membangun Versi Terbaik Dirimu?";
const habit_cta_desc = "Bergabunglah sekarang dan rasakan perbedaan memiliki ruang kerja terpadu untuk semua kebiasaan, tujuan, dan tugasmu di OneForMind.";
const habit_cta_btn = "Coba OneForMind Gratis";
const habit_cta_note = "Tidak perlu kartu kredit. Setup kurang dari 2 menit.";
const finance_meta_title = "Finance Manager - OneForMind";
const finance_meta_desc = "Catat pengeluaran, atur budget, dan pantau keuanganmu dengan mudah dalam satu aplikasi.";
const finance_meta_og_title = "Finance Manager - OneForMind";
const finance_meta_og_desc = "Catat pengeluaran, atur budget, dan pantau keuanganmu dengan mudah.";
const finance_hero_badge = "Finance Manager";
const finance_hero_title_1 = "Kendalikan Uangmu,";
const finance_hero_title_2 = "Bukan Sebaliknya.";
const finance_hero_desc = "Catat setiap transaksi, pantau anggaran bulanan, dan capai tujuan finansialmu tanpa perlu pusing melihat tabel Excel yang rumit.";
const finance_hero_cta_1 = "Mulai Atur Keuangan";
const finance_hero_cta_2 = "Lihat Fiturnya";
const finance_mockup_title = "Dompet Utama";
const finance_mockup_balance = "Sehat";
const finance_mockup_task_1 = "Gaji Bulanan";
const finance_mockup_time_1 = "25 Feb • Transfer Masuk";
const finance_mockup_task_2 = "Kopi Susu Gula Aren";
const finance_mockup_time_2 = "Hari ini • Makanan & Minuman";
const finance_mockup_task_3 = "Langganan Internet";
const finance_mockup_time_3 = "Kemarin • Tagihan";
const finance_mockup_alert_1 = "Target Tercapai!";
const finance_mockup_alert_2 = "Dana Darurat Penuh";
const finance_prob_title_1 = "Mencatat manual itu";
const finance_prob_title_strike = "ribet";
const finance_prob_title_2 = "& sering bocor.";
const finance_prob_1_title = "Uang Numpang Lewat";
const finance_prob_1_desc = "Gaji masuk terasa cepat habis, tapi kamu bingung uangnya pergi ke mana saja.";
const finance_prob_2_title = "Boncos di Akhir Bulan";
const finance_prob_2_desc = "Sering kehabisan budget sebelum gajian berikutnya karena tidak ada batasan pengeluaran.";
const finance_prob_3_title = "Aplikasi Terlalu Rumit";
const finance_prob_3_desc = "Kamu butuh pencatat simpel, bukan aplikasi akuntansi perusahaan yang bikin pusing.";
const finance_feature_1_title = "Visualisasi Pengeluaran yang Jelas";
const finance_feature_1_desc = "Ketahui persis ke mana uangmu pergi. Kami mengubah rentetan angka membosankan menjadi grafik dan persentase yang mudah dipahami dalam hitungan detik.";
const finance_feature_1_point_1 = "Kategorisasi otomatis & custom";
const finance_feature_1_point_2 = "Ringkasan bulanan dengan grafik pie/bar";
const finance_feature_2_title = "Atur Budget & Nabung Lebih Cepat";
const finance_feature_2_desc = "Tetapkan batas pengeluaran untuk setiap kategori. Kami akan memberitahu jika kamu hampir melewati batas, sehingga kamu bisa menabung lebih banyak.";
const finance_feature_2_point_1 = "Limit pengeluaran per kategori";
const finance_feature_2_point_2 = "Progress bar untuk target tabungan/impian";
const finance_bento_title = "Fitur Finansial Cerdas";
const finance_bento_desc = "Dirancang untuk orang biasa, bukan akuntan.";
const finance_bento_1_title = "Pengingat Tagihan";
const finance_bento_1_desc = "Tidak ada lagi denda telat bayar. Sistem akan mengingatkanmu saat tagihan listrik, internet, atau langganan sudah jatuh tempo.";
const finance_bento_2_title = "Tampilan Nyaman";
const finance_bento_2_desc = "Mode gelap yang elegan untuk mengecek saldo di malam hari sebelum tidur.";
const finance_bento_3_title = "Dompet Multi-Akun";
const finance_bento_3_desc = "Pisahkan catatan untuk Uang Tunai, Rekening Bank, maupun E-Wallet favoritmu.";
const finance_bento_4_title = "Akses di Ponselmu";
const finance_bento_4_desc = "Catat pengeluaran langsung setelah jajan lewat smartphone tanpa harus buka laptop.";
const finance_privacy_title = "Keamanan Data Prioritas Kami";
const finance_privacy_desc = "Informasi keuangan adalah hal yang sangat sensitif. OneForMind dirancang dengan prinsip privasi sejak awal agar kamu bisa melacak keuangan dengan tenang.";
const finance_privacy_point_1_title = "Enkripsi Aman";
const finance_privacy_point_1_desc = "Data transaksimu dienkripsi di database kami.";
const finance_privacy_point_2_title = "Tanpa Akses Rekening";
const finance_privacy_point_2_desc = "Kami tidak meminta pin atau akses langsung ke rekening bank aslimu.";
const finance_privacy_point_3_title = "Data Adalah Milikmu";
const finance_privacy_point_3_desc = "Kami tidak pernah menjual data keuanganmu ke pihak ketiga.";
const finance_quote_text = "Jangan menabung apa yang tersisa setelah menghabiskan uang, tetapi habiskan apa yang tersisa setelah menabung.";
const finance_quote_author = "— Warren Buffett";
const finance_cta_title = "Siap Mengatur Uangmu Lebih Baik?";
const finance_cta_desc = "Mulai catat transaksi pertamamu dan pantau kebiasaan serta keuanganmu dalam satu tempat di OneForMind.";
const finance_cta_btn = "Buka Akun Gratismu";
const finance_cta_note = "Aman. Privat. Tidak perlu kartu kredit.";
const planner_meta_title = "Daily Planner - OneForMind";
const planner_meta_desc = "Atur jadwal harian, blok waktu, dan selesaikan tugas-tugas penting tanpa distraksi dengan Daily Planner OneForMind.";
const planner_meta_og_title = "Daily Planner - OneForMind";
const planner_meta_og_desc = "Atur jadwal harian, blok waktu, dan selesaikan tugas-tugas penting tanpa distraksi.";
const planner_hero_badge = "Daily Planner";
const planner_hero_title_1 = "Kuasai Waktumu,";
const planner_hero_title_2 = "Selesaikan Lebih Banyak.";
const planner_hero_desc = "Berhenti merasa sibuk tapi tidak produktif. Atur jadwal harian, prioritaskan tugas, dan capai *flow state* dengan sistem To-Do List yang cerdas.";
const planner_hero_cta_1 = "Mulai Rencanakan";
const planner_hero_cta_2 = "Jelajahi Fitur";
const planner_mockup_title = "Jadwal Hari Ini";
const planner_mockup_status = "Lancar";
const planner_mockup_task_1 = "Sprint Planning Tim";
const planner_mockup_time_1 = "09:00 AM • Selesai";
const planner_mockup_task_2 = "Review Kode Laravel";
const planner_mockup_time_2 = "01:00 PM • Sedang Dikerjakan";
const planner_mockup_task_3 = "Balas Email Klien";
const planner_mockup_time_3 = "04:00 PM • Menunggu";
const planner_mockup_alert_1 = "Waktu Fokus";
const planner_mockup_alert_2 = "Pomodoro Berjalan...";
const planner_prob_title_1 = "Menyimpan jadwal di kepala itu";
const planner_prob_title_strike = "berantakan";
const planner_prob_title_2 = "& bikin stres.";
const planner_prob_1_title = "Pikiran Penuh (Overwhelmed)";
const planner_prob_1_desc = "Terlalu banyak yang harus dikerjakan sampai bingung harus mulai dari mana akhirnya malah *scroll* sosmed.";
const planner_prob_2_title = "Sering Menunda";
const planner_prob_2_desc = "Tugas menumpuk karena tidak ada alokasi waktu yang jelas untuk menyelesaikannya.";
const planner_prob_3_title = "Deadline Terlewat";
const planner_prob_3_desc = "Lupa jadwal penting karena mengandalkan ingatan belaka tanpa sistem pencatatan yang solid.";
const planner_feature_1_title = "Time Blocking & Manajemen Tugas";
const planner_feature_1_desc = "Jangan cuma buat daftar tugas, alokasikan waktunya. Dengan *Time Blocking*, kamu memvisualisasikan harimu dan mencegah pekerjaan melebar di luar batas waktu.";
const planner_feature_1_point_1 = "Tampilan kalender harian & mingguan";
const planner_feature_1_point_2 = "Estimasi waktu untuk setiap tugas";
const planner_feature_2_title = "Fokus Pada Hal Yang Benar-benar Penting";
const planner_feature_2_desc = "Tidak semua tugas diciptakan setara. Tandai tugas dengan tingkat prioritas (High, Medium, Low) agar energi terbesarmu habis untuk hal yang paling berdampak.";
const planner_feature_2_point_1 = "Sistem label prioritas bergradasi warna";
const planner_feature_2_point_2 = "Sembunyikan tugas non-esensial saat mode fokus";
const planner_bento_title = "Produktivitas Tanpa Batas";
const planner_bento_desc = "Lebih dari sekadar *checklist* biasa.";
const planner_bento_1_title = "Recurring Tasks";
const planner_bento_1_desc = "Buat tugas berulang secara otomatis (harian, mingguan, bulanan) tanpa perlu mengetik ulang.";
const planner_bento_2_title = "Focus Timer";
const planner_bento_2_desc = "Gunakan teknik Pomodoro bawaan kami untuk menjaga konsentrasi dan mencegah *burnout*.";
const planner_bento_3_title = "Sinkronisasi Habit";
const planner_bento_3_desc = "Lihat *habit* harianmu langsung di dalam agenda Planner tanpa perlu berpindah tab.";
const planner_bento_4_title = "Drag & Drop";
const planner_bento_4_desc = "Pindahkan jadwal tugas dengan mudah cukup dengan menarik dan menjatuhkannya (*drag and drop*).";
const planner_quote_text = "Kuncinya bukanlah menghabiskan waktu, tetapi menginvestasikannya.";
const planner_quote_author = "— Stephen R. Covey";
const planner_cta_title = "Siap Menaklukkan Harimu?";
const planner_cta_desc = "Rancang rutinitas yang sukses, selesaikan lebih banyak tugas, dan dapatkan kembali waktu luangmu dengan OneForMind.";
const planner_cta_btn = "Gunakan Planner Gratis";
const planner_cta_note = "Akses instan. Mudah digunakan. Tidak perlu kartu kredit.";
const planner_mechanism_1_title = "Mekanisme Kerja yang Sempurna.";
const planner_mechanism_1_desc = "Kami merancang sistem planner ini agar pikiranmu tetap jernih. Semua yang kamu butuhkan untuk eksekusi tugas ada di sini.";
const journal_meta_title = "Digital Journal - OneForMind";
const journal_meta_desc = "Tempat aman untuk pikiranmu. Tulis jurnal, lacak mood, dan temukan ketenangan.";
const journal_meta_og_title = "Digital Journal - OneForMind";
const journal_meta_og_desc = "Tempat aman untuk pikiranmu. Tulis jurnal, lacak mood, dan temukan ketenangan.";
const journal_hero_badge = "Jurnal Digital";
const journal_hero_title_1 = "Jernihkan Pikiran,";
const journal_hero_title_2 = "Pahami Dirimu.";
const journal_hero_desc = "Catat perjalanan harianmu, lacak suasana hati, dan temukan pola dalam pikiranmu dengan ruang menulis yang bebas distraksi.";
const journal_hero_cta_1 = "Mulai Menulis";
const journal_hero_cta_2 = "Eksplorasi Jurnal";
const journal_mockup_title = "Hari yang luar biasa di kampus";
const journal_mockup_date = "Selasa, 17 Februari";
const journal_mockup_text_1 = "Hari ini berhasil menyelesaikan revisi kodingan yang udah error dari kemarin...";
const journal_mockup_text_2 = "Rasanya lega banget. Akhirnya bisa sedikit bernafas lega sebelum...";
const journal_mockup_typing = "Sedang mengetik...";
const journal_prob_title_1 = "Menyimpan stres di";
const journal_prob_title_strike = "dalam dada";
const journal_prob_title_2 = "bikin cepat lelah.";
const journal_prob_main_desc = "Pikiran yang kusut butuh tempat untuk diurai. Jika tidak, kecemasan akan mengambil alih harimu.";
const journal_prob_1_title = "Pikiran Bising";
const journal_prob_1_desc = "Overthinking yang menghalangi tidur nyenyak di malam hari.";
const journal_prob_2_title = "Lupa Bersyukur";
const journal_prob_2_desc = "Terlalu fokus pada masalah hingga lupa pada pencapaian kecil.";
const journal_prob_3_title = "Emosi Terpendam";
const journal_prob_3_desc = "Tidak mengenali pola suasana hatimu sendiri yang terus naik turun.";
const journal_feature_1_title = "Menulis Tanpa Gangguan";
const journal_feature_1_desc = "Saat kamu mengetik, semua elemen UI lainnya akan memudar. Masuki 'Zen Mode' di mana hanya ada kamu, keyboard, dan pikiranmu.";
const journal_feature_1_point_1 = "Terkadang yang kamu butuhkan hanyalah kanvas kosong untuk menuangkan isi kepala.";
const journal_feature_1_point_2 = "Lepaskan beban, tulis sejujurnya.";
const journal_feature_2_title = "Lacak Suasana Hati Harian";
const journal_feature_2_desc = "Pilih emoji yang menggambarkan perasaanmu setiap kali menulis jurnal. Pantau fluktuasi emosimu dalam sebulan untuk lebih memahami dirimu.";
const journal_feature_2_point_1 = "Mood Board Bulanan";
const journal_feature_2_point_2 = "Korelasi Mood & Produktivitas";
const journal_bento_title = "Ruang Aman Resolusimu";
const journal_bento_desc = "Privat, indah, dan mendalam.";
const journal_bento_1_title = "Jurnal Terkunci";
const journal_bento_1_desc = "Tulisanmu adalah rahasiamu. Akses dengan PIN atau biometrik.";
const journal_bento_2_title = "Sisipkan Foto";
const journal_bento_2_desc = "Abadikan memori visual untuk melengkapi cerita harianmu.";
const journal_bento_3_title = "Kilas Balik";
const journal_bento_3_desc = "Sistem akan mengingatkanmu pada tulisan yang kamu buat setahun yang lalu.";
const journal_quote_text = "Menulis jurnal seperti berbisik kepada diri sendiri dan mendengarkannya pada saat yang bersamaan.";
const journal_quote_author = "Mina Murray";
const journal_cta_title = "Mulai Catatan Pertamamu.";
const journal_cta_desc = "Duduk, tarik napas panjang, dan biarkan jemarimu menari menceritakan harimu.";
const journal_cta_btn = "Buka Lembaran Baru";
const journal_cta_note = "Ruang tulisanmu 100% pribadi.";
const calendar_meta_title = "Smart Calendar - OneForMind";
const calendar_meta_desc = "Kelola waktumu dengan lebih baik. Sinkronisasi semua jadwal, buat time-blocking, dan jangan pernah lewatkan rapat penting lagi.";
const calendar_meta_og_title = "Smart Calendar - OneForMind";
const calendar_meta_og_desc = "Kelola waktumu dengan lebih baik bersama OneForMind Calendar.";
const calendar_hero_badge = "Smart Calendar";
const calendar_hero_title_1 = "Kuasai Waktumu,";
const calendar_hero_title_2 = "Menangkan Harimu.";
const calendar_hero_desc = "Ubah jadwal yang berantakan menjadi alur kerja yang mulus. Sinkronisasi semua kalendermu di satu tempat, blok waktu untuk fokus, dan selesaikan lebih banyak hal.";
const calendar_hero_cta_1 = "Atur Jadwal Sekarang";
const calendar_hero_cta_2 = "Eksplorasi Kalender";
const calendar_mockup_month = "Februari 2026";
const calendar_mockup_today = "Agenda Hari Ini";
const calendar_mockup_date = "Selasa, 17 Februari";
const calendar_mockup_event_1 = "Weekly Team Sync";
const calendar_mockup_event_1_time = "09:00 - 10:30";
const calendar_mockup_location_1 = "Google Meet";
const calendar_mockup_event_2 = "Pitching Klien: Project Alpha";
const calendar_mockup_event_2_time = "13:00 - 14:00";
const calendar_mockup_location_2 = "Zoom Video";
const calendar_mockup_event_3 = "Sesi Deep Work & Review";
const calendar_mockup_event_3_time = "19:00 - 20:00";
const calendar_mockup_location_3 = "Fokus Personal";
const calendar_mockup_alert_1 = "Akan Datang";
const calendar_mockup_alert_2 = "Pitching dalam 15 menit!";
const calendar_prob_title_1 = "Mengandalkan";
const calendar_prob_title_strike = "ingatan semata";
const calendar_prob_title_2 = "adalah resep kegagalan.";
const calendar_prob_1_title = "Jadwal Bentrok";
const calendar_prob_1_desc = "Sering mengiyakan dua meeting di jam yang sama karena lupa mengecek jadwal.";
const calendar_prob_2_title = "Terlalu Sibuk, Kurang Fokus";
const calendar_prob_2_desc = "Hari penuh dengan meeting, tapi tidak ada waktu tersisa untuk benar-benar bekerja.";
const calendar_prob_3_title = "Terisolasi";
const calendar_prob_3_desc = "Bolak-balik antara Google Calendar kantor dan Apple Calendar pribadi bikin pusing.";
const calendar_feature_1_title = "Satu Kalender Untuk Semua";
const calendar_feature_1_desc = "Tidak perlu lagi berpindah aplikasi. Hubungkan Google Calendar, Outlook, dan Apple Calendar ke dalam satu tampilan dashboard OneForMind yang bersih dan rapi.";
const calendar_feature_2_title = "Time-Blocking Sederhana";
const calendar_feature_2_desc = "Lindungi waktumu. Alokasikan blok waktu spesifik untuk membalas email, coding, atau istirahat, agar harimu tidak habis hanya untuk meeting.";
const calendar_feature_2_point_1 = "Drag & Drop Durasi";
const calendar_feature_2_point_2 = "Perlindungan Waktu Fokus";
const calendar_bento_title = "Waktu Adalah Aset Terbesarmu";
const calendar_bento_desc = "Maksimalkan setiap detiknya dengan fitur-fitur ini.";
const calendar_bento_1_title = "Zona Waktu Otomatis";
const calendar_bento_1_desc = "Jadwal otomatis menyesuaikan saat kamu bepergian atau meeting dengan klien luar negeri.";
const calendar_bento_2_title = "Kode Warna";
const calendar_bento_2_desc = "Beri warna berbeda untuk urusan kantor, pribadi, atau keluarga.";
const calendar_bento_3_title = "Notifikasi Pintar";
const calendar_bento_3_desc = "Dapatkan pengingat ke HP atau email sebelum acaramu dimulai.";
const calendar_bento_4_title = "Bagikan Ketersediaanmu";
const calendar_bento_4_desc = "Kirim satu tautan (link) ke klien untuk membiarkan mereka memilih jadwal kosongmu secara otomatis tanpa perlu chat panjang lebar.";
const calendar_quote_text = "Kuncinya bukanlah memprioritaskan apa yang ada di jadwalmu, tapi menjadwalkan apa yang menjadi prioritasmu.";
const calendar_quote_author = "Stephen Covey";
const calendar_cta_title = "Berhenti Mengejar Waktu.";
const calendar_cta_desc = "Saatnya kamu yang mengendalikan waktumu. Buat jadwal yang bekerja untukmu, bukan sebaliknya.";
const calendar_cta_btn = "Buka Kalendermu";
const calendar_cta_note = "Sinkronisasi dalam hitungan detik.";
const student_meta_title = "Solusi Mahasiswa - OneForMind";
const student_meta_desc = "Atur tugas, jadwal kuliah, dan keuangan mahasiswa di satu tempat. Berhenti merasa kewalahan dan mulai kuasai masa kuliahmu.";
const student_meta_og_title = "OneForMind untuk Mahasiswa";
const student_meta_og_desc = "Sistem operasi produktivitas all-in-one untuk mahasiswa yang ambis.";
const student_hero_badge = "Khusus Mahasiswa";
const student_hero_title_1 = "IPK Aman,";
const student_hero_title_2 = "Mental Tetap Waras.";
const student_hero_desc = "Dari nugas akhir, rapat organisasi, sampai ngatur uang bulanan kos yang mepet. OneForMind bantu satukan semua kekacauan itu di dalam satu layar yang rapi.";
const student_hero_cta_1 = "Mulai Atur Hidupmu";
const student_hero_social_proof = "Bergabung dengan ratusan mahasiswa lainnya.";
const student_prob_title = "Penyakit Mahasiswa 101";
const student_prob_desc = "Kami tahu persis apa yang bikin kamu overthinking setiap malam.";
const student_prob_1_title = "Tugas Numpuk";
const student_prob_1_desc = "Deadline dari 5 matkul berbeda datang di minggu yang sama. Nggak tahu harus mulai dari mana.";
const student_prob_2_title = "Akhir Bulan Melarat";
const student_prob_2_desc = "Uang bulanan atau hasil freelance habis nggak jelas ke mana sebelum tanggal 20.";
const student_prob_3_title = "Jadwal Bentrok";
const student_prob_3_desc = "Rapat kepanitiaan selalu tabrakan sama jadwal nugas kelompok atau waktu istirahat.";
const student_feat_1_visual_badge = "Project Manager";
const student_feat_1_title = "Pantau Semua Proyek Kuliah & Portofolio";
const student_feat_1_desc = "Dari ngerjain tugas akhir sampai bangun portofolio pribadi. Pecah tugas besar jadi langkah kecil yang masuk akal biar nggak prokrastinasi.";
const student_feat_1_point_1 = "Kanban board untuk tracking progress.";
const student_feat_1_point_2 = "Sub-tugas untuk bagi-bagi kerjaan tim.";
const student_feat_2_title = "Survive dengan Budget Mahasiswa";
const student_feat_2_desc = "Pantau sisa saldo bulananmu secara real-time. Tahu persis berapa jatah uang makan harian biar nggak perlu terus-terusan numpang WiFi di warkop.";
const student_feat_2_point_1 = "Limit Pengeluaran Harian";
const student_feat_2_point_2 = "Tabungan Beli Setup Baru";
const student_bento_title = "Student Survival Kit";
const student_bento_desc = "Fitur pelengkap untuk bertahan hidup di ganasnya kampus.";
const student_bento_1_title = "Jurnal Overthinking";
const student_bento_1_desc = "Tumpahkan stres revisian atau keluh kesah di jurnal privat yang aman.";
const student_bento_2_title = "Mode Begadang";
const student_bento_2_desc = "Dark mode yang nyaman di mata buat nugas sampai jam 3 pagi.";
const student_bento_3_title = "Sinkronisasi Cloud";
const student_bento_3_desc = "Aman diakses lewat HP pas di kelas, atau laptop pas di perpus.";
const student_cta_title = "Jangan Cuma Bertahan, Jadilah Mahasiswa Ambis.";
const student_cta_desc = "Sistem yang baik membedakan mahasiswa yang sekadar lulus dengan mereka yang bersinar di kampus.";
const student_cta_btn = "Daftar Gratis Sekarang";
const student_cta_note = "Akses fitur dasar gratis, selamanya.";
const freelance_meta_title = "Solusi Freelancer & Remote Worker - OneForMind";
const freelance_meta_desc = "Sistem kerja all-in-one untuk freelancer. Kelola banyak klien, pantau invoice, dan atur deadline tanpa stres.";
const freelance_meta_og_title = "OneForMind untuk Freelancer";
const freelance_meta_og_desc = "Tingkatkan profesionalitas kerjamu dengan sistem yang rapi.";
const freelance_hero_badge = "Khusus Freelancer";
const freelance_hero_title_1 = "Kerja Bebas,";
const freelance_hero_title_2 = "Bukan Berarti Kacau.";
const freelance_hero_desc = "Atur banyak klien, pantau invoice yang belum dibayar, dan kelola deadline dari berbagai zona waktu. Semua dari satu dashboard profesional.";
const freelance_hero_cta_1 = "Mulai Profesional Sekarang";
const freelance_hero_social_proof = "Dipercaya oleh pekerja remote dan agensi digital.";
const freelance_prob_title = "Rollercoaster Freelance";
const freelance_prob_desc = "Fase yang selalu terjadi kalau kamu tidak punya sistem kerja yang solid.";
const freelance_prob_1_title = "Kewalahan (Overwhelmed)";
const freelance_prob_1_desc = "Revisi numpuk dari 3 klien berbeda secara bersamaan. Bingung harus mulai dari mana.";
const freelance_prob_2_title = "Lupa Tagih Invoice";
const freelance_prob_2_desc = "Kerjaan sudah beres bulan lalu, tapi uang belum cair karena lupa follow-up klien.";
const freelance_prob_3_title = "Burnout Parah";
const freelance_prob_3_desc = "Kerja 24/7 tanpa batas waktu istirahat yang jelas karena kamar tidur adalah kantormu.";
const freelance_feat_1_title = "Command Center Proyekmu";
const freelance_feat_1_desc = "Lacak setiap revisi, atur target harian, dan pantau progress tiap klien tanpa harus membuka puluhan tab yang bikin pusing.";
const freelance_feat_1_point_1 = "Kanban Board Multi-Klien";
const freelance_feat_1_point_2 = "Tracking Progress Real-Time";
const freelance_feat_2_title = "Pantau Keuangan & Invoice";
const freelance_feat_2_desc = "Jangan biarkan hasil keringatmu tertahan. Sistem akan bantu melacak mana proyek yang sudah lunas dan mana invoice yang masih gantung.";
const freelance_feat_2_point_1 = "Pendapatan Terlacak";
const freelance_feat_2_point_2 = "Pengingat Otomatis";
const freelance_bento_title = "Gudang Senjata Freelancer";
const freelance_bento_desc = "Fitur-fitur yang bikin kamu terlihat seperti agensi profesional.";
const freelance_bento_1_title = "Manajemen Klien";
const freelance_bento_1_desc = "Simpan brief, aset, dan riwayat revisi klien dengan sangat rapi.";
const freelance_bento_2_title = "Time Tracker";
const freelance_bento_2_desc = "Lacak berapa jam yang kamu habiskan per proyek untuk hitungan rate per-jam.";
const freelance_bento_3_title = "Rekap Pajak";
const freelance_bento_3_desc = "Data pemasukan siap pakai untuk mempermudah lapor pajak tahunan.";
const freelance_bento_4_title = "Klien Portal (Segera)";
const freelance_bento_4_desc = "Bagikan link khusus agar klien bisa melihat progress kerjamu tanpa perlu terus-terusan menanyakan update via chat.";
const freelance_cta_title = "Siap Scale-Up Bisnis Freelance-mu?";
const freelance_cta_desc = "Klien suka bekerja dengan freelancer yang terorganisir, dan kamu pantas dibayar mahal untuk itu.";
const freelance_cta_btn = "Upgrade Sistem Kerjamu";
const freelance_cta_note = "Ambil alih kendali bisnismu hari ini.";
const growth_meta_title = "Pengembangan Diri & Produktivitas - OneForMind";
const growth_meta_desc = "Bangun kebiasaan baik, jernihkan pikiran dengan jurnal, dan raih versi terbaik dirimu setiap hari.";
const growth_meta_og_title = "OneForMind untuk Personal Growth";
const growth_meta_og_desc = "Sistem untuk membangun identitas baru dan kebiasaan yang tak terhentikan.";
const growth_hero_badge = "Pengembangan Diri";
const growth_hero_title_1 = "Berhenti Merencanakan,";
const growth_hero_title_2 = "Mulai Mengeksekusi.";
const growth_hero_desc = "Sistem komprehensif untuk melacak kebiasaan, merenungkan pikiran, dan membangun versi terbaik dirimu setiap hari. Sedikit demi sedikit, langkah demi langkah.";
const growth_hero_cta_1 = "Mulai Transformasimu";
const growth_hero_social_proof = "Dipercaya oleh ribuan pengejar mimpi.";
const growth_prob_title_dark = "Siklus Terjebak";
const growth_prob_desc_dark = "Pikiran bising, kebiasaan buruk yang berulang, dan motivasi yang hanya bertahan dua hari lalu hilang begitu saja.";
const growth_prob_point_1 = "Konsumsi dopamin instan dan prokrastinasi.";
const growth_prob_point_2 = "Memulai banyak hal tapi tidak ada yang selesai.";
const growth_prob_title_light = "Siklus Bertumbuh";
const growth_prob_desc_light = "Kejernihan mental, sistem yang berjalan otomatis, dan identitas baru yang terbangun dari kebiasaan kecil namun konsisten.";
const growth_prob_point_3 = "Fokus tajam tanpa distraksi.";
const growth_prob_point_4 = "Pertumbuhan 1% lebih baik setiap hari.";
const growth_feat_1_title = "Bangun Identitas Baru Melalui Kebiasaan";
const growth_feat_1_desc = "Setiap kali kamu menyelesaikan kebiasaan, kamu sedang memberikan suara untuk tipe orang yang kamu inginkan. Bangun rantai kemenanganmu (streak) dan jangan pernah putuskan.";
const growth_feat_1_point_1 = "Pelacakan Kebiasaan Presisi";
const growth_feat_1_point_2 = "Milestone & Penghargaan Konsistensi";
const growth_feat_2_title = "Ruang Hening Untuk Pikiranmu";
const growth_feat_2_desc = "Jauhkan diri dari kebisingan digital. Masuki 'Zen Mode' dan mulai urai benang kusut di kepalamu melalui jurnal refleksi harian tanpa gangguan UI yang berisik.";
const growth_feat_2_quote_title = "Terkadang, trik produktivitas terbaik adalah jeda sejenak untuk memahami diri sendiri.";
const growth_feat_2_quote_body = "Menuliskan apa yang kamu rasakan akan membantumu menguasai apa yang akan kamu lakukan selanjutnya.";
const growth_bento_title = "Ekosistem Pertumbuhan";
const growth_bento_desc = "Tools pendukung untuk meretas potensi maksimalmu.";
const growth_bento_1_title = "Fokus Audio";
const growth_bento_1_desc = "Integrasi suara lofi dan alam untuk masuk ke state of flow (Segera).";
const growth_bento_2_title = "Dark Mode";
const growth_bento_2_desc = "Nuansa gelap yang menenangkan untuk refleksi mendalam di malam hari.";
const growth_bento_3_title = "Resolusi Jangka Panjang";
const growth_bento_3_desc = "Pecah tujuan besar tahunanmu menjadi aksi harian yang mudah dilakukan. Saat visi bertemu dengan rutinitas, tidak ada yang tidak mungkin.";
const growth_bento_4_title = "Mood Analytics";
const growth_bento_4_desc = "Pahami siklus emosimu dan pengaruhnya terhadap tingkat produktivitasmu.";
const growth_bento_5_title = "Inspirasi Harian";
const growth_bento_5_desc = "Kutipan stoikisme dan filosofi di dashboard untuk memantik semangat.";
const growth_cta_title = "Hari Ini Adalah Hari Pertama.";
const growth_cta_desc = "Masa depanmu dibentuk oleh apa yang kamu lakukan hari ini, bukan besok. Ambillah langkah pertama itu sekarang.";
const growth_cta_btn = "Mulai Perjalanan Growth-mu";
const growth_cta_note = "Gratis 100% untuk memulai langkah kecil.";
const guide_meta_title = "Panduan & Pusat Bantuan - OneForMind";
const guide_meta_desc = "Semua yang Anda butuhkan untuk menguasai alur kerja dan pola pikir.";
const guide_meta_og_title = "Pusat Pengetahuan OneForMind";
const guide_meta_og_desc = "Kuasai pikiran Anda dengan panduan komprehensif kami.";
const guide_hero_badge = "Pusat Bantuan Resmi";
const guide_hero_title_1 = "Kuasai Alur Kerja Anda";
const guide_hero_title_2 = "Knowledge Base";
const guide_hero_desc = "Jelajahi perpustakaan panduan, tutorial, dan praktik terbaik kami untuk membantu Anda mencapai produktivitas puncak.";
const guide_search_placeholder = "Apa yang Anda cari?";
const guide_search_btn = "Cari";
const guide_popular_search = "Populer:";
const guide_tag_1 = "Atur Budget";
const guide_tag_2 = "Sinkron Kalender";
const guide_tag_3 = "Zen Mode";
const guide_modules_badge = "Pelajaran Terkurasi";
const guide_modules_title = "Jelajahi Kategori";
const guide_mod_1_title = "Pertumbuhan Pola Pikir";
const guide_mod_1_desc = "Pelajari dasar-dasar psikologi kognitif untuk produktivitas.";
const guide_mod_2_title = "Financial Zen";
const guide_mod_2_desc = "Kuasai keuangan Anda dengan alur kerja budgeting otomatis.";
const guide_mod_3_title = "Penguasaan Waktu";
const guide_mod_3_desc = "Teknik penjadwalan tingkat lanjut untuk mengambil alih waktu Anda.";
const guide_mod_4_title = "Jurnal";
const guide_mod_4_desc = "Cara merefleksikan diri secara efektif menggunakan jurnal digital kami.";
const guide_btn_learn = "Pelajari";
const guide_start_title = "Mulai dengan Cepat";
const guide_start_desc = "Baru di OneForMind? Ikuti tiga langkah sederhana ini.";
const guide_start_step_1_title = "Buat Akun Anda";
const guide_start_step_1_desc = "Siapkan profil dan pilih tujuan utama Anda.";
const guide_start_step_2_title = "Sinkronkan Alat";
const guide_start_step_2_desc = "Hubungkan kalender dan bank untuk otomasi penuh.";
const guide_start_step_3_title = "Bangun Kebiasaan";
const guide_start_step_3_desc = "Mulai dengan 5 menit refleksi harian.";
const guide_articles_title = "Artikel Pilihan";
const guide_articles_desc = "Pembahasan mendalam tentang topik tertentu.";
const guide_btn_all = "Lihat Semua";
const guide_btn_read = "Baca";
const guide_read_time = "menit baca";
const guide_support_title = "Butuh bantuan lebih?";
const guide_support_desc = "Tim dan komunitas kami siap mendukung perjalanan Anda.";
const guide_btn_contact = "Hubungi Support";
const guide_btn_community = "Komunitas Discord";
const guide_art_1_title = "Cara Memulai dengan OneForMind";
const guide_art_1_desc = "Panduan langkah demi langkah untuk memulai perjalanan produktivitas Anda.";
const guide_art_2_title = "5 Tips Memaksimalkan Habit Tracker";
const guide_art_2_desc = "Strategi untuk membangun kebiasaan yang tak terhentikan.";
const guide_art_3_title = "Menggunakan Time Blocking untuk Fokus Maksimal";
const guide_art_3_desc = "Cara merancang hari Anda untuk produktivitas puncak.";
const blog_meta_title = "Blog & Artikel - OneForMind";
const blog_meta_desc = "Baca insight terbaru seputar produktivitas, pengembangan diri, dan pembaruan fitur dari tim OneForMind.";
const blog_meta_og_title = "OneForMind Blog";
const blog_meta_og_desc = "Wawasan dan strategi untuk bekerja lebih cerdas.";
const blog_hero_badge = "Artikel Pilihan";
const blog_feat_title = "Membangun Sistem Produktivitas yang Tahan Banting di Tahun Ini";
const blog_cat_all = "Semua Artikel";
const blog_cat_prod = "Produk";
const blog_cat_student = "Mahasiswa";
const blog_cat_freelance = "Freelance";
const blog_cat_updates = "Update";
const blog_grid_1_title = "Mengapa Motivasi Saja Tidak Cukup";
const blog_grid_1_desc = "Kita sering terjebak mencari motivasi. Padahal yang kamu butuhkan adalah sistem desain lingkungan yang anti-gagal.";
const blog_grid_1_date = "Feb 18, 2026";
const blog_grid_2_title = "Cara Setup Budget 50/30/20 di Aplikasi";
const blog_grid_2_desc = "Panduan otomatis mengatur sisa gajimu agar bisa tetap investasi sekaligus jajan enak.";
const blog_grid_2_date = "Feb 15, 2026";
const blog_grid_3_title = "Bedah Buku: Atomic Habits";
const blog_grid_3_desc = "Pelajaran terpenting dari buku James Clear dan bagaimana kami mengaplikasikannya di Habit Tracker kami.";
const blog_grid_3_date = "Feb 10, 2026";
const blog_grid_4_title = "Pindah ke Laravel: Cerita Enginering Kami";
const blog_grid_4_desc = "Alasan mengapa tim kami memutuskan menggunakan Laravel untuk membangun arsitektur OneForMind.";
const blog_grid_4_date = "Feb 05, 2026";
const blog_grid_5_title = "Pembaruan v1.2: Dark Mode & Kalender";
const blog_grid_5_desc = "Fitur yang paling banyak diminta akhirnya rilis. Baca changelog lengkapnya di sini.";
const blog_grid_5_date = "Jan 28, 2026";
const blog_news_badge = "Weekly Insight";
const blog_news_title = "Jangan Ketinggalan Info Terbaru";
const blog_news_desc = "Dapatkan satu email setiap hari Senin berisi tips produktivitas praktis, bukan spam.";
const blog_news_placeholder = "Masukkan alamat email...";
const blog_news_btn = "Berlangganan";
const blog_news_note = "Berlangganan gratis. Unsubscribe kapan saja.";
const blog_hero_title_1 = "Membangun Sistem Produktivitas yang Tahan Banting di Tahun Ini,";
const blog_hero_title_2 = "Mindset & Growth";
const blog_meta_date = "Feb 18, 2026";
const blog_feat_label = "Artikel Unggulan";
const blog_feat_desc = "Artikel mendalam yang membahas topik penting untuk membantu Anda bekerja lebih cerdas, bukan lebih keras.";
const privacy_meta_title = "Pusat Privasi & Kepercayaan";
const privacy_meta_desc = "Pelajari bagaimana OneForMind melindungi data, privasi, dan memastikan keamanan Anda.";
const privacy_meta_og_title = "Trust Center — OneForMind";
const privacy_meta_og_desc = "Kami percaya kebiasaan dan keuangan Anda adalah urusan pribadi Anda. Baca kebijakan privasi kami.";
const privacy_badge = "Pusat Privasi & Keamanan";
const privacy_title_1 = "Data Anda.";
const privacy_title_2 = "Aturan Anda.";
const privacy_subtitle = "Kami membuat alat untuk membantu Anda mengontrol hidup, bukan untuk mengeksploitasi data pribadi Anda. Transparansi adalah standar kami.";
const privacy_last_updated = "Terakhir Diperbarui: 18 Feb 2026";
const privacy_status = "Versi Aktif";
const privacy_toc_title = "Daftar Isi";
const privacy_download_pdf = "Unduh PDF";
const privacy_tldr_title = "Ringkasan Singkat (TL;DR)";
const privacy_tldr_1_title = "Tidak Menjual Data";
const privacy_tldr_1_desc = "Kami tidak pernah menjual informasi pribadi atau data keuangan Anda ke pihak ketiga.";
const privacy_tldr_2_title = "Hak Menghapus";
const privacy_tldr_2_desc = "Data Anda milik Anda. Ekspor atau hapus akun secara permanen kapan saja.";
const privacy_tldr_3_title = "Keamanan Tingkat Bank";
const privacy_tldr_3_desc = "Catatan keuangan dan habit Anda dienkripsi penuh, baik saat transit maupun tersimpan.";
const privacy_tldr_4_title = "Pelacakan Minimal";
const privacy_tldr_4_desc = "Kami hanya menggunakan cookie esensial untuk fungsi login dan analitik dasar.";
const privacy_doc_intro = 'Kebijakan Privasi ini menjelaskan bagaimana OneForMind ("kami" atau "milik kami") mengumpulkan, menggunakan, dan membagikan informasi pribadi Anda saat menggunakan aplikasi kami.';
const privacy_h2_collection = "2. Informasi yang Kami Kumpulkan";
const privacy_p_collection = "Kami percaya pada prinsip minimalisasi data. Kami hanya mengambil apa yang benar-benar diperlukan agar aplikasi berjalan.";
const privacy_li_collection_1_title = "Informasi Akun";
const privacy_li_collection_1_desc = "Nama, email, dan kredensial login (jika tidak menggunakan Google OAuth).";
const privacy_li_collection_2_title = "Konten Pengguna";
const privacy_li_collection_2_desc = "Log kebiasaan, catatan keuangan, jurnal, dan tugas planner.";
const privacy_li_collection_2_strong = "Data ini sepenuhnya privat di akun Anda.";
const privacy_li_collection_3_title = "Data Perangkat & Penggunaan";
const privacy_li_collection_3_desc = "Analitik dasar seperti alamat IP dan jenis browser untuk membantu kami memperbaiki bug.";
const privacy_h2_usage = "3. Bagaimana Kami Menggunakan Data";
const privacy_p_usage = "Data Anda digunakan eksklusif untuk memberikan pengalaman terbaik di OneForMind, seperti:";
const privacy_li_usage_1 = "Menyediakan fungsi utama (habit tracker, insight keuangan, planner).";
const privacy_li_usage_2 = "Mengirimkan notifikasi penting (mis. reset password).";
const privacy_li_usage_3 = "Menganalisis pola penggunaan secara anonim untuk meningkatkan UI/UX.";
const privacy_finance_note_title = "Catatan Penting Soal Keuangan";
const privacy_finance_note_desc = "Kami bukan bank. Kami tidak terhubung langsung dengan rekening bank Anda. Semua data dimasukkan secara manual oleh Anda untuk keperluan wawasan pribadi.";
const privacy_h2_security = "4. Keamanan Data";
const privacy_p_security = "Kami menerapkan standar industri ketat. Database dilindungi, dan kami mewajibkan HTTPS/SSL. Password di-hash dengan algoritma kriptografi modern.";
const privacy_h2_cookies = "5. Cookies dan Pelacakan";
const privacy_p_cookies = 'OneForMind menggunakan "cookies" untuk menyimpan sesi login dan preferensi Anda (seperti Dark mode). Kami tidak memakai tracker iklan pihak ketiga di dalam dashboard.';
const privacy_h2_rights = "6. Hak-Hak Anda";
const privacy_p_rights = "Bergantung pada lokasi Anda, Anda berhak untuk:";
const privacy_li_rights_1 = "Mengakses data personal yang kami simpan.";
const privacy_li_rights_2 = "Meminta perbaikan data yang tidak akurat.";
const privacy_li_rights_3 = "Meminta penghapusan permanen akun dan seluruh datanya.";
const privacy_h2_contact = "7. Hubungi Kami";
const privacy_p_contact = "Punya pertanyaan atau ingin mengajukan penghapusan data? Silakan hubungi kami:";
const privacy_contact_role = "Tim Pelindungan Data";
const privacy_contact_email = "privacy@oneformind.com";
const privacy_contact_sla = "Kami biasanya membalas dalam 24-48 jam kerja.";
const privacy_export_title = "Portabilitas Data";
const privacy_export_desc = "Kami tidak menyandera data Anda. Anda bisa mengunduh backup lengkap dari kebiasaan, keuangan, dan jurnal kapan pun.";
const privacy_export_point_1 = "Ekspor ke format JSON raw";
const privacy_export_point_2 = "Pembuatan instan, tidak perlu menunggu";
const privacy_export_code_comment = "Data Anda mutlak milik Anda.";
const privacy_faq_title = "Pertanyaan yang Sering Diajukan";
const privacy_faq_1_q = "Bisa tim Oneformind baca jurnal privat saya?";
const privacy_faq_1_a = "Tidak. Kami punya kontrol akses internal yang ketat. Kecuali Anda dengan sengaja mengirimkan log error ke tim support, jurnal Anda sepenuhnya privat.";
const privacy_faq_2_q = "Apakah kalian menjual data ke pengiklan?";
const privacy_faq_2_a = "Sama sekali tidak. Model bisnis kami adalah membuat alat produktivitas hebat, bukan menjadi makelar data.";
const privacy_faq_3_q = "Bagaimana cara menghapus akun saya?";
const privacy_faq_3_a = "Anda bisa menghapus akun permanen dari menu Pengaturan Profil di dalam dashboard. Tindakan ini akan menyapu bersih semua data Anda dari server kami.";
const privacy_cta_title = "Siap ambil kendali?";
const privacy_cta_desc = "Bergabunglah dengan ribuan orang yang mempercayakan rutinitas produktifnya pada OneForMind.";
const privacy_cta_btn = "Mulai Perjalanan Anda";
const terms_meta_title = "Ketentuan Layanan - Aturan Main";
const terms_meta_desc = "Baca aturan mengenai penggunaan OneForMind. Ketentuan layanan yang jelas, transparan, dan adil.";
const terms_meta_og_title = "Ketentuan Layanan OneForMind";
const terms_meta_og_desc = "Perjanjian antara Anda dan OneForMind.";
const terms_badge = "Dokumen Legal";
const terms_title_1 = "Aturan";
const terms_title_2 = "Penggunaan";
const terms_subtitle = "Dengan menggunakan OneForMind, Anda menyetujui ketentuan ini. Anggap ini sebagai jabat tangan sebelum kita mulai membangun sistem produktivitas Anda.";
const terms_effective_date = "Efektif: 18 Feb 2026";
const terms_nav_title = "Daftar Isi";
const terms_intro_text = "Selamat datang di OneForMind. Ketentuan Layanan ini ('Ketentuan') mengatur akses dan penggunaan layanan kami oleh Anda.";
const terms_intro_sub = "Mohon baca dengan saksama. Dengan mengakses layanan kami, Anda setuju untuk terikat oleh Ketentuan ini. Jika Anda tidak setuju, Anda tidak diperkenankan menggunakan Layanan.";
const terms_h2_eligibility = "2. Syarat Pengguna";
const terms_p_eligibility = "Layanan kami bukan untuk semua orang. Demi keamanan, Anda harus memenuhi kriteria berikut:";
const terms_eligibility_1 = "Berusia minimal 13 tahun";
const terms_eligibility_2 = "Bukan robot (Hanya manusia asli)";
const terms_h2_rules = "3. Kode Etik";
const terms_p_rules = "Kami mendukung produktivitas, bukan kekacauan. Saat menggunakan OneForMind, Anda setuju untuk mematuhi aturan.";
const terms_rules_do_title = "Anda Harus";
const terms_rules_do_1 = "Menggunakan aplikasi untuk melacak data pribadi.";
const terms_rules_do_2 = "Menjaga kerahasiaan password Anda.";
const terms_rules_do_3 = "Melakukan ekspor data rutin untuk cadangan.";
const terms_rules_dont_title = "Anda Dilarang";
const terms_rules_dont_1 = "Mencoba meretas atau reverse engineer API kami.";
const terms_rules_dont_2 = "Menggunakan layanan untuk aktivitas ilegal.";
const terms_rules_dont_3 = "Berbagi akun dengan banyak orang (sharing account).";
const terms_h2_payment = "4. Pembayaran & Langganan";
const terms_p_payment = "Beberapa fitur OneForMind ditagih berdasarkan langganan. Anda akan ditagih di muka secara berulang dan berkala.";
const terms_li_payment_1_title = "Uji Coba Gratis";
const terms_li_payment_1_desc = "Anda mungkin diminta memasukkan informasi penagihan untuk mendaftar Uji Coba Gratis.";
const terms_li_payment_2_title = "Pengembalian Dana";
const terms_li_payment_2_desc = "Permintaan refund tertentu dapat dipertimbangkan oleh OneForMind berdasarkan kasus per kasus.";
const terms_h2_termination = "5. Penghentian Akun";
const terms_p_termination = "Kami dapat menghentikan atau menangguhkan akun Anda segera, tanpa pemberitahuan sebelumnya, jika Anda melanggar Ketentuan ini.";
const terms_h2_liability = "6. Batasan Tanggung Jawab";
const terms_legal_caps = "DALAM KEADAAN APA PUN ONEFORMIND, DIREKTUR, KARYAWAN, ATAU MITRANYA TIDAK BERTANGGUNG JAWAB ATAS KERUGIAN TIDAK LANGSUNG, INSIDENTAL, ATAU HUKUMAN AKIBAT PENGGUNAAN LAYANAN.";
const terms_cta_title = "Siap memulai?";
const terms_cta_desc = "Dengan mengklik 'Saya Setuju & Daftar', Anda mengakui bahwa Anda telah membaca dan memahami ketentuan ini.";
const terms_cta_btn_agree = "Saya Setuju & Daftar";
const terms_cta_btn_decline = "Saya Menolak";
const terms_cta_note = "Mengklik 'Saya Menolak' akan mengembalikan Anda ke halaman utama.";
const stories_meta_title = "Cerita Pengguna & Inspirasi - OneForMind";
const stories_meta_desc = "Dengarkan kisah nyata dari mereka yang telah mengubah hidup, mengelola keuangan, dan membangun kebiasaan baru bersama OneForMind.";
const stories_meta_og_title = "Kisah Sukses OneForMind";
const stories_meta_og_desc = "Inspirasi nyata dari pengguna yang berhasil menguasai waktu dan pikiran.";
const stories_hero_badge = "Social Proof";
const stories_hero_title_1 = "Kisah Nyata,";
const stories_hero_title_2 = "Hasil Luar Biasa.";
const stories_hero_desc = "OneForMind bukan sekadar aplikasi, ini adalah ruang di mana ribuan orang mulai mengambil kendali atas hidup mereka kembali.";
const stories_main_quote = "Aplikasi ini adalah 'otak kedua' saya.";
const stories_main_body = "Membangun Sharesa Studio sambil kuliah semester akhir itu gila. Tanpa sistem yang menyatukan habit, finansial, dan planner di satu tempat, saya mungkin sudah menyerah sejak lama.";
const stories_wall_title = "Wall of Love";
const stories_wall_desc = "Pesan cinta dan cerita singkat dari komunitas pengguna kami.";
const stories_user_1_text = "Dulu saya mencatat keuangan di 3 aplikasi berbeda. Sekarang cukup di OneForMind. Simpel, bersih, dan sangat membantu mahasiswa.";
const stories_user_2_text = "Gila banget fitur Planner-nya! Sangat membantu tim sosmed saya koordinasi campaign tanpa harus ribet buka excel lagi.";
const stories_user_3_text = "Sebagai desainer freelance, menjaga mood itu susah. Fitur Zen Mode di Journal benar-benar penyelamat kesehatan mental saya.";
const stories_user_4_text = "Berhasil 100 hari streak olahraga berkat pengingat habit-nya. Perubahan hidup paling nyata yang pernah saya alami.";
const stories_stat_1 = "Pengguna Aktif";
const stories_stat_2 = "Tugas Diselesaikan";
const stories_stat_3 = "Tingkat Kepuasan";
const stories_stat_4 = "Rating Rata-rata";
const stories_cta_title = "Punya Cerita Menarik?";
const stories_cta_desc = "Bagikan bagaimana OneForMind membantu harimu. Kami ingin mendengar pencapaian kecil maupun besar milikmu.";
const stories_cta_btn = "Kirim Ceritamu";
const stories_cta_note = "Kami akan mengirimkan merch eksklusif untuk cerita terpilih.";
const pricing_meta_title = "Harga | Pilih Jalur Perkembangan Anda";
const pricing_meta_desc = "Harga sederhana dan transparan untuk OneForMind. Pilih paket yang sesuai dengan kebutuhan produktivitas Anda.";
const pricing_meta_og_title = "Harga OneForMind — Investasi pada Diri Sendiri";
const pricing_badge = "Pilihan Paket";
const pricing_title_1 = "Investasi pada";
const pricing_title_2 = "Diri Sendiri.";
const pricing_subtitle = "Tanpa biaya tersembunyi. Tanpa tingkat yang rumit. Pilih sistem yang tumbuh bersama kebiasaan dan tujuan Anda.";
const pricing_monthly = "Bulanan";
const pricing_yearly = "Tahunan";
const pricing_save_amount = "Hemat 25%";
const pricing_free_name = "Explorer";
const pricing_forever = "selamanya";
const pricing_free_desc = "Cocok untuk pemula yang ingin mulai melacak habit dan keuangan dasar.";
const pricing_feat_habits_limit = "Hingga 5 Habit Aktif";
const pricing_feat_finance_basic = "Pelacak Keuangan Dasar";
const pricing_free_btn = "Mulai Gratis";
const pricing_pro_name = "Architect";
const pricing_pro_badge = "Paling Populer";
const pricing_month = "bln";
const pricing_billed_annually = "Ditagih tahunan";
const pricing_pro_desc = "Untuk pengguna tingkat lanjut yang ingin wawasan mendalam dan alat tanpa batas.";
const pricing_feat_unlimited_habits = "Pelacakan Habit Tanpa Batas";
const pricing_feat_ai_insights = "Wawasan Keuangan AI";
const pricing_feat_custom_themes = "Tema UI Kustom";
const pricing_pro_btn = "Mulai Sekarang";
const pricing_life_name = "Mind Master";
const pricing_once = "sekali";
const pricing_life_desc = "Investasi terbaik. Bayar sekali, miliki seluruh sistem selamanya.";
const pricing_feat_lifetime_access = "Akses Fitur Seumur Hidup";
const pricing_feat_priority_support = "Dukungan Prioritas Discord";
const pricing_life_btn = "Beli Lifetime";
const pricing_compare_title = "Bandingkan Fitur";
const pricing_compare_subtitle = "Lihat detail apa saja yang Anda dapatkan di setiap paket.";
const pricing_feat_label = "Nama Fitur";
const pricing_trust_1_title = "Aman & Terlindungi";
const pricing_trust_1_desc = "Data Anda dienkripsi dan sepenuhnya privat. Kami tidak pernah menjual informasi Anda.";
const pricing_trust_2_title = "Sangat Cepat";
const pricing_trust_2_desc = "Dibuat dengan teknologi performa tinggi untuk memastikan alur kerja Anda tetap lancar.";
const pricing_trust_3_title = "Update Mingguan";
const pricing_trust_3_desc = "Kami merilis perbaikan dan fitur baru setiap minggu berdasarkan masukan pengguna.";
const pricing_faq_title = "Pertanyaan Umum";
const pricing_faq_1_q = "Bisakah saya ganti paket nanti?";
const pricing_faq_1_a = "Tentu saja! Anda bisa melakukan upgrade atau downgrade paket kapan saja melalui pengaturan akun.";
const pricing_faq_2_q = "Apakah ada jaminan uang kembali?";
const pricing_faq_2_a = "Ya, kami menawarkan kebijakan refund penuh 14 hari untuk paket Pro dan Lifetime jika Anda tidak puas.";
const pricing_bottom_cta_title = "Siap membangun hidup lebih baik?";
const pricing_bottom_cta_desc = "Bergabunglah dengan ratusan pengguna OneForMind untuk tetap fokus, teratur, dan produktif.";
const pricing_bottom_cta_btn = "Buat Akun Sekarang";
const notes_meta_title = "Notes App vs OneForMind — Stop Penimbunan Digital";
const notes_meta_desc = "Catatan biasa itu pasif. OneForMind itu aktif. Lihat perbedaannya dan berhenti menumpuk ide tanpa eksekusi.";
const notes_meta_og_title = "Aplikasi Catatanmu adalah Tempat Ide Mati.";
const notes_meta_og_desc = "Berhenti menumpuk ide di aplikasi catatan yang pasif. Beralih ke sistem yang memaksa eksekusi.";
const notes_badge = "Cek Realita";
const notes_hero_title_1 = "Kertas menerima tinta.";
const notes_hero_title_2 = "Tapi menolak tanggung jawab.";
const notes_hero_desc = "Aplikasi catatan hanyalah <strong>kuburan statis</strong> bagi ide brilianmu. Mereka tidak mengingatkanmu. Mereka tidak melacak progres. Mereka hanya diam.";
const notes_hero_cta = "Bangun Sistem Nyata";
const notes_hero_note = "Tanpa perlu kartu kredit.";
const notes_mockup_status = "Aktif";
const notes_mockup_title = "Mulai Bisnis";
const notes_mockup_deadline = "Deadline: Jumat Depan";
const notes_mockup_task_1 = "beli domain";
const notes_mockup_task_2 = "desain logo";
const notes_mockup_task_3 = "rencana marketing";
const notes_prob_title_1 = "Ini hanyalah";
const notes_prob_title_highlight = "Penimbunan Digital";
const notes_prob_desc = 'Mencatat terasa produktif, tapi itu jebakan. Tanpa sistem yang mengingatkanmu, "ide jutaan dolar" itu akan terkubur di bawah daftar belanjaan dan password wifi.';
const notes_prob_point_1 = "Tidak ada feedback loop (Bisu)";
const notes_prob_point_2 = "Tidak terhubung ke kalender";
const notes_prob_point_3 = "Mustahil melacak kemajuan";
const notes_chaos_title = "Catatan Tanpa Judul";
const notes_chaos_date = "Diedit 2024";
const notes_chaos_item_1 = "Beli susu";
const notes_chaos_item_2 = "Password Netflix: 1234...";
const notes_chaos_item_3 = "Mulai nge-gym!!";
const notes_chaos_item_4 = "Link: youtube.com/...";
const notes_chaos_item_5 = "Telpon Ibu";
const notes_chaos_badge = "Lupa ini?";
const notes_hub_finance = "Keuangan";
const notes_hub_goals = "Target";
const notes_hub_tracking = "Pelacakan Aktif";
const notes_hub_habits = "Habit Harian";
const notes_hub_connected = "Terhubung";
const notes_sol_title_1 = "Segalanya";
const notes_sol_title_highlight = "Terhubung";
const notes_sol_desc = "Berhenti memperlakukan hidupmu seperti daftar belanja. Di OneForMind, target bukan cuma teks. Ia terhubung ke kalender, kebiasaan, bahkan anggaranmu.";
const notes_sol_box_title = "Perbedaannya:";
const notes_sol_box_desc = 'Jika kamu ingin "Hemat Uang", catatan cuma diam saja. <br> <strong>OneForMind</strong> membuat anggaran, melacak pengeluaran, dan menunjukkan grafiknya.';
const notes_compare_title = "Bandingkan Logikanya";
const notes_compare_desc = "Kenapa beralih dari buku catatan ke OS mengubah segalanya.";
const notes_table_head_1 = "Fitur / Manfaat";
const notes_table_head_2 = "Catatan Biasa";
const notes_table_row_1_title = "Daya Tindak (Actionability)";
const notes_table_row_1_col_1 = "Nol (Teks Statis)";
const notes_table_row_1_col_2 = "Tinggi (Pelacak)";
const notes_table_row_2_title = "Faktor 'Cerewet'";
const notes_table_row_2_col_1 = "Bisu";
const notes_table_row_2_col_2 = "Pengingat Cerdas";
const notes_table_row_3_title = "Kejelasan Visual";
const notes_table_row_3_col_1 = "Tembok Teks";
const notes_table_row_3_col_2 = "Grafik & Dashboard";
const notes_table_row_4_title = "Hasil";
const notes_table_row_4_col_1 = "Penimbunan Digital";
const notes_table_row_4_col_2 = "Pertumbuhan Diri";
const notes_cta_title = "Berhenti mencatat.<br>Mulai membangun.";
const notes_cta_desc = "Pindahkan impianmu dari buku catatan ke sistem yang dirancang untuk mewujudkannya.";
const notes_cta_btn = "Mulai Sistem Gratis";
const notes_cta_sub = "Tersedia Paket Gratis Selamanya";
const notes_cycle_title = "Siklus Matinya Ide";
const notes_cycle_desc = "Bagaimana ide cemerlang berubah menjadi sampah digital.";
const notes_cycle_1_title = "Suntikan Dopamin";
const notes_cycle_1_desc = "Kamu dapat ide brilian. Rasanya hebat. Kamu cepat-cepat mencatatnya di folder 'Ide'.";
const notes_cycle_2_title = "Terkubur Masalah";
const notes_cycle_2_desc = "Besoknya, kamu mencatat belanjaan. Lalu password. Ide brilianmu terdorong ke bawah, hilang.";
const notes_cycle_3_title = "Masuk Kuburan";
const notes_cycle_3_desc = "6 bulan kemudian, kamu menemukannya. Momennya sudah lewat. Idenya sudah basi.";
const blank_cycle_title = "Jebakan 'Sok Produktif'";
const blank_cycle_desc = "Kenapa membangun sistem sendiri itu bentuk lain penundaan.";
const blank_cycle_1_title = "Mode Arsitek";
const blank_cycle_1_desc = "Kamu buka halaman kosong. 'Aku akan bangun sistem paling sempurna,' katamu.";
const blank_cycle_2_title = "Tersesat di Fitur";
const blank_cycle_2_desc = "5 jam kemudian, kamu masih nonton tutorial cara menyambungkan database dan rumus.";
const blank_cycle_3_title = "Rumah Hantu";
const blank_cycle_3_desc = "Sistemnya terlalu rumit dibuka di HP. Kamu berhenti memakainya setelah 3 hari.";
const blank_meta_title = "Notion & Excel vs OneForMind — Stop Jadi Tukang";
const blank_meta_desc = "Berhenti menghabiskan waktu mendesain dashboard. Gunakan sistem yang langsung siap pakai.";
const blank_meta_og_title = "Kamu bukan UI Designer. Stop berpura-pura.";
const blank_meta_og_desc = "Jangan habiskan 10 jam bikin tracker cuma buat dipake 10 menit. Pakai sistem beneran.";
const blank_badge = "Jebakan Produktivitas";
const blank_hero_title_1 = "Kamu itu Eksekutor.";
const blank_hero_title_2 = "Stop jadi Tukang.";
const blank_hero_desc = "Halaman kosong (seperti Notion atau Excel) memaksamu <strong>membuat aplikasi sendiri</strong>. Kamu buang waktu ngurusin font, warna, dan rumus, bukan mengejar impianmu.";
const blank_hero_cta = "Ambil Sistem Jadi";
const blank_hero_note = "Tanpa setup ribet.";
const blank_mockup_status = "Otomatis";
const blank_mockup_title = "Ringkasan Bulanan";
const blank_mockup_subtitle = "Data terhitung otomatis";
const blank_mockup_stat_1 = "Sisa Budget";
const blank_mockup_insight = "Keuangan aman!";
const blank_prob_title_1 = "Hati-hati";
const blank_prob_title_highlight = "Jebakan Builder";
const blank_prob_desc = "Mendesain dashboard cantik terasa produktif, tapi itu cuma penundaan (procrastination). Saat rumusnya error, produktivitasmu ikut error.";
const blank_prob_point_1 = "Waktu setup lama (Berjam-jam)";
const blank_prob_point_2 = "Sistem rapuh (Rumus error)";
const blank_prob_point_3 = "Ribet dibuka di HP";
const blank_chaos_badge = "5 Jam cuma buat ginian?";
const blank_hub_finance = "Keuangan";
const blank_hub_focus = "Fokus";
const blank_hub_ready = "Siap Pakai";
const blank_hub_system = "Sistem Hidup";
const blank_hub_automated = "Otomatis";
const blank_sol_title_1 = "Sistem diatas";
const blank_sol_title_highlight = "Sintaks";
const blank_sol_desc = "Kamu nggak perlu jago coding rumus cuma buat nyatet habit. OneForMind memberimu struktur yang teruji biar kamu fokus eksekusi, bukan konfigurasi.";
const blank_sol_box_title = "Realitanya:";
const blank_sol_box_desc = "Di Notion, kamu harus bikin database, relasi, dan tampilan sendiri. <br> <strong>OneForMind</strong> sudah siap sejak detik pertama kamu daftar.";
const blank_compare_title = "Logika vs Lego";
const blank_compare_desc = "Kenapa OS terdedikasi mengalahkan sekotak balok lego.";
const blank_table_head_1 = "Perbandingan";
const blank_table_head_2 = "Workspace Kosong";
const blank_table_row_1_title = "Waktu Setup";
const blank_table_row_1_col_1 = "Berjam-jam";
const blank_table_row_1_col_2 = "Instan (0 detik)";
const blank_table_row_2_title = "Struktur";
const blank_table_row_2_col_1 = "Bikin Sendiri (DIY)";
const blank_table_row_2_col_2 = "Sistem Teruji";
const blank_table_row_3_title = "Pengalaman Mobile";
const blank_table_row_3_col_1 = "Ribet / Lambat";
const blank_table_row_3_col_2 = "Rasa Aplikasi Native";
const blank_table_row_4_title = "Tujuan";
const blank_table_row_4_col_1 = "Bikin Tools";
const blank_table_row_4_col_2 = "Menyelesaikan Kerja";
const blank_cta_title = "Stop konfigurasi.<br>Mulai berprestasi.";
const blank_cta_desc = "Hidupmu bukan proyek database. Gunakan alat yang menghargai waktumu.";
const blank_cta_btn = "Gunakan Sistem Jadi";
const blank_cta_sub = "Tersedia Paket Gratis Selamanya";
const pm_meta_title = "ClickUp, Trello & Monday vs OneForMind — Stop Ribet Sendiri";
const pm_meta_desc = "Project management tools itu buat tim, bukan individu. Berhenti bayar fitur yang tidak kamu butuhin. Ganti ke OS personal growth.";
const pm_meta_og_title = "Kamu bukan Perusahaan Tbk. Tidak usah sok ribet.";
const pm_meta_og_desc = "Kenapa pake alat korporat buat hidup pribadi? Pake sistem yang emang buat KAMU.";
const pm_badge = "Jebakan Korporat";
const pm_hero_title_1 = "Kamu itu Manusia.";
const pm_hero_title_2 = "Bukan Proyek Kantor.";
const pm_hero_desc = "Tools kayak <strong>ClickUp, Monday, atau Asana</strong> dibuat buat bos memantau karyawan. Kalau kamu pake sendiri, kamu cuma micromanaging diri sendiri pake software berat.";
const pm_hero_cta = "Fokus ke Diri Sendiri";
const pm_hero_note = "Tidak ada harga 'Per User'.";
const pm_mockup_status = "Fokus";
const pm_mockup_title = "Visi Saya";
const pm_mockup_desc = "Nol gangguan.";
const pm_mockup_item_1 = "Habit Selesai";
const pm_mockup_item_2 = "Jurnal Tertulis";
const pm_mockup_item_3 = "Deep Work";
const pm_cycle_title = "Kelelahan 'Manajer'";
const pm_cycle_desc = "Kenapa memperlakukan hidup kayak tiket JIRA itu menyiksa jiwa.";
const pm_cycle_1_title = "Fantasi CEO";
const pm_cycle_1_desc = "Kamu setup Trello atau ClickUp. Bikin kolom, tag, dan assign tugas ke diri sendiri. Berasa jadi bos besar.";
const pm_cycle_2_title = "Neraka Input Data";
const pm_cycle_2_desc = "Setiap tugas butuh status, prioritas, dan deadline. Kamu abis waktu ngurusin tiket daripada ngerjain tugasnya.";
const pm_cycle_3_title = "Burnout";
const pm_cycle_3_desc = "Notifikasi numpuk. Tampilan terlalu rumit. Kamu nyerah dan balik lagi ke kertas.";
const pm_prob_title_1 = "Menderita karena";
const pm_prob_title_highlight = "Obesitas Fitur";
const pm_prob_desc = "Gantt chart? Dependencies? Izin tim? Kamu tidak butuh itu semua. Fitur-fitur itu cuma nambah gesekan antara kamu dan tujuan kamu.";
const pm_prob_point_1 = "Desain buat Tim (Bukan Kamu)";
const pm_prob_point_2 = "Spam Notifikasi";
const pm_prob_point_3 = "UI Lambat & Berat";
const pm_hub_you = "Kamu";
const pm_hub_vision = "Visi";
const pm_hub_yours = "Punya kamu";
const pm_hub_growth = "Tumbuh";
const pm_hub_private = "Pribadi";
const pm_sol_title_1 = "Ambil Alih";
const pm_sol_title_highlight = "Kendali";
const pm_sol_desc = "OneForMind adalah Personal OS. Tidak ada chat tim, tidak ada 'assignee', tidak ada berisik. Cuma ruang bersih buat habit, duit, dan tujuan kamu.";
const pm_sol_box_title = "Coba pikir deh:";
const pm_sol_box_desc = "Kenapa kamu harus 'Assign' tugas ke diri sendiri? <br> Di <strong>OneForMind</strong>, semuanya otomatis punya kamu.";
const pm_compare_title = "Bloatware vs. Growthware";
const pm_compare_desc = "Bedanya mengatur orang lain vs memimpin diri sendiri.";
const pm_table_head_1 = "Perbandingan";
const pm_table_head_2 = "PM Tools (ClickUp/Asana)";
const pm_table_row_1_title = "Fokus Utama";
const pm_table_row_1_col_1 = "Kolaborasi Tim";
const pm_table_row_1_col_2 = "Pertumbuhan Diri";
const pm_table_row_2_title = "Kompleksitas";
const pm_table_row_2_col_1 = "Enterprise / Tinggi";
const pm_table_row_2_col_2 = "Minimalis / Zen";
const pm_table_row_3_title = "Gaya Notifikasi";
const pm_table_row_3_col_1 = "Berisik (Spam Email)";
const pm_table_row_3_col_2 = "Tenang & Intensional";
const pm_table_row_4_title = "Model Biaya";
const pm_table_row_4_col_1 = "Bayar Per User";
const pm_table_row_4_col_2 = "Gratis Selamanya";
const pm_cta_title = "Pecat manajermu.<br>Jadilah pemimpin.";
const pm_cta_desc = "Berhenti laporan ke software. Mulai gunakan sistem yang memberdayakanmu.";
const pm_cta_btn = "Pimpin Diri Sendiri";
const pm_cta_sub = "Tanpa Kartu Kredit";
const habitap_meta_title = "Sistem Habit - OneForMind";
const habitap_meta_desc = "Ubah habit jadi gaya hidup. OneForMind bantu kamu bangun identitas yang bertahan lama, bukan sekadar mengejar streak.";
const habitap_meta_og_title = "Bangun Habit Lebih Baik dengan OneForMind";
const habitap_meta_og_desc = "Tracker habit yang didesain untuk pertumbuhan nyata, bukan sekadar hadiah pixel.";
const habitap_badge = "Sistem Habit Atom";
const habitap_hero_title_1 = "Bangun Identitas,";
const habitap_hero_title_2 = "Bukan Cuma Streak.";
const habitap_hero_desc = "Banyak habit app terasa kayak game. OneForMind terasa kayak <strong>pertumbuhan nyata.</strong> Fokus pada siapa dirimu nanti.";
const habitap_hero_cta = "Buat Habit Pertama";
const habitap_hero_note = "Gratis selamanya untuk 3 habit.";
const habitap_mockup_status = "Streak: 12 Hari";
const habitap_mockup_title = "Identitas: Atlet";
const habitap_mockup_desc = "Lari Pagi 5km";
const habitap_mockup_stat_1 = "Progres Atom";
const habitap_mockup_stat_2 = "1% lebih baik hari ini";
const habitap_cycle_title = "Jebakan Gamifikasi";
const habitap_cycle_desc = "Kenapa sistem streak malah nyakitin kamu.";
const habitap_cycle_1_title = "Dopamin Sesaat";
const habitap_cycle_1_desc = "Seneng liat angka dan badge pixel yang berkilau.";
const habitap_cycle_2_title = "Kecemasan";
const habitap_cycle_2_desc = "Takut kehilangan streak kalau skip satu hari.";
const habitap_cycle_3_title = "Burnout";
const habitap_cycle_3_desc = "Streak putus. Motivasi mati. Kamu nyerah.";
const habitap_prob_title_1 = "Jangan Jadi";
const habitap_prob_title_highlight = "Budak Streak";
const habitap_prob_desc = "Habit harusnya melayani kamu, bukan menekan kamu.";
const habitap_prob_point_1 = "Demotivasi setelah skip satu hari";
const habitap_prob_point_2 = "Fokus ke kuantitas bukan kualitas";
const habitap_prob_point_3 = "Gak nyambung ke tujuan jangka panjang";
const habitap_sol_title_1 = "Sistem di Atas";
const habitap_sol_title_highlight = "Motivasi";
const habitap_sol_desc = "Kami pake aturan 'Jangan Pernah Skip Dua Kali' biar kamu konsisten.";
const habitap_sol_1_title = "Pertumbuhan Organik";
const habitap_sol_1_desc = "Fokus ke sosok yang ingin kamu capai.";
const habitap_sol_2_title = "Sinkronisasi Target";
const habitap_sol_2_desc = "Hubungkan habit langsung ke tujuan hidupmu.";
const habitap_sol_3_title = "Insight Mendalam";
const habitap_sol_3_desc = "Data yang bercerita, bukan cuma angka.";
const habitap_compare_title = "Game vs. Realita";
const habitap_compare_desc = "Jangan main-main dengan hidupmu. Bangun secara nyata.";
const habitap_table_head_2 = "Habitica / Lainnya";
const habitap_table_row_1_title = "Tujuan Utama";
const habitap_table_row_1_col_1 = "Naikin Level Avatar";
const habitap_table_row_1_col_2 = "Naikin Level Diri";
const habitap_table_row_2_title = "Skip Satu Hari?";
const habitap_table_row_2_col_1 = "Hukuman & Rasa Bersalah";
const habitap_table_row_2_col_2 = "Adaptasi & Pulih";
const habitap_table_row_3_title = "Pola Pikir";
const habitap_table_row_3_col_1 = "Kecanduan Streak";
const habitap_table_row_3_col_2 = "Pertumbuhan Atom";
const habitap_cta_title = "Berhenti main game. <br/>Mulai bertumbuh.";
const habitap_cta_desc = "Bangun identitas yang bertahan lebih lama dari sekadar hati pixel.";
const habitap_cta_btn = "Bangun Sistem Habitmu";
const habitap_cta_sub = "Tanpa paksaan streak. Cuma pertumbuhan.";
const hero_badge$1 = "✨ v1.0: Sistem Anti-Burnout";
const hero_title_1$1 = "Satu Sistem.";
const seo_meta_desc_1 = "Oneformind adalah pelacak produktivitas all-in-one yang menggabungkan manajemen keuangan, pelacak kebiasaan (habit), dan perencanaan harian secara efisien.";
const footer_rights$1 = "© 2026 Oneformind. All rights reserved.";
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
const about_badge$1 = "About us";
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
const journal_title = "Jurnal Saya";
const journal_subtitle = "Rekam jejak pikiran dan perasaanmu setiap hari.";
const journal_tasks = "Tugas";
const journal_habit = "Habit";
const journal_habit_done = "Selesai";
const journal_expense = "Keluar";
const journal_history = "Riwayat Cerita";
const journal_add = "Tambah Jurnal";
const journal_empty_title = "Belum ada cerita.";
const journal_empty_subtitle = "Mulai tulis jurnal pertamamu hari ini!";
const journal_untitled = "Cerita Hari Ini";
const journal_no_content = "Tidak ada teks...";
const journal_confirm_delete = "Hapus Jurnal?";
const journal_delete_warn = "Data ini akan hilang selamanya.";
const btn_back_dashboard = "Kembali ke Dashboard";
const status_saving = "Menyimpan...";
const status_saved = "Tersimpan";
const btn_save_manual = "Simpan";
const journal_mood_label = "Mood Hari Ini:";
const journal_add_photo = "Sisipkan Foto Jurnal";
const journal_write_placeholder = "Mulai menulis cerita harimu...";
const journal_title_placeholder = "Beri judul harimu...";
const status_deleted = "Berhasil Dihapus!";
const status_image_saved = "Gambar Tersimpan!";
const status_image_deleted = "Gambar Dihapus!";
const calendar_more = "lagi";
const journal_filled = "Jurnal telah ditulis";
const calendar_tasks = "Tugas";
const calendar_expense = "Pengeluaran";
const habit_completed = "Habit selesai";
const calendar_day_summary = "Rangkuman Hari";
const calendar_events_schedule = "Acara / Jadwal";
const calendar_no_events = "Tidak ada acara hari ini.";
const btn_edit = "Edit";
const calendar_life_os_summary = "Rangkuman Life OS";
const calendar_journal = "Jurnal";
const calendar_journal_written = "✓ Sudah Ditulis";
const calendar_empty = "Kosong";
const calendar_daily_tasks = "Tugas Harian";
const calendar_tasks_done = "Selesai";
const calendar_no_tasks = "Tidak ada tugas";
const calendar_habits = "Habit";
const calendar_habits_done = "Tuntas";
const calendar_title = "Master Kalender";
const calendar_subtitle = "Pantau semua aktivitasmu";
const calendar_new_event = "Acara Baru";
const calendar_edit_event = "Edit Acara";
const label_title = "Judul Acara";
const label_start_date = "Mulai";
const label_end_date = "Selesai (Opsional)";
const label_color = "Warna Label";
const label_description = "Catatan Tambahan";
const ph_event_title = "Cth: Rapat BEM";
const ph_event_desc = "Tulis detail acara di sini...";
const btn_add_event = "Acara";
const color_indigo = "Indigo";
const color_sky = "Langit";
const color_emerald = "Zamrud";
const color_amber = "Kuning";
const color_rose = "Mawar";
const color_purple = "Ungu";
const calendar_expense_short = "Keluar";
const calendar_expense_label = "Pengeluaran";
const calendar_no_events_title = "Hari yang Kosong";
const calendar_no_events_desc = "Belum ada acara yang dijadwalkan untuk hari ini.";
const calendar_today = "Hari Ini";
const calendar_open = "Buka";
const calendar_more_events = "acara lain";
const calendar_focus = "Fokus";
const calendar_events = "Events";
const calendar_planner = "Planner";
const calendar_finance = "Finance";
const calendar_journal_short = "Journal";
const calendar_habits_short = "Habit";
const calendar_tasks_short = "Tasks";
const id = {
  "____ SECTION_1 ____": "=== NAVIGASI & GLOBAL ===",
  nav_home: nav_home$1,
  nav_about: nav_about$1,
  nav_login: nav_login$1,
  nav_register: nav_register$1,
  nav_dashboard: nav_dashboard$1,
  nav_settings,
  nav_logout,
  nav_features,
  nav_solutions,
  nav_resources,
  nav_pricing,
  modal_logout_title,
  modal_logout_subtitle,
  modal_logout_confirm,
  modal_logout_cancel,
  seo_about_desc,
  footer_legal,
  legal_title,
  legal_ref,
  privacy_title,
  privacy_p1,
  privacy_consent_title,
  privacy_consent_p,
  privacy_info_title,
  privacy_info_p,
  tos_title,
  tos_intro,
  tos_service_title,
  tos_service_p,
  tos_data_title,
  tos_data_p,
  tos_security_title,
  tos_security_p,
  tos_termination_title,
  tos_termination_p,
  legal_close,
  "____ SECTION_1 ____HABIT": "=== HABIT ===",
  habit_meta_title,
  habit_meta_desc,
  habit_meta_og_title,
  habit_meta_og_desc,
  habit_hero_badge,
  habit_hero_title_1,
  habit_hero_title_2,
  habit_hero_desc,
  habit_hero_cta_1,
  habit_hero_cta_2,
  habit_mockup_title,
  habit_mockup_streak,
  habit_mockup_task_1,
  habit_mockup_time_1,
  habit_mockup_task_2,
  habit_mockup_time_2,
  habit_mockup_task_3,
  habit_mockup_time_3,
  habit_mockup_alert_1,
  habit_mockup_alert_2,
  habit_prob_title_1,
  habit_prob_title_strike,
  habit_prob_title_2,
  habit_prob_1_title,
  habit_prob_1_desc,
  habit_prob_2_title,
  habit_prob_2_desc,
  habit_prob_3_title,
  habit_prob_3_desc,
  habit_feature_1_title,
  habit_feature_1_desc,
  habit_feature_1_point_1,
  habit_feature_1_point_2,
  habit_feature_2_title,
  habit_feature_2_desc,
  habit_feature_2_point_1,
  habit_feature_2_point_2,
  habit_bento_title,
  habit_bento_desc,
  habit_bento_1_title,
  habit_bento_1_desc,
  habit_bento_2_title,
  habit_bento_2_desc,
  habit_bento_3_title,
  habit_bento_3_desc,
  habit_bento_4_title,
  habit_bento_4_desc,
  habit_quote_text,
  habit_quote_author,
  habit_cta_title,
  habit_cta_desc,
  habit_cta_btn,
  habit_cta_note,
  finance_meta_title,
  finance_meta_desc,
  finance_meta_og_title,
  finance_meta_og_desc,
  finance_hero_badge,
  finance_hero_title_1,
  finance_hero_title_2,
  finance_hero_desc,
  finance_hero_cta_1,
  finance_hero_cta_2,
  finance_mockup_title,
  finance_mockup_balance,
  finance_mockup_task_1,
  finance_mockup_time_1,
  finance_mockup_task_2,
  finance_mockup_time_2,
  finance_mockup_task_3,
  finance_mockup_time_3,
  finance_mockup_alert_1,
  finance_mockup_alert_2,
  finance_prob_title_1,
  finance_prob_title_strike,
  finance_prob_title_2,
  finance_prob_1_title,
  finance_prob_1_desc,
  finance_prob_2_title,
  finance_prob_2_desc,
  finance_prob_3_title,
  finance_prob_3_desc,
  finance_feature_1_title,
  finance_feature_1_desc,
  finance_feature_1_point_1,
  finance_feature_1_point_2,
  finance_feature_2_title,
  finance_feature_2_desc,
  finance_feature_2_point_1,
  finance_feature_2_point_2,
  finance_bento_title,
  finance_bento_desc,
  finance_bento_1_title,
  finance_bento_1_desc,
  finance_bento_2_title,
  finance_bento_2_desc,
  finance_bento_3_title,
  finance_bento_3_desc,
  finance_bento_4_title,
  finance_bento_4_desc,
  finance_privacy_title,
  finance_privacy_desc,
  finance_privacy_point_1_title,
  finance_privacy_point_1_desc,
  finance_privacy_point_2_title,
  finance_privacy_point_2_desc,
  finance_privacy_point_3_title,
  finance_privacy_point_3_desc,
  finance_quote_text,
  finance_quote_author,
  finance_cta_title,
  finance_cta_desc,
  finance_cta_btn,
  finance_cta_note,
  planner_meta_title,
  planner_meta_desc,
  planner_meta_og_title,
  planner_meta_og_desc,
  planner_hero_badge,
  planner_hero_title_1,
  planner_hero_title_2,
  planner_hero_desc,
  planner_hero_cta_1,
  planner_hero_cta_2,
  planner_mockup_title,
  planner_mockup_status,
  planner_mockup_task_1,
  planner_mockup_time_1,
  planner_mockup_task_2,
  planner_mockup_time_2,
  planner_mockup_task_3,
  planner_mockup_time_3,
  planner_mockup_alert_1,
  planner_mockup_alert_2,
  planner_prob_title_1,
  planner_prob_title_strike,
  planner_prob_title_2,
  planner_prob_1_title,
  planner_prob_1_desc,
  planner_prob_2_title,
  planner_prob_2_desc,
  planner_prob_3_title,
  planner_prob_3_desc,
  planner_feature_1_title,
  planner_feature_1_desc,
  planner_feature_1_point_1,
  planner_feature_1_point_2,
  planner_feature_2_title,
  planner_feature_2_desc,
  planner_feature_2_point_1,
  planner_feature_2_point_2,
  planner_bento_title,
  planner_bento_desc,
  planner_bento_1_title,
  planner_bento_1_desc,
  planner_bento_2_title,
  planner_bento_2_desc,
  planner_bento_3_title,
  planner_bento_3_desc,
  planner_bento_4_title,
  planner_bento_4_desc,
  planner_quote_text,
  planner_quote_author,
  planner_cta_title,
  planner_cta_desc,
  planner_cta_btn,
  planner_cta_note,
  planner_mechanism_1_title,
  planner_mechanism_1_desc,
  journal_meta_title,
  journal_meta_desc,
  journal_meta_og_title,
  journal_meta_og_desc,
  journal_hero_badge,
  journal_hero_title_1,
  journal_hero_title_2,
  journal_hero_desc,
  journal_hero_cta_1,
  journal_hero_cta_2,
  journal_mockup_title,
  journal_mockup_date,
  journal_mockup_text_1,
  journal_mockup_text_2,
  journal_mockup_typing,
  journal_prob_title_1,
  journal_prob_title_strike,
  journal_prob_title_2,
  journal_prob_main_desc,
  journal_prob_1_title,
  journal_prob_1_desc,
  journal_prob_2_title,
  journal_prob_2_desc,
  journal_prob_3_title,
  journal_prob_3_desc,
  journal_feature_1_title,
  journal_feature_1_desc,
  journal_feature_1_point_1,
  journal_feature_1_point_2,
  journal_feature_2_title,
  journal_feature_2_desc,
  journal_feature_2_point_1,
  journal_feature_2_point_2,
  journal_bento_title,
  journal_bento_desc,
  journal_bento_1_title,
  journal_bento_1_desc,
  journal_bento_2_title,
  journal_bento_2_desc,
  journal_bento_3_title,
  journal_bento_3_desc,
  journal_quote_text,
  journal_quote_author,
  journal_cta_title,
  journal_cta_desc,
  journal_cta_btn,
  journal_cta_note,
  calendar_meta_title,
  calendar_meta_desc,
  calendar_meta_og_title,
  calendar_meta_og_desc,
  calendar_hero_badge,
  calendar_hero_title_1,
  calendar_hero_title_2,
  calendar_hero_desc,
  calendar_hero_cta_1,
  calendar_hero_cta_2,
  calendar_mockup_month,
  calendar_mockup_today,
  calendar_mockup_date,
  calendar_mockup_event_1,
  calendar_mockup_event_1_time,
  calendar_mockup_location_1,
  calendar_mockup_event_2,
  calendar_mockup_event_2_time,
  calendar_mockup_location_2,
  calendar_mockup_event_3,
  calendar_mockup_event_3_time,
  calendar_mockup_location_3,
  calendar_mockup_alert_1,
  calendar_mockup_alert_2,
  calendar_prob_title_1,
  calendar_prob_title_strike,
  calendar_prob_title_2,
  calendar_prob_1_title,
  calendar_prob_1_desc,
  calendar_prob_2_title,
  calendar_prob_2_desc,
  calendar_prob_3_title,
  calendar_prob_3_desc,
  calendar_feature_1_title,
  calendar_feature_1_desc,
  calendar_feature_2_title,
  calendar_feature_2_desc,
  calendar_feature_2_point_1,
  calendar_feature_2_point_2,
  calendar_bento_title,
  calendar_bento_desc,
  calendar_bento_1_title,
  calendar_bento_1_desc,
  calendar_bento_2_title,
  calendar_bento_2_desc,
  calendar_bento_3_title,
  calendar_bento_3_desc,
  calendar_bento_4_title,
  calendar_bento_4_desc,
  calendar_quote_text,
  calendar_quote_author,
  calendar_cta_title,
  calendar_cta_desc,
  calendar_cta_btn,
  calendar_cta_note,
  student_meta_title,
  student_meta_desc,
  student_meta_og_title,
  student_meta_og_desc,
  student_hero_badge,
  student_hero_title_1,
  student_hero_title_2,
  student_hero_desc,
  student_hero_cta_1,
  student_hero_social_proof,
  student_prob_title,
  student_prob_desc,
  student_prob_1_title,
  student_prob_1_desc,
  student_prob_2_title,
  student_prob_2_desc,
  student_prob_3_title,
  student_prob_3_desc,
  student_feat_1_visual_badge,
  student_feat_1_title,
  student_feat_1_desc,
  student_feat_1_point_1,
  student_feat_1_point_2,
  student_feat_2_title,
  student_feat_2_desc,
  student_feat_2_point_1,
  student_feat_2_point_2,
  student_bento_title,
  student_bento_desc,
  student_bento_1_title,
  student_bento_1_desc,
  student_bento_2_title,
  student_bento_2_desc,
  student_bento_3_title,
  student_bento_3_desc,
  student_cta_title,
  student_cta_desc,
  student_cta_btn,
  student_cta_note,
  freelance_meta_title,
  freelance_meta_desc,
  freelance_meta_og_title,
  freelance_meta_og_desc,
  freelance_hero_badge,
  freelance_hero_title_1,
  freelance_hero_title_2,
  freelance_hero_desc,
  freelance_hero_cta_1,
  freelance_hero_social_proof,
  freelance_prob_title,
  freelance_prob_desc,
  freelance_prob_1_title,
  freelance_prob_1_desc,
  freelance_prob_2_title,
  freelance_prob_2_desc,
  freelance_prob_3_title,
  freelance_prob_3_desc,
  freelance_feat_1_title,
  freelance_feat_1_desc,
  freelance_feat_1_point_1,
  freelance_feat_1_point_2,
  freelance_feat_2_title,
  freelance_feat_2_desc,
  freelance_feat_2_point_1,
  freelance_feat_2_point_2,
  freelance_bento_title,
  freelance_bento_desc,
  freelance_bento_1_title,
  freelance_bento_1_desc,
  freelance_bento_2_title,
  freelance_bento_2_desc,
  freelance_bento_3_title,
  freelance_bento_3_desc,
  freelance_bento_4_title,
  freelance_bento_4_desc,
  freelance_cta_title,
  freelance_cta_desc,
  freelance_cta_btn,
  freelance_cta_note,
  growth_meta_title,
  growth_meta_desc,
  growth_meta_og_title,
  growth_meta_og_desc,
  growth_hero_badge,
  growth_hero_title_1,
  growth_hero_title_2,
  growth_hero_desc,
  growth_hero_cta_1,
  growth_hero_social_proof,
  growth_prob_title_dark,
  growth_prob_desc_dark,
  growth_prob_point_1,
  growth_prob_point_2,
  growth_prob_title_light,
  growth_prob_desc_light,
  growth_prob_point_3,
  growth_prob_point_4,
  growth_feat_1_title,
  growth_feat_1_desc,
  growth_feat_1_point_1,
  growth_feat_1_point_2,
  growth_feat_2_title,
  growth_feat_2_desc,
  growth_feat_2_quote_title,
  growth_feat_2_quote_body,
  growth_bento_title,
  growth_bento_desc,
  growth_bento_1_title,
  growth_bento_1_desc,
  growth_bento_2_title,
  growth_bento_2_desc,
  growth_bento_3_title,
  growth_bento_3_desc,
  growth_bento_4_title,
  growth_bento_4_desc,
  growth_bento_5_title,
  growth_bento_5_desc,
  growth_cta_title,
  growth_cta_desc,
  growth_cta_btn,
  growth_cta_note,
  guide_meta_title,
  guide_meta_desc,
  guide_meta_og_title,
  guide_meta_og_desc,
  guide_hero_badge,
  guide_hero_title_1,
  guide_hero_title_2,
  guide_hero_desc,
  guide_search_placeholder,
  guide_search_btn,
  guide_popular_search,
  guide_tag_1,
  guide_tag_2,
  guide_tag_3,
  guide_modules_badge,
  guide_modules_title,
  guide_mod_1_title,
  guide_mod_1_desc,
  guide_mod_2_title,
  guide_mod_2_desc,
  guide_mod_3_title,
  guide_mod_3_desc,
  guide_mod_4_title,
  guide_mod_4_desc,
  guide_btn_learn,
  guide_start_title,
  guide_start_desc,
  guide_start_step_1_title,
  guide_start_step_1_desc,
  guide_start_step_2_title,
  guide_start_step_2_desc,
  guide_start_step_3_title,
  guide_start_step_3_desc,
  guide_articles_title,
  guide_articles_desc,
  guide_btn_all,
  guide_btn_read,
  guide_read_time,
  guide_support_title,
  guide_support_desc,
  guide_btn_contact,
  guide_btn_community,
  guide_art_1_title,
  guide_art_1_desc,
  guide_art_2_title,
  guide_art_2_desc,
  guide_art_3_title,
  guide_art_3_desc,
  blog_meta_title,
  blog_meta_desc,
  blog_meta_og_title,
  blog_meta_og_desc,
  blog_hero_badge,
  blog_feat_title,
  blog_cat_all,
  blog_cat_prod,
  blog_cat_student,
  blog_cat_freelance,
  blog_cat_updates,
  blog_grid_1_title,
  blog_grid_1_desc,
  blog_grid_1_date,
  blog_grid_2_title,
  blog_grid_2_desc,
  blog_grid_2_date,
  blog_grid_3_title,
  blog_grid_3_desc,
  blog_grid_3_date,
  blog_grid_4_title,
  blog_grid_4_desc,
  blog_grid_4_date,
  blog_grid_5_title,
  blog_grid_5_desc,
  blog_grid_5_date,
  blog_news_badge,
  blog_news_title,
  blog_news_desc,
  blog_news_placeholder,
  blog_news_btn,
  blog_news_note,
  blog_hero_title_1,
  blog_hero_title_2,
  blog_meta_date,
  blog_feat_label,
  blog_feat_desc,
  privacy_meta_title,
  privacy_meta_desc,
  privacy_meta_og_title,
  privacy_meta_og_desc,
  privacy_badge,
  privacy_title_1,
  privacy_title_2,
  privacy_subtitle,
  privacy_last_updated,
  privacy_status,
  privacy_toc_title,
  privacy_download_pdf,
  privacy_tldr_title,
  privacy_tldr_1_title,
  privacy_tldr_1_desc,
  privacy_tldr_2_title,
  privacy_tldr_2_desc,
  privacy_tldr_3_title,
  privacy_tldr_3_desc,
  privacy_tldr_4_title,
  privacy_tldr_4_desc,
  privacy_doc_intro,
  privacy_h2_collection,
  privacy_p_collection,
  privacy_li_collection_1_title,
  privacy_li_collection_1_desc,
  privacy_li_collection_2_title,
  privacy_li_collection_2_desc,
  privacy_li_collection_2_strong,
  privacy_li_collection_3_title,
  privacy_li_collection_3_desc,
  privacy_h2_usage,
  privacy_p_usage,
  privacy_li_usage_1,
  privacy_li_usage_2,
  privacy_li_usage_3,
  privacy_finance_note_title,
  privacy_finance_note_desc,
  privacy_h2_security,
  privacy_p_security,
  privacy_h2_cookies,
  privacy_p_cookies,
  privacy_h2_rights,
  privacy_p_rights,
  privacy_li_rights_1,
  privacy_li_rights_2,
  privacy_li_rights_3,
  privacy_h2_contact,
  privacy_p_contact,
  privacy_contact_role,
  privacy_contact_email,
  privacy_contact_sla,
  privacy_export_title,
  privacy_export_desc,
  privacy_export_point_1,
  privacy_export_point_2,
  privacy_export_code_comment,
  privacy_faq_title,
  privacy_faq_1_q,
  privacy_faq_1_a,
  privacy_faq_2_q,
  privacy_faq_2_a,
  privacy_faq_3_q,
  privacy_faq_3_a,
  privacy_cta_title,
  privacy_cta_desc,
  privacy_cta_btn,
  terms_meta_title,
  terms_meta_desc,
  terms_meta_og_title,
  terms_meta_og_desc,
  terms_badge,
  terms_title_1,
  terms_title_2,
  terms_subtitle,
  terms_effective_date,
  terms_nav_title,
  terms_intro_text,
  terms_intro_sub,
  terms_h2_eligibility,
  terms_p_eligibility,
  terms_eligibility_1,
  terms_eligibility_2,
  terms_h2_rules,
  terms_p_rules,
  terms_rules_do_title,
  terms_rules_do_1,
  terms_rules_do_2,
  terms_rules_do_3,
  terms_rules_dont_title,
  terms_rules_dont_1,
  terms_rules_dont_2,
  terms_rules_dont_3,
  terms_h2_payment,
  terms_p_payment,
  terms_li_payment_1_title,
  terms_li_payment_1_desc,
  terms_li_payment_2_title,
  terms_li_payment_2_desc,
  terms_h2_termination,
  terms_p_termination,
  terms_h2_liability,
  terms_legal_caps,
  terms_cta_title,
  terms_cta_desc,
  terms_cta_btn_agree,
  terms_cta_btn_decline,
  terms_cta_note,
  stories_meta_title,
  stories_meta_desc,
  stories_meta_og_title,
  stories_meta_og_desc,
  stories_hero_badge,
  stories_hero_title_1,
  stories_hero_title_2,
  stories_hero_desc,
  stories_main_quote,
  stories_main_body,
  stories_wall_title,
  stories_wall_desc,
  stories_user_1_text,
  stories_user_2_text,
  stories_user_3_text,
  stories_user_4_text,
  stories_stat_1,
  stories_stat_2,
  stories_stat_3,
  stories_stat_4,
  stories_cta_title,
  stories_cta_desc,
  stories_cta_btn,
  stories_cta_note,
  pricing_meta_title,
  pricing_meta_desc,
  pricing_meta_og_title,
  pricing_badge,
  pricing_title_1,
  pricing_title_2,
  pricing_subtitle,
  pricing_monthly,
  pricing_yearly,
  pricing_save_amount,
  pricing_free_name,
  pricing_forever,
  pricing_free_desc,
  pricing_feat_habits_limit,
  pricing_feat_finance_basic,
  pricing_free_btn,
  pricing_pro_name,
  pricing_pro_badge,
  pricing_month,
  pricing_billed_annually,
  pricing_pro_desc,
  pricing_feat_unlimited_habits,
  pricing_feat_ai_insights,
  pricing_feat_custom_themes,
  pricing_pro_btn,
  pricing_life_name,
  pricing_once,
  pricing_life_desc,
  pricing_feat_lifetime_access,
  pricing_feat_priority_support,
  pricing_life_btn,
  pricing_compare_title,
  pricing_compare_subtitle,
  pricing_feat_label,
  pricing_trust_1_title,
  pricing_trust_1_desc,
  pricing_trust_2_title,
  pricing_trust_2_desc,
  pricing_trust_3_title,
  pricing_trust_3_desc,
  pricing_faq_title,
  pricing_faq_1_q,
  pricing_faq_1_a,
  pricing_faq_2_q,
  pricing_faq_2_a,
  pricing_bottom_cta_title,
  pricing_bottom_cta_desc,
  pricing_bottom_cta_btn,
  notes_meta_title,
  notes_meta_desc,
  notes_meta_og_title,
  notes_meta_og_desc,
  notes_badge,
  notes_hero_title_1,
  notes_hero_title_2,
  notes_hero_desc,
  notes_hero_cta,
  notes_hero_note,
  notes_mockup_status,
  notes_mockup_title,
  notes_mockup_deadline,
  notes_mockup_task_1,
  notes_mockup_task_2,
  notes_mockup_task_3,
  notes_prob_title_1,
  notes_prob_title_highlight,
  notes_prob_desc,
  notes_prob_point_1,
  notes_prob_point_2,
  notes_prob_point_3,
  notes_chaos_title,
  notes_chaos_date,
  notes_chaos_item_1,
  notes_chaos_item_2,
  notes_chaos_item_3,
  notes_chaos_item_4,
  notes_chaos_item_5,
  notes_chaos_badge,
  notes_hub_finance,
  notes_hub_goals,
  notes_hub_tracking,
  notes_hub_habits,
  notes_hub_connected,
  notes_sol_title_1,
  notes_sol_title_highlight,
  notes_sol_desc,
  notes_sol_box_title,
  notes_sol_box_desc,
  notes_compare_title,
  notes_compare_desc,
  notes_table_head_1,
  notes_table_head_2,
  notes_table_row_1_title,
  notes_table_row_1_col_1,
  notes_table_row_1_col_2,
  notes_table_row_2_title,
  notes_table_row_2_col_1,
  notes_table_row_2_col_2,
  notes_table_row_3_title,
  notes_table_row_3_col_1,
  notes_table_row_3_col_2,
  notes_table_row_4_title,
  notes_table_row_4_col_1,
  notes_table_row_4_col_2,
  notes_cta_title,
  notes_cta_desc,
  notes_cta_btn,
  notes_cta_sub,
  notes_cycle_title,
  notes_cycle_desc,
  notes_cycle_1_title,
  notes_cycle_1_desc,
  notes_cycle_2_title,
  notes_cycle_2_desc,
  notes_cycle_3_title,
  notes_cycle_3_desc,
  blank_cycle_title,
  blank_cycle_desc,
  blank_cycle_1_title,
  blank_cycle_1_desc,
  blank_cycle_2_title,
  blank_cycle_2_desc,
  blank_cycle_3_title,
  blank_cycle_3_desc,
  blank_meta_title,
  blank_meta_desc,
  blank_meta_og_title,
  blank_meta_og_desc,
  blank_badge,
  blank_hero_title_1,
  blank_hero_title_2,
  blank_hero_desc,
  blank_hero_cta,
  blank_hero_note,
  blank_mockup_status,
  blank_mockup_title,
  blank_mockup_subtitle,
  blank_mockup_stat_1,
  blank_mockup_insight,
  blank_prob_title_1,
  blank_prob_title_highlight,
  blank_prob_desc,
  blank_prob_point_1,
  blank_prob_point_2,
  blank_prob_point_3,
  blank_chaos_badge,
  blank_hub_finance,
  blank_hub_focus,
  blank_hub_ready,
  blank_hub_system,
  blank_hub_automated,
  blank_sol_title_1,
  blank_sol_title_highlight,
  blank_sol_desc,
  blank_sol_box_title,
  blank_sol_box_desc,
  blank_compare_title,
  blank_compare_desc,
  blank_table_head_1,
  blank_table_head_2,
  blank_table_row_1_title,
  blank_table_row_1_col_1,
  blank_table_row_1_col_2,
  blank_table_row_2_title,
  blank_table_row_2_col_1,
  blank_table_row_2_col_2,
  blank_table_row_3_title,
  blank_table_row_3_col_1,
  blank_table_row_3_col_2,
  blank_table_row_4_title,
  blank_table_row_4_col_1,
  blank_table_row_4_col_2,
  blank_cta_title,
  blank_cta_desc,
  blank_cta_btn,
  blank_cta_sub,
  pm_meta_title,
  pm_meta_desc,
  pm_meta_og_title,
  pm_meta_og_desc,
  pm_badge,
  pm_hero_title_1,
  pm_hero_title_2,
  pm_hero_desc,
  pm_hero_cta,
  pm_hero_note,
  pm_mockup_status,
  pm_mockup_title,
  pm_mockup_desc,
  pm_mockup_item_1,
  pm_mockup_item_2,
  pm_mockup_item_3,
  pm_cycle_title,
  pm_cycle_desc,
  pm_cycle_1_title,
  pm_cycle_1_desc,
  pm_cycle_2_title,
  pm_cycle_2_desc,
  pm_cycle_3_title,
  pm_cycle_3_desc,
  pm_prob_title_1,
  pm_prob_title_highlight,
  pm_prob_desc,
  pm_prob_point_1,
  pm_prob_point_2,
  pm_prob_point_3,
  pm_hub_you,
  pm_hub_vision,
  pm_hub_yours,
  pm_hub_growth,
  pm_hub_private,
  pm_sol_title_1,
  pm_sol_title_highlight,
  pm_sol_desc,
  pm_sol_box_title,
  pm_sol_box_desc,
  pm_compare_title,
  pm_compare_desc,
  pm_table_head_1,
  pm_table_head_2,
  pm_table_row_1_title,
  pm_table_row_1_col_1,
  pm_table_row_1_col_2,
  pm_table_row_2_title,
  pm_table_row_2_col_1,
  pm_table_row_2_col_2,
  pm_table_row_3_title,
  pm_table_row_3_col_1,
  pm_table_row_3_col_2,
  pm_table_row_4_title,
  pm_table_row_4_col_1,
  pm_table_row_4_col_2,
  pm_cta_title,
  pm_cta_desc,
  pm_cta_btn,
  pm_cta_sub,
  habitap_meta_title,
  habitap_meta_desc,
  habitap_meta_og_title,
  habitap_meta_og_desc,
  habitap_badge,
  habitap_hero_title_1,
  habitap_hero_title_2,
  habitap_hero_desc,
  habitap_hero_cta,
  habitap_hero_note,
  habitap_mockup_status,
  habitap_mockup_title,
  habitap_mockup_desc,
  habitap_mockup_stat_1,
  habitap_mockup_stat_2,
  habitap_cycle_title,
  habitap_cycle_desc,
  habitap_cycle_1_title,
  habitap_cycle_1_desc,
  habitap_cycle_2_title,
  habitap_cycle_2_desc,
  habitap_cycle_3_title,
  habitap_cycle_3_desc,
  habitap_prob_title_1,
  habitap_prob_title_highlight,
  habitap_prob_desc,
  habitap_prob_point_1,
  habitap_prob_point_2,
  habitap_prob_point_3,
  habitap_sol_title_1,
  habitap_sol_title_highlight,
  habitap_sol_desc,
  habitap_sol_1_title,
  habitap_sol_1_desc,
  habitap_sol_2_title,
  habitap_sol_2_desc,
  habitap_sol_3_title,
  habitap_sol_3_desc,
  habitap_compare_title,
  habitap_compare_desc,
  habitap_table_head_2,
  habitap_table_row_1_title,
  habitap_table_row_1_col_1,
  habitap_table_row_1_col_2,
  habitap_table_row_2_title,
  habitap_table_row_2_col_1,
  habitap_table_row_2_col_2,
  habitap_table_row_3_title,
  habitap_table_row_3_col_1,
  habitap_table_row_3_col_2,
  habitap_cta_title,
  habitap_cta_desc,
  habitap_cta_btn,
  habitap_cta_sub,
  "____ SECTION_2 ____": "=== TAMPILAN SEBELUM LOGIN (LANDING PAGE) ===",
  hero_badge: hero_badge$1,
  hero_title_1: hero_title_1$1,
  seo_meta_desc_1,
  footer_rights: footer_rights$1,
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
  delete_budget_text,
  journal_title,
  journal_subtitle,
  journal_tasks,
  journal_habit,
  journal_habit_done,
  journal_expense,
  journal_history,
  journal_add,
  journal_empty_title,
  journal_empty_subtitle,
  journal_untitled,
  journal_no_content,
  journal_confirm_delete,
  journal_delete_warn,
  btn_back_dashboard,
  status_saving,
  status_saved,
  btn_save_manual,
  journal_mood_label,
  journal_add_photo,
  journal_write_placeholder,
  journal_title_placeholder,
  status_deleted,
  status_image_saved,
  status_image_deleted,
  calendar_more,
  journal_filled,
  calendar_tasks,
  calendar_expense,
  habit_completed,
  calendar_day_summary,
  calendar_events_schedule,
  calendar_no_events,
  btn_edit,
  calendar_life_os_summary,
  calendar_journal,
  calendar_journal_written,
  calendar_empty,
  calendar_daily_tasks,
  calendar_tasks_done,
  calendar_no_tasks,
  calendar_habits,
  calendar_habits_done,
  calendar_title,
  calendar_subtitle,
  calendar_new_event,
  calendar_edit_event,
  label_title,
  label_start_date,
  label_end_date,
  label_color,
  label_description,
  ph_event_title,
  ph_event_desc,
  btn_add_event,
  color_indigo,
  color_sky,
  color_emerald,
  color_amber,
  color_rose,
  color_purple,
  calendar_expense_short,
  calendar_expense_label,
  calendar_no_events_title,
  calendar_no_events_desc,
  calendar_today,
  calendar_open,
  calendar_more_events,
  calendar_focus,
  calendar_events,
  calendar_planner,
  calendar_finance,
  calendar_journal_short,
  calendar_habits_short,
  calendar_tasks_short
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
  blank_badge,
  blank_chaos_badge,
  blank_compare_desc,
  blank_compare_title,
  blank_cta_btn,
  blank_cta_desc,
  blank_cta_sub,
  blank_cta_title,
  blank_cycle_1_desc,
  blank_cycle_1_title,
  blank_cycle_2_desc,
  blank_cycle_2_title,
  blank_cycle_3_desc,
  blank_cycle_3_title,
  blank_cycle_desc,
  blank_cycle_title,
  blank_hero_cta,
  blank_hero_desc,
  blank_hero_note,
  blank_hero_title_1,
  blank_hero_title_2,
  blank_hub_automated,
  blank_hub_finance,
  blank_hub_focus,
  blank_hub_ready,
  blank_hub_system,
  blank_meta_desc,
  blank_meta_og_desc,
  blank_meta_og_title,
  blank_meta_title,
  blank_mockup_insight,
  blank_mockup_stat_1,
  blank_mockup_status,
  blank_mockup_subtitle,
  blank_mockup_title,
  blank_prob_desc,
  blank_prob_point_1,
  blank_prob_point_2,
  blank_prob_point_3,
  blank_prob_title_1,
  blank_prob_title_highlight,
  blank_sol_box_desc,
  blank_sol_box_title,
  blank_sol_desc,
  blank_sol_title_1,
  blank_sol_title_highlight,
  blank_table_head_1,
  blank_table_head_2,
  blank_table_row_1_col_1,
  blank_table_row_1_col_2,
  blank_table_row_1_title,
  blank_table_row_2_col_1,
  blank_table_row_2_col_2,
  blank_table_row_2_title,
  blank_table_row_3_col_1,
  blank_table_row_3_col_2,
  blank_table_row_3_title,
  blank_table_row_4_col_1,
  blank_table_row_4_col_2,
  blank_table_row_4_title,
  blog_cat_all,
  blog_cat_freelance,
  blog_cat_prod,
  blog_cat_student,
  blog_cat_updates,
  blog_feat_desc,
  blog_feat_label,
  blog_feat_title,
  blog_grid_1_date,
  blog_grid_1_desc,
  blog_grid_1_title,
  blog_grid_2_date,
  blog_grid_2_desc,
  blog_grid_2_title,
  blog_grid_3_date,
  blog_grid_3_desc,
  blog_grid_3_title,
  blog_grid_4_date,
  blog_grid_4_desc,
  blog_grid_4_title,
  blog_grid_5_date,
  blog_grid_5_desc,
  blog_grid_5_title,
  blog_hero_badge,
  blog_hero_title_1,
  blog_hero_title_2,
  blog_meta_date,
  blog_meta_desc,
  blog_meta_og_desc,
  blog_meta_og_title,
  blog_meta_title,
  blog_news_badge,
  blog_news_btn,
  blog_news_desc,
  blog_news_note,
  blog_news_placeholder,
  blog_news_title,
  btn_add,
  btn_add_another,
  btn_add_event,
  btn_add_habit,
  btn_add_schedule,
  btn_add_task,
  btn_add_task_short,
  btn_add_timeline,
  btn_back_dashboard,
  btn_cancel,
  btn_confirm_reset,
  btn_create,
  btn_delete,
  btn_edit,
  btn_reset,
  btn_reset_tooltip,
  btn_save,
  btn_save_all,
  btn_save_manual,
  btn_saving,
  btn_single_mode,
  btn_transaction,
  btn_update,
  btn_yes_delete,
  budget_limit,
  budget_target,
  budget_warning,
  calendar_bento_1_desc,
  calendar_bento_1_title,
  calendar_bento_2_desc,
  calendar_bento_2_title,
  calendar_bento_3_desc,
  calendar_bento_3_title,
  calendar_bento_4_desc,
  calendar_bento_4_title,
  calendar_bento_desc,
  calendar_bento_title,
  calendar_cta_btn,
  calendar_cta_desc,
  calendar_cta_note,
  calendar_cta_title,
  calendar_daily_tasks,
  calendar_day_summary,
  calendar_edit_event,
  calendar_empty,
  calendar_events,
  calendar_events_schedule,
  calendar_expense,
  calendar_expense_label,
  calendar_expense_short,
  calendar_feature_1_desc,
  calendar_feature_1_title,
  calendar_feature_2_desc,
  calendar_feature_2_point_1,
  calendar_feature_2_point_2,
  calendar_feature_2_title,
  calendar_finance,
  calendar_focus,
  calendar_habits,
  calendar_habits_done,
  calendar_habits_short,
  calendar_hero_badge,
  calendar_hero_cta_1,
  calendar_hero_cta_2,
  calendar_hero_desc,
  calendar_hero_title_1,
  calendar_hero_title_2,
  calendar_journal,
  calendar_journal_short,
  calendar_journal_written,
  calendar_life_os_summary,
  calendar_meta_desc,
  calendar_meta_og_desc,
  calendar_meta_og_title,
  calendar_meta_title,
  calendar_mockup_alert_1,
  calendar_mockup_alert_2,
  calendar_mockup_date,
  calendar_mockup_event_1,
  calendar_mockup_event_1_time,
  calendar_mockup_event_2,
  calendar_mockup_event_2_time,
  calendar_mockup_event_3,
  calendar_mockup_event_3_time,
  calendar_mockup_location_1,
  calendar_mockup_location_2,
  calendar_mockup_location_3,
  calendar_mockup_month,
  calendar_mockup_today,
  calendar_more,
  calendar_more_events,
  calendar_new_event,
  calendar_no_events,
  calendar_no_events_desc,
  calendar_no_events_title,
  calendar_no_tasks,
  calendar_open,
  calendar_planner,
  calendar_prob_1_desc,
  calendar_prob_1_title,
  calendar_prob_2_desc,
  calendar_prob_2_title,
  calendar_prob_3_desc,
  calendar_prob_3_title,
  calendar_prob_title_1,
  calendar_prob_title_2,
  calendar_prob_title_strike,
  calendar_quote_author,
  calendar_quote_text,
  calendar_subtitle,
  calendar_tasks,
  calendar_tasks_done,
  calendar_tasks_short,
  calendar_title,
  calendar_today,
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
  color_amber,
  color_emerald,
  color_indigo,
  color_purple,
  color_rose,
  color_sky,
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
  finance_bento_1_desc,
  finance_bento_1_title,
  finance_bento_2_desc,
  finance_bento_2_title,
  finance_bento_3_desc,
  finance_bento_3_title,
  finance_bento_4_desc,
  finance_bento_4_title,
  finance_bento_desc,
  finance_bento_title,
  finance_cta_btn,
  finance_cta_desc,
  finance_cta_note,
  finance_cta_title,
  finance_feature_1_desc,
  finance_feature_1_point_1,
  finance_feature_1_point_2,
  finance_feature_1_title,
  finance_feature_2_desc,
  finance_feature_2_point_1,
  finance_feature_2_point_2,
  finance_feature_2_title,
  finance_hero_badge,
  finance_hero_cta_1,
  finance_hero_cta_2,
  finance_hero_desc,
  finance_hero_title_1,
  finance_hero_title_2,
  finance_meta_desc,
  finance_meta_og_desc,
  finance_meta_og_title,
  finance_meta_title,
  finance_mockup_alert_1,
  finance_mockup_alert_2,
  finance_mockup_balance,
  finance_mockup_task_1,
  finance_mockup_task_2,
  finance_mockup_task_3,
  finance_mockup_time_1,
  finance_mockup_time_2,
  finance_mockup_time_3,
  finance_mockup_title,
  finance_plan,
  finance_privacy_desc,
  finance_privacy_point_1_desc,
  finance_privacy_point_1_title,
  finance_privacy_point_2_desc,
  finance_privacy_point_2_title,
  finance_privacy_point_3_desc,
  finance_privacy_point_3_title,
  finance_privacy_title,
  finance_prob_1_desc,
  finance_prob_1_title,
  finance_prob_2_desc,
  finance_prob_2_title,
  finance_prob_3_desc,
  finance_prob_3_title,
  finance_prob_title_1,
  finance_prob_title_2,
  finance_prob_title_strike,
  finance_quote_author,
  finance_quote_text,
  finance_trend,
  footer_legal,
  footer_rights: footer_rights$1,
  freelance_bento_1_desc,
  freelance_bento_1_title,
  freelance_bento_2_desc,
  freelance_bento_2_title,
  freelance_bento_3_desc,
  freelance_bento_3_title,
  freelance_bento_4_desc,
  freelance_bento_4_title,
  freelance_bento_desc,
  freelance_bento_title,
  freelance_cta_btn,
  freelance_cta_desc,
  freelance_cta_note,
  freelance_cta_title,
  freelance_feat_1_desc,
  freelance_feat_1_point_1,
  freelance_feat_1_point_2,
  freelance_feat_1_title,
  freelance_feat_2_desc,
  freelance_feat_2_point_1,
  freelance_feat_2_point_2,
  freelance_feat_2_title,
  freelance_hero_badge,
  freelance_hero_cta_1,
  freelance_hero_desc,
  freelance_hero_social_proof,
  freelance_hero_title_1,
  freelance_hero_title_2,
  freelance_meta_desc,
  freelance_meta_og_desc,
  freelance_meta_og_title,
  freelance_meta_title,
  freelance_prob_1_desc,
  freelance_prob_1_title,
  freelance_prob_2_desc,
  freelance_prob_2_title,
  freelance_prob_3_desc,
  freelance_prob_3_title,
  freelance_prob_desc,
  freelance_prob_title,
  fund_source,
  greet_afternoon,
  greet_morning,
  greet_night,
  greet_noon,
  greet_subtitle,
  growth_bento_1_desc,
  growth_bento_1_title,
  growth_bento_2_desc,
  growth_bento_2_title,
  growth_bento_3_desc,
  growth_bento_3_title,
  growth_bento_4_desc,
  growth_bento_4_title,
  growth_bento_5_desc,
  growth_bento_5_title,
  growth_bento_desc,
  growth_bento_title,
  growth_cta_btn,
  growth_cta_desc,
  growth_cta_note,
  growth_cta_title,
  growth_feat_1_desc,
  growth_feat_1_point_1,
  growth_feat_1_point_2,
  growth_feat_1_title,
  growth_feat_2_desc,
  growth_feat_2_quote_body,
  growth_feat_2_quote_title,
  growth_feat_2_title,
  growth_hero_badge,
  growth_hero_cta_1,
  growth_hero_desc,
  growth_hero_social_proof,
  growth_hero_title_1,
  growth_hero_title_2,
  growth_meta_desc,
  growth_meta_og_desc,
  growth_meta_og_title,
  growth_meta_title,
  growth_prob_desc_dark,
  growth_prob_desc_light,
  growth_prob_point_1,
  growth_prob_point_2,
  growth_prob_point_3,
  growth_prob_point_4,
  growth_prob_title_dark,
  growth_prob_title_light,
  guide_art_1_desc,
  guide_art_1_title,
  guide_art_2_desc,
  guide_art_2_title,
  guide_art_3_desc,
  guide_art_3_title,
  guide_articles_desc,
  guide_articles_title,
  guide_btn_all,
  guide_btn_community,
  guide_btn_contact,
  guide_btn_learn,
  guide_btn_read,
  guide_hero_badge,
  guide_hero_desc,
  guide_hero_title_1,
  guide_hero_title_2,
  guide_meta_desc,
  guide_meta_og_desc,
  guide_meta_og_title,
  guide_meta_title,
  guide_mod_1_desc,
  guide_mod_1_title,
  guide_mod_2_desc,
  guide_mod_2_title,
  guide_mod_3_desc,
  guide_mod_3_title,
  guide_mod_4_desc,
  guide_mod_4_title,
  guide_modules_badge,
  guide_modules_title,
  guide_popular_search,
  guide_read_time,
  guide_search_btn,
  guide_search_placeholder,
  guide_start_desc,
  guide_start_step_1_desc,
  guide_start_step_1_title,
  guide_start_step_2_desc,
  guide_start_step_2_title,
  guide_start_step_3_desc,
  guide_start_step_3_title,
  guide_start_title,
  guide_support_desc,
  guide_support_title,
  guide_tag_1,
  guide_tag_2,
  guide_tag_3,
  habit_bento_1_desc,
  habit_bento_1_title,
  habit_bento_2_desc,
  habit_bento_2_title,
  habit_bento_3_desc,
  habit_bento_3_title,
  habit_bento_4_desc,
  habit_bento_4_title,
  habit_bento_desc,
  habit_bento_title,
  habit_btn_add,
  habit_btn_cancel,
  habit_btn_copy_confirm,
  habit_btn_delete_confirm,
  habit_btn_new,
  habit_btn_save,
  habit_completed,
  habit_copy_desc,
  habit_copy_title,
  habit_create_desc,
  habit_create_title,
  habit_cta_btn,
  habit_cta_desc,
  habit_cta_note,
  habit_cta_title,
  habit_delete_confirm,
  habit_delete_desc,
  habit_delete_title,
  habit_empty,
  habit_empty_desc,
  habit_empty_title,
  habit_feature_1_desc,
  habit_feature_1_point_1,
  habit_feature_1_point_2,
  habit_feature_1_title,
  habit_feature_2_desc,
  habit_feature_2_point_1,
  habit_feature_2_point_2,
  habit_feature_2_title,
  habit_hero_badge,
  habit_hero_cta_1,
  habit_hero_cta_2,
  habit_hero_desc,
  habit_hero_title_1,
  habit_hero_title_2,
  habit_label_color,
  habit_label_icon,
  habit_label_name,
  habit_label_target,
  habit_meta_desc,
  habit_meta_og_desc,
  habit_meta_og_title,
  habit_meta_title,
  habit_mockup_alert_1,
  habit_mockup_alert_2,
  habit_mockup_streak,
  habit_mockup_task_1,
  habit_mockup_task_2,
  habit_mockup_task_3,
  habit_mockup_time_1,
  habit_mockup_time_2,
  habit_mockup_time_3,
  habit_mockup_title,
  habit_modal_btn_save,
  habit_modal_color,
  habit_modal_icon,
  habit_modal_question,
  habit_modal_target,
  habit_modal_title,
  habit_name,
  habit_page_title,
  habit_prob_1_desc,
  habit_prob_1_title,
  habit_prob_2_desc,
  habit_prob_2_title,
  habit_prob_3_desc,
  habit_prob_3_title,
  habit_prob_title_1,
  habit_prob_title_2,
  habit_prob_title_strike,
  habit_progress,
  habit_quote_author,
  habit_quote_text,
  habit_salin_btn,
  habit_sessions,
  habit_subtitle,
  habit_table_progress,
  habit_table_target,
  habit_table_total,
  habit_target,
  habit_today,
  habitap_badge,
  habitap_compare_desc,
  habitap_compare_title,
  habitap_cta_btn,
  habitap_cta_desc,
  habitap_cta_sub,
  habitap_cta_title,
  habitap_cycle_1_desc,
  habitap_cycle_1_title,
  habitap_cycle_2_desc,
  habitap_cycle_2_title,
  habitap_cycle_3_desc,
  habitap_cycle_3_title,
  habitap_cycle_desc,
  habitap_cycle_title,
  habitap_hero_cta,
  habitap_hero_desc,
  habitap_hero_note,
  habitap_hero_title_1,
  habitap_hero_title_2,
  habitap_meta_desc,
  habitap_meta_og_desc,
  habitap_meta_og_title,
  habitap_meta_title,
  habitap_mockup_desc,
  habitap_mockup_stat_1,
  habitap_mockup_stat_2,
  habitap_mockup_status,
  habitap_mockup_title,
  habitap_prob_desc,
  habitap_prob_point_1,
  habitap_prob_point_2,
  habitap_prob_point_3,
  habitap_prob_title_1,
  habitap_prob_title_highlight,
  habitap_sol_1_desc,
  habitap_sol_1_title,
  habitap_sol_2_desc,
  habitap_sol_2_title,
  habitap_sol_3_desc,
  habitap_sol_3_title,
  habitap_sol_desc,
  habitap_sol_title_1,
  habitap_sol_title_highlight,
  habitap_table_head_2,
  habitap_table_row_1_col_1,
  habitap_table_row_1_col_2,
  habitap_table_row_1_title,
  habitap_table_row_2_col_1,
  habitap_table_row_2_col_2,
  habitap_table_row_2_title,
  habitap_table_row_3_col_1,
  habitap_table_row_3_col_2,
  habitap_table_row_3_title,
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
  journal_add,
  journal_add_photo,
  journal_bento_1_desc,
  journal_bento_1_title,
  journal_bento_2_desc,
  journal_bento_2_title,
  journal_bento_3_desc,
  journal_bento_3_title,
  journal_bento_desc,
  journal_bento_title,
  journal_confirm_delete,
  journal_cta_btn,
  journal_cta_desc,
  journal_cta_note,
  journal_cta_title,
  journal_delete_warn,
  journal_empty_subtitle,
  journal_empty_title,
  journal_expense,
  journal_feature_1_desc,
  journal_feature_1_point_1,
  journal_feature_1_point_2,
  journal_feature_1_title,
  journal_feature_2_desc,
  journal_feature_2_point_1,
  journal_feature_2_point_2,
  journal_feature_2_title,
  journal_filled,
  journal_habit,
  journal_habit_done,
  journal_hero_badge,
  journal_hero_cta_1,
  journal_hero_cta_2,
  journal_hero_desc,
  journal_hero_title_1,
  journal_hero_title_2,
  journal_history,
  journal_meta_desc,
  journal_meta_og_desc,
  journal_meta_og_title,
  journal_meta_title,
  journal_mockup_date,
  journal_mockup_text_1,
  journal_mockup_text_2,
  journal_mockup_title,
  journal_mockup_typing,
  journal_mood_label,
  journal_no_content,
  journal_prob_1_desc,
  journal_prob_1_title,
  journal_prob_2_desc,
  journal_prob_2_title,
  journal_prob_3_desc,
  journal_prob_3_title,
  journal_prob_main_desc,
  journal_prob_title_1,
  journal_prob_title_2,
  journal_prob_title_strike,
  journal_quote_author,
  journal_quote_text,
  journal_subtitle,
  journal_tasks,
  journal_title,
  journal_title_placeholder,
  journal_untitled,
  journal_write_placeholder,
  label_activity,
  label_break,
  label_checkins,
  label_chill,
  label_color,
  label_consistency,
  label_daily,
  label_description,
  label_end_date,
  label_end_time,
  label_mood_status,
  label_mvp_habit,
  label_notes,
  label_now,
  label_period,
  label_priority,
  label_routine,
  label_start,
  label_start_date,
  label_start_time,
  label_title,
  label_todo,
  label_urgent,
  label_work,
  last_5,
  legal_close,
  legal_ref,
  legal_title,
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
  modal_logout_cancel,
  modal_logout_confirm,
  modal_logout_subtitle,
  modal_logout_title,
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
  nav_features,
  nav_home: nav_home$1,
  nav_login: nav_login$1,
  nav_logout,
  nav_pricing,
  nav_register: nav_register$1,
  nav_resources,
  nav_settings,
  nav_solutions,
  new_budget,
  no_budget,
  no_fund_source,
  no_transaction,
  notes_badge,
  notes_chaos_badge,
  notes_chaos_date,
  notes_chaos_item_1,
  notes_chaos_item_2,
  notes_chaos_item_3,
  notes_chaos_item_4,
  notes_chaos_item_5,
  notes_chaos_title,
  notes_compare_desc,
  notes_compare_title,
  notes_cta_btn,
  notes_cta_desc,
  notes_cta_sub,
  notes_cta_title,
  notes_cycle_1_desc,
  notes_cycle_1_title,
  notes_cycle_2_desc,
  notes_cycle_2_title,
  notes_cycle_3_desc,
  notes_cycle_3_title,
  notes_cycle_desc,
  notes_cycle_title,
  notes_hero_cta,
  notes_hero_desc,
  notes_hero_note,
  notes_hero_title_1,
  notes_hero_title_2,
  notes_hub_connected,
  notes_hub_finance,
  notes_hub_goals,
  notes_hub_habits,
  notes_hub_tracking,
  notes_meta_desc,
  notes_meta_og_desc,
  notes_meta_og_title,
  notes_meta_title,
  notes_mockup_deadline,
  notes_mockup_status,
  notes_mockup_task_1,
  notes_mockup_task_2,
  notes_mockup_task_3,
  notes_mockup_title,
  notes_prob_desc,
  notes_prob_point_1,
  notes_prob_point_2,
  notes_prob_point_3,
  notes_prob_title_1,
  notes_prob_title_highlight,
  notes_sol_box_desc,
  notes_sol_box_title,
  notes_sol_desc,
  notes_sol_title_1,
  notes_sol_title_highlight,
  notes_table_head_1,
  notes_table_head_2,
  notes_table_row_1_col_1,
  notes_table_row_1_col_2,
  notes_table_row_1_title,
  notes_table_row_2_col_1,
  notes_table_row_2_col_2,
  notes_table_row_2_title,
  notes_table_row_3_col_1,
  notes_table_row_3_col_2,
  notes_table_row_3_title,
  notes_table_row_4_col_1,
  notes_table_row_4_col_2,
  notes_table_row_4_title,
  old_data_hint,
  ph_event_desc,
  ph_event_title,
  placeholder_activity,
  placeholder_breakfast,
  placeholder_dinner,
  placeholder_lunch,
  placeholder_name,
  placeholder_notes,
  planner_bento_1_desc,
  planner_bento_1_title,
  planner_bento_2_desc,
  planner_bento_2_title,
  planner_bento_3_desc,
  planner_bento_3_title,
  planner_bento_4_desc,
  planner_bento_4_title,
  planner_bento_desc,
  planner_bento_title,
  planner_click_hint,
  planner_cta_btn,
  planner_cta_desc,
  planner_cta_note,
  planner_cta_title,
  planner_feature_1_desc,
  planner_feature_1_point_1,
  planner_feature_1_point_2,
  planner_feature_1_title,
  planner_feature_2_desc,
  planner_feature_2_point_1,
  planner_feature_2_point_2,
  planner_feature_2_title,
  planner_hero_badge,
  planner_hero_cta_1,
  planner_hero_cta_2,
  planner_hero_desc,
  planner_hero_title_1,
  planner_hero_title_2,
  planner_mechanism_1_desc,
  planner_mechanism_1_title,
  planner_meta_desc,
  planner_meta_og_desc,
  planner_meta_og_title,
  planner_meta_title,
  planner_mockup_alert_1,
  planner_mockup_alert_2,
  planner_mockup_status,
  planner_mockup_task_1,
  planner_mockup_task_2,
  planner_mockup_task_3,
  planner_mockup_time_1,
  planner_mockup_time_2,
  planner_mockup_time_3,
  planner_mockup_title,
  planner_prob_1_desc,
  planner_prob_1_title,
  planner_prob_2_desc,
  planner_prob_2_title,
  planner_prob_3_desc,
  planner_prob_3_title,
  planner_prob_title_1,
  planner_prob_title_2,
  planner_prob_title_strike,
  planner_quote_author,
  planner_quote_text,
  planner_time_fmt,
  planner_title,
  pm_badge,
  pm_compare_desc,
  pm_compare_title,
  pm_cta_btn,
  pm_cta_desc,
  pm_cta_sub,
  pm_cta_title,
  pm_cycle_1_desc,
  pm_cycle_1_title,
  pm_cycle_2_desc,
  pm_cycle_2_title,
  pm_cycle_3_desc,
  pm_cycle_3_title,
  pm_cycle_desc,
  pm_cycle_title,
  pm_hero_cta,
  pm_hero_desc,
  pm_hero_note,
  pm_hero_title_1,
  pm_hero_title_2,
  pm_hub_growth,
  pm_hub_private,
  pm_hub_vision,
  pm_hub_you,
  pm_hub_yours,
  pm_meta_desc,
  pm_meta_og_desc,
  pm_meta_og_title,
  pm_meta_title,
  pm_mockup_desc,
  pm_mockup_item_1,
  pm_mockup_item_2,
  pm_mockup_item_3,
  pm_mockup_status,
  pm_mockup_title,
  pm_prob_desc,
  pm_prob_point_1,
  pm_prob_point_2,
  pm_prob_point_3,
  pm_prob_title_1,
  pm_prob_title_highlight,
  pm_sol_box_desc,
  pm_sol_box_title,
  pm_sol_desc,
  pm_sol_title_1,
  pm_sol_title_highlight,
  pm_table_head_1,
  pm_table_head_2,
  pm_table_row_1_col_1,
  pm_table_row_1_col_2,
  pm_table_row_1_title,
  pm_table_row_2_col_1,
  pm_table_row_2_col_2,
  pm_table_row_2_title,
  pm_table_row_3_col_1,
  pm_table_row_3_col_2,
  pm_table_row_3_title,
  pm_table_row_4_col_1,
  pm_table_row_4_col_2,
  pm_table_row_4_title,
  pricing_badge,
  pricing_billed_annually,
  pricing_bottom_cta_btn,
  pricing_bottom_cta_desc,
  pricing_bottom_cta_title,
  pricing_compare_subtitle,
  pricing_compare_title,
  pricing_faq_1_a,
  pricing_faq_1_q,
  pricing_faq_2_a,
  pricing_faq_2_q,
  pricing_faq_title,
  pricing_feat_ai_insights,
  pricing_feat_custom_themes,
  pricing_feat_finance_basic,
  pricing_feat_habits_limit,
  pricing_feat_label,
  pricing_feat_lifetime_access,
  pricing_feat_priority_support,
  pricing_feat_unlimited_habits,
  pricing_forever,
  pricing_free_btn,
  pricing_free_desc,
  pricing_free_name,
  pricing_life_btn,
  pricing_life_desc,
  pricing_life_name,
  pricing_meta_desc,
  pricing_meta_og_title,
  pricing_meta_title,
  pricing_month,
  pricing_monthly,
  pricing_once,
  pricing_pro_badge,
  pricing_pro_btn,
  pricing_pro_desc,
  pricing_pro_name,
  pricing_save_amount,
  pricing_subtitle,
  pricing_title_1,
  pricing_title_2,
  pricing_trust_1_desc,
  pricing_trust_1_title,
  pricing_trust_2_desc,
  pricing_trust_2_title,
  pricing_trust_3_desc,
  pricing_trust_3_title,
  pricing_yearly,
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
  privacy_badge,
  privacy_consent_p,
  privacy_consent_title,
  privacy_contact_email,
  privacy_contact_role,
  privacy_contact_sla,
  privacy_cta_btn,
  privacy_cta_desc,
  privacy_cta_title,
  privacy_doc_intro,
  privacy_download_pdf,
  privacy_export_code_comment,
  privacy_export_desc,
  privacy_export_point_1,
  privacy_export_point_2,
  privacy_export_title,
  privacy_faq_1_a,
  privacy_faq_1_q,
  privacy_faq_2_a,
  privacy_faq_2_q,
  privacy_faq_3_a,
  privacy_faq_3_q,
  privacy_faq_title,
  privacy_finance_note_desc,
  privacy_finance_note_title,
  privacy_h2_collection,
  privacy_h2_contact,
  privacy_h2_cookies,
  privacy_h2_rights,
  privacy_h2_security,
  privacy_h2_usage,
  privacy_info_p,
  privacy_info_title,
  privacy_last_updated,
  privacy_li_collection_1_desc,
  privacy_li_collection_1_title,
  privacy_li_collection_2_desc,
  privacy_li_collection_2_strong,
  privacy_li_collection_2_title,
  privacy_li_collection_3_desc,
  privacy_li_collection_3_title,
  privacy_li_rights_1,
  privacy_li_rights_2,
  privacy_li_rights_3,
  privacy_li_usage_1,
  privacy_li_usage_2,
  privacy_li_usage_3,
  privacy_meta_desc,
  privacy_meta_og_desc,
  privacy_meta_og_title,
  privacy_meta_title,
  privacy_p1,
  privacy_p_collection,
  privacy_p_contact,
  privacy_p_cookies,
  privacy_p_rights,
  privacy_p_security,
  privacy_p_usage,
  privacy_status,
  privacy_subtitle,
  privacy_title,
  privacy_title_1,
  privacy_title_2,
  privacy_tldr_1_desc,
  privacy_tldr_1_title,
  privacy_tldr_2_desc,
  privacy_tldr_2_title,
  privacy_tldr_3_desc,
  privacy_tldr_3_title,
  privacy_tldr_4_desc,
  privacy_tldr_4_title,
  privacy_tldr_title,
  privacy_toc_title,
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
  seo_about_desc,
  seo_meta_desc_1,
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
  status_deleted,
  status_image_deleted,
  status_image_saved,
  status_saved,
  status_saving,
  stories_cta_btn,
  stories_cta_desc,
  stories_cta_note,
  stories_cta_title,
  stories_hero_badge,
  stories_hero_desc,
  stories_hero_title_1,
  stories_hero_title_2,
  stories_main_body,
  stories_main_quote,
  stories_meta_desc,
  stories_meta_og_desc,
  stories_meta_og_title,
  stories_meta_title,
  stories_stat_1,
  stories_stat_2,
  stories_stat_3,
  stories_stat_4,
  stories_user_1_text,
  stories_user_2_text,
  stories_user_3_text,
  stories_user_4_text,
  stories_wall_desc,
  stories_wall_title,
  story_1_card_1: story_1_card_1$1,
  story_1_card_2: story_1_card_2$1,
  story_1_p1: story_1_p1$1,
  story_1_p2: story_1_p2$1,
  story_1_title: story_1_title$1,
  story_2_p1: story_2_p1$1,
  story_2_p2: story_2_p2$1,
  story_2_quote: story_2_quote$1,
  story_2_title: story_2_title$1,
  student_bento_1_desc,
  student_bento_1_title,
  student_bento_2_desc,
  student_bento_2_title,
  student_bento_3_desc,
  student_bento_3_title,
  student_bento_desc,
  student_bento_title,
  student_cta_btn,
  student_cta_desc,
  student_cta_note,
  student_cta_title,
  student_feat_1_desc,
  student_feat_1_point_1,
  student_feat_1_point_2,
  student_feat_1_title,
  student_feat_1_visual_badge,
  student_feat_2_desc,
  student_feat_2_point_1,
  student_feat_2_point_2,
  student_feat_2_title,
  student_hero_badge,
  student_hero_cta_1,
  student_hero_desc,
  student_hero_social_proof,
  student_hero_title_1,
  student_hero_title_2,
  student_meta_desc,
  student_meta_og_desc,
  student_meta_og_title,
  student_meta_title,
  student_prob_1_desc,
  student_prob_1_title,
  student_prob_2_desc,
  student_prob_2_title,
  student_prob_3_desc,
  student_prob_3_title,
  student_prob_desc,
  student_prob_title,
  success_budget_saved,
  success_deleted,
  success_saved,
  success_transaction_saved,
  task_notes,
  team_connect: team_connect$1,
  team_title: team_title$1,
  terms_badge,
  terms_cta_btn_agree,
  terms_cta_btn_decline,
  terms_cta_desc,
  terms_cta_note,
  terms_cta_title,
  terms_effective_date,
  terms_eligibility_1,
  terms_eligibility_2,
  terms_h2_eligibility,
  terms_h2_liability,
  terms_h2_payment,
  terms_h2_rules,
  terms_h2_termination,
  terms_intro_sub,
  terms_intro_text,
  terms_legal_caps,
  terms_li_payment_1_desc,
  terms_li_payment_1_title,
  terms_li_payment_2_desc,
  terms_li_payment_2_title,
  terms_meta_desc,
  terms_meta_og_desc,
  terms_meta_og_title,
  terms_meta_title,
  terms_nav_title,
  terms_p_eligibility,
  terms_p_payment,
  terms_p_rules,
  terms_p_termination,
  terms_rules_do_1,
  terms_rules_do_2,
  terms_rules_do_3,
  terms_rules_do_title,
  terms_rules_dont_1,
  terms_rules_dont_2,
  terms_rules_dont_3,
  terms_rules_dont_title,
  terms_subtitle,
  terms_title_1,
  terms_title_2,
  timeline_now,
  timeline_title,
  today_is,
  tos_data_p,
  tos_data_title,
  tos_intro,
  tos_security_p,
  tos_security_title,
  tos_service_p,
  tos_service_title,
  tos_termination_p,
  tos_termination_title,
  tos_title,
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
const Ziggy$1 = { "url": "https://oneformind.com", "port": null, "defaults": {}, "routes": { "debugbar.openhandler": { "uri": "_debugbar/open", "methods": ["GET", "HEAD"] }, "debugbar.clockwork": { "uri": "_debugbar/clockwork/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "debugbar.telescope": { "uri": "_debugbar/telescope/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "debugbar.assets.css": { "uri": "_debugbar/assets/stylesheets", "methods": ["GET", "HEAD"] }, "debugbar.assets.js": { "uri": "_debugbar/assets/javascript", "methods": ["GET", "HEAD"] }, "debugbar.cache.delete": { "uri": "_debugbar/cache/{key}/{tags?}", "methods": ["DELETE"], "parameters": ["key", "tags"] }, "debugbar.queries.explain": { "uri": "_debugbar/queries/explain", "methods": ["POST"] }, "sanctum.csrf-cookie": { "uri": "sanctum/csrf-cookie", "methods": ["GET", "HEAD"] }, "telescope": { "uri": "telescope/{view?}", "methods": ["GET", "HEAD"], "wheres": { "view": "(.*)" }, "parameters": ["view"] }, "ignition.healthCheck": { "uri": "_ignition/health-check", "methods": ["GET", "HEAD"] }, "ignition.executeSolution": { "uri": "_ignition/execute-solution", "methods": ["POST"] }, "ignition.updateConfig": { "uri": "_ignition/update-config", "methods": ["POST"] }, "lang.switch": { "uri": "lang/{locale}", "methods": ["GET", "HEAD"], "parameters": ["locale"] }, "home": { "uri": "/", "methods": ["GET", "HEAD"] }, "waitlist.store": { "uri": "waitlist", "methods": ["POST"] }, "about": { "uri": "about", "methods": ["GET", "HEAD"] }, "pricing": { "uri": "pricing", "methods": ["GET", "HEAD"] }, "sitemap": { "uri": "sitemap.xml", "methods": ["GET", "HEAD"] }, "features.habit": { "uri": "features/habit", "methods": ["GET", "HEAD"] }, "features.finance": { "uri": "features/finance", "methods": ["GET", "HEAD"] }, "features.planner": { "uri": "features/planner", "methods": ["GET", "HEAD"] }, "features.journal": { "uri": "features/journal", "methods": ["GET", "HEAD"] }, "features.calendar": { "uri": "features/calendar", "methods": ["GET", "HEAD"] }, "solutions.student": { "uri": "solutions/student", "methods": ["GET", "HEAD"] }, "solutions.freelancer": { "uri": "solutions/freelancer", "methods": ["GET", "HEAD"] }, "solutions.personalgrowth": { "uri": "solutions/personalgrowth", "methods": ["GET", "HEAD"] }, "resources.guide": { "uri": "resources/guide", "methods": ["GET", "HEAD"] }, "resources.blog": { "uri": "resources/blog", "methods": ["GET", "HEAD"] }, "resources.stories": { "uri": "resources/stories", "methods": ["GET", "HEAD"] }, "company.privacy": { "uri": "company/privacy", "methods": ["GET", "HEAD"] }, "company.terms": { "uri": "company/terms", "methods": ["GET", "HEAD"] }, "compare.paper": { "uri": "compare/paper", "methods": ["GET", "HEAD"] }, "compare.sheets": { "uri": "compare/sheets", "methods": ["GET", "HEAD"] }, "compare.management-tools": { "uri": "compare/management-tools", "methods": ["GET", "HEAD"] }, "compare.habit-apps": { "uri": "compare/habit-apps", "methods": ["GET", "HEAD"] }, "google.login": { "uri": "auth/google", "methods": ["GET", "HEAD"] }, "dashboard": { "uri": "dashboard", "methods": ["GET", "HEAD"] }, "planner.index": { "uri": "planner", "methods": ["GET", "HEAD"] }, "planner.store": { "uri": "planner", "methods": ["POST"] }, "planner.update": { "uri": "planner/{plannerTask}", "methods": ["PATCH"], "parameters": ["plannerTask"], "bindings": { "plannerTask": "id" } }, "planner.destroy": { "uri": "planner/{plannerTask}", "methods": ["DELETE"], "parameters": ["plannerTask"], "bindings": { "plannerTask": "id" } }, "planner.toggle": { "uri": "planner/{plannerTask}/toggle", "methods": ["PATCH"], "parameters": ["plannerTask"], "bindings": { "plannerTask": "id" } }, "planner.updateLog": { "uri": "planner/log", "methods": ["POST"] }, "planner.reset": { "uri": "planner/reset", "methods": ["POST"] }, "planner.batchStore": { "uri": "planner/batch", "methods": ["POST"] }, "habits.index": { "uri": "habits", "methods": ["GET", "HEAD"] }, "habits.store": { "uri": "habits", "methods": ["POST"] }, "habits.copy": { "uri": "habits/copy", "methods": ["POST"] }, "habits.mood": { "uri": "habits/mood", "methods": ["POST"] }, "habits.update": { "uri": "habits/{habit}", "methods": ["PATCH"], "parameters": ["habit"], "bindings": { "habit": "id" } }, "habits.destroy": { "uri": "habits/{habit}", "methods": ["DELETE"], "parameters": ["habit"], "bindings": { "habit": "id" } }, "habits.log": { "uri": "habits/{habit}/log", "methods": ["POST"], "parameters": ["habit"], "bindings": { "habit": "id" } }, "finance.index": { "uri": "finance", "methods": ["GET", "HEAD"] }, "finance.income-target.update": { "uri": "finance/income-target", "methods": ["POST"] }, "finance.transaction.store": { "uri": "finance/transaction", "methods": ["POST"] }, "finance.transaction.update": { "uri": "finance/transaction/{financeTransaction}", "methods": ["PATCH"], "parameters": ["financeTransaction"], "bindings": { "financeTransaction": "id" } }, "finance.transaction.destroy": { "uri": "finance/transaction/{financeTransaction}", "methods": ["DELETE"], "parameters": ["financeTransaction"], "bindings": { "financeTransaction": "id" } }, "finance.transaction.batchStore": { "uri": "finance/transactions-batch", "methods": ["POST"] }, "finance.category.check": { "uri": "finance/category/check/{category}", "methods": ["GET", "HEAD"], "parameters": ["category"] }, "finance.category.rename": { "uri": "finance/category/rename", "methods": ["POST"] }, "finance.budget.store": { "uri": "finance/budget", "methods": ["POST"] }, "finance.budget.update": { "uri": "finance/budget/{financeBudget}", "methods": ["PUT"], "parameters": ["financeBudget"], "bindings": { "financeBudget": "id" } }, "finance.budget.destroy": { "uri": "finance/budget/{financeBudget}", "methods": ["DELETE"], "parameters": ["financeBudget"], "bindings": { "financeBudget": "id" } }, "finance.categories.store": { "uri": "finance/categories", "methods": ["POST"] }, "finance.categories.update": { "uri": "finance/categories/{category}", "methods": ["PUT"], "parameters": ["category"], "bindings": { "category": "id" } }, "finance.categories.destroy": { "uri": "finance/categories/{category}", "methods": ["DELETE"], "parameters": ["category"], "bindings": { "category": "id" } }, "journal.index": { "uri": "journal", "methods": ["GET", "HEAD"] }, "journal.write": { "uri": "journal/write/{id?}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "journal.store": { "uri": "journal", "methods": ["POST"] }, "journal.update": { "uri": "journal/{id}", "methods": ["PATCH"], "parameters": ["id"] }, "journal.destroy": { "uri": "journal/{id}", "methods": ["DELETE"], "parameters": ["id"] }, "journal.uploadImage": { "uri": "journal/image", "methods": ["POST"] }, "journal.deleteImage": { "uri": "journal/image/{id}", "methods": ["DELETE"], "parameters": ["id"] }, "calendar.index": { "uri": "calendar", "methods": ["GET", "HEAD"] }, "calendar.events.store": { "uri": "calendar/events", "methods": ["POST"] }, "calendar.events.update": { "uri": "calendar/events/{id}", "methods": ["PUT"], "parameters": ["id"] }, "calendar.events.destroy": { "uri": "calendar/events/{id}", "methods": ["DELETE"], "parameters": ["id"] }, "settings.index": { "uri": "settings", "methods": ["GET", "HEAD"] }, "settings.update": { "uri": "settings", "methods": ["POST"] }, "profile.edit": { "uri": "profile", "methods": ["GET", "HEAD"] }, "profile.update": { "uri": "profile", "methods": ["PATCH"] }, "profile.destroy": { "uri": "profile", "methods": ["DELETE"] }, "register": { "uri": "register", "methods": ["GET", "HEAD"] }, "login": { "uri": "login", "methods": ["GET", "HEAD"] }, "password.request": { "uri": "forgot-password", "methods": ["GET", "HEAD"] }, "password.email": { "uri": "forgot-password", "methods": ["POST"] }, "password.reset": { "uri": "reset-password/{token}", "methods": ["GET", "HEAD"], "parameters": ["token"] }, "password.store": { "uri": "reset-password", "methods": ["POST"] }, "verification.notice": { "uri": "verify-email", "methods": ["GET", "HEAD"] }, "verification.verify": { "uri": "verify-email/{id}/{hash}", "methods": ["GET", "HEAD"], "parameters": ["id", "hash"] }, "verification.send": { "uri": "email/verification-notification", "methods": ["POST"] }, "password.confirm": { "uri": "confirm-password", "methods": ["GET", "HEAD"] }, "password.update": { "uri": "password", "methods": ["PUT"] }, "logout": { "uri": "logout", "methods": ["POST"] } } };
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy$1.routes, window.Ziggy.routes);
}
const appName = "OneForMind";
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/About.vue": () => import("./assets/About-CJldlvhE.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-DrVdUGuS.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-ZYQuAaCQ.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-BqpB5WR2.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-tULvLE5Y.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-DA1G_I5b.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail--CWuKTDv.js"), "./Pages/Calendar/CalendarDayDetail.vue": () => import("./assets/CalendarDayDetail-D9hxS6M9.js"), "./Pages/Calendar/CalendarEventModal.vue": () => import("./assets/CalendarEventModal-Ewi42-pI.js"), "./Pages/Calendar/CalendarGrid.vue": () => import("./assets/CalendarGrid-ByRD4N79.js"), "./Pages/Calendar/CalendarHeader.vue": () => import("./assets/CalendarHeader-N5RAdMMS.js"), "./Pages/Calendar/Index.vue": () => import("./assets/Index-BpBGdfDW.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-U_KEClfu.js"), "./Pages/Error.vue": () => import("./assets/Error-CR45xnbP.js"), "./Pages/Finance/ArchiveModal.vue": () => import("./assets/ArchiveModal-9Jsuj87o.js"), "./Pages/Finance/BudgetModal.vue": () => import("./assets/BudgetModal-CgJYjGfu.js"), "./Pages/Finance/BudgetSidebar.vue": () => import("./assets/BudgetSidebar-DTOzfZFR.js"), "./Pages/Finance/CategoryModal.vue": () => import("./assets/CategoryModal-DYpCHnR4.js"), "./Pages/Finance/DailyTrendChart.vue": () => import("./assets/DailyTrendChart-CXp2VHmQ.js"), "./Pages/Finance/FinanceBatchModal.vue": () => import("./assets/FinanceBatchModal-BozR8PIh.js"), "./Pages/Finance/FinanceDatePicker.vue": () => import("./assets/FinanceDatePicker-St-Mq15S.js"), "./Pages/Finance/FinanceHeader.vue": () => import("./assets/FinanceHeader-CqXR-MsE.js"), "./Pages/Finance/FinanceInsights.vue": () => import("./assets/FinanceInsights-CpA838YJ.js").then((n2) => n2.a), "./Pages/Finance/FinanceStats.vue": () => import("./assets/FinanceStats-B3eM8kQu.js"), "./Pages/Finance/Index.vue": () => import("./assets/Index-BtxYRjMd.js"), "./Pages/Finance/TransactionList.vue": () => import("./assets/TransactionList-DbmE5xgI.js"), "./Pages/Finance/TransactionModal.vue": () => import("./assets/TransactionModal-DyBGRWKB.js"), "./Pages/Habits/HabitGrid.vue": () => import("./assets/HabitGrid-DS2mRgp4.js"), "./Pages/Habits/HabitHeader.vue": () => import("./assets/HabitHeader-D7De_7e0.js"), "./Pages/Habits/HabitModals.vue": () => import("./assets/HabitModals-Ctd51TO4.js"), "./Pages/Habits/HabitStats.vue": () => import("./assets/HabitStats-mtvxIp2G.js"), "./Pages/Habits/Index.vue": () => import("./assets/Index-j8cP3eWj.js"), "./Pages/Journal/Index.vue": () => import("./assets/Index-nCAvoNd8.js"), "./Pages/Journal/JournalCard.vue": () => import("./assets/JournalCard-BaZRxYjy.js"), "./Pages/Journal/JournalHeader.vue": () => import("./assets/JournalHeader-CodetIH_.js"), "./Pages/Journal/Write.vue": () => import("./assets/Write-B8Py6fXg.js"), "./Pages/Planner/Index.vue": () => import("./assets/Index-T7Asacrm.js"), "./Pages/Planner/PlannerBatchModal.vue": () => import("./assets/PlannerBatchModal-6tLhH1zi.js"), "./Pages/Planner/PlannerDatePicker.vue": () => import("./assets/PlannerDatePicker-C0E2B7JI.js"), "./Pages/Planner/PlannerHeader.vue": () => import("./assets/PlannerHeader-DADvJEBA.js"), "./Pages/Planner/PlannerModal.vue": () => import("./assets/PlannerModal-CDIK_4qp.js"), "./Pages/Planner/PlannerSidebar.vue": () => import("./assets/PlannerSidebar-Ce2pKczP.js"), "./Pages/Planner/PlannerTimeline.vue": () => import("./assets/PlannerTimeline-CKj6FvIl.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-Ddpufv3s.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-dr_yCB-k.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-JQWqzoYf.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-DYjWslze.js"), "./Pages/Settings/Index.vue": () => import("./assets/Index-Df5VtKY8.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-DJ6Cicf1.js") })),
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
