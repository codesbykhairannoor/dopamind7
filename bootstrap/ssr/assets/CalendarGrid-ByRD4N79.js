import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
const _sfc_main = {
  __name: "CalendarGrid",
  __ssrInlineRender: true,
  props: {
    calendarDays: Array
  },
  emits: ["open-detail"],
  setup(__props, { emit: __emit }) {
    const page = usePage();
    const filters = ref({
      events: true,
      journal: true,
      habits: true,
      planner: true,
      finance: true
    });
    const getDisplayMode = (day) => {
      var _a;
      let metricsCount = 0;
      if (filters.value.journal && day.hasJournal) metricsCount++;
      if (filters.value.habits && day.habitDone > 0) metricsCount++;
      if (filters.value.planner && day.planner && day.planner.total > 0) metricsCount++;
      if (filters.value.finance && day.expense > 0) metricsCount++;
      const hasEvents = filters.value.events && ((_a = day.events) == null ? void 0 : _a.length) > 0;
      const totalItems = metricsCount + (hasEvents ? 1 : 0);
      if (totalItems === 1 || totalItems === 2) return "balanced";
      return "compact";
    };
    const dynamicDaysOfWeek = computed(() => {
      const locale = page.props.locale || "id";
      const days = [];
      for (let i = 1; i <= 7; i++) {
        days.push(dayjs().locale(locale).day(i).format("ddd"));
      }
      return days;
    });
    const compactCurrency = (value) => {
      if (!value) return "";
      const currentLocale = page.props.locale || "id";
      return new Intl.NumberFormat(currentLocale === "id" ? "id-ID" : "en-US", {
        notation: "compact",
        maximumFractionDigits: 1
      }).format(value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4 sm:gap-6" }, _attrs))}><div class="flex flex-wrap gap-2 items-center justify-start px-2 sm:px-0"><span class="text-[9px] sm:text-[10px] font-black text-slate-400 mr-1 uppercase tracking-widest hidden sm:inline">${ssrInterpolate(_ctx.$t("calendar_focus"))}:</span><button class="${ssrRenderClass([filters.value.events ? "bg-slate-800 text-white border-slate-800 shadow-md scale-105" : "bg-transparent text-slate-400 border-slate-200 hover:bg-slate-50", "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 border"])}"> 📅 <span class="hidden sm:inline">${ssrInterpolate(_ctx.$t("calendar_events"))}</span></button><button class="${ssrRenderClass([filters.value.journal ? "bg-purple-50 text-purple-600 border-purple-200 shadow-sm scale-105" : "bg-transparent text-slate-400 border-slate-200 hover:bg-slate-50", "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 border"])}"> 📓 <span class="hidden sm:inline">${ssrInterpolate(_ctx.$t("calendar_journal"))}</span></button><button class="${ssrRenderClass([filters.value.habits ? "bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm scale-105" : "bg-transparent text-slate-400 border-slate-200 hover:bg-slate-50", "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 border"])}"> 🌱 <span class="hidden sm:inline">${ssrInterpolate(_ctx.$t("calendar_habits"))}</span></button><button class="${ssrRenderClass([filters.value.planner ? "bg-blue-50 text-blue-600 border-blue-200 shadow-sm scale-105" : "bg-transparent text-slate-400 border-slate-200 hover:bg-slate-50", "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 border"])}"> ✅ <span class="hidden sm:inline">${ssrInterpolate(_ctx.$t("calendar_planner"))}</span></button><button class="${ssrRenderClass([filters.value.finance ? "bg-rose-50 text-rose-600 border-rose-200 shadow-sm scale-105" : "bg-transparent text-slate-400 border-slate-200 hover:bg-slate-50", "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 border"])}"> 💸 <span class="hidden sm:inline">${ssrInterpolate(_ctx.$t("calendar_finance"))}</span></button></div><div class="bg-slate-50/50 p-2 sm:p-5 rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100"><div class="grid grid-cols-7 mb-2 sm:mb-3"><!--[-->`);
      ssrRenderList(dynamicDaysOfWeek.value, (day) => {
        _push(`<div class="text-center text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">${ssrInterpolate(day)}</div>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-7 auto-rows-fr gap-1 sm:gap-3"><!--[-->`);
      ssrRenderList(__props.calendarDays, (day, index) => {
        _push(`<div class="${ssrRenderClass([[
          !day.date ? "" : !day.isCurrentMonth ? "bg-white/40 text-slate-300 border-slate-50" : "bg-white border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 cursor-pointer hover:-translate-y-1 z-10"
        ], "min-h-[85px] sm:min-h-[140px] flex flex-col transition-all duration-500 relative group rounded-xl sm:rounded-[1.25rem] overflow-hidden border border-transparent"])}">`);
        if (day.date) {
          _push(`<!--[--><div class="flex justify-between items-start p-1.5 sm:p-2.5"><span class="${ssrRenderClass([day.isToday ? "bg-slate-800 text-white shadow-md" : "text-slate-500 group-hover:text-indigo-600 bg-slate-50/50 group-hover:bg-indigo-50", "w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-[10px] sm:text-sm font-black transition-all"])}">${ssrInterpolate(day.dayNumber)}</span>`);
          if (day.isToday) {
            _push(`<span class="hidden sm:inline text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1 mr-1">${ssrInterpolate(_ctx.$t("calendar_today"))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "" : "justify-end", "flex flex-col flex-1 px-1 pb-1 sm:px-1.5 sm:pb-1.5 gap-1"])}">`);
          if (filters.value.events && day.events.length > 0) {
            _push(`<div class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "flex-1 flex flex-col justify-center" : "", "w-full shrink-0"])}"><div class="flex sm:hidden flex-row flex-wrap gap-1 justify-center sm:justify-start px-1"><!--[-->`);
            ssrRenderList(day.events, (event) => {
              _push(`<div class="w-1.5 h-1.5 rounded-full" style="${ssrRenderStyle(`background-color: ${event.color}`)}"></div>`);
            });
            _push(`<!--]--></div><div class="${ssrRenderClass([getDisplayMode(day) === "balanced" && day.events.length === 1 ? "items-center scale-110" : "", "hidden sm:flex flex-col gap-0.5"])}"><!--[-->`);
            ssrRenderList(day.events.slice(0, 3), (event) => {
              _push(`<div class="flex items-center gap-1.5 px-1 py-0.5 hover:bg-slate-50 rounded-md"><span class="w-1.5 h-1.5 rounded-full shrink-0" style="${ssrRenderStyle(`background-color: ${event.color}`)}"></span><span class="text-[10px] text-slate-600 font-medium truncate">${ssrInterpolate(event.title)}</span></div>`);
            });
            _push(`<!--]-->`);
            if (day.events.length > 3) {
              _push(`<div class="text-[8px] font-bold text-slate-400 px-1 mt-0.5"> +${ssrInterpolate(day.events.length - 3)} ${ssrInterpolate(_ctx.$t("calendar_more_events"))}</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "flex-col sm:flex-row flex-1" : "flex-col", "flex gap-0.5 sm:gap-1 w-full"])}">`);
          if (day.hasJournal && filters.value.journal) {
            _push(`<div class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "flex-col items-center justify-center bg-purple-50/50 border border-purple-100/50 flex-1 py-1" : "justify-center sm:justify-between items-center px-1 sm:px-2 py-1 bg-slate-50", "flex transition-all duration-500 rounded-lg sm:rounded-xl overflow-hidden"])}"><span class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "text-[9px] tracking-widest mb-1" : "text-[8px] tracking-wider", "hidden sm:block uppercase font-black text-purple-400"])}">${ssrInterpolate(_ctx.$t("calendar_journal_short"))}</span><span class="${ssrRenderClass(getDisplayMode(day) === "balanced" ? "text-xl sm:text-2xl drop-shadow-sm transition-transform group-hover:scale-110" : "text-[10px]")}">📓</span></div>`);
          } else {
            _push(`<!---->`);
          }
          if (day.habitDone > 0 && filters.value.habits) {
            _push(`<div class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "flex-col items-center justify-center bg-emerald-50/50 border border-emerald-100/50 flex-1 py-1" : "justify-between items-center px-1 sm:px-2 py-1 bg-slate-50", "flex transition-all duration-500 rounded-lg sm:rounded-xl overflow-hidden"])}"><span class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "text-[9px] tracking-widest mb-1" : "text-[8px] tracking-wider", "hidden sm:block uppercase font-black text-emerald-500"])}">${ssrInterpolate(_ctx.$t("calendar_habits_short"))}</span><div class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "flex-col text-[10px] sm:text-xs" : "text-[8px] sm:text-[9px]", "flex items-center gap-1 font-black text-emerald-600"])}"><span class="${ssrRenderClass(getDisplayMode(day) === "balanced" ? "text-xl sm:text-2xl drop-shadow-sm transition-transform group-hover:scale-110" : "")}">🌱</span><span>${ssrInterpolate(day.habitDone)}</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (day.planner && day.planner.total > 0 && filters.value.planner) {
            _push(`<div class="${ssrRenderClass([[
              getDisplayMode(day) === "balanced" ? "flex-col items-center justify-center border flex-1 py-1" : "justify-between items-center px-1 sm:px-2 py-1",
              Number(day.planner.done) >= Number(day.planner.total) ? "bg-blue-50/50 text-blue-600 border-blue-100/50" : "bg-slate-50 text-slate-600 border-transparent"
            ], "flex transition-all duration-500 rounded-lg sm:rounded-xl overflow-hidden"])}"><span class="${ssrRenderClass([[getDisplayMode(day) === "balanced" ? "text-[9px] tracking-widest mb-1" : "text-[8px] tracking-wider", Number(day.planner.done) >= Number(day.planner.total) ? "text-blue-400" : "text-slate-400"], "hidden sm:block uppercase font-black"])}">${ssrInterpolate(_ctx.$t("calendar_tasks_short"))}</span><div class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "flex-col text-[10px] sm:text-xs" : "text-[8px] sm:text-[9px]", "flex items-center gap-0.5 sm:gap-1 font-black"])}">`);
            if (Number(day.planner.done) >= Number(day.planner.total)) {
              _push(`<span class="${ssrRenderClass(getDisplayMode(day) === "balanced" ? "text-xl sm:text-2xl drop-shadow-sm transition-transform group-hover:scale-110" : "")}">✅</span>`);
            } else {
              _push(`<span class="${ssrRenderClass(getDisplayMode(day) === "balanced" ? "text-xl sm:text-2xl drop-shadow-sm opacity-50" : "")}">⏳</span>`);
            }
            _push(`<span>${ssrInterpolate(day.planner.done)}/${ssrInterpolate(day.planner.total)}</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (day.expense > 0 && filters.value.finance) {
            _push(`<div class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "flex-col items-center justify-center bg-rose-50/50 border border-rose-100/50 flex-1 py-1" : "justify-between items-center px-1 sm:px-2 py-1 bg-slate-50", "flex transition-all duration-500 rounded-lg sm:rounded-xl overflow-hidden"])}"><span class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "text-[9px] tracking-widest mb-1" : "text-[8px] tracking-wider", "hidden sm:block uppercase font-black text-rose-400"])}">${ssrInterpolate(_ctx.$t("calendar_expense_short"))}</span><div class="${ssrRenderClass([getDisplayMode(day) === "balanced" ? "flex-col text-[10px] sm:text-xs" : "text-[8px] sm:text-[9px]", "flex items-center gap-1 font-black text-rose-600"])}"><span class="${ssrRenderClass(getDisplayMode(day) === "balanced" ? "text-xl sm:text-2xl drop-shadow-sm transition-transform group-hover:scale-110" : "")}">💸</span><span>${ssrInterpolate(compactCurrency(day.expense))}</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (getDisplayMode(day) === "compact" && day.events.length === 0 && !day.hasJournal && !day.habitDone && (!day.planner || day.planner.total === 0) && !day.expense) {
            _push(`<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"><span class="text-2xl sm:text-3xl font-light text-slate-300">+</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Calendar/CalendarGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
