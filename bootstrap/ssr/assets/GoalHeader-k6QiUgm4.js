import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import dayjs from "dayjs";
import { _ as _sfc_main$1 } from "./OneForMindIcon-Dc5dmmrC.js";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-[60] px-4 py-4 transition-all bg-white dark:bg-slate-900/80 backdrop-blur-md border-b shadow-sm border-slate-200 dark:border-slate-800 sm:px-6 lg:px-8 md:sticky md:top-0" }, _attrs))}><div class="flex flex-col items-center justify-between w-full gap-3 md:flex-row"><div class="flex items-center justify-between w-full md:w-auto"><div class="flex items-center gap-3 md:gap-4"><div class="flex items-center justify-center text-white shadow-lg w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl shadow-indigo-200 dark:shadow-indigo-900/20 shrink-0">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "goal",
        size: "24",
        "stroke-width": "2.5",
        class: "md:hidden"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "goal",
        size: "30",
        "stroke-width": "2",
        class: "hidden md:block"
      }, null, _parent));
      _push(`</div><div><h2 class="text-xl md:text-2xl font-black leading-tight tracking-tight text-slate-800 dark:text-white transition-colors duration-500">${ssrInterpolate(_ctx.$t("goal_page_title", "Goal Tracker"))}</h2><p class="mt-0.5 text-sm font-medium capitalize text-slate-500 dark:text-slate-400 transition-colors duration-500">${ssrInterpolate(todayDisplay.value)}</p></div></div></div><div class="flex items-center w-full gap-2 md:w-auto mt-1 md:mt-0"><button class="flex items-center justify-center flex-1 h-11 px-3 md:px-6 transition shadow-lg bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-indigo-100 dark:shadow-indigo-900/40 gap-2 active:scale-95 whitespace-nowrap min-w-0">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "16",
        "stroke-width": "3",
        class: "text-white"
      }, null, _parent));
      _push(`<span class="text-[11px] font-black text-white tracking-tight uppercase truncate">${ssrInterpolate(_ctx.$t("goal_btn_add", "Set New Goal"))}</span></button></div></div></div>`);
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
