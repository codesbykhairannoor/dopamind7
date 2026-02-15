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
    const props = __props;
    const { formatMoney, formatInputDisplay, cleanAmount } = useFinanceFormat();
    const isEditingSalary = ref(false);
    ref(null);
    const rawSalary = ref(props.stats.income_target || 0);
    watch(() => props.stats.income_target, (val) => {
      if (!isEditingSalary.value) {
        rawSalary.value = val || 0;
      }
    });
    const displaySalary = computed({
      get: () => formatInputDisplay(rawSalary.value),
      set: (val) => {
        const cleaned = cleanAmount(val);
        rawSalary.value = cleaned === "" ? 0 : parseFloat(cleaned);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "animate-in fade-in slide-in-from-bottom-4 duration-700" }, _attrs))}><div class="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-stretch"><div class="lg:col-span-7 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 p-6 md:p-8 text-white shadow-2xl shadow-indigo-200/50 flex flex-col justify-center min-h-[200px]"><div class="relative z-10 flex flex-col h-full justify-between"><div class="flex justify-between items-start"><div><p class="font-bold text-[10px] uppercase tracking-widest text-indigo-100/80 mb-2">${ssrInterpolate(_ctx.$t("available_balance"))}</p><h3 class="text-4xl md:text-5xl font-black tracking-tight leading-none">${ssrInterpolate(unref(formatMoney)(__props.stats.balance))}</h3></div><div class="bg-white/10 p-2 rounded-xl backdrop-blur-md"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg></div></div><div class="mt-6 pt-6 border-t border-white/10 flex items-center gap-3"><div class="flex -space-x-2"><div class="w-6 h-6 rounded-full bg-indigo-300 border-2 border-indigo-600"></div><div class="w-6 h-6 rounded-full bg-violet-300 border-2 border-indigo-600"></div></div><span class="text-[10px] font-medium text-indigo-100">${ssrInterpolate(_ctx.$t("monthly_finance_desc"))}</span></div></div><div class="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div><div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl"></div></div><div class="lg:col-span-5 grid grid-rows-2 gap-4"><div class="bg-white border border-slate-100 rounded-[2rem] px-6 py-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group flex items-center justify-between"><div class="flex-1 min-w-0"><p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">${ssrInterpolate(_ctx.$t("base_capital"))} `);
      if (!isEditingSalary.value) {
        _push(`<span class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p>`);
      if (!isEditingSalary.value) {
        _push(`<div class="flex items-center justify-between"><h4 class="text-xl md:text-2xl font-black text-slate-800 truncate pr-2">${ssrInterpolate(unref(formatMoney)(__props.stats.income_target))}</h4><button class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button></div>`);
      } else {
        _push(`<div class="flex items-center gap-2 w-full animate-in zoom-in-95 duration-200"><input${ssrRenderAttr("value", displaySalary.value)} type="text" class="w-full bg-slate-50 border-none rounded-xl px-3 py-1 text-xl font-black text-slate-800 focus:ring-2 focus:ring-indigo-500 transition-all"><button class="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></button><button class="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      }
      _push(`</div></div><div class="grid grid-cols-2 gap-4"><div class="bg-emerald-50/40 border border-emerald-100/60 rounded-[2rem] p-5 flex flex-col justify-center relative overflow-hidden group hover:bg-emerald-50 transition-colors"><div class="flex items-center justify-between mb-1"><p class="text-[9px] font-bold text-emerald-600/60 uppercase tracking-widest">${ssrInterpolate(_ctx.$t("income"))}</p><div class="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-[10px] text-emerald-600 group-hover:scale-110 transition">↓</div></div><h4 class="text-lg md:text-xl font-black text-emerald-700 truncate">${ssrInterpolate(unref(formatMoney)(__props.stats.total_income))}</h4></div><div class="bg-rose-50/40 border border-rose-100/60 rounded-[2rem] p-5 flex flex-col justify-center relative overflow-hidden group hover:bg-rose-50 transition-colors"><div class="flex items-center justify-between mb-1"><p class="text-[9px] font-bold text-rose-600/60 uppercase tracking-widest">${ssrInterpolate(_ctx.$t("expense"))}</p><div class="w-5 h-5 bg-rose-100 rounded-full flex items-center justify-center text-[10px] text-rose-600 group-hover:scale-110 transition">↑</div></div><h4 class="text-lg md:text-xl font-black text-rose-700 truncate">${ssrInterpolate(unref(formatMoney)(__props.stats.total_expense))}</h4></div></div></div></div></div>`);
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
