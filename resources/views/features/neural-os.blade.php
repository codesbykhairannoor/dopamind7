@extends('layouts.marketing')

@section('title', __('neural_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('neural_meta_desc') }}">
    <meta property="og:title" content="{{ __('neural_meta_title') }}">
    <meta property="og:description" content="{{ __('neural_meta_desc') }}">
@endsection

@section('content')

    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO - THE NEURAL CORE --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-40 px-6 text-center relative overflow-hidden bg-white bg-pattern-dots">
        {{-- Deep Indigo & Purple Gradient Background --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-purple-50/50 via-white to-white rounded-full blur-[120px] -z-10"></div>
        
        <div class="max-w-5xl mx-auto relative z-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 shadow-sm text-purple-700 font-black text-[10px] mb-10 tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                </span>
                {{ __('neural_hero_badge') }}
            </div>
            
            <h1 class="text-6xl md:text-7xl lg:text-8xl font-black mb-10 leading-[0.95] tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {{ __('neural_hero_title_1') }}<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
                    {{ __('neural_hero_title_2') }}
                </span>
            </h1>
            
            <p class="text-lg md:text-xl text-slate-500 mb-14 leading-relaxed max-w-3xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
                {{ __('neural_hero_desc') }}
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center gap-5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 active:scale-95 group">
                    {{ __('neural_hero_cta_1') }}
                    <span class="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                </a>
                <a href="#audit" class="bg-white text-slate-700 border border-slate-200 px-12 py-6 rounded-3xl font-black text-xl hover:bg-slate-50 hover:border-slate-300 transition transform hover:-translate-y-1 active:scale-95">
                    {{ __('neural_hero_cta_2') }}
                </a>
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: INTERFACE PREVIEW - AI INSIGHTS --}}
    {{-- ================================================================= --}}
    <section class="py-20 bg-slate-900 relative overflow-hidden">
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0,transparent_50%)]"></div>
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="bg-slate-800 border border-slate-700 rounded-[3rem] overflow-hidden shadow-2xl">
                <div class="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-700">
                    {{-- Visual AI Simulation --}}
                    <div class="lg:w-3/5 p-12">
                        <div class="flex items-center gap-4 mb-8">
                            <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20">🧠</div>
                            <div class="text-left">
                                <p class="text-[10px] font-black uppercase tracking-widest text-slate-500">{{ __('neural_mockup_source') }}</p>
                                <p class="text-white font-black text-lg">Gemini Intelligence Layer</p>
                            </div>
                        </div>

                        {{-- Simulated Waveform / Graph --}}
                        <div class="h-64 bg-slate-900/50 rounded-3xl border border-slate-700/50 p-8 flex items-center justify-center relative overflow-hidden mb-8">
                            <div class="absolute inset-0 flex items-center justify-around px-8">
                                @for($i=1; $i<=20; $i++)
                                    <div class="w-1.5 bg-indigo-500/30 rounded-full animate-pulse" style="height: {{ rand(30, 90) }}%; animation-delay: {{ $i * 100 }}ms"></div>
                                @endfor
                            </div>
                            <div class="relative z-10 text-white font-black text-center">
                                <span class="bg-indigo-600 px-4 py-2 rounded-full text-xs uppercase tracking-widest shadow-xl">{{ __('neural_mockup_confidence') }}</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="p-6 bg-slate-700/30 rounded-2xl border border-slate-600/30 text-left">
                                <p class="text-indigo-400 font-bold text-xs mb-2">● REC-01</p>
                                <p class="text-slate-300 font-medium text-sm leading-relaxed">{{ __('neural_mockup_insight_1') }}</p>
                            </div>
                            <div class="p-6 bg-purple-700/30 rounded-2xl border border-purple-600/30 text-left">
                                <p class="text-purple-400 font-bold text-xs mb-2">● STRAT-02</p>
                                <p class="text-slate-300 font-medium text-sm leading-relaxed">{{ __('neural_mockup_insight_2') }}</p>
                            </div>
                        </div>
                    </div>

                    {{-- Contextual Explanation --}}
                    <div class="lg:w-2/5 p-12 flex flex-col justify-center text-left">
                        <h2 class="text-4xl font-black text-white mb-8 leading-tight">
                            {{ __('neural_gemini_powered') }}<br>
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Gemini Pro API</span>
                        </h2>
                        <ul class="space-y-6">
                            <li class="flex items-start gap-4">
                                <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">✓</div>
                                <p class="text-slate-400 font-medium">{{ __('neural_gemini_feat1') }}</p>
                            </li>
                            <li class="flex items-start gap-4">
                                <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">✓</div>
                                <p class="text-slate-400 font-medium">{{ __('neural_gemini_feat2') }}</p>
                            </li>
                            <li class="flex items-start gap-4">
                                <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">✓</div>
                                <p class="text-slate-400 font-medium">{{ __('neural_gemini_feat3') }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: FRICTION AUDIT --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white scroll-mt-20" id="audit">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row gap-20 items-center">
                <div class="lg:w-1/2">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-black text-[10px] mb-8 uppercase tracking-widest border border-emerald-100">
                        {{ __('neural_audit_badge') }}
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                        {{ __('neural_audit_title') }}
                    </h2>
                    <p class="text-slate-500 text-xl font-medium leading-relaxed mb-12">
                        {{ __('neural_audit_desc') }}
                    </p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <div class="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl mb-6">📉</div>
                            <h3 class="text-xl font-black text-slate-900 mb-4 tracking-wide">{{ __('neural_audit_step1_title') }}</h3>
                            <p class="text-slate-500 font-bold text-sm leading-relaxed">{{ __('neural_audit_step1_desc') }}</p>
                        </div>
                        <div>
                            <div class="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl mb-6">🌍</div>
                            <h3 class="text-xl font-black text-slate-900 mb-4 tracking-wide">{{ __('neural_audit_step2_title') }}</h3>
                            <p class="text-slate-500 font-bold text-sm leading-relaxed">{{ __('neural_audit_step2_desc') }}</p>
                        </div>
                    </div>
                </div>

                <div class="lg:w-1/2 relative">
                    <div class="relative bg-slate-50 border border-slate-200 p-12 rounded-[3.5rem] shadow-inner">
                        <div class="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl transform rotate-3 hover:rotate-0 transition duration-700">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center">⚡</div>
                                <span class="text-slate-900 font-black tracking-tight">Audit Report: #482</span>
                            </div>
                            <div class="space-y-4">
                                <div class="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div class="h-full bg-indigo-500 w-[70%]" style="animation: slide-in 1s ease-out"></div>
                                </div>
                                <div class="h-4 w-[85%] bg-slate-100 rounded-full overflow-hidden">
                                    <div class="h-full bg-purple-500 w-[45%]" style="animation: slide-in 1s ease-out 0.2s"></div>
                                </div>
                                <p class="text-xs text-slate-500 font-bold italic pt-4">Identifying patterns from last 14 days...</p>
                            </div>
                        </div>
                        {{-- Decorative Elements --}}
                        <div class="absolute -top-6 -right-6 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl"></div>
                        <div class="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: DEEP SYNERGY --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-20">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-black text-[10px] mb-6 tracking-widest border border-indigo-200">
                    {{ __('neural_synergy_badge') }}
                </div>
                <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                    {{ __('neural_synergy_title') }}
                </h2>
                <p class="text-slate-500 text-xl font-medium leading-relaxed mb-0">
                    {{ __('neural_synergy_desc') }}
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 relative">
                <div class="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
                    <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition">💰</div>
                    <h3 class="text-2xl font-black text-slate-900 mb-4">{{ __('neural_synergy_fin_title') }}</h3>
                    <p class="text-slate-500 font-bold leading-relaxed">{{ __('neural_synergy_fin_desc') }}</p>
                </div>
                <div class="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
                    <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition">🌱</div>
                    <h3 class="text-2xl font-black text-slate-900 mb-4">{{ __('neural_synergy_hab_title') }}</h3>
                    <p class="text-slate-500 font-bold leading-relaxed">{{ __('neural_synergy_hab_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 5: AI GROWTH COACH --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-24 items-center">
                <div class="order-2 lg:order-1 relative">
                    {{-- Chat Simulation --}}
                    <div class="bg-slate-50 border border-slate-200 rounded-[3rem] p-8 shadow-inner overflow-hidden max-w-md mx-auto">
                        <div class="space-y-6">
                            <div class="flex flex-col items-start">
                                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-3 mb-1">{{ __('neural_coach_sender') }}</span>
                                <div class="bg-indigo-600 text-white p-4 rounded-2xl rounded-tl-none text-sm font-medium shadow-lg shadow-indigo-100 leading-relaxed">
                                    "{{ __('neural_coach_msg1') }}"
                                </div>
                            </div>
                            <div class="flex flex-col items-end">
                                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-3 mb-1">{{ __('neural_coach_user') }}</span>
                                <div class="bg-white border border-slate-200 text-slate-700 p-4 rounded-2xl rounded-tr-none text-sm font-bold shadow-sm">
                                    "{{ __('neural_coach_msg2') }}"
                                </div>
                            </div>
                            <div class="flex flex-col items-start translate-x-2">
                                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-3 mb-1">{{ __('neural_coach_sender') }}</span>
                                <div class="bg-emerald-600 text-white p-4 rounded-2xl rounded-tl-none text-sm font-medium shadow-lg shadow-emerald-100 leading-relaxed animate-pulse">
                                    "{{ __('neural_coach_msg3') }}"
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order-1 lg:order-2">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 font-black text-[10px] mb-8 uppercase tracking-widest border border-purple-100">
                        {{ __('neural_coach_badge') }}
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                        {{ __('neural_coach_title') }}
                    </h2>
                    <p class="text-slate-500 text-xl font-medium leading-relaxed mb-12">
                        {{ __('neural_coach_desc') }}
                    </p>

                    <ul class="space-y-4">
                        <li class="flex items-center gap-4 text-slate-700 font-bold">
                            <span class="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs">●</span>
                            {{ __('neural_coach_feat1') }}
                        </li>
                        <li class="flex items-center gap-4 text-slate-700 font-bold">
                            <span class="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs">●</span>
                            {{ __('neural_coach_feat2') }}
                        </li>
                        <li class="flex items-center gap-4 text-slate-700 font-bold">
                            <span class="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs">●</span>
                            {{ __('neural_coach_feat3') }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 6: PRIVACY & SECURITY --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-950 relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-black tracking-widest mb-10 border border-white/10">
                🛡️ {{ __('neural_privacy_badge') }}
            </div>
            <h2 class="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight">{{ __('neural_privacy_title') }}</h2>
            <p class="text-slate-400 text-xl font-medium leading-relaxed mb-14">
                {{ __('neural_privacy_desc') }}
            </p>
            <div class="inline-block px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-indigo-400 tracking-[0.4em] uppercase">
                {{ __('neural_privacy_stat') }}
            </div>
        </div>
        
        {{-- Decorative Mesh --}}
        <div class="absolute inset-0 bg-pattern-grid opacity-10 pointer-events-none"></div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 7: FINAL CTA --}}
    {{-- ================================================================= --}}
    <section class="py-40 px-6 text-center relative overflow-hidden bg-white bg-pattern-mesh-indigo">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-5xl md:text-[6rem] font-black mb-10 leading-[0.9] tracking-tight text-slate-900">
                {{ __('neural_cta_title') }}
            </h2>
            <p class="text-slate-500 text-xl md:text-2xl mb-14 max-w-2xl mx-auto font-medium">
                {{ __('neural_cta_desc') }}
            </p>
            
            <div class="flex flex-col items-center gap-6">
                <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-16 py-8 rounded-[2.5rem] font-black text-2xl hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition transform hover:-translate-y-2 active:scale-95">
                    {{ __('neural_cta_btn') }}
                </a>
                <div class="flex items-center gap-3 text-sm font-black text-slate-400 tracking-widest">
                    {{ __('neural_cta_note') }}
                </div>
            </div>
        </div>

        {{-- Huge Gradient Background --}}
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1500px] h-[600px] bg-gradient-to-t from-indigo-50/50 via-white to-white rounded-full blur-[120px] -z-10"></div>
    </section>

@endsection
