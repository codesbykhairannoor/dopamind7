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
    <div class="mb-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div class="flex items-center bg-white rounded-xl shadow-sm border border-slate-100 p-1">
                <button @click="onPrev" class="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">◀</button>
                <span class="px-4 font-bold text-slate-700 min-w-[140px] text-center">{{ currentMonth }}</span>
                <button @click="onNext" class="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">▶</button>
            </div>
            
            <button 
                @click="onAddClick"
                class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition flex items-center gap-2"
            >
                <span>+</span> Catat Transaksi
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-indigo-600 p-6 rounded-2xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
                <div class="absolute -right-6 -top-6 text-9xl text-white/10 group-hover:scale-110 transition duration-500">💰</div>
                <p class="text-indigo-200 font-medium text-sm mb-1">Sisa Saldo Bulan Ini</p>
                <h3 class="text-2xl font-black tracking-tight">{{ formatRupiah(stats.balance) }}</h3>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs">⬇</div>
                    <p class="text-slate-500 font-medium text-sm">Pemasukan</p>
                </div>
                <h3 class="text-xl font-bold text-slate-800">{{ formatRupiah(stats.total_income) }}</h3>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-xs">⬆</div>
                    <p class="text-slate-500 font-medium text-sm">Pengeluaran</p>
                </div>
                <h3 class="text-xl font-bold text-slate-800">{{ formatRupiah(stats.total_expense) }}</h3>
            </div>
        </div>
    </div>
</template>