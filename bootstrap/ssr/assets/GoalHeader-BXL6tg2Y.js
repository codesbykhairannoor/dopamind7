import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import dayjs from "dayjs";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BiMr3Mnd.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
const _sfc_main = {
  __name: "GoalHeader",
  __ssrInlineRender: true,
  props: {
    onAddClick: Function
  },
  setup(__props) {
    const page = usePage();
    const todayDisplay = computed(() => {
      const currentLocale = page.props.locale || "id";
      return dayjs().locale(currentLocale).format("dddd, D MMMM YYYY");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-[60] transition-all bg-white dark:bg-slate-900 border-b shadow-sm border-slate-100 dark:border-slate-800 transition-colors duration-500" }, _attrs))}><div class="mx-auto flex w-full min-w-0 flex-col items-stretch justify-between gap-3 px-4 md:px-6 lg:px-8 py-4 md:flex-row md:items-center lg:max-w-[96%]"><div class="flex items-center gap-2 w-full min-w-0 md:w-auto md:max-w-[min(100%,28rem)]"><p class="shrink-0 text-[10px] font-black capitalize tracking-wide text-slate-400 dark:text-slate-600 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">${ssrInterpolate(_ctx.$t("goal_page_title", "Goal Tracker"))}</p><div class="flex min-w-0 flex-1 items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50 overflow-hidden">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "calendar",
        size: "14",
        class: "text-indigo-500 shrink-0"
      }, null, _parent));
      _push(`<span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 capitalize truncate">${ssrInterpolate(todayDisplay.value)}</span></div></div><div class="flex items-center w-full min-w-0 gap-2 md:w-auto md:justify-end mt-1 md:mt-0"><button class="flex items-center justify-center flex-1 h-11 px-3 md:px-6 transition shadow-lg bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-indigo-100 dark:shadow-indigo-900/40 gap-2 active:scale-95 whitespace-nowrap min-w-0">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "16",
        "stroke-width": "3",
        class: "text-white"
      }, null, _parent));
      _push(`<span class="text-[11px] font-black text-white tracking-tight truncate">${ssrInterpolate(_ctx.$t("goal_btn_add", "Set New Goal"))}</span></button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/GoalHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
