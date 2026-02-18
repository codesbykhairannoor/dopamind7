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

    {{-- SECTION 1: HERO (REFINED TO STORIES STYLE) --}}
    <header class="pt-32 pb-32 px-6 relative overflow-hidden bg-white border-b border-gray-100">
        {{-- Subtle Background: Grid & Glow --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -z-20"></div>

        {{-- FLOATER ICONS (Styled like Stories Badge) --}}
        <div class="hidden xl:block absolute left-20 top-1/2 -translate-y-1/2 space-y-12 animate-in slide-in-from-left-12 duration-1000">
            <div class="w-14 h-14 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-2xl animate-bounce duration-[4000ms]">🌱</div>
            <div class="w-14 h-14 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-2xl animate-bounce duration-[5000ms] delay-500 ml-12">💰</div>
        </div>

        <div class="hidden xl:block absolute right-20 top-1/2 -translate-y-1/2 space-y-12 animate-in slide-in-from-right-12 duration-1000">
            <div class="w-14 h-14 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-2xl animate-bounce duration-[4200ms] delay-300">📔</div>
            <div class="w-14 h-14 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-2xl animate-bounce duration-[3800ms] mr-12">⚡</div>
        </div>

        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                {{-- Badge Indigo Style --}}
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    📚 {{ __('guide_hero_badge') }}
                </div>

                {{-- Headline: Matched with Stories --}}
                <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('guide_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('guide_hero_title_2') }}</span>
                </h1>

                {{-- Description --}}
                <p class="text-xl text-gray-500 mb-16 leading-relaxed max-w-2xl mx-auto font-medium">
                    {{ __('guide_hero_desc') }}
                </p>

                {{-- Sleek Search Bar (Card Style) --}}
                <div class="relative max-w-2xl mx-auto group">
                    <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2rem] blur opacity-15 group-focus-within:opacity-30 transition duration-500"></div>
                    <div class="relative flex items-center bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white overflow-hidden p-2 transition-all duration-300">
                        <div class="text-2xl pl-5 pr-2">🔍</div>
                        <input type="text" placeholder="{{ __('guide_search_placeholder') }}" class="w-full py-4 px-2 text-lg text-gray-900 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-300 font-bold">
                        <button class="hidden sm:flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 transition-all px-8 py-4 rounded-full text-white font-black text-sm mr-1 shadow-lg shadow-indigo-200 active:scale-95">
                            {{ __('guide_search_btn') }}
                            <div class="flex items-center gap-0.5 opacity-60 font-mono text-[10px] bg-black/20 px-2 py-1 rounded-lg uppercase">
                                <span>⌘</span><span>K</span>
                            </div>
                        </button>
                    </div>
                </div>

                {{-- Quick Tags --}}
                <div class="mt-12 flex flex-wrap justify-center items-center gap-3">
                    <span class="text-[10px] text-gray-400 font-black uppercase tracking-widest mr-2">{{ __('guide_popular_search') }}</span>
                    <a href="#" class="px-5 py-2 bg-white text-gray-600 rounded-full text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 transition shadow-sm border border-gray-100">{{ __('guide_tag_1') }}</a>
                    <a href="#" class="px-5 py-2 bg-white text-gray-600 rounded-full text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 transition shadow-sm border border-gray-100">{{ __('guide_tag_2') }}</a>
                    <a href="#" class="px-5 py-2 bg-white text-gray-600 rounded-full text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 transition shadow-sm border border-gray-100">{{ __('guide_tag_3') }}</a>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: MODULES (CLEAN GRID) --}}
    <section class="py-24 bg-gray-50/50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-xs font-black text-indigo-400 mb-4 uppercase tracking-[0.3em]">{{ __('guide_modules_badge') }}</h2>
                <h3 class="text-3xl md:text-5xl font-black text-gray-900">{{ __('guide_modules_title') }}</h3>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                @foreach([1, 2, 3, 4] as $idx)
                <a href="#" class="group block bg-white rounded-[2.5rem] p-10 border border-gray-100 hover:shadow-2xl transition duration-500">
                    <div class="w-16 h-16 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition duration-500 border border-gray-100">
                        {{ $idx == 1 ? '🌱' : ($idx == 2 ? '💰' : ($idx == 3 ? '🗓️' : '📔')) }}
                    </div>
                    <h3 class="text-2xl font-black text-gray-900 mb-3">{{ __("guide_mod_{$idx}_title") }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed mb-8">{{ __("guide_mod_{$idx}_desc") }}</p>
                    <span class="text-indigo-600 font-black text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                        {{ __('guide_btn_learn') }} <span aria-hidden="true">→</span>
                    </span>
                </a>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SECTION 3: PATHWAY --}}
    <section class="py-24 bg-white border-y border-gray-100">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">{{ __('guide_start_title') }}</h2>
                <p class="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">{{ __('guide_start_desc') }}</p>
            </div>

            <div class="space-y-6">
                @foreach([1, 2, 3] as $step)
                <div class="group relative bg-gray-50 rounded-[2rem] p-8 md:p-10 border border-gray-100 flex flex-col md:flex-row gap-8 items-center hover:bg-indigo-50 transition duration-500">
                    <div class="w-20 h-20 bg-white rounded-[1.5rem] shadow-xl flex items-center justify-center text-3xl font-black text-indigo-600 shrink-0 border border-indigo-50">
                        {{ $step }}
                    </div>
                    <div class="text-center md:text-left">
                        <h4 class="text-2xl font-black text-gray-900 mb-2">{{ __("guide_start_step_{$step}_title") }}</h4>
                        <p class="text-gray-500 leading-relaxed">{{ __("guide_start_step_{$step}_desc") }}</p>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SECTION 4: ARTICLES --}}
    <section class="py-24 bg-gray-50/50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
                <div class="text-center md:text-left">
                    <h2 class="text-4xl font-black text-gray-900 mb-2">{{ __('guide_articles_title') }}</h2>
                    <p class="text-gray-500 font-medium">{{ __('guide_articles_desc') }}</p>
                </div>
                <a href="#" class="bg-white px-8 py-4 rounded-full border border-gray-200 text-indigo-600 font-black text-sm hover:shadow-xl transition shadow-sm uppercase tracking-widest">
                    {{ __('guide_btn_all') }} →
                </a>
            </div>

            <div class="grid md:grid-cols-3 gap-10">
                @foreach([1, 2, 3] as $art)
                <a href="#" class="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition duration-500 flex flex-col">
                    <div class="h-56 bg-indigo-600 relative overflow-hidden flex items-center justify-center text-6xl">
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90"></div>
                        <span class="relative z-10 transform group-hover:scale-125 transition duration-500">
                            {{ $art == 1 ? '🎯' : ($art == 2 ? '💸' : '⚡') }}
                        </span>
                    </div>
                    <div class="p-8 flex flex-col flex-1">
                        <h3 class="text-2xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition">{{ __("guide_art_{$art}_title") }}</h3>
                        <p class="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{{ __("guide_art_{$art}_desc") }}</p>
                        <div class="flex items-center justify-between pt-6 border-t border-gray-50">
                            <span class="text-xs font-black text-gray-400 uppercase tracking-widest">{{ 2 + $art }} {{ __('guide_read_time') }}</span>
                            <span class="text-indigo-600 font-bold text-sm">{{ __('guide_btn_read') }} ↗</span>
                        </div>
                    </div>
                </a>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SECTION 5: SUPPORT --}}
    <section class="py-24 px-6 bg-white">
        <div class="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[150px] opacity-20 -mr-20 -mt-20"></div>
            
            <div class="relative z-10">
                <div class="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 border border-slate-700">🙋‍♂️</div>
                <h2 class="text-4xl md:text-7xl font-black mb-8 text-white tracking-tight leading-none">{{ __('guide_support_title') }}</h2>
                <p class="text-indigo-100 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                    {{ __('guide_support_desc') }}
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-6">
                    <a href="mailto:support@oneformind.com" class="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-indigo-500 transition shadow-xl shadow-indigo-900/50 flex items-center justify-center gap-3">
                        ✉️ {{ __('guide_btn_contact') }}
                    </a>
                    <a href="#" class="bg-white/5 backdrop-blur-md text-white border border-white/10 px-12 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition flex items-center justify-center gap-3">
                        💬 {{ __('guide_btn_community') }}
                    </a>
                </div>
            </div>
        </div>
    </section>

@endsection