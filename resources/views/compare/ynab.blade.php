@extends('layouts.marketing')

@section('title', __('ynab_alt_title'))

@section('meta')
    <meta name="description" content="{{ __('ynab_alt_desc') }}">
    <meta property="og:title" content="{{ __('ynab_alt_og_title') }}">
    <meta property="og:description" content="{{ __('ynab_alt_og_desc') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (Visual Left, Text Right, Indigo 600 Dark Theme) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-slate-900 relative border-b border-slate-800">
        <div class="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl -z-10 translate-x-[-20%] translate-y-[-20%]"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div class="order-2 lg:order-1 relative h-[400px] lg:h-[500px] flex items-center justify-center">
                <div class="absolute w-64 h-64 bg-indigo-600 rounded-[2.5rem] transform -rotate-12 shadow-[0_0_50px_rgba(79,70,229,0.3)]"></div>
                <div class="absolute w-64 h-64 bg-slate-800 rounded-[2.5rem] transform rotate-6 border border-slate-700 shadow-2xl p-6 flex flex-col justify-between z-10">
                    <div class="flex justify-between items-start">
                        <div class="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center text-xl border border-indigo-500/30">💰</div>
                        <div class="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">On Track</div>
                    </div>
                    <div>
                        <div class="text-3xl font-black text-white mb-2">$0.00</div>
                        <div class="text-sm text-slate-400">Zero-Based Budgeting</div>
                    </div>
                    <div class="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div class="w-full h-full bg-indigo-500 rounded-full"></div>
                    </div>
                </div>
            </div>

            <div class="order-1 lg:order-2 text-left">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs mb-8 uppercase tracking-wider border border-indigo-500/30">
                    💸 {{ __('ynab_badge') }}
                </div>
                <h1 class="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                    {{ __('ynab_hero_title_1') }} <br/>
                    <span class="text-indigo-400">{{ __('ynab_hero_title_2') }}</span>
                </h1>
                <p class="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
                    {!! __('ynab_hero_desc') !!}
                </p>
                <div class="flex flex-col sm:flex-row items-start gap-4">
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-500 transition-colors shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:-translate-y-1 transform">
                        {{ __('ynab_hero_cta') }}
                    </a>
                    <p class="mt-4 text-xs text-slate-500 font-medium">{{ __('ynab_hero_note') }}</p>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="bg-slate-50 p-12 rounded-[3rem] border border-slate-200 relative group">
                <div class="text-center text-4xl mb-4 font-mono text-slate-400 group-hover:scale-105 transition-transform">
                    [ Spreadsheet Hell ]
                </div>
                <div class="space-y-2 font-mono text-xs text-slate-400">
                    <div class="bg-white p-2 border border-slate-200">Row 45: Coffee $4.50 - Assign Category</div>
                    <div class="bg-white p-2 border border-slate-200">Row 46: Gas $30.00 - Assign Category</div>
                    <div class="bg-red-50 p-2 border border-red-200 text-red-500">ERROR: Unassigned Funds</div>
                </div>
            </div>
            <div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('ynab_prob_title_1') }} <span class="text-red-500">{{ __('ynab_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('ynab_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-600">
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('ynab_prob_point_1') }}</li>
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('ynab_prob_point_2') }}</li>
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('ynab_prob_point_3') }}</li>
                </ul>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION --}}
    <section class="py-24 bg-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div>
                <h2 class="text-4xl md:text-5xl mb-6 leading-tight font-black">
                    {{ __('ynab_sol_title_1') }} <span class="text-emerald-400">{{ __('ynab_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-400 text-xl mb-8">
                    {{ __('ynab_sol_desc') }}
                </p>
                <div class="grid gap-6">
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h3 class="font-bold text-lg text-white mb-2">{{ __('ynab_sol_1_title') }}</h3>
                        <p class="text-slate-400 text-sm">{{ __('ynab_sol_1_desc') }}</p>
                    </div>
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h3 class="font-bold text-lg text-white mb-2">{{ __('ynab_sol_2_title') }}</h3>
                        <p class="text-slate-400 text-sm">{{ __('ynab_sol_2_desc') }}</p>
                    </div>
                </div>
            </div>
            <div class="bg-slate-800 p-8 rounded-[3rem] shadow-2xl border border-slate-700">
                <div class="w-full h-40 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl mb-6 flex items-center justify-center text-4xl shadow-inner">
                    💰
                </div>
                <div class="h-4 bg-slate-700 rounded-full w-full mb-3"><div class="h-full bg-emerald-500 rounded-full w-3/4"></div></div>
                <div class="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>Budget Safe</span>
                    <span class="text-emerald-400">75%</span>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: PSYCHOLOGY & COST --}}
    <section class="py-24 bg-white overflow-hidden border-t border-slate-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-16 mb-24 items-center">
                <div class="bg-red-50 p-10 rounded-[3rem] text-center border border-red-100">
                    <div class="text-red-900 font-black text-6xl mb-4">$109/yr</div>
                    <div class="text-red-700 font-bold mb-8">For a glorified spreadsheet.</div>
                    <div class="flex justify-center text-3xl">📉</div>
                </div>
                <div>
                    <div class="text-emerald-500 font-bold tracking-widest uppercase mb-4 text-sm">The Absurdity</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('ynab_cost_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('ynab_cost_desc') }}</p>
                </div>
            </div>
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div class="order-2 lg:order-1">
                    <div class="text-indigo-500 font-bold tracking-widest uppercase mb-4 text-sm">Behavioral Science</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('ynab_psycho_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('ynab_psycho_desc') }}</p>
                </div>
                <div class="order-1 lg:order-2 bg-slate-50 p-8 rounded-3xl shadow-xl relative border border-slate-200">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-black">🧠</div>
                        <div>
                            <div class="font-bold text-slate-900">Decision Fatigue</div>
                            <div class="text-sm text-slate-500">Cognitive Load</div>
                        </div>
                    </div>
                    <p class="text-slate-600 italic">"Micro-managing every single dollar leads to burnout. Visual macro-budgets keep you aware without the exhaustion."</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: TABLE --}}
    <section class="py-24 bg-slate-50 border-t border-slate-200">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl text-slate-900 mb-6 font-black">{{ __('ynab_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('ynab_compare_desc') }}</p>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="p-8 rounded-3xl border border-slate-200 bg-white opacity-80">
                    <h3 class="font-black text-slate-400 uppercase tracking-widest mb-8 text-center">{{ __('ynab_table_head_2') }}</h3>
                    <ul class="space-y-6">
                        <li>
                            <div class="text-xs text-slate-400 font-bold uppercase mb-1">{{ __('ynab_table_row_1_title') }}</div>
                            <div class="text-slate-700">{{ __('ynab_table_row_1_col_1') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-slate-400 font-bold uppercase mb-1">{{ __('ynab_table_row_2_title') }}</div>
                            <div class="text-slate-700">{{ __('ynab_table_row_2_col_1') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-slate-400 font-bold uppercase mb-1">{{ __('ynab_table_row_3_title') }}</div>
                            <div class="text-slate-700">{{ __('ynab_table_row_3_col_1') }}</div>
                        </li>
                    </ul>
                </div>
                <div class="p-8 rounded-3xl border-2 border-emerald-500 bg-white shadow-xl shadow-emerald-100 relative">
                    <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">OneForMind</div>
                    <ul class="space-y-6 mt-4">
                        <li>
                            <div class="text-xs text-emerald-500 font-bold uppercase mb-1">{{ __('ynab_table_row_1_title') }}</div>
                            <div class="text-slate-900 font-bold">{{ __('ynab_table_row_1_col_2') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-emerald-500 font-bold uppercase mb-1">{{ __('ynab_table_row_2_title') }}</div>
                            <div class="text-slate-900 font-bold">{{ __('ynab_table_row_2_col_2') }}</div>
                        </li>
                        <li>
                            <div class="text-xs text-emerald-500 font-bold uppercase mb-1">{{ __('ynab_table_row_3_title') }}</div>
                            <div class="text-slate-900 font-bold">{{ __('ynab_table_row_3_col_2') }}</div>
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
                <a href="{{ route('compare.wallet') }}" class="group block bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-black">💳</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-emerald-600 transition-colors">vs Wallet App</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_wallet_desc') }}</p>
                </a>
                <a href="{{ route('compare.spendee') }}" class="group block bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-black">📊</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-emerald-600 transition-colors">vs Spendee</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_spendee_desc') }}</p>
                </a>
            </div>
        </div>
    </section>

    {{-- SECTION 7: CTA --}}
    <section class="py-32 bg-slate-50 text-center px-6 border-t border-slate-200">
        <h2 class="text-4xl md:text-6xl text-slate-900 font-black mb-6">{!! __('ynab_cta_title') !!}</h2>
        <p class="text-slate-500 text-xl mb-10">{{ __('ynab_cta_desc') }}</p>
        <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-emerald-600 text-white font-black px-10 py-4 rounded-xl shadow-lg shadow-emerald-200 hover:scale-105 transition-transform">{{ __('ynab_cta_btn') }}</a>
    </section>

@endsection