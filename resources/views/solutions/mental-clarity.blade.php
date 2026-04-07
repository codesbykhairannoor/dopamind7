@extends('layouts.marketing')

@section('title', __('solve_mental_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('solve_mental_meta_desc') }}">
    <meta property="og:title" content="{{ __('solve_mental_meta_og_title') }}">
    <meta property="og:description" content="{{ __('solve_mental_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/mental-clarity') }}">

@endsection

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{ __('schema_solution_mental_clarity_name') }}",
  "description": "{{ __('schema_solution_mental_clarity_description') }}"
},{
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
    "name": "{{ app()->getLocale() === 'id' ? 'Solusi' : 'Solutions' }}",
    "item": "{{ url('/') }}#solutions"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "{{ __('mental_breadcrumb') }}",
    "item": "{{ url('/solutions/mental-clarity') }}"
  }]
}]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (Dipertahankan sesuai template lo) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 relative border-b border-gray-100">
        <div class="mt-20 absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] [background-size:40px_40px] -z-10"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            <div class="lg:col-span-7 animate-in fade-in slide-in-from-left-12 duration-700 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950 text-indigo-100 font-bold text-xs mb-8 uppercase tracking-wider shadow-lg">
                    🧘 {{ __('solve_mental_hero_badge') }}
                </div>
                
                <h1 class="text-[36px] leading-[1.1] md:text-6xl xl:text-7xl mb-6 leading-[1.05] text-gray-900 tracking-tight font-black">
                    {{ __('solve_mental_hero_title_1') }}
                    <span class="block py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {{ __('solve_mental_hero_title_2') }}
                    </span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-2xl">
                    {{ __('solve_mental_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
                        {{ __('solve_mental_hero_cta') }}
                    </a>
                </div>
            </div>

            <div class="lg:col-span-5 relative z-10 w-full animate-in fade-in slide-in-from-right-12 duration-1000">
                <div class="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-400 to-rose-400 rounded-[2.5rem] blur opacity-20 animate-pulse duration-[4000ms]"></div>
                <div class="relative bg-white rounded-[2.5rem] shadow-2xl border border-white flex flex-col h-[500px] overflow-hidden transform transition hover:scale-[1.01] duration-500 p-8">
                    <div class="flex-grow flex flex-col justify-center">
                        <div class="text-center mb-8">
                            <h4 class="font-serif italic text-2xl text-gray-800 mb-2">"{{ __('mental_mockup_quote') }}"</h4>
                            <p class="text-xs uppercase tracking-widest text-gray-400">{{ __('mental_mockup_source') }}</p>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                                <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl">🧘</div>
                                <div>
                                    <p class="text-xs font-bold text-indigo-950">{{ __('mental_mockup_task_1_title') }}</p>
                                    <p class="text-[10px] text-indigo-600">{{ __('mental_mockup_task_1_sub') }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                                <div class="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-xl">📔</div>
                                <div>
                                    <p class="text-xs font-bold text-purple-950">{{ __('mental_mockup_task_2_title') }}</p>
                                    <p class="text-[10px] text-purple-600">{{ __('mental_mockup_task_2_sub') }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-xl">✨</div>
                                <div>
                                    <p class="text-xs font-bold text-emerald-950">{{ __('mental_mockup_task_3_title') }}</p>
                                    <p class="text-[10px] text-emerald-600">{{ __('mental_mockup_task_3_sub') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (THE BRAIN FOG) --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-4xl md:text-5xl mb-6 text-gray-900 font-black">{{ __('solve_mental_prob_title') }}</h2>
            <p class="text-xl text-gray-500 mb-16 leading-relaxed">
                {{ __('solve_mental_prob_desc') }}
            </p>

            <div class="grid md:grid-cols-2 gap-6 text-left">
                <div class="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                    <div class="text-3xl mb-4 font-black">🌪️</div>
                    <h3 class="text-lg font-bold mb-2 text-gray-900">{{ __('solve_mental_prob_1_title') }}</h3>
                    <p class="text-gray-500 text-sm">{{ __('solve_mental_prob_1_desc') }}</p>
                </div>
                <div class="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                    <div class="text-3xl mb-4 font-black">📱</div>
                    <h3 class="text-lg font-bold mb-2 text-gray-900">{{ __('solve_mental_prob_2_title') }}</h3>
                    <p class="text-gray-500 text-sm">{{ __('solve_mental_prob_2_desc') }}</p>
                </div>
            </div>
        </div>
    </section>


   {{-- SECTION 3: THE SOLUTION --}}
<section class="py-16 md:py-32 bg-slate-900 text-white relative overflow-hidden">
    {{-- Gradient Background --}}
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900"></div>
    
    <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {{-- Text Content --}}
            <div class="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
                <h2 class="text-3xl md:text-5xl mb-6 leading-tight font-black">
                    {{ __('solve_mental_sol_title') }}
                </h2>
                <p class="text-indigo-200 text-base md:text-lg leading-relaxed mb-8">
                    {{ __('solve_mental_sol_desc') }}
                </p>
                
                <ul class="space-y-4 md:space-y-6">
                    <li class="flex items-start gap-4">
                        <span class="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 text-sm font-bold">1</span>
                        <div>
                            <h4 class="font-bold text-white text-base">{{ __('solve_mental_sol_step_1_title') }}</h4>
                            <p class="text-xs md:text-sm text-slate-400 mt-1">{{ __('solve_mental_sol_step_1_desc') }}</p>
                        </div>
                    </li>
                    <li class="flex items-start gap-4">
                        <span class="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20 text-sm font-bold">2</span>
                        <div>
                            <h4 class="font-bold text-white text-base">{{ __('solve_mental_sol_step_2_title') }}</h4>
                            <p class="text-xs md:text-sm text-slate-400 mt-1">{{ __('solve_mental_sol_step_2_desc') }}</p>
                        </div>
                    </li>
                    <li class="flex items-start gap-4">
                        <span class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 text-sm font-bold">3</span>
                        <div>
                            <h4 class="font-bold text-white text-base">{{ __('solve_mental_sol_step_3_title') }}</h4>
                            <p class="text-xs md:text-sm text-slate-400 mt-1">{{ __('solve_mental_sol_step_3_desc') }}</p>
                        </div>
                    </li>
                </ul>
            </div>

            {{-- Visual Content (Glassmorphism Cards) --}}
            <div class="lg:col-span-7 relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2 scale-90 md:scale-100">
                {{-- Back Card --}}
                <div class="absolute w-64 h-80 md:w-80 md:h-96 bg-white/5 backdrop-blur-sm rounded-[2.5rem] md:rounded-[3rem] border border-white/10 transform -rotate-6 translate-x-8 md:translate-x-12 translate-y-6 p-8 flex flex-col justify-end">
                    <div class="w-full h-2 bg-white/10 rounded-full mb-3"></div>
                    <div class="w-2/3 h-2 bg-white/10 rounded-full"></div>
                </div>
                
                {{-- Front Card (Journal Entry) --}}
                <div class="absolute w-72 md:w-96 h-auto bg-white/10 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3rem] border border-white/20 shadow-2xl p-6 md:p-8 transform rotate-3 hover:rotate-0 transition duration-500 z-10">
                    <div class="flex justify-between items-start mb-6 md:mb-8">
                        <div class="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl">🖋️</div>
                        <span class="px-3 py-1 bg-white/10 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-indigo-200 border border-white/10">{{ __('mental_mockup_journal_badge') }}</span>
                    </div>
                    <p class="font-serif text-lg md:text-xl italic text-white/90 leading-relaxed mb-6">
                        "{{ __('mental_mockup_journal_text') }}"
                    </p>
                    <div class="flex gap-2">
                        <span class="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] md:text-xs font-bold">{{ __('mental_mockup_journal_status') }}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

    {{-- SECTION 4: THE TOOLKIT (BENTO GRID) --}}
    <section class="py-32 bg-indigo-50/50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-5xl mb-6 text-gray-900 font-black">{{ __('solve_mental_feat_title') }}</h2>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8">
                <div class="p-12 bg-white rounded-[3rem] border border-indigo-100 shadow-sm group hover:-translate-y-2 transition duration-300">
                    <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 font-black">📝</div>
                    <h3 class="text-2xl font-bold mb-4 text-gray-900">{{ __('solve_mental_feat_1_title') }}</h3>
                    <p class="text-gray-500 leading-relaxed text-lg">{{ __('solve_mental_feat_1_desc') }}</p>
                </div>
                <div class="p-12 bg-indigo-950 rounded-[3rem] text-white shadow-xl group hover:-translate-y-2 transition duration-300">
                    <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 font-black">📉</div>
                    <h3 class="text-2xl font-bold mb-4 text-indigo-300">{{ __('solve_mental_feat_2_title') }}</h3>
                    <p class="text-indigo-100/70 leading-relaxed text-lg">{{ __('solve_mental_feat_2_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: COGNITIVE LOAD (UNIQUE A) --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="relative order-2 md:order-1">
                <div class="bg-indigo-50 rounded-[3rem] p-10 border border-indigo-100 shadow-xl overflow-hidden relative">
                    <div class="flex justify-between items-end h-32 gap-4">
                        <div class="flex-1 bg-indigo-200 rounded-t-xl h-24"></div>
                        <div class="flex-1 bg-indigo-400 rounded-t-xl h-32"></div>
                        <div class="flex-1 bg-indigo-600 rounded-t-xl h-16 relative">
                            <div class="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl">⚡</div>
                        </div>
                        <div class="flex-1 bg-indigo-300 rounded-t-xl h-28"></div>
                    </div>
                    <div class="mt-6 text-center text-[10px] text-indigo-400 uppercase tracking-widest">{{ __('mental_extra_1_label') }}</div>
                </div>
            </div>
            <div class="order-1 md:order-2">
                <h2 class="text-4xl text-gray-900 mb-6 font-black">{{ __('solve_mental_extra_1_title') }}</h2>
                <p class="text-xl text-gray-500 leading-relaxed">
                    {{ __('solve_mental_extra_1_desc') }}
                </p>
            </div>
        </div>
    </section>

    {{-- SECTION: JOURNALING LOOPS (UNIQUE B) --}}
    <section class="py-32 bg-slate-900 text-white relative">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-4xl mb-8 font-black">{{ __('solve_mental_extra_2_title') }}</h2>
            <p class="text-xl text-indigo-200 leading-relaxed mb-12 italic">
                {{ __('solve_mental_extra_2_desc') }}
            </p>
            <div class="flex justify-center flex-wrap gap-4">
                <div class="px-6 py-3 bg-white/10 rounded-full border border-white/20">{{ __('mental_extra_2_item_1') }}</div>
                <div class="px-6 py-3 bg-white/10 rounded-full border border-white/20">{{ __('mental_extra_2_item_2') }}</div>
                <div class="px-6 py-3 bg-indigo-600 rounded-full border border-indigo-500 font-bold shadow-xl shadow-indigo-500/20">{{ __('mental_extra_2_item_3') }}</div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION: SCIENTIFIC PILLAR (E-E-A-T) - MIND MAP REFLECTION STYLE --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        {{-- Organic Mind Map Lines --}}
        <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            <svg class="w-full h-full" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M400 400C450 300 550 250 650 300" stroke="currentColor" stroke-width="2" stroke-dasharray="8 8" />
                <path d="M400 400C350 300 250 250 150 300" stroke="currentColor" stroke-width="2" stroke-dasharray="8 8" />
                <path d="M400 400C450 500 550 550 650 500" stroke="currentColor" stroke-width="2" stroke-dasharray="8 8" />
                <path d="M400 400C350 500 250 550 150 500" stroke="currentColor" stroke-width="2" stroke-dasharray="8 8" />
            </svg>
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="text-center mb-20">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] uppercase tracking-widest mb-6 rounded-full">
                    🧬 {{ __('solve_mental_science_badge') }}
                </div>
                <h2 class="text-4xl md:text-6xl text-gray-900 mb-8 max-w-4xl mx-auto leading-tight font-black">
                    {{ __('solve_mental_science_title') }}
                </h2>
                <div class="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            </div>

            <div class="grid lg:grid-cols-3 gap-12 items-center">
                {{-- Left: Nodes --}}
                <div class="space-y-8">
                    <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-right transform hover:-translate-x-2 transition">
                        <span class="block text-[10px] text-indigo-400 uppercase tracking-widest mb-1">Process_01</span>
                        <h4 class="font-bold text-gray-900">{{ __('mental_science_process_1_title') }}</h4>
                    </div>
                    <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-right transform hover:-translate-x-2 transition">
                        <span class="block text-[10px] text-purple-400 uppercase tracking-widest mb-1">Process_02</span>
                        <h4 class="font-bold text-gray-900">{{ __('mental_science_process_2_title') }}</h4>
                    </div>
                </div>

                {{-- Center: The Core Thought --}}
                <div class="relative py-16 px-12 bg-indigo-600 rounded-[4rem] text-white shadow-[0_40px_80px_rgba(79,70,229,0.2)] text-center scale-110 z-20 overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-tr from-indigo-700 to-indigo-500 opacity-0 group-hover:opacity-100 transition duration-700"></div>
                    <p class="relative z-10 text-2xl font-serif italic leading-relaxed">
                        "{{ __('solve_mental_science_desc') }}"
                    </p>
                    {{-- Pulsing Glow --}}
                    <div class="absolute -inset-2 bg-white/10 rounded-[4.5rem] animate-pulse"></div>
                </div>

                {{-- Right: Nodes --}}
                <div class="space-y-8">
                    <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 transform hover:translate-x-2 transition">
                        <span class="block text-[10px] text-emerald-400 uppercase tracking-widest mb-1">Process_03</span>
                        <h4 class="font-bold text-gray-900">{{ __('mental_science_process_3_title') }}</h4>
                    </div>
                    <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 transform hover:translate-x-2 transition">
                        <span class="block text-[10px] text-amber-400 uppercase tracking-widest mb-1">Process_04</span>
                        <h4 class="font-bold text-gray-900">{{ __('mental_science_process_4_title') }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 bg-gray-50 border-y border-gray-100">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-4xl text-center text-gray-900 mb-16 font-black">{{ __('solve_mental_faq_title') }}</h2>
            <div class="space-y-6">
                @foreach([1, 2, 3] as $i)
                <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __("solve_mental_faq_q$i") }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __("solve_mental_faq_a$i") }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SECTION 5: CTA --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-purple-100 to-transparent rounded-full blur-3xl opacity-50 -z-10"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10 px-6">
            <div class="text-6xl mb-8 animate-pulse duration-3000 font-black">🕊️</div>
            <h2 class="text-[42px] leading-[1.1] md:text-7xl mb-8 text-gray-900 tracking-tight font-black">{{ __('solve_mental_cta_title') }}</h2>
            <p class="text-gray-500 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
                {{ __('solve_mental_cta_desc') }}
            </p>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-950 text-white px-12 py-5 rounded-full text-xl hover:bg-indigo-800 transition-colors duration-300 shadow-2xl">
                {{ __('solve_mental_cta_btn') }}
            </a>
        </div>
    </section>
@endsection


