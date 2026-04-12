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
            ->subject('📅 Planner: Agenda Kamu Hari Ini')
            ->greeting('Halo, ' . $notifiable->name . '!')
            ->line('Hari ini kamu punya beberapa agenda penting. Jangan sampai ada yang terlewat:');

        foreach ($this->tasks as $task) {
            $message->line('- ' . $task->title);
        }

        return $message
            ->action('Lihat Planner', url('/planner'))
            ->line('Fokus pada prioritas kamu hari ini. Kamu pasti bisa!');
    }
}
