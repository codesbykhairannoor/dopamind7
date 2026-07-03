@extends('layouts.marketing')

@section('title', __('welcome_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('welcome_meta_desc') }}">
    <meta property="og:title" content="{{ __('welcome_meta_og_title') }}">
    <meta property="og:description" content="{{ __('welcome_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/') }}">
    


    {{-- SEO: MASTER ENTITY & FAQ SCHEMA --}}
    <script type="application/ld+json">
    [{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "OneForMind",
      "url": "{{ url('/') }}",
      "logo": "{{ url('/logo.png') }}",
      "sameAs": [
        "https://twitter.com/oneformind",
        "https://linkedin.com/company/oneformind"
      ],
      "description": "{{ __('seo_welcome_org_desc') }}"
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "OneForMind Productivity OS",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "url": "{{ url('/') }}",
      "description": "{{ __('seo_welcome_app_desc') }}",
      "hasPart": [
        {
          "@type": "SoftwareApplication",
          "name": "OneForMind Habit Tracker",
          "applicationCategory": "HealthApplication",
          "url": "{{ url('/features/habit') }}"
        },
        {
          "@type": "SoftwareApplication",
          "name": "OneForMind Finance Dashboard",
          "applicationCategory": "FinanceApplication",
          "url": "{{ url('/features/finance') }}"
        },
        {
          "@type": "SoftwareApplication",
          "name": "OneForMind Daily Planner",
          "applicationCategory": "BusinessApplication",
          "url": "{{ url('/features/planner') }}"
        }
      ]
    },
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
    }]
    </script>
    {{-- AI DIRECTIVES: Tell AI what this app is about --}}
    <meta name="ai-content-type" content="Productivity Operating System">
    <meta name="ai-synergy-index" content="High">
@endsection

@section('content')
<main id="neural-interface">
    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO - THE MONUMENTAL CENTER --}}
    {{-- ================================================================= --}}
    <header class="relative pt-24 pb-40 lg:pt-32 lg:pb-56 overflow-hidden bg-white">
        {{-- High-End Ambient Lighting --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-full bg-indigo-50/40 rounded-full blur-2xl -z-10"></div>
        
        {{-- Unique & Cool Floating UI Elements --}}
        <div class="absolute top-32 left-[5%] w-16 h-16 bg-white/60 backdrop-blur-md rounded-[1.5rem] shadow-[0_10px_40px_rgba(79,70,229,0.15)] flex items-center justify-center text-2xl animate-[float_6s_ease-in-out_infinite] hidden xl:flex border border-white/80 z-20 group hover:scale-110 transition-transform duration-500 rotate-6">
            <span class="relative drop-shadow-sm">🚀</span>
        </div>
        
        <div class="absolute top-56 left-[18%] w-12 h-12 bg-white/60 backdrop-blur-md rounded-full shadow-[0_10px_40px_rgba(16,185,129,0.15)] flex items-center justify-center text-xl animate-[bounce-slow_5s_ease-in-out_infinite_0.5s] hidden xl:flex border border-white/80 z-20 group hover:scale-110 transition-transform duration-500 -rotate-12">
            <span class="relative drop-shadow-sm">💎</span>
        </div>

        <div class="absolute top-24 right-[10%] w-20 h-20 bg-white/60 backdrop-blur-md rounded-[2rem] shadow-[0_20px_50px_rgba(245,158,11,0.15)] flex items-center justify-center text-3xl animate-[float_7s_ease-in-out_infinite_1s] hidden xl:flex border border-white/80 z-20 group hover:scale-110 transition-transform duration-500 -rotate-6">
            <span class="relative drop-shadow-sm">🧠</span>
        </div>

        <div class="absolute bottom-60 left-[8%] w-14 h-14 bg-white/60 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(168,85,247,0.15)] flex items-center justify-center text-2xl animate-[bounce-slow_6s_ease-in-out_infinite_1.5s] hidden xl:flex border border-white/80 z-20 group hover:scale-110 transition-transform duration-500 rotate-12">
            <span class="relative drop-shadow-sm">📈</span>
        </div>

        <div class="absolute bottom-80 right-[8%] w-16 h-16 bg-white/60 backdrop-blur-md rounded-[1.5rem] shadow-[0_15px_40px_rgba(239,68,68,0.15)] flex items-center justify-center text-2xl animate-[float_5.5s_ease-in-out_infinite_0.2s] hidden xl:flex border border-white/80 z-20 group hover:scale-110 transition-transform duration-500 rotate-3">
            <span class="relative drop-shadow-sm">⚡</span>
        </div>

        <div class="absolute bottom-40 right-[20%] w-10 h-10 bg-slate-900/5 backdrop-blur-sm rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center text-lg animate-[bounce-slow_4.5s_ease-in-out_infinite_2s] hidden xl:flex border border-white/50 z-20 group hover:scale-110 transition-transform duration-500 -rotate-6">
            <span class="relative drop-shadow-sm">🔥</span>
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
            {{-- Badge --}}
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 font-bold text-[10px] mb-8 tracking-widest uppercase shadow-sm">
                <span class="flex h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                {{ __('hero_premium_badge') }}
            </div>
            
            {{-- Balanced Title --}}
            <h1 class="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-[-0.03em] text-slate-900 font-[900] leading-[1.05] max-w-6xl mx-auto">
                {{ __('hero_premium_title_1') }} 
                <span class="text-indigo-600 block mt-2">
                    {{ __('hero_premium_title_2') }}
                </span>
            </h1>
            
            {{-- Subheading --}}
            <p class="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium opacity-80">
                {{ __('hero_premium_desc') }}
            </p>
            
            {{-- CTA Group --}}
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
                @guest
                    <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 group">
                        {{ __('hero_premium_cta_primary') }}
                        <svg class="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                    <a href="{{ route('about') }}" class="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all transform hover:-translate-y-1 active:scale-95 text-center">
                        {{ __('hero_premium_cta_secondary') }}
                    </a>
                @endguest

                @auth
                    <a hx-boost="false" href="{{ route('dashboard') }}" class="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-indigo-100 text-center flex items-center justify-center gap-2 group">
                        {{ __('hero_enter_dashboard') }}
                        <svg class="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                @endauth
            </div>



            {{-- High-Fidelity App UI --}}
            <div class="relative max-w-6xl mx-auto mt-24">
                {{-- Glow Ambient (Optimized: Reduced blur and opacity, hardware acceleration) --}}
                <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-full h-80 bg-gradient-to-b from-indigo-500/10 to-transparent blur-2xl rounded-full transform-gpu pointer-events-none"></div>
                
                {{-- Core Value Visuals (3 Pillars) --}}
                <div class="grid md:grid-cols-3 gap-8 relative z-10">
                    
                    {{-- Card 1: Habit Matrix --}}
                    <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl transform-gpu md:-translate-y-12 hover:-translate-y-16 transition-transform duration-300 group relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors transform-gpu"></div>
                        <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">🌱</div>
                        <h3 class="text-xl font-black text-slate-900 mb-2">{{ __('hero_card_1_title') }}</h3>
                        <p class="text-sm text-slate-500 mb-8">{{ __('hero_card_1_desc') }}</p>
                        
                        <div class="grid grid-cols-7 gap-1.5">
                            @for($i=0; $i<28; $i++)
                                @php
                                    $op = [100, 300, 400, 500, 600][array_rand([0,1,2,3,4])];
                                    if($i % 5 == 0) $op = 100;
                                @endphp
                                <div class="w-full aspect-square bg-emerald-{{$op}} rounded-[4px] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                            @endfor
                        </div>
                    </div>

                    {{-- Card 2: Finance OS --}}
                    <div class="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.2)] transform-gpu hover:-translate-y-4 transition-transform duration-300 group relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-colors transform-gpu"></div>
                        <div class="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-indigo-500/30">💰</div>
                        <h3 class="text-xl font-black text-white mb-2">{{ __('hero_card_2_title') }}</h3>
                        <p class="text-sm text-slate-400 mb-8">{{ __('hero_card_2_desc') }}</p>
                        
                        <div class="space-y-3 relative z-10">
                            <div class="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50 flex justify-between items-center">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs">☕</div>
                                    <span class="text-slate-300 text-sm font-medium">{{ __('hero_card_2_item_1') }}</span>
                                </div>
                                <span class="text-white font-bold text-sm">-$4.50</span>
                            </div>
                            <div class="bg-indigo-600/20 p-4 rounded-2xl border border-indigo-500/30 flex justify-between items-center">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-indigo-500/30 text-indigo-300 rounded-full flex items-center justify-center text-xs">💼</div>
                                    <span class="text-indigo-200 text-sm font-medium">{{ __('hero_card_2_item_2') }}</span>
                                </div>
                                <span class="text-indigo-400 font-bold text-sm">+$4,200</span>
                            </div>
                        </div>
                    </div>

                    {{-- Card 3: Deep Focus --}}
                    <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl transform-gpu md:-translate-y-12 hover:-translate-y-16 transition-transform duration-300 group relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-colors transform-gpu"></div>
                        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">🎯</div>
                        <h3 class="text-xl font-black text-slate-900 mb-2">{{ __('hero_card_3_title') }}</h3>
                        <p class="text-sm text-slate-500 mb-8">{{ __('hero_card_3_desc') }}</p>
                        
                        <div class="relative">
                            <div class="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                            <div class="space-y-4 relative z-10">
                                <div class="flex gap-4 items-center">
                                    <div class="w-6 h-6 rounded-full bg-amber-500 border-4 border-white shadow-sm flex-shrink-0"></div>
                                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex-1 text-sm font-bold text-slate-700">{{ __('hero_card_3_item_1') }}</div>
                                </div>
                                <div class="flex gap-4 items-center opacity-50">
                                    <div class="w-6 h-6 rounded-full bg-slate-300 border-4 border-white shadow-sm flex-shrink-0"></div>
                                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex-1 text-sm font-medium text-slate-500 line-through">{{ __('hero_card_3_item_2') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {{-- Floating AI Decoration (Optimized Animation) --}}
                <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-auto bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl z-30 hidden md:flex items-center gap-4 transform-gpu animate-[float_4s_ease-in-out_infinite]">
                    <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md text-xl">✨</div>
                    <div class="pr-4">
                        <div class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{{ __('hero_floating_ai_title') }}</div>
                        <div class="text-white text-sm font-black">{{ __('hero_floating_ai_desc') }}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            @keyframes bounce-slow {
                0%, 100% { transform: translateY(0) rotate(-3deg); }
                50% { transform: translateY(-15px) rotate(-3deg); }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(6deg); }
                50% { transform: translateY(10px) rotate(6deg); }
            }
            .animate-bounce-slow { animation: bounce-slow 6s ease-in-out infinite; }
            .animate-float { animation: float 8s ease-in-out infinite; }
        </style>
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
                    <h2 class="text-[36px] leading-[1.1] md:text-6xl text-white mb-8 font-black">
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
                            <div class="p-6 bg-slate-800/50 rounded-[2rem] border border-slate-700/50  group hover:bg-slate-800 transition">
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
                    <div class="absolute inset-0 bg-indigo-600 rounded-[3.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
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
    <section class="py-40 bg-white bg-pattern-grid scroll-mt-20" id="features">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-24">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 font-bold text-[10px] mb-8 tracking-[0.2em] uppercase border border-slate-200">
                    {{ __('pill_badge') }}
                </div>
                <h2 class="text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-8 font-[900] tracking-tight leading-[1.1]">
                    {{ __('home_pillars_title') }}
                </h2>
                <p class="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl mx-auto">{{ __('home_pillars_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {{-- CARD 1: FINANCE --}}
                <div class="group bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition font-black">💰</div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-4">{{ __('pill_1_title') }}</h3>
                    <p class="text-slate-500 font-medium leading-relaxed">{{ __('pill_1_desc') }}</p>
                </div>

                {{-- CARD 2: HABITS --}}
                <div class="group bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition font-black">🌱</div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-4">{{ __('pill_2_title') }}</h3>
                    <p class="text-slate-500 font-medium leading-relaxed">{{ __('pill_2_desc') }}</p>
                </div>

                {{-- CARD 3: PLANNER --}}
                <div class="group bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 hover:bg-slate-900 hover:shadow-2xl hover:shadow-slate-300 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition font-black">📅</div>
                    <h3 class="text-2xl font-bold text-white mb-4">{{ __('pill_3_title') }}</h3>
                    <p class="text-slate-400 font-medium leading-relaxed">{{ __('pill_3_desc') }}</p>
                </div>

                {{-- CARD 4: JOURNAL --}}
                <div class="group bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-purple-100 transition duration-500 transform hover:-translate-y-2">
                    <div class="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition font-black">📔</div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-4">{{ __('pill_4_title') }}</h3>
                    <p class="text-slate-500 font-medium leading-relaxed">{{ __('pill_4_desc') }}</p>
                </div>

                {{-- CARD 5: GOALS --}}
                <div class="group bg-indigo-50/50 p-12 rounded-[2.5rem] border border-indigo-100/50 hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 transition duration-500 transform hover:-translate-y-2 lg:col-span-2 lg:flex lg:items-center lg:gap-12">
                   <div class="lg:shrink-0 lg:mb-0 mb-8">
                        <div class="w-20 h-20 bg-white rounded-3xl shadow-md flex items-center justify-center text-5xl group-hover:scale-110 transition font-black">🎯</div>
                   </div>
                   <div>
                        <h3 class="text-2xl lg:text-3xl text-indigo-950 mb-4 group-hover:text-white font-bold">{{ __('pill_5_title') }}</h3>
                        <p class="text-indigo-900/60 font-medium leading-relaxed group-hover:text-indigo-50 text-lg">{{ __('pill_5_desc') }}</p>
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
                    <h2 class="text-[36px] leading-[1.1] md:text-6xl text-white mb-8 tracking-tighter font-black">
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
                    <div class="relative bg-slate-900/50 border border-white/10 p-2 rounded-[3rem] shadow-2xl ">
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
    <section class="py-40 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-20">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] mb-6 tracking-[0.2em] uppercase border border-indigo-200">
                    {{ __('flow_badge') }}
                </div>
                <h2 class="text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-8 leading-tight font-[900] tracking-tight">
                    {{ __('home_flow_title') }}
                </h2>
                <p class="text-slate-500 text-lg font-medium leading-relaxed opacity-70">{{ __('home_flow_desc') }}</p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {{-- Decorative Line --}}
                <div class="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 -translate-y-1/2 -z-0"></div>
                
                @php
                    $steps = [
                        ['icon' => '🎯', 'title' => 'flow_step_1_title', 'desc' => 'flow_step_1_desc'],
                        ['icon' => '⚙️', 'title' => 'flow_step_2_title', 'desc' => 'flow_step_2_desc'],
                        ['icon' => '🌱', 'title' => 'flow_step_3_title', 'desc' => 'flow_step_3_desc'],
                        ['icon' => '📔', 'title' => 'flow_step_4_title', 'desc' => 'flow_step_4_desc']
                    ];
                @endphp

                @foreach($steps as $index => $step)
                <div class="bg-white p-10 rounded-[2rem] border border-slate-200 flex flex-col items-start text-left shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 relative z-10">
                    <div class="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold mb-8 text-sm shadow-lg">
                        0{{ $index + 1 }}
                    </div>
                    <div class="text-4xl mb-6">{{ $step['icon'] }}</div>
                    <h3 class="text-xl font-bold text-slate-900 mb-4 tracking-tight">{{ __($step['title']) }}</h3>
                    <p class="text-slate-500 font-medium text-sm leading-relaxed opacity-80">{{ __($step['desc']) }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4.1: DEEP SYNERGY ARCHITECTURE --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-24 items-center">
                <div>
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px] mb-8 uppercase tracking-[0.2em] border border-indigo-100/50">
                        🔗 {{ __('home_synergy_badge') }}
                    </div>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-8 leading-[1.1] font-[900] tracking-tight">
                        {{ __('home_synergy_title') }}
                    </h2>
                    <p class="text-slate-500 text-lg font-medium leading-relaxed mb-12 opacity-80">
                        {{ __('home_synergy_desc') }}
                    </p>

                    <div class="space-y-4">
                        @php
                            $synergies = [
                                ['icon' => '🌱', 'title' => 'home_synergy_step1_title', 'desc' => 'home_synergy_step1_desc'],
                                ['icon' => '💰', 'title' => 'home_synergy_step2_title', 'desc' => 'home_synergy_step2_desc'],
                                ['icon' => '📅', 'title' => 'home_synergy_step3_title', 'desc' => 'home_synergy_step3_desc']
                            ];
                        @endphp

                        @foreach($synergies as $synergy)
                        <div class="flex gap-6 p-8 rounded-[2rem] bg-slate-50/50 hover:bg-white transition-all border border-transparent hover:border-slate-200 group">
                            <div class="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition">
                                {{ $synergy['icon'] }}
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-slate-900 mb-1 tracking-tight">{{ __($synergy['title']) }}</h3>
                                <p class="text-slate-500 font-medium text-sm leading-relaxed opacity-70">{{ __($synergy['desc']) }}</p>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>

                <div class="relative">
                    {{-- Visual representation: Synergy Sphere --}}
                    <div class="aspect-square relative flex items-center justify-center">
                        <div class="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 to-purple-50/50 rounded-full"></div>
                        <div class="absolute inset-8 border border-slate-200/50 rounded-full scale-100 animate-pulse"></div>
                        <div class="absolute inset-20 border border-slate-200/50 rounded-full scale-100"></div>
                        
                        <div class="relative w-40 h-40 bg-slate-900 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] flex items-center justify-center z-10 overflow-hidden group">
                            <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-800"></div>
                            <div class="relative z-10 text-5xl group-hover:scale-110 transition duration-700">🌌</div>
                        </div>

                        {{-- Nodes --}}
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-14 h-14 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-2xl">🌱</div>
                        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-14 h-14 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-2xl">💰</div>
                        <div class="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 w-14 h-14 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-2xl">📅</div>
                        <div class="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 w-14 h-14 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-2xl">📔</div>
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
                    <div class="absolute -inset-20 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-2xl opacity-40"></div>
                    
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
                    <h2 class="text-5xl md:text-7xl text-slate-900 mb-8 leading-tight font-black">
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
    <section class="py-40 bg-slate-50 border-t border-slate-100">
        <div class="max-w-7xl mx-auto px-6 text-center">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] mb-8 tracking-[0.2em] uppercase border border-indigo-200">
                {{ __('mig_badge') }}
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-16 leading-tight font-[900] tracking-tight">
                {{ __('mig_title') }}
            </h2>

            <div class="grid sm:grid-cols-3 gap-6">
                <a href="{{ route('compare.notes-apps') }}" class="group bg-white p-12 rounded-[2.5rem] border border-slate-200 hover:border-indigo-600 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                    <div class="text-4xl mb-6 grayscale group-hover:grayscale-0 transition">📝</div>
                    <div class="text-xl font-bold text-slate-900 mb-2">{{ __('mig_card_1') }}</div>
                    <div class="text-indigo-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition">{{ __('mig_view_card_1') }}</div>
                </a>
                <a href="{{ route('compare.custom-apps') }}" class="group bg-white p-12 rounded-[2.5rem] border border-slate-200 hover:border-indigo-600 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                    <div class="text-4xl mb-6 grayscale group-hover:grayscale-0 transition">📊</div>
                    <div class="text-xl font-bold text-slate-900 mb-2">{{ __('mig_card_2') }}</div>
                    <div class="text-indigo-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition">{{ __('mig_view_card_2') }}</div>
                </a>
                <a href="{{ route('compare.five-apps') }}" class="group bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 transform hover:-translate-y-1">
                    <div class="text-4xl mb-6">🌌</div>
                    <div class="text-xl font-bold text-white mb-2">{{ __('mig_card_3') }}</div>
                    <div class="text-indigo-400 font-bold text-sm opacity-70 group-hover:opacity-100 transition">{{ __('mig_view_all') }}</div>
                </a>
            </div>

            <p class="mt-16 text-slate-400 font-bold tracking-[0.3em] text-[10px] uppercase">
                {{ __('mig_cta') }}
            </p>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 6.1: LIFE PATH NAVIGATOR (Internal Linking) --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-slate-900 relative overflow-hidden">
        {{-- Background Accents --}}
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 blur-2xl rounded-full"></div>
        <div class="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/5 blur-2xl rounded-full"></div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="text-center mb-24">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/60 text-[10px] font-bold tracking-[0.3em] mb-6 border border-white/10 uppercase">
                    🚀 {{ __('home_solutions_badge') }}
                </div>
                <h2 class="text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-tight font-[900]">{{ __('home_solutions_title') }}</h2>
                <p class="text-slate-400 text-lg max-w-2xl mx-auto font-medium opacity-80">
                    {{ __('home_solutions_desc') }}
                </p>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                @php
                    $paths = [
                        ['name' => 'Student', 'route' => 'solutions.student', 'icon' => '🎓', 'color' => 'from-blue-500/10 to-indigo-500/10'],
                        ['name' => 'Career Accelerator', 'route' => 'solutions.career', 'icon' => '💼', 'color' => 'from-emerald-500/10 to-teal-500/10'],
                        ['name' => 'Personal Growth', 'route' => 'solutions.personalgrowth', 'icon' => '🌱', 'color' => 'from-purple-500/10 to-pink-500/10'],
                        ['name' => 'Finance Mastery', 'route' => 'solutions.finance', 'icon' => '💰', 'color' => 'from-amber-500/10 to-orange-500/10'],
                        ['name' => 'Atomic System', 'route' => 'solutions.atomic', 'icon' => '⚛️', 'color' => 'from-lime-500/10 to-green-500/10'],
                        ['name' => 'Mental Clarity', 'route' => 'solutions.mental', 'icon' => '🧠', 'color' => 'from-slate-500/10 to-gray-500/10'],
                        ['name' => 'Deep Work', 'route' => 'solutions.deepwork', 'icon' => '⚡', 'color' => 'from-cyan-500/10 to-blue-500/10'],
                        ['name' => 'Freelancer', 'route' => 'solutions.freelancer', 'icon' => '🚀', 'color' => 'from-rose-500/10 to-red-500/10'],
                        ['name' => 'Second Brain', 'route' => 'solutions.secondbrain', 'icon' => '💎', 'color' => 'from-indigo-500/10 to-purple-500/10'],
                    ];
                @endphp

                @foreach($paths as $path)
                <a href="{{ route($path['route']) }}" class="group block p-[1px] rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-500">
                    <div class="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-gradient-to-br {{ $path['color'] }} p-8 h-full flex flex-col items-center text-center">
                        <div class="text-4xl mb-4 group-hover:scale-110 transition duration-500">
                            {{ $path['icon'] }}
                        </div>
                        <h3 class="text-white font-bold tracking-tight text-sm">
                            {{ $path['name'] }}
                        </h3>
                        <div class="mt-6 opacity-40 group-hover:opacity-100 transition duration-500 flex items-center gap-2 text-[10px] text-white/60 font-bold uppercase tracking-widest">
                            Explore <svg class="w-3 h-3 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
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
    <section class="py-48 bg-white overflow-hidden">
        <div class="max-w-5xl mx-auto px-6">
            <div class="relative bg-slate-950 rounded-[3rem] p-12 md:p-20 shadow-2xl overflow-hidden group">
                <div class="absolute -right-20 -top-20 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                
                <div class="grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-slate-300 font-bold text-[10px] mb-8 tracking-[0.2em] uppercase border border-white/10">
                            {{ __('eco_coming_soon') }}
                        </div>
                        <h2 class="text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight font-[900] tracking-tight">
                            {{ __('waitlist_title') }}
                        </h2>
                        <p class="text-slate-400 text-lg font-medium leading-relaxed mb-0 opacity-80">
                            {{ __('waitlist_desc') }}
                        </p>
                    </div>

                    <div class="bg-white/5  p-8 rounded-[2rem] border border-white/10 shadow-inner">
                         <form action="{{ route('waitlist.store') }}" method="POST" class="space-y-4">
                            @csrf
                            <input 
                                name="email"
                                type="email" 
                                value="{{ old('email') }}"
                                placeholder="{{ __('waitlist_input_placeholder') }}"
                                class="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
                                required
                            />
                            <button type="submit" class="w-full bg-white text-slate-950 px-6 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition transform active:scale-95 shadow-lg">
                                {{ __('waitlist_btn') }}
                            </button>
                        </form>
                        
                        @if(session('success'))
                            <div class="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-bold text-sm text-center">
                                ✅ {{ session('success') }}
                            </div>
                        @endif

                        <p class="mt-6 text-[10px] text-slate-500 font-bold text-center tracking-widest uppercase opacity-60">
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
    <section class="py-40 bg-slate-50 border-y border-slate-100">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-4xl md:text-5xl text-slate-900 mb-16 text-center tracking-tight font-[900]">{{ __('faq_title') }}</h2>
            
            <div class="grid gap-4" x-data="{ active: null }">
                @foreach([1, 2, 3, 4, 5] as $i)
                <div class="bg-white rounded-[2rem] border border-slate-200 overflow-hidden transition-all duration-300 shadow-sm" :class="active === {{ $i }} ? 'ring-2 ring-indigo-500 border-indigo-500' : ''">
                    <button @click="active = active === {{ $i }} ? null : {{ $i }}" class="flex justify-between items-center w-full p-8 text-left group">
                        <span class="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition tracking-tight">{{ __("faq_q$i") }}</span>
                        <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition">
                            <span class="text-xs text-slate-400 group-hover:text-indigo-600 transition-transform duration-300" :class="active === {{ $i }} ? 'rotate-180' : ''">▼</span>
                        </div>
                    </button>
                    <div x-show="active === {{ $i }}" x-collapse x-cloak>
                        <div class="px-8 pb-8 text-slate-500 font-medium text-lg leading-relaxed opacity-80">
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
    <section class="py-56 px-6 text-center relative overflow-hidden bg-white">
        {{-- Aesthetic Accents --}}
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(79,70,229,0.05)_0%,transparent_50%)]"></div>
        
        <div class="max-w-5xl mx-auto relative z-10">
            <h2 class="text-5xl md:text-[6rem] mb-12 leading-[1] tracking-tight text-slate-900 font-[900]">
                {{ __('cta_final_title') }}
            </h2>
            <p class="text-slate-500 text-lg md:text-xl mb-16 max-w-xl mx-auto font-medium opacity-80">
                {{ __('cta_final_desc') }}
            </p>
            
            <div class="flex flex-col items-center gap-8">
                <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-16 py-6 rounded-2xl font-bold text-xl hover:bg-indigo-700 shadow-[0_20px_40px_-10px_rgba(79,70,229,0.3)] transition transform hover:-translate-y-1 active:scale-95 font-sans">
                    {{ __('cta_final_btn') }}
                </a>
                <div class="flex items-center gap-3 text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase opacity-60">
                    {{ __('cta_final_sub') }}
                </div>
            </div>
        </div>
    </section>
</main>
@endsection

