@extends('layouts.marketing')

@section('title', __('brain_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('brain_meta_desc') }}">
    <meta property="og:title" content="{{ __('brain_meta_og_title') }}">
    <meta property="og:description" content="{{ __('brain_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/second-brain') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (CENTERED GLASSMORPHISM - PURE INDIGO VIBE) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white relative border-b border-gray-100">
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] -z-10"></div>
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[120px] opacity-60 animate-pulse -z-10"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-[100px] opacity-50 animate-pulse delay-1000 -z-10"></div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {{-- Icon / Gambar Dulu --}}
            <div class="flex justify-center mb-8">
                <div class="w-24 h-24 bg-white/80 backdrop-blur-xl border border-indigo-100 rounded-[2rem] shadow-xl shadow-indigo-100 flex items-center justify-center text-4xl transform -rotate-3 hover:rotate-0 transition duration-300">
                    🧠
                </div>
            </div>

            {{-- Badge --}}
            <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-6 uppercase tracking-widest border border-indigo-100 shadow-sm">
                {{ __('brain_hero_badge') }}
            </div>
            
            {{-- Teks Utama --}}
            <h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight text-gray-900 tracking-tight">
                {{ __('brain_hero_title_1') }}<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {{ __('brain_hero_title_2') }}
                </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
                {{ __('brain_hero_desc') }}
            </p>
            
            {{-- CTA --}}
            <div class="flex justify-center gap-4 mb-24">
                <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.4)] transition transform hover:-translate-y-1">
                    {{ __('brain_hero_cta') }}
                </a>
            </div>

            {{-- Visual Bawah (Lebar - Glassmorphism Nodes Network) --}}
            <div class="relative w-full max-w-4xl mx-auto h-[400px] md:h-80 flex justify-center items-center rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl border border-slate-800 perspective-1000">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20"></div>

                {{-- Node 1: Capture --}}
                <div class="absolute left-4 md:left-12 top-8 md:top-16 bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 z-10 transform -rotate-6 animate-[float_4s_ease-in-out_infinite] shadow-2xl">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-8 h-8 rounded-lg bg-indigo-500/30 flex items-center justify-center text-sm">📥</div>
                        <span class="font-bold text-indigo-100 text-sm">{{ __('brain_mockup_1') }}</span>
                    </div>
                    <div class="w-24 h-1.5 bg-white/20 rounded-full"></div>
                </div>

                {{-- Node 2: Organize (Center) --}}
                <div class="absolute bg-indigo-600/20 backdrop-blur-xl p-8 rounded-[2.5rem] border border-indigo-400/30 shadow-[0_0_50px_rgba(79,70,229,0.3)] z-20 scale-110">
                    <div class="flex flex-col items-center">
                        <span class="text-4xl mb-3 drop-shadow-lg">🔮</span>
                        <h4 class="font-black text-white tracking-widest uppercase text-sm">{{ __('brain_mockup_2') }}</h4>
                    </div>
                </div>

                {{-- Node 3: Execute --}}
                <div class="absolute right-4 md:right-12 bottom-8 md:bottom-16 bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 z-10 transform rotate-6 animate-[float_5s_ease-in-out_infinite_reverse] shadow-2xl">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center text-sm">📓</div>
                        <span class="font-bold text-indigo-100 text-sm">{{ __('brain_mockup_3') }}</span>
                    </div>
                    <p class="text-[10px] text-slate-300 font-serif italic max-w-[120px]">"Clear mind, full focus on the task..."</p>
                </div>
                
                {{-- Connecting SVG Lines --}}
                <div class="absolute top-1/2 left-1/4 w-32 md:w-48 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-indigo-400 transform -rotate-12 -z-10 opacity-50"></div>
                <div class="absolute top-1/2 right-1/4 w-32 md:w-48 h-0.5 bg-gradient-to-l from-transparent via-indigo-400 to-indigo-400 transform rotate-12 -z-10 opacity-50"></div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (THE OVERWHELM EPIDEMIC) --}}
    <section class="py-32 bg-slate-50 relative">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900">{{ __('brain_prob_title') }}</h2>
                <p class="text-xl text-gray-500 max-w-2xl mx-auto">{{ __('brain_prob_desc') }}</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🌪️</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __('brain_prob_1_title') }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __('brain_prob_1_desc') }}</p>
                </div>
                <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🧩</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __('brain_prob_2_title') }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __('brain_prob_2_desc') }}</p>
                </div>
                <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🔋</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __('brain_prob_3_title') }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __('brain_prob_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE C.O.E FRAMEWORK (DARK INDIGO) --}}
    <section class="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="text-center mb-24">
                <h2 class="text-4xl md:text-6xl font-black mb-6">{{ __('brain_sol_title') }}</h2>
                <p class="text-indigo-300 text-xl max-w-2xl mx-auto">{{ __('brain_sol_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-slate-800/50 backdrop-blur-md p-10 rounded-[2.5rem] border border-slate-700 hover:-translate-y-2 transition-transform duration-300">
                    <div class="text-4xl mb-6 opacity-80">🎣</div>
                    <h3 class="text-2xl font-bold text-indigo-400 mb-4">{{ __('brain_step_1_title') }}</h3>
                    <p class="text-slate-400 leading-relaxed">{{ __('brain_step_1_desc') }}</p>
                </div>
                <div class="bg-slate-800/50 backdrop-blur-md p-10 rounded-[2.5rem] border border-slate-700 hover:-translate-y-2 transition-transform duration-300 delay-100">
                    <div class="text-4xl mb-6 opacity-80">🗄️</div>
                    <h3 class="text-2xl font-bold text-blue-400 mb-4">{{ __('brain_step_2_title') }}</h3>
                    <p class="text-slate-400 leading-relaxed">{{ __('brain_step_2_desc') }}</p>
                </div>
                <div class="bg-indigo-600 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden hover:-translate-y-2 transition-transform duration-300 delay-200">
                    <div class="absolute top-0 right-0 p-6 opacity-20 text-8xl">🚀</div>
                    <div class="text-4xl mb-6">✨</div>
                    <h3 class="text-2xl font-bold text-white mb-4">{{ __('brain_step_3_title') }}</h3>
                    <p class="text-indigo-100 leading-relaxed relative z-10">{{ __('brain_step_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE TOOLKIT --}}
    <section class="py-32 bg-white border-b border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('brain_feat_title') }}</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="flex gap-6 items-start p-8 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 shadow-sm">
                    <div class="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">📥</div>
                    <div>
                        <h4 class="text-xl font-bold text-indigo-950 mb-2">{{ __('brain_feat_1_title') }}</h4>
                        <p class="text-indigo-800/70 leading-relaxed">{{ __('brain_feat_1_desc') }}</p>
                    </div>
                </div>
                <div class="flex gap-6 items-start p-8 rounded-[2.5rem] bg-slate-50 border border-slate-200 shadow-sm">
                    <div class="w-14 h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">📓</div>
                    <div>
                        <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('brain_feat_2_title') }}</h4>
                        <p class="text-gray-500 leading-relaxed">{{ __('brain_feat_2_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: CTA (DESAIN LUAS & ELEGAN) --}}
    <section class="py-32 bg-white relative">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white -z-10"></div>
        
        <div class="max-w-5xl mx-auto px-6 relative z-10">
            {{-- Big Padded Card --}}
            <div class="bg-indigo-950 rounded-[3rem] md:rounded-[4rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
                {{-- Decorative background in CTA --}}
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <div class="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-50"></div>
                
                <div class="relative z-10">
                    <div class="text-6xl mb-8">🕊️</div>
                    <h2 class="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                        {{ __('brain_cta_title') }}
                    </h2>
                    <p class="text-lg md:text-xl text-indigo-200 mb-12 max-w-2xl mx-auto leading-relaxed">
                        {{ __('brain_cta_desc') }}
                    </p>
                    
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a href="{{ route('register') }}" class="inline-flex items-center justify-center gap-3 bg-white text-indigo-950 px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-50 shadow-[0_10px_25px_rgba(255,255,255,0.2)] transition transform hover:-translate-y-1 w-full sm:w-auto">
                            {{ __('brain_cta_btn') }}
                            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                    </div>
                    
                    <p class="mt-8 text-xs font-bold text-indigo-400 uppercase tracking-widest">{{ __('brain_cta_note') }}</p>
                </div>
            </div>
        </div>
    </section>

@endsection