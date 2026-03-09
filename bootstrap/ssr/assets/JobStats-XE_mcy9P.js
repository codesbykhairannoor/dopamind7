import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "JobStats",
  __ssrInlineRender: true,
  props: { stats: Object },
  setup(__props) {
    const statCards = [
      { key: "total", label: "job_status_all", fallback: "Semua", icon: "💼", color: "slate" },
      { key: "applied", label: "job_status_applied", fallback: "Dilamar", icon: "🚀", color: "blue" },
      { key: "interview", label: "job_status_interview", fallback: "Interview", icon: "🎯", color: "purple" },
      { key: "offer", label: "job_status_offer", fallback: "Dapat Offering", icon: "🎉", color: "emerald" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8" }, _attrs))}><!--[-->`);
      ssrRenderList(statCards, (stat) => {
        _push(`<div class="bg-white rounded-2xl sm:rounded-[1.5rem] p-4 sm:p-5 border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-all hover:shadow-md hover:-translate-y-0.5"><div class="${ssrRenderClass([`bg-${stat.color}-50 text-${stat.color}-600`, "w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-3xl shrink-0"])}">${ssrInterpolate(stat.icon)}</div><div><p class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5 sm:mb-1">${ssrInterpolate(_ctx.$t(stat.label, stat.fallback))}</p><h3 class="text-xl sm:text-3xl font-black text-slate-800 leading-none">${ssrInterpolate(__props.stats[stat.key] || 0)}</h3></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Job/JobStats.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
