import { router, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

export function useHabitDates(props) {
    const todayDate = dayjs().locale('id').format('dddd, D MMMM YYYY');

    const monthDates = computed(() => {
        const activeLang = usePage().props.locale || 'id';
        dayjs.locale(activeLang);

        const targetDate = props.monthQuery ? dayjs(props.monthQuery) : dayjs();
        const daysInMonth = targetDate.daysInMonth();
        let days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = targetDate.date(i);
            days.push({
                dateString: date.format('YYYY-MM-DD'),
                dayNumber: i,
                dayName: date.format('ddd'),
                isToday: date.isSame(dayjs(), 'day'),
                isFuture: date.isAfter(dayjs(), 'day')
            });
        }
        return days;
    });

    const changeMonth = (payload) => {
        let newMonth;

        // Cek apakah payload dari tombol manual ('next'/'prev') atau dari Input Bulan ('YYYY-MM')
        if (payload === 'next' || payload === 'prev') {
            const current = props.monthQuery ? dayjs(props.monthQuery) : dayjs();
            newMonth = payload === 'next' 
                ? current.add(1, 'month').format('YYYY-MM') 
                : current.subtract(1, 'month').format('YYYY-MM');
        } else {
            // Ini yang ditrigger oleh input type="month"
            newMonth = payload;
        }

        router.get(route('habits.index'), {
            month: newMonth
        }, {
            preserveState: false, // Force reload buat ambil data bulan baru
            preserveScroll: true
        });
    };

    return { todayDate, monthDates, changeMonth };

}