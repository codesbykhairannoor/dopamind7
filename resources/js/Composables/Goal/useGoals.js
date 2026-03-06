import { ref, watch } from 'vue';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';
import axios from 'axios';

export function useGoals(props) {
    const localGoals = ref(props.goals.map(g => ({
        ...g,
        _key: g.id || `new_${Math.random().toString(36).substr(2, 9)}`,
        milestones: Array.isArray(g.milestones) ? g.milestones : [],
        is_saving: false
    })));

    const selectedGoals = ref([]);
    const localStats = ref(props.stats ? { ...props.stats } : { total: 0, active: 0, completed: 0, paused: 0, cancelled: 0 });

    watch(() => props.goals, (newGoals) => {
        const unsavedGoals = localGoals.value.filter(g => g.is_new);
        const incomingGoals = (newGoals || []).map(g => ({
            ...g,
            milestones: Array.isArray(g.milestones) ? g.milestones : [],
            _key: g.id || `new_${Math.random().toString(36).substr(2, 9)}`,
            is_saving: false
        }));
        localGoals.value = [...unsavedGoals, ...incomingGoals];
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

    const addEmptyRow = () => {
        localGoals.value.unshift({
            id: null,
            _key: `new_${Math.random().toString(36).substr(2, 9)}`,
            title: '',
            category: '',
            type: 'daily',
            status: 'active',
            progress: 0,
            target_value: 0,
            current_value: 0,
            start_date: new Date().toISOString().split('T')[0],
            is_new: true,
            is_saving: false,
            milestones: []
        });
    };

    const autoSaveRow = async (goal) => {
        if (!goal.title && goal.is_new) return;

        goal.is_saving = true;
        try {
            const url = goal.is_new ? route('goals.store') : route('goals.update', goal.id);
            const response = await axios.post(url, {
                ...goal,
                _method: goal.is_new ? 'POST' : 'PATCH'
            });

            if (goal.is_new && response.data.data) {
                const savedGoal = response.data.data;
                goal.id = savedGoal.id;
                goal.is_new = false;
                // Merge milestones but keep local ones if they haven't been saved yet
                if (savedGoal.milestones) {
                    goal.milestones = savedGoal.milestones;
                }
            }

            // Re-fetch stats in background if possible, or just update local
            // For now, let Inertia handle it or just rely on the fact that store was successful
        } catch (error) {
            console.error(error);
            fireToast(t('goal_error_save', 'Gagal menyimpan!'), 'error');
        } finally {
            goal.is_saving = false;
        }
    };

    const deleteGoal = async (id, isNew = false) => {
        if (isNew || String(id).startsWith('temp_')) {
            localGoals.value = localGoals.value.filter(g => g.id !== id);
            return;
        }

        const goalToDelete = localGoals.value.find(g => g.id === id);
        if (goalToDelete) {
            localStats.value.total = Math.max(0, (localStats.value.total || 1) - 1);
            localStats.value[goalToDelete.status] = Math.max(0, (localStats.value[goalToDelete.status] || 1) - 1);
        }

        localGoals.value = localGoals.value.filter(g => g.id !== id);

        try {
            await axios.delete(route('goals.destroy', id), {
                headers: { 'Accept': 'application/json' }
            });
        } catch (e) {
            fireToast(t('goal_error_delete', 'Gagal menghapus!'), 'error');
        }
    };

    const toggleSelection = (goalId) => {
        const selIndex = selectedGoals.value.indexOf(goalId);
        selIndex > -1 ? selectedGoals.value.splice(selIndex, 1) : selectedGoals.value.push(goalId);
    };

    const selectAll = () => {
        selectedGoals.value.length === localGoals.value.length
            ? selectedGoals.value = []
            : selectedGoals.value = localGoals.value.map(g => g.id);
    };

    const bulkDelete = async () => {
        if (selectedGoals.value.length === 0) return;
        if (!confirm(t('goal_bulk_delete_confirm', `Hapus ${selectedGoals.value.length} target sekaligus?`).replace('{count}', selectedGoals.value.length))) return;

        const idsToDelete = [...selectedGoals.value];
        const validIds = idsToDelete.filter(id => !String(id).startsWith('temp_'));

        idsToDelete.forEach(id => {
            const goal = localGoals.value.find(g => g.id === id);
            if (goal) {
                localStats.value.total = Math.max(0, (localStats.value.total || 1) - 1);
                localStats.value[goal.status] = Math.max(0, (localStats.value[goal.status] || 1) - 1);
            }
        });
        localGoals.value = localGoals.value.filter(g => !idsToDelete.includes(g.id));
        selectedGoals.value = [];

        if (validIds.length > 0) {
            try {
                await axios.post(route('goals.bulk-delete'), { goal_ids: validIds }, {
                    headers: { 'Accept': 'application/json' }
                });
                fireToast(t('goal_bulk_delete_success', 'Berhasil dihapus!'), 'success', '#10b981');
            } catch (e) {
                fireToast(t('goal_error_bulk_delete', 'Gagal menghapus masal!'));
            }
        }
    };

    const addMilestone = async (goal) => {
        const tempId = 'temp_milestone_' + Date.now();
        const goalId = goal.id;

        // Optimistic UI
        if (!Array.isArray(goal.milestones)) {
            goal.milestones = [];
        }

        goal.milestones.push({
            id: tempId,
            title: '',
            completed: false,
            is_new: true,
            is_saving: false
        });

        recalculateProgress(goal);
    };

    const saveMilestone = async (goal, milestone) => {
        if (!milestone.title) return;
        if (milestone.is_saving) return;

        milestone.is_saving = true;

        try {
            if (milestone.is_new) {
                const response = await axios.post(route('goals.milestones.store', goal.id), {
                    title: milestone.title
                });
                milestone.id = response.data.data.id;
                milestone.is_new = false;
            } else {
                await axios.patch(route('goals.milestones.update', [goal.id, milestone.id]), {
                    title: milestone.title
                });
            }
        } catch (error) {
            fireToast(t('milestone_error_save', 'Gagal menyimpan langkah!'));
        } finally {
            milestone.is_saving = false;
        }
    };

    const toggleMilestone = async (goal, milestone) => {
        // We need a real ID to toggle on server
        if (String(milestone.id).startsWith('temp_')) {
            // If it's still temp, we only toggle locally for now
            // But usually, it should be saved by blur before this.
            milestone.completed = !milestone.completed;
            recalculateProgress(goal);
            return;
        }

        // Optimistic UI
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
        if (!Array.isArray(goal.milestones)) return;
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
                // Note: In a real app we might want to revert the UI here
            }
        }
    };

    const recalculateProgress = (goal) => {
        if (!Array.isArray(goal.milestones) || goal.milestones.length === 0) {
            goal.progress = 0;
            return;
        }
        const total = goal.milestones.length;
        const completed = goal.milestones.filter(m => m && m.completed).length;
        goal.progress = Math.round((completed / total) * 100);

        // Auto-update status if 100% (optional, but requested "Feel the Progress")
        if (goal.progress === 100 && goal.status !== 'completed') {
            const oldStatus = goal.status;
            goal.status = 'completed';
            localStats.value[oldStatus]--;
            localStats.value['completed']++;
            autoSaveRow(goal); // Sync to server
        }
    };

    return {
        localGoals, selectedGoals, localStats,
        addEmptyRow, autoSaveRow, deleteGoal,
        toggleSelection, selectAll, bulkDelete,
        addMilestone, saveMilestone, toggleMilestone, deleteMilestone
    };
}
