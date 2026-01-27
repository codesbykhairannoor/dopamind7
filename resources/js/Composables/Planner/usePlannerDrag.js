import axios from 'axios'; // 👈 Ganti router jadi axios

export function usePlannerDrag(localTasks) {
    
    const onDragStart = (evt, task) => {
        evt.dataTransfer.dropEffect = 'move';
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('taskId', task.id);
    };

    const onDrop = async (evt, newStartTime) => {
        const taskId = parseInt(evt.dataTransfer.getData('taskId'));
        const task = localTasks.value.find(t => t.id === taskId);
        
        if (task) {
            // 1. Optimistic UI Update (Update tampilan duluan)
            task.start_time = newStartTime; 
            task.end_time = null; 

            // 2. Kirim ke Server secara SILENT pakai AXIOS
            // Kita tidak butuh balikan data tasks, karena local sudah benar.
            try {
                await axios.patch(route('planner.update', taskId), {
                    start_time: newStartTime,
                    end_time: null 
                });
                // ✅ Sukses: Tidak ada reload props, watcher tidak jalan, tampilan aman.
            } catch (error) {
                console.error("Gagal update timeline:", error);
                // Optional: Revert changes if failed (jarang perlu untuk planner sederhana)
            }
        }
    };

    return { onDragStart, onDrop };
}