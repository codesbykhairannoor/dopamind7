@extends('layouts.marketing')

@section('title', __('growth_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('growth_meta_desc') }}">
    <meta property="og:title" content="{{ __('growth_meta_og_title') }}">
    <meta property="og:description" content="{{ __('growth_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/personal-growth') }}">
@endsection

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{ __('schema_solution_growth_name') }}",
  "description": "{{ __('schema_solution_growth_description') }}"
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
    "name": "{{ __('growth_breadcrumb') }}",
    "item": "{{ url('/solutions/personal-growth') }}"
  }]
}]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (7:5 LAYOUT - VISION BOARD VIBE) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-slate-50 relative border-b border-gray-100">
        {{-- Soft Abstract Shapes --}}
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-indigo-200/40 to-purple-200/40 rounded-full blur-[120px] -z-10 animate-pulse duration-&lsqb;8000ms&rsqb;"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {{-- Left: 7 Columns - Typography --}}
            <div class="lg:col-span-7 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both relative z-20">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950 text-indigo-100 font-bold text-xs mb-8 uppercase tracking-wider shadow-lg">
                    🌱 {{ __('growth_hero_badge') }}
                </div>
                
                <h1 class="text-6xl md:text-7xl mb-8 leading-[1.2] text-gray-900 tracking-tight font-black">
    {{ __('growth_hero_title_1') }} 
    {{-- Tambahkan py-2 atau py-4 agar gradasi tidak kepotong --}}
    <span class="block py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
        {{ __('growth_hero_title_2') }}
    </span>
</h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-2xl">
                    {{ __('growth_hero_desc') }}
                </p>
                
               <div class="flex flex-col sm:flex-row gap-4">
                <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 text-center">
                    {{ __('growth_hero_cta_1') }}
                </a>
            </div>
                
                
                <div class="mt-8 flex items-center gap-4 text-sm font-bold text-gray-400">
                    <div class="flex -space-x-2">
                        <span class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border-2 border-white text-xs">SS</span>
                        <span class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 border-2 border-white text-xs">DF</span>
                        <span class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border-2 border-white text-xs">KN</span>
                    </div>
                    <p>{{ __('growth_hero_social_proof') }}</p>
                </div>
            </div>

            {{-- Right: 5 Columns - Glow Up Dashboard --}}
            <div class="lg:col-span-5 relative w-full h-[500px] animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 fill-mode-both">
                
                <div class="absolute inset-0 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>

                {{-- Central Widget: Circular Goal Tracker --}}
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-white flex flex-col items-center justify-center z-20 hover:scale-105 transition duration-500">
                    {{-- SVG Circular Progress --}}
                    <svg class="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" stroke="#eef2ff" stroke-width="8" fill="none" />
                        <circle cx="50" cy="50" r="46" stroke="#4f46e5" stroke-width="8" fill="none" stroke-dasharray="289" stroke-dashoffset="72" class="animate-[dash_2s_ease-out_forwards]" />
                    </svg>
                    <span class="text-4xl mb-1 font-black">📖</span>
                    <h3 class="font-black text-2xl text-gray-900">75%</h3>
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{{ __('growth_mockup_goal_label') }}</p>
                </div>

                {{-- Floating Habit Orb 1 --}}
                <div class="absolute top-10 right-0 bg-white p-4 rounded-3xl shadow-xl border border-indigo-50 flex items-center gap-4 z-30 animate-bounce duration-&lsqb;4000ms&rsqb;">
                    <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg shadow-inner">✓</div>
                    <div>
                        <p class="font-bold text-gray-900 text-sm">{{ __('growth_mockup_habit_title') }}</p>
                        <p class="text-[10px] text-gray-500 font-medium">{{ __('growth_mockup_habit_desc') }}</p>
                    </div>
                </div>

                {{-- Floating Journal Orb 2 --}}
                <div class="absolute bottom-10 left-0 bg-slate-900 text-white p-4 rounded-3xl shadow-xl border border-slate-700 flex flex-col gap-2 z-30 transform -rotate-6 hover:rotate-0 transition duration-300">
                    <div class="flex items-center gap-2">
                        <span class="text-lg">🧠</span>
                        <p class="font-bold text-sm">{{ __('growth_mockup_reflection_title') }}</p>
                    </div>
                    <p class="text-xs text-slate-400 font-serif italic max-w-[150px]">"{{ __('growth_mockup_reflection_desc') }}"</p>
                </div>

            </div>
        </div>
    </header>


    {{-- SECTION 3: SURPRISE LAYOUT - STACKED CARD DECK --}}
    <section id="how-it-works" class="py-32 bg-white overflow-hidden border-b border-gray-100">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            
            <div class="order-2 lg:order-1 relative h-[500px] flex items-center justify-center group perspective-1000">
                {{-- Card 3 (Bottom) --}}
                <div class="absolute w-72 h-80 bg-purple-100 rounded-3xl transform translate-y-12 scale-90 opacity-60 group-hover:translate-x-12 group-hover:rotate-6 transition duration-500 border border-purple-200"></div>
                {{-- Card 2 (Middle) --}}
                <div class="absolute w-72 h-80 bg-indigo-100 rounded-3xl transform translate-y-6 scale-95 opacity-80 group-hover:-translate-x-12 group-hover:-rotate-6 transition duration-500 border border-indigo-200"></div>
                {{-- Card 1 (Top) --}}
                <div class="absolute w-72 h-80 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 flex flex-col items-center justify-center text-center transform group-hover:-translate-y-4 transition duration-500 z-10">
                    <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-inner font-black">🏆</div>
                    <h4 class="font-black text-xl text-gray-900 mb-2">{{ __('growth_mockup_streak_title') }}</h4>
                    <p class="text-sm text-gray-500 mb-6">{{ __('growth_mockup_streak_desc') }}</p>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                        <div class="bg-indigo-600 h-2 rounded-full w-full"></div>
                    </div>
                </div>
            </div>

            <div class="order-1 lg:order-2">
                <div class="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl text-2xl mb-6 shadow-sm border border-indigo-100">🔥</div>
                <h2 class="text-5xl md:text-6xl mb-6 text-gray-900 font-black">{{ __('growth_feat_1_title') }}</h2>
                <p class="text-gray-500 text-lg leading-relaxed mb-8">
                    {{ __('growth_feat_1_desc') }}
                </p>
                <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                    <p class="font-bold text-gray-700 flex items-center gap-3">
                        <span class="text-xl">📈</span> {{ __('growth_feat_1_point_1') }}
                    </p>
                    <div class="w-full h-px bg-gray-200"></div>
                    <p class="font-bold text-gray-700 flex items-center gap-3">
                        <span class="text-xl">🎖️</span> {{ __('growth_feat_1_point_2') }}
                    </p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: SURPRISE LAYOUT - IMMERSIVE GLASSMORPHISM --}}
    <section class="py-32 relative bg-indigo-950 flex items-center justify-center overflow-hidden min-h-[800px]">
        {{-- Giant Glowing Orbs Background --}}
        <div class="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-pulse duration-&lsqb;6000ms&rsqb;"></div>
        <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-pulse duration-&lsqb;7000ms&rsqb; delay-1000"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

        <div class="relative z-10 max-w-5xl w-full px-6 text-center">
            <h2 class="text-5xl md:text-7xl mb-8 text-white tracking-tight font-black">{{ __('growth_feat_2_title') }}</h2>
            <p class="text-indigo-200 text-xl leading-relaxed mb-16 max-w-2xl mx-auto">
                {{ __('growth_feat_2_desc') }}
            </p>

            {{-- Massive Glassmorphism Diary Card --}}
            <div class="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-8 md:p-16 text-left shadow-2xl relative overflow-hidden group transform hover:scale-[1.01] transition duration-500">
                <div class="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-400 to-purple-400"></div>
                <div class="flex justify-between items-start mb-8">
                    <div class="text-5xl font-black">🖋️</div>
                    <div class="bg-white/20 px-4 py-2 rounded-full text-indigo-100 font-bold text-sm tracking-widest uppercase backdrop-blur-sm">Zen Entry</div>
                </div>
                <h3 class="font-serif text-3xl md:text-4xl text-white mb-6 font-black">"{{ __('growth_feat_2_quote_title') }}"</h3>
                <p class="font-serif text-indigo-100/80 text-lg md:text-xl leading-relaxed italic mb-8">
                    {{ __('growth_feat_2_quote_body') }}
                </p>
                <div class="flex gap-4">
                    <span class="bg-black/30 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md">Deep Work</span>
                    <span class="bg-black/30 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md">Clarity</span>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: HABIT CASCADE (UNIQUE A) --}}
    <section class="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="relative order-2 md:order-1">
                <div class="bg-indigo-900 border border-white/5 rounded-[3rem] p-10 shadow-2xl">
                    <div class="space-y-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">🌱</div>
                            <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div class="w-1/3 h-full bg-indigo-400"></div>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 opacity-60">
                            <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">🌿</div>
                            <div class="flex-1 h-2 bg-white/10 rounded-full"></div>
                        </div>
                        <div class="flex items-center gap-4 opacity-30">
                            <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">🌳</div>
                            <div class="flex-1 h-2 bg-white/10 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-1 md:order-2">
                <h2 class="text-5xl md:text-6xl mb-6 font-black">{{ __('growth_extra_1_title') }}</h2>
                <p class="text-xl text-indigo-200 leading-relaxed italic">
                    {{ __('growth_extra_1_desc') }}
                </p>
            </div>
        </div>
    </section>

    {{-- SECTION: GROWTH TRAJECTORY (UNIQUE B) --}}
    <section class="py-32 bg-white relative">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-5xl md:text-6xl text-gray-900 mb-8 font-black">{{ __('growth_extra_2_title') }}</h2>
            <p class="text-xl text-gray-500 leading-relaxed mb-12">
                {{ __('growth_extra_2_desc') }}
            </p>
            <div class="inline-flex items-center gap-4 p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
                <div class="text-5xl text-indigo-600 font-black">37.8x</div>
                <div class="text-left">
                    <p class="text-[10px] uppercase text-indigo-400">{{ __('growth_extra_2_stat_label') }}</p>
                    <p class="text-xs text-gray-500">{{ __('growth_extra_2_stat_sub') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION: SCIENTIFIC PILLAR (E-E-A-T) - LIFE WHEEL BALANCE STYLE --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        {{-- Circular Aura --}}
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-3xl -z-10"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="grid lg:grid-cols-2 gap-20 items-center">
                <div class="relative hidden lg:block">
                    {{-- Interactive Wheel Visual --}}
                    <div class="relative w-[500px] h-[500px] group">
                        {{-- Outer Ring --}}
                        <div class="absolute inset-0 border-4 border-dashed border-indigo-100 rounded-full animate-spin-slow"></div>
                        {{-- Inner Wheel --}}
                        <div class="absolute inset-10 bg-white rounded-full shadow-2xl border border-indigo-50 flex items-center justify-center relative z-10">
                            <div class="grid grid-cols-2 grid-rows-2 w-full h-full p-4 gap-4 transform group-hover:rotate-45 transition duration-1000">
                                <div class="bg-indigo-50 rounded-tl-[100px] flex items-center justify-center text-4xl font-black">🌱</div>
                                <div class="bg-purple-50 rounded-tr-[100px] flex items-center justify-center text-4xl font-black">🧘</div>
                                <div class="bg-emerald-50 rounded-bl-[100px] flex items-center justify-center text-4xl font-black">💪</div>
                                <div class="bg-amber-50 rounded-br-[100px] flex items-center justify-center text-4xl font-black">📚</div>
                            </div>
                            {{-- Center Core --}}
                            <div class="absolute w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl shadow-xl z-20 border-4 border-white font-black">✨</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] uppercase tracking-widest mb-10 rounded-full">
                        🧬 {{ __('growth_science_badge') }}
                    </div>

                    <h2 class="text-5xl md:text-7xl text-gray-900 mb-10 leading-tight font-black">
                        {{ __('growth_science_title') }}
                    </h2>

                    <div class="relative py-12 px-10 bg-indigo-50/50 rounded-[3rem] mb-12 border-l-8 border-indigo-600">
                        <p class="text-gray-800 text-xl md:text-2xl font-serif italic leading-relaxed">
                            "{{ __('growth_science_desc') }}"
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div class="text-center">
                            <span class="block text-2xl mb-2">🛡️</span>
                            <h4 class="font-black text-[10px] uppercase text-indigo-400 tracking-widest">{{ __('growth_science_point_1') }}</h4>
                        </div>
                        <div class="text-center">
                            <span class="block text-2xl mb-2">👤</span>
                            <h4 class="font-black text-[10px] uppercase text-purple-400 tracking-widest">{{ __('growth_science_point_2') }}</h4>
                        </div>
                        <div class="text-center">
                            <span class="block text-2xl mb-2">📈</span>
                            <h4 class="font-black text-[10px] uppercase text-emerald-400 tracking-widest">{{ __('growth_science_point_3') }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 bg-gray-50 border-y border-gray-100">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-5xl md:text-6xl text-center text-gray-900 mb-16 font-black">{{ __('growth_faq_title') }}</h2>
            <div class="space-y-6">
                @foreach([1, 2, 3] as $i)
                <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __("growth_faq_q$i") }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __("growth_faq_a$i") }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SECTION 6: SURPRISE LAYOUT - SUNRISE CTA --}}
    <section class="pt-32 pb-40 px-6 bg-white relative overflow-hidden">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-t from-indigo-100 via-purple-50 to-white rounded-t-full -z-10"></div>
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-indigo-200 to-transparent rounded-t-full blur-2xl -z-10"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10 px-6">
            <h2 class="text-6xl md:text-7xl mb-8 text-indigo-950 tracking-tight leading-tight font-black">{{ __('growth_cta_title') }}</h2>
            <p class="text-indigo-900/60 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
                {{ __('growth_cta_desc') }}
            </p>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full text-xl hover:bg-indigo-700 transition transform hover:-translate-y-2 shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.5)]">
                {{ __('growth_cta_btn') }}
            </a>
        </div>
    </section>
@endsection



