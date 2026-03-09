@extends('layouts.marketing')

@section('title', __('deepwork_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('deepwork_meta_desc') }}">
    <meta property="og:title" content="{{ __('deepwork_meta_og_title') }}">
    <meta property="og:description" content="{{ __('deepwork_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/deep-work') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (CENTERED LIGHT MODE - INDIGO VIBE) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white relative border-b border-gray-100">
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] -z-10"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-400/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {{-- Icon / Gambar --}}
            <div class="flex justify-center mb-8">
                <div class="w-24 h-24 bg-white border border-indigo-100 rounded-3xl shadow-xl shadow-indigo-100 flex items-center justify-center text-4xl transform -rotate-3 hover:rotate-0 transition duration-300">
                    ⚡
                </div>
            </div>

            {{-- Teks --}}
            <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-6 uppercase tracking-widest border border-indigo-100 shadow-sm">
                {{ __('deepwork_hero_badge') }}
            </div>
            
            <h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-gray-900">
                {{ __('deepwork_hero_title_1') }}<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                    {{ __('deepwork_hero_title_2') }}
                </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
                {{ __('deepwork_hero_desc') }}
            </p>
            
            {{-- CTA --}}
            <div class="flex justify-center gap-4 mb-24">
                <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.4)] transition transform hover:-translate-y-1">
                    {{ __('deepwork_hero_cta') }}
                </a>
            </div>

            {{-- Visual Bawah (Lebar & Interactive Vibe - LIGHT THEME) --}}
            <div class="relative w-full max-w-4xl mx-auto rounded-[2.5rem] bg-white p-3 shadow-2xl border border-gray-100 text-left transform perspective-1000 rotate-x-6 hover:rotate-x-0 transition-transform duration-700">
                <div class="absolute inset-0 bg-indigo-500 rounded-[2.5rem] blur-2xl opacity-10 -z-10"></div>
                
                <div class="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-gray-100 overflow-hidden relative flex flex-col md:flex-row gap-10 items-center">
                    
                    <div class="flex-1 w-full space-y-6 z-10">
                        <div class="flex justify-between items-center border-b border-gray-200 pb-4">
                            <h4 class="text-gray-500 font-bold uppercase tracking-widest text-xs">{{ __('deepwork_mockup_title') }}</h4>
                            <span class="w-3 h-3 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]"></span>
                        </div>
                        <div class="space-y-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 text-xs text-gray-400 font-mono">09:00</div>
                                <div class="flex-1 bg-white rounded-xl p-4 border border-gray-200 opacity-60 flex items-center gap-3">
                                    <div class="w-4 h-4 rounded border-2 border-gray-300"></div>
                                    <span class="text-gray-400 line-through text-sm">Clear Email Inbox</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="w-12 text-xs text-indigo-600 font-mono font-bold">10:00</div>
                                <div class="flex-1 bg-indigo-50/80 rounded-xl p-4 border border-indigo-200 flex items-center justify-between shadow-sm transform scale-[1.02]">
                                    <div class="flex items-center gap-3">
                                        <div class="w-4 h-4 rounded bg-indigo-600 animate-pulse"></div>
                                        <span class="text-indigo-950 font-bold text-sm">Deep Work: Architecture</span>
                                    </div>
                                    <span class="font-mono text-indigo-600 text-sm font-bold">25:00</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="w-12 text-xs text-gray-400 font-mono">12:00</div>
                                <div class="flex-1 bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-3 border-dashed">
                                    <div class="w-4 h-4 rounded border-2 border-gray-300 border-dashed"></div>
                                    <span class="text-gray-500 text-sm">Lunch Break</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-1/3 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0 md:pl-8">
                        <div class="text-6xl font-black text-gray-900 tracking-tighter tabular-nums font-mono drop-shadow-sm">
                            24<span class="text-indigo-500 animate-pulse">:</span>59
                        </div>
                        <p class="text-gray-400 text-xs mt-3 font-bold uppercase tracking-widest">{{ __('deepwork_mockup_desc') }}</p>
                    </div>

                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-32 bg-white relative">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900">{{ __('deepwork_prob_title') }}</h2>
                <p class="text-xl text-gray-500 max-w-3xl mx-auto">{{ __('deepwork_prob_desc') }}</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-3xl mb-6">📱</div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3">{{ __('deepwork_prob_1_title') }}</h4>
                    <p class="text-gray-500 leading-relaxed">{{ __('deepwork_prob_1_desc') }}</p>
                </div>
                <div class="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-3xl mb-6">🤹</div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3">{{ __('deepwork_prob_2_title') }}</h4>
                    <p class="text-gray-500 leading-relaxed">{{ __('deepwork_prob_2_desc') }}</p>
                </div>
                <div class="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-3xl mb-6">🕰️</div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3">{{ __('deepwork_prob_3_title') }}</h4>
                    <p class="text-gray-500 leading-relaxed">{{ __('deepwork_prob_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SYSTEM (THE ARCHITECTURE OF FOCUS) --}}
    <section class="py-32 bg-indigo-50/50 border-y border-indigo-100">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1">
                <div class="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-2xl text-2xl mb-6 shadow-lg shadow-indigo-200">🏛️</div>
                <h2 class="text-4xl md:text-5xl font-black mb-8 text-gray-900 leading-tight">{{ __('deepwork_sol_title') }}</h2>
                <div class="space-y-8">
                    <div class="flex gap-4 items-start">
                        <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0 mt-1">1</div>
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('deepwork_sol_1_title') }}</h4>
                            <p class="text-gray-600 leading-relaxed">{{ __('deepwork_sol_1_desc') }}</p>
                        </div>
                    </div>
                    <div class="flex gap-4 items-start">
                        <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0 mt-1">2</div>
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('deepwork_sol_2_title') }}</h4>
                            <p class="text-gray-600 leading-relaxed">{{ __('deepwork_sol_2_desc') }}</p>
                        </div>
                    </div>
                    <div class="flex gap-4 items-start">
                        <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0 mt-1">3</div>
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('deepwork_sol_3_title') }}</h4>
                            <p class="text-gray-600 leading-relaxed">{{ __('deepwork_sol_3_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {{-- Visual Concept (Dark contrast box inside light section) --}}
            <div class="order-1 md:order-2 bg-slate-900 p-12 rounded-[3rem] text-center border border-slate-800 shadow-2xl relative overflow-hidden group">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition duration-700"></div>
                
                <div class="relative z-10">
                    <div class="text-9xl mb-8 transform group-hover:scale-110 transition duration-500">🔒</div>
                    <h3 class="text-4xl font-black text-white tracking-tight mb-2">Lock In.</h3>
                    <p class="text-indigo-300 text-lg font-medium">Zero Distractions. 100% Output.</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE FOCUS ARSENAL (TAMBAHAN SECTION BIAR PANJANG) --}}
    <section class="py-32 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('deepwork_feat_title') }}</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="flex gap-6 items-start p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100">
                    <div class="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">🍅</div>
                    <div>
                        <h4 class="text-xl font-bold text-indigo-950 mb-2">{{ __('deepwork_feat_1_title') }}</h4>
                        <p class="text-indigo-800/70">{{ __('deepwork_feat_1_desc') }}</p>
                    </div>
                </div>
                <div class="flex gap-6 items-start p-8 rounded-[2rem] bg-gray-50 border border-gray-200">
                    <div class="w-14 h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">📥</div>
                    <div>
                        <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('deepwork_feat_2_title') }}</h4>
                        <p class="text-gray-500">{{ __('deepwork_feat_2_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: CTA (RAPI, LEGA, PUNCHY) --}}
    <section class="pt-24 pb-40 bg-slate-50 text-center px-6 relative overflow-hidden border-t border-gray-200">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-indigo-100/50 to-transparent rounded-t-full -z-10"></div>
        
        <div class="max-w-3xl mx-auto mt-16">
            <h2 class="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight leading-tight">{{ __('deepwork_cta_title') }}</h2>
            <p class="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto">{{ __('deepwork_cta_desc') }}</p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="{{ route('register') }}" class="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.4)] transition transform hover:-translate-y-1 w-full sm:w-auto">
                    {{ __('deepwork_cta_btn') }}
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
            </div>
            
            <p class="mt-10 text-sm font-bold text-gray-400 uppercase tracking-widest">{{ __('deepwork_cta_note') }}</p>
        </div>
    </section>
@endsection