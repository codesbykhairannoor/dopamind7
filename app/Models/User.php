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
        'settings',
        'avatar_path',
    ];

    /**
     * 🔥 DEFENSIVE PROGRAMMING
     * Menjamin key 'avatar_path' selalu ada meskipun kolomnya belum ada di DB (saat testing).
     */
    protected $attributes = [
        'avatar_path' => null,
        'settings' => '{}', // Default JSON kosong biar cast array aman
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
     * Menggunakan $this->attributes untuk menghindari MissingAttributeException di SQLite CI.
     */
    protected function avatarUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => ($this->attributes['avatar_path'] ?? null)
                ? Storage::url($this->attributes['avatar_path'])
                : 'https://ui-avatars.com/api/?name='.urlencode($this->name).'&color=7F9CF5&background=EBF4FF'
        );
    }

    /**
     * Relationships
     */
    public function periods(): HasMany
    {
        return $this->hasMany(Period::class);
    }

    // --- RELASI FINANCE (INI YANG TADI MISSING) ---

    /**
     * User memiliki banyak transaksi keuangan.
     */
    public function financeTransactions(): HasMany
    {
        return $this->hasMany(FinanceTransaction::class);
    }

    /**
     * User memiliki banyak rencana anggaran (budget).
     */
    public function financeBudgets(): HasMany
    {
        return $this->hasMany(FinanceBudget::class);
    }
}