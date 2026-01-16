// ==========================================
// USE HABITS (ORCHESTRATOR)
// ==========================================
import { useHabitDates } from './Habits/useHabitDates';
import { useHabitCore } from './Habits/useHabitCore';
import { useHabitModals } from './Habits/useHabitModals';

export function useHabits(props) {
    
    // 1. Panggil Bagian Tanggal
    const dateLogic = useHabitDates(props);

    // 2. Panggil Bagian Core (Logic Utama)
    const coreLogic = useHabitCore(props);

    // 3. Panggil Bagian Modals 
    // (Kita lempar localHabits dari coreLogic ke sini biar bisa dipakai delete)
    const modalLogic = useHabitModals(props, coreLogic.localHabits);

    // 4. Gabungkan dan Return Semua ke Vue Component
    return {
        ...dateLogic,
        ...coreLogic,
        ...modalLogic
    };
}