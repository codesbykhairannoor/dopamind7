@extends('layouts.marketing')

@section('title', __('five_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('five_meta_desc') }}">
    <meta property="og:title" content="{{ __('five_meta_og_title') }}">
    <meta property="og:description" content="{{ __('five_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/compare/five-apps') }}">
@endsection

@section('content')

    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO (THE UNIFIED REVOLUTION) --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 relative border-b border-gray-100">
        {{-- Background Blobs --}}
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-200/30 to-slate-200/30 rounded-full blur-[100px] -z-10 animate-pulse duration-[8000ms]"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {{-- Left: Copywriting --}}
            <div class="lg:col-span-6 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-xs mb-8 uppercase tracking-wider shadow-xl border border-slate-800">
                    🌌 {{ __('five_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('five_hero_title_1') }}<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-600">{{ __('five_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-lg">
                    {!! __('five_hero_desc') !!}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 text-center">
                        {{ __('five_hero_cta') }} →
                    </a>
                    <p class="py-4 text-sm text-gray-400 font-bold self-center">{{ __('five_hero_note') }}</p>
                </div>
            </div>

            {{-- Right: Visual Metaphor (Scattered Icons vs Unified Orb) --}}
            <div class="lg:col-span-6 relative h-[500px] flex items-center justify-center animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 fill-mode-both">
                
                {{-- Element 1: The Fragmented Icons (Competitors) --}}
                <div class="absolute inset-0 z-0">
                    {{-- Scattered App Icons with low opacity --}}
                    <div class="absolute top-10 left-10 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl opacity-20 rotate-12 animate-float">📅</div>
                    <div class="absolute bottom-10 right-20 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl opacity-20 -rotate-12 animate-float-delayed">💰</div>
                    <div class="absolute top-20 right-10 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl opacity-20 rotate-45 animate-float">🌿</div>
                    <div class="absolute bottom-20 left-20 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl opacity-20 -rotate-45 animate-float-delayed">📝</div>
                    <div class="absolute top-1/2 left-0 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl opacity-20 rotate-90 animate-float">🎯</div>
                </div>

                {{-- Element 2: The Unified Orb (Front) --}}
                <div class="relative bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white/50 w-80 z-20 overflow-hidden transform hover:scale-105 transition duration-500">
                    <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-slate-500/10"></div>
                    
                    <div class="relative z-10 text-center">
                        <div class="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-2xl shadow-indigo-200 ring-8 ring-indigo-50">
                            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 4H4v7h7V4zm0 9H4v7h7v-7zm9-9h-7v7h7V4zm0 9h-7v7h7v-7z"/></svg>
                        </div>
                        <h3 class="font-black text-2xl text-slate-900 mb-2">{{ __('five_mockup_title') }}</h3>
                        <p class="text-slate-500 text-sm font-bold uppercase tracking-widest mb-8">{{ __('five_mockup_desc') }}</p>
                        
                        <div class="flex items-center justify-center gap-2">
                            <span class="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                            <span class="text-xs font-black text-green-600 uppercase">{{ __('five_mockup_stat_1') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: THE CYCLE -> "THE FRICTION TAX" --}}
    {{-- ================================================================= --}}
    <section class="py-24 bg-white relative overflow-hidden border-b border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('five_cycle_title') }}</h2>
                <p class="text-xl text-gray-500">{{ __('five_cycle_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 items-center">
                {{-- Card 1: The Jump --}}
                <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition duration-300 relative group md:rotate-[-4deg] hover:rotate-0 z-10 text-center">
                    <div class="text-5xl mb-6 group-hover:scale-125 transition duration-500">🏃‍♂️</div>
                    <h3 class="text-xl font-bold mb-3 text-gray-900">{{ __('five_cycle_1_title') }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ __('five_cycle_1_desc') }}</p>
                </div>
                
                {{-- Card 2: The Silo --}}
                <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-xl border-indigo-100 transition duration-300 relative group z-20 scale-110 text-center">
                    <div class="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">SYNC FAILED</div>
                    <div class="text-5xl mb-6 group-hover:scale-125 transition duration-500">🧱</div>
                    <h3 class="text-xl font-bold mb-3 text-gray-900">{{ __('five_cycle_2_title') }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ __('five_cycle_2_desc') }}</p>
                </div>

                {{-- Card 3: The Fatigue --}}
                <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-400 transition duration-300 relative group md:rotate-[4deg] hover:rotate-0 z-10 text-center">
                    <div class="text-5xl mb-6 group-hover:scale-125 transition duration-500">😴</div>
                    <h3 class="text-xl font-bold mb-3 text-gray-900">{{ __('five_cycle_3_title') }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ __('five_cycle_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: THE PROBLEM -> "DIVIDED BY COMPLEXITY" --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-900 overflow-hidden text-white">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            
            {{-- Text Side --}}
            <div class="order-2 lg:order-1 animate-in slide-in-from-bottom-12 fade-in duration-1000">
                <div class="w-14 h-14 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center text-3xl mb-6 border border-white/10">💔</div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    {{ __('five_prob_title_1') }} <span class="text-indigo-400 decoration-indigo-400/30 underline decoration-4 underline-offset-4">{{ __('five_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-400 text-xl leading-relaxed mb-8">
                    {{ __('five_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-300">
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">✕</span>
                        {{ __('five_prob_point_1') }}
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">✕</span>
                        {{ __('five_prob_point_2') }}
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">✕</span>
                        {{ __('five_prob_point_3') }}
                    </li>
                </ul>
            </div>

            {{-- Visual Side (The App Stack Graveyard) --}}
            <div class="order-1 lg:order-2 relative h-[500px] flex items-center justify-center animate-in slide-in-from-right-12 fade-in duration-1000 delay-200">
                <div class="relative w-80 space-y-4">
                    {{-- Stacked Subscriptions --}}
                    @foreach(['Planner Premium', 'Habit Gold', 'Finance Pro', 'Journal Plus', 'Goal Elite'] as $app)
                    <div class="bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between items-center transform hover:-translate-y-1 transition group">
                        <div class="flex items-center gap-3">
                            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span class="text-sm font-bold opacity-60">{{ $app }}</span>
                        </div>
                        <span class="text-xs font-mono text-indigo-400">$9.99/mo</span>
                    </div>
                    @endforeach
                    
                    <div class="pt-6 border-t border-white/10 mt-6 flex justify-between items-center px-2">
                        <span class="font-black text-xl">TOTAL COST</span>
                        <span class="font-black text-xl text-red-500">$49.95/mo</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: THE SOLUTION -> "THE POWER OF SYNERGY" --}}
    {{-- ================================================================= --}}
    <section class="py-32 border-y border-indigo-50 overflow-hidden bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-20 max-w-3xl mx-auto">
                <div class="inline-block p-4 bg-indigo-50 rounded-full shadow-md mb-6 animate-bounce">
                    💎
                </div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                    {{ __('five_sol_title_1') }} <span class="text-indigo-600">{{ __('five_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-gray-500 text-xl">
                    {{ __('five_sol_desc') }}
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {{-- Box 1: The Principle --}}
                <div class="bg-indigo-600 p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
                    <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    <div class="relative z-10">
                        <h3 class="text-2xl font-black mb-6">{{ __('five_sol_box_title') }}</h3>
                        <p class="text-indigo-100 text-lg leading-relaxed mb-8">
                            {!! __('five_sol_box_desc') !!}
                        </p>
                        <div class="flex flex-wrap gap-2 pt-4">
                            @foreach(['Habits', 'Goals', 'Money', 'Tasks', 'Notes'] as $feature)
                                <div class="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-xs font-bold border border-white/20">
                                    {{ $feature }}
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>

                {{-- Box 2: The Flow --}}
                <div class="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 flex flex-col justify-center">
                    <div class="space-y-6">
                        <div class="flex items-center gap-6 group">
                            <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition shrink-0">🌊</div>
                            <p class="font-bold text-slate-700">Seamless transitions between life sectors.</p>
                        </div>
                        <div class="flex items-center gap-6 group">
                            <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition shrink-0">🤝</div>
                            <p class="font-bold text-slate-700">Cross-module validation of your habits.</p>
                        </div>
                        <div class="flex items-center gap-6 group">
                            <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition shrink-0">🛡️</div>
                            <p class="font-bold text-slate-700">One secure home for everything you value.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 5: COMPARISON TABLE --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white">
        <div class="max-w-5xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6">{{ __('five_compare_title') }}</h2>
                <p class="text-gray-500 text-xl">{{ __('five_compare_desc') }}</p>
            </div>

            <div class="overflow-hidden rounded-[3rem] border border-gray-100 shadow-2xl">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-900 text-white">
                            <th class="p-8 text-sm font-black uppercase tracking-widest">{{ __('five_table_head_1') }}</th>
                            <th class="p-8 text-sm font-black uppercase tracking-widest opacity-50">{{ __('five_table_head_2') }}</th>
                            <th class="p-8 text-sm font-black uppercase tracking-widest text-indigo-400">OneForMind</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        @foreach([1, 2, 3, 4] as $i)
                        <tr class="{{ $i % 2 == 0 ? 'bg-gray-50' : 'bg-white' }} border-b border-gray-100 transition hover:bg-indigo-50/30">
                            <td class="p-8 font-black text-gray-900">{{ __("five_table_row_{$i}_title") }}</td>
                            <td class="p-8 text-gray-400 font-medium italic opacity-60">{{ __("five_table_row_{$i}_col_1") }}</td>
                            <td class="p-8 font-black text-indigo-600">
                                <div class="flex items-center gap-3">
                                    <span class="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-[10px]">✨</span>
                                    {{ __("five_table_row_{$i}_col_2") }}
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 6: CTA --}}
    {{-- ================================================================= --}}
    <section class="pt-32 pb-40 px-6 bg-slate-950 relative overflow-hidden">
        {{-- Cosmic Background --}}
        <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-indigo-900/20 to-transparent"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-0"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight leading-tight">
                {!! __('five_cta_title') !!}
            </h2>
            <p class="text-slate-400 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
                {{ __('five_cta_desc') }}
            </p>
            <a href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-700 transition transform hover:-translate-y-2 shadow-[0_20px_40px_rgba(79,70,229,0.3)]">
                {{ __('five_cta_btn') }}
            </a>
            <p class="mt-8 text-sm text-slate-500 font-bold uppercase tracking-[0.3em] font-mono">{{ __('five_cta_sub') }}</p>
        </div>
    </section>

    <style>
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, 0deg)); }
            50% { transform: translateY(-20px) rotate(var(--tw-rotate, 0deg)); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
            animation: float 8s ease-in-out infinite 1s;
        }
    </style>

@endsection
