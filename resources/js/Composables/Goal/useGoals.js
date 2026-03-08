import { ref, watch } from 'vue';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';
import axios from 'axios';

export function useGoals(props) {
    const localGoals = ref([]);
    const localStats = ref(props.stats ? { ...props.stats } : { total: 0, active: 0, completed: 0, paused: 0, cancelled: 0 });
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

    watch(() => props.goals, (newGoals) => {
        const incoming = initGoals(newGoals);
        localGoals.value = incoming.map(ing => {
            const existing = localGoals.value.find(lg => lg.id === ing.id);
            if (existing && existing.is_saving) return { ...ing, is_saving: true };
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

    const fireToast = (icon, message) => {
        Swal.fire({
            toast: true, position: 'top-end', showConfirmButton: false, timer: 2000,
            background: '#4f46e5', iconColor: '#ffffff', icon: icon,
            title: `<span style="color: white; font-weight: 900; font-size: 14px;">${message}</span>`,
            customClass: { popup: '!rounded-full !shadow-2xl !m-4' }
        });
    };

    const swalTheme = {
        customClass: {
            popup: 'rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl',
            title: 'text-2xl font-black text-slate-800 mb-2 font-sans',
            confirmButton: 'bg-indigo-600 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl active:scale-95 transition-all outline-none mx-2 tracking-wide',
            cancelButton: 'bg-slate-50 text-slate-400 font-bold py-3.5 px-8 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all outline-none mx-2 tracking-wide',
            actions: 'mt-6 gap-3',
        },
        buttonsStyling: false, focusConfirm: false
    };

    const openCreateModal = () => {
        editingGoal.value = {
            id: null, _key: `new_${Math.random().toString(36).substr(2, 9)}`, title: '',
            category: '', type: 'daily', status: 'active', priority: 'important', reward: '',
            cover_image_url: '', cover_image_path: '', progress: 0, target_value: 0, current_value: 0,
            start_date: new Date().toISOString().split('T')[0], end_date: null, is_new: true, milestones: []
        };
        isModalOpen.value = true;
    };

    const openEditModal = (goal) => {
        editingGoal.value = JSON.parse(JSON.stringify(goal));
        isModalOpen.value = true;
    };

    const closeModal = () => {
        isModalOpen.value = false;
        editingGoal.value = null;
    };

    const saveGoal = async (goalData) => {
        if (!goalData.title || goalData.title.trim() === '') {
            return fireToast('warning', t('warn_empty_title', 'Title is required!'));
        }

        let goal = localGoals.value.find(g => g.id === goalData.id);
        if (goalData.is_new) {
            goal = { ...goalData, is_saving: true };
            localGoals.value.unshift(goal);
        } else if (goal) {
            Object.assign(goal, goalData, { is_saving: true });
        }

        try {
            const url = goalData.is_new ? route('goals.store') : route('goals.update', goalData.id);
            const response = await axios.post(url, { ...goalData, _method: goalData.is_new ? 'POST' : 'PATCH' });

            if (response.data.data) {
                const savedGoal = response.data.data;
                const index = localGoals.value.findIndex(g => g._key === goalData._key);
                if (index !== -1) {
                    localGoals.value[index] = { ...savedGoal, _key: savedGoal.id, is_saving: false };
                }
                closeModal();
                fireToast('success', t('goal_success_save', 'Berhasil disimpan!'));
            }
        } catch (error) {
            fireToast('error', t('goal_error_save', 'Gagal menyimpan!'));
            if (goal) goal.is_saving = false;
        }
    };

    const uploadCoverImage = async (goalId, file) => {
        const formData = new FormData();
        formData.append('image', file);
        if (goalId) formData.append('id', goalId);
        try {
            const response = await axios.post(route('goals.uploadImage'), formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            return response.data;
        } catch (error) {
            fireToast('error', t('img_upload_error', 'Gagal upload gambar!'));
            throw error;
        }
    };

    const deleteGoal = async (id, isNew = false) => {
        if (isNew) return localGoals.value = localGoals.value.filter(g => g.id !== id);
        const result = await Swal.fire({ ...swalTheme, title: t('goal_delete_confirm', 'Hapus Goal?'), icon: 'warning', showCancelButton: true, confirmButtonText: t('btn_yes_delete', 'Ya, Hapus'), cancelButtonText: t('btn_cancel', 'Batal') });
        if (!result.isConfirmed) return;
        try {
            await axios.delete(route('goals.destroy', id));
            localGoals.value = localGoals.value.filter(g => g.id !== id);
            fireToast('success', t('goal_success_delete', 'Goal dihapus!'));
        } catch (e) { fireToast('error', t('goal_error_delete', 'Gagal menghapus!')); }
    };

    const addMilestone = async (goal) => {
        const tempId = 'temp_' + Date.now();
        if (!Array.isArray(goal.milestones)) goal.milestones = [];
        goal.milestones.push({ id: tempId, title: '', completed: false, target_date: null, is_new: true, is_saving: false });
        recalculateProgress(goal);
    };

    // 🔥 FIX: Save Milestone - Cari Referensi yang Benar & Swap ID
    const saveMilestone = async (goal, milestoneData) => {
        if (!milestoneData.title) return;
        const actualMilestone = goal.milestones.find(m => m.id === milestoneData.id);
        if (!actualMilestone) return;

        actualMilestone.title = milestoneData.title;
        actualMilestone.target_date = milestoneData.target_date;
        actualMilestone.is_saving = true;

        try {
            if (actualMilestone.is_new || String(actualMilestone.id).startsWith('temp_')) {
                const response = await axios.post(route('goals.milestones.store', goal.id), {
                    title: actualMilestone.title,
                    target_date: actualMilestone.target_date
                });
                if (response.data.data) {
                    actualMilestone.id = response.data.data.id; // SWAP KE REAL ID DARI DATABASE
                    actualMilestone.is_new = false;
                }
            } else {
                await axios.patch(route('goals.milestones.update', [goal.id, actualMilestone.id]), {
                    title: actualMilestone.title,
                    target_date: actualMilestone.target_date
                });
            }
        } catch (error) {
            fireToast('error', t('milestone_error_save', 'Gagal menyimpan langkah!'));
        } finally {
            actualMilestone.is_saving = false;
        }
    };

    const toggleMilestone = async (goal, milestone) => {
        if (String(milestone.id).startsWith('temp_') && !milestone.title) return; // Abaikan kalau kosong

        milestone.completed = !milestone.completed;
        recalculateProgress(goal);

        try {
            // Tunggu save kelar baru di-toggle ke DB kalau dia milestone baru
            if (String(milestone.id).startsWith('temp_')) await saveMilestone(goal, milestone);
            await axios.post(route('goals.milestones.toggle', [goal.id, milestone.id]));
        } catch (error) {
            milestone.completed = !milestone.completed; // Rollback
            recalculateProgress(goal);
            fireToast('error', t('milestone_error_toggle', 'Gagal update status!'));
        }
    };

    const deleteMilestone = async (goal, milestoneId) => {
        const index = goal.milestones.findIndex(m => m.id === milestoneId);
        if (index === -1) return;
        const milestone = goal.milestones[index];
        goal.milestones.splice(index, 1);
        recalculateProgress(goal);

        if (!String(milestoneId).startsWith('temp_')) {
            try { await axios.delete(route('goals.milestones.destroy', [goal.id, milestoneId])); }
            catch (error) { fireToast('error', t('milestone_error_delete', 'Gagal menghapus!')); }
        }
    };

    const recalculateProgress = (goal) => {
        const total = goal.milestones?.length || 0;
        if (total === 0) { goal.progress = 0; return; }
        const completed = goal.milestones.filter(m => m.completed).length;
        goal.progress = Math.round((completed / total) * 100);
    };

    return {
        localGoals, localStats, isModalOpen, editingGoal,
        openCreateModal, openEditModal, closeModal, saveGoal,
        uploadCoverImage, deleteGoal, addMilestone, saveMilestone, toggleMilestone, deleteMilestone
    };
}