import { ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';

export function useHabitModals(props, localHabits) {
    
    // --- HELPER TRANSLASI ---
    const t = (key, fallback) => {
        const result = trans(key);
        return result !== key ? result : fallback;
    };

    // --- DATA STATIC ---
    const iconList = [
        '🔥', '💧', '🏃‍♂️', '📚', '🧘‍♂️', '💻', '💰', '💊',
        '🥦', '💤', '🧹', '🎸', '🎨', '🐶', '🎓', '⚡',
        '🚫', '🥗', '🏋️', '🚴', '🤲', '🕌', '✈️', '🎵'
    ];

    const colorPalette = [
        '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4',
        '#3b82f6', '#6366f1', '#d946ef', '#8b5cf6', '#64748b'
    ];

    // --- HELPER TOAST NOTIFIKASI ---
    const fireToast = (icon, message) => {
        Swal.fire({
            toast: true, position: 'top-end', showConfirmButton: false, timer: 3500,
            background: icon === 'error' ? '#ef4444' : '#4f46e5',
            color: '#fff', iconColor: '#fff', icon: icon, 
            title: `<span style="font-weight: 800; font-size: 14px;">${message}</span>`
        });
    };

    // --- STATE SINGLE MODE ---
    const showCreateModal = ref(false);
    const isEditing = ref(false);
    
    const form = useForm({
        id: null, name: '', icon: '⚡', color: '#6366f1', monthly_target: 20, 
        period: props.monthQuery 
    });

    // --- STATE BATCH MODE 🔥 ---
    const showBatchModal = ref(false);
    const batchForm = useForm({
        period: props.monthQuery,
        habits: [
            { name: '', icon: '⚡', color: '#6366f1', monthly_target: 20 }
        ]
    });

    // --- BATCH ACTIONS ---
    const openBatchModal = () => {
        batchForm.reset();
        batchForm.clearErrors();
        batchForm.habits = [{ name: '', icon: '⚡', color: '#6366f1', monthly_target: 20 }];
        showBatchModal.value = true;
    };

    const closeBatchModal = () => {
        showBatchModal.value = false;
        setTimeout(() => {
            batchForm.reset();
            batchForm.clearErrors();
        }, 300);
    };

    const addBatchRow = () => {
        batchForm.habits.push({ name: '', icon: '⚡', color: '#6366f1', monthly_target: 20 });
    };

    const removeBatchRow = (index) => {
        if (batchForm.habits.length > 1) batchForm.habits.splice(index, 1);
    };

    const switchToBatch = () => {
        showCreateModal.value = false;
        setTimeout(() => openBatchModal(), 150);
    };

    const switchToSingle = () => {
        showBatchModal.value = false;
        setTimeout(() => openCreateModal(), 150);
    };

    // 🔥 LOGIC SUBMIT BATCH (SUPER AMAN & INSTAN) 🔥
    const submitBatchHabit = () => {
        batchForm.clearErrors();
        let hasError = false;

        batchForm.habits.forEach((h, index) => {
            if (!h.name || h.name.trim() === '') {
                batchForm.setError(`habits.${index}.name`, t('warn_empty_habit_name', 'Nama habit wajib diisi!'));
                hasError = true;
            }
            if (!h.monthly_target || h.monthly_target < 1) {
                batchForm.setError(`habits.${index}.monthly_target`, t('warn_target_min', 'Target minimal 1!'));
                hasError = true;
            }
        });

        if (hasError) {
            fireToast('error', t('warn_check_red_form', 'Harap periksa form yang bergaris merah!'));
            return;
        }

        const rawHabits = JSON.parse(JSON.stringify(batchForm.habits));

        const newHabits = rawHabits.map((h, i) => ({
             ...h,
             id: 'temp_batch_' + Date.now() + '_' + i,
             period: props.monthQuery,
             logs: [],
             completed_count: 0
        }));

        localHabits.value.unshift(...newHabits);
        closeBatchModal();
        fireToast('success', t('success_batch_saved', 'Berhasil menyimpan banyak habit!'));

        router.post(route('habits.batchStore'), {
             period: props.monthQuery,
             habits: rawHabits
        }, {
             preserveScroll: true,
             preserveState: true,
             progress: false, // 🔥 Matikan loading bar biar kerasa instan
             onError: (errors) => {
                 const firstErrorMsg = Object.values(errors)[0] || t('error_server', 'Terjadi kesalahan di server.');
                 fireToast('error', `Gagal: ${firstErrorMsg}`);

                 localHabits.value = localHabits.value.filter(h => !newHabits.find(n => n.id === h.id));
                 
                 showBatchModal.value = true;
                 batchForm.habits = rawHabits;
             }
        });
    };

    // --- MODAL ACTIONS (SINGLE) ---
    const editHabit = (habit) => {
        isEditing.value = true;
        form.clearErrors();
        showCreateModal.value = true;
        form.id = habit.id;
        form.name = habit.name;
        form.icon = habit.icon;
        form.color = habit.color;
        form.monthly_target = habit.monthly_target;
    };

    const openCreateModal = () => {
        isEditing.value = false;
        form.reset();
        form.clearErrors();
        form.id = null;
        showCreateModal.value = true;
    };

    const closeModal = () => {
        showCreateModal.value = false;
        showCopyModal.value = false;
        showDeleteModal.value = false;
        
        setTimeout(() => {
            isEditing.value = false;
            form.reset();
            form.clearErrors();
            form.id = null;
        }, 300);
    };

    const submitHabit = () => {
        form.clearErrors();
        const payload = { ...form.data(), period: props.monthQuery };

        if (isEditing.value) {
            const index = localHabits.value.findIndex(h => h.id === form.id);
            if (index !== -1) Object.assign(localHabits.value[index], payload);
            
            const targetId = form.id;
            closeModal();
            fireToast('success', t('success_habit_updated', 'Habit berhasil diperbarui!'));

            router.patch(route('habits.update', targetId), payload, {
                preserveScroll: true, preserveState: true, progress: false,
                onError: (err) => {
                    fireToast('error', Object.values(err)[0] || t('error_update_habit', 'Gagal update habit'));
                    editHabit(localHabits.value[index]);
                }
            });
        } else {
            const tempId = 'temp_' + Date.now(); 
            localHabits.value.unshift({ ...payload, id: tempId, logs: [], completed_count: 0 });
            
            closeModal();
            fireToast('success', t('success_habit_created', 'Habit berhasil dibuat!'));

            router.post(route('habits.store'), payload, {
                preserveScroll: true, preserveState: true, progress: false,
                onError: (err) => {
                    localHabits.value = localHabits.value.filter(h => h.id !== tempId);
                    fireToast('error', Object.values(err)[0] || t('error_save_habit', 'Gagal menyimpan habit.'));
                    openCreateModal(); 
                }
            });
        }
    };

    // --- COPY MODAL ---
    const showCopyModal = ref(false);
    const openCopyModal = () => { showCopyModal.value = true; };
    const executeCopy = () => {
        showCopyModal.value = false; 
        fireToast('success', t('success_copy_habit', 'Berhasil menyalin dari bulan lalu!'));

        router.post(route('habits.copy'), {
            current_period: props.monthQuery, prev_period: props.prevMonthQuery
        }, { 
            preserveScroll: true, progress: false,
            onError: (err) => fireToast('error', Object.values(err)[0] || t('error_copy_habit', 'Gagal menyalin habit.'))
        });
    };

    // --- DELETE MODAL ---
    const showDeleteModal = ref(false);
    const habitToDelete = ref(null);

    const confirmDelete = (habit) => {
        habitToDelete.value = habit;
        showDeleteModal.value = true;
    };

    const executeDelete = () => {
        if (!habitToDelete.value) return;
        const id = habitToDelete.value.id;

        localHabits.value = localHabits.value.filter(h => h.id !== id);
        showDeleteModal.value = false;
        habitToDelete.value = null;
        fireToast('success', t('success_delete_habit', 'Habit berhasil dihapus!'));

        router.delete(route('habits.destroy', id), {
            preserveScroll: true, preserveState: true, progress: false,
            onError: () => fireToast('error', t('error_delete_habit', 'Gagal menghapus habit.'))
        });
    };

    const deleteFromEdit = () => {
        showCreateModal.value = false; 
        const habitData = localHabits.value.find(h => h.id === form.id);
        setTimeout(() => { if(habitData) confirmDelete(habitData); }, 200);
    };

    return {
        iconList, colorPalette, form,
        showCreateModal, isEditing, editHabit, openCreateModal, closeModal, submitHabit,
        showBatchModal, batchForm, openBatchModal, closeBatchModal, addBatchRow, removeBatchRow, submitBatchHabit, switchToBatch, switchToSingle,
        showCopyModal, openCopyModal, executeCopy,
        showDeleteModal, habitToDelete, confirmDelete, executeDelete, deleteFromEdit
    };
}