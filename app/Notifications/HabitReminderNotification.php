<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class HabitReminderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $habits;

    /**
     * Create a new notification instance.
     */
    public function __construct($habits)
    {
        $this->habits = $habits;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('⚡ Reminder: Time to Check Your Habits!')
            ->greeting('Hello, ' . $notifiable->name . '!')
            ->line('Don\'t let your streak break! Here are the habits you need to check today:');

        foreach ($this->habits as $habit) {
            $message->line('- ' . ($habit->icon ?: '✅') . ' ' . $habit->name);
        }

        return $message
            ->action('Check Habits Now', url('/habits'))
            ->line('Consistency is the key to success. You got this!');
    }
}
