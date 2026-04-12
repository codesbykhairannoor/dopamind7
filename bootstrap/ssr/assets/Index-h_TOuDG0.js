import { ref, watch, computed, onMounted, resolveComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-LxN20lxq.js";
import Swal from "sweetalert2";
import { trans } from "laravel-vue-i18n";
import axios from "axios";
import { u as useGating } from "./useGating-DZoi6H2L.js";
import GoalStats from "./GoalStats-DPEMxdHt.js";
import GoalCard from "./GoalCard-D5tQeMSW.js";
import GoalModal from "./GoalModal-CINmz6SP.js";
import _sfc_main$1 from "./GoalHeader-BXL6tg2Y.js";
import { _ as _sfc_main$2 } from "./NeuralBridge-B9eXD-Ar.js";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { Target, CheckCircle2 } from "lucide-vue-next";
import "./OneForMindIcon-BiMr3Mnd.js";
import "./useAppearance-rDoGVD4_.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./MilestoneItem-pDR5JZap.js";
import "./GoalDatePicker-Di7v62U2.js";
import "dayjs/plugin/localeData.js";
import "canvas-confetti";
function useGoals(props) {
  const { isExplorer } = useGating();
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
    var _a, _b, _c, _d;
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
      top_goal_progress: active.length > 0 ? active[0].progress : 0,
      urgent_goal_title: ((_b = props.stats) == null ? void 0 : _b.urgent_goal_title) || null,
      urgent_goal_days_left: ((_c = props.stats) == null ? void 0 : _c.urgent_goal_days_left) ?? null,
      upcoming_deadlines_count: ((_d = props.stats) == null ? void 0 : _d.upcoming_deadlines_count) || 0
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
      fireToast("error", trans("goal_error_update_status"));
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
  const isSaving = ref(false);
  const errors = ref({});
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
    errors.value = {};
  };
  const saveGoal = async (data) => {
    var _a, _b, _c, _d;
    const isEditing = !!data.id;
    if (!isEditing && isExplorer.value && localGoals.value.length >= 1) {
      fireToast("error", trans("goal_limit_explorer"));
      return;
    }
    const tempId = data.id || `temp_${Date.now()}`;
    const optimisticData = { ...normalizeGoal(data), id: tempId, is_saving: true };
    const originalGoals = [...localGoals.value];
    if (isEditing) {
      const idx = localGoals.value.findIndex((g) => g.id === data.id);
      if (idx !== -1) localGoals.value[idx] = optimisticData;
    } else {
      localGoals.value.unshift(optimisticData);
    }
    closeModal();
    fireToast("success", isEditing ? trans("goal_success_update") : trans("goal_success_create"));
    try {
      const url = isEditing ? route("goals.update", data.id) : route("goals.store");
      const res = await axios.post(
        url,
        { ...data, _method: isEditing ? "PATCH" : "POST" },
        { headers: { "Accept": "application/json" } }
      );
      if (res.data.data) {
        const refreshed = normalizeGoal(res.data.data);
        const idx = localGoals.value.findIndex((g) => g.id === tempId);
        if (idx !== -1) {
          localGoals.value[idx] = refreshed;
        }
      }
    } catch (e) {
      console.error("[Vision Error] Sync failed:", ((_a = e.response) == null ? void 0 : _a.data) || e.message);
      localGoals.value = originalGoals;
      editingGoal.value = data;
      isModalOpen.value = true;
      if (((_b = e.response) == null ? void 0 : _b.status) === 422) {
        errors.value = e.response.data.errors || {};
      }
      const msg = ((_d = (_c = e.response) == null ? void 0 : _c.data) == null ? void 0 : _d.message) || trans("goal_error_sync");
      fireToast("error", msg);
    } finally {
      optimisticData.is_saving = false;
    }
  };
  const uploadCoverImage = async (goalId, file) => {
    var _a;
    if (isExplorer.value) {
      fireToast("error", trans("goal_cover_premium"));
      throw new Error("Premium feature");
    }
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      const msg = `${trans("goal_error_file_large")} (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max 2MB.`;
      fireToast("error", msg);
      throw new Error(msg);
    }
    const formData = new FormData();
    formData.append("image", file);
    if (goalId && !String(goalId).startsWith("temp_")) {
      formData.append("id", goalId);
    }
    try {
      const response = await axios.post(route("goals.uploadImage"), formData, { headers: { "Content-Type": "multipart/form-data" } });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 422 && ((_a = error.response.data.errors) == null ? void 0 : _a.image)) {
        fireToast("error", error.response.data.errors.image[0]);
      } else {
        fireToast("error", trans("goal_upload_error"));
      }
      throw error;
    }
  };
  const deleteGoal = async (id) => {
    const res = await Swal.fire({
      title: trans("goal_delete_title"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: trans("goal_delete_confirm"),
      cancelButtonText: trans("btn_cancel"),
      customClass: {
        popup: "rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl",
        title: "text-2xl font-black text-slate-800 mb-2 font-sans",
        confirmButton: "bg-rose-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl active:scale-95 transition-all outline-none mx-2 tracking-wide",
        cancelButton: "bg-slate-100 text-slate-400 font-bold py-3.5 px-8 rounded-2xl transition-all outline-none mx-2 tracking-wide"
      },
      buttonsStyling: false
    });
    if (!res.isConfirmed) return;
    const originalGoals = [...localGoals.value];
    localGoals.value = localGoals.value.filter((g) => g.id !== id);
    fireToast("success", trans("goal_success_delete"));
    try {
      await axios.delete(route("goals.destroy", id));
    } catch (e) {
      localGoals.value = originalGoals;
      fireToast("error", trans("goal_error_delete"));
    }
  };
  const fireToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2e3,
      icon,
      titleText: title,
      background: icon === "success" ? "#4f46e5" : "#ffffff",
      color: icon === "success" ? "#ffffff" : "#334155",
      // Force white text for success alerts
      iconColor: icon === "success" ? "#ffffff" : void 0,
      customClass: { popup: "!rounded-xl !shadow-lg !m-4" }
    });
  };
  return {
    localGoals,
    localStats,
    isModalOpen,
    editingGoal,
    isSaving,
    errors,
    openCreateModal,
    openEditModal,
    closeModal,
    saveGoal,
    deleteGoal,
    uploadCoverImage,
    addMilestone,
    saveMilestone,
    toggleMilestone,
    deleteMilestone,
    isExplorer
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
      isSaving,
      errors,
      openCreateModal,
      openEditModal,
      closeModal,
      saveGoal,
      uploadCoverImage,
      deleteGoal,
      saveMilestone,
      toggleMilestone,
      deleteMilestone,
      isExplorer
    } = useGoals(props);
    computed(() => {
      const locale = usePage().props.locale || "id";
      return dayjs().locale(locale).format("dddd, D MMMM YYYY");
    });
    const isMobile = ref(false);
    onMounted(() => {
      isMobile.value = window.innerWidth < 1024;
      window.addEventListener("resize", () => {
        isMobile.value = window.innerWidth < 1024;
      });
    });
    ref(false);
    const openPremiumPreview = () => router.visit(route("billing"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Edit3 = resolveComponent("Edit3");
      const _component_Award = resolveComponent("Award");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goal-tracker-page min-h-screen bg-slate-50/50 dark:bg-slate-950/50" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("goal_page_title", "Goal Tracker")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { onAddClick: unref(openCreateModal) }, null, _parent));
      _push(`<div class="w-full lg:max-w-[96%] mx-auto p-4 md:p-6 lg:p-8 space-y-8 pb-24">`);
      _push(ssrRenderComponent(_sfc_main$2, { module: "Goal" }, null, _parent));
      if (!isMobile.value) {
        _push(`<!--[-->`);
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
            onSaveMilestone: unref(saveMilestone),
            onToggleMilestone: unref(toggleMilestone),
            onDeleteMilestone: unref(deleteMilestone),
            isExplorer: unref(isExplorer),
            onOpenPreview: openPremiumPreview
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<div class="space-y-12 pb-32"><!--[-->`);
        ssrRenderList(unref(localGoals), (goal) => {
          var _a;
          _push(`<div${ssrRenderAttr("id", "mobile-goal-card-" + goal.id)} class="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden group active:scale-[0.98] transition-all duration-500"><div class="relative h-40 overflow-hidden">`);
          if (goal.cover_image_url) {
            _push(`<!--[--><img${ssrRenderAttr("src", goal.cover_image_url)} class="w-full h-full object-cover"><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div><!--]-->`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center relative" style="${ssrRenderStyle({ background: `radial-gradient(at 0% 0%, ${goal.color || "#6366f1"}33 0px, transparent 50%), radial-gradient(at 100% 100%, ${goal.color || "#6366f1"}33 0px, transparent 50%), ${goal.color || "#6366f1"}05` })}"><div class="absolute inset-0 backdrop-blur-[2px]"></div><div class="relative z-10 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl">`);
            _push(ssrRenderComponent(unref(Target), {
              size: 28,
              "stroke-width": "2.5",
              style: { color: goal.color || "#6366f1" }
            }, null, _parent));
            _push(`</div></div>`);
          }
          _push(`<div class="absolute inset-x-6 bottom-5"><span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-white/10 text-white border border-white/20 backdrop-blur-md mb-2 inline-block">${ssrInterpolate(goal.priority || "Important")}</span><h3 class="text-xl font-black text-white truncate drop-shadow-md">${ssrInterpolate(goal.title)}</h3></div><button class="absolute top-5 right-5 w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">`);
          _push(ssrRenderComponent(_component_Edit3, { size: 16 }, null, _parent));
          _push(`</button></div><div class="p-6 space-y-6"><div class="flex items-center justify-between px-1"><div class="flex flex-col"><span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">${ssrInterpolate(_ctx.$t("goal_manifestation", "Manifestation"))}</span><span class="text-xs font-black text-slate-800 dark:text-white tabular-nums">${ssrInterpolate(goal.progress || 0)}% Complete</span></div><div class="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div class="h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.2)]" style="${ssrRenderStyle({ width: (goal.progress || 0) + "%", backgroundColor: goal.color || "#6366f1" })}"></div></div></div><div class="space-y-4 relative pl-2"><div class="absolute left-[13px] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800 pointer-events-none"></div><!--[-->`);
          ssrRenderList(goal.milestones, (m, idx) => {
            _push(`<div class="${ssrRenderClass([m.is_completed ? "opacity-40" : "", "relative flex items-center gap-4 group/ms"])}"><button class="${ssrRenderClass([m.is_completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-100 dark:border-slate-800", "w-7 h-7 rounded-full border-2 z-10 shrink-0 flex items-center justify-center transition-all bg-white dark:bg-slate-900 shadow-sm"])}">`);
            if (m.is_completed) {
              _push(ssrRenderComponent(unref(CheckCircle2), {
                size: 14,
                "stroke-width": "3"
              }, null, _parent));
            } else {
              _push(`<div class="w-1.5 h-1.5 rounded-full" style="${ssrRenderStyle({ backgroundColor: goal.color || "#6366f1" })}"></div>`);
            }
            _push(`</button><p class="${ssrRenderClass([m.is_completed ? "line-through" : "", "text-xs font-black text-slate-700 dark:text-slate-200 flex-1 min-w-0"])}">${ssrInterpolate(m.title)}</p></div>`);
          });
          _push(`<!--]-->`);
          if (!((_a = goal.milestones) == null ? void 0 : _a.length)) {
            _push(`<div class="py-4 text-center"><p class="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">${ssrInterpolate(_ctx.$t("goal_no_steps", "No mastery steps"))}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
          if (goal.reward) {
            _push(`<div class="bg-amber-50/30 dark:bg-amber-500/5 px-6 py-4 border-t border-amber-100/50 dark:border-amber-900/20 flex items-center gap-3">`);
            _push(ssrRenderComponent(_component_Award, {
              size: 14,
              class: "text-amber-500"
            }, null, _parent));
            _push(`<p class="text-[9px] font-black text-amber-600/80 uppercase tracking-widest truncate">Reward: ${ssrInterpolate(goal.reward)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(ssrRenderComponent(GoalModal, {
        show: unref(isModalOpen),
        goal: unref(editingGoal),
        processing: unref(isSaving),
        errors: unref(errors),
        onClose: unref(closeModal),
        onSave: unref(saveGoal),
        onUploadImage: unref(uploadCoverImage)
      }, null, _parent));
      _push(`<button class="fixed bottom-24 right-6 w-16 h-16 bg-indigo-600 dark:bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-[0_20px_50px_rgba(79,70,229,0.4)] dark:shadow-[0_20px_50px_rgba(79,70,229,0.2)] md:hidden z-[100] active:scale-90 transition-all duration-300 border border-white/20">`);
      _push(ssrRenderComponent(unref(Target), {
        size: 28,
        "stroke-width": "2.5"
      }, null, _parent));
      _push(`<span class="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full animate-ping"></span><span class="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full"></span></button></div></div>`);
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
