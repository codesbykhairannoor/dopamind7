<script setup>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useFinanceChart } from '@/Composables/Finance/useFinanceChart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const props = defineProps({ transactions: Array, currentDate: String });

const { chartData, chartOptions } = useFinanceChart(props);
</script>

<template>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 w-full mt-8">
        <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-slate-700 text-sm uppercase tracking-wider">{{ $t('finance_trend') }}</h3>
            <span class="text-xs text-slate-400">{{ $t('daily_chart') }}</span>
        </div>
        <div class="h-[300px] w-full">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>