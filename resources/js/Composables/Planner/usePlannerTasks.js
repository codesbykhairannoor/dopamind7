import { ref, computed, watch } from 'vue'; 
import { router, useForm } from '@inertiajs/vue3';

export function usePlannerTasks(props) {
    const localTasks = ref([...props.tasks]);
    const conflictError = ref(null); // State error (Bentrok atau Durasi Pendek)
    const isModalOpen = ref(false);
    const isEditing = ref(false);
    const activeModalType = ref('full');

    const form = useForm({
        id: null, title: '', start_time: null, end_time: null, type: 1, notes: ''
    });

    // --- 1. HELPER: Konversi Jam ke Menit ---
    const timeToMin = (t) => {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    // --- 2. LOGIC VALIDASI (Anti-Clash & Min Duration) ---
    const checkTimeValidity = () => {
        conflictError.value = null; // Reset error dulu
        
        // Hanya cek jika jam mulai & selesai sudah diisi
        if (!form.start_time || !form.end_time) return;

        const newStart = timeToMin(form.start_time);
        let newEnd = timeToMin(form.end_time);

        // Handle case lintas hari (misal 23:00 - 01:00) -> anggap +24 jam
        if (newEnd < newStart) newEnd += 1440; 

        // 🔥 VALIDASI 1: Minimal Durasi 15 Menit
        const duration = newEnd - newStart;
        if (duration < 15) {
            conflictError.value = "⛔ Durasi minimal 15 menit, Bro!";
            return; // Stop di sini, jangan cek bentrok dulu
        }

        // 🔥 VALIDASI 2: Cek Bentrok dengan Task Lain
        const hasConflict = localTasks.value.some(task => {
            // Jangan cek diri sendiri saat edit
            if (isEditing.value && task.id === form.id) return false;
            // Abaikan inbox task (yang gak punya jam)
            if (!task.start_time) return false;

            const taskStart = timeToMin(task.start_time);
            // Kalau task lain gak punya end_time, anggap durasi default 1 jam
            let taskEnd = task.end_time ? timeToMin(task.end_time) : taskStart + 60;
            
            if (taskEnd < taskStart) taskEnd += 1440; // Handle lintas hari task lain

            // Rumus tabrakan waktu: (Start A < End B) && (End A > Start B)
            return (newStart < taskEnd && newEnd > taskStart);
        });

        if (hasConflict) {
            conflictError.value = "⚠️ Jadwal bentrok dengan aktivitas lain!";
        }
    };

    // Pantau perubahan jam di form secara real-time
    watch(() => [form.start_time, form.end_time], checkTimeValidity);

    // --- 3. LOGIC CRUD ---
    const submitTask = () => {
        // Cek validasi sekali lagi sebelum submit (jaga-jaga user nge-bypass)
        checkTimeValidity();
        if (conflictError.value) return; 

        const payload = { ...form.data() };
        isModalOpen.value = false;

        if (isEditing.value) {
            // Update Lokal (Optimistic UI)
            const index = localTasks.value.findIndex(t => t.id === form.id);
            if (index !== -1) {
                localTasks.value[index] = { ...localTasks.value[index], ...payload };
            }
            // Update Server
            router.patch(route('planner.update', form.id), payload, {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => form.reset()
            });
        } else {
            // Create Lokal (Optimistic UI)
            const tempId = 'temp_' + Date.now();
            const newTask = { ...payload, id: tempId, is_completed: false };
            localTasks.value.push(newTask);

            // Create Server
            router.post(route('planner.store'), payload, {
                preserveScroll: true,
                onSuccess: () => {}, 
                onError: () => {
                    // Revert kalau gagal
                    localTasks.value = localTasks.value.filter(t => t.id !== tempId);
                },
                onFinish: () => form.reset()
            });
        }
    };

    // Fungsi Delete
    const deleteTask = (id) => {
        localTasks.value = localTasks.value.filter(t => t.id !== id);
        isModalOpen.value = false;

        router.delete(route('planner.destroy', id), {
            preserveScroll: true,
            preserveState: true
        });
    };

    const toggleComplete = (task) => {
        task.is_completed = !task.is_completed;
        router.patch(route('planner.toggle', { plannerTask: task.id }), {}, { 
            preserveScroll: true, preserveState: true
        });
    };

    // --- 4. COMPUTED & HELPERS ---
    watch(() => props.tasks, (newTasks) => {
        localTasks.value = [...newTasks];
    }, { deep: true });

    const scheduledTasks = computed(() => 
        localTasks.value.filter(t => t.start_time).sort((a, b) => a.start_time.localeCompare(b.start_time))
    );
    const inboxTasks = computed(() => localTasks.value.filter(t => !t.start_time));

    const calculateStats = (tasks) => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.is_completed).length;
        return { total, completed, pending: total - completed, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
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
            if (timeSlot) {
                form.start_time = timeSlot;
                // Auto set end time +1 jam (aman karena > 15 menit)
                const [h, m] = timeSlot.split(':').map(Number);
                form.end_time = `${(h+1).toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
            }
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