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

   {{-- SECTION 1: HERO (THE FEATURED EDITORIAL - SUPER CLEAN) --}}
    <header class="pt-32 pb-20 px-6 bg-white relative">
        <div class="max-w-5xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            
            {{-- Category / Badge --}}
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider">
                ⭐ {{ __('blog_hero_badge') }}
            </div>

            {{-- Massive Editorial Headline --}}
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-black mb-8 text-gray-900 leading-[1.1] tracking-tight hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
                {{ __('blog_feat_title') }}
            </h1>

            {{-- Author & Meta Info --}}
            <div class="flex items-center justify-center gap-4 text-sm font-medium text-gray-500 mb-12">
                <div class="flex items-center gap-3">
                    <img src="https://ui-avatars.com/api/?name=K+N&background=4f46e5&color=fff" alt="Author" class="w-10 h-10 rounded-full border border-gray-200">
                    <div class="text-left">
                        <p class="font-bold text-gray-900">Khairan N.</p>
                        <p class="text-xs">Founder, OneForMind</p>
                    </div>
                </div>
                <div class="w-1 h-1 rounded-full bg-gray-300"></div>
                <p>Feb 18, 2026</p>
                <div class="w-1 h-1 rounded-full bg-gray-300"></div>
                <p>8 min read</p>
            </div>

            {{-- Panoramic Featured Image --}}
            <a href="#" class="block relative w-full h-[300px] md:h-[500px] rounded-[2rem] overflow-hidden group shadow-2xl shadow-indigo-100/50 border border-gray-100 transform transition duration-500 hover:-translate-y-2">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-sky-100 group-hover:scale-105 transition duration-700 ease-out"></div>
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
                {{-- Abstract visual placeholder for the featured image --}}
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-[80px]"></div>
                <div class="absolute bottom-0 right-0 text-9xl transform translate-x-1/4 translate-y-1/4 opacity-20 group-hover:scale-110 transition duration-500">🏔️</div>
            </a>
            
        </div>
    </header>

    {{-- SECTION 2: CATEGORY FILTERS & LATEST GRID (TIDAK BERUBAH BANYAK, HANYA PENYESUAIAN WARNA SEDIKIT AGAR MATCH) --}}
    <section class="py-24 bg-slate-50/50">
        <div class="max-w-7xl mx-auto px-6">
            
            {{-- Horizontal Filter Pills --}}
            <div class="flex flex-wrap items-center gap-3 mb-12">
                <a href="#" class="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-sm shadow-md hover:bg-indigo-600 transition-colors">{{ __('blog_cat_all') }}</a>
                <a href="#" class="px-6 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors">{{ __('blog_cat_prod') }}</a>
                <a href="#" class="px-6 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors">{{ __('blog_cat_student') }}</a>
                <a href="#" class="px-6 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors">{{ __('blog_cat_freelance') }}</a>
                <a href="#" class="px-6 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors">{{ __('blog_cat_updates') }}</a>
            </div>

            {{-- Masonry / Highlight Grid --}}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {{-- Highlight Card --}}
                <a href="#" class="lg:col-span-2 group bg-white rounded-[2rem] border border-slate-100 overflow-hidden flex flex-col md:flex-row hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-indigo-100 transition duration-300">
                    <div class="md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center text-7xl transform group-hover:scale-110 transition duration-500">🧠</div>
                    </div>
                    <div class="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                        <span class="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3 block">Psikologi</span>
                        <h3 class="text-2xl md:text-3xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition leading-snug">
                            {{ __('blog_grid_1_title') }}
                        </h3>
                        <p class="text-slate-500 mb-6 line-clamp-2 font-medium">
                            {{ __('blog_grid_1_desc') }}
                        </p>
                        <p class="text-xs font-bold text-slate-400">{{ __('blog_grid_1_date') }} • 5 min read</p>
                    </div>
                </a>

                {{-- Standard Card 1 --}}
                <a href="#" class="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-indigo-100 transition duration-300 flex flex-col">
                    <div class="h-48 bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center text-5xl transform group-hover:scale-110 transition duration-500">🍝</div>
                    </div>
                    <div class="p-8 flex-1 flex flex-col">
                        <span class="text-xs font-black uppercase tracking-widest text-emerald-600 mb-3 block">Keuangan</span>
                        <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition leading-snug">
                            {{ __('blog_grid_2_title') }}
                        </h3>
                        <p class="text-sm text-slate-500 flex-1 mb-6 line-clamp-2 font-medium">{{ __('blog_grid_2_desc') }}</p>
                        <p class="text-xs font-bold text-slate-400">{{ __('blog_grid_2_date') }} • 4 min read</p>
                    </div>
                </a>

                {{-- Standard Card 2 --}}
                <a href="#" class="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-indigo-100 transition duration-300 flex flex-col">
                    <div class="h-48 bg-gradient-to-br from-rose-50 to-orange-50 relative overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center text-5xl transform group-hover:scale-110 transition duration-500">📖</div>
                    </div>
                    <div class="p-8 flex-1 flex flex-col">
                        <span class="text-xs font-black uppercase tracking-widest text-rose-600 mb-3 block">Review Buku</span>
                        <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition leading-snug">
                            {{ __('blog_grid_3_title') }}
                        </h3>
                        <p class="text-sm text-slate-500 flex-1 mb-6 line-clamp-2 font-medium">{{ __('blog_grid_3_desc') }}</p>
                        <p class="text-xs font-bold text-slate-400">{{ __('blog_grid_3_date') }} • 6 min read</p>
                    </div>
                </a>

                {{-- Standard Card 3 --}}
                <a href="#" class="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-indigo-100 transition duration-300 flex flex-col">
                    <div class="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center text-5xl transform group-hover:scale-110 transition duration-500">🐍</div>
                    </div>
                    <div class="p-8 flex-1 flex flex-col">
                        <span class="text-xs font-black uppercase tracking-widest text-blue-600 mb-3 block">Tech & Dev</span>
                        <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition leading-snug">
                            {{ __('blog_grid_4_title') }}
                        </h3>
                        <p class="text-sm text-slate-500 flex-1 mb-6 line-clamp-2 font-medium">{{ __('blog_grid_4_desc') }}</p>
                        <p class="text-xs font-bold text-slate-400">{{ __('blog_grid_4_date') }} • 10 min read</p>
                    </div>
                </a>

                {{-- Standard Card 4 (Removed Dark theme) --}}
                <a href="#" class="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-indigo-100 transition duration-300 flex flex-col">
                    <div class="h-48 bg-gradient-to-br from-purple-50 to-fuchsia-50 relative overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center text-5xl transform group-hover:scale-110 transition duration-500">🚀</div>
                        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                    </div>
                    <div class="p-8 flex-1 flex flex-col">
                        <span class="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3 block">Product Updates</span>
                        <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition leading-snug">
                            {{ __('blog_grid_5_title') }}
                        </h3>
                        <p class="text-sm text-slate-500 flex-1 mb-6 line-clamp-2 font-medium">{{ __('blog_grid_5_desc') }}</p>
                        <p class="text-xs font-bold text-slate-400">{{ __('blog_grid_5_date') }} • 2 min read</p>
                    </div>
                </a>

            </div>
            
            <div class="mt-16 text-center">
                <button class="bg-white text-slate-700 font-bold px-8 py-4 rounded-full hover:bg-indigo-50 hover:text-indigo-700 transition border border-slate-200 shadow-sm">
                    Muat Lebih Banyak Artikel
                </button>
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
                <p class="text-slate-500 text-xs mt-4 font-medium">
                    {{ __('blog_news_note') }}
                </p>
            </div>
        </div>
    </section>

@endsection