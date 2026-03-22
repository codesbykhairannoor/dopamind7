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

    // --- CONFIG DINAMIS (DARK MODE SUPPORT) ---
    const chartOptions = computed(() => {
        const isDark = document.documentElement.classList.contains('dark');
        
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'top', 
                    align: 'end', 
                    labels: { 
                        usePointStyle: true, 
                        boxWidth: 8,
                        color: isDark ? '#94a3b8' : '#64748b',
                        font: { weight: 'bold', size: 10 }
                    } 
                },
                tooltip: { 
                    mode: 'index', 
                    intersect: false,
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    titleColor: isDark ? '#f8fafc' : '#1e293b',
                    bodyColor: isDark ? '#cbd5e1' : '#475569',
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    callbacks: {
                        label: (context) => ` ${context.dataset.label}: ${formatMoney(context.raw)}`
                    }
                }
            },
            scales: {
                y: { 
                    beginAtZero: true, 
                    grid: { 
                        color: isDark ? 'rgba(51, 65, 85, 0.5)' : '#f1f5f9', 
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: { 
                        callback: (val) => (val / 1000) + 'k',
                        color: isDark ? '#64748b' : '#94a3b8',
                        font: { size: 10, weight: 'bold' }
                    } 
                },
                x: { 
                    grid: { display: false },
                    ticks: {
                        color: isDark ? '#64748b' : '#94a3b8',
                        font: { size: 10, weight: 'bold' }
                    }
                }
            },
            interaction: { mode: 'nearest', axis: 'x', intersect: false }
        };
    });

    return { chartData, chartOptions };
}