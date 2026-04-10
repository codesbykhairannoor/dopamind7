@extends('layouts.marketing')

@section('title', __('pricing_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('pricing_meta_desc') }}">
    <meta property="og:title" content="{{ __('pricing_meta_og_title') }}">
    <meta property="og:description" content="{{ __('pricing_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/pricing') }}">
@endsection

@section('content')
    <div class="bg-white dark:bg-slate-950 transition-colors duration-500" x-data="{ isAnnual: true }">
        {{-- Header Section --}}
        <header class="pt-32 pb-16 px-6 relative overflow-hidden">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/50 dark:from-indigo-500/5 to-transparent rounded-full blur-[120px] -z-10"></div>
            
            <div class="max-w-7xl mx-auto text-center relative z-10">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold text-[10px] mb-8 uppercase tracking-widest shadow-sm border border-indigo-100 dark:border-indigo-500/20">
                    ✨ {{ __('pricing_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                    {{ __('pricing_title_1') }} <span class="text-indigo-600 dark:text-indigo-400">{{ __('pricing_title_2') }}</span>
                </h1>
                
                <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 font-bold leading-relaxed">
                    {{ __('pricing_subtitle') }}
                </p>

                {{-- Billing Toggle --}}
                <div class="flex items-center justify-center gap-6">
                    <span class="text-sm font-black transition-colors duration-300" :class="!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'">
                        {{ __('pricing_monthly') }}
                    </span>
                    <button @click="isAnnual = !isAnnual" class="relative w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-800 p-1 transition-all duration-500 hover:ring-4 hover:ring-indigo-100 dark:hover:ring-indigo-900/30">
                        <div class="w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-lg transform transition-transform duration-500" :class="isAnnual ? 'translate-x-8' : 'translate-x-0'"></div>
                    </button>
                    <span class="text-sm font-black transition-colors duration-300" :class="isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'">
                        {{ __('pricing_yearly') }}
                    </span>
                    <div class="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-tighter border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
                        {{ __('pricing_save_amount') }}
                    </div>
                </div>
            </div>
        </header>

        {{-- Pricing Grid --}}
        <section class="pb-32 px-6">
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    
                    {{-- Explorer --}}
                    <div class="group relative flex flex-col p-8 rounded-[2.5rem] bg-white/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-100 dark:shadow-none hover:-translate-y-2 transition-all duration-500">
                        <h3 class="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest mb-3 uppercase">{{ __('pricing_l1_name') }}</h3>
                        <div class="flex items-baseline gap-2 mb-6">
                            <span class="text-3xl font-black text-slate-900 dark:text-white">Rp 0</span>
                            <span class="font-bold text-xs text-slate-400 dark:text-slate-500">/{{ __('pricing_forever') }}</span>
                        </div>
                        <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed min-h-[40px]">{{ __('pricing_l1_desc') }}</p>
                        <ul class="space-y-3 mb-10 flex-grow">
                            <li class="flex items-start gap-3">
                                <span class="bg-emerald-50 dark:bg-emerald-500/10 w-4 h-4 rounded-full flex items-center justify-center text-emerald-500 text-[8px] font-black shrink-0">✓</span>
                                <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300">{{ __('pricing_feat_l1_habits') }}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="bg-emerald-50 dark:bg-emerald-500/10 w-4 h-4 rounded-full flex items-center justify-center text-emerald-500 text-[8px] font-black shrink-0">✓</span>
                                <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300">{{ __('pricing_feat_l1_finance') }}</span>
                            </li>
                        </ul>
                        <a href="{{ route('register') }}" class="w-full py-4 rounded-3xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white font-black text-xs text-center border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition shadow-lg transition-all active:scale-95">
                            {{ __('pricing_free_btn') }}
                        </a>
                    </div>

                    {{-- Architect --}}
                    <div class="group relative flex flex-col p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-xl hover:-translate-y-2 transition-all duration-500 border-t-8 border-t-indigo-600">
                        <h3 class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-widest mb-3 uppercase">{{ __('pricing_l2_name') }}</h3>
                        <div class="mb-4">
                            <div class="text-2xl font-black text-slate-900 dark:text-white" x-text="isAnnual ? 'Rp 79k' : 'Rp 99k'">Rp 79k</div>
                            <div class="text-slate-400 font-bold text-[10px]">/{{ __('pricing_month') }}</div>
                        </div>
                        <div class="mb-6">
                            <p class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-tight">{{ __('pricing_l2_initial') }}</p>
                            <p class="text-[9px] font-bold italic text-slate-400 dark:text-slate-500">{{ __('pricing_l2_recurring') }}</p>
                        </div>
                        <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed min-h-[40px]">{{ __('pricing_l2_desc') }}</p>
                        <ul class="space-y-3 mb-10 flex-grow">
                            <li class="flex items-start gap-3 font-bold text-slate-700 dark:text-slate-300">
                                <span class="bg-emerald-50 dark:bg-emerald-500/10 w-4 h-4 rounded-full flex items-center justify-center text-emerald-500 text-[8px] font-black shrink-0">✓</span>
                                <span class="text-[11px]">{{ __('pricing_feat_l2_habits') }}</span>
                            </li>
                            <li class="flex items-start gap-3 font-bold text-slate-700 dark:text-slate-300">
                                <span class="bg-emerald-50 dark:bg-emerald-500/10 w-4 h-4 rounded-full flex items-center justify-center text-emerald-500 text-[8px] font-black shrink-0">✓</span>
                                <span class="text-[11px]">{{ __('pricing_feat_l2_finance') }}</span>
                            </li>
                            <li class="flex items-start gap-3 font-bold text-indigo-600 dark:text-indigo-400">
                                <span class="bg-indigo-50 dark:bg-indigo-500/10 w-4 h-4 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-[8px] font-black shrink-0">★</span>
                                <span class="text-[11px]">{{ __('pricing_feat_month_trial') }}</span>
                            </li>
                        </ul>
                        <button hx-boost="false" data-plan="architect" class="checkout-trigger w-full py-4 rounded-3xl bg-indigo-600 text-white font-black text-xs hover:bg-indigo-700 shadow-xl shadow-indigo-100 dark:shadow-none transition-all active:scale-95">
                            {{ __('pricing_pro_btn') }}
                        </button>
                    </div>

                    {{-- Quantum --}}
                    <div class="group relative flex flex-col p-8 rounded-[3rem] bg-white dark:bg-slate-800 border-4 border-indigo-600 shadow-2xl shadow-indigo-100 dark:shadow-none lg:scale-105 z-10 transition-all duration-500">
                        <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-lg">
                            {{ __('pricing_ai_badge') }}
                        </div>
                        <h3 class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-widest mb-3 uppercase">{{ __('pricing_l3_name') }}</h3>
                        <div class="mb-4">
                            <div class="text-2xl font-black text-slate-900 dark:text-white" x-text="isAnnual ? 'Rp 109k' : 'Rp 159k'">Rp 109k</div>
                            <div class="text-slate-400 font-bold text-[10px]">/{{ __('pricing_month') }}</div>
                        </div>
                        <div class="mb-6">
                            <p class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-tight">{{ __('pricing_l3_initial') }}</p>
                            <p class="text-[9px] font-bold italic text-slate-400 dark:text-slate-500">{{ __('pricing_l3_recurring') }}</p>
                        </div>
                        <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed min-h-[40px]">{{ __('pricing_l3_desc') }}</p>
                        <ul class="space-y-3 mb-10 flex-grow">
                            <li class="flex items-start gap-3 font-bold text-indigo-600 dark:text-indigo-400">
                                <span class="bg-indigo-50 dark:bg-indigo-500/10 w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0">🤖</span>
                                <span class="text-[11px]">{{ __('pricing_feat_l3_ai_coach') }}</span>
                            </li>
                            <li class="flex items-start gap-3 font-bold text-slate-700 dark:text-slate-300">
                                <span class="bg-emerald-50 dark:bg-emerald-500/10 w-4 h-4 rounded-full flex items-center justify-center text-emerald-500 text-[8px] font-black shrink-0">✓</span>
                                <span class="text-[11px]">{{ __('pricing_feat_l3_wealth') }}</span>
                            </li>
                            <li class="flex items-start gap-3 font-bold text-indigo-600 dark:text-indigo-400">
                                <span class="bg-indigo-50 dark:bg-indigo-500/10 w-4 h-4 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-[8px] font-black shrink-0">✓</span>
                                <span class="text-[11px]">{{ __('pricing_feat_l3_insights') }}</span>
                            </li>
                        </ul>
                        <button hx-boost="false" data-plan="quantum" class="checkout-trigger w-full py-5 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs hover:bg-black dark:hover:bg-indigo-50 shadow-xl transition-all active:scale-95">
                            {{ __('pricing_ai_btn') }}
                        </button>
                    </div>

                    {{-- Legendary --}}
                    <div class="group relative flex flex-col p-8 rounded-[2.5rem] bg-slate-900 dark:bg-black border border-slate-800 shadow-2xl hover:-translate-y-2 transition-all duration-500 text-white relative">
                        <div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-1.5 rounded-full bg-amber-500 text-white text-[8px] font-black tracking-widest shadow-lg whitespace-nowrap z-20 border border-white/20">
                            {{ __('pricing_l4_badge') }}
                        </div>
                        <h3 class="text-[10px] font-black text-indigo-400 tracking-widest mb-3 uppercase">{{ __('pricing_l4_name') }}</h3>
                        <div class="mb-4">
                            <div class="text-3xl font-black text-white leading-tight">Rp 899k</div>
                            <div class="text-indigo-400 font-bold text-xs italic">One-Time</div>
                        </div>
                        <div class="mb-6">
                            <p class="text-[10px] font-black text-amber-500 tracking-tight">One-Time Payment</p>
                            <p class="text-[9px] font-bold italic text-amber-500">{{ __('pricing_feat_l4_triggers') }}</p>
                        </div>
                        <p class="text-slate-400 text-[11px] mb-8 leading-relaxed min-h-[40px]">{{ __('pricing_l4_desc') }}</p>
                        <ul class="space-y-3 mb-10 flex-grow text-slate-300">
                            <li class="flex items-start gap-3">
                                <span class="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-[10px] font-black shrink-0">★</span>
                                <span class="text-[11px] font-bold">Lifetime Pro Access</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-[10px] font-black shrink-0">★</span>
                                <span class="text-[11px] font-bold">Unlocks All Modules</span>
                            </li>
                            <li class="flex items-start gap-3 border-t border-white/10 pt-3 opacity-40">
                                <span class="w-4 h-4 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 text-[8px] font-black shrink-0">✕</span>
                                <span class="text-[11px] font-bold">Excludes Neural AI Features</span>
                            </li>
                        </ul>
                        <button hx-boost="false" data-plan="lifetime" class="checkout-trigger w-full py-4 rounded-3xl bg-white text-slate-900 font-black text-xs hover:bg-slate-50 transition shadow-lg transition-all active:scale-95">
                            {{ __('pricing_l4_btn') }}
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {{-- Elite Experience --}}
        <section class="py-32 px-6">
            <div class="max-w-7xl mx-auto">
                <div class="relative overflow-hidden rounded-[4rem] bg-slate-900 border border-slate-800 p-8 md:p-20 group">
                    <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                    <div class="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full"></div>
                    
                    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest mb-6">
                                LEADERSHIP & PERFORMANCE
                            </div>
                            <h2 class="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
                                {{ __('quantum_feature') }} <br/>
                                <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">{{ __('pricing_elite_title') }}</span>
                            </h2>
                            <div class="space-y-6">
                                @for ($i = 1; $i <= 3; $i++)
                                <div class="flex gap-4">
                                    <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-xl shadow-inner">
                                        {{ $i === 1 ? '🧠' : ($i === 2 ? '⚡' : '🌈') }}
                                    </div>
                                    <div>
                                        <h4 class="text-white font-black text-sm mb-1">
                                            {{ __('pricing_elite_feat' . $i . '_title') }}
                                        </h4>
                                        <p class="text-slate-400 text-xs leading-relaxed font-bold">
                                            {{ __('pricing_elite_feat' . $i . '_desc') }}
                                        </p>
                                    </div>
                                </div>
                                @endfor
                            </div>
                        </div>
                        
                        <div class="relative group/card">
                            <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-amber-500/20 blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                            <div class="relative aspect-square rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-8 shadow-2xl overflow-hidden">
                                <div class="absolute top-0 right-0 p-8 transform rotate-12 group-hover/card:rotate-0 transition-transform duration-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400/10">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                </div>
                                <div class="h-full flex flex-col justify-end">
                                    <div class="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                                        <div class="flex items-center gap-4 mb-4">
                                            <div class="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-black">Q</div>
                                            <div>
                                                <p class="text-white font-black text-xs">{{ __('pricing_elite_card_title') }}</p>
                                                <p class="text-[10px] text-slate-500 font-bold uppercase">{{ __('pricing_elite_card_status') }}</p>
                                            </div>
                                        </div>
                                        <div class="h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div class="h-full w-2/3 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection

@push('scripts')
<script>
    function openCheckout(planId) {
        @auth
            window.location.href = "{{ route('billing') }}?plan=" + planId;
        @else
            window.location.href = "{{ route('register') }}?plan=" + planId;
        @endauth
    }

    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('.checkout-trigger');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const planId = btn.getAttribute('data-plan');
                openCheckout(planId);
            });
        });
    });
</script>
@endpush
