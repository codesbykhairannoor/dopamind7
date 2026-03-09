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
                        <span>{{ __('planner_mockup_col_1') }}</span>
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
                        <span class="flex items-center gap-2">🔥 {{ __('planner_mockup_col_2') }}</span>
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
                        <span>{{ __('planner_mockup_col_3') }}</span>
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

    {{-- NEW SECTION 2: THE DAILY TIMELINE --}}
    <section class="py-24 bg-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row gap-20 items-center">
                <div class="flex-1 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
                        {{ __('planner_timeline_badge') }}
                    </div>
                    <h2 class="text-5xl font-black text-gray-900 mb-8 leading-tight">
                        {{ __('planner_timeline_title') }}
                    </h2>
                    <p class="text-gray-600 text-xl mb-10 leading-relaxed max-w-xl">
                        {{ __('planner_timeline_desc') }}
                    </p>
                    <div class="grid grid-cols-2 gap-6">
                        <div class="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/50 transition duration-500">
                            <span class="text-xs font-black text-indigo-600 uppercase mb-2 block tracking-widest">{{ __('planner_timeline_stat_1_label') }}</span>
                            <span class="text-3xl font-black text-slate-900">4 Hours</span>
                            <p class="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">{{ __('planner_timeline_stat_footer') }}</p>
                        </div>
                        <div class="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-purple-100/50 transition duration-500">
                            <span class="text-xs font-black text-purple-600 uppercase mb-2 block tracking-widest">{{ __('planner_timeline_stat_2_label') }}</span>
                            <span class="text-3xl font-black text-slate-900">2 Hours</span>
                            <p class="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">{{ __('planner_timeline_stat_footer') }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex-1 w-full animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
                    <div class="bg-gray-50 rounded-[4rem] p-10 md:p-16 border border-gray-100 shadow-inner relative overflow-hidden group">
                        {{-- Schedule Visual --}}
                        <div class="space-y-8 relative">
                            {{-- Vertical Line --}}
                            <div class="absolute left-[13px] top-4 bottom-4 w-1 bg-gray-200 rounded-full group-hover:bg-indigo-100 transition duration-700"></div>

                            {{-- Time Block 1 --}}
                            <div class="flex gap-8 items-start relative z-10 transition duration-500 transform hover:-translate-y-1">
                                <div class="w-8 h-8 rounded-full bg-indigo-600 border-4 border-white shadow-[0_0_15px_rgba(79,70,229,0.3)] shrink-0 mt-2 animate-pulse"></div>
                                <div class="flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group-hover:shadow-xl transition duration-500 relative overflow-hidden">
                                     <div class="absolute right-0 top-0 w-1.5 h-full bg-indigo-600"></div>
                                    <div class="flex justify-between items-center mb-3">
                                        <span class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">08:00 - 10:00</span>
                                        <span class="text-[10px] font-black bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full uppercase">{{ __('planner_timeline_card_1_badge') }}</span>
                                    </div>
                                    <h4 class="text-xl font-black text-gray-900 mb-2">{{ __('planner_timeline_card_1_title') }}</h4>
                                    <p class="text-sm text-gray-500 leading-relaxed">{{ __('planner_timeline_card_1_desc') }}</p>
                                </div>
                            </div>

                            {{-- Time Block 2 --}}
                            <div class="flex gap-8 items-start relative z-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-500 transform hover:-translate-y-1">
                                <div class="w-8 h-8 rounded-full bg-gray-300 border-4 border-white shadow-sm shrink-0 mt-2"></div>
                                <div class="flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                                    <div class="flex justify-between items-center mb-3">
                                        <span class="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">10:30 - 12:00</span>
                                    </div>
                                    <h4 class="text-xl font-black text-gray-900 mb-2">{{ __('planner_timeline_card_2_title') }}</h4>
                                    <p class="text-sm text-gray-500 leading-relaxed">{{ __('planner_timeline_card_2_desc') }}</p>
                                </div>
                            </div>

                             {{-- Time Block 3 --}}
                             <div class="flex gap-8 items-start relative z-10 transition duration-500 transform hover:-translate-y-1">
                                <div class="w-8 h-8 rounded-full bg-purple-600 border-4 border-white shadow-[0_0_15px_rgba(147,51,234,0.3)] shrink-0 mt-2"></div>
                                <div class="flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
                                    <div class="absolute right-0 top-0 w-1.5 h-full bg-purple-500"></div>
                                    <div class="flex justify-between items-center mb-3">
                                        <span class="text-[11px] font-black text-purple-600 uppercase tracking-[0.2em]">13:00 - 14:00</span>
                                        <span class="text-[10px] font-black bg-purple-50 text-purple-700 px-3 py-1 rounded-full uppercase">{{ __('planner_timeline_card_3_badge') }}</span>
                                    </div>
                                    <h4 class="text-xl font-black text-gray-900 mb-2">{{ __('planner_timeline_card_3_title') }}</h4>
                                    <p class="text-sm text-gray-500 leading-relaxed">{{ __('planner_timeline_card_3_desc') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION 3: MORNING TO NIGHT FLOW --}}
    <section class="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05]"></div>
        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <span class="text-indigo-400 font-bold uppercase tracking-[0.4em] text-xs mb-6 block">{{ __('planner_flow_badge') }}</span>
                <h2 class="text-4xl md:text-6xl font-black mb-8">{{ __('planner_flow_title') }}</h2>
                <p class="text-indigo-100 text-xl opacity-80 leading-relaxed">{{ __('planner_flow_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
                {{-- Morning --}}
                <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 hover:bg-white/10 transition duration-500 group relative overflow-hidden">
                    <div class="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition"></div>
                    <div class="w-20 h-20 bg-amber-500/10 text-amber-400 rounded-[2rem] flex items-center justify-center text-4xl mb-10 group-hover:rotate-6 transition">☀️</div>
                    <h3 class="text-3xl font-black mb-6">{{ __('planner_flow_col_1_title') }}</h3>
                    <p class="text-white/60 mb-10 text-lg leading-relaxed">{{ __('planner_flow_col_1_desc') }}</p>
                    <div class="bg-emerald-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/30 text-emerald-300 inline-block animate-pulse">{{ __('planner_flow_col_1_status') }}</div>
                </div>

                {{-- Afternoon --}}
                <div class="bg-indigo-600/10 backdrop-blur-2xl border-2 border-indigo-500/30 rounded-[3rem] p-12 hover:bg-indigo-600/20 transition duration-500 group relative md:-mt-8 shadow-2xl">
                    <div class="absolute inset-0 bg-indigo-500/5 -z-10 animate-pulse"></div>
                    <div class="w-20 h-20 bg-indigo-500/20 text-indigo-400 rounded-[2rem] flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition">⚡</div>
                    <h3 class="text-3xl font-black mb-6">{{ __('planner_flow_col_2_title') }}</h3>
                    <p class="text-indigo-100 opacity-80 mb-10 text-lg leading-relaxed">{{ __('planner_flow_col_2_desc') }}</p>
                    <div class="bg-indigo-400/30 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-400/40 text-indigo-200 inline-block">{{ __('planner_flow_col_2_status') }}</div>
                </div>

                {{-- Night --}}
                <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 hover:bg-white/10 transition duration-500 group relative overflow-hidden">
                    <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition"></div>
                    <div class="w-20 h-20 bg-purple-500/10 text-purple-400 rounded-[2rem] flex items-center justify-center text-4xl mb-10 group-hover:-rotate-6 transition">🌙</div>
                    <h3 class="text-3xl font-black mb-6">{{ __('planner_flow_col_3_title') }}</h3>
                    <p class="text-white/60 mb-10 text-lg leading-relaxed">{{ __('planner_flow_col_3_desc') }}</p>
                    <div class="bg-purple-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-purple-500/30 text-purple-300 inline-block">{{ __('planner_flow_col_3_status') }}</div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE PHILOSOPHY (QUOTE) --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center animate-in zoom-in-95 fade-in duration-1000">
            <div class="text-9xl text-indigo-50 mb-4 font-serif leading-none italic select-none">"</div>
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 leading-[1.4] mb-12 tracking-tight italic font-serif">
                {{ __('planner_quote_text') }}
            </h2>
            <div class="flex flex-col items-center">
                <div class="w-24 h-2 bg-indigo-600 mb-8 rounded-full shadow-lg shadow-indigo-200"></div>
                <p class="text-indigo-600 font-black tracking-[0.5em] uppercase text-xs">{{ __('planner_quote_author') }}</p>
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
