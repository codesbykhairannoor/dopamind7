import { computed, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import "@inertiajs/vue3";
import { Sparkles, Zap, ShieldCheck, RefreshCcw, Layout, FileSearch2, Send, Rocket, Landmark, TrendingUp, Target, Shield, Brain, Lock, Gem, ArrowRight } from "lucide-vue-next";
const _sfc_main = {
  __name: "PremiumPreviewModal",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean,
    module: { type: String, default: "Journal" },
    onClose: Function
  },
  setup(__props) {
    const props = __props;
    const benefits = computed(() => {
      if (props.module === "Journal") {
        return [
          { icon: Sparkles, text: "preview_journal_benefit_1", color: "text-indigo-500" },
          { icon: Zap, text: "preview_journal_benefit_2", color: "text-amber-500" },
          { icon: ShieldCheck, text: "preview_journal_benefit_3", color: "text-emerald-500" }
        ];
      }
      if (props.module === "Calendar") {
        return [
          { icon: RefreshCcw, text: "preview_calendar_benefit_1", color: "text-indigo-500" },
          { icon: Zap, text: "preview_calendar_benefit_2", color: "text-orange-500" },
          { icon: Layout, text: "preview_calendar_benefit_3", color: "text-purple-500" }
        ];
      }
      if (props.module === "Jobs") {
        return [
          { icon: FileSearch2, text: "preview_job_benefit_1", color: "text-indigo-500" },
          { icon: Send, text: "preview_job_benefit_2", color: "text-emerald-500" },
          { icon: Rocket, text: "preview_job_benefit_3", color: "text-amber-500" }
        ];
      }
      if (props.module === "Finance") {
        return [
          { icon: Sparkles, text: "preview_finance_benefit_1", color: "text-indigo-500" },
          { icon: Landmark, text: "preview_finance_benefit_2", color: "text-amber-500" },
          { icon: TrendingUp, text: "preview_finance_benefit_3", color: "text-emerald-500" }
        ];
      }
      if (props.module === "Goal") {
        return [
          { icon: Layout, text: "preview_goal_benefit_1", color: "text-indigo-500" },
          { icon: Target, text: "preview_goal_benefit_2", color: "text-orange-500" },
          { icon: Shield, text: "preview_goal_benefit_3", color: "text-purple-500" }
        ];
      }
      if (props.module === "Coach") {
        return [
          { icon: Brain, text: "preview_coach_benefit_1", color: "text-indigo-500" },
          { icon: Zap, text: "preview_coach_benefit_2", color: "text-fuchsia-500" },
          { icon: TrendingUp, text: "preview_coach_benefit_3", color: "text-emerald-500" }
        ];
      }
      return [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[200] flex items-center justify-center p-4" }, _attrs))}><div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500"></div><div class="relative w-full max-w-lg bg-white dark:bg-slate-950 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-800/50 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"><div class="relative h-44 overflow-hidden bg-slate-900 flex items-center justify-center">`);
        if (__props.module === "Journal") {
          _push(`<div class="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-slate-900"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Calendar") {
          _push(`<div class="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-600 to-slate-900"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Jobs") {
          _push(`<div class="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-700 to-slate-900"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Finance") {
          _push(`<div class="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-800 to-slate-900"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Goal") {
          _push(`<div class="absolute inset-0 bg-gradient-to-br from-amber-400 via-rose-600 to-slate-900"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Coach") {
          _push(`<div class="absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-indigo-800 to-slate-900"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute inset-0 opacity-30"><div class="absolute top-0 left-0 w-32 h-32 bg-white/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div><div class="absolute bottom-0 right-0 w-48 h-48 bg-black/40 blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div></div><div class="relative z-10 flex flex-col items-center w-full px-12"><div class="w-full h-24 mb-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden relative group/mockup">`);
        if (__props.module === "Journal") {
          _push(`<div class="p-4 space-y-2 opacity-40"><div class="h-2 w-3/4 bg-white/40 rounded-full"></div><div class="h-2 w-full bg-white/20 rounded-full"></div><div class="h-2 w-5/6 bg-white/20 rounded-full"></div><div class="flex gap-2 pt-2"><div class="w-8 h-4 bg-indigo-400/40 rounded-md"></div><div class="w-12 h-4 bg-purple-400/40 rounded-md"></div></div><div class="absolute top-3 right-3 animate-bounce">`);
          _push(ssrRenderComponent(unref(Sparkles), {
            size: 12,
            class: "text-indigo-300"
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Goal") {
          _push(`<div class="p-3 grid grid-cols-3 gap-2 opacity-50"><!--[-->`);
          ssrRenderList(3, (i) => {
            _push(`<div class="aspect-square bg-white/20 rounded-lg border border-white/10 flex items-center justify-center"><div class="w-4 h-4 rounded-full bg-white/10 animate-pulse"></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Finance") {
          _push(`<div class="p-4 h-full flex flex-col justify-end opacity-50"><div class="flex items-end gap-1 h-12"><!--[-->`);
          ssrRenderList([20, 40, 30, 60, 80, 50, 90], (h) => {
            _push(`<div style="${ssrRenderStyle({ height: h + "%" })}" class="flex-1 bg-gradient-to-t from-blue-400/40 to-blue-300/10 rounded-t-sm"></div>`);
          });
          _push(`<!--]--></div><div class="mt-2 h-1 w-full bg-white/10 rounded-full"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Jobs") {
          _push(`<div class="p-4 space-y-3 opacity-40"><div class="flex items-center gap-3"><div class="w-6 h-6 rounded-lg bg-emerald-400/40"></div><div class="h-2 w-24 bg-white/20 rounded-full"></div></div><div class="flex items-center gap-3 translate-x-4"><div class="w-6 h-6 rounded-lg bg-teal-400/40"></div><div class="h-2 w-20 bg-white/20 rounded-full"></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Coach") {
          _push(`<div class="p-4 flex items-center justify-center h-full opacity-40"><div class="relative">`);
          _push(ssrRenderComponent(unref(Brain), {
            size: 48,
            class: "text-white/40 animate-pulse"
          }, null, _parent));
          _push(`<div class="absolute inset-0 bg-white/10 blur-[10px] rounded-full scale-150 animate-pulse"></div><div class="absolute -top-4 -right-4">`);
          _push(ssrRenderComponent(unref(Sparkles), {
            size: 16,
            class: "text-fuchsia-300 animate-bounce"
          }, null, _parent));
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div></div><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl rotate-6">`);
        if (__props.module === "Journal") {
          _push(ssrRenderComponent(unref(Lock), {
            size: 24,
            class: "text-white"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Jobs") {
          _push(ssrRenderComponent(unref(Rocket), {
            size: 24,
            class: "text-white"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Calendar") {
          _push(ssrRenderComponent(unref(Zap), {
            size: 24,
            class: "text-white"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Finance") {
          _push(ssrRenderComponent(unref(Landmark), {
            size: 24,
            class: "text-white"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Goal") {
          _push(ssrRenderComponent(unref(Target), {
            size: 24,
            class: "text-white"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.module === "Coach") {
          _push(ssrRenderComponent(unref(Brain), {
            size: 24,
            class: "text-white"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex flex-col"><span class="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] leading-none mb-1">Architect Tier</span><div class="flex items-center gap-1.5">`);
        _push(ssrRenderComponent(unref(Gem), {
          size: 14,
          class: "text-indigo-300"
        }, null, _parent));
        _push(`<span class="text-sm font-black text-white uppercase tracking-tight">System Unlocked</span></div></div></div></div></div><div class="p-8 md:p-10"><div class="flex flex-col items-center text-center mb-8"><h2 class="text-2xl md:text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mb-3 leading-tight">${ssrInterpolate(_ctx.$t("preview_modal_title"))}</h2><p class="text-[11px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] leading-relaxed max-w-[280px]">${ssrInterpolate(_ctx.$t("preview_modal_desc"))}</p></div><div class="space-y-4 mb-10"><h3 class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest pl-2">${ssrInterpolate(_ctx.$t("preview_benefit_title"))}</h3><div class="space-y-3"><!--[-->`);
        ssrRenderList(benefits.value, (benefit) => {
          _push(`<div class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all hover:translate-x-1 group"><div class="${ssrRenderClass([benefit.color, "shrink-0 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm"])}">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(benefit.icon), { size: 16 }, null), _parent);
          _push(`</div><p class="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">${ssrInterpolate(_ctx.$t(benefit.text))}</p></div>`);
        });
        _push(`<!--]--></div></div><div class="flex flex-col gap-3"><button class="group w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2">${ssrInterpolate(_ctx.$t("preview_view_plans"))} `);
        _push(ssrRenderComponent(unref(ArrowRight), {
          size: 16,
          class: "group-hover:translate-x-1 transition-transform"
        }, null, _parent));
        _push(`</button><button class="w-full py-4 text-slate-400 dark:text-slate-600 font-black text-[10px] uppercase tracking-[0.2em] hover:text-slate-600 dark:hover:text-slate-400 transition-colors"> ← Not now, maybe later </button></div></div><div class="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">`);
        _push(ssrRenderComponent(unref(Sparkles), {
          size: 80,
          class: "text-indigo-500"
        }, null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PremiumPreviewModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
