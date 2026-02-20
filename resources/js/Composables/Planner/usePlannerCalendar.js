import { ref, computed } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';

// Import locale biar bahasanya ngikutin setting user
import 'dayjs/locale/id';
import 'dayjs/locale/en';

export function usePlannerCalendar(initialDate) {
    const page = usePage();
    const currentDate = ref(initialDate);

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
        currentDate.value = newDate;
        
        router.get(route('planner.index'), { date: newDate }, { 
            preserveState: true, 
            preserveScroll: true,
            replace: true, // Biar ga menuhin history back browser
            only: ['tasks', 'dailyLog', 'currentDate'], // Cuma ambil ini aja
        });
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