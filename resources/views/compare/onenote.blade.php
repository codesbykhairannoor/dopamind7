@extends('layouts.marketing')

@section('title', __('onenote_badge'))

@section('content')
    {{-- SECTION 1: HERO (Text Right, Visual Left) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-slate-950 relative border-b border-purple-900/50">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f46e511_1px,transparent_1px),linear-gradient(to_bottom,#4f46e511_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div class="order-2 lg:order-1 relative h-[400px] flex items-center justify-center animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                <div class="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl opacity-50"></div>
                <div class="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 w-80 transform -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-[0_20px_50px_rgba(168,85,247,0.15)]">
                    <div class="text-center mb-6 border-b border-slate-800 pb-4">
                        <div class="text-purple-400 uppercase tracking-widest text-xs font-black">Structured Life OS</div>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-slate-800 p-3 rounded-xl border border-slate-700 flex justify-between">
                            <span class="text-slate-400 text-sm">Finances</span>
                            <span class="text-emerald-400 font-bold text-sm">Healthy</span>
                        </div>
                        <div class="bg-slate-800 p-3 rounded-xl border border-slate-700 flex justify-between">
                            <span class="text-slate-400 text-sm">Habits</span>
                            <span class="text-indigo-400 font-bold text-sm">85% Rate</span>
                        </div>
                        <div class="bg-slate-800 p-3 rounded-xl border border-slate-700 flex justify-between">
                            <span class="text-slate-400 text-sm">Goals</span>
                            <span class="text-amber-400 font-bold text-sm">On Track</span>
                        </div>
                    </div>
                    <div class="absolute -right-6 -bottom-6 w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl rotate-12">
                        ✨
                    </div>
                </div>
            </div>

            <div class="order-1 lg:order-2 text-left animate-in fade-in slide-in-from-right-8 duration-1000">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/50 text-purple-300 font-bold text-xs mb-8 uppercase tracking-wider border border-purple-500/30">
                    <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                    {{ __('onenote_badge') }}
                </div>
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                    {{ __('onenote_hero_title_1') }} <br/>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{{ __('onenote_hero_title_2') }}</span>
                </h1>
                <p class="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                    {!! __('onenote_hero_desc') !!}
                </p>
                <div class="flex flex-col sm:flex-row items-start gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-purple-500 transition-all shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)]">
                        {{ __('onenote_hero_cta') }}
                    </a>
                </div>
                <p class="mt-4 text-xs text-slate-500 font-medium self-center sm:self-auto">{{ __('onenote_hero_note') }}</p>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-24 bg-slate-50">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                {{ __('onenote_prob_title_1') }} <span class="text-purple-600">{{ __('onenote_prob_title_highlight') }}</span>
            </h2>
            <p class="text-slate-500 text-xl leading-relaxed max-w-2xl mx-auto">
                {{ __('onenote_prob_desc') }}
            </p>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION --}}
    <section class="py-24 bg-white border-t border-slate-100">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                {{ __('onenote_sol_title_1') }} <span class="text-indigo-600">{{ __('onenote_sol_title_highlight') }}</span>
            </h2>
            <p class="text-slate-500 text-xl leading-relaxed max-w-2xl mx-auto">
                {{ __('onenote_sol_desc') }}
            </p>
        </div>
    </section>

    {{-- SECTION 4: THE COST OF CHAOS --}}
    <section class="py-24 bg-slate-50 border-t border-slate-100">
        <div class="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl transform -rotate-2">
                <div class="border-b border-slate-100 pb-4 mb-4">
                    <div class="w-1/2 h-4 bg-slate-200 rounded mb-2"></div>
                    <div class="w-3/4 h-3 bg-slate-100 rounded"></div>
                </div>
                <div class="flex gap-4">
                    <div class="w-12 h-12 bg-purple-100 rounded-full"></div>
                    <div class="flex-1 space-y-2">
                        <div class="w-full h-2 bg-slate-100 rounded"></div>
                        <div class="w-full h-2 bg-slate-100 rounded"></div>
                        <div class="w-2/3 h-2 bg-slate-100 rounded"></div>
                    </div>
                </div>
                <div class="mt-6 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Typical Note App Canvas</div>
            </div>
            <div>
                <h3 class="text-2xl font-black text-slate-900 mb-4">The blank page is your enemy.</h3>
                <p class="text-slate-500 leading-relaxed mb-6">
                    When you have infinite possibilities, you usually end up with nothing. A blank canvas forces you to make micro-decisions about formatting, layout, and structure every single time you want to record a habit or track an expense.
                </p>
                <ul class="space-y-3">
                    <li class="flex items-center gap-3 text-slate-600 font-medium">
                        <span class="text-purple-500">✓</span> No more formatting tables
                    </li>
                    <li class="flex items-center gap-3 text-slate-600 font-medium">
                        <span class="text-purple-500">✓</span> No more creating checkboxes
                    </li>
                    <li class="flex items-center gap-3 text-slate-600 font-medium">
                        <span class="text-purple-500">✓</span> Ready-made, beautiful UI
                    </li>
                </ul>
            </div>
        </div>
    </section>

    {{-- SECTION 5: FEATURE COMPARISON --}}
    <section class="py-24 bg-white border-t border-slate-100">
        <div class="max-w-4xl mx-auto px-6">
            <div class="bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl text-white">
                <div class="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 class="text-xl font-bold text-slate-400 mb-6">OneNote Approach</h3>
                        <div class="space-y-6">
                            <div>
                                <div class="font-bold text-white mb-1">Manual Formatting</div>
                                <div class="text-slate-500 text-sm">Spend 10 minutes making a budget table look okay.</div>
                            </div>
                            <div>
                                <div class="font-bold text-white mb-1">Static Checkboxes</div>
                                <div class="text-slate-500 text-sm">Click a box. Nothing happens. No streaks.</div>
                            </div>
                        </div>
                    </div>
                    <div class="relative">
                        <div class="absolute -left-6 top-0 bottom-0 w-px bg-slate-800 hidden md:block"></div>
                        <h3 class="text-xl font-bold text-purple-400 mb-6">OneForMind Advantage</h3>
                        <div class="space-y-6">
                            <div>
                                <div class="font-bold text-white mb-1">Automated Finance Dashboard</div>
                                <div class="text-slate-400 text-sm">Input the number. See the trend charts instantly.</div>
                            </div>
                            <div>
                                <div class="font-bold text-white mb-1">Intelligent Habit Engine</div>
                                <div class="text-slate-400 text-sm">Build streaks, earn neural insights, see heatmaps.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: CTA --}}
    <section class="py-32 bg-purple-50 text-center border-t border-purple-100">
        <div class="max-w-3xl mx-auto px-6">
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">Embrace Structure.</h2>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-purple-600 text-white px-12 py-5 rounded-full text-xl hover:bg-purple-700 transition transform hover:-translate-y-1 shadow-[0_20px_40px_rgba(168,85,247,0.3)] font-bold">
                Start Your System
            </a>
        </div>
    </section>

    {{-- EXPLORE MORE ALTERNATIVES --}}
    <section class="py-8 bg-slate-900 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <span class="text-slate-400 py-2">Compare Notes Apps:</span>
                <a href="{{ route('compare.evernote') }}" class="text-slate-400 hover:text-emerald-400 py-2 px-4 rounded-lg hover:bg-emerald-900/30 transition">Evernote</a>
                <a href="{{ route('compare.applenotes') }}" class="text-slate-400 hover:text-amber-400 py-2 px-4 rounded-lg hover:bg-amber-900/30 transition">Apple Notes</a>
                <a href="{{ route('compare.onenote') }}" class="text-purple-400 font-bold py-2 px-4 rounded-lg bg-purple-900/30 border border-purple-500/20">OneNote</a>
            </div>
        </div>
    </section>
@endsection