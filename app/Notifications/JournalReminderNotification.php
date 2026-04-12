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
            ->subject('📝 Journal: Sudah Menulis Hari Ini?')
            ->greeting('Halo, ' . $notifiable->name . '!')
            ->line('Hari hampir berakhir. Luangkan waktu sejenak untuk merefleksikan apa yang terjadi hari ini.')
            ->line('Menulis jurnal membantu kamu menjaga kejernihan mental dan melacak perkembangan diri.')
            ->action('Tulis Jurnal Sekarang', url('/journal/write'))
            ->line('Setiap refleksi kecil membawa perubahan besar.');
    }
}
