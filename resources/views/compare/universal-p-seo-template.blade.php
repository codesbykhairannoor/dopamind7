@extends('layouts.marketing')

@section('title', "OneForMind vs {$data['name']} Alternative (2026 Comparison)")

@section('meta')
    <meta name="description" content="Why switch from {{ $data['name'] }} to OneForMind? The ultimate {{ $data['category'] }} alternative for 2026.">
@endsection

@section('content')
<header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-gray-50 relative border-b border-gray-100">
    <div class="max-w-4xl mx-auto text-center relative z-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
            <span>✨</span> 2026 Alternative
        </div>
        
        <h1 class="text-[42px] leading-[1.1] md:text-7xl mb-8 text-gray-900 tracking-tight font-black">
            The Better Alternative to <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ $data['name'] }}</span>
        </h1>
        
        <p class="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            Are you tired of paying for {{ $data['name'] }} just for {{ $data['category'] }} features? 
            OneForMind gives you a unified ecosystem for your finances, habits, and daily planner in a single tab.
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition">
                Start for Free
            </a>
        </div>
    </div>
</header>
@endsection
