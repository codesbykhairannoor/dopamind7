import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
const _sfc_main = {
  __name: "GoalStats",
  __ssrInlineRender: true,
  props: {
    stats: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-12" }, _attrs))}><div class="md:col-span-2 bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200 group"><div class="relative z-10 flex flex-col h-full justify-between"><div><p class="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">${ssrInterpolate(_ctx.$t("goal_stats_master_progress", "Master Progress"))}</p><div class="flex items-baseline gap-3"><h3 class="text-6xl font-black">${ssrInterpolate(__props.stats.avg_progress)}<span class="text-2xl text-slate-500">%</span></h3><span class="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">${ssrInterpolate(_ctx.$t("goal_stats_overall", "Overall Progress"))}</span></div></div><div class="mt-8"><div class="h-3 bg-white/10 rounded-full overflow-hidden p-0.5"><div class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out" style="${ssrRenderStyle({ width: __props.stats.avg_progress + "%" })}"></div></div></div></div><div class="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div><div class="absolute -right-5 -top-5 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-700"></div></div><div class="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group"><div><div class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🔥</div><p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">${ssrInterpolate(_ctx.$t("goal_stats_focus", "Focus Project"))}</p><h3 class="text-lg font-black text-slate-800 line-clamp-2 leading-tight">${ssrInterpolate(__props.stats.top_goal_title || _ctx.$t("goal_empty_title", "No Active Project"))}</h3></div>`);
      if (__props.stats.top_goal_title) {
        _push(`<div class="mt-4 pt-4 border-t border-slate-50"><span class="text-[0.6rem] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> ${ssrInterpolate(_ctx.$t("goal_stats_top_momentum", "Highest Momentum"))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group"><div><div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📈</div><p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">${ssrInterpolate(_ctx.$t("goal_stats_pulse", "Project Pulse"))}</p><div class="flex items-baseline gap-2"><h3 class="text-4xl font-black text-slate-800">${ssrInterpolate(__props.stats.milestones_completed)}</h3><span class="text-sm font-bold text-slate-300">/ ${ssrInterpolate(__props.stats.milestones_total)}</span></div></div><div class="mt-4 pt-4 border-t border-slate-50"><p class="text-[0.6rem] font-black text-emerald-500 uppercase tracking-widest line-clamp-1">${ssrInterpolate(__props.stats.active)} ${ssrInterpolate(_ctx.$t("goal_status_active", "Active Projects"))}</p></div></div><div class="bg-gradient-to-br from-rose-500 to-rose-600 p-8 rounded-[2.5rem] shadow-xl shadow-rose-100 flex flex-col justify-between group relative overflow-hidden"><div class="relative z-10"><div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl mb-4 text-white">⏰</div><p class="text-[0.65rem] font-black text-rose-100 uppercase tracking-[0.2em] mb-1">Most Urgent</p><h3 class="text-lg font-black text-white line-clamp-2 leading-tight">${ssrInterpolate(__props.stats.urgent_goal_title || "No upcoming deadlines")}</h3></div><div class="mt-4 pt-4 border-t border-white/10 relative z-10"><span class="text-[0.6rem] font-black text-rose-100 uppercase tracking-widest flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-white animate-pulse"></span> ${ssrInterpolate(__props.stats.upcoming_deadlines_count)} Deadlines this week </span></div><div class="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div></div></div>`);
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
