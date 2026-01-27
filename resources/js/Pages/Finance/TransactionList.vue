<script setup>
import { ref, computed } from 'vue'; 
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import ArchiveModal from './ArchiveModal.vue'; 

const props = defineProps({
    transactions: Array,
    onDelete: Function,
    onEdit: Function // Tambahkan prop ini agar bisa edit dari ArchiveModal
});

const { formatRupiah } = useFinanceFormat();

const isArchiveOpen = ref(false);
const selectedDayData = ref(null);
const filterDate = ref('');

// --- 1. GROUPING DATA ---
const groupedDailyStats = computed(() => {
    const groups = {};
    const data = props.transactions || [];
    
    data.forEach(trx => {
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

// --- 2. LOGIC FILTER TAMPILAN ---
const visibleStats = computed(() => {
    if (filterDate.value) {
        return groupedDailyStats.value.filter(day => day.date === filterDate.value);
    }
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
                    class="pl-3 pr-2 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm outline-none transition-all w-full sm:w-auto cursor-pointer focus:ring-2 focus:ring-indigo-500/20"
                />
                <button 
                    v-if="filterDate" 
                    @click="filterDate = ''"
                    class="absolute -right-2 -top-2 bg-rose-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] shadow-sm hover:bg-rose-600 transition-colors"
                >✕</button>
            </div>
        </div>

        <div v-if="transactions.length === 0" class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
            <div class="text-3xl mb-2">📒</div>
            <p class="text-slate-400 text-sm font-medium">Belum ada transaksi di bulan ini</p>
        </div>

        <div v-else class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-50">
            <div v-for="day in visibleStats" :key="day.date" 
                @click="openDetail(day)"
                class="group p-4 flex items-center justify-between hover:bg-indigo-50/50 transition-colors cursor-pointer"
            >
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-white transition-all shadow-sm">
                        <span class="text-[10px] uppercase font-black text-slate-400 leading-none">{{ day.dateObj.locale('id').format('MMM') }}</span>
                        <span class="text-xl font-black leading-none text-slate-700 mt-0.5">{{ day.dateObj.format('DD') }}</span>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-slate-700 text-sm capitalize">{{ day.dateObj.locale('id').format('dddd') }}</h4>
                        <span class="text-[11px] text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 mt-1 inline-block">
                            {{ day.transactions.length }} Transaksi
                        </span>
                    </div>
                </div>

                <div class="flex items-center gap-6">
                    <div class="pl-4 border-l border-slate-100 text-right">
                        <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Net Harian</span>
                        <span class="text-sm font-black font-mono" :class="(day.total_income - day.total_expense) >= 0 ? 'text-indigo-600' : 'text-orange-500'">
                            {{ (day.total_income - day.total_expense) >= 0 ? '+' : '' }}{{ formatRupiah(day.total_income - day.total_expense) }}
                        </span>
                    </div>
                    <span class="text-slate-300 group-hover:text-indigo-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
            
            <div v-if="!filterDate && groupedDailyStats.length > 5" class="bg-slate-50/50 p-2.5 text-center border-t border-slate-100">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gunakan filter tanggal untuk melihat data lama</p>
            </div>
        </div>

        <ArchiveModal 
            :show="isArchiveOpen" 
            :dayData="selectedDayData" 
            :close="() => isArchiveOpen = false"
            :onDelete="onDelete"
            :onEdit="onEdit" 
        />
    </div>
</template>