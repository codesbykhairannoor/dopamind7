// resources/js/Composables/Finance/useFinanceCalendar.js
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import dayjs from 'dayjs';

export function useFinanceCalendar(initialDate) {
    const currentDate = ref(dayjs(initialDate));

    const changeMonth = (direction) => {
        const newDate = direction === 'next' 
            ? currentDate.value.add(1, 'month') 
            : currentDate.value.subtract(1, 'month');
        
        currentDate.value = newDate;

        // Gunakan router.get dengan opsi manual biar lebih snappy
        router.get(route('finance.index'), 
            { date: newDate.format('YYYY-MM-DD') }, 
            { 
                preserveState: true, 
                preserveScroll: true,
                replace: true, // Biar gak nambah history back button tiap klik bulan
                only: ['transactions', 'budgets', 'stats', 'filters'],
            }
        );
    };

    const formattedMonth = computed(() => currentDate.value.format('MMMM YYYY'));
    const currentMonthKey = computed(() => currentDate.value.format('YYYY-MM'));

    return { currentDate, changeMonth, formattedMonth, currentMonthKey };
}