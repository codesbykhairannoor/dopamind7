<script setup>
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    budgets: Array,
    expenseStats: Object
});

// 🔥 TAMBAH INI: Biar bisa kirim sinyal klik ke parent
const emit = defineEmits(['add']);

const { formatRupiah, getCategoryDetails } = useFinanceFormat();

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
    <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit sticky top-6">
        <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-slate-800">Budgeting</h3>
            
            <button 
                @click="$emit('add')" 
                class="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition"
            >
                + Set
            </button>
        </div>

        <div v-if="budgets.length === 0" class="text-center py-4">
            <p class="text-xs text-slate-400">Belum ada budget yang diatur.</p>
        </div>

        <div class="space-y-6">
            <div v-for="budget in budgets" :key="budget.id">
                <div class="flex justify-between text-sm mb-1">
                    <div class="flex items-center gap-2">
                        <span>{{ getCategoryDetails(budget.category).icon }}</span>
                        <span class="font-bold text-slate-700 capitalize">{{ budget.category }}</span>
                    </div>
                    <span class="text-slate-400 text-xs">
                        {{ formatRupiah(props.expenseStats[budget.category] || 0) }} / {{ formatRupiah(budget.limit_amount) }}
                    </span>
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