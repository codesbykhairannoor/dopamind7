import { ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';

// Kita butuh akses ke `localHabits` untuk fungsi deleteFromEdit
export function useHabitModals(props, localHabits) {
    
    // Data Static
    const iconList = [
        '🔥', '💧', '🏃‍♂️', '📚', '🧘‍♂️', '💻', '💰', '💊',
        '🥦', '💤', '🧹', '🎸', '🎨', '🐶', '🎓', '⚡',
        '🚫', '🥗', '🏋️', '🚴', '🤲', '🕌', '✈️', '🎵'
    ];

    const colorPalette = [
        '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4',
        '#3b82f6', '#6366f1', '#d946ef', '#8b5cf6', '#64748b'
    ];

    // --- CREATE / EDIT FORM ---
    const showCreateModal = ref(false);
    const isEditing = ref(false);

    const form = useForm({
        id: null, name: '', icon: '⚡', color: '#6366f1', monthly_target: 20,
        period: props.monthQuery 
    });

    const editHabit = (habit) => {
        isEditing.value = true;
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
        form.id = null;
        showCreateModal.value = true;
    };

    const closeModal = () => {
        showCreateModal.value = false;
        setTimeout(() => {
            isEditing.value = false;
            form.reset();
            form.id = null;
        }, 200);
    };

    const submitHabit = () => {
        form.transform((data) => ({ ...data, period: props.monthQuery }));

        if (isEditing.value) {
            form.patch(route('habits.update', form.id), {
                onSuccess: () => { showCreateModal.value = false; form.reset(); }
            });
        } else {
            form.post(route('habits.store'), {
                onSuccess: () => { showCreateModal.value = false; form.reset(); }
            });
        }
    };

    // --- COPY MODAL ---
    const showCopyModal = ref(false);
    const openCopyModal = () => { showCopyModal.value = true; };
    const executeCopy = () => {
        router.post(route('habits.copy'), {
            current_period: props.monthQuery,
            prev_period: props.prevMonthQuery
        }, {
            preserveScroll: true,
            onSuccess: () => { showCopyModal.value = false; }
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
        router.delete(route('habits.destroy', habitToDelete.value.id), {
            preserveScroll: true,
            onSuccess: () => { showDeleteModal.value = false; habitToDelete.value = null; }
        });
    };

    const deleteFromEdit = () => {
        showCreateModal.value = false;
        const habitData = localHabits.value.find(h => h.id === form.id);
        confirmDelete(habitData);
    };

    return {
        iconList, colorPalette, form,
        showCreateModal, isEditing, editHabit, openCreateModal, closeModal, submitHabit,
        showCopyModal, openCopyModal, executeCopy,
        showDeleteModal, habitToDelete, confirmDelete, executeDelete, deleteFromEdit
    };
}