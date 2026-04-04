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
  "image": "{{ $post->featured_image ? asset('storage/' . $post->featured_image) : asset('favicon.png') }}",
  "description": "{{ $post->meta_description ?? $post->excerpt }}",
  "datePublished": "{{ $post->published_at ? $post->published_at->toIso8601String() : $post->created_at->toIso8601String() }}",
  "author": {
    "@type": "Person",
    "name": "{{ $post->user?->name ?? 'Admin' }}"
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
<main x-data="{ 
    progress: 0,
    updateProgress() {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        this.progress = (window.scrollY / height) * 100;
    }
}" @scroll.window="updateProgress()" class="bg-white">

    <!-- Reading Progress Bar -->
    <div class="fixed top-16 left-0 w-full h-[2px] z-[100] bg-slate-50">
        <div class="h-full bg-indigo-600 transition-all duration-150" :style="`width: ${progress}%`"></div>
    </div>

    <!-- Header Section -->
    <header class="pt-40 pb-20 px-6 bg-slate-50/50 border-b border-slate-100">
        <div class="max-w-4xl mx-auto text-center">
            <nav class="flex justify-center items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">
                <a href="{{ route('home') }}" class="hover:text-indigo-600">Home</a>
                <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                <a href="{{ route('resources.blog') }}" class="hover:text-indigo-600">Blog</a>
            </nav>

            @if($post->category)
                <span class="inline-flex px-4 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                    {{ $post->category->name }}
                </span>
            @endif

            <h1 class="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-12 tracking-tighter">
                {{ $post->title }}
            </h1>

            <div class="flex flex-col md:flex-row items-center justify-center gap-8">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center font-black text-indigo-600 text-sm">
                        {{ substr($post->user?->name ?? 'A', 0, 1) }}
                    </div>
                    <div class="text-left">
                        <p class="text-[11px] font-black text-slate-900 uppercase tracking-wider">{{ $post->user?->name ?? 'Admin' }}</p>
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 italic">Field Commander</p>
                    </div>
                </div>
                <div class="w-1 h-1 rounded-full bg-slate-300 hidden md:block"></div>
                <time class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {{ $post->published_at?->format('M d, Y') ?? $post->created_at->format('M d, Y') }}
                </time>
            </div>
        </div>
    </header>

    <div class="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-16 py-24 relative">
        
        <!-- Sidebar: Floating Share & Progress -->
        <aside class="hidden lg:block col-span-1 sticky top-40 h-fit">
            <div class="flex flex-col items-center gap-6">
                <!-- SHARE BUTTONS -->
                <a href="https://twitter.com/intent/tweet?url={{ url()->current() }}&text={{ $post->title }}" target="_blank" class="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm group">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239h-2.19L17.607 20.65z"/></svg>
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u={{ url()->current() }}" target="_blank" class="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
            </div>
        </aside>

        <!-- Main Content Core -->
        <div class="col-span-12 lg:col-span-8 space-y-12">
            @if($post->featured_image_url)
                <div class="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-100/50 border border-slate-100 mb-20 animate-in fade-in zoom-in duration-1000">
                    <img src="{{ $post->featured_image_url }}" alt="{{ $post->title }}" class="w-full h-auto object-cover hover:scale-105 transition-transform duration-[3s]">
                </div>
            @endif

            <article id="article-payload" class="prose prose-slate prose-lg max-w-none 
                prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900 
                prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:font-medium
                prose-li:text-slate-700 prose-li:font-medium
                prose-img:rounded-3xl prose-img:shadow-xl
                selection:bg-indigo-100 selection:text-indigo-700">
                {!! $post->html_content !!}
            </article>

            <!-- Metadata GEO Location Info -->
            @if($post->location_name)
            <div class="mt-20 p-10 bg-indigo-50/50 rounded-[3rem] border border-indigo-100/50 flex flex-col md:flex-row gap-8 items-center">
                <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-200 shrink-0">
                    <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                   <h4 class="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2 italic">Hyperlocal Context: {{ $post->location_name }}</h4>
                   <p class="text-slate-600 text-sm leading-relaxed font-bold">This atomic module is geolocated for readers in and around <span class="text-slate-900">{{ $post->location_name }}</span>. We prioritize regional data to calibrate your high-performance OS.</p>
                </div>
            </div>
            @endif
        </div>

        <!-- Sidebar: Table of Contents -->
        <aside class="hidden lg:block lg:col-span-3 sticky top-40 h-fit space-y-12">
            <div>
                <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-b pb-4">On This Stream</h4>
                <div id="toc-container" class="space-y-4">
                    <!-- Javascript will populate this -->
                </div>
            </div>

            <div class="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl overflow-hidden relative group">
                <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[60px] group-hover:bg-indigo-500/40 transition-all duration-700"></div>
                <h5 class="text-sm font-black mb-4 relative z-10">Experience the OS</h5>
                <p class="text-[10px] font-bold text-slate-400 leading-relaxed mb-6 relative z-10 uppercase tracking-wider">Unify your habits, finances, and planning in one neural engine.</p>
                <a href="{{ route('register') }}" class="block w-full py-3 bg-indigo-600 text-center rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition relative z-10">Get Started Free</a>
            </div>
        </aside>
    </div>

    <!-- Related Posts Section -->
    @if($related->count() > 0)
    <section class="bg-slate-50/50 py-24 border-t border-slate-100">
        <div class="max-w-7xl mx-auto px-6">
            <h3 class="text-2xl font-black text-slate-900 mb-12 uppercase tracking-tighter">Synchronized Intelligence</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @foreach($related as $rel)
                <a href="{{ route('resources.blog.show', $rel->slug) }}" class="group bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                    <div class="aspect-video bg-slate-100 rounded-2xl overflow-hidden mb-6">
                        <img src="{{ $rel->featured_image ? asset('storage/' . $rel->featured_image) : asset('favicon.png') }}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <span class="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3 block italic">{{ $rel->category?->name ?? 'Module' }}</span>
                    <h4 class="font-black text-slate-900 text-lg leading-tight mb-4 group-hover:text-indigo-600 transition-colors">{{ $rel->title }}</h4>
                    <div class="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                         <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider italic">Read Module</span>
                         <svg class="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </div>
                </a>
                @endforeach
            </div>
        </div>
    </section>
    @endif

</main>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('article-payload');
    const toc = document.getElementById('toc-container');
    const headers = content.querySelectorAll('h2, h3');

    headers.forEach((header, index) => {
        const id = `section-${index}`;
        header.setAttribute('id', id);

        const link = document.createElement('a');
        link.href = `#${id}`;
        link.innerText = header.innerText;
        link.className = `block text-[10px] font-black uppercase tracking-widest transition-all ${header.tagName === 'H2' ? 'text-slate-500 hover:text-indigo-600' : 'text-slate-400 hover:text-indigo-600 pl-4 opacity-70'}`;
        
        // Smooth scroll
        link.onclick = (e) => {
            e.preventDefault();
            const target = document.getElementById(id);
            window.scrollTo({
                top: target.offsetTop - 120,
                behavior: 'smooth'
            });
        };

        toc.appendChild(link);
    });

    // Observer for Active State in TOC
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const tocLinks = toc.querySelectorAll('a');
                tocLinks.forEach(l => {
                    const isActive = l.getAttribute('href') === `#${id}`;
                    l.classList.toggle('text-indigo-600', isActive);
                    l.classList.toggle('translate-x-1', isActive);
                    l.classList.toggle('text-slate-500', !isActive && l.tagName === 'H2');
                    l.classList.toggle('text-slate-400', !isActive && l.tagName === 'H3');
                });
            }
        });
    }, { rootMargin: '0px 0px -80% 0px' });

    headers.forEach(h => observer.observe(h));
});
</script>

<style>
/* Modern Prose Overrides */
.prose h2 { @apply text-3xl font-black text-slate-900 mt-20 mb-8 border-b-4 border-indigo-600/10 pb-4 inline-block tracking-tighter; }
.prose h3 { @apply text-2xl font-bold text-slate-800 mt-12 mb-6 tracking-tight; }
.prose blockquote { @apply border-l-8 border-indigo-500 bg-indigo-50/50 p-8 rounded-3xl font-black text-indigo-900 not-italic shadow-sm mb-12; }
.prose strong { @apply font-black text-slate-900 underline decoration-indigo-500/30 decoration-4 underline-offset-4; }
.prose code { @apply bg-slate-100 text-indigo-600 px-2 py-0.5 rounded-lg font-bold text-sm before:content-none after:content-none; }

/* Image Animation */
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes zoom-in { from { transform: scale(0.95); } to { transform: scale(1); } }
</style>

@endsection
