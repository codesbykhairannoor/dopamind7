<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import dayjs from 'dayjs';

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const props = defineProps({
    transactions: Array,
    currentDate: String // Format YYYY-MM-DD (biar tau jumlah hari dalam bulan itu)
});

// --- LOGIC OLAH DATA ---
const chartData = computed(() => {
    // 1. Siapkan Label Tanggal (1, 2, 3 ... 30/31)
    const daysInMonth = dayjs(props.currentDate).daysInMonth();
    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    // 2. Siapkan Array Kosong untuk Income & Expense
    const incomeData = new Array(daysInMonth).fill(0);
    const expenseData = new Array(daysInMonth).fill(0);

    // 3. Isi data berdasarkan transaksi
    props.transactions.forEach(t => {
        const dayIndex = dayjs(t.date).date() - 1; // Tanggal 1 = Index 0
        if (t.type === 'income') {
            incomeData[dayIndex] += Number(t.amount);
        } else {
            expenseData[dayIndex] += Number(t.amount);
        }
    });

    return {
        labels: labels,
        datasets: [
            {
                label: 'Pemasukan',
                backgroundColor: 'rgba(16, 185, 129, 0.1)', // Emerald
                borderColor: '#10b981',
                data: incomeData,
                tension: 0.4, // Biar garisnya melengkung halus
                fill: true,
                pointRadius: 2,
                pointHoverRadius: 6
            },
            {
                label: 'Pengeluaran',
                backgroundColor: 'rgba(244, 63, 94, 0.1)', // Rose
                borderColor: '#f43f5e',
                data: expenseData,
                tension: 0.4,
                fill: true,
                pointRadius: 2,
                pointHoverRadius: 6
            }
        ]
    };
});

// --- CONFIG TAMPILAN ---
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8 } },
        tooltip: { 
            mode: 'index', 
            intersect: false,
            callbacks: {
                label: (context) => {
                    return ` ${context.dataset.label}: Rp ${new Intl.NumberFormat('id-ID').format(context.raw)}`;
                }
            }
        }
    },
    scales: {
        y: { 
            beginAtZero: true, 
            grid: { color: '#f1f5f9', borderDash: [5, 5] },
            ticks: { callback: (val) => (val / 1000) + 'k' } // Singkat angka (500k)
        },
        x: { 
            grid: { display: false } 
        }
    },
    interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
    }
};
</script>

<template>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 w-full mt-8">
        <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-slate-700 text-sm uppercase tracking-wider">Trend Keuangan Bulan Ini</h3>
            <span class="text-xs text-slate-400">Grafik Harian</span>
        </div>
        
        <div class="h-[300px] w-full">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>