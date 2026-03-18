import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BLGVXpxK.js";
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
          color: "text-indigo-600",
          bg: "bg-indigo-50 border-indigo-100/50",
          isTitle: true
        },
        {
          label: "goal_stats_urgent",
          value: ((_b = props.stats) == null ? void 0 : _b.upcoming_deadlines_count) || 0,
          subValue: "Upcoming Deadlines",
          icon: "calendar",
          color: "text-rose-600",
          bg: "bg-rose-50 border-rose-100/50"
        },
        {
          label: "goal_stats_pulse",
          value: `${((_c = props.stats) == null ? void 0 : _c.milestones_completed) || 0} / ${((_d = props.stats) == null ? void 0 : _d.milestones_total) || 0}`,
          subValue: "Steps Navigated",
          icon: "finance",
          color: "text-emerald-600",
          bg: "bg-emerald-50 border-emerald-100/50"
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8" }, _attrs))} data-v-90eabd8f><div class="lg:col-span-4 bg-white rounded-[2.5rem] p-7 border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden relative" data-v-90eabd8f><div class="relative shrink-0" data-v-90eabd8f><svg class="w-24 h-24 transform -rotate-90" data-v-90eabd8f><circle class="text-slate-100" stroke-width="8" stroke="currentColor" fill="transparent" r="34" cx="48" cy="48" data-v-90eabd8f></circle><circle class="text-indigo-600 transition-all duration-1000 ease-out" stroke-width="8"${ssrRenderAttr("stroke-dasharray", circumference)}${ssrRenderAttr("stroke-dashoffset", strokeDashoffset.value)} stroke-linecap="round" stroke="currentColor" fill="transparent" r="34" cx="48" cy="48" data-v-90eabd8f></circle></svg><div class="absolute inset-0 flex items-center justify-center" data-v-90eabd8f><span class="text-xl font-black text-slate-800" data-v-90eabd8f>${ssrInterpolate(masterProgress.value)}%</span></div></div><div class="flex flex-col" data-v-90eabd8f><p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1" data-v-90eabd8f>Momentum</p><h3 class="text-xl font-black text-slate-800 leading-tight" data-v-90eabd8f>Mastering<br data-v-90eabd8f>Your Vision</h3></div><div class="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors duration-700" data-v-90eabd8f></div></div><div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5" data-v-90eabd8f><!--[-->`);
      ssrRenderList(statsData.value, (stat) => {
        _push(`<div class="${ssrRenderClass([stat.bg, "p-6 rounded-[2.5rem] border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between group overflow-hidden relative"])}" data-v-90eabd8f><div class="flex items-center justify-between mb-4 relative z-10" data-v-90eabd8f><div class="${ssrRenderClass([stat.color, "p-2 rounded-xl bg-white shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3"])}" data-v-90eabd8f>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: stat.icon,
          size: "20",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</div><span class="text-[9px] font-black text-slate-400 uppercase tracking-widest" data-v-90eabd8f>${ssrInterpolate(_ctx.$t(stat.label))}</span></div><div class="relative z-10" data-v-90eabd8f><h4 class="${ssrRenderClass([stat.isTitle ? "text-sm line-clamp-1 pr-4" : "text-2xl", "font-black text-slate-800 leading-tight"])}" data-v-90eabd8f>${ssrInterpolate(stat.value)}</h4>`);
        if (stat.subValue) {
          _push(`<p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-60" data-v-90eabd8f>${ssrInterpolate(stat.subValue)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" data-v-90eabd8f></div></div>`);
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
const GoalStats = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90eabd8f"]]);
export {
  GoalStats as default
};
