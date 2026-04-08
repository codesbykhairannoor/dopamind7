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
    computed(() => {
      return Math.max(0, props.saving.target_amount - props.saving.current_amount);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "group relative bg-[#ffffff05] dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 dark:border-slate-800/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-700 overflow-hidden flex flex-col h-full border-b-4",
        style: { borderBottomColor: __props.saving.color || "#6366f1" }
      }, _attrs))}><div class="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 transition-opacity duration-1000 group-hover:opacity-30" style="${ssrRenderStyle({ backgroundColor: __props.saving.color || "#6366f1" })}"></div><div class="p-6 pb-2 flex items-start justify-between relative z-10"><div class="w-14 h-14 rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/10 dark:border-white/5 flex items-center justify-center text-3xl shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">${ssrInterpolate(__props.saving.icon || "🏦")}</div><div class="flex gap-2"><button class="w-9 h-9 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all transform hover:scale-110 active:scale-95 shadow-sm">`);
      _push(ssrRenderComponent(unref(Edit3), { size: 15 }, null, _parent));
      _push(`</button><button class="w-9 h-9 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all transform hover:scale-110 active:scale-95 shadow-sm">`);
      _push(ssrRenderComponent(unref(Trash2), { size: 15 }, null, _parent));
      _push(`</button></div></div><div class="p-6 pt-2 flex flex-col flex-1 relative z-10"><div class="mb-4"><h3 class="text-lg font-black text-slate-800 dark:text-white truncate pr-2">${ssrInterpolate(__props.saving.title)}</h3><div class="flex items-center gap-2 mt-1"><p class="text-[10px] font-black text-slate-400 tracking-widest">${ssrInterpolate(progress.value)}% ${ssrInterpolate(_ctx.$t("vault_progress_suffix"))}</p><div class="h-1 flex-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-full overflow-hidden"><div class="h-full rounded-full transition-all duration-1000 ease-out" style="${ssrRenderStyle({ width: progress.value + "%", backgroundColor: __props.saving.color || "#6366f1" })}"></div></div></div></div><div class="grid grid-cols-2 gap-4 mb-6"><div><span class="text-[8px] font-black text-slate-400 tracking-tighter opacity-70">${ssrInterpolate(_ctx.$t("vault_card_current"))}</span><p class="text-sm font-black text-slate-800 dark:text-white tabular-nums">${ssrInterpolate(unref(formatMoney)(__props.saving.current_amount))}</p></div><div class="text-right"><span class="text-[8px] font-black text-slate-400 tracking-tighter opacity-70">${ssrInterpolate(_ctx.$t("target"))}</span><p class="text-sm font-black text-slate-400 tabular-nums">${ssrInterpolate(unref(formatMoney)(__props.saving.target_amount))}</p></div></div><div class="mt-auto flex items-center gap-2"><button class="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 text-white text-[10px] font-black tracking-widest hover:bg-indigo-700 hover:scale-[1.02] shadow-lg shadow-indigo-600/20 transition-all active:scale-95">`);
      _push(ssrRenderComponent(unref(ArrowDownCircle), { size: 14 }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.$t("vault_btn_deposit_short"))}</button><button class="w-[50px] flex items-center justify-center py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm">`);
      _push(ssrRenderComponent(unref(ArrowUpCircle), { size: 18 }, null, _parent));
      _push(`</button></div></div></div>`);
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
