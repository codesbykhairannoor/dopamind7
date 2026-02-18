@extends('layouts.marketing')

@section('title', __('habitap_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('habitap_meta_desc') }}">
    <meta property="og:title" content="{{ __('habitap_meta_og_title') }}">
    <meta property="og:description" content="{{ __('habitap_meta_og_desc') }}">
@endsection

@section('content')

    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO (BRANDING TETAP INDIGO - KONTRAS VISUAL) --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 relative border-b border-gray-100">
        {{-- Background Blobs --}}
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-200/30 to-purple-200/30 rounded-full blur-[100px] -z-10 animate-pulse duration-[8000ms]"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {{-- Left: Copywriting --}}
            <div class="lg:col-span-6 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-green-200">
                    🌱 {{ __('habitap_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('habitap_hero_title_1') }}<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('habitap_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-lg">
                    {!! __('habitap_hero_desc') !!}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    {{-- BUTTON TETAP INDIGO SESUAI REQUEST --}}
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 text-center">
                        {{ __('habitap_hero_cta') }} →
                    </a>
                    <p class="py-4 text-sm text-gray-400 font-bold self-center">{{ __('habitap_hero_note') }}</p>
                </div>
            </div>

            {{-- Right: Visual Metaphor (Pixel Heart vs Organic Growth) --}}
            <div class="lg:col-span-6 relative h-[500px] flex items-center justify-center animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 fill-mode-both">
                
                {{-- Element 1: The "Game Over" (Competitors) --}}
                <div class="absolute top-10 right-0 w-64 bg-gray-900 border-4 border-gray-800 rounded-xl p-6 transform rotate-12 opacity-80 shadow-2xl z-0 font-mono">
                    <div class="text-center text-red-500 text-xs mb-2 animate-pulse">💔 STREAK BROKEN</div>
                    <div class="flex justify-center gap-2 mb-4">
                        <div class="w-8 h-8 bg-gray-700 rounded-sm"></div>
                        <div class="w-8 h-8 bg-gray-700 rounded-sm"></div>
                        <div class="w-8 h-8 bg-transparent border-2 border-dashed border-gray-700 rounded-sm"></div>
                    </div>
                    <div class="bg-red-900/50 p-2 rounded text-center border border-red-900">
                        <p class="text-red-400 text-[10px] uppercase">Level Down</p>
                        <p class="text-white font-bold">-50 XP</p>
                    </div>
                </div>

                {{-- Element 2: The OFM Growth Card (Front) --}}
                <div class="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 w-80 z-20 transform hover:scale-105 transition duration-500">
                    <div class="flex justify-between items-center mb-6">
                        <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl">🔥</div>
                        <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">{{ __('habitap_mockup_status') }}</span>
                    </div>
                    <h3 class="font-black text-2xl text-gray-900 mb-2">{{ __('habitap_mockup_title') }}</h3>
                    <p class="text-gray-400 text-sm mb-6">{{ __('habitap_mockup_desc') }}</p>
                    
                    {{-- Circular Progress Visual --}}
                    <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div class="relative w-16 h-16 shrink-0">
                             <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path class="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5" />
                                <path class="text-indigo-600 drop-shadow-lg" stroke-dasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-900">1%</div>
                        </div>
                        <div>
                            <p class="font-bold text-gray-900 text-sm">{{ __('habitap_mockup_stat_1') }}</p>
                            <p class="text-xs text-gray-400">{{ __('habitap_mockup_stat_2') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: THE CYCLE -> "THE GAMIFICATION TRAP" --}}
    {{-- ================================================================= --}}
    {{-- Konsep: Kartu ala "Trading Card" yang nunjukin fase addiction -> burnout --}}
    <section class="py-24 bg-white relative overflow-hidden border-b border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('habitap_cycle_title') }}</h2>
                <p class="text-xl text-gray-500">{{ __('habitap_cycle_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 items-center">
                {{-- Card 1: The Dopamine --}}
                <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-yellow-300 transition duration-300 relative group md:rotate-[-4deg] hover:rotate-0 z-10">
                    <div class="text-5xl mb-6 text-center group-hover:scale-125 transition duration-500">🎮</div>
                    <h3 class="text-xl font-bold mb-3 text-center text-gray-900">{{ __('habitap_cycle_1_title') }}</h3>
                    <p class="text-gray-500 text-sm text-center leading-relaxed">{{ __('habitap_cycle_1_desc') }}</p>
                </div>
                
                {{-- Card 2: The Anxiety --}}
                <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-xl border-red-100 transition duration-300 relative group z-20 scale-110">
                    <div class="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">STREAK LOST!</div>
                    <div class="text-5xl mb-6 text-center group-hover:scale-125 transition duration-500">😱</div>
                    <h3 class="text-xl font-bold mb-3 text-center text-gray-900">{{ __('habitap_cycle_2_title') }}</h3>
                    <p class="text-gray-500 text-sm text-center leading-relaxed">{{ __('habitap_cycle_2_desc') }}</p>
                </div>

                {{-- Card 3: The Quit --}}
                <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-400 transition duration-300 relative group md:rotate-[4deg] hover:rotate-0 z-10">
                    <div class="text-5xl mb-6 text-center group-hover:scale-125 transition duration-500">🏳️</div>
                    <h3 class="text-xl font-bold mb-3 text-center text-gray-900">{{ __('habitap_cycle_3_title') }}</h3>
                    <p class="text-gray-500 text-sm text-center leading-relaxed">{{ __('habitap_cycle_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: THE PROBLEM -> "STREAK ANXIETY" (BROKEN CALENDAR) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-gray-50 overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            
            {{-- Text Side --}}
            <div class="order-2 lg:order-1 animate-in slide-in-from-bottom-12 fade-in duration-1000">
                <div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-red-200">⛓️</div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                    {{ __('habitap_prob_title_1') }} <span class="text-red-600 decoration-red-200 underline decoration-4 underline-offset-4">{{ __('habitap_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-gray-500 text-xl leading-relaxed mb-8">
                    {{ __('habitap_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-gray-600">
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('habitap_prob_point_1') }}
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('habitap_prob_point_2') }}
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('habitap_prob_point_3') }}
                    </li>
                </ul>
            </div>

            {{-- Visual Side (The Shattered Calendar) --}}
            <div class="order-1 lg:order-2 relative h-[500px] flex items-center justify-center animate-in slide-in-from-right-12 fade-in duration-1000 delay-200">
                
                <div class="relative w-80 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                    {{-- Calendar Header --}}
                    <div class="flex justify-between items-center mb-4">
                        <span class="font-bold text-gray-800">October</span>
                        <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-bold">1 Day Missed</span>
                    </div>
                    
                    {{-- Calendar Grid --}}
                    <div class="grid grid-cols-7 gap-2 text-center text-sm mb-4">
                        @for ($i = 1; $i <= 20; $i++)
                             <div class="w-8 h-8 rounded-full flex items-center justify-center {{ $i == 17 ? 'bg-red-500 text-white shadow-lg shadow-red-300 scale-110' : 'bg-green-100 text-green-700' }}">
                                {{ $i }}
                            </div>
                        @endfor
                        <div class="col-span-7 mt-2 h-0.5 bg-gray-100"></div>
                        @for ($i = 21; $i <= 28; $i++)
                             <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-400 opacity-50">
                                {{ $i }}
                            </div>
                        @endfor
                    </div>

                    {{-- Pop up message --}}
                    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-[110%] bg-white border border-red-100 p-4 rounded-xl shadow-2xl text-center transform rotate-3">
                        <p class="text-gray-900 font-bold mb-1">💀 Streak Reset to 0</p>
                        <p class="text-xs text-gray-500">You lost your 45-day progress.</p>
                        <button class="mt-3 w-full bg-gray-100 text-gray-400 text-xs py-2 rounded font-bold cursor-not-allowed">Repair (Paid)</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: THE SOLUTION -> "ATOMIC GROWTH" --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-indigo-50/50 border-y border-indigo-50 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-20 max-w-3xl mx-auto">
                <div class="inline-block p-4 bg-white rounded-full shadow-md mb-6 animate-bounce">
                    🌱
                </div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                    {{ __('habitap_sol_title_1') }} <span class="text-indigo-600">{{ __('habitap_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-gray-500 text-xl">
                    {{ __('habitap_sol_desc') }}
                </p>
            </div>

            <div class="grid lg:grid-cols-3 gap-8">
                {{-- Feature 1: Organic --}}
                <div class="bg-white p-8 rounded-[2rem] shadow-lg border border-indigo-50 hover:-translate-y-2 transition duration-300">
                    <div class="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl mb-6">🍃</div>
                    <h3 class="font-bold text-xl text-gray-900 mb-3">{{ __('habitap_sol_1_title') }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __('habitap_sol_1_desc') }}</p>
                </div>

                {{-- Feature 2: Connected (The Centerpiece) --}}
                <div class="bg-indigo-600 p-8 rounded-[2rem] shadow-2xl shadow-indigo-200 text-white transform scale-105 relative z-10">
                    <div class="absolute top-0 right-0 p-6 opacity-20 text-6xl">🔗</div>
                    <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl mb-6">🧠</div>
                    <h3 class="font-bold text-xl mb-3">{{ __('habitap_sol_2_title') }}</h3>
                    <p class="text-indigo-100 leading-relaxed">{{ __('habitap_sol_2_desc') }}</p>
                    <div class="mt-6 pt-6 border-t border-indigo-500/50 flex items-center gap-3">
                         <span class="text-xs bg-indigo-800 px-2 py-1 rounded">Habits</span>
                         <span class="text-xs text-indigo-300">+</span>
                         <span class="text-xs bg-indigo-800 px-2 py-1 rounded">Goals</span>
                         <span class="text-xs text-indigo-300">=</span>
                         <span class="text-xs font-bold">System</span>
                    </div>
                </div>

                {{-- Feature 3: Data Driven --}}
                <div class="bg-white p-8 rounded-[2rem] shadow-lg border border-indigo-50 hover:-translate-y-2 transition duration-300">
                    <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">📊</div>
                    <h3 class="font-bold text-xl text-gray-900 mb-3">{{ __('habitap_sol_3_title') }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __('habitap_sol_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 5: COMPARISON -> "GAME VS LIFE" --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white">
        <div class="max-w-5xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6">{{ __('habitap_compare_title') }}</h2>
                <p class="text-gray-500 text-xl">{{ __('habitap_compare_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
                {{-- Left: The Game (Pixelated/Retro Style) --}}
                <div class="bg-gray-900 p-10 rounded-3xl border-4 border-gray-800 relative overflow-hidden group">
                    <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(50,50,50,1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
                    <h3 class="text-gray-400 font-mono text-sm mb-8 uppercase tracking-widest text-center">{{ __('habitap_table_head_2') }}</h3>
                    
                    <div class="space-y-6 font-mono text-sm">
                        <div class="flex items-center justify-between text-red-400 grayscale opacity-70">
                            <span>👾 {{ __('habitap_table_row_1_title') }}</span>
                            <span>{{ __('habitap_table_row_1_col_1') }}</span>
                        </div>
                        <div class="flex items-center justify-between text-red-400 grayscale opacity-70">
                            <span>📉 {{ __('habitap_table_row_2_title') }}</span>
                            <span>{{ __('habitap_table_row_2_col_1') }}</span>
                        </div>
                        <div class="flex items-center justify-between text-red-400 grayscale opacity-70">
                            <span>🥀 {{ __('habitap_table_row_3_title') }}</span>
                            <span>{{ __('habitap_table_row_3_col_1') }}</span>
                        </div>
                    </div>
                </div>

                {{-- Right: The System (Clean OFM) --}}
                <div class="bg-indigo-50 p-10 rounded-3xl border border-indigo-100 relative overflow-hidden shadow-2xl">
                    <div class="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-4 py-2 rounded-bl-2xl">RECOMMENDED</div>
                    <h3 class="text-indigo-900 font-bold text-sm mb-8 uppercase tracking-widest text-center">OneForMind</h3>
                    
                    <div class="space-y-6">
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-gray-900">{{ __('habitap_table_row_1_title') }}</span>
                            <span class="font-bold text-indigo-600 bg-white px-3 py-1 rounded-lg shadow-sm">{{ __('habitap_table_row_1_col_2') }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-gray-900">{{ __('habitap_table_row_2_title') }}</span>
                            <span class="font-bold text-indigo-600 bg-white px-3 py-1 rounded-lg shadow-sm">{{ __('habitap_table_row_2_col_2') }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-gray-900">{{ __('habitap_table_row_3_title') }}</span>
                            <span class="font-bold text-indigo-600 bg-white px-3 py-1 rounded-lg shadow-sm">{{ __('habitap_table_row_3_col_2') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 6: CTA --}}
    {{-- ================================================================= --}}
    <section class="pt-32 pb-40 px-6 bg-white relative overflow-hidden border-t border-gray-100">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-t from-indigo-100 via-purple-50 to-white rounded-t-full -z-10"></div>
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-indigo-200 to-transparent rounded-t-full blur-2xl -z-10"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-indigo-950 tracking-tight leading-tight">
                {!! __('habitap_cta_title') !!}
            </h2>
            <p class="text-indigo-900/60 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
                {{ __('habitap_cta_desc') }}
            </p>
            <a href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-700 transition transform hover:-translate-y-2 shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.5)]">
                {{ __('habitap_cta_btn') }}
            </a>
            <p class="mt-8 text-sm text-indigo-400 font-bold uppercase tracking-widest">{{ __('habitap_cta_sub') }}</p>
        </div>
    </section>

@endsection