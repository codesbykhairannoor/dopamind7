// resources/js/Composables/Planner/usePlanner.js

import { usePlannerTasks } from './usePlannerTasks';
import { usePlannerDrag } from './usePlannerDrag';
import { ref, watch } from 'vue';
import axios from 'axios';
import { router } from '@inertiajs/vue3';

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

export function usePlanner(props) {
    // 1. Ambil Logic Dasar (Tasks & Modal Logic)
    const taskLogic = usePlannerTasks(props);
    
    // 2. Ambil Logic Drag & Drop (Menggunakan localTasks dari taskLogic)
    const dragLogic = usePlannerDrag(taskLogic.localTasks);

    // 3. State Lokal untuk Notes & Meals
    const localNotes = ref(props.dailyLog?.notes || '');
    const localMeals = ref(props.dailyLog?.meals || { breakfast: '', lunch: '', dinner: '' });

    // 4. State untuk navigasi tipe modal (Full vs Simple)
    const activeModalType = ref('full');

    // 5. Auto-save Background (Silent) via Axios
    const saveLogSilent = debounce(async (data) => {
        try {
            // Pastikan route 'planner.updateLog' sudah ada di web.php
            await axios.post(route('planner.updateLog'), data);
        } catch (e) { 
            console.error("Auto-save failed:", e); 
        }
    }, 1000);

    // Watcher untuk sinkronisasi otomatis ke database
    watch(localNotes, (val) => saveLogSilent({ notes: val }));
    watch(localMeals, (val) => saveLogSilent({ meals: val }), { deep: true });

    // 6. UI Helpers (Time Slots & Colors)
    const timeSlots = Array.from({ length: 18 }, (_, i) => 
        `${(i + 6).toString().padStart(2, '0')}:00`
    );
    
    const getTypeColor = (type) => {
        const colors = { 
            1: 'bg-rose-50 text-rose-700 border-rose-200', 
            2: 'bg-indigo-50 text-indigo-700 border-indigo-200', 
            3: 'bg-emerald-50 text-emerald-700 border-emerald-200' 
        };
        return colors[type] || 'bg-white text-slate-700 border-slate-200';
    };

    const resetBoard = () => {
        // 🔥 HAPUS baris 'if (confirm(...))' ini. Langsung hajar logic reset-nya.
        
        // A. Reset Tampilan (Optimistic UI)
        localNotes.value = '';
        localMeals.value = { breakfast: '', lunch: '', dinner: '' };
        taskLogic.localTasks.value = []; 

        // B. Hapus di Database via Inertia
        router.post(route('planner.reset'), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => console.log('Board cleared'),
            onError: (err) => console.error('Reset failed', err)
        });
    };

    // 8. Custom Open Modal (Override default untuk menentukan tipe)
    const openPlannerModal = (task = null, timeSlot = null, type = 'full') => {
        activeModalType.value = type;
        taskLogic.openModal(task, timeSlot);
    };

    // 9. Return Gabungan Semua Logic
    return { 
        // Logic dari usePlannerTasks (localTasks, scheduledTasks, stats, form, modal states, dll)
        ...taskLogic, 
        
        // Logic dari usePlannerDrag (onDragStart, onDrop, dll)
        ...dragLogic, 
        
        // Logic Lokal & Override
        openModal: openPlannerModal, // Kita timpa fungsi openModal-nya
        activeModalType,
        resetBoard, 
        timeSlots, 
        getTypeColor, 
        localNotes, 
        localMeals 
    };
}