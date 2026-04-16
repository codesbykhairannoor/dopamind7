<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PlannerReminderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $tasks;

    /**
     * Create a new notification instance.
     */
    public function __construct($tasks)
    {
        $this->tasks = $tasks;
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
            ->subject('📅 Planner: Your Agenda Today')
            ->greeting('Hello, ' . $notifiable->name . '!')
            ->line('You have several important tasks today. Don\'t miss any:');

        foreach ($this->tasks as $task) {
            $message->line('- ' . $task->title);
        }

        return $message
            ->action('View Planner', url('/planner'))
            ->line('Focus on your priorities today. You can do it!');
    }
}
