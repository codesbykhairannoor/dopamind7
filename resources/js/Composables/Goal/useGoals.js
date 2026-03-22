import { ref, watch, computed } from 'vue';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';
import axios from 'axios';
import { usePage } from '@inertiajs/vue3';
import { useGating } from '@/Composables/useGating';

export function useGoals(props) {
    const { canUse, isExplorer } = useGating();
    const localGoals = ref([]);
    const page = usePage();

    // 1. Data Initialization & Normalization
    const normalizeMilestones = (ms) => {
        if (!ms) return [];
        const raw = (ms.data || ms || []);
        return (Array.isArray(raw) ? raw : []).map(m => ({
            ...m,
            is_completed: !!(m.is_completed || m.completed),
            completed: !!(m.is_completed || m.completed),
            is_saving: false
        }));
    };

    const normalizeGoal = (g) => ({
        ...g,
        _key: g.id || `temp_${Math.random().toString(36).substr(2, 9)}`,
        milestones: normalizeMilestones(g.milestones),
        progress: g.progress || 0,
        is_saving: false,
        is_auto_saving: false
    });

    localGoals.value = (props.goals || []).map(normalizeGoal);

    // 2. Reactivity & State Syncing
    watch(() => props.goals, (newGoals) => {
        // Sync incoming props but preserve local "saving" states
        const normalized = (newGoals || []).map(normalizeGoal);
        localGoals.value = normalized.map(incoming => {
            const existing = localGoals.value.find(lg => lg.id === incoming.id);
            if (existing && (existing.is_auto_saving || existing.milestones.some(m => m.is_saving))) {
                return existing;
            }
            return incoming;
        });
    }, { deep: true });

    // 3. Derived Stats (Single Source of Truth)
    const localStats = computed(() => {
        const goals = localGoals.value;
        const total = goals.length;
        const active = goals.filter(g => g.status === 'active');
        const completed = goals.filter(g => g.status === 'completed').length;

        let mTotal = 0, mComp = 0, totalP = 0;
        goals.forEach(g => {
            const ms = g.milestones || [];
            const c = ms.filter(m => m.is_completed || m.completed).length;
            mTotal += ms.length;
            mComp += c;
            if (ms.length > 0) totalP += (c / ms.length) * 100;
        });

        const avgProgress = active.length > 0 ? Math.round(totalP / active.length) : 0;

        return {
            total,
            active: active.length,
            completed,
            paused: goals.filter(g => g.status === 'paused').length,
            cancelled: goals.filter(g => g.status === 'cancelled').length,
            avg_progress: Math.min(100, avgProgress),
            milestones_total: mTotal,
            milestones_completed: mComp,
            top_goal_title: active.sort((a, b) => (b.progress || 0) - (a.progress || 0))[0]?.title || null,
            upcoming_deadlines_count: props.stats?.upcoming_deadlines_count || 0
        };
    });

    // 4. Persistence Managers (Auto-Save)
    const saveTimeouts = new Map();

    const silentSaveMilestone = async (goal, milestone) => {
        const isNew = String(milestone.id).startsWith('temp_');
        milestone.is_saving = true;

        try {
            const url = isNew
                ? route('goals.milestones.store', goal.id)
                : route('goals.milestones.update', [goal.id, milestone.id]);

            const response = await axios.post(url, {
                ...milestone,
                _method: isNew ? 'POST' : 'PATCH'
            });

            if (response.data.data) {
                Object.assign(milestone, normalizeMilestones([response.data.data])[0], { is_saving: false });
                recalculateProgress(goal);
            }
        } catch (error) {
            console.error('[Persistence Error] Milestone save failed:', error);
            milestone.is_saving = false;
        }
    };

    const debouncedSaveMilestone = (goal, milestone) => {
        const key = `ms_${milestone.id}`;
        if (saveTimeouts.has(key)) clearTimeout(saveTimeouts.get(key));

        saveTimeouts.set(key, setTimeout(() => {
            silentSaveMilestone(goal, milestone);
            saveTimeouts.delete(key);
        }, 800));
    };

    const recalculateProgress = (goal) => {
        const ms = goal.milestones || [];
        if (ms.length === 0) return;
        const comp = ms.filter(m => m.is_completed || m.completed).length;
        goal.progress = Math.round((comp / ms.length) * 100);
    };

    // 5. Public Actions
    const toggleMilestone = async (goal, milestone) => {
        // Instant Optimistic Update
        milestone.is_completed = !milestone.is_completed;
        milestone.completed = milestone.is_completed;
        recalculateProgress(goal);

        try {
            const res = await axios.post(route('goals.milestones.toggle', [goal.id, milestone.id]));
            if (res.data.data) {
                Object.assign(milestone, normalizeMilestones([res.data.data])[0]);
                recalculateProgress(goal);
            }
        } catch (e) {
            // Rollback
            milestone.is_completed = !milestone.is_completed;
            milestone.completed = milestone.is_completed;
            recalculateProgress(goal);
            fireToast('error', 'Gagal update status!');
        }
    };

    const saveMilestone = (goal, milestoneData) => {
        const m = goal.milestones.find(ms => ms.id === milestoneData.id);
        if (!m) return;
        Object.assign(m, milestoneData);
        recalculateProgress(goal);
        debouncedSaveMilestone(goal, m);
    };

    const addMilestone = (goal) => {
        const m = { id: `temp_${Date.now()}`, title: '', is_completed: false, order: goal.milestones.length, is_saving: false };
        goal.milestones.push(m);
        recalculateProgress(goal);
    };

    const deleteMilestone = async (goal, mId) => {
        goal.milestones = goal.milestones.filter(m => m.id !== mId);
        recalculateProgress(goal);
        if (!String(mId).startsWith('temp_')) {
            try { await axios.delete(route('goals.milestones.destroy', [goal.id, mId])); } catch (e) { }
        }
    };

    // Modal & Goal Management
    const isModalOpen = ref(false);
    const editingGoal = ref(null);
    const isSaving = ref(false);
    const errors = ref({});

    const openCreateModal = () => {
        editingGoal.value = normalizeGoal({ id: null, title: '', type: 'daily', status: 'active', priority: 'important', milestones: [] });
        isModalOpen.value = true;
    };

    const openEditModal = (goal) => {
        editingGoal.value = JSON.parse(JSON.stringify(goal));
        isModalOpen.value = true;
    };

    const closeModal = () => { 
        isModalOpen.value = false; 
        editingGoal.value = null; 
        errors.value = {};
    };

    const saveGoal = async (data) => {
        const isEditing = !!data.id;
        
        // --- GATING: 1 GOAL LIMIT FOR EXPLORER ---
        if (!isEditing && isExplorer.value && localGoals.value.length >= 1) {
            fireToast('error', 'Explorer limit: 1 Goal. Upgrade to Architect for unlimited goals!');
            return;
        }

        const tempId = data.id || `temp_${Date.now()}`;
        const optimisticData = { ...normalizeGoal(data), id: tempId, is_saving: true };
        
        // --- STEP 1: OPTIMISTIC UPDATE ---
        const originalGoals = [...localGoals.value];
        if (isEditing) {
            const idx = localGoals.value.findIndex(g => g.id === data.id);
            if (idx !== -1) localGoals.value[idx] = optimisticData;
        } else {
            localGoals.value.unshift(optimisticData);
        }
        
        // Close modal immediately for "Instant" feel
        closeModal();
        fireToast('success', isEditing ? 'Vision Updated!' : 'Goal Manifested!');

        // --- STEP 2: BACKGROUND SYNC ---
        try {
            const url = isEditing ? route('goals.update', data.id) : route('goals.store');
            const res = await axios.post(url, 
                { ...data, _method: isEditing ? 'PATCH' : 'POST' },
                { headers: { 'Accept': 'application/json' } }
            );

            if (res.data.data) {
                const refreshed = normalizeGoal(res.data.data);
                const idx = localGoals.value.findIndex(g => g.id === tempId);
                if (idx !== -1) {
                    localGoals.value[idx] = refreshed;
                }
            }
        } catch (e) { 
            console.error('[Vision Error] Sync failed:', e.response?.data || e.message);
            
            // --- STEP 3: ROLLBACK ON ERROR ---
            localGoals.value = originalGoals;
            
            // Re-open modal so user doesn't lose data
            editingGoal.value = data;
            isModalOpen.value = true;
            
            if (e.response?.status === 422) {
                errors.value = e.response.data.errors || {};
            }
            const msg = e.response?.data?.message || trans('goal_sync_error');
            fireToast('error', msg); 
        } finally {
            optimisticData.is_saving = false;
        }
    };

    const uploadCoverImage = async (goalId, file) => {
        if (isExplorer.value) {
            fireToast('error', 'Goal Covers are available for Architect and above!');
            throw new Error('Premium feature');
        }
        const formData = new FormData();
        formData.append('image', file);
        if (goalId) formData.append('id', goalId);
        try {
            const response = await axios.post(route('goals.uploadImage'), formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            return response.data;
        } catch (error) {
            fireToast('error', trans('goal_upload_error'));
            throw error;
        }
    };

    const deleteGoal = async (id) => {
        const res = await Swal.fire({ 
            title: trans('goal_delete_title'), 
            icon: 'warning', 
            showCancelButton: true, 
            confirmButtonText: trans('goal_delete_confirm'),
            cancelButtonText: trans('btn_cancel'),
            customClass: {
                popup: 'rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl',
                title: 'text-2xl font-black text-slate-800 mb-2 font-sans',
                confirmButton: 'bg-rose-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl active:scale-95 transition-all outline-none mx-2 tracking-wide',
                cancelButton: 'bg-slate-100 text-slate-400 font-bold py-3.5 px-8 rounded-2xl transition-all outline-none mx-2 tracking-wide',
            },
            buttonsStyling: false
        });

        if (!res.isConfirmed) return;

        // --- STEP 1: OPTIMISTIC UPDATE ---
        const originalGoals = [...localGoals.value];
        localGoals.value = localGoals.value.filter(g => g.id !== id);
        fireToast('success', trans('goal_delete_success'));

        // --- STEP 2: BACKGROUND SYNC ---
        try {
            await axios.delete(route('goals.destroy', id));
        } catch (e) { 
            // --- STEP 3: ROLLBACK ---
            localGoals.value = originalGoals;
            fireToast('error', trans('goal_delete_error')); 
        }
    };

    const fireToast = (icon, title) => {
        Swal.fire({ 
            toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, 
            icon, title,
            background: icon === 'success' ? '#4f46e5' : '#ffffff',
            iconColor: icon === 'success' ? '#ffffff' : undefined,
            titleText: title,
            html: icon === 'success' ? `<span style="color: white; font-weight: 700; font-size: 14px;">${title}</span>` : undefined,
            customClass: { popup: '!rounded-xl !shadow-lg !m-4' }
        });
    };

    return {
        localGoals, localStats, isModalOpen, editingGoal, isSaving, errors,
        openCreateModal, openEditModal, closeModal, saveGoal, deleteGoal,
        uploadCoverImage, addMilestone, saveMilestone, toggleMilestone, deleteMilestone
    };
}
