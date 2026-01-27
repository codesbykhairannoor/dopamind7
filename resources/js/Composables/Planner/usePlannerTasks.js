import { ref, computed, watch } from 'vue'; 
import { router, useForm } from '@inertiajs/vue3';

export function usePlannerTasks(props) {
    // localTasks adalah sumber kebenaran di UI
    const localTasks = ref([...props.tasks]);
    const conflictError = ref(null);

    // Sync kalau ada perubahan dari server (Inertia reload)
    watch(() => props.tasks, (newTasks) => {
        localTasks.value = [...newTasks];
    }, { deep: true });

    // --- COMPUTED: STATS & CATEGORIES ---
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
            total, 
            completed, 
            pending: total - completed,
            percent: total > 0 ? Math.round((completed / total) * 100) : 0 
        };
    };

    const scheduledStats = computed(() => calculateStats(scheduledTasks.value));
    const inboxStats = computed(() => calculateStats(inboxTasks.value));

    // --- FORM & MODAL STATE ---
    const form = useForm({
        id: null, 
        title: '', 
        start_time: null, 
        end_time: null, 
        type: 1, 
        notes: ''
    });

    const isModalOpen = ref(false);
    const isEditing = ref(false);
    const activeModalType = ref('full'); 

    // --- LOGIC VALIDASI WAKTU ---
    const validateTime = () => {
        conflictError.value = null;
        if (!form.start_time) return;

        const toMinutes = (t) => {
            if (!t) return 0;
            const [h, m] = t.split(':').map(Number);
            return h * 60 + m;
        };

        const newStart = toMinutes(form.start_time);
        const newEnd = form.end_time ? toMinutes(form.end_time) : newStart + 60;

        const conflict = scheduledTasks.value.find(task => {
            if (isEditing.value && task.id === form.id) return false;
            const taskStart = toMinutes(task.start_time);
            const taskEnd = task.end_time ? toMinutes(task.end_time) : taskStart + 60;
            return newStart < taskEnd && newEnd > taskStart;
        });

        if (conflict) {
            conflictError.value = `⚠️ Bentrok: "${conflict.title}"`;
        }
    };

    watch(() => [form.start_time, form.end_time], validateTime);

    // --- MODAL CONTROL (FIXED) ---
    const openModal = (task = null, timeSlot = null, type = 'full') => {
        // 1. Reset Form ke state awal (sapu bersih data lama)
        form.reset();
        form.clearErrors();
        conflictError.value = null;
        activeModalType.value = type;

        if (task) {
            // MODE EDIT
            isEditing.value = true;
            form.id = task.id;
            form.title = task.title;
            form.start_time = task.start_time;
            form.end_time = task.end_time;
            form.type = task.type;
            form.notes = task.notes || ''; // Paksa string kosong jika null

            if (!task.start_time && type === 'auto') activeModalType.value = 'simple';
            else if (type === 'auto') activeModalType.value = 'full';
        } else {
            // MODE TAMBAH BARU (PASTIIN KOSONG)
            isEditing.value = false;
            form.id = null;
            form.title = '';
            form.notes = '';
            form.type = 1; 

            if (timeSlot) {
                form.start_time = timeSlot;
                activeModalType.value = 'full';
            } else {
                form.start_time = null;
                form.end_time = null;
            }
        }
        isModalOpen.value = true;
    };

    // --- CRUD ACTIONS (OPTIMIZED) ---
    const submitTask = () => {
        if (conflictError.value) return; 

        const options = {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                isModalOpen.value = false;
                form.reset(); // Sapu bersih setelah berhasil simpan
            },
            showProgress: false 
        };

        if (isEditing.value) {
            form.patch(route('planner.update', form.id), options);
        } else {
            form.post(route('planner.store'), options);
        }
    };

    const deleteTask = (id) => {
        if(confirm('Hapus task ini?')) {
            localTasks.value = localTasks.value.filter(t => t.id !== id);
            router.delete(route('planner.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                showProgress: false,
                onSuccess: () => {
                    isModalOpen.value = false;
                    form.reset();
                }
            });
        }
    };

    const toggleComplete = (task) => {
        task.is_completed = !task.is_completed;
        router.patch(route('planner.toggle', { plannerTask: task.id }), {}, { 
            preserveScroll: true, 
            preserveState: true,
            showProgress: false 
        });
    };

    const resetBoard = () => {
        if(confirm('Mulai hari baru?')) {
            localTasks.value = [];
            router.post(route('planner.reset'), {}, { 
                preserveScroll: true,
                preserveState: true,
                showProgress: false 
            });
        }
    };

    return {
        localTasks, scheduledTasks, inboxTasks, 
        scheduledStats, inboxStats,
        form, isModalOpen, isEditing, activeModalType, conflictError,
        openModal, submitTask, deleteTask, resetBoard, toggleComplete
    };
}