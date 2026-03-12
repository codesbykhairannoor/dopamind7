@extends('layouts.marketing')

@section('title', __('solve_career_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('solve_career_meta_desc') }}">
    <meta property="og:title" content="{{ __('solve_career_meta_og_title') }}">
    <meta property="og:description" content="{{ __('solve_career_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/career-accelerator') }}">
    <link rel="canonical" href="{{ url('/solutions/career-accelerator') }}" />
@endsection

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{ __('schema_solution_career_name') }}",
  "description": "{{ __('schema_solution_career_description') }}"
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
    "name": "Career Accelerator",
    "item": "{{ url('/solutions/career-accelerator') }}"
  }]
}]
</script>
@endsection

@section('content')

    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO (Dipertahankan sesuai instruksi) --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative border-b border-slate-100">
        <div class="mt-20 absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] [background-size:40px_40px] -z-10"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            <div class="lg:col-span-7 animate-in fade-in slide-in-from-left-12 duration-700 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950 text-indigo-100 font-bold text-xs mb-8 uppercase tracking-wider shadow-lg">
                    💼 {{ __('solve_career_hero_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] text-slate-900 tracking-tight">
                    {{ __('solve_career_hero_title_1') }}
                    <span class="block py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {{ __('solve_career_hero_title_2') }}
                    </span>
                </h1>
                
                <p class="text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-2xl">
                    {{ __('solve_career_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
                        {{ __('solve_career_hero_cta') }}
                    </a>
                </div>
            </div>

            <div class="lg:col-span-5 relative z-10 w-full animate-in fade-in slide-in-from-right-12 duration-1000">
                <div class="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-400 to-rose-400 rounded-[2.5rem] blur opacity-20 animate-pulse duration-[4000ms]"></div>
                <div class="relative bg-white rounded-[2.5rem] shadow-2xl border border-white flex flex-col h-[500px] overflow-hidden transform transition hover:scale-[1.01] duration-500 p-8">
                    <div class="space-y-6">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="font-black text-slate-900 text-sm">{{ __('solve_career_mockup_header') }}</h4>
                            <span class="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-full">Live Tracking</span>
                        </div>
                        
                        <div class="space-y-3">
                            <div class="p-4 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-2xl">
                                <div class="flex justify-between items-center">
                                    <p class="font-bold text-indigo-950 text-xs">Google - Senior UX</p>
                                    <span class="text-[10px] font-bold text-indigo-600">Interviewing</span>
                                </div>
                            </div>
                            <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-2xl">
                                <div class="flex justify-between items-center">
                                    <p class="font-bold text-emerald-950 text-xs">Stripe - Product Lead</p>
                                    <span class="text-[10px] font-bold text-emerald-600">Offer Received 🎉</span>
                                </div>
                            </div>
                            <div class="p-4 bg-slate-50 border-l-4 border-slate-300 rounded-r-2xl">
                                <div class="flex justify-between items-center">
                                    <p class="font-bold text-slate-900 text-xs">Airbnb - Designer</p>
                                    <span class="text-[10px] font-bold text-slate-400">Applied</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 p-5 bg-slate-900 rounded-3xl text-white">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">🎯</div>
                                <div>
                                    <p class="text-[10px] font-bold text-indigo-300 uppercase">Growth Plan</p>
                                    <p class="text-xs font-bold">Learn Advanced Framer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: NEW LAYOUT -> ZIG-ZAG CARDS (THE PROBLEM) --}}
    <section class="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-24">
                <h2 class="text-4xl md:text-5xl font-black mb-6 leading-tight">{{ __('solve_career_prob_title') }}</h2>
                <p class="text-xl text-slate-400">{{ __('solve_career_prob_desc') }}</p>
            </div>

            <div class="space-y-12 md:space-y-0">
                <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div class="w-full md:w-1/2 bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl hover:bg-white/10 transition duration-300">
                        <div class="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center text-3xl mb-8">🕳️</div>
                        <h3 class="text-2xl font-bold mb-4 text-white">{{ __('solve_career_prob_1_title') }}</h3>
                        <p class="text-slate-400 text-lg leading-relaxed">{{ __('solve_career_prob_1_desc') }}</p>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 md:-mt-16 relative z-10">
                    <div class="w-full md:w-1/2 bg-indigo-600/20 backdrop-blur-xl p-10 rounded-[3rem] border border-indigo-500/30 shadow-2xl hover:bg-indigo-600/30 transition duration-300">
                        <div class="w-16 h-16 bg-indigo-500/30 text-indigo-300 rounded-2xl flex items-center justify-center text-3xl mb-8">📊</div>
                        <h3 class="text-2xl font-bold mb-4 text-white">{{ __('solve_career_prob_2_title') }}</h3>
                        <p class="text-indigo-200 text-lg leading-relaxed">{{ __('solve_career_prob_2_desc') }}</p>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16 md:-mt-16 relative z-20">
                    <div class="w-full md:w-1/2 bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl hover:bg-white/10 transition duration-300">
                        <div class="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center text-3xl mb-8">👻</div>
                        <h3 class="text-2xl font-bold mb-4 text-white">{{ __('solve_career_prob_3_title') }}</h3>
                        <p class="text-slate-400 text-lg leading-relaxed">{{ __('solve_career_prob_3_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: SCIENTIFIC PILLAR (E-E-A-T) --}}
    <section class="py-24 bg-indigo-50/50 border-y border-indigo-100/30 text-center">
        <div class="max-w-4xl mx-auto px-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                🧬 {{ __('solve_career_science_badge') }}
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6">{{ __('solve_career_science_title') }}</h2>
            <p class="text-slate-500 text-lg leading-relaxed italic max-w-2xl mx-auto">
                {{ __('solve_career_science_desc') }}
            </p>
            <div class="mt-10 flex flex-wrap justify-center gap-8 opacity-40 grayscale">
                <span class="text-xs font-black uppercase tracking-tighter">Sales Funnel Logic</span>
                <span class="text-xs font-black uppercase tracking-tighter">Follow-up Persistence</span>
                <span class="text-xs font-black uppercase tracking-tighter">Conversion Metrics</span>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: NEW LAYOUT -> HORIZONTAL TIMELINE TRACKER (THE SOLUTION) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-24 max-w-3xl mx-auto">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl text-3xl mb-8 shadow-sm border border-indigo-100">⚙️</div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight">
                    {{ __('solve_career_sol_title') }}
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed">
                    {{ __('solve_career_sol_desc') }}
                </p>
            </div>

            {{-- Horizontal Tracker --}}
            <div class="relative max-w-5xl mx-auto">
                {{-- Connecting Line --}}
                <div class="hidden md:block absolute top-1/2 left-0 w-full h-2 bg-slate-100 rounded-full transform -translate-y-1/2 -z-10"></div>
                <div class="hidden md:block absolute top-1/2 left-0 w-2/3 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transform -translate-y-1/2 -z-10"></div>

                <div class="grid md:grid-cols-3 gap-8">
                    {{-- Step 1 --}}
                    <div class="bg-white border-2 border-indigo-500 rounded-[2.5rem] p-8 text-center shadow-xl transform md:-translate-y-4 hover:-translate-y-6 transition duration-300 relative">
                        <div class="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-indigo-600 text-white font-black rounded-full flex items-center justify-center border-4 border-white">1</div>
                        <h4 class="text-xl font-black text-slate-900 mb-3 mt-4">{{ __('solve_career_sol_step_1_title') }}</h4>
                        <p class="text-slate-500 text-sm leading-relaxed">{{ __('solve_career_sol_step_1_desc') }}</p>
                    </div>
                    
                    {{-- Step 2 --}}
                    <div class="bg-indigo-50 border-2 border-indigo-200 rounded-[2.5rem] p-8 text-center shadow-md transform hover:-translate-y-2 transition duration-300 relative">
                        <div class="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-indigo-400 text-white font-black rounded-full flex items-center justify-center border-4 border-white">2</div>
                        <h4 class="text-xl font-black text-slate-900 mb-3 mt-4">{{ __('solve_career_sol_step_2_title') }}</h4>
                        <p class="text-slate-600 text-sm leading-relaxed">{{ __('solve_career_sol_step_2_desc') }}</p>
                    </div>

                    {{-- Step 3 --}}
                    <div class="bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] p-8 text-center shadow-sm transform hover:-translate-y-2 transition duration-300 relative">
                        <div class="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-slate-300 text-slate-700 font-black rounded-full flex items-center justify-center border-4 border-white">3</div>
                        <h4 class="text-xl font-black text-slate-900 mb-3 mt-4">{{ __('solve_career_sol_step_3_title') }}</h4>
                        <p class="text-slate-500 text-sm leading-relaxed">{{ __('solve_career_sol_step_3_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: INTERVIEW PREP (UNIQUE A) --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="bg-indigo-950 rounded-[3rem] p-8 md:p-12 shadow-2xl relative order-2 md:order-1">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-50"></div>
                <div class="space-y-4 relative z-10">
                    @foreach(['Company Mission', 'My Value Prop', 'Questions to Ask'] as $item)
                        <div class="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center gap-3">
                            <span class="text-indigo-400">⚡</span>
                            <span class="text-white font-bold">{{ $item }}</span>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="order-1 md:order-2">
                <h2 class="text-4xl font-black text-slate-900 mb-6">{{ __('solve_career_extra_1_title') }}</h2>
                <p class="text-xl text-slate-500 leading-relaxed">
                    {{ __('solve_career_extra_1_desc') }}
                </p>
            </div>
        </div>
    </section>

    {{-- SECTION: MARKET VALUE (UNIQUE B) --}}
    <section class="py-32 bg-slate-50 border-y border-slate-100">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-4xl font-black text-slate-900 mb-8">{{ __('solve_career_extra_2_title') }}</h2>
            <p class="text-xl text-slate-500 leading-relaxed mb-12">
                {{ __('solve_career_extra_2_desc') }}
            </p>
            <div class="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm inline-block">
                <div class="flex items-center gap-8 justify-center">
                    <div class="text-left">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Offer</p>
                        <p class="text-2xl font-black text-slate-900">$85k</p>
                    </div>
                    <div class="text-2xl text-slate-300">→</div>
                    <div class="text-left">
                        <p class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Negotiated</p>
                        <p class="text-2xl font-black text-indigo-600">$105k</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: VISUAL FAQ --}}
    <section class="py-32 bg-white">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-4xl font-black text-center text-slate-900 mb-16">{{ __('solve_career_faq_title') }}</h2>
            <div class="space-y-6">
                @foreach([1, 2, 3] as $i)
                <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
                    <h3 class="text-xl font-bold text-slate-900 mb-3">{{ __("solve_career_faq_q$i") }}</h3>
                    <p class="text-slate-500 leading-relaxed">{{ __("solve_career_faq_a$i") }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 5: DRAMATIC DARK CTA --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-indigo-950 relative overflow-hidden">
        {{-- Intense Glowing Orb --}}
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/40 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:64px_64px] opacity-10"></div>

        <div class="max-w-4xl mx-auto text-center relative z-10 px-6">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md rounded-full text-5xl mb-10 border border-white/20 shadow-[0_0_50px_rgba(79,70,229,0.5)]">🚀</div>
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight leading-tight">
                {{ __('solve_career_cta_title') }}
            </h2>
            <p class="text-indigo-200 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
                {{ __('solve_career_cta_desc') }}
            </p>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-white text-indigo-950 px-14 py-5 rounded-full font-black text-xl hover:bg-indigo-50 hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.2)]">
                {{ __('solve_career_cta_btn') }}
            </a>
            <p class="mt-10 text-xs text-indigo-400 font-bold uppercase tracking-[0.2em]">{{ __('solve_career_cta_note') }}</p>
        </div>
    </section>

    {{-- SECTION: INTERNAL LINKING (UNIFIED ECOSYSTEM) --}}
    <section class="py-24 bg-white border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-3xl font-black text-gray-900 mb-12 text-center">{{ __('unified_ecosystem_title', ['feature' => __('solve_career_hero_badge')]) }}</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <a href="{{ url('/features/habit') }}" class="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition duration-500">
                    <span class="text-2xl mb-4 block group-hover:scale-110 transition">🌱</span>
                    <h4 class="font-bold text-gray-900">{{ __('habit_hero_badge') }}</h4>
                    <p class="text-xs text-gray-500 mt-2">{{ __('habit_meta_title') }}</p>
                </a>
                <a href="{{ url('/features/planner') }}" class="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition duration-500">
                    <span class="text-2xl mb-4 block group-hover:scale-110 transition">📅</span>
                    <h4 class="font-bold text-gray-900">{{ __('planner_hero_badge') }}</h4>
                    <p class="text-xs text-gray-500 mt-2">{{ __('planner_meta_title') }}</p>
                </a>
                <a href="{{ url('/features/finance') }}" class="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition duration-500">
                    <span class="text-2xl mb-4 block group-hover:scale-110 transition">💰</span>
                    <h4 class="font-bold text-gray-900">{{ __('finance_hero_badge') }}</h4>
                    <p class="text-xs text-gray-500 mt-2">{{ __('finance_meta_title') }}</p>
                </a>
                <a href="{{ url('/features/journal') }}" class="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition duration-500">
                    <span class="text-2xl mb-4 block group-hover:scale-110 transition">📔</span>
                    <h4 class="font-bold text-gray-900">{{ __('journal_hero_badge') }}</h4>
                    <p class="text-xs text-gray-500 mt-2">{{ __('journal_meta_title') }}</p>
                </a>
            </div>
        </div>
    </section>

@endsection