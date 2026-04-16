<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'email_verified_at',
        'settings',
        'avatar_path',
        'is_premium',
        'plan_type',
        'premium_until',
        'resume_text',
        'resume_filename',
        'cookie_consent',
        'timezone',
        'has_used_trial',
    ];

    /**
     * 🔥 DEFENSIVE PROGRAMMING
     */
    protected $attributes = [
        'avatar_path' => null,
        'settings' => '{}',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'settings' => 'array',
        'is_premium' => 'boolean',
        'has_used_trial' => 'boolean',
        'premium_until' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = [
        'avatar_url',
    ];

    /**
     * 🔥 AVATAR LOGIC (RESILIENT MODE)
     * Otomatis deteksi Storage (Local vs Cloudinary)
     */
    protected function avatarUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                $path = $this->attributes['avatar_path'] ?? null;

                if ($path) {
                    // Cek jika ini adalah URL utuh (Google Auth/Cloudinary raw string)
                    if (str_starts_with($path, 'http')) {
                        return $path;
                    }

                    // Ambil config default filesystem ('public' di local, 'cloudinary' di prod)
                    $disk = config('filesystems.default');

                    // Gunakan Storage::disk()->url() agar Cloudinary mengembalikan URL https yang benar
                    return Storage::disk($disk)->url($path);
                }

                return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&color=7F9CF5&background=EBF4FF';
            }
        );
    }

    /**
     * ==========================================
     * RELATIONSHIPS
     * ==========================================
     */

    public function periods(): HasMany
    {
        return $this->hasMany(Period::class);
    }

    public function financeTransactions(): HasMany
    {
        return $this->hasMany(FinanceTransaction::class);
    }

    public function financeBudgets(): HasMany
    {
        return $this->hasMany(FinanceBudget::class);
    }

    public function financeCategories(): HasMany
    {
        return $this->hasMany(FinanceCategory::class);
    }

    public function journals(): HasMany
    {
        return $this->hasMany(Journal::class);
    }

    public function habits(): HasMany
    {
        return $this->hasMany(Habit::class);
    }

    public function plannerTasks(): HasMany
    {
        return $this->hasMany(PlannerTask::class);
    }

    public function calendarEvents(): HasMany
    {
        return $this->hasMany(CalendarEvent::class);
    }

    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }

    public function goals(): HasMany
    {
        return $this->hasMany(Goal::class);
    }

    /**
     * ==========================================
     * SUBSCRIPTION HELPERS
     * ==========================================
     */

    public function isExplorer(): bool
    {
        return $this->plan_type === 'explorer';
    }

    public function isArchitect(): bool
    {
        return in_array($this->plan_type, ['architect', 'quantum', 'legendary']);
    }

    public function isQuantum(): bool
    {
        return $this->plan_type === 'quantum';
    }

    public function isLegendary(): bool
    {
        return $this->plan_type === 'legendary';
    }

    public function hasFeature(string $featureGroup): bool
    {
        $freeGroups = ['habits', 'finance', 'planner'];
        
        if (in_array($featureGroup, $freeGroups)) {
            return true;
        }

        return $this->isArchitect();
    }

    public function hasAiFeature(): bool
    {
        if ($this->isQuantum()) {
            return true;
        }

        if ($this->isLegendary()) {
            // Legendary users get 2 months free AI bonus
            $bonusUntil = $this->settings['ai_bonus_until'] ?? null;
            if ($bonusUntil) {
                return now()->lt(\Illuminate\Support\Carbon::parse($bonusUntil));
            }
            return $this->created_at->gt(now()->subMonths(2));
        }

        return false;
    }

    /**
     * 🔥 FINAL FIX: Kirim email via API Brevo (Port 443) agar tembus blokir Railway.
     */
    public function sendEmailVerificationNotification(): void
    {
        // Paksa URL ke domain asli (https://oneformind.com)
        \Illuminate\Support\Facades\URL::forceRootUrl(config('app.url'));
        \Illuminate\Support\Facades\URL::forceScheme('https');

        $verificationUrl = \Illuminate\Support\Facades\URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $this->id, 'hash' => sha1($this->email)]
        );

        // Jika lokal, pakai SMTP biasa
        if (app()->environment('local')) {
            $this->notify(new \Illuminate\Auth\Notifications\VerifyEmail);
            return;
        }

        // Jika Production, gunakan Jalur API Brevo (HTTPS - Port 443)
        try {
            \Illuminate\Support\Facades\Http::withHeaders([
                'api-key' => config('mail.mailers.smtp.password'),
                'Content-Type' => 'application/json',
            ])->timeout(10)->post('https://api.brevo.com/v3/smtp/email', [
                'sender' => ['name' => config('mail.from.name'), 'email' => config('mail.from.address')],
                'to' => [['email' => $this->email, 'name' => $this->name]],
                'subject' => 'Verify Your Email - ' . config('app.name'),
                'htmlContent' => '
                    <div style="font-family:sans-serif;max-width:600px;margin:20px auto;padding:20px;border:1px solid #eee;border-radius:10px;">
                        <h2 style="color:#4f46e5;">Welcome, ' . $this->name . '!</h2>
                        <p>Click the button below to verify your email address and activate your account:</p>
                        <div style="text-align:center;margin:30px 0;">
                            <a href="' . $verificationUrl . '" style="background:#4f46e5;color:white;padding:12px 25px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;">Verify Email Address</a>
                        </div>
                        <p style="font-size:12px;color:#666;">If you are having trouble, copy this link: <br>' . $verificationUrl . '</p>
                    </div>'
            ]);
            \Illuminate\Support\Facades\Log::info('Production Email Sent via HTTP API for: ' . $this->email);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Production Email API Failure: ' . $e->getMessage());
        }
    }
}