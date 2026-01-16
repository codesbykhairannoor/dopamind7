import { router } from '@inertiajs/vue3';

export function usePlannerDrag(localTasks) {
    
    // Saat mulai drag
    const onDragStart = (evt, task) => {
        evt.dataTransfer.dropEffect = 'move';
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('taskId', task.id);
    };

    // Saat menjatuhkan (Drop) ke Slot Waktu
    const onDrop = (evt, newStartTime) => {
        const taskId = parseInt(evt.dataTransfer.getData('taskId'));
        const task = localTasks.value.find(t => t.id === taskId);
        
        if (task) {
            // 1. Optimistic UI Update (Biar berasa cepet)
            task.start_time = newStartTime; 
            // Reset end_time biar gak aneh (opsional)
            task.end_time = null; 

            // 2. Kirim ke Server
            router.patch(route('planner.update', taskId), {
                start_time: newStartTime,
                end_time: null // Reset durasi default
            }, { preserveScroll: true });
        }
    };

    return { onDragStart, onDrop };
}