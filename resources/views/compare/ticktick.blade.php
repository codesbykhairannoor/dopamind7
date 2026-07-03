@extends('layouts.marketing')

@section('title', __('ticktick_alt_title'))

@section('meta')
    <meta name="description" content="{{ __('ticktick_alt_desc') }}">
    <meta property="og:title" content="{{ __('ticktick_alt_og_title') }}">
    <meta property="og:description" content="{{ __('ticktick_alt_og_desc') }}">
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
    "item": "{{ url('/compare/productivity-apps') }}"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "TickTick Alternative",
    "item": "{{ url('/compare/ticktick-alternative') }}"
  }]
},{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "{{ __('faq_ticktick_q1') }}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "{{ __('faq_ticktick_a1') }}"
    }
  }]
}]
</script>
@endif
@endsection

@section('content')

    {{-- SECTION 1: HERO (Text Left, Visual Right) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-white relative border-b border-indigo-100">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-transparent pointer-events-none"></div>
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            
            <div class="animate-in fade-in slide-in-from-left-8 duration-1000">
                <div class="mb-4">
                    <span class="text-blue-600 font-bold text-sm tracking-widest uppercase opacity-70">{{ __('seo_eyebrow_ticktick') }}</span>
                </div>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-blue-200">
                    {{ __('ticktick_badge') }}
                </div>
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                    {{ __('ticktick_hero_title_1') }} <br/>
                    <span class="text-blue-600">{{ __('ticktick_hero_title_2') }}</span>
                </h1>
                <p class="text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
                    {!! __('ticktick_hero_desc') !!}
                </p>
                <div class="flex flex-col sm:flex-row items-start gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-blue-600 text-white font-black px-10 py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:-translate-y-1">
                        {{ __('ticktick_hero_cta') }}
                    </a>
                    <p class="mt-4 text-xs text-slate-400 font-bold self-center sm:self-auto">{{ __('ticktick_hero_note') }}</p>
                </div>
            </div>

            <div class="relative h-[400px] flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                <div class="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
                
                {{-- Hamster Wheel vs Mountain --}}
                <div class="relative flex flex-col gap-6">
                    <div class="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-md flex items-center gap-6 transform -rotate-2 hover:rotate-0 transition-transform">
                        <div class="text-5xl animate-[spin_4s_linear_infinite]">🐹</div>
                        <div>
                            <div class="font-bold text-slate-700">Endless Tasks</div>
                            <div class="text-xs text-slate-500">Checking boxes, going nowhere.</div>
                        </div>
                    </div>

                    <div class="text-center font-black text-slate-300">VS</div>

                    <div class="bg-white border-2 border-blue-200 rounded-3xl p-6 shadow-2xl flex items-center gap-6 transform rotate-2 hover:rotate-0 transition-transform">
                        <div class="text-5xl drop-shadow-md">⛰️</div>
                        <div>
                            <div class="font-bold text-blue-700">Vision Alignment</div>
                            <div class="text-xs text-blue-500 font-medium">Every task climbs the mountain.</div>
                        </div>
                        <div class="absolute -right-4 -top-4 w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl shadow-lg border border-emerald-200">✨</div>
                    </div>
                </div>
            </div>

        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (Productivity Mirage) --}}
    <section class="py-24 bg-slate-50 overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="order-2 lg:order-1">
                <div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-red-200 font-black">🏃</div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('ticktick_prob_title_1') }} <span class="text-red-500">{{ __('ticktick_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('ticktick_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-600">
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('ticktick_prob_point_1') }}</li>
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('ticktick_prob_point_2') }}</li>
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('ticktick_prob_point_3') }}</li>
                </ul>
            </div>
            <div class="order-1 lg:order-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative text-center group">
                <div class="text-6xl mb-4 group-hover:animate-spin">🐹</div>
                <div class="font-bold text-slate-700 text-xl mb-2">The Hamster Wheel</div>
                <p class="text-slate-500 text-sm">Running fast but going nowhere. 15 tasks completed today, but none of them moved the needle on your life goals.</p>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION (Top-Down Alignment) --}}
    <section class="py-24 bg-blue-600 text-white">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="bg-blue-800 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden border border-blue-700">
                <div class="absolute top-0 right-0 p-8 opacity-10 text-9xl font-black">⛰️</div>
                <div class="space-y-2 relative z-10 text-center">
                    <div class="bg-blue-500 text-white p-4 rounded-xl border border-blue-400 font-black shadow-lg">Goal: Financial Freedom</div>
                    <div class="text-blue-300">⬇</div>
                    <div class="bg-blue-600 text-white p-3 rounded-xl border border-blue-500 font-bold mx-8">Habit: No Eating Out</div>
                    <div class="text-blue-300">⬇</div>
                    <div class="bg-blue-700 text-white p-2 rounded-xl border border-blue-600 mx-16 text-sm">Task: Meal Prep Sunday</div>
                </div>
            </div>
            <div>
                <h2 class="text-4xl md:text-5xl mb-6 leading-tight font-black">
                    {{ __('ticktick_sol_title_1') }} <span class="text-blue-300">{{ __('ticktick_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-blue-100 text-xl mb-8 leading-relaxed">
                    {{ __('ticktick_sol_desc') }}
                </p>
                <div class="grid gap-6">
                    <div class="bg-blue-700/50 p-6 rounded-2xl border border-blue-500/50">
                        <h3 class="font-bold text-lg mb-2">{{ __('ticktick_sol_1_title') }}</h3>
                        <p class="text-blue-200 text-sm">{{ __('ticktick_sol_1_desc') }}</p>
                    </div>
                    <div class="bg-blue-700/50 p-6 rounded-2xl border border-blue-500/50">
                        <h3 class="font-bold text-lg mb-2">{{ __('ticktick_sol_2_title') }}</h3>
                        <p class="text-blue-200 text-sm">{{ __('ticktick_sol_2_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: PSYCHOLOGY & DATA --}}
    <section class="py-24 bg-white overflow-hidden border-t border-slate-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-16 mb-24 items-center">
                <div class="order-2 lg:order-1 relative">
                    <div class="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative z-10">
                        <div class="text-4xl mb-4">🧭</div>
                        <h3 class="font-bold text-slate-900 mb-2">Meaning > Activity</h3>
                        <p class="text-slate-600 italic">"He who has a 'why' to live for can bear almost any 'how'." - Nietzsche. When you know why you're doing a task, you're 80% more likely to finish it.</p>
                    </div>
                </div>
                <div class="order-1 lg:order-2">
                    <div class="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">Behavioral Science</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('ticktick_psycho_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('ticktick_psycho_desc') }}</p>
                </div>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div class="text-indigo-500 font-bold tracking-widest uppercase mb-4 text-sm">Premium Experience</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('ticktick_data_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('ticktick_data_desc') }}</p>
                </div>
                <div class="bg-slate-50 p-8 rounded-3xl shadow-lg border border-slate-200 text-center">
                    <div class="inline-block bg-white p-4 rounded-full shadow-md mb-6 border border-slate-100 text-3xl">🧘</div>
                    <div class="font-bold text-slate-800 text-xl mb-2">A Digital Sanctuary</div>
                    <p class="text-slate-500 text-sm">No cluttered menus. No ads. Just a calm space to do your best work.</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: TABLE --}}
    <section class="py-24 bg-slate-50 border-t border-slate-200">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl text-slate-900 mb-6 font-black">{{ __('ticktick_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('ticktick_compare_desc') }}</p>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="p-8 rounded-3xl border border-slate-200 bg-white opacity-80">
                    <h3 class="font-black text-slate-400 uppercase tracking-widest mb-8 text-center">{{ __('ticktick_table_head_2') }}</h3>
                    <ul class="space-y-6">
                        <li>
                            <div class="text-xs text-slate-400 font-bold uppercase mb-1">{{ __('ticktick_table_row_1_title') }}</div>
                            <div class="text-slate-700">{{ __('ticktick_table_row_1_col_1') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-slate-400 font-bold uppercase mb-1">{{ __('ticktick_table_row_2_title') }}</div>
                            <div class="text-slate-700">{{ __('ticktick_table_row_2_col_1') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-slate-400 font-bold uppercase mb-1">{{ __('ticktick_table_row_3_title') }}</div>
                            <div class="text-slate-700">{{ __('ticktick_table_row_3_col_1') }}</div>
                        </li>
                    </ul>
                </div>
                <div class="p-8 rounded-3xl border-2 border-blue-500 bg-white shadow-xl shadow-blue-100 relative">
                    <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">OneForMind</div>
                    <ul class="space-y-6 mt-4">
                        <li>
                            <div class="text-xs text-blue-500 font-bold uppercase mb-1">{{ __('ticktick_table_row_1_title') }}</div>
                            <div class="text-slate-900 font-bold">{{ __('ticktick_table_row_1_col_2') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-blue-500 font-bold uppercase mb-1">{{ __('ticktick_table_row_2_title') }}</div>
                            <div class="text-slate-900 font-bold">{{ __('ticktick_table_row_2_col_2') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-blue-500 font-bold uppercase mb-1">{{ __('ticktick_table_row_3_title') }}</div>
                            <div class="text-slate-900 font-bold">{{ __('ticktick_table_row_3_col_2') }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: EXPLORE MORE ALTERNATIVES --}}
    <section class="py-24 bg-white border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-black text-gray-900 mb-4">{{ __('explore_more_alt') }}</h2>
                <p class="text-gray-500">{{ __('explore_more_desc') }}</p>
            </div>
            <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <a href="{{ route('compare.todoist') }}" class="group block bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl font-black">📝</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-blue-600 transition-colors">vs Todoist</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_todoist_desc') }}</p>
                </a>
                <a href="{{ route('compare.clickup') }}" class="group block bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-black">🏢</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-blue-600 transition-colors">vs ClickUp</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_clickup_desc') }}</p>
                </a>
            </div>
        </div>
    </section>

    {{-- SECTION 7: CTA --}}
    <section class="py-32 bg-blue-600 text-center px-6">
        <h2 class="text-4xl md:text-6xl text-white font-black mb-6">{!! __('ticktick_cta_title') !!}</h2>
        <p class="text-blue-200 text-xl mb-10 max-w-2xl mx-auto">{{ __('ticktick_cta_desc') }}</p>
        <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-white text-blue-900 font-black px-12 py-5 rounded-2xl shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:scale-105 hover:bg-blue-50 transition-all">{{ __('ticktick_cta_btn') }}</a>
    </section>

@endsection