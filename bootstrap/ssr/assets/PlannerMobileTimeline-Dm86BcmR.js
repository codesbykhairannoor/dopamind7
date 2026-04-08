import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "PlannerMobileTimeline",
  __ssrInlineRender: true,
  props: {
    scheduledTasks: { type: Array, default: () => [] },
    openModal: { type: Function, required: true },
    toggleComplete: { type: Function, required: true },
    getTypeColor: { type: Function, default: () => "" }
  },
  setup(__props) {
    const props = __props;
    const sortedTasks = computed(() => {
      return [...props.scheduledTasks].sort((a, b) => a.start_time.localeCompare(b.start_time));
    });
    const getTaskTheme = (type) => {
      const t = parseInt(type);
      switch (t) {
        case 1:
          return {
            icon: "🔥",
            bg: "bg-rose-50 dark:bg-rose-500/10",
            border: "border-rose-100 dark:border-rose-500/20",
            accent: "bg-rose-500",
            text: "text-rose-900 dark:text-rose-100",
            label: "URGENT"
          };
        case 2:
          return {
            icon: "⚡",
            bg: "bg-indigo-50 dark:bg-indigo-500/10",
            border: "border-indigo-100 dark:border-indigo-500/20",
            accent: "bg-indigo-600",
            text: "text-indigo-900 dark:text-indigo-100",
            label: "WORK"
          };
        case 3:
          return {
            icon: "🍃",
            bg: "bg-emerald-50 dark:bg-emerald-500/10",
            border: "border-emerald-100 dark:border-emerald-500/20",
            accent: "bg-emerald-500",
            text: "text-emerald-900 dark:text-emerald-100",
            label: "TASKS"
          };
        default:
          return {
            icon: "📝",
            bg: "bg-white dark:bg-slate-900",
            border: "border-slate-100 dark:border-slate-800",
            accent: "bg-slate-400",
            text: "text-slate-800 dark:text-slate-200",
            label: "OTHER"
          };
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "planner-mobile-timeline",
        class: "relative pl-6 pr-2"
      }, _attrs))} data-v-f3d6cc9a><div class="absolute left-[39px] top-8 bottom-8 w-[2px] bg-slate-100 dark:bg-slate-800 pointer-events-none" data-v-f3d6cc9a></div>`);
      if (sortedTasks.value.length === 0) {
        _push(`<div id="empty-planner-state" class="py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-6" data-v-f3d6cc9a><div class="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-5xl" data-v-f3d6cc9a>✨</div><div class="space-y-1 px-10" data-v-f3d6cc9a><p class="text-sm font-black text-slate-800 dark:text-white" data-v-f3d6cc9a>Clear Canvas</p><p class="text-xs font-bold text-slate-400" data-v-f3d6cc9a>Ready to structure your day? Start adding tasks to build momentum.</p></div><button id="btn-add-initial-task" class="bg-indigo-600 text-white font-black py-4 px-10 rounded-[1.8rem] shadow-xl shadow-indigo-100 dark:shadow-none active:scale-95 transition-all outline-none" data-v-f3d6cc9a> Begin Planning </button></div>`);
      } else {
        _push(`<div class="space-y-10 relative" data-v-f3d6cc9a><!--[-->`);
        ssrRenderList(sortedTasks.value, (task, index) => {
          _push(`<div class="relative flex gap-8 group" data-v-f3d6cc9a><div class="flex flex-col items-center shrink-0 w-12 py-2" data-v-f3d6cc9a><span class="text-[10px] font-black text-slate-400 dark:text-slate-600 mb-3 tabular-nums" data-v-f3d6cc9a>${ssrInterpolate(task.start_time)}</span><div class="relative flex items-center justify-center w-5 h-5" data-v-f3d6cc9a><div class="${ssrRenderClass([[getTaskTheme(task.type).border, task.is_completed ? "border-emerald-500 scale-110 shadow-lg shadow-emerald-200" : ""], "absolute inset-0 rounded-full border-4 bg-white dark:bg-slate-950 z-20 transition-all duration-500"])}" data-v-f3d6cc9a></div>`);
          if (task.is_completed) {
            _push(`<div class="w-1.5 h-1.5 bg-emerald-500 rounded-full z-30 animate-pulse" data-v-f3d6cc9a></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div${ssrRenderAttr("id", "task-card-" + task.id)} class="${ssrRenderClass([[
            getTaskTheme(task.type).border,
            task.is_completed ? "opacity-50 grayscale-[0.3]" : "hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900"
          ], "flex-1 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border transition-all duration-300 active:scale-[0.98] shadow-sm relative overflow-hidden group/card"])}" data-v-f3d6cc9a><div class="flex items-center justify-between gap-4 mb-5" data-v-f3d6cc9a><div class="flex items-center gap-3" data-v-f3d6cc9a><div class="${ssrRenderClass([getTaskTheme(task.type).bg, "w-10 h-10 rounded-2xl flex items-center justify-center text-xl transition-transform group-hover/card:rotate-12"])}" data-v-f3d6cc9a>${ssrInterpolate(getTaskTheme(task.type).icon)}</div><div data-v-f3d6cc9a><span class="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.1em]" data-v-f3d6cc9a>${ssrInterpolate(task.end_time || "??:??")} End</span></div></div><button${ssrRenderAttr("id", "toggle-task-" + task.id)} class="${ssrRenderClass([task.is_completed ? "bg-emerald-500 border-emerald-500 text-white rotate-0" : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 active:scale-90", "w-11 h-11 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 shadow-sm"])}" data-v-f3d6cc9a>`);
          if (task.is_completed) {
            _push(ssrRenderComponent(_sfc_main$1, {
              name: "check",
              size: "20",
              "stroke-width": "4"
            }, null, _parent));
          } else {
            _push(`<div class="${ssrRenderClass([getTaskTheme(task.type).accent, "w-2.5 h-2.5 rounded-full"])}" data-v-f3d6cc9a></div>`);
          }
          _push(`</button></div><div class="space-y-2" data-v-f3d6cc9a><h4 class="${ssrRenderClass([[getTaskTheme(task.type).text, task.is_completed ? "line-through text-slate-400" : ""], "text-lg font-black leading-tight tracking-tight pr-4 transition-colors"])}" data-v-f3d6cc9a>${ssrInterpolate(task.title)}</h4>`);
          if (task.notes) {
            _push(`<p class="${ssrRenderClass([getTaskTheme(task.type).text, "text-xs font-bold leading-relaxed opacity-50 line-clamp-2"])}" data-v-f3d6cc9a>${ssrInterpolate(task.notes)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="mt-6 flex items-center gap-3" data-v-f3d6cc9a><span class="text-[8px] font-black px-3 py-1.5 rounded-full border bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 shadow-sm" data-v-f3d6cc9a>${ssrInterpolate(getTaskTheme(task.type).label)}</span>`);
          if (task.is_completed) {
            _push(`<div class="flex items-center gap-1.5" data-v-f3d6cc9a><span class="w-1.5 h-1.5 rounded-full bg-emerald-500" data-v-f3d6cc9a></span><span class="text-[9px] font-black text-emerald-500 uppercase tracking-widest" data-v-f3d6cc9a>Achieved</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl pointer-events-none" data-v-f3d6cc9a></div></div></div>`);
        });
        _push(`<!--]--><div class="relative flex items-center gap-8 pl-12 h-16" data-v-f3d6cc9a><button id="btn-add-footer" class="flex items-center gap-3 text-slate-300 hover:text-indigo-500 transition-colors group" data-v-f3d6cc9a><div class="w-10 h-10 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:border-indigo-300 transition-colors" data-v-f3d6cc9a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "plus",
          size: "18"
        }, null, _parent));
        _push(`</div><span class="text-xs font-black uppercase tracking-widest group-hover:tracking-[0.2em] transition-all" data-v-f3d6cc9a>Next Entry</span></button></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Planner/PlannerMobileTimeline.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PlannerMobileTimeline = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f3d6cc9a"]]);
export {
  PlannerMobileTimeline as default
};
