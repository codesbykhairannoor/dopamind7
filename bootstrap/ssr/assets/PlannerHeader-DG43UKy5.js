import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "PlannerHeader",
  __ssrInlineRender: true,
  props: {
    openModal: Function,
    resetBoard: Function,
    stats: Object
  },
  setup(__props) {
    const page = usePage();
    const todayDate = computed(() => {
      const currentLocale = page.props.locale || "id";
      return dayjs().locale(currentLocale).format("dddd, D MMMM YYYY");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 md:sticky top-0 z-30 transition-all" }, _attrs))}><div class="w-full flex flex-col md:flex-row justify-between items-center gap-4"><div class="flex items-center gap-4 w-full md:w-auto"><div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg shadow-indigo-200"> 📅 </div><div><h2 class="text-xl font-black text-slate-800 tracking-tight">${ssrInterpolate(_ctx.$t("header_title"))}</h2><p class="text-slate-500 font-medium text-xs capitalize">${ssrInterpolate(todayDate.value)}</p></div></div><div class="flex-1 w-full md:px-12 max-w-4xl"><div class="flex justify-between text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest"><span>${ssrInterpolate(_ctx.$t("header_progress"))}</span><span class="text-indigo-600">${ssrInterpolate(__props.stats.percent)}%</span></div><div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50"><div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out" style="${ssrRenderStyle({ width: `${__props.stats.percent}%` })}"></div></div><div class="flex gap-4 mt-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-tight"><span>⚡ ${ssrInterpolate(__props.stats.completed)} ${ssrInterpolate(_ctx.$t("header_completed"))}</span><span class="text-slate-300">|</span><span>⏳ ${ssrInterpolate(__props.stats.pending)} ${ssrInterpolate(_ctx.$t("header_pending"))}</span></div></div><div class="flex gap-3 w-full md:w-auto"><button class="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 text-sm active:scale-95"><span>+</span> ${ssrInterpolate(_ctx.$t("btn_add_task"))}</button><button class="px-4 py-3 bg-rose-50 text-rose-500 rounded-2xl font-black hover:bg-rose-100 transition border border-rose-100 text-sm active:scale-95 shadow-sm"${ssrRenderAttr("title", _ctx.$t("btn_reset_tooltip"))}> 🔄 </button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Planner/PlannerHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
