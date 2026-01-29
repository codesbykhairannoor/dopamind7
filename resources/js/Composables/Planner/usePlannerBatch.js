import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';

export function usePlannerBatch() {
    const isBatchModalOpen = ref(false);

    // Form khusus Batch
    const batchForm = useForm({
        tasks: [
            // Default 1 baris pertama
            { title: '', start_time: '08:00', end_time: '09:00', type: 1, notes: '' }
        ]
    });

    const openBatchModal = () => {
        batchForm.reset();
        // Reset ke default 1 baris
        batchForm.tasks = [{ title: '', start_time: '08:00', end_time: '09:00', type: 1, notes: '' }];
        batchForm.clearErrors();
        isBatchModalOpen.value = true;
    };

    const closeBatchModal = () => {
        isBatchModalOpen.value = false;
        batchForm.reset();
        batchForm.clearErrors();
    };

    const addBatchRow = () => {
        // 🧠 Logic Pintar: Ambil jam dari baris terakhir + 1 jam
        const lastTask = batchForm.tasks[batchForm.tasks.length - 1];
        let nextStart = '09:00';
        
        if (lastTask && lastTask.end_time) {
            nextStart = lastTask.end_time;
        }

        // Hitung End Time (+1 jam)
        let [h, m] = nextStart.split(':').map(Number);
        let endH = (h + 1) % 24;
        let nextEnd = `${endH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

        batchForm.tasks.push({ 
            title: '', 
            start_time: nextStart, 
            end_time: nextEnd, 
            type: 1, 
            notes: '' 
        });
    };

    const removeBatchRow = (index) => {
        if (batchForm.tasks.length > 1) {
            batchForm.tasks.splice(index, 1);
        }
    };

    const submitBatch = () => {
        batchForm.post(route('planner.batchStore'), {
            preserveScroll: true,
            onSuccess: () => {
                closeBatchModal();
            },
            onError: (errors) => {
                console.error("Batch Error", errors);
            }
        });
    };

    return {
        isBatchModalOpen,
        batchForm,
        openBatchModal,
        closeBatchModal,
        addBatchRow,
        removeBatchRow,
        submitBatch
    };
}