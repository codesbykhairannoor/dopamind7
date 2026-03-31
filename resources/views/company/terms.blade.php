@extends('layouts.marketing')

@section('title', __('terms_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('terms_meta_desc') }}">
    <meta property="og:title" content="{{ __('terms_meta_og_title') }}">
    <meta property="og:description" content="{{ __('terms_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/company/terms') }}">
@endsection

@section('content')

    {{-- 🔥 PREMIUM HEADER: THE LEGAL BLUEPRINT 🔥 --}}
    <header class="relative pt-32 pb-24 px-6 bg-slate-900 overflow-hidden border-b border-white/5">
        
        {{-- Glow Effects --}}
        <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto relative z-10 text-center animate-in fade-in slide-in-from-top-12 duration-1000">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-mono text-[10px] mb-8 uppercase tracking-widest backdrop-blur-md">
                🧾 {{ __('terms_badge') }}
            </div>

            <h1 class="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8">
                {{ __('terms_title_1') }} <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                    {{ __('terms_title_2') }}
                </span>
            </h1>

            <p class="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
                {{ __('terms_subtitle') }}
            </p>

            <div class="flex justify-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest border-t border-white/5 pt-8 w-fit mx-auto">
                <span>{{ __('terms_effective_date') }}</span>
                <span>•</span>
                <span>v2.0_SECURE</span>
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
                        <span class="w-1 h-3 bg-emerald-500 rounded-full"></span>
                        {{ __('terms_nav_title') }}
                    </h3>
                    <nav class="space-y-1 font-bold text-[13px] text-slate-500" x-data="{ active: 'intro' }">
                        <a href="#intro" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'intro' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'intro'">1. Pendahuluan</a>
                        <a href="#eligibility" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'eligibility' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'eligibility'">2. Kriteria</a>
                        <a href="#rules" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'rules' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'rules'">3. Aturan Main</a>
                        <a href="#payment" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'payment' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'payment'">4. Pembayaran</a>
                        <a href="#intellectual" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'intellectual' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'intellectual'">5. Hak Kekayaan</a>
                        <a href="#termination" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'termination' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'termination'">6. Pengakhiran</a>
                        <a href="#liability" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'liability' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'liability'">7. Kewajiban</a>
                    </nav>
                </div>
            </aside>

            {{-- PROSE CONTENT --}}
            <main class="w-full lg:w-3/4">
                
                <div class="bg-white p-8 md:p-14 rounded-[3.5rem] border border-slate-200 shadow-sm prose prose-lg prose-indigo max-w-none text-slate-600 mb-16">
                    <div id="intro" class="scroll-mt-32">
                        <p class="lead text-2xl text-slate-800 font-medium mb-12 leading-relaxed">
                            {{ __('terms_intro_text') }} {{ __('terms_intro_sub') }}
                        </p>
                    </div>

                    <h2 id="eligibility" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_eligibility') }}</h2>
                    <p>{{ __('terms_p_eligibility') }}</p>
                    <ul class="marker:text-indigo-600">
                        <li>{{ __('terms_eligibility_1') }}</li>
                        <li>{{ __('terms_eligibility_2') }}</li>
                    </ul>

                    <h2 id="rules" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_rules') }}</h2>
                    <p>{{ __('terms_p_rules') }}</p>
                    <div class="grid sm:grid-cols-2 gap-8 not-prose my-10">
                        <div class="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 shadow-inner">
                            <h4 class="text-emerald-900 font-black mb-4 flex items-center gap-2">
                                <span class="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                                {{ __('terms_rules_do_title') }}
                            </h4>
                            <ul class="space-y-3 text-emerald-800/80 font-bold text-sm">
                                <li>• {{ __('terms_rules_do_1') }}</li>
                                <li>• {{ __('terms_rules_do_2') }}</li>
                                <li>• {{ __('terms_rules_do_3') }}</li>
                            </ul>
                        </div>
                        <div class="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100 shadow-inner">
                            <h4 class="text-rose-900 font-black mb-4 flex items-center gap-2">
                                <span class="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs">✕</span>
                                {{ __('terms_rules_dont_title') }}
                            </h4>
                            <ul class="space-y-3 text-rose-800/80 font-bold text-sm">
                                <li>• {{ __('terms_rules_dont_1') }}</li>
                                <li>• {{ __('terms_rules_dont_2') }}</li>
                                <li>• {{ __('terms_rules_dont_3') }}</li>
                            </ul>
                        </div>
                    </div>

                    <h2 id="payment" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_payment') }}</h2>
                    <p>{{ __('terms_p_payment') }}</p>
                    <ul>
                        <li><strong>{{ __('terms_li_payment_1_title') }}:</strong> {{ __('terms_li_payment_1_desc') }}</li>
                        <li><strong>{{ __('terms_li_payment_2_title') }}:</strong> {{ __('terms_li_payment_2_desc') }}</li>
                    </ul>

                    <div class="my-10 p-8 bg-amber-50 rounded-3xl border border-amber-200 flex gap-6 items-start">
                        <span class="text-3xl mt-1">💳</span>
                        <div class="not-prose">
                            <h4 class="text-amber-900 font-black text-lg mb-2">Kebijakan Midtrans/Stripe</h4>
                            <p class="text-amber-800/80 text-sm leading-relaxed">Pembayaran Anda diproses oleh pihak ketiga. Kami tidak menyimpan darta kartu kredit Anda. Kegagalan pembayaran dapat menyebabkan penghentian fitur Pro secara instan.</p>
                        </div>
                    </div>

                    <h2 id="intellectual" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_intellectual') }}</h2>
                    <p>{{ __('terms_p_intellectual') }}</p>

                    <h2 id="termination" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_termination') }}</h2>
                    <p>{{ __('terms_p_termination') }}</p>

                    <h2 id="liability" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_liability') }}</h2>
                    <div class="p-8 bg-slate-900 rounded-3xl text-indigo-100 font-mono text-sm leading-relaxed border-l-[12px] border-indigo-500">
                        {{ __('terms_legal_caps') }}
                    </div>
                </div>

                {{-- FINAL CTA BENTO --}}
                <div class="bg-indigo-600 rounded-[4rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden group mb-12">
                     <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] group-hover:scale-110 transition duration-1000"></div>
                     <div class="relative z-10 text-center">
                         <h3 class="text-4xl font-black mb-6 tracking-tight">{{ __('terms_cta_title') }}</h3>
                         <p class="text-indigo-100 text-xl mb-12 max-w-xl mx-auto opacity-80">
                             {{ __('terms_cta_desc') }}
                         </p>
                         <div class="flex flex-col sm:flex-row justify-center gap-4">
                             <a hx-boost="false" href="{{ route('register') }}" class="px-12 py-5 bg-white text-indigo-600 rounded-full font-black text-xl hover:shadow-2xl hover:-translate-y-1 transition active:scale-95 shadow-xl">
                                {{ __('terms_cta_btn_agree') }}
                             </a>
                             <a href="{{ route('home') }}" class="px-12 py-5 bg-indigo-500/50 backdrop-blur-md text-white rounded-full font-black text-xl border border-white/20 hover:bg-indigo-500 transition">
                                {{ __('terms_cta_btn_decline') }}
                             </a>
                         </div>
                         <p class="mt-8 text-xs text-indigo-200/50 font-mono tracking-widest">{{ __('terms_cta_note') }}</p>
                     </div>
                </div>

            </main>
        </div>
    </section>

@endsection
