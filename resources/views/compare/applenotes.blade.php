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
                        <div class="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Apple Notes</div>
                        <div class="text-slate-900 text-xl font-black">Buy Milk</div>
                    </div>
                    <div class="text-amber-500 text-2xl font-black">→</div>
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full text-center">
                        <div class="text-3xl mb-2">🎯</div>
                        <div class="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">OneForMind</div>
                        <div class="text-indigo-600 text-xl font-black">Build Wealth</div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-24 bg-white border-t border-slate-100">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                {{ __('applenotes_prob_title_1') }} <span class="text-amber-600">{{ __('applenotes_prob_title_highlight') }}</span>
            </h2>
            <p class="text-slate-500 text-xl leading-relaxed max-w-2xl mx-auto">
                {{ __('applenotes_prob_desc') }}
            </p>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION --}}
    <section class="py-24 bg-amber-50">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                {{ __('applenotes_sol_title_1') }} <span class="text-indigo-600">{{ __('applenotes_sol_title_highlight') }}</span>
            </h2>
            <p class="text-slate-500 text-xl leading-relaxed max-w-2xl mx-auto">
                {{ __('applenotes_sol_desc') }}
            </p>
        </div>
    </section>

    {{-- SECTION 4: THE GAP IN NATIVE APPS --}}
    <section class="py-24 bg-white border-t border-slate-100">
        <div class="max-w-5xl mx-auto px-6">
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-6">❌</div>
                    <h3 class="font-bold text-slate-900 mb-2">No Deadlines</h3>
                    <p class="text-slate-500 text-sm">Notes don't sync with your daily calendar schedule natively.</p>
                </div>
                <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-6">❌</div>
                    <h3 class="font-bold text-slate-900 mb-2">No Visuals</h3>
                    <p class="text-slate-500 text-sm">You can't see a heatmap of your 30-day meditation habit.</p>
                </div>
                <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-6">❌</div>
                    <h3 class="font-bold text-slate-900 mb-2">No Accountability</h3>
                    <p class="text-slate-500 text-sm">It never nudges you when you are falling behind your goals.</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: ONEFORMIND ADVANTAGE --}}
    <section class="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(251,191,36,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 class="text-3xl font-black mb-6">The All-in-One Alternative</h2>
            <p class="text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                Stop jumping between Apple Notes, Apple Calendar, and random budget apps. Unify your life into a single, cohesive dashboard that actively works for you.
            </p>
            <div class="inline-block bg-slate-900 border border-slate-800 p-2 rounded-full">
                <div class="flex items-center gap-4 px-4 py-2">
                    <span class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span class="font-bold text-sm text-slate-300">Live OS Active</span>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: CTA --}}
    <section class="py-32 bg-white text-center border-t border-slate-100">
        <div class="max-w-3xl mx-auto px-6">
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">Make the switch today.</h2>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-slate-900 text-white px-12 py-5 rounded-full text-xl hover:bg-amber-600 transition transform hover:-translate-y-1 shadow-xl font-bold">
                Get Started Free
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