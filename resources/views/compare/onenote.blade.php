@extends('layouts.marketing')

@section('title', __('onenote_badge'))

@section('json-ld')
@if(isset($seo_schema))
    <script type="application/ld+json">
        {!! $seo_schema !!}
    </script>
@else
<script type="application/ld+json">
[{
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
    "name": "Compare",
    "item": "{{ url('/compare/notes-apps') }}"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "OneNote Alternative",
    "item": "{{ url('/compare/onenote-alternative') }}"
  }]
},{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "{{ __('faq_onenote_q1') }}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "{{ __('faq_onenote_a1') }}"
    }
  }]
}]
</script>
@endif
@endsection

@section('content')
    {{-- SECTION 1: HERO (Text Right, Visual Left) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-slate-950 relative border-b border-purple-900/50">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f46e511_1px,transparent_1px),linear-gradient(to_bottom,#4f46e511_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div class="order-2 lg:order-1 relative h-[400px] flex items-center justify-center animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                <div class="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl opacity-50"></div>
                <div class="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 w-80 transform -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-[0_20px_50px_rgba(168,85,247,0.15)]">
                    <div class="text-center mb-6 border-b border-slate-800 pb-4">
                        <div class="text-purple-400 uppercase tracking-widest text-xs font-black">{{ __('onenote_hero_visual_1') }}</div>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-slate-800 p-3 rounded-xl border border-slate-700 flex justify-between">
                            <span class="text-slate-400 text-sm">{{ __('onenote_hero_visual_2') }}</span>
                            <span class="text-emerald-400 font-bold text-sm">{{ __('onenote_hero_visual_3') }}</span>
                        </div>
                        <div class="bg-slate-800 p-3 rounded-xl border border-slate-700 flex justify-between">
                            <span class="text-slate-400 text-sm">{{ __('onenote_hero_visual_4') }}</span>
                            <span class="text-indigo-400 font-bold text-sm">{{ __('onenote_hero_visual_5') }}</span>
                        </div>
                        <div class="bg-slate-800 p-3 rounded-xl border border-slate-700 flex justify-between">
                            <span class="text-slate-400 text-sm">{{ __('onenote_hero_visual_6') }}</span>
                            <span class="text-amber-400 font-bold text-sm">{{ __('onenote_hero_visual_7') }}</span>
                        </div>
                    </div>
                    <div class="absolute -right-6 -bottom-6 w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl rotate-12">
                        ✨
                    </div>
                </div>
            </div>

            <div class="order-1 lg:order-2 text-left animate-in fade-in slide-in-from-right-8 duration-1000">
                <div class="mb-4">
                    <span class="text-purple-400 font-bold text-sm tracking-widest uppercase opacity-70">{{ __('seo_eyebrow_onenote') }}</span>
                </div>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/50 text-purple-300 font-bold text-xs mb-8 uppercase tracking-wider border border-purple-500/30">
                    <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                    {{ __('onenote_badge') }}
                </div>
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                    {{ __('onenote_hero_title_1') }} <br/>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{{ __('onenote_hero_title_2') }}</span>
                </h1>
                <p class="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                    {!! __('onenote_hero_desc') !!}
                </p>
                <div class="flex flex-col sm:flex-row items-start gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="w-full sm:w-auto bg-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-purple-500 transition-all shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)]">
                        {{ __('onenote_hero_cta') }}
                    </a>
                </div>
                <p class="mt-4 text-xs text-slate-500 font-medium self-center sm:self-auto">{{ __('onenote_hero_note') }}</p>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-24 bg-slate-50">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="relative h-[400px] flex items-center justify-center bg-white rounded-[3rem] shadow-xl border border-slate-200 overflow-hidden">
                <div class="absolute inset-0 p-8">
                    {{-- Chaotic Canvas Representation --}}
                    <div class="absolute top-10 left-10 w-48 h-32 border border-slate-300 bg-white shadow-sm rounded-md p-2 rotate-2">
                        <div class="w-full h-2 bg-slate-200 rounded mb-2"></div>
                        <div class="w-3/4 h-2 bg-slate-200 rounded"></div>
                    </div>
                    <div class="absolute top-20 right-12 w-40 h-24 border border-slate-300 bg-white shadow-sm rounded-md p-2 -rotate-6">
                        <div class="flex gap-2 mb-2">
                            <div class="w-4 h-4 border border-slate-300"></div>
                            <div class="w-full h-2 bg-slate-200 rounded mt-1"></div>
                        </div>
                        <div class="flex gap-2">
                            <div class="w-4 h-4 border border-slate-300"></div>
                            <div class="w-2/3 h-2 bg-slate-200 rounded mt-1"></div>
                        </div>
                    </div>
                    <div class="absolute bottom-16 left-20 w-64 h-40 border border-slate-300 bg-white shadow-sm rounded-md p-2 -rotate-2">
                        <table class="w-full text-left text-[8px]">
                            <tr class="border-b border-slate-200"><th class="pb-1 text-slate-300">{{ __('onenote_prob_visual_1') }}</th><th class="pb-1 text-slate-300">{{ __('onenote_prob_visual_2') }}</th></tr>
                            <tr><td class="py-1 text-slate-200">{{ __('onenote_prob_visual_3') }}</td><td class="py-1 text-slate-200">$50</td></tr>
                            <tr><td class="py-1 text-slate-200">{{ __('onenote_prob_visual_4') }}</td><td class="py-1 text-slate-200">$30</td></tr>
                        </table>
                    </div>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full animate-ping opacity-50"></div>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">{{ __('onenote_prob_visual_5') }}</div>
                </div>
            </div>
            
            <div>
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                    {{ __('onenote_prob_title_1') }} <span class="text-purple-600">{{ __('onenote_prob_title_highlight') }}</span>
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('onenote_prob_desc') }}
                </p>
                <div class="space-y-4">
                    <div class="bg-white p-4 rounded-xl border border-slate-100 flex items-start gap-4">
                        <div class="text-xl">😵‍💫</div>
                        <div>
                            <h4 class="font-bold text-slate-900 text-sm">{{ __('onenote_prob_point_1_title') }}</h4>
                            <p class="text-xs text-slate-500">{{ __('onenote_prob_point_1_desc') }}</p>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-slate-100 flex items-start gap-4">
                        <div class="text-xl">🔍</div>
                        <div>
                            <h4 class="font-bold text-slate-900 text-sm">{{ __('onenote_prob_point_2_title') }}</h4>
                            <p class="text-xs text-slate-500">{{ __('onenote_prob_point_2_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION --}}
    <section class="py-24 bg-white border-t border-slate-100">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1">
                <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                    {{ __('onenote_sol_title_1') }} <span class="text-indigo-600">{{ __('onenote_sol_title_highlight') }}</span>
                </h2>
                <p class="text-slate-500 text-xl leading-relaxed mb-8">
                    {{ __('onenote_sol_desc') }}
                </p>
                <div class="space-y-4">
                    <div class="flex items-center gap-3 text-slate-700 font-medium">
                        <div class="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs">✓</div> 
                        {{ __('onenote_sol_point_1') }}
                    </div>
                    <div class="flex items-center gap-3 text-slate-700 font-medium">
                        <div class="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs">✓</div> 
                        {{ __('onenote_sol_point_2') }}
                    </div>
                    <div class="flex items-center gap-3 text-slate-700 font-medium">
                        <div class="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs">✓</div> 
                        {{ __('onenote_sol_point_3') }}
                    </div>
                </div>
            </div>
            
            <div class="order-1 md:order-2 relative h-[400px] flex items-center justify-center bg-slate-950 rounded-[3rem] shadow-2xl p-8 overflow-hidden">
                <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(79,70,229,0.15)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                <div class="w-full space-y-4 relative z-10">
                    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex justify-between items-center transform -translate-x-4">
                        <div class="flex gap-3 items-center">
                            <div class="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">📈</div>
                            <div>
                                <div class="text-white font-bold text-sm">{{ __('onenote_sol_visual_1') }}</div>
                                <div class="text-slate-400 text-xs">{{ __('onenote_sol_visual_2') }}</div>
                            </div>
                        </div>
                        <div class="text-emerald-400 font-black">+12%</div>
                    </div>
                    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex justify-between items-center transform translate-x-4">
                        <div class="flex gap-3 items-center">
                            <div class="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">🎯</div>
                            <div>
                                <div class="text-white font-bold text-sm">{{ __('onenote_sol_visual_3') }}</div>
                                <div class="text-slate-400 text-xs">{{ __('onenote_sol_visual_4') }}</div>
                            </div>
                        </div>
                        <div class="text-purple-400 font-black text-xl">✓</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE COST OF CHAOS --}}
    <section class="py-24 bg-slate-50 border-t border-slate-100">
        <div class="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl transform -rotate-2">
                <div class="border-b border-slate-100 pb-4 mb-4">
                    <div class="w-1/2 h-4 bg-slate-200 rounded mb-2"></div>
                    <div class="w-3/4 h-3 bg-slate-100 rounded"></div>
                </div>
                <div class="flex gap-4">
                    <div class="w-12 h-12 bg-purple-100 rounded-full"></div>
                    <div class="flex-1 space-y-2">
                        <div class="w-full h-2 bg-slate-100 rounded"></div>
                        <div class="w-full h-2 bg-slate-100 rounded"></div>
                        <div class="w-2/3 h-2 bg-slate-100 rounded"></div>
                    </div>
                </div>
                <div class="mt-6 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">{{ __('onenote_feat_visual_1') }}</div>
            </div>
            <div>
                <h3 class="text-2xl font-black text-slate-900 mb-4">{{ __('onenote_cost_title') }}</h3>
                <p class="text-slate-500 leading-relaxed mb-6">
                    {{ __('onenote_cost_desc') }}
                </p>
                <ul class="space-y-3">
                    <li class="flex items-center gap-3 text-slate-600 font-medium">
                        <span class="text-purple-500">✓</span> {{ __('onenote_cost_point_1') }}
                    </li>
                    <li class="flex items-center gap-3 text-slate-600 font-medium">
                        <span class="text-purple-500">✓</span> {{ __('onenote_cost_point_2') }}
                    </li>
                    <li class="flex items-center gap-3 text-slate-600 font-medium">
                        <span class="text-purple-500">✓</span> {{ __('onenote_cost_point_3') }}
                    </li>
                </ul>
            </div>
        </div>
    </section>

    {{-- SECTION 5: FEATURE COMPARISON --}}
    <section class="py-24 bg-white border-t border-slate-100">
        <div class="max-w-4xl mx-auto px-6">
            <div class="bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl text-white">
                <div class="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 class="text-xl font-bold text-slate-400 mb-6">{{ __('onenote_feat_title_1') }}</h3>
                        <div class="space-y-6">
                            <div>
                                <div class="font-bold text-white mb-1">{{ __('onenote_feat_point_1_title') }}</div>
                                <div class="text-slate-500 text-sm">{{ __('onenote_feat_point_1_desc') }}</div>
                            </div>
                            <div>
                                <div class="font-bold text-white mb-1">{{ __('onenote_feat_point_2_title') }}</div>
                                <div class="text-slate-500 text-sm">{{ __('onenote_feat_point_2_desc') }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="relative">
                        <div class="absolute -left-6 top-0 bottom-0 w-px bg-slate-800 hidden md:block"></div>
                        <h3 class="text-xl font-bold text-purple-400 mb-6">{{ __('onenote_feat_title_2') }}</h3>
                        <div class="space-y-6">
                            <div>
                                <div class="font-bold text-white mb-1">{{ __('onenote_feat_point_3_title') }}</div>
                                <div class="text-slate-400 text-sm">{{ __('onenote_feat_point_3_desc') }}</div>
                            </div>
                            <div>
                                <div class="font-bold text-white mb-1">{{ __('onenote_feat_point_4_title') }}</div>
                                <div class="text-slate-400 text-sm">{{ __('onenote_feat_point_4_desc') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: CTA --}}
    <section class="py-32 bg-purple-50 text-center border-t border-purple-100">
        <div class="max-w-3xl mx-auto px-6">
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">{{ __('onenote_cta_title') }}</h2>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-purple-600 text-white px-12 py-5 rounded-full text-xl hover:bg-purple-700 transition transform hover:-translate-y-1 shadow-[0_20px_40px_rgba(168,85,247,0.3)] font-bold">
                {{ __('onenote_cta_btn') }}
            </a>
        </div>
    </section>

    {{-- EXPLORE MORE ALTERNATIVES --}}
    <section class="py-8 bg-slate-900 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <span class="text-slate-400 py-2">Compare Notes Apps:</span>
                <a href="{{ route('compare.evernote') }}" class="text-slate-400 hover:text-emerald-400 py-2 px-4 rounded-lg hover:bg-emerald-900/30 transition">Evernote</a>
                <a href="{{ route('compare.applenotes') }}" class="text-slate-400 hover:text-amber-400 py-2 px-4 rounded-lg hover:bg-amber-900/30 transition">Apple Notes</a>
                <a href="{{ route('compare.onenote') }}" class="text-purple-400 font-bold py-2 px-4 rounded-lg bg-purple-900/30 border border-purple-500/20">OneNote</a>
            </div>
        </div>
    </section>
@endsection