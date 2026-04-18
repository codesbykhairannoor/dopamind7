@extends('layouts.marketing')

@section('title', __('notes_apps_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('notes_apps_meta_desc') }}">
    <meta property="og:title" content="{{ __('notes_apps_og_title') }}">
    <meta property="og:description" content="{{ __('notes_apps_og_desc') }}">
@endsection

@section('content')
    {{-- SECTION 1: HERO (Text Center, Animated Folder Background) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-slate-50 relative border-b border-slate-200">
        <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"></div>
        <div class="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 text-slate-700 font-bold text-xs mb-8 uppercase tracking-wider border border-slate-300 shadow-sm">
                {{ __('notes_apps_badge') }}
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                {{ __('notes_apps_hero_title_1') }} <br/>
                <span class="text-indigo-600 underline decoration-wavy decoration-indigo-200">{{ __('notes_apps_hero_title_2') }}</span>
            </h1>
            <p class="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                {!! __('notes_apps_hero_desc') !!}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-slate-900 text-white font-bold px-10 py-5 rounded-2xl hover:bg-indigo-600 transition-colors shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 transform">
                    {{ __('notes_apps_hero_cta') }}
                </a>
            </div>
            <p class="mt-4 text-xs text-slate-400 font-medium">{{ __('notes_apps_hero_note') }}</p>
        </div>
    </header>

    {{-- SECTION 2: EXPLORE ALTERNATIVES (Grid of 3) --}}
    <section class="py-16 bg-white border-b border-slate-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Compare Head-to-Head</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-6">
                <a href="{{ route('compare.evernote') }}" class="group block bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-1">
                    <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl font-black mb-4">🐘</div>
                    <h3 class="font-black text-xl text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">vs Evernote</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">{{ __('explore_evernote_desc') }}</p>
                </a>
                
                <a href="{{ route('compare.applenotes') }}" class="group block bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-300 transform hover:-translate-y-1">
                    <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-2xl font-black mb-4">📝</div>
                    <h3 class="font-black text-xl text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">vs Apple Notes</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">{{ __('explore_applenotes_desc') }}</p>
                </a>
                
                <a href="{{ route('compare.onenote') }}" class="group block bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1">
                    <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl font-black mb-4">📓</div>
                    <h3 class="font-black text-xl text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">vs OneNote</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">{{ __('explore_onenote_desc') }}</p>
                </a>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE PROBLEM --}}
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1 relative h-[400px] flex items-center justify-center bg-slate-50 rounded-[3rem] border border-slate-100 p-8">
                <div class="absolute w-full h-full flex flex-col gap-4 overflow-hidden opacity-50 p-4">
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 h-16 translate-x-4"></div>
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 h-24 -translate-x-4"></div>
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 h-16 translate-x-8"></div>
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 h-32 -translate-x-2"></div>
                </div>
                <div class="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 text-center z-10 rotate-3">
                    <div class="text-4xl mb-4">🗑️</div>
                    <div class="font-black text-slate-800">Untitled Note (14)</div>
                    <div class="text-xs text-slate-400 mt-2">Last edited: 2 years ago</div>
                </div>
            </div>
            <div class="order-1 md:order-2">
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                    {{ __('notes_apps_prob_title_1') }} <span class="text-red-500 decoration-red-200 underline decoration-4 underline-offset-4">{{ __('notes_apps_prob_title_highlight') }}</span>
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('notes_apps_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-600">
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('notes_apps_prob_point_1') }}
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('notes_apps_prob_point_2') }}
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('notes_apps_prob_point_3') }}
                    </li>
                </ul>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE SOLUTION --}}
    <section class="py-24 bg-slate-950 text-white">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 class="text-3xl md:text-5xl font-black mb-6 leading-tight">
                    {{ __('notes_apps_sol_title_1') }} <span class="text-indigo-400">{{ __('notes_apps_sol_title_highlight') }}</span>
                </h2>
                <p class="text-slate-400 text-xl leading-relaxed mb-8">
                    {{ __('notes_apps_sol_desc') }}
                </p>
                <div class="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
                    <p class="text-white font-bold mb-2">💡 {{ __('notes_apps_sol_box_title') }}</p>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        {{ __('notes_apps_sol_box_desc') }}
                    </p>
                </div>
            </div>
            <div class="relative h-[400px] flex items-center justify-center">
                <div class="absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl opacity-50"></div>
                <div class="grid grid-cols-2 gap-4 relative z-10 w-full max-w-sm">
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center transform -translate-y-4">
                        <div class="text-3xl mb-2">🎯</div>
                        <div class="font-bold text-sm">Goal Tracked</div>
                    </div>
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center transform translate-y-4">
                        <div class="text-3xl mb-2">💰</div>
                        <div class="font-bold text-sm">Budget Met</div>
                    </div>
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center transform -translate-y-4">
                        <div class="text-3xl mb-2">🌱</div>
                        <div class="font-bold text-sm">Habit Built</div>
                    </div>
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center transform translate-y-4">
                        <div class="text-3xl mb-2">📅</div>
                        <div class="font-bold text-sm">Day Planned</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: TABLE --}}
    <section class="py-32 bg-slate-50">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl text-slate-900 mb-6 font-black">{{ __('notes_apps_compare_title') }}</h2>
                <p class="text-slate-500 text-xl">{{ __('notes_apps_compare_desc') }}</p>
            </div>
            <div class="bg-white rounded-[3rem] shadow-xl border border-slate-200 overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-100/50 border-b border-slate-200">
                            <th class="p-8 text-xs text-slate-500 uppercase tracking-widest w-1/3">{{ __('notes_apps_table_head_1') }}</th>
                            <th class="p-8 text-xs text-slate-500 uppercase tracking-widest w-1/3">{{ __('notes_apps_table_head_2') }}</th>
                            <th class="p-8 text-xs text-indigo-600 font-black uppercase tracking-widest w-1/3 bg-indigo-50/50">{{ __('notes_apps_table_head_3') }}</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr class="border-b border-slate-100">
                            <td class="p-8 font-bold text-slate-800">{{ __('notes_apps_table_row_1_title') }}</td>
                            <td class="p-8 text-slate-500">{{ __('notes_apps_table_row_1_col_1') }}</td>
                            <td class="p-8 font-bold text-indigo-600 bg-indigo-50/30">{{ __('notes_apps_table_row_1_col_2') }}</td>
                        </tr>
                        <tr class="border-b border-slate-100">
                            <td class="p-8 font-bold text-slate-800">{{ __('notes_apps_table_row_2_title') }}</td>
                            <td class="p-8 text-slate-500">{{ __('notes_apps_table_row_2_col_1') }}</td>
                            <td class="p-8 font-bold text-indigo-600 bg-indigo-50/30">{{ __('notes_apps_table_row_2_col_2') }}</td>
                        </tr>
                        <tr>
                            <td class="p-8 font-bold text-slate-800">{{ __('notes_apps_table_row_3_title') }}</td>
                            <td class="p-8 text-slate-500">{{ __('notes_apps_table_row_3_col_1') }}</td>
                            <td class="p-8 font-bold text-indigo-600 bg-indigo-50/30">{{ __('notes_apps_table_row_3_col_2') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    {{-- SECTION 6: CTA --}}
    <section class="py-32 bg-white text-center border-t border-slate-100">
        <div class="max-w-3xl mx-auto px-6">
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">Stop hoarding.<br>Start executing.</h2>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full text-xl hover:bg-indigo-700 transition transform hover:-translate-y-1 shadow-[0_20px_40px_rgba(79,70,229,0.3)] font-bold">
                Get Started Free
            </a>
        </div>
    </section>
@endsection