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
    <div class="group relative bg-[#ffffff05] dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 dark:border-slate-800/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-700 overflow-hidden flex flex-col h-full border-b-4" :style="{ borderBottomColor: (saving.color || '#6366f1') }">
        <!-- Floating Glow -->
        <div class="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 transition-opacity duration-1000 group-hover:opacity-30" :style="{ backgroundColor: saving.color || '#6366f1' }"></div>
        
        <!-- Header: Icon & Quick Actions -->
        <div class="p-6 pb-2 flex items-start justify-between relative z-10">
            <div class="w-14 h-14 rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/10 dark:border-white/5 flex items-center justify-center text-3xl shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                {{ saving.icon || '🏦' }}
            </div>
            
            <div class="flex gap-2">
                <button @click="onEdit(saving)" class="w-9 h-9 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all transform hover:scale-110 active:scale-95 shadow-sm">
                    <Edit3 :size="15" />
                </button>
                <button @click="onDelete(saving)" class="w-9 h-9 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all transform hover:scale-110 active:scale-95 shadow-sm">
                    <Trash2 :size="15" />
                </button>
            </div>
        </div>

        <!-- Body: Progress & Stats -->
        <div class="p-6 pt-2 flex flex-col flex-1 relative z-10">
            <div class="mb-4">
                <h3 class="text-lg font-black text-slate-800 dark:text-white truncate pr-2">{{ saving.title }}</h3>
                <div class="flex items-center gap-2 mt-1">
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ progress }}% Reached</p>
                    <div class="h-1 flex-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-full overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-1000 ease-out" 
                             :style="{ width: progress + '%', backgroundColor: saving.color || '#6366f1' }"></div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <span class="text-[8px] font-black text-slate-400 uppercase tracking-tighter opacity-70">Current Balance</span>
                    <p class="text-sm font-black text-slate-800 dark:text-white tabular-nums">{{ formatMoney(saving.current_amount) }}</p>
                </div>
                <div class="text-right">
                    <span class="text-[8px] font-black text-slate-400 uppercase tracking-tighter opacity-70">Target Weight</span>
                    <p class="text-sm font-black text-slate-400 tabular-nums">{{ formatMoney(saving.target_amount) }}</p>
                </div>
            </div>

            <!-- Actions -->
            <div class="mt-auto flex items-center gap-2">
                <button 
                    @click="onDeposit(saving)"
                    class="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 text-white text-[10px] font-black tracking-widest hover:bg-indigo-700 hover:scale-[1.02] shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                >
                    <ArrowDownCircle :size="14" />
                    {{ $t('deposit').toUpperCase() }}
                </button>
                <button 
                    @click="onWithdraw(saving)"
                    class="w-[50px] flex items-center justify-center py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm"
                >
                    <ArrowUpCircle :size="18" />
                </button>
            </div>
        </div>
    </div>
</template>
