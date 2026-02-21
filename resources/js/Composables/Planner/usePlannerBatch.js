import { ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import Swal from 'sweetalert2';

export function usePlannerBatch(currentDateRef) {
    const isBatchModalOpen = ref(false);
    const globalConflictError = ref(null); 

    const batchForm = useForm({
        date: currentDateRef.value, 
        tasks: [
            { title: '', start_time: '08:00', end_time: '09:00', type: 1, notes: '' }
        ]
    });

    const openBatchModal = () => {
        batchForm.reset();
        batchForm.date = currentDateRef.value; 
        batchForm.tasks = [{ title: '', start_time: '08:00', end_time: '09:00', type: 1, notes: '' }];
        batchForm.clearErrors();
        globalConflictError.value = null;
        isBatchModalOpen.value = true;
    };

    const closeBatchModal = () => {
        isBatchModalOpen.value = false;
        batchForm.reset();
        batchForm.clearErrors();
        globalConflictError.value = null;
    };

    const addBatchRow = () => {
        const lastTask = batchForm.tasks[batchForm.tasks.length - 1];
        let nextStart = '09:00';
        
        if (lastTask && lastTask.end_time) {
            nextStart = lastTask.end_time;
        }

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

    const timeToMin = (t) => {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const validateBatch = () => {
        batchForm.clearErrors();
        globalConflictError.value = null;
        
        const existingTasks = usePage().props.tasks || []; 
        let isValid = true;

        batchForm.tasks.forEach((task, index) => {
            if (!task.title) {
                batchForm.setError(`tasks.${index}.title`, 'Required');
                isValid = false;
            }

            const start = timeToMin(task.start_time);
            let end = timeToMin(task.end_time);
            if (end < start) end += 1440; 

            if (end - start < 15) {
                batchForm.setError(`tasks.${index}.end_time`, 'Min 15 mins'); 
                globalConflictError.value = `Row ${index + 1}: Duration must be at least 15 minutes!`;
                isValid = false;
            }

            const clashExternal = existingTasks.some(existing => {
                if (!existing.start_time || !existing.end_time) return false;
                const eStart = timeToMin(existing.start_time);
                let eEnd = timeToMin(existing.end_time);
                if (eEnd < eStart) eEnd += 1440;
                return (start < eEnd && end > eStart);
            });

            if (clashExternal) {
                globalConflictError.value = `Row ${index + 1}: Clashes with an existing schedule!`;
                batchForm.setError(`tasks.${index}.start_time`, 'Clash!');
                isValid = false;
            }
        });

        if (!isValid) return false;

        for (let i = 0; i < batchForm.tasks.length; i++) {
            const taskA = batchForm.tasks[i];
            const startA = timeToMin(taskA.start_time);
            let endA = timeToMin(taskA.end_time);
            if (endA < startA) endA += 1440;

            for (let j = i + 1; j < batchForm.tasks.length; j++) {
                const taskB = batchForm.tasks[j];
                const startB = timeToMin(taskB.start_time);
                let endB = timeToMin(taskB.end_time);
                if (endB < startB) endB += 1440;

                if (startA < endB && endA > startB) {
                    globalConflictError.value = `Row ${i+1} and Row ${j+1} are overlapping!`;
                    batchForm.setError(`tasks.${i}.start_time`, 'Overlap');
                    batchForm.setError(`tasks.${j}.start_time`, 'Overlap');
                    isValid = false;
                }
            }
        }

        return isValid;
    };

    const submitBatch = () => {
        if (!validateBatch()) return; 
        
        batchForm.date = currentDateRef.value; 

        batchForm.post(route('planner.batchStore'), {
            preserveScroll: true,
            preserveState: true,
            progress: false, // ✅ Matikan loading default
            only: ['tasks', 'errors'], // ✅ Tarik data Planner (tasks) saja!
            onSuccess: () => {
                closeBatchModal();
                Swal.fire({
                    toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true,
                    background: '#4f46e5', iconColor: '#ffffff', icon: 'success',
                    title: `<span style="color: white; font-weight: 900; font-size: 14px;">Batch Saved Successfully!</span>`,
                    customClass: { popup: '!rounded-full' }
                });
            },
            onError: (errors) => {
                console.error("Batch Error", errors);
            }
        });
    };

    return {
        isBatchModalOpen,
        batchForm,
        globalConflictError, 
        openBatchModal,
        closeBatchModal,
        addBatchRow,
        removeBatchRow,
        submitBatch
    };
}