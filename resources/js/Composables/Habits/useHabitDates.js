import { router, usePage } from '@inertiajs/vue3';
import { computed, onMounted, watch } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

export function useHabitDates(props, currentMonthKey) {
    watch(currentMonthKey, (newMonth) => {
        if (typeof router.prefetch === 'function') {
            const current = newMonth ? dayjs(newMonth + '-01') : dayjs();
            const prevMonth = current.subtract(1, 'month').format('YYYY-MM');
            const nextMonth = current.add(1, 'month').format('YYYY-MM');
            
            router.prefetch(route('habits.index'), { method: 'get', data: { month: prevMonth } }, { cacheFor: '5m' });
            router.prefetch(route('habits.index'), { method: 'get', data: { month: nextMonth } }, { cacheFor: '5m' });
        }
    }, { immediate: true });

    const todayDate = computed(() => {
        const activeLang = usePage().props.locale || 'id';
        return dayjs().locale(activeLang).format('dddd, D MMMM YYYY');
    });

    const monthDates = computed(() => {
        const activeLang = usePage().props.locale || 'id';
        dayjs.locale(activeLang);

        const targetDate = currentMonthKey.value ? dayjs(currentMonthKey.value + '-01') : dayjs();
        const daysInMonth = targetDate.daysInMonth();
        let days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = targetDate.date(i);
            days.push({
                dateString: date.format('YYYY-MM-DD'),
                dayNumber: i,
                dayName: date.format('ddd').charAt(0).toUpperCase() + date.format('ddd').slice(1).toLowerCase(),
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
            const current = currentMonthKey.value ? dayjs(currentMonthKey.value + '-01') : dayjs();
            newMonth = payload === 'next'
                ? current.add(1, 'month').format('YYYY-MM')
                : current.subtract(1, 'month').format('YYYY-MM');
        } else {
            // Ini yang ditrigger oleh input type="month"
            newMonth = payload;
        }

        const oldYear = dayjs(currentMonthKey.value + '-01').format('YYYY');
        const newYear = dayjs(newMonth + '-01').format('YYYY');

        if (currentMonthKey) {
            currentMonthKey.value = newMonth;
        }

        if (oldYear !== newYear) {
            router.get(route('habits.index'), {
                month: newMonth
            }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ['habits', 'currentMonth', 'monthQuery', 'hasPrevHabits', 'prevMonthQuery', 'savedMood']
            });
        }
    };

    return { todayDate, monthDates, changeMonth };

}