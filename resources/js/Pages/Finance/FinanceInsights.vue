<script setup>
import { computed } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import dayjs from 'dayjs';

const props = defineProps({
    transactions: { type: Array, default: () => [] },
    expenseStats: { type: Object, default: () => ({}) },
    incomeStats: { type: Object, default: () => ({}) },
    budgets: { type: Array, default: () => [] }
});

const { formatMoney } = useFinanceFormat();

// --- LOGIC 1: BURN RATE (Kecepatan Ngabisin Duit) ---
const burnRate = computed(() => {
    const today = dayjs();
    const daysPassed = today.date() || 1; // Anti bagi nol
    
    // Hitung total pengeluaran dari object stats
    const totalExpense = Object.values(props.expenseStats).reduce((a, b) => Number(a) + Number(b), 0) || 0;
    const avgDaily = totalExpense / daysPassed;
    
    // Hitung rata-rata budget ideal per hari
    const totalLimit = props.budgets.reduce((a, b) => a + Number(b.limit_amount), 0) || 0;
    const idealDaily = totalLimit / (today.daysInMonth() || 30);
    
    const isOverSpeed = avgDaily > idealDaily;
    const diff = idealDaily > 0 ? Math.abs(Math.round(((avgDaily - idealDaily) / idealDaily) * 100)) : 0;
    
    return { avgDaily, idealDaily, isOverSpeed, diffPercent: diff || 0 };
});

// --- LOGIC 2: UANG DINGIN (Potensi Investasi) ---
const milestone = computed(() => {
    const totalIn = Object.values(props.incomeStats).reduce((a, b) => Number(a) + Number(b), 0) || 0;
    const totalOut = Object.values(props.expenseStats).reduce((a, b) => Number(a) + Number(b), 0) || 0;
    
    const moneyLeft = totalIn - totalOut; // Ini "Uang Dingin" lu
    const target = 5000000; // Target tabungan (Bisa lu ubah sesuka hati)
    const progress = target > 0 ? Math.min(Math.round((moneyLeft / target) * 100), 100) : 0;
    
    return { 
        savings: Math.max(0, moneyLeft), // Kalau minus tampilin 0
        progress: Math.max(0, progress), 
        target 
    };
});
</script>

<template>
    <div class="mt-6 space-y-4">
        
        <div class="bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 shadow-sm relative overflow-hidden group">
            <div class="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-500 rounded-r-full"></div>

            <div class="relative z-10">
                <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                    {{ $t('insight_radar_title') }}
                </h3>

                <div class="flex items-baseline gap-2 mb-1">
                    <h4 class="text-2xl font-black text-slate-800 tracking-tighter">{{ formatMoney(burnRate.avgDaily) }}</h4>
                    <span class="text-[10px] font-bold text-slate-400 uppercase">/ {{ $t('insight_day_suffix') }}</span>
                </div>

                <p class="text-[10px] font-bold mb-4" :class="burnRate.isOverSpeed ? 'text-rose-500' : 'text-emerald-500'">
                    {{ burnRate.isOverSpeed ? $t('insight_status_fast') : $t('insight_status_safe') }}
                </p>

                <div class="space-y-2 pt-2 border-t border-slate-50">
                    <div class="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                        <span>{{ $t('insight_efficiency_label') }}</span>
                        <span :class="burnRate.isOverSpeed ? 'text-rose-500' : 'text-indigo-600'">
                            {{ burnRate.isOverSpeed ? '+' : '-' }}{{ burnRate.diffPercent }}% {{ $t('insight_target_diff') }}
                        </span>
                    </div>
                    <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-indigo-500 transition-all duration-1000" :style="{ width: Math.min(burnRate.diffPercent, 100) + '%' }"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-indigo-600 rounded-[2.5rem] p-7 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group transition-all hover:-translate-y-1">
            <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000"></div>

            <div class="relative z-10">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <p class="text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                            {{ $t('insight_cold_money_label') }}
                        </p>
                        <h4 class="text-xl font-black tracking-tighter">{{ formatMoney(milestone.savings) }}</h4>
                    </div>
                    <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl border border-white/20 shadow-inner">
                        💹
                    </div>
                </div>

                <div class="space-y-2">
                    <div class="flex justify-between items-end">
                        <span class="text-[9px] font-black uppercase tracking-widest text-indigo-200">
                            {{ $t('insight_milestone_label') }}
                        </span>
                        <span class="text-xs font-black">{{ milestone.progress }}%</span>
                    </div>
                    <div class="h-2 w-full bg-indigo-900/40 rounded-full overflow-hidden p-0.5">
                        <div class="h-full bg-yellow-400 rounded-full transition-all duration-1000" :style="{ width: milestone.progress + '%' }"></div>
                    </div>
                </div>

                <p class="mt-5 text-[9px] text-indigo-200 font-bold italic leading-relaxed opacity-80 uppercase tracking-tighter">
                    {{ $t('insight_cold_money_hint') }}
                </p>
            </div>
        </div>
    </div>
</template>