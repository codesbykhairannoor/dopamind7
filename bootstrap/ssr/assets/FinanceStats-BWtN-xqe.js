import { ref, watch, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { u as useFinanceFormat } from "./useFinanceFormat-CRSb1fg_.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "FinanceStats",
  __ssrInlineRender: true,
  props: {
    stats: Object,
    onUpdateTarget: Function
  },
  setup(__props) {
    var _a;
    const props = __props;
    const { formatMoney, formatInputDisplay, cleanAmount } = useFinanceFormat();
    const isEditingSalary = ref(false);
    ref(null);
    const rawSalary = ref(((_a = props.stats) == null ? void 0 : _a.income_target) || 0);
    watch(() => {
      var _a2;
      return (_a2 = props.stats) == null ? void 0 : _a2.income_target;
    }, (val) => {
      if (!isEditingSalary.value) rawSalary.value = val || 0;
    });
    const displaySalary = computed({
      get: () => formatInputDisplay(rawSalary.value),
      set: (val) => {
        const cleaned = cleanAmount(val);
        rawSalary.value = cleaned === "" ? 0 : parseFloat(cleaned);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-stretch" }, _attrs))}><div class="lg:col-span-7 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 dark:from-indigo-700 dark:via-indigo-600 dark:to-violet-700 p-6 md:p-8 text-white shadow-2xl dark:shadow-none shadow-indigo-200/50 dark:shadow-indigo-900/20 flex flex-col justify-center min-h-[200px] transition-all duration-500"><div class="relative z-10 flex flex-col h-full justify-between"><div class="flex justify-between items-start"><div><p class="font-bold text-[10px] uppercase tracking-widest text-indigo-100/80 mb-2">${ssrInterpolate(_ctx.$t("available_balance", "Available Balance"))}</p><h3 class="text-4xl md:text-5xl font-black tracking-tight leading-none text-white drop-shadow-sm">${ssrInterpolate(unref(formatMoney)(((_a2 = __props.stats) == null ? void 0 : _a2.balance) || 0))}</h3></div><div class="bg-white/10 dark:bg-black/20 p-2 rounded-xl backdrop-blur-md border border-white/10"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg></div></div><div class="mt-6 pt-6 border-t border-white/10 flex items-center gap-3"><div class="flex -space-x-2"><div class="w-6 h-6 rounded-full bg-indigo-300 border-2 border-indigo-600"></div><div class="w-6 h-6 rounded-full bg-violet-300 border-2 border-indigo-600"></div></div><span class="text-[10px] font-medium text-indigo-100">${ssrInterpolate(_ctx.$t("monthly_finance_desc", "Your financial performance this month."))}</span></div></div><div class="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div><div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl"></div></div><div class="lg:col-span-5 grid grid-rows-[auto_1fr] gap-4"><div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] px-6 py-5 shadow-sm dark:shadow-none hover:shadow-md transition-all relative overflow-hidden group flex items-center justify-between h-fit transition-colors duration-500"><div class="flex-1 min-w-0"><p class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1.5 flex items-center gap-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("base_capital", "Base Capital"))} `);
      if (!isEditingSalary.value) {
        _push(`<span class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-500 transition-colors"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p>`);
      if (!isEditingSalary.value) {
        _push(`<div class="flex items-center justify-between"><h4 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white truncate pr-2 transition-colors duration-500">${ssrInterpolate(unref(formatMoney)(((_b = __props.stats) == null ? void 0 : _b.income_target) || 0))}</h4><button class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-600 hover:bg-indigo-600 hover:text-white transition-all transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 shadow-sm dark:shadow-none transition-all duration-300"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button></div>`);
      } else {
        _push(`<div class="flex items-center gap-2 w-full animate-in zoom-in-95 duration-200 mt-1"><input${ssrRenderAttr("value", displaySalary.value)} type="text" class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-1.5 text-xl font-black text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"></div>`);
      }
      _push(`</div></div><div class="grid grid-cols-2 gap-4 h-full min-h-[160px]"><div class="bg-emerald-50/40 dark:bg-emerald-500/5 border border-emerald-100/60 dark:border-emerald-500/20 rounded-[2rem] p-5 flex flex-col justify-center relative overflow-hidden group hover:bg-emerald-50 dark:hover:bg-emerald-500/10 shadow-sm dark:shadow-none transition-colors duration-500"><div class="flex items-center justify-between mb-1"><p class="text-[9px] font-bold text-emerald-600/60 dark:text-emerald-400/60 uppercase tracking-widest transition-colors duration-500">${ssrInterpolate(_ctx.$t("income", "Income"))}</p><div class="w-5 h-5 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center text-[10px] text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition duration-300">↓</div></div><h4 class="text-lg md:text-xl font-black text-emerald-700 dark:text-emerald-400 truncate transition-colors duration-500">${ssrInterpolate(unref(formatMoney)(((_c = __props.stats) == null ? void 0 : _c.total_income) || 0))}</h4></div><div class="bg-rose-50/40 dark:bg-rose-500/5 border border-rose-100/60 dark:border-rose-500/20 rounded-[2rem] p-5 flex flex-col justify-center relative overflow-hidden group hover:bg-rose-50 dark:hover:bg-rose-500/10 shadow-sm dark:shadow-none transition-colors duration-500"><div class="flex items-center justify-between mb-1"><p class="text-[9px] font-bold text-rose-600/60 dark:text-rose-400/60 uppercase tracking-widest transition-colors duration-500">${ssrInterpolate(_ctx.$t("expense", "Expense"))}</p><div class="w-5 h-5 bg-rose-100 dark:bg-rose-500/20 rounded-full flex items-center justify-center text-[10px] text-rose-600 dark:text-rose-400 group-hover:scale-110 transition duration-300">↑</div></div><h4 class="text-lg md:text-xl font-black text-rose-700 dark:text-rose-400 truncate transition-colors duration-500">${ssrInterpolate(unref(formatMoney)(((_d = __props.stats) == null ? void 0 : _d.total_expense) || 0))}</h4></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/FinanceStats.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
