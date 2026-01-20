import { router } from '@inertiajs/vue3';

export function usePlannerDrag(localTasks) {
    
    const onDragStart = (evt, task) => {
        evt.dataTransfer.dropEffect = 'move';
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('taskId', task.id);
    };

    const onDrop = (evt, newStartTime) => {
        const taskId = parseInt(evt.dataTransfer.getData('taskId'));
        const task = localTasks.value.find(t => t.id === taskId);
        
        if (task) {
            // 1. Optimistic UI Update
            task.start_time = newStartTime; 
            task.end_time = null; 

            // 2. Kirim ke Server secara SILENT
            router.patch(route('planner.update', taskId), {
                start_time: newStartTime,
                end_time: null 
            }, { 
                preserveScroll: true,
                preserveState: true,
                only: ['tasks'], // 🔥 Refresh data tasks doang
                showProgress: false // 🔥 Bunuh animasi loading tab browser
            });
        }
    };

    return { onDragStart, onDrop };
}