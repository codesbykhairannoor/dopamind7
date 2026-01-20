<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import ArchiveModal from './ArchiveModal.vue'; 

const props = defineProps({
    transactions: Array,
    onDelete: Function
});

const { formatRupiah } = useFinanceFormat();

const isArchiveOpen = ref(false);
const selectedDayData = ref(null);
const filterDate = ref(''); // State untuk filter tanggal

// 1. GROUPING DATA (Master Data)
const groupedDailyStats = computed(() => {
    const groups = {};
    
    props.transactions.forEach(trx => {
        const dateKey = dayjs(trx.date).format('YYYY-MM-DD');
        
        if (!groups[dateKey]) {
            groups[dateKey] = {
                date: dateKey,
                dateObj: dayjs(trx.date),
                transactions: [],
                total_income: 0,
                total_expense: 0
            };
        }
        
        groups[dateKey].transactions.push(trx);
        
        if (trx.type === 'income') {
            groups[dateKey].total_income += Number(trx.amount);
        } else {
            groups[dateKey].total_expense += Number(trx.amount);
        }
    });

    return Object.values(groups).sort((a, b) => b.dateObj - a.dateObj);
});

// 2. LOGIC FILTER TAMPILAN (Max 5 atau Sesuai Tanggal)
const visibleStats = computed(() => {
    // Kalau user pilih tanggal spesifik
    if (filterDate.value) {
        return groupedDailyStats.value.filter(day => day.date === filterDate.value);
    }
    
    // Default: Cuma ambil 5 hari terbaru
    return groupedDailyStats.value.slice(0, 5);
});

const openDetail = (dayData) => {
    selectedDayData.value = dayData;
    isArchiveOpen.value = true;
};
</script>

<template>
    <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2">
                <h3 class="text-lg font-bold text-slate-800">Riwayat Harian</h3>
                <span v-if="!filterDate" class="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                    5 Terakhir
                </span>
                <span v-else class="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                    Hasil Pencarian
                </span>
            </div>

            <div class="relative">
                <input 
                    type="date" 
                    v-model="filterDate"
                    class="pl-3 pr-2 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all w-full sm:w-auto cursor-pointer"
                />
                <button 
                    v-if="filterDate" 
                    @click="filterDate = ''"
                    class="absolute -right-2 -top-2 bg-rose-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] shadow-sm hover:scale-110 transition"
                >✕</button>
            </div>
        </div>

        <div v-if="transactions.length === 0" class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
            <span class="text-4xl filter grayscale opacity-50">🍃</span>
            <p class="text-slate-400 font-medium mt-2 text-sm">Belum ada transaksi bulan ini</p>
        </div>

        <div v-else-if="visibleStats.length === 0" class="text-center py-8 bg-white rounded-2xl border border-dashed border-slate-200">
            <p class="text-slate-400 text-sm">Tidak ada transaksi pada tanggal <span class="font-bold text-slate-600">{{ dayjs(filterDate).locale('id').format('DD MMMM YYYY') }}</span></p>
            <button @click="filterDate = ''" class="text-xs font-bold text-indigo-600 mt-2 hover:underline">Tampilkan Semua</button>
        </div>

        <div v-else class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-50">
            <div v-for="day in visibleStats" :key="day.date" 
                @click="openDetail(day)"
                class="group p-4 flex items-center justify-between hover:bg-indigo-50/50 transition-colors cursor-pointer relative"
            >
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-600 group-hover:bg-white group-hover:border-indigo-200 transition-all shadow-sm">
                        <span class="text-[10px] uppercase font-bold text-slate-400 leading-none">{{ day.dateObj.locale('id').format('MMM') }}</span>
                        <span class="text-xl font-black leading-none text-slate-700">{{ day.dateObj.format('DD') }}</span>
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-700 text-sm">{{ day.dateObj.locale('id').format('dddd') }}</h4>
                        <span class="text-xs text-slate-400 font-medium">{{ day.transactions.length }} Transaksi</span>
                    </div>
                </div>

                <div class="flex items-center gap-6 text-right">
                    <div class="hidden sm:flex flex-col gap-0.5">
                        <span v-if="day.total_income > 0" class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 rounded self-end">
                            + {{ formatRupiah(day.total_income) }}
                        </span>
                        <span v-if="day.total_expense > 0" class="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 rounded self-end">
                            - {{ formatRupiah(day.total_expense) }}
                        </span>
                    </div>

                    <div class="pl-4 sm:border-l border-slate-100">
                        <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Net</span>
                        <span class="text-sm font-black font-mono" 
                            :class="(day.total_income - day.total_expense) >= 0 ? 'text-indigo-600' : 'text-orange-500'">
                            {{ (day.total_income - day.total_expense) >= 0 ? '+' : '' }}
                            {{ formatRupiah(day.total_income - day.total_expense) }}
                        </span>
                    </div>

                    <svg class="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
            
            <div v-if="!filterDate && groupedDailyStats.length > 5" class="bg-slate-50 p-2 text-center border-t border-slate-100">
                <p class="text-[10px] text-slate-400">Menampilkan 5 hari terbaru. Gunakan filter tanggal untuk melihat yang lain.</p>
            </div>
        </div>

        <ArchiveModal 
            :show="isArchiveOpen" 
            :dayData="selectedDayData" 
            :close="() => isArchiveOpen = false"
            :onDelete="onDelete"
        />
    </div>
</template>