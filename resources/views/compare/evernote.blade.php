@extends('layouts.marketing')

@section('title', __('evernote_badge'))

@section('content')
    {{-- SECTION 1: HERO (Text Left, Visual Right) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-slate-50 relative border-b border-emerald-100">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div class="animate-in fade-in slide-in-from-left-8 duration-1000">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs mb-8 uppercase tracking-wider border border-emerald-200">
                    {{ __('evernote_badge') }}
                </div>
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                    {{ __('evernote_hero_title_1') }} <br/>
                    <span class="text-emerald-600">{{ __('evernote_hero_title_2') }}</span>
                </h1>
                <p class="text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
                    {!! __('evernote_hero_desc') !!}
                </p>
                <div class="flex flex-col sm:flex-row items-start gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-600 transition-colors shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-1 transform">
                        {{ __('evernote_hero_cta') }}
                    </a>
                </div>
                <p class="mt-4 text-xs text-slate-400 font-medium">{{ __('evernote_hero_note') }}</p>
            </div>

            <div class="relative h-[400px] flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                <div class="absolute w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-50"></div>
                <div class="relative flex gap-6 items-center">
                    <div class="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-md flex flex-col items-center gap-4 transform -rotate-6 grayscale opacity-60">
                        <div class="text-5xl">🗄️</div>
                        <div class="font-bold text-slate-500 text-sm">Dead Storage</div>
                    </div>
                    <div class="text-2xl font-black text-slate-300">VS</div>
                    <div class="bg-white border-2 border-emerald-200 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 transform rotate-3">
                        <div class="text-6xl drop-shadow-md">🚀</div>
                        <div class="font-bold text-emerald-700">Active Progress</div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-24 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid md:grid-cols-2 gap-16 items-center">
                <div class="relative h-[400px] flex items-center justify-center bg-slate-50 rounded-[3rem] border border-slate-100 p-8 overflow-hidden">
                    {{-- Visual Representation of "The Collector's Fallacy" --}}
                    <div class="absolute inset-0 flex flex-col items-center justify-center opacity-30 blur-[1px]">
                        <div class="w-64 h-12 bg-white border border-slate-200 rounded-lg mb-2 shadow-sm transform -rotate-6 translate-x-4"></div>
                        <div class="w-72 h-16 bg-white border border-slate-200 rounded-lg mb-2 shadow-sm transform rotate-3 -translate-x-2"></div>
                        <div class="w-56 h-10 bg-white border border-slate-200 rounded-lg mb-2 shadow-sm transform -rotate-12 translate-x-8"></div>
                        <div class="w-80 h-20 bg-white border border-slate-200 rounded-lg shadow-sm transform rotate-6 -translate-x-4"></div>
                    </div>
                    <div class="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 text-center z-10 w-full max-w-sm">
                        <div class="text-4xl mb-4">📚</div>
                        <div class="font-black text-slate-800 text-xl mb-2">1,240 Notes</div>
                        <div class="text-sm text-slate-500 font-medium mb-4">"10 Ways to be Productive"</div>
                        <div class="w-full bg-slate-100 rounded-full h-2 mb-2">
                            <div class="bg-red-500 h-2 rounded-full w-0"></div>
                        </div>
                        <div class="text-xs font-bold text-red-500 uppercase tracking-widest">0 Actions Taken</div>
                    </div>
                </div>
                
                <div>
                    <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                        {{ __('evernote_prob_title_1') }} <span class="text-emerald-600">{{ __('evernote_prob_title_highlight') }}</span>
                    </h2>
                    <p class="text-slate-500 text-xl leading-relaxed mb-8">
                        {{ __('evernote_prob_desc') }}
                    </p>
                    <div class="space-y-4">
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold shrink-0">✕</div>
                            <div>
                                <h4 class="font-bold text-slate-900">Passive Storage</h4>
                                <p class="text-sm text-slate-500">Clipping articles doesn't mean you're learning. It's just digital hoarding.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold shrink-0">✕</div>
                            <div>
                                <h4 class="font-bold text-slate-900">No Accountability</h4>
                                <p class="text-sm text-slate-500">Evernote never asks you why you didn't work out today.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION --}}
    <section class="py-24 bg-emerald-950 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.15)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="text-center mb-16 max-w-3xl mx-auto">
                <h2 class="text-3xl md:text-5xl font-black mb-6">
                    {{ __('evernote_sol_title_1') }} <span class="text-emerald-400">{{ __('evernote_sol_title_highlight') }}</span>
                </h2>
                <p class="text-slate-400 text-xl leading-relaxed">
                    {{ __('evernote_sol_desc') }}
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-slate-900 border border-emerald-900/50 rounded-3xl p-8 hover:border-emerald-500/50 transition-colors group">
                    <div class="w-14 h-14 bg-emerald-900/50 text-emerald-400 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🌱</div>
                    <h3 class="text-xl font-bold mb-3">Habit Engine</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">Visual heatmaps and streaks that rewire your brain, instead of static checklists.</p>
                </div>
                <div class="bg-slate-900 border border-emerald-900/50 rounded-3xl p-8 hover:border-emerald-500/50 transition-colors group transform md:-translate-y-8">
                    <div class="w-14 h-14 bg-emerald-900/50 text-emerald-400 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">💰</div>
                    <h3 class="text-xl font-bold mb-3">Finance OS</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">Zero-based budgeting that forces you to give every dollar a job.</p>
                </div>
                <div class="bg-slate-900 border border-emerald-900/50 rounded-3xl p-8 hover:border-emerald-500/50 transition-colors group">
                    <div class="w-14 h-14 bg-emerald-900/50 text-emerald-400 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
                    <h3 class="text-xl font-bold mb-3">Focus Planner</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">Time-blocking calendar that connects your daily tasks to your long-term goals.</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: FEATURE COMPARISON TABLE --}}
    <section class="py-24 bg-white">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-black text-slate-900 mb-4">Evernote vs OneForMind</h2>
                <p class="text-slate-500">See the difference in architecture.</p>
            </div>
            <div class="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200">
                            <th class="p-6 text-xs text-slate-500 uppercase tracking-widest w-1/3">Feature</th>
                            <th class="p-6 text-xs text-slate-500 uppercase tracking-widest w-1/3">Evernote</th>
                            <th class="p-6 text-xs text-emerald-600 font-black uppercase tracking-widest w-1/3 bg-emerald-50/50">OneForMind</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr class="border-b border-slate-100">
                            <td class="p-6 font-bold text-slate-800">Core Paradigm</td>
                            <td class="p-6 text-slate-500">Document Storage</td>
                            <td class="p-6 font-bold text-emerald-600 bg-emerald-50/30">Action Engine</td>
                        </tr>
                        <tr class="border-b border-slate-100">
                            <td class="p-6 font-bold text-slate-800">Habit Tracking</td>
                            <td class="p-6 text-slate-500">Checkboxes in notes</td>
                            <td class="p-6 font-bold text-emerald-600 bg-emerald-50/30">Native Visual Heatmaps</td>
                        </tr>
                        <tr>
                            <td class="p-6 font-bold text-slate-800">Financial OS</td>
                            <td class="p-6 text-slate-500">Tables (Manual Math)</td>
                            <td class="p-6 font-bold text-emerald-600 bg-emerald-50/30">Automated Wealth Dashboard</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    {{-- SECTION 5: PSYCHOLOGY OF ACTION --}}
    <section class="py-24 bg-slate-50 border-t border-slate-100">
        <div class="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 class="text-3xl font-black text-slate-900 mb-4">The Psychology of Action</h2>
                <p class="text-slate-500 leading-relaxed">
                    Notes apps create a false sense of accomplishment. You clip an article, you feel productive. But nothing has changed in your life. OneForMind removes the friction of setup and forces you to face your daily actions.
                </p>
            </div>
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
                <div class="absolute top-0 right-0 p-4 text-emerald-500 font-black text-4xl opacity-20">"</div>
                <p class="font-medium text-slate-700 italic relative z-10 text-lg">
                    Stop collecting the past.<br>Start building the future.
                </p>
            </div>
        </div>
    </section>

    {{-- SECTION 6: CTA --}}
    <section class="py-32 bg-white text-center border-t border-slate-100">
        <div class="max-w-3xl mx-auto px-6">
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">Ready to graduate?</h2>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-emerald-600 text-white px-12 py-5 rounded-full text-xl hover:bg-emerald-700 transition transform hover:-translate-y-1 shadow-[0_20px_40px_rgba(16,185,129,0.3)] font-bold">
                Start Your Engine
            </a>
        </div>
    </section>
    
    {{-- EXPLORE MORE ALTERNATIVES --}}
    <section class="py-8 bg-slate-50 border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <span class="text-slate-400 py-2">Compare Notes Apps:</span>
                <a href="{{ route('compare.evernote') }}" class="text-emerald-600 font-bold py-2 px-4 rounded-lg bg-emerald-50">Evernote</a>
                <a href="{{ route('compare.applenotes') }}" class="text-slate-600 hover:text-amber-600 py-2 px-4 rounded-lg hover:bg-amber-50 transition">Apple Notes</a>
                <a href="{{ route('compare.onenote') }}" class="text-slate-600 hover:text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition">OneNote</a>
            </div>
        </div>
    </section>
@endsection