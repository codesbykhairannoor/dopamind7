@extends('layouts.marketing')

@section('title', __('finance_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('finance_meta_desc') }}">
    <meta property="og:title" content="{{ __('finance_meta_og_title') }}">
    <meta property="og:description" content="{{ __('finance_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/features/finance') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (CENTERED LAYOUT + FLOATING DASHBOARD) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-gray-50 relative border-b border-gray-100">
        {{-- Background Glow --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>

        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    <span class="text-lg">💰</span> {{ __('finance_hero_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('finance_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('finance_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                    {{ __('finance_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        {{ __('finance_hero_cta_1') }}
                    </a>
                    <a href="#how-it-works" class="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-full font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition">
                        {{ __('finance_hero_cta_2') }}
                    </a>
                </div>
            </div>

            {{-- Floating Mockup Centered --}}
            <div class="relative w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
                <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-20"></div>
                <div class="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-8 md:p-10 transform transition hover:scale-[1.02] duration-500">
                    
                    <div class="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                        <div class="text-left">
                            <h3 class="font-black text-gray-900 text-2xl mb-1">{{ __('finance_mockup_title') }} 💳</h3>
                            <p class="text-sm text-gray-500">{{ __('finance_mockup_alert_1') }}</p>
                        </div>
                        <div class="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl border border-indigo-100">
                            <span class="text-xs font-bold uppercase block mb-1 opacity-70">Total Balance</span>
                            <span class="font-black text-xl">{{ __('finance_mockup_balance') }} 📈</span>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        {{-- Task 1 (Income) --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl transition border border-transparent hover:border-emerald-100 cursor-pointer">
                            <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shadow-sm">↓</div>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-gray-900">{{ __('finance_mockup_task_1') }}</p>
                                <p class="text-sm text-gray-500">{{ __('finance_mockup_time_1') }}</p>
                            </div>
                            <div class="font-black text-emerald-600">+ Rp 5.000.000</div>
                        </div>
                        
                        {{-- Task 2 (Expense) --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-rose-50 rounded-2xl transition border border-transparent hover:border-rose-100 cursor-pointer">
                            <div class="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl shadow-sm">↑</div>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-gray-900">{{ __('finance_mockup_task_2') }}</p>
                                <p class="text-sm text-gray-500">{{ __('finance_mockup_time_2') }}</p>
                            </div>
                            <div class="font-black text-rose-600">- Rp 45.000</div>
                        </div>

                        {{-- Alert Pop-up --}}
                        <div class="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 text-left">
                            <span class="text-xl mt-0.5">⚠️</span>
                            <div>
                                <p class="font-bold text-amber-900 text-sm">{{ __('finance_mockup_alert_2') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: PROBLEM AWARENESS (ASYMMETRIC GRID) --}}
    <section class="py-32 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-3xl md:text-5xl font-black mb-16 text-center text-gray-900 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                {{ __('finance_prob_title_1') }} <span class="text-indigo-300 line-through decoration-rose-500 decoration-4">{{ __('finance_prob_title_strike') }}</span> {{ __('finance_prob_title_2') }}
            </h2>
            
            <div class="grid lg:grid-cols-12 gap-6">
                {{-- Massive Card --}}
                <div class="lg:col-span-7 bg-indigo-950 text-white p-10 rounded-[2.5rem] relative overflow-hidden group animate-in slide-in-from-left-8 fade-in duration-700 fill-mode-both">
                    <div class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600 rounded-full blur-[80px] opacity-50 group-hover:scale-150 transition duration-700"></div>
                    <div class="relative z-10 flex flex-col h-full justify-between">
                        <div class="text-6xl mb-8">💸</div>
                        <div>
                            <h3 class="text-3xl font-black mb-4">{{ __('finance_prob_1_title') }}</h3>
                            <p class="text-indigo-200 text-lg leading-relaxed">{{ __('finance_prob_1_desc') }}</p>
                        </div>
                    </div>
                </div>
                
                {{-- Stacked Smaller Cards --}}
                <div class="lg:col-span-5 grid grid-rows-2 gap-6">
                    <div class="bg-rose-50 p-8 rounded-[2rem] border border-rose-100 animate-in slide-in-from-right-8 fade-in duration-700 delay-100 fill-mode-both">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">📉</div>
                            <h3 class="text-xl font-bold text-gray-900">{{ __('finance_prob_2_title') }}</h3>
                        </div>
                        <p class="text-gray-600">{{ __('finance_prob_2_desc') }}</p>
                    </div>
                    
                    <div class="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 animate-in slide-in-from-right-8 fade-in duration-700 delay-200 fill-mode-both">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">🤯</div>
                            <h3 class="text-xl font-bold text-gray-900">{{ __('finance_prob_3_title') }}</h3>
                        </div>
                        <p class="text-gray-600">{{ __('finance_prob_3_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3 & 4: FEATURES (INSET FLOATING CARDS) --}}
    <section id="how-it-works" class="py-32 bg-gray-50">
        <div class="max-w-6xl mx-auto px-6 space-y-12">
            
            {{-- Feature 1 --}}
            <div class="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-indigo-100/50 border border-gray-100 grid lg:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                <div>
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-8 border border-indigo-100">🥧</div>
                    <h2 class="text-4xl font-black mb-6 text-gray-900">{{ __('finance_feature_1_title') }}</h2>
                    <p class="text-gray-500 text-lg leading-relaxed mb-8">
                        {{ __('finance_feature_1_desc') }}
                    </p>
                    <ul class="space-y-4 font-bold text-gray-700">
                        <li class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">✓</span> {{ __('finance_feature_1_point_1') }}</li>
                        <li class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">✓</span> {{ __('finance_feature_1_point_2') }}</li>
                    </ul>
                </div>
                <div class="h-[400px] bg-indigo-50 rounded-[2rem] border-2 border-dashed border-indigo-200 flex items-center justify-center relative overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 opacity-50"></div>
                    <div class="text-9xl relative z-10 transform group-hover:scale-110 transition duration-500">📊</div>
                </div>
            </div>

            {{-- Feature 2 --}}
            <div class="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-indigo-100/50 border border-gray-100 grid lg:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                <div class="order-2 lg:order-1 h-[400px] bg-emerald-50 rounded-[2rem] border-2 border-dashed border-emerald-200 flex items-center justify-center relative overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 opacity-50"></div>
                    <div class="text-9xl relative z-10 transform group-hover:-rotate-6 transition duration-500">🏦</div>
                </div>
                <div class="order-1 lg:order-2">
                    <div class="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-8 border border-emerald-100">🎯</div>
                    <h2 class="text-4xl font-black mb-6 text-gray-900">{{ __('finance_feature_2_title') }}</h2>
                    <p class="text-gray-500 text-lg leading-relaxed mb-8">
                        {{ __('finance_feature_2_desc') }}
                    </p>
                    <ul class="space-y-4 font-bold text-gray-700">
                        <li class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100"><span class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">✓</span> {{ __('finance_feature_2_point_1') }}</li>
                        <li class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100"><span class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">✓</span> {{ __('finance_feature_2_point_2') }}</li>
                    </ul>
                </div>
            </div>

        </div>
    </section>

    {{-- SECTION 5: BENTO BOX (ALTERNATIVE GRID ARRANGEMENT) --}}
    <section class="py-32 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6">{{ __('finance_bento_title') }}</h2>
                <p class="text-gray-500 text-xl">{{ __('finance_bento_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
                {{-- Top Row: 3 Equal Boxes --}}
                <div class="bg-indigo-50 rounded-[2rem] p-8 hover:bg-indigo-100 transition duration-300 border border-indigo-100/50">
                    <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">🔔</div>
                    <h3 class="text-xl font-black mb-3 text-indigo-950">{{ __('finance_bento_1_title') }}</h3>
                    <p class="text-indigo-900/70 text-sm leading-relaxed">{{ __('finance_bento_1_desc') }}</p>
                </div>
                
                <div class="bg-slate-900 rounded-[2rem] p-8 hover:-translate-y-2 transition duration-300 shadow-xl relative overflow-hidden group">
                    <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition"></div>
                    <div class="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl mb-6 relative z-10">🌙</div>
                    <h3 class="text-xl font-black mb-3 text-white relative z-10">{{ __('finance_bento_2_title') }}</h3>
                    <p class="text-slate-400 text-sm leading-relaxed relative z-10">{{ __('finance_bento_2_desc') }}</p>
                </div>

                <div class="bg-gray-50 rounded-[2rem] p-8 border border-gray-200 hover:shadow-lg transition duration-300">
                    <div class="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">🔗</div>
                    <h3 class="text-xl font-black mb-3 text-gray-900">{{ __('finance_bento_3_title') }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ __('finance_bento_3_desc') }}</p>
                </div>

                {{-- Bottom Row: 1 Full Width Box --}}
                <div class="md:col-span-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2rem] p-8 md:p-12 text-white shadow-xl hover:shadow-2xl transition duration-300 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
                    <div class="absolute left-0 top-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <div class="relative z-10 flex items-center gap-6">
                        <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shrink-0 border border-white/30">📱</div>
                        <div>
                            <h3 class="text-2xl font-black mb-2">{{ __('finance_bento_4_title') }}</h3>
                            <p class="text-indigo-100 max-w-xl">{{ __('finance_bento_4_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5.5: PRIVACY & SECURITY (INDIGO THEME) --}}
    <section class="py-32 bg-indigo-950 relative overflow-hidden">
        {{-- Custom Indigo Grid Background --}}
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
        <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-indigo-950 via-transparent to-indigo-950"></div>
        
        <div class="max-w-6xl mx-auto px-6 relative z-10 text-center">
            <div class="inline-flex items-center justify-center px-6 py-2 bg-indigo-900/50 backdrop-blur-md border border-indigo-700/50 text-indigo-300 rounded-full text-sm font-bold uppercase tracking-widest mb-8">
                🛡️ Top Tier Security
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-white mb-6">{{ __('finance_privacy_title') }}</h2>
            <p class="text-indigo-200 text-xl max-w-3xl mx-auto leading-relaxed mb-16 font-medium">
                {{ __('finance_privacy_desc') }}
            </p>
            
            <div class="grid sm:grid-cols-3 gap-8">
                <div class="bg-indigo-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-indigo-800/50 hover:bg-indigo-800/40 transition">
                    <div class="text-3xl mb-6 bg-indigo-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border border-indigo-700/50">🔒</div>
                    <h4 class="text-white font-bold text-xl mb-3">{{ __('finance_privacy_point_1_title') }}</h4>
                    <p class="text-indigo-300">{{ __('finance_privacy_point_1_desc') }}</p>
                </div>
                <div class="bg-indigo-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-indigo-800/50 hover:bg-indigo-800/40 transition">
                    <div class="text-3xl mb-6 bg-indigo-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border border-indigo-700/50">🚫</div>
                    <h4 class="text-white font-bold text-xl mb-3">{{ __('finance_privacy_point_2_title') }}</h4>
                    <p class="text-indigo-300">{{ __('finance_privacy_point_2_desc') }}</p>
                </div>
                <div class="bg-indigo-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-indigo-800/50 hover:bg-indigo-800/40 transition">
                    <div class="text-3xl mb-6 bg-indigo-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border border-indigo-700/50">🤝</div>
                    <h4 class="text-white font-bold text-xl mb-3">{{ __('finance_privacy_point_3_title') }}</h4>
                    <p class="text-indigo-300">{{ __('finance_privacy_point_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: QUOTE / SOSIAL PROOF --}}
    <section class="py-32 bg-gray-50 border-t border-gray-100">
        <div class="max-w-4xl mx-auto px-6 text-center animate-in zoom-in-95 fade-in duration-700 fill-mode-both">
            <div class="text-indigo-300 mb-8">
                <svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-10">
                {{ __('finance_quote_text') }}
            </h2>
            <div class="inline-flex items-center gap-4 text-left">
                <div class="w-12 h-12 bg-indigo-200 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src="https://ui-avatars.com/api/?name=W+B&background=4f46e5&color=fff" alt="Author" class="w-full h-full object-cover">
                </div>
                <div>
                    <p class="text-gray-900 font-bold tracking-widest uppercase text-sm">{{ __('finance_quote_author') }}</p>
                    <p class="text-gray-500 text-xs font-medium">Legendary Investor</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 7: BOTTOM CTA (PILL SHAPE / FULL WIDTH) --}}
    <section class="py-24 bg-white px-6">
        <div class="max-w-6xl mx-auto bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl border border-indigo-800">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse duration-[6000ms]"></div>
            
            <div class="relative z-10">
                <h2 class="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight">{{ __('finance_cta_title') }}</h2>
                <p class="text-indigo-200 text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-medium">
                    {{ __('finance_cta_desc') }}
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4 items-center">
                    <a href="{{ route('register') }}" class="w-full sm:w-auto bg-white text-indigo-900 px-12 py-5 rounded-full font-black text-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl shadow-indigo-900/50">
                        {{ __('finance_cta_btn') }}
                    </a>
                </div>
                <p class="mt-8 text-sm text-indigo-300 font-medium">{{ __('finance_cta_note') }}</p>
            </div>
        </div>
    </section>

@endsection