<script setup>
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    currentMonth: String,    // "Januari 2026"
    stats: Object,           // { total_income, total_expense, balance }
    onPrev: Function,        // Fungsi mundur bulan
    onNext: Function,        // Fungsi maju bulan
    onAddClick: Function     // Fungsi buka modal
});

const { formatRupiah } = useFinanceFormat();
</script>

<template>
    <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm/[0.06] transition-all -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 mb-8">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div class="flex items-center gap-2 bg-slate-50/80 rounded-full p-1 border border-slate-200/60">
                <button @click="onPrev" class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-white rounded-full transition active:scale-95">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                
                <span class="px-4 font-black text-slate-700 text-sm uppercase tracking-wider min-w-[130px] text-center">
                    {{ currentMonth }}
                </span>
                
                <button @click="onNext" class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-white rounded-full transition active:scale-95">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>

            <button 
                @click="onAddClick"
                class="w-full md:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/50 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
            >
                <div class="bg-white/20 p-0.5 rounded-full group-hover:rotate-90 transition duration-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                </div>
                <span>Catat Transaksi</span>
            </button>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div class="col-span-1 md:col-span-12 lg:col-span-6 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 p-8 text-white shadow-2xl shadow-indigo-200/40 group">
            <div class="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
            <div class="absolute bottom-0 left-0 -mb-24 -ml-12 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
            <svg class="absolute right-4 bottom-4 w-24 h-24 text-white/5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.95V5h-2.93v1.73c-1.73.49-2.73 1.5-2.73 2.63 0 1.59 1.32 2.41 3.15 2.85 1.82.45 2.52 1.03 2.52 1.88 0 .93-.93 1.5-2.28 1.5-1.55 0-2.18-.74-2.23-1.78h-1.7c.07 1.66 1.13 2.66 2.8 3.04V19h2.93v-1.78c1.84-.44 2.93-1.54 2.93-2.75.01-1.71-1.36-2.51-3.38-2.96z"/></svg>

            <div class="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div class="flex items-center gap-2 mb-1 opacity-80">
                        <span class="p-1 bg-white/20 rounded-lg backdrop-blur-sm">💰</span>
                        <p class="font-bold text-xs uppercase tracking-widest">Sisa Saldo</p>
                    </div>
                    <h3 class="text-4xl md:text-5xl font-black tracking-tight leading-tight">{{ formatRupiah(stats.balance) }}</h3>
                </div>
                <div class="mt-8 flex items-center gap-2">
                     <span class="inline-flex items-center gap-1.5 text-[10px] font-bold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md uppercase tracking-wider">
                        <span class="relative flex h-2 w-2">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Live Update
                    </span>
                </div>
            </div>
        </div>

        <div class="col-span-1 md:col-span-6 lg:col-span-3 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <p class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Pemasukan</p>
                    <h3 class="text-xl md:text-2xl font-black text-slate-800 leading-none">{{ formatRupiah(stats.total_income) }}</h3>
                </div>
                 <div class="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition shadow-sm">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg>
                </div>
            </div>
            <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div class="h-full w-3/4 bg-emerald-500 rounded-full opacity-80 group-hover:w-full transition-all duration-500"></div>
            </div>
             <p class="text-[10px] text-slate-400 mt-2 font-medium">Cashflow bulan ini</p>
        </div>

        <div class="col-span-1 md:col-span-6 lg:col-span-3 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
             <div class="flex items-start justify-between mb-4">
                <div>
                    <p class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Pengeluaran</p>
                    <h3 class="text-xl md:text-2xl font-black text-slate-800 leading-none">{{ formatRupiah(stats.total_expense) }}</h3>
                </div>
                 <div class="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 group-hover:scale-110 transition shadow-sm">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                </div>
            </div>
             <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex justify-end">
                 <div class="h-full w-1/2 bg-rose-500 rounded-full opacity-80 group-hover:w-3/4 transition-all duration-500"></div>
            </div>
            <p class="text-[10px] text-slate-400 mt-2 font-medium">Kontrol pengeluaranmu</p>
        </div>

    </div>
</template>