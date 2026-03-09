import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { u as useFinanceFormat } from "./useFinanceFormat-CRSb1fg_.js";
import dayjs from "dayjs";
import { _ as _sfc_main$1 } from "./OneForMindIcon-Dwf7AvKJ.js";
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
    onAddClick: Function
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const { activeCurrency, supportedCurrencies, appLocale } = useFinanceFormat();
    const isDateDropdownOpen = ref(false);
    const isCurrencyDropdownOpen = ref(false);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-[60] px-4 py-4 transition-all bg-white border-b shadow-sm border-slate-200 sm:px-6 lg:px-8 md:sticky md:top-0" }, _attrs))} data-v-25a8b3f6><div class="flex flex-col items-center justify-between w-full gap-3 md:flex-row" data-v-25a8b3f6><div class="flex items-center justify-between w-full md:w-auto" data-v-25a8b3f6><div class="flex items-center gap-3 md:gap-4" data-v-25a8b3f6><div class="flex items-center justify-center text-white shadow-lg w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl shadow-indigo-200 shrink-0" data-v-25a8b3f6>`);
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
      _push(`</div><div data-v-25a8b3f6><h2 class="text-xl md:text-2xl font-black leading-tight tracking-tight text-slate-800" data-v-25a8b3f6>${ssrInterpolate(_ctx.$t("finance_plan"))}</h2><p class="mt-0.5 text-sm font-medium capitalize text-slate-500" data-v-25a8b3f6>${ssrInterpolate(todayDisplay.value)}</p></div></div></div><div class="flex items-center w-full gap-2 md:w-auto mt-1 md:mt-0" data-v-25a8b3f6><div class="relative shrink-0" data-v-25a8b3f6><button class="${ssrRenderClass([{ "bg-indigo-50 border-indigo-200": isDateDropdownOpen.value }, "flex items-center justify-center w-[90px] md:w-auto md:px-4 h-11 transition border bg-slate-50 border-slate-200 rounded-xl gap-1.5 hover:bg-white hover:border-indigo-300 shadow-sm group"])}" data-v-25a8b3f6><span class="text-[11px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap" data-v-25a8b3f6><span class="md:hidden" data-v-25a8b3f6>${ssrInterpolate(shortMonthDisplay.value)}</span><span class="hidden md:inline" data-v-25a8b3f6>${ssrInterpolate(__props.currentMonth)}</span></span>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "chevron-down",
        size: "12",
        "stroke-width": "3",
        class: ["text-slate-400 group-hover:text-indigo-500 transition-transform shrink-0", { "rotate-180": isDateDropdownOpen.value }]
      }, null, _parent));
      _push(`</button>`);
      if (isDateDropdownOpen.value) {
        _push(`<div class="absolute left-0 md:left-auto md:right-0 top-full mt-2 w-[260px] bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 p-4 z-[100] origin-top-left md:origin-top-right" data-v-25a8b3f6><div class="fixed inset-0 z-[-1]" data-v-25a8b3f6></div><div class="relative z-10 flex items-center justify-between px-1 mb-3" data-v-25a8b3f6><button class="p-1 px-2 rounded-lg hover:bg-slate-100 text-slate-400" data-v-25a8b3f6>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "chevron-left",
          size: "14",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button><span class="font-black text-slate-800" data-v-25a8b3f6>${ssrInterpolate(activeYear.value)}</span><button class="p-1 px-2 rounded-lg hover:bg-slate-100 text-slate-400" data-v-25a8b3f6>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "chevron-right",
          size: "14",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button></div><div class="relative z-10 grid grid-cols-3 gap-1.5" data-v-25a8b3f6><!--[-->`);
        ssrRenderList(months, (m, i) => {
          _push(`<button class="${ssrRenderClass([activeMonthNum.value === i ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:bg-indigo-50", "text-[11px] font-bold py-2.5 rounded-lg transition-all uppercase tracking-wider"])}" data-v-25a8b3f6>${ssrInterpolate(_ctx.$t(m.name).slice(0, 3))}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative shrink-0" data-v-25a8b3f6><button class="flex items-center justify-center h-11 px-2.5 transition border bg-slate-50 border-slate-200 rounded-xl gap-1 hover:bg-white shadow-sm" data-v-25a8b3f6><span class="text-base" data-v-25a8b3f6>${ssrInterpolate(activeCurrencyDetails.value.icon)}</span><span class="text-[9px] font-black text-slate-600" data-v-25a8b3f6>${ssrInterpolate(unref(activeCurrency))}</span></button>`);
      if (isCurrencyDropdownOpen.value) {
        _push(`<div class="absolute right-0 top-full mt-2 w-36 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-[100] origin-top-right" data-v-25a8b3f6><div class="fixed inset-0 z-[-1]" data-v-25a8b3f6></div><div class="relative z-10" data-v-25a8b3f6><!--[-->`);
        ssrRenderList(unref(supportedCurrencies), (c) => {
          _push(`<button class="${ssrRenderClass([unref(activeCurrency) === c.code ? "bg-indigo-50 text-indigo-600" : "text-slate-600", "w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl transition"])}" data-v-25a8b3f6><span class="text-lg" data-v-25a8b3f6>${ssrInterpolate(c.icon)}</span><span class="text-[11px] font-bold" data-v-25a8b3f6>${ssrInterpolate(c.code)}</span></button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="flex items-center justify-center flex-1 h-11 px-3 md:px-6 transition shadow-lg bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-indigo-100 gap-2 active:scale-95 whitespace-nowrap min-w-0" data-v-25a8b3f6>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "16",
        "stroke-width": "3",
        class: "text-white"
      }, null, _parent));
      _push(`<span class="text-[11px] font-black text-white tracking-tight uppercase truncate" data-v-25a8b3f6>${ssrInterpolate(_ctx.$t("btn_transaction"))}</span></button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/FinanceHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FinanceHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-25a8b3f6"]]);
export {
  FinanceHeader as default
};
