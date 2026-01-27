import { usePlannerTasks } from './usePlannerTasks';
import { usePlannerDrag } from './usePlannerDrag';
import { ref, watch } from 'vue';
import axios from 'axios';

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

export function usePlanner(props) {
    const taskLogic = usePlannerTasks(props);
    const dragLogic = usePlannerDrag(taskLogic.localTasks);

    const localNotes = ref(props.dailyLog?.notes || '');
    const localMeals = ref(props.dailyLog?.meals || { breakfast: '', lunch: '', dinner: '' });

    // Auto-save murni background
    const saveLogSilent = debounce(async (data) => {
        try {
            await axios.post(route('planner.updateLog'), data);
        } catch (e) { console.error("Auto-save failed:", e); }
    }, 1000);

    watch(localNotes, (val) => saveLogSilent({ notes: val }));
    watch(localMeals, (val) => saveLogSilent({ meals: val }), { deep: true });

    // Generate 06:00 sampai 23:00
    const timeSlots = Array.from({length: 18}, (_, i) => `${(i+6).toString().padStart(2, '0')}:00`);
    
    const getTypeColor = (type) => {
        const colors = { 
            1: 'bg-blue-50 text-blue-700 border-blue-100', 
            2: 'bg-emerald-50 text-emerald-700 border-emerald-100', 
            3: 'bg-rose-50 text-rose-700 border-rose-100' 
        };
        return colors[type] || 'bg-white text-slate-700 border-slate-100';
    };

    return { 
        ...taskLogic, 
        ...dragLogic, 
        timeSlots, 
        getTypeColor, 
        localNotes, 
        localMeals 
    };
}