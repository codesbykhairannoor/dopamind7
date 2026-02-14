import { ref, watch, computed, unref, withCtx, isRef, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useForm, router, usePage, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-DEa2QkKf.js";
import Swal from "sweetalert2";
import { trans } from "laravel-vue-i18n";
import axios from "axios";
import _sfc_main$2 from "./PlannerHeader-DG43UKy5.js";
import _sfc_main$3 from "./PlannerSidebar-B2n1lTXm.js";
import PlannerTimeline from "./PlannerTimeline-CKj6FvIl.js";
import _sfc_main$4 from "./PlannerModal-CDIK_4qp.js";
import PlannerBatchModal from "./PlannerBatchModal-6tLhH1zi.js";
import "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Modal-B2rYQMrj.js";
import "./InputLabel-BgCYZe1F.js";
import "./TextInput-BNWZnSh4.js";
import "./PrimaryButton-4NJ7Yqx3.js";
import "./SecondaryButton-BgIg9sGF.js";
function usePlannerTasks(props) {
  const localTasks = ref([...props.tasks]);
  const conflictError = ref(null);
  const isModalOpen = ref(false);
  const isEditing = ref(false);
  const activeModalType = ref("full");
  const form = useForm({
    id: null,
    title: "",
    start_time: null,
    end_time: null,
    type: 1,
    notes: ""
  });
  const t = (key, fallback) => {
    const result = trans(key);
    return result !== key ? result : fallback;
  };
  const fireToast = (icon, message, bgColor = "#4f46e5") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2e3,
      timerProgressBar: true,
      background: bgColor,
      iconColor: "#ffffff",
      icon,
      title: `<span style="color: white; font-weight: 900; font-size: 14px;">${message}</span>`,
      customClass: {
        container: "!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end",
        popup: "!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !w-auto !h-auto !min-w-[280px] !m-0"
      }
    });
  };
  const fireWarning = (message) => fireToast("warning", message, "#4f46e5");
  const fireSuccess = (message) => fireToast("success", message, "#4f46e5");
  const fireError = (message) => fireToast("error", message, "#4f46e5");
  const timeToMin = (t2) => {
    if (!t2) return 0;
    const [h, m] = t2.split(":").map(Number);
    return h * 60 + m;
  };
  const checkTimeValidity = () => {
    conflictError.value = null;
    if (!form.start_time || !form.end_time) return;
    const newStart = timeToMin(form.start_time);
    let newEnd = timeToMin(form.end_time);
    if (newEnd < newStart) newEnd += 1440;
    const duration = newEnd - newStart;
    if (duration < 15) {
      conflictError.value = `⛔ ${t("err_min_15_mins", "Minimal 15 menit!")}`;
      return;
    }
    const hasConflict = localTasks.value.some((task) => {
      if (isEditing.value && task.id === form.id) return false;
      if (!task.start_time) return false;
      const taskStart = timeToMin(task.start_time);
      let taskEnd = task.end_time ? timeToMin(task.end_time) : taskStart + 60;
      if (taskEnd < taskStart) taskEnd += 1440;
      return newStart < taskEnd && newEnd > taskStart;
    });
    if (hasConflict) conflictError.value = `⚠️ ${t("err_schedule_conflict", "Jadwal bentrok!")}`;
  };
  watch(() => [form.start_time, form.end_time], checkTimeValidity);
  const submitTask = () => {
    if (!form.title || form.title.trim() === "") {
      return fireWarning(t("warn_empty_title", "Judulnya diisi dulu, Bro!"));
    }
    if (activeModalType.value === "full") {
      if (!form.start_time || !form.end_time) {
        return fireWarning(t("warn_empty_time", "Tentukan jam mulai & selesai!"));
      }
      checkTimeValidity();
      if (conflictError.value) return;
    } else {
      form.start_time = null;
      form.end_time = null;
    }
    const payload = { ...form.data() };
    isModalOpen.value = false;
    fireSuccess(t("success_saved", "Tersimpan!"));
    if (isEditing.value) {
      const index = localTasks.value.findIndex((t2) => t2.id === form.id);
      if (index !== -1) localTasks.value[index] = { ...localTasks.value[index], ...payload };
      router.patch(route("planner.update", form.id), payload, {
        preserveScroll: true,
        onFinish: () => form.reset()
      });
    } else {
      const tempId = "temp_" + Date.now();
      localTasks.value.push({ ...payload, id: tempId, is_completed: false });
      router.post(route("planner.store"), payload, {
        preserveScroll: true,
        onError: () => {
          localTasks.value = localTasks.value.filter((t2) => t2.id !== tempId);
          fireError(t("err_save_failed", "Gagal menyimpan ke server!"));
        },
        onFinish: () => form.reset()
      });
    }
  };
  const deleteTask = (id) => {
    localTasks.value = localTasks.value.filter((t2) => t2.id !== id);
    isModalOpen.value = false;
    fireSuccess(t("success_deleted", "Dihapus!"));
    router.delete(route("planner.destroy", id), {
      preserveScroll: true,
      onError: () => {
        fireError(t("err_delete_failed", "Gagal menghapus data!"));
      }
    });
  };
  const toggleComplete = (task) => {
    task.is_completed = !task.is_completed;
    router.patch(route("planner.toggle", { plannerTask: task.id }), {}, {
      preserveScroll: true,
      preserveState: true
    });
  };
  watch(() => props.tasks, (newTasks) => {
    localTasks.value = [...newTasks];
  }, { deep: true });
  const scheduledTasks = computed(
    () => localTasks.value.filter((t2) => t2.start_time).sort((a, b) => a.start_time.localeCompare(b.start_time))
  );
  const inboxTasks = computed(() => localTasks.value.filter((t2) => !t2.start_time));
  const calculateStats = (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((t2) => t2.is_completed).length;
    return { total, completed, percent: total > 0 ? Math.round(completed / total * 100) : 0 };
  };
  const scheduledStats = computed(() => calculateStats(scheduledTasks.value));
  const inboxStats = computed(() => calculateStats(inboxTasks.value));
  const openModal = (task = null, timeSlot = null, type = "full") => {
    form.reset();
    form.clearErrors();
    conflictError.value = null;
    activeModalType.value = type;
    if (task) {
      isEditing.value = true;
      form.id = task.id;
      form.title = task.title;
      form.start_time = task.start_time;
      form.end_time = task.end_time;
      form.type = task.type;
      form.notes = task.notes || "";
    } else {
      isEditing.value = false;
      form.id = null;
      if (timeSlot) {
        form.start_time = timeSlot;
        const [h, m] = timeSlot.split(":").map(Number);
        form.end_time = `${(h + 1).toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      }
    }
    isModalOpen.value = true;
  };
  return {
    localTasks,
    scheduledTasks,
    inboxTasks,
    scheduledStats,
    inboxStats,
    form,
    isModalOpen,
    isEditing,
    activeModalType,
    conflictError,
    openModal,
    submitTask,
    deleteTask,
    toggleComplete
  };
}
function usePlannerDrag(localTasks) {
  const onDragStart = (evt, task) => {
    evt.dataTransfer.dropEffect = "move";
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("taskId", task.id);
  };
  const onDrop = async (evt, newStartTime) => {
    const taskId = parseInt(evt.dataTransfer.getData("taskId"));
    const task = localTasks.value.find((t) => t.id === taskId);
    if (task) {
      task.start_time = newStartTime;
      task.end_time = null;
      try {
        await axios.patch(route("planner.update", taskId), {
          start_time: newStartTime,
          end_time: null
        });
      } catch (error) {
        console.error("Gagal update timeline:", error);
      }
    }
  };
  return { onDragStart, onDrop };
}
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
function usePlanner(props) {
  var _a, _b;
  const taskLogic = usePlannerTasks(props);
  const dragLogic = usePlannerDrag(taskLogic.localTasks);
  const localNotes = ref(((_a = props.dailyLog) == null ? void 0 : _a.notes) || "");
  const localMeals = ref(((_b = props.dailyLog) == null ? void 0 : _b.meals) || { breakfast: "", lunch: "", dinner: "" });
  const activeModalType = ref("full");
  const saveLogSilent = debounce(async (data) => {
    try {
      await axios.post(route("planner.updateLog"), data);
    } catch (e) {
      console.error("Auto-save failed:", e);
    }
  }, 1e3);
  watch(localNotes, (val) => saveLogSilent({ notes: val }));
  watch(localMeals, (val) => saveLogSilent({ meals: val }), { deep: true });
  const timeSlots = Array.from({ length: 18 }, (_, i) => `${(i + 6).toString().padStart(2, "0")}:00`);
  const getTypeColor = (type) => {
    const colors = { 1: "bg-rose-50 text-rose-700 border-rose-200", 2: "bg-indigo-50 text-indigo-700 border-indigo-200", 3: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    return colors[type] || "bg-white text-slate-700 border-slate-200";
  };
  const resetBoard = () => {
    Swal.fire({
      title: "Hapus Semua Jadwal?",
      text: "Aksi ini tidak bisa dibatalkan, Bro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Bersihkan!",
      cancelButtonText: "Batal",
      buttonsStyling: false,
      // Custom Class untuk mengikuti tema Rounded OneForMind
      customClass: {
        popup: "rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl",
        title: "text-2xl font-black text-slate-800 mb-2 font-sans",
        htmlContainer: "text-sm text-slate-500 font-bold mb-4",
        confirmButton: "bg-rose-500 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-rose-200 active:scale-95 transition-all mx-2",
        cancelButton: "bg-slate-100 text-slate-400 font-black py-4 px-8 rounded-2xl hover:bg-slate-200 active:scale-95 transition-all mx-2",
        actions: "mt-6 gap-2"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localNotes.value = "";
        localMeals.value = { breakfast: "", lunch: "", dinner: "" };
        taskLogic.localTasks.value = [];
        router.post(route("planner.reset"), {}, {
          preserveScroll: true,
          onSuccess: () => {
            window.dispatchEvent(new Event("reset-local-storage"));
            Swal.fire({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              background: "#4f46e5",
              // Indigo solid
              iconColor: "#ffffff",
              icon: "success",
              title: '<span style="color: white; font-weight: 900;">Jadwal Direset!</span>',
              customClass: {
                container: "!fixed !top-5 !right-5 !z-[100000]",
                popup: "!rounded-full !shadow-2xl"
              }
            });
          }
        });
      }
    });
  };
  const openPlannerModal = (task = null, timeSlot = null, type = "full") => {
    activeModalType.value = type;
    taskLogic.openModal(task, timeSlot);
  };
  return {
    ...taskLogic,
    ...dragLogic,
    openModal: openPlannerModal,
    activeModalType,
    resetBoard,
    timeSlots,
    getTypeColor,
    localNotes,
    localMeals
  };
}
function usePlannerBatch() {
  const isBatchModalOpen = ref(false);
  const globalConflictError = ref(null);
  const batchForm = useForm({
    tasks: [
      { title: "", start_time: "08:00", end_time: "09:00", type: 1, notes: "" }
    ]
  });
  const openBatchModal = () => {
    batchForm.reset();
    batchForm.tasks = [{ title: "", start_time: "08:00", end_time: "09:00", type: 1, notes: "" }];
    batchForm.clearErrors();
    globalConflictError.value = null;
    isBatchModalOpen.value = true;
  };
  const closeBatchModal = () => {
    isBatchModalOpen.value = false;
    batchForm.reset();
    batchForm.clearErrors();
    globalConflictError.value = null;
  };
  const addBatchRow = () => {
    const lastTask = batchForm.tasks[batchForm.tasks.length - 1];
    let nextStart = "09:00";
    if (lastTask && lastTask.end_time) {
      nextStart = lastTask.end_time;
    }
    let [h, m] = nextStart.split(":").map(Number);
    let endH = (h + 1) % 24;
    let nextEnd = `${endH.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    batchForm.tasks.push({
      title: "",
      start_time: nextStart,
      end_time: nextEnd,
      type: 1,
      notes: ""
    });
  };
  const removeBatchRow = (index) => {
    if (batchForm.tasks.length > 1) {
      batchForm.tasks.splice(index, 1);
    }
  };
  const timeToMin = (t) => {
    if (!t) return 0;
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const validateBatch = () => {
    batchForm.clearErrors();
    globalConflictError.value = null;
    const existingTasks = usePage().props.tasks || [];
    let isValid = true;
    batchForm.tasks.forEach((task, index) => {
      if (!task.title) {
        batchForm.setError(`tasks.${index}.title`, "Required");
        isValid = false;
      }
      const start = timeToMin(task.start_time);
      let end = timeToMin(task.end_time);
      if (end < start) end += 1440;
      if (end - start < 15) {
        batchForm.setError(`tasks.${index}.end_time`, "Min 15 mins");
        globalConflictError.value = `Row ${index + 1}: Duration must be at least 15 minutes!`;
        isValid = false;
      }
      const clashExternal = existingTasks.some((existing) => {
        if (!existing.start_time || !existing.end_time) return false;
        const eStart = timeToMin(existing.start_time);
        let eEnd = timeToMin(existing.end_time);
        if (eEnd < eStart) eEnd += 1440;
        return start < eEnd && end > eStart;
      });
      if (clashExternal) {
        globalConflictError.value = `Row ${index + 1}: Clashes with an existing schedule!`;
        batchForm.setError(`tasks.${index}.start_time`, "Clash!");
        isValid = false;
      }
    });
    if (!isValid) return false;
    for (let i = 0; i < batchForm.tasks.length; i++) {
      const taskA = batchForm.tasks[i];
      const startA = timeToMin(taskA.start_time);
      let endA = timeToMin(taskA.end_time);
      if (endA < startA) endA += 1440;
      for (let j = i + 1; j < batchForm.tasks.length; j++) {
        const taskB = batchForm.tasks[j];
        const startB = timeToMin(taskB.start_time);
        let endB = timeToMin(taskB.end_time);
        if (endB < startB) endB += 1440;
        if (startA < endB && endA > startB) {
          globalConflictError.value = `Row ${i + 1} and Row ${j + 1} are overlapping!`;
          batchForm.setError(`tasks.${i}.start_time`, "Overlap");
          batchForm.setError(`tasks.${j}.start_time`, "Overlap");
          isValid = false;
        }
      }
    }
    return isValid;
  };
  const submitBatch = () => {
    if (!validateBatch()) return;
    batchForm.post(route("planner.batchStore"), {
      preserveScroll: true,
      onSuccess: () => {
        closeBatchModal();
      },
      onError: (errors) => {
        console.error("Batch Error", errors);
      }
    });
  };
  return {
    isBatchModalOpen,
    batchForm,
    globalConflictError,
    // 🔥 Return ini biar bisa dipake di Modal
    openBatchModal,
    closeBatchModal,
    addBatchRow,
    removeBatchRow,
    submitBatch
  };
}
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { tasks: Array, dailyLog: Object },
  setup(__props) {
    const props = __props;
    const {
      scheduledTasks,
      timeSlots,
      scheduledStats,
      form,
      isModalOpen,
      isEditing,
      openModal,
      submitTask,
      deleteTask,
      resetBoard,
      toggleComplete,
      onDragStart,
      onDrop,
      getTypeColor,
      localNotes,
      localMeals,
      conflictError
    } = usePlanner(props);
    const {
      isBatchModalOpen,
      batchForm,
      openBatchModal,
      addBatchRow,
      removeBatchRow,
      submitBatch
    } = usePlannerBatch();
    const switchToBatch = () => {
      isModalOpen.value = false;
      openBatchModal();
    };
    const switchToSingle = () => {
      isBatchModalOpen.value = false;
      openModal();
    };
    const handleFullReset = () => {
      resetBoard();
      window.dispatchEvent(new Event("reset-local-storage"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Daily Planner" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              openModal: () => unref(openModal)(null, null, "full"),
              resetBoard: handleFullReset,
              stats: unref(scheduledStats)
            }, null, _parent2, _scopeId));
            _push2(`<div class="w-full min-h-screen bg-slate-50/50 px-4 sm:px-6 lg:px-8 py-8"${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"${_scopeId}><div class="lg:col-span-3 order-1 lg:order-2 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(PlannerTimeline, {
              timeSlots: unref(timeSlots),
              scheduledTasks: unref(scheduledTasks),
              onDrop: unref(onDrop),
              onDragStart: unref(onDragStart),
              openModal: unref(openModal),
              toggleComplete: unref(toggleComplete),
              getTypeColor: unref(getTypeColor)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="lg:col-span-2 order-2 lg:order-1 w-full space-y-6 md:sticky md:top-24"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              stats: unref(scheduledStats),
              localNotes: unref(localNotes),
              "onUpdate:localNotes": ($event) => isRef(localNotes) ? localNotes.value = $event : null,
              localMeals: unref(localMeals),
              "onUpdate:localMeals": ($event) => isRef(localMeals) ? localMeals.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              show: unref(isModalOpen),
              form: unref(form),
              isEditing: unref(isEditing),
              conflictError: unref(conflictError),
              close: () => isModalOpen.value = false,
              submit: unref(submitTask),
              remove: unref(deleteTask),
              onSwitchToBatch: switchToBatch
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(PlannerBatchModal, {
              show: unref(isBatchModalOpen),
              form: unref(batchForm),
              conflictError: unref(conflictError),
              close: () => isBatchModalOpen.value = false,
              submit: unref(submitBatch),
              addRow: unref(addBatchRow),
              removeRow: unref(removeBatchRow),
              switchToSingle
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                openModal: () => unref(openModal)(null, null, "full"),
                resetBoard: handleFullReset,
                stats: unref(scheduledStats)
              }, null, 8, ["openModal", "stats"]),
              createVNode("div", { class: "w-full min-h-screen bg-slate-50/50 px-4 sm:px-6 lg:px-8 py-8" }, [
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-8 items-start" }, [
                  createVNode("div", { class: "lg:col-span-3 order-1 lg:order-2 w-full" }, [
                    createVNode(PlannerTimeline, {
                      timeSlots: unref(timeSlots),
                      scheduledTasks: unref(scheduledTasks),
                      onDrop: unref(onDrop),
                      onDragStart: unref(onDragStart),
                      openModal: unref(openModal),
                      toggleComplete: unref(toggleComplete),
                      getTypeColor: unref(getTypeColor)
                    }, null, 8, ["timeSlots", "scheduledTasks", "onDrop", "onDragStart", "openModal", "toggleComplete", "getTypeColor"])
                  ]),
                  createVNode("div", { class: "lg:col-span-2 order-2 lg:order-1 w-full space-y-6 md:sticky md:top-24" }, [
                    createVNode(_sfc_main$3, {
                      stats: unref(scheduledStats),
                      localNotes: unref(localNotes),
                      "onUpdate:localNotes": ($event) => isRef(localNotes) ? localNotes.value = $event : null,
                      localMeals: unref(localMeals),
                      "onUpdate:localMeals": ($event) => isRef(localMeals) ? localMeals.value = $event : null
                    }, null, 8, ["stats", "localNotes", "onUpdate:localNotes", "localMeals", "onUpdate:localMeals"])
                  ])
                ])
              ]),
              createVNode(_sfc_main$4, {
                show: unref(isModalOpen),
                form: unref(form),
                isEditing: unref(isEditing),
                conflictError: unref(conflictError),
                close: () => isModalOpen.value = false,
                submit: unref(submitTask),
                remove: unref(deleteTask),
                onSwitchToBatch: switchToBatch
              }, null, 8, ["show", "form", "isEditing", "conflictError", "close", "submit", "remove"]),
              createVNode(PlannerBatchModal, {
                show: unref(isBatchModalOpen),
                form: unref(batchForm),
                conflictError: unref(conflictError),
                close: () => isBatchModalOpen.value = false,
                submit: unref(submitBatch),
                addRow: unref(addBatchRow),
                removeRow: unref(removeBatchRow),
                switchToSingle
              }, null, 8, ["show", "form", "conflictError", "close", "submit", "addRow", "removeRow"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Planner/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
