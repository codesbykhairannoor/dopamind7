@extends('layouts.marketing')

@section('title', __('sec_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('sec_meta_desc') }}">
    <meta property="og:title" content="{{ __('sec_meta_og_title') }}">
    <meta property="og:description" content="{{ __('sec_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/company/security') }}">
@endsection

@section('content')

    {{-- 🔥 SECURITY HEADER: THE FORTRESS 🔥 --}}
    <header class="relative pt-32 pb-24 px-6 bg-slate-950 overflow-hidden border-b border-slate-800">
        
        {{-- 1. Animated Cyber Grid --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_10%,#000_70%,transparent_100%)] opacity-20"></div>
        
        {{-- 2. Security Pulses --}}
        <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] animate-pulse delay-700"></div>

        <div class="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            
            {{-- LEFT: Core Typography --}}
            <div class="animate-in slide-in-from-left-8 fade-in duration-700">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-mono text-xs mb-8 uppercase tracking-widest">
                    <span class="flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    {{ __('sec_badge') }}
                </div>

                <h1 class="text-6xl md:text-8xl font-black text-white tracking-tight leading-none mb-8">
                    {{ __('sec_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">
                        {{ __('sec_title_2') }}
                    </span>
                </h1>

                <p class="text-xl text-slate-400 max-w-xl leading-relaxed mb-12 border-l-4 border-emerald-500/50 pl-8 italic">
                    "{{ __('sec_subtitle') }}"
                </p>

                {{-- Live Security Stats --}}
                <div class="grid grid-cols-3 gap-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
                    <div>
                        <p class="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">{{ __('sec_stat_1_label') }}</p>
                        <p class="text-2xl font-black text-white">{{ __('sec_stat_1_val') }}</p>
                    </div>
                    <div>
                        <p class="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">{{ __('sec_stat_2_label') }}</p>
                        <p class="text-2xl font-black text-white">{{ __('sec_stat_2_val') }}</p>
                    </div>
                    <div>
                        <p class="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">{{ __('sec_stat_3_label') }}</p>
                        <p class="text-2xl font-black text-emerald-400">{{ __('sec_stat_3_val') }}</p>
                    </div>
                </div>
            </div>

            {{-- RIGHT: Interactive Security Visualization --}}
            <div class="relative hidden lg:flex justify-center items-center">
                {{-- Floating Orbs --}}
                <div class="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-[80px] animate-blob"></div>
                <div class="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] animate-blob animation-delay-2000"></div>

                {{-- Shield Component --}}
                <div class="relative bg-slate-900 border border-slate-700/50 p-10 rounded-[3rem] shadow-2xl backdrop-blur-2xl group overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent"></div>
                    
                    <div class="relative z-10 space-y-8">
                        <div class="flex items-center gap-6">
                            <div class="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                🛡️
                            </div>
                            <div>
                                <h3 class="text-white font-black text-xl mb-1">Vault Core</h3>
                                <p class="text-xs text-slate-500 font-mono">STATUS: ENCRYPTED</p>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div class="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                                <div class="flex justify-between text-[10px] font-mono text-slate-400 mb-2">
                                    <span>NETWORK_TRAFFIC</span>
                                    <span class="text-emerald-400">FILTERED</span>
                                </div>
                                <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                    <div class="h-full bg-emerald-500 w-[65%] animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
                            
                            <div class="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                                <div class="flex justify-between text-[10px] font-mono text-slate-400 mb-2">
                                    <span>DATA_INTEGRITY</span>
                                    <span class="text-indigo-400">VERIFIED</span>
                                </div>
                                <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                    <div class="h-full bg-indigo-500 w-[92%] animate-[shimmer_2s_infinite_delay-1s]"></div>
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-2">
                            <div class="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono text-slate-400">SSL_TLS_1.3</div>
                            <div class="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono text-slate-400">HSTS_ENABLED</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- MAIN CONTENT SECTION --}}
    <section class="py-24 bg-white relative">
        <div class="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20">
            
            {{-- LEFT: Sticky TOC --}}
            <aside class="lg:w-1/4 shrink-0 relative">
                <div class="lg:sticky lg:top-32 space-y-8">
                    <div class="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h3 class="text-xs font-black uppercase tracking-widest text-slate-900 mb-6">{{ __('sec_toc_title') }}</h3>
                        <nav class="space-y-2">
                            @foreach([1, 2, 3, 4, 5] as $i)
                                <a href="#layer-{{ $i }}" class="block px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-md transition-all">
                                    {{ __("sec_toc_{$i}") }}
                                </a>
                            @endforeach
                        </nav>
                    </div>

                    <div class="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                        <div class="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition duration-500"></div>
                        <h4 class="font-black mb-2 relative z-10">Have questions?</h4>
                        <p class="text-xs text-indigo-100 mb-6 leading-relaxed relative z-10">Our security team is ready to provide more technical details if needed.</p>
                        <a href="mailto:security@oneformind.com" class="inline-flex items-center gap-2 text-sm font-black text-white hover:gap-4 transition-all">
                            Contact Security <span>→</span>
                        </a>
                    </div>
                </div>
            </aside>

            {{-- RIGHT: Detailed Content --}}
            <div class="lg:w-3/4 space-y-24">
                
                {{-- Layer 1: Infrastructure --}}
                <div id="layer-1" class="scroll-mt-32">
                    <div class="mb-12">
                        <span class="text-4xl mb-6 block">🏗️</span>
                        <h2 class="text-4xl font-black text-slate-900 mb-6">{{ __('sec_h2_infrastructure') }}</h2>
                        <p class="text-lg text-slate-500 leading-relaxed max-w-3xl">
                            {{ __('sec_p_infrastructure') }}
                        </p>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        @foreach([1, 2, 3] as $i)
                        <div class="p-8 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl transition-all group">
                            <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-indigo-50 transition">
                                @if($i == 1) ☁️ @elseif($i == 2) 🛡️ @else 🔄 @endif
                            </div>
                            <h3 class="text-xl font-black text-slate-900 mb-3">{{ __("sec_li_infra_{$i}_title") }}</h3>
                            <p class="text-sm text-slate-500 leading-relaxed">{{ __("sec_li_infra_{$i}_desc") }}</p>
                        </div>
                        @endforeach
                    </div>
                </div>

                {{-- Layer 2: Encryption --}}
                <div id="layer-2" class="scroll-mt-32 bg-slate-950 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
                    
                    <div class="relative z-10">
                        <div class="mb-12">
                            <span class="text-4xl mb-6 block">🔑</span>
                            <h2 class="text-4xl font-black mb-6">{{ __('sec_h2_encryption') }}</h2>
                            <p class="text-lg text-slate-400 leading-relaxed max-w-3xl">
                                {{ __('sec_p_encryption') }}
                            </p>
                        </div>

                        <div class="grid md:grid-cols-2 gap-12">
                            <div class="space-y-10">
                                @foreach([1, 2] as $i)
                                <div>
                                    <h4 class="text-xl font-black mb-3 flex items-center gap-3">
                                        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                                        {{ __("sec_li_enc_{$i}_title") }}
                                    </h4>
                                    <p class="text-slate-400 leading-relaxed">
                                        {{ __("sec_li_enc_{$i}_desc") }}
                                    </p>
                                </div>
                                @endforeach
                            </div>
                            
                            {{-- Visual Code Representation --}}
                            <div class="bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 p-8 font-mono text-xs text-emerald-400/80">
                                <p class="mb-4 text-slate-600">// Encryption Protocol Implementation</p>
                                <p><span class="text-purple-400">class</span> <span class="text-indigo-400">SecurityVault</span> {</p>
                                <p class="pl-4"><span class="text-purple-400">private const</span> <span class="text-white">ALGO</span> = <span class="text-emerald-300">'AES-256-GCM'</span>;</p>
                                <p class="pl-4 mt-4 text-slate-600">// Multi-layered key management</p>
                                <p class="pl-4"><span class="text-purple-400">public function</span> <span class="text-indigo-400">seal</span>(<span class="text-indigo-300">$data</span>) {</p>
                                <p class="pl-8"><span class="text-indigo-300">$iv</span> = <span class="text-white">random_bytes(16)</span>;</p>
                                <p class="pl-8"><span class="text-indigo-300">$cipher</span> = <span class="text-white">openssl_encrypt($data, self::ALGO, $key, 0, $iv)</span>;</p>
                                <p class="pl-8"><span class="text-purple-400">return</span> <span class="text-white">base64_encode($iv . $cipher)</span>;</p>
                                <p class="pl-4">}</p>
                                <p>}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Layer 3: Application Security --}}
                <div id="layer-3" class="scroll-mt-32">
                    <div class="mb-12">
                        <span class="text-4xl mb-6 block">📱</span>
                        <h2 class="text-4xl font-black text-slate-900 mb-6">{{ __('sec_h2_application') }}</h2>
                        <p class="text-lg text-slate-500 leading-relaxed max-w-3xl">
                            {{ __('sec_p_application') }}
                        </p>
                    </div>

                    <div class="space-y-8">
                        @foreach([1, 2] as $i)
                        <div class="flex gap-8 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:border-indigo-100 transition-all duration-500 group">
                            <div class="shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition">
                                @if($i == 1) 🔐 @else 🕵️ @endif
                            </div>
                            <div>
                                <h3 class="text-2xl font-black text-slate-900 mb-3">{{ __("sec_li_app_{$i}_title") }}</h3>
                                <p class="text-slate-500 leading-relaxed max-w-2xl">{{ __("sec_li_app_{$i}_desc") }}</p>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>

                {{-- Layer 4: Sovereignty --}}
                <div id="layer-4" class="scroll-mt-32">
                    <div class="bg-indigo-50 border-2 border-indigo-100 rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
                        <div class="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-200/50 rounded-full blur-[80px]"></div>
                        
                        <div class="relative z-10 max-w-2xl">
                            <span class="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest mb-8 inline-block">Absolute Private</span>
                            <h2 class="text-4xl font-black text-slate-900 mb-8">{{ __('sec_h2_sovereignty') }}</h2>
                            <p class="text-xl text-slate-600 leading-relaxed font-medium mb-12">
                                {{ __('sec_p_sovereignty') }}
                            </p>
                            
                            <div class="grid sm:grid-cols-2 gap-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</div>
                                    <span class="font-bold text-slate-900">Zero Selling Policy</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</div>
                                    <span class="font-bold text-slate-900">Export Anytime</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Layer 5: Legal & Responsibility --}}
                <div id="layer-5" class="scroll-mt-32 border-t border-slate-100 pt-24 text-center">
                    <div class="max-w-2xl mx-auto">
                        <h2 class="text-3xl font-black text-slate-900 mb-8">Shared Responsibility</h2>
                        <p class="text-slate-500 leading-relaxed mb-12">
                            While we protect the vault, we encourage you to use a unique password and enable 2FA where possible. Together, we make your digital life impenetrable.
                        </p>
                        <div class="inline-flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-full font-black text-sm">
                            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Continuous Security Monitoring Active
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    {{-- FINAL CTA SECTION --}}
    <section class="py-24 bg-slate-50">
        <div class="max-w-5xl mx-auto px-6 text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2rem] text-4xl mb-8 shadow-xl shadow-indigo-100 border border-indigo-50">🔒</div>
            <h2 class="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">{{ __('sec_cta_title') }}</h2>
            <p class="text-2xl text-slate-500 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                {{ __('sec_cta_desc') }}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white rounded-full font-black text-lg hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition transform hover:-translate-y-1">
                    {{ __('sec_cta_btn') }}
                </a>
                <a href="{{ route('about') }}" class="w-full sm:w-auto px-12 py-5 bg-white text-slate-900 rounded-full font-black text-lg border border-slate-200 hover:bg-slate-50 transition">
                    Learn More About Us
                </a>
            </div>
        </div>
    </section>

@endsection
