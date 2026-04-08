@extends('layouts.marketing')

@section('title', __('pricing_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('pricing_meta_desc') }}">
    <meta property="og:title" content="{{ __('pricing_meta_og_title') }}">
    <meta property="og:description" content="{{ __('pricing_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/pricing') }}">

@endsection

@section('json-ld')
<style>
    [x-cloak] { display: none !important; }
</style>
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{ __('schema_pricing_name') }}",
  "description": "{{ __('schema_pricing_description') }}"
},{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "OneForMind",
    "item": "{{ url('/') }}"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "{{ app()->getLocale() === 'id' ? 'Harga' : 'Pricing' }}",
    "item": "{{ url('/pricing') }}"
  }]
}]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (ONLY TYPOGRAPHY & TOGGLE) --}}
    <header class="pt-32 pb-16 px-6 bg-white relative overflow-hidden" x-data="{ annual: true }">
        {{-- Background Decoration --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-[120px] -z-10"></div>
        
        <div class="max-w-7xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-widest shadow-sm border border-indigo-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                💎 {{ __('pricing_badge') }}
            </div>
            
            <h1 class="text-[38px] leading-[1.05] md:text-7xl text-gray-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 font-black">
                {{ __('pricing_title_1') }} <span class="text-indigo-600">{{ __('pricing_title_2') }}</span>
            </h1>
            
            <p class="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                {{ __('pricing_subtitle') }}
            </p>

            {{-- Interactive Toggle --}}
            <div class="flex items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-700 delay-300">
                <span class="text-sm font-bold" :class="!annual ? 'text-gray-900' : 'text-gray-400'">{{ __('pricing_monthly') }}</span>
                <button @click="annual = !annual" class="relative w-16 h-8 rounded-full bg-indigo-100 border border-indigo-200 p-1 transition-colors duration-300 focus:outline-none">
                    <div class="w-6 h-6 rounded-full bg-indigo-600 shadow-md transform transition-transform duration-300" :class="annual ? 'translate-x-8' : 'translate-x-0'"></div>
                </button>
                <span class="text-sm font-bold" :class="annual ? 'text-gray-900' : 'text-gray-400'">{{ __('pricing_yearly') }}</span>
                <div class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-tighter border border-emerald-200">
                    {{ __('pricing_save_amount') }}
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE CARDS --}}
    <section class="pb-32 px-6 bg-white" x-data="{ annual: true }">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                
                {{-- Tier 1: Explorer --}}
                <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col text-left group hover:-translate-y-2 transition duration-500 h-full">
                    <h3 class="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">{{ __('pricing_l1_name') }}</h3>
                    <div class="flex items-baseline gap-1 mb-6">
                        <span class="text-3xl text-gray-900 font-black">Rp 0</span>
                        <span class="font-bold text-xs text-gray-400">/{{ __('pricing_forever') }}</span>
                    </div>
                    <p class="text-gray-500 text-[11px] mb-8 leading-relaxed min-h-[40px]">{{ __('pricing_l1_desc') }}</p>
                    <ul class="space-y-3 mb-10 flex-grow">
                        <li class="flex items-start gap-3">
                            <span class="text-emerald-500 font-black">✓</span>
                            <span class="text-[11px] font-bold text-gray-600">{{ __('pricing_feat_l1_habits') }}</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-emerald-500 font-black">✓</span>
                            <span class="text-[11px] font-bold text-gray-600">{{ __('pricing_feat_l1_finance') }}</span>
                        </li>
                    </ul>
                    <a hx-boost="false" href="{{ route('register') }}" class="w-full py-4 rounded-3xl bg-gray-50 text-gray-900 font-black text-xs text-center hover:bg-gray-100 transition border border-gray-200">
                        {{ __('pricing_free_btn') }}
                    </a>
                </div>

                {{-- Tier 2: Architect --}}
                <div class="bg-white p-8 rounded-[2.5rem] border border-indigo-100 shadow-xl shadow-indigo-50/50 flex flex-col text-left group hover:-translate-y-2 transition duration-500 h-full relative border-t-8 border-t-indigo-600">
                    <h3 class="text-[10px] font-black text-indigo-600 uppercase mb-4 tracking-widest">{{ __('pricing_l2_name') }}</h3>
                    <div class="mb-4">
                        <div class="text-2xl font-black text-gray-900 leading-tight" x-text="annual ? '{{ __('pricing_l2_price_yr') }}' : '{{ __('pricing_l2_price_mo') }}'">{{ __('pricing_l2_price_yr') }}</div>
                        <div class="text-gray-400 font-bold text-[10px]">/{{ __('pricing_month') }}</div>
                    </div>
                    <div class="mb-6">
                        <p class="text-[10px] font-black text-indigo-600 uppercase tracking-tight">{{ __('pricing_l2_initial') }}</p>
                        <p class="text-[9px] font-bold italic text-gray-400">{{ __('pricing_l2_recurring') }}</p>
                    </div>
                    <p class="text-gray-500 text-[11px] mb-8 leading-relaxed min-h-[40px]">{{ __('pricing_l2_desc') }}</p>
                    <ul class="space-y-3 mb-10 flex-grow">
                        <li class="flex items-start gap-3">
                            <span class="text-emerald-500 font-black">✓</span>
                            <span class="text-[11px] font-bold text-gray-800">{{ __('pricing_feat_l2_habits') }}</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-emerald-500 font-black">✓</span>
                            <span class="text-[11px] font-bold text-gray-800">{{ __('pricing_feat_l2_finance') }}</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-indigo-600 font-black">★</span>
                            <span class="text-[11px] font-bold text-gray-800">{{ __('pricing_feat_month_trial') }}</span>
                        </li>
                    </ul>
                    <button hx-boost="false" data-plan="architect" class="checkout-trigger w-full py-4 rounded-3xl bg-indigo-600 text-white font-black text-xs text-center hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition">
                        {{ __('pricing_pro_btn') }}
                    </button>
                </div>

                {{-- Tier 3: Quantum --}}
                <div class="bg-white p-8 rounded-[3rem] border-4 border-indigo-600 shadow-2xl shadow-indigo-100 flex flex-col text-left relative transform lg:-translate-y-4 z-20 h-full">
                    <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-lg">
                        {{ __('pricing_ai_badge') }}
                    </div>
                    <h3 class="text-[10px] font-black text-indigo-600 uppercase mb-4 tracking-widest">{{ __('pricing_l3_name') }}</h3>
                    <div class="mb-4">
                        <div class="text-2xl font-black text-gray-900 leading-tight" x-text="annual ? '{{ __('pricing_l3_price_yr') }}' : '{{ __('pricing_l3_price_mo') }}'">{{ __('pricing_l3_price_yr') }}</div>
                        <div class="text-gray-400 font-bold text-[10px]">/{{ __('pricing_month') }}</div>
                    </div>
                    <div class="mb-6">
                        <p class="text-[10px] font-black text-indigo-600 uppercase tracking-tight">{{ __('pricing_l3_initial') }}</p>
                        <p class="text-[9px] font-bold italic text-gray-400">{{ __('pricing_l3_recurring') }}</p>
                    </div>
                    <p class="text-gray-500 text-[11px] mb-8 leading-relaxed min-h-[40px]">{{ __('pricing_l3_desc') }}</p>
                    <ul class="space-y-3 mb-10 flex-grow">
                        <li class="flex items-start gap-3 text-indigo-600 font-black">
                            <span class="w-5 h-5 bg-indigo-50 rounded-full flex items-center justify-center text-[10px]">🤖</span>
                            <span class="text-[11px]">{{ __('pricing_feat_l3_ai_coach') }}</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-indigo-600 font-black">✓</span>
                            <span class="text-[11px] font-bold text-gray-800">{{ __('pricing_feat_l3_wealth') }}</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-indigo-600 font-black">✓</span>
                            <span class="text-[11px] font-bold text-indigo-600">{{ __('pricing_feat_l3_insights') }}</span>
                        </li>
                    </ul>
                    <button hx-boost="false" data-plan="quantum" class="checkout-trigger w-full py-5 rounded-3xl bg-slate-900 text-white font-black text-xs text-center hover:bg-black shadow-xl transition transform active:scale-95">
                        {{ __('pricing_ai_btn') }}
                    </button>
                </div>

                {{-- Tier 4: Legendary --}}
                <div class="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col text-left group hover:-translate-y-2 transition duration-500 text-white h-full relative border border-white/5">
                    <div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-white text-[8px] font-black uppercase tracking-widest shadow-lg">
                        {{ __('pricing_l4_badge') }}
                    </div>
                    <h3 class="text-[10px] font-black text-indigo-400 uppercase mb-4 tracking-widest">{{ __('pricing_l4_name') }}</h3>
                    <div class="mb-4">
                        <div class="text-2xl font-black text-white leading-tight" x-text="annual ? '{{ __('pricing_l4_price_yr') }}' : '{{ __('pricing_l4_price_mo') }}'">{{ __('pricing_l4_price_yr') }}</div>
                        <div class="text-slate-500 font-bold text-[10px]">/{{ __('pricing_month') }}</div>
                    </div>
                    <div class="mb-6">
                        <p class="text-[10px] font-black text-amber-500 uppercase tracking-tight">{{ __('pricing_l4_initial') }}</p>
                        <p class="text-[9px] font-bold italic text-slate-600">{{ __('pricing_l4_recurring') }}</p>
                    </div>
                    <p class="text-slate-400 text-[11px] mb-8 leading-relaxed min-h-[40px]">{{ __('pricing_l4_desc') }}</p>
                    <ul class="space-y-3 mb-10 flex-grow text-slate-300">
                        <li class="flex items-start gap-3">
                            <span class="text-amber-500 font-black">★</span>
                            <span class="text-[11px] font-bold">{{ __('pricing_feat_l4_triggers') }}</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-amber-500 font-black">★</span>
                            <span class="text-[11px] font-bold">{{ __('pricing_feat_l4_war_room') }}</span>
                        </li>
                        <li class="flex items-start gap-3 border-t border-white/10 pt-3">
                            <span class="text-emerald-400 font-black">✓</span>
                            <span class="text-[11px] font-bold">{{ __('pricing_feat_l4_vip') }}</span>
                        </li>
                    </ul>
                    <button hx-boost="false" data-plan="lifetime" class="checkout-trigger w-full py-4 rounded-3xl bg-white text-slate-900 font-black text-xs text-center hover:bg-slate-50 transition shadow-lg">
                        {{ __('pricing_l4_btn') }}
                    </button>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: COMPARISON TABLE --}}
    <section class="py-32 bg-slate-50 border-y border-slate-100">
        <div class="max-w-5xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-5xl text-gray-900 mb-6 font-black">{{ __('pricing_compare_title') }}</h2>
                <p class="text-gray-500 font-medium">{{ __('pricing_compare_subtitle') }}</p>
            </div>
            
            <div class="overflow-x-auto rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl">
                <table class="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr class="bg-slate-50">
                            <th class="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">{{ __('pricing_feat_label') }}</th>
                            <th class="px-8 py-6 text-center border-b border-slate-100"><span class="text-xs font-black text-slate-900 uppercase">Explorer</span></th>
                            <th class="px-8 py-6 text-center border-b border-slate-100"><span class="text-xs font-black text-indigo-600 uppercase">Architect</span></th>
                            <th class="px-8 py-6 text-center border-b border-slate-100"><span class="text-xs font-black text-indigo-600 uppercase">Quantum</span></th>
                            <th class="px-8 py-6 text-center border-b border-slate-100"><span class="text-xs font-black text-amber-500 uppercase">Legendary</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        {{-- Habit Module --}}
                        <tr class="bg-indigo-50/30">
                            <td colspan="5" class="px-8 py-3 text-[10px] font-black text-indigo-600 uppercase tracking-tighter italic">
                                🧠 {{ __('group_habits') }}
                            </td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_habit_limit') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-bold text-slate-500">{{ __('feat_habit_limit_val_l1') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-emerald-500">{{ __('feat_habit_limit_val_l2') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-emerald-500">{{ __('feat_habit_limit_val_l2') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-emerald-500">{{ __('feat_habit_limit_val_l2') }}</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_detailed_analytics') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-bold text-slate-500">{{ __('feat_val_basic') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-emerald-500">{{ __('feat_val_advanced') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-indigo-600">{{ __('feat_val_predictive') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-indigo-600">{{ __('feat_val_predictive') }}</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_detailed_analytics') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-bold text-slate-500">{{ __('feat_val_basic') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-emerald-500">{{ __('feat_val_advanced') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-indigo-600">{{ __('feat_val_predictive') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-indigo-600">{{ __('feat_val_predictive') }}</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_habit_freeze') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_ai_stacking') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>

                        {{-- Finance Module --}}
                        <tr class="bg-emerald-50/30">
                            <td colspan="5" class="px-8 py-3 text-[10px] font-black text-emerald-600 uppercase tracking-tighter italic">
                                💰 {{ __('group_finance') }}
                            </td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_budgeting') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_receipt_scanning') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_net_worth') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_ai_audit') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>

                        {{-- Planning & Focus --}}
                        <tr class="bg-amber-50/30">
                            <td colspan="5" class="px-8 py-3 text-[10px] font-black text-amber-600 uppercase tracking-tighter italic">
                                ⚡ {{ __('group_planner') }}
                            </td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_planner_view') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-bold text-slate-500">{{ __('feat_planner_view_val_l1') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-slate-900">{{ __('feat_planner_view_val_l2') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-slate-900">{{ __('feat_planner_view_val_l2') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-slate-900">{{ __('feat_planner_view_val_l2') }}</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_recurring_tasks') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_kanban_board') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_focus_timer') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_energy_scheduling') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>

                        {{-- Journaling --}}
                        <tr class="bg-indigo-50/30">
                            <td colspan="5" class="px-8 py-3 text-[10px] font-black text-indigo-600 uppercase tracking-tighter italic">
                                ✍️ {{ __('group_journal') }}
                            </td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_journal_type') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-bold text-slate-500">{{ __('feat_journal_type_val_l1') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-emerald-500">{{ __('feat_journal_type_val_l2') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-emerald-500">{{ __('feat_journal_type_val_l2') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-emerald-500">{{ __('feat_journal_type_val_l2') }}</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_sentiment_ai') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_journal_lock') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>

                        {{-- Goals & Jobs --}}
                        <tr class="bg-indigo-50/10">
                            <td colspan="5" class="px-8 py-3 text-[10px] font-black text-indigo-600 uppercase tracking-tighter italic">
                                🎯 {{ __('group_goals') }} & {{ __('group_jobs') }}
                            </td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_goal_limit') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-bold text-slate-500">{{ __('feat_goal_limit_val_l1') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-slate-900">{{ __('feat_goal_limit_val_l2') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-slate-900">{{ __('feat_goal_limit_val_l2') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-slate-900">{{ __('feat_goal_limit_val_l2') }}</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_job_limit') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-bold text-slate-500">{{ __('feat_job_limit_val_l1') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-slate-900">{{ __('feat_job_limit_val_l2') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-slate-900">{{ __('feat_job_limit_val_l2') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-slate-900">{{ __('feat_job_limit_val_l2') }}</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_resume_ai') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_vision_board') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>

                        {{-- Calendar --}}
                        <tr class="bg-slate-100/50">
                            <td colspan="5" class="px-8 py-3 text-[10px] font-black text-slate-600 uppercase tracking-tighter italic">
                                📅 {{ __('group_calendar') }}
                            </td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_calendar_timeline') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_ai_scheduling') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>

                        {{-- AI & Support --}}
                        <tr class="bg-slate-100/50">
                            <td colspan="5" class="px-8 py-3 text-[10px] font-black text-slate-600 uppercase tracking-tighter italic">
                                🛡️ {{ __('group_support') }}
                            </td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_support_priority') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-bold text-slate-400">{{ __('support_standard') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-bold text-slate-400">{{ __('support_standard') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-indigo-600">{{ __('support_priority') }}</td>
                            <td class="px-8 py-5 text-center text-[11px] font-black text-amber-500">{{ __('support_vip') }}</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_early_beta') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                        <tr>
                            <td class="px-8 py-5 text-xs font-bold text-slate-700">{{ __('feat_data_export') }}</td>
                            <td class="px-8 py-5 text-center text-slate-300">—</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                            <td class="px-8 py-5 text-center text-emerald-500 font-black">✓</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    {{-- SECTION 4: ELITE EXPERIENCE --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="relative overflow-hidden rounded-[4rem] bg-slate-900 border border-slate-800 p-8 md:p-20 group">
                <!-- Background decorative elements -->
                <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                <div class="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full"></div>
                
                <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest mb-6">
                            LEADERSHIP & PERFORMANCE
                        </div>
                        <h2 class="text-3xl md:text-5xl text-white leading-tight mb-8 font-black">
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
                        <div class="relative aspect-square rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-8 shadow-2xl overflow-hidden shadow-indigo-500/10">
                            <div class="absolute top-0 right-0 p-8 transform rotate-12 group-hover/card:rotate-0 transition-transform duration-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400/10">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>
                            <div class="h-full flex flex-col justify-end">
                                <div class="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <div class="flex items-center gap-4 mb-4">
                                        <div class="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]">Q</div>
                                        <div>
                                            <p class="text-white font-black text-xs">{{ __('pricing_elite_card_title') }}</p>
                                            <p class="text-[10px] text-slate-500 font-bold uppercase">{{ __('pricing_elite_card_status') }}</p>
                                        </div>
                                    </div>
                                    <div class="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div class="h-full w-2/3 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: TRUST & GUARANTEES --}}
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            <div class="text-center group">
                <div class="w-16 h-16 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition duration-500 shadow-sm border border-slate-100 font-black">🔒</div>
                <h4 class="text-xl font-black text-gray-900 mb-2">{{ __('pricing_trust_1_title') }}</h4>
                <p class="text-gray-500 text-sm leading-relaxed font-bold px-4">{{ __('pricing_trust_1_desc') }}</p>
            </div>
            <div class="text-center group">
                <div class="w-16 h-16 bg-slate-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition duration-500 shadow-sm border border-slate-100 font-black">⚡</div>
                <h4 class="text-xl font-black text-gray-900 mb-2">{{ __('pricing_trust_2_title') }}</h4>
                <p class="text-gray-500 text-sm leading-relaxed font-bold px-4">{{ __('pricing_trust_2_desc') }}</p>
            </div>
            <div class="text-center group">
                <div class="w-16 h-16 bg-slate-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition duration-500 shadow-sm border border-slate-100 font-black">🛠️</div>
                <h4 class="text-xl font-black text-gray-900 mb-2">{{ __('pricing_trust_3_title') }}</h4>
                <p class="text-gray-500 text-sm leading-relaxed font-bold px-4">{{ __('pricing_trust_3_desc') }}</p>
            </div>
        </div>
    </section>

    {{-- SECTION 6: FAQ --}}
    <section class="py-32 bg-slate-50">
        <div class="max-w-3xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl text-gray-900 mb-4 font-black">{{ __('faq_title') }}</h2>
                <p class="text-gray-500 font-bold uppercase text-[10px] tracking-widest">{{ __('pricing_faq_subtitle') }}</p>
            </div>
            
            <div class="space-y-4" x-data="{ active: null }">
                @for ($i = 1; $i <= 4; $i++)
                <div class="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                    <button @click="active !== {{ $i }} ? active = {{ $i }} : active = null" 
                            class="w-full px-8 py-6 text-left flex justify-between items-center group">
                        <span class="font-black text-slate-800 group-hover:text-indigo-600 transition tracking-tight">{{ __("faq_{$i}_q") }}</span>
                        <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-300 transform"
                             :class="active === {{ $i }} ? 'rotate-180 bg-indigo-600 text-white' : ''">
                             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </button>
                    <div x-show="active === {{ $i }}" x-collapse x-cloak>
                        <div class="px-8 pb-8 text-slate-500 text-sm leading-relaxed font-bold border-t border-slate-50 pt-6">
                            {{ __("faq_{$i}_a") }}
                        </div>
                    </div>
                </div>
                @endfor
            </div>
        </div>
    </section>

    {{-- SECTION 7: BOTTOM CTA --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-5xl mx-auto px-6 relative z-10">
            <div class="bg-indigo-600 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(79,70,229,0.4)]">
                <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse"></div>
                <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full -ml-48 -mb-48 blur-3xl"></div>
                
                <div class="relative z-10">
                    <h2 class="text-4xl md:text-6xl mb-8 leading-tight tracking-tighter font-black">
                        {{ __('pricing_bottom_cta_title') }}
                    </h2>
                    <p class="text-indigo-100 text-lg mb-12 max-w-2xl mx-auto font-bold opacity-80 leading-relaxed">
                        {{ __('pricing_bottom_cta_desc') }}
                    </p>
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto px-12 py-5 rounded-2xl bg-white text-indigo-600 font-black text-xl hover:bg-slate-50 transition transform hover:scale-105 shadow-2xl active:scale-95">
                            {{ __('pricing_bottom_cta_btn') }}
                        </a>
                             {{ __('pricing_bottom_cta_sub') }}
                    </div>
                </div>
            </div>
        </div>
    </section>

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    function openCheckout(planId) {
        @auth
            window.location.href = "{{ route('billing') }}?plan=" + planId;
        @else
            window.location.href = "{{ route('register') }}?plan=" + planId;
        @endauth
    }

    // Bind manually for Blade buttons
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
@endsection

