import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import dayjs from "dayjs";
import { _ as _sfc_main$1 } from "./OneForMindIcon-CpE9XZu-.js";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-[60] transition-all bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b shadow-sm dark:shadow-none border-slate-200 dark:border-slate-800 md:sticky md:top-0 transition-colors duration-500" }, _attrs))} data-v-ea5623b8><div class="max-w-full px-4 py-4 mx-auto sm:px-6 lg:px-8" data-v-ea5623b8><div class="flex flex-col items-center justify-between w-full gap-4 md:flex-row" data-v-ea5623b8><div class="flex items-center w-full gap-4 md:w-auto" data-v-ea5623b8><div class="flex items-center justify-center text-white shadow-lg w-12 h-12 bg-indigo-600 rounded-xl shadow-indigo-200 dark:shadow-none shrink-0 transition-shadow duration-500" data-v-ea5623b8>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "calendar",
        size: "28"
      }, null, _parent));
      _push(`</div><div data-v-ea5623b8><h2 class="text-xl md:text-2xl font-black leading-tight tracking-tight text-slate-800 dark:text-white transition-colors duration-500" data-v-ea5623b8>${ssrInterpolate(_ctx.$t("calendar_title", "Master Calendar"))}</h2><p class="mt-0.5 text-sm font-medium capitalize text-slate-500 dark:text-slate-400 transition-colors duration-500" data-v-ea5623b8>${ssrInterpolate(displayMonth.value)}</p></div></div><div class="flex items-center w-full gap-3 md:w-auto" data-v-ea5623b8><div class="relative flex-1 md:flex-none" data-v-ea5623b8><button class="w-full flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-4 pr-3 py-2.5 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-sm dark:hover:shadow-none transition-all active:scale-95 transition-colors duration-500" data-v-ea5623b8><div class="flex flex-col items-start leading-none" data-v-ea5623b8><span class="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-tighter mb-0.5 transition-colors duration-500" data-v-ea5623b8>${ssrInterpolate(_ctx.$t("label_period", "Periode"))}</span><span class="text-xs uppercase tracking-wide whitespace-nowrap" data-v-ea5623b8>${ssrInterpolate(displayMonth.value)}</span></div><div class="p-1 bg-white dark:bg-slate-800 border shadow-sm dark:shadow-none rounded-lg border-slate-100 dark:border-slate-700 flex items-center justify-center transition-colors duration-500" data-v-ea5623b8>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "chevron-down",
        size: "12",
        "stroke-width": "3",
        class: ["text-indigo-500 transition-transform duration-300", { "rotate-180": isOpen.value }]
      }, null, _parent));
      _push(`</div></button>`);
      if (isOpen.value) {
        _push(`<div class="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-4 z-[60] origin-top-right transition-colors duration-500" data-v-ea5623b8><div class="fixed inset-0 z-[-1]" data-v-ea5623b8></div><div class="relative z-10" data-v-ea5623b8><div class="flex items-center justify-between px-2 mb-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800 rounded-2xl py-1 transition-colors duration-500" data-v-ea5623b8><button class="p-2 transition rounded-xl hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm dark:shadow-none" data-v-ea5623b8>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "chevron-left",
          size: "16",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button><span class="text-lg font-black tracking-tighter text-slate-800 dark:text-slate-100 transition-colors duration-500" data-v-ea5623b8>${ssrInterpolate(activeYear.value)}</span><button class="p-2 transition rounded-xl hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm dark:shadow-none" data-v-ea5623b8>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "chevron-right",
          size: "16",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button></div><div class="grid grid-cols-3 gap-2" data-v-ea5623b8><!--[-->`);
        ssrRenderList(monthsList, (month, index) => {
          _push(`<button class="${ssrRenderClass([
            "py-3 rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest",
            activeMonthNum.value === index ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none" : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          ])}" data-v-ea5623b8>${ssrInterpolate(month.slice(0, 3))}</button>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="h-[46px] px-5 flex items-center gap-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-200 dark:shadow-none transition-all duration-300 shrink-0" data-v-ea5623b8><div class="bg-white/20 rounded-lg p-0.5 flex items-center justify-center" data-v-ea5623b8>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "16",
        "stroke-width": "3"
      }, null, _parent));
      _push(`</div><span class="hidden md:inline uppercase text-xs tracking-widest" data-v-ea5623b8>${ssrInterpolate(_ctx.$t("btn_add_event", "Acara"))}</span></button></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Calendar/CalendarHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CalendarHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ea5623b8"]]);
export {
  CalendarHeader as default
};
