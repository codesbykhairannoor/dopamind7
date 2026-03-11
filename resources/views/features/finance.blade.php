@extends('layouts.marketing')

@section('title', __('finance_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('finance_meta_desc') }}">
    <meta property="og:title" content="{{ __('finance_meta_og_title') }}">
    <meta property="og:description" content="{{ __('finance_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/features/finance') }}">
    <link rel="canonical" href="{{ url('/features/finance') }}" />
@endsection

@section('json-ld')
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{{ __('schema_finance_name') }}",
  "applicationCategory": "FinanceApplication",
  "description": "{{ __('schema_finance_description') }}",
  "featureList": [
    "Expense Categorization",
    "Income Target Setting",
    "Savings Goal Visualizer",
    "Rupiah Currency Support"
  ]
}
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (CENTERED LAYOUT + FLOATING DASHBOARD) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-gray-50 relative border-b border-gray-100">
        {{-- Background Glow --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>

        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    <span class="text-lg">💰</span> {{ __('finance_hero_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('finance_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('finance_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                    {{ __('finance_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        {{ __('finance_hero_cta_1') }}
                    </a>
                    <a href="#how-it-works" class="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-full font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition">
                        {{ __('finance_hero_cta_2') }}
                    </a>
                </div>
            </div>

            {{-- Floating Mockup Centered --}}
            <div class="relative w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
                <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-20"></div>
                <div class="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-8 md:p-10 transform transition hover:scale-[1.02] duration-500">
                    
                    <div class="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                        <div class="text-left">
                            <h3 class="font-black text-gray-900 text-2xl mb-1">{{ __('finance_mockup_title') }} 💳</h3>
                            <p class="text-sm text-gray-500">{{ __('finance_mockup_alert_1') }}</p>
                        </div>
                        <div class="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl border border-indigo-100">
                            <span class="text-xs font-bold uppercase block mb-1 opacity-70">{{ __('finance_mockup_balance_label') }}</span>
                            <span class="font-black text-xl">{{ __('finance_mockup_balance') }} 📈</span>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        {{-- Task 1 (Income) --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl transition border border-transparent hover:border-emerald-100 cursor-pointer">
                            <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shadow-sm">↓</div>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-gray-900">{{ __('finance_mockup_task_1') }}</p>
                                <p class="text-sm text-gray-500">{{ __('finance_mockup_time_1') }}</p>
                            </div>
                            <div class="font-black text-emerald-600">+ Rp 5.000.000</div>
                        </div>
                        
                        {{-- Task 2 (Expense) --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-rose-50 rounded-2xl transition border border-transparent hover:border-rose-100 cursor-pointer">
                            <div class="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl shadow-sm">↑</div>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-gray-900">{{ __('finance_mockup_task_2') }}</p>
                                <p class="text-sm text-gray-500">{{ __('finance_mockup_time_2') }}</p>
                            </div>
                            <div class="font-black text-rose-600">- Rp 45.000</div>
                        </div>

                        {{-- Alert Pop-up --}}
                        <div class="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 text-left">
                            <span class="text-xl mt-0.5">⚠️</span>
                            <div>
                                <p class="font-bold text-amber-900 text-sm">{{ __('finance_mockup_alert_2') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- NEW SECTION 2: GLASSMORFISM WALLETS --}}
    <section class="py-24 bg-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row gap-20 items-center">
                <div class="flex-1 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
                        {{ __('finance_wallet_badge') }}
                    </div>
                    <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                        {{ __('finance_wallet_title') }}
                    </h2>
                    <p class="text-gray-600 text-lg mb-8 leading-relaxed">
                        {{ __('finance_wallet_desc') }}
                    </p>
                    <div class="space-y-4">
                        <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 transform hover:scale-[1.02] transition cursor-default">
                            <span class="text-2xl">🏦</span>
                            <div class="flex-1">
                                <p class="text-sm font-bold text-gray-900">{{ __('finance_wallet_1_title') }}</p>
                                <p class="text-xs text-gray-500">{{ __('finance_wallet_1_desc') }}</p>
                            </div>
                            <span class="font-black text-gray-900">Rp 25.000.000</span>
                        </div>
                        <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 transform hover:scale-[1.02] transition cursor-default">
                            <span class="text-2xl">💳</span>
                            <div class="flex-1">
                                <p class="text-sm font-bold text-gray-900">{{ __('finance_wallet_2_title') }}</p>
                                <p class="text-xs text-gray-500">{{ __('finance_wallet_2_desc') }}</p>
                            </div>
                            <span class="font-black text-rose-600">- Rp 4.250.000</span>
                        </div>
                    </div>
                </div>
                <div class="flex-1 relative animate-in fade-in zoom-in-95 duration-1000 delay-300">
                    <div class="absolute -inset-10 bg-indigo-500/10 blur-[100px] rounded-full -z-10 animate-pulse duration-[4000ms]"></div>
                    {{-- Visual Card Stack --}}
                    <div class="relative h-[450px] w-full flex items-center justify-center lg:block">
                        {{-- Card 1 --}}
                        <div class="absolute top-10 right-0 w-full max-w-[340px] h-56 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-[0_20px_50px_rgba(79,70,229,0.3)] transform rotate-6 hover:rotate-3 transition duration-500 hidden md:block">
                            <div class="flex justify-between items-start mb-12">
                                <span class="text-xl font-black tracking-widest uppercase italic">OneForMind</span>
                                <span class="text-3xl">🏦</span>
                            </div>
                            <div class="mb-2 text-[10px] opacity-60 font-black tracking-widest uppercase">{{ __('finance_wallet_card_label') }}</div>
                            <div class="text-3xl font-black">Rp 128.450k</div>
                        </div>
                        {{-- Card 2 (Glass) --}}
                        <div class="relative md:absolute bottom-10 left-0 w-full max-w-[380px] h-60 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white shadow-2xl transform -rotate-2 hover:rotate-0 transition duration-500 z-10 flex flex-col justify-between">
                            <div class="flex justify-between items-start text-gray-900">
                                <div>
                                    <span class="text-[10px] font-black tracking-widest uppercase opacity-40 block mb-1">{{ __('finance_wallet_glass_badge') }}</span>
                                    <h3 class="font-black text-lg leading-tight uppercase tracking-tight">{{ __('finance_wallet_glass_title') }}</h3>
                                </div>
                                <div class="w-12 h-8 bg-gray-900/10 rounded-lg flex items-center justify-center gap-0.5">
                                    <div class="w-4 h-4 bg-amber-400 rounded-full"></div>
                                    <div class="w-4 h-4 bg-orange-400 rounded-full -ml-2"></div>
                                </div>
                            </div>
                            <div class="flex items-end justify-between text-gray-900">
                                <div>
                                    <div class="text-[11px] font-black uppercase tracking-widest opacity-30 mb-1">{{ __('finance_wallet_glass_spending_label') }}</div>
                                    <div class="text-3xl font-black tracking-tighter">Rp 12.000k</div>
                                </div>
                                <div class="text-right">
                                     <div class="text-[11px] font-black uppercase tracking-widest opacity-30 mb-1">{{ __('finance_wallet_glass_safe_label') }}</div>
                                     <div class="text-lg font-black text-emerald-600">Rp 5.200k</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION 3: SPENDING FLOW --}}
    <section class="py-32 bg-slate-950 text-white relative overflow-hidden">
         <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:48px_48px] opacity-10"></div>
         <div class="max-w-6xl mx-auto px-6 relative z-10 text-center">
             <div class="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <span class="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{{ __('finance_flow_badge') }}</span>
                <h2 class="text-4xl md:text-6xl font-black mb-8">{{ __('finance_flow_title') }}</h2>
                <p class="text-indigo-200 text-xl opacity-80 max-w-3xl mx-auto mb-24">{{ __('finance_flow_desc') }}</p>
             </div>

             <div class="relative max-w-5xl mx-auto">
                {{-- The Flow Visual Grid --}}
                <div class="grid md:grid-cols-3 gap-8 md:gap-20 items-center">
                    {{-- Income Source --}}
                    <div class="flex flex-col gap-6 animate-in slide-in-from-left-12 duration-1000 fill-mode-both">
                        <div class="bg-emerald-500/5 backdrop-blur-sm border border-emerald-500/20 p-8 rounded-[2rem] text-left group hover:bg-emerald-500/10 transition duration-500">
                            <span class="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-3 block opacity-60">{{ __('finance_flow_income_label_1') }}</span>
                            <div class="flex justify-between items-end">
                                <span class="font-black text-2xl">{{ __('finance_flow_income_title_1') }}</span>
                                <div class="text-right">
                                    <span class="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg block mb-1">+85%</span>
                                    <span class="text-[10px] opacity-40 uppercase font-bold">{{ __('finance_flow_contribution_label') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="bg-indigo-500/5 backdrop-blur-sm border border-indigo-500/20 p-8 rounded-[2rem] text-left group hover:bg-indigo-500/10 transition duration-500">
                            <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3 block opacity-60">{{ __('finance_flow_income_label_2') }}</span>
                            <div class="flex justify-between items-end">
                                <span class="font-black text-2xl">{{ __('finance_flow_income_title_2') }}</span>
                                <div class="text-right">
                                    <span class="text-xs font-bold bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-lg block mb-1">+15%</span>
                                    <span class="text-[10px] opacity-40 uppercase font-bold">{{ __('finance_flow_contribution_label') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Center Hub --}}
                    <div class="relative flex items-center justify-center py-12 md:py-0">
                        {{-- Animated Circles --}}
                        <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                            <div class="w-64 h-64 bg-indigo-600/10 rounded-full animate-ping duration-[4000ms]"></div>
                            <div class="absolute w-48 h-48 border border-white/5 rounded-full animate-spin duration-[10000ms]"></div>
                        </div>
                        <div class="w-40 h-40 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-[0_0_80px_rgba(79,70,229,0.6)] z-10 transform rotate-12 animate-pulse">
                            💰
                        </div>
                    </div>

                    {{-- Expenses Destination --}}
                    <div class="flex flex-col gap-6 animate-in slide-in-from-right-12 duration-1000 fill-mode-both">
                         <div class="bg-rose-500/5 backdrop-blur-sm border border-rose-500/20 p-8 rounded-[2rem] text-left group hover:bg-rose-500/10 transition duration-500">
                            <span class="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-3 block opacity-60">{{ __('finance_flow_expense_label_1') }}</span>
                            <div class="flex justify-between items-end">
                                <span class="font-black text-2xl">{{ __('finance_flow_expense_title_1') }}</span>
                                <div class="text-right">
                                    <span class="text-xs font-bold bg-rose-500/20 text-rose-400 px-2 py-1 rounded-lg block mb-1">45%</span>
                                    <span class="text-[10px] opacity-40 uppercase font-bold">{{ __('finance_flow_allocation_label') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="bg-amber-500/5 backdrop-blur-sm border border-amber-500/20 p-8 rounded-[2rem] text-left group hover:bg-amber-500/10 transition duration-500">
                            <span class="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-3 block opacity-60">{{ __('finance_flow_expense_label_2') }}</span>
                            <div class="flex justify-between items-end">
                                <span class="font-black text-2xl">{{ __('finance_flow_expense_title_2') }}</span>
                                <div class="text-right">
                                    <span class="text-xs font-bold bg-amber-500/20 text-amber-400 px-2 py-1 rounded-lg block mb-1">20%</span>
                                    <span class="text-[10px] opacity-40 uppercase font-bold">{{ __('finance_flow_allocation_label') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {{-- Visual Connectors (Desktop Only) --}}
                <div class="absolute left-1/4 top-1/2 w-1/4 h-px bg-gradient-to-r from-emerald-500/50 to-transparent z-0 hidden lg:block"></div>
                <div class="absolute right-1/4 top-1/2 w-1/4 h-px bg-gradient-to-l from-rose-500/50 to-transparent z-0 hidden lg:block"></div>
             </div>
         </div>
    </section>

    {{-- SECTION 5.5: PRIVACY & SECURITY (INDIGO THEME) --}}
    <section class="py-32 bg-indigo-950 relative overflow-hidden">
        {{-- Custom Indigo Grid Background --}}
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
        <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-indigo-950 via-transparent to-indigo-950"></div>
        
        <div class="max-w-6xl mx-auto px-6 relative z-10 text-center">
            <div class="inline-flex items-center justify-center px-6 py-2 bg-indigo-900/50 backdrop-blur-md border border-indigo-700/50 text-indigo-300 rounded-full text-sm font-bold uppercase tracking-widest mb-8">
                {{ __('finance_privacy_badge') }}
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-white mb-6">{{ __('finance_privacy_title') }}</h2>
            <p class="text-indigo-200 text-xl max-w-3xl mx-auto leading-relaxed mb-16 font-medium">
                {{ __('finance_privacy_desc') }}
            </p>
            
            <div class="grid sm:grid-cols-3 gap-8">
                <div class="bg-indigo-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-indigo-800/50 hover:bg-indigo-800/40 transition">
                    <div class="text-3xl mb-6 bg-indigo-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border border-indigo-700/50">🔒</div>
                    <h4 class="text-white font-bold text-xl mb-3">{{ __('finance_privacy_point_1_title') }}</h4>
                    <p class="text-indigo-300">{{ __('finance_privacy_point_1_desc') }}</p>
                </div>
                <div class="bg-indigo-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-indigo-800/50 hover:bg-indigo-800/40 transition">
                    <div class="text-3xl mb-6 bg-indigo-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border border-indigo-700/50">🚫</div>
                    <h4 class="text-white font-bold text-xl mb-3">{{ __('finance_privacy_point_2_title') }}</h4>
                    <p class="text-indigo-300">{{ __('finance_privacy_point_2_desc') }}</p>
                </div>
                <div class="bg-indigo-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-indigo-800/50 hover:bg-indigo-800/40 transition">
                    <div class="text-3xl mb-6 bg-indigo-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border border-indigo-700/50">🤝</div>
                    <h4 class="text-white font-bold text-xl mb-3">{{ __('finance_privacy_point_3_title') }}</h4>
                    <p class="text-indigo-300">{{ __('finance_privacy_point_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION 5.7: WEALTH TRAJECTORY (STATISTICAL GRID) --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm border border-emerald-200">
                    {{ __('finance_trajectory_badge') }}
                </div>
                <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                    {{ __('finance_trajectory_title') }}
                </h2>
                <p class="text-gray-600 text-xl leading-relaxed font-medium">
                    {{ __('finance_trajectory_desc') }}
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 mb-20">
                {{-- Trajectory Card 1 --}}
                <div class="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 hover:shadow-2xl transition duration-500 group relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[4rem] group-hover:scale-110 transition duration-700"></div>
                    <div class="relative z-10">
                        <span class="text-emerald-500 text-4xl mb-6 block">📈</span>
                        <h4 class="text-gray-400 font-black uppercase tracking-widest text-[11px] mb-2">{{ __('finance_stat_projection_title') }}</h4>
                        <p class="text-4xl font-black text-gray-900 tabular-nums">{{ __('finance_stat_projection_val') }}</p>
                        <div class="mt-6 w-full h-1 bg-emerald-100 rounded-full">
                            <div class="w-2/3 h-full bg-emerald-500 rounded-full animate-in slide-in-from-left duration-1000"></div>
                        </div>
                    </div>
                </div>
                {{-- Trajectory Card 2 --}}
                <div class="bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-800 transform md:-translate-y-4 group relative overflow-hidden">
                    <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    <div class="relative z-10 text-white">
                        <span class="text-indigo-400 text-4xl mb-6 block">🎯</span>
                        <h4 class="text-indigo-300/40 font-black uppercase tracking-widest text-[11px] mb-2">{{ __('finance_stat_savings_title') }}</h4>
                        <p class="text-4xl font-black text-white tabular-nums">{{ __('finance_stat_savings_val') }}</p>
                        <div class="mt-8 flex items-center gap-2 bg-indigo-500/20 px-4 py-2 rounded-xl border border-indigo-500/30 text-indigo-300 text-[10px] font-black uppercase tracking-widest animate-pulse">
                            On Track to Achieve
                        </div>
                    </div>
                </div>
                {{-- Trajectory Card 3 --}}
                <div class="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 hover:shadow-2xl transition duration-500 group relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[4rem] group-hover:scale-110 transition duration-700"></div>
                    <div class="relative z-10">
                        <span class="text-amber-500 text-4xl mb-6 block">🏖️</span>
                        <h4 class="text-gray-400 font-black uppercase tracking-widest text-[11px] mb-2">{{ __('finance_stat_freedom_title') }}</h4>
                        <p class="text-4xl font-black text-gray-900 tabular-nums">{{ __('finance_stat_freedom_val') }}</p>
                        <p class="mt-4 text-gray-400 text-xs font-medium">Estimated FIRE Date</p>
                    </div>
                </div>
            </div>

            {{-- Growth Visualization Line --}}
            <div class="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 relative overflow-hidden animate-in zoom-in-95 duration-700">
                <div class="flex justify-between items-end mb-12">
                    <div class="text-left">
                        <h3 class="text-2xl font-black text-gray-900 mb-2">Compound Growth Engine</h3>
                        <p class="text-gray-500 text-sm font-medium">Visualization of asset accumulation over time</p>
                    </div>
                    <div class="flex gap-4">
                        <div class="flex items-center gap-2">
                            <span class="w-3 h-3 bg-indigo-600 rounded-full"></span>
                            <span class="text-[10px] font-black uppercase text-gray-400">Projected</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="w-3 h-3 bg-gray-200 rounded-full"></span>
                            <span class="text-[10px] font-black uppercase text-gray-400">Baseline</span>
                        </div>
                    </div>
                </div>
                
                <div class="relative h-48 w-full flex items-end gap-[2%]">
                    @for($i=0; $i<20; $i++)
                        <div class="flex-1 bg-indigo-50 rounded-t-lg relative group transition-all duration-500 hover:bg-indigo-100" style="height: {{ 20 + ($i * 4) }}%">
                            <div class="absolute bottom-0 left-0 w-full bg-indigo-600 rounded-t-lg transition-all duration-1000 delay-{{ $i * 50 }}" style="height: {{ 10 + ($i * 3.5) }}%"></div>
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20 pointer-events-none">
                                Year {{ 2024 + $i }}: Rp {{ 10 + ($i * 15) }}M
                            </div>
                        </div>
                    @endfor
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: THE SUCCESS QUOTE --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center animate-in zoom-in-95 fade-in duration-1000">
            <div class="text-9xl text-indigo-50 mb-4 font-serif leading-none italic select-none">"</div>
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 leading-[1.4] mb-12 tracking-tight italic font-serif">
                {{ __('finance_quote_text') }}
            </h2>
            <div class="flex flex-col items-center">
                <div class="w-24 h-2 bg-indigo-600 mb-8 rounded-full shadow-lg shadow-indigo-200"></div>
                <p class="text-indigo-600 font-black tracking-[0.5em] uppercase text-xs">{{ __('finance_quote_author') }}</p>
                <p class="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">Legendary Investor</p>
            </div>
        </div>
    </section>

    {{-- SECTION 7: BOTTOM CTA (PILL SHAPE / FULL WIDTH) --}}
    <section class="py-24 bg-white px-6">
        <div class="max-w-6xl mx-auto bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl border border-indigo-800">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse duration-[6000ms]"></div>
            
            <div class="relative z-10">
                <h2 class="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight">{{ __('finance_cta_title') }}</h2>
                <p class="text-indigo-200 text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-medium">
                    {{ __('finance_cta_desc') }}
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4 items-center">
                    <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-white text-indigo-900 px-12 py-5 rounded-full font-black text-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl shadow-indigo-900/50">
                        {{ __('finance_cta_btn') }}
                    </a>
                </div>
                <p class="mt-8 text-sm text-indigo-300 font-medium">{{ __('finance_cta_note') }}</p>
            </div>
        </div>
    </section>

@endsection
