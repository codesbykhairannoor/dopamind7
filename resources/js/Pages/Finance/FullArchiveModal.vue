<script setup>
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import Modal from '@/Components/Modal.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    show: Boolean,
    allStats: Array, 
    categories: Array, 
    close: Function,
    onDelete: Function,
    onEdit: Function 
});

const { formatMoney, getCategoryDetails } = useFinanceFormat();
const searchQuery = ref('');

// Filter berdasarkan pencarian judul/kategori
const filteredStats = computed(() => {
    if (!searchQuery.value) return props.allStats;
    
    const query = searchQuery.value.toLowerCase();
    return props.allStats.map(day => {
        const matchingTrx = day.transactions.filter(t => 
            t.title.toLowerCase().includes(query) || 
            t.category.toLowerCase().includes(query)
        );
        
        if (matchingTrx.length > 0) {
            return { ...day, transactions: matchingTrx };
        }
        return null;
    }).filter(day => day !== null);
});

const totalIncome = computed(() => props.allStats.reduce((sum, d) => sum + d.total_income, 0));
const totalExpense = computed(() => props.allStats.reduce((sum, d) => sum + d.total_expense, 0));

const handleEditAction = (trx) => {
    props.close();
    props.onEdit(trx);
};
</script>

<template>
    <Modal :show="show" @close="close" maxWidth="2xl">
        <div class="bg-slate-50 dark:bg-slate-950 flex flex-col max-h-[90vh] overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-none transition-all duration-500">
            
            <!-- Header Modal -->
            <div class="p-6 md:p-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 transition-colors duration-500">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h3 class="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1 transition-colors duration-500">
                            {{ $t('daily_history') }}
                        </h3>
                        <p class="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">{{ $t('monthly_finance_desc') }}</p>
                    </div>
                    <button @click="close" class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold">
                        ✕
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
                        <span class="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">Total {{ $t('income') }}</span>
                        <span class="text-lg font-black text-emerald-700 dark:text-emerald-300 font-mono">{{ formatMoney(totalIncome) }}</span>
                    </div>
                    <div class="bg-rose-50 dark:bg-rose-500/10 p-3 rounded-2xl border border-rose-100 dark:border-rose-500/20">
                        <span class="text-[9px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-1">Total {{ $t('expense') }}</span>
                        <span class="text-lg font-black text-rose-700 dark:text-rose-300 font-mono">{{ formatMoney(totalExpense) }}</span>
                    </div>
                </div>

                <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <OneForMindIcon name="search" size="18" stroke-width="3" />
                    </span>
                    <input 
                        v-model="searchQuery"
                        type="text" 
                        placeholder="Cari transaksi atau kategori..." 
                        class="w-full pl-12 pr-4 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500 focus:ring-0 font-bold text-sm text-slate-700 dark:text-slate-200 transition-all placeholder:text-slate-400 placeholder:font-medium"
                    />
                </div>
            </div>

            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto custom-scrollbar p-0">
                <div v-if="filteredStats.length === 0" class="py-20 text-center">
                    <span class="text-5xl block mb-4">🔍</span>
                    <p class="text-slate-400 font-bold">{{ searchQuery ? 'Tidak ada transaksi yang cocok' : 'Belum ada data' }}</p>
                </div>

                <div v-else class="divide-y divide-slate-100 dark:divide-slate-800/50">
                    <div v-for="day in filteredStats" :key="day.date" class="px-6 md:px-8 py-6 bg-white dark:bg-slate-900 group transition-colors duration-500">
                        <!-- Date Header inside List -->
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center shadow-sm">
                                    <span class="text-[9px] uppercase font-black text-slate-400 leading-none">{{ day.dateObj.format('MMM') }}</span>
                                    <span class="text-lg font-black leading-none text-slate-700 dark:text-slate-200 mt-0.5">{{ day.dateObj.format('DD') }}</span>
                                </div>
                                <h4 class="font-black text-slate-800 dark:text-white capitalize transition-colors duration-500">{{ day.dateObj.format('dddd, D MMMM') }}</h4>
                            </div>
                            <div class="text-right">
                                <span class="text-[10px] font-black font-mono" :class="(day.total_income - day.total_expense) >= 0 ? 'text-emerald-500' : 'text-rose-500'">
                                    {{ (day.total_income - day.total_expense) >= 0 ? '+' : '' }}{{ formatMoney(day.total_income - day.total_expense) }}
                                </span>
                            </div>
                        </div>

                        <!-- Inner Transaction Rows -->
                        <div class="space-y-1 ml-1">
                            <div v-for="trx in day.transactions" :key="trx.id" class="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-indigo-500/5 transition-all group/row relative">
                                <div class="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 bg-slate-50 dark:bg-slate-800 group-hover/row:bg-white transition-colors duration-300">
                                    {{ getCategoryDetails(trx.category, categories).icon }}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="font-bold text-slate-700 dark:text-slate-200 text-xs truncate transition-colors duration-500">{{ trx.title }}</p>
                                    <p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">{{ getCategoryDetails(trx.category, categories).name }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-bold text-xs font-mono" :class="trx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-white'">
                                        {{ trx.type === 'income' ? '+' : '-' }}{{ formatMoney(trx.amount) }}
                                    </p>
                                </div>
                                
                                <!-- Floating Actions -->
                                <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm pl-2 rounded-lg">
                                    <button @click="handleEditAction(trx)" class="p-1.5 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition-all">
                                        <OneForMindIcon name="edit" size="14" stroke-width="2.5" />
                                    </button>
                                    <button @click="onDelete(trx.id)" class="p-1.5 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-all">
                                        <OneForMindIcon name="trash" size="14" stroke-width="2.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center shrink-0 transition-colors duration-500">
                <p class="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">{{ $t('status_active', 'Arsip Digital Aktif') }}</p>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #334155; }
</style>
