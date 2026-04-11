import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import dayjs from "dayjs";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BvGLCgx4.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { usePage } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CalendarHeader",
  __ssrInlineRender: true,
  props: {
    currentMonth: String
  },
  emits: ["change-month", "add-event"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const page = usePage();
    const isOpen = ref(false);
    const monthsList = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];
    const displayMonth = computed(() => {
      const currentLocale = page.props.locale || "id";
      return dayjs(props.currentMonth).locale(currentLocale).format("MMMM YYYY");
    });
    const activeYear = computed(() => dayjs(props.currentMonth).year());
    const activeMonthNum = computed(() => dayjs(props.currentMonth).month());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-[60] transition-all bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b shadow-sm dark:shadow-none border-slate-100 dark:border-slate-800 md:sticky md:top-16 transition-colors duration-500" }, _attrs))} data-v-7d85b430><div class="max-w-7xl px-4 py-3 mx-auto sm:px-6 lg:px-8" data-v-7d85b430><div class="flex flex-col items-center justify-between w-full gap-4 md:flex-row" data-v-7d85b430><div class="flex items-center gap-2 w-full md:w-auto" data-v-7d85b430><p class="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4" data-v-7d85b430>${ssrInterpolate(_ctx.$t("calendar_title", "Master Calendar"))}</p><div class="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50" data-v-7d85b430>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "calendar",
        size: "14",
        class: "text-indigo-500"
      }, null, _parent));
      _push(`<span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 capitalize" data-v-7d85b430>${ssrInterpolate(displayMonth.value)}</span></div></div><div class="flex items-center w-full gap-3 md:w-auto" data-v-7d85b430><div class="relative flex-1 md:flex-none" data-v-7d85b430><button class="w-full flex items-center justify-between gap-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-4 pr-3 py-3 rounded-2xl font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-none transition-all active:scale-95 transition-colors duration-500" data-v-7d85b430><div class="flex flex-col items-start leading-none gap-1" data-v-7d85b430><span class="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest transition-colors duration-500 leading-none" data-v-7d85b430>${ssrInterpolate(_ctx.$t("label_period", "Period"))}</span><span class="text-xs font-black whitespace-nowrap leading-none mt-0.5" data-v-7d85b430>${ssrInterpolate(displayMonth.value)}</span></div><div class="p-1.5 bg-white dark:bg-slate-800 border shadow-sm dark:shadow-none rounded-xl border-slate-100 dark:border-slate-700 flex items-center justify-center transition-colors duration-500" data-v-7d85b430>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "chevron-down",
        size: "14",
        "stroke-width": "3",
        class: ["text-indigo-500 transition-transform duration-300", { "rotate-180": isOpen.value }]
      }, null, _parent));
      _push(`</div></button>`);
      if (isOpen.value) {
        _push(`<div class="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 z-[60] origin-top-right transition-colors duration-500" data-v-7d85b430><div class="fixed inset-0 z-[-1]" data-v-7d85b430></div><div class="relative z-10" data-v-7d85b430><div class="flex items-center justify-between px-3 mb-6 bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800 rounded-[1.5rem] py-2 transition-colors duration-500" data-v-7d85b430><button class="p-2.5 transition rounded-xl hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm dark:shadow-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800" data-v-7d85b430>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "chevron-left",
          size: "16",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button><span class="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 transition-colors duration-500" data-v-7d85b430>${ssrInterpolate(activeYear.value)}</span><button class="p-2.5 transition rounded-xl hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm dark:shadow-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800" data-v-7d85b430>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "chevron-right",
          size: "16",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button></div><div class="grid grid-cols-3 gap-3" data-v-7d85b430><!--[-->`);
        ssrRenderList(monthsList, (month, index) => {
          _push(`<button class="${ssrRenderClass([
            "py-4 rounded-2xl text-[11px] font-black transition-all transition-colors duration-500",
            activeMonthNum.value === index ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none scale-105" : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900"
          ])}" data-v-7d85b430>${ssrInterpolate(month.slice(0, 3))}</button>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="h-14 px-6 flex items-center gap-3 bg-indigo-600 text-white rounded-[1.25rem] font-black hover:bg-indigo-700 hover:-translate-y-1 active:translate-y-0 shadow-xl shadow-indigo-200 dark:shadow-none transition-all duration-500 shrink-0" data-v-7d85b430><div class="bg-white rounded-xl p-1 flex items-center justify-center shadow-lg dark:shadow-none" data-v-7d85b430>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "18",
        "stroke-width": "4",
        class: "text-indigo-600"
      }, null, _parent));
      _push(`</div><span class="hidden md:inline text-xs tracking-widest font-black" data-v-7d85b430>${ssrInterpolate(_ctx.$t("btn_add_event", "Add event"))}</span></button></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Calendar/CalendarHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CalendarHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7d85b430"]]);
export {
  CalendarHeader as default
};
