// ==========================================
// USE CALENDAR (ORCHESTRATOR)
// ==========================================
import { useCalendarDates } from './useCalendarDates';
import { useCalendarForm } from './useCalendarForm';

export function useCalendar(props) {
    
    // 1. Panggil Bagian Tanggal & Data Mapper
    const dateLogic = useCalendarDates(props);

    // 2. Panggil Bagian Form CRUD
    const formLogic = useCalendarForm();

    // 3. Gabungkan dan Return Semua ke Vue Component
    return {
        ...dateLogic,
        ...formLogic
    };
}