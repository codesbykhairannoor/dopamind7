@extends('layouts.marketing')

@section('title', __('streaks_alt_title'))

@section('meta')
    <meta name="description" content="{{ __('streaks_alt_desc') }}">
    <meta property="og:title" content="{{ __('streaks_alt_og_title') }}">
    <meta property="og:description" content="{{ __('streaks_alt_og_desc') }}">
    <meta property="og:url" content="{{ url('/compare/streaks-alternative') }}">
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
    "name": "Streaks App Alternative",
    "item": "{{ url('/compare/streaks-alternative') }}"
  }]
},{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "{{ __('faq_streaks_q1') }}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "{{ __('faq_streaks_a1') }}"
    }
  }]
}]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (Text Right, Visual Left) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-slate-50 relative border-b border-slate-200">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            
            <div class="order-2 lg:order-1 relative h-[400px] flex items-center justify-center animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                <div class="absolute w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-50"></div>
                <div class="relative bg-white border border-slate-200 rounded-[2.5rem] shadow-xl p-8 w-80 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div class="text-center mb-6">
                        <div class="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">Consistency Over Perfection</div>
                    </div>
                    <div class="grid grid-cols-7 gap-2 mb-6">
                        @for($i=0; $i<28; $i++)
                            @php
                                $color = 'bg-emerald-100';
                                if($i == 12 || $i == 13 || $i == 20) $color = 'bg-slate-100';
                                if($i % 3 == 0 && $i != 12) $color = 'bg-emerald-300';
                                if($i % 7 == 0) $color = 'bg-emerald-500';
                            @endphp
                            <div class="w-full aspect-square rounded-sm {{ $color }}"></div>
                        @endfor
                    </div>
                    <div class="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100 text-sm font-bold text-center">
                        85% Consistency Rate
                    </div>
                    <div class="absolute -left-6 -top-6 w-16 h-16 bg-white border border-slate-200 text-red-500 rounded-full flex flex-col items-center justify-center shadow-lg opacity-50 grayscale rotate-12">
                        <span class="text-lg">🔥</span>
                        <span class="text-[8px] font-black">0</span>
                    </div>
                </div>
            </div>

            <div class="order-1 lg:order-2 text-left animate-in fade-in slide-in-from-right-8 duration-1000">
                <div class="mb-4">
                    <span class="text-orange-500 font-bold text-sm tracking-widest uppercase opacity-70">{{ __('seo_eyebrow_streaks') }}</span>
                </div>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-8 uppercase tracking-wider border border-orange-200">
                    <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                    {{ __('streaks_badge') }}
                </div>
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                    {{ __('streaks_hero_title_1') }} <br/>
                    <span class="text-indigo-600 underline decoration-wavy decoration-indigo-200">{{ __('streaks_hero_title_2') }}</span>
                </h1>
                <p class="text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
                    {!! __('streaks_hero_desc') !!}
                </p>
                <div class="flex flex-col sm:flex-row items-start gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-600 transition-colors shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 transform">
                        {{ __('streaks_hero_cta') }}
                    </a>
                    <p class="mt-4 text-xs text-slate-400 font-medium self-center sm:self-auto">{{ __('streaks_hero_note') }}</p>
                </div>
            </div>

        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (Fragile Chain) --}}
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="bg-orange-50 p-12 rounded-[3rem] border border-orange-100 relative group">
                <div class="flex items-center justify-center gap-2 text-4xl mb-8 group-hover:scale-105 transition-transform">
                    <span class="text-orange-500">🔗</span>
                    <span class="text-orange-500">🔗</span>
                    <span class="text-red-500 animate-pulse">💥</span>
                    <span class="text-slate-300">🔗</span>
                </div>
                <div class="text-center font-bold text-slate-400">Day 100: You got sick.</div>
                <div class="text-center font-black text-red-500 text-2xl mt-2">Streak Lost.</div>
            </div>
            <div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('streaks_prob_title_1') }} <span class="text-orange-500">{{ __('streaks_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('streaks_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-600">
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('streaks_prob_point_1') }}</li>
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('streaks_prob_point_2') }}</li>
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('streaks_prob_point_3') }}</li>
                </ul>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION (Heatmap) --}}
    <section class="py-24 bg-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div>
                <h2 class="text-4xl md:text-5xl mb-6 leading-tight font-black">
                    {{ __('streaks_sol_title_1') }} <span class="text-indigo-400">{{ __('streaks_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-400 text-xl mb-8">
                    {{ __('streaks_sol_desc') }}
                </p>
                <div class="grid gap-6">
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h3 class="font-bold text-lg text-white mb-2">{{ __('streaks_sol_1_title') }}</h3>
                        <p class="text-slate-400 text-sm">{{ __('streaks_sol_1_desc') }}</p>
                    </div>
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h3 class="font-bold text-lg text-white mb-2">{{ __('streaks_sol_2_title') }}</h3>
                        <p class="text-slate-400 text-sm">{{ __('streaks_sol_2_desc') }}</p>
                    </div>
                </div>
            </div>
            <div class="bg-slate-800 p-8 rounded-[3rem] shadow-2xl border border-slate-700">
                <div class="grid grid-cols-7 gap-2">
                    <!-- Fake Heatmap -->
                    @for($i=0; $i<28; $i++)
                        <div class="w-full aspect-square rounded-md {{ $i == 14 ? 'bg-slate-700' : 'bg-indigo-500' }}"></div>
                    @endfor
                </div>
                <div class="mt-6 text-center text-indigo-400 font-bold text-sm uppercase tracking-widest">27/28 Days (96% Consistency)</div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: TABLE --}}
    <section class="py-24 bg-white">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl text-slate-900 mb-6 font-black">{{ __('streaks_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('streaks_compare_desc') }}</p>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Competitor Card -->
                <div class="p-8 rounded-3xl border border-slate-200 bg-slate-50 opacity-80">
                    <h3 class="font-black text-slate-400 uppercase tracking-widest mb-8 text-center">{{ __('streaks_table_head_2') }}</h3>
                    <ul class="space-y-6">
                        <li>
                            <div class="text-xs text-slate-400 font-bold uppercase mb-1">{{ __('streaks_table_row_1_title') }}</div>
                            <div class="text-slate-700">{{ __('streaks_table_row_1_col_1') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-slate-400 font-bold uppercase mb-1">{{ __('streaks_table_row_2_title') }}</div>
                            <div class="text-slate-700">{{ __('streaks_table_row_2_col_1') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-slate-400 font-bold uppercase mb-1">{{ __('streaks_table_row_3_title') }}</div>
                            <div class="text-slate-700">{{ __('streaks_table_row_3_col_1') }}</div>
                        </li>
                    </ul>
                </div>
                <!-- Our Card -->
                <div class="p-8 rounded-3xl border-2 border-indigo-500 bg-white shadow-xl shadow-indigo-100 relative">
                    <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">OneForMind</div>
                    <ul class="space-y-6 mt-4">
                        <li>
                            <div class="text-xs text-indigo-400 font-bold uppercase mb-1">{{ __('streaks_table_row_1_title') }}</div>
                            <div class="text-slate-900 font-bold">{{ __('streaks_table_row_1_col_2') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-indigo-400 font-bold uppercase mb-1">{{ __('streaks_table_row_2_title') }}</div>
                            <div class="text-slate-900 font-bold">{{ __('streaks_table_row_2_col_2') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-indigo-400 font-bold uppercase mb-1">{{ __('streaks_table_row_3_title') }}</div>
                            <div class="text-slate-900 font-bold">{{ __('streaks_table_row_3_col_2') }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4.5: PSYCHOLOGY & DATA --}}
    <section class="py-24 bg-white overflow-hidden border-t border-slate-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-16 mb-24 items-center">
                <div class="order-2 lg:order-1 relative">
                    <div class="absolute inset-0 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
                    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative z-10">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl font-black">!</div>
                            <div>
                                <div class="font-bold text-slate-900">What The Hell Effect</div>
                                <div class="text-sm text-slate-500">Cognitive Bias</div>
                            </div>
                        </div>
                        <p class="text-slate-600 italic">"I've already ruined my diet by eating one cookie, so I might as well eat the whole box."</p>
                    </div>
                </div>
                <div class="order-1 lg:order-2">
                    <div class="text-orange-500 font-bold tracking-widest uppercase mb-4 text-sm">Behavioral Science</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('streaks_psycho_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('streaks_psycho_desc') }}</p>
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 class="font-bold text-lg text-slate-800 mb-2">{{ __('streaks_psycho_point1') }}</h3>
                        <p class="text-slate-500 text-sm">{{ __('streaks_psycho_point1_desc') }}</p>
                    </div>
                </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div class="text-indigo-500 font-bold tracking-widest uppercase mb-4 text-sm">Actionable Insights</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('streaks_data_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('streaks_data_desc') }}</p>
                </div>
                <div class="bg-slate-900 p-8 rounded-3xl shadow-2xl relative text-white">
                    <div class="flex justify-between items-center mb-6">
                        <div class="font-bold">AI Friction Audit</div>
                        <div class="text-xs bg-indigo-500 px-2 py-1 rounded">Completed</div>
                    </div>
                    <div class="space-y-4 font-mono text-sm">
                        <div class="flex items-center gap-3 text-slate-400">
                            <span>></span>
                            <span>Analyzing missed habit: "Read 10 pages"</span>
                        </div>
                        <div class="flex items-center gap-3 text-red-400">
                            <span>></span>
                            <span>Correlation found: Budget exceeded yesterday.</span>
                        </div>
                        <div class="flex items-center gap-3 text-green-400">
                            <span>></span>
                            <span>Solution: Stress causes habit drop. Adjust schedule.</span>
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
                <a href="{{ route('compare.habitica') }}" class="group block bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-black">⚔️</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-indigo-600 transition-colors">vs Habitica</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_habitica_desc') }}</p>
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
    <section class="py-32 bg-slate-50 text-center px-6 border-t border-slate-200">
        <h2 class="text-4xl md:text-6xl text-slate-900 font-black mb-6">{!! __('streaks_cta_title') !!}</h2>
        <p class="text-slate-500 text-xl mb-10">{{ __('streaks_cta_desc') }}</p>
        <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white font-black px-10 py-4 rounded-xl shadow-lg shadow-indigo-200 hover:scale-105 transition-transform">{{ __('streaks_cta_btn') }}</a>
    </section>

@endsection