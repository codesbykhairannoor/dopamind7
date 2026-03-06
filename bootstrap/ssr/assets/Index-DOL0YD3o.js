import { ref, watch, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-C-Wa3zAY.js";
import Swal from "sweetalert2";
import { trans } from "laravel-vue-i18n";
import axios from "axios";
import _sfc_main$2 from "./GoalGrid-C1DZECWo.js";
import _sfc_main$1 from "./GoalStats-BNqvjfxt.js";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./GoalCard-BtgXExTJ.js";
import "./MilestoneItem-DUTUDKm8.js";
function useGoals(props) {
  const localGoals = ref(props.goals.map((g) => ({
    ...g,
    _key: g.id || `new_${Math.random().toString(36).substr(2, 9)}`,
    milestones: Array.isArray(g.milestones) ? g.milestones : [],
    is_saving: false
  })));
  const selectedGoals = ref([]);
  const localStats = ref(props.stats ? { ...props.stats } : { total: 0, active: 0, completed: 0, paused: 0, cancelled: 0 });
  watch(() => props.goals, (newGoals) => {
    const unsavedGoals = localGoals.value.filter((g) => g.is_new);
    const incomingGoals = (newGoals || []).map((g) => ({
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
  const fireToast = (message, icon = "error", color = "#e11d48") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3e3,
      background: color,
      iconColor: "#ffffff",
      icon,
      title: `<span style="color: white; font-weight: 700; font-size: 14px;">${message}</span>`,
      customClass: { popup: "!rounded-xl !shadow-lg !m-4" }
    });
  };
  const addEmptyRow = () => {
    localGoals.value.unshift({
      id: null,
      _key: `new_${Math.random().toString(36).substr(2, 9)}`,
      title: "",
      category: "",
      type: "daily",
      status: "active",
      progress: 0,
      target_value: 0,
      current_value: 0,
      start_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      is_new: true,
      is_saving: false,
      milestones: []
    });
  };
  const autoSaveRow = async (goal) => {
    if (!goal.title && goal.is_new) return;
    goal.is_saving = true;
    try {
      const url = goal.is_new ? route("goals.store") : route("goals.update", goal.id);
      const response = await axios.post(url, {
        ...goal,
        _method: goal.is_new ? "POST" : "PATCH"
      });
      if (goal.is_new && response.data.data) {
        const savedGoal = response.data.data;
        goal.id = savedGoal.id;
        goal.is_new = false;
        if (savedGoal.milestones) {
          goal.milestones = savedGoal.milestones;
        }
      }
    } catch (error) {
      console.error(error);
      fireToast(t("goal_error_save", "Gagal menyimpan!"), "error");
    } finally {
      goal.is_saving = false;
    }
  };
  const deleteGoal = async (id, isNew = false) => {
    if (isNew || String(id).startsWith("temp_")) {
      localGoals.value = localGoals.value.filter((g) => g.id !== id);
      return;
    }
    const goalToDelete = localGoals.value.find((g) => g.id === id);
    if (goalToDelete) {
      localStats.value.total = Math.max(0, (localStats.value.total || 1) - 1);
      localStats.value[goalToDelete.status] = Math.max(0, (localStats.value[goalToDelete.status] || 1) - 1);
    }
    localGoals.value = localGoals.value.filter((g) => g.id !== id);
    try {
      await axios.delete(route("goals.destroy", id), {
        headers: { "Accept": "application/json" }
      });
    } catch (e) {
      fireToast(t("goal_error_delete", "Gagal menghapus!"), "error");
    }
  };
  const toggleSelection = (goalId) => {
    const selIndex = selectedGoals.value.indexOf(goalId);
    selIndex > -1 ? selectedGoals.value.splice(selIndex, 1) : selectedGoals.value.push(goalId);
  };
  const selectAll = () => {
    selectedGoals.value.length === localGoals.value.length ? selectedGoals.value = [] : selectedGoals.value = localGoals.value.map((g) => g.id);
  };
  const bulkDelete = async () => {
    if (selectedGoals.value.length === 0) return;
    if (!confirm(t("goal_bulk_delete_confirm", `Hapus ${selectedGoals.value.length} target sekaligus?`).replace("{count}", selectedGoals.value.length))) return;
    const idsToDelete = [...selectedGoals.value];
    const validIds = idsToDelete.filter((id) => !String(id).startsWith("temp_"));
    idsToDelete.forEach((id) => {
      const goal = localGoals.value.find((g) => g.id === id);
      if (goal) {
        localStats.value.total = Math.max(0, (localStats.value.total || 1) - 1);
        localStats.value[goal.status] = Math.max(0, (localStats.value[goal.status] || 1) - 1);
      }
    });
    localGoals.value = localGoals.value.filter((g) => !idsToDelete.includes(g.id));
    selectedGoals.value = [];
    if (validIds.length > 0) {
      try {
        await axios.post(route("goals.bulk-delete"), { goal_ids: validIds }, {
          headers: { "Accept": "application/json" }
        });
        fireToast(t("goal_bulk_delete_success", "Berhasil dihapus!"), "success", "#10b981");
      } catch (e) {
        fireToast(t("goal_error_bulk_delete", "Gagal menghapus masal!"));
      }
    }
  };
  const addMilestone = async (goal) => {
    const tempId = "temp_milestone_" + Date.now();
    goal.id;
    if (!Array.isArray(goal.milestones)) {
      goal.milestones = [];
    }
    goal.milestones.push({
      id: tempId,
      title: "",
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
        const response = await axios.post(route("goals.milestones.store", goal.id), {
          title: milestone.title
        });
        milestone.id = response.data.data.id;
        milestone.is_new = false;
      } else {
        await axios.patch(route("goals.milestones.update", [goal.id, milestone.id]), {
          title: milestone.title
        });
      }
    } catch (error) {
      fireToast(t("milestone_error_save", "Gagal menyimpan langkah!"));
    } finally {
      milestone.is_saving = false;
    }
  };
  const toggleMilestone = async (goal, milestone) => {
    if (String(milestone.id).startsWith("temp_")) {
      milestone.completed = !milestone.completed;
      recalculateProgress(goal);
      return;
    }
    milestone.completed = !milestone.completed;
    const originalProgress = goal.progress;
    recalculateProgress(goal);
    try {
      await axios.post(route("goals.milestones.toggle", [goal.id, milestone.id]));
    } catch (error) {
      milestone.completed = !milestone.completed;
      goal.progress = originalProgress;
      fireToast(t("milestone_error_toggle", "Gagal update status!"));
    }
  };
  const deleteMilestone = async (goal, milestoneId) => {
    if (!Array.isArray(goal.milestones)) return;
    const index = goal.milestones.findIndex((m) => m.id === milestoneId);
    if (index === -1) return;
    goal.milestones[index];
    goal.milestones.splice(index, 1);
    recalculateProgress(goal);
    if (!String(milestoneId).startsWith("temp_")) {
      try {
        await axios.delete(route("goals.milestones.destroy", [goal.id, milestoneId]));
      } catch (error) {
        fireToast(t("milestone_error_delete", "Gagal menghapus langkah!"));
      }
    }
  };
  const recalculateProgress = (goal) => {
    if (!Array.isArray(goal.milestones) || goal.milestones.length === 0) {
      goal.progress = 0;
      return;
    }
    const total = goal.milestones.length;
    const completed = goal.milestones.filter((m) => m && m.completed).length;
    goal.progress = Math.round(completed / total * 100);
    if (goal.progress === 100 && goal.status !== "completed") {
      const oldStatus = goal.status;
      goal.status = "completed";
      localStats.value[oldStatus]--;
      localStats.value["completed"]++;
      autoSaveRow(goal);
    }
  };
  return {
    localGoals,
    selectedGoals,
    localStats,
    addEmptyRow,
    autoSaveRow,
    deleteGoal,
    toggleSelection,
    selectAll,
    bulkDelete,
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
    // Add standard Inertia props to avoid Vue warnings about extraneous attributes
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
      selectedGoals,
      localStats,
      autoSaveRow,
      deleteGoal,
      toggleSelection,
      addMilestone,
      saveMilestone,
      toggleMilestone,
      deleteMilestone
    } = useGoals(props);
    const todayDate = computed(() => {
      const locale = usePage().props.locale || "id";
      return dayjs().locale(locale).format("dddd, D MMMM YYYY");
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goal-tracker-page" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("goal_page_title", "Goal Tracker")
      }, null, _parent));
      _push(`<div class="min-h-screen bg-[#f8fafc] pb-24"><div class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm"><div class="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5"><div class="flex items-center gap-4"><div class="flex items-center gap-3"><div class="w-12 h-12 flex items-center justify-center text-2xl text-white bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 shrink-0"> 🎯 </div><div><h1 class="text-xl font-black leading-tight tracking-tight text-slate-800 flex items-center gap-2">${ssrInterpolate(_ctx.$t("goal_page_title", "Goal Tracker"))} `);
      if ((_a = __props.pagination) == null ? void 0 : _a.total) {
        _push(`<span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">${ssrInterpolate(__props.pagination.total)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="mt-0.5 text-xs font-bold uppercase tracking-wider text-slate-400">${ssrInterpolate(todayDate.value)}</p></div></div><button class="ml-auto bg-indigo-600 text-white font-bold py-3 px-8 rounded-[1.5rem] shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-[0.98] transition-all flex items-center gap-2 shrink-0"><span class="text-xl leading-none">+</span> ${ssrInterpolate(_ctx.$t("goal_add_row"))}</button></div></div></div><div class="w-full px-4 sm:px-6 lg:px-8 py-8">`);
      if (unref(localStats)) {
        _push(ssrRenderComponent(_sfc_main$1, { stats: unref(localStats) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(selectedGoals).length > 0) {
        _push(`<div class="mb-8 bg-slate-900 text-white rounded-[2.5rem] p-4 shadow-2xl flex items-center justify-between sticky top-24 z-30"><div class="flex items-center gap-4 ml-4"><span class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-black text-sm text-white shadow-lg shadow-indigo-500/20">${ssrInterpolate(unref(selectedGoals).length)}</span><span class="font-black text-sm uppercase tracking-wider">${ssrInterpolate(_ctx.$t("goal_bulk_selected"))}</span></div><div class="flex items-center gap-3 pr-2"><button class="px-8 py-3 bg-rose-500 hover:bg-rose-400 active:scale-95 text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-rose-500/20"><span>🗑️</span> ${ssrInterpolate(_ctx.$t("goal_bulk_delete"))}</button><button class="p-3 text-slate-400 hover:text-white transition-colors" title="Batal Pilih Semua"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, {
        goals: unref(localGoals),
        "selected-goals": unref(selectedGoals),
        "on-toggle-selection": unref(toggleSelection),
        "on-auto-save": unref(autoSaveRow),
        "on-delete": unref(deleteGoal),
        "on-add-milestone": unref(addMilestone),
        "on-save-milestone": unref(saveMilestone),
        "on-toggle-milestone": unref(toggleMilestone),
        "on-delete-milestone": unref(deleteMilestone)
      }, null, _parent));
      _push(`<div class="mt-12 flex items-center justify-start"><p class="text-[0.7rem] text-slate-400 font-black uppercase tracking-[0.2em] flex items-center gap-3 bg-white px-8 py-4 rounded-full border-2 border-slate-50 shadow-sm shadow-slate-200/50"><span class="text-indigo-500 text-xl">✨</span> ${ssrInterpolate(_ctx.$t("goal_tips", "SET TARGET LU & SELESAIKAN LANGKAH DEMI LANGKAH."))}</p></div></div></div></div>`);
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
