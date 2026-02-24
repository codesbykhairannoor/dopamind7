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

        for (let i = 0; i < startDayOfWeek; i++) {
            days.push({ isCurrentMonth: false, date: null });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDateStr = startOfMonth.date(i).format('YYYY-MM-DD');
            
            // 1. EVENT MAPPER
            const dailyEvents = props.data?.events?.filter(ev => {
                if (ev.end_date) return dayjs(currentDateStr).isBetween(ev.start_date, ev.end_date, 'day', '[]');
                return ev.start_date === currentDateStr;
            }) || [];
            
            // 2. JOURNAL & FINANCE MAPPER
            const dailyJournal = props.data?.journals?.[currentDateStr] || null;
            const dailyFinance = props.data?.finances?.[currentDateStr] || 0;
            const dailyHabitCount = props.data?.habits?.[currentDateStr] || 0;

            // 🔥 3. PLANNER MAPPER (ANTI-BUG / FOOLPROOF)
            // Mencari data planner meskipun key dari database formatnya 'YYYY-MM-DD T00:00:00Z'
            let dailyPlanner = null;
            if (props.data?.planners) {
                // Coba ambil langsung
                if (props.data.planners[currentDateStr]) {
                    dailyPlanner = props.data.planners[currentDateStr];
                } else {
                    // Coba cari pakai metode fallback (kalau ada buntut jamnya)
                    const fuzzyKey = Object.keys(props.data.planners).find(key => String(key).startsWith(currentDateStr));
                    if (fuzzyKey) dailyPlanner = props.data.planners[fuzzyKey];
                }
            }

            // Memastikan data diolah sebagai ANGKA (Number) bukan Teks (String)
            const plannerData = dailyPlanner ? { 
                done: Number(dailyPlanner.completed_tasks || 0), 
                total: Number(dailyPlanner.total_tasks || 0) 
            } : null;

            days.push({
                isCurrentMonth: true,
                date: currentDateStr,
                dayNumber: i,
                isToday: currentDateStr === dayjs().format('YYYY-MM-DD'),
                events: dailyEvents,
                hasJournal: !!dailyJournal,
                expense: dailyFinance,
                planner: plannerData, // Hasil anti-bug dimasukkan ke sini
                habitDone: Number(dailyHabitCount) 
            });
        }

        const totalCells = days.length;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let i = 0; i < remainingCells; i++) {
            days.push({ isCurrentMonth: false, date: null });
        }

        return days;
    });

    return { selectedDate, isDetailModalOpen, openDayDetail, calendarDays };
}