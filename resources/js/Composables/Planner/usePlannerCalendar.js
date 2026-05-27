import { ref, computed, onMounted } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';

// Import locale biar bahasanya ngikutin setting user
import 'dayjs/locale/id';
import 'dayjs/locale/en';

export function usePlannerCalendar(initialDate) {
    onMounted(() => {
        const current = dayjs(initialDate);
        const prevDay = current.subtract(1, 'day').format('YYYY-MM-DD');
        const nextDay = current.add(1, 'day').format('YYYY-MM-DD');
        
        if (typeof router.prefetch === 'function') {
            router.prefetch(route('planner.index'), { method: 'get', data: { date: prevDay } }, { cacheFor: '1m' });
            router.prefetch(route('planner.index'), { method: 'get', data: { date: nextDay } }, { cacheFor: '1m' });
        }
    });

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
        const today = dayjs().format('YYYY-MM-DD');
        const maxDate = dayjs().add(10, 'day').format('YYYY-MM-DD');

        if (dayjs(newDate).isAfter(dayjs(maxDate))) {
            return; // ⛔ Jangan pindah kalau lebih dari 10 hari
        }
        
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