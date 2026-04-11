import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BvGLCgx4.js";
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
      const s = props.stats || {};
      return [
        {
          label: "goal_stats_north_star",
          value: s.top_goal_title || "No Active Vision",
          progress: s.top_goal_progress || 0,
          icon: "goal",
          // Changed to existing icon
          color: "text-indigo-600 dark:text-indigo-400",
          bg: "bg-white dark:bg-slate-900",
          type: "progress"
        },
        {
          label: "goal_stats_runway",
          value: s.urgent_goal_title,
          // Handle fallback in template
          daysLeft: typeof s.urgent_goal_days_left === "number" ? s.urgent_goal_days_left : null,
          icon: "calendar",
          color: "text-amber-600 dark:text-amber-400",
          bg: "bg-white dark:bg-slate-900",
          type: "time"
        },
        {
          label: "goal_stats_mastery",
          value: `${s.milestones_completed || 0} / ${s.milestones_total || 0}`,
          subValue: "Steps Navigated",
          icon: "premium",
          // Changed to existing icon
          color: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-white dark:bg-slate-900",
          type: "ratio"
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8" }, _attrs))} data-v-ee6a72f3><div class="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2.5rem] p-7 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6 group hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden relative" data-v-ee6a72f3><div class="relative shrink-0" data-v-ee6a72f3><svg class="w-24 h-24 transform -rotate-90" data-v-ee6a72f3><circle class="text-slate-100 dark:text-slate-800" stroke-width="8" stroke="currentColor" fill="transparent" r="34" cx="48" cy="48" data-v-ee6a72f3></circle><circle class="text-indigo-600 transition-all duration-1000 ease-out" stroke-width="8"${ssrRenderAttr("stroke-dasharray", circumference)}${ssrRenderAttr("stroke-dashoffset", strokeDashoffset.value)} stroke-linecap="round" stroke="currentColor" fill="transparent" r="34" cx="48" cy="48" data-v-ee6a72f3></circle></svg><div class="absolute inset-0 flex items-center justify-center" data-v-ee6a72f3><span class="text-xl font-black text-slate-800 dark:text-white transition-colors duration-500" data-v-ee6a72f3>${ssrInterpolate(masterProgress.value)}%</span></div></div><div class="flex flex-col" data-v-ee6a72f3><p class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] mb-1" data-v-ee6a72f3>${ssrInterpolate(_ctx.$t("goal_stats_momentum"))}</p><h3 class="text-xl font-black text-slate-800 dark:text-white leading-tight transition-colors duration-500" data-v-ee6a72f3> Mastering<br data-v-ee6a72f3>Your Vision </h3></div><div class="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors duration-700" data-v-ee6a72f3></div></div><div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5" data-v-ee6a72f3><!--[-->`);
      ssrRenderList(statsData.value, (stat) => {
        _push(`<div class="p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between group overflow-hidden relative" data-v-ee6a72f3><div class="flex items-center justify-between mb-4 relative z-10" data-v-ee6a72f3><div class="${ssrRenderClass([stat.color, "p-2 rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3"])}" data-v-ee6a72f3>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: stat.icon,
          size: "18",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</div><span class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest" data-v-ee6a72f3>${ssrInterpolate(_ctx.$t(stat.label))}</span></div><div class="relative z-10" data-v-ee6a72f3>`);
        if (stat.type === "progress") {
          _push(`<div class="space-y-2" data-v-ee6a72f3><h4 class="text-sm font-black text-slate-800 dark:text-white line-clamp-1 pr-2" data-v-ee6a72f3>${ssrInterpolate(stat.value)}</h4><div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden" data-v-ee6a72f3><div class="h-full bg-indigo-500 transition-all duration-1000" style="${ssrRenderStyle({ width: stat.progress + "%" })}" data-v-ee6a72f3></div></div></div>`);
        } else if (stat.type === "time") {
          _push(`<div class="space-y-1" data-v-ee6a72f3><h4 class="text-xs font-black text-slate-800 dark:text-white line-clamp-1 opacity-80" data-v-ee6a72f3>${ssrInterpolate(stat.value || _ctx.$t("goal_stats_calm"))}</h4><p class="${ssrRenderClass([stat.daysLeft !== null && stat.daysLeft <= 3 ? "text-rose-500 animate-pulse" : "text-slate-800 dark:text-white", "text-xl font-black"])}" data-v-ee6a72f3>${ssrInterpolate(typeof stat.daysLeft === "number" ? _ctx.$t("goal_stats_day_left", { days: stat.daysLeft }) : _ctx.$t("goal_stats_calm"))}</p></div>`);
        } else if (stat.type === "ratio") {
          _push(`<div data-v-ee6a72f3><h4 class="text-2xl font-black text-slate-800 dark:text-white mb-1" data-v-ee6a72f3>${ssrInterpolate(stat.value)}</h4><p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-60" data-v-ee6a72f3>${ssrInterpolate(stat.subValue)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="absolute -right-2 -top-2 w-12 h-12 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" data-v-ee6a72f3></div></div>`);
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
const GoalStats = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee6a72f3"]]);
export {
  GoalStats as default
};
