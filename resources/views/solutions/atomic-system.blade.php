@extends('layouts.marketing')

@section('title', __('atomic_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('atomic_meta_desc') }}">
    <meta property="og:title" content="{{ __('atomic_meta_og_title') }}">
    <meta property="og:description" content="{{ __('atomic_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/atomic-system') }}">

@endsection

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{ __('schema_solution_atomic_name') }}",
  "description": "{{ __('schema_solution_atomic_description') }}"
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
    "name": "Atomic System",
    "item": "{{ url('/solutions/atomic-system') }}"
  }]
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{ __('atomic_faq_q1') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('atomic_faq_a1') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('atomic_faq_q2') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('atomic_faq_a2') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('atomic_faq_q3') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('atomic_faq_a3') }}"
      }
    }
  ]
}
]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (CENTERED LAYOUT - INDIGO) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white relative border-b border-gray-100">
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] -z-10"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-400/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {{-- Icon / Gambar Dulu --}}
            <div class="flex justify-center mb-8">
                <div class="w-24 h-24 bg-white/80 backdrop-blur-xl border border-indigo-100 rounded-[2rem] shadow-xl shadow-indigo-100 flex items-center justify-center text-4xl transform -rotate-3 hover:rotate-0 transition duration-300">
                    🌱
                </div>
            </div>

            {{-- Badge --}}
            <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-6 uppercase tracking-widest border border-indigo-100 shadow-sm">
                {{ __('atomic_hero_badge') }}
            </div>
            
            {{-- Teks Utama --}}
            <h1 class="text-6xl md:text-7xl font-black mb-6 leading-tight text-gray-900 tracking-tight">
                {{ __('atomic_hero_title_1') }}<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {{ __('atomic_hero_title_2') }}
                </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
                {{ __('atomic_hero_desc') }}
            </p>
            
            {{-- CTA --}}
            <div class="flex justify-center gap-4 mb-24">
                <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.4)] transition transform hover:-translate-y-1">
                    {{ __('atomic_hero_cta') }}
                </a>
            </div>

            {{-- Visual Bawah (Lebar & Interactive Vibe) --}}
            <div class="relative w-full max-w-4xl mx-auto rounded-[2.5rem] bg-white p-3 shadow-2xl border border-gray-100 transform perspective-1000 rotate-x-6 hover:rotate-x-0 transition-transform duration-700" role="img" aria-label="The Compounding Effect Visualization: A bar chart showing how 1% daily improvements lead to 37x better results over one year, representing the core philosophy of the Atomic System.">
                <div class="absolute inset-0 bg-indigo-500 rounded-[2.5rem] blur-2xl opacity-10 -z-10"></div>
                <div class="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-gray-100 overflow-hidden relative text-left flex flex-col md:flex-row gap-8 items-center">
                    
                    <div class="flex-1 space-y-4 z-10">
                        <h4 class="font-black text-gray-900 text-2xl">{{ __('atomic_mockup_title') }}</h4>
                        <p class="text-gray-500 font-medium">{{ __('atomic_mockup_desc') }}</p>
                        <div class="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200">
                            <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            <span class="text-xs font-bold text-gray-700">{{ __('atomic_mockup_streak') }}</span>
                        </div>
                    </div>

                    <div class="flex-1 w-full relative h-40 border-b-2 border-l-2 border-gray-200 flex items-end justify-between gap-1 px-2 pt-4">
                        {{-- Grafik Compounding Indigo --}}
                        @for($i = 1; $i <= 15; $i++)
                            <div class="w-full bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t-sm opacity-{{ min($i * 5 + 20, 100) }} hover:opacity-100 transition-opacity cursor-pointer group relative" style="height: {{ pow(1.18, $i) * 2.5 }}px">
                                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-20">Day {{ $i }}</div>
                            </div>
                        @endfor
                        <div class="absolute -right-4 -top-6 bg-white px-4 py-2 rounded-xl shadow-xl font-bold text-indigo-600 text-sm border border-indigo-50 flex items-center gap-2 transform rotate-3">
                            {{ __('atomic_mockup_returns') }}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-32 bg-white relative">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900">{{ __('atomic_prob_title') }}</h2>
                <p class="text-xl text-gray-500 max-w-2xl mx-auto">{{ __('atomic_prob_desc') }}</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12">
                <div class="bg-rose-50/50 p-12 rounded-[3rem] border border-rose-100 text-center hover:shadow-xl transition-shadow duration-300">
                    <div class="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm text-4xl mb-6">📉</div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ __('atomic_prob_1_title') }}</h3>
                    <p class="text-gray-600 leading-relaxed text-lg">{{ __('atomic_prob_1_desc') }}</p>
                </div>
                <div class="bg-gray-50 p-12 rounded-[3rem] border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
                    <div class="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm text-4xl mb-6">🔁</div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ __('atomic_prob_2_title') }}</h3>
                    <p class="text-gray-600 leading-relaxed text-lg">{{ __('atomic_prob_2_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: HABIT HEATMAPS (UNIQUE A) --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="relative">
                <div class="bg-indigo-50 rounded-[3rem] p-8 md:p-12 border border-indigo-100 shadow-xl">
                    <div class="grid grid-cols-7 gap-2 mb-6">
                        @foreach(range(1, 35) as $i)
                            <div class="aspect-square rounded-md {{ $i % 3 === 0 ? 'bg-indigo-600' : ($i % 5 === 0 ? 'bg-indigo-200' : 'bg-indigo-400') }}"></div>
                        @endforeach
                    </div>
                    <div class="flex items-center justify-between text-xs font-bold text-indigo-400 uppercase tracking-widest">
                        <span>{{ __('atomic_heatmap_less') }}</span>
                        <div class="flex gap-1">
                            <div class="w-3 h-3 bg-indigo-100 rounded"></div>
                            <div class="w-3 h-3 bg-indigo-300 rounded"></div>
                            <div class="w-3 h-3 bg-indigo-600 rounded"></div>
                        </div>
                        <span>{{ __('atomic_heatmap_peak') }}</span>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-4xl font-black text-gray-900 mb-6">{{ __('atomic_extra_1_title') }}</h2>
                <p class="text-xl text-gray-500 leading-relaxed">
                    {{ __('atomic_extra_1_desc') }}
                </p>
            </div>
        </div>
    </section>

    {{-- SECTION: COMPOUNDING FACTORY (UNIQUE B) --}}
    <section class="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div class="max-w-5xl mx-auto px-6 relative z-10">
            <div class="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-[3rem] p-12 md:p-20 border border-white/10 backdrop-blur-sm">
                <h2 class="text-4xl font-black mb-8 text-center">{{ __('atomic_extra_2_title') }}</h2>
                <p class="text-xl text-indigo-200 text-center leading-relaxed mb-12 max-w-3xl mx-auto">
                    {{ __('atomic_extra_2_desc') }}
                </p>
                <div class="flex justify-center gap-12 items-end h-32">
                    <div class="w-12 bg-indigo-500/30 rounded-t-xl h-4"></div>
                    <div class="w-12 bg-indigo-500/50 rounded-t-xl h-8"></div>
                    <div class="w-12 bg-indigo-500/70 rounded-t-xl h-16"></div>
                    <div class="w-12 bg-indigo-600 rounded-t-xl h-32 relative">
                        <div class="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl animate-bounce">🔥</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION: SCIENTIFIC PILLAR (E-E-A-T) - CHEMICAL REACTION STYLE --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        {{-- Floating Atoms Decoration --}}
        <div class="absolute top-20 left-10 w-4 h-4 bg-indigo-200 rounded-full animate-bounce"></div>
        <div class="absolute bottom-20 right-10 w-6 h-6 bg-purple-200 rounded-full animate-bounce delay-700"></div>
        <div class="absolute top-1/2 right-20 w-3 h-3 bg-emerald-200 rounded-full animate-bounce delay-1000"></div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="bg-slate-950 rounded-[4rem] p-10 md:p-20 shadow-2xl relative overflow-hidden">
                {{-- Glow Effect --}}
                <div class="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>

                <div class="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em] mb-10 rounded-full border border-white/10">
                            🧬 {{ __('atomic_science_badge') }}
                        </div>

                        <h2 class="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">
                            {{ __('atomic_science_title') }}
                        </h2>

                        <div class="relative py-12 px-10 bg-white/5 backdrop-blur-md rounded-[3rem] mb-12 border border-white/10">
                            <p class="text-indigo-100 text-xl md:text-2xl font-serif italic leading-relaxed">
                                "{{ __('atomic_science_desc') }}"
                            </p>
                        </div>

                        <div class="flex flex-wrap gap-4">
                            <div class="px-5 py-3 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/50 transition">
                                <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">{{ __('atomic_science_reagent_1') }}</span>
                                <h4 class="font-bold text-slate-300">{{ __('atomic_science_topic_1') }}</h4>
                            </div>
                            <div class="px-5 py-3 bg-white/5 rounded-2xl border border-white/5 hover:border-purple-500/50 transition">
                                <span class="text-[10px] font-black text-purple-400 uppercase tracking-widest block mb-1">{{ __('atomic_science_reagent_2') }}</span>
                                <h4 class="font-bold text-slate-300">{{ __('atomic_science_topic_2') }}</h4>
                            </div>
                            <div class="px-5 py-3 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/50 transition">
                                <span class="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-1">{{ __('atomic_science_reagent_3') }}</span>
                                <h4 class="font-bold text-slate-300">{{ __('atomic_science_topic_3') }}</h4>
                            </div>
                        </div>
                    </div>

                    <div class="relative hidden lg:block">
                        {{-- Atomic Reaction Visualization --}}
                        <div class="relative w-full aspect-square flex items-center justify-center">
                            {{-- Nucleus --}}
                            <div class="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center text-5xl shadow-[0_0_60px_rgba(79,70,229,0.5)] z-20 animate-pulse">⚛️</div>
                            
                            {{-- Orbitals --}}
                            <div class="absolute inset-0 border-2 border-white/5 rounded-full animate-[spin_10s_linear_infinite]">
                                <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-indigo-400 rounded-full shadow-lg"></div>
                            </div>
                            <div class="absolute inset-12 border-2 border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]">
                                <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-purple-400 rounded-full shadow-lg"></div>
                            </div>
                            <div class="absolute inset-24 border-2 border-white/5 rounded-full animate-[spin_8s_linear_infinite]">
                                <div class="absolute top-1/2 -left-3 -translate-y-1/2 w-4 h-4 bg-emerald-400 rounded-full shadow-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 bg-slate-50 border-y border-slate-100">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-4xl font-black text-center text-gray-900 mb-16">{{ __('atomic_faq_title') }}</h2>
            <div class="space-y-6">
                @foreach([1, 2, 3] as $i)
                <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __("atomic_faq_q$i") }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __("atomic_faq_a$i") }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>


    {{-- SECTION 4: CTA --}}
    <section class="py-40 bg-white text-center px-6 relative overflow-hidden">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-indigo-50 to-white rounded-t-full -z-10"></div>
        
        <div class="max-w-4xl mx-auto">
            <h2 class="text-6xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">{{ __('atomic_cta_title') }}</h2>
            <p class="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">{{ __('atomic_cta_desc') }}</p>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-950 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-800 shadow-2xl transition transform hover:-translate-y-1">
                {{ __('atomic_cta_btn') }}
            </a>
        </div>
    </section>
@endsection