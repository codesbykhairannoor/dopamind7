import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { u as useFinanceFormat } from "./useFinanceFormat-CRSb1fg_.js";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
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
    const activeCurrencyDetails = computed(
      () => supportedCurrencies.find((c) => c.code === activeCurrency.value) || supportedCurrencies[0]
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50 px-4 py-4 transition-all bg-white border-b shadow-sm border-slate-200 sm:px-6 lg:px-8" }, _attrs))}><div class="flex flex-col items-center justify-between w-full gap-4 md:flex-row"><div class="flex items-center w-full gap-4 md:w-auto"><div class="flex items-center justify-center text-2xl text-white shadow-lg w-12 h-12 bg-indigo-600 rounded-xl shadow-indigo-200 shrink-0"> 💸 </div><div><h2 class="text-xl font-black leading-tight tracking-tight text-slate-800">${ssrInterpolate(_ctx.$t("finance_plan"))}</h2><p class="mt-0.5 text-xs font-medium capitalize text-slate-500">${ssrInterpolate(todayDisplay.value)}</p></div></div><div class="flex items-center w-full gap-3 md:w-auto"><div class="relative flex-1 md:flex-none"><button class="flex items-center justify-between w-full h-12 px-4 transition border bg-slate-50 border-slate-200 rounded-2xl gap-2 hover:bg-white hover:border-indigo-300 shadow-sm group md:justify-start"><span class="text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">${ssrInterpolate(__props.currentMonth)}</span><svg class="${ssrRenderClass([{ "rotate-180": isDateDropdownOpen.value }, "w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg></button>`);
      if (isDateDropdownOpen.value) {
        _push(`<div class="absolute left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-64 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4 z-[999] origin-top md:origin-top-right"><div class="fixed inset-0 z-[-1]"></div><div class="relative z-10 flex items-center justify-between px-1 mb-3"><button class="p-1 rounded-lg hover:bg-slate-100 text-slate-400">❮</button><span class="font-black text-slate-800">${ssrInterpolate(activeYear.value)}</span><button class="p-1 rounded-lg hover:bg-slate-100 text-slate-400">❯</button></div><div class="relative z-10 grid grid-cols-3 gap-1.5"><!--[-->`);
        ssrRenderList(months, (m, i) => {
          _push(`<button class="${ssrRenderClass([activeMonthNum.value === i ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:bg-indigo-50", "text-[10px] font-bold py-3 rounded-xl transition-all"])}">${ssrInterpolate(_ctx.$t(m.name).slice(0, 3))}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative shrink-0"><button class="flex items-center h-12 px-3 transition border bg-slate-50 border-slate-200 rounded-2xl gap-2 hover:bg-white shadow-sm"><span class="text-lg">${ssrInterpolate(activeCurrencyDetails.value.icon)}</span><span class="text-[10px] font-black text-slate-600">${ssrInterpolate(unref(activeCurrency))}</span></button>`);
      if (isCurrencyDropdownOpen.value) {
        _push(`<div class="absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-[999] origin-top-right"><div class="fixed inset-0 z-[-1]"></div><div class="relative z-10"><!--[-->`);
        ssrRenderList(unref(supportedCurrencies), (c) => {
          _push(`<button class="${ssrRenderClass([unref(activeCurrency) === c.code ? "bg-indigo-50 text-indigo-600" : "text-slate-600", "w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl transition"])}"><span class="text-xl">${ssrInterpolate(c.icon)}</span><span class="text-[11px] font-bold">${ssrInterpolate(c.code)}</span></button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="flex items-center justify-center flex-1 h-12 px-6 text-sm font-black text-white transition shadow-lg md:flex-none bg-indigo-600 rounded-2xl hover:bg-indigo-700 shadow-indigo-100 gap-2 active:scale-95 whitespace-nowrap"><span class="text-xl">+</span><span class="tracking-tight md:inline">${ssrInterpolate(_ctx.$t("btn_transaction"))}</span></button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/FinanceHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
