@extends('layouts.marketing')

@section('title', __('finapp_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('finapp_meta_desc') }}">
    <meta property="og:title" content="{{ __('finapp_meta_og_title') }}">
    <meta property="og:description" content="{{ __('finapp_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/compare/finance-apps') }}">
@endsection

@section('content')

    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO (THE MINDFUL WEALTH BUILDING) --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-indigo-50/50 relative border-b border-slate-100">
        {{-- Background Blobs --}}
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-200/30 to-indigo-200/30 rounded-full blur-[100px] -z-10 animate-pulse duration-[8000ms]"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {{-- Left: Copywriting --}}
            <div class="lg:col-span-6 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-emerald-200">
                    💰 {{ __('finapp_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-slate-900 tracking-tight">
                    {{ __('finapp_hero_title_1') }}<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">{{ __('finapp_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-lg">
                    {!! __('finapp_hero_desc') !!}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 text-center">
                        {{ __('finapp_hero_cta') }} →
                    </a>
                    <p class="py-4 text-sm text-slate-400 font-bold self-center">{{ __('finapp_hero_note') }}</p>
                </div>
            </div>

            {{-- Right: Visual Metaphor (Automated Noise vs Mindful Clarity) --}}
            <div class="lg:col-span-6 relative h-[500px] flex items-center justify-center animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 fill-mode-both">
                
                {{-- Element 1: The "Auto-Sync" Mess (Competitors) --}}
                <div class="absolute top-10 right-0 w-64 bg-slate-900 border-4 border-slate-800 rounded-xl p-6 transform rotate-12 opacity-80 shadow-2xl z-0 font-mono">
                    <div class="text-center text-rose-500 text-[10px] mb-2 animate-pulse">⚠️ SYNC ERROR: BANK CONNECTION LOST</div>
                    <div class="space-y-2 opacity-50">
                        <div class="h-2 bg-slate-700 rounded w-full"></div>
                        <div class="h-2 bg-slate-700 rounded w-[80%]"></div>
                        <div class="h-2 bg-slate-700 rounded w-[90%]"></div>
                    </div>
                    <div class="mt-4 bg-slate-800 p-2 rounded text-center">
                        <p class="text-[8px] text-slate-500">RE-ENTER PASSWORD TO VIEW DATA</p>
                    </div>
                </div>

                {{-- Element 2: The OFM Finance Card (Front) --}}
                <div class="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 w-80 z-20 transform hover:scale-105 transition duration-500">
                    <div class="flex justify-between items-center mb-6">
                        <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl">💵</div>
                        <span class="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">{{ __('finapp_mockup_status') }}</span>
                    </div>
                    <h3 class="font-black text-2xl text-slate-900 mb-2">{{ __('finapp_mockup_title') }}</h3>
                    <p class="text-slate-400 text-sm mb-6">{{ __('finapp_mockup_desc') }}</p>
                    
                    {{-- Financial Health Indicator --}}
                    <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div class="relative w-16 h-16 shrink-0 flex items-center justify-center">
                             <div class="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping"></div>
                             <div class="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl shadow-lg shadow-emerald-200">✓</div>
                        </div>
                        <div>
                            <p class="font-bold text-slate-900 text-sm">{{ __('finapp_mockup_stat_1') }}</p>
                            <p class="text-xs text-emerald-600 font-bold">{{ __('finapp_mockup_stat_2') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: NEW LAYOUT -> HORIZONTAL FLOWCHART (THE TRAP) --}}
    {{-- ================================================================= --}}
    <section class="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-100">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('finapp_cycle_title') }}</h2>
                <p class="text-xl text-slate-500">{{ __('finapp_cycle_desc') }}</p>
            </div>

            {{-- Horizontal Flow Layout --}}
            <div class="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-8 max-w-5xl mx-auto relative">
                {{-- Background connecting line (hidden on mobile) --}}
                <div class="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-gradient-to-r from-emerald-200 via-rose-200 to-indigo-200 -z-10 transform -translate-y-1/2"></div>

                {{-- Node 1 --}}
                <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm w-full md:w-1/3 text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
                    <div class="w-16 h-16 mx-auto bg-emerald-50 border-4 border-white rounded-full flex items-center justify-center text-2xl shadow-md mb-4">🔗</div>
                    <h3 class="font-bold text-lg text-slate-900 mb-2">{{ __('finapp_cycle_1_title') }}</h3>
                    <p class="text-slate-500 text-sm">{{ __('finapp_cycle_1_desc') }}</p>
                </div>
                
                {{-- Node 2 --}}
                <div class="bg-rose-50 p-8 rounded-3xl border border-rose-100 shadow-inner w-full md:w-1/3 text-center relative z-10 transform md:scale-110">
                    <div class="absolute -top-3 -right-3 bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-sm animate-pulse">DANGER</div>
                    <div class="w-16 h-16 mx-auto bg-rose-100 border-4 border-white rounded-full flex items-center justify-center text-2xl shadow-md mb-4">🙈</div>
                    <h3 class="font-bold text-lg text-rose-900 mb-2">{{ __('finapp_cycle_2_title') }}</h3>
                    <p class="text-rose-700/80 text-sm">{{ __('finapp_cycle_2_desc') }}</p>
                </div>

                {{-- Node 3 --}}
                <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm w-full md:w-1/3 text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
                    <div class="w-16 h-16 mx-auto bg-indigo-50 border-4 border-white rounded-full flex items-center justify-center text-2xl shadow-md mb-4">💥</div>
                    <h3 class="font-bold text-lg text-slate-900 mb-2">{{ __('finapp_cycle_3_title') }}</h3>
                    <p class="text-slate-500 text-sm">{{ __('finapp_cycle_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: NEW LAYOUT -> TEXT WITH CSS PIE CHART (THE PROBLEM) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            
            {{-- Text Side --}}
            <div class="order-2 lg:order-1 animate-in slide-in-from-bottom-12 fade-in duration-1000">
                <div class="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-rose-100">🛡️</div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight">
                    {{ __('finapp_prob_title_1') }} <span class="text-rose-500 decoration-rose-200 underline decoration-4 underline-offset-4">{{ __('finapp_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('finapp_prob_desc') }}
                </p>
                <div class="space-y-6">
                    <div class="flex items-start gap-4">
                        <span class="w-6 h-6 shrink-0 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold mt-1">✕</span>
                        <p class="text-slate-700 font-medium">{{ __('finapp_prob_point_1') }}</p>
                    </div>
                    <div class="flex items-start gap-4">
                        <span class="w-6 h-6 shrink-0 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold mt-1">✕</span>
                        <p class="text-slate-700 font-medium">{{ __('finapp_prob_point_2') }}</p>
                    </div>
                    <div class="flex items-start gap-4">
                        <span class="w-6 h-6 shrink-0 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold mt-1">✕</span>
                        <p class="text-slate-700 font-medium">{{ __('finapp_prob_point_3') }}</p>
                    </div>
                </div>
            </div>

            {{-- Visual Side (CSS Donut Chart & Alerts) --}}
            <div class="order-1 lg:order-2 relative h-[500px] flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] border border-slate-100 animate-in slide-in-from-right-12 fade-in duration-1000 delay-200">
                <h4 class="absolute top-8 text-xs font-black uppercase tracking-widest text-slate-400 text-center w-full">Your "Automated" Reality</h4>
                
                {{-- CSS Donut Chart representing scattered data --}}
                <div class="relative w-48 h-48 rounded-full shadow-inner border-8 border-white mb-8" style="background: conic-gradient(#f43f5e 0% 30%, #e2e8f0 30% 100%);">
                    <div class="absolute inset-4 bg-slate-50 rounded-full flex items-center justify-center shadow-lg">
                        <span class="text-3xl font-black text-rose-500">30%</span>
                    </div>
                </div>
                <p class="text-sm font-bold text-slate-600 mb-8 text-center px-8">Only 30% of automated transactions are categorized correctly without your intervention.</p>
                
                {{-- Alert Stack --}}
                <div class="w-3/4 space-y-3">
                     <div class="bg-white border-l-4 border-rose-500 p-3 rounded-r-xl shadow-sm flex justify-between items-center text-xs">
                         <span class="font-bold text-slate-700">Bank 1 Sync Error</span>
                         <span class="text-rose-500">Fix now</span>
                     </div>
                     <div class="bg-white border-l-4 border-amber-500 p-3 rounded-r-xl shadow-sm flex justify-between items-center text-xs opacity-75">
                         <span class="font-bold text-slate-700">Uncategorized: $450</span>
                         <span class="text-amber-500">Review</span>
                     </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: NEW LAYOUT -> STACKED CARDS (THE SOLUTION) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-900 overflow-hidden text-white relative">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-900 -z-10"></div>
        
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-20 max-w-3xl mx-auto">
                <div class="inline-block p-4 bg-emerald-500/20 text-emerald-400 rounded-full mb-6">
                    💎
                </div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    {{ __('finapp_sol_title_1') }} <span class="text-emerald-400">{{ __('finapp_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-400 text-xl">
                    {{ __('finapp_sol_desc') }}
                </p>
            </div>

            {{-- Stacked Cards Layout --}}
            <div class="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
                
                {{-- Big Card --}}
                <div class="lg:col-span-7 bg-white/5 border border-white/10 p-10 md:p-12 rounded-[3rem] backdrop-blur-sm">
                    <h3 class="text-3xl font-black mb-6">{{ __('finapp_sol_box_title') }}</h3>
                    <p class="text-slate-300 text-lg leading-relaxed mb-8">
                        {!! __('finapp_sol_box_desc') !!}
                    </p>
                    <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Method</span>
                            <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Result</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="font-black">Mindful Entry</span>
                            <span class="font-black text-lg">Total Privacy</span>
                        </div>
                    </div>
                </div>

                {{-- Stack of Small Cards --}}
                <div class="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div class="bg-emerald-500 p-8 rounded-[2.5rem] transform transition hover:translate-x-2">
                        <div class="text-3xl mb-4">🧠</div>
                        <h4 class="font-black text-emerald-950 text-xl mb-2">Immediate Awareness</h4>
                        <p class="text-emerald-900/80 text-sm">Feel every dollar that leaves your pocket. Stop the leaks.</p>
                    </div>
                    <div class="bg-indigo-600 p-8 rounded-[2.5rem] transform transition hover:translate-x-2">
                        <div class="text-3xl mb-4">🔒</div>
                        <h4 class="font-black text-white text-xl mb-2">Zero Bank Data Storage</h4>
                        <p class="text-indigo-200 text-sm">We don't want your bank credentials. Total security by design.</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-[2.5rem] transform transition hover:translate-x-2">
                        <div class="text-3xl mb-4">⚡</div>
                        <h4 class="font-black text-white text-xl mb-2">Synchronized with Goals</h4>
                        <p class="text-slate-400 text-sm">Your finances tied directly to your life milestones.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

   {{-- ================================================================= --}}
    {{-- SECTION 5: NEW LAYOUT -> EXPANDABLE/LIST COMPARISON --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-50 border-t border-slate-100">
        <div class="max-w-4xl mx-auto px-6">
            
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6">{{ __('finapp_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('finapp_compare_desc') }}</p>
            </div>

            {{-- Vertical List Format (Replaces Table) --}}
            <div class="space-y-8">
                @foreach([1, 2, 3, 4] as $i)
                <div class="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
                    <div class="absolute left-0 top-0 h-full w-2 bg-emerald-500"></div>
                    
                    <h3 class="text-2xl font-black text-slate-900 mb-8 pl-4">
                        {{ __("finapp_table_row_{$i}_title") }}
                    </h3>
                    
                    <div class="grid md:grid-cols-2 gap-8 pl-4">
                        {{-- Them --}}
                        <div>
                            <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">The Traditional Way</span>
                            <p class="text-slate-500 font-medium italic">
                                "{{ __("finapp_table_row_{$i}_col_1") }}"
                            </p>
                        </div>
                        
                        {{-- Us --}}
                        <div class="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50">
                            <span class="text-[10px] font-black uppercase tracking-widest text-emerald-600 block mb-2 flex items-center gap-1">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> OneForMind
                            </span>
                            <p class="text-emerald-950 font-bold">
                                {{ __("finapp_table_row_{$i}_col_2") }}
                            </p>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>

        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 6: CTA --}}
    {{-- ================================================================= --}}
    <section class="pt-32 pb-40 px-6 bg-slate-950 relative overflow-hidden">
        {{-- Emerald Glow Background --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 rounded-full blur-[120px] -z-0"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-white/5 backdrop-blur-md rounded-3xl text-4xl mb-10 border border-white/10 shadow-2xl">⚡</div>
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight leading-tight">
                {!! __('finapp_cta_title') !!}
            </h2>
            <p class="text-slate-400 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
                {{ __('finapp_cta_desc') }}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-emerald-500 text-slate-950 px-12 py-5 rounded-full font-black text-xl hover:bg-emerald-400 transition transform hover:-translate-y-2 shadow-[0_20px_40px_rgba(16,185,129,0.3)]">
                    {{ __('finapp_cta_btn') }}
                </a>
                <a href="{{ route('features.finance') }}" class="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-white/10 transition">
                    Explore Finance OS
                </a>
            </div>
            <p class="mt-8 text-xs text-slate-500 font-bold uppercase tracking-[0.3em]">{{ __('finapp_cta_sub') }}</p>
        </div>
    </section>

    <style>
        /* Reusing the shimmer animation from previous code */
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
        }
    </style>

@endsection