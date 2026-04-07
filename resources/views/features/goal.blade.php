@extends('layouts.marketing')

@section('title', __('goal_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('goal_meta_desc') }}">
    <meta property="og:title" content="{{ __('goal_meta_og_title') }}">
    <meta property="og:description" content="{{ __('goal_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/features/goal') }}">

@endsection

@section('json-ld')
<script type="application/ld+json">
[
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{{ __('schema_goal_name') }}",
  "applicationCategory": "ProductivityApplication",
  "description": "{{ __('schema_goal_description') }}",
  "featureList": [
    "Vision Board Cover Images",
    "Milestone Breakdown",
    "Real-time Progress Tracking",
    "Priority & Reward System"
  ]
},
{
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
    "name": "{{ __('goal_hero_badge') }}",
    "item": "{{ url('/features/goal') }}"
  }]
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{ __('goal_faq_q1') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('goal_faq_a1') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('goal_faq_q2') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('goal_faq_a2') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('goal_faq_q3') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('goal_faq_a3') }}"
      }
    }
  ]
}
]
</script>
@endsection

@section('content')

   {{-- SECTION 1: HERO (CENTERED LAYOUT + FLOATING GOAL MOCKUP) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-gray-50 relative border-b border-gray-100">
        {{-- Background Glow --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>

        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    <span class="text-lg">🎯</span> {{ __('goal_hero_badge') }}
                </div>
                
                <h1 class="text-6xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('goal_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('goal_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                    {{ __('goal_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        {{ __('goal_hero_cta_1') }}
                    </a>
                    <a href="#how-it-works" class="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-full font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition">
                        {{ __('goal_hero_cta_2') }}
                    </a>
                </div>
            </div>

            {{-- Floating Mockup Centered --}}
            <div class="max-w-4xl mx-auto relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both" role="img" aria-label="Goal Tracking Dashboard Preview: Showing yearly targets, high-performance momentum indicators, and actionable milestones for launching projects and reaching revenue targets.">
            <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20 h-full w-full pointer-events-none"></div>
            
            <div class="bg-white/80 backdrop-blur-xl rounded-t-[3rem] border-x border-t border-gray-200 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 overflow-hidden h-auto min-h-[400px]">
                    
                    <div class="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                        <div class="text-left">
                            <h3 class="font-black text-gray-900 text-2xl mb-1">{{ __('goal_mockup_title') }} 🏆</h3>
                        </div>
                        <div class="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl border border-indigo-100 flex items-center gap-3">
                            <span class="text-2xl">⚡</span>
                            <div class="text-left">
                                <span class="text-[10px] font-bold uppercase block leading-none opacity-70 mb-0.5">{{ __('goal_mockup_momentum_label') }}</span>
                                <span class="font-black text-lg leading-tight">{{ __('goal_mockup_streak') }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        {{-- Task 1 (Done) --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-2xl transition border border-gray-100 hover:border-indigo-100 cursor-pointer bg-gray-50/50">
                            <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm shadow-sm">✓</div>
                            <div class="flex-1 text-left opacity-60 line-through">
                                <p class="font-bold text-gray-900">{{ __('goal_mockup_task_1') }}</p>
                                <p class="text-sm text-gray-500">{{ __('goal_mockup_time_1') }}</p>
                            </div>
                        </div>
                        
                        {{-- Task 2 (Done) --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-2xl transition border border-gray-100 hover:border-indigo-100 cursor-pointer bg-gray-50/50">
                            <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm shadow-sm">✓</div>
                            <div class="flex-1 text-left opacity-60 line-through">
                                <p class="font-bold text-gray-900">{{ __('goal_mockup_task_2') }}</p>
                                <p class="text-sm text-gray-500">{{ __('goal_mockup_time_1') }}</p>
                            </div>
                        </div>

                        {{-- Task 3 (Active/Pending) --}}
                        <div class="flex items-center gap-4 p-4 bg-white rounded-2xl transition border-2 border-indigo-200 hover:border-indigo-400 cursor-pointer shadow-sm transform scale-[1.02]">
                            <div class="w-8 h-8 rounded-full border-2 border-indigo-300 flex items-center justify-center"></div>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-indigo-900">{{ __('goal_mockup_task_3') }}</p>
                                <p class="text-sm text-indigo-600">{{ __('goal_mockup_milestone_label') }}</p>
                            </div>
                            <div class="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-sm shadow-indigo-400"></div>
                        </div>
                    </div>

                    {{-- Floating Element (Level Up Badge) --}}
                    <div class="absolute -right-8 -bottom-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20 animate-bounce duration-[3000ms]">
                        <div class="flex items-center gap-3">
                            <div class="text-3xl">🎉</div>
                            <div class="text-left">
                                <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{{ __('goal_mockup_alert_1') }}</p>
                                <p class="font-black text-indigo-900 text-sm">{{ __('goal_mockup_alert_2') }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>
    
    {{-- NEW SECTION 2: VERTICAL ASCENT (STRATEGY HIERARCHY) --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row gap-20 items-center">
                <div class="flex-1 w-full animate-in fade-in slide-in-from-left-8 duration-700" role="img" aria-label="Strategic Growth Journey Visualization: A vertical path showing the transition from moonshot theories to actionable milestones.">
                    <div class="relative pt-12">
                        {{-- Vertical Path Visual --}}
                        <div class="relative py-20 pl-24">
                            {{-- The Line --}}
                            <div class="absolute left-16 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-500 via-indigo-500 to-indigo-100 rounded-full"></div>
                            
                            {{-- Moonshot (Top) --}}
                            <div class="relative mb-24 animate-in fade-in slide-in-from-top-8 duration-700">
                                <div class="absolute -left-16 top-0 w-12 h-12 bg-white rounded-full border-4 border-amber-500 shadow-xl z-10 flex items-center justify-center text-lg">🔥</div>
                                <div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative group hover:scale-105 transition duration-500">
                                    <div class="absolute -inset-2 bg-gradient-to-r from-amber-500 to-transparent rounded-[3rem] -z-10 opacity-20 blur-xl group-hover:opacity-40"></div>
                                    <h4 class="text-amber-500 font-black uppercase tracking-widest text-xs mb-4">{{ __('goal_level_moonshot') }}</h4>
                                    <p class="text-2xl font-black italic tracking-tight">{{ __('goal_moonshot_example') }}</p>
                                </div>
                            </div>

                            {{-- Milestone (Middle) --}}
                            <div class="relative mb-24 ml-12 animate-in fade-in slide-in-from-left-8 duration-700 delay-150">
                                <div class="absolute -left-28 top-4 w-16 h-[2px] bg-indigo-500"></div>
                                <div class="absolute -left-32 top-2 w-8 h-8 bg-white rounded-full border-4 border-indigo-500 shadow-lg z-10 flex items-center justify-center text-xs">⭐</div>
                                <div class="bg-white border-2 border-indigo-100 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition duration-500">
                                    <h4 class="text-indigo-600 font-black uppercase tracking-widest text-xs mb-4">{{ __('goal_milestone_number') }}</h4>
                                    <p class="text-xl font-black text-gray-900 tracking-tight">{{ __('goal_milestone_example') }}</p>
                                    <div class="mt-6 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div class="w-3/4 h-full bg-indigo-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {{-- Task (Bottom) --}}
                            <div class="relative ml-24 animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
                                <div class="absolute -left-40 top-4 w-32 h-[2px] bg-indigo-200"></div>
                                <div class="absolute -left-44 top-2 w-8 h-8 bg-white rounded-full border-4 border-indigo-200 shadow-lg z-10 flex items-center justify-center text-xs">📝</div>
                                <div class="bg-gray-50 border border-gray-100 p-6 rounded-3xl opacity-60 text-left">
                                    <p class="font-bold text-gray-600">{{ __('goal_task_example') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-sm border border-amber-100">
                        {{ __('goal_ascent_badge') }}
                    </div>
                    <h2 class="text-6xl md:text-7xl font-black text-gray-900 mb-10 leading-[1.1] tracking-tight">
                        {{ __('goal_ascent_title') }}
                    </h2>
                    <p class="text-gray-500 text-xl mb-12 leading-relaxed font-medium">
                        {{ __('goal_ascent_desc') }}
                    </p>
                    <div class="space-y-6">
                        <div class="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition duration-500 group">
                            <div class="w-14 h-14 bg-amber-100 text-amber-600 rounded-[1.25rem] flex items-center justify-center text-2xl group-hover:rotate-12 transition">🏔️</div>
                            <div>
                                <h4 class="font-black text-gray-900 uppercase tracking-tighter">{{ __('goal_moonshot_label') }}</h4>
                                <p class="text-xs text-gray-500 leading-relaxed">{{ __('goal_moonshot_desc') }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition duration-500 group">
                            <div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-[1.25rem] flex items-center justify-center text-2xl group-hover:-rotate-12 transition">🎯</div>
                            <div>
                                <h4 class="font-black text-gray-900 uppercase tracking-tighter">{{ __('goal_milestones_label') }}</h4>
                                <p class="text-xs text-gray-500 leading-relaxed">{{ __('goal_milestones_desc') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION 3: MOMENTUM ORBIT (CIRCULAR PROGRESSION) --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-100/50 rounded-full blur-[120px] -mr-96 -mt-96"></div>
        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="flex flex-col lg:flex-row gap-24 items-center">
                <div class="flex-1 order-2 lg:order-1 relative">
                    {{-- Circular Orbit Visual --}}
                    <div class="w-full aspect-square max-w-lg mx-auto relative group flex items-center justify-center">
                        {{-- Outer Ring --}}
                        <div class="absolute inset-0 border-[16px] border-indigo-100 rounded-full"></div>
                        {{-- Progress Ring --}}
                        <svg class="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="50%" cy="50%" r="48%" fill="transparent" stroke="currentColor" stroke-width="16" stroke-dasharray="300 100" class="text-indigo-600 transition-all duration-1000"></circle>
                        </svg>
                        
                        {{-- Inner Ring --}}
                        <div class="absolute inset-16 border border-indigo-50/50 rounded-full"></div>
                        
                        {{-- Center Display --}}
                        <div class="relative z-10 text-center bg-white w-2/3 aspect-square rounded-full shadow-[0_40px_80px_rgba(79,70,229,0.15)] flex flex-col items-center justify-center border border-indigo-50 transform group-hover:scale-105 transition duration-700">
                            <span class="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">{{ __('goal_momentum_velocity') }}</span>
                            <span class="text-7xl md:text-8xl font-black text-gray-900 leading-none">84<span class="text-3xl text-indigo-300">%</span></span>
                            <div class="mt-6 flex items-center gap-3 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest">
                                <span class="animate-ping w-2 h-2 bg-emerald-500 rounded-full"></span> {{ __('goal_momentum_peak') }}
                            </div>
                        </div>

                        {{-- Orbiting Planet --}}
                        <div class="absolute w-12 h-12 bg-amber-500 rounded-2xl shadow-2xl shadow-amber-400 border-4 border-white transform rotate-45 -translate-y-[48%] animate-spin-slow origin-[0_500%]" style="origin-y: 1000%;"></div>
                    </div>
                </div>
                <div class="flex-1 order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900 text-white text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-2xl">
                        {{ __('goal_performance_badge') }}
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-tight tracking-tight">
                        {{ __('goal_momentum_title') }}
                    </h2>
                    <p class="text-gray-600 text-xl mb-12 leading-relaxed">
                        {{ __('goal_momentum_desc') }}
                    </p>
                    <div class="grid gap-8">
                        <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition duration-500 flex gap-8 items-start group">
                            <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl shrink-0 flex items-center justify-center text-3xl group-hover:scale-110 transition">⚡</div>
                            <div class="text-left">
                                <h4 class="text-xl font-black text-gray-900 mb-2 uppercase tracking-tighter">{{ __('goal_impl_speed_title') }}</h4>
                                <p class="text-gray-500 font-medium leading-relaxed">{{ __('goal_impl_speed_desc') }}</p>
                            </div>
                        </div>
                        <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition duration-500 flex gap-8 items-start group">
                            <div class="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl shrink-0 flex items-center justify-center text-3xl group-hover:rotate-12 transition">🔥</div>
                            <div class="text-left">
                                <h4 class="text-xl font-black text-gray-900 mb-2 uppercase tracking-tighter">{{ __('goal_streak_title') }}</h4>
                                <p class="text-gray-500 font-medium leading-relaxed">{{ __('goal_streak_desc') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION 3.5: MILESTONE DECOMPOSITION (ZIG-ZAG PATH) --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        {{-- Decorative SVG Path Background --}}
        <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            <svg class="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <path d="M0,100 L1000,300 L0,500 L1000,700 L0,900" fill="none" stroke="currentColor" stroke-width="40" />
            </svg>
        </div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm border border-blue-200">
                    {{ __('goal_steps_badge') }}
                </div>
                <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                    {{ __('goal_steps_title') }}
                </h2>
                <p class="text-gray-600 text-xl leading-relaxed font-medium">
                    {{ __('goal_steps_desc') }}
                </p>
            </div>

            <div class="relative">
                {{-- Vertical Line Connector --}}
                <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-indigo-600 to-transparent -translate-x-1/2 hidden md:block"></div>

                {{-- Step 1 --}}
                <div class="flex flex-col md:flex-row items-center gap-12 mb-32 group">
                    <div class="flex-1 text-center md:text-right order-2 md:order-1 animate-in fade-in slide-in-from-left-8 duration-700">
                        <h3 class="text-2xl font-black text-gray-900 mb-4">{{ __('goal_step_1_title') }}</h3>
                        <p class="text-gray-500 font-medium text-lg leading-relaxed">{{ __('goal_step_1_desc') }}</p>
                    </div>
                    <div class="relative z-10 flex-shrink-0 order-1 md:order-2">
                        <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl font-black text-blue-600 border-4 border-blue-50 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition duration-500">1</div>
                    </div>
                    <div class="flex-1 order-3 hidden md:block"></div>
                </div>

                {{-- Step 2 --}}
                <div class="flex flex-col md:flex-row items-center gap-12 mb-32 group">
                    <div class="flex-1 order-1 hidden md:block"></div>
                    <div class="relative z-10 flex-shrink-0 order-2">
                        <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl font-black text-indigo-600 border-4 border-indigo-50 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition duration-500">2</div>
                    </div>
                    <div class="flex-1 text-center md:text-left order-3 animate-in fade-in slide-in-from-right-8 duration-700">
                        <h3 class="text-2xl font-black text-gray-900 mb-4">{{ __('goal_step_2_title') }}</h3>
                        <p class="text-gray-500 font-medium text-lg leading-relaxed">{{ __('goal_step_2_desc') }}</p>
                    </div>
                </div>

                {{-- Step 3 --}}
                <div class="flex flex-col md:flex-row items-center gap-12 group">
                    <div class="flex-1 text-center md:text-right order-2 md:order-1 animate-in fade-in slide-in-from-left-8 duration-700">
                        <h3 class="text-2xl font-black text-gray-900 mb-4">{{ __('goal_step_3_title') }}</h3>
                        <p class="text-gray-500 font-medium text-lg leading-relaxed">{{ __('goal_step_3_desc') }}</p>
                    </div>
                    <div class="relative z-10 flex-shrink-0 order-1 md:order-2">
                        <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl font-black text-purple-600 border-4 border-purple-50 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition duration-500">3</div>
                    </div>
                    <div class="flex-1 order-3 hidden md:block text-4xl pt-4">🚀</div>
                </div>
            </div>
        </div>
    </section>


    {{-- NEW SECTION: SCIENTIFIC PILLAR (E-E-A-T) - ACHIEVEMENT PEAK STYLE --}}
    <section class="py-32 bg-rose-50/20 relative overflow-hidden">
        {{-- Custom Peak Background SVG --}}
        <div class="absolute inset-0 z-0">
             <svg class="w-full h-full text-rose-100/30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                 <path d="M0,1000 L300,400 L500,700 L800,200 L1000,1000 Z" fill="currentColor" />
             </svg>
        </div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="bg-white/80 backdrop-blur-2xl rounded-[4rem] border border-white p-12 md:p-24 text-center shadow-2xl relative overflow-hidden">
                <div class="absolute -top-12 -left-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
                <div class="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>

                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-sm border border-rose-200">
                    🏆 {{ __('goal_science_badge') }}
                </div>
                
                <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-tight tracking-tight">
                    {{ __('goal_science_title') }}
                </h2>
                
                <p class="text-gray-600 text-2xl leading-relaxed mb-16 italic font-medium max-w-3xl mx-auto">
                    {{ __('goal_science_desc') }}
                </p>
                
                {{-- Framework Icon Tags --}}
                <div class="flex flex-wrap justify-center gap-6">
                    <div class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-rose-50 group hover:bg-rose-600 transition duration-500">
                        <div class="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-white/20 transition">🎯</div>
                        <div class="text-left">
                            <span class="text-[10px] font-black text-rose-600 uppercase tracking-widest block group-hover:text-rose-100 transition">Method 01</span>
                            <span class="font-black text-gray-900 group-hover:text-white transition">OKR Framework</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-indigo-50 group hover:bg-indigo-600 transition duration-500">
                        <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-white/20 transition">🧠</div>
                        <div class="text-left">
                            <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest block group-hover:text-indigo-100 transition">Method 02</span>
                            <span class="font-black text-gray-900 group-hover:text-white transition">SMART Goals</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-purple-50 group hover:bg-purple-600 transition duration-500">
                        <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-white/20 transition">🧬</div>
                        <div class="text-left">
                            <span class="text-[10px] font-black text-purple-600 uppercase tracking-widest block group-hover:text-purple-100 transition">Method 03</span>
                            <span class="font-black text-gray-900 group-hover:text-white transition">Identity Shift</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- Moved quotes down --}}

    {{-- NEURAL PROMO: GOAL FORECASTING --}}
    <section class="py-32 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] opacity-10"></div>
        <div class="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16 text-left">
            <div class="lg:w-1/2">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-8 border border-indigo-500/20">
                    📈 {{ __('goal_ai_promo_badge') }}
                </div>
                <h2 class="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                    {{ __('goal_ai_promo_title') }}
                </h2>
                <p class="text-slate-400 text-xl font-medium leading-relaxed mb-12">
                    {{ __('goal_ai_promo_desc') }}
                </p>
                <a hx-boost="false" href="{{ route('features.neural-os') }}" class="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition transform hover:-translate-y-1">
                    {{ __('goal_ai_promo_btn') }} <span>→</span>
                </a>
            </div>
            <div class="lg:w-1/2 relative w-full">
                <div class="bg-slate-800 p-8 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                     <div class="flex items-end gap-1 h-32 mb-6">
                        @foreach([30, 45, 40, 60, 55, 80, 75, 95] as $h)
                            <div class="flex-1 bg-indigo-500/20 rounded-t-lg group-hover:bg-indigo-500/40 transition-all duration-1000 delay-{{ $loop->index * 100 }}" style="height: {{ $h }}%"></div>
                        @endforeach
                     </div>
                     <div class="p-4 bg-indigo-600/10 rounded-xl border border-indigo-500/20 text-center">
                        <p class="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Predicted Completion</p>
                        <p class="text-white font-bold">Oct 14, 2024</p>
                     </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center animate-in zoom-in-95 fade-in duration-1000">
            <div class="text-9xl text-indigo-50 mb-4 font-serif leading-none italic select-none">"</div>
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 leading-[1.4] mb-12 tracking-tight italic font-serif">
                {{ __('goal_quote_text') }}
            </h2>
            <div class="flex flex-col items-center">
                <div class="w-24 h-2 bg-indigo-600 mb-8 rounded-full shadow-lg shadow-indigo-200"></div>
                <p class="text-indigo-600 font-black tracking-[0.5em] uppercase text-xs">{{ __('goal_quote_author') }}</p>
            </div>
        </div>
    </section>

    {{-- SECTION 7: BOTTOM CTA --}}
    <section class="py-24 px-6 text-center">
        <div class="max-w-5xl mx-auto bg-indigo-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse duration-[5000ms]"></div>
            
            <div class="relative z-10">
                <h2 class="text-4xl md:text-5xl font-black mb-6">{{ __('goal_cta_title') }}</h2>
                <p class="text-indigo-200 text-lg mb-10 max-w-2xl mx-auto">
                    {{ __('goal_cta_desc') }}
                </p>
                <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-white text-indigo-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-50 hover:scale-105 transition transform shadow-xl">
                    {{ __('goal_cta_btn') }}
                </a>
                <p class="mt-6 text-sm text-indigo-300">{{ __('goal_cta_note') }}</p>
            </div>
        </div>
    </section>
@endsection
