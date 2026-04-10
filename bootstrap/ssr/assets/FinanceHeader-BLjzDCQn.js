import { ref, computed, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import { usePage } from "@inertiajs/vue3";
import dayjs from "dayjs";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "FinanceHeader",
  __ssrInlineRender: true,
  props: {
    currentMonth: String,
    currentMonthKey: String,
    onChangeDate: Function,
    onAddClick: Function,
    aiAudit: String,
    isExplorer: Boolean
  },
  emits: ["openPreview"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const page = usePage();
    const { activeCurrency, supportedCurrencies, appLocale } = useFinanceFormat();
    const isDateDropdownOpen = ref(false);
    const isCurrencyDropdownOpen = ref(false);
    const isExportDropdownOpen = ref(false);
    const isAiAuditLoading = ref(false);
    const months = [
      { name: "month_jan" },
      { name: "month_feb" },
      { name: "month_mar" },
      { name: "month_apr" },
      { name: "month_may" },
      { name: "month_jun" },
      { name: "month_jul" },
      { name: "month_aug" },
      { name: "month_sep" },
      { name: "month_oct" },
      { name: "month_nov" },
      { name: "month_dec" }
    ];
    const todayDisplay = computed(() => {
      const currentLocale = appLocale.value ? appLocale.value.split("-")[0] : page.props.locale || "id";
      return dayjs().locale(currentLocale).format("dddd, D MMMM YYYY");
    });
    const activeYear = computed(
      () => props.currentMonthKey ? dayjs(props.currentMonthKey).year() : dayjs().year()
    );
    const activeMonthNum = computed(
      () => props.currentMonthKey ? dayjs(props.currentMonthKey).month() : dayjs().month()
    );
    const shortMonthDisplay = computed(() => {
      if (!props.currentMonthKey) return "";
      const currentLocale = appLocale.value ? appLocale.value.split("-")[0] : page.props.locale || "id";
      return dayjs(props.currentMonthKey).locale(currentLocale).format("MMM YYYY");
    });
    const activeCurrencyDetails = computed(
      () => supportedCurrencies.find((c) => c.code === activeCurrency.value) || supportedCurrencies[0]
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="relative z-[60] px-4 py-4 transition-all bg-white dark:bg-slate-900/80 backdrop-blur-md border-b shadow-sm dark:shadow-none border-slate-200 dark:border-slate-800 sm:px-6 lg:px-8 md:sticky md:top-0 transition-colors duration-500" data-v-dc443d81><div class="flex flex-col items-center justify-between w-full gap-3 md:flex-row" data-v-dc443d81><div class="flex items-center justify-between w-full md:w-auto transition-colors duration-500" data-v-dc443d81><div class="flex items-center gap-3 md:gap-4" data-v-dc443d81><div class="flex items-center justify-center text-white shadow-lg dark:shadow-none w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl shadow-indigo-200 dark:shadow-indigo-900/20 shrink-0" data-v-dc443d81>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "finance",
        size: "24",
        "stroke-width": "2.5",
        class: "md:hidden"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "finance",
        size: "30",
        "stroke-width": "2",
        class: "hidden md:block"
      }, null, _parent));
      _push(`</div><div data-v-dc443d81><h2 class="text-xl md:text-2xl font-black leading-tight tracking-tight text-slate-800 dark:text-white transition-colors duration-500" data-v-dc443d81>${ssrInterpolate(_ctx.$t("finance_plan"))}</h2><p class="mt-0.5 text-sm font-medium capitalize text-slate-500 dark:text-slate-400 transition-colors duration-500" data-v-dc443d81>${ssrInterpolate(todayDisplay.value)}</p></div></div></div><div class="flex items-center w-full gap-2 md:w-auto mt-1 md:mt-0" data-v-dc443d81><div class="relative shrink-0 transition-colors duration-500" data-v-dc443d81><button class="${ssrRenderClass([{ "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20": isDateDropdownOpen.value }, "flex items-center justify-center w-[90px] md:w-auto md:px-4 h-11 transition border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl gap-1.5 hover:bg-white dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/40 shadow-sm dark:shadow-none group transition-colors duration-300"])}" data-v-dc443d81><span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 tracking-tight whitespace-nowrap transition-colors duration-300" data-v-dc443d81><span class="md:hidden" data-v-dc443d81>${ssrInterpolate(shortMonthDisplay.value)}</span><span class="hidden md:inline" data-v-dc443d81>${ssrInterpolate(__props.currentMonth)}</span></span>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "chevron-down",
        size: "12",
        "stroke-width": "3",
        class: ["text-slate-400 group-hover:text-indigo-500 transition-transform shrink-0", { "rotate-180": isDateDropdownOpen.value }]
      }, null, _parent));
      _push(`</button>`);
      if (isDateDropdownOpen.value) {
        _push(`<div class="absolute left-0 md:left-auto md:right-0 top-full mt-2 w-[260px] bg-white dark:bg-slate-800 rounded-[1.5rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-700 p-4 z-[100] origin-top-left md:origin-top-right transition-colors duration-500" data-v-dc443d81><div class="fixed inset-0 z-[-1]" data-v-dc443d81></div><div class="relative z-10 flex items-center justify-between px-1 mb-3" data-v-dc443d81><button class="p-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500" data-v-dc443d81>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "chevron-left",
          size: "14",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button><span class="font-black text-slate-800 dark:text-white transition-colors duration-500" data-v-dc443d81>${ssrInterpolate(activeYear.value)}</span><button class="p-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500" data-v-dc443d81>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "chevron-right",
          size: "14",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button></div><div class="relative z-10 grid grid-cols-3 gap-1.5" data-v-dc443d81><!--[-->`);
        ssrRenderList(months, (m, i) => {
          _push(`<button class="${ssrRenderClass([activeMonthNum.value === i ? "bg-indigo-600 text-white shadow-md dark:shadow-none" : "text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors", "text-[11px] font-bold py-2.5 rounded-lg transition-all tracking-tight"])}" data-v-dc443d81>${ssrInterpolate(_ctx.$t(m.name).slice(0, 3))}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative shrink-0 transition-colors duration-500" data-v-dc443d81><button class="flex items-center justify-center h-11 px-2.5 transition border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl gap-1 hover:bg-white dark:hover:bg-slate-700 shadow-sm dark:shadow-none group transition-colors duration-300" data-v-dc443d81><span class="text-base" data-v-dc443d81>${ssrInterpolate(activeCurrencyDetails.value.icon)}</span><span class="text-[9px] font-black text-slate-600 dark:text-slate-300" data-v-dc443d81>${ssrInterpolate(unref(activeCurrency))}</span></button>`);
      if (isCurrencyDropdownOpen.value) {
        _push(`<div class="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-700 p-1.5 z-[100] origin-top-right transition-colors duration-500" data-v-dc443d81><div class="fixed inset-0 z-[-1]" data-v-dc443d81></div><div class="relative z-10" data-v-dc443d81><!--[-->`);
        ssrRenderList(unref(supportedCurrencies), (c) => {
          _push(`<button class="${ssrRenderClass([unref(activeCurrency) === c.code ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-300", "w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors duration-300"])}" data-v-dc443d81><span class="text-lg" data-v-dc443d81>${ssrInterpolate(c.icon)}</span><span class="text-[11px] font-bold" data-v-dc443d81>${ssrInterpolate(c.code)}</span></button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative shrink-0 transition-colors duration-500" data-v-dc443d81><button class="${ssrRenderClass([{ "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20": isExportDropdownOpen.value }, "flex items-center justify-center h-11 px-3 transition border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl gap-2 hover:bg-white dark:hover:bg-slate-700 shadow-sm dark:shadow-none group transition-colors duration-300"])}" data-v-dc443d81>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "download",
        size: "14",
        "stroke-width": "3",
        class: "text-slate-400 group-hover:text-indigo-500"
      }, null, _parent));
      _push(`<span class="text-[10px] font-bold text-slate-600 dark:text-slate-300 tracking-tight hidden lg:inline" data-v-dc443d81>${ssrInterpolate(_ctx.$t("export"))}</span></button>`);
      if (isExportDropdownOpen.value) {
        _push(`<div class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-700 p-1.5 z-[100] origin-top-right transition-colors duration-500" data-v-dc443d81><div class="fixed inset-0 z-[-1]" data-v-dc443d81></div><div class="relative z-10 space-y-0.5" data-v-dc443d81><button class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all group/item" data-v-dc443d81><div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover/item:scale-110 transition-transform" data-v-dc443d81>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: __props.isExplorer ? "lock" : "excel",
          size: "14",
          "stroke-width": "2.5",
          class: __props.isExplorer ? "text-amber-500" : ""
        }, null, _parent));
        _push(`</div><div class="text-left" data-v-dc443d81><p class="text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2" data-v-dc443d81> Export Excel </p><p class="text-[9px] text-slate-400 font-medium" data-v-dc443d81>Buka di Excel / Sheets</p></div></button><button class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all group/item" data-v-dc443d81><div class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover/item:scale-110 transition-transform" data-v-dc443d81>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: __props.isExplorer ? "lock" : "pdf",
          size: "14",
          "stroke-width": "2.5",
          class: __props.isExplorer ? "text-amber-500" : ""
        }, null, _parent));
        _push(`</div><div class="text-left" data-v-dc443d81><p class="text-[11px] font-bold text-slate-700 dark:text-slate-200 text-left" data-v-dc443d81>Laporan Pajak</p><p class="text-[9px] text-slate-400 font-medium font-mono" data-v-dc443d81>Format Fiscal PDF</p></div></button><div class="h-px bg-slate-100 dark:bg-slate-700 mx-3 my-1" data-v-dc443d81></div><button${ssrIncludeBooleanAttr(isAiAuditLoading.value) ? " disabled" : ""} class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all group/item disabled:opacity-50"${ssrRenderAttr("title", __props.isExplorer ? "Quantum AI Subscription Required" : "")} data-v-dc443d81><div class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover/item:scale-110 transition-transform" data-v-dc443d81>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: __props.isExplorer ? "lock" : isAiAuditLoading.value ? "refresh" : "sparkles",
          size: "14",
          "stroke-width": "2.5",
          class: __props.isExplorer ? "text-amber-500" : ""
        }, null, _parent));
        _push(`</div><div class="text-left" data-v-dc443d81><p class="text-[11px] font-bold text-slate-700 dark:text-slate-200" data-v-dc443d81>AI Financial Audit</p><p class="text-[9px] text-slate-400 font-medium" data-v-dc443d81>Auto-review dari asisten AI</p></div></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="flex items-center justify-center flex-1 h-11 px-3 md:px-6 transition shadow-lg dark:shadow-none bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-indigo-100 dark:shadow-indigo-900/40 gap-2 active:scale-95 whitespace-nowrap min-w-0 transition-colors duration-500" data-v-dc443d81>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "16",
        "stroke-width": "3",
        class: "text-white"
      }, null, _parent));
      _push(`<span class="text-[11px] font-bold text-white tracking-tight truncate" data-v-dc443d81>${ssrInterpolate(_ctx.$t("btn_transaction"))}</span></button></div></div></div>`);
      if (__props.aiAudit) {
        _push(`<div class="px-4 mt-6 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-v-dc443d81><div class="relative overflow-hidden rounded-[2.5rem] bg-slate-900 dark:bg-indigo-600 p-8 text-white shadow-2xl shadow-indigo-100 dark:shadow-none animate-in fade-in slide-in-from-top-6 duration-700 border border-white/10" data-v-dc443d81><div class="absolute top-0 right-0 p-8 opacity-10" data-v-dc443d81>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "120"
        }, null, _parent));
        _push(`</div><div class="relative z-10" data-v-dc443d81><div class="flex items-center gap-3 mb-6" data-v-dc443d81><div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-400 dark:text-white" data-v-dc443d81>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "20"
        }, null, _parent));
        _push(`</div><div data-v-dc443d81><h3 class="text-xl font-black tracking-tight leading-none text-white" data-v-dc443d81>Automated AI Fiscal Audit</h3><p class="text-[10px] font-black text-indigo-100 opacity-60 mt-1.5 font-mono tracking-tight" data-v-dc443d81>Powered by Google Gemini 1.5 • Beta Experience</p></div><button class="ml-auto w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20" data-v-dc443d81>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "close",
          size: "14"
        }, null, _parent));
        _push(`</button></div><div class="max-w-none" data-v-dc443d81><div class="text-[13px] font-bold leading-relaxed opacity-90 text-slate-200 dark:text-white" data-v-dc443d81>${__props.aiAudit.replace(/\n/g, "<br>") ?? ""}</div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/FinanceHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FinanceHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dc443d81"]]);
export {
  FinanceHeader as default
};
