@extends('layouts.marketing')

@section('title', __('brain_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('brain_meta_desc') }}">
    <meta property="og:title" content="{{ __('brain_meta_og_title') }}">
    <meta property="og:description" content="{{ __('brain_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/second-brain') }}">

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
    "name": "{{ app()->getLocale() === 'id' ? 'Solusi' : 'Solutions' }}",
    "item": "{{ url('/') }}#solutions"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "{{ __('brain_breadcrumb') }}",
    "item": "{{ url('/solutions/second-brain') }}"
  }]
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{ __('brain_faq_q1') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('brain_faq_a1') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('brain_faq_q2') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('brain_faq_a2') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('brain_faq_q3') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('brain_faq_a3') }}"
      }
    }
  ]
}
]
</script>
@endsection

@section('content')

    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO (CENTERED GLASSMORPHISM - PURE INDIGO VIBE) --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white relative border-b border-slate-100">
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] -z-10"></div>
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[120px] opacity-60 animate-pulse -z-10"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-[100px] opacity-50 animate-pulse delay-1000 -z-10"></div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {{-- Icon / Gambar Dulu --}}
            <div class="flex justify-center mb-8">
                <div class="w-24 h-24 bg-white/80 backdrop-blur-xl border border-indigo-100 rounded-[2rem] shadow-xl shadow-indigo-100 flex items-center justify-center text-4xl transform -rotate-3 hover:rotate-0 transition duration-300">
                    🧠
                </div>
            </div>

            {{-- Badge --}}
            <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-6 uppercase tracking-widest border border-indigo-100 shadow-sm">
                {{ __('brain_hero_badge') }}
            </div>
            
            {{-- Teks Utama --}}
            <h1 class="text-6xl md:text-7xl font-black mb-6 leading-tight text-slate-900 tracking-tight">
                {{ __('brain_hero_title_1') }}<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {{ __('brain_hero_title_2') }}
                </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
                {{ __('brain_hero_desc') }}
            </p>
            
            {{-- CTA --}}
            <div class="flex justify-center gap-4 mb-24">
                <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.4)] transition transform hover:-translate-y-1">
                    {{ __('brain_hero_cta') }}
                </a>
            </div>

            {{-- Visual Bawah (Lebar - Glassmorphism Nodes Network) --}}
            <div class="relative w-full max-w-4xl mx-auto h-[400px] md:h-80 flex justify-center items-center rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl border border-slate-800 perspective-1000">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20"></div>

                {{-- Node 1: Capture --}}
                <div class="absolute left-4 md:left-12 top-8 md:top-16 bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 z-10 transform -rotate-6 animate-[float_4s_ease-in-out_infinite] shadow-2xl">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-8 h-8 rounded-lg bg-indigo-500/30 flex items-center justify-center text-sm">📥</div>
                        <span class="font-bold text-indigo-100 text-sm">{{ __('brain_mockup_1') }}</span>
                    </div>
                    <div class="w-24 h-1.5 bg-white/20 rounded-full"></div>
                </div>

                {{-- Node 2: Organize (Center) --}}
                <div class="absolute bg-indigo-600/20 backdrop-blur-xl p-8 rounded-[2.5rem] border border-indigo-400/30 shadow-[0_0_50px_rgba(79,70,229,0.3)] z-20 scale-110">
                    <div class="flex flex-col items-center">
                        <span class="text-4xl mb-3 drop-shadow-lg">🔮</span>
                        <h4 class="font-black text-white tracking-widest uppercase text-sm">{{ __('brain_mockup_2') }}</h4>
                    </div>
                </div>

                {{-- Node 3: Execute --}}
                <div class="absolute right-4 md:right-12 bottom-8 md:bottom-16 bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 z-10 transform rotate-6 animate-[float_5s_ease-in-out_infinite_reverse] shadow-2xl">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center text-sm">📓</div>
                        <span class="font-bold text-indigo-100 text-sm">{{ __('brain_mockup_3') }}</span>
                    </div>
                    <p class="text-[10px] text-slate-300 font-serif italic max-w-[120px]">"{{ __('brain_mockup_3_quote') }}"</p>
                </div>
                
                {{-- Connecting SVG Lines --}}
                <div class="absolute top-1/2 left-1/4 w-32 md:w-48 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-indigo-400 transform -rotate-12 -z-10 opacity-50"></div>
                <div class="absolute top-1/2 right-1/4 w-32 md:w-48 h-0.5 bg-gradient-to-l from-transparent via-indigo-400 to-indigo-400 transform rotate-12 -z-10 opacity-50"></div>
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: NEW LAYOUT -> STACKED CHAOS (THE PROBLEM) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            
            {{-- Left: Text --}}
            <div class="relative z-10">
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight">{{ __('brain_prob_title') }}</h2>
                <p class="text-xl text-slate-500 leading-relaxed mb-10">{{ __('brain_prob_desc') }}</p>
                
                <div class="space-y-6">
                    <div class="flex items-start gap-4">
                        <div class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-lg shrink-0 mt-1">🌪️</div>
                        <div>
                            <h3 class="font-bold text-slate-900 mb-1">{{ __('brain_prob_1_title') }}</h3>
                            <p class="text-sm text-slate-500">{{ __('brain_prob_1_desc') }}</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4">
                        <div class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-lg shrink-0 mt-1">🧩</div>
                        <div>
                            <h3 class="font-bold text-slate-900 mb-1">{{ __('brain_prob_2_title') }}</h3>
                            <p class="text-sm text-slate-500">{{ __('brain_prob_2_desc') }}</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4">
                        <div class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-lg shrink-0 mt-1">🔋</div>
                        <div>
                            <h3 class="font-bold text-slate-900 mb-1">{{ __('brain_prob_3_title') }}</h3>
                            <p class="text-sm text-slate-500">{{ __('brain_prob_3_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Right: Visual Chaos (Stacked Papers) --}}
            <div class="relative h-[500px] flex items-center justify-center perspective-1000">
                <div class="absolute w-72 h-48 bg-white rounded-3xl shadow-xl border border-slate-200 transform -rotate-12 translate-x-10 translate-y-10 opacity-70 p-6 flex flex-col justify-between">
                    <div class="w-full h-3 bg-slate-100 rounded"></div>
                    <div class="w-3/4 h-3 bg-slate-100 rounded"></div>
                    <div class="w-1/2 h-3 bg-slate-100 rounded"></div>
                </div>
                <div class="absolute w-72 h-48 bg-slate-100 rounded-3xl shadow-xl border border-slate-200 transform rotate-12 -translate-x-10 -translate-y-10 opacity-80 p-6">
                    <div class="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
                    <div class="w-full h-2 bg-slate-200 rounded mb-2"></div>
                    <div class="w-full h-2 bg-slate-200 rounded"></div>
                </div>
                <div class="absolute w-80 h-56 bg-white rounded-3xl shadow-2xl border border-slate-100 transform z-10 p-8 flex flex-col justify-center items-center">
                    <div class="text-5xl mb-4 animate-bounce">🤯</div>
                    <div class="font-black text-rose-500 tracking-widest uppercase text-sm">{{ __('brain_prob_viz_badge') }}</div>
                    <div class="text-xs text-slate-400 mt-2">{{ __('brain_prob_viz_sub') }}</div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: NEW LAYOUT -> VERTICAL PROCESS (THE C.O.E FRAMEWORK) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div class="max-w-4xl mx-auto px-6 relative z-10">
            <div class="text-center mb-24">
                <h2 class="text-4xl md:text-6xl font-black mb-6">{{ __('brain_sol_title') }}</h2>
                <p class="text-indigo-300 text-xl">{{ __('brain_sol_desc') }}</p>
            </div>

            {{-- Vertical Process --}}
            <div class="relative space-y-12 before:absolute before:inset-0 before:ml-12 md:before:ml-1/2 md:before:-translate-x-px md:before:w-0.5 before:bg-indigo-800 before:-z-10">
                
                {{-- Step 1 --}}
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div class="flex items-center justify-center w-24 h-24 rounded-full border-8 border-slate-900 bg-indigo-600 text-3xl shadow-xl shrink-0 z-10 transform group-hover:scale-110 transition duration-300 md:order-1 md:absolute md:left-1/2 md:-translate-x-1/2">🎣</div>
                    <div class="w-[calc(100%-7rem)] md:w-[calc(50%-4rem)] bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-xl group-hover:border-indigo-500/50 transition duration-300">
                        <h3 class="text-2xl font-bold text-indigo-400 mb-3">{{ __('brain_step_1_title') }}</h3>
                        <p class="text-slate-400 text-sm leading-relaxed">{{ __('brain_step_1_desc') }}</p>
                    </div>
                </div>

                {{-- Step 2 --}}
                <div class="relative flex items-center justify-between md:justify-normal md:even:flex-row group">
                    <div class="flex items-center justify-center w-24 h-24 rounded-full border-8 border-slate-900 bg-blue-600 text-3xl shadow-xl shrink-0 z-10 transform group-hover:scale-110 transition duration-300 md:order-1 md:absolute md:left-1/2 md:-translate-x-1/2">🗄️</div>
                    <div class="w-[calc(100%-7rem)] md:w-[calc(50%-4rem)] bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-xl group-hover:border-blue-500/50 transition duration-300 md:ml-auto">
                        <h3 class="text-2xl font-bold text-blue-400 mb-3">{{ __('brain_step_2_title') }}</h3>
                        <p class="text-slate-400 text-sm leading-relaxed">{{ __('brain_step_2_desc') }}</p>
                    </div>
                </div>

                {{-- Step 3 --}}
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div class="flex items-center justify-center w-24 h-24 rounded-full border-8 border-slate-900 bg-emerald-500 text-3xl shadow-xl shrink-0 z-10 transform group-hover:scale-110 transition duration-300 md:order-1 md:absolute md:left-1/2 md:-translate-x-1/2">✨</div>
                    <div class="w-[calc(100%-7rem)] md:w-[calc(50%-4rem)] bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-xl group-hover:border-emerald-500/50 transition duration-300">
                        <h3 class="text-2xl font-bold text-emerald-400 mb-3">{{ __('brain_step_3_title') }}</h3>
                        <p class="text-slate-400 text-sm leading-relaxed">{{ __('brain_step_3_desc') }}</p>
                    </div>
                </div>
            </div>

            {{-- Visual Bawah (Bento Hub - Sedikit dirapikan) --}}
            <div class="relative w-full max-w-4xl mx-auto mt-32 rounded-[3rem] bg-slate-950 p-3 shadow-2xl border border-slate-800">
                <div class="absolute inset-0 bg-indigo-500 rounded-[3rem] blur-3xl opacity-20 -z-10"></div>
                <div class="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative text-left">
                    <div class="flex items-center gap-4 mb-10 relative z-10">
                        <div class="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-3xl">🧠</div>
                        <h3 class="text-3xl font-black text-white">{{ __('brain_hub_title') }}</h3>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6 relative z-10">
                        {{-- Quick Inbox --}}
                        <div class="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-lg">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-12 h-12 bg-indigo-400/20 rounded-xl flex items-center justify-center text-2xl">⚡</div>
                                <h4 class="font-bold text-indigo-200 text-lg">{{ __('brain_hub_inbox_title') }}</h4>
                            </div>
                            <p class="text-slate-400 text-sm">{{ __('brain_hub_inbox_desc') }}</p>
                        </div>

                        {{-- Life OS --}}
                        <div class="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-lg">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center text-2xl">🏡</div>
                                <h4 class="font-bold text-blue-200 text-lg">{{ __('brain_hub_os_title') }}</h4>
                            </div>
                            <p class="text-slate-400 text-sm">{{ __('brain_hub_os_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: NEW LAYOUT -> ASYMMETRICAL GRID (THE TOOLKIT) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white border-b border-slate-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-20 max-w-3xl mx-auto">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('brain_feat_title') }}</h2>
                <p class="text-xl text-slate-500">{{ __('brain_feat_sub') }}</p>
            </div>
            
            <div class="grid md:grid-cols-12 gap-6">
                {{-- Feature 1: Main Focus (Wide) --}}
                <div class="md:col-span-8 flex flex-col justify-between p-10 md:p-12 rounded-[3rem] bg-indigo-50 border border-indigo-100 shadow-sm hover:shadow-lg transition">
                    <div class="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-8">📥</div>
                    <div>
                        <h4 class="text-2xl font-black text-indigo-950 mb-3">{{ __('brain_feat_1_title') }}</h4>
                        <p class="text-indigo-800/80 leading-relaxed text-lg max-w-xl">{{ __('brain_feat_1_desc') }}</p>
                    </div>
                </div>
                
                {{-- Feature 2: Secondary (Tall) --}}
                <div class="md:col-span-4 flex flex-col justify-between p-10 md:p-12 rounded-[3rem] bg-slate-900 text-white shadow-xl hover:shadow-2xl transition transform md:-translate-y-4">
                    <div class="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-8">📓</div>
                    <div>
                        <h4 class="text-2xl font-black mb-3">{{ __('brain_feat_2_title') }}</h4>
                        <p class="text-slate-400 leading-relaxed">{{ __('brain_feat_2_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: INFO HIERARCHY (Dipertahankan, sudah sangat bagus secara visual) --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1">
                <h2 class="text-4xl font-black text-slate-900 mb-6">{{ __('brain_extra_1_title') }}</h2>
                <p class="text-xl text-slate-500 leading-relaxed mb-10">
                    {{ __('brain_extra_1_desc') }}
                </p>
                <div class="space-y-4">
                    <div class="flex items-center gap-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <span class="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-lg">1</span>
                        <span class="font-bold text-slate-700 text-lg">{{ __('brain_extra_1_item_1') }}</span>
                    </div>
                    <div class="flex items-center gap-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm ml-8">
                        <span class="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-black text-lg">2</span>
                        <span class="font-bold text-slate-700 text-lg">{{ __('brain_extra_1_item_2') }}</span>
                    </div>
                    <div class="flex items-center gap-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm ml-16">
                        <span class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg">3</span>
                        <span class="font-bold text-slate-700 text-lg">{{ __('brain_extra_1_item_3') }}</span>
                    </div>
                </div>
            </div>
            <div class="relative order-1 md:order-2">
                <div class="w-full aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[3rem] md:rounded-[4rem] p-12 flex items-center justify-center shadow-2xl">
                    <div class="text-center">
                        <div class="text-8xl mb-6 animate-bounce">📁</div>
                        <div class="text-white font-black text-3xl">{{ __('brain_extra_1_viz_title') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: CREATIVE OUTPUT --}}
    <section class="py-32 bg-white">
        <div class="max-w-5xl mx-auto px-6">
            <div class="bg-indigo-900 rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-50"></div>
                <h2 class="text-4xl font-black mb-8 relative z-10">{{ __('brain_extra_2_title') }}</h2>
                <p class="text-xl text-indigo-100 leading-relaxed mb-12 max-w-3xl mx-auto relative z-10">
                    {{ __('brain_extra_2_desc') }}
                </p>
                <div class="flex flex-wrap justify-center gap-4 relative z-10">
                    <span class="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-bold">{{ __('brain_extra_2_item_1') }}</span>
                    <span class="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-bold">{{ __('brain_extra_2_item_2') }}</span>
                    <span class="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-bold">{{ __('brain_extra_2_item_3') }}</span>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION: SCIENTIFIC PILLAR (E-E-A-T) - SYNAPTIC NETWORK STYLE --}}
    <section class="py-40 bg-slate-900 relative overflow-hidden">
        {{-- Synaptic Net Background --}}
        <div class="absolute inset-0 z-0">
            <svg class="w-full h-full opacity-10" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#4f46e5" />
                        <stop offset="100%" stop-color="transparent" />
                    </radialGradient>
                </defs>
                <circle cx="200" cy="200" r="150" fill="url(#nodeGradient)" class="animate-pulse" />
                <circle cx="800" cy="300" r="100" fill="url(#nodeGradient)" class="animate-pulse delay-700" />
                <circle cx="500" cy="800" r="120" fill="url(#nodeGradient)" class="animate-pulse delay-1000" />
                <path d="M200 200 L800 300 M800 300 L500 800 M500 800 L200 200" stroke="#4f46e5" stroke-width="1" stroke-dasharray="10 10" />
            </svg>
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                    <div class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 rounded-lg">
                        🧬 {{ __('brain_science_badge') }}
                    </div>

                    <h2 class="text-4xl md:text-7xl font-black text-white mb-10 leading-[1.1]">
                        {{ __('brain_science_title') }}
                    </h2>

                    <div class="relative py-12 px-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] mb-12 shadow-2xl">
                        <div class="absolute -top-6 -left-6 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20">"</div>
                        <p class="text-indigo-100 text-xl md:text-3xl font-serif italic leading-relaxed">
                            {{ __('brain_science_desc') }}
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-6">
                        <div class="px-6 py-4 bg-slate-800 rounded-2xl border border-slate-700 hover:border-indigo-500 transition cursor-help group">
                            <p class="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 group-hover:text-white">Active_Link_01</p>
                            <h4 class="font-bold text-slate-200">{{ __('brain_science_topic_1') }}</h4>
                        </div>
                        <div class="px-6 py-4 bg-slate-800 rounded-2xl border border-slate-700 hover:border-purple-500 transition cursor-help group">
                            <p class="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1 group-hover:text-white">Active_Link_02</p>
                            <h4 class="font-bold text-slate-200">{{ __('brain_science_topic_2') }}</h4>
                        </div>
                        <div class="px-6 py-4 bg-slate-800 rounded-2xl border border-slate-700 hover:border-emerald-500 transition cursor-help group">
                            <p class="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1 group-hover:text-white">Active_Link_03</p>
                            <h4 class="font-bold text-slate-200">{{ __('brain_science_topic_3') }}</h4>
                        </div>
                    </div>
                </div>

                <div class="relative hidden lg:block">
                    {{-- Synaptic Core Visual --}}
                    <div class="w-full aspect-square bg-indigo-600 rounded-[4rem] p-1 flex items-center justify-center shadow-[0_0_100px_rgba(79,70,229,0.3)] relative group overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-600 to-indigo-400 group-hover:scale-110 transition duration-1000"></div>
                        <div class="relative z-10 text-center">
                            <div class="text-[120px] mb-4 drop-shadow-2xl animate-pulse">🧠</div>
                            <div class="bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 inline-block font-black text-xs uppercase tracking-widest">
                                {{ __('brain_science_viz_badge') }}
                            </div>
                        </div>
                        {{-- Circular Data Rings --}}
                        <div class="absolute inset-4 border border-white/5 rounded-full animate-spin-slow"></div>
                        <div class="absolute inset-12 border border-white/5 rounded-full animate-spin-reverse-slow"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 bg-slate-50 border-y border-slate-100">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-4xl font-black text-center text-slate-900 mb-16">{{ __('brain_faq_title') }}</h2>
            <div class="space-y-6">
                @foreach([1, 2, 3] as $i)
                <div class="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
                    <h3 class="text-xl font-bold text-slate-900 mb-4">{{ __("brain_faq_q$i") }}</h3>
                    <p class="text-slate-600 leading-relaxed">{{ __("brain_faq_a$i") }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>


    {{-- SECTION 5: CTA (DESAIN LUAS & ELEGAN) --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-100 via-transparent to-transparent -z-10"></div>
        
        <div class="max-w-5xl mx-auto px-6 relative z-10">
            <div class="bg-indigo-950 rounded-[3rem] md:rounded-[4rem] p-12 md:p-24 text-center shadow-2xl relative overflow-hidden">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <div class="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-50"></div>
                <div class="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500 rounded-full blur-[80px] opacity-30"></div>
                
                <div class="relative z-10">
                    <div class="text-6xl mb-8">🕊️</div>
                    <h2 class="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                        {{ __('brain_cta_title') }}
                    </h2>
                    <p class="text-lg md:text-xl text-indigo-200 mb-12 max-w-2xl mx-auto leading-relaxed">
                        {{ __('brain_cta_desc') }}
                    </p>
                    
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a hx-boost="false" href="{{ route('register') }}" class="inline-flex items-center justify-center gap-3 bg-white text-indigo-950 px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-50 shadow-[0_10px_25px_rgba(255,255,255,0.2)] transition transform hover:-translate-y-1 w-full sm:w-auto">
                            {{ __('brain_cta_btn') }}
                            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
@endsection