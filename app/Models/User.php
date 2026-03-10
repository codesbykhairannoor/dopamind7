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
                
                return 'https://ui-avatars.com/api/?name='.urlencode($this->name).'&color=7F9CF5&background=EBF4FF';
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
}