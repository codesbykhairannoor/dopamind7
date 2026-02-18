@extends('layouts.marketing')

@section('title', __('pricing_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('pricing_meta_desc') }}">
    <meta property="og:title" content="{{ __('pricing_meta_og_title') }}">
    <meta property="og:url" content="{{ url('/pricing') }}">
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
            
            <h1 class="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
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

    {{-- SECTION 2: THE CARDS (SEPARATE SECTION) --}}
    <section class="pb-32 px-6 bg-white" x-data="{ annual: true }">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-3 gap-8 items-stretch">
                
                {{-- Tier 1: Free --}}
                <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col text-left group hover:-translate-y-2 transition duration-500 h-full">
                    <h3 class="text-lg font-black text-gray-400 uppercase mb-4 tracking-widest">{{ __('pricing_free_name') }}</h3>
                    <div class="flex items-baseline gap-1 mb-6">
                        <span class="text-4xl font-black text-gray-900">$0</span>
                        <span class="text-gray-400 font-bold">/{{ __('pricing_forever') }}</span>
                    </div>
                    <p class="text-gray-500 text-sm mb-8 leading-relaxed">{{ __('pricing_free_desc') }}</p>
                    <ul class="space-y-4 mb-10 flex-grow">
                        <li class="flex items-center gap-3 text-sm font-bold text-gray-600">
                            <span class="text-emerald-500 text-lg">✓</span> {{ __('pricing_feat_habits_limit') }}
                        </li>
                        <li class="flex items-center gap-3 text-sm font-bold text-gray-600">
                            <span class="text-emerald-500 text-lg">✓</span> {{ __('pricing_feat_finance_basic') }}
                        </li>
                    </ul>
                    <a href="{{ route('register') }}" class="w-full py-4 rounded-2xl bg-gray-50 text-gray-900 font-bold text-center hover:bg-gray-100 transition border border-gray-200">
                        {{ __('pricing_free_btn') }}
                    </a>
                </div>

                {{-- Tier 2: Pro (Centerpiece) --}}
                <div class="bg-white p-10 rounded-[3rem] border-4 border-indigo-600 shadow-2xl shadow-indigo-100 flex flex-col text-left relative transform md:-translate-y-4 z-20 h-full">
                    <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                        {{ __('pricing_pro_badge') }}
                    </div>
                    <h3 class="text-lg font-black text-indigo-600 uppercase mb-4 tracking-widest">{{ __('pricing_pro_name') }}</h3>
                    <div class="flex items-baseline gap-1 mb-2">
                        <span class="text-6xl font-black text-gray-900" x-text="annual ? '$9' : '$12'">$9</span>
                        <span class="text-gray-400 font-bold">/{{ __('pricing_month') }}</span>
                    </div>
                    <p class="text-indigo-600/60 text-xs font-bold mb-6" x-show="annual">{{ __('pricing_billed_annually') }}</p>
                    <p class="text-gray-500 text-sm mb-8 leading-relaxed">{{ __('pricing_pro_desc') }}</p>
                    <ul class="space-y-4 mb-10 flex-grow">
                        <li class="flex items-center gap-3 text-sm font-bold text-gray-800">
                            <span class="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs shrink-0">✓</span>
                            {{ __('pricing_feat_unlimited_habits') }}
                        </li>
                        <li class="flex items-center gap-3 text-sm font-bold text-gray-800">
                            <span class="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs shrink-0">✓</span>
                            {{ __('pricing_feat_ai_insights') }}
                        </li>
                        <li class="flex items-center gap-3 text-sm font-bold text-gray-800">
                            <span class="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs shrink-0">✓</span>
                            {{ __('pricing_feat_custom_themes') }}
                        </li>
                    </ul>
                    <a href="{{ route('register') }}" class="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black text-lg text-center hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition transform active:scale-95">
                        {{ __('pricing_pro_btn') }}
                    </a>
                </div>

                {{-- Tier 3: Lifetime --}}
                <div class="bg-slate-900 p-10 rounded-[2.5rem] shadow-xl flex flex-col text-left group hover:-translate-y-2 transition duration-500 text-white h-full">
                    <h3 class="text-lg font-black text-indigo-400 uppercase mb-4 tracking-widest">{{ __('pricing_life_name') }}</h3>
                    <div class="flex items-baseline gap-1 mb-6">
                        <span class="text-4xl font-black">$199</span>
                        <span class="text-slate-500 font-bold">/{{ __('pricing_once') }}</span>
                    </div>
                    <p class="text-slate-400 text-sm mb-8 leading-relaxed">{{ __('pricing_life_desc') }}</p>
                    <ul class="space-y-4 mb-10 flex-grow text-slate-300">
                        <li class="flex items-center gap-3 text-sm font-bold">
                            <span class="text-indigo-400 text-lg">★</span> {{ __('pricing_feat_lifetime_access') }}
                        </li>
                        <li class="flex items-center gap-3 text-sm font-bold">
                            <span class="text-indigo-400 text-lg">★</span> {{ __('pricing_feat_priority_support') }}
                        </li>
                    </ul>
                    <a href="{{ route('register') }}" class="w-full py-4 rounded-2xl bg-white text-gray-900 font-bold text-center hover:bg-gray-100 transition">
                        {{ __('pricing_life_btn') }}
                    </a>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: COMPARISON TABLE (NEW) --}}
    <section class="py-24 bg-slate-50 border-y border-slate-100">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-black text-gray-900 mb-4">{{ __('pricing_compare_title') }}</h2>
                <p class="text-gray-500">{{ __('pricing_compare_subtitle') }}</p>
            </div>
            
            <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50/50">
                            <th class="px-6 py-4 text-sm font-black text-gray-400 uppercase">{{ __('pricing_feat_label') }}</th>
                            <th class="px-6 py-4 text-sm font-black text-gray-900 text-center">Free</th>
                            <th class="px-6 py-4 text-sm font-black text-indigo-600 text-center">Architect</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr>
                            <td class="px-6 py-4 text-sm font-bold text-gray-700">Daily Habits</td>
                            <td class="px-6 py-4 text-center text-sm text-gray-500">5 Max</td>
                            <td class="px-6 py-4 text-center text-sm font-black text-emerald-500">Unlimited</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm font-bold text-gray-700">Financial Insights</td>
                            <td class="px-6 py-4 text-center text-sm text-gray-500">Basic</td>
                            <td class="px-6 py-4 text-center text-sm font-black text-emerald-500">Advanced AI</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm font-bold text-gray-700">Cloud Sync</td>
                            <td class="px-6 py-4 text-center text-sm font-black text-emerald-500">✓</td>
                            <td class="px-6 py-4 text-center text-sm font-black text-emerald-500">✓</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm font-bold text-gray-700">Priority Support</td>
                            <td class="px-6 py-4 text-center text-sm text-gray-500">—</td>
                            <td class="px-6 py-4 text-center text-sm font-black text-emerald-500">✓</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    {{-- SECTION 4: TRUST & GUARANTEES (NEW) --}}
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            <div class="text-center">
                <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">🔒</div>
                <h4 class="text-xl font-black text-gray-900 mb-2">{{ __('pricing_trust_1_title') }}</h4>
                <p class="text-gray-500 text-sm leading-relaxed">{{ __('pricing_trust_1_desc') }}</p>
            </div>
            <div class="text-center">
                <div class="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">⚡</div>
                <h4 class="text-xl font-black text-gray-900 mb-2">{{ __('pricing_trust_2_title') }}</h4>
                <p class="text-gray-500 text-sm leading-relaxed">{{ __('pricing_trust_2_desc') }}</p>
            </div>
            <div class="text-center">
                <div class="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">🛠️</div>
                <h4 class="text-xl font-black text-gray-900 mb-2">{{ __('pricing_trust_3_title') }}</h4>
                <p class="text-gray-500 text-sm leading-relaxed">{{ __('pricing_trust_3_desc') }}</p>
            </div>
        </div>
    </section>

    {{-- SECTION 5: FAQ --}}
    <section class="py-24 bg-gray-50">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-3xl font-black text-gray-900 mb-12 text-center">{{ __('pricing_faq_title') }}</h2>
            <div class="grid gap-4" x-data="{ active: null }">
                <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <button @click="active !== 1 ? active = 1 : active = null" class="w-full px-8 py-6 text-left flex justify-between items-center font-bold text-gray-900 group">
                        <span>{{ __('pricing_faq_1_q') }}</span>
                        <span class="text-indigo-600 transform transition-transform duration-300" :class="active === 1 ? 'rotate-180' : ''">↓</span>
                    </button>
                    <div x-show="active === 1" x-collapse>
                        <div class="px-8 pb-6 text-gray-500 leading-relaxed">{{ __('pricing_faq_1_a') }}</div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <button @click="active !== 2 ? active = 2 : active = null" class="w-full px-8 py-6 text-left flex justify-between items-center font-bold text-gray-900 group">
                        <span>{{ __('pricing_faq_2_q') }}</span>
                        <span class="text-indigo-600 transform transition-transform duration-300" :class="active === 2 ? 'rotate-180' : ''">↓</span>
                    </button>
                    <div x-show="active === 2" x-collapse>
                        <div class="px-8 pb-6 text-gray-500 leading-relaxed">{{ __('pricing_faq_2_a') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: BOTTOM CTA (NEW) --}}
    <section class="py-24 bg-white">
        <div class="max-w-5xl mx-auto px-6">
            <div class="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div class="relative z-10">
                    <h2 class="text-4xl md:text-5xl font-black mb-6">{{ __('pricing_bottom_cta_title') }}</h2>
                    <p class="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">{{ __('pricing_bottom_cta_desc') }}</p>
                    <a href="{{ route('register') }}" class="inline-block bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl">
                        {{ __('pricing_bottom_cta_btn') }}
                    </a>
                </div>
            </div>
        </div>
    </section>

@endsection