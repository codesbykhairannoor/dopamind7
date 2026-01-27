import { ref, computed, watch } from 'vue'; 
import { router, useForm } from '@inertiajs/vue3';

export function usePlannerTasks(props) {
    const localTasks = ref([...props.tasks]);
    const conflictError = ref(null);
    const isModalOpen = ref(false);
    const isEditing = ref(false);
    const activeModalType = ref('full');

    const form = useForm({
        id: null, title: '', start_time: null, end_time: null, type: 1, notes: ''
    });

    // --- LOGIC OPTIMISTIC (Pusat Kecepatan) ---
    const submitTask = () => {
        if (conflictError.value) return;

        const payload = { ...form.data() };
        
        // 1. TUTUP MODAL DETIK INI JUGA
        isModalOpen.value = false;

        if (isEditing.value) {
            // 2. UPDATE LOKAL (INSTAN)
            const index = localTasks.value.findIndex(t => t.id === form.id);
            if (index !== -1) {
                localTasks.value[index] = { ...localTasks.value[index], ...payload };
            }

            // 3. KIRIM BACKGROUND
            router.patch(route('planner.update', form.id), payload, {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => form.reset()
            });
        } else {
            // 2. CREATE LOKAL (INSTAN)
            const tempId = 'temp_' + Date.now();
            const newTask = { 
                ...payload, 
                id: tempId, 
                is_completed: false 
            };
            localTasks.value.push(newTask);

            // 3. KIRIM BACKGROUND
            router.post(route('planner.store'), payload, {
                preserveScroll: true,
                // Jangan preserveState agar tempId diganti ID asli dari server
                onSuccess: () => { /* Server akan kirim props.tasks baru */ },
                onError: () => {
                    // Rollback jika gagal
                    localTasks.value = localTasks.value.filter(t => t.id !== tempId);
                },
                onFinish: () => form.reset()
            });
        }
    };

    const deleteTask = (id) => {
        if (confirm('Hapus task ini?')) {
            // 1. HAPUS LOKAL (INSTAN)
            localTasks.value = localTasks.value.filter(t => t.id !== id);
            
            // 2. TUTUP MODAL (Jika sedang buka)
            isModalOpen.value = false;

            // 3. KIRIM BACKGROUND
            router.delete(route('planner.destroy', id), {
                preserveScroll: true,
                preserveState: true
            });
        }
    };

    const toggleComplete = (task) => {
        // 1. UPDATE LOKAL (INSTAN)
        task.is_completed = !task.is_completed;

        // 2. KIRIM BACKGROUND
        router.patch(route('planner.toggle', { plannerTask: task.id }), {}, { 
            preserveScroll: true, 
            preserveState: true
        });
    };

    // --- SISANYA (Sync & Computed) TETAP SAMA ---
    watch(() => props.tasks, (newTasks) => {
        localTasks.value = [...newTasks];
    }, { deep: true });

    const scheduledTasks = computed(() => 
        localTasks.value
            .filter(t => t.start_time)
            .sort((a, b) => a.start_time.localeCompare(b.start_time))
    );
    const inboxTasks = computed(() => localTasks.value.filter(t => !t.start_time));

    const calculateStats = (tasks) => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.is_completed).length;
        return { 
            total, completed, pending: total - completed,
            percent: total > 0 ? Math.round((completed / total) * 100) : 0 
        };
    };

    const scheduledStats = computed(() => calculateStats(scheduledTasks.value));
    const inboxStats = computed(() => calculateStats(inboxTasks.value));

    const openModal = (task = null, timeSlot = null, type = 'full') => {
        form.reset();
        form.clearErrors();
        conflictError.value = null;
        activeModalType.value = type;
        if (task) {
            isEditing.value = true;
            form.id = task.id;
            form.title = task.title;
            form.start_time = task.start_time;
            form.end_time = task.end_time;
            form.type = task.type;
            form.notes = task.notes || '';
        } else {
            isEditing.value = false;
            form.id = null;
            if (timeSlot) form.start_time = timeSlot;
        }
        isModalOpen.value = true;
    };

    return {
        localTasks, scheduledTasks, inboxTasks, 
        scheduledStats, inboxStats,
        form, isModalOpen, isEditing, activeModalType, conflictError,
        openModal, submitTask, deleteTask, toggleComplete
    };
}