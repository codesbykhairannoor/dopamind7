@extends('layouts.marketing')

@section('title', __('five_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('five_meta_desc') }}">
    <meta property="og:title" content="{{ __('five_meta_og_title') }}">
    <meta property="og:description" content="{{ __('five_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/compare/five-apps') }}">
@endsection

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "OneForMind",
    "item": "{{ url('/') }}"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "{{ __('five_badge') }}",
    "item": "{{ url('/compare/five-apps') }}"
  }]
},
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "OneForMind",
  "applicationCategory": "ProductivityApplication, LifestyleApplication",
  "operatingSystem": "Web, Windows, macOS, Linux",
  "description": "{{ __('five_meta_desc') }}",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Unified Habits, Finance, & Tasks",
    "Context-First Life OS",
    "Vision-Led Goal Tracking",
    "Mindful Digital Journaling"
  ]
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{ __('five_faq_q1') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('five_faq_a1') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('five_faq_q2') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('five_faq_a2') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('five_faq_q3') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('five_faq_a3') }}"
      }
    }
  ]
}
]
</script>
@endsection

@section('content')

    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO (THE UNIFIED REVOLUTION) --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white relative border-b border-slate-100">
        {{-- Cosmic Background --}}
        <div class="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-indigo-100/50 to-purple-100/20 rounded-full blur-[120px] -z-10 animate-pulse duration-[10000ms]"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
            
            {{-- Left: Copywriting --}}
            <div class="lg:col-span-6 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-100">
                    🌌 {{ __('five_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-slate-900 tracking-tight">
                    {{ __('five_hero_title_1') }}<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('five_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-lg">
                    {!! __('five_hero_desc') !!}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 text-center">
                        {{ __('five_hero_cta') }} →
                    </a>
                    <p class="py-4 text-sm text-slate-400 font-bold self-center">{{ __('five_hero_note') }}</p>
                </div>
            </div>

            {{-- Right: Visual Metaphor (Scattered Icons vs Unified Orb) --}}
            <div class="lg:col-span-6 relative h-[500px] flex items-center justify-center animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 fill-mode-both">
                
                {{-- Element 1: The Fragmented Icons (Competitors) --}}
                <div class="absolute inset-0 z-0">
                    <div class="absolute top-10 left-10 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl opacity-40 rotate-12 animate-float">📅</div>
                    <div class="absolute bottom-10 right-20 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl opacity-40 -rotate-12 animate-float-delayed">💰</div>
                    <div class="absolute top-20 right-10 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl opacity-40 rotate-45 animate-float">🌿</div>
                    <div class="absolute bottom-20 left-20 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl opacity-40 -rotate-45 animate-float-delayed">📝</div>
                    <div class="absolute top-1/2 left-0 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl opacity-40 rotate-90 animate-float">🎯</div>
                </div>

                {{-- Element 2: The Unified Orb (Front) --}}
                <div class="relative bg-white/90 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl border border-white w-80 z-20 overflow-hidden transform hover:scale-105 transition duration-500" role="img" aria-label="OneForMind Unified Orb: A centralized dashboard representation showing a 100% synchronized status across habits, goals, money, and tasks.">
                    <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5"></div>
                    
                    <div class="relative z-10 text-center">
                        <div class="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-2xl shadow-indigo-200 ring-8 ring-indigo-50">
                            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 4H4v7h7V4zm0 9H4v7h7v-7zm9-9h-7v7h7V4zm0 9h-7v7h7v-7z"/></svg>
                        </div>
                        <h3 class="font-black text-2xl text-slate-900 mb-2">{{ __('five_mockup_title') }}</h3>
                        <p class="text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">{{ __('five_mockup_desc') }}</p>
                        
                        <div class="flex items-center justify-center gap-2 bg-indigo-50 py-2 px-4 rounded-full inline-flex">
                            <span class="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
                            <span class="text-xs font-black text-indigo-700 uppercase">{{ __('five_mockup_stat_1') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: NEW LAYOUT -> MASONRY GRID (THE FRICTION TAX) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-900 relative overflow-hidden">
        <div class="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-20">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-white">{{ __('five_cycle_title') }}</h2>
                <p class="text-xl text-slate-400">{{ __('five_cycle_desc') }}</p>
            </div>

            {{-- Masonry-style Grid --}}
            <div class="grid md:grid-cols-12 gap-6 max-w-5xl mx-auto">
                
                {{-- Card 1: Wide --}}
                <div class="md:col-span-8 bg-slate-800/50 backdrop-blur-sm p-10 rounded-[2.5rem] border border-slate-700/50 hover:bg-slate-800 transition group">
                    <div class="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">🏃‍♂️</div>
                    <h3 class="text-2xl font-bold mb-3 text-white">{{ __('five_cycle_1_title') }}</h3>
                    <p class="text-slate-400 leading-relaxed">{{ __('five_cycle_1_desc') }}</p>
                </div>
                
                {{-- Card 2: Tall/Square --}}
                <div class="md:col-span-4 bg-indigo-600 p-10 rounded-[2.5rem] border border-indigo-500 shadow-2xl shadow-indigo-900/50 relative overflow-hidden group">
                    <div class="absolute -top-4 -right-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce z-10">SYNC FAILED</div>
                    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="text-4xl mb-6 relative z-10 group-hover:-translate-y-2 transition-transform">🧱</div>
                    <h3 class="text-2xl font-bold mb-3 text-white relative z-10">{{ __('five_cycle_2_title') }}</h3>
                    <p class="text-indigo-100 leading-relaxed relative z-10">{{ __('five_cycle_2_desc') }}</p>
                </div>

                {{-- Card 3: Full Width --}}
                <div class="md:col-span-12 bg-slate-800/50 backdrop-blur-sm p-10 rounded-[2.5rem] border border-slate-700/50 flex flex-col md:flex-row items-center gap-8 hover:border-slate-600 transition group">
                    <div class="text-6xl group-hover:rotate-12 transition-transform">😴</div>
                    <div>
                        <h3 class="text-2xl font-bold mb-3 text-white">{{ __('five_cycle_3_title') }}</h3>
                        <p class="text-slate-400 leading-relaxed max-w-3xl">{{ __('five_cycle_3_desc') }}</p>
                    </div>
                </div>
                
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: NEW LAYOUT -> VERTICAL SPLIT (DIVIDED BY COMPLEXITY) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-50 overflow-hidden">
        <div class="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
            
            {{-- Top: Text --}}
            <div class="w-16 h-16 bg-white text-rose-500 rounded-2xl flex items-center justify-center text-3xl mb-8 border border-slate-200 shadow-sm shadow-rose-100">💔</div>
            <h2 class="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900 max-w-4xl">
                {{ __('five_prob_title_1') }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">{{ __('five_prob_title_highlight') }}</span>.
            </h2>
            <p class="text-slate-500 text-xl leading-relaxed mb-16 max-w-2xl">
                {{ __('five_prob_desc') }}
            </p>
            
            {{-- Bottom: Visual Graveyard --}}
            <div class="w-full bg-white p-12 rounded-[3rem] border border-slate-200 shadow-xl relative overflow-hidden">
                <div class="absolute top-0 w-full h-2 bg-gradient-to-r from-rose-400 to-orange-400 left-0"></div>
                
                <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">The App Stack Graveyard</h4>
                
                <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                    @foreach(['Planner Premium' => '$9.99', 'Habit Gold' => '$4.99', 'Finance Pro' => '$12.99', 'Journal Plus' => '$5.99', 'Goal Elite' => '$15.99'] as $app => $price)
                    <div class="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transform hover:-translate-y-2 transition duration-300">
                        <div class="w-8 h-8 bg-slate-200 rounded-full mb-2"></div>
                        <span class="text-[10px] font-bold text-slate-600 text-center">{{ $app }}</span>
                        <span class="text-xs font-mono text-rose-500 font-bold">{{ $price }}/mo</span>
                    </div>
                    @endforeach
                </div>
                
                <div class="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center px-4">
                    <div class="text-left mb-4 md:mb-0">
                        <ul class="text-sm font-bold text-slate-500 space-y-1">
                            <li>✕ {{ __('five_prob_point_1') }}</li>
                            <li>✕ {{ __('five_prob_point_2') }}</li>
                            <li>✕ {{ __('five_prob_point_3') }}</li>
                        </ul>
                    </div>
                    <div class="text-right bg-rose-50 px-6 py-4 rounded-2xl border border-rose-100">
                        <span class="block text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">TOTAL COST</span>
                        <span class="font-black text-3xl text-rose-600">$49.95<span class="text-lg text-rose-400">/mo</span></span>
                    </div>
                </div>
            </div>

        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: NEW LAYOUT -> SIDE-BY-SIDE FLOATING (THE SYNERGY) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white overflow-hidden relative">
        {{-- Decorative lines --}}
        <div class="absolute left-1/2 top-0 h-full w-px bg-slate-100 -z-10 hidden lg:block"></div>

        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-24 max-w-3xl mx-auto">
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight">
                    {{ __('five_sol_title_1') }} <span class="text-indigo-600">{{ __('five_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl">
                    {{ __('five_sol_desc') }}
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {{-- Left: Text & Features --}}
                <div class="space-y-12">
                    <div>
                        <h3 class="text-3xl font-black mb-6 text-slate-900">{{ __('five_sol_box_title') }}</h3>
                        <p class="text-slate-600 text-lg leading-relaxed">
                            {!! __('five_sol_box_desc') !!}
                        </p>
                    </div>

                    <div class="space-y-6">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shrink-0 border border-indigo-100">🌊</div>
                            <div>
                                <h4 class="font-bold text-slate-900 text-lg">Seamless Transitions</h4>
                                <p class="text-slate-500 text-sm">Move between life sectors without breaking your focus.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shrink-0 border border-indigo-100">🤝</div>
                            <div>
                                <h4 class="font-bold text-slate-900 text-lg">Cross-Validation</h4>
                                <p class="text-slate-500 text-sm">Your habits inform your goals. Your goals inform your tasks.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shrink-0 border border-indigo-100">🛡️</div>
                            <div>
                                <h4 class="font-bold text-slate-900 text-lg">One Secure Home</h4>
                                <p class="text-slate-500 text-sm">All your data under one roof. No more scattered mental energy.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Right: Floating Interface Mockup --}}
                <div class="relative">
                    <div class="absolute inset-0 bg-indigo-600 rounded-[3rem] rotate-3 transform scale-105 opacity-10"></div>
                    <div class="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-2xl relative z-10 flex flex-col items-center justify-center min-h-[400px]">
                        <div class="absolute top-10 right-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-3xl"></div>
                        
                        <div class="flex flex-wrap justify-center gap-4 relative z-10 w-full">
                            @foreach(['Habits', 'Goals', 'Money', 'Tasks', 'Notes'] as $feature)
                                <div class="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl text-sm font-bold text-white border border-white/20 shadow-lg transform hover:scale-110 transition-transform cursor-default">
                                    {{ $feature }}
                                </div>
                            @endforeach
                        </div>
                        
                        <div class="mt-12 bg-white/5 border border-white/10 p-6 rounded-3xl w-full backdrop-blur-md text-center">
                            <p class="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">System Status</p>
                            <p class="text-white font-bold text-xl">100% Synchronized</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 5: NEW LAYOUT -> CHECKLIST BOARD --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-50">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6">{{ __('five_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('five_compare_desc') }}</p>
            </div>

            <div class="bg-white rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden p-8 md:p-12">
                <div class="grid grid-cols-12 gap-4 border-b border-slate-100 pb-6 mb-6">
                    <div class="col-span-6 md:col-span-8"></div>
                    <div class="col-span-3 md:col-span-2 text-center font-black text-xs uppercase tracking-widest text-slate-400">{{ __('five_table_head_2') }}</div>
                    <div class="col-span-3 md:col-span-2 text-center font-black text-xs uppercase tracking-widest text-indigo-600">OneForMind</div>
                </div>

                <div class="space-y-6">
                    @foreach([1, 2, 3, 4] as $i)
                    <div class="grid grid-cols-12 gap-4 items-center group">
                        <div class="col-span-6 md:col-span-8">
                            <h4 class="font-bold text-slate-900 text-sm md:text-base">{{ __("five_table_row_{$i}_title") }}</h4>
                            <p class="text-xs text-slate-500 hidden md:block mt-1">{{ __("five_table_row_{$i}_col_1") }}</p>
                        </div>
                        <div class="col-span-3 md:col-span-2 flex justify-center">
                            <span class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold group-hover:bg-rose-100 group-hover:text-rose-500 transition">✕</span>
                        </div>
                        <div class="col-span-3 md:col-span-2 flex justify-center">
                            <span class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition">✓</span>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: SCIENTIFIC PILLAR (E-E-A-T) --}}
    <section class="py-24 bg-slate-50 border-y border-slate-100">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                🧬 {{ __('five_science_badge') }}
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-6">{{ __('five_science_title') }}</h2>
            <p class="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto italic">
                {{ __('five_science_desc') }}
            </p>
            <div class="mt-10 flex flex-wrap justify-center gap-8 opacity-50 grayscale">
                <span class="text-sm font-black uppercase tracking-tighter">Neural Synergy</span>
                <span class="text-sm font-black uppercase tracking-tighter">Unified Info Architecture</span>
                <span class="text-sm font-black uppercase tracking-tighter">Flow State Maintenance</span>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 6: CTA (Minimalist & Punchy) --}}
    {{-- ================================================================= --}}
    <section class="py-32 px-6 bg-indigo-600 relative overflow-hidden">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        
        <div class="max-w-3xl mx-auto text-center relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-12 md:p-20 rounded-[3rem] shadow-2xl">
            <h2 class="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight leading-tight">
                {!! __('five_cta_title') !!}
            </h2>
            <p class="text-indigo-100 text-lg md:text-xl mb-10 font-medium leading-relaxed">
                {{ __('five_cta_desc') }}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-white text-indigo-900 px-10 py-4 rounded-full font-black text-lg hover:bg-indigo-50 transition transform hover:-translate-y-1 shadow-xl">
                    {{ __('five_cta_btn') }}
                </a>
            </div>
            <p class="mt-8 text-xs text-indigo-200 font-bold uppercase tracking-[0.2em] opacity-80">{{ __('five_cta_sub') }}</p>
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

    {{-- SECTION: INTERNAL LINKING (UNIFIED ECOSYSTEM) --}}
    <section class="py-24 bg-white border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-3xl font-black text-gray-900 mb-12 text-center">{{ __('unified_ecosystem_title', ['feature' => __('five_badge')]) }}</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <a href="{{ url('/features/habit') }}" class="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition duration-500">
                    <span class="text-2xl mb-4 block group-hover:scale-110 transition">🌱</span>
                    <h4 class="font-bold text-gray-900">{{ __('habit_hero_badge') }}</h4>
                    <p class="text-xs text-gray-500 mt-2">{{ __('habit_meta_title') }}</p>
                </a>
                <a href="{{ url('/features/planner') }}" class="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition duration-500">
                    <span class="text-2xl mb-4 block group-hover:scale-110 transition">📅</span>
                    <h4 class="font-bold text-gray-900">{{ __('planner_hero_badge') }}</h4>
                    <p class="text-xs text-gray-500 mt-2">{{ __('planner_meta_title') }}</p>
                </a>
                <a href="{{ url('/features/goal') }}" class="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition duration-500">
                    <span class="text-2xl mb-4 block group-hover:scale-110 transition">🎯</span>
                    <h4 class="font-bold text-gray-900">{{ __('goal_hero_badge') }}</h4>
                    <p class="text-xs text-gray-500 mt-2">{{ __('goal_meta_title') }}</p>
                </a>
                <a href="{{ url('/features/finance') }}" class="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition duration-500">
                    <span class="text-2xl mb-4 block group-hover:scale-110 transition">💰</span>
                    <h4 class="font-bold text-gray-900">{{ __('finance_hero_badge') }}</h4>
                    <p class="text-xs text-gray-500 mt-2">{{ __('finance_meta_title') }}</p>
                </a>
            </div>
        </div>
    </section>

@endsection