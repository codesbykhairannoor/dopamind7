@extends('layouts.marketing')

@section('title', __('habitify_alt_title'))

@section('meta')
    <meta name="description" content="{{ __('habitify_alt_desc') }}">
    <meta property="og:title" content="{{ __('habitify_alt_og_title') }}">
    <meta property="og:description" content="{{ __('habitify_alt_og_desc') }}">
    <meta property="og:url" content="{{ url('/compare/habitify-alternative') }}">
@endsection

@section('json-ld')
@if(isset($seo_schema))
    <script type="application/ld+json">
        {!! $seo_schema !!}
    </script>
@else
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
    "name": "Habitify Alternative",
    "item": "{{ url('/compare/habitify-alternative') }}"
  }]
},{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "{{ __('faq_habitify_q1') }}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "{{ __('faq_habitify_a1') }}"
    }
  }]
}]
</script>
@endif
@endsection

@section('content')

    {{-- SECTION 1: HERO (Text Center, Floating Icons) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-white relative border-b border-indigo-100">
        <div class="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 to-transparent pointer-events-none"></div>
        
        {{-- Floating Icons --}}
        <div class="absolute top-20 left-[10%] w-16 h-16 bg-white border border-slate-100 shadow-lg rounded-2xl flex items-center justify-center text-3xl animate-[bounce_4s_infinite] opacity-80 z-0 rotate-12">📅</div>
        <div class="absolute bottom-20 left-[15%] w-12 h-12 bg-white border border-slate-100 shadow-lg rounded-full flex items-center justify-center text-2xl animate-[bounce_5s_infinite_0.5s] opacity-60 z-0 -rotate-12">🌱</div>
        <div class="absolute top-32 right-[10%] w-20 h-20 bg-white border border-slate-100 shadow-xl rounded-[1.5rem] flex items-center justify-center text-4xl animate-[bounce_6s_infinite_1s] opacity-90 z-0 -rotate-6">🧠</div>
        <div class="absolute bottom-32 right-[15%] w-14 h-14 bg-white border border-slate-100 shadow-md rounded-xl flex items-center justify-center text-2xl animate-[bounce_4.5s_infinite_0.2s] opacity-70 z-0 rotate-6">💰</div>

        <div class="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div class="mb-4">
                <span class="text-indigo-400 font-bold text-sm tracking-widest uppercase opacity-70">{{ __('seo_eyebrow_habitify') }}</span>
            </div>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm">
                {{ __('habitify_badge') }}
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                {{ __('habitify_hero_title_1') }} <br/>
                <span class="text-indigo-600">{{ __('habitify_hero_title_2') }}</span>
            </h1>
            <p class="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed bg-white/50 backdrop-blur-sm rounded-xl p-4 inline-block">
                {!! __('habitify_hero_desc') !!}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-indigo-600 text-white font-black px-10 py-5 rounded-2xl hover:bg-indigo-700 transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:-translate-y-1">
                    {{ __('habitify_hero_cta') }}
                </a>
            </div>
            <p class="mt-4 text-xs text-slate-400 font-bold">{{ __('habitify_hero_note') }}</p>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (Siloed Data) --}}
    <section class="py-24 bg-slate-50 overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="order-2 lg:order-1">
                <div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-red-200 font-black">🏝️</div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('habitify_prob_title_1') }} <span class="text-red-500">{{ __('habitify_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('habitify_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-600">
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('habitify_prob_point_1') }}</li>
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('habitify_prob_point_2') }}</li>
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('habitify_prob_point_3') }}</li>
                </ul>
            </div>
            <div class="order-1 lg:order-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative text-center">
                <div class="inline-block p-4 bg-slate-50 rounded-2xl border border-slate-100 text-3xl mb-4">📱</div>
                <div class="font-bold text-slate-700 mb-2">Habit App</div>
                <div class="text-sm text-slate-400 mb-8">(Doesn't know about your schedule)</div>
                
                <div class="h-px bg-red-200 w-full mb-8 relative">
                    <div class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-bold text-red-500 uppercase">Wall of Friction</div>
                </div>

                <div class="inline-block p-4 bg-slate-50 rounded-2xl border border-slate-100 text-3xl mb-4">📅</div>
                <div class="font-bold text-slate-700 mb-2">Calendar App</div>
                <div class="text-sm text-slate-400">(Doesn't know about your habits)</div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION (Cross-Pollination) --}}
    <section class="py-24 bg-white">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="bg-indigo-600 p-12 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
                <div class="absolute top-0 right-0 p-8 opacity-10 text-9xl font-black">🧬</div>
                <h3 class="font-black text-3xl mb-8 relative z-10">The Unified Brain</h3>
                <div class="space-y-4 relative z-10">
                    <div class="bg-white/10  border border-white/20 p-4 rounded-xl flex items-center gap-4">
                        <div class="text-2xl">⚡</div>
                        <div>
                            <div class="font-bold">Habits</div>
                            <div class="text-xs text-indigo-200">Feeds the Planner</div>
                        </div>
                    </div>
                    <div class="bg-white/10  border border-white/20 p-4 rounded-xl flex items-center gap-4">
                        <div class="text-2xl">📅</div>
                        <div>
                            <div class="font-bold">Planner</div>
                            <div class="text-xs text-indigo-200">Schedules the Habits</div>
                        </div>
                    </div>
                    <div class="bg-white/10  border border-white/20 p-4 rounded-xl flex items-center gap-4">
                        <div class="text-2xl">💰</div>
                        <div>
                            <div class="font-bold">Finance OS</div>
                            <div class="text-xs text-indigo-200">Tracks the outcome</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('habitify_sol_title_1') }} <span class="text-indigo-600">{{ __('habitify_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl mb-8 leading-relaxed">
                    {{ __('habitify_sol_desc') }}
                </p>
                <div class="grid gap-6">
                    <div class="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <h3 class="font-bold text-lg text-indigo-900 mb-2">{{ __('habitify_sol_1_title') }}</h3>
                        <p class="text-indigo-700 text-sm">{{ __('habitify_sol_1_desc') }}</p>
                    </div>
                    <div class="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <h3 class="font-bold text-lg text-indigo-900 mb-2">{{ __('habitify_sol_2_title') }}</h3>
                        <p class="text-indigo-700 text-sm">{{ __('habitify_sol_2_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: TABLE --}}
    <section class="py-24 bg-slate-50 border-t border-slate-200">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl text-slate-900 mb-6 font-black">{{ __('habitify_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('habitify_compare_desc') }}</p>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200">
                            <th class="p-6 text-slate-400 font-black uppercase tracking-widest text-sm">Feature</th>
                            <th class="p-6 text-slate-400 font-black uppercase tracking-widest text-sm w-1/3">{{ __('habitify_table_head_2') }}</th>
                            <th class="p-6 text-indigo-600 font-black uppercase tracking-widest text-sm w-1/3 bg-indigo-50/50">OneForMind</th>
                        </tr>
                    </thead>
                    <tbody class="text-slate-600">
                        <tr class="border-b border-slate-100">
                            <td class="p-6 font-bold text-slate-800">{{ __('habitify_table_row_1_title') }}</td>
                            <td class="p-6">{{ __('habitify_table_row_1_col_1') }}</td>
                            <td class="p-6 font-bold text-indigo-600 bg-indigo-50/50">{{ __('habitify_table_row_1_col_2') }}</td>
                        </tr>
                        <tr class="border-b border-slate-100">
                            <td class="p-6 font-bold text-slate-800">{{ __('habitify_table_row_2_title') }}</td>
                            <td class="p-6 text-red-500">{{ __('habitify_table_row_2_col_1') }}</td>
                            <td class="p-6 font-bold text-indigo-600 bg-indigo-50/50">{{ __('habitify_table_row_2_col_2') }}</td>
                        </tr>
                        <tr>
                            <td class="p-6 font-bold text-slate-800">{{ __('habitify_table_row_3_title') }}</td>
                            <td class="p-6">{{ __('habitify_table_row_3_col_1') }}</td>
                            <td class="p-6 font-bold text-indigo-600 bg-indigo-50/50">{{ __('habitify_table_row_3_col_2') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    {{-- SECTION 4.5: COST & AI --}}
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-16 mb-24 items-center">
                <div class="bg-indigo-50 p-10 rounded-[3rem] text-center border border-indigo-100">
                    <div class="text-indigo-900 font-black text-6xl mb-4">$40/yr</div>
                    <div class="text-indigo-700 font-bold mb-8">Just for a checklist.</div>
                    <div class="flex justify-center text-3xl">💸</div>
                </div>
                <div>
                    <div class="text-red-500 font-bold tracking-widest uppercase mb-4 text-sm">The App Tax</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('habitify_cost_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('habitify_cost_desc') }}</p>
                </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div class="order-2 lg:order-1">
                    <div class="text-indigo-600 font-bold tracking-widest uppercase mb-4 text-sm">Beyond Charts</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('habitify_ai_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('habitify_ai_desc') }}</p>
                </div>
                <div class="order-1 lg:order-2 bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[3rem] shadow-2xl relative text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-6  border border-white/20">✨</div>
                    <div class="text-xl font-medium leading-relaxed italic mb-6">"I noticed your 'Junk Food' spending spikes by 40% on days when you miss your 'Morning Run' habit. Let's adjust your routine."</div>
                    <div class="text-indigo-200 text-sm font-bold">- Neural OS Coach</div>
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
                
                <a href="{{ route('compare.streaks') }}" class="group block bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-xl font-black">🔗</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-orange-600 transition-colors">vs Streaks</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_streaks_desc') }}</p>
                </a>
            </div>
        </div>
    </section>

    {{-- SECTION 5: CTA --}}
    <section class="py-32 bg-white text-center px-6">
        <h2 class="text-4xl md:text-6xl text-slate-900 font-black mb-6">{!! __('habitify_cta_title') !!}</h2>
        <p class="text-slate-500 text-xl mb-10 max-w-2xl mx-auto">{{ __('habitify_cta_desc') }}</p>
        <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white font-black px-12 py-5 rounded-2xl shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:scale-105 hover:bg-indigo-700 transition-all">{{ __('habitify_cta_btn') }}</a>
    </section>

@endsection