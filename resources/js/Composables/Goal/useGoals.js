import { ref, watch, nextTick } from 'vue';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';
import axios from 'axios';

export function useGoals(props) {
    const localGoals = ref([]);
    const localStats = ref(props.stats ? { ...props.stats } : { total: 0, active: 0, completed: 0, paused: 0, cancelled: 0 });

    // Modal State
    const isModalOpen = ref(false);
    const editingGoal = ref(null);

    const initGoals = (goals) => {
        return (goals || []).map(g => ({
            ...g,
            _key: g.id || `temp_${Math.random().toString(36).substr(2, 9)}`,
            milestones: Array.isArray(g.milestones) ? g.milestones : [],
            is_saving: false
        }));
    };

    localGoals.value = initGoals(props.goals);

    // 🔥 FIX: Improved Sync Logic
    watch(() => props.goals, (newGoals) => {
        const incoming = initGoals(newGoals);

        // Match incoming goals with existing ones to maintain local state if necessary
        // But primarily trust the incoming props as the source of truth for PERSISTED goals
        localGoals.value = incoming.map(ing => {
            const existing = localGoals.value.find(lg => lg.id === ing.id);
            if (existing && existing.is_saving) {
                return { ...ing, is_saving: true }; // Keep saving state
            }
            return ing;
        });
    }, { deep: true });

    watch(() => props.stats, (newStats) => {
        if (newStats) localStats.value = { ...newStats };
    }, { deep: true });

    const t = (key, fallback) => {
        const result = trans(key);
        return result !== key ? result : fallback;
    };

    const fireToast = (message, icon = 'error', color = '#e11d48') => {
        Swal.fire({
            toast: true, position: 'top-end', showConfirmButton: false,
            timer: 3000, background: color, iconColor: '#ffffff', icon: icon,
            title: `<span style="color: white; font-weight: 700; font-size: 14px;">${message}</span>`,
            customClass: { popup: '!rounded-xl !shadow-lg !m-4' }
        });
    };

    const openCreateModal = () => {
        editingGoal.value = {
            id: null,
            _key: `new_${Math.random().toString(36).substr(2, 9)}`,
            title: '',
            category: '',
            type: 'daily',
            status: 'active',
            priority: 'important',
            reward: '',
            cover_image_url: '',
            cover_image_path: '',
            progress: 0,
            target_value: 0,
            current_value: 0,
            start_date: new Date().toISOString().split('T')[0],
            end_date: null,
            is_new: true,
            milestones: []
        };
        isModalOpen.value = true;
    };

    const openEditModal = (goal) => {
        editingGoal.value = JSON.parse(JSON.stringify(goal)); // Deep clone
        isModalOpen.value = true;
    };

    const closeModal = () => {
        isModalOpen.value = false;
        editingGoal.value = null;
    };

    const saveGoal = async (goalData) => {
        // Find existing local goal or create new one for optimistic update
        let goal;
        if (goalData.is_new) {
            goal = { ...goalData, is_saving: true };
            localGoals.value.unshift(goal);
        } else {
            goal = localGoals.value.find(g => g.id === goalData.id);
            if (goal) {
                Object.assign(goal, goalData, { is_saving: true });
            }
        }

        try {
            const url = goalData.is_new ? route('goals.store') : route('goals.update', goalData.id);
            const response = await axios.post(url, {
                ...goalData,
                _method: goalData.is_new ? 'POST' : 'PATCH'
            });

            if (response.data.data) {
                const savedGoal = response.data.data;
                const index = localGoals.value.findIndex(g => g._key === goalData._key);
                if (index !== -1) {
                    localGoals.value[index] = {
                        ...savedGoal,
                        _key: savedGoal.id,
                        is_saving: false
                    };
                }
                closeModal();
                fireToast(t('goal_success_save', 'Berhasil disimpan!'), 'success', '#4f46e5');
            }
        } catch (error) {
            console.error(error);
            fireToast(t('goal_error_save', 'Gagal menyimpan!'), 'error');
            if (goal) goal.is_saving = false;
        }
    };

    const uploadCoverImage = async (goalId, file) => {
        const formData = new FormData();
        formData.append('image', file);
        if (goalId) formData.append('id', goalId);

        try {
            const response = await axios.post(route('goals.uploadImage'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            fireToast(t('img_upload_error', 'Gagal upload gambar!'), 'error');
            throw error;
        }
    };

    const deleteGoal = async (id, isNew = false) => {
        if (isNew) {
            localGoals.value = localGoals.value.filter(g => g.id !== id);
            return;
        }

        const result = await Swal.fire({
            title: t('common.confirm_delete_title', 'Hapus Goal?'),
            text: t('common.confirm_delete_text', 'Aksi ini tidak bisa dibatalkan.'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#f1f5f9',
            confirmButtonText: t('common.yes_delete', 'Ya, Hapus'),
            cancelButtonText: t('common.cancel', 'Batal'),
            customClass: {
                confirmButton: '!rounded-xl !px-6 !py-3 !font-black !uppercase !tracking-widest !text-[10px]',
                cancelButton: '!rounded-xl !px-6 !py-3 !font-black !uppercase !tracking-widest !text-[10px] !text-slate-400',
                popup: '!rounded-[2rem] !p-8'
            }
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(route('goals.destroy', id));
            localGoals.value = localGoals.value.filter(g => g.id !== id);
            fireToast(t('goal_success_delete', 'Goal dihapus!'), 'success', '#4f46e5');
        } catch (e) {
            fireToast(t('goal_error_delete', 'Gagal menghapus!'), 'error');
        }
    };

    const autoSaveRow = async (goal) => {
        goal.is_saving = true;
        try {
            await axios.patch(route('goals.update', goal.id), {
                ...goal,
                _method: 'PATCH'
            });
        } catch (error) {
            fireToast(t('goal_error_save', 'Gagal menyimpan!'), 'error');
        } finally {
            goal.is_saving = false;
        }
    };

    const addMilestone = async (goal) => {
        const tempId = 'temp_' + Date.now();
        if (!Array.isArray(goal.milestones)) goal.milestones = [];

        goal.milestones.push({
            id: tempId,
            title: '',
            completed: false,
            target_date: null,
            is_new: true,
            is_saving: false
        });
        recalculateProgress(goal);
    };

    const saveMilestone = async (goal, milestone) => {
        if (!milestone.title) return;
        milestone.is_saving = true;

        try {
            if (milestone.is_new) {
                const response = await axios.post(route('goals.milestones.store', goal.id), {
                    title: milestone.title,
                    target_date: milestone.target_date
                });
                milestone.id = response.data.data.id;
                milestone.is_new = false;
            } else {
                await axios.patch(route('goals.milestones.update', [goal.id, milestone.id]), {
                    title: milestone.title,
                    target_date: milestone.target_date
                });
            }
            fireToast(t('milestone_success_save', 'Langkah disimpan!'), 'success', '#4f46e5');
        } catch (error) {
            fireToast(t('milestone_error_save', 'Gagal menyimpan langkah!'));
        } finally {
            milestone.is_saving = false;
        }
    };

    const toggleMilestone = async (goal, milestone) => {
        milestone.completed = !milestone.completed;
        const originalProgress = goal.progress;
        recalculateProgress(goal);

        try {
            await axios.post(route('goals.milestones.toggle', [goal.id, milestone.id]));
        } catch (error) {
            milestone.completed = !milestone.completed;
            goal.progress = originalProgress;
            fireToast(t('milestone_error_toggle', 'Gagal update status!'));
        }
    };

    const deleteMilestone = async (goal, milestoneId) => {
        const index = goal.milestones.findIndex(m => m.id === milestoneId);
        if (index === -1) return;

        const milestone = goal.milestones[index];
        goal.milestones.splice(index, 1);
        recalculateProgress(goal);

        if (!String(milestoneId).startsWith('temp_')) {
            try {
                await axios.delete(route('goals.milestones.destroy', [goal.id, milestoneId]));
            } catch (error) {
                fireToast(t('milestone_error_delete', 'Gagal menghapus langkah!'));
            }
        }
    };

    const recalculateProgress = (goal) => {
        const total = goal.milestones?.length || 0;
        if (total === 0) {
            goal.progress = 0;
            return;
        }
        const completed = goal.milestones.filter(m => m.completed).length;
        goal.progress = Math.round((completed / total) * 100);

        if (goal.progress === 100 && goal.status !== 'completed') {
            const oldStatus = goal.status;
            goal.status = 'completed';
            if (localStats.value[oldStatus]) localStats.value[oldStatus]--;
            localStats.value['completed']++;
            autoSaveRow(goal);
        }
    };

    return {
        localGoals, localStats,
        isModalOpen, editingGoal,
        openCreateModal, openEditModal, closeModal, saveGoal,
        uploadCoverImage, deleteGoal, autoSaveRow,
        addMilestone, saveMilestone, toggleMilestone, deleteMilestone
    };
}
