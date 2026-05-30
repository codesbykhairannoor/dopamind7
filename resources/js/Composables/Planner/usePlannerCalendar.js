import { ref, computed, onMounted, watch } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';

// Import locale biar bahasanya ngikutin setting user
import 'dayjs/locale/id';
import 'dayjs/locale/en';

export function usePlannerCalendar(initialDate) {
    const page = usePage();
    const currentDate = ref(initialDate);

    // Removed router.prefetch to prevent network clogging and delays when changing dates rapidly

    const localeCode = computed(() => {
        const locale = page.props.locale || 'id';
        return locale.split('-')[0];
    });

    // Format tampilan: "07 Februari 2026"
    const formattedDate = computed(() => {
        return dayjs(currentDate.value).locale(localeCode.value).format('DD MMMM YYYY');
    });

    // Fungsi Utama buat Hit Backend
    const changeDate = (newDate) => {
        const oldYear = dayjs(currentDate.value).format('YYYY');
        const newYear = dayjs(newDate).format('YYYY');

        currentDate.value = newDate;

        if (oldYear !== newYear) {
            router.get(route('planner.index'), { date: newDate }, { 
                preserveState: true, 
                preserveScroll: true,
                replace: true, // Biar ga menuhin history back browser
                only: ['tasks', 'dailyLogs', 'currentDate'], // Cuma ambil ini aja
                progress: false
            });
        } else {
            // Update URL without hitting server since we already have the year's data
            window.history.replaceState(window.history.state, '', route('planner.index', { date: newDate }));
        }
    };

    // Fungsi ekstra buat tombol panah Kiri/Kanan (H-1 / H+1)
    const changeDay = (direction) => {
        const current = dayjs(currentDate.value);
        const newDate = direction === 'next' 
            ? current.add(1, 'day').format('YYYY-MM-DD') 
            : current.subtract(1, 'day').format('YYYY-MM-DD');
            
        changeDate(newDate);
    };

    return { 
        currentDate, 
        formattedDate, 
        changeDate, 
        changeDay 
    };
}