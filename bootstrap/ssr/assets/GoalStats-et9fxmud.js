import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./OneForMindIcon-Dc5dmmrC.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "GoalStats",
  __ssrInlineRender: true,
  props: {
    stats: Object,
    goals: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const statsData = computed(() => {
      var _a, _b, _c, _d;
      return [
        {
          label: "goal_stats_focus",
          value: ((_a = props.stats) == null ? void 0 : _a.top_goal_title) || "Focus Mode",
          icon: "target",
          color: "text-indigo-600 dark:text-indigo-400",
          bg: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100/50 dark:border-indigo-500/20",
          isTitle: true
        },
        {
          label: "goal_stats_urgent",
          value: ((_b = props.stats) == null ? void 0 : _b.upcoming_deadlines_count) || 0,
          subValue: "Upcoming Deadlines",
          icon: "calendar",
          color: "text-rose-600 dark:text-rose-400",
          bg: "bg-rose-50 dark:bg-rose-500/10 border-rose-100/50 dark:border-rose-500/20"
        },
        {
          label: "goal_stats_pulse",
          value: `${((_c = props.stats) == null ? void 0 : _c.milestones_completed) || 0} / ${((_d = props.stats) == null ? void 0 : _d.milestones_total) || 0}`,
          subValue: "Steps Navigated",
          icon: "finance",
          color: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100/50 dark:border-emerald-500/20"
        }
      ];
    });
    const masterProgress = computed(() => {
      var _a;
      return ((_a = props.stats) == null ? void 0 : _a.avg_progress) || 0;
    });
    const circumference = 2 * Math.PI * 34;
    const strokeDashoffset = computed(() => circumference - masterProgress.value / 100 * circumference);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8" }, _attrs))} data-v-eb5c1c14><div class="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2.5rem] p-7 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6 group hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden relative" data-v-eb5c1c14><div class="relative shrink-0" data-v-eb5c1c14><svg class="w-24 h-24 transform -rotate-90" data-v-eb5c1c14><circle class="text-slate-100 dark:text-slate-800" stroke-width="8" stroke="currentColor" fill="transparent" r="34" cx="48" cy="48" data-v-eb5c1c14></circle><circle class="text-indigo-600 transition-all duration-1000 ease-out" stroke-width="8"${ssrRenderAttr("stroke-dasharray", circumference)}${ssrRenderAttr("stroke-dashoffset", strokeDashoffset.value)} stroke-linecap="round" stroke="currentColor" fill="transparent" r="34" cx="48" cy="48" data-v-eb5c1c14></circle></svg><div class="absolute inset-0 flex items-center justify-center" data-v-eb5c1c14><span class="text-xl font-black text-slate-800 dark:text-white transition-colors duration-500" data-v-eb5c1c14>${ssrInterpolate(masterProgress.value)}%</span></div></div><div class="flex flex-col" data-v-eb5c1c14><p class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] mb-1" data-v-eb5c1c14>Momentum</p><h3 class="text-xl font-black text-slate-800 dark:text-white leading-tight transition-colors duration-500" data-v-eb5c1c14>Mastering<br data-v-eb5c1c14>Your Vision</h3></div><div class="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors duration-700" data-v-eb5c1c14></div></div><div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5" data-v-eb5c1c14><!--[-->`);
      ssrRenderList(statsData.value, (stat) => {
        _push(`<div class="${ssrRenderClass([stat.bg, "p-6 rounded-[2.5rem] border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between group overflow-hidden relative"])}" data-v-eb5c1c14><div class="flex items-center justify-between mb-4 relative z-10" data-v-eb5c1c14><div class="${ssrRenderClass([stat.color, "p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3"])}" data-v-eb5c1c14>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: stat.icon,
          size: "20",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</div><span class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest" data-v-eb5c1c14>${ssrInterpolate(_ctx.$t(stat.label))}</span></div><div class="relative z-10" data-v-eb5c1c14><h4 class="${ssrRenderClass([stat.isTitle ? "text-sm line-clamp-1 pr-4" : "text-2xl", "font-black text-slate-800 dark:text-white leading-tight transition-colors duration-500"])}" data-v-eb5c1c14>${ssrInterpolate(stat.value)}</h4>`);
        if (stat.subValue) {
          _push(`<p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5 opacity-60" data-v-eb5c1c14>${ssrInterpolate(stat.subValue)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent pointer-events-none" data-v-eb5c1c14></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/GoalStats.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GoalStats = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb5c1c14"]]);
export {
  GoalStats as default
};
