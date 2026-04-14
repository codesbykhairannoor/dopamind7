<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogContentSeeder extends Seeder
{
    public function run(): void
    {
        $author = User::query()->first();
        $category = BlogCategory::query()->firstOrCreate(
            ["slug" => "productivity"],
            [
                "name" => "Productivity",
                "description" => "Productivity systems, planning, and personal operations.",
                "color" => "#4f46e5",
            ]
        );

        $posts = [
            [
                "title" => "Why Habit + Finance in One App Beats Notion Templates",
                "excerpt" => "Running habits and money in separate tools creates friction. Here is a practical framework to combine both in one daily operating system.",
                "meta_title" => "Habit and Finance in One App: Better Than Notion Templates",
                "meta_description" => "Learn why combining habit tracking and finance planning in one app helps you stay consistent without juggling Notion templates.",
                "meta_keywords" => "habit tracker, finance tracker, notion alternative, productivity app, one app for habits and money",
                "featured_image" => "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
                "content" => <<<MD
Most people do not fail because they lack motivation. They fail because their system has too many handoffs.

When your habits live in one tool and your money plan lives in another, your brain pays a **context-switch tax** every day.

## The hidden cost of fragmented productivity

If you use:
- one app for checklists,
- another for budgeting,
- another for journaling,

you lose momentum before you even start.

## Why combining habits and finance works

Your money behavior is a habit loop:
1. Trigger (payday, impulse, social pressure),
2. Action (spend, save, invest),
3. Outcome (peace or stress).

When habit tracking and finance tracking are connected, you can review your behavior from one dashboard and improve faster.

## A simple weekly operating ritual

Use this 20-minute review every week:
- Check your top 3 habits,
- Check your top 3 spending categories,
- Compare planned vs actual,
- Set one improvement for next week.

Small loops, repeated weekly, outperform complex templates.

## Final thought

Notion templates are great for flexibility. But if your goal is consistency, a focused app with habit + finance in one place often wins.

Continue learning:
- [Build a Personal Operating System in 30 Minutes](/resources/blog/build-a-personal-operating-system-in-30-minutes)
- [From Planner Chaos to Clarity: The Weekly Reset Framework](/resources/blog/from-planner-chaos-to-clarity-the-weekly-reset-framework)
MD,
            ],
            [
                "title" => "Build a Personal Operating System in 30 Minutes",
                "excerpt" => "A practical starter setup for people who want daily planning, habits, and financial clarity without over-engineering.",
                "meta_title" => "How to Build a Personal Productivity OS in 30 Minutes",
                "meta_description" => "Step-by-step guide to build a simple personal operating system with habits, planning, and finance in under 30 minutes.",
                "meta_keywords" => "personal operating system, productivity setup, habit planning, daily planning app, finance clarity",
                "featured_image" => "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1400&q=80",
                "content" => <<<MD
You do not need a complicated second brain to get your life in order.

You need a **small operating system** you can actually run every day.

## Step 1: Define your daily anchors

Pick 3 anchors:
- one health habit,
- one work habit,
- one money habit.

Examples:
- 15-minute walk,
- 90-minute deep work block,
- log every expense.

## Step 2: Create a daily plan with only 3 priorities

Most people overload their plan and feel behind by noon.

Use:
- 1 must-do task,
- 2 important tasks,
- optional backlog.

## Step 3: Track cashflow, not just budget

Budgets fail when they are static.

Track:
- income inflow,
- essential outflow,
- discretionary outflow.

This gives immediate feedback and keeps your plan realistic.

## Step 4: End your day with a 5-minute closure

Before sleep:
- mark completed habits,
- review spending today,
- plan first task for tomorrow.

That is enough to create momentum.

## Final thought

A personal OS should feel light. If your system is heavy, simplify until it is executable on your worst day.

Related reads:
- [Why Habit + Finance in One App Beats Notion Templates](/resources/blog/why-habit-finance-in-one-app-beats-notion-templates)
- [From Planner Chaos to Clarity: The Weekly Reset Framework](/resources/blog/from-planner-chaos-to-clarity-the-weekly-reset-framework)
MD,
            ],
            [
                "title" => "From Planner Chaos to Clarity: The Weekly Reset Framework",
                "excerpt" => "A weekly reset method to align goals, habits, and money decisions so your next week starts with clarity.",
                "meta_title" => "Weekly Reset Framework for Habits, Planning, and Finance",
                "meta_description" => "Use this weekly reset framework to align your planner, habits, and finances in one system and reduce mental overload.",
                "meta_keywords" => "weekly reset, planner workflow, habit review, finance review, productivity framework",
                "featured_image" => "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=80",
                "content" => <<<MD
If your week starts in confusion, your tools are not synchronized.

The fix is not another app. The fix is a **weekly reset protocol**.

## The 4-part reset

### 1) Reflect (10 minutes)
- What worked?
- What drained energy?
- Which habit broke first?

### 2) Reconcile (10 minutes)
- Review transactions,
- tag unusual expenses,
- confirm your cash runway.

### 3) Re-prioritize (10 minutes)
- choose one weekly outcome,
- map daily top tasks,
- remove low-value commitments.

### 4) Recommit (5 minutes)
- lock 3 non-negotiable habits,
- define one spending rule for the week.

## Why this framework works

It links execution, behavior, and money in one loop.  
You stop reacting and start steering.

## Final thought

Clarity is not motivation. Clarity is structure.  
Run the reset every week, and your planner becomes a decision engine, not a to-do dump.

More from OneForMind:
- [Why Habit + Finance in One App Beats Notion Templates](/resources/blog/why-habit-finance-in-one-app-beats-notion-templates)
- [Build a Personal Operating System in 30 Minutes](/resources/blog/build-a-personal-operating-system-in-30-minutes)
MD,
            ],
        ];

        foreach ($posts as $postData) {
            $slug = Str::slug($postData["title"]);

            BlogPost::query()->updateOrCreate(
                ["slug" => $slug],
                array_merge($postData, [
                    "slug" => $slug,
                    "user_id" => $author?->id,
                    "category_id" => $category->id,
                    "is_published" => true,
                    "published_at" => now(),
                ])
            );
        }
    }
}

