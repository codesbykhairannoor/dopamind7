@extends('layouts.marketing')

@section('title', __('pm_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('pm_meta_desc') }}">
    <meta property="og:title" content="{{ __('pm_meta_og_title') }}">
    <meta property="og:description" content="{{ __('pm_meta_og_desc') }}">
@endsection

@section('content')

    {{-- ================================================================= --}}
    {{-- SECTION 1: HEADER (STRUKTUR TETAP - ICON & VISUAL TWEAKED) --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 relative border-b border-gray-100">
        {{-- Background Blobs --}}
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-200/30 to-purple-200/30 rounded-full blur-[100px] -z-10 animate-pulse duration-[8000ms]"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {{-- Left: Copywriting --}}
            <div class="lg:col-span-6 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-blue-200">
                    {{-- Ganti Icon jadi Building/Corp --}}
                    🏢 {{ __('pm_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('pm_hero_title_1') }}<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('pm_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-lg">
                    {!! __('pm_hero_desc') !!}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 text-center">
                        {{ __('pm_hero_cta') }} →
                    </a>
                    <p class="py-4 text-sm text-gray-400 font-bold self-center">{{ __('pm_hero_note') }}</p>
                </div>
            </div>

            {{-- Right: Visual Metaphor --}}
            <div class="lg:col-span-6 relative h-[500px] flex items-center justify-center animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 fill-mode-both">
                
                {{-- Element 1: The Bloated Ticket (Rotated & More Chaotic) --}}
                <div class="absolute top-4 right-4 w-72 bg-white border border-slate-200 rounded-xl p-5 transform rotate-6 opacity-70 shadow-xl z-0">
                    <div class="flex justify-between items-center mb-3">
                        <div class="flex -space-x-2">
                            <div class="w-6 h-6 rounded-full bg-gray-300 border border-white"></div>
                            <div class="w-6 h-6 rounded-full bg-gray-300 border border-white"></div>
                        </div>
                        <span class="text-[10px] text-red-500 font-bold font-mono">OVERDUE</span>
                    </div>
                    <div class="h-3 bg-slate-100 rounded w-full mb-2"></div>
                    <div class="h-3 bg-slate-100 rounded w-2/3 mb-4"></div>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-2 py-1 bg-red-50 text-red-600 text-[9px] font-bold rounded border border-red-100">BLOCKER</span>
                    </div>
                </div>

                {{-- Element 2: The OFM Focus Card (Front) --}}
                <div class="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 w-80 z-20 transform hover:scale-105 transition duration-500">
                    <div class="flex justify-between items-center mb-6">
                        {{-- Ganti Icon jadi Target/Focus --}}
                        <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl">🎯</div>
                        <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">{{ __('pm_mockup_status') }}</span>
                    </div>
                    <h3 class="font-black text-2xl text-gray-900 mb-2">{{ __('pm_mockup_title') }}</h3>
                    <p class="text-gray-400 text-sm mb-6">{{ __('pm_mockup_desc') }}</p>
                    
                    <div class="space-y-4">
                        <div class="flex items-center gap-3 text-sm font-bold text-gray-600">
                            <span class="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">✓</span> 
                            {{ __('pm_mockup_item_1') }}
                        </div>
                        <div class="flex items-center gap-3 text-sm font-bold text-gray-600">
                             <span class="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">✓</span> 
                            {{ __('pm_mockup_item_2') }}
                        </div>
                        <div class="flex items-center gap-3 text-sm font-bold text-indigo-600 bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                            <span class="animate-pulse">●</span> {{ __('pm_mockup_item_3') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: THE CYCLE -> "THE BROKEN TIMELINE" (VERTICAL) --}}
    {{-- ================================================================= --}}
    {{-- Konsep: Garis waktu vertikal yang menggambarkan penurunan produktivitas --}}
    <section class="py-24 bg-white relative">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-4">{{ __('pm_cycle_title') }}</h2>
                <p class="text-xl text-gray-500">{{ __('pm_cycle_desc') }}</p>
            </div>

            <div class="relative">
                {{-- Vertical Line --}}
                <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-100 via-slate-200 to-red-100 rounded-full"></div>

                <div class="space-y-12">
                    {{-- Step 1: Corporate Fantasy --}}
                    <div class="relative flex flex-col md:flex-row items-center gap-8 group">
                        <div class="order-2 md:order-1 md:w-1/2 md:text-right pl-20 md:pl-0">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ __('pm_cycle_1_title') }}</h3>
                            <p class="text-gray-500">{{ __('pm_cycle_1_desc') }}</p>
                        </div>
                        <div class="absolute left-0 md:relative md:left-auto order-1 md:order-2 w-16 h-16 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center text-3xl shadow-lg z-10 group-hover:scale-110 transition group-hover:border-blue-500">
                            👔
                        </div>
                        <div class="order-3 md:w-1/2 hidden md:block"></div>
                    </div>

                    {{-- Step 2: The Overwhelm --}}
                    <div class="relative flex flex-col md:flex-row items-center gap-8 group">
                         <div class="order-3 md:order-1 md:w-1/2 hidden md:block"></div>
                        <div class="absolute left-0 md:relative md:left-auto order-1 md:order-2 w-16 h-16 bg-white border-4 border-slate-200 rounded-full flex items-center justify-center text-3xl shadow-lg z-10 group-hover:scale-110 transition group-hover:border-slate-500">
                            📉
                        </div>
                        <div class="order-2 md:order-3 md:w-1/2 pl-20 md:pl-0">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ __('pm_cycle_2_title') }}</h3>
                            <p class="text-gray-500">{{ __('pm_cycle_2_desc') }}</p>
                        </div>
                    </div>

                    {{-- Step 3: The Escape --}}
                    <div class="relative flex flex-col md:flex-row items-center gap-8 group">
                        <div class="order-2 md:order-1 md:w-1/2 md:text-right pl-20 md:pl-0">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ __('pm_cycle_3_title') }}</h3>
                            <p class="text-gray-500">{{ __('pm_cycle_3_desc') }}</p>
                        </div>
                        <div class="absolute left-0 md:relative md:left-auto order-1 md:order-2 w-16 h-16 bg-white border-4 border-red-100 rounded-full flex items-center justify-center text-3xl shadow-lg z-10 group-hover:scale-110 transition group-hover:border-red-500">
                            🏃
                        </div>
                        <div class="order-3 md:w-1/2 hidden md:block"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: THE PROBLEM -> "SYSTEM OVERLOAD" (DARK MODE) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-900 relative overflow-hidden">
        {{-- Background Noise/Glitch effect --}}
        <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            
            {{-- Text Side --}}
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded border border-red-800 bg-red-900/30 text-red-400 text-xs font-mono mb-8">
                    <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500 mr-1"></span>
                    CRITICAL ERROR
                </div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                    {{ __('pm_prob_title_1') }} <span class="text-red-500 bg-red-500/10 px-2 rounded">{{ __('pm_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-400 text-xl leading-relaxed mb-8">
                    {{ __('pm_prob_desc') }}
                </p>
                
                {{-- Terminal Style List --}}
                <div class="font-mono text-sm space-y-3">
                    <div class="flex items-center gap-3 text-red-300">
                        <span>></span> {{ __('pm_prob_point_1') }}
                    </div>
                    <div class="flex items-center gap-3 text-red-300">
                        <span>></span> {{ __('pm_prob_point_2') }}
                    </div>
                    <div class="flex items-center gap-3 text-red-300">
                        <span>></span> {{ __('pm_prob_point_3') }}
                    </div>
                </div>
            </div>

            {{-- Visual Side: The Cluttered Interface --}}
            <div class="relative">
                <div class="relative bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl">
                    {{-- Header Fake --}}
                    <div class="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
                        <div class="flex gap-1.5">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div class="h-2 bg-slate-600 rounded w-32"></div>
                    </div>
                    {{-- Content Fake --}}
                    <div class="space-y-4 opacity-50">
                        <div class="flex gap-4">
                            <div class="w-1/4 h-24 bg-slate-700 rounded"></div>
                            <div class="w-1/4 h-24 bg-slate-700 rounded"></div>
                            <div class="w-1/4 h-24 bg-slate-700 rounded"></div>
                            <div class="w-1/4 h-24 bg-slate-700 rounded"></div>
                        </div>
                        <div class="h-4 bg-slate-700 rounded w-full"></div>
                        <div class="h-4 bg-slate-700 rounded w-2/3"></div>
                    </div>
                    
                    {{-- Popups (The Noise) --}}
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-slate-900 border border-red-500/50 p-4 rounded-lg shadow-2xl z-20 text-center">
                        <div class="text-3xl mb-2">📢</div>
                        <p class="text-white font-bold text-sm">New Notification</p>
                        <p class="text-xs text-slate-400 mt-1">Jira: Ticket #999 updated by 5 people...</p>
                    </div>
                    <div class="absolute -bottom-4 -right-4 w-48 bg-slate-900 border border-slate-600 p-4 rounded-lg shadow-xl z-10 opacity-80">
                         <div class="h-2 bg-slate-700 rounded w-full mb-2"></div>
                         <div class="h-2 bg-slate-700 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: THE SOLUTION -> "GLASS DASHBOARD" --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-indigo-50/50 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid lg:grid-cols-12 gap-12 items-center">
                
                {{-- Text Side (Smaller, Left) --}}
                <div class="lg:col-span-4">
                    <div class="w-12 h-12 bg-white text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">🚀</div>
                    <h2 class="text-4xl font-black mb-6 text-gray-900 leading-tight">
                        {{ __('pm_sol_title_1') }} <span class="text-indigo-600 bg-indigo-100 px-1">{{ __('pm_sol_title_highlight') }}</span>.
                    </h2>
                    <p class="text-gray-500 text-lg mb-8">
                        {{ __('pm_sol_desc') }}
                    </p>
                    <div class="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm">
                        <p class="text-indigo-900 font-bold text-sm mb-2">💡 {{ __('pm_sol_box_title') }}</p>
                        <p class="text-gray-500 text-sm">
                            {!! __('pm_sol_box_desc') !!}
                        </p>
                    </div>
                </div>

                {{-- Visual Side (Bigger, Right) -> The "Hub" Dashboard --}}
                <div class="lg:col-span-8 relative">
                    <div class="absolute inset-0 bg-indigo-300 rounded-full blur-[100px] opacity-20"></div>
                    
                    {{-- Dashboard Container --}}
                    <div class="relative bg-white/60 backdrop-blur-xl border border-white/50 p-8 rounded-[2.5rem] shadow-2xl">
                        <div class="grid md:grid-cols-3 gap-6">
                            
                            {{-- Card 1: You (Profile) --}}
                            <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-1 transition duration-300">
                                <div class="text-3xl mb-4">👤</div>
                                <h4 class="font-bold text-gray-900">{{ __('pm_hub_you') }}</h4>
                                <div class="mt-4 flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                    <span>●</span> Active
                                </div>
                            </div>

                            {{-- Card 2: Vision (Goals) --}}
                            <div class="bg-indigo-600 p-6 rounded-3xl shadow-lg text-white hover:-translate-y-1 transition duration-300">
                                <div class="text-3xl mb-4">🏔️</div>
                                <h4 class="font-bold">{{ __('pm_hub_vision') }}</h4>
                                <p class="text-indigo-100 text-xs mt-2">{{ __('pm_hub_yours') }}</p>
                            </div>

                            {{-- Card 3: Growth (Stats) --}}
                            <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-1 transition duration-300">
                                <div class="text-3xl mb-4">🌱</div>
                                <h4 class="font-bold text-gray-900">{{ __('pm_hub_growth') }}</h4>
                                <p class="text-gray-400 text-xs mt-2">{{ __('pm_hub_private') }}</p>
                            </div>
                        </div>

                        {{-- Bottom Connector --}}
                        <div class="mt-6 bg-white/50 p-4 rounded-2xl border border-white/60 text-center">
                            <p class="text-indigo-900 text-sm font-bold tracking-wide">✨ Everything Connected. Nothing Complicated.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: COMPARISON -> "THE FEATURE STACK" (TIER LIST STYLE) --}}
    {{-- ================================================================= --}}
    <section class="py-24 bg-white border-t border-gray-100">
        <div class="max-w-5xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6">{{ __('pm_compare_title') }}</h2>
                <p class="text-gray-500 text-xl">{{ __('pm_compare_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 items-start">
                {{-- Left: The Old Way (Grayed Out) --}}
                <div class="p-8 rounded-3xl border border-gray-100 bg-gray-50 opacity-70">
                    <h3 class="font-bold text-gray-400 uppercase tracking-widest mb-6">{{ __('pm_table_head_2') }}</h3>
                    <ul class="space-y-6">
                        <li class="flex items-center justify-between text-gray-500">
                            <span>{{ __('pm_table_row_1_title') }}</span>
                            <span class="text-sm font-mono bg-gray-200 px-2 py-1 rounded">{{ __('pm_table_row_1_col_1') }}</span>
                        </li>
                        <li class="flex items-center justify-between text-gray-500">
                            <span>{{ __('pm_table_row_2_title') }}</span>
                            <span class="text-sm font-mono bg-gray-200 px-2 py-1 rounded">{{ __('pm_table_row_2_col_1') }}</span>
                        </li>
                        <li class="flex items-center justify-between text-gray-500">
                            <span>{{ __('pm_table_row_3_title') }}</span>
                            <span class="text-sm font-mono bg-gray-200 px-2 py-1 rounded">{{ __('pm_table_row_3_col_1') }}</span>
                        </li>
                    </ul>
                </div>

                {{-- Right: OFM (Highlighted) --}}
                <div class="p-8 rounded-3xl border-2 border-indigo-100 bg-white shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">WINNER</div>
                    <h3 class="font-black text-indigo-900 uppercase tracking-widest mb-6">OneForMind</h3>
                    <ul class="space-y-6">
                         <li class="flex items-center justify-between">
                            <span class="font-bold text-gray-900">{{ __('pm_table_row_1_title') }}</span>
                            <span class="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{{ __('pm_table_row_1_col_2') }}</span>
                        </li>
                        <li class="flex items-center justify-between">
                            <span class="font-bold text-gray-900">{{ __('pm_table_row_2_title') }}</span>
                            <span class="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{{ __('pm_table_row_2_col_2') }}</span>
                        </li>
                        <li class="flex items-center justify-between">
                            <span class="font-bold text-gray-900">{{ __('pm_table_row_3_title') }}</span>
                            <span class="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{{ __('pm_table_row_3_col_2') }}</span>
                        </li>
                         {{-- Extra Winner Row --}}
                         <li class="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span class="font-bold text-gray-900">{{ __('pm_table_row_4_title') }}</span>
                            <span class="text-sm font-black text-white bg-indigo-600 px-3 py-1 rounded-lg shadow-lg shadow-indigo-200">{{ __('pm_table_row_4_col_2') }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 5: CTA (MINIMAL) --}}
    {{-- ================================================================= --}}
    <section class="pt-32 pb-40 px-6 bg-white relative overflow-hidden border-t border-gray-100">
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-indigo-950 tracking-tight leading-tight">
                {!! __('pm_cta_title') !!}
            </h2>
            <p class="text-indigo-900/60 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
                {{ __('pm_cta_desc') }}
            </p>
            <a href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-700 transition transform hover:-translate-y-2 shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.5)]">
                {{ __('pm_cta_btn') }}
            </a>
            <p class="mt-8 text-sm text-indigo-400 font-bold uppercase tracking-widest">{{ __('pm_cta_sub') }}</p>
        </div>
    </section>

@endsection