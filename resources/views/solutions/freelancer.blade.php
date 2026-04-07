@extends('layouts.marketing')

@section('title', __('freelance_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('freelance_meta_desc') }} - {{ app()->getLocale() === 'id' ? __('schema_solution_freelancer_description_id') : __('schema_solution_freelancer_description_en') }}">
    <meta property="og:title" content="{{ __('freelance_meta_og_title') }}">
    <meta property="og:description" content="{{ __('freelance_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/freelancer') }}">

@endsection

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Productivity Management for Freelancers",
  "provider": {
    "@type": "Organization",
    "name": "OneForMind"
  },
  "areaServed": [{
    "@type": "Country",
    "name": "Indonesia"
  },{
    "@type": "City",
    "name": "Jakarta"
  }],
  "description": "Comprehensive project and finance management system designed for independent professionals in the Indonesian creative and tech industries."
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
    "name": "{{ app()->getLocale() === 'id' ? 'Pekerja Lepas' : 'Freelancer' }}",
    "item": "{{ url('/solutions/freelancer') }}"
  }]
}]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (CLEAN UNIFIED DASHBOARD - FREELANCE EDITION) --}}
   {{-- SECTION 1: HERO (FLOATING FREELANCE ECOSYSTEM) --}}
<header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-slate-50 relative border-b border-gray-100">
    <div class="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:40px_40px] -z-10"></div>
    
    <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {{-- Left: Massive Typography (Sama seperti sebelumnya) --}}
        <div class="lg:col-span-7 animate-in fade-in slide-in-from-left-12 duration-700 fill-mode-both relative z-20">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950 text-indigo-100 font-bold text-xs mb-8 uppercase tracking-wider shadow-lg">
                💻 {{ __('freelance_hero_badge') }}
            </div>
            
            <h1 class="text-[36px] leading-[1.1] md:text-6xl xl:text-7xl mb-6 leading-[1.05] text-gray-900 tracking-tight font-black">
                {{ __('freelance_hero_title_1') }}
                <span class="block py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
                    {{ __('freelance_hero_title_2') }}
                </span>
            </h1>
            
            <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-2xl">
                {{ __('freelance_hero_desc') }}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 text-center">
                    {{ __('freelance_hero_cta_1') }}
                </a>
            </div>
            
              <div class="mt-8 flex items-center gap-4 text-sm font-bold text-gray-400">
                    <div class="flex -space-x-2">
                        <span class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border-2 border-white text-xs">SS</span>
                        <span class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 border-2 border-white text-xs">DF</span>
                        <span class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border-2 border-white text-xs">KN</span>
                    </div>
                    <p>{{ __('freelance_hero_social_proof') }}</p>
                </div>
        </div>

        {{-- Right: SURPRISE LAYOUT - Floating Freelance Ecosystem (Tinggi Terkunci h-[500px]) --}}
        <div class="lg:col-span-5 mt-0 relative z-10 w-full h-[500px] animate-in fade-in slide-in-from-right-12 duration-1000 fill-mode-both flex items-center justify-center">
            
            {{-- Background Glow --}}
            <div class="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full blur-[100px] opacity-20 animate-pulse duration-[5000ms]"></div>
            
            {{-- 1. Center Piece: Freelancer ID Card --}}
            <div class="absolute z-20 w-72 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white p-6 transform hover:scale-105 transition duration-500">
                <div class="flex justify-between items-start mb-6">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 p-0.5">
                        <img class="w-full h-full rounded-full border-2 border-white object-cover" src="https://ui-avatars.com/api/?name=U+M&background=fff&color=4f46e5" alt="User">
                    </div>
                    <span class="bg-emerald-100 text-emerald-600 text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> {{ __('freelance_mockup_available') }}
                    </span>
                </div>
                <div>
                    <h3 class="font-black text-xl text-gray-900 mb-1">{{ __('freelance_mockup_role') }}</h3>
                    <p class="text-xs font-medium text-gray-500 mb-4">{{ __('freelance_mockup_rating') }}</p>
                    
                    <div class="flex gap-2 mb-4">
                        <span class="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded-md font-bold">Laravel</span>
                        <span class="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded-md font-bold">Vue.js</span>
                        <span class="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded-md font-bold">Tailwind</span>
                    </div>
                    
                    <div class="w-full bg-gray-100 rounded-full h-1.5">
                        <div class="bg-gradient-to-r from-indigo-500 to-sky-400 h-1.5 rounded-full w-[92%]"></div>
                    </div>
                    <p class="text-[10px] text-right font-bold text-gray-400 mt-1">{{ __('freelance_mockup_completion') }}</p>
                </div>
            </div>

            {{-- 2. Floating Item Top Right: Payment Received --}}
            <div class="absolute top-8 right-0 z-30 w-56 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700 p-4 transform rotate-3 hover:rotate-0 transition duration-300 animate-bounce duration-[4000ms]">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">💰</div>
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{{ __('freelance_mockup_payment_badge') }}</p>
                        <p class="text-sm text-white">$ 1,250.00</p>
                    </div>
                </div>
                <p class="text-[10px] text-slate-400 italic">{{ __('freelance_mockup_payment_from') }}</p>
            </div>

            {{-- 3. Floating Item Bottom Left: Client Message --}}
            <div class="absolute bottom-12 left-0 z-30 w-64 bg-white rounded-2xl shadow-xl border border-sky-100 p-4 transform -rotate-3 hover:rotate-0 transition duration-300">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-sm">👋</div>
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <p class="text-xs text-gray-900">{{ __('freelance_mockup_msg_name') }}</p>
                            <p class="text-[9px] font-bold text-gray-400">{{ __('freelance_mockup_msg_time') }}</p>
                        </div>
                        <p class="text-[11px] font-medium text-gray-600 leading-tight">
                            "{{ __('freelance_mockup_msg_text') }}"
                        </p>
                    </div>
                </div>
            </div>

            {{-- Decorative Element: Project Milestone --}}
            <div class="absolute bottom-4 right-10 z-10 bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm border border-slate-100 flex items-center gap-2">
                <span class="text-sky-500">🎯</span>
                <p class="text-[10px] text-slate-700 uppercase tracking-wide">{{ __('freelance_mockup_milestone') }}</p>
            </div>

        </div>
    </div>
</header>

    {{-- SECTION 2: THE "FREELANCE ROLLERCOASTER" (HORIZONTAL PATHWAY) --}}
    <section class="py-24 bg-white bg-pattern-dots relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h2 class="text-3xl md:text-5xl mb-6 text-gray-900 font-black">{{ __('freelance_prob_title') }}</h2>
                <p class="text-xl text-gray-500">{{ __('freelance_prob_desc') }}</p>
            </div>

            <div class="relative max-w-5xl mx-auto">
                <div class="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-gray-100 -z-10 rounded-full border-b-2 border-dashed border-gray-200"></div>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition duration-300 relative group">
                        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl text-gray-400 absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-white group-hover:bg-indigo-600 group-hover:text-white transition">1</div>
                        <div class="text-4xl mb-4 mt-2 text-center font-black">🤯</div>
                        <h3 class="text-lg font-bold mb-3 text-center text-gray-900">{{ __('freelance_prob_1_title') }}</h3>
                        <p class="text-gray-500 text-sm text-center">{{ __('freelance_prob_1_desc') }}</p>
                    </div>
                    <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-rose-200 transition duration-300 relative group delay-100">
                        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl text-gray-400 absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-white group-hover:bg-rose-500 group-hover:text-white transition">2</div>
                        <div class="text-4xl mb-4 mt-2 text-center font-black">💸</div>
                        <h3 class="text-lg font-bold mb-3 text-center text-gray-900">{{ __('freelance_prob_2_title') }}</h3>
                        <p class="text-gray-500 text-sm text-center">{{ __('freelance_prob_2_desc') }}</p>
                    </div>
                    <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-amber-200 transition duration-300 relative group delay-200">
                        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl text-gray-400 absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-white group-hover:bg-amber-500 group-hover:text-white transition">3</div>
                        <div class="text-4xl mb-4 mt-2 text-center font-black">🥱</div>
                        <h3 class="text-lg font-bold mb-3 text-center text-gray-900">{{ __('freelance_prob_3_title') }}</h3>
                        <p class="text-gray-500 text-sm text-center">{{ __('freelance_prob_3_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>


    {{-- SECTION 3: COMMAND CENTER (DARK MODE HIGHLIGHT) --}}
    <section class="py-24 bg-slate-950 border-y border-slate-900 relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
        <div class="absolute -right-40 -top-40 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] opacity-20"></div>

        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div class="order-2 lg:order-1 relative h-[450px] bg-slate-900 rounded-[3rem] p-8 flex flex-col justify-center overflow-hidden border border-slate-800 shadow-2xl">
                {{-- Mockup Kanban / Projects Dark Mode --}}
                <div class="space-y-4">
                    <div class="flex justify-between items-center mb-2">
                        <h4 class="text-slate-300 font-bold">{{ __('freelance_mockup_active_title') }}</h4>
                        <span class="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">{{ __('freelance_mockup_active_status') }}</span>
                    </div>
                    
                    <div class="bg-slate-800/80 backdrop-blur p-4 rounded-2xl border border-slate-700 flex justify-between items-center transform transition hover:translate-x-2 cursor-pointer">
                        <div>
                            <p class="text-white font-bold text-sm">{{ __('freelance_mockup_project_1_title') }}</p>
                            <p class="text-slate-400 text-xs">{{ __('freelance_mockup_project_1_sub') }}</p>
                        </div>
                        <div class="w-8 h-8 rounded-full border-2 border-indigo-500 flex items-center justify-center text-xs text-indigo-400 font-bold">75%</div>
                    </div>
                    
                    <div class="bg-slate-800/80 backdrop-blur p-4 rounded-2xl border border-slate-700 flex justify-between items-center transform transition hover:translate-x-2 cursor-pointer">
                        <div>
                            <p class="text-white font-bold text-sm">{{ __('freelance_mockup_project_2_title') }}</p>
                            <p class="text-slate-400 text-xs">{{ __('freelance_mockup_project_2_sub') }}</p>
                        </div>
                        <div class="w-8 h-8 rounded-full border-2 border-amber-500 flex items-center justify-center text-xs text-amber-400 font-bold">30%</div>
                    </div>
                </div>
            </div>
            
            <div class="order-1 lg:order-2 animate-in fade-in slide-in-from-right-12 duration-700">
                <div class="inline-flex items-center justify-center w-14 h-14 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 rounded-2xl text-2xl mb-6 shadow-[0_0_15px_rgba(99,102,241,0.2)]">🛠️</div>
                <h2 class="text-3xl md:text-4xl mb-6 text-white font-black">{{ __('freelance_feat_1_title') }}</h2>
                <p class="text-slate-400 text-lg leading-relaxed mb-8">
                    {{ __('freelance_feat_1_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-slate-300">
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm shrink-0 border border-indigo-500/30">✓</span> {{ __('freelance_feat_1_point_1') }}</li>
                    <li class="flex items-center gap-4"><span class="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm shrink-0 border border-indigo-500/30">✓</span> {{ __('freelance_feat_1_point_2') }}</li>
                </ul>
            </div>
        </div>
    </section>

    {{-- SECTION 4: INVOICE & MONEY (SPLIT) --}}
    <section class="py-24 bg-gray-50">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <div class="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl text-2xl mb-6">💰</div>
                <h2 class="text-3xl md:text-4xl mb-6 text-gray-900 font-black">{{ __('freelance_feat_2_title') }}</h2>
                <p class="text-gray-500 text-lg leading-relaxed mb-8">
                    {{ __('freelance_feat_2_desc') }}
                </p>
                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <div class="flex justify-between items-center font-bold">
                        <span class="text-gray-700">{{ __('freelance_feat_2_point_1') }}</span>
                        <span class="text-emerald-500">Tracked</span>
                    </div>
                    <div class="w-full h-px bg-gray-100"></div>
                    <div class="flex justify-between items-center font-bold">
                        <span class="text-gray-700">{{ __('freelance_feat_2_point_2') }}</span>
                        <span class="text-emerald-500">Automated</span>
                    </div>
                </div>
            </div>
            
            <div class="relative h-[400px] bg-white rounded-[3rem] p-8 flex items-center justify-center overflow-hidden border border-gray-200 shadow-xl shadow-gray-200/50">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                {{-- Mockup Receipt / Invoice --}}
                <div class="bg-gray-50 w-64 p-6 rounded-t-xl rounded-b-sm border border-dashed border-gray-300 relative shadow-inner">
                    <div class="text-center mb-4 border-b border-dashed border-gray-300 pb-4">
                        <h4 class="font-black text-gray-900 text-xl tracking-widest">{{ __('freelance_mockup_invoice_title') }}</h4>
                        <p class="text-[10px] text-gray-500 mt-1">{{ __('freelance_mockup_invoice_status') }}</p>
                    </div>
                    <div class="space-y-2 text-xs font-medium text-gray-600 mb-4 border-b border-dashed border-gray-300 pb-4">
                        <div class="flex justify-between"><span>{{ __('freelance_mockup_invoice_item_1') }}</span><span>$500</span></div>
                        <div class="flex justify-between"><span>{{ __('freelance_mockup_invoice_item_2') }}</span><span>$200</span></div>
                    </div>
                    <div class="flex justify-between text-emerald-600 text-lg">
                        <span>{{ __('freelance_mockup_invoice_total') }}</span><span>$700</span>
                    </div>
                    {{-- Zig-zag bottom edge illusion --}}
                    <div class="absolute -bottom-2 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cGF0aCBkPSJNMCA4IEw0IDAgTDggOCBaIiBmaWxsPSIjRjlGQUZCIiAvPgo8L3N2Zz4=')] bg-repeat-x"></div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: FREELANCER ARSENAL (MASONRY/STAGGERED BENTO) --}}
    <section class="py-24 bg-white border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl text-gray-900 mb-4 font-black">{{ __('freelance_bento_title') }}</h2>
                <p class="text-gray-500 text-lg">{{ __('freelance_bento_desc') }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 lg:row-span-2 bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl hover:-translate-y-1 transition flex flex-col justify-between min-h-[300px]">
                    <div class="text-3xl mb-4 font-black">🗂️</div>
                    <div>
                        <h3 class="text-xl font-bold mb-2">{{ __('freelance_bento_1_title') }}</h3>
                        <p class="text-slate-400 text-sm">{{ __('freelance_bento_1_desc') }}</p>
                    </div>
                </div>
                <div class="bg-indigo-50 rounded-[2rem] p-8 border border-indigo-100 shadow-sm hover:shadow-lg transition">
                    <div class="text-3xl mb-4 font-black">⏱️</div>
                    <h3 class="text-xl font-bold mb-2 text-indigo-950">{{ __('freelance_bento_2_title') }}</h3>
                    <p class="text-indigo-800/70 text-sm">{{ __('freelance_bento_2_desc') }}</p>
                </div>
                <div class="bg-emerald-50 rounded-[2rem] p-8 border border-emerald-100 shadow-sm hover:shadow-lg transition">
                    <div class="text-3xl mb-4 font-black">🧾</div>
                    <h3 class="text-xl font-bold mb-2 text-emerald-950">{{ __('freelance_bento_3_title') }}</h3>
                    <p class="text-emerald-800/70 text-sm">{{ __('freelance_bento_3_desc') }}</p>
                </div>
                <div class="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm hover:shadow-lg transition flex flex-col sm:flex-row items-center gap-6">
                    <div class="w-16 h-16 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center text-3xl shrink-0 font-black">🤝</div>
                    <div>
                        <h3 class="text-xl font-bold mb-2 text-gray-900">{{ __('freelance_bento_4_title') }}</h3>
                        <p class="text-gray-500 text-sm">{{ __('freelance_bento_4_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: CLIENT LIFECYCLE (UNIQUE A) --}}
    <section class="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="relative order-2 md:order-1">
                <div class="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-2xl">
                    <div class="space-y-6">
                        <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                            <span class="text-xs text-indigo-400 uppercase tracking-widest">Leads</span>
                            <span class="text-xl">12</span>
                        </div>
                        <div class="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 scale-105 shadow-xl shadow-indigo-500/10">
                            <span class="text-xs text-indigo-300 uppercase tracking-widest">Ongoing</span>
                            <span class="text-xl">4</span>
                        </div>
                        <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 opacity-50">
                            <span class="text-xs text-emerald-400 uppercase tracking-widest">Completed</span>
                            <span class="text-xl">148</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-1 md:order-2">
                <h2 class="text-4xl mb-6 leading-tight font-black">{{ __('freelance_extra_1_title') }}</h2>
                <p class="text-xl text-slate-400 leading-relaxed italic">
                    {{ __('freelance_extra_1_desc') }}
                </p>
            </div>
        </div>
    </section>

    {{-- SECTION: SUSTAINABLE INCOME (UNIQUE B) --}}
    <section class="py-32 bg-white relative">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-4xl text-gray-900 mb-8 font-black">{{ __('freelance_extra_2_title') }}</h2>
            <p class="text-xl text-gray-500 leading-relaxed mb-12">
                {{ __('freelance_extra_2_desc') }}
            </p>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div class="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div class="text-3xl mb-2 font-black">🏖️</div>
                    <div class="text-xs text-slate-400 uppercase">{{ __('freelance_extra_2_item_1') }}</div>
                </div>
                <div class="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div class="text-3xl mb-2 font-black">🛡️</div>
                    <div class="text-xs text-slate-400 uppercase">{{ __('freelance_extra_2_item_2') }}</div>
                </div>
                <div class="p-6 bg-indigo-600 rounded-3xl border border-indigo-500 text-white md:col-span-1 col-span-2">
                    <div class="text-3xl mb-2 font-black">💎</div>
                    <div class="text-xs text-indigo-100 uppercase">{{ __('freelance_extra_2_item_3') }}</div>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION: SCIENTIFIC PILLAR (E-E-A-T) - PORTFOLIO PIPELINE STYLE --}}
    <section class="py-32 bg-slate-900 relative overflow-hidden">
        {{-- Pipeline Background --}}
        <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] [background-size:100px_100px]"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden group">
                
                <div class="flex flex-col lg:flex-row gap-20 items-center">
                    <div class="flex-1">
                        <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500 text-white text-[10px] uppercase tracking-[0.2em] mb-10 shadow-lg">
                            🧬 {{ __('freelance_science_badge') }}
                        </div>

                        <h2 class="text-4xl md:text-6xl text-white mb-10 leading-tight font-black">
                            {{ __('freelance_science_title') }}
                        </h2>

                        <div class="relative py-10 px-10 bg-indigo-950/50 border-r-8 border-indigo-500 rounded-l-3xl mb-12">
                            <p class="text-indigo-100 text-xl md:text-2xl font-medium leading-relaxed italic">
                                "{{ __('freelance_science_desc') }}"
                            </p>
                        </div>

                        <div class="flex flex-wrap gap-4">
                            <div class="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-xl border border-white/5 hover:bg-white/10 transition">
                                <div class="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
                                <span class="text-sm font-bold text-slate-300">{{ __('freelance_science_topic_1') }}</span>
                            </div>
                            <div class="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-xl border border-white/5 hover:bg-white/10 transition">
                                <div class="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]"></div>
                                <span class="text-sm font-bold text-slate-300">{{ __('freelance_science_topic_2') }}</span>
                            </div>
                            <div class="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-xl border border-white/5 hover:bg-white/10 transition">
                                <div class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                                <span class="text-sm font-bold text-slate-300">{{ __('freelance_science_topic_3') }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex-shrink-0 relative hidden lg:block">
                        {{-- Pipeline Visualization --}}
                        <div class="w-72 h-96 relative">
                            {{-- Pipeline Tube --}}
                            <div class="absolute left-1/2 -translate-x-1/2 w-4 h-full bg-slate-700/50 rounded-full"></div>
                            {{-- Flowing Bubbles --}}
                            <div class="absolute left-1/2 -translate-x-1/2 top-4 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-xl shadow-lg animate-bounce">📦</div>
                            <div class="absolute left-1/2 -translate-x-1/2 top-1/3 w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-xl shadow-lg animate-bounce delay-1000">📁</div>
                            <div class="absolute left-1/2 -translate-x-1/2 bottom-1/4 w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-xl animate-bounce delay-500">💰</div>
                            
                            {{-- Connector Lines --}}
                            <div class="absolute top-10 right-0 w-12 h-px bg-slate-600"></div>
                            <div class="absolute top-1/3 left-0 w-12 h-px bg-slate-600"></div>
                            <div class="absolute bottom-1/4 right-0 w-12 h-px bg-slate-600"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 bg-gray-50 border-y border-gray-100">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-4xl text-center text-gray-900 mb-16 font-black">{{ __('freelance_faq_title') }}</h2>
            <div class="space-y-6">
                @foreach([1, 2, 3] as $i)
                <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __("freelance_faq_q$i") }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __("freelance_faq_a$i") }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SECTION 6: INVOICE-STYLE CTA --}}
    <section class="py-24 px-6 bg-gray-50 relative overflow-hidden">
        <div class="max-w-4xl mx-auto relative z-10">
            <div class="bg-slate-900 rounded-3xl md:rounded-[3rem] p-12 md:p-20 text-center relative shadow-2xl overflow-hidden border border-slate-700 border-t-8 border-t-indigo-500">
                <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-30"></div>
                
                <h2 class="text-4xl md:text-6xl mb-8 text-white tracking-tight font-black">{{ __('freelance_cta_title') }}</h2>
                <p class="text-slate-400 text-xl md:text-2xl mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
                    {{ __('freelance_cta_desc') }}
                </p>
                <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-12 py-5 rounded-2xl text-lg hover:bg-indigo-500 transition transform hover:scale-105 shadow-xl shadow-indigo-900/50">
                    {{ __('freelance_cta_btn') }}
                </a>
            </div>
        </div>
    </section>
        </div>
    </section>

@endsection



