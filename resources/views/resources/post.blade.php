@extends('layouts.marketing')

@section('title', $post->meta_title ?? $post->title)

@section('meta')
    <meta name="description" content="{{ $post->meta_description ?? $post->excerpt }}">
    @if($post->meta_keywords)
        <meta name="keywords" content="{{ $post->meta_keywords }}">
    @endif
    <meta property="og:title" content="{{ $post->meta_title ?? $post->title }}">
    <meta property="og:description" content="{{ $post->meta_description ?? $post->excerpt }}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="{{ url()->current() }}">
    @if($post->featured_image)
        <meta property="og:image" content="{{ asset('storage/' . $post->featured_image) }}">
    @endif
    
    <link rel="canonical" href="{{ url()->current() }}" />

    @if($post->location_name)
        <meta name="geo.placename" content="{{ $post->location_name }}">
        @if($post->latitude && $post->longitude)
            <meta name="geo.position" content="{{ $post->latitude }};{{ $post->longitude }}">
            <meta name="ICBM" content="{{ $post->latitude }}, {{ $post->longitude }}">
        @endif
    @endif
@endsection

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ $post->title }}",
  "description": "{{ $post->meta_description ?? $post->excerpt }}",
  "datePublished": "{{ $post->published_at ? $post->published_at->toIso8601String() : $post->created_at->toIso8601String() }}",
  "author": {
    "@type": "Person",
    "name": "Khairan N."
  },
  "url": "{{ url()->current() }}"
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
    "name": "Blog",
    "item": "{{ route('resources.blog') }}"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "{{ $post->title }}",
    "item": "{{ url()->current() }}"
  }]
}]
</script>
@endsection

@section('content')
<article class="pt-32 pb-24 px-6 relative overflow-hidden bg-white">
    <div class="max-w-4xl mx-auto">
        {{-- Breadcrumbs --}}
        <nav class="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            <a href="{{ route('resources.blog') }}" class="hover:text-indigo-600 transition">Blog</a>
            <span class="w-1 h-1 rounded-full bg-gray-300"></span>
            <span class="text-gray-900">{{ $post->title }}</span>
        </nav>

        <header class="mb-12">
            @if($post->category)
                <div class="mb-6">
                    <span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100/50">
                        {{ $post->category->name }}
                    </span>
                </div>
            @endif

            <h1 class="text-4xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
                {{ $post->title }}
            </h1>

            <div class="flex flex-wrap items-center gap-6">
                <div class="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200/60 shadow-sm">
                    <img src="https://ui-avatars.com/api/?name=K+N&background=4f46e5&color=fff" alt="Author" class="w-8 h-8 rounded-full border border-white shadow-sm">
                    <div class="text-left">
                        <p class="font-black text-gray-900 text-[11px] leading-none">Khairan N.</p>
                        <p class="text-[9px] text-indigo-600 font-bold uppercase tracking-wider mt-1">Founder</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    <span>{{ $post->published_at?->format('F d, Y') ?? $post->created_at->format('F d, Y') }}</span>
                    @if($post->location_name)
                        <span class="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span class="text-indigo-600 flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            {{ $post->location_name }}
                        </span>
                    @endif
                </div>
            </div>
        </header>

        @if($post->featured_image)
            <div class="rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border border-gray-100">
                <img src="{{ asset('storage/' . $post->featured_image) }}" alt="{{ $post->title }}" class="w-full h-auto">
            </div>
        @endif

        <div class="prose prose-indigo prose-lg max-w-none text-gray-700 font-medium leading-relaxed blog-content">
            {!! $post->content !!}
        </div>
        
        @if($post->location_name && $post->latitude && $post->longitude)
            <div class="mt-16 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                <h3 class="font-black text-xl mb-4 flex items-center gap-2">
                    <span>📍</span> Local Relevance: {{ $post->location_name }}
                </h3>
                <p class="text-slate-600 text-sm">
                    This article is optimized for readers in the <strong>{{ $post->location_name }}</strong> area. 
                    Local SEO and Geo-tagging help us provide the most relevant productivity tips for your region.
                </p>
            </div>
        @endif

        <div class="mt-24 pt-12 border-t border-gray-100">
            <a href="{{ route('resources.blog') }}" class="inline-flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
                ← Back to Blog
            </a>
        </div>
    </div>
</article>

<style>
    .blog-content h2 { @apply text-3xl font-black text-gray-900 mt-12 mb-6; }
    .blog-content h3 { @apply text-2xl font-black text-gray-900 mt-8 mb-4; }
    .blog-content p { @apply mb-6; }
    .blog-content ul { @apply list-disc pl-6 mb-6; }
    .blog-content ol { @apply list-decimal pl-6 mb-6; }
    .blog-content li { @apply mb-2; }
</style>
@endsection
