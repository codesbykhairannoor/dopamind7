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
}]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (Minimalist/Orange vs Indigo Contrast) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-slate-50 relative border-b border-slate-200">
        <div class="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-8 uppercase tracking-wider border border-orange-200">
                <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                {{ __('streaks_badge') }}
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                {{ __('streaks_hero_title_1') }} <br/>
                <span class="text-indigo-600 underline decoration-wavy decoration-indigo-200">{{ __('streaks_hero_title_2') }}</span>
            </h1>
            <p class="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                {!! __('streaks_hero_desc') !!}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-600 transition-colors shadow-xl hover:shadow-indigo-500/30">
                    {{ __('streaks_hero_cta') }}
                </a>
            </div>
            <p class="mt-4 text-xs text-slate-400 font-medium">{{ __('streaks_hero_note') }}</p>
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

    {{-- SECTION 5: CTA --}}
    <section class="py-32 bg-slate-50 text-center px-6 border-t border-slate-200">
        <h2 class="text-4xl md:text-6xl text-slate-900 font-black mb-6">{!! __('streaks_cta_title') !!}</h2>
        <p class="text-slate-500 text-xl mb-10">{{ __('streaks_cta_desc') }}</p>
        <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white font-black px-10 py-4 rounded-xl shadow-lg shadow-indigo-200 hover:scale-105 transition-transform">{{ __('streaks_cta_btn') }}</a>
    </section>

@endsection