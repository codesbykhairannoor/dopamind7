@extends('layouts.marketing')

@section('title', __('refund_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('refund_meta_desc') }}">
    <meta property="og:title" content="{{ __('refund_meta_og_title') }}">
    <meta property="og:description" content="{{ __('refund_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/company/refund') }}">
@endsection

@section('content')

    <header class="relative pt-32 pb-24 px-6 bg-slate-900 overflow-hidden border-b border-white/5">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto relative z-10 text-center">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded border border-rose-500/30 bg-rose-500/10 text-rose-400 font-mono text-[10px] mb-8 uppercase tracking-widest backdrop-blur-md">
                🛑 {{ __('refund_badge') }}
            </div>

            <h1 class="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8">
                {{ __('refund_title_1') }} <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-rose-300">
                    {{ __('refund_title_2') }}
                </span>
            </h1>

            <p class="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-bold leading-relaxed">
                {{ __('refund_subtitle') }}
            </p>

            <div class="flex justify-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest pt-8">
                <span>{{ __('refund_effective_date') }}</span>
                <span>•</span>
                <span>DOC_ID: RFD-2026-FINAL-BINDING</span>
            </div>
        </div>
    </header>

    <section class="py-24 bg-[#fafafa]">
        <div class="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20 relative">
            
            <aside class="hidden lg:block w-1/4 shrink-0 relative">
                <div class="sticky top-28 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                    <div class="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl"></div>
                    
                    <h3 class="font-black text-slate-900 mb-6 uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                        <span class="w-1 h-3 bg-rose-500 rounded-full"></span>
                        {{ __('refund_nav_title') }}
                    </h3>
                    <nav class="space-y-1 font-bold text-[13px] text-slate-500" x-data="{ active: 'guarantee' }">
                        <a href="#guarantee" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-rose-600" :class="active === 'guarantee' ? 'bg-rose-50 text-rose-600' : ''" @click="active = 'guarantee'">1. Kebijakan No-Refund</a>
                        <a href="#process" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-rose-600" :class="active === 'process' ? 'bg-rose-50 text-rose-600' : ''" @click="active = 'process'">2. Pembatalan</a>
                        <a href="#cancellation" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-rose-600" :class="active === 'cancellation' ? 'bg-rose-50 text-rose-600' : ''" @click="active = 'cancellation'">3. Pihak Ketiga</a>
                        <a href="#exclusion" class="block px-4 py-3 rounded-2xl transition hover:bg-slate-50 hover:text-rose-600" :class="active === 'exclusion' ? 'bg-rose-50 text-rose-600' : ''" @click="active = 'exclusion'">4. Pengecualian</a>
                    </nav>
                </div>
            </aside>

            <main class="w-full lg:w-3/4">
                <div class="bg-white p-8 md:p-14 rounded-[3.5rem] border border-slate-200 shadow-sm prose prose-lg prose-indigo max-w-none text-slate-600 mb-16">
                    
                    <div class="flex items-center gap-6 p-10 bg-slate-900 rounded-[3rem] text-white not-prose mb-16 shadow-2xl relative overflow-hidden group">
                        <div class="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-transparent"></div>
                        <div class="text-6xl group-hover:rotate-12 transition">🛡️</div>
                        <div class="relative z-10">
                            <h4 class="text-2xl font-black mb-2 tracking-tight">Perlindungan Merchant</h4>
                            <p class="text-slate-400 font-bold leading-relaxed mb-0">
                                Transaksi Anda dilindungi oleh aturan hukum transaksional digital yang menyatakan bahwa produk instan yang sudah dibuka/digunakan tidak dapat dikembalikan.
                            </p>
                        </div>
                    </div>

                    <h2 id="guarantee" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('refund_h2_guarantee') }}</h2>
                    <p class="font-bold text-slate-800">{{ __('refund_p_guarantee') }}</p>
                    <ul class="marker:text-rose-600 font-bold italic">
                        <li>{{ __('refund_li_guarantee_1') }}</li>
                        <li>{{ __('refund_li_guarantee_2') }}</li>
                    </ul>

                    <h2 id="process" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('refund_h2_process') }}</h2>
                    <p>{{ __('refund_p_process') }}</p>
                    <div class="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 not-prose mb-12 shadow-inner">
                        <div class="space-y-6">
                            <p class="font-bold text-slate-900 m-0">Langkah Mandiri (User Responsibility):</p>
                            <div class="flex items-center gap-6">
                                <span class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-rose-500 border border-slate-200 shadow-sm">01</span>
                                <p class="m-0 text-slate-800 font-bold">{{ __('refund_li_process_1') }}</p>
                            </div>
                            <div class="flex items-center gap-6">
                                <span class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-rose-500 border border-slate-200 shadow-sm">02</span>
                                <p class="m-0 text-slate-800 font-bold">{{ __('refund_li_process_2') }}</p>
                            </div>
                            <div class="flex items-center gap-6">
                                <span class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-rose-500 border border-slate-200 shadow-sm">03</span>
                                <p class="m-0 text-slate-800 font-bold">{{ __('refund_li_process_3') }}</p>
                            </div>
                        </div>
                    </div>

                    <h2 id="cancellation" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('refund_h2_cancellation') }}</h2>
                    <p>{{ __('refund_p_cancellation') }}</p>
                    <ul class="font-bold">
                        <li>{{ __('refund_li_cancellation_1') }}</li>
                        <li>{{ __('refund_li_cancellation_2') }}</li>
                    </ul>

                    <h2 id="exclusion" class="scroll-mt-32 font-black text-slate-900 text-4xl mb-8">{{ __('refund_h2_exclusion') }}</h2>
                    <div class="p-8 bg-rose-50 rounded-3xl border border-rose-100 text-rose-900 text-sm leading-relaxed font-black uppercase">
                        🚫 {{ __('refund_p_exclusion') }}
                    </div>
                </div>

                <div class="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden group mb-12">
                     <div class="relative z-10 text-center">
                         <h3 class="text-4xl font-black mb-6 tracking-tight">{{ __('refund_cta_title') }}</h3>
                         <p class="text-slate-400 text-xl mb-12 max-w-xl mx-auto opacity-80 font-bold">
                             {{ __('refund_cta_desc') }}
                         </p>
                         <div class="px-10 py-4 bg-white/5 border border-white/10 rounded-full font-black text-indigo-300 w-fit mx-auto backdrop-blur-md">
                            Kontak: oneformindapp@gmail.com
                         </div>
                     </div>
                </div>

            </main>
        </div>
    </section>

@endsection
