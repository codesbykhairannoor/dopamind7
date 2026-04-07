@extends('layouts.marketing')

@section('title', '500 - Server Error | OneForMind')

@section('content')
    <div class="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden px-6">
        {{-- Animated Matrix/Glitch Particles --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:2rem_2rem] opacity-[0.03] -z-10"></div>
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.2),transparent_70%)] opacity-50"></div>
        
        <div class="relative z-10 text-center max-w-2xl animate-in zoom-in-95 duration-1000">
            {{-- ERROR TERMINAL --}}
            <div class="mb-12 relative flex justify-center">
                <div class="w-full max-w-md bg-slate-950 rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_-20px_rgba(79,70,229,0.6)] p-8 text-left font-mono relative overflow-hidden group">
                     <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none transition duration-700 group-hover:opacity-60"></div>
                     
                     <div class="flex gap-2 mb-6">
                         <div class="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                         <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                         <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                     </div>

                     <div class="space-y-3 text-indigo-400 text-sm">
                         <div class="flex gap-3">
                             <span class="text-slate-600">01.</span>
                             <span>STATUS: <span class="text-rose-400 font-black">CRITICAL_SYSTEM_FAILURE</span></span>
                         </div>
                         <div class="flex gap-3">
                             <span class="text-slate-600">02.</span>
                             <span>TRACE: <span class="text-slate-500 underline decoration-indigo-700 underline-offset-4">Kernel_Panic::InternalSignal(500)</span></span>
                         </div>
                         <div class="flex gap-3">
                             <span class="text-slate-600">03.</span>
                             <span class="animate-pulse">REBOOTING_NEURAL_CORE... [FAILED]</span>
                         </div>
                     </div>

                     <div class="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                         <span class="text-[10px] text-slate-500 uppercase tracking-widest font-black">Error Code: ERR_500_UNHANDLED</span>
                         <span class="text-indigo-600 font-bold">500.EXE</span>
                     </div>
                </div>
            </div>

            <h1 class="text-4xl md:text-6xl text-white mb-6 tracking-tighter leading-[0.9] font-black">
                Whoops! <br> 
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">Sistem Mengalami Hubung Singkat.</span>
            </h1>
            
            <p class="text-slate-400 text-lg font-medium mb-12 leading-relaxed max-w-xl mx-auto">
                Server kami sedang beristirahat sejenak setelah menangani ribuan impian Anda. Tim mekanik kami sudah dikirim untuk memperbaiki inti sistem.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="{{ url('/') }}" class="px-10 py-5 bg-indigo-600 text-white rounded-full font-black text-xl hover:shadow-[0_20px_50px_-15px_rgba(79,70,229,0.5)] hover:bg-indigo-700 transition active:scale-95 shadow-xl">
                    Refresh Sistem (Home)
                </a>
                <a href="{{ route('company.contact') }}" class="px-10 py-5 bg-slate-800 text-slate-200 border border-white/10 rounded-full font-black text-xl hover:bg-slate-700 transition active:scale-95 shadow-xl">
                    Laporkan Kerusakan
                </a>
            </div>
        </div>
    </div>
@endsection

