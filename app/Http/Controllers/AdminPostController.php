<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminPostController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Blog/Index', [
            'posts' => BlogPost::with('category', 'user')->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blog/Form', [
            'categories' => BlogCategory::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'category_id' => 'nullable|exists:blog_categories,id',
            'is_published' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'geo_targeting' => 'nullable|array',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['slug'] = Str::slug($validated['title']);

        // Ensure defaults for categories if none provided
        if (!$validated['category_id']) {
            $validated['category_id'] = BlogCategory::first()?->id;
        }

        if ($validated['is_published'] && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        BlogPost::create($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Post created successfully.');
    }

    public function edit(BlogPost $post)
    {
        return Inertia::render('Admin/Blog/Form', [
            'post' => $post,
            'categories' => BlogCategory::all()
        ]);
    }

    public function update(Request $request, BlogPost $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'category_id' => 'nullable|exists:blog_categories,id',
            'is_published' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'geo_targeting' => 'nullable|array',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if (!$validated['category_id']) {
            $validated['category_id'] = BlogCategory::first()?->id;
        }

        if ($validated['is_published'] && !$post->is_published) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(BlogPost $post)
    {
        $post->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Post deleted successfully.');
    }
}