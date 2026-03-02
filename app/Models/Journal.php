<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Journal extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'date', 'title', 'content', 'mood', 'image_path', 'is_pinned'];

    // 🔥 JANGAN gunakan $appends jika Anda menggunakan Resource. 
    // Lebih aman biarkan Resource yang menangani URL gambarnya.
    // Tapi jika tetap ingin di sini, ini cara amannya:
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                // FIX: Cek apakah attribute ada untuk mencegah MissingAttributeException
                if (!array_key_exists('image_path', $this->attributes) || !$this->image_path) {
                    return null;
                }

                if (str_starts_with($this->image_path, 'http')) {
                    return $this->image_path;
                }

                $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');
                return asset(Storage::disk($disk)->url($this->image_path));
            }
        );
    }

    public function scopeOfUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}