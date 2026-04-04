<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'is_published',
        'published_at',
        'meta_title',
        'meta_description',
        'geo_targeting',
        'location_name',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
        'geo_targeting' => 'array',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    protected $appends = ['featured_image_url', 'html_content', 'html_title'];

    public function getFeaturedImageUrlAttribute()
    {
        if (!$this->featured_image) return null;
        
        if (str_starts_with($this->featured_image, 'http')) {
            return $this->featured_image;
        }

        // 🔥 MIRRORING JOURNAL TRACKER LOGIC (100% RELIABLE)
        $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');
        return asset(\Illuminate\Support\Facades\Storage::disk($disk)->url($this->featured_image));
    }

    public function getHtmlTitleAttribute()
    {
        if (!$this->title) return '';
        $converter = new \League\CommonMark\CommonMarkConverter([
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);
        return str_replace(['<p>', '</p>'], '', $converter->convert($this->title)->getContent());
    }

    public function getHtmlContentAttribute()
    {
        if (!$this->content) return '';
        $converter = new \League\CommonMark\CommonMarkConverter([
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);
        return $converter->convert($this->content)->getContent();
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class, 'category_id')->withDefault([
            'name' => 'General',
            'slug' => 'general'
        ]);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withDefault([
            'name' => 'Admin'
        ]);
    }
}
