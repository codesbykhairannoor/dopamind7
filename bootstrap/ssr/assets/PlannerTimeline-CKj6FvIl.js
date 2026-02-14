import { ref, onMounted, watch, computed, onUnmounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const VIEW_LIMIT = 14;
const HOUR_HEIGHT = 80;
const TIME_COL_WIDTH = 80;
const VISUAL_GAP = 2;
const _sfc_main = {
  __name: "PlannerTimeline",
  __ssrInlineRender: true,
  props: {
    scheduledTasks: { type: Array, default: () => [] },
    openModal: { type: Function, required: true },
    toggleComplete: { type: Function, required: true },
    getTypeColor: { type: Function, default: () => "" }
  },
  setup(__props) {
    const isStartHourOpen = ref(false);
    const startHour = ref(6);
    onMounted(() => {
      const savedStart = localStorage.getItem("planner_start_time");
      if (savedStart) startHour.value = parseInt(savedStart);
    });
    watch(startHour, (val) => localStorage.setItem("planner_start_time", val));
    const visibleTimeSlots = computed(() => {
      const slots = [];
      for (let i = 0; i < VIEW_LIMIT; i++) {
        const h = (startHour.value + i) % 24;
        slots.push(`${h.toString().padStart(2, "0")}:00`);
      }
      return slots;
    });
    const now = ref(/* @__PURE__ */ new Date());
    let timerInterval;
    onMounted(() => {
      timerInterval = setInterval(() => now.value = /* @__PURE__ */ new Date(), 6e4);
    });
    onUnmounted(() => clearInterval(timerInterval));
    const getTaskTheme = (type) => {
      const t = parseInt(type);
      switch (t) {
        case 1:
          return {
            labelKey: "priority_urgent",
            card: "bg-rose-50 border-rose-200 hover:border-rose-300",
            text: "text-rose-900",
            subtext: "text-rose-500",
            badge: "bg-rose-100 text-rose-700 border-rose-200",
            check: "text-rose-300 border-rose-300 hover:bg-rose-100"
          };
        case 2:
          return {
            labelKey: "priority_work",
            card: "bg-indigo-50 border-indigo-200 hover:border-indigo-300",
            text: "text-indigo-900",
            subtext: "text-indigo-500",
            badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
            check: "text-indigo-300 border-indigo-300 hover:bg-indigo-100"
          };
        case 3:
          return {
            labelKey: "priority_normal",
            card: "bg-emerald-50 border-emerald-200 hover:border-emerald-300",
            text: "text-emerald-900",
            subtext: "text-emerald-500",
            badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
            check: "text-emerald-300 border-emerald-300 hover:bg-emerald-100"
          };
        default:
          return {
            icon: "📝",
            labelKey: "label_todo",
            card: "bg-white border-slate-200 hover:border-slate-300 shadow-sm",
            text: "text-slate-800",
            subtext: "text-slate-500",
            badge: "bg-slate-100 text-slate-700 border-slate-200",
            check: "text-slate-300 border-slate-300 hover:bg-slate-50"
          };
      }
    };
    const formatTimeRange = (task) => `${task.start_time} - ${task.end_time || "??"}`;
    const getDurationMinutes = (task) => {
      const [startH, startM] = task.start_time.split(":").map(Number);
      let [endH, endM] = task.end_time ? task.end_time.split(":").map(Number) : [startH + 1, startM];
      let duration = endH * 60 + endM - (startH * 60 + startM);
      if (duration < 0) duration += 1440;
      return duration;
    };
    const getTaskStyle = (task) => {
      const [startH, startM] = task.start_time.split(":").map(Number);
      const duration = getDurationMinutes(task);
      const taskStartMinutes = startH * 60 + startM;
      const viewStartMinutes = startHour.value * 60;
      let relStart = taskStartMinutes - viewStartMinutes;
      if (relStart < -720) relStart += 1440;
      else if (relStart > 720) relStart -= 1440;
      const relEnd = relStart + duration;
      if (relEnd <= 0) return { display: "none" };
      if (relStart >= VIEW_LIMIT * 60) return { display: "none" };
      const renderStart = Math.max(0, relStart);
      const renderEnd = Math.min(VIEW_LIMIT * 60, relEnd);
      const renderDuration = renderEnd - renderStart;
      if (renderDuration <= 0) return { display: "none" };
      const topPx = renderStart / 60 * HOUR_HEIGHT;
      const heightPx = renderDuration / 60 * HOUR_HEIGHT;
      const finalHeight = Math.max(heightPx - VISUAL_GAP, 28);
      return {
        top: `${topPx}px`,
        height: `${finalHeight}px`,
        left: `${TIME_COL_WIDTH + 8}px`,
        right: "8px",
        zIndex: duration < 30 ? 20 : 10
      };
    };
    const getTaskViewMode = (task) => {
      const duration = getDurationMinutes(task);
      if (duration < 45) return "MICRO";
      return "NORMAL";
    };
    const currentTimeIndicatorStyle = computed(() => {
      const currentH = now.value.getHours();
      const currentM = now.value.getMinutes();
      let diff = currentH - startHour.value;
      if (diff < 0) diff += 24;
      if (diff >= VIEW_LIMIT) return { display: "none" };
      const minutesFromStart = diff * 60 + currentM;
      return { top: `${minutesFromStart / 60 * HOUR_HEIGHT}px`, left: `${TIME_COL_WIDTH}px`, right: "0px" };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-slate-50 rounded-3xl shadow-xl border border-slate-200 overflow-hidden select-none flex flex-col h-full" }, _attrs))} data-v-dcb32fcc><div class="px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm flex justify-between items-center shrink-0" data-v-dcb32fcc><div class="flex items-center gap-3" data-v-dcb32fcc><div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-lg shadow-indigo-200 shadow-lg" data-v-dcb32fcc>📅</div><h3 class="font-black text-slate-800 text-base leading-none" data-v-dcb32fcc>${ssrInterpolate(_ctx.$t("timeline_title"))}</h3></div><div class="relative" data-v-dcb32fcc><button class="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 hover:bg-slate-200 transition-all group" data-v-dcb32fcc><span class="text-[10px] font-black text-slate-400 px-2 uppercase tracking-tighter" data-v-dcb32fcc>${ssrInterpolate(_ctx.$t("label_start"))}</span><div class="bg-white px-2 py-0.5 rounded-md shadow-sm border border-slate-200 flex items-center gap-1" data-v-dcb32fcc><span class="text-xs font-black text-indigo-600 font-mono" data-v-dcb32fcc>${ssrInterpolate(startHour.value.toString().padStart(2, "0"))}:00</span><svg class="${ssrRenderClass([{ "rotate-180": isStartHourOpen.value }, "w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-dcb32fcc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" data-v-dcb32fcc></path></svg></div></button>`);
      if (isStartHourOpen.value) {
        _push(`<div class="absolute right-0 top-full mt-2 w-72 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 p-4 z-[60] animate-in fade-in zoom-in-95 duration-200" data-v-dcb32fcc><div class="flex justify-between items-center mb-4 px-1" data-v-dcb32fcc><span class="text-[10px] font-black text-slate-400 uppercase tracking-widest" data-v-dcb32fcc>${ssrInterpolate(_ctx.$t("select_hour"))}</span><button class="text-slate-300 hover:text-rose-500 transition-colors" data-v-dcb32fcc><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-dcb32fcc><path d="M6 18L18 6M6 6l12 12" data-v-dcb32fcc></path></svg></button></div><div class="grid grid-cols-4 gap-2" data-v-dcb32fcc><!--[-->`);
        ssrRenderList(24, (h) => {
          _push(`<button class="${ssrRenderClass([startHour.value === h - 1 ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-slate-50 border-transparent text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100", "py-2.5 flex items-center justify-center rounded-xl text-[10px] font-black font-mono transition-all border-2"])}" data-v-dcb32fcc>${ssrInterpolate((h - 1).toString().padStart(2, "0"))}:00 </button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isStartHourOpen.value) {
        _push(`<div class="fixed inset-0 z-50" data-v-dcb32fcc></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex-1 relative w-full bg-white overflow-y-auto overflow-x-hidden custom-scrollbar" data-v-dcb32fcc><div class="relative w-full" style="${ssrRenderStyle({ height: `${VIEW_LIMIT * HOUR_HEIGHT}px` })}" data-v-dcb32fcc><!--[-->`);
      ssrRenderList(visibleTimeSlots.value, (time, index) => {
        _push(`<div class="absolute w-full flex border-b border-slate-100" style="${ssrRenderStyle({ top: `${index * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` })}" data-v-dcb32fcc><div class="w-[80px] shrink-0 border-r border-slate-100 bg-slate-50/40 flex justify-center pt-3" data-v-dcb32fcc><span class="text-[11px] font-bold text-slate-400 font-mono" data-v-dcb32fcc>${ssrInterpolate(time)}</span></div><div class="flex-1 relative group/slot cursor-pointer" data-v-dcb32fcc><div class="absolute inset-x-2 top-0.5 bottom-0.5 rounded border border-transparent group-hover/slot:border-indigo-100 group-hover/slot:bg-indigo-50/30 flex items-center justify-center" data-v-dcb32fcc><span class="opacity-0 group-hover/slot:opacity-100 text-indigo-400 text-[10px] font-bold tracking-widest" data-v-dcb32fcc>+ ${ssrInterpolate(_ctx.$t("btn_add_timeline"))}</span></div></div></div>`);
      });
      _push(`<!--]--><div class="absolute z-30 flex items-center pointer-events-none w-full" style="${ssrRenderStyle(currentTimeIndicatorStyle.value)}" data-v-dcb32fcc><div class="w-[80px] flex justify-end pr-2" data-v-dcb32fcc><span class="text-[9px] font-black text-white bg-rose-500 px-1.5 rounded-sm shadow-sm" data-v-dcb32fcc>${ssrInterpolate(_ctx.$t("label_now"))}</span></div><div class="flex-1 h-[2px] bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" data-v-dcb32fcc></div></div><!--[-->`);
      ssrRenderList(__props.scheduledTasks, (task) => {
        _push(`<div style="${ssrRenderStyle(getTaskStyle(task))}" class="${ssrRenderClass([[
          getTaskTheme(task.type).card,
          task.is_completed ? "opacity-60 grayscale filter" : ""
        ], "group absolute rounded-lg border px-0 py-0 shadow-sm cursor-pointer overflow-hidden transition-all hover:shadow-md hover:scale-[1.005]"])}" data-v-dcb32fcc><div class="w-full h-full relative"${ssrRenderAttr("title", task.notes ? `📝 ${task.notes}` : "")} data-v-dcb32fcc>`);
        if (getTaskViewMode(task) === "MICRO") {
          _push(`<div class="flex items-center justify-between h-full px-2 gap-2" data-v-dcb32fcc><div class="flex items-center gap-1.5 overflow-hidden flex-1 min-w-0" data-v-dcb32fcc><span class="text-xs shrink-0 opacity-80" data-v-dcb32fcc>${ssrInterpolate(getTaskTheme(task.type).icon)}</span><span class="${ssrRenderClass([[getTaskTheme(task.type).text, task.is_completed && "line-through"], "font-bold text-xs truncate leading-none"])}" data-v-dcb32fcc>${ssrInterpolate(task.title)}</span><span class="${ssrRenderClass([getTaskTheme(task.type).subtext, "text-[10px] font-mono opacity-60 whitespace-nowrap shrink-0"])}" data-v-dcb32fcc> (${ssrInterpolate(formatTimeRange(task))}) </span></div><button class="${ssrRenderClass([task.is_completed ? "bg-emerald-500 border-emerald-500 text-white" : getTaskTheme(task.type).check, "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors bg-white hover:scale-110"])}" data-v-dcb32fcc>`);
          if (task.is_completed) {
            _push(`<svg class="w-2.5 h-2.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-dcb32fcc><path d="M5 13l4 4L19 7" data-v-dcb32fcc></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button></div>`);
        } else {
          _push(`<div class="flex flex-col h-full px-3 py-2 gap-1" data-v-dcb32fcc><div class="flex justify-between items-center shrink-0" data-v-dcb32fcc><div class="flex items-center gap-2" data-v-dcb32fcc><span class="${ssrRenderClass([getTaskTheme(task.type).badge, "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border flex items-center gap-1 shadow-sm opacity-90"])}" data-v-dcb32fcc>${ssrInterpolate(getTaskTheme(task.type).icon)} ${ssrInterpolate(_ctx.$t(getTaskTheme(task.type).labelKey))}</span><span class="${ssrRenderClass([getTaskTheme(task.type).text, "text-[10px] font-mono font-bold opacity-60"])}" data-v-dcb32fcc>${ssrInterpolate(formatTimeRange(task))}</span></div><button class="${ssrRenderClass([task.is_completed ? "bg-emerald-500 border-emerald-500 text-white" : getTaskTheme(task.type).check, "w-5 h-5 rounded border bg-white flex items-center justify-center hover:scale-110 transition-transform shrink-0 shadow-sm"])}" data-v-dcb32fcc>`);
          if (task.is_completed) {
            _push(`<svg class="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-dcb32fcc><path d="M5 13l4 4L19 7" data-v-dcb32fcc></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button></div><div class="flex items-center gap-2 mt-0.5 min-h-0" data-v-dcb32fcc><h4 class="${ssrRenderClass([[getTaskTheme(task.type).text, task.is_completed && "line-through opacity-50"], "font-black text-sm leading-tight truncate shrink-0 max-w-[50%]"])}" data-v-dcb32fcc>${ssrInterpolate(task.title)}</h4>`);
          if (task.notes) {
            _push(`<span class="text-xs opacity-30 text-slate-400" data-v-dcb32fcc>|</span>`);
          } else {
            _push(`<!---->`);
          }
          if (task.notes) {
            _push(`<div class="${ssrRenderClass([getTaskTheme(task.type).text, "truncate text-xs italic opacity-70 flex-1"])}" data-v-dcb32fcc>${ssrInterpolate(task.notes)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Planner/PlannerTimeline.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PlannerTimeline = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dcb32fcc"]]);
export {
  PlannerTimeline as default
};
