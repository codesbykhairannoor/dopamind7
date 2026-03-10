@extends('layouts.marketing')

@section('title', __('blog_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('blog_meta_desc') }}">
    <meta property="og:title" content="{{ __('blog_meta_og_title') }}">
    <meta property="og:description" content="{{ __('blog_meta_og_desc') }}">
    <meta property="og:type" content="blog">
    <meta property="og:url" content="{{ url('/resources/blog') }}">
@endsection

@section('content')

    @php
        $featuredPost = $posts->first();
        $remainingPosts = $posts->skip(1);
    @endphp

    {{-- SECTION 1: HERO (EDITORIAL STYLE - MATCHED WITH STORIES) --}}
    <header class="pt-32 pb-32 px-6 relative overflow-hidden bg-white border-b border-gray-100">
        {{-- Subtle Background: Grid & Glow --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -z-20"></div>

        <div class="max-w-5xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                
                {{-- Editorial Badge --}}
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    ⭐ {{ __('blog_hero_badge') }}
                </div>

                {{-- Headline --}}
                <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('blog_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('blog_hero_title_2') }}</span>
                </h1>

                @if($featuredPost)
                {{-- Featured Editorial Card --}}
                <div class="relative w-full max-w-4xl mx-auto group">
                    <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[3rem] blur opacity-15 transition duration-500 group-hover:opacity-25"></div>
                    
                    <a href="{{ route('resources.blog.show', $featuredPost->slug) }}" class="block relative bg-white rounded-[3rem] overflow-hidden border border-white shadow-2xl transform transition duration-500 hover:scale-[1.01]">
                        <div class="h-[300px] md:h-[450px] relative overflow-hidden bg-indigo-900">
                            @if($featuredPost->featured_image)
                                <img src="{{ asset('storage/' . $featuredPost->featured_image) }}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" alt="{{ $featuredPost->title }}">
                            @else
                                <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700"></div>
                            @endif
                            
                            {{-- Pattern Overlay --}}
                            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                            
                            {{-- Featured Content Info (Overlay) --}}
                            <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-left bg-gradient-to-t from-black/80 via-transparent to-transparent">
                                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-white/20 w-fit">
                                    {{ __('blog_feat_label') }}
                                </div>
                                <h2 class="text-2xl md:text-4xl font-black text-white leading-tight max-w-2xl mb-4 group-hover:text-indigo-200 transition">
                                    {{ $featuredPost->title }}
                                </h2>
                                <p class="text-white/80 font-medium text-sm md:text-base max-w-xl line-clamp-2">
                                    {{ $featuredPost->excerpt ?? Str::limit(strip_tags($featuredPost->content), 150) }}
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
                @endif
            </div>
        </div>
    </header>

    <section class="py-24 bg-slate-50/50">
        <div class="max-w-7xl mx-auto px-6">
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @forelse($remainingPosts as $post)
                    <a href="{{ route('resources.blog.show', $post->slug) }}" class="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-indigo-100 transition duration-300 flex flex-col">
                        <div class="h-48 bg-slate-100 relative overflow-hidden">
                            @if($post->featured_image)
                                <img src="{{ asset('storage/' . $post->featured_image) }}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="{{ $post->title }}">
                            @else
                                <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center text-5xl">📄</div>
                            @endif
                        </div>
                        <div class="p-8 flex-1 flex flex-col">
                            <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition leading-snug">
                                {{ $post->title }}
                            </h3>
                            <p class="text-sm text-slate-600 flex-1 mb-6 line-clamp-2 font-medium">
                                {{ $post->excerpt ?? Str::limit(strip_tags($post->content), 100) }}
                            </p>
                            <div class="flex items-center justify-between mt-auto">
                                <p class="text-xs font-bold text-slate-400">
                                    {{ $post->published_at?->format('M d, Y') ?? $post->created_at->format('M d, Y') }}
                                </p>
                                @if($post->location_name)
                                    <span class="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold uppercase">📍 {{ $post->location_name }}</span>
                                @endif
                            </div>
                        </div>
                    </a>
                @empty
                    @if(!$featuredPost)
                    <div class="col-span-full py-20 text-center">
                        <div class="text-6xl mb-6">🖋️</div>
                        <h3 class="text-2xl font-black text-slate-900 mb-2">No posts yet</h3>
                        <p class="text-slate-500">Check back later for fresh productivity insights.</p>
                    </div>
                    @endif
                @endforelse
            </div>
            
            <div class="mt-20">
                {{ $posts->links() }}
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE NEWSLETTER CTA (CLEAN SOFT INDIGO - NO BLACK COLORS) --}}
    <section class="py-24 px-6 bg-white">
        <div class="max-w-6xl mx-auto bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-12 border border-indigo-100">
            
            {{-- Light Decorative Blobs --}}
            <div class="absolute -right-20 -top-20 w-80 h-80 bg-white rounded-full blur-[80px] opacity-60 pointer-events-none"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/40 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div class="relative z-10 md:w-1/2">
                <div class="inline-block bg-white text-indigo-600 font-bold text-xs px-4 py-2 rounded-full mb-6 uppercase tracking-widest border border-indigo-100 shadow-sm">
                    💌 {{ __('blog_news_badge') }}
                </div>
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                    {{ __('blog_news_title') }}
                </h2>
                <p class="text-slate-600 text-lg font-medium">
                    {{ __('blog_news_desc') }}
                </p>
            </div>

            <div class="relative z-10 w-full md:w-1/2">
                <form action="#" class="flex flex-col sm:flex-row gap-3">
                    <input type="email" placeholder="{{ __('blog_news_placeholder') }}" class="w-full bg-white border border-slate-200 text-slate-900 font-medium px-6 py-4 rounded-2xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 placeholder-slate-400 transition shadow-sm" required>
                    <button type="submit" class="bg-indigo-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-indigo-700 transition shadow-md shrink-0">
                        {{ __('blog_news_btn') }}
                    </button>
                </form>
                <p class="text-slate-600 text-xs mt-4 font-medium">
                    {{ __('blog_news_note') }}
                </p>
            </div>
        </div>
    </section>

@endsection
