<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SendDailyReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reminders:send';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send daily email reminders based on user notification preferences';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = \App\Models\User::whereNotNull('notification_preferences')->get();

        foreach ($users as $user) {
            $prefs = $user->notification_preferences;
            $timezone = $user->timezone ?? 'Asia/Jakarta';
            $now = \Carbon\Carbon::now($timezone);
            $currentTime = $now->format('H:i');

            // 1. HABIT REMINDER
            if (($prefs['habit']['enabled'] ?? false) && ($prefs['habit']['time'] ?? '') === $currentTime) {
                $today = $now->format('Y-m-d');
                $period = $now->format('Y-m');

                $undoneHabits = \App\Models\Habit::ofUser($user->id)
                    ->forPeriod($period)
                    ->whereDoesntHave('logs', function ($q) use ($today) {
                        $q->where('date', $today)->where('status', 'completed');
                    })
                    ->get();

                if ($undoneHabits->isNotEmpty()) {
                    $user->notify(new \App\Notifications\HabitReminderNotification($undoneHabits));
                }
            }

            // 2. PLANNER REMINDER
            if (($prefs['planner']['enabled'] ?? false) && ($prefs['planner']['time'] ?? '') === $currentTime) {
                $today = $now->format('Y-m-d');
                $todayTasks = \App\Models\PlannerTask::where('user_id', $user->id)
                    ->where('is_completed', false)
                    ->where(function ($q) use ($today) {
                        $q->whereDate('due_date', $today)
                          ->orWhereHas('logs', function ($sub) use ($today) {
                              $sub->where('date', $today);
                          });
                    })
                    ->get();

                if ($todayTasks->isNotEmpty()) {
                    $user->notify(new \App\Notifications\PlannerReminderNotification($todayTasks));
                }
            }

            // 3. JOURNAL REMINDER
            if (($prefs['journal']['enabled'] ?? false) && ($prefs['journal']['time'] ?? '') === $currentTime) {
                $today = $now->format('Y-m-d');
                $hasJournal = \App\Models\Journal::where('user_id', $user->id)
                    ->whereDate('created_at', $today)
                    ->exists();

                if (!$hasJournal) {
                    $user->notify(new \App\Notifications\JournalReminderNotification());
                }
            }
        }

        $this->info('Daily reminders process finished.');
    }
}
