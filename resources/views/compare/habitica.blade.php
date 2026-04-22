@extends('layouts.marketing')

@section('title', __('habitica_alt_title'))

@section('meta')
    <meta name="description" content="{{ __('habitica_alt_desc') }}">
    <meta property="og:title" content="{{ __('habitica_alt_og_title') }}">
    <meta property="og:description" content="{{ __('habitica_alt_og_desc') }}">
    <meta property="og:url" content="{{ url('/compare/habitica-alternative') }}">
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
    "name": "Compare",
    "item": "{{ url('/compare/habit-apps') }}"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Habitica Alternative",
    "item": "{{ url('/compare/habitica-alternative') }}"
  }]
},{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "{{ __('faq_habitica_q1') }}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "{{ __('faq_habitica_a1') }}"
    }
  }, {
    "@type": "Question",
    "name": "{{ __('faq_habitica_q2') }}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "{{ __('faq_habitica_a2') }}"
    }
  }]
}]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (Text Left, Visual Right) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-slate-950 relative border-b border-slate-900">
        <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(79,70,229,0.15)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-950"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div class="animate-in fade-in slide-in-from-left-8 duration-1000">
                <div class="mb-4">
                    <span class="text-indigo-400 font-bold text-sm tracking-widest uppercase opacity-70">{{ __('seo_eyebrow_habitica') }}</span>
                </div>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/50 text-indigo-300 font-bold text-xs mb-8 uppercase tracking-wider border border-indigo-500/30">
                    <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    {{ __('habitica_badge') }}
                </div>
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                    {{ __('habitica_hero_title_1') }} <br/>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">{{ __('habitica_hero_title_2') }}</span>
                </h1>
                <p class="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                    {!! __('habitica_hero_desc') !!}
                </p>
                <div class="flex flex-col sm:flex-row items-start gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-500 transition-all shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:shadow-[0_0_60px_rgba(79,70,229,0.5)]">
                        {{ __('habitica_hero_cta') }}
                    </a>
                    <p class="mt-4 text-xs text-slate-500 font-medium self-center sm:self-auto">{{ __('habitica_hero_note') }}</p>
                </div>
            </div>

            <div class="relative h-[400px] flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                <div class="absolute w-64 h-64 bg-red-500/20 rounded-full blur-3xl opacity-50"></div>
                
                {{-- Broken Game Sword vs Growing Plant --}}
                <div class="relative flex items-center justify-center gap-8">
                    <div class="bg-slate-900 border-4 border-slate-800 rounded-2xl p-6 shadow-2xl transform -rotate-6 grayscale opacity-60">
                        <div class="text-center font-mono text-red-500 mb-2">HP: 0</div>
                        <div class="text-6xl text-center">🗡️</div>
                        <div class="text-center font-mono text-slate-500 mt-2 text-xs">Game Over</div>
                    </div>

                    <div class="text-slate-700 text-4xl font-black">vs</div>

                    <div class="bg-indigo-900/40 border border-indigo-500/50 rounded-2xl p-8 shadow-[0_0_50px_rgba(79,70,229,0.2)] transform rotate-3">
                        <div class="text-center font-bold text-indigo-300 mb-2 uppercase tracking-widest text-xs">Identity</div>
                        <div class="text-6xl text-center drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">🌱</div>
                        <div class="text-center font-bold text-emerald-400 mt-4 text-sm">+1% Better Daily</div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="order-2 lg:order-1">
                <div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-red-200 font-black">🤢</div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('habitica_prob_title_1') }} <span class="text-red-600">{{ __('habitica_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('habitica_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-600">
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('habitica_prob_point_1') }}</li>
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('habitica_prob_point_2') }}</li>
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('habitica_prob_point_3') }}</li>
                </ul>
            </div>
            <div class="order-1 lg:order-2 bg-slate-900 p-8 rounded-3xl border-4 border-slate-800 shadow-2xl transform rotate-3">
                <div class="text-center font-mono text-red-500 mb-4 animate-pulse">WARNING: LOW HP</div>
                <div class="h-4 bg-slate-800 rounded-full overflow-hidden mb-6"><div class="h-full bg-red-500 w-[10%]"></div></div>
                <p class="text-slate-400 font-mono text-sm text-center">"You forgot to drink water. You take 15 damage."</p>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION --}}
    <section class="py-24 bg-indigo-50">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="bg-white p-12 rounded-[3rem] shadow-xl border border-indigo-100">
                <div class="flex items-center gap-4 mb-8">
                    <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xl">🧘‍♂️</div>
                    <div>
                        <div class="text-sm font-bold text-slate-400">Identity Target</div>
                        <div class="text-xl font-black text-slate-800">Healthy Human</div>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="h-3 bg-indigo-50 rounded-full w-full"></div>
                    <div class="h-3 bg-indigo-50 rounded-full w-4/5"></div>
                    <div class="h-3 bg-indigo-50 rounded-full w-5/6"></div>
                </div>
            </div>
            <div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('habitica_sol_title_1') }} <span class="text-indigo-600">{{ __('habitica_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl mb-8">
                    {{ __('habitica_sol_desc') }}
                </p>
                <div class="grid gap-6">
                    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 class="font-bold text-lg text-slate-800 mb-2">{{ __('habitica_sol_1_title') }}</h3>
                        <p class="text-slate-500 text-sm">{{ __('habitica_sol_1_desc') }}</p>
                    </div>
                    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 class="font-bold text-lg text-slate-800 mb-2">{{ __('habitica_sol_2_title') }}</h3>
                        <p class="text-slate-500 text-sm">{{ __('habitica_sol_2_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: TABLE --}}
    <section class="py-24 bg-white">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl text-slate-900 mb-6 font-black">{{ __('habitica_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('habitica_compare_desc') }}</p>
            </div>
            <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <div class="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-6 text-center font-black text-sm uppercase tracking-widest">
                    <div class="text-left text-slate-400">Features</div>
                    <div class="text-slate-400">{{ __('habitica_table_head_2') }}</div>
                    <div class="text-indigo-600">OneForMind</div>
                </div>
                <div class="grid grid-cols-3 border-b border-slate-100 p-6 text-center items-center">
                    <div class="text-left font-bold text-slate-700">{{ __('habitica_table_row_1_title') }}</div>
                    <div class="text-slate-500">{{ __('habitica_table_row_1_col_1') }}</div>
                    <div class="font-bold text-indigo-600 bg-indigo-50 py-2 rounded-lg">{{ __('habitica_table_row_1_col_2') }}</div>
                </div>
                <div class="grid grid-cols-3 border-b border-slate-100 p-6 text-center items-center">
                    <div class="text-left font-bold text-slate-700">{{ __('habitica_table_row_2_title') }}</div>
                    <div class="text-red-500">{{ __('habitica_table_row_2_col_1') }}</div>
                    <div class="font-bold text-indigo-600 bg-indigo-50 py-2 rounded-lg">{{ __('habitica_table_row_2_col_2') }}</div>
                </div>
                <div class="grid grid-cols-3 p-6 text-center items-center">
                    <div class="text-left font-bold text-slate-700">{{ __('habitica_table_row_3_title') }}</div>
                    <div class="text-slate-500">{{ __('habitica_table_row_3_col_1') }}</div>
                    <div class="font-bold text-indigo-600 bg-indigo-50 py-2 rounded-lg">{{ __('habitica_table_row_3_col_2') }}</div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4.5: SCIENCE & TESTIMONIAL --}}
    <section class="py-24 bg-slate-900 text-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div class="text-indigo-400 font-bold tracking-widest uppercase mb-4 text-sm">Research-Backed</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6">{{ __('habitica_science_title') }}</h2>
                    <p class="text-slate-400 text-lg mb-8">{{ __('habitica_science_desc') }}</p>
                    <ul class="space-y-6">
                        <li class="flex gap-4">
                            <div class="text-2xl mt-1">🧠</div>
                            <div>
                                <div class="font-bold text-xl">{{ __('habitica_science_point1') }}</div>
                                <div class="text-slate-400">{{ __('habitica_science_point1_desc') }}</div>
                            </div>
                        </li>
                        <li class="flex gap-4">
                            <div class="text-2xl mt-1">📉</div>
                            <div>
                                <div class="font-bold text-xl">{{ __('habitica_science_point2') }}</div>
                                <div class="text-slate-400">{{ __('habitica_science_point2_desc') }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="relative">
                    <div class="absolute inset-0 bg-indigo-500 rounded-3xl blur-3xl opacity-20"></div>
                    <div class="bg-slate-800 p-10 rounded-3xl relative border border-slate-700">
                        <div class="text-4xl text-indigo-400 mb-6">"</div>
                        <p class="text-xl md:text-2xl font-medium leading-relaxed italic text-slate-300 mb-8">{{ __('habitica_testimonial') }}</p>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-xl font-bold text-slate-300">Ex</div>
                            <div>
                                <div class="font-bold">Former Habitica User</div>
                                <div class="text-sm text-slate-500">Switched to OneForMind</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4.6: EXPLORE MORE ALTERNATIVES --}}
    <section class="py-24 bg-gray-50 border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-black text-gray-900 mb-4">{{ __('explore_more_alt') }}</h2>
                <p class="text-gray-500">{{ __('explore_more_desc') }}</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <a href="{{ route('compare.streaks') }}" class="group block bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-xl font-black">🔗</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-orange-600 transition-colors">vs Streaks</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_streaks_desc') }}</p>
                </a>
                
                <a href="{{ route('compare.habitify') }}" class="group block bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-black">📱</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-blue-600 transition-colors">vs Habitify</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_habitify_desc') }}</p>
                </a>
            </div>
        </div>
    </section>

    {{-- SECTION 5: CTA --}}
    <section class="py-32 bg-indigo-600 text-center px-6">
        <h2 class="text-4xl md:text-6xl text-white font-black mb-6">{!! __('habitica_cta_title') !!}</h2>
        <p class="text-indigo-200 text-xl mb-10">{{ __('habitica_cta_desc') }}</p>
        <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-white text-indigo-900 font-black px-10 py-4 rounded-xl shadow-2xl hover:scale-105 transition-transform">{{ __('habitica_cta_btn') }}</a>
    </section>

@endsection