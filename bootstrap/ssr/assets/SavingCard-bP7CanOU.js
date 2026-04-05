import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import { Edit3, Trash2, ArrowDownCircle, ArrowUpCircle } from "lucide-vue-next";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "SavingCard",
  __ssrInlineRender: true,
  props: {
    saving: Object,
    onDeposit: Function,
    onWithdraw: Function,
    onEdit: Function,
    onDelete: Function
  },
  setup(__props) {
    const props = __props;
    const { formatMoney } = useFinanceFormat();
    const progress = computed(() => {
      if (!props.saving.target_amount || props.saving.target_amount <= 0) return 0;
      return Math.min(100, Math.round(props.saving.current_amount / props.saving.target_amount * 100));
    });
    const remaining = computed(() => {
      return Math.max(0, props.saving.target_amount - props.saving.current_amount);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden flex flex-col h-full" }, _attrs))}><div class="relative h-32 shrink-0 overflow-hidden" style="${ssrRenderStyle({ backgroundColor: (__props.saving.color || "#6366f1") + "10" })}"><div class="absolute inset-0 opacity-20" style="${ssrRenderStyle({ background: `radial-gradient(circle at top right, ${__props.saving.color || "#6366f1"}, transparent)` })}"></div><div class="absolute inset-0 flex items-center justify-center"><div class="w-16 h-16 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/50 dark:border-white/10 flex items-center justify-center text-3xl shadow-xl transform group-hover:scale-110 transition-transform duration-500">${ssrInterpolate(__props.saving.icon || "🏦")}</div></div><div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><button class="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors shadow-sm">`);
      _push(ssrRenderComponent(unref(Edit3), { size: 14 }, null, _parent));
      _push(`</button><button class="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-sm">`);
      _push(ssrRenderComponent(unref(Trash2), { size: 14 }, null, _parent));
      _push(`</button></div></div><div class="p-6 flex flex-col flex-1"><div class="mb-4"><h3 class="text-lg font-black text-slate-800 dark:text-white truncate mb-1">${ssrInterpolate(__props.saving.title)}</h3><p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${ssrInterpolate(progress.value)}% of ${ssrInterpolate(unref(formatMoney)(__props.saving.target_amount))}</p></div><div class="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full mb-6 overflow-hidden p-0.5"><div class="h-full rounded-full transition-all duration-1000 ease-out shadow-sm" style="${ssrRenderStyle({ width: progress.value + "%", backgroundColor: __props.saving.color || "#6366f1" })}"></div></div><div class="grid grid-cols-2 gap-4 mb-8"><div class="flex flex-col"><span class="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Current</span><span class="text-sm font-black text-slate-800 dark:text-white tabular-nums">${ssrInterpolate(unref(formatMoney)(__props.saving.current_amount))}</span></div><div class="flex flex-col text-right"><span class="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Left to reach</span><span class="text-sm font-black text-rose-500 dark:text-rose-400 tabular-nums">${ssrInterpolate(unref(formatMoney)(remaining.value))}</span></div></div><div class="mt-auto grid grid-cols-2 gap-3"><button class="flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all active:scale-95">`);
      _push(ssrRenderComponent(unref(ArrowDownCircle), { size: 14 }, null, _parent));
      _push(` Deposit </button><button class="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95">`);
      _push(ssrRenderComponent(unref(ArrowUpCircle), { size: 14 }, null, _parent));
      _push(` Withdraw </button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/SavingCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
