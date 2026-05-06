<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class FinalBlogSeeder extends Seeder
{
    public function run(): void
    {
        $adminId = User::whereRaw('is_admin IS TRUE')->first()?->id ?? 1;

        $posts = [
            [
                'title' => 'Atomic Habits in the Digital Era: Building a Bulletproof Routine with AI',
                'slug' => 'atomic-habits-digital-era-ai-routine',
                'category_id' => 2,
                'featured_image' => 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop',
                'excerpt' => 'Discover how to combine James Clear’s atomic habits framework with modern AI tools to build routines that actually stick.',
                'content' => '<h2>The New Era of Habit Formation</h2><p>In the digital age, our attention is the most valuable currency. Building habits isn’t just about willpower anymore; it’s about architecting your environment—both physical and digital.</p><img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800" alt="Planner" style="width:100%; border-radius: 20px; margin: 20px 0;"><h3>Why AI is the Ultimate Accountability Partner</h3><p>Traditional habit trackers are passive. Modern AI engines, like the one powering OneForMind, are proactive. They analyze your patterns, predict when you might fail, and nudge you with precision.</p><blockquote>"Success is the product of daily habits—not once-in-a-lifetime transformations." — James Clear</blockquote><h3>3 Steps to AI-Powered Routines</h3><ol><li><strong>Define your identity:</strong> Start with who you want to become, not what you want to achieve.</li><li><strong>Automate the tracking:</strong> Use tools that reduce friction. OneForMind’s batch entry and AI insights make this seamless.</li><li><strong>Iterate based on data:</strong> Don’t guess. Use the neural insights to see which habits drive the most mood improvement.</li></ol><p>By leveraging neural OS principles, you transform "trying to be better" into a systematic process of evolution.</p>',
            ],
            [
                'title' => 'Mastering Cashflow: Why Tracking Every Cent is the Secret to Financial Freedom',
                'slug' => 'mastering-cashflow-secret-financial-freedom',
                'category_id' => 3,
                'featured_image' => 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
                'excerpt' => 'Financial freedom isn’t about how much you earn, but how much you keep. Learn the neural approach to cashflow management.',
                'content' => '<h2>The Psychology of Spending</h2><p>Most people fail at finance because they view it as math. In reality, finance is 90% psychology and 10% math. Tracking your expenses creates a feedback loop that rewires your brain to value long-term wealth over short-term dopamine hits.</p><img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800" alt="Finance" style="width:100%; border-radius: 20px; margin: 20px 0;"><h3>The Hidden Leaks</h3><p>It’s rarely the big purchases that sink the ship; it’s the small, recurring leaks. A $10 subscription here, a $5 coffee there—over a decade, these are the difference between retiring early and working forever.</p><h3>The OneForMind Finance Framework</h3><ul><li><strong>Daily Logging:</strong> Log your transactions as they happen to maintain high financial awareness.</li><li><strong>Budget Anchors:</strong> Set hard limits on categories that don’t contribute to your growth.</li><li><strong>Monthly Audits:</strong> Use the AI Audit feature to get an objective view of your financial health.</li></ul><p>Remember: You cannot manage what you do not measure. Start tracking today to own your tomorrow.</p>',
            ],
            [
                'title' => 'The Ultimate Guide to Deep Work for Remote Professionals',
                'slug' => 'the-ultimate-guide-to-deep-work-for-remote-professionals',
                'category_id' => 1,
                'featured_image' => 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
                'excerpt' => 'In a world of constant notifications, the ability to focus on a single task is a superpower. Here is how to master it.',
                'content' => '<h2>The Attention Economy</h2><p>We live in a world designed to distract us. Every app on your phone is optimized to steal your focus. Deep work is the antidote to this fragmentation.</p><h3>Shallow vs. Deep Work</h3><p>Shallow work is logistical-style tasks, often performed while distracted. Deep work is professional activity performed in a state of distraction-free concentration that pushes your cognitive capabilities to their limit.</p><h3>Building Your Deep Work Chamber</h3><p>To enter a flow state, you need to eliminate all external triggers. This means turning off notifications, using a dedicated space, and planning your sessions in advance using a planner that understands your cognitive load.</p><p>OneForMind’s Planner is designed to help you carve out these blocks of time, ensuring that your most important work gets your best energy.</p>',
            ],
            [
                'title' => 'Mindful Finance: Managing Wealth in an Uncertain World',
                'slug' => 'mindful-finance-managing-wealth-in-an-uncertain-world',
                'category_id' => 5,
                'featured_image' => 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop',
                'excerpt' => 'True wealth is the ability to fully experience life. Discover how mindfulness can transform your financial decisions.',
                'content' => '<h2>Money and the Mind</h2><p>Financial stress is often a reflection of our relationship with money rather than the amount we have. Mindful finance is about being present with your numbers without judgment.</p><h3>The FOMO Trap</h3><p>In an uncertain world, the fear of missing out (FOMO) often leads to impulsive investments or unnecessary spending. Mindfulness helps you detach from the noise and focus on your personal values.</p><h3>Integration with Daily Life</h3><p>By connecting your mood tracking with your spending habits, you can identify "emotional spending" patterns. This awareness is the first step toward lasting financial peace.</p>',
            ],
            [
                'title' => 'The Digital Detox: Reclaiming Your Focus in the Age of Noise',
                'slug' => 'the-digital-detox-reclaiming-your-focus-in-the-age-of-noise',
                'category_id' => 6,
                'featured_image' => 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop',
                'excerpt' => 'Is your phone owning you, or are you owning your phone? Learn how to perform a digital detox without disappearing from the world.',
                'content' => '<h2>The Constant Noise</h2><p>We are the first generation to deal with the constant pull of the attention economy. A digital detox isn’t about throwing away your gadgets; it’s about intentionality.</p><h3>Signs You Need a Detox</h3><p>If you find yourself scrolling mindlessly, feeling anxious without your phone, or losing sleep to screens, it’s time to reset. A weekend of "low-fi" living can significantly lower your cortisol levels.</p><h3>How to Reset</h3><ol><li><strong>Audit your apps:</strong> Delete what doesn’t add value.</li><li><strong>Set digital boundaries:</strong> Use "No Phone Zones" in your home.</li><li><strong>Replace scrolling with journaling:</strong> Use the OneForMind Journal to process your thoughts instead of consuming others.</li></ol><p>Reclaim your time. Reclaim your focus. Reclaim your life.</p>',
            ]
        ];

        foreach ($posts as $data) {
            $slug = $data['slug'];
            unset($data['slug']);
            
            DB::table('blog_posts')->updateOrInsert(
                ['slug' => $slug],
                array_merge($data, [
                    'user_id' => $adminId,
                    'meta_title' => $data['title'],
                    'meta_description' => $data['excerpt'],
                    'is_published' => DB::raw('true'),
                    'published_at' => now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );
        }
    }
}
