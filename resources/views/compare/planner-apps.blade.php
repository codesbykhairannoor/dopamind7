@extends('layouts.marketing')

@section('title', __('plan_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('plan_meta_desc') }}">
    <meta property="og:title" content="{{ __('plan_meta_og_title') }}">
    <meta property="og:description" content="{{ __('plan_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/compare/planner-apps') }}">
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
    "name": "{{ __('plan_badge') }}",
    "item": "{{ url('/compare/planner-apps') }}"
  }]
},
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "OneForMind",
  "applicationCategory": "ProductivityApplication",
  "operatingSystem": "Web, Windows, macOS, Linux",
  "description": "{{ __('plan_meta_desc') }}",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Vision-Led Milestone Planning",
    "Context-First Task Management",
    "Daily Energy Flow Alignment",
    "Unified Integrated Life OS"
  ]
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{ __('plan_faq_q1') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('plan_faq_a1') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('plan_faq_q2') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('plan_faq_a2') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('plan_faq_q3') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('plan_faq_a3') }}"
      }
    }
  ]
}
]
</script>
@endsection

@section('content')


    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO (Tetap sama strukturnya, ganti tema Indigo) --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/40 relative border-b border-slate-100">
        {{-- Background Blobs --}}
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-200/40 to-purple-200/30 rounded-full blur-[100px] -z-10 animate-pulse duration-[8000ms]"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {{-- Left: Copywriting --}}
            <div class="lg:col-span-6 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    🎯 {{ __('plan_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-slate-900 tracking-tight">
                    {{ __('plan_hero_title_1') }}<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('plan_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-lg">
                    {!! __('plan_hero_desc') !!}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 text-center">
                        {{ __('plan_hero_cta') }} →
                    </a>
                    <p class="py-4 text-sm text-slate-400 font-bold self-center">{{ __('plan_hero_note') }}</p>
                </div>
            </div>

            {{-- Right: Visual Metaphor --}}
            <div class="lg:col-span-6 relative h-[500px] flex items-center justify-center animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 fill-mode-both">
                
                {{-- Element 1: The "To-Do List Cage" --}}
                <div class="absolute top-10 right-0 w-64 bg-slate-900 border-4 border-slate-800 rounded-xl p-6 transform rotate-12 opacity-80 shadow-2xl z-0 font-mono">
                    <div class="text-center text-rose-500 text-[10px] mb-2 animate-pulse">🔴 45 OVERDUE TASKS</div>
                    <div class="space-y-3">
                        <div class="flex items-center gap-2"><div class="w-3 h-3 border border-slate-700 rounded-sm"></div><div class="h-1.5 bg-slate-700 rounded w-full"></div></div>
                        <div class="flex items-center gap-2"><div class="w-3 h-3 border border-slate-700 rounded-sm"></div><div class="h-1.5 bg-slate-700 rounded w-[70%]"></div></div>
                        <div class="flex items-center gap-2"><div class="w-3 h-3 border border-slate-700 rounded-sm"></div><div class="h-1.5 bg-slate-700 rounded w-[90%]"></div></div>
                        <div class="flex items-center gap-2"><div class="w-3 h-3 border border-slate-700 rounded-sm"></div><div class="h-1.5 bg-slate-700 rounded w-[50%]"></div></div>
                    </div>
                </div>

                {{-- Element 2: The OFM Planner Card --}}
                <div class="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 w-80 z-20 transform hover:scale-105 transition duration-500" role="img" aria-label="OneForMind Planner UI: Featuring a 'Design Product Page' task linked to 'Launch Startup' goal, showing focus time and high energy alignment.">
                    <div class="flex justify-between items-center mb-6">
                        <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl">⚡</div>
                        <span class="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">{{ __('plan_mockup_status') }}</span>
                    </div>
                    <h3 class="font-black text-2xl text-slate-900 mb-2">{{ __('plan_mockup_title') }}</h3>
                    <p class="text-slate-400 text-sm mb-6">{{ __('plan_mockup_desc') }}</p>
                    
                    <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div class="relative w-16 h-16 shrink-0 flex items-center justify-center">
                             <div class="absolute inset-0 bg-indigo-500/10 rounded-full animate-pulse"></div>
                             <div class="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                             </div>
                        </div>
                        <div>
                            <p class="font-bold text-slate-900 text-sm">{{ __('plan_mockup_stat_1') }}</p>
                            <p class="text-xs text-indigo-600 font-bold">{{ __('plan_mockup_stat_2') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: NEW LAYOUT -> VERTICAL TIMELINE (THE TRAP) --}}
    {{-- ================================================================= --}}
    <section class="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-100">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('plan_cycle_title') }}</h2>
                <p class="text-xl text-slate-500">{{ __('plan_cycle_desc') }}</p>
            </div>

            {{-- Timeline Layout --}}
            <div class="relative border-l-4 border-indigo-100 ml-4 md:ml-12 space-y-12 pb-8">
                
                {{-- Step 1 --}}
                <div class="relative pl-8 md:pl-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div class="absolute -left-[30px] w-14 h-14 bg-white border-4 border-indigo-100 rounded-full flex items-center justify-center text-xl shadow-sm z-10">📝</div>
                    <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
                        <h3 class="text-2xl font-black mb-3 text-slate-900">{{ __('plan_cycle_1_title') }}</h3>
                        <p class="text-slate-500 leading-relaxed">{{ __('plan_cycle_1_desc') }}</p>
                    </div>
                </div>

                {{-- Step 2 --}}
                <div class="relative pl-8 md:pl-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    <div class="absolute -left-[30px] w-14 h-14 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-xl shadow-sm z-10">😫</div>
                    <div class="bg-indigo-600 p-8 rounded-3xl shadow-xl text-white transform md:scale-[1.02] relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <h3 class="text-2xl font-black mb-3">{{ __('plan_cycle_2_title') }}</h3>
                        <p class="text-indigo-100 leading-relaxed">{{ __('plan_cycle_2_desc') }}</p>
                    </div>
                </div>

                {{-- Step 3 --}}
                <div class="relative pl-8 md:pl-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    <div class="absolute -left-[30px] w-14 h-14 bg-white border-4 border-rose-100 rounded-full flex items-center justify-center text-xl shadow-sm z-10">🔄</div>
                    <div class="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition">
                        <h3 class="text-2xl font-black mb-3 text-slate-900">{{ __('plan_cycle_3_title') }}</h3>
                        <p class="text-slate-500 leading-relaxed">{{ __('plan_cycle_3_desc') }}</p>
                    </div>
                </div>
                
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: NEW LAYOUT -> BENTO GRID (THE PROBLEM) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-indigo-100 mx-auto">🏁</div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight">
                    {{ __('plan_prob_title_1') }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600">{{ __('plan_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed">
                    {{ __('plan_prob_desc') }}
                </p>
            </div>

            {{-- Bento Box Layout --}}
            <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div class="md:col-span-2 bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden group">
                    <div class="absolute right-0 bottom-0 opacity-10 text-[150px] group-hover:scale-110 transition-transform duration-700">⏳</div>
                    <span class="w-10 h-10 rounded-full bg-white text-rose-500 flex items-center justify-center text-lg mb-6 shadow-sm">✕</span>
                    <h3 class="text-2xl font-black text-slate-900 mb-2">{{ __('plan_prob_point_1') }}</h3>
                    <p class="text-slate-500">Traditional planners force you to manually rewrite what you didn't finish.</p>
                </div>
                <div class="bg-rose-50 border border-rose-100 p-10 rounded-[2.5rem] flex flex-col justify-center">
                    <span class="w-10 h-10 rounded-full bg-white text-rose-500 flex items-center justify-center text-lg mb-6 shadow-sm">✕</span>
                    <h3 class="text-xl font-black text-slate-900 mb-2">{{ __('plan_prob_point_2') }}</h3>
                </div>
                <div class="bg-indigo-50 border border-indigo-100 p-10 rounded-[2.5rem] flex flex-col justify-center">
                    <span class="w-10 h-10 rounded-full bg-white text-rose-500 flex items-center justify-center text-lg mb-6 shadow-sm">✕</span>
                    <h3 class="text-xl font-black text-slate-900 mb-2">{{ __('plan_prob_point_3') }}</h3>
                </div>
                <div class="md:col-span-2 bg-slate-900 text-white border border-slate-800 p-10 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                    <h3 class="text-2xl font-black mb-4">The core issue: Separation.</h3>
                    <p class="text-slate-400">Your tasks are disconnected from your habits, goals, and actual mental capacity. It's just a dumb list.</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: NEW LAYOUT -> WIDE FEATURE CARD (THE SOLUTION) --}}
    {{-- ================================================================= --}}
    <section class="py-32 border-y border-slate-100 overflow-hidden bg-slate-50">
        <div class="max-w-6xl mx-auto px-6">
            
            <div class="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-slate-100 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] -z-10"></div>
                
                <div class="grid lg:grid-cols-2 gap-16 items-center z-10 relative">
                    <div>
                        <div class="inline-block p-4 bg-indigo-100 text-indigo-700 rounded-2xl mb-6 shadow-inner">
                            🧠
                        </div>
                        <h2 class="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight">
                            {{ __('plan_sol_title_1') }} <span class="text-indigo-600">{{ __('plan_sol_title_highlight') }}</span>.
                        </h2>
                        <p class="text-slate-500 text-lg mb-8 leading-relaxed">
                            {{ __('plan_sol_desc') }}
                        </p>
                        <p class="text-slate-700 font-medium mb-8">
                            {!! __('plan_sol_box_desc') !!}
                        </p>
                    </div>

                    <div class="space-y-6">
                        <div class="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-start gap-5 hover:bg-indigo-50/50 transition">
                            <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0">🌱</div>
                            <div>
                                <h4 class="font-bold text-slate-900 text-lg mb-1">Growth Focused</h4>
                                <p class="text-sm text-slate-500">Every task moves your needle.</p>
                            </div>
                        </div>
                        <div class="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-start gap-5 hover:bg-indigo-50/50 transition">
                            <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0">🧘</div>
                            <div>
                                <h4 class="font-bold text-slate-900 text-lg mb-1">Zero Guilt</h4>
                                <p class="text-sm text-slate-500">Intelligent rescheduling that respects your capacity.</p>
                            </div>
                        </div>
                        <div class="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-start gap-5 hover:bg-indigo-50/50 transition">
                            <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0">🔗</div>
                            <div>
                                <h4 class="font-bold text-slate-900 text-lg mb-1">Habit-Linked</h4>
                                <p class="text-sm text-slate-500">Tasks are born from your established routines.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 5: NEW LAYOUT -> US VS THEM CARDS --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6">{{ __('plan_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('plan_compare_desc') }}</p>
            </div>

            {{-- Us vs Them Layout --}}
            <div class="grid md:grid-cols-2 gap-8 items-start">
                
                {{-- Them (Traditional Apps) --}}
                <div class="p-8 rounded-3xl border border-slate-100 bg-slate-50 opacity-70">
                    <h3 class="font-bold text-slate-400 uppercase tracking-widest mb-6">{{ __('plan_table_head_2') }}</h3>
                    <ul class="space-y-6">
                        <li class="flex items-center justify-between text-slate-500">
                            <span>{{ __('plan_table_row_1_title') }}</span>
                            <span class="text-sm font-mono bg-slate-200 px-2 py-1 rounded">{{ __('plan_table_row_1_col_1') }}</span>
                        </li>
                        <li class="flex items-center justify-between text-slate-500">
                            <span>{{ __('plan_table_row_2_title') }}</span>
                            <span class="text-sm font-mono bg-slate-200 px-2 py-1 rounded">{{ __('plan_table_row_2_col_1') }}</span>
                        </li>
                        <li class="flex items-center justify-between text-slate-500">
                            <span>{{ __('plan_table_row_3_title') }}</span>
                            <span class="text-sm font-mono bg-slate-200 px-2 py-1 rounded">{{ __('plan_table_row_3_col_1') }}</span>
                        </li>
                        <li class="flex items-center justify-between text-slate-500">
                            <span>{{ __('plan_table_row_4_title') }}</span>
                            <span class="text-sm font-mono bg-slate-200 px-2 py-1 rounded">{{ __('plan_table_row_4_col_1') }}</span>
                        </li>
                    </ul>
                </div>

                {{-- Right: OFM (Highlighted) --}}
                <div class="p-8 rounded-3xl border-2 border-indigo-100 bg-white shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">WINNER</div>
                    <h3 class="font-black text-indigo-900 uppercase tracking-widest mb-6">OneForMind</h3>
                    <ul class="space-y-6">
                         <li class="flex items-center justify-between">
                            <span class="font-bold text-slate-900">{{ __('plan_table_row_1_title') }}</span>
                            <span class="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{{ __('plan_table_row_1_col_2') }}</span>
                        </li>
                        <li class="flex items-center justify-between">
                            <span class="font-bold text-slate-900">{{ __('plan_table_row_2_title') }}</span>
                            <span class="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{{ __('plan_table_row_2_col_2') }}</span>
                        </li>
                        <li class="flex items-center justify-between">
                            <span class="font-bold text-slate-900">{{ __('plan_table_row_3_title') }}</span>
                            <span class="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{{ __('plan_table_row_3_col_2') }}</span>
                        </li>
                         {{-- Extra Winner Row --}}
                         <li class="flex items-center justify-between pt-4 border-t border-slate-100">
                            <span class="font-bold text-slate-900">{{ __('plan_table_row_4_title') }}</span>
                            <span class="text-sm font-black text-white bg-indigo-600 px-3 py-1 rounded-lg shadow-lg shadow-indigo-200">{{ __('plan_table_row_4_col_2') }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: SCIENTIFIC PILLAR (E-E-A-T) --}}
    <section class="py-24 bg-slate-50 border-y border-slate-100">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                🧬 {{ __('plan_science_badge') }}
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-6">{{ __('plan_science_title') }}</h2>
            <p class="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto italic">
                {{ __('plan_science_desc') }}
            </p>
            <div class="mt-10 flex flex-wrap justify-center gap-8 opacity-50 grayscale">
                <span class="text-sm font-black uppercase tracking-tighter">Zeigarnik Effect Mastery</span>
                <span class="text-sm font-black uppercase tracking-tighter">Cognitive Off-loading</span>
                <span class="text-sm font-black uppercase tracking-tighter">Flow State Alignment</span>
            </div>
        </div>
    </section>

    {{-- SECTION: HOW IT WORKS (EXTRA CONTEXT) --}}
    <section class="py-24 bg-white">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-3xl font-black text-gray-900 mb-8">{{ __('plan_how_it_works_title') }}</h2>
            <div class="prose prose-lg text-gray-600 leading-relaxed">
                <p>{{ __('plan_how_it_works_desc') }}</p>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 6: CTA (Slightly adjusted background pattern) --}}
    {{-- ================================================================= --}}
    <section class="pt-32 pb-40 px-6 bg-slate-950 relative overflow-hidden">
        {{-- Wavy / Radial Background --}}
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 -z-10"></div>
        <div class="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-indigo-600/20 to-transparent -z-10"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl text-4xl mb-10 border border-white/10 shadow-2xl">🚀</div>
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight leading-tight">
                {!! __('plan_cta_title') !!}
            </h2>
            <p class="text-indigo-200 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
                {{ __('plan_cta_desc') }}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-indigo-500 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-400 transition transform hover:-translate-y-2 shadow-[0_20px_40px_rgba(79,70,229,0.3)]">
                    {{ __('plan_cta_btn') }}
                </a>
                <a href="{{ route('features.planner') }}" class="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-white/10 transition">
                    Explore Planner OS
                </a>
            </div>
            <p class="mt-8 text-xs text-indigo-400 font-bold uppercase tracking-[0.3em]">{{ __('plan_cta_sub') }}</p>
        </div>
    </section>

    {{-- SECTION: INTERNAL LINKING (UNIFIED ECOSYSTEM) --}}
    <section class="py-24 bg-white border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-3xl font-black text-gray-900 mb-12 text-center">{{ __('unified_ecosystem_title', ['feature' => __('plan_badge')]) }}</h2>
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
                <a href="{{ url('/features/calendar') }}" class="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition duration-500">
                    <span class="text-2xl mb-4 block group-hover:scale-110 transition">📅</span>
                    <h4 class="font-bold text-gray-900">{{ __('calendar_hero_badge') }}</h4>
                    <p class="text-xs text-gray-500 mt-2">{{ __('calendar_meta_title') }}</p>
                </a>
            </div>
        </div>
    </section>

@endsection