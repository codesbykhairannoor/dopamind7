@extends('layouts.marketing')

@section('title', __('student_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('student_meta_desc') }} - {{ app()->getLocale() === 'id' ? __('schema_solution_student_description_id') : __('schema_solution_student_description_en') }}">
    <meta property="og:title" content="{{ __('student_meta_og_title') }}">
    <meta property="og:description" content="{{ __('student_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/student') }}">
    <link rel="canonical" href="{{ url('/solutions/student') }}" />
@endsection

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{ __('schema_student_name') }}",
  "description": "{{ __('schema_student_description') }}",
  "audience": {
    "@type": "Audience",
    "audienceType": "{{ __('schema_solution_student_audience') }}"
  }
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
    "name": "{{ app()->getLocale() === 'id' ? 'Pelajar' : 'Student' }}",
    "item": "{{ url('/solutions/student') }}"
  }]
}]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (ASYMMETRIC BENTO MOSAIC) --}}
   {{-- SECTION 1: HERO (CLEAN UNIFIED DASHBOARD) --}}
   <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 relative border-b border-gray-100">
    {{-- Grid Background --}}
    <div class=" mt-20 absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] [background-size:40px_40px] -z-10"></div>
    
    <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {{-- Left: Massive Typography --}}
        <div class="lg:col-span-7 animate-in fade-in slide-in-from-left-12 duration-700 fill-mode-both relative z-20">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950 text-indigo-100 font-bold text-xs mb-8 uppercase tracking-wider shadow-lg">
                🎓 {{ __('student_hero_badge') }}
            </div>
            
            <h1 class="text-5xl md:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] text-gray-900 tracking-tight">
                {{ __('student_hero_title_1') }}
                <span class="block py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {{ __('student_hero_title_2') }}
                </span>
            </h1>
            
            <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-2xl">
                {{ __('student_hero_desc') }}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 text-center">
                    {{ __('student_hero_cta_1') }}
                </a>
            </div>
        
              <div class="mt-8 flex items-center gap-4 text-sm font-bold text-gray-400">
                    <div class="flex -space-x-2">
                        <span class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border-2 border-white text-xs">SS</span>
                        <span class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 border-2 border-white text-xs">DF</span>
                        <span class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border-2 border-white text-xs">KN</span>
                    </div>
                    <p>{{ __('student_hero_social_proof') }}</p>
                </div>
        </div>

        {{-- Right: Clean Unified Dashboard App Window (Tinggi Terkunci) --}}
        <div class="lg:col-span-5 mt-0 relative z-10 w-full animate-in fade-in slide-in-from-right-12 duration-1000 fill-mode-both">
            
            {{-- Background Glow --}}
            <div class="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-400 to-rose-400 rounded-[2.5rem] blur opacity-20 animate-pulse duration-[4000ms]"></div>
            
            {{-- Main App Window (Locked Height: 500px) --}}
            <div class="relative bg-white rounded-[2.5rem] shadow-2xl border border-white flex flex-col h-[500px] overflow-hidden transform transition hover:scale-[1.01] duration-500">
                
                {{-- Window Header (macOS style - Fixed) --}}
                <div class="bg-gray-50/90 backdrop-blur px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                    <div class="flex gap-2">
                        <div class="w-3 h-3 rounded-full bg-rose-400"></div>
                        <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                    <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Student OS
                    </div>
                    <div class="w-10"></div>
                </div>

                {{-- Dashboard Grid Layout (Scrollable Area) --}}
                <div class="p-6 md:p-8 bg-gray-50/30 flex flex-col gap-6">
                    
                    {{-- Row 1: Budget & Urgent Task --}}
                    <div class="grid grid-cols-1 gap-4">
                        
                        {{-- Budget Widget --}}
                        <div class="bg-indigo-950 rounded-[1.5rem] p-5 shadow-md border border-indigo-900 transition duration-300">
                            <div class="flex justify-between items-center mb-3">
                                <p class="text-indigo-300 text-[10px] font-bold uppercase tracking-wider">Sisa Saldo</p>
                                <span class="bg-indigo-900 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md">Aman</span>
                            </div>
                            <h3 class="font-black text-2xl text-white">Rp 150.000</h3>
                        </div>

                        {{-- Task Widget --}}
                        <div class="bg-white rounded-[1.5rem] p-5 shadow-sm border border-rose-100 flex flex-col justify-between">
                            <div class="flex justify-between items-start mb-3">
                                <span class="bg-rose-100 text-rose-700 text-[10px] font-black uppercase px-3 py-1 rounded-full">Tugas Akhir</span>
                                <span class="text-rose-500 text-sm animate-pulse">⚠️</span>
                            </div>
                            <div>
                                <h4 class="font-black text-gray-900 text-sm mb-1">Web Dicoding x DBS</h4>
                                <div class="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                                    <div class="bg-indigo-600 h-1.5 rounded-full w-[85%]"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {{-- Bottom Row: Schedule --}}
                    <div class="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100">
                        <div class="flex justify-between items-center mb-4 pb-2 border-b border-gray-50">
                            <h4 class="font-black text-gray-900 text-xs">Agenda Hari Ini</h4>
                        </div>
                        
                        <div class="space-y-3">
                            <div class="flex gap-3 items-center">
                                <p class="text-[10px] font-bold text-gray-400 w-8">10:00</p>
                                <div class="flex-1 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-2">
                                    <p class="text-xs font-bold text-indigo-900">Studi Independen</p>
                                </div>
                            </div>
                            
                            <div class="flex gap-3 items-center">
                                <p class="text-[10px] font-bold text-gray-400 w-8">14:00</p>
                                <div class="flex-1 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-2">
                                    <p class="text-xs font-bold text-amber-900">Rapat Proposal</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> {{-- End Scrollable Area --}}
            </div> {{-- End Window --}}
        </div> {{-- End Col 5 --}}
    </div>
</header>


    {{-- SECTION 2: THE "STUDENT STRUGGLE" AWARENESS --}}
    <section class="py-24 bg-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('student_prob_title') }}</h2>
                <p class="text-xl text-gray-500">{{ __('student_prob_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
                <div class="bg-rose-50 p-8 rounded-[2rem] border border-rose-100 hover:-translate-y-2 transition duration-300">
                    <div class="text-4xl mb-4">😵‍💫</div>
                    <h3 class="text-xl font-bold mb-3 text-rose-950">{{ __('student_prob_1_title') }}</h3>
                    <p class="text-rose-900/70">{{ __('student_prob_1_desc') }}</p>
                </div>
                <div class="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 hover:-translate-y-2 transition duration-300 delay-100">
                    <div class="text-4xl mb-4">💸</div>
                    <h3 class="text-xl font-bold mb-3 text-amber-950">{{ __('student_prob_2_title') }}</h3>
                    <p class="text-amber-900/70">{{ __('student_prob_2_desc') }}</p>
                </div>
                <div class="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100 hover:-translate-y-2 transition duration-300 delay-200">
                    <div class="text-4xl mb-4">🥱</div>
                    <h3 class="text-xl font-bold mb-3 text-indigo-950">{{ __('student_prob_3_title') }}</h3>
                    <p class="text-indigo-900/70">{{ __('student_prob_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: SCIENTIFIC PILLAR (E-E-A-T) --}}
    <section class="py-24 bg-indigo-50/50 border-y border-indigo-100/30">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                🧬 {{ __('student_science_badge') }}
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-6">{{ __('student_science_title') }}</h2>
            <p class="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto italic">
                {{ __('student_science_desc') }}
            </p>
            <div class="mt-10 flex flex-wrap justify-center gap-8 opacity-50 grayscale">
                <span class="text-sm font-black uppercase tracking-tighter">Spaced Repetition</span>
                <span class="text-sm font-black uppercase tracking-tighter">Active Recall</span>
                <span class="text-sm font-black uppercase tracking-tighter">Time Blocking</span>
            </div>
        </div>
    </section>

    {{-- SECTION 3: SOLUTION HIGHLIGHT 1 (ACADEMIC & PROJECTS) --}}
    <section class="py-24 bg-gray-50 border-y border-gray-100">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div class="order-2 lg:order-1 relative h-[400px] bg-slate-900 rounded-[3rem] p-8 flex items-center justify-center overflow-hidden border border-slate-800 shadow-2xl">
                <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                <div class="text-center relative z-10">
                    <div class="flex justify-center gap-4 mb-8">
                        <div class="w-20 h-24 bg-indigo-500 rounded-xl transform -rotate-6 shadow-lg border border-indigo-400"></div>
                        <div class="w-20 h-24 bg-rose-500 rounded-xl transform scale-110 shadow-lg border border-rose-400 -mt-4"></div>
                        <div class="w-20 h-24 bg-emerald-500 rounded-xl transform rotate-6 shadow-lg border border-emerald-400"></div>
                    </div>
                    <div class="inline-block bg-white/10 backdrop-blur border border-white/20 text-white font-bold px-6 py-3 rounded-full">
                        {{ __('student_feat_1_visual_badge') }}
                    </div>
                </div>
            </div>
            
            <div class="order-1 lg:order-2">
                <div class="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl text-2xl mb-6">🎯</div>
                <h2 class="text-3xl md:text-4xl font-black mb-6 text-gray-900">{{ __('student_feat_1_title') }}</h2>
                <p class="text-gray-500 text-lg leading-relaxed mb-8">
                    {{ __('student_feat_1_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-gray-700">
                    <li class="flex items-start gap-4"><span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm shrink-0 mt-0.5">✓</span> {{ __('student_feat_1_point_1') }}</li>
                    <li class="flex items-start gap-4"><span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm shrink-0 mt-0.5">✓</span> {{ __('student_feat_1_point_2') }}</li>
                </ul>
            </div>
        </div>
    </section>

    {{-- SECTION 4: SOLUTION HIGHLIGHT 2 (FINANCE SURVIVAL) --}}
    <section class="py-24 bg-white">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <div class="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl text-2xl mb-6">🍜</div>
                <h2 class="text-3xl md:text-4xl font-black mb-6 text-gray-900">{{ __('student_feat_2_title') }}</h2>
                <p class="text-gray-500 text-lg leading-relaxed mb-8">
                    {{ __('student_feat_2_desc') }}
                </p>
                <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                    <div class="flex justify-between items-center font-bold">
                        <span class="text-gray-700">{{ __('student_feat_2_point_1') }}</span>
                        <span class="text-emerald-500">Auto-Track</span>
                    </div>
                    <div class="w-full h-px bg-gray-200"></div>
                    <div class="flex justify-between items-center font-bold">
                        <span class="text-gray-700">{{ __('student_feat_2_point_2') }}</span>
                        <span class="text-emerald-500">Goal Savings</span>
                    </div>
                </div>
            </div>
            
            <div class="relative h-[400px] bg-emerald-50 rounded-[3rem] p-8 flex items-center justify-center overflow-hidden border border-emerald-100">
                <div class="text-9xl transform hover:scale-110 transition duration-500">💸</div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: STUDENT SURVIVAL KIT (BENTO BOX) --}}
    <section class="py-24 bg-gray-50 border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">{{ __('student_bento_title') }}</h2>
                <p class="text-gray-500 text-lg">{{ __('student_bento_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
                <div class="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm hover:shadow-lg transition">
                    <div class="text-3xl mb-4">📓</div>
                    <h3 class="text-xl font-bold mb-2">{{ __('student_bento_1_title') }}</h3>
                    <p class="text-gray-500 text-sm">{{ __('student_bento_1_desc') }}</p>
                </div>
                <div class="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm hover:shadow-lg transition">
                    <div class="text-3xl mb-4">🌙</div>
                    <h3 class="text-xl font-bold mb-2">{{ __('student_bento_2_title') }}</h3>
                    <p class="text-gray-500 text-sm">{{ __('student_bento_2_desc') }}</p>
                </div>
                <div class="bg-indigo-900 text-white rounded-[2rem] p-8 shadow-xl hover:-translate-y-1 transition relative overflow-hidden">
                    <div class="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500 rounded-full blur-2xl opacity-50"></div>
                    <div class="text-3xl mb-4 relative z-10">🚀</div>
                    <h3 class="text-xl font-bold mb-2 relative z-10">{{ __('student_bento_3_title') }}</h3>
                    <p class="text-indigo-200 text-sm relative z-10">{{ __('student_bento_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: STUDY WORKFLOW (UNIQUE A) --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl relative">
                <div class="absolute top-0 right-0 p-8 opacity-10 text-8xl">📝</div>
                <div class="space-y-6 relative z-10">
                    <div class="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                        <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold">1</div>
                        <div class="text-white font-bold">Capture Lecture</div>
                    </div>
                    <div class="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 ml-8">
                        <div class="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center font-bold">2</div>
                        <div class="text-white font-bold">Review & Interleave</div>
                    </div>
                    <div class="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 ml-16 text-emerald-400">
                        <div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-white">3</div>
                        <div class="font-bold">Master Topic</div>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-4xl font-black text-gray-900 mb-6">{{ __('student_extra_1_title') }}</h2>
                <p class="text-xl text-gray-500 leading-relaxed">
                    {{ __('student_extra_1_desc') }}
                </p>
            </div>
        </div>
    </section>

    {{-- SECTION: GRADES VS SLEEP (UNIQUE B) --}}
    <section class="py-32 bg-indigo-50 border-y border-indigo-100">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-4xl font-black text-indigo-950 mb-8">{{ __('student_extra_2_title') }}</h2>
            <p class="text-xl text-indigo-800/70 leading-relaxed mb-12">
                {{ __('student_extra_2_desc') }}
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white p-6 rounded-3xl shadow-sm">
                    <div class="text-2xl mb-2">😴</div>
                    <div class="text-xs font-black text-indigo-400 uppercase">Sleep</div>
                </div>
                <div class="bg-white p-6 rounded-3xl shadow-sm">
                    <div class="text-2xl mb-2">📚</div>
                    <div class="text-xs font-black text-indigo-400 uppercase">Grades</div>
                </div>
                <div class="bg-white p-6 rounded-3xl shadow-sm">
                    <div class="text-2xl mb-2">🍔</div>
                    <div class="text-xs font-black text-indigo-400 uppercase">Health</div>
                </div>
                <div class="bg-white p-6 rounded-3xl shadow-sm border-2 border-indigo-500">
                    <div class="text-2xl mb-2">💎</div>
                    <div class="text-xs font-black text-indigo-600 uppercase">Balance</div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: VISUAL FAQ --}}
    <section class="py-32 bg-white">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-4xl font-black text-center text-gray-900 mb-16">{{ __('student_faq_title') }}</h2>
            <div class="space-y-6">
                @foreach([1, 2, 3] as $i)
                <div class="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __("student_faq_q$i") }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __("student_faq_a$i") }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SECTION 6: STUDENT CTA --}}
    <section class="py-24 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-indigo-600 -z-20"></div>
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500 rounded-full mix-blend-screen filter blur-[150px] opacity-40 -z-10 animate-pulse duration-[6000ms]"></div>

        <div class="max-w-4xl mx-auto text-center relative z-10">
            <h2 class="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight">{{ __('student_cta_title') }}</h2>
            <p class="text-indigo-100 text-xl md:text-2xl mb-12 font-medium leading-relaxed">
                {{ __('student_cta_desc') }}
            </p>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-white text-indigo-900 px-12 py-5 rounded-2xl font-black text-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-2xl">
                {{ __('student_cta_btn') }}
            </a>
            <p class="mt-8 text-sm text-indigo-200 font-bold uppercase tracking-widest">{{ __('student_cta_note') }}</p>
        </div>
    </section>

    {{-- SECTION: INTERNAL LINKING (UNIFIED ECOSYSTEM) --}}
    <section class="py-24 bg-white border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-3xl font-black text-gray-900 mb-12 text-center">{{ __('unified_ecosystem_title', ['feature' => __('student_hero_badge')]) }}</h2>
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
