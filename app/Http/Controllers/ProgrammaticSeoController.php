<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProgrammaticSeoController extends Controller
{
    /**
     * The master database of competitors for pSEO rendering.
     * This ensures mathematical uniqueness across all generated templates.
     */
    private $competitors = [
        // Habits
        'habitica' => ['name' => 'Habitica', 'category' => 'habit'],
        'streaks' => ['name' => 'Streaks', 'category' => 'habit'],
        'habitify' => ['name' => 'Habitify', 'category' => 'habit'],
        // Finance
        'ynab' => ['name' => 'YNAB', 'category' => 'finance'],
        'wallet' => ['name' => 'Wallet', 'category' => 'finance'],
        'spendee' => ['name' => 'Spendee', 'category' => 'finance'],
        // Planner
        'todoist' => ['name' => 'Todoist', 'category' => 'planner'],
        'ticktick' => ['name' => 'TickTick', 'category' => 'planner'],
        'clickup' => ['name' => 'ClickUp', 'category' => 'planner'],
        // Notes
        'evernote' => ['name' => 'Evernote', 'category' => 'notes'],
        'applenotes' => ['name' => 'Apple Notes', 'category' => 'notes'],
        'onenote' => ['name' => 'OneNote', 'category' => 'notes'],
        // Custom
        'spreadsheet' => ['name' => 'Spreadsheet', 'category' => 'custom'],
        'notion' => ['name' => 'Notion', 'category' => 'custom'],
        'obsidian' => ['name' => 'Obsidian', 'category' => 'custom'],
        // Management
        'monday' => ['name' => 'Monday.com', 'category' => 'management'],
        'trello' => ['name' => 'Trello', 'category' => 'management'],
        'asana' => ['name' => 'Asana', 'category' => 'management'],
    ];

    /**
     * Handle programmatic SEO compare pages dynamically.
     */
    public function compare(Request $request, $competitor)
    {
        // Security & Quality Check: If competitor doesn't exist, return 404 to prevent thin content (SpamBrain penalty)
        if (!array_key_exists($competitor, $this->competitors)) {
            abort(404);
        }

        $data = $this->competitors[$competitor];
        $viewName = "compare.{$competitor}";

        // Inject dynamic JSON-LD Schema to ensure high fact density for AI crawlers
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'WebPage',
            'name' => "OneForMind vs {$data['name']} Alternative",
            'description' => "Compare OneForMind and {$data['name']} to find the best {$data['category']} application in 2026."
        ];

        // Pass schema via view composer or shared data if using Blade
        view()->share('seo_schema', json_encode($schema));

        // If specific view exists (legacy), render it. Otherwise, render a universal pSEO template
        if (view()->exists($viewName)) {
            return view($viewName, compact('data'));
        }

        // Fallback to universal template for scalability
        return view('compare.universal-p-seo-template', compact('data'));
    }
}
