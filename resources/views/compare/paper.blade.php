@extends('layouts.marketing')

@section('title', __('notes_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('notes_meta_desc') }}">
    <meta property="og:title" content="{{ __('notes_meta_og_title') }}">
    <meta property="og:description" content="{{ __('notes_meta_og_desc') }}">
@endsection

@section('json-ld')
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
    "name": "{{ __('notes_badge') }}",
    "item": "{{ url('/compare/paper') }}"
  }]
},
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "OneForMind",
  "applicationCategory": "ProductivityApplication",
  "operatingSystem": "Web, Windows, macOS, Linux",
  "description": "{{ __('notes_meta_desc') }}",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Active Accountability System",
    "Digital Context Integration",
    "Smart Habit Slated",
    "Automated Wealth Tracking"
  ]
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{ __('notes_faq_q1') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('notes_faq_a1') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('notes_faq_q2') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('notes_faq_a2') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('notes_faq_q3') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('notes_faq_a3') }}"
      }
    }
  ]
}
]
</script>
@endsection

@section('content')

    {{-- SECTION 1: HERO (SPLIT LAYOUT - TEXT LEFT / VISUAL RIGHT) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 relative border-b border-gray-100">
        {{-- Background Blobs (Sesuai Referensi) --}}
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-200/30 to-purple-200/30 rounded-full blur-[100px] -z-10 animate-pulse duration-[8000ms]"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {{-- Left: Copywriting Agresif tapi Elegan --}}
            <div class="lg:col-span-6 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-orange-200">
                    ⚠️ {{ __('notes_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('notes_hero_title_1') }}<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('notes_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-lg">
                    {!! __('notes_hero_desc') !!}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 text-center">
                        {{ __('notes_hero_cta') }} →
                    </a>
                    <p class="py-4 text-sm text-gray-400 font-bold self-center">{{ __('notes_hero_note') }}</p>
                </div>
            </div>

            {{-- Right: Visual Metaphor (Tumpukan Kertas vs Sistem Rapi) --}}
            <div class="lg:col-span-6 relative h-[500px] flex items-center justify-center animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 fill-mode-both">
                
                {{-- Element 1: The Messy Notes (Rotated & Faded) --}}
                <div class="absolute top-10 right-10 w-64 h-72 bg-yellow-50 border border-yellow-200 rounded-[2rem] p-6 transform rotate-12 opacity-60 shadow-lg z-0">
                    <div class="w-8 h-8 bg-yellow-200 rounded-full mb-4"></div>
                    <div class="space-y-3">
                        <div class="h-3 bg-yellow-200/50 rounded w-full"></div>
                        <div class="h-3 bg-yellow-200/50 rounded w-3/4"></div>
                        <div class="h-3 bg-yellow-200/50 rounded w-1/2"></div>
                    </div>
                    <div class="absolute bottom-6 right-6 text-yellow-300 text-4xl">?</div>
                </div>

                {{-- Element 2: The OFM Card (Front & Center) --}}
                <div class="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 w-80 z-20 transform hover:scale-105 transition duration-500" role="img" aria-label="OneForMind Active Accountability System: A digital planning card showing business launch tasks, statuses, and green checkpoints.">
                    <div class="flex justify-between items-center mb-6">
                        <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl">🚀</div>
                        <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">{{ __('notes_mockup_status') }}</span>
                    </div>
                    <h3 class="font-black text-2xl text-gray-900 mb-2">{{ __('notes_mockup_title') }}</h3>
                    <p class="text-gray-400 text-sm mb-6">{{ __('notes_mockup_deadline') }}</p>
                    
                    <div class="space-y-4">
                        <div class="flex items-center gap-3 text-sm font-bold text-gray-600">
                            <span class="text-green-500">✓</span> {{ __('notes_mockup_task_1') }}
                        </div>
                        <div class="flex items-center gap-3 text-sm font-bold text-gray-600">
                            <span class="text-green-500">✓</span> {{ __('notes_mockup_task_2') }}
                        </div>
                        <div class="flex items-center gap-3 text-sm font-bold text-indigo-600 bg-indigo-50 p-2 rounded-lg">
                            <span class="animate-pulse">●</span> {{ __('notes_mockup_task_3') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE "NOTES LIFECYCLE" (HORIZONTAL PATHWAY) --}}
    <section class="py-24 bg-white relative overflow-hidden border-b border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('notes_cycle_title') }}</h2>
                <p class="text-xl text-gray-500">{{ __('notes_cycle_desc') }}</p>
            </div>

            {{-- Horizontal Pipeline Design --}}
            <div class="relative max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
                {{-- Connecting Line (Desktop) --}}
                <div class="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-gray-100 -z-10 rounded-full border-b-2 border-dashed border-gray-200"></div>

                <div class="grid md:grid-cols-3 gap-8">
                    {{-- Node 1: The Spark --}}
                    <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition duration-300 relative group">
                        <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl font-black text-gray-400 absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-white group-hover:bg-indigo-600 group-hover:text-white transition shadow-sm">1</div>
                        <div class="text-4xl mb-4 mt-2 text-center transform group-hover:scale-110 transition">💡</div>
                        <h3 class="text-lg font-bold mb-3 text-center text-gray-900">{{ __('notes_cycle_1_title') }}</h3>
                        <p class="text-gray-500 text-sm text-center leading-relaxed">{{ __('notes_cycle_1_desc') }}</p>
                    </div>
                    
                    {{-- Node 2: The Noise --}}
                    <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-orange-200 transition duration-300 relative group delay-75">
                        <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl font-black text-gray-400 absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-white group-hover:bg-orange-500 group-hover:text-white transition shadow-sm">2</div>
                        <div class="text-4xl mb-4 mt-2 text-center transform group-hover:scale-110 transition">🧺</div>
                        <h3 class="text-lg font-bold mb-3 text-center text-gray-900">{{ __('notes_cycle_2_title') }}</h3>
                        <p class="text-gray-500 text-sm text-center leading-relaxed">{{ __('notes_cycle_2_desc') }}</p>
                    </div>

                    {{-- Node 3: The Void --}}
                    <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-200 transition duration-300 relative group delay-150">
                        <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl font-black text-gray-400 absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-white group-hover:bg-red-500 group-hover:text-white transition shadow-sm">3</div>
                        <div class="text-4xl mb-4 mt-2 text-center transform group-hover:scale-110 transition">🕸️</div>
                        <h3 class="text-lg font-bold mb-3 text-center text-gray-900">{{ __('notes_cycle_3_title') }}</h3>
                        <p class="text-gray-500 text-sm text-center leading-relaxed">{{ __('notes_cycle_3_desc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 2: ZIG-ZAG 1 (TEXT LEFT - VISUAL RIGHT) --}}
    {{-- The Problem: Passive Hoarding --}}
    <section class="py-32 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            
            {{-- Text Side --}}
            <div class="order-2 lg:order-1 animate-in slide-in-from-bottom-12 fade-in duration-1000">
                <div class="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-red-100">🛑</div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                    {{ __('notes_prob_title_1') }} <span class="text-red-500 decoration-red-200 underline decoration-4 underline-offset-4">{{ __('notes_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-gray-500 text-xl leading-relaxed mb-8">
                    {{ __('notes_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-gray-600">
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('notes_prob_point_1') }}
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('notes_prob_point_2') }}
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('notes_prob_point_3') }}
                    </li>
                </ul>
            </div>

            {{-- Visual Side (Chaotic List) --}}
            <div class="order-1 lg:order-2 relative h-[500px] bg-gray-50 rounded-[3rem] border border-gray-100 overflow-hidden flex items-center justify-center animate-in slide-in-from-right-12 fade-in duration-1000 delay-200">
                <div class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
                
                {{-- Mockup of Chaos --}}
                <div class="relative w-72 bg-white p-6 rounded-3xl shadow-xl border border-gray-200 rotate-3 transition hover:rotate-0 duration-500">
                    <div class="flex justify-between mb-4 border-b border-gray-100 pb-2">
                        <span class="font-bold text-gray-400">{{ __('notes_chaos_title') }}</span>
                        <span class="text-xs text-gray-300">{{ __('notes_chaos_date') }}</span>
                    </div>
                    <div class="space-y-3 font-serif text-gray-500">
                        <p class="line-through decoration-red-300">{{ __('notes_chaos_item_1') }}</p>
                        <p>{{ __('notes_chaos_item_2') }}</p>
                        <p class="bg-yellow-100 p-1">{{ __('notes_chaos_item_3') }}</p>
                        <p>{{ __('notes_chaos_item_4') }}</p>
                        <p>{{ __('notes_chaos_item_5') }}</p>
                    </div>
                    {{-- Warning Badge --}}
                    <div class="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                        {{ __('notes_chaos_badge') }}
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: ZIG-ZAG 2 (VISUAL LEFT - TEXT RIGHT) --}}
    {{-- The Solution: Connected System --}}
    <section class="py-32 bg-indigo-50/50 border-y border-indigo-50 overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            
            {{-- Visual Side (System Flow) --}}
            <div class="relative h-[500px] flex items-center justify-center animate-in slide-in-from-left-12 fade-in duration-1000">
                {{-- Background Glow --}}
                <div class="absolute inset-0 bg-indigo-200 rounded-full blur-[120px] opacity-30"></div>
                
                {{-- The "Hub" Visual --}}
                <div class="relative z-10 grid grid-cols-2 gap-4 w-full max-w-md">
                    <div class="bg-white p-6 rounded-[2rem] shadow-lg border border-indigo-50 transform translate-y-8">
                        <div class="text-2xl mb-2">💰</div>
                        <div class="font-bold text-gray-900 text-sm">{{ __('notes_hub_finance') }}</div>
                        <div class="h-1 bg-green-500 w-full mt-2 rounded-full"></div>
                    </div>
                    <div class="bg-indigo-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-200 text-white">
                        <div class="text-2xl mb-2">🎯</div>
                        <div class="font-bold text-sm">{{ __('notes_hub_goals') }}</div>
                        <div class="text-xs opacity-80 mt-1">{{ __('notes_hub_tracking') }}</div>
                    </div>
                    <div class="col-span-2 bg-white p-6 rounded-[2rem] shadow-lg border border-indigo-50 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <span class="text-2xl">🌱</span>
                            <span class="font-bold text-gray-900 text-sm">{{ __('notes_hub_habits') }}</span>
                        </div>
                        <span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-lg">{{ __('notes_hub_connected') }}</span>
                    </div>
                </div>
            </div>

            {{-- Text Side --}}
            <div class="animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-200">
                <div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-indigo-200">🔄</div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                    {{ __('notes_sol_title_1') }} <span class="text-indigo-600">{{ __('notes_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-gray-500 text-xl leading-relaxed mb-8">
                    {{ __('notes_sol_desc') }}
                </p>
                <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p class="text-gray-800 font-bold mb-2">💡 {{ __('notes_sol_box_title') }}</p>
                    <p class="text-gray-500 text-sm">
                        {!! __('notes_sol_box_desc') !!}
                    </p>
                </div>
            </div>

        </div>
    </section>

    {{-- SECTION 4: COMPARISON TABLE (LIGHT & CLEAN) --}}
    <section class="py-32 bg-white">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6">{{ __('notes_compare_title') }}</h2>
                <p class="text-gray-500 text-xl">{{ __('notes_compare_desc') }}</p>
            </div>

            <div class="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100 border border-gray-100 overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50/50 border-b border-gray-100">
                            <th class="p-8 text-xs font-black text-gray-400 uppercase tracking-widest w-1/3">{{ __('notes_table_head_1') }}</th>
                            <th class="p-8 text-lg font-black text-gray-400 w-1/3 text-center">{{ __('notes_table_head_2') }}</th>
                            <th class="p-8 text-lg font-black text-indigo-600 w-1/3 text-center bg-indigo-50/30">OneForMind</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600">
                        {{-- Row 1 --}}
                        <tr class="border-b border-gray-50 hover:bg-gray-50/30 transition">
                            <td class="p-8 font-bold text-gray-900">{{ __('notes_table_row_1_title') }}</td>
                            <td class="p-8 text-center text-gray-400">{{ __('notes_table_row_1_col_1') }}</td>
                            <td class="p-8 text-center text-indigo-900 font-black bg-indigo-50/30">{{ __('notes_table_row_1_col_2') }}</td>
                        </tr>
                        {{-- Row 2 --}}
                        <tr class="border-b border-gray-50 hover:bg-gray-50/30 transition">
                            <td class="p-8 font-bold text-gray-900">{{ __('notes_table_row_2_title') }}</td>
                            <td class="p-8 text-center text-gray-400">{{ __('notes_table_row_2_col_1') }}</td>
                            <td class="p-8 text-center text-indigo-900 font-black bg-indigo-50/30">{{ __('notes_table_row_2_col_2') }}</td>
                        </tr>
                        {{-- Row 3 --}}
                        <tr class="border-b border-gray-50 hover:bg-gray-50/30 transition">
                            <td class="p-8 font-bold text-gray-900">{{ __('notes_table_row_3_title') }}</td>
                            <td class="p-8 text-center text-gray-400">{{ __('notes_table_row_3_col_1') }}</td>
                            <td class="p-8 text-center text-indigo-900 font-black bg-indigo-50/30">{{ __('notes_table_row_3_col_2') }}</td>
                        </tr>
                        {{-- Row 4 --}}
                        <tr class="hover:bg-gray-50/30 transition">
                            <td class="p-8 font-bold text-gray-900">{{ __('notes_table_row_4_title') }}</td>
                            <td class="p-8 text-center text-gray-400">{{ __('notes_table_row_4_col_1') }}</td>
                            <td class="p-8 text-center text-indigo-600 font-black bg-indigo-50/30">{{ __('notes_table_row_4_col_2') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    {{-- SECTION: SCIENTIFIC PILLAR (E-E-A-T) - ANALOG LAB STYLE --}}
    <section class="py-32 bg-[#F9F7F2] relative overflow-hidden">
        {{-- Paper Texture Overlay --}}
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="bg-white border border-[#E5E1D8] rounded-[3rem] p-8 md:p-20 shadow-xl relative overflow-hidden group">
                {{-- Graphite Sketches Background --}}
                <div class="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
                    <svg viewBox="0 0 100 100" class="w-full h-full stroke-black fill-none">
                        <path d="M10,10 Q50,90 90,10" stroke-width="0.5" />
                        <circle cx="50" cy="50" r="40" stroke-width="0.2" />
                    </svg>
                </div>

                <div class="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 text-[10px] font-black uppercase tracking-[0.4em] mb-12 rounded-full border border-amber-200">
                            🧬 {{ __('notes_science_badge') }}
                        </div>

                        <h2 class="text-4xl md:text-5xl font-serif italic text-slate-900 mb-8 leading-tight">
                            {{ __('notes_science_title') }}
                        </h2>

                        <div class="relative py-12 px-12 bg-[#FEFDFB] rounded-3xl mb-12 border border-[#F1EFE9] group-hover:-rotate-1 transition duration-500 shadow-inner">
                             <span class="absolute -top-4 -left-4 text-4xl transform -rotate-12">✍️</span>
                            <p class="text-slate-600 text-xl font-medium leading-relaxed font-serif">
                                "{{ __('notes_science_desc') }}"
                            </p>
                        </div>

                        <div class="space-y-4 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                            <p>• Extended_Mind_Thesis_Verified</p>
                            <p>• Distributed_Cognition_Active</p>
                        </div>
                    </div>

                    <div class="relative">
                        {{-- Hand-drawn Diagram --}}
                        <div class="w-full max-w-[400px] aspect-square relative flex items-center justify-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition duration-1000">
                            <div class="absolute inset-0 border border-slate-200 rounded-full animate-[spin_20s_linear_infinite]"></div>
                            <div class="absolute inset-10 border border-slate-100 rounded-full border-dashed"></div>
                            <div class="w-24 h-24 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-4xl shadow-sm z-10">🧠</div>
                            
                            {{-- Annotation Lines --}}
                            <div class="absolute top-0 left-1/2 w-px h-10 bg-slate-300 -translate-x-1/2"></div>
                            <div class="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">INPUT</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: SUNRISE CTA (SAME AS REFERENCE) --}}
    <section class="pt-32 pb-40 px-6 bg-white relative overflow-hidden border-t border-gray-100">
        {{-- Sunrise Effect Base --}}
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-t from-indigo-100 via-purple-50 to-white rounded-t-full -z-10"></div>
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-indigo-200 to-transparent rounded-t-full blur-2xl -z-10"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-indigo-950 tracking-tight leading-tight">
                {!! __('notes_cta_title') !!}
            </h2>
            <p class="text-indigo-900/60 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
                {{ __('notes_cta_desc') }}
            </p>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-700 transition transform hover:-translate-y-2 shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.5)]">
                {{ __('notes_cta_btn') }}
            </a>
            <p class="mt-8 text-sm text-indigo-400 font-bold uppercase tracking-widest">{{ __('notes_cta_sub') }}</p>
        </div>
    </section>


    {{-- SECTION: INTERNAL LINKING (UNIFIED ECOSYSTEM) - MIND MAPPING NEURAL STYLE --}}
    <section class="py-40 bg-white border-t border-gray-100 relative overflow-hidden">
        {{-- Organic Web Background --}}
        <div class="absolute inset-0 opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" class="w-full h-full fill-none stroke-indigo-600">
                <path d="M10,10 C30,40 70,60 90,90" stroke-width="0.1" />
                <path d="M90,10 C70,40 30,60 10,90" stroke-width="0.1" />
                <circle cx="50" cy="50" r="2" fill="currentColor" />
            </svg>
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-32 text-center tracking-tight">
                {{ __('unified_ecosystem_title', ['feature' => __('notes_badge')]) }}
            </h2>
            
            <div class="relative w-full max-w-[800px] mx-auto min-h-[500px]">
                {{-- Central Hub --}}
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-600 rounded-[3rem] flex flex-col items-center justify-center text-white shadow-2xl z-20 rotate-3">
                    <span class="text-4xl mb-2">🧠</span>
                    <span class="text-xs font-black uppercase tracking-widest">Second Brain</span>
                </div>

                {{-- Orbiting Nodes with Curved Paths --}}
                {{-- Node 1: Journal --}}
                <a href="{{ url('/features/journal') }}" class="absolute top-0 left-0 group">
                    <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl group-hover:translate-y-[-10px] transition duration-500 text-center">
                        <span class="text-3xl block mb-2">📔</span>
                        <h4 class="font-black text-gray-900 text-sm mb-1">{{ __('ecosystem_journal_title') }}</h4>
                        <p class="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{{ __('journal_meta_title') }}</p>
                    </div>
                </a>

                {{-- Node 2: Habit --}}
                <a href="{{ url('/features/habit') }}" class="absolute top-0 right-0 group">
                    <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl group-hover:translate-x-[10px] transition duration-500 text-center">
                        <span class="text-3xl block mb-2">🌱</span>
                        <h4 class="font-black text-gray-900 text-sm mb-1">{{ __('ecosystem_habit_title') }}</h4>
                        <p class="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{{ __('habit_meta_title') }}</p>
                    </div>
                </a>

                {{-- Node 3: Planner --}}
                <a href="{{ url('/features/planner') }}" class="absolute bottom-0 left-0 group">
                    <div class="bg-orange-50 p-6 rounded-3xl border border-orange-100 shadow-xl group-hover:translate-x-[-10px] transition duration-500 text-center">
                        <span class="text-3xl block mb-2">📅</span>
                        <h4 class="font-black text-orange-900 text-sm mb-1">{{ __('ecosystem_planner_title') }}</h4>
                        <p class="text-[8px] text-orange-400 font-bold uppercase tracking-widest">{{ __('planner_meta_title') }}</p>
                    </div>
                </a>

                {{-- Node 4: Goal --}}
                <a href="{{ url('/features/goal') }}" class="absolute bottom-0 right-0 group">
                    <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl group-hover:translate-y-[10px] transition duration-500 text-center">
                        <span class="text-3xl block mb-2">🎯</span>
                        <h4 class="font-black text-gray-900 text-sm mb-1">{{ __('ecosystem_goal_title') }}</h4>
                        <p class="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{{ __('goal_meta_title') }}</p>
                    </div>
                </a>
            </div>
            
            <div class="mt-32 text-center opacity-20 font-black text-[10px] uppercase tracking-[1em]">
                Neural • Connections • Active
            </div>
        </div>
    </section>

@endsection
