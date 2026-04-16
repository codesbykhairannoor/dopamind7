<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use Illuminate\Support\Str;

class BlogContentSeeder extends Seeder
{
    public function run()
    {
        $posts = [
            [
                'title' => 'The Ultimate Guide to Deep Work for Remote Professionals',
                'excerpt' => 'Master the art of focused productivity in an increasingly distracted world. Learn how to reclaim your attention and achieve more in less time.',
                'content' => '<h2>What is Deep Work?</h2><p>Deep work is a state of peak concentration that lets you learn hard things and create quality work quickly. In a world full of notifications and shallow tasks, it is becoming a rare and valuable skill.</p><h3>The Rules of Deep Work</h3><ul><li>Work Deeply: Schedule your focus periods.</li><li>Embrace Boredom: Don\'t reach for your phone the moment you feel a lack of stimulation.</li><li>Quit Social Media: Use tools that truly add value to your life.</li><li>Drain the Shallows: Minimize administrative tasks.</li></ul>',
                'category_id' => 1,
                'featured_image' => 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
                'meta_title' => 'Master Deep Work: The Professional\'s Guide to Focus',
                'meta_description' => 'Discover how to implement deep work strategies to boost your remote work productivity and focus.',
            ],
            [
                'title' => 'How to Build Unbreakable Habits with Atomic Steps',
                'excerpt' => 'Small changes lead to remarkable results. Discover the science of habit formation and how to make 1% improvements every day.',
                'content' => '<h2>The Power of Tiny Changes</h2><p>Most people fail at habits because they try to change too much too fast. Atomic habits are tiny changes that, when compounded over time, lead to massive lifestyle shifts.</p><h3>The 4 Laws of Behavior Change</h3><ol><li>Make it Obvious: Design your environment for success.</li><li>Make it Attractive: Use temptation bundling.</li><li>Make it Easy: Reduce friction for good habits.</li><li>Make it Satisfying: Give yourself a small reward.</li></ol>',
                'category_id' => 2,
                'featured_image' => 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop',
                'meta_title' => 'Atomic Habits: Building Long-Lasting Success',
                'meta_description' => 'Learn the science of habit formation and how small daily steps can lead to unbreakable routines.',
            ],
            [
                'title' => 'Mindful Finance: Managing Wealth in an Uncertain World',
                'excerpt' => 'Financial freedom starts with a clear mind. Learn how to manage your expenses and investments with intention and calm.',
                'content' => '<h2>Money and the Mind</h2><p>Financial stress is often a reflection of our relationship with money rather than the amount we have. Mindful finance is about being intentional with every dollar you earn and spend.</p><h3>Key Financial Pillars</h3><ul><li>The 50/30/20 Rule: Needs, Wants, and Savings.</li><li>Emergency Funds: Creating a safety net for peace of mind.</li><li>Investing for the Future: Long-term growth over short-term speculation.</li></ul>',
                'category_id' => 3,
                'featured_image' => 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop',
                'meta_title' => 'Mindful Finance: A Strategic Approach to Wealth',
                'meta_description' => 'Achieve financial peace by managing your wealth with intention. Practical tips for a better relationship with money.',
            ],
            [
                'title' => 'The Digital Detox: Reclaiming Your Focus in the Age of Noise',
                'excerpt' => 'Re-establish your connection with the real world by strategically unplugging from digital distractions.',
                'content' => '<h2>The Constant Noise</h2><p>We are the first generation to deal with the constant pull of the attention economy. Digital detoxing isn\'t about leaving technology forever, but about setting boundaries.</p><h3>How to Detox Digitally</h3><ul><li>Screen-Free Mornings: Don\'t check your phone for the first hour.</li><li>Notification Minimalist: Turn off everything except essential calls.</li><li>Physical Presence: Keep phones off the dinner table.</li></ul>',
                'category_id' => 5,
                'featured_image' => 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop',
                'meta_title' => 'Digital Detox: Reclaim Your Mind from the Noise',
                'meta_description' => 'Strategies for reclaiming your focus and attention by strategically reducing digital consumption.',
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::create(array_merge($post, [
                'user_id' => 1,
                'slug' => Str::slug($post['title']),
                'is_published' => true,
                'published_at' => now(),
            ]));
        }
    }
}
