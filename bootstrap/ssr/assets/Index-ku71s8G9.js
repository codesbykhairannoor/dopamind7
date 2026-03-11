import { ref, watch, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-D4dP8Gn-.js";
import Swal from "sweetalert2";
import "laravel-vue-i18n";
import axios from "axios";
import GoalStats from "./GoalStats-Bt6WRcdV.js";
import GoalCard from "./GoalCard-BcrWN-ts.js";
import GoalModal from "./GoalModal-C2gnof07.js";
import _sfc_main$1 from "./GoalHeader-SPaoQV16.js";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "./OneForMindIcon-Dwf7AvKJ.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "lucide-vue-next";
import "./MilestoneItem-k7xkfgWU.js";
import "./GoalDatePicker-Di7v62U2.js";
import "dayjs/plugin/localeData.js";
import "canvas-confetti";
function useGoals(props) {
  const localGoals = ref([]);
  usePage();
  const normalizeMilestones = (ms) => {
    if (!ms) return [];
    const raw = ms.data || ms || [];
    return (Array.isArray(raw) ? raw : []).map((m) => ({
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
  watch(() => props.goals, (newGoals) => {
    const normalized = (newGoals || []).map(normalizeGoal);
    localGoals.value = normalized.map((incoming) => {
      const existing = localGoals.value.find((lg) => lg.id === incoming.id);
      if (existing && (existing.is_auto_saving || existing.milestones.some((m) => m.is_saving))) {
        return existing;
      }
      return incoming;
    });
  }, { deep: true });
  const localStats = computed(() => {
    var _a, _b;
    const goals = localGoals.value;
    const total = goals.length;
    const active = goals.filter((g) => g.status === "active");
    const completed = goals.filter((g) => g.status === "completed").length;
    let mTotal = 0, mComp = 0, totalP = 0;
    goals.forEach((g) => {
      const ms = g.milestones || [];
      const c = ms.filter((m) => m.is_completed || m.completed).length;
      mTotal += ms.length;
      mComp += c;
      if (ms.length > 0) totalP += c / ms.length * 100;
    });
    const avgProgress = active.length > 0 ? Math.round(totalP / active.length) : 0;
    return {
      total,
      active: active.length,
      completed,
      paused: goals.filter((g) => g.status === "paused").length,
      cancelled: goals.filter((g) => g.status === "cancelled").length,
      avg_progress: Math.min(100, avgProgress),
      milestones_total: mTotal,
      milestones_completed: mComp,
      top_goal_title: ((_a = active.sort((a, b) => (b.progress || 0) - (a.progress || 0))[0]) == null ? void 0 : _a.title) || null,
      upcoming_deadlines_count: ((_b = props.stats) == null ? void 0 : _b.upcoming_deadlines_count) || 0
    };
  });
  const saveTimeouts = /* @__PURE__ */ new Map();
  const silentSaveMilestone = async (goal, milestone) => {
    const isNew = String(milestone.id).startsWith("temp_");
    milestone.is_saving = true;
    try {
      const url = isNew ? route("goals.milestones.store", goal.id) : route("goals.milestones.update", [goal.id, milestone.id]);
      const response = await axios.post(url, {
        ...milestone,
        _method: isNew ? "POST" : "PATCH"
      });
      if (response.data.data) {
        Object.assign(milestone, normalizeMilestones([response.data.data])[0], { is_saving: false });
        recalculateProgress(goal);
      }
    } catch (error) {
      console.error("[Persistence Error] Milestone save failed:", error);
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
    const comp = ms.filter((m) => m.is_completed || m.completed).length;
    goal.progress = Math.round(comp / ms.length * 100);
  };
  const toggleMilestone = async (goal, milestone) => {
    milestone.is_completed = !milestone.is_completed;
    milestone.completed = milestone.is_completed;
    recalculateProgress(goal);
    try {
      const res = await axios.post(route("goals.milestones.toggle", [goal.id, milestone.id]));
      if (res.data.data) {
        Object.assign(milestone, normalizeMilestones([res.data.data])[0]);
        recalculateProgress(goal);
      }
    } catch (e) {
      milestone.is_completed = !milestone.is_completed;
      milestone.completed = milestone.is_completed;
      recalculateProgress(goal);
      fireToast("error", "Gagal update status!");
    }
  };
  const saveMilestone = (goal, milestoneData) => {
    const m = goal.milestones.find((ms) => ms.id === milestoneData.id);
    if (!m) return;
    Object.assign(m, milestoneData);
    recalculateProgress(goal);
    debouncedSaveMilestone(goal, m);
  };
  const addMilestone = (goal) => {
    const m = { id: `temp_${Date.now()}`, title: "", is_completed: false, order: goal.milestones.length, is_saving: false };
    goal.milestones.push(m);
    recalculateProgress(goal);
  };
  const deleteMilestone = async (goal, mId) => {
    goal.milestones = goal.milestones.filter((m) => m.id !== mId);
    recalculateProgress(goal);
    if (!String(mId).startsWith("temp_")) {
      try {
        await axios.delete(route("goals.milestones.destroy", [goal.id, mId]));
      } catch (e) {
      }
    }
  };
  const isModalOpen = ref(false);
  const editingGoal = ref(null);
  const openCreateModal = () => {
    editingGoal.value = normalizeGoal({ id: null, title: "", type: "daily", status: "active", priority: "important", milestones: [] });
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
  const saveGoal = async (data) => {
    try {
      const url = data.id ? route("goals.update", data.id) : route("goals.store");
      const res = await axios.post(url, { ...data, _method: data.id ? "PATCH" : "POST" });
      if (res.data.data) {
        const refreshed = normalizeGoal(res.data.data);
        if (data.id) {
          const idx = localGoals.value.findIndex((g) => g.id === data.id);
          if (idx !== -1) localGoals.value[idx] = refreshed;
        } else {
          localGoals.value.unshift(refreshed);
        }
        closeModal();
        fireToast("success", "Goal berhasil dimanifestasi!");
      }
    } catch (e) {
      fireToast("error", "Gagal menyimpan!");
    }
  };
  const uploadCoverImage = async (goalId, file) => {
    const formData = new FormData();
    formData.append("image", file);
    if (goalId) formData.append("id", goalId);
    try {
      const response = await axios.post(route("goals.uploadImage"), formData, { headers: { "Content-Type": "multipart/form-data" } });
      return response.data;
    } catch (error) {
      fireToast("error", "Gagal upload gambar!");
      throw error;
    }
  };
  const deleteGoal = async (id) => {
    const res = await Swal.fire({ title: "Hapus Goal?", icon: "warning", showCancelButton: true, confirmButtonText: "Ya, Hapus" });
    if (!res.isConfirmed) return;
    try {
      await axios.delete(route("goals.destroy", id));
      localGoals.value = localGoals.value.filter((g) => g.id !== id);
      fireToast("success", "Goal dihapus!");
    } catch (e) {
      fireToast("error", "Gagal menghapus!");
    }
  };
  const fireToast = (icon, title) => {
    Swal.fire({ toast: true, position: "top-end", showConfirmButton: false, timer: 2e3, icon, title });
  };
  return {
    localGoals,
    localStats,
    isModalOpen,
    editingGoal,
    openCreateModal,
    openEditModal,
    closeModal,
    saveGoal,
    deleteGoal,
    uploadCoverImage,
    addMilestone,
    saveMilestone,
    toggleMilestone,
    deleteMilestone
  };
}
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AuthenticatedLayout }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    goals: Array,
    stats: Object,
    filters: Object,
    pagination: Object,
    auth: Object,
    errors: Object,
    flash: Object,
    app_config: Object,
    locale: String
  },
  setup(__props) {
    const props = __props;
    const {
      localGoals,
      localStats,
      isModalOpen,
      editingGoal,
      openCreateModal,
      openEditModal,
      closeModal,
      saveGoal,
      uploadCoverImage,
      deleteGoal,
      addMilestone,
      saveMilestone,
      toggleMilestone,
      deleteMilestone
    } = useGoals(props);
    computed(() => {
      const locale = usePage().props.locale || "id";
      return dayjs().locale(locale).format("dddd, D MMMM YYYY");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goal-tracker-page min-h-screen bg-slate-50/50" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("goal_page_title", "Goal Tracker")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { onAddClick: unref(openCreateModal) }, null, _parent));
      _push(`<div class="w-full lg:max-w-[96%] mx-auto p-4 md:p-6 lg:p-8 space-y-8 pb-24">`);
      _push(ssrRenderComponent(GoalStats, {
        stats: unref(localStats),
        goals: unref(localGoals)
      }, null, _parent));
      _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"><!--[-->`);
      ssrRenderList(unref(localGoals), (goal) => {
        _push(`<div>`);
        _push(ssrRenderComponent(GoalCard, {
          goal,
          onEdit: unref(openEditModal),
          onDelete: unref(deleteGoal),
          onAddMilestone: unref(addMilestone),
          onSaveMilestone: unref(saveMilestone),
          onToggleMilestone: unref(toggleMilestone),
          onDeleteMilestone: unref(deleteMilestone)
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(GoalModal, {
        show: unref(isModalOpen),
        goal: unref(editingGoal),
        onClose: unref(closeModal),
        onSave: unref(saveGoal),
        onUploadImage: unref(uploadCoverImage)
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
