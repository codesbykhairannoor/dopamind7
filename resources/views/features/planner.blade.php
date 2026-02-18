@extends('layouts.marketing')

@section('title', __('planner_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('planner_meta_desc') }}">
    <meta property="og:title" content="{{ __('planner_meta_og_title') }}">
    <meta property="og:description" content="{{ __('planner_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/features/planner') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (CENTERED TEXT + KANBAN BOARD MOCKUP) --}}
    <header class="pt-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white relative">
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] -z-10"></div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-6 uppercase tracking-wider border border-indigo-200">
                <span class="text-lg">📅</span> {{ __('planner_hero_badge') }}
            </div>
            <h1 class="text-5xl md:text-7xl font-black mb-6 leading-[1.1] text-gray-900 tracking-tight">
                {{ __('planner_hero_title_1') }} <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">{{ __('planner_hero_title_2') }}</span>
            </h1>
            <p class="text-xl text-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto">
                {{ __('planner_hero_desc') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                    {{ __('planner_hero_cta_1') }}
                </a>
                <a href="#how-it-works" class="bg-white text-gray-700 border border-gray-200 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition">
                    {{ __('planner_hero_cta_2') }}
                </a>
            </div>
        </div>

        {{-- Hero Visual: Kanban Board Mockup (Trello Vibe) --}}
        <div class="max-w-6xl mx-auto relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
            <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20 h-full w-full pointer-events-none"></div>
            
            <div class="bg-gray-100/80 backdrop-blur-md rounded-t-[2.5rem] border-x border-t border-gray-200 p-6 md:p-10 shadow-2xl flex gap-6 overflow-hidden h-[450px]">
                
                {{-- Column 1: To Do --}}
                <div class="w-1/3 min-w-[300px] bg-gray-200/50 rounded-2xl p-4 flex flex-col gap-4">
                    <div class="flex justify-between items-center font-bold text-gray-700 px-2">
                        <span>To Do</span>
                        <span class="bg-gray-300 px-2 py-0.5 rounded-md text-xs">1</span>
                    </div>
                    {{-- Task 3 (Pending) --}}
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-300 cursor-pointer transform transition hover:-translate-y-1">
                        <div class="flex gap-2 mb-3">
                            <span class="w-10 h-2 rounded-full bg-blue-400"></span>
                        </div>
                        <p class="font-bold text-gray-900 text-sm mb-2">{{ __('planner_mockup_task_3') }}</p>
                        <p class="text-xs text-gray-500 flex items-center gap-1">🕒 {{ __('planner_mockup_time_3') }}</p>
                    </div>
                </div>

                {{-- Column 2: In Progress --}}
                <div class="w-1/3 min-w-[300px] bg-indigo-100/50 rounded-2xl p-4 flex flex-col gap-4 border border-indigo-100">
                    <div class="flex justify-between items-center font-bold text-indigo-900 px-2">
                        <span class="flex items-center gap-2">🔥 In Progress</span>
                        <span class="bg-indigo-200 px-2 py-0.5 rounded-md text-xs text-indigo-800">1</span>
                    </div>
                    {{-- Task 2 (Active) --}}
                    <div class="bg-white p-4 rounded-xl shadow-md border-2 border-indigo-400 cursor-pointer transform scale-105 z-10 relative">
                        <div class="absolute -top-3 -right-3 bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-sm">
                            {{ __('planner_mockup_alert_1') }}
                        </div>
                        <div class="flex gap-2 mb-3">
                            <span class="w-10 h-2 rounded-full bg-amber-500"></span>
                            <span class="w-10 h-2 rounded-full bg-indigo-500"></span>
                        </div>
                        <p class="font-bold text-indigo-950 text-sm mb-2">{{ __('planner_mockup_task_2') }}</p>
                        <p class="text-xs text-indigo-600 font-bold flex items-center gap-1">⏳ {{ __('planner_mockup_time_2') }}</p>
                    </div>
                </div>

                {{-- Column 3: Done --}}
                <div class="w-1/3 min-w-[300px] bg-green-50/80 rounded-2xl p-4 flex flex-col gap-4 opacity-70">
                    <div class="flex justify-between items-center font-bold text-green-800 px-2">
                        <span>Done</span>
                        <span class="bg-green-200 px-2 py-0.5 rounded-md text-xs">1</span>
                    </div>
                    {{-- Task 1 (Done) --}}
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer">
                        <div class="flex gap-2 mb-3">
                            <span class="w-10 h-2 rounded-full bg-red-500 opacity-50"></span>
                        </div>
                        <p class="font-bold text-gray-500 text-sm mb-2 line-through">{{ __('planner_mockup_task_1') }}</p>
                        <p class="text-xs text-green-600 font-bold flex items-center gap-1">✓ {{ __('planner_mockup_title') }}</p>
                    </div>
                </div>

            </div>
        </div>
    </header>

    {{-- SECTION 2: PROBLEM AWARENESS (DARK MODE STRIP) --}}
    <section class="py-24 bg-slate-900 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] opacity-20 -mr-40 -mt-40"></div>
        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <h2 class="text-3xl md:text-4xl font-black mb-16 text-center text-white animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                {{ __('planner_prob_title_1') }} <span class="text-slate-500 line-through">{{ __('planner_prob_title_strike') }}</span> <span class="text-indigo-400">{{ __('planner_prob_title_2') }}</span>
            </h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="bg-slate-800/50 backdrop-blur p-8 rounded-[2rem] border border-slate-700 hover:border-indigo-500 transition duration-300">
                    <div class="text-4xl mb-6 bg-slate-700 w-16 h-16 rounded-2xl flex items-center justify-center">🤯</div>
                    <h3 class="text-xl font-bold mb-3 text-white">{{ __('planner_prob_1_title') }}</h3>
                    <p class="text-slate-400 leading-relaxed">{{ __('planner_prob_1_desc') }}</p>
                </div>
                <div class="bg-slate-800/50 backdrop-blur p-8 rounded-[2rem] border border-slate-700 hover:border-indigo-500 transition duration-300">
                    <div class="text-4xl mb-6 bg-slate-700 w-16 h-16 rounded-2xl flex items-center justify-center">⏳</div>
                    <h3 class="text-xl font-bold mb-3 text-white">{{ __('planner_prob_2_title') }}</h3>
                    <p class="text-slate-400 leading-relaxed">{{ __('planner_prob_2_desc') }}</p>
                </div>
                <div class="bg-slate-800/50 backdrop-blur p-8 rounded-[2rem] border border-slate-700 hover:border-indigo-500 transition duration-300">
                    <div class="text-4xl mb-6 bg-slate-700 w-16 h-16 rounded-2xl flex items-center justify-center">🤷‍♂️</div>
                    <h3 class="text-xl font-bold mb-3 text-white">{{ __('planner_prob_3_title') }}</h3>
                    <p class="text-slate-400 leading-relaxed">{{ __('planner_prob_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3 & 4: FEATURES (STICKY SCROLL LAYOUT) --}}
    <section id="how-it-works" class="py-32 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid lg:grid-cols-12 gap-16 items-start">
                
                {{-- Sticky Left Column --}}
                <div class="lg:col-span-5 lg:sticky lg:top-32 animate-in fade-in slide-in-from-left-8 duration-700 fill-mode-both">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-6 uppercase tracking-wider">
                        Workspace Superpower
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black mb-6 text-gray-900 leading-tight">{{ __('planner_mechanism_1_title') }}</h2>
                    <p class="text-gray-500 text-lg leading-relaxed mb-8">
                        {{ __('planner_mechanism_1_desc') }}
                    </p>
                </div>

                {{-- Scrolling Right Column --}}
                <div class="lg:col-span-7 space-y-12">
                    
                    {{-- Feature 1 Card --}}
                    <div class="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-indigo-100/40 border border-gray-100 group">
                        <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl mb-8 transform group-hover:scale-110 transition duration-300">🗂️</div>
                        <h3 class="text-3xl font-black mb-4 text-gray-900">{{ __('planner_feature_1_title') }}</h3>
                        <p class="text-gray-500 text-lg leading-relaxed mb-8">
                            {{ __('planner_feature_1_desc') }}
                        </p>
                        <div class="space-y-4 font-bold text-gray-700 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">1</span> {{ __('planner_feature_1_point_1') }}</div>
                            <div class="w-px h-6 bg-gray-300 ml-3"></div>
                            <div class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">2</span> {{ __('planner_feature_1_point_2') }}</div>
                        </div>
                    </div>

                    {{-- Feature 2 Card --}}
                    <div class="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-amber-100/40 border border-gray-100 group">
                        <div class="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center text-3xl mb-8 transform group-hover:rotate-12 transition duration-300">🎯</div>
                        <h3 class="text-3xl font-black mb-4 text-gray-900">{{ __('planner_feature_2_title') }}</h3>
                        <p class="text-gray-500 text-lg leading-relaxed mb-8">
                            {{ __('planner_feature_2_desc') }}
                        </p>
                        <div class="space-y-4 font-bold text-gray-700 bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                            <div class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm">✓</span> {{ __('planner_feature_2_point_1') }}</div>
                            <div class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm">✓</span> {{ __('planner_feature_2_point_2') }}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: BENTO BOX GRID (2x2 SYMMETRICAL) --}}
    <section class="py-32 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">{{ __('planner_bento_title') }}</h2>
                <p class="text-gray-500 text-xl max-w-2xl mx-auto">{{ __('planner_bento_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                {{-- Bento 1 --}}
                <div class="bg-indigo-50 rounded-[2.5rem] p-10 hover:-translate-y-2 transition duration-500 group border border-indigo-100">
                    <div class="flex gap-6 items-start">
                        <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm group-hover:scale-110 transition">🔁</div>
                        <div>
                            <h3 class="text-2xl font-black mb-3 text-indigo-950">{{ __('planner_bento_1_title') }}</h3>
                            <p class="text-indigo-800/70 leading-relaxed">{{ __('planner_bento_1_desc') }}</p>
                        </div>
                    </div>
                </div>
                
                {{-- Bento 2 --}}
                <div class="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl hover:-translate-y-2 transition duration-500 group relative overflow-hidden">
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-indigo-600 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition"></div>
                    <div class="flex gap-6 items-start relative z-10">
                        <div class="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:rotate-12 transition">🍅</div>
                        <div>
                            <h3 class="text-2xl font-black mb-3">{{ __('planner_bento_2_title') }}</h3>
                            <p class="text-slate-400 leading-relaxed">{{ __('planner_bento_2_desc') }}</p>
                        </div>
                    </div>
                </div>

                {{-- Bento 3 --}}
                <div class="bg-white rounded-[2.5rem] p-10 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-500 group">
                    <div class="flex gap-6 items-start">
                        <div class="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition">🔗</div>
                        <div>
                            <h3 class="text-2xl font-black mb-3 text-gray-900">{{ __('planner_bento_3_title') }}</h3>
                            <p class="text-gray-500 leading-relaxed">{{ __('planner_bento_3_desc') }}</p>
                        </div>
                    </div>
                </div>

                {{-- Bento 4 --}}
                <div class="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-[2.5rem] p-10 hover:-translate-y-2 transition duration-500 group border border-indigo-200">
                    <div class="flex gap-6 items-start">
                        <div class="w-16 h-16 bg-white/50 backdrop-blur rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:rotate-[-12deg] transition">🖱️</div>
                        <div>
                            <h3 class="text-2xl font-black mb-3 text-indigo-950">{{ __('planner_bento_4_title') }}</h3>
                            <p class="text-indigo-800/80 leading-relaxed">{{ __('planner_bento_4_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: QUOTE OVERLAPPING CARD --}}
    <section class="py-24 bg-gray-50 relative">
        <div class="max-w-4xl mx-auto px-6 relative z-10">
            <div class="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-indigo-100/50 text-center relative overflow-hidden border border-gray-100">
                <div class="absolute -left-10 -top-10 text-9xl text-indigo-50 font-serif leading-none">"</div>
                <div class="relative z-10">
                    <h2 class="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-8">
                        {{ __('planner_quote_text') }}
                    </h2>
                    <div class="w-16 h-1 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
                    <p class="text-indigo-600 font-bold tracking-widest uppercase text-sm">{{ __('planner_quote_author') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 7: BOTTOM CTA (FLOATING ISLAND CTA) --}}
    <section class="pb-32 bg-gray-50 px-6">
        <div class="max-w-6xl mx-auto bg-indigo-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:-translate-y-2 transition duration-500">
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <div class="absolute -top-32 -left-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
            <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
            
            <div class="relative z-10">
                <h2 class="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight">{{ __('planner_cta_title') }}</h2>
                <p class="text-indigo-100 text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
                    {{ __('planner_cta_desc') }}
                </p>
                <a href="{{ route('register') }}" class="inline-block bg-white text-indigo-900 px-12 py-5 rounded-full font-black text-lg hover:bg-indigo-50 hover:scale-110 transition transform shadow-xl">
                    {{ __('planner_cta_btn') }}
                </a>
                <p class="mt-6 text-sm text-indigo-200/80 font-medium">{{ __('planner_cta_note') }}</p>
            </div>
        </div>
    </section>

@endsection