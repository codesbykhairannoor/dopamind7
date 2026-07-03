<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProgrammaticSeoController extends Controller
{
    /**
     * The master database of competitors for pSEO rendering.
     * Expanded in 2026 for Extreme Fact Density (White Hat SEO).
     */
    private $competitors = [
        // Habits
        'habitica' => [
            'name' => 'Habitica', 'category' => 'habit',
            'pricing' => 'Free / $4.99 per month',
            'pros' => 'Gamified RPG experience, pixel art, party quests.',
            'cons' => 'Can feel too game-like for serious professionals, overwhelming UI.',
            'our_advantage' => 'OneForMind offers a sleek, minimalist habit tracker directly connected to your finances and calendar without RPG distractions.',
            'target_audience' => 'Gamers and teenagers.'
        ],
        'streaks' => [
            'name' => 'Streaks', 'category' => 'habit',
            'pricing' => '$4.99 (One-time iOS)',
            'pros' => 'Beautiful native iOS app, Apple Health integration.',
            'cons' => 'Apple ecosystem only, limited to 24 habits max.',
            'our_advantage' => 'OneForMind works cross-platform (Web, iOS, Android) with unlimited habits and built-in journaling.',
            'target_audience' => 'Apple device users.'
        ],
        'habitify' => [
            'name' => 'Habitify', 'category' => 'habit',
            'pricing' => '$4.99/month or $39.99/year',
            'pros' => 'Data-driven charts, clean interface.',
            'cons' => 'Expensive for just a habit tracker.',
            'our_advantage' => 'Why pay $40/year just for habits? OneForMind gives you habits, finances, and a planner in one unified workspace.',
            'target_audience' => 'Data-driven individuals.'
        ],
        // Finance
        'ynab' => [
            'name' => 'YNAB (You Need A Budget)', 'category' => 'finance',
            'pricing' => '$14.99/month or $99/year',
            'pros' => 'Zero-based budgeting philosophy, bank syncing.',
            'cons' => 'Steep learning curve, very expensive annual fee.',
            'our_advantage' => 'OneForMind offers powerful, intuitive budgeting without the $99/year price tag or steep learning curve.',
            'target_audience' => 'Hardcore budgeters.'
        ],
        'wallet' => [
            'name' => 'Wallet by BudgetBakers', 'category' => 'finance',
            'pricing' => 'Free / $5.99/month',
            'pros' => 'Multi-currency, bank synchronization.',
            'cons' => 'Bank sync can be unreliable, complex UI.',
            'our_advantage' => 'We focus on intentional, mindful spending tracking rather than automated chaos.',
            'target_audience' => 'Multi-currency users.'
        ],
        'spendee' => [
            'name' => 'Spendee', 'category' => 'finance',
            'pricing' => 'Free / $2.99/month',
            'pros' => 'Shared wallets for couples, colorful design.',
            'cons' => 'Free version is very limited (no bank sync).',
            'our_advantage' => 'OneForMind links your financial goals directly with your daily habits and planner.',
            'target_audience' => 'Couples and families.'
        ],
        // Planner
        'todoist' => [
            'name' => 'Todoist', 'category' => 'planner',
            'pricing' => 'Free / $5/month',
            'pros' => 'Natural language processing, blazing fast.',
            'cons' => 'Reminders are locked behind the Pro paywall.',
            'our_advantage' => 'We include reminders and calendar views natively without forcing you into a premium tier just to get a notification.',
            'target_audience' => 'GTD (Getting Things Done) practitioners.'
        ],
        'ticktick' => [
            'name' => 'TickTick', 'category' => 'planner',
            'pricing' => 'Free / $35.99/year',
            'pros' => 'Built-in Pomodoro timer, calendar view.',
            'cons' => 'Calendar view is paid only, cluttered interface.',
            'our_advantage' => 'OneForMind provides a unified drag-and-drop calendar and planner natively integrated with your habit tracker.',
            'target_audience' => 'Pomodoro users.'
        ],
        'clickup' => [
            'name' => 'ClickUp', 'category' => 'planner',
            'pricing' => 'Free / $10/user/month',
            'pros' => 'Extremely customizable, everything-app approach.',
            'cons' => 'Incredibly slow load times, overwhelming for personal use.',
            'our_advantage' => 'OneForMind is designed for personal productivity (B2C), ensuring blazing fast load times (TTFB < 200ms) without enterprise bloat.',
            'target_audience' => 'Teams and enterprises.'
        ],
        // Notes
        'evernote' => [
            'name' => 'Evernote', 'category' => 'notes',
            'pricing' => 'Free / $14.99/month',
            'pros' => 'Web clipper, optical character recognition (OCR).',
            'cons' => 'Exorbitant pricing hikes, bloated software, constant sync issues.',
            'our_advantage' => 'Move away from legacy bloatware. OneForMind offers a lightning-fast, modern journaling and note-taking experience.',
            'target_audience' => 'Legacy note-takers.'
        ],
        'applenotes' => [
            'name' => 'Apple Notes', 'category' => 'notes',
            'pricing' => 'Free (Included with Apple devices)',
            'pros' => 'Deep OS integration, fast syncing.',
            'cons' => 'Locked to the Apple ecosystem, poor formatting options.',
            'our_advantage' => 'OneForMind is universally accessible (Web, Windows, Android, iOS) with rich formatting.',
            'target_audience' => 'Apple users.'
        ],
        'onenote' => [
            'name' => 'OneNote', 'category' => 'notes',
            'pricing' => 'Free (Microsoft Account required)',
            'pros' => 'Infinite canvas, free sync.',
            'cons' => 'Sync conflicts, heavy application, confusing hierarchy.',
            'our_advantage' => 'We use a clean, linear, and predictable note-taking structure connected directly to your daily planner.',
            'target_audience' => 'Students and Microsoft users.'
        ],
        // Custom
        'spreadsheet' => [
            'name' => 'Spreadsheet (Excel/Google Sheets)', 'category' => 'custom',
            'pricing' => 'Free / Included in Office 365',
            'pros' => 'Infinite flexibility, mathematical formulas.',
            'cons' => 'Requires manual setup, terrible on mobile, no native reminders.',
            'our_advantage' => 'Stop building your life in rows and columns. OneForMind provides purpose-built UI for habits, finances, and goals.',
            'target_audience' => 'Data analysts and DIYers.'
        ],
        'notion' => [
            'name' => 'Notion', 'category' => 'custom',
            'pricing' => 'Free / $10/month',
            'pros' => 'Block-based editor, relational databases.',
            'cons' => 'Steep learning curve, terrible mobile app speed, no offline mode.',
            'our_advantage' => 'Notion is a blank canvas that requires hours of setup. OneForMind works out of the box with zero configuration required.',
            'target_audience' => 'System architects and tech enthusiasts.'
        ],
        'obsidian' => [
            'name' => 'Obsidian', 'category' => 'custom',
            'pricing' => 'Free / $8/month for Sync',
            'pros' => 'Local-first, markdown, bi-directional linking.',
            'cons' => 'Sync costs money, not meant for task management or finance.',
            'our_advantage' => 'While Obsidian is great for knowledge bases, OneForMind is built for actionable life management (Finance, Habits, Tasks).',
            'target_audience' => 'Writers and researchers (Zettelkasten).'
        ],
        // Management
        'monday' => [
            'name' => 'Monday.com', 'category' => 'management',
            'pricing' => '$10/user/month (Minimum 3 users)',
            'pros' => 'Colorful UI, great automations.',
            'cons' => 'Forced minimum of 3 users ($30/month minimum), overkill for personal use.',
            'our_advantage' => 'OneForMind is priced and designed for individuals, not corporate teams.',
            'target_audience' => 'Marketing and project teams.'
        ],
        'trello' => [
            'name' => 'Trello', 'category' => 'management',
            'pricing' => 'Free / $6/user/month',
            'pros' => 'Simple Kanban boards, easy to use.',
            'cons' => 'Lacks depth for complex tracking (habits, finances).',
            'our_advantage' => 'Trello is just Kanban. OneForMind is your entire personal operating system.',
            'target_audience' => 'Visual thinkers.'
        ],
        'asana' => [
            'name' => 'Asana', 'category' => 'management',
            'pricing' => 'Free / $13.49/user/month',
            'pros' => 'List and board views, timeline feature.',
            'cons' => 'Strictly B2B, feels very corporate, expensive.',
            'our_advantage' => 'OneForMind brings enterprise-level organization to your personal life without the corporate rigidity.',
            'target_audience' => 'Corporate managers.'
        ],
    ];

    /**
     * Handle programmatic SEO compare pages dynamically.
     */
    public function compare(Request $request, $competitor)
    {
        if (!array_key_exists($competitor, $this->competitors)) {
            abort(404);
        }

        $data = $this->competitors[$competitor];

        // 1. JSON-LD Breadcrumb Schema
        $breadcrumbSchema = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => url('/')],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Compare', 'item' => url('/compare/' . $data['category'] . '-apps')],
                ['@type' => 'ListItem', 'position' => 3, 'name' => "OneForMind vs {$data['name']}", 'item' => url()->current()]
            ]
        ];

        // 2. JSON-LD FAQ Schema (Extreme Fact Density for AI Overviews)
        $faqSchema = [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => [
                [
                    '@type' => 'Question',
                    'name' => "Is OneForMind better than {$data['name']}?",
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => "Yes, especially if you want to avoid {$data['cons']}. OneForMind provides an all-in-one solution combining {$data['category']} features directly with your finances and habits."
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => "How much does {$data['name']} cost compared to OneForMind?",
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => "{$data['name']} costs {$data['pricing']}. OneForMind offers a unified ecosystem, often replacing 3-4 separate subscriptions."
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => "What is the main disadvantage of {$data['name']}?",
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => "The main drawback of {$data['name']} is that it is {$data['cons']} This makes it less ideal for users looking for a streamlined personal operating system."
                    ]
                ]
            ]
        ];

        $schemas = [
            $breadcrumbSchema,
            $faqSchema
        ];

        view()->share('seo_schema', json_encode($schemas));

        $viewName = "compare.{$competitor}";
        if (view()->exists($viewName)) {
            // Render user's original design but WITH the new SEO schemas
            return view($viewName, compact('data'));
        }

        return view('compare.universal-p-seo-template', compact('data'));
    }
}
