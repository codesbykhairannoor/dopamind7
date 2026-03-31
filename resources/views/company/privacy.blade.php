@extends('layouts.marketing')

@section('title', __('privacy_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('privacy_meta_desc') }}">
    <meta property="og:title" content="{{ __('privacy_meta_og_title') }}">
    <meta property="og:description" content="{{ __('privacy_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/company/privacy') }}">
@endsection

@section('json-ld')
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{ __('privacy_meta_title') }}",
  "description": "{{ __('privacy_meta_desc') }}"
}
</script>
@endsection

@section('content')

    {{-- 🔥 PREMIUM HEADER: THE DIGITAL VAULT 🔥 --}}
    <header class="relative pt-32 pb-24 px-6 bg-slate-950 overflow-hidden border-b border-white/5">
        
        {{-- 1. Tech Grid Background --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)] opacity-20"></div>
        
        {{-- 2. Ambient Spotlights --}}
        <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div class="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            
            {{-- LEFT: Typography & Status --}}
            <div class="animate-in slide-in-from-left-8 fade-in duration-700">
                <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-mono text-[10px] mb-8 uppercase tracking-[0.2em] backdrop-blur-md">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {{ __('privacy_badge') }}
                </div>

                <h1 class="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                    {{ __('privacy_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
                        {{ __('privacy_title_2') }}
                    </span>
                </h1>

                <p class="text-xl text-slate-400 max-w-xl leading-relaxed mb-12 border-l-4 border-indigo-500/40 pl-8">
                    {{ __('privacy_subtitle') }}
                </p>

                {{-- Status Hub --}}
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                    <div>
                        <p class="text-[9px] text-slate-500 font-black uppercase mb-1">Protection</p>
                        <p class="text-white font-bold text-sm tracking-widest">AES-256</p>
                    </div>
                    <div>
                        <p class="text-[9px] text-slate-500 font-black uppercase mb-1">Access</p>
                        <p class="text-emerald-400 font-bold text-sm">Privat</p>
                    </div>
                    <div>
                        <p class="text-[9px] text-slate-500 font-black uppercase mb-1">Tracking</p>
                        <p class="text-white font-bold text-sm">0% Ads</p>
                    </div>
                    <div class="col-span-1">
                        <p class="text-[9px] text-slate-500 font-black uppercase mb-1">Protocol</p>
                        <p class="text-slate-300 font-bold text-[10px]">GDPR Ready</p>
                    </div>
                </div>
            </div>

            {{-- RIGHT: Visual Shield --}}
            <div class="relative hidden lg:flex justify-center items-center animate-in zoom-in-50 fade-in duration-1000 delay-200">
                <div class="relative w-96 h-96">
                    <div class="absolute inset-0 border-2 border-indigo-500/10 rounded-[3rem] rotate-12 animate-pulse"></div>
                    <div class="absolute inset-4 border border-emerald-500/20 rounded-[2.5rem] -rotate-6 animate-[spin_20s_linear_infinite]"></div>
                    
                    <div class="absolute inset-0 flex items-center justify-center">
                         <div class="w-64 h-64 bg-gradient-to-br from-indigo-600/80 to-purple-800/80 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/20 shadow-[0_0_80px_-10px_rgba(79,70,229,0.5)] transform hover:scale-105 transition duration-500 group">
                             <div class="flex justify-between items-start mb-12">
                                 <div class="bg-white/10 p-3 rounded-2xl border border-white/20">
                                     <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                 </div>
                                 <div class="text-[8px] font-mono text-white/50 tracking-widest uppercase">Encryption_Active</div>
                             </div>
                             
                             <div class="space-y-4">
                                 <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                     <div class="h-full bg-emerald-400 w-[90%] transform origin-left animate-[grow_2s_ease-out]"></div>
                                 </div>
                                 <div class="h-1.5 w-2/3 bg-white/10 rounded-full overflow-hidden">
                                     <div class="h-full bg-indigo-300 w-[60%] transform origin-left animate-[grow_2.5s_ease-out_delay-300]"></div>
                                 </div>
                                 <div class="pt-6">
                                     <p class="text-white font-black text-xl leading-tight">Secure Protocol</p>
                                     <p class="text-indigo-200 text-[10px] mt-2 opacity-70">Zero-knowledge infrastructure protection.</p>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- MAIN SECTION --}}
    <section class="py-24 bg-[#fafafa]">
        <div class="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20 relative">
            
            {{-- SIDEBAR NAV --}}
            <aside class="hidden lg:block w-1/4 shrink-0 relative">
                <div class="sticky top-28 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <h3 class="font-black text-slate-900 mb-6 uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                        <span class="w-1 h-3 bg-indigo-600 rounded-full"></span>
                        {{ __('privacy_toc_title') }}
                    </h3>
                    <nav class="space-y-1 font-bold text-[13px] text-slate-500" x-data="{ active: 'tldr' }">
                        <a href="#tldr" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'tldr' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'tldr'">01. Ringkasan TL;DR</a>
                        <a href="#collection" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'collection' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'collection'">02. Pengumpulan Informasi</a>
                        <a href="#usage" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'usage' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'usage'">03. Penggunaan Data</a>
                        <a href="#security" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'security' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'security'">04. Protokol Keamanan</a>
                        <a href="#thirdparty" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'thirdparty' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'thirdparty'">05. Pihak Ketiga</a>
                        <a href="#rights" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'rights' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'rights'">06. Hak Privasi</a>
                        <a href="#contact" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'contact' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'contact'">07. Hubungi Kami</a>
                    </nav>

                    <div class="mt-12 pt-8 border-t border-slate-100">
                        <a href="#" class="flex items-center gap-3 text-xs font-black text-slate-900 hover:text-indigo-600 transition group">
                            <div class="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition shadow-sm">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            {{ __('privacy_download_pdf') }}
                        </a>
                    </div>
                </div>
            </aside>

            {{-- PROSE CONTENT --}}
            <main class="w-full lg:w-3/4">
                
                <div id="tldr" class="scroll-mt-32 mb-20">
                    <h2 class="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
                        <span class="w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-indigo-200">⚡</span>
                        {{ __('privacy_tldr_title') }}
                    </h2>
                    <div class="grid sm:grid-cols-2 gap-6 leading-relaxed">
                        <div class="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                            <h3 class="font-black text-xl mb-3">{{ __('privacy_tldr_1_title') }}</h3>
                            <p class="text-indigo-100 text-sm">{{ __('privacy_tldr_1_desc') }}</p>
                        </div>
                        <div class="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
                            <h3 class="font-black text-slate-900 text-xl mb-3">{{ __('privacy_tldr_2_title') }}</h3>
                            <p class="text-slate-500 text-sm">{{ __('privacy_tldr_2_desc') }}</p>
                        </div>
                        <div class="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
                            <h3 class="font-black text-slate-900 text-xl mb-3">{{ __('privacy_tldr_3_title') }}</h3>
                            <p class="text-slate-500 text-sm">{{ __('privacy_tldr_3_desc') }}</p>
                        </div>
                        <div class="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem] shadow-sm">
                            <h3 class="font-black text-emerald-900 text-xl mb-3">{{ __('privacy_tldr_4_title') }}</h3>
                            <p class="text-emerald-700/80 text-sm">{{ __('privacy_tldr_4_desc') }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-8 md:p-14 rounded-[3.5rem] border border-slate-200 shadow-sm prose prose-lg prose-indigo max-w-none text-slate-600 mb-16">
                    <p class="lead text-2xl text-slate-800 font-medium mb-16 leading-relaxed">
                        {{ __('privacy_doc_intro') }}
                    </p>

                    <h2 id="collection" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('privacy_h2_collection') }}</h2>
                    <p>{{ __('privacy_p_collection') }}</p>
                    <ul class="marker:text-indigo-600">
                        <li><strong>{{ __('privacy_li_collection_1_title') }}:</strong> {{ __('privacy_li_collection_1_desc') }}</li>
                        <li><strong>{{ __('privacy_li_collection_2_title') }}:</strong> {{ __('privacy_li_collection_2_desc') }} <span class="text-indigo-600 font-bold">{{ __('privacy_li_collection_2_strong') }}</span></li>
                        <li><strong>{{ __('privacy_li_collection_3_title') }}:</strong> {{ __('privacy_li_collection_3_desc') }}</li>
                    </ul>

                    <h2 id="usage" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('privacy_h2_usage') }}</h2>
                    <p>{{ __('privacy_p_usage') }}</p>
                    <ul>
                        <li>{{ __('privacy_li_usage_1') }}</li>
                        <li>{{ __('privacy_li_usage_2') }}</li>
                        <li>{{ __('privacy_li_usage_3') }}</li>
                    </ul>

                    <div class="my-10 p-8 bg-rose-50 rounded-3xl border border-rose-100 flex gap-6 items-start">
                        <span class="text-3xl mt-1">🛡️</span>
                        <div class="not-prose">
                            <h4 class="text-rose-900 font-black text-lg mb-2">{{ __('privacy_finance_note_title') }}</h4>
                            <p class="text-rose-800/80 text-sm leading-relaxed">{{ __('privacy_finance_note_desc') }}</p>
                        </div>
                    </div>

                    <h2 id="security" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('privacy_h2_security') }}</h2>
                    <p>{{ __('privacy_p_security') }}</p>

                    <h2 id="thirdparty" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('privacy_h2_thirdparty')}}</h2>
                    <p>{{ __('privacy_p_thirdparty') }}</p>

                    <h2 id="rights" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('privacy_h2_rights') }}</h2>
                    <p>{{ __('privacy_p_rights') }}</p>
                    <ul>
                        <li>{{ __('privacy_li_rights_1') }}</li>
                        <li>{{ __('privacy_li_rights_2') }}</li>
                        <li>{{ __('privacy_li_rights_3') }}</li>
                    </ul>

                    <h2 id="contact" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('privacy_h2_contact') }}</h2>
                    <p>{{ __('privacy_p_contact') }}</p>
                    <div class="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 not-prose flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-inner">
                        <div>
                            <p class="font-black text-slate-900 text-lg mb-1">{{ __('privacy_contact_role') }}</p>
                            <a href="mailto:{{ __('privacy_contact_email') }}" class="text-indigo-600 font-black text-2xl tracking-tighter hover:underline">{{ __('privacy_contact_email') }}</a>
                        </div>
                        <div class="px-6 py-3 bg-white rounded-2xl border border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest">
                            Response Time: ~24-48h
                        </div>
                    </div>
                </div>

                {{-- BENTO: PORTABILITY --}}
                <div class="bg-slate-900 rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden mb-20 group">
                    <div class="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition duration-1000"></div>
                    <div class="relative z-10">
                        <h3 class="text-4xl font-black mb-6">{{ __('privacy_export_title') }}</h3>
                        <p class="text-indigo-100 text-xl leading-relaxed mb-10 opacity-70 max-w-2xl">
                            {{ __('privacy_export_desc') }}
                        </p>
                        <ul class="grid sm:grid-cols-2 gap-4 list-none p-0">
                            <li class="flex items-center gap-3 font-black text-sm text-emerald-400">
                                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> {{ __('privacy_export_point_1') }}
                            </li>
                            <li class="flex items-center gap-3 font-black text-sm text-emerald-400">
                                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> {{ __('privacy_export_point_2') }}
                            </li>
                        </ul>
                    </div>
                </div>

                {{-- FAQ --}}
                <div class="mb-24">
                    <h2 class="text-4xl font-black text-slate-900 mb-12 text-center tracking-tight">{{ __('privacy_faq_title') }}</h2>
                    <div class="max-w-3xl mx-auto space-y-4" x-data="{ selected: null }">
                        @foreach([1, 2, 3] as $i)
                        <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                            <button @click="selected !== {{ $i }} ? selected = {{ $i }} : selected = null" class="w-full px-8 py-6 text-left font-black text-slate-900 flex justify-between items-center group">
                                <span class="group-hover:text-indigo-600 transition">{{ __("privacy_faq_{$i}_q") }}</span>
                                <div class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center transition-transform duration-300" :class="selected === {{ $i }} ? 'rotate-180 bg-indigo-600 text-white' : ''">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </button>
                            <div x-show="selected === {{ $i }}" x-collapse x-cloak>
                                <div class="px-8 pb-8 text-slate-600 leading-relaxed font-medium">
                                    {{ __("privacy_faq_{$i}_a") }}
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>

            </main>
        </div>
    </section>

    {{-- FINAL CTA --}}
    <section class="py-32 px-6 bg-white border-t border-slate-100 text-center relative overflow-hidden">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="max-w-4xl mx-auto relative z-10">
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-slate-900 tracking-tighter leading-none">{{ __('privacy_cta_title') }}</h2>
            <p class="text-2xl text-slate-500 mb-14 leading-relaxed max-w-2xl mx-auto">
                {{ __('privacy_cta_desc') }}
            </p>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-flex items-center gap-4 bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-700 hover:shadow-2xl transition transform hover:-translate-y-1 active:scale-95">
                <span>⚡</span> {{ __('privacy_cta_btn') }}
            </a>
        </div>
    </section>

@endsection
