import { computed, ref, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { usePage, router, useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-DRZDarU_.js";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import localeData from "dayjs/plugin/localeData.js";
import axios from "axios";
import HabitHeader from "./HabitHeader-D7De_7e0.js";
import HabitGrid from "./HabitGrid-DS2mRgp4.js";
import HabitStats from "./HabitStats-mtvxIp2G.js";
import _sfc_main$2 from "./HabitModals-Ctd51TO4.js";
import "laravel-vue-i18n";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-chartjs";
import "chart.js";
dayjs.extend(localeData);
function useHabitDates(props) {
  const todayDate = dayjs().locale("id").format("dddd, D MMMM YYYY");
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
  const toggleStatus = async (habitId, dateString, forceStatus = null) => {
    if (dayjs(dateString).isAfter(dayjs(), "day")) return;
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
  const handleGridNav = (e, hIndex, dIndex, habitId, dateString) => {
    const key = e.key;
    if (key === " ") {
      e.preventDefault();
      toggleStatus(habitId, dateString);
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
    moodOptions,
    showMoodDropdown,
    currentMoodData,
    selectMood
  };
}
function useHabitModals(props, localHabits) {
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
    "3b82f6",
    "#6366f1",
    "#d946ef",
    "#8b5cf6",
    "#64748b"
  ];
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
  const editHabit = (habit) => {
    isEditing.value = true;
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
      form.id = null;
    }, 300);
  };
  const submitHabit = () => {
    const payload = {
      ...form.data(),
      period: props.monthQuery
    };
    if (isEditing.value) {
      const index = localHabits.value.findIndex((h) => h.id === form.id);
      if (index !== -1) {
        Object.assign(localHabits.value[index], payload);
      }
      const targetId = form.id;
      closeModal();
      router.patch(route("habits.update", targetId), payload, {
        preserveScroll: true,
        preserveState: true,
        // PENTING: Biar gak reload ulang layar
        onError: (err) => console.error(err)
      });
    } else {
      const tempId = "temp_" + Date.now();
      localHabits.value.push({
        ...payload,
        id: tempId,
        logs: [],
        // Habit baru log-nya kosong
        completed_count: 0
      });
      closeModal();
      router.post(route("habits.store"), payload, {
        preserveScroll: true,
        // Kita biarkan preserveState: false (default behavior) atau true
        // Kalau false, Inertia akan refresh props dan mengganti 'tempId' dengan ID asli dari DB
        onSuccess: () => {
        },
        onError: (err) => {
          localHabits.value = localHabits.value.filter((h) => h.id !== tempId);
          alert("Gagal menyimpan habit.");
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
    router.post(route("habits.copy"), {
      current_period: props.monthQuery,
      prev_period: props.prevMonthQuery
    }, {
      preserveScroll: true
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
    router.delete(route("habits.destroy", id), {
      preserveScroll: true,
      preserveState: true,
      // Jangan reload state, kita udah hapus manual
      onError: () => alert("Gagal menghapus habit.")
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
  const dateLogic = useHabitDates(props);
  const coreLogic = useHabitCore(props);
  const modalLogic = useHabitModals(props, coreLogic.localHabits);
  return {
    ...dateLogic,
    ...coreLogic,
    ...modalLogic
  };
}
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$1
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
      user,
      localHabits,
      showCreateModal,
      isEditing,
      todayDate,
      greetingKey,
      iconList,
      colorPalette,
      form,
      monthDates,
      todayProgress,
      totalCompletions,
      overallPercentage,
      changeMonth,
      getStatus,
      toggleStatus,
      openCreateModal,
      editHabit,
      closeModal,
      submitHabit,
      showDeleteModal,
      habitToDelete,
      confirmDelete,
      executeDelete,
      deleteFromEdit,
      showCopyModal,
      openCopyModal,
      executeCopy,
      handleGridNav,
      moodOptions,
      currentMoodData,
      selectMood
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
        hasPrevHabits: props.hasPrevHabits,
        toggleStatus: unref(toggleStatus),
        handleGridNav: unref(handleGridNav),
        getStatus: unref(getStatus),
        editHabit: unref(editHabit),
        confirmDelete: unref(confirmDelete),
        openCreateModal: unref(openCreateModal),
        openCopyModal: unref(openCopyModal)
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
      _push(ssrRenderComponent(_sfc_main$2, {
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
        deleteFromEdit: unref(deleteFromEdit)
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
