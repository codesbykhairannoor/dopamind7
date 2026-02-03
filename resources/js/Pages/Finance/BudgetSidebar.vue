<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    budgets: Array,
    expenseStats: Object
});

const emit = defineEmits(['add', 'delete-budget', 'edit-budget']);
const { formatRupiah, getCategoryDetails } = useFinanceFormat();

const refreshCounter = ref(0);
onMounted(() => {
    const handler = () => refreshCounter.value += 1;
    window.addEventListener('finance:custom-updated', handler);
    window.__finance_budget_sidebar_handler = handler;
});
onUnmounted(() => {
    const h = window.__finance_budget_sidebar_handler;
    if (h) window.removeEventListener('finance:custom-updated', h);
    delete window.__finance_budget_sidebar_handler;
});

const getProgress = (category, limit) => {
    const used = props.expenseStats[category] || 0;
    const percent = (used / limit) * 100;
    return Math.min(percent, 100);
};

const getBarColor = (percent) => {
    if(percent > 90) return 'bg-rose-500';
    if(percent > 75) return 'bg-orange-500';
    return 'bg-indigo-500';
};
</script>

<template>
    <div :key="refreshCounter" class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit sticky top-6">
        <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-slate-800">Budgeting</h3>
            <button @click="$emit('add')" class="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition">+ Set</button>
        </div>

        <div v-if="budgets.length === 0" class="text-center py-4">
            <p class="text-xs text-slate-400">Belum ada budget yang diatur.</p>
        </div>

        <div class="space-y-6">
            <div v-for="budget in budgets" :key="budget.id" class="group">
                <div class="flex justify-between text-sm mb-1 items-start">
                    <div class="flex items-center gap-2">
                        <span>{{ getCategoryDetails(budget.category).icon }}</span>
                        <div class="flex flex-col">
                            <span class="font-bold text-slate-700 capitalize leading-none">{{ getCategoryDetails(budget.category).name || budget.category }}</span>
                            <div class="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button @click="$emit('edit-budget', budget)" class="text-[10px] text-indigo-500 hover:text-indigo-700 font-bold uppercase">Edit</button>
                                <span class="text-[10px] text-slate-200">|</span>
                                <button @click="$emit('delete-budget', budget.id)" class="text-[10px] text-rose-400 hover:text-rose-600 font-bold uppercase">Hapus</button>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="text-slate-400 text-[10px] block">
                            {{ formatRupiah(props.expenseStats[budget.category] || 0) }} / {{ formatRupiah(budget.limit_amount) }}
                        </span>
                    </div>
                </div>
                
                <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        class="h-full transition-all duration-1000 ease-out rounded-full"
                        :class="getBarColor(getProgress(budget.category, budget.limit_amount))"
                        :style="{ width: `${getProgress(budget.category, budget.limit_amount)}%` }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>