<script setup>
import { computed } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import { TrendingUp, ArrowDownCircle, ArrowUpCircle, Trash2, Edit3 } from 'lucide-vue-next';

const props = defineProps({
    saving: Object,
    onDeposit: Function,
    onWithdraw: Function,
    onEdit: Function,
    onDelete: Function
});

const { formatMoney } = useFinanceFormat();

const progress = computed(() => {
    if (!props.saving.target_amount || props.saving.target_amount <= 0) return 0;
    return Math.min(100, Math.round((props.saving.current_amount / props.saving.target_amount) * 100));
});

const remaining = computed(() => {
    return Math.max(0, props.saving.target_amount - props.saving.current_amount);
});
</script>

<template>
    <div class="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden flex flex-col h-full">
        <!-- Header: Visual & Title -->
        <div class="relative h-32 shrink-0 overflow-hidden" :style="{ backgroundColor: (saving.color || '#6366f1') + '10' }">
            <div class="absolute inset-0 opacity-20" :style="{ background: `radial-gradient(circle at top right, ${saving.color || '#6366f1'}, transparent)` }"></div>
            
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/50 dark:border-white/10 flex items-center justify-center text-3xl shadow-xl transform group-hover:scale-110 transition-transform duration-500">
                    {{ saving.icon || '🏦' }}
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button @click="onEdit(saving)" class="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors shadow-sm">
                    <Edit3 :size="14" />
                </button>
                <button @click="onDelete(saving.id)" class="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-sm">
                    <Trash2 :size="14" />
                </button>
            </div>
        </div>

        <!-- Body: Progress & Stats -->
        <div class="p-6 flex flex-col flex-1">
            <div class="mb-4">
                <h3 class="text-lg font-black text-slate-800 dark:text-white truncate mb-1">{{ saving.title }}</h3>
                <p class="text-[10px] font-bold text-slate-400 tracking-wide">{{ progress }}% of {{ formatMoney(saving.target_amount) }}</p>
            </div>

            <!-- Progress Bar -->
            <div class="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full mb-6 overflow-hidden p-0.5">
                <div 
                    class="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                    :style="{ width: progress + '%', backgroundColor: saving.color || '#6366f1' }"
                ></div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="flex flex-col">
                    <span class="text-[8px] font-bold text-slate-400 tracking-tighter">Current</span>
                    <span class="text-sm font-black text-slate-800 dark:text-white tabular-nums">{{ formatMoney(saving.current_amount) }}</span>
                </div>
                <div class="flex flex-col text-right">
                    <span class="text-[8px] font-bold text-slate-400 tracking-tighter">Left to reach</span>
                    <span class="text-sm font-black text-rose-500 dark:text-rose-400 tabular-nums">{{ formatMoney(remaining) }}</span>
                </div>
            </div>

            <!-- Actions -->
            <div class="mt-auto grid grid-cols-2 gap-3">
                <button 
                    @click="onDeposit(saving)"
                    class="flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold tracking-widest hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
                >
                    <ArrowDownCircle :size="14" />
                    Deposit
                </button>
                <button 
                    @click="onWithdraw(saving)"
                    class="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
                >
                    <ArrowUpCircle :size="14" />
                    Withdraw
                </button>
            </div>
        </div>
    </div>
</template>
