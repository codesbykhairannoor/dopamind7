<script setup>
import { ref, onMounted, computed } from 'vue';
import { Line } from 'vue-chartjs';
import { 
    Chart as ChartJS, CategoryScale, LinearScale, 
    PointElement, LineElement, Title, Tooltip, Legend, Filler 
} from 'chart.js';
import { useFinanceChart } from '@/Composables/Finance/useFinanceChart';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import dayjs from 'dayjs';

// Register ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const props = defineProps({ 
    transactions: Array, 
    currentDate: String,
    isExplorer: Boolean
});

// 🔥 Wajib daftarkan emit agar Index.vue bisa mendengarkan klik
const emit = defineEmits(['day-click']);

const isMounted = ref(false);
const { chartData, chartOptions } = useFinanceChart(props);
const { formatMoney } = useFinanceFormat();

// 🔥 MAGIC TRICK: Buat titik di dalam Grafik Line Chart bisa di-klik!
chartOptions.onClick = (event, elements, chart) => {
    if (!elements || elements.length === 0) return;
    
    // elements[0].index adalah index array (hari) dari titik yang di-klik
    const dataIndex = elements[0].index;
    const dayOfMonth = chartData.value.labels[dataIndex]; // dapat tanggal (1, 2, 3...)

    // Bentuk jadi format 'YYYY-MM-DD'
    const rawDate = dayjs(props.currentDate).date(dayOfMonth).format('YYYY-MM-DD');
    handleDateClick(rawDate);
};

// Ubah kursor jadi 'pointer' saat hover di atas titik grafik biar user tau bisa diklik
chartOptions.onHover = (event, chartElement) => {
    event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
};

onMounted(() => {
    isMounted.value = true;
});

// 🔥 HANDLER KLIK (Rekonstruksi Data agar 100% sama dengan visibleStats History)
const handleDateClick = (rawDate) => {
    if (!rawDate || rawDate === '-') return;

    // Filter transaksi di tanggal yang diklik
    const dayTrx = props.transactions.filter(t => t.date === rawDate);

    // Kalau di tanggal itu kosong (gak ada transaksi), hentikan fungsi (gak usah buka modal)
    if (dayTrx.length === 0) return;

    const totalInc = dayTrx.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExp = dayTrx.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);

    // Lempar payload ke Index.vue untuk ditangkap fungsi openDetail
    emit('day-click', {
        date: rawDate,
        dateObj: dayjs(rawDate), // Samakan persis dengan buatan useFinanceHistory
        transactions: dayTrx,
        total_income: totalInc,
        total_expense: totalExp
    });
};

// 🔥 LOGIC ANALISA PINTAR (Insight Bulanan)
const monthInsights = computed(() => {
    if (!props.transactions || props.transactions.length === 0) return null;

    let totalOut = 0;
    let trxCountByDate = {};
    let expenseByDate = {};

    props.transactions.forEach(t => {
        trxCountByDate[t.date] = (trxCountByDate[t.date] || 0) + 1;
        if (t.type === 'expense') {
            totalOut += Number(t.amount);
            expenseByDate[t.date] = (expenseByDate[t.date] || 0) + Number(t.amount);
        }
    });

    let busiestDate = { date: '-', count: 0 };
    for (const [date, count] of Object.entries(trxCountByDate)) {
        if (count > busiestDate.count) {
            busiestDate = { date, count };
        }
    }

    let highestExpenseDay = { date: '-', amount: 0 };
    for (const [date, amount] of Object.entries(expenseByDate)) {
        if (amount > highestExpenseDay.amount) {
            highestExpenseDay = { date, amount };
        }
    }

    const targetDate = dayjs(props.currentDate);
    const isCurrentMonth = targetDate.isSame(dayjs(), 'month');
    const daysDivisor = isCurrentMonth ? dayjs().date() : targetDate.daysInMonth();
    const safeDivisor = daysDivisor > 0 ? daysDivisor : 1;
    const avgSpend = totalOut / safeDivisor;

    return {
        busiestDateRaw: busiestDate.date, 
        busiestDate: busiestDate.date !== '-' ? dayjs(busiestDate.date).format('DD MMM') : '-',
        busiestCount: busiestDate.count,
        
        highestExpenseDateRaw: highestExpenseDay.date,
        highestExpenseDate: highestExpenseDay.date !== '-' ? dayjs(highestExpenseDay.date).format('DD MMM') : '-',
        highestExpenseAmount: highestExpenseDay.amount,
        
        avgSpend
    };
});
</script>

<template>
    <div class="relative group">
        <!-- Explorer Lock Overlay -->
        <div v-if="isExplorer" 
             @click="$inertia.get(route('pricing.index'), { from: 'finance_chart' })"
             class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/20 dark:bg-slate-900/20 backdrop-blur-md rounded-[2rem] border border-slate-200 dark:border-slate-800 cursor-pointer group-hover:bg-white/40 dark:group-hover:bg-slate-900/40 transition-all duration-500">
            <div class="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-3xl mb-4 border border-slate-100 dark:border-slate-700">🔒</div>
            <h4 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest tracking-tighter">Advanced Analytics</h4>
            <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">Upgrade to Architect to unlock Trends</p>
        </div>

        <div class="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 transition-all duration-500">
        
        <div class="flex justify-between items-start mb-6">
            <div>
                <h3 class="font-black text-slate-800 dark:text-white text-sm md:text-base uppercase tracking-wider transition-colors duration-500">{{ $t('finance_trend', 'Trend Keuangan') }}</h3>
                <p class="text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-tight mt-1 transition-colors duration-500">{{ $t('daily_chart', 'Grafik 30 Hari') }}</p>
            </div>
            
            <div class="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-500/20 transition-colors duration-500">
                <span class="flex h-2 w-2 relative">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span class="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{{ $t('status_active', 'Active') }}</span>
            </div>
        </div>

        <div class="relative w-full overflow-x-auto overflow-y-hidden custom-scrollbar pb-2 mb-6">
            <div class="h-[280px] min-w-[600px] md:min-w-full relative">
                <Line v-if="isMounted" :data="chartData" :options="chartOptions" />

                <div v-else class="absolute inset-0 w-full h-full bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-3 animate-pulse transition-colors duration-500">
                    <div class="flex gap-2 items-end h-32 opacity-50">
                        <div class="w-4 bg-indigo-200 dark:bg-indigo-900 h-10 rounded-t-sm"></div>
                        <div class="w-4 bg-indigo-200 dark:bg-indigo-900 h-20 rounded-t-sm"></div>
                        <div class="w-4 bg-indigo-300 dark:bg-indigo-800 h-16 rounded-t-sm"></div>
                        <div class="w-4 bg-indigo-400 dark:bg-indigo-700 h-24 rounded-t-sm"></div>
                        <div class="w-4 bg-indigo-300 dark:bg-indigo-800 h-12 rounded-t-sm"></div>
                    </div>
                    <span class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] transition-colors duration-500">{{ $t('preparing_analytics', 'Preparing Analytics...') }}</span>
                </div>
            </div>
        </div>

        <div v-if="monthInsights" class="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-slate-100 dark:border-slate-800 pt-6 mt-2 transition-colors duration-500">
            
            <div class="bg-slate-50/70 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col justify-center transition-colors duration-500">
                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1 transition-colors duration-500">{{ $t('avg_daily_spend', 'Rata-Rata Harian') }}</span>
                <h4 class="text-sm font-black text-slate-700 dark:text-slate-200 transition-colors duration-500">{{ formatMoney(monthInsights.avgSpend) }} <span class="text-[10px] font-bold text-slate-400 dark:text-slate-600">{{ $t('per_day', '/ hari') }}</span></h4>
            </div>

            <div @click="handleDateClick(monthInsights.highestExpenseDateRaw)" 
                class="bg-rose-50/50 dark:bg-rose-500/10 p-4 rounded-2xl border border-rose-100/50 dark:border-rose-500/20 flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all duration-300">
                <div class="relative z-10">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-[10px] font-bold text-rose-400 dark:text-rose-400/80 uppercase tracking-widest transition-colors duration-500">{{ $t('most_wasteful', 'Paling Boros') }}</span>
                        <span class="text-[9px] bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-500/30 text-rose-500 dark:text-rose-400 font-bold px-1.5 py-0.5 rounded shadow-sm dark:shadow-none transition-colors duration-500">{{ monthInsights.highestExpenseDate }}</span>
                    </div>
                    <h4 class="text-sm font-black text-rose-600 dark:text-rose-400 transition-colors duration-500">{{ formatMoney(monthInsights.highestExpenseAmount) }}</h4>
                </div>
                <span class="absolute right-2 bottom-0 text-3xl opacity-[0.05] group-hover:scale-110 transition-transform">📉</span>
            </div>

            <div @click="handleDateClick(monthInsights.busiestDateRaw)" 
                class="bg-emerald-50/50 dark:bg-emerald-500/10 p-4 rounded-2xl border border-emerald-100/50 dark:border-emerald-500/20 flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all duration-300">
                <div class="relative z-10">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-[10px] font-bold text-emerald-500/70 dark:text-emerald-400/80 uppercase tracking-widest transition-colors duration-500">{{ $t('busiest_day', 'Paling Sibuk') }}</span>
                        <span class="text-[9px] bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded shadow-sm dark:shadow-none transition-colors duration-500">{{ monthInsights.busiestDate }}</span>
                    </div>
                    <h4 class="text-sm font-black text-emerald-700 dark:text-emerald-400 transition-colors duration-500">{{ monthInsights.busiestCount }} {{ $t('transactions_count', 'Transaksi') }}</h4>
                </div>
                <span class="absolute right-2 bottom-0 text-3xl opacity-[0.05] group-hover:scale-110 transition-transform">⚡</span>
            </div>

        </div>
    </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #334155; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #475569; }
</style>