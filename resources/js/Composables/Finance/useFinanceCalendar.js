// resources/js/Composables/Finance/useFinanceCalendar.js
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import dayjs from 'dayjs';

export function useFinanceCalendar(initialDate) {
    // State tanggal aktif
    const currentDate = ref(dayjs(initialDate));

    // Pindah Bulan (Maju/Mundur)
    const changeMonth = (direction) => {
        const newDate = direction === 'next' 
            ? currentDate.value.add(1, 'month') 
            : currentDate.value.subtract(1, 'month');
        
        // Update state lokal
        currentDate.value = newDate;

        // Reload halaman dengan parameter tanggal baru
        router.visit(route('finance.index'), {
            data: { date: newDate.format('YYYY-MM-DD') },
            preserveScroll: true,
            preserveState: true,
            only: ['transactions', 'budgets', 'stats', 'filters'] // Partial reload biar cepet
        });
    };

    // Format tampilan Header (Contoh: "Januari 2026")
    const formattedMonth = computed(() => {
        return currentDate.value.format('MMMM YYYY');
    });
    
    // Kirim format YYYY-MM buat filtering budget
    const currentMonthKey = computed(() => currentDate.value.format('YYYY-MM'));

    return {
        currentDate,
        changeMonth,
        formattedMonth,
        currentMonthKey
    };
}