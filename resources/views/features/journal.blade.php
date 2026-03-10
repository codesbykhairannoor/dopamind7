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
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
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

    {{-- NEW SECTION 2: EDITORIAL REFLECTION (SERIF & CLEAN) --}}
    <section class="py-24 bg-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                {{ __('journal_editorial_badge') }}
            </div>
            <h2 class="text-5xl md:text-7xl font-serif italic text-gray-900 mb-10 leading-[1.1] tracking-tight">
                {{ __('journal_editorial_title') }}
            </h2>
            <p class="text-gray-500 text-xl font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
                {{ __('journal_editorial_desc') }}
            </p>
            
            {{-- Visual: Premium Paper Mockup --}}
            <div class="relative max-w-2xl mx-auto group">
                <div class="absolute -inset-8 bg-gradient-to-b from-gray-50 to-transparent rounded-[4rem] -z-10 opacity-50 group-hover:opacity-100 transition duration-700"></div>
                <div class="bg-white p-12 md:p-24 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-gray-100 text-left relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[4rem]"></div>
                    <div class="font-serif text-2xl md:text-4xl text-gray-800 leading-[1.6] space-y-10 relative z-10">
                        <p class="border-b border-gray-100 pb-6">{{ __('journal_editorial_card_p1') }}</p>
                        <p class="border-b border-gray-100 pb-6 text-gray-300">{{ __('journal_editorial_card_p2') }}</p>
                        <div class="w-1.5 h-10 bg-indigo-600 animate-pulse inline-block align-middle ml-1 rounded-full"></div>
                    </div>
                </div>
                {{-- Decorative element: Fountain pen nib --}}
                <div class="absolute -bottom-8 -right-8 w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl transform rotate-12 group-hover:rotate-0 transition duration-500 border-4 border-white">🖋️</div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION 3: THE MOOD NEBULA --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        {{-- Nebula Backgrounds --}}
        <div class="absolute top-0 right-0 w-[1000px] h-[1000px] bg-purple-200/40 rounded-full blur-[150px] -mr-96 -mt-96 animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-indigo-200/40 rounded-full blur-[150px] -ml-96 -mb-96 animate-pulse duration-[5000ms]"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="flex flex-col lg:flex-row gap-24 items-center">
                <div class="flex-1 order-2 lg:order-1">
                    <div class="relative animate-in zoom-in-95 duration-1000">
                        {{-- Circular Gradient Visual --}}
                        <div class="w-full aspect-square max-w-lg mx-auto bg-white/80 backdrop-blur-xl rounded-full shadow-[0_50px_100px_rgba(0,0,0,0.1)] p-12 flex items-center justify-center relative group border border-white">
                            <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-pink-500/20 rounded-full animate-spin-slow group-hover:opacity-100 transition duration-1000"></div>
                            <div class="relative z-10 text-center">
                                <span class="text-8xl mb-6 block group-hover:scale-125 transition duration-700 drop-shadow-2xl">✨</span>
                                <h4 class="text-4xl font-black text-gray-900 mb-2">{{ __('journal_nebula_harmony') }}</h4>
                                <p class="text-gray-400 font-black uppercase tracking-[0.3em] text-xs">{{ __('journal_nebula_sentiment') }}</p>
                            </div>
                            
                            {{-- Orbits --}}
                            <div class="absolute inset-6 border border-indigo-100/50 rounded-full"></div>
                            <div class="absolute inset-16 border border-purple-100/50 rounded-full"></div>
                            
                            {{-- Floating Mood Dots --}}
                            <div class="absolute top-1/4 right-10 w-6 h-6 bg-indigo-500 rounded-full shadow-[0_0_30px_rgba(79,70,229,0.6)] animate-bounce border-4 border-white"></div>
                            <div class="absolute bottom-1/4 left-10 w-6 h-6 bg-purple-500 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.6)] animate-bounce delay-150 border-4 border-white"></div>
                             <div class="absolute top-1/2 left-6 w-5 h-5 bg-pink-500 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.6)] animate-pulse border-4 border-white"></div>
                        </div>
                    </div>
                </div>
                <div class="flex-1 order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                        {{ __('journal_nebula_badge') }}
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-tight">
                        {{ __('journal_nebula_title') }}
                    </h2>
                    <p class="text-gray-600 text-xl mb-12 leading-relaxed">
                        {{ __('journal_nebula_desc') }}
                    </p>
                    <div class="grid gap-8">
                        <div class="flex items-start gap-8 p-8 rounded-[2.5rem] bg-white hover:shadow-2xl transition duration-500 group border border-gray-100">
                            <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:rotate-12 transition">🔮</div>
                            <div>
                                <h4 class="text-xl font-black text-gray-900 mb-2">{{ __('journal_nebula_feature_1_title') }}</h4>
                                <p class="text-gray-500 font-medium">{{ __('journal_nebula_feature_1_desc') }}</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-8 p-8 rounded-[2.5rem] bg-white hover:shadow-2xl transition duration-500 group border border-gray-100">
                            <div class="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition">🌈</div>
                            <div>
                                <h4 class="text-xl font-black text-gray-900 mb-2">{{ __('journal_nebula_feature_2_title') }}</h4>
                                <p class="text-gray-500 font-medium">{{ __('journal_nebula_feature_2_desc') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE PHILOSOPHY (QUOTE) --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center animate-in zoom-in-95 fade-in duration-1000">
            <div class="text-9xl text-indigo-50 mb-4 font-serif leading-none italic select-none">"</div>
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 leading-[1.4] mb-12 tracking-tight italic font-serif">
                {{ __('journal_quote_text') }}
            </h2>
            <div class="flex flex-col items-center">
                <div class="w-24 h-2 bg-indigo-600 mb-8 rounded-full shadow-lg shadow-indigo-200"></div>
                <p class="text-indigo-600 font-black tracking-[0.5em] uppercase text-xs">{{ __('journal_quote_author') }}</p>
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
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                {{ __('journal_cta_btn') }}
            </a>
            <p class="mt-6 text-sm text-gray-400 font-medium">{{ __('journal_cta_note') }}</p>
        </div>
    </section>

@endsection
