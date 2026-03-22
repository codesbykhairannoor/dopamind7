<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { useFinanceHistory } from '@/Composables/Finance/useFinanceHistory';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import ArchiveModal from './ArchiveModal.vue'; 

// Import Kalender Cantik Kita
import FinanceDatePicker from './FinanceDatePicker.vue'; // BENAR (Pakai petik satu saja)
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

// State buat kontrol Popover Kalender
const showFilterPicker = ref(false);
</script>

<template>
    <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2">
                <h3 class="text-lg font-bold text-slate-800 dark:text-white transition-colors duration-500">{{ $t('daily_history') }}</h3>
                
                <span v-if="!filterDate" class="text-[10px] font-bold text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                    {{ $t('last_5') }}
                </span>
                <span v-else class="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">
                    {{ $t('search_result') }}
                </span>
            </div>

            <div class="relative z-20"> <div class="flex items-center">
                    <button 
                        @click="showFilterPicker = !showFilterPicker"
                        class="pl-3 pr-8 py-2 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:ring-2 hover:ring-indigo-500/10 transition-all flex items-center gap-2 min-w-[150px] transition-colors duration-300"
                        :class="filterDate ? 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30' : 'text-slate-500 dark:text-slate-400'"
                    >
                        <span class="text-base">📅</span>
                       <span>
    {{ filterDate ? dayjs(filterDate).locale($page.props.locale).format('DD MMM YYYY') : $t('date_filter') }}
</span>
                    </button>
                    
                    <button 
                        v-if="filterDate" 
                        @click.stop="filterDate = ''"
                        class="absolute right-2 text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-1 rounded-full transition-all"
                        title="Hapus Filter"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div class="absolute right-0 top-full mt-2">
                    <FinanceDatePicker 
                        :show="showFilterPicker"
                        :modelValue="filterDate"
                        @update:modelValue="(val) => filterDate = val"
                        @close="showFilterPicker = false"
                    />
                </div>
            </div>
        </div>

        <div v-if="transactions.length === 0" class="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 transition-colors duration-500">
            <div class="text-3xl mb-2">📒</div>
            <p class="text-slate-400 dark:text-slate-600 text-sm font-medium transition-colors duration-500">{{ $t('no_transaction') }}</p>
        </div>

        <div v-else class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-50 dark:divide-slate-800/50 transition-colors duration-500">
            <div v-for="day in visibleStats" :key="day.date" 
                @click="openDetail(day)"
                class="group p-4 flex items-center justify-between hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 transition-colors cursor-pointer"
            >
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center group-hover:bg-white dark:group-hover:bg-slate-700 transition-all shadow-sm">
                        <span class="text-[10px] uppercase font-black text-slate-400 dark:text-slate-600 leading-none">{{ day.dateObj.format('MMM') }}</span>
                        <span class="text-xl font-black leading-none text-slate-700 dark:text-slate-200 mt-0.5 transition-colors duration-500">{{ day.dateObj.format('DD') }}</span>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-slate-700 dark:text-white text-sm capitalize transition-colors duration-500">{{ day.dateObj.format('dddd') }}</h4>
                        
                        <span class="text-[11px] text-slate-400 dark:text-slate-500 font-bold bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700 mt-1 inline-block transition-colors duration-500">
                            {{ $t('transaction_count', { count: day.transactions.length }) }}
                        </span>
                    </div>
                </div>

                <div class="flex items-center gap-6">
                    <div class="pl-4 border-l border-slate-100 dark:border-slate-800 text-right">
                        <span class="block text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-wider">{{ $t('daily_net') }}</span>
                        <span class="text-sm font-black font-mono transition-colors duration-500" :class="(day.total_income - day.total_expense) >= 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-orange-500 dark:text-orange-400'">
                            {{ (day.total_income - day.total_expense) >= 0 ? '+' : '' }}{{ formatMoney(day.total_income - day.total_expense) }}
                        </span>
                    </div>
                    <span class="text-slate-300 dark:text-slate-700 group-hover:text-indigo-400 dark:group-hover:text-indigo-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
            
            <div v-if="!filterDate && visibleStats.length === 5" class="bg-slate-50/50 dark:bg-slate-800/50 p-2.5 text-center border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
                <p class="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">{{ $t('old_data_hint') }}</p>
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