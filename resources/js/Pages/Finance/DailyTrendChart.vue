<script setup>
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend, 
    Filler 
} from 'chart.js';
import { useFinanceChart } from '@/Composables/Finance/useFinanceChart';

// Register ChartJS tetap di luar tidak apa-apa karena ini hanya mendaftarkan class/plugin
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const props = defineProps({ 
    transactions: Array, 
    currentDate: String 
});

// State untuk mengecek apakah sudah di-mount di browser
const isMounted = ref(false);

// Composable tetap dipanggil di setup, tapi pastikan isinya tidak nembak window secara langsung
const { chartData, chartOptions } = useFinanceChart(props);

onMounted(() => {
    isMounted.value = true;
});
</script>

<template>
    <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 w-full mt-8">
        <div class="flex justify-between items-center mb-6 px-2">
            <div>
                <h3 class="font-black text-slate-800 text-sm uppercase tracking-wider">{{ $t('finance_trend') }}</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">{{ $t('daily_chart') }}</p>
            </div>
            
            <div class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Live</span>
            </div>
        </div>

        <div class="relative h-[300px] w-full">
            <Line v-if="isMounted" :data="chartData" :options="chartOptions" />

            <div v-else class="absolute inset-0 w-full h-full bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 animate-pulse">
                <div class="flex gap-2 items-end h-32">
                    <div class="w-4 bg-slate-200 h-10 rounded-t-sm"></div>
                    <div class="w-4 bg-slate-200 h-20 rounded-t-sm"></div>
                    <div class="w-4 bg-slate-200 h-16 rounded-t-sm"></div>
                    <div class="w-4 bg-slate-200 h-24 rounded-t-sm"></div>
                    <div class="w-4 bg-slate-200 h-12 rounded-t-sm"></div>
                </div>
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Preparing Analytics...</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Transisi halus saat chart muncul */
.chart-fade-enter-active {
    transition: opacity 0.5s ease;
}
.chart-fade-enter-from {
    opacity: 0;
}
</style>