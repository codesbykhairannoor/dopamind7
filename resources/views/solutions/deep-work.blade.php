@extends('layouts.marketing')

@section('title', __('deepwork_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('deepwork_meta_desc') }}">
    <meta property="og:title" content="{{ __('deepwork_meta_og_title') }}">
    <meta property="og:description" content="{{ __('deepwork_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/deep-work') }}">

@endsection

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{ __('schema_solution_deepwork_name') }}",
  "description": "{{ __('schema_solution_deepwork_description') }}"
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
    "name": "Deep Work",
    "item": "{{ url('/solutions/deep-work') }}"
  }]
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{ __('deepwork_faq_q1') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('deepwork_faq_a1') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('deepwork_faq_q2') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('deepwork_faq_a2') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('deepwork_faq_q3') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('deepwork_faq_a3') }}"
      }
    }
  ]
}
]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (CENTERED LIGHT MODE - INDIGO VIBE) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white relative border-b border-gray-100">
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] -z-10"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-400/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {{-- Icon / Gambar --}}
            <div class="flex justify-center mb-8">
                <div class="w-24 h-24 bg-white border border-indigo-100 rounded-3xl shadow-xl shadow-indigo-100 flex items-center justify-center text-4xl transform -rotate-3 hover:rotate-0 transition duration-300">
                    ⚡
                </div>
            </div>

            {{-- Teks --}}
            <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-6 uppercase tracking-widest border border-indigo-100 shadow-sm">
                {{ __('deepwork_hero_badge') }}
            </div>
            
            <h1 class="text-6xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-gray-900">
                {{ __('deepwork_hero_title_1') }}<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {{ __('deepwork_hero_title_2') }}
                </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
                {{ __('deepwork_hero_desc') }}
            </p>
            
            {{-- CTA --}}
            <div class="flex justify-center gap-4 mb-24">
                <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.4)] transition transform hover:-translate-y-1">
                    {{ __('deepwork_hero_cta') }}
                </a>
            </div>

            {{-- Visual Bawah (Focus Dashboard) --}}
            <div class="relative w-full max-w-4xl mx-auto rounded-[2.5rem] bg-white p-3 shadow-2xl border border-gray-100 transform perspective-1000 rotate-x-6 hover:rotate-x-0 transition-transform duration-700" role="img" aria-label="Daily Focus Timeline Preview: Showing active Pomodoro sessions, time-blocked deep work intervals, and a distraction-free environment for peak cognitive performance.">
                <div class="absolute inset-0 bg-indigo-500 rounded-[2.5rem] blur-2xl opacity-10 -z-10"></div>
                
                <div class="bg-slate-950 rounded-[2rem] p-8 md:p-12 border border-slate-800 overflow-hidden relative flex flex-col md:flex-row gap-10 items-center">
                    
                    <div class="flex-1 w-full space-y-6 z-10">
                        <div class="flex justify-between items-center border-b border-gray-200 pb-4">
                            <h4 class="text-gray-500 font-bold uppercase tracking-widest text-xs">{{ __('deepwork_mockup_title') }}</h4>
                            <span class="w-3 h-3 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]"></span>
                        </div>
                        <div class="space-y-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 text-xs text-gray-400 font-mono">09:00</div>
                                <div class="flex-1 bg-white rounded-xl p-4 border border-gray-200 opacity-60 flex items-center gap-3">
                                    <div class="w-4 h-4 rounded border-2 border-gray-300"></div>
                                    <span class="text-gray-400 line-through text-sm">{{ __('deepwork_mockup_task_1') }}</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="w-12 text-xs text-indigo-600 font-mono font-bold">10:00</div>
                                <div class="flex-1 bg-indigo-50/80 rounded-xl p-4 border border-indigo-200 flex items-center justify-between shadow-sm transform scale-[1.02]">
                                    <div class="flex items-center gap-3">
                                        <div class="w-4 h-4 rounded bg-indigo-600 animate-pulse"></div>
                                            <span class="text-indigo-950 font-bold text-sm">{{ __('deepwork_mockup_task_2') }}</span>
                                    </div>
                                    <span class="font-mono text-indigo-600 text-sm font-bold">25:00</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="w-12 text-xs text-gray-400 font-mono">12:00</div>
                                <div class="flex-1 bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-3 border-dashed">
                                    <div class="w-4 h-4 rounded border-2 border-gray-300 border-dashed"></div>
                                    <span class="text-gray-500 text-sm">{{ __('deepwork_mockup_task_3') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-1/3 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0 md:pl-8">
                        <div class="text-6xl font-black text-gray-900 tracking-tighter tabular-nums font-mono drop-shadow-sm">
                            24<span class="text-indigo-500 animate-pulse">:</span>59
                        </div>
                        <p class="text-gray-400 text-xs mt-3 font-bold uppercase tracking-widest">{{ __('deepwork_mockup_desc') }}</p>
                    </div>

                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-32 bg-white relative">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900">{{ __('deepwork_prob_title') }}</h2>
                <p class="text-xl text-gray-500 max-w-3xl mx-auto">{{ __('deepwork_prob_desc') }}</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-3xl mb-6">📱</div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3">{{ __('deepwork_prob_1_title') }}</h4>
                    <p class="text-gray-500 leading-relaxed">{{ __('deepwork_prob_1_desc') }}</p>
                </div>
                <div class="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-3xl mb-6">🤹</div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3">{{ __('deepwork_prob_2_title') }}</h4>
                    <p class="text-gray-500 leading-relaxed">{{ __('deepwork_prob_2_desc') }}</p>
                </div>
                <div class="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-3xl mb-6">🕰️</div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3">{{ __('deepwork_prob_3_title') }}</h4>
                    <p class="text-gray-500 leading-relaxed">{{ __('deepwork_prob_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SYSTEM (THE ARCHITECTURE OF FOCUS) --}}
    <section class="py-32 bg-indigo-50/50 border-y border-indigo-100">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1">
                <div class="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-2xl text-2xl mb-6 shadow-lg shadow-indigo-200">🏛️</div>
                <h2 class="text-4xl md:text-5xl font-black mb-8 text-gray-900 leading-tight">{{ __('deepwork_sol_title') }}</h2>
                <div class="space-y-8">
                    <div class="flex gap-4 items-start">
                        <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0 mt-1">1</div>
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('deepwork_sol_1_title') }}</h4>
                            <p class="text-gray-600 leading-relaxed">{{ __('deepwork_sol_1_desc') }}</p>
                        </div>
                    </div>
                    <div class="flex gap-4 items-start">
                        <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0 mt-1">2</div>
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('deepwork_sol_2_title') }}</h4>
                            <p class="text-gray-600 leading-relaxed">{{ __('deepwork_sol_2_desc') }}</p>
                        </div>
                    </div>
                    <div class="flex gap-4 items-start">
                        <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0 mt-1">3</div>
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('deepwork_sol_3_title') }}</h4>
                            <p class="text-gray-600 leading-relaxed">{{ __('deepwork_sol_3_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {{-- Visual Concept (Dark contrast box inside light section) --}}
            <div class="order-1 md:order-2 bg-slate-900 p-12 rounded-[3rem] text-center border border-slate-800 shadow-2xl relative overflow-hidden group">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition duration-700"></div>
                
                <div class="relative z-10">
                    <div class="text-9xl mb-8 transform group-hover:scale-110 transition duration-500">🔒</div>
                    <h3 class="text-4xl font-black text-white tracking-tight mb-2">{{ __('deepwork_science_viz_lock') }}</h3>
                    <p class="text-indigo-300 text-lg font-medium">{{ __('deepwork_science_viz_sub') }}</p>
                </div>
            </div>
        </div>
    </section>


    {{-- SECTION 4: THE FOCUS ARSENAL --}}
    <section class="py-32 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('deepwork_feat_title') }}</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="flex gap-6 items-start p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100">
                    <div class="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">🍅</div>
                    <div>
                        <h4 class="text-xl font-bold text-indigo-950 mb-2">{{ __('deepwork_feat_1_title') }}</h4>
                        <p class="text-indigo-800/70">{{ __('deepwork_feat_1_desc') }}</p>
                    </div>
                </div>
                <div class="flex gap-6 items-start p-8 rounded-[2rem] bg-gray-50 border border-gray-200">
                    <div class="w-14 h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">📥</div>
                    <div>
                        <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('deepwork_feat_2_title') }}</h4>
                        <p class="text-gray-500">{{ __('deepwork_feat_2_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: FLOW STATE METRICS (UNIQUE A) --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="relative order-2 md:order-1">
                <div class="bg-indigo-600 rounded-[2.5rem] p-8 md:p-12 shadow-2xl transform -rotate-2 hover:rotate-0 transition duration-500">
                    <div class="flex items-end gap-2 mb-8 border-b border-indigo-500/30 pb-6">
                        <div class="text-5xl font-black text-white">4.5</div>
                        <div class="text-indigo-200 font-bold mb-1">{{ __('deepwork_extra_1_sub') }}</div>
                    </div>
                    <div class="grid grid-cols-7 gap-2">
                        @foreach(range(1, 28) as $i)
                            <div class="h-8 rounded-md {{ $i % 4 === 0 ? 'bg-indigo-400' : 'bg-indigo-300/30' }}"></div>
                        @endforeach
                    </div>
                    <p class="mt-6 text-indigo-100 text-sm font-medium">{{ __('deepwork_extra_1_label') }}</p>
                </div>
            </div>
            <div class="order-1 md:order-2">
                <h2 class="text-4xl font-black text-gray-900 mb-6">{{ __('deepwork_extra_1_title') }}</h2>
                <p class="text-xl text-gray-500 leading-relaxed">
                    {{ __('deepwork_extra_1_desc') }}
                </p>
            </div>
        </div>
    </section>

    {{-- SECTION: ENVIRONMENTAL DESIGN (UNIQUE B) --}}
    <section class="py-32 bg-white">
        <div class="max-w-5xl mx-auto px-6">
            <div class="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
                <div class="absolute top-0 right-0 p-12 opacity-10 text-9xl">🌿</div>
                <div class="relative z-10 max-w-2xl">
                    <h2 class="text-4xl font-black mb-6">{{ __('deepwork_extra_2_title') }}</h2>
                    <p class="text-xl text-slate-400 leading-relaxed mb-8">
                        {{ __('deepwork_extra_2_desc') }}
                    </p>
                    <ul class="space-y-4 text-indigo-300 font-medium">
                        <li class="flex items-center gap-3">
                            <span class="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">✓</span>
                            {{ __('deepwork_extra_2_item_1') }}
                        </li>
                        <li class="flex items-center gap-3">
                            <span class="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">✓</span>
                            {{ __('deepwork_extra_2_item_2') }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION: SCIENTIFIC PILLAR (E-E-A-T) - FLOW STATE ISOLATION STYLE --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        {{-- Ripple Effect --}}
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50 rounded-full border border-indigo-100/50 animate-pulse-slow"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full border border-indigo-100/30"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="flex flex-col lg:flex-row gap-16 items-center">
                <div class="flex-1 text-center lg:text-left">
                    <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8 rounded-full">
                        🧬 {{ __('deepwork_science_badge') }}
                    </div>
                    
                    <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                        {{ __('deepwork_science_title') }}
                    </h2>
                    
                    <div class="relative py-10 px-10 bg-indigo-50/80 backdrop-blur-sm border-l-8 border-indigo-600 rounded-r-[2rem] mb-12 shadow-sm">
                        <p class="text-gray-900 text-xl md:text-2xl font-semibold leading-relaxed italic">
                            "{{ __('deepwork_science_desc') }}"
                        </p>
                    </div>

                    <div class="flex flex-wrap justify-center lg:justify-start gap-4">
                        <div class="group px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition">
                            <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">{{ __('deepwork_science_concept_1') }}</span>
                            <span class="font-bold text-gray-700">{{ __('deepwork_science_topic_1') }}</span>
                        </div>
                        <div class="group px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition">
                            <span class="text-[10px] font-black text-purple-400 uppercase tracking-widest block mb-1">{{ __('deepwork_science_concept_2') }}</span>
                            <span class="font-bold text-gray-700">{{ __('deepwork_science_topic_2') }}</span>
                        </div>
                        <div class="group px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition">
                            <span class="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-1">{{ __('deepwork_science_concept_3') }}</span>
                            <span class="font-bold text-gray-700">{{ __('deepwork_science_topic_3') }}</span>
                        </div>
                    </div>
                </div>

                <div class="flex-shrink-0 relative hidden lg:block">
                     {{-- Focus Sphere --}}
                     <div class="w-80 h-80 bg-indigo-600 rounded-full flex items-center justify-center p-1 shadow-2xl shadow-indigo-200 relative group overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-tr from-indigo-900 to-indigo-500 rounded-full group-hover:scale-110 transition duration-1000"></div>
                        <div class="relative z-10 text-8xl transform group-hover:scale-125 transition duration-700">🧘</div>
                        {{-- Orbital Shield --}}
                        <div class="absolute inset-2 border-2 border-white/20 rounded-full animate-spin-slow"></div>
                        <div class="absolute inset-4 border border-white/10 rounded-full animate-spin-reverse-slow"></div>
                     </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 bg-slate-50 border-y border-slate-100">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-4xl font-black text-center text-gray-900 mb-16">{{ __('deepwork_faq_title') }}</h2>
            <div class="space-y-6">
                @foreach([1, 2, 3] as $i)
                <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __("deepwork_faq_q$i") }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __("deepwork_faq_a$i") }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SECTION 5: CTA (RAPI, LEGA, PUNCHY) --}}
    <section class="pt-24 pb-40 bg-slate-50 text-center px-6 relative overflow-hidden border-t border-gray-200">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-indigo-100/50 to-transparent rounded-t-full -z-10"></div>
        
        <div class="max-w-3xl mx-auto mt-16">
            <h2 class="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight leading-tight">{{ __('deepwork_cta_title') }}</h2>
            <p class="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto">{{ __('deepwork_cta_desc') }}</p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a hx-boost="false" href="{{ route('register') }}" class="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.4)] transition transform hover:-translate-y-1 w-full sm:w-auto">
                    {{ __('deepwork_cta_btn') }}
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
            </div>
            
        </div>
    </section>
@endsection