@extends('layouts.marketing')

@section('title', '404 - Halaman Tidak Ditemukan | OneForMind')

@section('content')
    <div class="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden px-6">
        {{-- Decorative Elements --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-50 rounded-full blur-[120px] -z-10"></div>
        
        <div class="relative z-10 text-center max-w-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {{-- Big 404 Illustration --}}
            <div class="mb-12 relative flex justify-center perspective-[1000px]">
                <div class="text-[12rem] md:text-[20rem] font-black text-transparent bg-clip-text bg-slate-100/40 select-none tracking-tighter leading-none">
                    404
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-48 h-48 md:w-64 md:h-64 bg-slate-900 rounded-[3rem] shadow-3xl shadow-indigo-200/50 flex flex-col items-center justify-center rotate-6 hover:rotate-0 transition-transform duration-700 group cursor-default">
                        <span class="text-6xl md:text-8xl group-hover:scale-110 transition">🔭</span>
                        <div class="mt-4 font-mono text-[10px] text-indigo-400 font-bold uppercase tracking-[0.3em]">SIGNAL_LOST</div>
                    </div>
                </div>
            </div>

            <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Terlalu Jauh Masuk ke <br> 
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">Ruang Kosong.</span>
            </h1>
            
            <p class="text-slate-500 text-lg font-medium mb-12 leading-relaxed">
                Halaman yang Anda cari tidak ada di galaksi ini. Mungkin telah dipindah atau dihapus secara permanen. Mari kembali ke orbit utama.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="{{ route('home') }}" class="px-10 py-5 bg-slate-900 text-white rounded-full font-black text-xl hover:shadow-2xl hover:bg-slate-800 transition active:scale-95 shadow-xl">
                    Ke Orbit Utama (Beranda)
                </a>
                <button onclick="history.back()" class="px-10 py-5 bg-white border border-slate-200 text-slate-600 rounded-full font-black text-xl hover:bg-slate-50 transition active:scale-95">
                    Kembali Saja
                </button>
            </div>

            {{-- Support Link --}}
            <div class="mt-16 pt-8 border-t border-slate-100">
                <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Punya Masalah Teknis? 
                    <a href="{{ route('company.contact') }}" class="text-indigo-600 hover:underline ml-2">Hubungi Tim Control</a>
                </p>
            </div>
        </div>
    </div>
@endsection
