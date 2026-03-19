import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4 sm:gap-6" }, _attrs))} data-v-b3984c90><div class="flex flex-wrap gap-2 sm:gap-2.5 items-center justify-start px-2 sm:px-0" data-v-b3984c90><span class="text-[10px] sm:text-xs font-black text-slate-400 mr-2 uppercase tracking-widest hidden md:inline shrink-0" data-v-b3984c90><svg class="w-4 h-4 inline-block -mt-0.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3984c90><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" data-v-b3984c90></path></svg> ${ssrInterpolate(_ctx.$t("calendar_focus", "Fokus"))}</span><button class="${ssrRenderClass([filters.value.events ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50", "filter-btn"])}" data-v-b3984c90> 📅 <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest" data-v-b3984c90>${ssrInterpolate(_ctx.$t("calendar_events"))}</span></button><button class="${ssrRenderClass([filters.value.goals ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-100" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50", "filter-btn"])}" data-v-b3984c90> 🎯 <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest" data-v-b3984c90>${ssrInterpolate(_ctx.$t("calendar_goals", "Goals"))}</span></button><button class="${ssrRenderClass([filters.value.journal ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50", "filter-btn"])}" data-v-b3984c90> 📓 <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest" data-v-b3984c90>${ssrInterpolate(_ctx.$t("calendar_journal"))}</span></button><button class="${ssrRenderClass([filters.value.habits ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-100" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50", "filter-btn"])}" data-v-b3984c90> 🌱 <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest" data-v-b3984c90>${ssrInterpolate(_ctx.$t("calendar_habits"))}</span></button><button class="${ssrRenderClass([filters.value.planner ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-100" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50", "filter-btn"])}" data-v-b3984c90> ✅ <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest" data-v-b3984c90>${ssrInterpolate(_ctx.$t("calendar_planner"))}</span></button><button class="${ssrRenderClass([filters.value.finance ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-100" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50", "filter-btn"])}" data-v-b3984c90> 💸 <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest" data-v-b3984c90>${ssrInterpolate(_ctx.$t("calendar_finance"))}</span></button></div><div class="md:hidden space-y-6" data-v-b3984c90><div class="bg-white rounded-[2rem] border border-slate-200 p-4 shadow-sm" data-v-b3984c90><div class="grid grid-cols-7 mb-2" data-v-b3984c90><!--[-->`);
      ssrRenderList(dynamicDaysOfWeek.value, (day) => {
        _push(`<div class="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest" data-v-b3984c90>${ssrInterpolate(day)}</div>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-7 gap-1" data-v-b3984c90><!--[-->`);
      ssrRenderList(__props.calendarDays, (day, index) => {
        var _a2, _b2, _c;
        _push(`<div class="${ssrRenderClass([[
          !day.date ? "opacity-0" : !day.isCurrentMonth ? "text-slate-300" : "text-slate-700",
          props.selectedDate === day.date ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-110 z-10" : ""
        ], "aspect-square flex flex-col items-center justify-center rounded-xl relative transition-all"])}" data-v-b3984c90><span class="text-xs font-black" data-v-b3984c90>${ssrInterpolate(day.dayNumber)}</span>`);
        if (day.date && hasAnyMetric(day)) {
          _push(`<div class="absolute bottom-1.5 flex gap-0.5" data-v-b3984c90>`);
          if (filters.value.events && ((_a2 = day.events) == null ? void 0 : _a2.length)) {
            _push(`<div class="w-1 h-1 rounded-full bg-indigo-400" data-v-b3984c90></div>`);
          } else {
            _push(`<!---->`);
          }
          if (filters.value.goals && ((_b2 = day.milestones) == null ? void 0 : _b2.length)) {
            _push(`<div class="w-1 h-1 rounded-full bg-orange-400" data-v-b3984c90></div>`);
          } else {
            _push(`<!---->`);
          }
          if (filters.value.planner && ((_c = day.planner) == null ? void 0 : _c.total)) {
            _push(`<div class="w-1 h-1 rounded-full bg-blue-400" data-v-b3984c90></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="space-y-4" data-v-b3984c90><div class="flex items-center justify-between px-2" data-v-b3984c90><h3 class="text-sm font-black text-slate-800 uppercase tracking-widest" data-v-b3984c90> 📅 Agenda: ${ssrInterpolate(unref(dayjs)(props.selectedDate).format("D MMM YYYY"))}</h3></div>`);
      if (selectedDay.value) {
        _push(`<div class="space-y-3" data-v-b3984c90>`);
        if (filters.value.events && ((_a = selectedDay.value.events) == null ? void 0 : _a.length)) {
          _push(`<div class="space-y-2" data-v-b3984c90><!--[-->`);
          ssrRenderList(selectedDay.value.events, (ev) => {
            _push(`<div class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200 flex items-center gap-4" data-v-b3984c90><div class="w-1 h-8 rounded-full" style="${ssrRenderStyle({ backgroundColor: ev.color })}" data-v-b3984c90></div><div class="flex-1" data-v-b3984c90><p class="text-[10px] font-black uppercase tracking-widest text-slate-400" data-v-b3984c90>Event</p><p class="text-sm font-bold text-slate-800" data-v-b3984c90>${ssrInterpolate(ev.title)}</p></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (filters.value.goals && ((_b = selectedDay.value.milestones) == null ? void 0 : _b.length)) {
          _push(`<div class="space-y-2" data-v-b3984c90><!--[-->`);
          ssrRenderList(selectedDay.value.milestones, (ms) => {
            _push(`<div class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200 flex items-center gap-4" data-v-b3984c90><div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="${ssrRenderStyle({ backgroundColor: ms.goal_color + "20", color: ms.goal_color })}" data-v-b3984c90> 🎯 </div><div class="flex-1" data-v-b3984c90><p class="text-[10px] font-black uppercase tracking-widest text-slate-400" data-v-b3984c90>${ssrInterpolate(ms.goal_title)}</p><p class="text-sm font-bold text-slate-800" data-v-b3984c90>${ssrInterpolate(ms.title)}</p></div>`);
            if (ms.completed) {
              _push(`<div class="text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg" data-v-b3984c90>DONE</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-2 gap-3" data-v-b3984c90>`);
        if (filters.value.journal && selectedDay.value.hasJournal) {
          _push(`<div class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-purple-100 flex items-center gap-3" data-v-b3984c90><span class="text-xl" data-v-b3984c90>📓</span><div data-v-b3984c90><p class="text-[9px] font-black uppercase tracking-widest text-purple-400" data-v-b3984c90>Journal</p><p class="text-xs font-bold text-slate-700" data-v-b3984c90>Wrote!</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (filters.value.habits && selectedDay.value.habitDone) {
          _push(`<div class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 flex items-center gap-3" data-v-b3984c90><span class="text-xl" data-v-b3984c90>🌱</span><div data-v-b3984c90><p class="text-[9px] font-black uppercase tracking-widest text-emerald-400" data-v-b3984c90>Habits</p><p class="text-xs font-bold text-slate-700" data-v-b3984c90>${ssrInterpolate(selectedDay.value.habitDone)} Done</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (filters.value.planner && selectedDay.value.planner) {
          _push(`<div class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-blue-100 flex items-center gap-3" data-v-b3984c90><span class="text-xl" data-v-b3984c90>${ssrInterpolate(selectedDay.value.planner.done >= selectedDay.value.planner.total ? "✅" : "⏳")}</span><div data-v-b3984c90><p class="text-[9px] font-black uppercase tracking-widest text-blue-400" data-v-b3984c90>Tasks</p><p class="text-xs font-bold text-slate-700" data-v-b3984c90>${ssrInterpolate(selectedDay.value.planner.done)}/${ssrInterpolate(selectedDay.value.planner.total)}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (filters.value.finance && selectedDay.value.expense) {
          _push(`<div class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-rose-100 flex items-center gap-3" data-v-b3984c90><span class="text-xl" data-v-b3984c90>💸</span><div data-v-b3984c90><p class="text-[9px] font-black uppercase tracking-widest text-rose-400" data-v-b3984c90>Expense</p><p class="text-xs font-bold text-slate-700" data-v-b3984c90>${ssrInterpolate(compactCurrency(selectedDay.value.expense))}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!hasAnyMetric(selectedDay.value)) {
          _push(`<div class="py-12 text-center bg-white rounded-3xl border border-slate-100" data-v-b3984c90><span class="text-3xl mb-2 block" data-v-b3984c90>🎐</span><p class="text-xs font-bold text-slate-400 italic" data-v-b3984c90>No activity for this day.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="hidden md:block bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden" data-v-b3984c90><div class="flex flex-col p-5 pb-5" data-v-b3984c90><div class="grid grid-cols-7 mb-4 border-b border-slate-100 pb-3" data-v-b3984c90><!--[-->`);
      ssrRenderList(dynamicDaysOfWeek.value, (day) => {
        _push(`<div class="text-center text-sm font-black text-slate-400 uppercase tracking-widest" data-v-b3984c90>${ssrInterpolate(day)}</div>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-7 auto-rows-fr gap-3" data-v-b3984c90><!--[-->`);
      ssrRenderList(__props.calendarDays, (day, index) => {
        var _a2, _b2, _c, _d, _e, _f, _g;
        _push(`<div class="${ssrRenderClass([[
          !day.date ? "border-transparent" : !day.isCurrentMonth ? "bg-slate-50/50 text-slate-400 border-slate-100 opacity-60" : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 cursor-pointer z-10",
          day.isToday ? "ring-2 ring-indigo-500 ring-offset-2" : "",
          props.selectedDate === day.date ? "border-indigo-500 bg-indigo-50/10" : ""
        ], "min-h-[180px] flex flex-col transition-all duration-300 relative group rounded-[1.5rem] overflow-hidden border"])}" data-v-b3984c90>`);
        if (day.date) {
          _push(`<!--[--><div class="flex justify-between items-start p-3 pb-1.5" data-v-b3984c90><span class="${ssrRenderClass([day.isToday ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-700 bg-slate-100 group-hover:bg-indigo-100 group-hover:text-indigo-700", "w-9 h-9 flex items-center justify-center rounded-full text-base font-black transition-all"])}" data-v-b3984c90>${ssrInterpolate(day.dayNumber)}</span>`);
          if (day.isToday) {
            _push(`<span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1 mr-1" data-v-b3984c90>${ssrInterpolate(_ctx.$t("calendar_today"))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex flex-col flex-1 p-2.5 gap-2" data-v-b3984c90><div class="flex flex-col gap-1.5 w-full shrink-0" data-v-b3984c90>`);
          if (filters.value.events) {
            _push(`<!--[-->`);
            ssrRenderList((_a2 = day.events) == null ? void 0 : _a2.slice(0, 2), (event) => {
              _push(`<div class="px-2.5 py-1 rounded-r-lg border-l-[3px] bg-indigo-50/30 text-slate-700 text-[10px] font-bold truncate transition-colors" style="${ssrRenderStyle({ borderLeftColor: event.color })}" data-v-b3984c90>${ssrInterpolate(event.title)}</div>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (filters.value.goals) {
            _push(`<!--[-->`);
            ssrRenderList((_b2 = day.milestones) == null ? void 0 : _b2.slice(0, 1), (ms) => {
              _push(`<div class="px-2.5 py-1 rounded-r-lg border-l-[3px] bg-orange-50/30 text-slate-700 text-[10px] font-bold truncate transition-colors" style="${ssrRenderStyle({ borderLeftColor: ms.goal_color })}" data-v-b3984c90> 🎯 ${ssrInterpolate(ms.title)}</div>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (((_c = day.events) == null ? void 0 : _c.length) + ((_d = day.milestones) == null ? void 0 : _d.length) > 3) {
            _push(`<div class="text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded w-fit" data-v-b3984c90> +${ssrInterpolate(((_e = day.events) == null ? void 0 : _e.length) + ((_f = day.milestones) == null ? void 0 : _f.length) - 3)} more </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex-1" data-v-b3984c90></div>`);
          if (hasAnyMetric(day)) {
            _push(`<div class="flex flex-wrap gap-1 mt-auto pt-2 border-t border-slate-100/80" data-v-b3984c90>`);
            if (day.hasJournal && filters.value.journal) {
              _push(`<div class="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-[10px] border border-purple-100" data-v-b3984c90>📓</div>`);
            } else {
              _push(`<!---->`);
            }
            if (day.habitDone > 0 && filters.value.habits) {
              _push(`<div class="px-1.5 h-6 rounded-lg bg-emerald-50 flex items-center gap-1 text-[10px] font-black text-emerald-700 border border-emerald-100" data-v-b3984c90> 🌱 <span data-v-b3984c90>${ssrInterpolate(day.habitDone)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            if (((_g = day.planner) == null ? void 0 : _g.total) > 0 && filters.value.planner) {
              _push(`<div class="px-1.5 h-6 rounded-lg bg-blue-50 flex items-center gap-1 text-[10px] font-black text-blue-700 border border-blue-100" data-v-b3984c90>${ssrInterpolate(day.planner.done >= day.planner.total ? "✅" : "⏳")} <span data-v-b3984c90>${ssrInterpolate(day.planner.done)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            if (day.expense > 0 && filters.value.finance) {
              _push(`<div class="px-1.5 h-6 rounded-lg bg-rose-50 flex items-center gap-1 text-[10px] font-black text-rose-700 border border-rose-100" data-v-b3984c90> 💸 <span data-v-b3984c90>${ssrInterpolate(compactCurrency(day.expense))}</span></div>`);
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
const CalendarGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b3984c90"]]);
export {
  CalendarGrid as default
};
