import { ref, watch, computed, onMounted, onUnmounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { usePage, router, useForm, Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-D4dP8Gn-.js";
import dayjs from "dayjs";
import axios from "axios";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import localeData from "dayjs/plugin/localeData.js";
import Swal from "sweetalert2";
import { trans } from "laravel-vue-i18n";
import HabitHeader from "./HabitHeader-DPmgxF81.js";
import HabitGrid from "./HabitGrid-BiJu40ty.js";
import HabitStats from "./HabitStats-DHq23cP5.js";
import _sfc_main$1 from "./HabitModals-Bh1meCfg.js";
import "./OneForMindIcon-Dwf7AvKJ.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vuedraggable";
import "vue-chartjs";
import "chart.js";
import "./HabitBatchModal-DZDmHnoM.js";
import "./Modal-B2rYQMrj.js";
import "./PrimaryButton-4NJ7Yqx3.js";
import "./SecondaryButton-BgIg9sGF.js";
function useHabitCore(props) {
  const user = usePage().props.auth.user;
  const localHabits = ref(JSON.parse(JSON.stringify(props.habits.data)));
  watch(() => props.habits, (newVal) => {
    localHabits.value = JSON.parse(JSON.stringify(newVal.data));
  }, { deep: true });
  const greetingKey = computed(() => {
    const hour = dayjs().hour();
    if (hour < 11) return "greet_morning";
    if (hour < 15) return "greet_noon";
    if (hour < 19) return "greet_afternoon";
    return "greet_night";
  });
  const todayProgress = computed(() => {
    if (localHabits.value.length === 0) return 0;
    const todayStr = dayjs().format("YYYY-MM-DD");
    let completed = 0;
    localHabits.value.forEach((h) => {
      if (h.logs && h.logs[todayStr] === "completed") {
        completed++;
      }
    });
    return Math.round(completed / localHabits.value.length * 100);
  });
  const totalCompletions = computed(() => {
    let total = 0;
    localHabits.value.forEach((h) => total += h.progress_count);
    return total;
  });
  const overallPercentage = computed(() => {
    if (localHabits.value.length === 0) return 0;
    let totalPercent = 0;
    localHabits.value.forEach((h) => totalPercent += h.progress_percent);
    return Math.round(totalPercent / localHabits.value.length);
  });
  const getStatus = (habit, dateString) => {
    return habit.logs && habit.logs[dateString] ? habit.logs[dateString] : "empty";
  };
  const isDragging = ref(false);
  const selectedCells = ref(/* @__PURE__ */ new Set());
  const getCellId = (habitId, dateString) => `${habitId}|${dateString}`;
  const handleMouseDown = (e, habitId, dateString) => {
    if (dayjs(dateString).isAfter(dayjs(), "day")) return;
    isDragging.value = true;
    const isMulti = e && (e.ctrlKey || e.shiftKey);
    if (!isMulti) {
      selectedCells.value.clear();
    }
    selectedCells.value.add(getCellId(habitId, dateString));
  };
  const handleMouseEnter = (habitId, dateString) => {
    if (!isDragging.value) return;
    if (dayjs(dateString).isAfter(dayjs(), "day")) return;
    selectedCells.value.add(getCellId(habitId, dateString));
  };
  const handleMouseUp = () => {
    if (!isDragging.value) return;
    isDragging.value = false;
    if (selectedCells.value.size <= 1) {
      selectedCells.value.clear();
    }
  };
  const isCellSelected = (habitId, dateString) => {
    return selectedCells.value.has(getCellId(habitId, dateString));
  };
  onMounted(() => window.addEventListener("mouseup", handleMouseUp));
  onUnmounted(() => window.removeEventListener("mouseup", handleMouseUp));
  const toggleStatus = async (habitId, dateString, forceStatus = null) => {
    if (dayjs(dateString).isAfter(dayjs(), "day")) return;
    if (String(habitId).startsWith("temp_")) {
      console.warn("Please wait for habit to be saved before logging.");
      return;
    }
    const habitIndex = localHabits.value.findIndex((h) => h.id === habitId);
    if (habitIndex === -1) return;
    const habit = localHabits.value[habitIndex];
    const currentStatus = habit.logs[dateString] || "empty";
    let newStatus = "completed";
    if (forceStatus) {
      newStatus = currentStatus === forceStatus ? "uncheck" : forceStatus;
    } else {
      newStatus = currentStatus === "completed" || currentStatus === "skipped" ? "uncheck" : "completed";
    }
    if (newStatus === "uncheck") {
      delete habit.logs[dateString];
    } else {
      habit.logs[dateString] = newStatus;
    }
    const newCompletedCount = Object.values(habit.logs).filter((status) => status === "completed").length;
    habit.progress_count = newCompletedCount;
    habit.progress_percent = habit.monthly_target > 0 ? Math.min(100, Math.round(newCompletedCount / habit.monthly_target * 100)) : 0;
    try {
      await axios.post(route("habits.log", habitId), { date: dateString, status: newStatus });
    } catch (e) {
      console.error("Gagal save:", e);
    }
  };
  const toggleSelectedCells = async () => {
    if (selectedCells.value.size === 0) return;
    let isAllCompleted = true;
    let logsPayload = [];
    let validHabitsCount = 0;
    selectedCells.value.forEach((cellId) => {
      const [hIdStr, dStr] = cellId.split("|");
      if (String(hIdStr).startsWith("temp_")) return;
      const hId = parseInt(hIdStr);
      const habit = localHabits.value.find((h) => h.id === hId);
      if (habit) {
        validHabitsCount++;
        if (habit.logs[dStr] !== "completed") isAllCompleted = false;
      }
    });
    if (validHabitsCount === 0) {
      selectedCells.value.clear();
      return;
    }
    const targetStatus = isAllCompleted ? "uncheck" : "completed";
    selectedCells.value.forEach((cellId) => {
      const [hIdStr, dStr] = cellId.split("|");
      if (String(hIdStr).startsWith("temp_")) return;
      const hId = parseInt(hIdStr);
      const habit = localHabits.value.find((h) => h.id === hId);
      if (habit) {
        if (targetStatus === "uncheck") {
          delete habit.logs[dStr];
        } else {
          habit.logs[dStr] = targetStatus;
        }
        logsPayload.push({
          habit_id: hId,
          date: dStr,
          status: targetStatus
        });
        const newCompletedCount = Object.values(habit.logs).filter((status) => status === "completed").length;
        habit.progress_count = newCompletedCount;
        habit.progress_percent = habit.monthly_target > 0 ? Math.min(100, Math.round(newCompletedCount / habit.monthly_target * 100)) : 0;
      }
    });
    selectedCells.value.clear();
    try {
      await axios.post(route("habits.batch-log"), { logs: logsPayload });
    } catch (e) {
      console.error("Gagal save massal:", e);
    }
  };
  const handleGridNav = (e, hIndex, dIndex, habitId, dateString) => {
    const key = e.key;
    if (key === " ") {
      e.preventDefault();
      if (selectedCells.value.size > 1) {
        toggleSelectedCells();
      } else {
        toggleStatus(habitId, dateString);
        selectedCells.value.clear();
      }
      return;
    }
    if (key === "Escape") {
      selectedCells.value.clear();
      return;
    }
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) return;
    e.preventDefault();
    let targetH = hIndex;
    let targetD = dIndex;
    if (key === "ArrowUp") targetH--;
    if (key === "ArrowDown") targetH++;
    if (key === "ArrowLeft") targetD--;
    if (key === "ArrowRight") targetD++;
    const targetId = `cell-${targetH}-${targetD}`;
    const el = document.getElementById(targetId);
    if (el) {
      el.focus();
      el.scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
      if (e.shiftKey) {
        selectedCells.value.add(getCellId(habitId, dateString));
      } else {
        selectedCells.value.clear();
      }
    }
  };
  const moodOptions = [
    { code: "fire", icon: "🔥", label_key: "mood_fire", color: "bg-amber-100 text-amber-600" },
    { code: "happy", icon: "😄", label_key: "mood_happy", color: "bg-emerald-100 text-emerald-600" },
    { code: "neutral", icon: "😐", label_key: "mood_neutral", color: "bg-slate-100 text-slate-600" },
    { code: "sad", icon: "😢", label_key: "mood_sad", color: "bg-blue-100 text-blue-600" },
    { code: "stress", icon: "🤯", label_key: "mood_stress", color: "bg-rose-100 text-rose-600" },
    { code: "sick", icon: "🤒", label_key: "mood_sick", color: "bg-purple-100 text-purple-600" }
  ];
  const showMoodDropdown = ref(false);
  const currentMoodData = computed(() => {
    if (!props.savedMood) return moodOptions[0];
    return moodOptions.find((m) => m.code === props.savedMood) || moodOptions[0];
  });
  const selectMood = (code) => {
    showMoodDropdown.value = false;
    router.post(route("habits.mood"), {
      mood_code: code,
      period: props.monthQuery
    }, { preserveScroll: true });
  };
  const saveHabitOrder = async (newHabitsList) => {
    localHabits.value = newHabitsList;
    const orderedHabits = newHabitsList.filter((habit) => !String(habit.id).startsWith("temp_")).map((habit, index) => ({
      id: habit.id,
      position: index
    }));
    if (orderedHabits.length === 0) return;
    try {
      await axios.post(route("habits.reorder"), { habits: orderedHabits });
    } catch (e) {
      console.error("Gagal simpan urutan", e);
    }
  };
  return {
    user,
    localHabits,
    greetingKey,
    todayProgress,
    totalCompletions,
    overallPercentage,
    getStatus,
    toggleStatus,
    handleGridNav,
    isDragging,
    handleMouseDown,
    handleMouseEnter,
    isCellSelected,
    toggleSelectedCells,
    saveHabitOrder,
    moodOptions,
    showMoodDropdown,
    currentMoodData,
    selectMood
  };
}
dayjs.extend(localeData);
function useHabitDates(props) {
  const todayDate = computed(() => {
    const activeLang = usePage().props.locale || "id";
    return dayjs().locale(activeLang).format("dddd, D MMMM YYYY");
  });
  const monthDates = computed(() => {
    const activeLang = usePage().props.locale || "id";
    dayjs.locale(activeLang);
    const targetDate = props.monthQuery ? dayjs(props.monthQuery) : dayjs();
    const daysInMonth = targetDate.daysInMonth();
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = targetDate.date(i);
      days.push({
        dateString: date.format("YYYY-MM-DD"),
        dayNumber: i,
        dayName: date.format("ddd"),
        isToday: date.isSame(dayjs(), "day"),
        isFuture: date.isAfter(dayjs(), "day")
      });
    }
    return days;
  });
  const changeMonth = (payload) => {
    let newMonth;
    if (payload === "next" || payload === "prev") {
      const current = props.monthQuery ? dayjs(props.monthQuery) : dayjs();
      newMonth = payload === "next" ? current.add(1, "month").format("YYYY-MM") : current.subtract(1, "month").format("YYYY-MM");
    } else {
      newMonth = payload;
    }
    router.get(route("habits.index"), {
      month: newMonth
    }, {
      preserveState: false,
      // Force reload buat ambil data bulan baru
      preserveScroll: true
    });
  };
  return { todayDate, monthDates, changeMonth };
}
function useHabitModals(props, localHabits) {
  const t = (key, fallback) => {
    const result = trans(key);
    return result !== key ? result : fallback;
  };
  const iconList = [
    "🔥",
    "💧",
    "🏃‍♂️",
    "📚",
    "🧘‍♂️",
    "💻",
    "💰",
    "💊",
    "🥦",
    "💤",
    "🧹",
    "🎸",
    "🎨",
    "🐶",
    "🎓",
    "⚡",
    "🚫",
    "🥗",
    "🏋️",
    "🚴",
    "🤲",
    "🕌",
    "✈️",
    "🎵"
  ];
  const colorPalette = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#d946ef",
    "#8b5cf6",
    "#64748b"
  ];
  const fireToast = (icon, message) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3500,
      background: icon === "error" ? "#ef4444" : "#4f46e5",
      color: "#fff",
      iconColor: "#fff",
      icon,
      title: `<span style="font-weight: 800; font-size: 14px;">${message}</span>`
    });
  };
  const showCreateModal = ref(false);
  const isEditing = ref(false);
  const form = useForm({
    id: null,
    name: "",
    icon: "⚡",
    color: "#6366f1",
    monthly_target: 20,
    period: props.monthQuery
  });
  const showBatchModal = ref(false);
  const batchForm = useForm({
    period: props.monthQuery,
    habits: [
      { name: "", icon: "⚡", color: "#6366f1", monthly_target: 20 }
    ]
  });
  const openBatchModal = () => {
    batchForm.reset();
    batchForm.clearErrors();
    batchForm.habits = [{ name: "", icon: "⚡", color: "#6366f1", monthly_target: 20 }];
    showBatchModal.value = true;
  };
  const closeBatchModal = () => {
    showBatchModal.value = false;
    setTimeout(() => {
      batchForm.reset();
      batchForm.clearErrors();
    }, 300);
  };
  const addBatchRow = () => {
    batchForm.habits.push({ name: "", icon: "⚡", color: "#6366f1", monthly_target: 20 });
  };
  const removeBatchRow = (index) => {
    if (batchForm.habits.length > 1) batchForm.habits.splice(index, 1);
  };
  const switchToBatch = () => {
    showCreateModal.value = false;
    setTimeout(() => openBatchModal(), 150);
  };
  const switchToSingle = () => {
    showBatchModal.value = false;
    setTimeout(() => openCreateModal(), 150);
  };
  const submitBatchHabit = () => {
    batchForm.clearErrors();
    let hasError = false;
    batchForm.habits.forEach((h, index) => {
      if (!h.name || h.name.trim() === "") {
        batchForm.setError(`habits.${index}.name`, t("warn_empty_habit_name", "Nama habit wajib diisi!"));
        hasError = true;
      }
      if (!h.monthly_target || h.monthly_target < 1) {
        batchForm.setError(`habits.${index}.monthly_target`, t("warn_target_min", "Target minimal 1!"));
        hasError = true;
      }
    });
    if (hasError) {
      fireToast("error", t("warn_check_red_form", "Harap periksa form yang bergaris merah!"));
      return;
    }
    const rawHabits = JSON.parse(JSON.stringify(batchForm.habits));
    const newHabits = rawHabits.map((h, i) => ({
      ...h,
      id: "temp_batch_" + Date.now() + "_" + i,
      period: props.monthQuery,
      logs: [],
      completed_count: 0
    }));
    localHabits.value.unshift(...newHabits);
    closeBatchModal();
    fireToast("success", t("success_batch_saved", "Berhasil menyimpan banyak habit!"));
    router.post(route("habits.batchStore"), {
      period: props.monthQuery,
      habits: rawHabits
    }, {
      preserveScroll: true,
      preserveState: true,
      progress: false,
      // 🔥 Matikan loading bar biar kerasa instan
      onError: (errors) => {
        const firstErrorMsg = Object.values(errors)[0] || t("error_server", "Terjadi kesalahan di server.");
        fireToast("error", `Gagal: ${firstErrorMsg}`);
        localHabits.value = localHabits.value.filter((h) => !newHabits.find((n) => n.id === h.id));
        showBatchModal.value = true;
        batchForm.habits = rawHabits;
      }
    });
  };
  const editHabit = (habit) => {
    if (String(habit.id).startsWith("temp_")) {
      fireToast("warning", t("warn_wait_sync", "Harap tunggu hingga habit tersimpan."));
      return;
    }
    isEditing.value = true;
    form.clearErrors();
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
    form.clearErrors();
    form.id = null;
    showCreateModal.value = true;
  };
  const closeModal = () => {
    showCreateModal.value = false;
    showCopyModal.value = false;
    showDeleteModal.value = false;
    setTimeout(() => {
      isEditing.value = false;
      form.reset();
      form.clearErrors();
      form.id = null;
    }, 300);
  };
  const submitHabit = () => {
    form.clearErrors();
    const payload = { ...form.data(), period: props.monthQuery };
    if (isEditing.value) {
      const index = localHabits.value.findIndex((h) => h.id === form.id);
      if (index !== -1) Object.assign(localHabits.value[index], payload);
      const targetId = form.id;
      closeModal();
      fireToast("success", t("success_habit_updated", "Habit berhasil diperbarui!"));
      router.patch(route("habits.update", targetId), payload, {
        preserveScroll: true,
        preserveState: true,
        progress: false,
        onError: (err) => {
          fireToast("error", Object.values(err)[0] || t("error_update_habit", "Gagal update habit"));
          editHabit(localHabits.value[index]);
        }
      });
    } else {
      const tempId = "temp_" + Date.now();
      localHabits.value.unshift({ ...payload, id: tempId, logs: [], completed_count: 0 });
      closeModal();
      fireToast("success", t("success_habit_created", "Habit berhasil dibuat!"));
      router.post(route("habits.store"), payload, {
        preserveScroll: true,
        preserveState: true,
        progress: false,
        onError: (err) => {
          localHabits.value = localHabits.value.filter((h) => h.id !== tempId);
          fireToast("error", Object.values(err)[0] || t("error_save_habit", "Gagal menyimpan habit."));
          openCreateModal();
        }
      });
    }
  };
  const showCopyModal = ref(false);
  const openCopyModal = () => {
    showCopyModal.value = true;
  };
  const executeCopy = () => {
    showCopyModal.value = false;
    fireToast("success", t("success_copy_habit", "Berhasil menyalin dari bulan lalu!"));
    router.post(route("habits.copy"), {
      current_period: props.monthQuery,
      prev_period: props.prevMonthQuery
    }, {
      preserveScroll: true,
      progress: false,
      onError: (err) => fireToast("error", Object.values(err)[0] || t("error_copy_habit", "Gagal menyalin habit."))
    });
  };
  const showDeleteModal = ref(false);
  const habitToDelete = ref(null);
  const confirmDelete = (habit) => {
    habitToDelete.value = habit;
    showDeleteModal.value = true;
  };
  const executeDelete = () => {
    if (!habitToDelete.value) return;
    const id = habitToDelete.value.id;
    localHabits.value = localHabits.value.filter((h) => h.id !== id);
    showDeleteModal.value = false;
    habitToDelete.value = null;
    fireToast("success", t("success_delete_habit", "Habit berhasil dihapus!"));
    if (String(id).startsWith("temp_")) return;
    router.delete(route("habits.destroy", id), {
      preserveScroll: true,
      preserveState: true,
      progress: false,
      onError: () => fireToast("error", t("error_delete_habit", "Gagal menghapus habit."))
    });
  };
  const deleteFromEdit = () => {
    showCreateModal.value = false;
    const habitData = localHabits.value.find((h) => h.id === form.id);
    setTimeout(() => {
      if (habitData) confirmDelete(habitData);
    }, 200);
  };
  return {
    iconList,
    colorPalette,
    form,
    showCreateModal,
    isEditing,
    editHabit,
    openCreateModal,
    closeModal,
    submitHabit,
    showBatchModal,
    batchForm,
    openBatchModal,
    closeBatchModal,
    addBatchRow,
    removeBatchRow,
    submitBatchHabit,
    switchToBatch,
    switchToSingle,
    showCopyModal,
    openCopyModal,
    executeCopy,
    showDeleteModal,
    habitToDelete,
    confirmDelete,
    executeDelete,
    deleteFromEdit
  };
}
function useHabits(props) {
  const core = useHabitCore(props);
  const dates = useHabitDates(props);
  const modals = useHabitModals(props, core.localHabits);
  return {
    // --- Dari Core ---
    user: core.user,
    localHabits: core.localHabits,
    greetingKey: core.greetingKey,
    todayProgress: core.todayProgress,
    totalCompletions: core.totalCompletions,
    overallPercentage: core.overallPercentage,
    getStatus: core.getStatus,
    toggleStatus: core.toggleStatus,
    handleGridNav: core.handleGridNav,
    moodOptions: core.moodOptions,
    showMoodDropdown: core.showMoodDropdown,
    currentMoodData: core.currentMoodData,
    selectMood: core.selectMood,
    // 🔥 FITUR SPREADSHEET (SELECT)
    isDragging: core.isDragging,
    handleMouseDown: core.handleMouseDown,
    handleMouseEnter: core.handleMouseEnter,
    isCellSelected: core.isCellSelected,
    toggleSelectedCells: core.toggleSelectedCells,
    // 🔥 FITUR DRAG & DROP REORDER (Via VueDraggable)
    saveHabitOrder: core.saveHabitOrder,
    // --- Dari Dates ---
    todayDate: dates.todayDate,
    monthDates: dates.monthDates,
    changeMonth: dates.changeMonth,
    // --- Dari Modals ---
    iconList: modals.iconList,
    colorPalette: modals.colorPalette,
    form: modals.form,
    showCreateModal: modals.showCreateModal,
    isEditing: modals.isEditing,
    openCreateModal: modals.openCreateModal,
    editHabit: modals.editHabit,
    closeModal: modals.closeModal,
    submitHabit: modals.submitHabit,
    showDeleteModal: modals.showDeleteModal,
    habitToDelete: modals.habitToDelete,
    confirmDelete: modals.confirmDelete,
    executeDelete: modals.executeDelete,
    deleteFromEdit: modals.deleteFromEdit,
    showCopyModal: modals.showCopyModal,
    openCopyModal: modals.openCopyModal,
    executeCopy: modals.executeCopy,
    // Batch Modal
    showBatchModal: modals.showBatchModal,
    batchForm: modals.batchForm,
    openBatchModal: modals.openBatchModal,
    closeBatchModal: modals.closeBatchModal,
    addBatchRow: modals.addBatchRow,
    removeBatchRow: modals.removeBatchRow,
    submitBatchHabit: modals.submitBatchHabit,
    switchToBatch: modals.switchToBatch,
    switchToSingle: modals.switchToSingle
  };
}
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: AuthenticatedLayout
}, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    habits: Object,
    currentMonth: String,
    monthQuery: String,
    hasPrevHabits: Boolean,
    prevMonthQuery: String,
    savedMood: String
  },
  setup(__props) {
    const props = __props;
    const {
      // Data Utama
      user,
      localHabits,
      todayDate,
      greetingKey,
      monthDates,
      todayProgress,
      totalCompletions,
      overallPercentage,
      changeMonth,
      getStatus,
      toggleStatus,
      handleGridNav,
      moodOptions,
      currentMoodData,
      selectMood,
      // Modal Single Habit
      iconList,
      colorPalette,
      form,
      showCreateModal,
      isEditing,
      openCreateModal,
      editHabit,
      closeModal,
      submitHabit,
      // Modal Delete & Copy
      showDeleteModal,
      habitToDelete,
      confirmDelete,
      executeDelete,
      deleteFromEdit,
      showCopyModal,
      openCopyModal,
      executeCopy,
      // 🔥 Modal Batch Habit (INI YANG KEMARIN KELUPAAN DIAMBIL)
      showBatchModal,
      batchForm,
      closeBatchModal,
      addBatchRow,
      removeBatchRow,
      submitBatchHabit,
      switchToBatch,
      switchToSingle,
      handleMouseDown,
      handleMouseEnter,
      isCellSelected,
      saveHabitOrder
    } = useHabits(props);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50/50" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), { title: "Habit Tracker" }, null, _parent));
      _push(`<div class="space-y-6 pb-12">`);
      _push(ssrRenderComponent(HabitHeader, {
        user: unref(user),
        greetingKey: unref(greetingKey),
        todayDate: unref(todayDate),
        currentMonth: props.currentMonth,
        currentMonthValue: props.monthQuery,
        todayProgress: unref(todayProgress),
        changeMonth: unref(changeMonth),
        openCreateModal: unref(openCreateModal)
      }, null, _parent));
      _push(ssrRenderComponent(HabitGrid, {
        localHabits: unref(localHabits),
        monthDates: unref(monthDates),
        hasPrevHabits: __props.hasPrevHabits,
        toggleStatus: unref(toggleStatus),
        handleGridNav: unref(handleGridNav),
        getStatus: unref(getStatus),
        editHabit: unref(editHabit),
        confirmDelete: unref(confirmDelete),
        openCreateModal: unref(openCreateModal),
        openCopyModal: unref(openCopyModal),
        handleMouseDown: unref(handleMouseDown),
        handleMouseEnter: unref(handleMouseEnter),
        isCellSelected: unref(isCellSelected),
        saveHabitOrder: unref(saveHabitOrder)
      }, null, _parent));
      _push(ssrRenderComponent(HabitStats, {
        localHabits: unref(localHabits),
        overallPercentage: unref(overallPercentage),
        totalCompletions: unref(totalCompletions),
        currentMoodData: unref(currentMoodData),
        moodOptions: unref(moodOptions),
        savedMood: props.savedMood,
        selectMood: unref(selectMood)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        showDeleteModal: unref(showDeleteModal),
        showCopyModal: unref(showCopyModal),
        showCreateModal: unref(showCreateModal),
        isEditing: unref(isEditing),
        form: unref(form),
        habitToDelete: unref(habitToDelete),
        iconList: unref(iconList),
        colorPalette: unref(colorPalette),
        closeModal: unref(closeModal),
        submitHabit: unref(submitHabit),
        executeDelete: unref(executeDelete),
        executeCopy: unref(executeCopy),
        deleteFromEdit: unref(deleteFromEdit),
        showBatchModal: unref(showBatchModal),
        batchForm: unref(batchForm),
        closeBatchModal: unref(closeBatchModal),
        submitBatchHabit: unref(submitBatchHabit),
        addBatchRow: unref(addBatchRow),
        removeBatchRow: unref(removeBatchRow),
        switchToBatch: unref(switchToBatch),
        switchToSingle: unref(switchToSingle)
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Habits/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
