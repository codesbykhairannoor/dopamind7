import { ref, computed, unref, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useForm, router, Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-ytENJ_TP.js";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import isBetween from "dayjs/plugin/isBetween.js";
import Swal from "sweetalert2";
import { trans } from "laravel-vue-i18n";
import CalendarHeader from "./CalendarHeader-N5RAdMMS.js";
import _sfc_main$1 from "./CalendarGrid-ByRD4N79.js";
import _sfc_main$2 from "./CalendarEventModal-Ewi42-pI.js";
import _sfc_main$3 from "./CalendarDayDetail-D9hxS6M9.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
function useCalendarDates(props) {
  const selectedDate = ref(dayjs().format("YYYY-MM-DD"));
  const isDetailModalOpen = ref(false);
  const openDayDetail = (dateStr) => {
    selectedDate.value = dateStr;
    isDetailModalOpen.value = true;
  };
  const calendarDays = computed(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const yearMonth = props.currentMonth || dayjs().format("YYYY-MM");
    const startOfMonth = dayjs(yearMonth).startOf("month");
    dayjs(yearMonth).endOf("month");
    const daysInMonth = startOfMonth.daysInMonth();
    const startDayOfWeek = startOfMonth.day() === 0 ? 6 : startOfMonth.day() - 1;
    let days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ isCurrentMonth: false, date: null });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDateStr = startOfMonth.date(i).format("YYYY-MM-DD");
      const dailyEvents = ((_b = (_a = props.data) == null ? void 0 : _a.events) == null ? void 0 : _b.filter((ev) => {
        if (ev.end_date) return dayjs(currentDateStr).isBetween(ev.start_date, ev.end_date, "day", "[]");
        return ev.start_date === currentDateStr;
      })) || [];
      const dailyJournal = ((_d = (_c = props.data) == null ? void 0 : _c.journals) == null ? void 0 : _d[currentDateStr]) || null;
      const dailyFinance = ((_f = (_e = props.data) == null ? void 0 : _e.finances) == null ? void 0 : _f[currentDateStr]) || 0;
      const dailyHabitCount = ((_h = (_g = props.data) == null ? void 0 : _g.habits) == null ? void 0 : _h[currentDateStr]) || 0;
      let dailyPlanner = null;
      if ((_i = props.data) == null ? void 0 : _i.planners) {
        if (props.data.planners[currentDateStr]) {
          dailyPlanner = props.data.planners[currentDateStr];
        } else {
          const fuzzyKey = Object.keys(props.data.planners).find((key) => String(key).startsWith(currentDateStr));
          if (fuzzyKey) dailyPlanner = props.data.planners[fuzzyKey];
        }
      }
      const plannerData = dailyPlanner ? {
        done: Number(dailyPlanner.completed_tasks || 0),
        total: Number(dailyPlanner.total_tasks || 0)
      } : null;
      days.push({
        isCurrentMonth: true,
        date: currentDateStr,
        dayNumber: i,
        isToday: currentDateStr === dayjs().format("YYYY-MM-DD"),
        events: dailyEvents,
        hasJournal: !!dailyJournal,
        expense: dailyFinance,
        planner: plannerData,
        // Hasil anti-bug dimasukkan ke sini
        habitDone: Number(dailyHabitCount)
      });
    }
    const totalCells = days.length;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - totalCells % 7;
    for (let i = 0; i < remainingCells; i++) {
      days.push({ isCurrentMonth: false, date: null });
    }
    return days;
  });
  return { selectedDate, isDetailModalOpen, openDayDetail, calendarDays };
}
function useCalendarForm() {
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
  const isEventModalOpen = ref(false);
  const eventForm = useForm({
    id: null,
    title: "",
    description: "",
    type: "event",
    color: "#4f46e5",
    start_date: dayjs().format("YYYY-MM-DD"),
    end_date: "",
    is_all_day: true,
    start_time: "",
    end_time: ""
  });
  const openEventModal = (dateStr = null, eventToEdit = null) => {
    eventForm.reset();
    eventForm.clearErrors();
    if (eventToEdit) {
      eventForm.id = eventToEdit.id;
      eventForm.title = eventToEdit.title;
      eventForm.description = eventToEdit.description || "";
      eventForm.type = eventToEdit.type || "event";
      eventForm.color = eventToEdit.color || "#4f46e5";
      eventForm.start_date = eventToEdit.start_date;
      eventForm.end_date = eventToEdit.end_date || "";
      eventForm.is_all_day = eventToEdit.is_all_day;
      eventForm.start_time = eventToEdit.start_time || "";
      eventForm.end_time = eventToEdit.end_time || "";
    } else {
      eventForm.start_date = dateStr || dayjs().format("YYYY-MM-DD");
    }
    isEventModalOpen.value = true;
  };
  const submitEvent = () => {
    if (!eventForm.title) return fireToast("warning", t("warn_empty_title", "Judul harus diisi!"));
    const isEditing = !!eventForm.id;
    const url = isEditing ? route("calendar.events.update", eventForm.id) : route("calendar.events.store");
    const method = isEditing ? "put" : "post";
    isEventModalOpen.value = false;
    eventForm[method](url, {
      preserveScroll: true,
      preserveState: true,
      progress: false,
      // Matikan bar loading Inertia di atas layar
      onSuccess: () => {
        fireToast("success", t("success_saved", "Acara Berhasil Disimpan!"));
        eventForm.reset();
      },
      onError: (err) => {
        isEventModalOpen.value = true;
        fireToast("error", Object.values(err)[0]);
      }
    });
  };
  const deleteEvent = (id) => {
    Swal.fire({
      title: t("confirm_delete_title", "Hapus Acara?"),
      text: t("confirm_delete_text", "Data ini akan dihapus permanen."),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("btn_yes_delete", "Ya, Hapus"),
      cancelButtonText: t("btn_cancel", "Batal"),
      customClass: {
        popup: "rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl",
        title: "text-2xl font-black text-slate-800 mb-2 font-sans",
        confirmButton: "bg-rose-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl shadow-rose-200 active:scale-95 transition-all outline-none mx-2 tracking-wide",
        cancelButton: "bg-slate-50 text-slate-400 font-bold py-3.5 px-8 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all outline-none mx-2 tracking-wide",
        actions: "mt-6 gap-3"
      },
      buttonsStyling: false
    }).then((res) => {
      if (res.isConfirmed) {
        router.delete(route("calendar.events.destroy", id), {
          preserveScroll: true,
          preserveState: true,
          progress: false,
          onSuccess: () => {
            fireToast("success", t("success_deleted", "Berhasil Dihapus!"));
          }
        });
      }
    });
  };
  return { t, fireToast, isEventModalOpen, eventForm, openEventModal, submitEvent, deleteEvent };
}
function useCalendar(props) {
  const dateLogic = useCalendarDates(props);
  const formLogic = useCalendarForm();
  return {
    ...dateLogic,
    ...formLogic
  };
}
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AuthenticatedLayout }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    currentMonth: String,
    data: Object
  },
  setup(__props) {
    const props = __props;
    const {
      selectedDate,
      isEventModalOpen,
      isDetailModalOpen,
      eventForm,
      openEventModal,
      submitEvent,
      deleteEvent,
      openDayDetail,
      calendarDays
    } = useCalendar(props);
    const changeMonth = (newMonthPayload) => {
      router.get(route("calendar.index"), { month: newMonthPayload }, {
        preserveState: true,
        preserveScroll: true,
        progress: false
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("calendar_title", "Master Calendar")
      }, null, _parent));
      _push(`<div class="w-full min-h-screen bg-slate-50/50 pb-12 relative overflow-x-hidden">`);
      _push(ssrRenderComponent(CalendarHeader, {
        currentMonth: __props.currentMonth,
        onChangeMonth: changeMonth,
        onAddEvent: () => unref(openEventModal)()
      }, null, _parent));
      _push(`<div class="w-full px-4 py-6 sm:px-6 lg:px-8 max-w-full mx-auto">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        calendarDays: unref(calendarDays),
        onOpenDetail: unref(openDayDetail)
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        show: unref(isEventModalOpen),
        form: unref(eventForm),
        onClose: ($event) => isEventModalOpen.value = false,
        onSubmit: unref(submitEvent)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        show: unref(isDetailModalOpen),
        date: unref(selectedDate),
        calendarDays: unref(calendarDays),
        onClose: ($event) => isDetailModalOpen.value = false,
        onEditEvent: unref(openEventModal),
        onDeleteEvent: unref(deleteEvent)
      }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Calendar/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
