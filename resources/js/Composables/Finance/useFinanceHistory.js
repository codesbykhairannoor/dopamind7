import { ref, computed } from 'vue';
import dayjs from 'dayjs';

export function useFinanceHistory(props) {
    const isArchiveOpen = ref(false);
    const selectedDayData = ref(null);
    const filterDate = ref('');

    // --- LOGIC 1: GROUPING MASTER DATA ---
    const dailyStats = computed(() => {
        const groups = {};
        
        props.transactions.forEach(trx => {
            const dateKey = dayjs(trx.date).format('YYYY-MM-DD');
            if (!groups[dateKey]) {
                groups[dateKey] = {
                    date: dateKey,
                    dateObj: dayjs(trx.date),
                    transactions: [],
                    total_income: 0,
                    total_expense: 0
                };
            }
            groups[dateKey].transactions.push(trx);
            if (trx.type === 'income') groups[dateKey].total_income += Number(trx.amount);
            else groups[dateKey].total_expense += Number(trx.amount);
        });

        return Object.values(groups).sort((a, b) => b.dateObj - a.dateObj);
    });

    // --- LOGIC 2: FILTERING TAMPILAN ---
    const visibleStats = computed(() => {
        if (filterDate.value) {
            return dailyStats.value.filter(day => day.date === filterDate.value);
        }
        return dailyStats.value.slice(0, 5); // Default 5 terbaru
    });

    // --- LOGIC 3: MODAL CONTROL ---
    const openDetail = (dayData) => {
        selectedDayData.value = dayData;
        isArchiveOpen.value = true;
    };

    const closeDetail = () => {
        isArchiveOpen.value = false;
    };

    const resetFilter = () => {
        filterDate.value = '';
    };

    return {
        filterDate,
        visibleStats,
        dailyStats, // Untuk ngecek total hari
        isArchiveOpen,
        selectedDayData,
        openDetail,
        closeDetail,
        resetFilter
    };
}