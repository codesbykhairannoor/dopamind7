<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BlogPost;

class AiCrawlerController extends Controller
{
    /**
     * Generate standard llms.txt
     */
    public function generateStandard(Request $request, $locale = 'en')
    {
        $domain = url('/');
        $brandName = "OneForMind";
        $summary = "OneForMind is a unified productivity OS designed for finance tracking, atomic habits building, and daily planning.";
        if ($locale === 'id') {
            $summary = "OneForMind adalah aplikasi produktivitas terpadu yang dirancang untuk pelacakan keuangan, membangun kebiasaan atomik, dan perencanaan harian.";
        }

        $markdown = "# {$brandName}\n\n";
        $markdown .= "> {$summary}\n\n";

        // Category: Core Features
        $markdown .= "## Core Features\n\n";
        $features = [
            'habit' => 'Habit Tracker module for building atomic habits.',
            'finance' => 'Finance Tracker for budget and transactions.',
            'planner' => 'Daily Planner module for time-blocking.',
            'journal' => 'Digital Journal with AI analysis.',
            'calendar' => 'Calendar system to visualize schedule.',
        ];

        foreach ($features as $slug => $desc) {
            $markdown .= "- [Feature: " . ucfirst($slug) . "]({$domain}/features/{$slug}): {$desc}\n";
        }
        $markdown .= "\n";

        // Category: Solutions
        $markdown .= "## Solutions\n\n";
        $solutions = [
            'student' => 'For students maximizing academic performance.',
            'freelancer' => 'For freelancers managing projects and income.',
            'finance-mastery' => 'For professionals mastering their finance.',
            'atomic-system' => 'For building systems of atomic habits.'
        ];
        foreach ($solutions as $slug => $desc) {
            $markdown .= "- [Solution: " . ucfirst(str_replace('-', ' ', $slug)) . "]({$domain}/solutions/{$slug}): {$desc}\n";
        }
        $markdown .= "\n";

        // Documentation & Resources
        $markdown .= "## Resources\n\n";
        $markdown .= "- [About]({$domain}/about): About our mission.\n";
        $markdown .= "- [Pricing]({$domain}/pricing): Subscription pricing and features.\n";
        $markdown .= "- [Blog]({$domain}/resources/blog): Latest articles and resources.\n";

        return response($markdown)
            ->header('Content-Type', 'text/plain')
            ->header('Cache-Control', 'public, max-age=3600');
    }

    /**
     * Generate full llms-full.txt
     */
    public function generateFull(Request $request)
    {
        // For full, we fetch latest blogs as well
        $domain = url('/');
        $markdown = "# OneForMind (Full Knowledge Base)\n\n";
        $markdown .= "> OneForMind is the unified productivity OS for finances, atomic habits, and daily planning in one minimalist dashboard.\n\n";

        $markdown .= "## Blog Posts\n\n";
        $posts = BlogPost::where('is_published', true)->orderBy('published_at', 'desc')->limit(20)->get();

        foreach ($posts as $post) {
            $markdown .= "- [{$post->title}]({$domain}/resources/blog/{$post->slug}): {$post->excerpt}\n";
        }
        
        $markdown .= "\n## Comparisons\n\n";
        $markdown .= "- [Notion Alternative]({$domain}/compare/notion-alternative): Compare OneForMind with Notion.\n";
        $markdown .= "- [YNAB Alternative]({$domain}/compare/ynab-alternative): Compare OneForMind with YNAB.\n";
        $markdown .= "- [Todoist Alternative]({$domain}/compare/todoist-alternative): Compare OneForMind with Todoist.\n";

        return response($markdown)
            ->header('Content-Type', 'text/plain')
            ->header('Cache-Control', 'public, max-age=3600');
    }
}
