<script setup>
import { ref, computed } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    budgets: Array,
    categories: Array, 
    expenseStats: Object,
    incomeStats: Object 
});

const emit = defineEmits(['add', 'delete-budget', 'edit-budget', 'add-category', 'edit-category', 'delete-category']);

const { formatMoney, getCategoryDetails } = useFinanceFormat();
const getCat = (slug) => getCategoryDetails(slug, props.categories);
const activeTab = ref('expense');

// Menghitung Total Income
const incomeList = computed(() => {
    return props.categories
        .filter(c => c.type === 'income')
        .map(cat => ({
            ...cat,
            amount: props.incomeStats[cat.slug] || 0
        }))
        .sort((a, b) => b.amount - a.amount);
});

// Fitur Baru: Menghitung Total Keseluruhan Budget
const totalBudget = computed(() => {
    return props.budgets.reduce((sum, b) => sum + Number(b.limit_amount), 0);
});

// Fitur Baru: Menghitung Total Pengeluaran dari Kategori yang Diberi Budget
const totalBudgetExpense = computed(() => {
    return props.budgets.reduce((sum, b) => sum + Number(props.expenseStats[b.category] || 0), 0);
});

const getProgress = (cat, limit) => limit > 0 ? Math.min(((props.expenseStats[cat]||0)/limit)*100, 100) : 0;
const getBarColor = (p) => p > 90 ? 'bg-rose-500' : p > 75 ? 'bg-orange-500' : 'bg-indigo-500';
</script>

<template>
    <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 shadow-sm h-fit flex flex-col gap-6">
        
        <div class="flex p-1 bg-slate-50 rounded-xl border border-slate-100">
            <button @click="activeTab = 'expense'" class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all" :class="activeTab === 'expense' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">{{ $t('expense') }}</button>
            <button @click="activeTab = 'income'" class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all" :class="activeTab === 'income' ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">{{ $t('income') }}</button>
        </div>

        <div v-if="activeTab === 'expense'" class="space-y-6">
            
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-slate-800 text-sm">{{ $t('budget_target') }}</h3>
                <button @click="$emit('add')" class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition">+ {{ $t('set_budget') }}</button>
            </div>

            <div v-if="budgets.length === 0" class="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <span class="text-2xl block mb-2">🎯</span>
                {{ $t('no_budget') }}
            </div>
            
            <div v-else class="space-y-4">
                
                <div class="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 flex justify-between items-center shadow-inner">
                    <div class="flex flex-col">
                        <span class="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Total Budget</span>
                        <span class="text-sm font-black text-slate-700 mt-0.5">{{ formatMoney(totalBudget) }}</span>
                    </div>
                    <div class="text-right flex flex-col">
                        <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Terpakai</span>
                        <span class="text-sm font-black mt-0.5" :class="totalBudgetExpense > totalBudget ? 'text-rose-500' : 'text-indigo-600'">
                            {{ formatMoney(totalBudgetExpense) }}
                        </span>
                    </div>
                </div>

                <div class="space-y-3">
                    <div v-for="b in budgets" :key="b.id" class="relative pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                        
                        <div class="flex justify-between items-end text-sm mb-2">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 shadow-sm flex items-center justify-center text-sm">
                                    {{ getCat(b.category).icon }}
                                </div>
                                <div class="flex flex-col">
                                    <span class="font-bold text-slate-700 capitalize text-sm leading-tight">{{ getCat(b.category).name }}</span>
                                    <span class="text-[10px] font-bold text-slate-400 mt-0.5">
                                        {{ formatMoney(props.expenseStats[b.category]||0) }} / {{ formatMoney(b.limit_amount) }}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="flex flex-col items-end gap-1">
                                <div class="flex gap-1">
                                    <button @click="$emit('edit-budget', b)" class="text-[10px] font-bold text-indigo-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 px-1.5 py-0.5 rounded transition">✏️{{ $t('edit') }}</button>
                                    <button @click="$emit('delete-budget', b.id)" class="text-[10px] font-bold text-rose-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 px-1.5 py-0.5 rounded transition">🗑️{{ $t('delete') }}</button>
                                </div>
                                <span class="text-[10px] font-black font-mono" :class="getProgress(b.category, b.limit_amount) > 90 ? 'text-rose-500' : 'text-slate-400'">
                                    {{ Math.round(getProgress(b.category, b.limit_amount)) }}%
                                </span>
                            </div>
                        </div>
                        
                        <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner relative">
                            <div class="absolute top-0 left-0 h-full transition-all duration-1000 rounded-full" 
                                 :class="getBarColor(getProgress(b.category, b.limit_amount))" 
                                 :style="{ width: `${getProgress(b.category, b.limit_amount)}%` }">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div v-if="activeTab === 'income'" class="space-y-4">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-slate-800 text-sm">{{ $t('fund_source') }}</h3>
                <button @click="$emit('add-category')" class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition">+ {{ $t('add_category') }}</button>
            </div>

            <div v-if="incomeList.length === 0" class="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 bg-slate-50/50 rounded-xl">
                <span class="text-2xl block mb-2">💸</span>
                {{ $t('no_fund_source') }}
            </div>

            <div v-else class="space-y-3">
                <div v-for="item in incomeList" :key="item.id" class="flex justify-between items-center pb-3 border-b border-slate-100 last:border-0 last:pb-0 relative">
                    
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shadow-inner border border-emerald-100">{{ item.icon }}</div>
                        <div class="flex flex-col">
                            <span class="font-bold text-slate-700 capitalize text-sm">{{ item.name }}</span>
                            <span class="text-[10px] text-slate-400 font-medium">{{ item.amount > 0 ? $t('active') : $t('empty') }}</span>
                        </div>
                    </div>
                    
                    <div class="flex flex-col items-end gap-1">
                        <span class="font-black text-emerald-600 text-sm tracking-wide">+{{ formatMoney(item.amount) }}</span>
                        
                        <div class="flex gap-1">
                            <button @click="$emit('edit-category', item)" class="text-[10px] font-bold text-indigo-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 px-1.5 py-0.5 rounded transition">✏️{{ $t('edit') }}</button>
                            <button @click="$emit('delete-category', item)" class="text-[10px] font-bold text-rose-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 px-1.5 py-0.5 rounded transition">🗑️{{ $t('delete') }}</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>