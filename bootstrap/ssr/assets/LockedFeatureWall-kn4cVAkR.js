import { mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import "@inertiajs/vue3";
import { Lock, Wallet, TrendingUp, Zap } from "lucide-vue-next";
const _sfc_main = {
  __name: "LockedFeatureWall",
  __ssrInlineRender: true,
  props: {
    isExplorer: Boolean
  },
  setup(__props) {
    const features = [
      {
        id: "vault",
        title: "The Vault",
        desc: "Sistem akumulasi kekayaan & target tabungan otomatis.",
        icon: Wallet,
        color: "text-orange-500",
        bg: "bg-orange-500/10"
      },
      {
        id: "invest",
        title: "Investment Lab",
        desc: "Pantau pertumbuhan portofolio & estimasi P/L real-time.",
        icon: TrendingUp,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10"
      },
      {
        id: "neural",
        title: "Neural Financial Forecast",
        desc: "Prediksi arus kas masa depan dengan kecerdasan buatan.",
        icon: Zap,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isExplorer) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-16 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000" }, _attrs))}><div class="flex flex-col items-center text-center mb-10"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4">`);
        _push(ssrRenderComponent(unref(Lock), {
          size: 12,
          class: "text-slate-400"
        }, null, _parent));
        _push(`<span class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Unlock Advanced Systems</span></div><h2 class="text-2xl lg:text-3xl font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tighter transition-colors duration-500"> Arsitektur Keuangan Masa Depan </h2><p class="text-xs lg:text-sm font-bold text-slate-500 dark:text-slate-500 max-w-lg transition-colors"> Tingkatkan ke tier <span class="text-indigo-600 dark:text-indigo-400">Architect</span> untuk mengaktifkan modul manajemen kekayaan tingkat lanjut ini. </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(features, (feat) => {
          _push(`<div class="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800/50 shadow-sm dark:shadow-none transition-all duration-500 hover:scale-[1.02] overflow-hidden"><div class="absolute inset-x-8 top-32 space-y-3 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none"><div class="h-12 w-full bg-slate-900 dark:bg-white rounded-2xl"></div><div class="h-4 w-3/4 bg-slate-900 dark:bg-white rounded-full"></div><div class="h-24 w-full bg-indigo-500 rounded-3xl"></div></div><div class="relative z-10"><div class="${ssrRenderClass([[feat.bg, feat.color], "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm"])}">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(feat.icon), { size: 28 }, null), _parent);
          _push(`</div><h3 class="text-lg font-black text-slate-800 dark:text-white mb-3 uppercase tracking-tight transition-colors">${ssrInterpolate(feat.title)}</h3><p class="text-[11px] leading-relaxed font-bold text-slate-500 dark:text-slate-500 mb-8 transition-colors">${ssrInterpolate(feat.desc)}</p><div class="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"> Learn more <span>→</span></div></div><div class="absolute inset-0 bg-white/10 dark:bg-black/5 backdrop-blur-[1px]"></div></div>`);
        });
        _push(`<!--]--></div><div class="mt-8 flex justify-center"><button class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-xs lg:text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 dark:shadow-none transition-all active:scale-95"> Unlock Now — Upgrade to Architect </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/LockedFeatureWall.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
