@extends('layouts.marketing')

@section('title', __('applenotes_badge'))

@section('content')
    {{-- SECTION 1: HERO (Text Center, Visual Bottom) --}}
    <header class="pt-32 pb-0 px-6 overflow-hidden bg-amber-50 relative border-b border-amber-100">
        <div class="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 mb-16">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold text-xs mb-8 uppercase tracking-wider border border-amber-200">
                {{ __('applenotes_badge') }}
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                {{ __('applenotes_hero_title_1') }} <br/>
                <span class="text-amber-600">{{ __('applenotes_hero_title_2') }}</span>
            </h1>
            <p class="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                {!! __('applenotes_hero_desc') !!}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-600 transition-colors shadow-xl hover:shadow-amber-500/30 hover:-translate-y-1 transform">
                    {{ __('applenotes_hero_cta') }}
                </a>
            </div>
            <p class="mt-4 text-xs text-slate-400 font-medium">{{ __('applenotes_hero_note') }}</p>
        </div>

        {{-- Visual Bottom --}}
        <div class="max-w-5xl mx-auto relative z-10 translate-y-12 hover:translate-y-4 transition-transform duration-700 animate-in slide-in-from-bottom-24 fade-in duration-1000 delay-300">
            <div class="bg-white border border-slate-200 rounded-t-[3rem] shadow-2xl p-8 md:p-12 overflow-hidden relative">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-amber-500/30 rounded-b-full"></div>
                <div class="flex flex-col md:flex-row gap-8 items-center justify-center">
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full text-center">
                        <div class="text-3xl mb-2">🛒</div>
                        <div class="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{{ __('applenotes_hero_visual_1') }}</div>
                        <div class="text-slate-900 text-xl font-black">{{ __('applenotes_hero_visual_2') }}</div>
                    </div>
                    <div class="text-amber-500 text-2xl font-black">→</div>
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full text-center">
                        <div class="text-3xl mb-2">🎯</div>
                        <div class="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{{ __('applenotes_hero_visual_3') }}</div>
                        <div class="text-indigo-600 text-xl font-black">{{ __('applenotes_hero_visual_4') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-24 bg-white border-t border-slate-100">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1">
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                    {{ __('applenotes_prob_title_1') }} <span class="text-amber-600">{{ __('applenotes_prob_title_highlight') }}</span>
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('applenotes_prob_desc') }}
                </p>
                <div class="bg-amber-50 p-6 rounded-2xl border border-amber-100 mb-6">
                    <p class="font-bold text-amber-800 text-sm mb-2">{{ __('applenotes_prob_visual_1') }}</p>
                    <p class="text-amber-700/80 text-sm italic">{{ __('applenotes_prob_visual_2') }}</p>
                    <div class="mt-4 pt-4 border-t border-amber-200/50 flex gap-2">
                        <span class="px-2 py-1 bg-white rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ __('applenotes_prob_visual_3') }}</span>
                    </div>
                </div>
            </div>
            
            <div class="order-1 md:order-2 relative h-[400px] flex items-center justify-center bg-slate-50 rounded-[3rem] border border-slate-100 p-8">
                <div class="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform rotate-2">
                    <div class="bg-amber-400 h-2 w-full"></div>
                    <div class="p-6">
                        <div class="text-xs font-bold text-slate-400 mb-4">{{ __('applenotes_prob_visual_4') }}</div>
                        <h3 class="text-2xl font-black text-slate-800 mb-4">{{ __('applenotes_prob_visual_5') }}</h3>
                        <ul class="space-y-3 text-slate-600 font-medium">
                            <li class="flex items-center gap-3"><div class="w-4 h-4 border-2 border-slate-300 rounded-sm"></div> {{ __('applenotes_prob_visual_6') }}</li>
                            <li class="flex items-center gap-3"><div class="w-4 h-4 border-2 border-slate-300 rounded-sm"></div> {{ __('applenotes_prob_visual_7') }}</li>
                            <li class="flex items-center gap-3"><div class="w-4 h-4 border-2 border-slate-300 rounded-sm"></div> {{ __('applenotes_prob_visual_8') }}</li>
                        </ul>
                        <div class="mt-8 text-center border-2 border-dashed border-red-200 bg-red-50 text-red-500 rounded-xl py-3 font-bold text-sm transform -rotate-6 scale-110 shadow-sm">
                            {{ __('applenotes_prob_visual_9') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION --}}
    <section class="py-24 bg-amber-50">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="relative h-[500px] flex items-center justify-center bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8">
                <div class="w-full space-y-4">
                    {{-- Interactive Habit Mockup --}}
                    <div class="bg-slate-900 rounded-2xl p-4 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform">
                        <div class="flex justify-between items-center mb-3">
                            <div class="text-white font-bold text-sm">{{ __('applenotes_sol_visual_1') }}</div>
                            <div class="text-xs font-black text-emerald-400 bg-emerald-400/20 px-2 py-1 rounded-md">{{ __('applenotes_sol_visual_2') }}</div>
                        </div>
                        <div class="flex gap-1">
                            @for($i=0; $i<7; $i++)
                                <div class="h-6 flex-1 rounded-sm bg-emerald-500"></div>
                            @endfor
                        </div>
                    </div>
                    
                    {{-- Interactive Finance Mockup --}}
                    <div class="bg-indigo-50 rounded-2xl p-4 shadow-lg border border-indigo-100 transform rotate-2 hover:rotate-0 transition-transform">
                        <div class="flex justify-between items-center mb-2">
                            <div class="text-indigo-900 font-bold text-sm">{{ __('applenotes_sol_visual_3') }}</div>
                            <div class="text-xs font-black text-indigo-600">$12 / $50</div>
                        </div>
                        <div class="w-full bg-indigo-200 rounded-full h-2">
                            <div class="bg-indigo-600 h-2 rounded-full w-1/4"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                    {{ __('applenotes_sol_title_1') }} <span class="text-indigo-600">{{ __('applenotes_sol_title_highlight') }}</span>
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('applenotes_sol_desc') }}
                </p>
                <div class="space-y-6">
                    <div class="flex gap-4">
                        <div class="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl shrink-0">📊</div>
                        <div>
                            <h4 class="font-bold text-slate-900">{{ __('applenotes_sol_point_1_title') }}</h4>
                            <p class="text-sm text-slate-500">{{ __('applenotes_sol_point_1_desc') }}</p>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl shrink-0">🔔</div>
                        <div>
                            <h4 class="font-bold text-slate-900">{{ __('applenotes_sol_point_2_title') }}</h4>
                            <p class="text-sm text-slate-500">{{ __('applenotes_sol_point_2_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE GAP IN NATIVE APPS --}}
    <section class="py-24 bg-white border-t border-slate-100">
        <div class="max-w-5xl mx-auto px-6">
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-6">❌</div>
                    <h3 class="font-bold text-slate-900 mb-2">{{ __('applenotes_gap_title') }}</h3>
                    <p class="text-slate-500 text-sm">{{ __('applenotes_gap_desc') }}</p>
                </div>
                <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-6">❌</div>
                    <h3 class="font-bold text-slate-900 mb-2">{{ __('applenotes_gap_title_2') }}</h3>
                    <p class="text-slate-500 text-sm">{{ __('applenotes_gap_desc_2') }}</p>
                </div>
                <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-6">❌</div>
                    <h3 class="font-bold text-slate-900 mb-2">{{ __('applenotes_gap_title_3') }}</h3>
                    <p class="text-slate-500 text-sm">{{ __('applenotes_gap_desc_3') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: ONEFORMIND ADVANTAGE --}}
    <section class="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(251,191,36,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 class="text-3xl font-black mb-6">{{ __('applenotes_adv_title') }}</h2>
            <p class="text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                {{ __('applenotes_adv_desc') }}
            </p>
            <div class="inline-block bg-slate-900 border border-slate-800 p-2 rounded-full">
                <div class="flex items-center gap-4 px-4 py-2">
                    <span class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span class="font-bold text-sm text-slate-300">{{ __('applenotes_adv_badge') }}</span>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: CTA --}}
    <section class="py-32 bg-white text-center border-t border-slate-100">
        <div class="max-w-3xl mx-auto px-6">
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">{{ __('applenotes_cta_title') }}</h2>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-slate-900 text-white px-12 py-5 rounded-full text-xl hover:bg-amber-600 transition transform hover:-translate-y-1 shadow-xl font-bold">
                {{ __('applenotes_cta_btn') }}
            </a>
        </div>
    </section>

    {{-- EXPLORE MORE ALTERNATIVES --}}
    <section class="py-8 bg-slate-900 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <span class="text-slate-400 py-2">Compare Notes Apps:</span>
                <a href="{{ route('compare.evernote') }}" class="text-slate-400 hover:text-emerald-400 py-2 px-4 rounded-lg hover:bg-emerald-900/30 transition">Evernote</a>
                <a href="{{ route('compare.applenotes') }}" class="text-amber-400 font-bold py-2 px-4 rounded-lg bg-amber-900/30 border border-amber-500/20">Apple Notes</a>
                <a href="{{ route('compare.onenote') }}" class="text-slate-400 hover:text-purple-400 py-2 px-4 rounded-lg hover:bg-purple-900/30 transition">OneNote</a>
            </div>
        </div>
    </section>
@endsection