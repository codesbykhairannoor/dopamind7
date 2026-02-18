@extends('layouts.marketing')

@section('title', __('journal_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('journal_meta_desc') }}">
    <meta property="og:title" content="{{ __('journal_meta_og_title') }}">
    <meta property="og:description" content="{{ __('journal_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/features/journal') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (CENTERED LAYOUT + NOTION-STYLE EDITOR MOCKUP) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-gray-50 relative border-b border-gray-100">
        {{-- Background Glow --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>

        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    <span class="text-lg">📔</span> {{ __('journal_hero_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('journal_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('journal_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                    {{ __('journal_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        {{ __('journal_hero_cta_1') }}
                    </a>
                    <a href="#how-it-works" class="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-full font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition">
                        {{ __('journal_hero_cta_2') }}
                    </a>
                </div>
            </div>

            {{-- Floating Mockup Centered (Clean Editor Vibe) --}}
            <div class="relative w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both text-left">
                <div class="absolute -inset-1 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-[2.5rem] blur opacity-40"></div>
                <div class="relative bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white overflow-hidden transform transition hover:scale-[1.02] duration-500">
                    
                    {{-- Cover Image area --}}
                    <div class="h-24 bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 w-full opacity-80"></div>
                    
                    <div class="p-8 md:p-12 relative">
                        {{-- Floating Emoji Icon --}}
                        <div class="absolute -top-12 left-8 text-6xl bg-white rounded-2xl p-2 shadow-sm">🧠</div>
                        
                        <div class="flex justify-between items-start mt-4 mb-6">
                            <div>
                                <h3 class="font-black text-gray-900 text-3xl mb-2">{{ __('journal_mockup_title') }}</h3>
                                <p class="text-sm font-bold text-indigo-500 flex items-center gap-2">
                                    <span>📅 {{ __('journal_mockup_date') }}</span>
                                </p>
                            </div>
                            <div class="bg-gray-50 px-4 py-2 rounded-full border border-gray-100 flex items-center gap-2 shadow-sm">
                                <span class="text-sm font-bold text-gray-500">Mood:</span>
                                <span class="text-xl">✨</span>
                            </div>
                        </div>
                        
                        <div class="space-y-4 text-lg text-gray-600 font-serif leading-relaxed">
                            <p class="animate-pulse duration-[3000ms]">{{ __('journal_mockup_text_1') }}</p>
                            <p class="opacity-60">{{ __('journal_mockup_text_2') }}</p>
                            
                            {{-- Skeleton lines for writing illusion --}}
                            <div class="pt-4 space-y-3 opacity-30">
                                <div class="h-3 w-full bg-gray-300 rounded-full"></div>
                                <div class="h-3 w-5/6 bg-gray-300 rounded-full"></div>
                                <div class="h-3 w-4/6 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>

                        {{-- Floating Writing Indicator --}}
                        <div class="absolute right-8 bottom-8 flex items-center gap-2 text-indigo-500 text-sm font-bold bg-indigo-50 px-4 py-2 rounded-full animate-bounce duration-[2000ms]">
                            <span class="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                            {{ __('journal_mockup_typing') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: PROBLEM AWARENESS (OVERLAPPING MESSY CARDS) --}}
    <section class="py-32 bg-gray-50 overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            
            <div class="animate-in slide-in-from-left-12 fade-in duration-700 fill-mode-both">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                    {{ __('journal_prob_title_1') }} <br>
                    <span class="text-gray-300 line-through decoration-indigo-500 decoration-4">{{ __('journal_prob_title_strike') }}</span> <br>
                    <span class="text-indigo-600">{{ __('journal_prob_title_2') }}</span>
                </h2>
                <p class="text-xl text-gray-500 leading-relaxed mb-8 max-w-md">
                    {{ __('journal_prob_main_desc') }}
                </p>
            </div>

            {{-- Overlapping Cards Illusion --}}
            <div class="relative h-[450px] w-full animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both">
                {{-- Card 1 (Back) --}}
                <div class="absolute top-0 right-0 w-3/4 bg-white p-6 rounded-3xl shadow-lg border border-gray-100 transform rotate-6 opacity-60 transition hover:rotate-0 hover:z-30 hover:opacity-100 duration-500">
                    <div class="text-3xl mb-3">🤯</div>
                    <h3 class="font-bold text-gray-900 mb-2">{{ __('journal_prob_1_title') }}</h3>
                    <p class="text-sm text-gray-500">{{ __('journal_prob_1_desc') }}</p>
                </div>
                
                {{-- Card 2 (Middle) --}}
                <div class="absolute top-16 left-0 w-3/4 bg-indigo-50 p-6 rounded-3xl shadow-xl border border-indigo-100 transform -rotate-3 z-10 transition hover:-rotate-0 hover:z-30 duration-500">
                    <div class="text-3xl mb-3">🌪️</div>
                    <h3 class="font-bold text-indigo-900 mb-2">{{ __('journal_prob_2_title') }}</h3>
                    <p class="text-sm text-indigo-700/70">{{ __('journal_prob_2_desc') }}</p>
                </div>

                {{-- Card 3 (Front) --}}
                <div class="absolute bottom-10 right-10 w-3/4 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl border border-slate-700 transform rotate-2 z-20 hover:scale-105 transition duration-500">
                    <div class="text-3xl mb-3">📉</div>
                    <h3 class="font-bold text-white mb-2">{{ __('journal_prob_3_title') }}</h3>
                    <p class="text-sm text-slate-400">{{ __('journal_prob_3_desc') }}</p>
                </div>
            </div>

        </div>
    </section>

    {{-- SECTION 3: FOCUS MODE SHOWCASE (DARK ZEN MODE) --}}
    <section id="how-it-works" class="py-32 bg-slate-950 relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
        
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-indigo-300 font-bold text-xs mb-8 uppercase tracking-wider border border-slate-700">
                ✨ Zen Mode
            </div>
            <h2 class="text-4xl md:text-5xl font-black mb-6 text-white">{{ __('journal_feature_1_title') }}</h2>
            <p class="text-slate-400 text-lg md:text-xl leading-relaxed mb-16 max-w-2xl mx-auto">
                {{ __('journal_feature_1_desc') }}
            </p>

            {{-- Minimalist Editor Visual --}}
            <div class="bg-slate-900 border border-slate-800 rounded-t-3xl p-8 md:p-16 text-left shadow-2xl relative group">
                <div class="absolute top-4 left-4 flex gap-2 opacity-30 group-hover:opacity-100 transition">
                    <div class="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                
                <h3 class="text-3xl font-serif text-slate-200 mt-6 mb-6">"{{ __('journal_feature_1_point_1') }}"</h3>
                <div class="w-12 h-1 bg-indigo-500 rounded-full mb-8"></div>
                <p class="text-slate-400 font-serif text-lg leading-loose">
                    {{ __('journal_feature_1_point_2') }}
                </p>
                <div class="w-0.5 h-6 bg-indigo-500 animate-pulse mt-2"></div> {{-- Caret --}}
            </div>
        </div>
    </section>

    {{-- SECTION 4: MOOD & INSIGHTS (ZIG-ZAG) --}}
    <section class="py-32 bg-white">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="animate-in slide-in-from-left-12 fade-in duration-700 fill-mode-both">
                <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl mb-8 border border-indigo-100 transform rotate-3">📊</div>
                <h2 class="text-4xl font-black mb-6 text-gray-900">{{ __('journal_feature_2_title') }}</h2>
                <p class="text-gray-500 text-lg leading-relaxed mb-8">
                    {{ __('journal_feature_2_desc') }}
                </p>
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 font-bold text-gray-700 flex flex-col gap-2">
                        <span class="text-2xl">😊</span> {{ __('journal_feature_2_point_1') }}
                    </div>
                    <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 font-bold text-gray-700 flex flex-col gap-2">
                        <span class="text-2xl">📈</span> {{ __('journal_feature_2_point_2') }}
                    </div>
                </div>
            </div>
            
            <div class="relative h-[400px] bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[3rem] p-8 flex items-center justify-center overflow-hidden border border-indigo-100 animate-in slide-in-from-right-12 fade-in duration-700 fill-mode-both">
                {{-- Mockup Mood Graph --}}
                <div class="w-full bg-white p-6 rounded-2xl shadow-xl relative z-10 transform rotate-2 hover:rotate-0 transition duration-500">
                    <h4 class="font-bold text-gray-900 mb-6 flex justify-between">
                        Weekly Mood <span class="text-indigo-600">Great! ✨</span>
                    </h4>
                    <div class="flex items-end justify-between h-32 gap-2">
                        <div class="w-full bg-indigo-100 rounded-t-lg relative group"><div class="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg h-3/4 group-hover:opacity-80 transition"></div></div>
                        <div class="w-full bg-indigo-100 rounded-t-lg relative group"><div class="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg h-2/4 group-hover:opacity-80 transition"></div></div>
                        <div class="w-full bg-indigo-100 rounded-t-lg relative group"><div class="absolute bottom-0 w-full bg-purple-500 rounded-t-lg h-full group-hover:opacity-80 transition"></div></div>
                        <div class="w-full bg-indigo-100 rounded-t-lg relative group"><div class="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg h-4/5 group-hover:opacity-80 transition"></div></div>
                        <div class="w-full bg-indigo-100 rounded-t-lg relative group"><div class="absolute bottom-0 w-full bg-purple-500 rounded-t-lg h-[90%] group-hover:opacity-80 transition"></div></div>
                    </div>
                    <div class="flex justify-between mt-3 text-xs text-gray-400 font-bold">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: BENTO BOX (ASYMMETRICAL LAYOUT) --}}
    <section class="py-32 bg-gray-50 border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">{{ __('journal_bento_title') }}</h2>
                <p class="text-gray-500 text-xl max-w-2xl mx-auto">{{ __('journal_bento_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-6 auto-rows-min">
                {{-- Bento 1: Vertical Tall Box (Left) --}}
                <div class="md:col-span-1 md:row-span-2 bg-indigo-950 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition duration-500 flex flex-col justify-between h-full min-h-[400px]">
                    <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-600 rounded-full blur-[80px] opacity-40 group-hover:scale-150 transition duration-700"></div>
                    <div class="relative z-10">
                        <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-8 border border-white/20 group-hover:rotate-12 transition">🔒</div>
                        <h3 class="text-3xl font-black mb-4">{{ __('journal_bento_1_title') }}</h3>
                        <p class="text-indigo-200 leading-relaxed">{{ __('journal_bento_1_desc') }}</p>
                    </div>
                </div>
                
                {{-- Bento 2: Horizontal Flat Box (Top Right) --}}
                <div class="md:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-500 flex flex-col sm:flex-row gap-8 items-center group">
                    <div class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition">📸</div>
                    <div>
                        <h3 class="text-2xl font-black mb-3 text-gray-900">{{ __('journal_bento_2_title') }}</h3>
                        <p class="text-gray-500 leading-relaxed">{{ __('journal_bento_2_desc') }}</p>
                    </div>
                </div>

                {{-- Bento 3: Horizontal Flat Box (Bottom Right) --}}
                <div class="md:col-span-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-[2.5rem] p-8 md:p-10 border border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-500 flex flex-col sm:flex-row gap-8 items-center group">
                    <div class="w-20 h-20 bg-white text-indigo-600 rounded-full flex items-center justify-center text-4xl shrink-0 shadow-sm group-hover:rotate-[-12deg] transition">🔗</div>
                    <div>
                        <h3 class="text-2xl font-black mb-3 text-indigo-950">{{ __('journal_bento_3_title') }}</h3>
                        <p class="text-indigo-800/80 leading-relaxed">{{ __('journal_bento_3_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: QUOTE (BOOK/DIARY STYLE) --}}
    <section class="py-32 bg-white relative">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <div class="inline-block mb-8 relative">
                <span class="absolute -top-6 -left-8 text-7xl text-indigo-100 font-serif">"</span>
                <span class="absolute -bottom-10 -right-8 text-7xl text-indigo-100 font-serif rotate-180">"</span>
                <h2 class="text-3xl md:text-5xl font-serif italic text-gray-800 leading-relaxed relative z-10 px-8">
                    {{ __('journal_quote_text') }}
                </h2>
            </div>
            <div class="mt-8 flex items-center justify-center gap-4">
                <div class="w-12 h-1 bg-indigo-600 rounded-full"></div>
                <p class="font-bold tracking-widest uppercase text-sm text-gray-500">{{ __('journal_quote_author') }}</p>
                <div class="w-12 h-1 bg-indigo-600 rounded-full"></div>
            </div>
        </div>
    </section>

    {{-- SECTION 7: BOTTOM CTA (CLEAN MINIMALIST CIRCLE FOCUS) --}}
    <section class="py-32 bg-gray-50 px-6 relative overflow-hidden">
        {{-- Expanding Circle Background --}}
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100 rounded-full opacity-50 pointer-events-none"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200 rounded-full opacity-40 pointer-events-none"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-300 rounded-full opacity-30 pointer-events-none"></div>

        <div class="max-w-3xl mx-auto text-center relative z-10 bg-white/80 backdrop-blur-xl p-12 md:p-20 rounded-[3rem] shadow-2xl border border-white">
            <div class="text-5xl mb-6">🖋️</div>
            <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">{{ __('journal_cta_title') }}</h2>
            <p class="text-gray-500 text-xl mb-10">
                {{ __('journal_cta_desc') }}
            </p>
            <a href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                {{ __('journal_cta_btn') }}
            </a>
            <p class="mt-6 text-sm text-gray-400 font-medium">{{ __('journal_cta_note') }}</p>
        </div>
    </section>

@endsection