import { ref, computed, watch } from 'vue'; 
import { router, useForm } from '@inertiajs/vue3';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';

export function usePlannerTasks(props) {
    const localTasks = ref([...props.tasks]);
    const conflictError = ref(null);
    const isModalOpen = ref(false);
    const isEditing = ref(false);
    const activeModalType = ref('full');

    const form = useForm({
        id: null, 
        date: props.currentDate, 
        title: '', 
        start_time: null, 
        end_time: null, 
        type: 1, 
        notes: ''
    });

    watch(() => props.currentDate, (newDate) => {
        form.date = newDate;
    });

    const t = (key, fallback) => {
        const result = trans(key);
        return result !== key ? result : fallback;
    };

    const fireToast = (icon, message, bgColor = '#4f46e5') => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            background: bgColor, 
            iconColor: '#ffffff',
            icon: icon,
            title: `<span style="color: white; font-weight: 900; font-size: 14px;">${message}</span>`,
            customClass: {
                container: '!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end',
                popup: '!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !w-auto !h-auto !min-w-[280px] !m-0',
            }
        });
    };

    const fireWarning = (message) => fireToast('warning', message, '#4f46e5');
    const fireSuccess = (message) => fireToast('success', message, '#4f46e5');
    const fireError = (message) => fireToast('error', message, '#4f46e5');

    const timeToMin = (t) => {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const checkTimeValidity = () => {
        conflictError.value = null;
        if (!form.start_time || !form.end_time) return;
        const newStart = timeToMin(form.start_time);
        let newEnd = timeToMin(form.end_time);
        if (newEnd < newStart) newEnd += 1440; 

        const duration = newEnd - newStart;
        if (duration < 15) {
            conflictError.value = `⛔ ${t('err_min_15_mins', 'Minimal 15 menit!')}`;
            return;
        }

        const hasConflict = localTasks.value.some(task => {
            if (isEditing.value && task.id === form.id) return false;
            if (!task.start_time) return false;
            const taskStart = timeToMin(task.start_time);
            let taskEnd = task.end_time ? timeToMin(task.end_time) : taskStart + 60;
            if (taskEnd < taskStart) taskEnd += 1440;
            return (newStart < taskEnd && newEnd > taskStart);
        });

        if (hasConflict) conflictError.value = `⚠️ ${t('err_schedule_conflict', 'Jadwal bentrok!')}`;
    };

    watch(() => [form.start_time, form.end_time], checkTimeValidity);

    // --- LOGIC CRUD DIPERCEPAT ---
    const submitTask = () => {
        if (!form.title || form.title.trim() === '') {
            return fireWarning(t('warn_empty_title', 'Judulnya diisi dulu, Bro!'));
        }

        if (activeModalType.value === 'full') {
            if (!form.start_time || !form.end_time) return fireWarning(t('warn_empty_time', 'Tentukan jam mulai & selesai!'));
            checkTimeValidity(); 
            if (conflictError.value) return;
        } else {
            form.start_time = null;
            form.end_time = null;
        }

        const payload = { ...form.data() };
        isModalOpen.value = false;

        fireSuccess(t('success_saved', 'Tersimpan!')); 

        if (isEditing.value) {
            const index = localTasks.value.findIndex(t => t.id === form.id);
            if (index !== -1) localTasks.value[index] = { ...localTasks.value[index], ...payload };
            
            router.patch(route('planner.update', form.id), payload, {
                preserveScroll: true,
                preserveState: true,
                progress: false, // ✅ Matikan loading bar atas
                only: ['tasks', 'errors'], // ✅ Jangan load ulang halaman penuh
                onFinish: () => form.reset()
            });
        } else {
            const tempId = 'temp_' + Date.now();
            localTasks.value.push({ ...payload, id: tempId, is_completed: false });

            router.post(route('planner.store'), payload, {
                preserveScroll: true,
                preserveState: true,
                progress: false, // ✅ Matikan loading bar atas
                only: ['tasks', 'errors'], // ✅ The Magic Speed!
                onError: () => {
                    localTasks.value = localTasks.value.filter(t => t.id !== tempId);
                    fireError(t('err_save_failed', 'Gagal menyimpan ke server!'));
                },
                onFinish: () => form.reset()
            });
        }
    };

    const deleteTask = (id) => {
        localTasks.value = localTasks.value.filter(t => t.id !== id);
        isModalOpen.value = false;
        
        fireSuccess(t('success_deleted', 'Dihapus!'));

        router.delete(route('planner.destroy', id), {
            preserveScroll: true,
            preserveState: true,
            progress: false, // ✅ Kilat!
            only: ['tasks', 'errors'],
            onError: () => {
                fireError(t('err_delete_failed', 'Gagal menghapus data!'));
            }
        });
    };

    const toggleComplete = (task) => {
        task.is_completed = !task.is_completed;
        router.patch(route('planner.toggle', { plannerTask: task.id }), {}, { 
            preserveScroll: true, 
            preserveState: true,
            progress: false, 
            only: ['tasks', 'errors'] // ✅ Checklist Instan!
        });
    };

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
        return { total, completed, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
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
            form.date = task.date || props.currentDate; 
            form.title = task.title;
            form.start_time = task.start_time;
            form.end_time = task.end_time;
            form.type = task.type;
            form.notes = task.notes || '';
        } else {
            isEditing.value = false;
            form.id = null;
            form.date = props.currentDate; 
            
            if (timeSlot) {
                form.start_time = timeSlot;
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