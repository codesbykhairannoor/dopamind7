import { computed } from 'vue';
import dayjs from 'dayjs';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

export function useFinanceChart(props) {
    const { formatMoney } = useFinanceFormat();

    /**
     * Helper Translasi Aman
     * Copas dari useFinanceForm biar konsisten logic-nya
     */
    const t = (key, fallback) => {
        if (typeof window.trans === 'function') {
            const result = window.trans(key);
            // Kalau hasil translasi beda dengan key, berarti ketemu
            return result !== key ? result : fallback;
        }
        return fallback;
    };
    
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
                    // Pakai helper t() biar aman & i18n support
                    label: t('income', 'Income'),
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderColor: '#10b981',
                    data: incomeData,
                    tension: 0.4, fill: true, pointRadius: 0, pointHoverRadius: 6
                },
                {
                    // Pakai helper t() biar aman & i18n support
                    label: t('expense', 'Expense'),
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
            legend: { 
                position: 'top', 
                align: 'end', 
                labels: { usePointStyle: true, boxWidth: 8 } 
            },
            tooltip: { 
                mode: 'index', 
                intersect: false,
                callbacks: {
                    // FORMAT UANG DINAMIS ($ / Rp)
                    label: (context) => ` ${context.dataset.label}: ${formatMoney(context.raw)}`
                }
            }
        },
        scales: {
            y: { 
                beginAtZero: true, 
                grid: { color: '#f1f5f9', borderDash: [5, 5] },
                // Format angka sumbu Y (misal 10k, 20k)
                ticks: { callback: (val) => (val / 1000) + 'k' } 
            },
            x: { grid: { display: false } }
        },
        interaction: { mode: 'nearest', axis: 'x', intersect: false }
    };

    return { chartData, chartOptions };
}