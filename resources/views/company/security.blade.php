@extends('layouts.marketing')

@section('title', __('sec_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('sec_meta_desc') }}">
    <meta property="og:title" content="{{ __('sec_meta_og_title') }}">
    <meta property="og:description" content="{{ __('sec_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/company/security') }}">
@endsection

@section('content')

    {{-- HERO: THE DIGITAL FORTRESS --}}
    <header class="relative pt-40 pb-32 px-6 bg-slate-950 overflow-hidden border-b border-white/5">
        {{-- Animated Grid & Particles --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_70%)]"></div>

        <div class="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            
            <div class="animate-in slide-in-from-left-8 duration-700">
                <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] mb-8 uppercase tracking-widest backdrop-blur-md">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {{ __('sec_badge') }}
                </div>

                <h1 class="text-6xl md:text-8xl text-white tracking-tighter leading-[0.9] mb-8 font-black">
                    {{ __('sec_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">
                        {{ __('sec_title_2') }}
                    </span>
                </h1>

                <p class="text-xl text-slate-400 max-w-xl leading-relaxed mb-12">
                    {{ __('sec_subtitle') }}
                </p>

                {{-- STATS GRID --}}
                <div class="grid grid-cols-3 gap-6">
                    <div class="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-emerald-500/50 transition">
                        <p class="text-[9px] text-slate-500 font-black uppercase mb-1 tracking-widest">{{ __('sec_stat_1_label') }}</p>
                        <p class="text-white font-black text-xl group-hover:text-emerald-400 transition">{{ __('sec_stat_1_val') }}</p>
                    </div>
                    <div class="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-indigo-500/50 transition">
                        <p class="text-[9px] text-slate-500 font-black uppercase mb-1 tracking-widest">{{ __('sec_stat_2_label') }}</p>
                        <p class="text-white font-black text-xl group-hover:text-indigo-400 transition">{{ __('sec_stat_2_val') }}</p>
                    </div>
                    <div class="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-purple-500/50 transition">
                        <p class="text-[9px] text-slate-500 font-black uppercase mb-1 tracking-widest">{{ __('sec_stat_3_label') }}</p>
                        <p class="text-white font-black text-xl group-hover:text-purple-400 transition">{{ __('sec_stat_3_val') }}</p>
                    </div>
                </div>
            </div>

            {{-- VISUAL: CYBER FORTRESS --}}
            <div class="relative hidden lg:flex justify-center items-center">
                 <div class="relative w-full aspect-square max-w-md">
                     {{-- Orbiting Rings --}}
                     <div class="absolute inset-0 border-2 border-dashed border-emerald-500/10 rounded-full animate-[spin_30s_linear_infinite]"></div>
                     <div class="absolute inset-10 border border-indigo-500/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                     
                     {{-- Focus Icon Shield --}}
                     <div class="absolute inset-0 flex items-center justify-center">
                         <div class="w-56 h-56 bg-slate-900 rounded-[3.5rem] border border-white/10 shadow-[0_0_120px_-20px_rgba(16,185,129,0.4)] flex flex-col items-center justify-center relative overflow-hidden group">
                             <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition duration-700"></div>
                             <svg class="w-24 h-24 text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                             </svg>
                             <div class="mt-4 font-mono text-[8px] text-emerald-500 tracking-[0.3em] font-black uppercase opacity-60">{{ __('sec_locked_label') }}</div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    </header>

    <section class="py-24 bg-[#fafafa]">
        <div class="max-w-7xl mx-auto px-6">
            
            <div class="grid lg:grid-cols-4 gap-12 lg:gap-20 relative">
                
                {{-- NAV: STICKY --}}
                <aside class="hidden lg:block lg:col-span-1 relative">
                    <div class="sticky top-32 space-y-8">
                        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden group">
                            <div class="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
                            <h3 class="font-black text-slate-900 mb-8 uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                                <span class="w-1 h-3 bg-emerald-500 rounded-full"></span>
                                {{ __('sec_toc_title') }}
                            </h3>
                            <nav class="space-y-2 font-bold text-base text-slate-500" x-data="{ active: 'infra' }">
                                <a href="#infra" class="block px-4 py-3 rounded-xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'infra' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'infra'">
                                    01. {{ __('sec_toc_1') }}
                                </a>
                                <a href="#enc" class="block px-4 py-3 rounded-xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'enc' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'enc'">
                                    02. {{ __('sec_toc_2') }}
                                </a>
                                <a href="#app" class="block px-4 py-3 rounded-xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'app' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'app'">
                                    03. {{ __('sec_toc_3') }}
                                </a>
                                <a href="#sov" class="block px-4 py-3 rounded-xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'sov' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'sov'">
                                    04. {{ __('sec_toc_4') }}
                                </a>
                            </nav>
                        </div>

                        {{-- Alert Box --}}
                        <div class="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                            <div class="absolute -right-4 -top-4 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl group-hover:scale-150 transition duration-500"></div>
                            <h4 class="font-black text-sm mb-2 relative z-10">{{ __('sec_alert_title') }}</h4>
                            <p class="text-[10px] text-slate-400 mb-6 leading-relaxed relative z-10">{{ __('sec_alert_desc') }}</p>
                            <a href="mailto:oneformindapp@gmail.com" class="inline-flex items-center gap-2 text-[10px] font-black text-emerald-400 hover:gap-4 transition-all">
                                {{ __('sec_alert_btn') }} <span>→</span>
                            </a>
                        </div>
                    </div>
                </aside>

                {{-- CONTENT --}}
                <div class="lg:col-span-3 space-y-16">
                    
                    {{-- 1. INFRASTRUCTURE --}}
                    <div id="infra" class="scroll-mt-32 bg-white rounded-[4rem] p-10 md:p-16 border border-slate-200 shadow-sm overflow-hidden group">
                        <div class="flex flex-col md:flex-row gap-12 items-start">
                            <div class="w-20 h-20 bg-slate-950 rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-slate-200 shrink-0 group-hover:-rotate-6 transition duration-500 font-black">☁️</div>
                            <div>
                                <h2 class="text-4xl md:text-5xl text-slate-900 mb-8 tracking-tighter font-black">{{ __('sec_h2_infrastructure') }}</h2>
                                <p class="text-xl text-slate-500 font-medium mb-12 leading-relaxed">{{ __('sec_p_infrastructure') }}</p>
                                
                                <div class="grid sm:grid-cols-3 gap-8">
                                    <div class="space-y-4">
                                        <h4 class="font-black text-slate-900 text-sm tracking-tight border-b-2 border-indigo-100 pb-2 inline-block">{{ __('sec_li_infra_1_title') }}</h4>
                                        <p class="text-[13px] text-slate-500 leading-relaxed">{{ __('sec_li_infra_1_desc') }}</p>
                                    </div>
                                    <div class="space-y-4">
                                        <h4 class="font-black text-slate-900 text-sm tracking-tight border-b-2 border-emerald-100 pb-2 inline-block">{{ __('sec_li_infra_2_title') }}</h4>
                                        <p class="text-[13px] text-slate-500 leading-relaxed">{{ __('sec_li_infra_2_desc') }}</p>
                                    </div>
                                    <div class="space-y-4">
                                        <h4 class="font-black text-slate-900 text-sm tracking-tight border-b-2 border-purple-100 pb-2 inline-block">{{ __('sec_li_infra_3_title') }}</h4>
                                        <p class="text-[13px] text-slate-500 leading-relaxed">{{ __('sec_li_infra_3_desc') }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- 2. ENCRYPTION --}}
                    <div id="enc" class="scroll-mt-32 bg-slate-950 rounded-[4rem] p-10 md:p-16 text-white shadow-3xl relative overflow-hidden group">
                        <div class="absolute -right-20 -top-20 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition duration-1000"></div>
                        
                        <div class="relative z-10 flex flex-col md:flex-row gap-12 items-start">
                             <div class="w-20 h-20 bg-white/5 backdrop-blur-2xl rounded-3xl flex items-center justify-center text-4xl border border-white/10 shrink-0 shadow-lg group-hover:rotate-6 transition duration-500 font-black">🔐</div>
                             <div>
                                 <h2 class="text-4xl md:text-5xl text-white mb-8 tracking-tighter font-black">{{ __('sec_h2_encryption') }}</h2>
                                 <p class="text-xl text-indigo-100 font-medium mb-12 leading-relaxed opacity-80 decoration-indigo-500 underline decoration-4 underline-offset-8">{{ __('sec_p_encryption') }}</p>
                                 
                                 <div class="grid sm:grid-cols-2 gap-10">
                                     <div class="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition group/item">
                                         <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover/item:scale-110 transition">⚡</div>
                                         <h4 class="font-black text-white text-xl mb-4">{{ __('sec_li_enc_1_title') }}</h4>
                                         <p class="text-[13px] text-indigo-100 opacity-60 leading-relaxed">{{ __('sec_li_enc_1_desc') }}</p>
                                     </div>
                                     <div class="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition group/item">
                                         <div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 group-hover/item:scale-110 transition">💎</div>
                                         <h4 class="font-black text-white text-xl mb-4">{{ __('sec_li_enc_2_title') }}</h4>
                                         <p class="text-[13px] text-indigo-100 opacity-60 leading-relaxed">{{ __('sec_li_enc_2_desc') }}</p>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {{-- 3. APPLICATION --}}
                    <div id="app" class="scroll-mt-32 bg-white rounded-[4rem] p-10 md:p-16 border border-slate-200 shadow-sm relative group overflow-hidden">
                        <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl"></div>
                        <div class="flex flex-col md:flex-row gap-12 items-start">
                             <div class="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-indigo-100 shrink-0 group-hover:scale-110 transition duration-500 text-white font-black">🛡️</div>
                             <div>
                                 <h2 class="text-4xl md:text-5xl text-slate-900 mb-8 tracking-tighter font-black">{{ __('sec_h2_application') }}</h2>
                                 <p class="text-xl text-slate-500 font-medium mb-12 leading-relaxed">{{ __('sec_p_application') }}</p>

                                 <div class="grid sm:grid-cols-2 gap-8">
                                     <div class="flex gap-5 p-6 bg-slate-50 rounded-3xl">
                                         <span class="text-emerald-500 font-black text-3xl shrink-0 mt-1 font-black">✓</span>
                                         <div>
                                             <h5 class="font-black text-slate-900 text-base mb-2">{{ __('sec_li_app_1_title') }}</h5>
                                             <p class="text-xs text-slate-500 leading-relaxed">{{ __('sec_li_app_1_desc') }}</p>
                                         </div>
                                     </div>
                                     <div class="flex gap-5 p-6 bg-slate-50 rounded-3xl">
                                         <span class="text-emerald-500 font-black text-3xl shrink-0 mt-1 font-black">✓</span>
                                         <div>
                                             <h5 class="font-black text-slate-900 text-base mb-2">{{ __('sec_li_app_2_title') }}</h5>
                                             <p class="text-xs text-slate-500 leading-relaxed">{{ __('sec_li_app_2_desc') }}</p>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {{-- 4. SOVEREIGNTY --}}
                    <div id="sov" class="scroll-mt-32 bg-emerald-50 rounded-[4rem] p-10 md:p-16 border border-emerald-100 group relative overflow-hidden">
                        <div class="absolute -left-10 -bottom-10 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl"></div>
                        <div class="flex flex-col md:flex-row gap-12 items-start">
                             <div class="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-emerald-200 shrink-0 group-hover:rotate-12 transition duration-500 text-white font-black">👑</div>
                             <div>
                                 <h2 class="text-4xl md:text-5xl text-emerald-950 mb-8 tracking-tighter font-black">{{ __('sec_h2_sovereignty') }}</h2>
                                 <p class="text-2xl text-emerald-900/80 font-black leading-relaxed italic border-l-8 border-emerald-300 pl-10">
                                     {{ __('sec_p_sovereignty') }}
                                 </p>
                             </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>

    {{-- FINAL CTA SEAMLESS TRUST --}}
    <section class="py-40 px-6 bg-white border-t border-slate-100 text-center relative overflow-hidden">
        {{-- Decorative Blur --}}
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div class="max-w-4xl mx-auto relative z-10">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-slate-900 text-white rounded-[2.5rem] text-4xl mb-12 shadow-2xl rotate-3 font-black">🛡️</div>
            <h2 class="text-6xl md:text-8xl mb-10 text-slate-950 tracking-tighter leading-[0.8] font-black">{{ __('sec_cta_title') }}</h2>
            <p class="text-2xl text-slate-500 mb-16 leading-relaxed max-w-3xl mx-auto font-medium">
                {{ __('sec_cta_desc') }}
            </p>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-flex items-center gap-6 bg-indigo-600 text-white px-14 py-6 rounded-full font-black text-2xl hover:bg-indigo-700 hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.5)] transition transform hover:-translate-y-2 active:scale-95">
                <span>⚡</span> {{ __('sec_cta_btn') }}
            </a>
        </div>
    </section>

@endsection

