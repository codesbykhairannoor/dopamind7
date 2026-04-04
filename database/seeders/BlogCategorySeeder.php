<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Productivity', 'color' => '#4f46e5', 'description' => 'Master your daily focus and deep work.'],
            ['name' => 'Habits', 'color' => '#10b981', 'description' => 'Build atomic consistency through science-based habits.'],
            ['name' => 'Finance', 'color' => '#f59e0b', 'description' => 'The system for financial clarity and wealth tracking.'],
            ['name' => 'Technology', 'color' => '#06b6d4', 'description' => 'The engineering behind the OneForMind OS.'],
            ['name' => 'Mindfulness', 'color' => '#8b5cf6', 'description' => 'Maintaining mental clarity in a chaotic world.'],
        ];

        foreach ($categories as $cat) {
            BlogCategory::updateOrCreate(
                ['slug' => Str::slug($cat['name'])],
                [
                    'name' => $cat['name'],
                    'color' => $cat['color'],
                    'description' => $cat['description'],
                ]
            );
        }
    }
}
