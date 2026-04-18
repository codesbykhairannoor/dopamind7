@extends('layouts.marketing')

@section('title', __('asana_alt_title'))

@section('meta')
    <meta name="description" content="{{ __('asana_alt_desc') }}">
    <meta property="og:title" content="{{ __('asana_alt_og_title') }}">
    <meta property="og:description" content="{{ __('asana_alt_og_desc') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (Indigo 600 Theme, Unique Layout) --}}
    <header class="pt-32 pb-24 px-6 bg-slate-900 relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black opacity-80"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div class="max-w-7xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs mb-8 uppercase tracking-wider border border-indigo-500/30 backdrop-blur-sm">
                ⚡ {{ __('asana_badge') }}
            </div>
            
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight max-w-5xl mx-auto">
                {{ __('asana_hero_title_1') }} <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">{{ __('asana_hero_title_2') }}</span>
            </h1>
            
            <p class="text-xl text-indigo-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                {!! __('asana_hero_desc') !!}
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/50 transition-all transform hover:-translate-y-1">
                    {{ __('asana_hero_cta') }}
                </a>
                <span class="text-sm text-slate-400 font-medium">{{ __('asana_hero_note') }}</span>
            </div>
        </div>
    </header>

    {{-- EXPLORE MORE ALTERNATIVES --}}
    <section class="py-8 bg-slate-800 border-b border-slate-700">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <span class="text-slate-400 py-2">Compare with:</span>
                
                <a href="{{ route('compare.monday') }}" class="text-indigo-400 hover:text-indigo-300 py-2 px-4 rounded-lg hover:bg-slate-700 transition">Monday.com</a>
                <a href="{{ route('compare.trello') }}" class="text-indigo-400 hover:text-indigo-300 py-2 px-4 rounded-lg hover:bg-slate-700 transition">Trello</a>
                <a href="{{ route('compare.asana') }}" class="text-indigo-400 hover:text-indigo-300 py-2 px-4 rounded-lg hover:bg-slate-700 transition">Asana</a>
                
            </div>
        </div>
    </section>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                    {{ __('asana_prob_title_1') }} <span class="text-indigo-600">{{ __('asana_prob_title_highlight') }}</span>
                </h2>
                <p class="text-lg text-slate-600 mb-8">{{ __('asana_prob_desc') }}</p>
                <ul class="space-y-4">
                    <li class="flex items-center gap-3 text-slate-700 font-medium">
                        <div class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</div>
                        {{ __('asana_prob_point_1') }}
                    </li>
                    <li class="flex items-center gap-3 text-slate-700 font-medium">
                        <div class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</div>
                        {{ __('asana_prob_point_2') }}
                    </li>
                    <li class="flex items-center gap-3 text-slate-700 font-medium">
                        <div class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</div>
                        {{ __('asana_prob_point_3') }}
                    </li>
                </ul>
            </div>
            <div class="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl relative">
                <div class="absolute -top-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full blur-2xl"></div>
                <div class="relative z-10 space-y-4 opacity-50 grayscale">
                    <div class="h-12 bg-white rounded-lg border border-slate-200 w-full"></div>
                    <div class="h-12 bg-white rounded-lg border border-slate-200 w-5/6"></div>
                    <div class="h-12 bg-white rounded-lg border border-slate-200 w-4/6"></div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center z-20">
                    <div class="bg-white px-6 py-3 rounded-full shadow-lg font-bold text-red-600 border border-red-100 rotate-12">
                        SYSTEM OVERLOAD
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION --}}
    <section class="py-24 bg-indigo-50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                    {{ __('asana_sol_title_1') }} <span class="text-indigo-600">{{ __('asana_sol_title_highlight') }}</span>
                </h2>
                <p class="text-xl text-slate-600">{{ __('asana_sol_desc') }}</p>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white p-8 rounded-3xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-xl mb-6 shadow-indigo-200 shadow-lg">✨</div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-3">{{ __('asana_sol_1_title') }}</h3>
                    <p class="text-slate-600">{{ __('asana_sol_1_desc') }}</p>
                </div>
                <div class="bg-white p-8 rounded-3xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-xl mb-6 shadow-indigo-200 shadow-lg">⚡</div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-3">{{ __('asana_sol_2_title') }}</h3>
                    <p class="text-slate-600">{{ __('asana_sol_2_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: FEATURE COMPARISON --}}
    <section class="py-24 bg-white">
        <div class="max-w-5xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-black text-slate-900 mb-4">{{ __('asana_compare_title') }}</h2>
                <p class="text-slate-500">{{ __('asana_compare_desc') }}</p>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th class="p-4 border-b-2 border-slate-100 text-slate-500 font-medium w-1/3">Feature</th>
                            <th class="p-4 border-b-2 border-slate-100 text-slate-400 font-medium w-1/3">{{ __('asana_table_head_2') }}</th>
                            <th class="p-4 border-b-2 border-indigo-600 text-indigo-600 font-black text-lg w-1/3 bg-indigo-50/50 rounded-t-xl">OneForMind</th>
                        </tr>
                    </thead>
                    <tbody class="text-slate-700">
                        <tr class="group hover:bg-slate-50 transition-colors">
                            <td class="p-4 border-b border-slate-100 font-semibold">{{ __('asana_table_row_1_title') }}</td>
                            <td class="p-4 border-b border-slate-100 text-slate-500">{{ __('asana_table_row_1_col_1') }}</td>
                            <td class="p-4 border-b border-indigo-100 font-bold text-indigo-700 bg-indigo-50/50">
                                <div class="flex items-center gap-2">
                                    <span class="text-indigo-500">✓</span> {{ __('asana_table_row_1_col_2') }}
                                </div>
                            </td>
                        </tr>
                        <tr class="group hover:bg-slate-50 transition-colors">
                            <td class="p-4 border-b border-slate-100 font-semibold">{{ __('asana_table_row_2_title') }}</td>
                            <td class="p-4 border-b border-slate-100 text-slate-500">{{ __('asana_table_row_2_col_1') }}</td>
                            <td class="p-4 border-b border-indigo-100 font-bold text-indigo-700 bg-indigo-50/50">
                                <div class="flex items-center gap-2">
                                    <span class="text-indigo-500">✓</span> {{ __('asana_table_row_2_col_2') }}
                                </div>
                            </td>
                        </tr>
                        <tr class="group hover:bg-slate-50 transition-colors">
                            <td class="p-4 border-b border-slate-100 font-semibold">{{ __('asana_table_row_3_title') }}</td>
                            <td class="p-4 border-b border-slate-100 text-slate-500">{{ __('asana_table_row_3_col_1') }}</td>
                            <td class="p-4 border-b border-indigo-100 font-bold text-indigo-700 bg-indigo-50/50 rounded-b-xl">
                                <div class="flex items-center gap-2">
                                    <span class="text-indigo-500">✓</span> {{ __('asana_table_row_3_col_2') }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    {{-- SECTION 5: THE PSYCHOLOGY --}}
    <section class="py-24 bg-slate-900 text-white">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1">
                <div class="p-8 bg-slate-800 rounded-3xl border border-slate-700">
                    <h3 class="text-2xl font-bold mb-4 text-indigo-400">{{ __('asana_psycho_title') }}</h3>
                    <p class="text-slate-300 leading-relaxed">{{ __('asana_psycho_desc') }}</p>
                </div>
            </div>
            <div class="order-1 md:order-2">
                <h2 class="text-3xl md:text-5xl font-black mb-6">{{ __('asana_data_title') }}</h2>
                <p class="text-xl text-slate-400 leading-relaxed">{{ __('asana_data_desc') }}</p>
            </div>
        </div>
    </section>

    {{-- SECTION 6: CTA --}}
    <section class="py-32 bg-white text-center">
        <div class="max-w-3xl mx-auto px-6">
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">{!! __('asana_cta_title') !!}</h2>
            <p class="text-xl text-slate-500 mb-10">{{ __('asana_cta_desc') }}</p>
            <a href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-600/30 transition transform hover:-translate-y-1">
                {{ __('asana_cta_btn') }}
            </a>
        </div>
    </section>

@endsection