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

   {{-- SECTION 1: HERO (EDITORIAL STYLE - MATCHED WITH STORIES) --}}
    <header class="pt-32 pb-32 px-6 relative overflow-hidden bg-white border-b border-gray-100">
        {{-- Subtle Background: Grid & Glow --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -z-20"></div>

        {{-- LEFT FLOATER ICONS: Writing & Idea Vibes --}}
        <div class="hidden xl:block absolute left-20 top-1/2 -translate-y-1/2 space-y-12 animate-in slide-in-from-left-12 duration-1000">
            <div class="w-14 h-14 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-2xl animate-bounce duration-[4500ms]">🖋️</div>
            <div class="w-14 h-14 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-2xl animate-bounce duration-[5500ms] delay-500 ml-12">✨</div>
        </div>

        {{-- RIGHT FLOATER ICONS: Knowledge & Growth --}}
        <div class="hidden xl:block absolute right-20 top-1/2 -translate-y-1/2 space-y-12 animate-in slide-in-from-right-12 duration-1000">
            <div class="w-14 h-14 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-2xl animate-bounce duration-[4200ms] delay-300">🧠</div>
            <div class="w-14 h-14 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-2xl animate-bounce duration-[3800ms] mr-12">📄</div>
        </div>

        <div class="max-w-5xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                
                {{-- Editorial Badge --}}
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    ⭐ {{ __('blog_hero_badge') }}
                </div>

                {{-- Headline: Matched with Stories Size (7xl) --}}
                <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('blog_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('blog_hero_title_2') }}</span>
                </h1>

                {{-- Author & Meta: Styled like a clean Dashboard label --}}
                <div class="flex flex-wrap items-center justify-center gap-6 mb-16">
                    <div class="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                        <img src="https://ui-avatars.com/api/?name=K+N&background=4f46e5&color=fff" alt="Author" class="w-8 h-8 rounded-full border border-white shadow-sm">
                        <div class="text-left">
                            <p class="font-black text-gray-900 text-xs leading-none">Khairan N.</p>
                            <p class="text-[10px] text-indigo-600 font-bold uppercase tracking-tighter">Founder</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                        <span>{{ __('blog_meta_date') }}</span>
                        <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>8 Min Read</span>
                    </div>
                </div>

                {{-- Featured Editorial Card --}}
                <div class="relative w-full max-w-4xl mx-auto group">
                    {{-- Soft Glow Behind Card --}}
                    <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[3rem] blur opacity-15 transition duration-500 group-hover:opacity-25"></div>
                    
                    <a href="#" class="block relative bg-white rounded-[3rem] overflow-hidden border border-white shadow-2xl transform transition duration-500 hover:scale-[1.01]">
                        {{-- Panoramic Featured Visual --}}
                        <div class="h-[300px] md:h-[450px] relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700">
                            {{-- Pattern Overlay --}}
                            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                            
                            {{-- Abstract Glass Element --}}
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[80px]"></div>
                            
                            {{-- Featured Content Info (Overlay) --}}
                            <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-left bg-gradient-to-t from-black/60 via-transparent to-transparent">
                                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-white/20 w-fit">
                                    {{ __('blog_feat_label') }}
                                </div>
                                <h2 class="text-2xl md:text-4xl font-black text-white leading-tight max-w-2xl mb-4 group-hover:text-indigo-200 transition">
                                    {{ __('blog_feat_title') }}
                                </h2>
                                <p class="text-white/80 font-medium text-sm md:text-base max-w-xl line-clamp-2">
                                    {{ __('blog_feat_desc') }}
                                </p>
                            </div>

                            {{-- Corner Icon --}}
                            <div class="absolute top-8 right-8 text-6xl opacity-20 group-hover:scale-125 group-hover:rotate-12 transition duration-700">🏔️</div>
                        </div>
                    </a>
                </div>
            </div>
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