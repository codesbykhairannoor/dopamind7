<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Support\Str;

class BlogContentSeeder extends Seeder
{
    public function run(): void
    {
        $adminId = User::whereRaw('is_admin IS TRUE')->first()?->id ?? 1;

        $posts = [
            [
                'title' => 'Atomic Habits in the Digital Era: Building a Bulletproof Routine with AI',
                'slug' => 'atomic-habits-digital-era-ai-routine',
                'category_id' => 2,
                'excerpt' => 'Discover how to combine James Clear’s atomic habits framework with modern AI tools to build routines that actually stick.',
                'content' => '<h2>The New Era of Habit Formation</h2><p>In the digital age, our attention is the most valuable currency. Building habits isn’t just about willpower anymore; it’s about architecting your environment—both physical and digital.</p><h3>Why AI is the Ultimate Accountability Partner</h3><p>Traditional habit trackers are passive. Modern AI engines, like the one powering OneForMind, are proactive. They analyze your patterns, predict when you might fail, and nudge you with precision.</p><blockquote>"Success is the product of daily habits—not once-in-a-lifetime transformations." — James Clear</blockquote>',
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'Mastering Cashflow: Why Tracking Every Cent is the Secret to Financial Freedom',
                'slug' => 'mastering-cashflow-secret-financial-freedom',
                'category_id' => 3,
                'excerpt' => 'Financial freedom isn’t about how much you earn, but how much you keep. Learn the neural approach to cashflow management.',
                'content' => '<h2>The Psychology of Spending</h2><p>Most people fail at finance because they view it as math. In reality, finance is 90% psychology and 10% math. Tracking your expenses creates a feedback loop that rewires your brain to value long-term wealth over short-term dopamine hits.</p><h3>Hidden Financial Leaks</h3><p>It’s rarely the big purchases that sink the ship; it’s the small, recurring leaks that add up over time.</p>',
                'is_published' => true,
                'published_at' => now(),
            ]
        ];

        foreach ($posts as $data) {
            $slug = $data['slug'];
            unset($data['slug']);
            
            \Illuminate\Support\Facades\DB::table('blog_posts')->updateOrInsert(
                ['slug' => $slug],
                array_merge($data, [
                    'user_id' => $adminId,
                    'meta_title' => $data['title'],
                    'meta_description' => $data['excerpt'],
                    'is_published' => \Illuminate\Support\Facades\DB::raw('true'),
                    'status' => 'published',
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );
        }

        // Update existing ones
        $existingSlugs = [
            'the-ultimate-guide-to-deep-work-for-remote-professionals',
            'how-to-build-unbreakable-habits-with-atomic-steps',
            'mindful-finance-managing-wealth-in-an-uncertain-world',
            'the-digital-detox-reclaiming-your-focus-in-the-age-of-noise'
        ];

        foreach ($existingSlugs as $slug) {
            $post = BlogPost::where('slug', $slug)->first();
            if ($post && (strlen(strip_tags($post->content)) < 150)) {
                $post->update([
                    'content' => '<h2>Strategic Optimization</h2><p>This module has been upgraded to meet the 2026 high-performance benchmarks. We recommend a weekly review of your daily anchors and financial leaks to maintain an optimal neural state.</p>',
                ]);
            }
        }
    }
}
