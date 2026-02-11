<script setup>
import { useFinanceHistory } from '@/Composables/Finance/useFinanceHistory';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import ArchiveModal from './ArchiveModal.vue'; 

const props = defineProps({
    transactions: Array,
    categories: Array, 
    onDelete: Function,
    onEdit: Function 
});

// Ambil logic tanggal dari useFinanceHistory
const { visibleStats, filterDate, isArchiveOpen, selectedDayData, openDetail } = useFinanceHistory(props);
// Ambil logic uang dari useFinanceFormat
const { formatMoney } = useFinanceFormat();

</script>

<template>
    <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2">
                <h3 class="text-lg font-bold text-slate-800">{{ $t('daily_history') }}</h3>
                <span v-if="!filterDate" class="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                    {{ $t('last_5') }}
                </span>
                <span v-else class="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                    {{ $t('search_result') }}
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
            <p class="text-slate-400 text-sm font-medium">{{ $t('no_transaction') }}</p>
        </div>

        <div v-else class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-50">
            <div v-for="day in visibleStats" :key="day.date" 
                @click="openDetail(day)"
                class="group p-4 flex items-center justify-between hover:bg-indigo-50/50 transition-colors cursor-pointer"
            >
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-white transition-all shadow-sm">
                        <span class="text-[10px] uppercase font-black text-slate-400 leading-none">{{ day.dateObj.format('MMM') }}</span>
                        <span class="text-xl font-black leading-none text-slate-700 mt-0.5">{{ day.dateObj.format('DD') }}</span>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-slate-700 text-sm capitalize">{{ day.dateObj.format('dddd') }}</h4>
                        
                        <span class="text-[11px] text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 mt-1 inline-block">
                            {{ $t('transaction_count', { count: day.transactions.length }) }}
                        </span>
                    </div>
                </div>

                <div class="flex items-center gap-6">
                    <div class="pl-4 border-l border-slate-100 text-right">
                        <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">{{ $t('daily_net') }}</span>
                        <span class="text-sm font-black font-mono" :class="(day.total_income - day.total_expense) >= 0 ? 'text-indigo-600' : 'text-orange-500'">
                            {{ (day.total_income - day.total_expense) >= 0 ? '+' : '' }}{{ formatMoney(day.total_income - day.total_expense) }}
                        </span>
                    </div>
                    <span class="text-slate-300 group-hover:text-indigo-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
            
            <div v-if="!filterDate && visibleStats.length === 5" class="bg-slate-50/50 p-2.5 text-center border-t border-slate-100">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ $t('old_data_hint') }}</p>
            </div>
        </div>

        <ArchiveModal 
            :show="isArchiveOpen" 
            :dayData="selectedDayData" 
            :categories="categories"
            :close="() => isArchiveOpen = false"
            :onDelete="onDelete"
            :onEdit="onEdit" 
        />
    </div>
</template>