import { computed } from 'vue';
import dayjs from 'dayjs';

export function useFinanceChart(props) {
    
    // --- TRANSFORMASI DATA ---
    const chartData = computed(() => {
        if (!props.currentDate) return { labels: [], datasets: [] };

        const daysInMonth = dayjs(props.currentDate).daysInMonth();
        const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        
        const incomeData = new Array(daysInMonth).fill(0);
        const expenseData = new Array(daysInMonth).fill(0);

        props.transactions.forEach(t => {
            const dayIndex = dayjs(t.date).date() - 1;
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
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderColor: '#10b981',
                    data: incomeData,
                    tension: 0.4, fill: true, pointRadius: 0, pointHoverRadius: 6
                },
                {
                    label: 'Pengeluaran',
                    backgroundColor: 'rgba(244, 63, 94, 0.1)',
                    borderColor: '#f43f5e',
                    data: expenseData,
                    tension: 0.4, fill: true, pointRadius: 0, pointHoverRadius: 6
                }
            ]
        };
    });

    // --- CONFIG STATIC ---
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8 } },
            tooltip: { 
                mode: 'index', intersect: false,
                callbacks: {
                    label: (context) => ` ${context.dataset.label}: Rp ${new Intl.NumberFormat('id-ID').format(context.raw)}`
                }
            }
        },
        scales: {
            y: { 
                beginAtZero: true, 
                grid: { color: '#f1f5f9', borderDash: [5, 5] },
                ticks: { callback: (val) => (val / 1000) + 'k' } 
            },
            x: { grid: { display: false } }
        },
        interaction: { mode: 'nearest', axis: 'x', intersect: false }
    };

    return { chartData, chartOptions };
}