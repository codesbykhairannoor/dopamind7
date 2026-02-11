<script setup>
import { ref, computed } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    budgets: Array,
    categories: Array, 
    expenseStats: Object,
    incomeStats: Object 
});

// Tambahkan emit category
const emit = defineEmits(['add', 'delete-budget', 'edit-budget', 'add-category', 'edit-category', 'delete-category']);

const { formatMoney, getCategoryDetails } = useFinanceFormat();
const getCat = (slug) => getCategoryDetails(slug, props.categories);
const activeTab = ref('expense');

// Hapus state modal internal (showCategoryModal, incomeToEdit) karena dipindah ke Parent

const incomeList = computed(() => {
    return props.categories
        .filter(c => c.type === 'income')
        .map(cat => ({
            ...cat,
            amount: props.incomeStats[cat.slug] || 0
        }))
        .sort((a, b) => b.amount - a.amount);
});

const getProgress = (cat, limit) => limit > 0 ? Math.min(((props.expenseStats[cat]||0)/limit)*100, 100) : 0;
const getBarColor = (p) => p > 90 ? 'bg-rose-500' : p > 75 ? 'bg-orange-500' : 'bg-indigo-500';
</script>

<template>
    <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit sticky top-6 flex flex-col gap-6">
        
        <div class="flex p-1 bg-slate-50 rounded-xl border border-slate-100">
            <button @click="activeTab = 'expense'" class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all" :class="activeTab === 'expense' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">{{ $t('expense') }}</button>
            <button @click="activeTab = 'income'" class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all" :class="activeTab === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">{{ $t('income') }}</button>
        </div>

        <div v-if="activeTab === 'expense'" class="space-y-6">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-slate-800 text-sm">{{ $t('budget_target') }}</h3>
                <button @click="$emit('add')" class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100">+ {{ $t('set_budget') }}</button>
            </div>

            <div v-if="budgets.length === 0" class="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">{{ $t('no_budget') }}</div>
            
            <div v-else class="space-y-5">
                <div v-for="b in budgets" :key="b.id" class="group">
                    <div class="flex justify-between text-sm mb-1">
                        <div class="flex items-center gap-2">
                            <span>{{ getCat(b.category).icon }}</span>
                            <span class="font-bold text-slate-700 capitalize text-xs">{{ getCat(b.category).name }}</span>
                        </div>
                        <span class="text-[10px] text-slate-400">{{ formatMoney(props.expenseStats[b.category]||0) }} / {{ formatMoney(b.limit_amount) }}</span>
                    </div>
                    <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full transition-all duration-1000 rounded-full" :class="getBarColor(getProgress(b.category, b.limit_amount))" :style="{ width: `${getProgress(b.category, b.limit_amount)}%` }"></div>
                    </div>
                    <div class="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-all">
                         <button @click="$emit('edit-budget', b)" class="text-[10px] text-indigo-500 font-bold hover:underline">{{ $t('edit') }}</button>
                         <button @click="$emit('delete-budget', b.id)" class="text-[10px] text-rose-500 font-bold hover:underline">{{ $t('delete') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="activeTab === 'income'" class="space-y-4">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-slate-800 text-sm">{{ $t('fund_source') }}</h3>
                <button @click="$emit('add-category')" class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">+ {{ $t('add_category') }}</button>
            </div>

            <div v-if="incomeList.length === 0" class="text-center py-8 text-xs text-slate-400 border border-dashed rounded-xl">{{ $t('no_fund_source') }}</div>

            <div v-else class="space-y-3">
                <div v-for="item in incomeList" :key="item.id" class="flex justify-between items-center p-3 bg-white rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all group">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shadow-inner">{{ item.icon }}</div>
                        <div class="flex flex-col">
                            <span class="font-bold text-slate-700 capitalize text-xs">{{ item.name }}</span>
                            <span class="text-[10px] text-slate-400">{{ item.amount > 0 ? $t('active') : $t('empty') }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-black text-emerald-600 text-sm">+{{ formatMoney(item.amount) }}</span>
                        
                        <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button @click="$emit('edit-category', item)" class="p-1 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Edit">✎</button>
                            <button @click="$emit('delete-category', item)" class="p-1 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Hapus">✕</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
</template>