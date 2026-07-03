@extends('layouts.marketing')

@section('title', __('clickup_alt_title'))

@section('meta')
    <meta name="description" content="{{ __('clickup_alt_desc') }}">
    <meta property="og:title" content="{{ __('clickup_alt_og_title') }}">
    <meta property="og:description" content="{{ __('clickup_alt_og_desc') }}">
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
    "item": "{{ url('/compare/planner-apps') }}"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "ClickUp Alternative",
    "item": "{{ url('/compare/clickup-alternative') }}"
  }]
},{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "{{ __('faq_clickup_q1') }}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "{{ __('faq_clickup_a1') }}"
    }
  }]
}]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (Text Center, Floating Elements) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-slate-950 relative border-b border-purple-900/50">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f46e511_1px,transparent_1px),linear-gradient(to_bottom,#4f46e511_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {{-- Floating UI Fragments --}}
        <div class="absolute top-24 left-[5%] bg-slate-800/80 border border-slate-700 rounded-lg p-3 text-xs text-slate-400 shadow-xl blur-[2px] opacity-60 animate-[pulse_5s_infinite] -rotate-6">Gantt View</div>
        <div class="absolute bottom-32 left-[10%] bg-slate-800/80 border border-slate-700 rounded-lg p-3 text-xs text-slate-400 shadow-xl blur-[1px] opacity-70 animate-[pulse_6s_infinite_1s] rotate-12">Custom Field 42</div>
        <div class="absolute top-40 right-[8%] bg-slate-800/80 border border-slate-700 rounded-lg p-3 text-xs text-slate-400 shadow-xl blur-[2px] opacity-50 animate-[pulse_4s_infinite_2s] rotate-6">Sprint Points</div>
        <div class="absolute bottom-24 right-[12%] bg-slate-800/80 border border-slate-700 rounded-lg p-3 text-xs text-slate-400 shadow-xl blur-[1px] opacity-80 animate-[pulse_7s_infinite_0.5s] -rotate-12">Dependencies</div>

        <div class="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div class="mb-4">
                <span class="text-purple-400 font-bold text-sm tracking-widest uppercase opacity-70">{{ __('seo_eyebrow_clickup') }}</span>
            </div>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs mb-8 uppercase tracking-wider border border-purple-500/30">
                <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                {{ __('clickup_badge') }}
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                {{ __('clickup_hero_title_1') }} <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{{ __('clickup_hero_title_2') }}</span>
            </h1>
            <p class="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed bg-slate-900/50 backdrop-blur-sm p-4 rounded-2xl inline-block border border-slate-800">
                {!! __('clickup_hero_desc') !!}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-purple-500 transition-all shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] hover:-translate-y-1 transform">
                    {{ __('clickup_hero_cta') }}
                </a>
            </div>
            <p class="mt-4 text-xs text-slate-500 font-medium">{{ __('clickup_hero_note') }}</p>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (Feature Bloat) --}}
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="order-2 lg:order-1">
                <div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-red-200 font-black">🏗️</div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('clickup_prob_title_1') }} <span class="text-red-500">{{ __('clickup_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('clickup_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-600">
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('clickup_prob_point_1') }}</li>
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('clickup_prob_point_2') }}</li>
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('clickup_prob_point_3') }}</li>
                </ul>
            </div>
            <div class="order-1 lg:order-2 bg-slate-100 p-8 rounded-3xl border border-slate-300 shadow-xl relative">
                <div class="flex gap-2 mb-4">
                    <div class="bg-white p-2 text-xs border border-slate-200 text-slate-400 rounded">Gantt View</div>
                    <div class="bg-white p-2 text-xs border border-slate-200 text-slate-400 rounded">Board View</div>
                    <div class="bg-white p-2 text-xs border border-slate-200 text-slate-400 rounded">Timeline View</div>
                    <div class="bg-white p-2 text-xs border border-slate-200 text-slate-400 rounded">+12 more</div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <div class="font-bold text-sm">Create Task</div>
                    <div class="grid grid-cols-2 gap-2">
                        <div class="bg-slate-50 p-2 text-xs border border-slate-200 text-slate-400">Assignee</div>
                        <div class="bg-slate-50 p-2 text-xs border border-slate-200 text-slate-400">Sprint Points</div>
                        <div class="bg-slate-50 p-2 text-xs border border-slate-200 text-slate-400">Custom Field 1</div>
                        <div class="bg-slate-50 p-2 text-xs border border-slate-200 text-slate-400">Dependencies</div>
                    </div>
                </div>
                <div class="mt-4 text-center text-xs text-slate-500 italic">"I just wanted to remember to drink water..."</div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION (Simplicity) --}}
    <section class="py-24 bg-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="bg-slate-800 p-12 rounded-[3rem] shadow-2xl border border-slate-700 relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent"></div>
                <div class="relative z-10 text-center">
                    <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🧘</div>
                    <div class="font-bold text-2xl mb-2">Zero Configuration</div>
                    <p class="text-slate-400 text-sm">Sign up and start executing in 30 seconds. The layout is fixed because we already designed the optimal workflow.</p>
                </div>
            </div>
            <div>
                <h2 class="text-4xl md:text-5xl mb-6 leading-tight font-black">
                    {{ __('clickup_sol_title_1') }} <span class="text-purple-400">{{ __('clickup_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-400 text-xl mb-8">
                    {{ __('clickup_sol_desc') }}
                </p>
                <div class="grid gap-6">
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h3 class="font-bold text-lg text-white mb-2">{{ __('clickup_sol_1_title') }}</h3>
                        <p class="text-slate-400 text-sm">{{ __('clickup_sol_1_desc') }}</p>
                    </div>
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h3 class="font-bold text-lg text-white mb-2">{{ __('clickup_sol_2_title') }}</h3>
                        <p class="text-slate-400 text-sm">{{ __('clickup_sol_2_desc') }}</p>
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
                    <div class="absolute inset-0 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
                    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative z-10">
                        <div class="text-4xl mb-4">😵</div>
                        <h3 class="font-bold text-slate-900 mb-2">Analysis Paralysis</h3>
                        <p class="text-slate-600 italic">"When a tool offers endless customization, users spend more energy customizing the tool than actually doing the work."</p>
                    </div>
                </div>
                <div class="order-1 lg:order-2">
                    <div class="text-purple-500 font-bold tracking-widest uppercase mb-4 text-sm">Behavioral Science</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('clickup_psycho_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('clickup_psycho_desc') }}</p>
                </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div class="text-indigo-500 font-bold tracking-widest uppercase mb-4 text-sm">Holistic Design</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('clickup_data_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('clickup_data_desc') }}</p>
                </div>
                <div class="bg-slate-900 p-8 rounded-3xl shadow-2xl relative text-white border border-slate-800">
                    <div class="flex items-center gap-4 bg-slate-800 p-4 rounded-2xl mb-4 border border-slate-700">
                        <div class="text-2xl">😊</div>
                        <div>
                            <div class="font-bold text-sm">Mood: Great</div>
                            <div class="text-xs text-slate-400">Captured in Journal</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                        <div class="text-2xl">💰</div>
                        <div>
                            <div class="font-bold text-sm">Budget: Healthy</div>
                            <div class="text-xs text-slate-400">Captured in Finance OS</div>
                        </div>
                    </div>
                    <div class="mt-4 text-center text-xs text-purple-400 font-bold uppercase tracking-widest">Enterprise tools don't track this.</div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: TABLE --}}
    <section class="py-24 bg-slate-50 border-t border-slate-200">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl text-slate-900 mb-6 font-black">{{ __('clickup_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('clickup_compare_desc') }}</p>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200">
                            <th class="p-6 text-slate-400 font-black uppercase tracking-widest text-sm">Feature</th>
                            <th class="p-6 text-slate-400 font-black uppercase tracking-widest text-sm w-1/3">{{ __('clickup_table_head_2') }}</th>
                            <th class="p-6 text-purple-600 font-black uppercase tracking-widest text-sm w-1/3 bg-purple-50/50">OneForMind</th>
                        </tr>
                    </thead>
                    <tbody class="text-slate-600">
                        <tr class="border-b border-slate-100">
                            <td class="p-6 font-bold text-slate-800">{{ __('clickup_table_row_1_title') }}</td>
                            <td class="p-6">{{ __('clickup_table_row_1_col_1') }}</td>
                            <td class="p-6 font-bold text-purple-600 bg-purple-50/50">{{ __('clickup_table_row_1_col_2') }}</td>
                        </tr>
                        <tr class="border-b border-slate-100">
                            <td class="p-6 font-bold text-slate-800">{{ __('clickup_table_row_2_title') }}</td>
                            <td class="p-6 text-red-500">{{ __('clickup_table_row_2_col_1') }}</td>
                            <td class="p-6 font-bold text-purple-600 bg-purple-50/50">{{ __('clickup_table_row_2_col_2') }}</td>
                        </tr>
                        <tr>
                            <td class="p-6 font-bold text-slate-800">{{ __('clickup_table_row_3_title') }}</td>
                            <td class="p-6 text-red-500">{{ __('clickup_table_row_3_col_1') }}</td>
                            <td class="p-6 font-bold text-purple-600 bg-purple-50/50">{{ __('clickup_table_row_3_col_2') }}</td>
                        </tr>
                    </tbody>
                </table>
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
                <a href="{{ route('compare.todoist') }}" class="group block bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl font-black">📝</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-purple-600 transition-colors">vs Todoist</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_todoist_desc') }}</p>
                </a>
                <a href="{{ route('compare.ticktick') }}" class="group block bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-black">✔️</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-purple-600 transition-colors">vs TickTick</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_ticktick_desc') }}</p>
                </a>
            </div>
        </div>
    </section>

    {{-- SECTION 7: CTA --}}
    <section class="py-32 bg-slate-950 text-center px-6">
        <h2 class="text-4xl md:text-6xl text-white font-black mb-6">{!! __('clickup_cta_title') !!}</h2>
        <p class="text-purple-200 text-xl mb-10 max-w-2xl mx-auto">{{ __('clickup_cta_desc') }}</p>
        <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-purple-600 text-white font-black px-12 py-5 rounded-2xl shadow-[0_15px_30px_rgba(168,85,247,0.3)] hover:scale-105 hover:bg-purple-500 transition-all">{{ __('clickup_cta_btn') }}</a>
    </section>

@endsection