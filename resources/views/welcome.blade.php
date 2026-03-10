@extends('layouts.marketing')

@section('title', 'OneForMind | ' . (app()->getLocale() === 'id' ? 'Satu Aplikasi Produktivitas Terpadu' : 'All in One Productivity OS'))

@section('meta')
    <meta name="description" content="{{ __('welcome_meta_desc') }}">
    <meta property="og:title" content="{{ __('welcome_meta_og_title') }}">
    <meta property="og:description" content="{{ __('welcome_meta_og_desc') }}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url('/') }}">
    
    <link rel="alternate" hreflang="id" href="{{ url('/lang/id') }}" />
    <link rel="alternate" hreflang="en" href="{{ url('/lang/en') }}" />
    <link rel="alternate" hreflang="x-default" href="{{ url('/') }}" />
    <link rel="canonical" href="{{ url('/') }}" />
@endsection

@section('content')

    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO - THE UNIFIED ORB --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-40 px-6 text-center relative overflow-hidden bg-white">
        {{-- Deep Indigo Gradient Background --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-indigo-50/50 via-white to-white rounded-full blur-[120px] -z-10"></div>
        
        <div class="max-w-5xl mx-auto relative z-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm text-indigo-700 font-black text-[10px] mb-10 uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                {{ __('hero_badge') }}
            </div>
            
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-10 leading-[0.95] tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {{ __('hero_title_1') }}<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
                    {{ __('hero_title_2') }}
                </span>
            </h1>
            
            <p class="text-lg md:text-xl text-slate-500 mb-14 leading-relaxed max-w-3xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
                {{ __('hero_desc') }}
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center gap-5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                @guest
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 active:scale-95 group">
                        {{ __('hero_cta_primary') }}
                        <span class="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                    </a>
                    <a href="{{ route('about') }}" class="bg-white text-slate-700 border border-slate-200 px-12 py-6 rounded-3xl font-black text-xl hover:bg-slate-50 hover:border-slate-300 transition transform hover:-translate-y-1 active:scale-95">
                        {{ __('hero_cta_secondary') }}
                    </a>
                @endguest

                @auth
                    <a hx-boost="false" href="{{ route('dashboard') }}" class="bg-indigo-600 text-white px-12 py-6 rounded-3xl font-black text-xl hover:shadow-2xl transition transform hover:-translate-y-1 active:scale-95">
                        {{ __('nav_dashboard') }} →
                    </a>
                @endauth
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: THE FRICTION TAX --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-900 relative overflow-hidden">
        {{-- Animated Mesh Background --}}
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0,transparent_50%)]"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="grid lg:grid-cols-2 gap-24 items-center">
                <div>
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 font-black text-[10px] mb-8 uppercase tracking-widest border border-indigo-500/20">
                        {{ __('fric_badge') }}
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        {{ __('fric_title') }}
                    </h2>
                    <p class="text-slate-400 text-xl leading-relaxed mb-12 font-medium">
                        {{ __('fric_desc') }}
                    </p>

                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        @php
                            $fragmented = [
                                ['icon' => '📅', 'name' => 'fric_app_1'],
                                ['icon' => '🌱', 'name' => 'fric_app_2'],
                                ['icon' => '💰', 'name' => 'fric_app_3'],
                                ['icon' => '📔', 'name' => 'fric_app_4'],
                                ['icon' => '🎯', 'name' => 'fric_app_5']
                            ];
                        @endphp
                        @foreach($fragmented as $app)
                            <div class="p-6 bg-slate-800/50 rounded-[2rem] border border-slate-700/50 backdrop-blur-sm group hover:bg-slate-800 transition">
                                <div class="text-3xl mb-4 group-hover:scale-110 transition">{{ $app['icon'] }}</div>
                                <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">{{ __($app['name']) }}</div>
                            </div>
                        @endforeach
                        <div class="p-6 bg-red-500/10 rounded-[2rem] border border-red-500/20 flex flex-col justify-center items-center text-center">
                            <div class="text-red-400 font-black text-xs uppercase tracking-widest">Chaos</div>
                            <div class="text-[10px] font-bold text-red-500/50">Fragmented Data</div>
                        </div>
                    </div>
                </div>

                <div class="relative group">
                    <div class="absolute inset-0 bg-indigo-600 rounded-[3.5rem] blur-[60px] opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div class="relative bg-slate-800 p-12 rounded-[3.5rem] border border-slate-700 shadow-2xl">
                        <div class="flex flex-col items-center text-center">
                            <div class="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center text-5xl mb-8 shadow-2xl shadow-indigo-500/50 animate-pulse">
                                🌌
                            </div>
                            <h3 class="text-3xl font-black text-white mb-6 uppercase tracking-wider">{{ __('fric_solution_title') }}</h3>
                            <p class="text-slate-400 text-lg font-medium leading-relaxed">
                                {{ __('fric_solution_desc') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: THE 5 PILLARS --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white scroll-mt-20" id="features">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-24">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-500 font-black text-[10px] mb-6 uppercase tracking-widest border border-slate-200">
                    {{ __('pill_badge') }}
                </div>
                <h2 class="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
                    {{ __('pill_title') }}
                </h2>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {{-- CARD 1: FINANCE --}}
                <div class="group bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100/50 hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition">💰</div>
                    <h3 class="text-2xl font-black text-indigo-900 mb-4 group-hover:text-white">{{ __('pill_1_title') }}</h3>
                    <p class="text-indigo-700/70 font-bold leading-relaxed group-hover:text-indigo-50">{{ __('pill_1_desc') }}</p>
                </div>

                {{-- CARD 2: HABITS --}}
                <div class="group bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100/50 hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-200 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition">🌱</div>
                    <h3 class="text-2xl font-black text-emerald-900 mb-4 group-hover:text-white">{{ __('pill_2_title') }}</h3>
                    <p class="text-emerald-700/70 font-bold leading-relaxed group-hover:text-emerald-50">{{ __('pill_2_desc') }}</p>
                </div>

                {{-- CARD 3: PLANNER --}}
                <div class="group bg-slate-900 p-10 rounded-[3rem] border border-slate-800 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-400 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-16 h-16 bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition group-hover:bg-slate-700">📅</div>
                    <h3 class="text-2xl font-black text-white mb-4">{{ __('pill_3_title') }}</h3>
                    <p class="text-slate-400 font-bold leading-relaxed group-hover:text-slate-300">{{ __('pill_3_desc') }}</p>
                </div>

                {{-- CARD 4: JOURNAL --}}
                <div class="group bg-purple-50 p-10 rounded-[3rem] border border-purple-100/50 hover:bg-purple-600 hover:shadow-2xl hover:shadow-purple-200 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition">📔</div>
                    <h3 class="text-2xl font-black text-purple-900 mb-4 group-hover:text-white">{{ __('pill_4_title') }}</h3>
                    <p class="text-purple-700/70 font-bold leading-relaxed group-hover:text-purple-50">{{ __('pill_4_desc') }}</p>
                </div>

                {{-- CARD 5: GOALS --}}
                <div class="group bg-amber-50 p-10 rounded-[3rem] border border-amber-100/50 hover:bg-amber-600 hover:shadow-2xl hover:shadow-amber-200 transition duration-500 transform hover:-translate-y-2 lg:col-span-2 lg:flex lg:items-center lg:gap-12">
                   <div class="lg:shrink-0 lg:mb-0 mb-10">
                        <div class="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-5xl group-hover:scale-110 transition">🎯</div>
                   </div>
                   <div>
                        <h3 class="text-2xl lg:text-3xl font-black text-amber-900 mb-4 group-hover:text-white">{{ __('pill_5_title') }}</h3>
                        <p class="text-amber-700/70 font-bold leading-relaxed group-hover:text-amber-50 text-lg">{{ __('pill_5_desc') }}</p>
                   </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: INTERACTION ENGINE (The Synergy) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-20">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-black text-[10px] mb-6 uppercase tracking-widest border border-indigo-200">
                    {{ __('flow_badge') }}
                </div>
                <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                    {{ __('flow_title') }}
                </h2>
            </div>

            <div class="grid md:grid-cols-4 gap-4 relative">
                {{-- Simple Connecting Lines (Visual Only) --}}
                <div class="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-indigo-100 -translate-y-1/2 -z-10"></div>
                
                @php
                    $steps = [
                        ['icon' => '🎯', 'title' => 'flow_step_1_title', 'desc' => 'flow_step_1_desc'],
                        ['icon' => '⚙️', 'title' => 'flow_step_2_title', 'desc' => 'flow_step_2_desc'],
                        ['icon' => '🌱', 'title' => 'flow_step_3_title', 'desc' => 'flow_step_3_desc'],
                        ['icon' => '📔', 'title' => 'flow_step_4_title', 'desc' => 'flow_step_4_desc']
                    ];
                @endphp

                @foreach($steps as $index => $step)
                <div class="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-4">
                    <div class="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black mb-6 text-xl shadow-lg shadow-indigo-200">
                        {{ $index + 1 }}
                    </div>
                    <div class="text-4xl mb-6">{{ $step['icon'] }}</div>
                    <h4 class="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">{{ __($step['title']) }}</h4>
                    <p class="text-slate-500 font-bold text-sm leading-relaxed">{{ __($step['desc']) }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 5: PREMIUM PREVIEW (MOCKUP) --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-24 items-center">
                <div class="relative order-2 lg:order-1">
                    {{-- DEEP GRADIENT ORB --}}
                    <div class="absolute -inset-20 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-[100px] opacity-40"></div>
                    
                    <div class="relative bg-slate-900 rounded-[3rem] p-1 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)] border-[12px] border-slate-800 overflow-hidden transform lg:-rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[16/10]">
                        <div class="absolute top-0 w-full h-8 bg-slate-800 flex items-center px-4 gap-2">
                           <div class="flex gap-1.5">
                                <div class="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                           </div>
                        </div>
                        {{-- MOCK CONTENT --}}
                        <div class="p-8 mt-8 grid grid-cols-12 gap-4 h-full">
                            <div class="col-span-3 space-y-4">
                                <div class="h-12 bg-slate-800 rounded-xl animate-pulse"></div>
                                <div class="h-12 bg-slate-800/40 rounded-xl"></div>
                                <div class="h-12 bg-slate-800/40 rounded-xl"></div>
                            </div>
                            <div class="col-span-9 space-y-4">
                                <div class="h-32 bg-indigo-600 rounded-3xl p-6 flex items-end">
                                    <div class="h-8 w-1/3 bg-white/20 rounded-full"></div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="h-40 bg-slate-800 rounded-3xl p-6">
                                        <div class="flex gap-2 mb-4">
                                            <div class="w-4 h-4 bg-emerald-500 rounded-full"></div>
                                            <div class="w-4 h-4 bg-emerald-500/20 rounded-full"></div>
                                        </div>
                                        <div class="h-4 w-1/2 bg-slate-700 rounded-full"></div>
                                    </div>
                                    <div class="h-40 bg-slate-800 rounded-3xl p-6">
                                         <div class="text-xl font-black text-indigo-400">Rp 12,5jt</div>
                                         <div class="h-2 w-full bg-slate-700 rounded-full mt-4 overflow-hidden">
                                            <div class="h-full bg-indigo-500 w-3/4"></div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order-1 lg:order-2">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-black text-[10px] mb-8 uppercase tracking-widest border border-indigo-100">
                        {{ __('vsn_badge') }}
                    </div>
                    <h2 class="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
                        {{ __('vsn_title') }}
                    </h2>
                    <p class="text-slate-500 text-xl font-medium leading-relaxed mb-12">
                        {{ __('vsn_desc') }}
                    </p>
                    <div class="flex gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl">🖱️</div>
                        <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl">⌨️</div>
                        <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl">📱</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 6: THE SWITCH (COMPARISON LINKS) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-50 border-t border-slate-100">
        <div class="max-w-7xl mx-auto px-6 text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-black text-[10px] mb-8 uppercase tracking-widest border border-indigo-200">
                {{ __('mig_badge') }}
            </div>
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-16 leading-tight">
                {{ __('mig_title') }}
            </h2>

            <div class="grid sm:grid-cols-3 gap-6">
                <a href="{{ route('compare.paper') }}" class="group bg-white p-10 rounded-[3rem] border border-slate-200 hover:border-indigo-600 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div class="text-4xl mb-6 grayscale group-hover:grayscale-0 transition">📄</div>
                    <div class="text-xl font-black text-slate-900 mb-2">{{ __('mig_card_1') }}</div>
                    <div class="text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition">View →</div>
                </a>
                <a href="{{ route('compare.sheets') }}" class="group bg-white p-10 rounded-[3rem] border border-slate-200 hover:border-indigo-600 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div class="text-4xl mb-6 grayscale group-hover:grayscale-0 transition">📊</div>
                    <div class="text-xl font-black text-slate-900 mb-2">{{ __('mig_card_2') }}</div>
                    <div class="text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition">View →</div>
                </a>
                <a href="{{ route('compare.five-apps') }}" class="group bg-slate-900 p-10 rounded-[3rem] border border-white/10 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 transform hover:-translate-y-2">
                    <div class="text-4xl mb-6">🌌</div>
                    <div class="text-xl font-black text-white mb-2">{{ __('mig_card_3') }}</div>
                    <div class="text-indigo-400 font-bold opacity-50 group-hover:opacity-100 transition">View All →</div>
                </a>
            </div>

            <p class="mt-16 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                {{ __('mig_cta') }}
            </p>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 7: WAITLIST --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-white">
        <div class="max-w-5xl mx-auto px-6">
            <div class="relative bg-slate-900 rounded-[4rem] p-12 md:p-24 shadow-2xl overflow-hidden group">
                <div class="absolute -right-20 -top-20 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                
                <div class="grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-black text-[10px] mb-8 uppercase tracking-widest border border-white/10">
                            {{ __('eco_coming_soon') }}
                        </div>
                        <h2 class="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                            {{ __('waitlist_title') }}
                        </h2>
                        <p class="text-slate-400 text-xl font-medium leading-relaxed mb-0">
                            {{ __('waitlist_desc') }}
                        </p>
                    </div>

                    <div class="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                         <form action="{{ route('waitlist.store') }}" method="POST" class="space-y-4">
                            @csrf
                            <input 
                                name="email"
                                type="email" 
                                value="{{ old('email') }}"
                                placeholder="{{ __('waitlist_input_placeholder') }}"
                                class="w-full px-8 py-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none font-bold transition-all"
                                required
                            />
                            <button type="submit" class="w-full bg-white text-slate-900 px-8 py-5 rounded-2xl font-black text-lg hover:bg-indigo-50 shadow-xl transition transform active:scale-95">
                                {{ __('waitlist_btn') }}
                            </button>
                        </form>
                        
                        @if(session('success'))
                            <div class="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl font-bold text-sm text-center">
                                ✅ {{ session('success') }}
                            </div>
                        @endif

                        <p class="mt-6 text-[10px] text-slate-500 font-black text-center uppercase tracking-widest">
                            {{ __('waitlist_note') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 8: FAQ --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-50">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-16 text-center tracking-tight">{{ __('faq_title') }}</h2>
            
            <div class="grid gap-4" x-data="{ active: null }">
                @foreach([1, 2, 3] as $i)
                <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden transition-all duration-300 shadow-sm" :class="active === {{ $i }} ? 'ring-2 ring-indigo-500' : ''">
                    <button @click="active = active === {{ $i }} ? null : {{ $i }}" class="flex justify-between items-center w-full p-8 text-left group">
                        <span class="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition">{{ __("faq_q$i") }}</span>
                        <span class="text-2xl text-slate-400 transition-transform" :class="active === {{ $i }} ? 'rotate-180' : ''">▼</span>
                    </button>
                    <div x-show="active === {{ $i }}" x-collapse x-cloak>
                        <div class="px-8 pb-8 text-slate-500 font-bold text-lg leading-relaxed">
                            {{ __("faq_a$i") }}
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 9: FINAL CTA --}}
    {{-- ================================================================= --}}
    <section class="py-40 px-6 text-center relative overflow-hidden bg-white">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-5xl md:text-[6rem] font-black mb-10 leading-[0.9] tracking-tight text-slate-900">
                {{ __('cta_final_title') }}
            </h2>
            <p class="text-slate-500 text-xl md:text-2xl mb-14 max-w-2xl mx-auto font-medium">
                {{ __('cta_final_desc') }}
            </p>
            
            <div class="flex flex-col items-center gap-6">
                <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-16 py-8 rounded-[2.5rem] font-black text-2xl hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition transform hover:-translate-y-2 active:scale-95">
                    {{ __('cta_final_btn') }}
                </a>
                <div class="flex items-center gap-3 text-sm font-black text-slate-400 uppercase tracking-widest">
                    {{ __('cta_final_sub') }}
                </div>
            </div>
        </div>

        {{-- Huge Gradient Background --}}
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1500px] h-[600px] bg-gradient-to-t from-indigo-50/50 via-white to-white rounded-full blur-[120px] -z-10"></div>
    </section>

@endsection
