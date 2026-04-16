<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class JournalReminderNotification extends Notification implements ShouldQueue
{
    use Queueable;

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
        return (new MailMessage)
            ->subject('📝 Journal: Have you written today?')
            ->greeting('Hello, ' . $notifiable->name . '!')
            ->line('The day is almost over. Take a moment to reflect on what happened today.')
            ->line('Journaling helps you maintain mental clarity and track your self-growth.')
            ->action('Write Entry Now', url('/journal/write'))
            ->line('Every small reflection brings big changes.');
    }
}
