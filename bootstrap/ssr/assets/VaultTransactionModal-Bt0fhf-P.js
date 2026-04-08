import { ref, unref, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderVNode } from "vue/server-renderer";
import { X, ArrowDownCircle, ArrowUpCircle } from "lucide-vue-next";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "VaultTransactionModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    saving: Object,
    type: String,
    // 'deposit' | 'withdraw'
    onClose: Function,
    onSave: Function,
    processing: Boolean
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const { formatMoney } = useFinanceFormat();
    const amount = ref("");
    const date = ref((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    const presets = [5e4, 1e5, 5e5, 1e6];
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        var _a, _b, _c, _d, _e;
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md transition-opacity"></div><div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"><div class="p-8 pb-0 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style="${ssrRenderStyle({ backgroundColor: (((_a = __props.saving) == null ? void 0 : _a.color) || "#6366f1") + "20" })}">${ssrInterpolate(((_b = __props.saving) == null ? void 0 : _b.icon) || "🏦")}</div><div><h2 class="text-xl font-black text-slate-800 dark:text-white">${ssrInterpolate(__props.type === "deposit" ? _ctx.$t("vault_deposit_title") : _ctx.$t("vault_withdraw_title"))}</h2><p class="text-[10px] font-black text-slate-400 tracking-widest">${ssrInterpolate((_c = __props.saving) == null ? void 0 : _c.title)}</p></div></div><button class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all active:scale-95">`);
          _push2(ssrRenderComponent(unref(X), { size: 20 }, null, _parent));
          _push2(`</button></div><div class="p-8 space-y-6"><div class="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 flex justify-between items-center transition-all"><div><p class="text-[9px] font-bold text-slate-400 tracking-tighter mb-1">${ssrInterpolate(_ctx.$t("vault_available_title"))}</p><p class="text-lg font-black text-slate-800 dark:text-white tabular-nums">${ssrInterpolate(unref(formatMoney)(((_d = __props.saving) == null ? void 0 : _d.current_amount) || 0))}</p></div><div class="text-right"><p class="text-[9px] font-bold text-slate-400 tracking-tighter mb-1">${ssrInterpolate(_ctx.$t("target"))}</p><p class="text-xs font-bold text-indigo-500 tabular-nums">${ssrInterpolate(unref(formatMoney)(((_e = __props.saving) == null ? void 0 : _e.target_amount) || 0))}</p></div></div><div class="space-y-4"><div class="relative group"><label class="absolute -top-2.5 left-5 bg-white dark:bg-slate-900 px-2 text-[10px] font-black text-indigo-500 tracking-widest z-10">${ssrInterpolate(__props.type === "deposit" ? _ctx.$t("vault_deposit_label") : _ctx.$t("vault_withdraw_label"))}</label><div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 border-2 border-transparent focus-within:border-indigo-500/20 focus-within:bg-white dark:focus-within:bg-slate-800 rounded-[1.5rem] px-5 py-4 transition-all shadow-inner"><span class="text-slate-400 font-black text-lg">Rp</span><input${ssrRenderAttr("value", amount.value)} type="number" class="w-full bg-transparent border-none p-0 text-2xl font-black text-slate-800 dark:text-white placeholder-slate-300 focus:ring-0" placeholder="0" autofocus></div></div><div class="grid grid-cols-4 gap-2"><!--[-->`);
          ssrRenderList(presets, (p) => {
            _push2(`<button class="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-[9px] font-black text-slate-500 dark:text-slate-400 hover:bg-indigo-500 hover:text-white transition-all active:scale-95 border border-slate-100 dark:border-slate-800">${ssrInterpolate(Math.floor(p / 1e3))}k </button>`);
          });
          _push2(`<!--]--></div></div><div class="space-y-1"><label class="text-[10px] font-black text-slate-400 tracking-widest ml-1">${ssrInterpolate(_ctx.$t("vault_date_label"))}</label><input${ssrRenderAttr("value", date.value)} type="date" class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"></div></div><div class="p-8 pt-0"><button${ssrIncludeBooleanAttr(__props.processing || !amount.value) ? " disabled" : ""} class="${ssrRenderClass([__props.type === "deposit" ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" : "bg-rose-500 text-white shadow-xl shadow-rose-500/20", "w-full relative group overflow-hidden py-4 rounded-2xl font-black text-sm transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"])}"><div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div><span class="relative flex items-center justify-center gap-3">`);
          ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(__props.type === "deposit" ? unref(ArrowDownCircle) : unref(ArrowUpCircle)), { size: 18 }, null), _parent);
          _push2(` ${ssrInterpolate(__props.processing ? _ctx.$t("btn_processing") : __props.type === "deposit" ? _ctx.$t("vault_btn_deposit") : _ctx.$t("vault_btn_withdraw"))}</span></button>`);
          if (__props.type === "withdraw") {
            _push2(`<p class="text-center text-[10px] font-bold text-slate-400 mt-4">${ssrInterpolate(_ctx.$t("vault_withdraw_notice"))}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/VaultTransactionModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
