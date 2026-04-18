@extends('layouts.marketing')

@section('title', __('wallet_alt_title'))

@section('meta')
    <meta name="description" content="{{ __('wallet_alt_desc') }}">
    <meta property="og:title" content="{{ __('wallet_alt_og_title') }}">
    <meta property="og:description" content="{{ __('wallet_alt_og_desc') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (Text Left, Visual Right) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-white relative border-b border-blue-100">
        <div class="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-transparent pointer-events-none"></div>
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div class="animate-in fade-in slide-in-from-left-8 duration-1000">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm">
                    {{ __('wallet_badge') }}
                </div>
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                    {{ __('wallet_hero_title_1') }} <br/>
                    <span class="text-blue-600">{{ __('wallet_hero_title_2') }}</span>
                </h1>
                <p class="text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
                    {!! __('wallet_hero_desc') !!}
                </p>
                <div class="flex flex-col sm:flex-row items-start gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-blue-600 text-white font-black px-10 py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:-translate-y-1">
                        {{ __('wallet_hero_cta') }}
                    </a>
                    <p class="mt-4 text-xs text-slate-400 font-bold self-center sm:self-auto">{{ __('wallet_hero_note') }}</p>
                </div>
            </div>
            
            <div class="relative h-[500px] flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                <div class="absolute w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                <div class="relative bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl p-8 w-80 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-4 font-black">💸</div>
                        <h3 class="font-bold text-slate-900 text-xl">Log Expense</h3>
                        <p class="text-sm text-slate-400">Feel every transaction.</p>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                            <span class="text-slate-500 font-medium">Coffee</span>
                            <span class="font-bold text-slate-900">$4.50</span>
                        </div>
                        <button class="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-transform">
                            Confirm Purchase
                        </button>
                    </div>
                    <div class="absolute -right-6 -bottom-6 w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl shadow-xl animate-bounce">
                        💡
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (Automation Illusion) --}}
    <section class="py-24 bg-slate-50 overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="order-2 lg:order-1">
                <div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-red-200 font-black">🤖</div>
                <h2 class="text-4xl md:text-5xl mb-6 text-slate-900 leading-tight font-black">
                    {{ __('wallet_prob_title_1') }} <span class="text-red-500">{{ __('wallet_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('wallet_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-600">
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('wallet_prob_point_1') }}</li>
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('wallet_prob_point_2') }}</li>
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span> {{ __('wallet_prob_point_3') }}</li>
                </ul>
            </div>
            <div class="order-1 lg:order-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative text-center">
                <div class="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">Auto-Sync Report</div>
                <div class="space-y-3">
                    <div class="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100 line-through">-$50 Coffee (3 days ago)</div>
                    <div class="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100 line-through">-$120 Shoes (5 days ago)</div>
                    <div class="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100 line-through">-$80 Dinner (1 week ago)</div>
                </div>
                <div class="mt-6 text-xs text-slate-400 italic">"I didn't even realize I spent this much."</div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION (Friction) --}}
    <section class="py-24 bg-blue-600 text-white">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="bg-blue-800 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden border border-blue-700">
                <div class="absolute top-0 right-0 p-8 opacity-10 text-9xl font-black">✍️</div>
                <h3 class="font-black text-3xl mb-8 relative z-10">Active Intent</h3>
                <div class="space-y-4 relative z-10">
                    <div class="bg-white/10  border border-white/20 p-4 rounded-xl flex items-center gap-4">
                        <div class="text-2xl">⏳</div>
                        <div>
                            <div class="font-bold">5 Seconds of Friction</div>
                            <div class="text-xs text-blue-200">Forces you to think before you buy</div>
                        </div>
                    </div>
                    <div class="bg-white/10  border border-white/20 p-4 rounded-xl flex items-center gap-4">
                        <div class="text-2xl">🧠</div>
                        <div>
                            <div class="font-bold">Neural Awareness</div>
                            <div class="text-xs text-blue-200">Connects the purchase to your budget</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-4xl md:text-5xl mb-6 leading-tight font-black">
                    {{ __('wallet_sol_title_1') }} <span class="text-blue-300">{{ __('wallet_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-blue-100 text-xl mb-8 leading-relaxed">
                    {{ __('wallet_sol_desc') }}
                </p>
                <div class="grid gap-6">
                    <div class="bg-blue-700/50 p-6 rounded-2xl border border-blue-500/50">
                        <h3 class="font-bold text-lg mb-2">{{ __('wallet_sol_1_title') }}</h3>
                        <p class="text-blue-200 text-sm">{{ __('wallet_sol_1_desc') }}</p>
                    </div>
                    <div class="bg-blue-700/50 p-6 rounded-2xl border border-blue-500/50">
                        <h3 class="font-bold text-lg mb-2">{{ __('wallet_sol_2_title') }}</h3>
                        <p class="text-blue-200 text-sm">{{ __('wallet_sol_2_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: PSYCHOLOGY --}}
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div class="order-2 lg:order-1 relative">
                    <div class="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative z-10">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-black">💸</div>
                            <div>
                                <div class="font-bold text-slate-900">Cashless Effect</div>
                                <div class="text-sm text-slate-500">Cognitive Bias</div>
                            </div>
                        </div>
                        <p class="text-slate-600 italic">"The less it feels like spending money, the more you spend. Automation removes the pain of paying, leading to overspending."</p>
                    </div>
                </div>
                <div class="order-1 lg:order-2">
                    <div class="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">Behavioral Science</div>
                    <h2 class="text-3xl md:text-5xl font-black mb-6 text-slate-900">{{ __('wallet_science_title') }}</h2>
                    <p class="text-slate-500 text-lg mb-8">{{ __('wallet_science_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: TABLE --}}
    <section class="py-24 bg-slate-50 border-t border-slate-200">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl text-slate-900 mb-6 font-black">{{ __('wallet_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('wallet_compare_desc') }}</p>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200">
                            <th class="p-6 text-slate-400 font-black uppercase tracking-widest text-sm">Feature</th>
                            <th class="p-6 text-slate-400 font-black uppercase tracking-widest text-sm w-1/3">{{ __('wallet_table_head_2') }}</th>
                            <th class="p-6 text-blue-600 font-black uppercase tracking-widest text-sm w-1/3 bg-blue-50/50">OneForMind</th>
                        </tr>
                    </thead>
                    <tbody class="text-slate-600">
                        <tr class="border-b border-slate-100">
                            <td class="p-6 font-bold text-slate-800">{{ __('wallet_table_row_1_title') }}</td>
                            <td class="p-6">{{ __('wallet_table_row_1_col_1') }}</td>
                            <td class="p-6 font-bold text-blue-600 bg-blue-50/50">{{ __('wallet_table_row_1_col_2') }}</td>
                        </tr>
                        <tr class="border-b border-slate-100">
                            <td class="p-6 font-bold text-slate-800">{{ __('wallet_table_row_2_title') }}</td>
                            <td class="p-6 text-red-500">{{ __('wallet_table_row_2_col_1') }}</td>
                            <td class="p-6 font-bold text-blue-600 bg-blue-50/50">{{ __('wallet_table_row_2_col_2') }}</td>
                        </tr>
                        <tr>
                            <td class="p-6 font-bold text-slate-800">{{ __('wallet_table_row_3_title') }}</td>
                            <td class="p-6 text-red-500">{{ __('wallet_table_row_3_col_1') }}</td>
                            <td class="p-6 font-bold text-blue-600 bg-blue-50/50">{{ __('wallet_table_row_3_col_2') }}</td>
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
                <a href="{{ route('compare.ynab') }}" class="group block bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-black">📈</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-blue-600 transition-colors">vs YNAB</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_ynab_desc') }}</p>
                </a>
                <a href="{{ route('compare.spendee') }}" class="group block bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-black">📊</div>
                        <h3 class="font-black text-xl text-gray-900 group-hover:text-blue-600 transition-colors">vs Spendee</h3>
                    </div>
                    <p class="text-gray-500 text-sm">{{ __('explore_spendee_desc') }}</p>
                </a>
            </div>
        </div>
    </section>

    {{-- SECTION 7: CTA --}}
    <section class="py-32 bg-white text-center px-6 border-t border-slate-200">
        <h2 class="text-4xl md:text-6xl text-slate-900 font-black mb-6">{!! __('wallet_cta_title') !!}</h2>
        <p class="text-slate-500 text-xl mb-10 max-w-2xl mx-auto">{{ __('wallet_cta_desc') }}</p>
        <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-blue-600 text-white font-black px-12 py-5 rounded-2xl shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:scale-105 hover:bg-blue-700 transition-all">{{ __('wallet_cta_btn') }}</a>
    </section>

@endsection