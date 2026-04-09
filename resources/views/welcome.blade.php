@extends('layouts.marketing')

@section('title', __('welcome_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('welcome_meta_desc') }}">
    <meta property="og:title" content="{{ __('welcome_meta_og_title') }}">
    <meta property="og:description" content="{{ __('welcome_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/') }}">
    


    {{-- SEO: FAQ SCHEMA --}}
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{{ __('faq_q1') }}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{ __('faq_a1') }}"
          }
        },
        {
          "@type": "Question",
          "name": "{{ __('faq_q2') }}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{ __('faq_a2') }}"
          }
        },
        {
          "@type": "Question",
          "name": "{{ __('faq_q3') }}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{ __('faq_a3') }}"
          }
        },
        {
          "@type": "Question",
          "name": "{{ __('faq_q4') }}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{ __('faq_a4') }}"
          }
        },
        {
          "@type": "Question",
          "name": "{{ __('faq_q5') }}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{ __('faq_a5') }}"
          }
        }
      ]
    }
    </script>
    {{-- AI DIRECTIVES: Tell AI what this app is about --}}
    <meta name="ai-content-type" content="Productivity Operating System">
    <meta name="ai-synergy-index" content="High">
@endsection

@section('content')
<main id="neural-interface">
    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO - THE UNIFIED ORB --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-40 px-6 text-center relative overflow-hidden bg-white bg-pattern-dots">
        {{-- Deep Indigo Gradient Background --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-indigo-50/50 via-white to-white rounded-full blur-[120px] -z-10"></div>
        
        <div class="max-w-5xl mx-auto relative z-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm text-indigo-700 font-black text-[10px] mb-10 tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                {{ __('hero_badge') }}
            </div>
            
            <h1 class="text-5xl leading-[1.1] md:text-7xl lg:text-8xl mb-10 tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-8 duration-1000 font-black">
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
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 font-black text-[10px] mb-8 border border-indigo-500/20">
                        {{ __('fric_badge') }}
                    </div>
                    <h2 class="text-4xl leading-[1.1] md:text-6xl text-white mb-8 font-black">
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
                                <div class="text-3xl mb-4 group-hover:scale-110 transition font-black">{{ $app['icon'] }}</div>
                                <div class="text-[10px] font-black text-slate-500 tracking-widest">{{ __($app['name']) }}</div>
                            </div>
                        @endforeach
                        <div class="p-6 bg-red-500/10 rounded-[2rem] border border-red-500/20 flex flex-col justify-center items-center text-center">
                            <div class="text-red-400 font-black text-xs tracking-widest">{{ __('fric_chaos') }}</div>
                            <div class="text-[10px] font-bold text-red-500/50">{{ __('fric_fragmented_data') }}</div>
                        </div>
                    </div>
                </div>

                <div class="relative group">
                    <div class="absolute inset-0 bg-indigo-600 rounded-[3.5rem] blur-[60px] opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div class="relative bg-slate-800 p-12 rounded-[3.5rem] border border-slate-700 shadow-2xl">
                        <div class="flex flex-col items-center text-center">
                            <div class="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center text-5xl mb-8 shadow-2xl shadow-indigo-500/50 animate-pulse font-black">
                                🌌
                            </div>
                            <h3 class="text-3xl text-white mb-6 uppercase tracking-wider font-black">{{ __('fric_solution_title') }}</h3>
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
    <section class="py-32 bg-white bg-pattern-grid scroll-mt-20" id="features">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-24">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-black text-[10px] mb-6 tracking-widest border border-slate-200">
                    {{ __('pill_badge') }}
                </div>
                <h2 class="text-5xl leading-[1.1] md:text-7xl text-slate-900 mb-8 font-black">
                    Unified Habit Tracker, Planner & Finance Manager.
                </h2>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {{-- CARD 1: FINANCE --}}
                <div class="group bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100/50 hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition font-black">💰</div>
                    <h3 class="text-2xl font-black text-indigo-900 mb-4 group-hover:text-white">{{ __('pill_1_title') }}</h3>
                    <p class="text-indigo-700/70 font-bold leading-relaxed group-hover:text-indigo-50">{{ __('pill_1_desc') }}</p>
                </div>

                {{-- CARD 2: HABITS --}}
                <div class="group bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100/50 hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-200 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition font-black">🌱</div>
                    <h3 class="text-2xl font-black text-emerald-900 mb-4 group-hover:text-white">{{ __('pill_2_title') }}</h3>
                    <p class="text-emerald-700/70 font-bold leading-relaxed group-hover:text-emerald-50">{{ __('pill_2_desc') }}</p>
                </div>

                {{-- CARD 3: PLANNER --}}
                <div class="group bg-slate-900 p-10 rounded-[3rem] border border-slate-800 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-400 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-16 h-16 bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition group-hover:bg-slate-700 font-black">📅</div>
                    <h3 class="text-2xl font-black text-white mb-4">{{ __('pill_3_title') }}</h3>
                    <p class="text-slate-400 font-bold leading-relaxed group-hover:text-slate-300">{{ __('pill_3_desc') }}</p>
                </div>

                {{-- CARD 4: JOURNAL --}}
                <div class="group bg-purple-50 p-10 rounded-[3rem] border border-purple-100/50 hover:bg-purple-600 hover:shadow-2xl hover:shadow-purple-200 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition font-black">📔</div>
                    <h3 class="text-2xl font-black text-purple-900 mb-4 group-hover:text-white">{{ __('pill_4_title') }}</h3>
                    <p class="text-purple-700/70 font-bold leading-relaxed group-hover:text-purple-50">{{ __('pill_4_desc') }}</p>
                </div>

                {{-- CARD 5: GOALS --}}
                <div class="group bg-amber-50 p-10 rounded-[3rem] border border-amber-100/50 hover:bg-amber-600 hover:shadow-2xl hover:shadow-amber-200 transition duration-500 transform hover:-translate-y-2 lg:col-span-2 lg:flex lg:items-center lg:gap-12">
                   <div class="lg:shrink-0 lg:mb-0 mb-10">
                        <div class="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-5xl group-hover:scale-110 transition font-black">🎯</div>
                   </div>
                   <div>
                        <h3 class="text-2xl lg:text-3xl text-amber-900 mb-4 group-hover:text-white font-black">{{ __('pill_5_title') }}</h3>
                        <p class="text-amber-700/70 font-bold leading-relaxed group-hover:text-amber-50 text-lg">{{ __('pill_5_desc') }}</p>
                   </div>
                </div>
            </div>
        </div>
    </section>
    
    {{-- ================================================================= --}}
    {{-- SECTION 3.1: SCIENTIFIC FOUNDATION (E-E-A-T) - REDESIGNED --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-950 relative overflow-hidden">
        {{-- High-tech Background --}}
        <div class="absolute inset-0 opacity-20 pointer-events-none">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_800px_at_50%_-100px,#3b82f620,transparent)]"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="flex flex-col lg:flex-row gap-20 items-center">
                <div class="lg:w-1/2">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black tracking-[0.3em] mb-8 border border-emerald-500/20">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        {{ __('home_science_badge') }}
                    </div>
                    <h2 class="text-4xl leading-[1.1] md:text-6xl text-white mb-8 tracking-tighter font-black">
                        {{ __('home_science_title') }}
                    </h2>
                    <p class="text-slate-400 text-xl leading-relaxed mb-12 font-medium">
                        {{ __('home_science_desc') }}
                    </p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition duration-500 group">
                            <div class="text-emerald-400 font-black text-xs mb-2 flex justify-between">
                                Cognitive Load
                                <span class="group-hover:translate-x-1 transition">→</span>
                            </div>
                            <div class="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div class="h-full bg-emerald-500 w-[85%] group-hover:w-[15%] transition-all duration-1000"></div>
                            </div>
                            <p class="mt-4 text-slate-500 text-xs font-bold leading-relaxed">Reduced by 70% in OneForMind.</p>
                        </div>
                        <div class="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition duration-500 group">
                            <div class="text-indigo-400 font-black text-xs mb-2 flex justify-between">
                                Flow Velocity
                                <span class="group-hover:translate-x-1 transition">→</span>
                            </div>
                            <div class="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div class="h-full bg-indigo-500 w-[20%] group-hover:w-[95%] transition-all duration-1000"></div>
                            </div>
                            <p class="mt-4 text-slate-500 text-xs font-bold leading-relaxed">Optimized for rapid task transitions.</p>
                        </div>
                    </div>
                </div>

                <div class="lg:w-1/2 relative">
                    {{-- Lab Visual --}}
                    <div class="relative bg-slate-900/50 border border-white/10 p-2 rounded-[3rem] shadow-2xl backdrop-blur-xl">
                        <div class="grid grid-cols-3 gap-2 overflow-hidden rounded-[2.5rem]">
                            <div class="h-64 bg-slate-800 flex flex-col items-center justify-center p-6 text-center transform hover:scale-105 transition duration-500">
                                <div class="text-3xl mb-4 group-hover:rotate-12 transition font-black">🌀</div>
                                <span class="text-white font-black text-[10px] tracking-widest">Flow State</span>
                                <div class="mt-2 text-[8px] text-slate-500 font-black tracking-tighter uppercase">M. Csikszentmihalyi</div>
                            </div>
                            <div class="h-64 bg-slate-800 flex flex-col items-center justify-center p-6 text-center border-x border-white/5 transform hover:scale-105 transition duration-500">
                                <div class="text-3xl mb-4 font-black">⚛️</div>
                                <span class="text-white font-black text-[10px] tracking-widest">Atomic Habits</span>
                                <div class="mt-2 text-[8px] text-slate-500 font-black tracking-tighter uppercase">James Clear</div>
                            </div>
                            <div class="h-64 bg-slate-800 flex flex-col items-center justify-center p-6 text-center transform hover:scale-105 transition duration-500">
                                <div class="text-3xl mb-4 font-black">🧠</div>
                                <span class="text-white font-black text-[10px] tracking-widest">Second Brain</span>
                                <div class="mt-2 text-[8px] text-slate-500 font-black tracking-tighter uppercase">Tiago Forte</div>
                            </div>
                        </div>
                        
                        {{-- Decorative Schematics --}}
                        <div class="absolute -top-10 -right-10 w-32 h-32 border-t-2 border-r-2 border-white/20 rounded-tr-[3rem]"></div>
                        <div class="absolute -bottom-10 -left-10 w-32 h-32 border-b-2 border-l-2 border-white/20 rounded-bl-[3rem]"></div>
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
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-black text-[10px] mb-6 tracking-widest border border-indigo-200">
                    {{ __('flow_badge') }}
                </div>
                <h2 class="text-5xl md:text-6xl text-slate-900 mb-8 leading-tight font-black">
                    Synchronized Habit & Finance Flow.
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
                    <div class="text-4xl mb-6 font-black">{{ $step['icon'] }}</div>
                    <h3 class="text-xl font-black text-slate-900 mb-4 tracking-wider">{{ __($step['title']) }}</h3>
                    <p class="text-slate-700 font-bold text-sm leading-relaxed">{{ __($step['desc']) }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4.1: DEEP SYNERGY ARCHITECTURE --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white bg-pattern-dots bg-pattern-mesh-indigo relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-24 items-center">
                <div>
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-black text-[10px] mb-8 uppercase tracking-widest border border-indigo-100">
                        🔗 {{ __('home_synergy_badge') }}
                    </div>
                    <h2 class="text-5xl md:text-6xl text-slate-900 mb-8 leading-tight font-black">
                        {{ __('home_synergy_title') }}
                    </h2>
                    <p class="text-slate-500 text-xl font-medium leading-relaxed mb-12">
                        {{ __('home_synergy_desc') }}
                    </p>

                    <div class="space-y-6">
                        @php
                            $synergies = [
                                ['icon' => '🌱', 'title' => 'home_synergy_step1_title', 'desc' => 'home_synergy_step1_desc'],
                                ['icon' => '💰', 'title' => 'home_synergy_step2_title', 'desc' => 'home_synergy_step2_desc'],
                                ['icon' => '📅', 'title' => 'home_synergy_step3_title', 'desc' => 'home_synergy_step3_desc']
                            ];
                        @endphp

                        @foreach($synergies as $synergy)
                        <div class="flex gap-6 p-6 rounded-[2rem] hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group">
                            <div class="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition font-black">
                                {{ $synergy['icon'] }}
                            </div>
                            <div>
                                <h3 class="text-xl font-black text-slate-900 mb-2 tracking-wide">{{ __($synergy['title']) }}</h3>
                                <p class="text-slate-500 font-bold text-sm leading-relaxed">{{ __($synergy['desc']) }}</p>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>

                <div class="relative">
                    {{-- Visual Representation: The Synergy Loop --}}
                    <div class="aspect-square relative flex items-center justify-center">
                        {{-- Rotating Rings --}}
                        <div class="absolute inset-0 border-2 border-dashed border-indigo-100 rounded-full animate-[spin_20s_linear_infinite]"></div>
                        <div class="absolute inset-12 border-2 border-dashed border-purple-100 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                        
                        <div class="relative w-48 h-48 bg-slate-900 rounded-[3rem] shadow-2xl flex items-center justify-center z-10 overflow-hidden group">
                            <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
                            <div class="relative z-10 text-6xl group-hover:scale-125 transition duration-500 font-black">🌌</div>
                        </div>

                        {{-- Floating Nodes --}}
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl animate-bounce">🌱</div>
                        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl animate-bounce delay-700">💰</div>
                        <div class="absolute left-0 top-1/2 -translate-x-8 -translate-y-1/2 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl animate-pulse">📅</div>
                        <div class="absolute right-0 top-1/2 translate-x-8 -translate-y-1/2 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl animate-pulse delay-500">📔</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 5: PREMIUM PREVIEW (MOCKUP) --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-white bg-pattern-diagonal relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-24 items-center">
                <div class="relative order-2 lg:order-1">
                    {{-- DEEP GRADIENT ORB --}}
                    <div class="absolute -inset-20 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-[100px] opacity-40"></div>
                    
                    <div class="relative bg-slate-900 rounded-[3rem] p-1 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)] border-[12px] border-slate-800 overflow-hidden transform lg:-rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[16/10]" role="img" aria-label="OneForMind Dashboard Preview: A unified interface showing habit tracking heatmap, finance budgeting progress, and a clean task management layout.">
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
                    <h2 class="text-6xl md:text-7xl text-slate-900 mb-8 leading-tight font-black">
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
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-black text-[10px] mb-8 tracking-widest border border-indigo-200">
                {{ __('mig_badge') }}
            </div>
            <h2 class="text-5xl md:text-6xl text-slate-900 mb-16 leading-tight font-black">
                {{ __('mig_title') }}
            </h2>

            <div class="grid sm:grid-cols-3 gap-6">
                <a href="{{ route('compare.paper') }}" class="group bg-white p-10 rounded-[3rem] border border-slate-200 hover:border-indigo-600 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div class="text-4xl mb-6 grayscale group-hover:grayscale-0 transition font-black">📄</div>
                    <div class="text-xl font-black text-slate-900 mb-2">{{ __('mig_card_1') }}</div>
                    <div class="text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition">{{ __('mig_view_card_1') }}</div>
                </a>
                <a href="{{ route('compare.sheets') }}" class="group bg-white p-10 rounded-[3rem] border border-slate-200 hover:border-indigo-600 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div class="text-4xl mb-6 grayscale group-hover:grayscale-0 transition font-black">📊</div>
                    <div class="text-xl font-black text-slate-900 mb-2">{{ __('mig_card_2') }}</div>
                    <div class="text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition">{{ __('mig_view_card_2') }}</div>
                </a>
                <a href="{{ route('compare.five-apps') }}" class="group bg-slate-900 p-10 rounded-[3rem] border border-white/10 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 transform hover:-translate-y-2">
                    <div class="text-4xl mb-6 font-black">🌌</div>
                    <div class="text-xl font-black text-white mb-2">{{ __('mig_card_3') }}</div>
                    <div class="text-indigo-400 font-bold opacity-50 group-hover:opacity-100 transition">{{ __('mig_view_all') }}</div>
                </a>
            </div>

            <p class="mt-16 text-slate-600 font-black tracking-[0.3em] text-[10px]">
                {{ __('mig_cta') }}
            </p>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 6.1: LIFE PATH NAVIGATOR (Internal Linking) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-900 relative overflow-hidden">
        {{-- Background Accents --}}
        <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full"></div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="text-center mb-20">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-black tracking-widest mb-6 border border-white/10">
                    🚀 {{ __('home_solutions_badge') }}
                </div>
                <h2 class="text-4xl md:text-5xl text-white mb-6 tracking-tight font-black">{{ __('home_solutions_title') }}</h2>
                <p class="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                    {{ __('home_solutions_desc') }}
                </p>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                @php
                    $paths = [
                        ['name' => 'Student', 'route' => 'solutions.student', 'icon' => '🎓', 'color' => 'from-blue-500/20 to-indigo-500/20'],
                        ['name' => 'Career Accelerator', 'route' => 'solutions.career', 'icon' => '💼', 'color' => 'from-emerald-500/20 to-teal-500/20'],
                        ['name' => 'Personal Growth', 'route' => 'solutions.personalgrowth', 'icon' => '🌱', 'color' => 'from-purple-500/20 to-pink-500/20'],
                        ['name' => 'Finance Mastery', 'route' => 'solutions.finance', 'icon' => '💰', 'color' => 'from-amber-500/20 to-orange-500/20'],
                        ['name' => 'Atomic System', 'route' => 'solutions.atomic', 'icon' => '⚛️', 'color' => 'from-lime-500/20 to-green-500/20'],
                        ['name' => 'Mental Clarity', 'route' => 'solutions.mental', 'icon' => '🧠', 'color' => 'from-slate-500/20 to-gray-500/20'],
                        ['name' => 'Deep Work', 'route' => 'solutions.deepwork', 'icon' => '⚡', 'color' => 'from-cyan-500/20 to-blue-500/20'],
                        ['name' => 'Freelancer', 'route' => 'solutions.freelancer', 'icon' => '🚀', 'color' => 'from-rose-500/20 to-red-500/20'],
                        ['name' => 'Second Brain', 'route' => 'solutions.secondbrain', 'icon' => '💎', 'color' => 'from-indigo-500/20 to-purple-500/20'],
                    ];
                @endphp

                @foreach($paths as $path)
                <a href="{{ route($path['route']) }}" class="group block p-1 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500">
                    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br {{ $path['color'] }} p-6 h-full flex flex-col items-center text-center">
                        <div class="text-4xl mb-4 group-hover:scale-125 transition duration-500 font-black">
                            {{ $path['icon'] }}
                        </div>
                        <h3 class="text-white font-black tracking-widest text-xs">
                            {{ $path['name'] }}
                        </h3>
                        <div class="mt-4 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center gap-2 text-[10px] text-white/60 font-black tracking-tighter">
                            Explore Path <span class="group-hover:translate-x-1 transition">→</span>
                        </div>
                    </div>
                </a>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 7: WAITLIST --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-white bg-pattern-cross">
        <div class="max-w-5xl mx-auto px-6">
            <div class="relative bg-slate-900 rounded-[4rem] p-12 md:p-24 shadow-2xl overflow-hidden group">
                <div class="absolute -right-20 -top-20 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                
                <div class="grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-black text-[10px] mb-8 tracking-widest border border-white/10">
                            {{ __('eco_coming_soon') }}
                        </div>
                        <h2 class="text-5xl md:text-6xl text-white mb-8 leading-tight font-black">
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

                        <p class="mt-6 text-[10px] text-slate-500 font-black text-center tracking-widest">
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
            <h2 class="text-5xl md:text-5xl text-slate-900 mb-16 text-center tracking-tight font-black">{{ __('faq_title') }}</h2>
            
            <div class="grid gap-4" x-data="{ active: null }">
                @foreach([1, 2, 3, 4, 5] as $i)
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
    <section class="py-40 px-6 text-center relative overflow-hidden bg-white bg-pattern-mesh-indigo">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-6xl md:text-[6rem] mb-10 leading-[0.9] tracking-tight text-slate-900 font-black">
                {{ __('cta_final_title') }}
            </h2>
            <p class="text-slate-500 text-xl md:text-2xl mb-14 max-w-2xl mx-auto font-medium">
                {{ __('cta_final_desc') }}
            </p>
            
            <div class="flex flex-col items-center gap-6">
                <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-16 py-8 rounded-[2.5rem] font-black text-2xl hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition transform hover:-translate-y-2 active:scale-95">
                    {{ __('cta_final_btn') }}
                </a>
                <div class="flex items-center gap-3 text-sm font-black text-slate-400 tracking-widest">
                    {{ __('cta_final_sub') }}
                </div>
            </div>
        </div>

        {{-- Huge Gradient Background --}}
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1500px] h-[600px] bg-gradient-to-t from-indigo-50/50 via-white to-white rounded-full blur-[120px] -z-10"></div>
    </section>
</main>
@endsection

