import { ref, watch, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-KQRa8kYn.js";
import Swal from "sweetalert2";
import { trans } from "laravel-vue-i18n";
import axios from "axios";
import "./GoalGrid-C-BB6fKH.js";
import _sfc_main$2 from "./GoalStats-wN1DBtYg.js";
import GoalCard from "./GoalCard-BR3XByzs.js";
import GoalModal from "./GoalModal-CuxcBTx6.js";
import _sfc_main$1 from "./GoalHeader-SPaoQV16.js";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "./OneForMindIcon-Dwf7AvKJ.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "lucide-vue-next";
import "./MilestoneItem-Bai7ZY72.js";
import "./GoalDatePicker-BSC27_Du.js";
import "dayjs/plugin/localeData.js";
import "canvas-confetti";
function useGoals(props) {
  const localGoals = ref([]);
  const localStats = ref(props.stats ? { ...props.stats } : { total: 0, active: 0, completed: 0, paused: 0, cancelled: 0 });
  const isModalOpen = ref(false);
  const editingGoal = ref(null);
  const initGoals = (goals) => {
    return (goals || []).map((g) => ({
      ...g,
      _key: g.id || `temp_${Math.random().toString(36).substr(2, 9)}`,
      milestones: Array.isArray(g.milestones) ? g.milestones : [],
      is_saving: false
    }));
  };
  localGoals.value = initGoals(props.goals);
  watch(() => props.goals, (newGoals) => {
    const incoming = initGoals(newGoals);
    localGoals.value = incoming.map((ing) => {
      const existing = localGoals.value.find((lg) => lg.id === ing.id);
      if (existing && existing.is_saving) {
        return { ...ing, is_saving: true };
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
  const fireToast = (icon, message) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2e3,
      timerProgressBar: true,
      background: "#4f46e5",
      iconColor: "#ffffff",
      icon,
      title: `<span style="color: white; font-weight: 900; font-size: 14px; line-height: 1.2;">${message}</span>`,
      customClass: {
        container: "!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end",
        popup: "!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !m-0 !w-auto !min-w-[280px]",
        timerProgressBar: "!bg-white/40 !h-1 !rounded-b-full"
      }
    });
  };
  const swalTheme = {
    customClass: {
      popup: "rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl",
      title: "text-2xl font-black text-slate-800 mb-2 font-sans",
      confirmButton: "bg-indigo-600 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl active:scale-95 transition-all outline-none mx-2 tracking-wide",
      cancelButton: "bg-slate-50 text-slate-400 font-bold py-3.5 px-8 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all outline-none mx-2 tracking-wide",
      actions: "mt-6 gap-3"
    },
    buttonsStyling: false,
    focusConfirm: false
  };
  const openCreateModal = () => {
    editingGoal.value = {
      id: null,
      _key: `new_${Math.random().toString(36).substr(2, 9)}`,
      title: "",
      category: "",
      type: "daily",
      status: "active",
      priority: "important",
      reward: "",
      cover_image_url: "",
      cover_image_path: "",
      progress: 0,
      target_value: 0,
      current_value: 0,
      start_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      end_date: null,
      is_new: true,
      milestones: []
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
    if (!goalData.title || goalData.title.trim() === "") {
      return fireToast("warning", t("warn_empty_title", "Title is required!"));
    }
    let goal;
    if (goalData.is_new) {
      goal = { ...goalData, is_saving: true };
      localGoals.value.unshift(goal);
    } else {
      goal = localGoals.value.find((g) => g.id === goalData.id);
      if (goal) {
        Object.assign(goal, goalData, { is_saving: true });
      }
    }
    try {
      const url = goalData.is_new ? route("goals.store") : route("goals.update", goalData.id);
      const response = await axios.post(url, {
        ...goalData,
        _method: goalData.is_new ? "POST" : "PATCH"
      });
      if (response.data.data) {
        const savedGoal = response.data.data;
        const index = localGoals.value.findIndex((g) => g._key === goalData._key);
        if (index !== -1) {
          localGoals.value[index] = {
            ...savedGoal,
            _key: savedGoal.id,
            is_saving: false
          };
        }
        closeModal();
        fireToast("success", t("goal_success_save", "Berhasil disimpan!"));
      }
    } catch (error) {
      console.error(error);
      fireToast("error", t("goal_error_save", "Gagal menyimpan!"));
      if (goal) goal.is_saving = false;
    }
  };
  const uploadCoverImage = async (goalId, file) => {
    const formData = new FormData();
    formData.append("image", file);
    if (goalId) formData.append("id", goalId);
    try {
      const response = await axios.post(route("goals.uploadImage"), formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    } catch (error) {
      fireToast("error", t("img_upload_error", "Gagal upload gambar!"));
      throw error;
    }
  };
  const deleteGoal = async (id, isNew = false) => {
    if (isNew) {
      localGoals.value = localGoals.value.filter((g) => g.id !== id);
      return;
    }
    const result = await Swal.fire({
      ...swalTheme,
      title: t("goal_delete_confirm", "Hapus Goal?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("btn_yes_delete", "Ya, Hapus"),
      cancelButtonText: t("btn_cancel", "Batal")
    });
    if (!result.isConfirmed) return;
    try {
      await axios.delete(route("goals.destroy", id));
      localGoals.value = localGoals.value.filter((g) => g.id !== id);
      fireToast("success", t("goal_success_delete", "Goal dihapus!"));
    } catch (e) {
      fireToast("error", t("goal_error_delete", "Gagal menghapus!"));
    }
  };
  const timers = {};
  const autoSaveRow = (goal) => {
    if (timers[goal.id]) clearTimeout(timers[goal.id]);
    goal.is_saving = true;
    timers[goal.id] = setTimeout(async () => {
      try {
        await axios.patch(route("goals.update", goal.id), {
          ...goal,
          _method: "PATCH"
        });
      } catch (error) {
        fireToast("error", t("goal_error_save", "Gagal menyimpan!"));
      } finally {
        goal.is_saving = false;
        delete timers[goal.id];
      }
    }, 1e3);
  };
  const addMilestone = async (goal) => {
    const tempId = "temp_" + Date.now();
    if (!Array.isArray(goal.milestones)) goal.milestones = [];
    goal.milestones.push({
      id: tempId,
      title: "",
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
    console.log(`[Persistence Audit] Saving milestone: ${milestone.title} for goal ${goal.id}`);
    try {
      if (milestone.is_new || String(milestone.id).startsWith("temp_")) {
        const response = await axios.post(route("goals.milestones.store", goal.id), {
          title: milestone.title,
          target_date: milestone.target_date
        });
        if (response.data.data) {
          milestone.id = response.data.data.id;
          milestone.is_new = false;
          console.log(`[Persistence Audit] Milestone created successfully with ID: ${milestone.id}`);
        }
      } else {
        await axios.patch(route("goals.milestones.update", [goal.id, milestone.id]), {
          title: milestone.title,
          target_date: milestone.target_date
        });
        console.log(`[Persistence Audit] Milestone updated successfully: ${milestone.id}`);
      }
      fireToast("success", t("milestone_success_save", "Langkah disimpan!"));
    } catch (error) {
      console.error("[Persistence Audit] Error saving milestone:", error);
      fireToast("error", t("milestone_error_save", "Gagal menyimpan langkah!"));
    } finally {
      milestone.is_saving = false;
    }
  };
  const toggleMilestone = async (goal, milestone) => {
    var _a;
    if (String(milestone.id).startsWith("temp_")) {
      if ((_a = milestone.title) == null ? void 0 : _a.trim()) {
        console.log("[Persistence Audit] Temp milestone has title, saving before toggle...");
        await saveMilestone(goal, milestone);
      } else {
        console.warn("[Persistence Audit] Cannot toggle temp milestone without title.");
        return;
      }
    }
    const originalStatus = milestone.completed;
    const originalProgress = goal.progress;
    milestone.completed = !milestone.completed;
    console.log(`[Persistence Audit] Toggling milestone ${milestone.id} to ${milestone.completed}`);
    recalculateProgress(goal);
    try {
      await axios.post(route("goals.milestones.toggle", [goal.id, milestone.id]));
      console.log(`[Persistence Audit] Toggle persisted for ${milestone.id}`);
    } catch (error) {
      console.error("[Persistence Audit] Error toggling milestone:", error);
      milestone.completed = originalStatus;
      goal.progress = originalProgress;
      fireToast("error", t("milestone_error_toggle", "Gagal update status!"));
    }
  };
  const deleteMilestone = async (goal, milestoneId) => {
    const index = goal.milestones.findIndex((m) => m.id === milestoneId);
    if (index === -1) return;
    goal.milestones[index];
    goal.milestones.splice(index, 1);
    recalculateProgress(goal);
    if (!String(milestoneId).startsWith("temp_")) {
      try {
        await axios.delete(route("goals.milestones.destroy", [goal.id, milestoneId]));
      } catch (error) {
        fireToast("error", t("milestone_error_delete", "Gagal menghapus langkah!"));
      }
    }
  };
  const recalculateProgress = (goal) => {
    var _a;
    const total = ((_a = goal.milestones) == null ? void 0 : _a.length) || 0;
    if (total === 0) {
      goal.progress = 0;
      return;
    }
    const completed = goal.milestones.filter((m) => m.completed).length;
    goal.progress = Math.round(completed / total * 100);
    if (goal.progress === 100 && goal.status !== "completed") {
      const oldStatus = goal.status;
      goal.status = "completed";
      if (localStats.value[oldStatus]) localStats.value[oldStatus]--;
      localStats.value["completed"]++;
      autoSaveRow(goal);
    }
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
    uploadCoverImage,
    deleteGoal,
    autoSaveRow,
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
      _push(ssrRenderComponent(_sfc_main$2, { stats: unref(localStats) }, null, _parent));
      _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"><!--[-->`);
      ssrRenderList(unref(localGoals), (goal) => {
        _push(`<div>`);
        _push(ssrRenderComponent(GoalCard, {
          goal,
          onEdit: ($event) => unref(openEditModal)(goal),
          onDelete: ($event) => unref(deleteGoal)(goal.id),
          onAddMilestone: ($event) => unref(addMilestone)(goal),
          onSaveMilestone: (m) => unref(saveMilestone)(goal, m),
          onToggleMilestone: (m) => unref(toggleMilestone)(goal, m),
          onDeleteMilestone: (mId) => unref(deleteMilestone)(goal, mId)
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
