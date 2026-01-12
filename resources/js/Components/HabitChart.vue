<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// 👇 PERBAIKAN DISINI: Kasih Default Value '[]' biar gak undefined
const props = defineProps({
    habits: {
        type: Array,
        default: () => [] 
    },
    dates: {
        type: Array,
        default: () => [] // Ini penyelamatnya!
    }
});

const chartData = computed(() => {
    // Cek dulu, kalau dates kosong jangan maksa jalan
    if (!props.dates || props.dates.length === 0) {
        return { labels: [], datasets: [] };
    }

    const labels = props.dates.map(d => d.dayNumber);

    const dataValues = props.dates.map(dateObj => {
        let count = 0;
        props.habits.forEach(habit => {
            // Pastikan habit.logs ada biar gak error juga
            if (habit.logs) {
                const log = habit.logs.find(l => l.date === dateObj.dateString);
                if (log && log.status === 'completed') count++;
            }
        });
        return count;
    });

    return {
        labels: labels,
        datasets: [{
            label: 'Habit Selesai',
            backgroundColor: '#6366f1',
            borderRadius: 6,
            data: dataValues
        }]
    };
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } },
        x: { grid: { display: false } }
    }
};
</script>

<template>
    <div class="w-full h-64">
        <Bar v-if="chartData.labels.length > 0" :data="chartData" :options="chartOptions" />
        
        <div v-else class="h-full flex items-center justify-center text-slate-400 text-sm">
            Belum ada data grafik
        </div>
    </div>
</template>