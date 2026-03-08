import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./OneForMindIcon-Dwf7AvKJ.js";
const _sfc_main = {
  __name: "GoalStats",
  __ssrInlineRender: true,
  props: {
    stats: Object
  },
  setup(__props) {
    const props = __props;
    const statsData = computed(() => [
      {
        label: "goal_stats_focus",
        value: props.stats.top_goal_title || "goal_empty_title",
        icon: "target",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        isTitle: true
      },
      {
        label: "goal_stats_urgent",
        value: props.stats.upcoming_deadlines_count,
        subValue: "goal_deadlines_label",
        icon: "calendar",
        color: "text-rose-600",
        bg: "bg-rose-50"
      },
      {
        label: "goal_stats_pulse",
        value: `${props.stats.milestones_completed} / ${props.stats.milestones_total}`,
        icon: "finance",
        // Using finance icon for pulse/stats look
        color: "text-emerald-600",
        bg: "bg-emerald-50"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col lg:flex-row gap-4 mb-6" }, _attrs))}><div class="lg:w-1/4 bg-indigo-600 rounded-[2rem] p-5 text-white relative overflow-hidden shadow-xl shadow-indigo-100 group flex flex-col justify-between min-h-[140px]"><div class="relative z-10"><p class="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-0.5">${ssrInterpolate(_ctx.$t("goal_stats_master_progress"))}</p><div class="flex items-baseline gap-1.5"><h3 class="text-3xl font-black tabular-nums">${ssrInterpolate(__props.stats.avg_progress)}<span class="text-base text-indigo-300/50">%</span></h3></div></div><div class="relative z-10"><div class="flex justify-between text-[9px] font-bold text-indigo-200 mb-1 uppercase tracking-wider"><span>${ssrInterpolate(__props.stats.avg_progress)}%</span></div><div class="h-1.5 bg-black/10 rounded-full overflow-hidden p-0.5 border border-white/10"><div class="h-full rounded-full bg-white transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(255,255,255,0.5)]" style="${ssrRenderStyle({ width: __props.stats.avg_progress + "%" })}"></div></div></div><div class="absolute -right-6 -bottom-6 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div></div><div class="lg:flex-1 grid grid-cols-1 md:grid-cols-3 gap-3"><!--[-->`);
      ssrRenderList(statsData.value, (stat) => {
        _push(`<div class="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"><div class="flex items-center justify-between mb-2"><div class="${ssrRenderClass([stat.bg, stat.color, "w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"])}">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: stat.icon,
          size: "16",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</div><span class="text-[8px] font-black text-slate-300 uppercase tracking-widest">${ssrInterpolate(_ctx.$t(stat.label))}</span></div><div><h4 class="${ssrRenderClass([stat.isTitle ? "text-xs line-clamp-1" : "text-xl", "font-black text-slate-800 leading-tight"])}">`);
        if (stat.isTitle) {
          _push(`<!--[-->${ssrInterpolate(stat.value === "goal_empty_title" ? _ctx.$t(stat.value) : stat.value)}<!--]-->`);
        } else {
          _push(`<!--[-->${ssrInterpolate(stat.value)}<!--]-->`);
        }
        _push(`</h4>`);
        if (stat.subValue) {
          _push(`<p class="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">${ssrInterpolate(_ctx.$t(stat.subValue))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
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
export {
  _sfc_main as default
};
