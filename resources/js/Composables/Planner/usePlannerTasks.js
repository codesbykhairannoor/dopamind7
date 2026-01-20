import { ref, computed, watch } from 'vue'; 
import { router, useForm } from '@inertiajs/vue3';

export function usePlannerTasks(props) {
    const localTasks = ref([...props.tasks]);
    const conflictError = ref(null);

    watch(() => props.tasks, (newTasks) => {
        localTasks.value = [...newTasks];
    }, { deep: true });

    // 🔥 1. DEFINISI KATEGORI TASK
    const scheduledTasks = computed(() => 
        localTasks.value.filter(t => t.start_time).sort((a, b) => a.start_time.localeCompare(b.start_time))
    );

    const inboxTasks = computed(() => localTasks.value.filter(t => !t.start_time));

    // 🔥 2. FUNGSI HELPER HITUNG STATS
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

    // 🔥 3. PISAH STATS JADI DUA
    const scheduledStats = computed(() => calculateStats(scheduledTasks.value));
    const inboxStats = computed(() => calculateStats(inboxTasks.value));

    // --- FORM & MODAL STATE ---
    const form = useForm({
        id: null, title: '', start_time: null, end_time: null, type: 1, notes: ''
    });

    const isModalOpen = ref(false);
    const isEditing = ref(false);
    const activeModalType = ref('full'); 

    // --- LOGIC VALIDASI WAKTU (FULL) ---
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
            conflictError.value = `⚠️ Bentrok dengan: "${conflict.title}"`;
        }
    };

    watch(() => [form.start_time, form.end_time], validateTime);

    // --- MODAL CONTROL ---
    const openModal = (task = null, timeSlot = null, type = 'full') => {
        form.reset();
        conflictError.value = null;
        activeModalType.value = type;

        if (task) {
            isEditing.value = true;
            form.id = task.id;
            form.title = task.title;
            form.start_time = task.start_time;
            form.end_time = task.end_time;
            form.type = task.type;
            form.notes = task.notes;
            
            if (!task.start_time && type === 'auto') activeModalType.value = 'simple';
            else if (type === 'auto') activeModalType.value = 'full';

        } else {
            isEditing.value = false;
            form.type = 1; 
            if (timeSlot) {
                form.start_time = timeSlot;
                activeModalType.value = 'full';
            }
        }
        
        validateTime();
        isModalOpen.value = true;
    };

    // --- CRUD ACTIONS (SILENT OPTIMIZED) ---
    const submitTask = () => {
        if (conflictError.value) return; 

        const options = {
            onSuccess: () => isModalOpen.value = false,
            preserveScroll: true,
            preserveState: true,
            only: ['tasks'], // 🔥 Cuma refresh list tasks
            showProgress: false // 🔥 Matiin loading bar browser
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
                preserveScroll: true,
                only: ['tasks'],
                showProgress: false,
                onSuccess: () => isModalOpen.value = false
            });
        }
    };

    const toggleComplete = (task) => {
        task.is_completed = !task.is_completed; // Optimistic
        router.post(route('planner.toggle', task.id), {}, { 
            preserveScroll: true, 
            preserveState: true,
            only: ['tasks'],
            showProgress: false 
        });
    };

    const resetBoard = () => {
        if(confirm('Mulai hari baru?')) {
            router.post(route('planner.reset'), {}, { 
                preserveScroll: true,
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