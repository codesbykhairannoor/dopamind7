@extends('layouts.marketing')

@section('title', __('pricing_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('pricing_meta_desc') }}">
    <meta property="og:title" content="{{ __('pricing_meta_og_title') }}">
    <meta property="og:description" content="{{ __('pricing_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/pricing') }}">
@endsection

@section('content')
    <div class="bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden" x-data="{ isAnnual: true }">
        {{-- High-Impact Hero --}}
        <header class="pt-32 pb-16 px-6 relative text-center">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[800px] bg-[radial-gradient(circle_at_50%_0%,#4f46e515_0,transparent_50%)] -z-10"></div>
            
            <div class="max-w-7xl mx-auto relative z-10">
                <div class="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-black text-[10px] mb-10 uppercase tracking-[0.3em] shadow-sm border border-indigo-100 dark:border-indigo-500/20">
                    <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    {{ __('pricing_badge') }}
                </div>
                
                <h1 class="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
                    Investasi pada<br/>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">Diri Sendiri.</span>
                </h1>
                
                <p class="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-16 font-bold leading-relaxed">
                    Mulai gratis atau buka seluruh ekosistem. Pilih paket yang berkembang seiring kemajuan hidup Anda.
                </p>

                {{-- Billing Toggle --}}
                <div class="flex items-center justify-center gap-8 mb-20">
                    <span class="text-sm font-black transition-all duration-300" :class="!isAnnual ? 'text-slate-900 dark:text-white scale-110' : 'text-slate-400 opacity-50'">
                        {{ __('pricing_monthly') }}
                    </span>
                    <button @click="isAnnual = !isAnnual" class="relative w-20 h-10 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 transition-all duration-500 hover:scale-105 shadow-inner">
                        <div class="w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-xl transform transition-transform duration-500" :class="isAnnual ? 'translate-x-10' : 'translate-x-0'"></div>
                    </button>
                    <span class="text-sm font-black transition-all duration-300" :class="isAnnual ? 'text-slate-900 dark:text-white scale-110' : 'text-slate-400 opacity-50'">
                        {{ __('pricing_yearly') }}
                    </span>
                    <div class="hidden sm:block px-4 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 animate-bounce">
                        SAVE 40%
                    </div>
                </div>
            </div>
        </header>

        {{-- Premium Pricing Grid --}}
        <section class="pb-32 px-6">
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
                    
                    {{-- 1. Explorer --}}
                    <div class="group relative flex flex-col p-10 rounded-[3rem] bg-white/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-4 transition-all duration-700 hover:shadow-2xl">
                        <div class="mb-10">
                            <span class="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">{{ __('pricing_l1_name') }}</span>
                            <div class="mt-4 flex items-baseline gap-1">
                                <span class="text-4xl font-black text-slate-900 dark:text-white">Free</span>
                            </div>
                        </div>
                        
                        <p class="text-xs font-bold text-slate-500 dark:text-slate-400 mb-10 leading-relaxed min-h-[48px]">Mulai perjalanan Anda dengan alat dasar yang powerful.</p>
                        
                        <ul class="space-y-4 mb-12 flex-grow">
                            <li class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-[8px] font-black">✓</div>
                                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ __('pricing_f_habit_open') }}</span>
                            </li>
                            <li class="flex items-center gap-3 opacity-40">
                                <div class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 text-[8px] font-black">🔒</div>
                                <span class="text-xs font-bold text-slate-500">{{ __('pricing_f_batch_habit_locked') }}</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-[8px] font-black">✓</div>
                                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ __('pricing_f_planner_tab_open') }}</span>
                            </li>
                            <li class="flex items-center gap-3 opacity-40">
                                <div class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 text-[8px] font-black">🔒</div>
                                <span class="text-xs font-bold text-slate-500 dark:text-slate-400">{{ __('pricing_f_batch_planner_locked') }}</span>
                            </li>
                            <li class="flex items-center gap-3 opacity-40">
                                <div class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 text-[8px] font-black">🔒</div>
                                <span class="text-xs font-bold text-slate-500 dark:text-slate-400">{{ __('pricing_f_vault_locked') }}</span>
                            </li>
                        </ul>

                        <a href="{{ route('register') }}" class="w-full py-5 rounded-3xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white font-black text-xs text-center border border-slate-200 dark:border-slate-600 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none">
                            {{ __('pricing_free_btn') }}
                        </a>
                    </div>

                    {{-- 2. Architect --}}
                    <div class="group relative flex flex-col p-10 rounded-[3rem] bg-white dark:bg-slate-800 border-4 border-indigo-50 shadow-2xl hover:-translate-y-4 transition-all duration-700">
                        <div class="mb-10">
                            <span class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-[0.2em] uppercase">{{ __('pricing_l2_name') }}</span>
                            <div class="mt-4 flex items-baseline gap-1">
                                <span class="text-4xl font-black text-slate-900 dark:text-white" x-text="isAnnual ? '{{ App::getLocale() == 'id' ? 'Rp 79k' : '$4.99' }}' : '{{ App::getLocale() == 'id' ? 'Rp 99k' : '$6.99' }}'"></span>
                                <span class="text-xs font-bold text-slate-400 tracking-tighter">/bln</span>
                            </div>
                        </div>

                        <p class="text-xs font-bold text-slate-600 dark:text-slate-300 mb-10 leading-relaxed min-h-[48px]">Bangun sistem produktivitas utuh dengan akses tanpa batas.</p>
                        
                        <ul class="space-y-4 mb-12 flex-grow border-t border-slate-50 dark:border-slate-700 pt-8">
                            <li class="flex items-center justify-center py-2 mb-2 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-xl border border-indigo-100 dark:border-indigo-500/10">
                                <span class="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{{ __('pricing_feature_header_explorer_plus') }}</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-[10px] font-black italic">★</div>
                                <span class="text-xs font-black text-slate-900 dark:text-white">{{ __('pricing_f_all_tabs_open') }}</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-[8px] font-black">✓</div>
                                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ __('pricing_f_batch_unlocked') }}</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-[8px] font-black">✓</div>
                                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ __('pricing_f_financial_ecosystem') }}</span>
                            </li>
                            <li class="flex items-center gap-3 opacity-40">
                                <div class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 text-[8px] font-black">🔒</div>
                                <span class="text-xs font-bold text-slate-400 tracking-tight">{{ __('pricing_f_ai_coach_locked') }}</span>
                            </li>
                        </ul>

                        <button onclick="openCheckout('architect')" class="w-full py-5 rounded-3xl bg-indigo-600 text-white font-black text-xs hover:bg-indigo-700 shadow-xl shadow-indigo-100 dark:shadow-none transition-all active:scale-95">
                            {{ __('pricing_pro_btn') }}
                        </button>
                    </div>

                    {{-- 3. Quantum --}}
                    <div class="group relative flex flex-col p-10 rounded-[3.5rem] bg-slate-900 border-4 border-indigo-500/20 shadow-[0_0_80px_rgba(79,70,229,0.15)] lg:scale-105 z-10 hover:-translate-y-4 transition-all duration-700">
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent rounded-[3.5rem] overflow-hidden"></div>
                        
                        <div class="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-indigo-600 text-white text-[9px] font-black tracking-[0.2em] uppercase shadow-lg border border-white/20 animate-pulse">
                            {{ __('pricing_ai_badge') }}
                        </div>

                        <div class="mb-10 relative">
                            <span class="text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase">{{ __('pricing_l3_name') }}</span>
                            <div class="mt-4 flex items-baseline gap-1 text-white">
                                <span class="text-4xl font-black" x-text="isAnnual ? '{{ App::getLocale() == 'id' ? 'Rp 109k' : '$6.99' }}' : '{{ App::getLocale() == 'id' ? 'Rp 159k' : '$9.99' }}'"></span>
                                <span class="text-xs font-bold opacity-50 tracking-tighter">/bln</span>
                            </div>
                        </div>

                        <p class="text-xs font-bold text-slate-400 mb-10 leading-relaxed min-h-[48px]">Tingkatkan performa hidup Anda dengan asisten kecerdasan syaraf buatan.</p>
                        
                        <ul class="space-y-4 mb-12 flex-grow relative border-t border-white/5 pt-8">
                            <li class="flex items-center justify-center py-2 mb-2 bg-white/5 rounded-xl border border-white/10">
                                <span class="text-[9px] font-black text-indigo-300 uppercase tracking-widest">{{ __('pricing_feature_header_architect_plus') }}</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-[14px]">🤖</span>
                                <span class="text-xs font-black text-white">{{ __('pricing_f_ai_full_access') }}</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-[8px] font-black animate-pulse">✨</div>
                                <span class="text-xs font-bold text-indigo-200">{{ __('pricing_f_ai_insights') }}</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-[8px] font-black">✓</div>
                                <span class="text-xs font-medium text-slate-400">{{ __('pricing_f_neural_sync') }}</span>
                            </li>
                        </ul>

                        <button onclick="openCheckout('quantum')" class="relative w-full py-6 rounded-[2rem] bg-white text-slate-950 font-black text-xs hover:scale-105 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            BUKA NEURAL OS
                        </button>
                    </div>

                    {{-- 4. Legendary --}}
                    <div class="group relative flex flex-col p-10 rounded-[3rem] bg-white dark:bg-black border border-slate-200 dark:border-slate-800 hover:-translate-y-4 transition-all duration-700 hover:shadow-2xl">
                        <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-amber-500 text-white text-[8px] font-black tracking-widest whitespace-nowrap shadow-lg">
                            {{ __('pricing_l4_badge') }}
                        </div>

                        <div class="mb-10">
                            <span class="text-[10px] font-black text-amber-600 dark:text-amber-500 tracking-[0.2em] uppercase">{{ __('pricing_l4_name') }}</span>
                            <div class="mt-4 flex items-baseline gap-2">
                                <span class="text-3xl font-black text-slate-900 dark:text-white">{{ App::getLocale() == 'id' ? 'Rp 899k' : '$59.00' }}</span>
                            </div>
                            <div class="text-[9px] font-black text-amber-500 mt-1 uppercase tracking-tighter">Sekali Bayar Selamanya</div>
                        </div>

                        <p class="text-xs font-bold text-slate-500 dark:text-slate-400 mb-10 leading-relaxed min-h-[48px]">Investasi terbaik untuk kemerdekaan finansial & produktivitas.</p>
                        
                        <ul class="space-y-4 mb-12 flex-grow border-t border-slate-50 dark:border-slate-800 pt-8">
                            <li class="flex items-center justify-center py-2 mb-2 bg-amber-500/5 rounded-xl border border-amber-500/10">
                                <span class="text-[9px] font-black text-amber-500 uppercase tracking-widest">{{ __('pricing_feature_header_quantum_plus') }}</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-[14px]">💎</span>
                                <span class="text-xs font-black text-slate-900 dark:text-white">{{ __('pricing_f_lifetime_access') }}</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 text-[8px] font-black">★</div>
                                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ __('pricing_f_legendary_trial_ai') }}</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[8px] font-black text-emerald-500">✓</div>
                                <span class="text-xs font-medium text-slate-500">VIP Founding Support</span>
                            </li>
                        </ul>

                        <button onclick="openCheckout('lifetime')" class="w-full py-5 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs hover:bg-black dark:hover:bg-slate-200 shadow-xl transition-all active:scale-95">
                            {{ __('pricing_l4_btn') }}
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {{-- Expanded Comparison Table --}}
        <section class="py-40 bg-slate-50/50 dark:bg-slate-900/30">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center mb-24">
                    <h2 class="text-4xl font-black text-slate-900 dark:text-white mb-6">{{ __('pricing_compare_title') }}</h2>
                    <p class="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em]">{{ __('pricing_compare_subtitle') }}</p>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-2xl overflow-hidden scrollbar-hide overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr class="bg-slate-900 text-white">
                                <th class="p-8 text-[11px] font-black uppercase tracking-[0.2em] opacity-60">Kemampuan Modul</th>
                                <th class="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-center">Explorer</th>
                                <th class="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-center text-indigo-400">Architect</th>
                                <th class="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-center text-amber-500">Quantum+</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-slate-700">
                            @php
                                $features = [
                                    [__('pricing_f_active_habits'), '5 Habits', __('pricing_v_unlimited'), __('pricing_v_unlimited')],
                                    [__('pricing_f_planner_engine'), __('pricing_v_standard'), __('pricing_v_batch'), __('pricing_v_ai_powered')],
                                    [__('pricing_f_vault_savings'), __('pricing_v_locked'), __('pricing_v_unlimited'), __('pricing_v_unlimited')],
                                    [__('pricing_f_ai_assistant'), '—', '—', '24/7 Access'],
                                    [__('pricing_f_life_insights'), 'Basic', __('pricing_v_advanced'), __('pricing_v_predictive')],
                                    [__('pricing_f_custom_modules'), '—', __('pricing_v_partial'), __('pricing_v_full')],
                                ];
                                $modules = [
                                    ['Journal Tracker', '—', '✓', '✓'],
                                    ['Goal Tracker', '—', '✓', '✓'],
                                    ['Job Application', '—', '✓', '✓'],
                                    ['Calendar Timeline', '—', '✓', '✓'],
                                ];
                            @endphp
                            
                            @foreach($features as $f)
                            <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-200">{{ $f[0] }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-400">{{ $f[1] }}</td>
                                <td class="p-6 text-xs font-black text-center text-indigo-600 dark:text-indigo-400">{{ $f[2] }}</td>
                                <td class="p-6 text-xs font-black text-center text-amber-600 dark:text-amber-500">{{ $f[3] }}</td>
                            </tr>
                            @endforeach

                            <tr class="bg-slate-50 dark:bg-slate-900/50">
                                <td colspan="4" class="p-4 px-8 text-[9px] font-black text-slate-400 uppercase tracking-widest">Premium Modules</td>
                            </tr>

                            @foreach($modules as $m)
                            <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-200">{{ $m[0] }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800 text-xs">—</td>
                                <td class="p-6 text-center text-emerald-500 text-xs font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 text-xs font-black">✓</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        {{-- FAQ --}}
        <section class="py-40 max-w-4xl mx-auto px-6">
            <div class="text-center mb-24">
                <h2 class="text-4xl font-black text-slate-900 dark:text-white mb-6">{{ __('pricing_faq_title') }}</h2>
                <div class="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            </div>

            <div class="grid grid-cols-1 gap-4" x-data="{ expanded: null }">
                @foreach([1, 2, 3, 4] as $i)
                <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                    <button @click="expanded = (expanded === {{ $i }} ? null : {{ $i }})" class="w-full p-8 text-left flex items-center justify-between group">
                        <span class="text-lg font-black text-slate-800 dark:text-white group-hover:text-indigo-600 transition-colors">{{ __("pricing_faq_{$i}_q") }}</span>
                        <span class="text-indigo-600 text-2xl font-black transform transition-transform duration-300" :class="expanded === {{ $i }} ? 'rotate-45' : ''">+</span>
                    </button>
                    <div x-show="expanded === {{ $i }}" x-collapse x-cloak>
                        <div class="p-8 pt-0 text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                            {{ __("pricing_faq_{$i}_a") }}
                        </div>
                    </div>
                </div>
                @endforeach
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
</script>
@endpush
