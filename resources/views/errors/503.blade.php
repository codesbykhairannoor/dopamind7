@extends('layouts.marketing')

@section('title', '503 - Pemeliharaan Sistem | OneForMind')

@section('content')
    <div class="min-h-screen bg-indigo-50 flex flex-col items-center justify-center relative overflow-hidden px-6">
        {{-- Background Decoration --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#e0e7ff_1px,transparent_1px),linear-gradient(to_bottom,#e0e7ff_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white rounded-full blur-[120px] -z-10"></div>
        
        <div class="relative z-10 text-center max-w-3xl animate-in fade-in slide-in-from-top-12 duration-1000">
            {{-- BIG ICON --}}
            <div class="mb-12 relative flex justify-center items-center">
                 <div class="w-24 h-24 bg-indigo-600 rounded-[2rem] shadow-2xl flex items-center justify-center text-4xl animate-bounce">🛠️</div>
                 <div class="absolute inset-0 flex items-center justify-center -z-10">
                    <div class="w-48 h-48 bg-indigo-200/50 rounded-full blur-3xl animate-pulse"></div>
                 </div>
            </div>

            <h1 class="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
                Sedang <br> 
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-rose-500 underline decoration-indigo-200 underline-offset-8">Upgrading Hidup Anda.</span>
            </h1>
            
            <p class="text-xl text-slate-600 font-bold mb-12 leading-relaxed max-w-xl mx-auto italic">
                Kami sedang merapikan beberapa baut dan sirkuit untuk performa yang lebih tajam. Tunggu sebentar lagi, dunia butuh fokus Anda yang lebih tajam.
            </p>

            {{-- PROGRESS BAR IMITATION --}}
            <div class="w-full max-w-md mx-auto h-2 bg-indigo-100 rounded-full p-0.5 overflow-hidden border border-indigo-200 mb-12 shadow-inner">
                <div class="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full animate-[loading_5s_infinite_linear]" style="width: 70%"></div>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
               <a href="{{ route('company.status') }}" class="px-10 py-5 bg-white border-2 border-indigo-600 text-indigo-700 rounded-full font-black text-xl hover:bg-indigo-50 transition active:scale-95 shadow-xl">
                   Pantau System Status 📊
               </a>
            </div>

            <div class="mt-20 flex justify-center gap-8 text-xs font-black uppercase tracking-widest text-indigo-400">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                    SYSTEM_STAGING
                </div>
                <div>EST_RESTORE: ~15 MIN</div>
            </div>
        </div>
    </div>

    <style>
        @keyframes loading {
            0% { transform: translateX(-100%); width: 30%; }
            50% { transform: translateX(0%); width: 60%; }
            100% { transform: translateX(100%); width: 30%; }
        }
    </style>
@endsection
