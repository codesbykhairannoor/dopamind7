@extends('layouts.marketing')

@section('title', __('todoist_alt_title'))

@section('meta')
    <meta name="description" content="{{ __('todoist_alt_desc') }}">
    <meta property="og:title" content="{{ __('todoist_alt_og_title') }}">
    <meta property="og:description" content="{{ __('todoist_alt_og_desc') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (Execution Theme) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-slate-900 relative border-b border-slate-800">
        <div class="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-300 font-bold text-xs mb-8 uppercase tracking-wider border border-red-500/30">
                <span class="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                {{ __('todoist_badge') }}
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                {{ __('todoist_hero_title_1') }} <br/>
                <span class="text-red-500">{{ __('todoist_hero_title_2') }}</span>
            </h1>
            <p class="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                {!! __('todoist_hero_desc') !!}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-red-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-red-500 transition-all shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:shadow-[0_0_60px_rgba(239,68,68,0.5)]">
                    {{ __('todoist_hero_cta') }}
                </a>
            </div>
            <p class="mt-4 text-xs text-slate-500 font-medium">{{ __('todoist_hero_note') }}</p>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (Endless Lists) --}}
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="order-2 lg:order-1">
                <div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-red-200 font-black">📝</div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('todoist_prob_title_1') }} <span class="text-red-500">{{ __('todoist_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('todoist_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-600">
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('todoist_prob_point_1') }}</li>
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('todoist_prob_point_2') }}</li>
                    <li class="flex items-center gap-4"><span class="text-red-500">✕</span> {{ __('todoist_prob_point_3') }}</li>
                </ul>
            </div>
            <div class="order-1 lg:order-2 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl">
                <div class="flex justify-between text-red-500 font-bold mb-4">
                    <span>Overdue (342)</span>
                </div>
                <div class="space-y-3 opacity-50 blur-[1px]">
                    <div class="flex items-center gap-3"><input type="checkbox" disabled> <span>Read book</span></div>
                    <div class="flex items-center gap-3"><input type="checkbox" disabled> <span>Call mom</span></div>
                    <div class="flex items-center gap-3"><input type="checkbox" disabled> <span>Build app</span></div>
                    <div class="flex items-center gap-3"><input type="checkbox" disabled> <span>Buy groceries</span></div>
                    <div class="flex items-center gap-3"><input type="checkbox" disabled> <span>Fix car</span></div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION (Time Blocking) --}}
    <section class="py-24 bg-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="bg-slate-800 p-8 rounded-[3rem] shadow-2xl border border-slate-700">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl">📅</div>
                    <div class="font-bold text-xl">Today's Timeline</div>
                </div>
                <div class="space-y-4">
                    <div class="flex gap-4">
                        <div class="text-slate-500 font-mono w-16 text-right">09:00</div>
                        <div class="bg-indigo-500 text-white p-3 rounded-lg flex-1 font-bold">Deep Work Block</div>
                    </div>
                    <div class="flex gap-4">
                        <div class="text-slate-500 font-mono w-16 text-right">11:00</div>
                        <div class="bg-slate-700 text-slate-300 p-3 rounded-lg flex-1">Emails & Slack</div>
                    </div>
                    <div class="flex gap-4">
                        <div class="text-slate-500 font-mono w-16 text-right">13:00</div>
                        <div class="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 p-3 rounded-lg flex-1 font-bold">Gym (Habit)</div>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-4xl md:text-5xl mb-6 leading-tight font-black">
                    {{ __('todoist_sol_title_1') }} <span class="text-red-400">{{ __('todoist_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-400 text-xl mb-8">
                    {{ __('todoist_sol_desc') }}
                </p>
                <div class="grid gap-6">
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h3 class="font-bold text-lg text-white mb-2">{{ __('todoist_sol_1_title') }}</h3>
                        <p class="text-slate-400 text-sm">{{ __('todoist_sol_1_desc') }}</p>
                    </div>
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h3 class="font-bold text-lg text-white mb-2">{{ __('todoist_sol_2_title') }}</h3>
                        <p class="text-slate-400 text-sm">{{ __('todoist_sol_2_desc') }}</p>
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
                    <div class="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-sm relative z-10">
                        <div class="text-3xl mb-4">🤯</div>
                        <h3 class="font-bold text-red-900 mb-2">Zeigarnik Effect in Action</h3>
                        <p class="text-red-700 text-sm leading-relaxed">Having 50 open tasks in a list means your brain keeps 50 background tabs open. Time-blocking closes the tabs because your brain knows exactly WHEN the task will be handled.</p>
                    </div>
                </div>
                <div class="order-1 lg:order-2">
                    <div class="text-red-500 font-bold tracking-widest uppercase mb-4 text-sm">Behavioral Science</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('todoist_psycho_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('todoist_psycho_desc') }}</p>
                </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div class="text-indigo-500 font-bold tracking-widest uppercase mb-4 text-sm">System Design</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('todoist_data_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('todoist_data_desc') }}</p>
                </div>
                <div class="bg-slate-900 p-8 rounded-3xl shadow-2xl relative text-white border border-slate-800">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-slate-800 p-4 rounded-xl text-center border border-slate-700">
                            <div class="text-3xl mb-2">📝</div>
                            <div class="font-bold text-sm">One-off Tasks</div>
                            <div class="text-xs text-slate-400 mt-1">Planner</div>
                        </div>
                        <div class="bg-indigo-600 p-4 rounded-xl text-center shadow-lg shadow-indigo-500/20">
                            <div class="text-3xl mb-2">🔄</div>
                            <div class="font-bold text-sm">Daily Habits</div>
                            <div class="text-xs text-indigo-200 mt-1">Habit Engine</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: TABLE --}}
    <section class="py-24 bg-slate-50 border-t border-slate-200">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl text-slate-900 mb-6 font-black">{{ __('todoist_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('todoist_compare_desc') }}</p>
            </div>
            <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <div class="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-6 text-center font-black text-sm uppercase tracking-widest">
                    <div class="text-left text-slate-400">Features</div>
                    <div class="text-slate-400">{{ __('todoist_table_head_2') }}</div>
                    <div class="text-red-600">OneForMind</div>
                </div>
                <div class="grid grid-cols-3 border-b border-slate-100 p-6 text-center items-center">
                    <div class="text-left font-bold text-slate-700">{{ __('todoist_table_row_1_title') }}</div>
                    <div class="text-slate-500">{{ __('todoist_table_row_1_col_1') }}</div>
                    <div class="font-bold text-red-600 bg-red-50 py-2 rounded-lg">{{ __('todoist_table_row_1_col_2') }}</div>
                </div>
                <div class="grid grid-cols-3 border-b border-slate-100 p-6 text-center items-center">
                    <div class="text-left font-bold text-slate-700">{{ __('todoist_table_row_2_title') }}</div>
                    <div class="text-slate-500">{{ __('todoist_table_row_2_col_1') }}</div>
                    <div class="font-bold text-red-600 bg-red-50 py-2 rounded-lg">{{ __('todoist_table_row_2_col_2') }}</div>
                </div>
                <div class="grid grid-cols-3 p-6 text-center items-center">
                    <div class="text-left font-bold text-slate-700">{{ __('todoist_table_row_3_title') }}</div>
                    <div class="text-slate-500">{{ __('todoist_table_row_3_col_1') }}</div>
                    <div class="font-bold text-red-600 bg-red-50 py-2 rounded-lg">{{ __('todoist_table_row_3_col_2') }}</div>
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
                <a href="{{ route('compare.ticktick') }}" class="group block bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-black">✔️</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-red-600 transition-colors">vs TickTick</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_ticktick_desc') }}</p>
                </a>
                <a href="{{ route('compare.clickup') }}" class="group block bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-black">🏢</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-red-600 transition-colors">vs ClickUp</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_clickup_desc') }}</p>
                </a>
            </div>
        </div>
    </section>

    {{-- SECTION 7: CTA --}}
    <section class="py-32 bg-slate-900 text-center px-6">
        <h2 class="text-4xl md:text-6xl text-white font-black mb-6">{!! __('todoist_cta_title') !!}</h2>
        <p class="text-slate-400 text-xl mb-10">{{ __('todoist_cta_desc') }}</p>
        <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-red-600 text-white font-black px-10 py-4 rounded-xl shadow-lg shadow-red-900/50 hover:scale-105 hover:bg-red-500 transition-transform">{{ __('todoist_cta_btn') }}</a>
    </section>

@endsection