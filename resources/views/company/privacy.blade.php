@extends('layouts.marketing')

@section('title', __('privacy_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('privacy_meta_desc') }}">
    <meta property="og:title" content="{{ __('privacy_meta_og_title') }}">
    <meta property="og:description" content="{{ __('privacy_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/company/privacy') }}">
@endsection

@section('content')
@extends('layouts.marketing')

{{-- ... (Bagian Meta Section tetap sama) ... --}}

@section('content')

    {{-- 🔥 NEW HEADER: THE SECURE VAULT 🔥 --}}
    <header class="relative pt-32 pb-24 px-6 bg-slate-950 overflow-hidden border-b border-slate-800">
        
        {{-- 1. Tech Grid Background --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        {{-- 2. Ambient Spotlights --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div class="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            
            {{-- LEFT: Typography & Status --}}
            <div class="animate-in slide-in-from-left-8 fade-in duration-700">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs mb-8">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    SYSTEM_STATUS: SECURE
                </div>

                <h1 class="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
                    {{ __('privacy_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                        {{ __('privacy_title_2') }}
                    </span>
                </h1>

                <p class="text-lg text-slate-400 max-w-xl leading-relaxed mb-10 border-l-2 border-indigo-500/50 pl-6">
                    {{ __('privacy_subtitle') }}
                </p>

                {{-- Mini Dashboard Stats --}}
                <div class="grid grid-cols-3 gap-4 border-t border-slate-800 pt-8">
                    <div>
                        <p class="text-xs text-slate-500 font-mono uppercase mb-1">Encryption</p>
                        <p class="text-white font-bold">AES-256</p>
                    </div>
                    <div>
                        <p class="text-xs text-slate-500 font-mono uppercase mb-1">Data Owner</p>
                        <p class="text-white font-bold">You</p>
                    </div>
                    <div>
                        <p class="text-xs text-slate-500 font-mono uppercase mb-1">Tracking</p>
                        <p class="text-rose-400 font-bold">0% Ads</p>
                    </div>
                </div>
            </div>

            {{-- RIGHT: 3D Shield Visualization --}}
            <div class="relative hidden lg:flex justify-center items-center animate-in zoom-in-50 fade-in duration-1000 delay-200">
                {{-- Glowing Rings --}}
                <div class="absolute inset-0 border border-indigo-500/20 rounded-full scale-110 animate-[spin_10s_linear_infinite]"></div>
                <div class="absolute inset-0 border border-dashed border-emerald-500/20 rounded-full scale-125 animate-[spin_15s_linear_infinite_reverse]"></div>
                
                {{-- Central Shield Card --}}
                <div class="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl shadow-indigo-500/20 transform rotate-3 hover:rotate-0 transition duration-500 group">
                    <div class="absolute -top-6 -right-6 bg-slate-800 border border-slate-700 p-4 rounded-2xl shadow-lg">
                        <div class="text-4xl">🔐</div>
                    </div>
                    
                    <div class="space-y-4 w-64">
                        <div class="flex justify-between items-center pb-4 border-b border-slate-700">
                            <span class="text-xs font-mono text-slate-400">ACCESS_LOG</span>
                            <span class="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">GRANTED</span>
                        </div>
                        <div class="space-y-2">
                            <div class="h-2 w-full bg-slate-800 rounded overflow-hidden">
                                <div class="h-full bg-indigo-500 w-[80%] animate-pulse"></div>
                            </div>
                            <div class="flex justify-between text-[10px] text-slate-500 font-mono">
                                <span>Habit Data</span>
                                <span>Encrypted</span>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="h-2 w-full bg-slate-800 rounded overflow-hidden">
                                <div class="h-full bg-purple-500 w-[60%] animate-pulse delay-75"></div>
                            </div>
                            <div class="flex justify-between text-[10px] text-slate-500 font-mono">
                                <span>Finance Logs</span>
                                <span>Private</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- ... (Sisa Section 2, 3, dst tetap sama dari kode sebelumnya) ... --}}


    {{-- SECTION 2: MAIN CONTENT & STICKY SIDEBAR --}}
    <br>
    <br>
    <br>
    <br>
    <br>

    <section class="py-16 bg-gray-50/50 mt-100">
        <div class="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 relative">
            
            {{-- LEFT: Sticky Table of Contents --}}
            <aside class="hidden lg:block w-1/4 shrink-0 relative">
                <div class="sticky top-28 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                    <h3 class="font-black text-gray-900 mb-4 uppercase tracking-widest text-xs">{{ __('privacy_toc_title') }}</h3>
                    <nav class="space-y-1 font-medium text-sm text-gray-500" x-data="{ active: 'tldr' }">
                        <a href="#tldr" class="block px-4 py-2.5 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition" :class="active === 'tldr' ? 'bg-indigo-50 text-indigo-600 font-bold' : ''" @click="active = 'tldr'">1. TL;DR Summary</a>
                        <a href="#collection" class="block px-4 py-2.5 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition" :class="active === 'collection' ? 'bg-indigo-50 text-indigo-600 font-bold' : ''" @click="active = 'collection'">2. Data Collection</a>
                        <a href="#usage" class="block px-4 py-2.5 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition" :class="active === 'usage' ? 'bg-indigo-50 text-indigo-600 font-bold' : ''" @click="active = 'usage'">3. How We Use Data</a>
                        <a href="#security" class="block px-4 py-2.5 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition" :class="active === 'security' ? 'bg-indigo-50 text-indigo-600 font-bold' : ''" @click="active = 'security'">4. Data Security</a>
                        <a href="#cookies" class="block px-4 py-2.5 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition" :class="active === 'cookies' ? 'bg-indigo-50 text-indigo-600 font-bold' : ''" @click="active = 'cookies'">5. Cookies & Tracking</a>
                        <a href="#rights" class="block px-4 py-2.5 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition" :class="active === 'rights' ? 'bg-indigo-50 text-indigo-600 font-bold' : ''" @click="active = 'rights'">6. Your Rights</a>
                        <a href="#contact" class="block px-4 py-2.5 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition" :class="active === 'contact' ? 'bg-indigo-50 text-indigo-600 font-bold' : ''" @click="active = 'contact'">7. Contact Us</a>
                    </nav>

                    {{-- Download PDF Option --}}
                    <div class="mt-8 pt-6 border-t border-gray-100">
                        <a href="#" class="flex items-center gap-3 text-sm font-bold text-gray-900 hover:text-indigo-600 transition group">
                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-indigo-100 transition">📄</div>
                            {{ __('privacy_download_pdf') }}
                        </a>
                    </div>
                </div>
            </aside>

            {{-- RIGHT: The Actual Policy Content --}}
            <main class="w-full lg:w-3/4">
                
                {{-- SURPRISE: TL;DR Bento Grid --}}
                <div id="tldr" class="scroll-mt-32 mb-16 animate-in slide-in-from-right-8 fade-in duration-700 delay-200">
                    <h2 class="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        ⚡ {{ __('privacy_tldr_title') }}
                    </h2>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div class="bg-indigo-600 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden group">
                            <div class="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500 rounded-full blur-xl opacity-50 group-hover:scale-150 transition duration-500"></div>
                            <div class="text-3xl mb-3 relative z-10">🚫</div>
                            <h3 class="font-bold text-lg mb-1 relative z-10">{{ __('privacy_tldr_1_title') }}</h3>
                            <p class="text-indigo-200 text-sm relative z-10">{{ __('privacy_tldr_1_desc') }}</p>
                        </div>
                        <div class="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition">
                            <div class="text-3xl mb-3">🗑️</div>
                            <h3 class="font-bold text-gray-900 text-lg mb-1">{{ __('privacy_tldr_2_title') }}</h3>
                            <p class="text-gray-500 text-sm">{{ __('privacy_tldr_2_desc') }}</p>
                        </div>
                        <div class="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition">
                            <div class="text-3xl mb-3">🔒</div>
                            <h3 class="font-bold text-gray-900 text-lg mb-1">{{ __('privacy_tldr_3_title') }}</h3>
                            <p class="text-gray-500 text-sm">{{ __('privacy_tldr_3_desc') }}</p>
                        </div>
                        <div class="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition">
                            <div class="text-3xl mb-3">🍪</div>
                            <h3 class="font-bold text-emerald-900 text-lg mb-1">{{ __('privacy_tldr_4_title') }}</h3>
                            <p class="text-emerald-700/70 text-sm">{{ __('privacy_tldr_4_desc') }}</p>
                        </div>
                    </div>
                </div>

                {{-- Legal Document Prose --}}
                <div class="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm prose prose-lg prose-indigo max-w-none text-gray-600 mb-16">
                    <p class="lead text-xl text-gray-500 font-medium mb-10">
                        {{ __('privacy_doc_intro') }}
                    </p>

                    <h2 id="collection" class="scroll-mt-32 font-black text-gray-900 text-3xl">{{ __('privacy_h2_collection') }}</h2>
                    <p>{{ __('privacy_p_collection') }}</p>
                    <ul>
                        <li><strong>{{ __('privacy_li_collection_1_title') }}:</strong> {{ __('privacy_li_collection_1_desc') }}</li>
                        <li><strong>{{ __('privacy_li_collection_2_title') }}:</strong> {{ __('privacy_li_collection_2_desc') }} <strong class="text-indigo-600">{{ __('privacy_li_collection_2_strong') }}</strong></li>
                        <li><strong>{{ __('privacy_li_collection_3_title') }}:</strong> {{ __('privacy_li_collection_3_desc') }}</li>
                    </ul>

                    <h2 id="usage" class="scroll-mt-32 font-black text-gray-900 text-3xl">{{ __('privacy_h2_usage') }}</h2>
                    <p>{{ __('privacy_p_usage') }}</p>
                    <ul>
                        <li>{{ __('privacy_li_usage_1') }}</li>
                        <li>{{ __('privacy_li_usage_2') }}</li>
                        <li>{{ __('privacy_li_usage_3') }}</li>
                    </ul>

                    <div class="my-8 p-6 bg-rose-50 rounded-2xl border border-rose-100">
                        <h4 class="text-rose-900 font-bold m-0 flex items-center gap-2">⚠️ {{ __('privacy_finance_note_title') }}</h4>
                        <p class="text-rose-700 text-sm mt-2 mb-0">{{ __('privacy_finance_note_desc') }}</p>
                    </div>

                    <h2 id="security" class="scroll-mt-32 font-black text-gray-900 text-3xl">{{ __('privacy_h2_security') }}</h2>
                    <p>{{ __('privacy_p_security') }}</p>

                    <h2 id="cookies" class="scroll-mt-32 font-black text-gray-900 text-3xl">{{ __('privacy_h2_cookies') }}</h2>
                    <p>{{ __('privacy_p_cookies') }}</p>

                    <h2 id="rights" class="scroll-mt-32 font-black text-gray-900 text-3xl">{{ __('privacy_h2_rights') }}</h2>
                    <p>{{ __('privacy_p_rights') }}</p>
                    <ul>
                        <li>{{ __('privacy_li_rights_1') }}</li>
                        <li>{{ __('privacy_li_rights_2') }}</li>
                        <li>{{ __('privacy_li_rights_3') }}</li>
                    </ul>

                    <h2 id="contact" class="scroll-mt-32 font-black text-gray-900 text-3xl">{{ __('privacy_h2_contact') }}</h2>
                    <p>{{ __('privacy_p_contact') }}</p>
                    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 not-prose">
                        <p class="font-bold text-gray-900 mb-1">{{ __('privacy_contact_role') }}</p>
                        <p class="text-indigo-600 font-medium mb-4">{{ __('privacy_contact_email') }}</p>
                        <p class="text-sm text-gray-500">{{ __('privacy_contact_sla') }}</p>
                    </div>
                </div>

                {{-- NEW SECTION: DATA PORTABILITY SHOWCASE --}}
                <div class="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden mb-16">
                    <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px] opacity-30 mix-blend-screen"></div>
                    
                    <div class="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div class="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-2xl text-2xl mb-6 backdrop-blur-sm border border-white/20">📦</div>
                            <h3 class="text-3xl font-black mb-4">{{ __('privacy_export_title') }}</h3>
                            <p class="text-indigo-200 text-lg leading-relaxed mb-8">
                                {{ __('privacy_export_desc') }}
                            </p>
                            <ul class="space-y-3 font-medium text-indigo-100">
                                <li class="flex items-center gap-3"><span class="text-emerald-400">✓</span> {{ __('privacy_export_point_1') }}</li>
                                <li class="flex items-center gap-3"><span class="text-emerald-400">✓</span> {{ __('privacy_export_point_2') }}</li>
                            </ul>
                        </div>
                        <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 text-sm font-mono text-indigo-300">
                            <div class="flex gap-2 mb-4 border-b border-white/10 pb-4">
                                <div class="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <p class="text-emerald-400 mb-2">// {{ __('privacy_export_code_comment') }}</p>
                            <p><span class="text-rose-400">const</span> <span class="text-blue-300">userData</span> = {</p>
                            <p class="pl-4">id: <span class="text-amber-300">"usr_8f92a"</span>,</p>
                            <p class="pl-4">habits_tracked: <span class="text-purple-300">142</span>,</p>
                            <p class="pl-4">finances: <span class="text-amber-300">"encrypted_blob"</span>,</p>
                            <p class="pl-4">export_status: <span class="text-emerald-400">"ready_for_download"</span></p>
                            <p>}</p>
                        </div>
                    </div>
                </div>

                {{-- NEW SECTION: FAQ ACCORDION --}}
                <div class="mb-16">
                    <h2 class="text-3xl font-black text-gray-900 mb-8 text-center">{{ __('privacy_faq_title') }}</h2>
                    <div class="space-y-4" x-data="{ selected: null }">
                        
                        {{-- FAQ 1 --}}
                        <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
                            <button @click="selected !== 1 ? selected = 1 : selected = null" class="w-full px-6 py-5 text-left font-bold text-gray-900 flex justify-between items-center focus:outline-none">
                                <span>{{ __('privacy_faq_1_q') }}</span>
                                <span class="text-indigo-600 transition-transform duration-300" :class="selected === 1 ? 'rotate-180' : ''">↓</span>
                            </button>
                            <div x-show="selected === 1" x-collapse>
                                <div class="px-6 pb-5 text-gray-500">{{ __('privacy_faq_1_a') }}</div>
                            </div>
                        </div>

                        {{-- FAQ 2 --}}
                        <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
                            <button @click="selected !== 2 ? selected = 2 : selected = null" class="w-full px-6 py-5 text-left font-bold text-gray-900 flex justify-between items-center focus:outline-none">
                                <span>{{ __('privacy_faq_2_q') }}</span>
                                <span class="text-indigo-600 transition-transform duration-300" :class="selected === 2 ? 'rotate-180' : ''">↓</span>
                            </button>
                            <div x-show="selected === 2" x-collapse>
                                <div class="px-6 pb-5 text-gray-500">{{ __('privacy_faq_2_a') }}</div>
                            </div>
                        </div>

                        {{-- FAQ 3 --}}
                        <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
                            <button @click="selected !== 3 ? selected = 3 : selected = null" class="w-full px-6 py-5 text-left font-bold text-gray-900 flex justify-between items-center focus:outline-none">
                                <span>{{ __('privacy_faq_3_q') }}</span>
                                <span class="text-indigo-600 transition-transform duration-300" :class="selected === 3 ? 'rotate-180' : ''">↓</span>
                            </button>
                            <div x-show="selected === 3" x-collapse>
                                <div class="px-6 pb-5 text-gray-500">{{ __('privacy_faq_3_a') }}</div>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    </section>

    {{-- SECTION 3: TRUST CTA --}}
    <section class="py-24 px-6 bg-white border-t border-gray-100 text-center">
        <div class="max-w-3xl mx-auto">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full text-3xl mb-6 shadow-inner">🤝</div>
            <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">{{ __('privacy_cta_title') }}</h2>
            <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium">
                {{ __('privacy_cta_desc') }}
            </p>
            <a href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                {{ __('privacy_cta_btn') }}
            </a>
        </div>
    </section>

@endsection