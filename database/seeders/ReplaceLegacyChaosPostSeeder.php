<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ReplaceLegacyChaosPostSeeder extends Seeder
{
    public function run(): void
    {
        BlogPost::query()
            ->where("slug", "stop-managing-chaos-why-we-built-the-oneformind-unified-os")
            ->delete();

        $author = User::query()->first();
        $category = BlogCategory::query()->firstOrCreate(
            ["slug" => "productivity"],
            [
                "name" => "Productivity",
                "description" => "Productivity systems, planning, and personal operations.",
                "color" => "#4f46e5",
            ]
        );

        $title = "The 3-Stack Productivity System: Habit, Finance, and Planning in One Flow";
        $slug = Str::slug($title);

        BlogPost::query()->updateOrCreate(
            ["slug" => $slug],
            [
                "user_id" => $author?->id,
                "category_id" => $category->id,
                "title" => $title,
                "slug" => $slug,
                "excerpt" => "A practical framework to run habits, money decisions, and daily planning as one integrated operating system.",
                "content" => <<<MD
Most productivity setups break because they isolate systems that should work together.

Your habits shape your energy.  
Your finances shape your options.  
Your planner shapes your execution.

When these three live in separate tools, you get noise.  
When they live in one flow, you get clarity.

## The 3-Stack model

### 1) Habit Stack (Behavior Layer)
- Track 3 non-negotiable daily habits.
- Focus on consistency, not perfection.
- Use streaks as feedback, not pressure.

### 2) Finance Stack (Decision Layer)
- Log daily spending.
- Review weekly category drift.
- Connect spending with behavior triggers.

### 3) Planning Stack (Execution Layer)
- Define one weekly outcome.
- Set top 3 tasks per day.
- Keep backlog separate from priorities.

## Daily operating rhythm (15 minutes)

Morning (5 min):
- check habits,
- check spending constraints,
- lock top 3 tasks.

Evening (10 min):
- close habits,
- reconcile money logs,
- prepare tomorrow's first action.

## Why this framework outperforms template-heavy setups

Templates are useful for flexibility, but too much flexibility can create friction.  
A constrained system reduces decisions and increases execution quality.

## Final thought

Productivity is not about adding more tools.  
It is about reducing cognitive handoffs between your behavior, money, and execution system.

Related reads:
- [Why Habit + Finance in One App Beats Notion Templates](/resources/blog/why-habit-finance-in-one-app-beats-notion-templates)
- [From Planner Chaos to Clarity: The Weekly Reset Framework](/resources/blog/from-planner-chaos-to-clarity-the-weekly-reset-framework)
MD,
                "featured_image" => "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
                "meta_title" => "Habit, Finance, and Planning in One Productivity System",
                "meta_description" => "Learn a simple 3-stack framework to combine habit tracking, finance clarity, and daily planning in one productivity flow.",
                "meta_keywords" => "productivity system, habit finance planner, personal operating system, oneformind",
                "is_published" => true,
                "published_at" => now(),
            ]
        );
    }
}

