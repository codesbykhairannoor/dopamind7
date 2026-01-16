import { ref, computed, watch } from 'vue'; // 🔥 Tambah Watch
import { router, useForm } from '@inertiajs/vue3';

export function usePlannerTasks(props) {
    // State Lokal
    const localTasks = ref([...props.tasks]);

    // 🔥 FIX UTAMA: Pantau perubahan data dari server (Props)
    // Kalau server kirim data baru (habis save/delete), update localTasks
    watch(() => props.tasks, (newTasks) => {
        localTasks.value = [...newTasks];
    }, { deep: true });

    // --- COMPUTED ---
    const stats = computed(() => {
        const total = localTasks.value.length;
        const completed = localTasks.value.filter(t => t.is_completed).length;
        return { 
            total, 
            completed, 
            percent: total > 0 ? Math.round((completed / total) * 100) : 0 
        };
    });

    const scheduledTasks = computed(() => 
        localTasks.value.filter(t => t.start_time).sort((a, b) => a.start_time.localeCompare(b.start_time))
    );

    const inboxTasks = computed(() => localTasks.value.filter(t => !t.start_time));

    // --- FORM ---
    const form = useForm({
        id: null, title: '', start_time: null, end_time: null, type: 1, notes: ''
    });

    const isModalOpen = ref(false);
    const isEditing = ref(false);
    const activeModalType = ref('full'); 

    // --- ACTIONS ---
    const openModal = (task = null, timeSlot = null, type = 'full') => {
        form.reset();
        activeModalType.value = type;

        if (task) {
            isEditing.value = true;
            form.id = task.id;
            form.title = task.title;
            form.start_time = task.start_time;
            form.end_time = task.end_time;
            form.type = task.type;
            form.notes = task.notes;
            
            // Auto-detect modal type
            if (!task.start_time && type === 'auto') activeModalType.value = 'simple';
            else if (type === 'auto') activeModalType.value = 'full';

        } else {
            isEditing.value = false;
            // Default type 1 (Work)
            form.type = 1; 
            if (timeSlot) {
                form.start_time = timeSlot;
                activeModalType.value = 'full';
            }
        }
        isModalOpen.value = true;
    };

    const submitTask = () => {
        const options = {
            onSuccess: () => isModalOpen.value = false,
            preserveScroll: true
        };

        if (isEditing.value) {
            form.patch(route('planner.update', form.id), options);
        } else {
            form.post(route('planner.store'), options);
        }
    };

    const deleteTask = (id) => {
        if(confirm('Hapus task ini?')) {
            router.delete(route('planner.destroy', id), {
                onSuccess: () => isModalOpen.value = false
            });
        }
    };

    const toggleComplete = (task) => {
        task.is_completed = !task.is_completed;
        router.post(route('planner.toggle', task.id), {}, { preserveScroll: true });
    };

    const resetBoard = () => {
        if(confirm('Mulai hari baru?')) {
            router.post(route('planner.reset'), {}, { preserveScroll: true });
        }
    };

    return {
        localTasks, scheduledTasks, inboxTasks, stats,
        form, isModalOpen, isEditing, activeModalType,
        openModal, submitTask, deleteTask, resetBoard, toggleComplete
    };
}