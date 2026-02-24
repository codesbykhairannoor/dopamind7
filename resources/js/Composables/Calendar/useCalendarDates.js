import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

export function useCalendarDates(props) {
    const selectedDate = ref(dayjs().format('YYYY-MM-DD'));
    const isDetailModalOpen = ref(false);

    const openDayDetail = (dateStr) => {
        selectedDate.value = dateStr;
        isDetailModalOpen.value = true;
    };

    const calendarDays = computed(() => {
        const yearMonth = props.currentMonth || dayjs().format('YYYY-MM');
        const startOfMonth = dayjs(yearMonth).startOf('month');
        const endOfMonth = dayjs(yearMonth).endOf('month');
        const daysInMonth = startOfMonth.daysInMonth();
        const startDayOfWeek = startOfMonth.day() === 0 ? 6 : startOfMonth.day() - 1; 
        
        let days = [];

        // 1. Padding kotak kosong SEBELUM tanggal 1
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push({ isCurrentMonth: false, date: null });
        }

        // 2. Isi tanggal berjalan (Tanggal 1 - 30/31)
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDateStr = startOfMonth.date(i).format('YYYY-MM-DD');
            
            // 🔥 DATA MAPPER: Semua Modul Disatukan Di Sini
            const dailyEvents = props.data?.events?.filter(ev => {
                if (ev.end_date) return dayjs(currentDateStr).isBetween(ev.start_date, ev.end_date, 'day', '[]');
                return ev.start_date === currentDateStr;
            }) || [];
            
            const dailyJournal = props.data?.journals?.[currentDateStr] || null;
            const dailyFinance = props.data?.finances?.[currentDateStr] || 0;
            const dailyPlanner = props.data?.planners?.[currentDateStr] || null;
            const dailyHabitCount = props.data?.habits?.[currentDateStr] || 0; // 🔥 TANGKAP DATA HABIT

            days.push({
                isCurrentMonth: true,
                date: currentDateStr,
                dayNumber: i,
                isToday: currentDateStr === dayjs().format('YYYY-MM-DD'),
                events: dailyEvents,
                hasJournal: !!dailyJournal,
                expense: dailyFinance,
                planner: dailyPlanner ? { done: dailyPlanner.completed_tasks, total: dailyPlanner.total_tasks } : null,
                habitDone: dailyHabitCount // 🔥 LEMPAR KE OBJEK HARI INI
            });
        }

        // 3. Padding kotak kosong SETELAH akhir bulan
        const totalCells = days.length;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let i = 0; i < remainingCells; i++) {
            days.push({ isCurrentMonth: false, date: null });
        }

        return days;
    });

    return { selectedDate, isDetailModalOpen, openDayDetail, calendarDays };
}