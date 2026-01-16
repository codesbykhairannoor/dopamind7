import { usePlannerTasks } from './usePlannerTasks';
import { usePlannerDrag } from './usePlannerDrag';
import { ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';

// 👇 FUNGSI DEBOUNCE MANUAL (Untuk delay save otomatis)
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

export function usePlanner(props) {
    // 1. Panggil Logic Task (CRUD, Modal, Stats)
    const taskLogic = usePlannerTasks(props);
    
    // 2. Panggil Logic Drag & Drop
    const dragLogic = usePlannerDrag(taskLogic.localTasks);

    // --- LOGIC NOTES & MEALS ---
    const defaultMeals = { breakfast: '', lunch: '', dinner: '' };
    const localNotes = ref(props.dailyLog?.notes || '');
    const localMeals = ref(props.dailyLog?.meals || defaultMeals);

    // Auto-save Notes
    const saveNotes = debounce((newVal) => {
        router.post(route('planner.updateLog'), { notes: newVal }, { preserveScroll: true });
    }, 1000);

    // Auto-save Meals
    const saveMeals = debounce((newVal) => {
        router.post(route('planner.updateLog'), { meals: newVal }, { preserveScroll: true });
    }, 1000);

    watch(localNotes, (val) => saveNotes(val));
    watch(localMeals, (val) => saveMeals(val), { deep: true });

    // --- DATA JAM (06:00 - 23:00) ---
    const timeSlots = [];
    for (let i = 6; i <= 23; i++) {
        const hour = i < 10 ? `0${i}` : i;
        timeSlots.push(`${hour}:00`);
    }

    // --- HELPER WARNA KATEGORI ---
    const getTypeColor = (type) => {
        if (type === 1) return 'bg-blue-50 border-blue-200 text-blue-700'; // Work
        if (type === 2) return 'bg-emerald-50 border-emerald-200 text-emerald-700'; // Personal
        if (type === 3) return 'bg-rose-50 border-rose-200 text-rose-700'; // Urgent
        return 'bg-white border-slate-200 text-slate-700';
    };

    // 🔥 RETURN SEMUA KE VUE
    return {
        ...taskLogic,  // Spread semua fungsi dari usePlannerTasks
        ...dragLogic,  // Spread semua fungsi dari usePlannerDrag
        timeSlots, 
        getTypeColor,
        localNotes, 
        localMeals 
    };
}