@extends('layouts.marketing')

@section('title', __('spendee_alt_title'))

@section('meta')
    <meta name="description" content="{{ __('spendee_alt_desc') }}">
    <meta property="og:title" content="{{ __('spendee_alt_og_title') }}">
    <meta property="og:description" content="{{ __('spendee_alt_og_desc') }}">
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
    "item": "{{ url('/compare/finance-apps') }}"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Spendee Alternative",
    "item": "{{ url('/compare/spendee-alternative') }}"
  }]
},{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "{{ __('faq_spendee_q1') }}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "{{ __('faq_spendee_a1') }}"
    }
  }]
}]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (Text Center, Visual Bottom) --}}
    <header class="pt-32 pb-0 px-6 overflow-hidden bg-slate-950 relative border-b border-purple-900">
        <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(168,85,247,0.15)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
        <div class="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 mb-16">
            <div class="mb-4">
                <span class="text-purple-400 font-bold text-sm tracking-widest uppercase opacity-70">{{ __('seo_eyebrow_spendee') }}</span>
            </div>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/50 text-purple-300 font-bold text-xs mb-8 uppercase tracking-wider border border-purple-500/30">
                <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                {{ __('spendee_badge') }}
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                {{ __('spendee_hero_title_1') }} <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{{ __('spendee_hero_title_2') }}</span>
            </h1>
            <p class="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                {!! __('spendee_hero_desc') !!}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-purple-500 transition-all shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)]">
                    {{ __('spendee_hero_cta') }}
                </a>
            </div>
            <p class="mt-4 text-xs text-slate-500 font-medium">{{ __('spendee_hero_note') }}</p>
        </div>

        {{-- Visual Bottom: A wide dashboard card sliding up --}}
        <div class="max-w-5xl mx-auto relative z-10 translate-y-12 hover:translate-y-4 transition-transform duration-700 animate-in slide-in-from-bottom-24 fade-in duration-1000 delay-300">
            <div class="bg-slate-900 border border-slate-800 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(168,85,247,0.15)] p-8 md:p-12 overflow-hidden relative">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-purple-500/30 rounded-b-full"></div>
                <div class="flex flex-col md:flex-row gap-8 items-center justify-center">
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full text-center">
                        <div class="text-3xl mb-2">💰</div>
                        <div class="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Finance</div>
                        <div class="text-white text-xl font-black">$2,450</div>
                    </div>
                    <div class="text-purple-500 text-2xl font-black">↔️</div>
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full text-center">
                        <div class="text-3xl mb-2">🌱</div>
                        <div class="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Habits</div>
                        <div class="text-emerald-400 text-xl font-black">85% Completion</div>
                    </div>
                    <div class="text-purple-500 text-2xl font-black">↔️</div>
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full text-center">
                        <div class="text-3xl mb-2">🎯</div>
                        <div class="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Planner</div>
                        <div class="text-white text-xl font-black">3 Focus Tasks</div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (Missing Context) --}}
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="order-2 lg:order-1">
                <div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-red-200 font-black">?</div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('spendee_prob_title_1') }} <span class="text-red-500">{{ __('spendee_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('spendee_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-600">
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('spendee_prob_point_1') }}</li>
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('spendee_prob_point_2') }}</li>
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('spendee_prob_point_3') }}</li>
                </ul>
            </div>
            <div class="order-1 lg:order-2 bg-slate-900 p-8 rounded-3xl border-4 border-slate-800 shadow-2xl transform rotate-3">
                <div class="text-center font-bold text-white mb-4 text-xl">Monthly Food Spending</div>
                <div class="flex justify-center mb-6">
                    <div class="w-40 h-40 rounded-full border-8 border-red-500 flex items-center justify-center">
                        <span class="text-3xl text-red-500 font-black">75%</span>
                    </div>
                </div>
                <p class="text-slate-400 font-mono text-sm text-center">"Great pie chart. But WHY did I spend so much?"</p>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION (Connecting Dots) --}}
    <section class="py-24 bg-purple-50">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="bg-white p-12 rounded-[3rem] shadow-xl border border-purple-100">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">💡</div>
                    <div>
                        <div class="text-sm font-bold text-slate-400">AI Context</div>
                        <div class="text-xl font-black text-slate-800">Root Cause Found</div>
                    </div>
                </div>
                <div class="space-y-4 text-sm font-medium text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div class="flex justify-between items-center">
                        <span>❌ Missed: Meal Prep Habit</span>
                        <span class="text-red-500 font-bold">Tuesday</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span>💸 Expense: Delivery Food</span>
                        <span class="text-red-500 font-bold">Tuesday</span>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('spendee_sol_title_1') }} <span class="text-purple-600">{{ __('spendee_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl mb-8">
                    {{ __('spendee_sol_desc') }}
                </p>
                <div class="grid gap-6">
                    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 class="font-bold text-lg text-slate-800 mb-2">{{ __('spendee_sol_1_title') }}</h3>
                        <p class="text-slate-500 text-sm">{{ __('spendee_sol_1_desc') }}</p>
                    </div>
                    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 class="font-bold text-lg text-slate-800 mb-2">{{ __('spendee_sol_2_title') }}</h3>
                        <p class="text-slate-500 text-sm">{{ __('spendee_sol_2_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: AI & COST --}}
    <section class="py-24 bg-slate-900 text-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-16 mb-24 items-center">
                <div>
                    <div class="text-purple-400 font-bold tracking-widest uppercase mb-4 text-sm">Neural Engine</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6">{{ __('spendee_ai_title') }}</h2>
                    <p class="text-slate-400 text-lg mb-8">{{ __('spendee_ai_desc') }}</p>
                </div>
                <div class="bg-gradient-to-br from-purple-600 to-indigo-800 p-10 rounded-[3rem] text-center shadow-2xl relative">
                    <div class="absolute inset-0 bg-white/5 rounded-[3rem]"></div>
                    <div class="text-4xl mb-4 relative z-10">🧠</div>
                    <div class="text-white font-bold text-lg italic relative z-10">"You overspend on days you are stressed. Let's schedule a walk in your planner."</div>
                </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div class="order-2 lg:order-1 bg-slate-800 p-8 rounded-3xl shadow-xl relative border border-slate-700">
                    <div class="space-y-4">
                        <div class="flex justify-between text-slate-400 line-through">
                            <span>Spendee Sub</span> <span>$20/yr</span>
                        </div>
                        <div class="flex justify-between text-slate-400 line-through">
                            <span>Habit App Sub</span> <span>$40/yr</span>
                        </div>
                        <div class="flex justify-between text-slate-400 line-through border-b border-slate-700 pb-4">
                            <span>Planner App Sub</span> <span>$50/yr</span>
                        </div>
                        <div class="flex justify-between text-white font-bold text-xl">
                            <span>OneForMind</span> <span class="text-purple-400">Better.</span>
                        </div>
                    </div>
                </div>
                <div class="order-1 lg:order-2">
                    <div class="text-pink-500 font-bold tracking-widest uppercase mb-4 text-sm">Consolidation</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6">{{ __('spendee_cost_title') }}</h2>
                    <p class="text-slate-400 text-lg mb-8">{{ __('spendee_cost_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: TABLE --}}
    <section class="py-24 bg-white border-t border-slate-100">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl text-slate-900 mb-6 font-black">{{ __('spendee_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('spendee_compare_desc') }}</p>
            </div>
            <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <div class="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-6 text-center font-black text-sm uppercase tracking-widest">
                    <div class="text-left text-slate-400">Features</div>
                    <div class="text-slate-400">{{ __('spendee_table_head_2') }}</div>
                    <div class="text-purple-600">OneForMind</div>
                </div>
                <div class="grid grid-cols-3 border-b border-slate-100 p-6 text-center items-center">
                    <div class="text-left font-bold text-slate-700">{{ __('spendee_table_row_1_title') }}</div>
                    <div class="text-slate-500">{{ __('spendee_table_row_1_col_1') }}</div>
                    <div class="font-bold text-purple-600 bg-purple-50 py-2 rounded-lg">{{ __('spendee_table_row_1_col_2') }}</div>
                </div>
                <div class="grid grid-cols-3 border-b border-slate-100 p-6 text-center items-center">
                    <div class="text-left font-bold text-slate-700">{{ __('spendee_table_row_2_title') }}</div>
                    <div class="text-slate-500">{{ __('spendee_table_row_2_col_1') }}</div>
                    <div class="font-bold text-purple-600 bg-purple-50 py-2 rounded-lg">{{ __('spendee_table_row_2_col_2') }}</div>
                </div>
                <div class="grid grid-cols-3 p-6 text-center items-center">
                    <div class="text-left font-bold text-slate-700">{{ __('spendee_table_row_3_title') }}</div>
                    <div class="text-slate-500">{{ __('spendee_table_row_3_col_1') }}</div>
                    <div class="font-bold text-purple-600 bg-purple-50 py-2 rounded-lg">{{ __('spendee_table_row_3_col_2') }}</div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: EXPLORE MORE ALTERNATIVES --}}
    <section class="py-24 bg-gray-50 border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-black text-gray-900 mb-4">{{ __('explore_more_alt') }}</h2>
                <p class="text-gray-500">{{ __('explore_more_desc') }}</p>
            </div>
            <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <a href="{{ route('compare.ynab') }}" class="group block bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-black">📈</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-purple-600 transition-colors">vs YNAB</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_ynab_desc') }}</p>
                </a>
                <a href="{{ route('compare.wallet') }}" class="group block bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-black">💳</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-purple-600 transition-colors">vs Wallet App</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_wallet_desc') }}</p>
                </a>
            </div>
        </div>
    </section>

    {{-- SECTION 7: CTA --}}
    <section class="py-32 bg-purple-600 text-center px-6">
        <h2 class="text-4xl md:text-6xl text-white font-black mb-6">{!! __('spendee_cta_title') !!}</h2>
        <p class="text-purple-200 text-xl mb-10">{{ __('spendee_cta_desc') }}</p>
        <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-white text-purple-900 font-black px-10 py-4 rounded-xl shadow-2xl hover:scale-105 transition-transform">{{ __('spendee_cta_btn') }}</a>
    </section>

@endsection