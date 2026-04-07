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

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "OneForMind Blog",
  "description": "{{ __('blog_meta_desc') }}",
  "url": "{{ url('/resources/blog') }}"
},{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "OneForMind",
    "item": "{{ url('/') }}"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Insights",
    "item": "{{ url('/resources/blog') }}"
  }]
}]
</script>
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
                <h1 class="text-5xl md:text-7xl mb-8 leading-[1.1] text-gray-900 tracking-tight font-black">
                    {{ __('blog_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('blog_hero_title_2') }}</span>
                </h1>

                @if($featuredPost)
                {{-- Featured Editorial Card --}}
                <div class="relative w-full max-w-4xl mx-auto group">
                    <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[3rem] blur opacity-15 transition duration-500 group-hover:opacity-25"></div>
                    
                    <a href="{{ route('resources.blog.show', $featuredPost->slug) }}" class="block relative bg-white rounded-[3rem] overflow-hidden border border-white shadow-2xl transform transition duration-500 hover:scale-[1.01]">
                        <div class="h-[300px] md:h-[450px] relative overflow-hidden bg-indigo-900">
                            @if($featuredPost->featured_image_url)
                                <img src="{{ $featuredPost->featured_image_url }}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" alt="{{ $featuredPost->title }}">
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
                                <h2 class="text-2xl md:text-4xl text-white leading-tight max-w-2xl mb-4 group-hover:text-indigo-200 transition font-black">
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
                    <article class="group relative flex flex-col bg-white rounded-3xl border border-slate-200/60 overflow-hidden hover:shadow-[0_20px_50px_rgba(79,70,229,0.08)] hover:-translate-y-1 transition-all duration-500">
                        <a href="{{ route('resources.blog.show', $post->slug) }}" class="block aspect-[16/10] overflow-hidden relative">
                            @if($post->featured_image_url)
                                <img src="{{ $post->featured_image_url }}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="{{ $post->title }}">
                            @else
                                <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center text-5xl italic text-indigo-200/30 tracking-tighter font-black">OneForMind</div>
                            @endif
                            
                            {{-- Category Badge --}}
                            @if($post->category)
                                <div class="absolute top-4 left-4 z-10">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 backdrop-blur-md shadow-sm border border-slate-100/50" style="color: {{ $post->category->color }}">
                                        {{ $post->category->name }}
                                    </span>
                                </div>
                            @endif
                        </a>

                        <div class="p-8 flex-1 flex flex-col">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                                    {{ $post->published_at?->format('M d, Y') ?? $post->created_at->format('M d, Y') }}
                                </span>
                                <span class="w-1 h-1 rounded-full bg-slate-200"></span>
                                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                                    {{ round(str_word_count(strip_tags($post->content)) / 200) }} min read
                                </span>
                            </div>

                            <h3 class="text-xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                                <a href="{{ route('resources.blog.show', $post->slug) }}">
                                    {{ $post->title }}
                                </a>
                            </h3>

                            <p class="text-slate-600 text-sm font-medium mb-8 line-clamp-2">
                                {{ $post->excerpt ?? Str::limit(strip_tags($post->content), 120) }}
                            </p>

                            <div class="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-xs">✨</div>
                                    <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Team OneForMind</span>
                                </div>
                                <a href="{{ route('resources.blog.show', $post->slug) }}" class="text-indigo-600 hover:text-indigo-700 font-bold text-xs flex items-center gap-2 group/btn">
                                    Read Post 
                                    <svg class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                </a>
                            </div>
                        </div>
                    </article>
                @empty
                    @if(!$featuredPost)
                    <div class="col-span-full py-20 text-center">
                        <div class="text-6xl mb-6 font-black">🖋️</div>
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
                <h2 class="text-3xl md:text-5xl text-slate-900 mb-4 leading-tight font-black">
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

