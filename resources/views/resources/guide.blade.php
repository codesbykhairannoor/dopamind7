@extends('layouts.marketing')

@section('title', __('guide_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('guide_meta_desc') }}">
    <meta property="og:title" content="{{ __('guide_meta_og_title') }}">
    <meta property="og:description" content="{{ __('guide_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/resources/guide') }}">
@endsection

@section('content')



    {{-- SECTION 1: HERO (SEARCH-FIRST COMMAND CENTER) - REDESIGNED --}}
<header class="pt-32 pb-32 px-6 relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-slate-50 flex items-center justify-center min-h-[600px] border-b border-indigo-100">
    
    {{-- Modern Decorative Elements: Soft Floating Blobs --}}
    <div class="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[80px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[80px] pointer-events-none"></div>

    <div class="max-w-4xl mx-auto w-full text-center relative z-10 animate-in zoom-in-95 fade-in duration-1000 fill-mode-both">
        
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-indigo-700 font-bold text-xs mb-6 uppercase tracking-wider shadow-sm border border-indigo-100">
                📚 {{ __('guide_hero_badge') }}
            </div>

            <h1 class="text-5xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight">
                {{ __('guide_hero_title') }}
            </h1>
            <p class="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
                {{ __('guide_hero_desc') }}
            </p>

        {{-- Sleek Search Bar --}}
        <div class="relative max-w-2xl mx-auto group">
            <div class="relative flex items-center bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-indigo-100 overflow-hidden p-2 transition-all duration-300 focus-within:shadow-[0_8px_30px_rgba(79,70,229,0.15)] focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                <div class="text-2xl text-indigo-400 pl-4 pr-2 transition-colors duration-300 group-focus-within:text-indigo-600">🔍</div>
                
                {{-- Input Field --}}
                <input type="text" placeholder="{{ __('guide_search_placeholder') }}" class="w-full py-4 px-2 text-lg text-slate-900 bg-transparent border-none outline-none focus:ring-0 placeholder-slate-400 font-medium">
                
                {{-- Button with Shortcut --}}
                <button class="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors px-6 py-3 rounded-xl text-white font-semibold text-sm mr-1 shadow-md">
                    Cari
                    <div class="flex items-center gap-0.5 opacity-80 font-mono text-xs bg-indigo-800/30 px-2 py-0.5 rounded">
                        <span>⌘</span><span>K</span>
                    </div>
                </button>
            </div>
        </div>

        {{-- Floating Quick Tags --}}
        <div class="mt-10 flex flex-wrap justify-center items-center gap-3">
            <span class="text-sm text-slate-500 font-semibold mr-2">{{ __('guide_popular_search') }}</span>
            <a href="#" class="px-5 py-2 bg-white border border-indigo-100 rounded-full text-sm font-semibold text-indigo-700 hover:text-white hover:border-indigo-600 hover:bg-indigo-600 transition-all duration-300 shadow-sm">Cara set budget</a>
            <a href="#" class="px-5 py-2 bg-white border border-indigo-100 rounded-full text-sm font-semibold text-indigo-700 hover:text-white hover:border-indigo-600 hover:bg-indigo-600 transition-all duration-300 shadow-sm">Sync Google Calendar</a>
            <a href="#" class="px-5 py-2 bg-white border border-indigo-100 rounded-full text-sm font-semibold text-indigo-700 hover:text-white hover:border-indigo-600 hover:bg-indigo-600 transition-all duration-300 shadow-sm">Zen Mode Jurnal</a>
        </div>
    </div>
</header>
    {{-- SECTION 2: CORE MODULES (CLEAN GRID) --}}
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <h2 class="text-2xl font-black text-gray-900 mb-10 text-center uppercase tracking-widest">{{ __('guide_modules_title') }}</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {{-- Module 1 --}}
                <a href="#" class="group block bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:border-indigo-100 transition duration-300">
                    <div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">🌱</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ __('guide_mod_1_title') }}</h3>
                    <p class="text-sm text-gray-500 mb-6">{{ __('guide_mod_1_desc') }}</p>
                    <span class="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Lihat Panduan <span aria-hidden="true">→</span></span>
                </a>
                
                {{-- Module 2 --}}
                <a href="#" class="group block bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition duration-300">
                    <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">💰</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ __('guide_mod_2_title') }}</h3>
                    <p class="text-sm text-gray-500 mb-6">{{ __('guide_mod_2_desc') }}</p>
                    <span class="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Lihat Panduan <span aria-hidden="true">→</span></span>
                </a>

                {{-- Module 3 --}}
                <a href="#" class="group block bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:border-amber-100 transition duration-300">
                    <div class="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">🗓️</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ __('guide_mod_3_title') }}</h3>
                    <p class="text-sm text-gray-500 mb-6">{{ __('guide_mod_3_desc') }}</p>
                    <span class="text-amber-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Lihat Panduan <span aria-hidden="true">→</span></span>
                </a>

                {{-- Module 4 --}}
                <a href="#" class="group block bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:border-purple-100 transition duration-300">
                    <div class="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">📔</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ __('guide_mod_4_title') }}</h3>
                    <p class="text-sm text-gray-500 mb-6">{{ __('guide_mod_4_desc') }}</p>
                    <span class="text-purple-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Lihat Panduan <span aria-hidden="true">→</span></span>
                </a>
            </div>
        </div>
    </section>

    {{-- SECTION 3: QUICK START PATHWAY (VERTICAL TIMELINE) --}}
    <section class="py-24 bg-gray-50 border-y border-gray-200">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <div class="text-4xl mb-4">🚀</div>
                <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">{{ __('guide_start_title') }}</h2>
                <p class="text-gray-500 text-lg">{{ __('guide_start_desc') }}</p>
            </div>

            <div class="relative border-l-2 border-indigo-100 ml-4 md:ml-1/2 space-y-12 pb-8">
                
                {{-- Step 1 --}}
                <div class="relative pl-10 md:pl-16">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-indigo-600 rounded-full border-4 border-gray-50 flex items-center justify-center text-white font-bold text-xs shadow-md">1</div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <h4 class="text-lg font-bold text-gray-900 mb-2">{{ __('guide_start_step_1_title') }}</h4>
                        <p class="text-gray-500 text-sm">{{ __('guide_start_step_1_desc') }}</p>
                    </div>
                </div>

                {{-- Step 2 --}}
                <div class="relative pl-10 md:pl-16">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-indigo-600 rounded-full border-4 border-gray-50 flex items-center justify-center text-white font-bold text-xs shadow-md">2</div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <h4 class="text-lg font-bold text-gray-900 mb-2">{{ __('guide_start_step_2_title') }}</h4>
                        <p class="text-gray-500 text-sm">{{ __('guide_start_step_2_desc') }}</p>
                    </div>
                </div>

                {{-- Step 3 --}}
                <div class="relative pl-10 md:pl-16">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-indigo-600 rounded-full border-4 border-gray-50 flex items-center justify-center text-white font-bold text-xs shadow-md">3</div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <h4 class="text-lg font-bold text-gray-900 mb-2">{{ __('guide_start_step_3_title') }}</h4>
                        <p class="text-gray-500 text-sm">{{ __('guide_start_step_3_desc') }}</p>
                    </div>
                </div>

            </div>
        </div>
    </section>

    {{-- SECTION 4: FEATURED ARTICLES (BLOG-STYLE CARDS) --}}
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex justify-between items-end mb-12">
                <div>
                    <h2 class="text-3xl font-black text-gray-900 mb-2">{{ __('guide_articles_title') }}</h2>
                    <p class="text-gray-500">{{ __('guide_articles_desc') }}</p>
                </div>
                <a href="#" class="hidden sm:inline-block text-indigo-600 font-bold hover:text-indigo-800 transition">Lihat Semua →</a>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                {{-- Article 1 --}}
                <a href="#" class="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300">
                    <div class="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-5xl relative overflow-hidden">
                        <div class="absolute inset-0 bg-white/20 group-hover:bg-transparent transition duration-300"></div>
                        <span class="transform group-hover:scale-110 transition duration-500">🎯</span>
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <div class="flex gap-2 mb-3">
                            <span class="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">Best Practice</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">{{ __('guide_art_1_title') }}</h3>
                        <p class="text-sm text-gray-500 mb-4 flex-1">{{ __('guide_art_1_desc') }}</p>
                        <p class="text-xs font-bold text-gray-400">3 min read</p>
                    </div>
                </a>

                {{-- Article 2 --}}
                <a href="#" class="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300">
                    <div class="h-48 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-5xl relative overflow-hidden">
                        <div class="absolute inset-0 bg-white/20 group-hover:bg-transparent transition duration-300"></div>
                        <span class="transform group-hover:scale-110 transition duration-500">💸</span>
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <div class="flex gap-2 mb-3">
                            <span class="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Tutorial</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">{{ __('guide_art_2_title') }}</h3>
                        <p class="text-sm text-gray-500 mb-4 flex-1">{{ __('guide_art_2_desc') }}</p>
                        <p class="text-xs font-bold text-gray-400">5 min read</p>
                    </div>
                </a>

                {{-- Article 3 --}}
                <a href="#" class="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300">
                    <div class="h-48 bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center text-5xl relative overflow-hidden">
                        <div class="absolute inset-0 bg-white/20 group-hover:bg-transparent transition duration-300"></div>
                        <span class="transform group-hover:scale-110 transition duration-500">⚡</span>
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <div class="flex gap-2 mb-3">
                            <span class="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-1 rounded-md">Workflow</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">{{ __('guide_art_3_title') }}</h3>
                        <p class="text-sm text-gray-500 mb-4 flex-1">{{ __('guide_art_3_desc') }}</p>
                        <p class="text-xs font-bold text-gray-400">4 min read</p>
                    </div>
                </a>
            </div>
            
            <div class="mt-8 text-center sm:hidden">
                <a href="#" class="inline-block text-indigo-600 font-bold border-b border-indigo-600 pb-1">Lihat Semua Panduan</a>
            </div>
        </div>
    </section>

    {{-- SECTION 5: CONTACT SUPPORT CTA --}}
    <section class="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px] opacity-30"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

        <div class="max-w-4xl mx-auto text-center relative z-10 bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-12 md:p-16 rounded-[3rem] shadow-2xl">
            <div class="text-4xl mb-6">🙋‍♂️</div>
            <h2 class="text-3xl md:text-5xl font-black mb-6 text-white">{{ __('guide_support_title') }}</h2>
            <p class="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                {{ __('guide_support_desc') }}
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
                <a href="mailto:support@oneformind.com" class="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-500 transition shadow-lg flex items-center justify-center gap-2">
                    ✉️ Hubungi Support
                </a>
                <a href="#" class="bg-slate-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-600 transition border border-slate-600 flex items-center justify-center gap-2">
                    💬 Discord Komunitas
                </a>
            </div>
        </div>
    </section>

@endsection