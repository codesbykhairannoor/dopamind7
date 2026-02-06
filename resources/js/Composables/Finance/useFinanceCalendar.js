import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

export function useFinanceCalendar(initialDate) {
    dayjs.locale('id');
    
    // Inisialisasi tanggal dari props/URL
    const currentDate = ref(dayjs(initialDate));

    const changeMonth = (input) => {
        let newDate;

        if (input === 'next') {
            // 1. Logic Tombol Kanan (Maju)
            newDate = currentDate.value.add(1, 'month');
        } else if (input === 'prev') {
            // 2. Logic Tombol Kiri (Mundur)
            newDate = currentDate.value.subtract(1, 'month');
        } else {
            // 3. 🔥 LOGIC DROPDOWN (Terima format "YYYY-MM")
            // Input dari dropdown misal: "2024-11"
            // Kita paksa jadi tanggal 1: "2024-11-01" biar valid
            newDate = dayjs(`${input}-01`);
        }
        
        // Update state lokal biar UI langsung berubah
        currentDate.value = newDate;

        // Update URL & Data via Inertia
        router.get(route('finance.index'), 
            { date: newDate.format('YYYY-MM-DD') }, 
            { 
                preserveState: true, 
                preserveScroll: true,
                replace: true, 
                only: ['transactions', 'budgets', 'stats', 'filters'],
            }
        );
    };

    const formattedMonth = computed(() => currentDate.value.format('MMMM YYYY'));
    const currentMonthKey = computed(() => currentDate.value.format('YYYY-MM'));

    return { currentDate, changeMonth, formattedMonth, currentMonthKey };
}