@extends('layouts.marketing')

@section('title', __('solve_finance_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('solve_finance_meta_desc') }}">
    <meta property="og:title" content="{{ __('solve_finance_meta_og_title') }}">
    <meta property="og:description" content="{{ __('solve_finance_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/finance-mastery') }}">

@endsection

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{ __('schema_solution_finance_mastery_name') }}",
  "description": "{{ __('schema_solution_finance_mastery_description') }}"
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
    "name": "{{ app()->getLocale() === 'id' ? 'Solusi' : 'Solutions' }}",
    "item": "{{ url('/') }}#solutions"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Finance Mastery",
    "item": "{{ url('/solutions/finance-mastery') }}"
  }]
}]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 relative border-b border-gray-100">
        <div class="mt-20 absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] [background-size:40px_40px] -z-10"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            <div class="lg:col-span-7 animate-in fade-in slide-in-from-left-12 duration-700 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950 text-indigo-100 font-bold text-xs mb-8 uppercase tracking-wider shadow-lg">
                    💰 {{ __('solve_finance_hero_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] text-gray-900 tracking-tight">
                    {{ __('solve_finance_hero_title_1') }}
                    <span class="block py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {{ __('solve_finance_hero_title_2') }}
                    </span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-2xl">
                    {{ __('solve_finance_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
                        {{ __('solve_finance_hero_cta') }}
                    </a>
                </div>
            </div>

            <div class="lg:col-span-5 relative z-10 w-full animate-in fade-in slide-in-from-right-12 duration-1000">
                <div class="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-400 to-rose-400 rounded-[2.5rem] blur opacity-20 animate-pulse duration-[4000ms]"></div>
                <div class="relative bg-white rounded-[2.5rem] shadow-2xl border border-white flex flex-col h-[500px] overflow-hidden transform transition hover:scale-[1.01] duration-500 p-8">
                    <div class="space-y-6">
                        <div class="p-6 bg-indigo-950 rounded-3xl text-white shadow-xl">
                            <p class="text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-1">Total Assets</p>
                            <h3 class="text-3xl font-black">Rp 42.500.000</h3>
                            <div class="mt-4 flex gap-2">
                                <span class="px-2 py-1 bg-white/10 rounded-md text-[10px] font-bold">+12% this month</span>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <p class="text-emerald-600 text-[10px] font-bold uppercase mb-1">Income</p>
                                <p class="font-black text-emerald-950">Rp 12,5M</p>
                            </div>
                            <div class="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                                <p class="text-rose-600 text-[10px] font-bold uppercase mb-1">Expenses</p>
                                <p class="font-black text-rose-950">Rp 4,2M</p>
                            </div>
                        </div>

                        <div class="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                            <div class="flex justify-between items-center mb-3">
                                <h4 class="text-[10px] font-black uppercase text-gray-500">Savings Goal: Japan Trip</h4>
                                <span class="text-indigo-600 text-[10px] font-bold">75%</span>
                            </div>
                            <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div class="bg-indigo-600 h-full w-[75%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (THE FINANCIAL ANXIETY TRAP) --}}
    <section class="py-32 bg-white border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-20">
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900">{{ __('solve_finance_prob_title') }}</h2>
                <p class="text-xl text-gray-500">{{ __('solve_finance_prob_desc') }}</p>
            </div>

            <div class="flex flex-col md:flex-row gap-8">
                <div class="flex-1 bg-rose-50/50 p-10 rounded-[3rem] border border-rose-100">
                    <div class="text-5xl mb-6">📉</div>
                    <h3 class="text-2xl font-bold text-rose-900 mb-4">{{ __('solve_finance_prob_1_title') }}</h3>
                    <ul class="space-y-4 text-rose-800/70">
                        <li class="flex items-center gap-3"><span class="text-rose-500">✕</span> {{ __('solve_finance_prob_1_point_1') }}</li>
                        <li class="flex items-center gap-3"><span class="text-rose-500">✕</span> {{ __('solve_finance_prob_1_point_2') }}</li>
                        <li class="flex items-center gap-3"><span class="text-rose-500">✕</span> {{ __('solve_finance_prob_1_point_3') }}</li>
                    </ul>
                </div>
                <div class="flex-1 bg-gray-50 p-10 rounded-[3rem] border border-gray-200">
                    <div class="text-5xl mb-6">📊</div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ __('solve_finance_prob_2_title') }}</h3>
                    <ul class="space-y-4 text-gray-500">
                        <li class="flex items-center gap-3"><span class="text-gray-400">✕</span> {{ __('solve_finance_prob_2_point_1') }}</li>
                        <li class="flex items-center gap-3"><span class="text-gray-400">✕</span> {{ __('solve_finance_prob_2_point_2') }}</li>
                        <li class="flex items-center gap-3"><span class="text-gray-400">✕</span> {{ __('solve_finance_prob_2_point_3') }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>


    {{-- SECTION 3: THE SOLUTION (THE WEALTH ENGINE) --}}
    <section class="py-32 bg-slate-900 text-white relative overflow-hidden">
        {{-- Elegant subtle glow --}}
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                {{-- Left: The Engine Visual --}}
                <div class="relative w-full aspect-square max-h-[500px]">
                    <div class="absolute inset-0 border border-slate-700 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
                        <div class="w-4 h-4 bg-indigo-500 rounded-full absolute -top-2"></div>
                    </div>
                    <div class="absolute inset-8 border border-slate-600 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
                        <div class="w-3 h-3 bg-purple-400 rounded-full absolute -bottom-1.5"></div>
                    </div>
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                        <div class="bg-indigo-500/20 p-6 rounded-full border border-indigo-500/30 mb-4 backdrop-blur-md">
                            <span class="text-5xl">🏦</span>
                        </div>
                        <h4 class="text-2xl font-black tracking-widest uppercase text-indigo-400">OFM Ledger</h4>
                        <p class="text-slate-400 text-sm mt-2">Zero-Friction Finance</p>
                    </div>
                </div>

                {{-- Right: Features --}}
                <div>
                    <h2 class="text-4xl md:text-5xl font-black mb-8 leading-tight">
                        {{ __('solve_finance_sol_title') }}
                    </h2>
                    <div class="space-y-8">
                        <div class="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <h4 class="text-xl font-bold text-indigo-400 mb-2">{{ __('solve_finance_sol_feat_1_title') }}</h4>
                            <p class="text-slate-400">{{ __('solve_finance_sol_feat_1_desc') }}</p>
                        </div>
                        <div class="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <h4 class="text-xl font-bold text-purple-400 mb-2">{{ __('solve_finance_sol_feat_2_title') }}</h4>
                            <p class="text-slate-400">{{ __('solve_finance_sol_feat_2_desc') }}</p>
                        </div>
                        <div class="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <h4 class="text-xl font-bold text-blue-400 mb-2">{{ __('solve_finance_sol_feat_3_title') }}</h4>
                            <p class="text-slate-400">{{ __('solve_finance_sol_feat_3_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE SYNERGY (HABITS MEET FINANCE) --}}
    <section class="py-32 bg-indigo-50/50 border-t border-indigo-100">
        <div class="max-w-6xl mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-5xl font-black text-indigo-950 mb-6">{{ __('solve_finance_syn_title') }}</h2>
            <p class="text-xl text-indigo-800/70 max-w-2xl mx-auto mb-16">{{ __('solve_finance_syn_desc') }}</p>

            <div class="flex flex-col md:flex-row items-center justify-center gap-8">
                <div class="bg-white p-8 rounded-3xl shadow-lg border border-indigo-100 w-full md:w-1/3">
                    <div class="text-4xl mb-4">☕</div>
                    <p class="font-bold text-gray-900">Habit Logged</p>
                    <p class="text-sm text-gray-500">"Make Coffee at Home"</p>
                </div>
                <div class="text-indigo-500 text-4xl font-black">→</div>
                <div class="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl w-full md:w-1/3 transform scale-105">
                    <div class="text-4xl mb-4">💰</div>
                    <p class="font-bold text-indigo-100">Auto Allocation</p>
                    <p class="text-2xl font-black mt-1">+ Rp 35.000 to Savings</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: PORTFOLIO REBALANCING (UNIQUE A) --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-2xl relative">
                <div class="flex justify-center gap-4">
                    <div class="w-12 h-32 bg-indigo-500 rounded-t-full"></div>
                    <div class="w-12 h-48 bg-purple-500 rounded-t-full"></div>
                    <div class="w-12 h-24 bg-sky-500 rounded-t-full"></div>
                    <div class="w-12 h-40 bg-emerald-500 rounded-t-full"></div>
                </div>
                <div class="mt-8 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Distribution</div>
            </div>
            <div>
                <h2 class="text-4xl font-black text-gray-900 mb-6">{{ __('solve_finance_extra_1_title') }}</h2>
                <p class="text-xl text-gray-500 leading-relaxed">
                    {{ __('solve_finance_extra_1_desc') }}
                </p>
            </div>
        </div>
    </section>

    {{-- SECTION: FREEDOM RUNWAY (UNIQUE B) --}}
    <section class="py-32 bg-slate-950 text-white relative">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-4xl font-black mb-8">{{ __('solve_finance_extra_2_title') }}</h2>
            <p class="text-xl text-slate-400 leading-relaxed mb-12 italic">
                {{ __('solve_finance_extra_2_desc') }}
            </p>
            <div class="inline-block p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                <div class="text-6xl font-black text-indigo-400 mb-2">18</div>
                <div class="text-xs font-black uppercase tracking-widest text-slate-500">Months of Runway</div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION: SCIENTIFIC PILLAR (E-E-A-T) - WEALTH ARCHITECTURE STYLE --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        {{-- Architecture Lines --}}
        <div class="absolute inset-0 bg-[linear-gradient(rgba(71,85,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,0.03)_1px,transparent_1px)] [background-size:60px_60px] opacity-40"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="bg-white border-y-4 border-slate-900 rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden group">
                
                <div class="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                            🧬 {{ __('solve_finance_science_badge') }}
                        </div>

                        <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-10 leading-[1.1]">
                            {{ __('solve_finance_science_title') }}
                        </h2>

                        <div class="relative py-10 px-10 bg-slate-50 border border-slate-200 rounded-3xl mb-12">
                            <p class="text-slate-700 text-xl md:text-2xl font-serif italic leading-relaxed">
                                "{{ __('solve_finance_science_desc') }}"
                            </p>
                        </div>

                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition uppercase tracking-tighter font-black text-xs text-slate-500">
                                <span>Core Principle 01</span>
                                <span class="text-slate-900">Compounding Velocity</span>
                            </div>
                            <div class="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition uppercase tracking-tighter font-black text-xs text-slate-500">
                                <span>Core Principle 02</span>
                                <span class="text-slate-900">Asset Allocation</span>
                            </div>
                            <div class="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition uppercase tracking-tighter font-black text-xs text-slate-500">
                                <span>Core Principle 03</span>
                                <span class="text-slate-900">Risk Mitigation</span>
                            </div>
                        </div>
                    </div>

                    <div class="relative hidden lg:block">
                        {{-- Structural Blueprint Illustration --}}
                        <div class="relative w-full aspect-[4/5] bg-slate-100 rounded-3xl p-12 overflow-hidden border border-slate-200">
                             {{-- Isometric Pillars --}}
                             <div class="absolute bottom-0 left-12 w-16 h-[60%] bg-slate-900 transform -skew-x-12 opacity-90 transition-all duration-700 group-hover:h-[65%]"></div>
                             <div class="absolute bottom-0 left-32 w-16 h-[40%] bg-indigo-600 transform -skew-x-12 opacity-90 transition-all duration-700 group-hover:h-[45%]"></div>
                             <div class="absolute bottom-0 left-52 w-16 h-[80%] bg-slate-900 transform -skew-x-12 opacity-90 transition-all duration-700 group-hover:h-[85%]"></div>
                             
                             <div class="absolute top-12 right-12 text-6xl opacity-20">📐</div>
                             <div class="absolute bottom-12 right-12 text-right">
                                <p class="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Financial_Foundation_Secure</p>
                                <p class="text-2xl font-black text-slate-900">Level: Master</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 bg-gray-50 border-y border-gray-100">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-4xl font-black text-center text-gray-900 mb-16">{{ __('solve_finance_faq_title') }}</h2>
            <div class="space-y-6">
                @foreach([1, 2, 3] as $i)
                <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __("solve_finance_faq_q$i") }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __("solve_finance_faq_a$i") }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SECTION 5: CTA --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-4xl mx-auto text-center relative z-10 px-6">
            <div class="text-6xl mb-8 animate-bounce">📈</div>
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-gray-900 tracking-tight">{{ __('solve_finance_cta_title') }}</h2>
            <p class="text-gray-500 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
                {{ __('solve_finance_cta_desc') }}
            </p>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-700 transition-colors duration-300 shadow-[0_20px_40px_rgba(79,70,229,0.3)]">
                {{ __('solve_finance_cta_btn') }}
            </a>
        </div>
    </section>
@endsection