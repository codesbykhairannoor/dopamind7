import { computed, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { u as useFinanceFormat } from "./useFinanceFormat-DRbxJZsx.js";
import { usePage } from "@inertiajs/vue3";
import dayjs from "dayjs";
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
    const todayDisplay = computed(() => {
      const currentLocale = appLocale.value ? appLocale.value.split("-")[0] : page.props.locale || "id";
      return dayjs().locale(currentLocale).format("dddd, D MMMM YYYY");
    });
    const isDateDropdownOpen = ref(false);
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
    const activeYear = computed(
      () => props.currentMonthKey ? dayjs(props.currentMonthKey).year() : dayjs().year()
    );
    const activeMonthNum = computed(
      () => props.currentMonthKey ? dayjs(props.currentMonthKey).month() : dayjs().month()
    );
    const isCurrencyDropdownOpen = ref(false);
    const activeCurrencyDetails = computed(
      () => supportedCurrencies.find((c) => c.code === activeCurrency.value) || supportedCurrencies[0]
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 md:sticky top-0 z-40 transition-all" }, _attrs))} data-v-6dd38b8c><div class="w-full flex flex-col md:flex-row justify-between items-center gap-4" data-v-6dd38b8c><div class="flex items-center gap-4 w-full md:w-auto" data-v-6dd38b8c><div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg shadow-indigo-200 shrink-0" data-v-6dd38b8c> 💸 </div><div data-v-6dd38b8c><h2 class="text-xl font-black text-slate-800 tracking-tight leading-tight" data-v-6dd38b8c>${ssrInterpolate(_ctx.$t("finance_plan"))}</h2><p class="text-slate-500 font-medium text-xs capitalize mt-0.5" data-v-6dd38b8c>${ssrInterpolate(todayDisplay.value)}</p></div></div><div class="flex items-center gap-3 w-full md:w-auto" data-v-6dd38b8c><div class="relative" data-v-6dd38b8c><button class="h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2 hover:bg-white hover:border-indigo-300 transition shadow-sm group w-full md:w-auto justify-between md:justify-start" data-v-6dd38b8c><span class="text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap" data-v-6dd38b8c>${ssrInterpolate(__props.currentMonth)}</span><svg class="${ssrRenderClass([{ "rotate-180": isDateDropdownOpen.value }, "w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6dd38b8c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" data-v-6dd38b8c></path></svg></button>`);
      if (isDateDropdownOpen.value) {
        _push(`<div class="absolute right-0 top-full mt-2 w-64 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4 z-50 origin-top-right" data-v-6dd38b8c><div class="flex justify-between items-center mb-3 px-1" data-v-6dd38b8c><button class="p-1 hover:bg-slate-100 rounded-lg text-slate-400" data-v-6dd38b8c>❮</button><span class="font-black text-slate-800" data-v-6dd38b8c>${ssrInterpolate(activeYear.value)}</span><button class="p-1 hover:bg-slate-100 rounded-lg text-slate-400" data-v-6dd38b8c>❯</button></div><div class="grid grid-cols-3 gap-1.5" data-v-6dd38b8c><!--[-->`);
        ssrRenderList(months, (m, i) => {
          _push(`<button class="${ssrRenderClass([activeMonthNum.value === i ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:bg-indigo-50", "text-[10px] font-bold py-3 rounded-xl transition-all"])}" data-v-6dd38b8c>${ssrInterpolate(_ctx.$t(m.name).slice(0, 3))}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative" data-v-6dd38b8c><button class="h-12 px-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2 hover:bg-white transition shadow-sm" data-v-6dd38b8c><span class="text-lg" data-v-6dd38b8c>${ssrInterpolate(activeCurrencyDetails.value.icon)}</span><span class="text-[10px] font-black text-slate-600" data-v-6dd38b8c>${ssrInterpolate(unref(activeCurrency))}</span></button>`);
      if (isCurrencyDropdownOpen.value) {
        _push(`<div class="absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50 origin-top-right" data-v-6dd38b8c><!--[-->`);
        ssrRenderList(unref(supportedCurrencies), (c) => {
          _push(`<button class="${ssrRenderClass([unref(activeCurrency) === c.code ? "bg-indigo-50 text-indigo-600" : "text-slate-600", "w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl transition"])}" data-v-6dd38b8c><span data-v-6dd38b8c>${ssrInterpolate(c.icon)}</span><span class="text-[11px] font-bold" data-v-6dd38b8c>${ssrInterpolate(c.code)}</span></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="flex-1 md:flex-none h-12 px-6 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 text-sm active:scale-95 whitespace-nowrap" data-v-6dd38b8c><span class="text-xl" data-v-6dd38b8c>+</span><span class="uppercase tracking-tight hidden md:inline" data-v-6dd38b8c>${ssrInterpolate(_ctx.$t("btn_transaction"))}</span><span class="uppercase tracking-tight md:hidden" data-v-6dd38b8c>${ssrInterpolate(_ctx.$t("btn_add") || "ADD")}</span></button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/FinanceHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FinanceHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6dd38b8c"]]);
export {
  FinanceHeader as default
};
