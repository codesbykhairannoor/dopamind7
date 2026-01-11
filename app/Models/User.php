<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute; // <--- Import Ini
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id', // <--- TAMBAH INI
    'settings',
    'avatar_path',
    ];

protected $appends = [
        'avatar_url', // <--- TAMBAH INI
    ];

    protected function avatarUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->avatar_path 
                ? Storage::url($this->avatar_path) // Kalau ada, generate URL S3/Local
                : 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&color=7F9CF5&background=EBF4FF' // Default
        );
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'settings' => 'array',
    ];

    // Relasi: Satu User punya banyak Periode
    public function periods()
    {
        return $this->hasMany(Period::class);
    }
}
