@extends('layouts.marketing')

@section('title', __('terms_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('terms_meta_desc') }}">
    <meta property="og:title" content="{{ __('terms_meta_og_title') }}">
    <meta property="og:description" content="{{ __('terms_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/company/terms') }}">
@endsection

@section('content')

    <header class="relative pt-32 pb-24 px-6 bg-slate-950 overflow-hidden border-b border-white/5">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        <div class="max-w-7xl mx-auto relative z-10 text-center animate-in fade-in slide-in-from-top-12 duration-1000">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded border border-rose-500/30 bg-rose-500/10 text-rose-400 font-mono text-[10px] mb-8 uppercase tracking-widest backdrop-blur-md">
                🚨 {{ __('terms_badge') }}
            </div>

            <h1 class="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8">
                {{ __('terms_title_1') }} <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
                    {{ __('terms_title_2') }}
                </span>
            </h1>

            <p class="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-bold">
                {{ __('terms_subtitle') }}
            </p>

            <div class="flex justify-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest pt-8 border-t border-white/5 w-fit mx-auto">
                <span>{{ __('terms_effective_date') }}</span>
                <span>•</span>
                <span>DOC_VER: 2026.B</span>
            </div>
        </div>
    </header>

    <section class="py-24 bg-[#fafafa]">
        <div class="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20 relative">
            
            <aside class="hidden lg:block w-1/4 shrink-0 relative">
                <div class="sticky top-28 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <h3 class="font-black text-slate-900 mb-6 uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                        <span class="w-1 h-3 bg-rose-600 rounded-full"></span>
                        {{ __('terms_nav_title') }}
                    </h3>
                    <nav class="space-y-1 font-bold text-[15px] text-slate-500" x-data="{ active: 'intro' }">
                        <a href="#intro" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'intro' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'intro'">{{ __('terms_nav_1') }}</a>
                        <a href="#eligibility" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'eligibility' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'eligibility'">{{ __('terms_nav_2') }}</a>
                        <a href="#rules" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'rules' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'rules'">{{ __('terms_nav_3') }}</a>
                        <a href="#payment" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'payment' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'payment'">{{ __('terms_nav_4') }}</a>
                        <a href="#intellectual" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'intellectual' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'intellectual'">{{ __('terms_nav_5') }}</a>
                        <a href="#termination" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'termination' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'termination'">{{ __('terms_nav_6') }}</a>
                        <a href="#dispute" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'dispute' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'dispute'">{{ __('terms_nav_7') }}</a>
                        <a href="#liability" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-indigo-600" :class="active === 'liability' ? 'bg-indigo-50 text-indigo-600' : ''" @click="active = 'liability'">{{ __('terms_nav_8') }}</a>
                    </nav>
                </div>
            </aside>

            <main class="w-full lg:w-3/4">
                <div class="bg-white p-8 md:p-14 rounded-[3.5rem] border border-slate-200 shadow-sm prose prose-lg prose-indigo max-w-none text-slate-600 mb-16">
                    
                    {{-- LOUD NOTICE --}}
                    <div class="mb-16 p-8 bg-rose-50 border-2 border-rose-200 rounded-[2.5rem] not-prose">
                        <h4 class="text-rose-900 font-black text-xl mb-4 flex items-center gap-3">
                            <span>⚠️</span> PEMBERITAHUAN PENTING: NO-REFUND
                        </h4>
                        <p class="text-rose-800 font-bold leading-relaxed m-0">
                            OneForMind memberikan masa uji coba (Trial) selama 14 hari bagi semua pengguna baru guna mengevaluasi layanan. Setelah Anda melakukan deposit atau pembayaran langganan, Anda melepaskan hak untuk meminta refund dalam bentuk apa pun. Semua transaksi bersifat FINAL.
                        </p>
                    </div>

                    <div id="intro" class="scroll-mt-32">
                        <p class="lead text-2xl text-slate-800 font-medium mb-12 leading-relaxed italic">
                            {{ __('terms_intro_text') }} {{ __('terms_intro_sub') }}
                        </p>
                    </div>

                    <h2 id="eligibility" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_eligibility') }}</h2>
                    <p>{{ __('terms_p_eligibility') }}</p>
                    <ul class="marker:text-indigo-600 font-bold">
                        <li>{{ __('terms_eligibility_1') }}</li>
                        <li>{{ __('terms_eligibility_2') }}</li>
                    </ul>

                    <h2 id="rules" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_rules') }}</h2>
                    <p>{{ __('terms_p_rules') }}</p>

                    <h2 id="payment" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_payment') }}</h2>
                    <p>{{ __('terms_p_payment') }}</p>
                    <ul class="font-bold">
                        <li>{{ __('terms_li_payment_1_title') }}: {{ __('terms_li_payment_1_desc') }}</li>
                        <li class="text-rose-600">{{ __('terms_li_payment_2_title') }}: {{ __('terms_li_payment_2_desc') }}</li>
                    </ul>

                    <h2 id="intellectual" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_intellectual') }}</h2>
                    <p>{{ __('terms_p_intellectual') }}</p>

                    <h2 id="termination" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_termination') }}</h2>
                    <p>{{ __('terms_p_termination') }}</p>

                    <h2 id="dispute" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_dispute') }}</h2>
                    <p>{{ __('terms_p_dispute') }}</p>

                    <h2 id="liability" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('terms_h2_liability') }}</h2>
                    <div class="p-8 bg-slate-900 rounded-3xl text-indigo-100 font-mono text-xs leading-relaxed border-l-[12px] border-rose-500 shadow-2xl">
                        {{ __('terms_legal_caps') }}
                    </div>
                </div>

                <div class="bg-indigo-600 rounded-[4rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden group mb-12">
                     <div class="relative z-10 text-center">
                         <h3 class="text-4xl font-black mb-6 tracking-tight">{{ __('terms_cta_title') }}</h3>
                         <p class="text-indigo-100 text-xl mb-12 max-w-xl mx-auto opacity-80 font-bold">
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
                     </div>
                </div>
            </main>
        </div>
    </section>

@endsection
