import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "./useAppearance-rDoGVD4_.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CalendarGrid",
  __ssrInlineRender: true,
  props: {
    calendarDays: Array,
    selectedDate: String
  },
  emits: ["open-detail", "open-event-modal"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const page = usePage();
    const filters = ref({
      events: true,
      journal: true,
      habits: true,
      planner: true,
      finance: true,
      goals: true
    });
    const selectedDay = computed(() => {
      return props.calendarDays.find((d) => d.date === props.selectedDate);
    });
    const activeMetricsCount = (day) => {
      var _a;
      let count = 0;
      if (filters.value.journal && day.hasJournal) count++;
      if (filters.value.habits && day.habitDone > 0) count++;
      if (filters.value.planner && day.planner && day.planner.total > 0) count++;
      if (filters.value.finance && day.expense > 0) count++;
      if (filters.value.goals && ((_a = day.milestones) == null ? void 0 : _a.length) > 0) count++;
      return count;
    };
    const hasAnyMetric = (day) => {
      var _a;
      return activeMetricsCount(day) > 0 || filters.value.events && ((_a = day.events) == null ? void 0 : _a.length) > 0;
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
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4 sm:gap-6" }, _attrs))} data-v-b73908ec><div class="flex flex-wrap gap-2 sm:gap-3 items-center justify-start px-2 sm:px-0 scrollbar-hide overflow-x-auto pb-2 sm:pb-0" data-v-b73908ec><span class="text-[11px] font-bold text-slate-400 mr-2 tracking-widest hidden md:inline shrink-0" data-v-b73908ec><svg class="w-4 h-4 inline-block -mt-0.5 mr-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b73908ec><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" data-v-b73908ec></path></svg> ${ssrInterpolate(_ctx.$t("calendar_focus", "Focus"))}</span><button class="${ssrRenderClass([filters.value.events ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50", "filter-btn"])}" data-v-b73908ec><span data-v-b73908ec>📅</span> <span class="text-[11px] font-bold tracking-tight" data-v-b73908ec>${ssrInterpolate(_ctx.$t("calendar_events"))}</span></button><button class="${ssrRenderClass([filters.value.goals ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-200 dark:shadow-none" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-500/50", "filter-btn"])}" data-v-b73908ec><span data-v-b73908ec>🎯</span> <span class="text-[11px] font-bold tracking-tight" data-v-b73908ec>${ssrInterpolate(_ctx.$t("calendar_goals", "Goals"))}</span></button><button class="${ssrRenderClass([filters.value.journal ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200 dark:shadow-none" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500/50", "filter-btn"])}" data-v-b73908ec><span data-v-b73908ec>📓</span> <span class="text-[11px] font-bold tracking-tight" data-v-b73908ec>${ssrInterpolate(_ctx.$t("calendar_journal"))}</span></button><button class="${ssrRenderClass([filters.value.habits ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-200 dark:shadow-none" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-500/50", "filter-btn"])}" data-v-b73908ec><span data-v-b73908ec>🌱</span> <span class="text-[11px] font-bold tracking-tight" data-v-b73908ec>${ssrInterpolate(_ctx.$t("calendar_habits"))}</span></button><button class="${ssrRenderClass([filters.value.planner ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-200 dark:shadow-none" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50", "filter-btn"])}" data-v-b73908ec><span data-v-b73908ec>✅</span> <span class="text-[11px] font-bold tracking-tight" data-v-b73908ec>${ssrInterpolate(_ctx.$t("calendar_planner"))}</span></button><button class="${ssrRenderClass([filters.value.finance ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200 dark:shadow-none" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-500/50", "filter-btn"])}" data-v-b73908ec><span data-v-b73908ec>💸</span> <span class="text-[11px] font-bold tracking-tight" data-v-b73908ec>${ssrInterpolate(_ctx.$t("calendar_finance"))}</span></button></div><div class="md:hidden space-y-8 px-2 sm:px-0" data-v-b73908ec><div class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-5 shadow-xl shadow-slate-200/50 dark:shadow-none" data-v-b73908ec><div class="grid grid-cols-7 mb-4" data-v-b73908ec><!--[-->`);
      ssrRenderList(dynamicDaysOfWeek.value, (day) => {
        _push(`<div class="text-center text-[10px] font-bold text-slate-400 tracking-[0.15em]" data-v-b73908ec>${ssrInterpolate(day)}</div>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-7 gap-2" data-v-b73908ec><!--[-->`);
      ssrRenderList(__props.calendarDays, (day, index) => {
        var _a2, _b2, _c;
        _push(`<div class="${ssrRenderClass([[
          !day.date ? "opacity-0" : !day.isCurrentMonth ? "text-slate-300 dark:text-slate-700" : "text-slate-800 dark:text-slate-200",
          props.selectedDate === day.date ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none scale-110 z-10" : "bg-slate-50/50 dark:bg-slate-800/30"
        ], "aspect-square flex flex-col items-center justify-center rounded-2xl relative transition-all active:scale-90"])}" data-v-b73908ec><span class="text-sm font-black" data-v-b73908ec>${ssrInterpolate(day.dayNumber)}</span>`);
        if (day.date && hasAnyMetric(day)) {
          _push(`<div class="absolute bottom-1.5 flex gap-0.5" data-v-b73908ec>`);
          if (filters.value.events && ((_a2 = day.events) == null ? void 0 : _a2.length)) {
            _push(`<div class="w-1 h-1 rounded-full bg-indigo-400 shadow-sm" data-v-b73908ec></div>`);
          } else {
            _push(`<!---->`);
          }
          if (filters.value.goals && ((_b2 = day.milestones) == null ? void 0 : _b2.length)) {
            _push(`<div class="w-1 h-1 rounded-full bg-orange-400 shadow-sm" data-v-b73908ec></div>`);
          } else {
            _push(`<!---->`);
          }
          if (filters.value.planner && ((_c = day.planner) == null ? void 0 : _c.total)) {
            _push(`<div class="w-1 h-1 rounded-full bg-blue-400 shadow-sm" data-v-b73908ec></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="space-y-6" data-v-b73908ec><div class="flex items-center justify-between px-2" data-v-b73908ec><h3 class="text-sm font-black text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-2" data-v-b73908ec><span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" data-v-b73908ec></span> Agenda: ${ssrInterpolate(unref(dayjs)(props.selectedDate).format("D MMM YYYY"))}</h3></div>`);
      if (selectedDay.value) {
        _push(`<div class="space-y-4" data-v-b73908ec>`);
        if (filters.value.events && ((_a = selectedDay.value.events) == null ? void 0 : _a.length)) {
          _push(`<div class="space-y-3" data-v-b73908ec><!--[-->`);
          ssrRenderList(selectedDay.value.events, (ev) => {
            _push(`<div class="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm" data-v-b73908ec><div class="w-1.5 h-10 rounded-full" style="${ssrRenderStyle({ backgroundColor: ev.color })}" data-v-b73908ec></div><div class="flex-1" data-v-b73908ec><p class="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-0.5" data-v-b73908ec>Event</p><p class="text-base font-bold text-slate-800 dark:text-slate-200 leading-tight" data-v-b73908ec>${ssrInterpolate(ev.title)}</p></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (filters.value.goals && ((_b = selectedDay.value.milestones) == null ? void 0 : _b.length)) {
          _push(`<div class="space-y-3" data-v-b73908ec><!--[-->`);
          ssrRenderList(selectedDay.value.milestones, (ms) => {
            _push(`<div class="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm" data-v-b73908ec><div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-50 dark:border-slate-800" style="${ssrRenderStyle({ backgroundColor: ms.goal_color + "15", color: ms.goal_color })}" data-v-b73908ec><span class="text-xl" data-v-b73908ec>🎯</span></div><div class="flex-1" data-v-b73908ec><p class="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-0.5" data-v-b73908ec>${ssrInterpolate(ms.goal_title)}</p><p class="text-base font-bold text-slate-800 dark:text-slate-200 leading-tight" data-v-b73908ec>${ssrInterpolate(ms.title)}</p></div>`);
            if (ms.completed) {
              _push(`<div class="bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-500/20" data-v-b73908ec><span class="text-[10px] font-black text-emerald-600 dark:text-emerald-400 tracking-widest" data-v-b73908ec>Done</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-2 gap-4" data-v-b73908ec>`);
        if (filters.value.journal && selectedDay.value.hasJournal) {
          _push(`<div class="bg-purple-50/50 dark:bg-purple-500/5 p-5 rounded-[2rem] border border-purple-100/50 dark:border-purple-900/20 flex flex-col gap-2" data-v-b73908ec><div class="w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-xl shadow-sm" data-v-b73908ec>📓</div><div data-v-b73908ec><p class="text-[10px] font-bold tracking-widest text-purple-400 mb-0.5" data-v-b73908ec>Journal</p><p class="text-sm font-bold text-slate-800 dark:text-slate-300" data-v-b73908ec>New entry written</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (filters.value.habits && selectedDay.value.habitDone) {
          _push(`<div class="bg-emerald-50/50 dark:bg-emerald-500/5 p-5 rounded-[2rem] border border-emerald-100/50 dark:border-emerald-900/20 flex flex-col gap-2" data-v-b73908ec><div class="w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-xl shadow-sm" data-v-b73908ec>🌱</div><div data-v-b73908ec><p class="text-[10px] font-bold tracking-widest text-emerald-400 mb-0.5" data-v-b73908ec>Habits</p><p class="text-sm font-bold text-slate-800 dark:text-slate-300" data-v-b73908ec>${ssrInterpolate(selectedDay.value.habitDone)} items done</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (filters.value.planner && selectedDay.value.planner) {
          _push(`<div class="bg-blue-50/50 dark:bg-blue-500/5 p-5 rounded-[2rem] border border-blue-100/50 dark:border-blue-900/20 flex flex-col gap-2" data-v-b73908ec><div class="w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-xl shadow-sm" data-v-b73908ec>${ssrInterpolate(selectedDay.value.planner.done >= selectedDay.value.planner.total ? "✅" : "⏳")}</div><div data-v-b73908ec><p class="text-[10px] font-bold tracking-widest text-blue-400 mb-0.5" data-v-b73908ec>Tasks</p><p class="text-sm font-bold text-slate-800 dark:text-slate-300" data-v-b73908ec>${ssrInterpolate(selectedDay.value.planner.done)}/${ssrInterpolate(selectedDay.value.planner.total)} completed</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (filters.value.finance && selectedDay.value.expense) {
          _push(`<div class="bg-rose-50/50 dark:bg-rose-500/5 p-5 rounded-[2rem] border border-rose-100/50 dark:border-rose-900/20 flex flex-col gap-2" data-v-b73908ec><div class="w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-xl shadow-sm" data-v-b73908ec>💸</div><div data-v-b73908ec><p class="text-[10px] font-bold tracking-widest text-rose-400 mb-0.5" data-v-b73908ec>Finance</p><p class="text-sm font-bold text-slate-800 dark:text-slate-300" data-v-b73908ec>${ssrInterpolate(compactCurrency(selectedDay.value.expense))} spent</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!hasAnyMetric(selectedDay.value)) {
          _push(`<div class="py-16 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm" data-v-b73908ec><div class="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl" data-v-b73908ec>🎐</div><h4 class="text-base font-bold text-slate-800 dark:text-white mb-2" data-v-b73908ec>Steady winds ahead</h4><p class="text-sm font-medium text-slate-400 dark:text-slate-500" data-v-b73908ec>No activity recorded for this day yet.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="hidden md:block bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden transition-colors duration-500" data-v-b73908ec><div class="flex flex-col p-8 pb-8" data-v-b73908ec><div class="grid grid-cols-7 mb-6 border-b border-slate-50 dark:border-slate-800 pb-5" data-v-b73908ec><!--[-->`);
      ssrRenderList(dynamicDaysOfWeek.value, (day) => {
        _push(`<div class="text-center text-[11px] font-black text-slate-400 tracking-[0.2em]" data-v-b73908ec>${ssrInterpolate(day)}</div>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-7 auto-rows-fr gap-4" data-v-b73908ec><!--[-->`);
      ssrRenderList(__props.calendarDays, (day, index) => {
        var _a2, _b2, _c, _d, _e, _f, _g;
        _push(`<div class="${ssrRenderClass([[
          !day.date ? "border-transparent" : !day.isCurrentMonth ? "bg-slate-50/30 dark:bg-slate-900/30 text-slate-300 dark:text-slate-700 border-slate-50 dark:border-slate-800 opacity-40" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-none cursor-pointer z-10",
          day.isToday ? "ring-[3px] ring-indigo-500/20 ring-offset-4 dark:ring-offset-slate-900" : "",
          props.selectedDate === day.date ? "border-indigo-500 !bg-indigo-50/5 dark:!bg-indigo-500/5" : ""
        ], "min-h-[220px] flex flex-col transition-all duration-500 relative group rounded-[2.5rem] overflow-hidden border transition-all"])}" data-v-b73908ec>`);
        if (day.date) {
          _push(`<!--[--><div class="flex justify-between items-start p-5 pb-2" data-v-b73908ec><span class="${ssrRenderClass([day.isToday ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none translate-y--1" : "text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-indigo-500/30 group-hover:-translate-y-1", "w-11 h-11 flex items-center justify-center rounded-2xl text-lg font-black transition-all duration-500"])}" data-v-b73908ec>${ssrInterpolate(day.dayNumber)}</span>`);
          if (day.isToday) {
            _push(`<div class="flex flex-col items-end" data-v-b73908ec><span class="text-[10px] font-black text-indigo-500 tracking-widest" data-v-b73908ec>${ssrInterpolate(_ctx.$t("calendar_today"))}</span><div class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shadow-sm" data-v-b73908ec></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex flex-col flex-1 p-4 pb-5 gap-3" data-v-b73908ec><div class="flex flex-col gap-2 w-full shrink-0" data-v-b73908ec>`);
          if (filters.value.events) {
            _push(`<!--[-->`);
            ssrRenderList((_a2 = day.events) == null ? void 0 : _a2.slice(0, 2), (event) => {
              _push(`<div class="px-3 py-1.5 rounded-xl border border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-sm text-slate-700 dark:text-slate-300 text-[11px] font-bold truncate flex items-center gap-2 group-hover:border-indigo-100 dark:group-hover:border-indigo-900/50 transition-all" data-v-b73908ec><div class="w-1.5 h-1.5 rounded-full shrink-0 shadow-sm" style="${ssrRenderStyle({ backgroundColor: event.color })}" data-v-b73908ec></div><span class="truncate" data-v-b73908ec>${ssrInterpolate(event.title)}</span></div>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (filters.value.goals) {
            _push(`<!--[-->`);
            ssrRenderList((_b2 = day.milestones) == null ? void 0 : _b2.slice(0, 1), (ms) => {
              _push(`<div class="px-3 py-1.5 rounded-xl border border-orange-100/50 dark:border-orange-900/30 bg-orange-50/20 dark:bg-orange-950/20 text-slate-700 dark:text-slate-300 text-[11px] font-bold truncate flex items-center gap-2 transition-all" data-v-b73908ec><div class="shrink-0" data-v-b73908ec>🎯</div><span class="truncate" data-v-b73908ec>${ssrInterpolate(ms.title)}</span></div>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (((_c = day.events) == null ? void 0 : _c.length) + (((_d = day.milestones) == null ? void 0 : _d.length) || 0) > 3) {
            _push(`<div class="text-[9px] font-black text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-lg w-fit ml-1 border border-slate-100 dark:border-slate-800" data-v-b73908ec> +${ssrInterpolate(((_e = day.events) == null ? void 0 : _e.length) + ((_f = day.milestones) == null ? void 0 : _f.length) - 3)} more </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (hasAnyMetric(day)) {
            _push(`<div class="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-100/50 dark:border-slate-800/50 transition-colors" data-v-b73908ec>`);
            if (day.hasJournal && filters.value.journal) {
              _push(`<div class="w-7 h-7 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-[11px] border border-purple-100 dark:border-purple-800/40 shadow-sm"${ssrRenderAttr("title", _ctx.$t("calendar_journal"))} data-v-b73908ec>📓</div>`);
            } else {
              _push(`<!---->`);
            }
            if (day.habitDone > 0 && filters.value.habits) {
              _push(`<div class="px-2 h-7 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40 shadow-sm"${ssrRenderAttr("title", _ctx.$t("calendar_habits"))} data-v-b73908ec><span data-v-b73908ec>🌱</span> <span class="font-black" data-v-b73908ec>${ssrInterpolate(day.habitDone)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            if (((_g = day.planner) == null ? void 0 : _g.total) > 0 && filters.value.planner) {
              _push(`<div class="px-2 h-7 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center gap-1.5 text-[11px] font-bold text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 shadow-sm"${ssrRenderAttr("title", _ctx.$t("calendar_planner"))} data-v-b73908ec><span data-v-b73908ec>${ssrInterpolate(day.planner.done >= day.planner.total ? "✅" : "⏳")}</span> <span class="font-black" data-v-b73908ec>${ssrInterpolate(day.planner.done)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            if (day.expense > 0 && filters.value.finance) {
              _push(`<div class="px-2 h-7 rounded-xl bg-rose-50 dark:bg-rose-900/20 flex items-center gap-1.5 text-[11px] font-bold text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800/40 shadow-sm"${ssrRenderAttr("title", _ctx.$t("calendar_finance"))} data-v-b73908ec><span data-v-b73908ec>💸</span> <span class="font-black" data-v-b73908ec>${ssrInterpolate(compactCurrency(day.expense))}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Calendar/CalendarGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CalendarGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b73908ec"]]);
export {
  CalendarGrid as default
};
