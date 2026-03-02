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
        
        // Perbaikan index hari (Minggu = 0 di dayjs, tapi kita ingin Senin = 1)
        const firstDay = startOfMonth.day();
        const startDayOfWeek = firstDay === 0 ? 6 : firstDay - 1; 
        
        let days = [];

        // 🚀 SURPRISE ME: PRE-COMPUTE EVENTS (O(N) MAPPING)
        // Kita bikin "Kamus Event" duluan supaya saat ngeloop 31 hari, kita tinggal "cabut" dari kamus.
        // Nggak ada lagi array.filter() di dalam loop yang bikin HP panas!
        const eventsMap = {};
        if (props.data?.events) {
            props.data.events.forEach(ev => {
                const start = dayjs(ev.start_date);
                const end = ev.end_date ? dayjs(ev.end_date) : start;
                
                // Masukkan event ke setiap tanggal yang dilewatinya
                let curr = start;
                while (curr.isSameOrBefore(end, 'day')) {
                    const dateKey = curr.format('YYYY-MM-DD');
                    if (!eventsMap[dateKey]) eventsMap[dateKey] = [];
                    eventsMap[dateKey].push(ev);
                    curr = curr.add(1, 'day');
                }
            });
        }

        // 1. PADDING AWAL BULAN
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push({ isCurrentMonth: false, date: null });
        }

        // 2. ISI TANGGAL
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDateStr = startOfMonth.date(i).format('YYYY-MM-DD');
            
            // Ambil dari Kamus Event (SUPER CEPAT)
            const dailyEvents = eventsMap[currentDateStr] || [];
            
            // Ambil data metric lainnya
            const dailyJournal = props.data?.journals?.[currentDateStr] || null;
            const dailyFinance = props.data?.finances?.[currentDateStr] || 0;
            const dailyHabitCount = props.data?.habits?.[currentDateStr] || 0;

            // PLANNER FALLBACK (Anti-Bug)
            let dailyPlanner = null;
            if (props.data?.planners) {
                if (props.data.planners[currentDateStr]) {
                    dailyPlanner = props.data.planners[currentDateStr];
                } else {
                    const fuzzyKey = Object.keys(props.data.planners).find(key => String(key).startsWith(currentDateStr));
                    if (fuzzyKey) dailyPlanner = props.data.planners[fuzzyKey];
                }
            }

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
                planner: plannerData,
                habitDone: Number(dailyHabitCount) 
            });
        }

        // 3. PADDING AKHIR BULAN
        const totalCells = days.length;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let i = 0; i < remainingCells; i++) {
            days.push({ isCurrentMonth: false, date: null });
        }

        return days;
    });

    return { selectedDate, isDetailModalOpen, openDayDetail, calendarDays };
}