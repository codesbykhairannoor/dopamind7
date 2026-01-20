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

    // Gunakan Axios untuk Auto-save murni di background (Silent)
    const saveLogSilent = debounce(async (data) => {
        try {
            await axios.post(route('planner.updateLog'), data);
        } catch (e) { console.error(e); }
    }, 1000);

    watch(localNotes, (val) => saveLogSilent({ notes: val }));
    watch(localMeals, (val) => saveLogSilent({ meals: val }), { deep: true });

    // Helper Jam & Warna
    const timeSlots = Array.from({length: 18}, (_, i) => `${(i+6).toString().padStart(2, '0')}:00`);
    
    const getTypeColor = (t) => {
        const colors = { 1: 'bg-blue-50 text-blue-700', 2: 'bg-emerald-50 text-emerald-700', 3: 'bg-rose-50 text-rose-700' };
        return colors[t] || 'bg-white text-slate-700';
    };

    return { ...taskLogic, ...dragLogic, timeSlots, getTypeColor, localNotes, localMeals };
}