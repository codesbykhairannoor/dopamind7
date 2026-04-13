import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BiMr3Mnd.js";
import _sfc_main$2 from "./PlannerDatePicker-C0E2B7JI.js";
import "dayjs";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "PlannerHeader",
  __ssrInlineRender: true,
  props: {
    currentDate: String,
    formattedDate: String,
    tasks: [Array, Object],
    openModal: Function,
    resetBoard: Function,
    stats: Object
  },
  emits: ["change-date"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const showDatePicker = ref(false);
    const closeDatePicker = () => {
      showDatePicker.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-[60] transition-all bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-500" }, _attrs))}><div class="w-full min-w-0 px-4 sm:px-6 lg:px-8 py-4"><div class="w-full min-w-0 flex flex-col md:flex-row md:items-center md:justify-between items-stretch gap-4"><div class="flex items-center gap-2 w-full min-w-0 md:w-auto md:max-w-[min(100%,24rem)]"><p class="text-[10px] font-black capitalize tracking-wide text-slate-400 dark:text-slate-600 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">${ssrInterpolate(_ctx.$t("header_title", "Daily Planner"))}</p><div><div class="flex items-center relative"><div class="relative"><button class="${ssrRenderClass([{ "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400": showDatePicker.value }, "max-w-full min-w-0 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs capitalize transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50"])}">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "calendar",
        size: "14",
        class: "text-indigo-500 shrink-0"
      }, null, _parent));
      _push(`<span class="truncate text-left">${ssrInterpolate(__props.formattedDate)}</span>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "chevron-down",
        size: "10",
        "stroke-width": "3",
        class: ["text-slate-400 dark:text-slate-600 transition-transform duration-300 shrink-0", { "rotate-180": showDatePicker.value }]
      }, null, _parent));
      _push(`</button>`);
      if (showDatePicker.value) {
        _push(`<div class="absolute left-0 top-full mt-3 z-[100] origin-top-left"><div class="fixed inset-0 z-[-1]"></div>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          show: showDatePicker.value,
          modelValue: __props.currentDate,
          tasks: __props.tasks,
          "onUpdate:modelValue": (val) => emit("change-date", val),
          onClose: closeDatePicker
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="flex-1 w-full min-w-0 md:px-8 lg:px-12 max-w-4xl order-3 md:order-none mt-2 md:mt-0"><div class="flex justify-between text-[11px] font-black text-slate-400 dark:text-slate-500 mb-1.5 transition-colors duration-500"><span>${ssrInterpolate(_ctx.$t("header_progress", "Progress"))}</span><span class="text-indigo-600 dark:text-indigo-400">${ssrInterpolate(__props.stats.percent)}%</span></div><div class="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-50 dark:border-slate-700 shadow-inner transition-colors duration-500"><div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out" style="${ssrRenderStyle({ width: `${__props.stats.percent}%` })}"></div></div><div class="flex gap-4 mt-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 transition-colors duration-500"><span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> ${ssrInterpolate(__props.stats.completed)} ${ssrInterpolate(_ctx.$t("header_completed", "Selesai"))}</span><span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-400"></span> ${ssrInterpolate(__props.stats.total - __props.stats.completed)} ${ssrInterpolate(_ctx.$t("header_pending", "Tertunda"))}</span></div></div><div class="flex gap-3 w-full md:w-auto order-2 md:order-none shrink-0"><button class="flex-1 md:flex-none px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 text-xs active:scale-95">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "16",
        "stroke-width": "3"
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.$t("btn_add_task", "Tambah"))}</button><button class="w-12 h-[46px] md:h-auto flex items-center justify-center bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 rounded-2xl font-black hover:bg-rose-100 dark:hover:bg-rose-500/20 transition border border-rose-100 dark:border-rose-500/20 active:scale-95 shadow-sm dark:shadow-none shrink-0"${ssrRenderAttr("title", _ctx.$t("btn_reset_tooltip", "Reset Board"))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "refresh",
        size: "18",
        "stroke-width": "2.5"
      }, null, _parent));
      _push(`</button></div></div></div></div>`);
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
