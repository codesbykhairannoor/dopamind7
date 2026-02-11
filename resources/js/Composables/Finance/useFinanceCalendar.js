import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

// Import locale yang dibutuhkan dayjs
import 'dayjs/locale/id';
import 'dayjs/locale/en';

export function useFinanceCalendar(initialDate) {
    // Destructure activeLocale dari format
    const { activeLocale } = useFinanceFormat();

    const currentDate = ref(dayjs(initialDate));

    // Computed: Ambil kode bahasa (ex: 'id' dari 'id-ID')
    const localeCode = computed(() => {
        // SAFETY CHECK: Kalau activeLocale undefined, fallback ke 'en'
        if (!activeLocale || !activeLocale.value) return 'en';
        
        // Ambil 2 huruf pertama (id, en, de, dll)
        return activeLocale.value.split('-')[0];
    });

    const changeMonth = (input) => {
        let newDate;

        if (input === 'next') {
            newDate = currentDate.value.add(1, 'month');
        } else if (input === 'prev') {
            newDate = currentDate.value.subtract(1, 'month');
        } else {
            // Logic Dropdown (YYYY-MM) -> Paksa tgl 01
            newDate = dayjs(`${input}-01`);
        }
        
        currentDate.value = newDate;

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

    // Format Tampilan Bulan (Februari 2026)
    const formattedMonth = computed(() => {
        return currentDate.value.locale(localeCode.value).format('MMMM YYYY');
    });

    // Key untuk value dropdown (2026-02)
    const currentMonthKey = computed(() => currentDate.value.format('YYYY-MM'));

    return { 
        currentDate, 
        changeMonth, 
        formattedMonth, 
        currentMonthKey 
    };
}