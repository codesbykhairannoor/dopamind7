import { computed, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, createBlock, createCommentVNode, createTextVNode, openBlock, toDisplayString, Fragment, renderList, useSSRContext, ref, onMounted, watch, Transition } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { Link, usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./OneForMindIcon-XdjRmiFl.js";
import { T as ThemeToggle } from "./ThemeToggle-ByQSx4Ee.js";
import { u as useAppearance } from "./useAppearance-rDoGVD4_.js";
import { u as useGating } from "./useGating-_5WV009x.js";
import { _ as _sfc_main$2 } from "./Modal-b6JySqy_.js";
import { TrendingUp, Sparkles, Zap, Calendar, Briefcase, Target, BookText, Gem, X, Sparkle, CheckCircle2, ArrowRight } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "FeatureLockModal",
  __ssrInlineRender: true,
  setup(__props) {
    const { gatingState, closeGating } = useGating();
    const featureConfig = computed(() => {
      const feature = gatingState.activeFeature;
      const themes = {
        "journal": {
          icon: BookText,
          color: "text-rose-500",
          bg: "bg-rose-50 dark:bg-rose-950/30",
          accent: "bg-rose-500",
          pattern: "pattern-organic",
          glow: "shadow-rose-500/20"
        },
        "goal": {
          icon: Target,
          color: "text-amber-500",
          bg: "bg-amber-50 dark:bg-amber-950/30",
          accent: "bg-amber-500",
          pattern: "pattern-circles",
          glow: "shadow-amber-500/20"
        },
        "job": {
          icon: Briefcase,
          color: "text-blue-500",
          bg: "bg-blue-50 dark:bg-blue-950/30",
          accent: "bg-blue-500",
          pattern: "pattern-grid",
          glow: "shadow-blue-500/20"
        },
        "calendar": {
          icon: Calendar,
          color: "text-indigo-500",
          bg: "bg-indigo-50 dark:bg-indigo-950/30",
          accent: "bg-indigo-500",
          pattern: "pattern-timeline",
          glow: "shadow-indigo-500/20"
        },
        "planner_batch": {
          icon: Zap,
          color: "text-emerald-500",
          bg: "bg-emerald-50 dark:bg-emerald-950/30",
          accent: "bg-emerald-500",
          pattern: "pattern-motion",
          glow: "shadow-emerald-500/20"
        },
        "habit_batch": {
          icon: Zap,
          color: "text-emerald-500",
          bg: "bg-emerald-50 dark:bg-emerald-950/30",
          accent: "bg-emerald-500",
          pattern: "pattern-motion",
          glow: "shadow-emerald-500/20"
        },
        "ai_coach": {
          icon: Sparkles,
          color: "text-violet-400",
          bg: "bg-slate-950",
          accent: "bg-violet-600",
          pattern: "pattern-quantum",
          glow: "shadow-violet-500/40",
          isPremium: true
        },
        "finance_trends": {
          icon: TrendingUp,
          color: "text-cyan-500",
          bg: "bg-cyan-50 dark:bg-cyan-950/30",
          accent: "bg-cyan-500",
          pattern: "pattern-data",
          glow: "shadow-cyan-500/20"
        }
      };
      return themes[feature] || {
        icon: Gem,
        color: "text-indigo-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/30",
        accent: "bg-indigo-500",
        pattern: "pattern-default",
        glow: "shadow-indigo-500/20"
      };
    });
    const tKey = (key) => {
      const feature = gatingState.activeFeature;
      const translationFeature = feature === "habit_batch" ? "planner_batch" : feature;
      return `gating.${translationFeature}.${key}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        show: unref(gatingState).isOpen,
        onClose: unref(closeGating),
        "max-width": "md"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([featureConfig.value.bg, "overflow-hidden relative group transition-all duration-500 z-[100]"])}" data-v-ef9e489d${_scopeId}><div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" data-v-ef9e489d${_scopeId}>`);
            if (featureConfig.value.pattern === "pattern-grid") {
              _push2(`<div class="absolute inset-0" style="${ssrRenderStyle({ "background-image": "radial-gradient(#000 1px, transparent 1px)", "background-size": "20px 20px" })}" data-v-ef9e489d${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (featureConfig.value.pattern === "pattern-motion") {
              _push2(`<div class="absolute inset-0 overflow-hidden" data-v-ef9e489d${_scopeId}><!--[-->`);
              ssrRenderList(5, (i) => {
                _push2(`<div class="absolute h-px bg-white w-full rotate-[-45deg] transition-all" style="${ssrRenderStyle(`top: ${i * 20}%; left: -${i * 10}%;`)}" data-v-ef9e489d${_scopeId}></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (featureConfig.value.pattern === "pattern-quantum") {
              _push2(`<div class="absolute inset-0 overflow-hidden" data-v-ef9e489d${_scopeId}><!--[-->`);
              ssrRenderList(15, (i) => {
                _push2(`<div class="quantum-particle" style="${ssrRenderStyle(`top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; animation-delay: ${Math.random() * 5}s`)}" data-v-ef9e489d${_scopeId}></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="${ssrRenderClass([featureConfig.value.accent, "absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20"])}" data-v-ef9e489d${_scopeId}></div><div class="p-6 md:p-10 relative z-10" data-v-ef9e489d${_scopeId}><button class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:rotate-90" data-v-ef9e489d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(X), { size: 20 }, null, _parent2, _scopeId));
            _push2(`</button><div class="relative mb-6 md:mb-8" data-v-ef9e489d${_scopeId}><div class="${ssrRenderClass([[featureConfig.value.glow, featureConfig.value.isPremium ? "bg-gradient-to-br from-violet-600 to-indigo-600" : "bg-white dark:bg-slate-800"], "w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-110"])}" data-v-ef9e489d${_scopeId}>`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(featureConfig.value.icon), {
              size: 24,
              class: ["md:hidden", featureConfig.value.isPremium ? "text-white" : featureConfig.value.color],
              "stroke-width": "2.5"
            }, null), _parent2, _scopeId);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(featureConfig.value.icon), {
              size: 32,
              class: ["hidden md:block", featureConfig.value.isPremium ? "text-white" : featureConfig.value.color],
              "stroke-width": "2.5"
            }, null), _parent2, _scopeId);
            _push2(`</div></div><div class="text-center mb-6 md:mb-8" data-v-ef9e489d${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 backdrop-blur-md mb-3 md:mb-4 border border-white/10 shadow-sm" data-v-ef9e489d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Sparkle), {
              size: 9,
              class: featureConfig.value.color,
              fill: "currentColor"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[7.5px] md:text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300" data-v-ef9e489d${_scopeId}>${ssrInterpolate(_ctx.$t(featureConfig.value.isPremium ? "gating.lock_title_ai" : "gating.lock_title_required"))}</span></div><h3 class="${ssrRenderClass([featureConfig.value.isPremium ? "text-white" : "text-slate-900 dark:text-white", "text-xl md:text-3xl font-black tracking-tighter mb-2 md:mb-3 leading-tight"])}" data-v-ef9e489d${_scopeId}>${ssrInterpolate(_ctx.$t(tKey("title")))}</h3><p class="${ssrRenderClass([featureConfig.value.isPremium ? "text-indigo-200/60" : "text-slate-500 dark:text-slate-400", "text-[10px] md:text-[11px] font-bold leading-relaxed max-w-[260px] mx-auto transition-colors"])}" data-v-ef9e489d${_scopeId}>${ssrInterpolate(_ctx.$t(tKey("description")))}</p></div><div class="space-y-1.5 md:space-y-2 mb-8 md:mb-10" data-v-ef9e489d${_scopeId}><!--[-->`);
            ssrRenderList(3, (i) => {
              _push2(`<div class="${ssrRenderClass([featureConfig.value.isPremium ? "bg-white/5 hover:bg-white/10 border border-white/5" : "bg-white dark:bg-slate-800 shadow-sm hover:shadow-md border border-slate-100 dark:border-white/5", "flex items-center gap-3 p-3 md:p-3.5 rounded-xl md:rounded-2xl transition-all"])}" data-v-ef9e489d${_scopeId}><div class="${ssrRenderClass([featureConfig.value.isPremium ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-50 dark:bg-slate-700 text-slate-400", "shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center"])}" data-v-ef9e489d${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle2), {
                size: 10,
                class: "md:hidden"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(CheckCircle2), {
                size: 12,
                class: "hidden md:block"
              }, null, _parent2, _scopeId));
              _push2(`</div><span class="${ssrRenderClass([featureConfig.value.isPremium ? "text-indigo-100" : "text-slate-700 dark:text-slate-200", "text-[10px] md:text-[11px] font-black tracking-tight"])}" data-v-ef9e489d${_scopeId}>${ssrInterpolate(_ctx.$t(tKey("benefit_" + i)))}</span></div>`);
            });
            _push2(`<!--]--></div><div class="space-y-2 md:space-y-3" data-v-ef9e489d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("billing"),
              onClick: unref(closeGating),
              class: ["block w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-widest text-white shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 group/btn relative overflow-hidden", featureConfig.value.isPremium ? "bg-indigo-600 hover:bg-indigo-500" : "bg-slate-900 dark:bg-indigo-600 hover:scale-[1.01]"]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (featureConfig.value.isPremium) {
                    _push3(`<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" data-v-ef9e489d${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` ${ssrInterpolate(_ctx.$t("gating.btn_upgrade"))} `);
                  _push3(ssrRenderComponent(unref(ArrowRight), {
                    size: 14,
                    "stroke-width": "3",
                    class: "group-hover/btn:translate-x-1 transition-transform"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    featureConfig.value.isPremium ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"
                    })) : createCommentVNode("", true),
                    createTextVNode(" " + toDisplayString(_ctx.$t("gating.btn_upgrade")) + " ", 1),
                    createVNode(unref(ArrowRight), {
                      size: 14,
                      "stroke-width": "3",
                      class: "group-hover/btn:translate-x-1 transition-transform"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="${ssrRenderClass([featureConfig.value.isPremium ? "text-indigo-400/60 hover:text-white" : "text-slate-400 hover:text-slate-900 dark:hover:text-white", "block w-full py-1 md:py-2 font-bold text-[8px] md:text-[9px] uppercase tracking-widest transition-colors"])}" data-v-ef9e489d${_scopeId}>${ssrInterpolate(_ctx.$t("gating.btn_stay"))}</button></div><div class="${ssrRenderClass([featureConfig.value.isPremium ? "border-white/5 text-indigo-200" : "border-slate-100 dark:border-white/5 text-slate-400", "mt-8 md:mt-12 pt-6 md:pt-8 border-t flex items-center justify-center gap-6 md:gap-8 opacity-40 transition-colors"])}" data-v-ef9e489d${_scopeId}><div class="flex items-center gap-2" data-v-ef9e489d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Gem), {
              size: 12,
              class: "md:hidden"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Gem), {
              size: 14,
              class: "hidden md:block"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[7px] md:text-[8px] font-black uppercase tracking-widest" data-v-ef9e489d${_scopeId}>${ssrInterpolate(_ctx.$t("gating.tier_platinum"))}</span></div><div class="flex items-center gap-2" data-v-ef9e489d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Sparkles), {
              size: 12,
              class: "md:hidden"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Sparkles), {
              size: 14,
              class: "hidden md:block"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[7px] md:text-[8px] font-black uppercase tracking-widest" data-v-ef9e489d${_scopeId}>${ssrInterpolate(_ctx.$t("gating.tier_neural"))}</span></div></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: ["overflow-hidden relative group transition-all duration-500 z-[100]", featureConfig.value.bg]
              }, [
                createVNode("div", { class: "absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" }, [
                  featureConfig.value.pattern === "pattern-grid" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "absolute inset-0",
                    style: { "background-image": "radial-gradient(#000 1px, transparent 1px)", "background-size": "20px 20px" }
                  })) : createCommentVNode("", true),
                  featureConfig.value.pattern === "pattern-motion" ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "absolute inset-0 overflow-hidden"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "absolute h-px bg-white w-full rotate-[-45deg] transition-all",
                        style: `top: ${i * 20}%; left: -${i * 10}%;`
                      }, null, 4);
                    }), 64))
                  ])) : createCommentVNode("", true),
                  featureConfig.value.pattern === "pattern-quantum" ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "absolute inset-0 overflow-hidden"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(15, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "quantum-particle",
                        style: `top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; animation-delay: ${Math.random() * 5}s`
                      }, null, 4);
                    }), 64))
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", {
                  class: ["absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20", featureConfig.value.accent]
                }, null, 2),
                createVNode("div", { class: "p-6 md:p-10 relative z-10" }, [
                  createVNode("button", {
                    onClick: unref(closeGating),
                    class: "absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:rotate-90"
                  }, [
                    createVNode(unref(X), { size: 20 })
                  ], 8, ["onClick"]),
                  createVNode("div", { class: "relative mb-6 md:mb-8" }, [
                    createVNode("div", {
                      class: [[featureConfig.value.glow, featureConfig.value.isPremium ? "bg-gradient-to-br from-violet-600 to-indigo-600" : "bg-white dark:bg-slate-800"], "w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-110"]
                    }, [
                      (openBlock(), createBlock(resolveDynamicComponent(featureConfig.value.icon), {
                        size: 24,
                        class: ["md:hidden", featureConfig.value.isPremium ? "text-white" : featureConfig.value.color],
                        "stroke-width": "2.5"
                      }, null, 8, ["class"])),
                      (openBlock(), createBlock(resolveDynamicComponent(featureConfig.value.icon), {
                        size: 32,
                        class: ["hidden md:block", featureConfig.value.isPremium ? "text-white" : featureConfig.value.color],
                        "stroke-width": "2.5"
                      }, null, 8, ["class"]))
                    ], 2)
                  ]),
                  createVNode("div", { class: "text-center mb-6 md:mb-8" }, [
                    createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 backdrop-blur-md mb-3 md:mb-4 border border-white/10 shadow-sm" }, [
                      createVNode(unref(Sparkle), {
                        size: 9,
                        class: featureConfig.value.color,
                        fill: "currentColor"
                      }, null, 8, ["class"]),
                      createVNode("span", { class: "text-[7.5px] md:text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300" }, toDisplayString(_ctx.$t(featureConfig.value.isPremium ? "gating.lock_title_ai" : "gating.lock_title_required")), 1)
                    ]),
                    createVNode("h3", {
                      class: ["text-xl md:text-3xl font-black tracking-tighter mb-2 md:mb-3 leading-tight", featureConfig.value.isPremium ? "text-white" : "text-slate-900 dark:text-white"]
                    }, toDisplayString(_ctx.$t(tKey("title"))), 3),
                    createVNode("p", {
                      class: ["text-[10px] md:text-[11px] font-bold leading-relaxed max-w-[260px] mx-auto transition-colors", featureConfig.value.isPremium ? "text-indigo-200/60" : "text-slate-500 dark:text-slate-400"]
                    }, toDisplayString(_ctx.$t(tKey("description"))), 3)
                  ]),
                  createVNode("div", { class: "space-y-1.5 md:space-y-2 mb-8 md:mb-10" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: ["flex items-center gap-3 p-3 md:p-3.5 rounded-xl md:rounded-2xl transition-all", featureConfig.value.isPremium ? "bg-white/5 hover:bg-white/10 border border-white/5" : "bg-white dark:bg-slate-800 shadow-sm hover:shadow-md border border-slate-100 dark:border-white/5"]
                      }, [
                        createVNode("div", {
                          class: ["shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center", featureConfig.value.isPremium ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-50 dark:bg-slate-700 text-slate-400"]
                        }, [
                          createVNode(unref(CheckCircle2), {
                            size: 10,
                            class: "md:hidden"
                          }),
                          createVNode(unref(CheckCircle2), {
                            size: 12,
                            class: "hidden md:block"
                          })
                        ], 2),
                        createVNode("span", {
                          class: ["text-[10px] md:text-[11px] font-black tracking-tight", featureConfig.value.isPremium ? "text-indigo-100" : "text-slate-700 dark:text-slate-200"]
                        }, toDisplayString(_ctx.$t(tKey("benefit_" + i))), 3)
                      ], 2);
                    }), 64))
                  ]),
                  createVNode("div", { class: "space-y-2 md:space-y-3" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("billing"),
                      onClick: unref(closeGating),
                      class: ["block w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-widest text-white shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 group/btn relative overflow-hidden", featureConfig.value.isPremium ? "bg-indigo-600 hover:bg-indigo-500" : "bg-slate-900 dark:bg-indigo-600 hover:scale-[1.01]"]
                    }, {
                      default: withCtx(() => [
                        featureConfig.value.isPremium ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(_ctx.$t("gating.btn_upgrade")) + " ", 1),
                        createVNode(unref(ArrowRight), {
                          size: 14,
                          "stroke-width": "3",
                          class: "group-hover/btn:translate-x-1 transition-transform"
                        })
                      ]),
                      _: 1
                    }, 8, ["href", "onClick", "class"]),
                    createVNode("button", {
                      onClick: unref(closeGating),
                      class: ["block w-full py-1 md:py-2 font-bold text-[8px] md:text-[9px] uppercase tracking-widest transition-colors", featureConfig.value.isPremium ? "text-indigo-400/60 hover:text-white" : "text-slate-400 hover:text-slate-900 dark:hover:text-white"]
                    }, toDisplayString(_ctx.$t("gating.btn_stay")), 11, ["onClick"])
                  ]),
                  createVNode("div", {
                    class: ["mt-8 md:mt-12 pt-6 md:pt-8 border-t flex items-center justify-center gap-6 md:gap-8 opacity-40 transition-colors", featureConfig.value.isPremium ? "border-white/5 text-indigo-200" : "border-slate-100 dark:border-white/5 text-slate-400"]
                  }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(unref(Gem), {
                        size: 12,
                        class: "md:hidden"
                      }),
                      createVNode(unref(Gem), {
                        size: 14,
                        class: "hidden md:block"
                      }),
                      createVNode("span", { class: "text-[7px] md:text-[8px] font-black uppercase tracking-widest" }, toDisplayString(_ctx.$t("gating.tier_platinum")), 1)
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(unref(Sparkles), {
                        size: 12,
                        class: "md:hidden"
                      }),
                      createVNode(unref(Sparkles), {
                        size: 14,
                        class: "hidden md:block"
                      }),
                      createVNode("span", { class: "text-[7px] md:text-[8px] font-black uppercase tracking-widest" }, toDisplayString(_ctx.$t("gating.tier_neural")), 1)
                    ])
                  ], 2)
                ])
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FeatureLockModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const FeatureLockModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ef9e489d"]]);
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const { isExplorer, isAiEnabled, canUse, user } = useGating();
    const showLogoutModal = ref(false);
    const showingNavigationDropdown = ref(false);
    const isSidebarCollapsed = ref(false);
    const { initTheme } = useAppearance();
    onMounted(() => {
      if (!user.value) {
        window.location.href = route("login");
        return;
      }
      initTheme();
      const savedState = localStorage.getItem("sidebar_collapsed");
      if (savedState !== null) {
        isSidebarCollapsed.value = savedState === "true";
      }
    });
    const showModule = (moduleName) => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = user.value) == null ? void 0 : _a.settings) == null ? void 0 : _b.modules) == null ? void 0 : _c[moduleName]) !== false;
    };
    const currentLocale = computed(() => page.props.locale);
    watch(() => page.url, () => {
      showingNavigationDropdown.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white relative transition-colors duration-500" }, _attrs))} data-v-ed6729f8><aside class="${ssrRenderClass([isSidebarCollapsed.value ? "w-20" : "w-64", "bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none flex-shrink-0 transition-all duration-300 ease-in-out relative"])}" data-v-ed6729f8><button class="absolute -right-3 top-8 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 shadow-sm dark:shadow-none transition-all z-30" data-v-ed6729f8>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        name: !isSidebarCollapsed.value ? "chevron-left" : "chevron-right",
        size: "14",
        "stroke-width": "3"
      }, null, _parent));
      _push(`</button><div class="${ssrRenderClass([isSidebarCollapsed.value ? "justify-center" : "justify-start px-8", "h-20 flex items-center px-6 shrink-0"])}" data-v-ed6729f8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "",
        class: "group flex items-center gap-2.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-100 dark:shadow-none shrink-0" data-v-ed6729f8${_scopeId}><img src="/favicon.svg" alt="Logo" class="w-5 h-5 brightness-0 invert" data-v-ed6729f8${_scopeId}></div>`);
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="text-lg font-black tracking-tighter text-slate-900 dark:text-white whitespace-nowrap" data-v-ed6729f8${_scopeId}> OneForMind </span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-100 dark:shadow-none shrink-0" }, [
                createVNode("img", {
                  src: "/favicon.svg",
                  alt: "Logo",
                  class: "w-5 h-5 brightness-0 invert"
                })
              ]),
              createVNode(Transition, { name: "fade" }, {
                default: withCtx(() => [
                  !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-lg font-black tracking-tighter text-slate-900 dark:text-white whitespace-nowrap"
                  }, " OneForMind ")) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="${ssrRenderClass([isSidebarCollapsed.value ? "px-3" : "px-4", "flex-1 px-3 space-y-0.5 overflow-y-auto py-2 custom-scrollbar transition-all duration-500"])}" data-v-ed6729f8><div class="px-3 pt-1 pb-1" data-v-ed6729f8><span class="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1" data-v-ed6729f8>${ssrInterpolate(_ctx.$t("nav_core_modules"))}</span></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "",
        class: ["flex items-center rounded-xl transition-all duration-300 group relative", [
          _ctx.route().current("dashboard") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm dark:shadow-none font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
          isSidebarCollapsed.value ? "p-2 justify-center" : "px-3 py-1.5 gap-3"
        ]],
        title: isSidebarCollapsed.value ? _ctx.$t("nav_item_dashboard") : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              name: "dashboard",
              size: "18",
              class: "shrink-0"
            }, null, _parent2, _scopeId));
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="whitespace-nowrap text-sm" data-v-ed6729f8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_dashboard"))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.route().current("dashboard") && !isSidebarCollapsed.value) {
              _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-ed6729f8${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$3, {
                name: "dashboard",
                size: "18",
                class: "shrink-0"
              }),
              !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "whitespace-nowrap text-sm"
              }, toDisplayString(_ctx.$t("nav_item_dashboard")), 1)) : createCommentVNode("", true),
              _ctx.route().current("dashboard") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (showModule("habit")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          prefetch: "",
          class: ["flex items-center rounded-xl transition-all duration-300 group relative", [
            _ctx.route().current("habits.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
            isSidebarCollapsed.value ? "p-2 justify-center" : "px-3 py-1.5 gap-3"
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("nav_item_habit") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                name: "habit",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-sm" data-v-ed6729f8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_habit"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("habits.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-ed6729f8${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$3, {
                  name: "habit",
                  size: "18",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap text-sm"
                }, toDisplayString(_ctx.$t("nav_item_habit")), 1)) : createCommentVNode("", true),
                _ctx.route().current("habits.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showModule("planner")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("planner.index"),
          prefetch: "",
          class: ["flex items-center rounded-xl transition-all duration-300 group relative", [
            _ctx.route().current("planner.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
            isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3"
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("nav_item_planner") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                name: "planner",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-sm" data-v-ed6729f8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_planner"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("planner.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-ed6729f8${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$3, {
                  name: "planner",
                  size: "18",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap text-sm"
                }, toDisplayString(_ctx.$t("nav_item_planner")), 1)) : createCommentVNode("", true),
                _ctx.route().current("planner.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showModule("finance")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("finance.index"),
          prefetch: "",
          class: ["flex items-center rounded-xl transition-all duration-300 group relative", [
            _ctx.route().current("finance.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
            isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3"
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("nav_item_finance") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                name: "finance",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-sm" data-v-ed6729f8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_finance"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("finance.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-ed6729f8${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$3, {
                  name: "finance",
                  size: "18",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap text-sm"
                }, toDisplayString(_ctx.$t("nav_item_finance")), 1)) : createCommentVNode("", true),
                _ctx.route().current("finance.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="px-3 pt-4 pb-1" data-v-ed6729f8><span class="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1" data-v-ed6729f8>${ssrInterpolate(_ctx.$t("nav_platinum_suite"))}</span></div>`);
      if (showModule("journal")) {
        _push(`<div class="${ssrRenderClass([[
          _ctx.route().current("journal.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
          isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3",
          !unref(canUse)("journal") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
        ], "flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? _ctx.$t("nav_item_journal") : "")} data-v-ed6729f8>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          name: "journal",
          size: "18",
          class: "shrink-0"
        }, null, _parent));
        if (!isSidebarCollapsed.value) {
          _push(`<span class="whitespace-nowrap text-sm flex items-center justify-between w-full" data-v-ed6729f8>${ssrInterpolate(_ctx.$t("nav_item_journal"))} `);
          if (!unref(canUse)("journal")) {
            _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-ed6729f8></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.route().current("journal.*") && !isSidebarCollapsed.value) {
          _push(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-ed6729f8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showModule("calendar")) {
        _push(`<div class="${ssrRenderClass([[
          _ctx.route().current("calendar.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
          isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3",
          !unref(canUse)("calendar") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
        ], "flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? _ctx.$t("nav_item_calendar") : "")} data-v-ed6729f8>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          name: "calendar",
          size: "18",
          class: "shrink-0"
        }, null, _parent));
        if (!isSidebarCollapsed.value) {
          _push(`<span class="whitespace-nowrap text-sm flex items-center justify-between w-full" data-v-ed6729f8>${ssrInterpolate(_ctx.$t("nav_item_calendar"))} `);
          if (!unref(canUse)("calendar")) {
            _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-ed6729f8></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.route().current("calendar.*") && !isSidebarCollapsed.value) {
          _push(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-ed6729f8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showModule("job")) {
        _push(`<div class="${ssrRenderClass([[
          _ctx.route().current("jobs.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
          isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3",
          !unref(canUse)("job") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
        ], "flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? _ctx.$t("nav_item_jobs") : "")} data-v-ed6729f8>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          name: "job",
          size: "18",
          class: "shrink-0"
        }, null, _parent));
        if (!isSidebarCollapsed.value) {
          _push(`<span class="whitespace-nowrap text-sm flex items-center justify-between w-full" data-v-ed6729f8>${ssrInterpolate(_ctx.$t("nav_item_jobs"))} `);
          if (!unref(canUse)("job")) {
            _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-ed6729f8></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.route().current("jobs.*") && !isSidebarCollapsed.value) {
          _push(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-ed6729f8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showModule("goal")) {
        _push(`<div class="${ssrRenderClass([[
          _ctx.route().current("goals.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
          isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3",
          !unref(canUse)("goal") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
        ], "flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? _ctx.$t("nav_item_goals") : "")} data-v-ed6729f8>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          name: "goal",
          size: "18",
          class: "shrink-0"
        }, null, _parent));
        if (!isSidebarCollapsed.value) {
          _push(`<span class="whitespace-nowrap text-sm flex items-center justify-between w-full" data-v-ed6729f8>${ssrInterpolate(_ctx.$t("nav_item_goals"))} `);
          if (!unref(canUse)("goal")) {
            _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-ed6729f8></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.route().current("goals.*") && !isSidebarCollapsed.value) {
          _push(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-ed6729f8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="px-4 py-3 shrink-0" data-v-ed6729f8>`);
      _push(ssrRenderComponent(ThemeToggle, { collapsed: isSidebarCollapsed.value }, null, _parent));
      _push(`</div><div class="px-3 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 space-y-1 shrink-0" data-v-ed6729f8><div class="${ssrRenderClass([isSidebarCollapsed.value ? "flex-col gap-1 w-10 mx-auto" : "mx-1 gap-1", "flex items-center p-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl mb-4 border border-slate-200/50 dark:border-slate-700/50 shadow-inner"])}" data-v-ed6729f8><button class="${ssrRenderClass([currentLocale.value === "id" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md dark:shadow-none ring-1 ring-slate-200/50" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all duration-300"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? "Bahasa Indonesia" : "")} data-v-ed6729f8> ID </button><button class="${ssrRenderClass([currentLocale.value === "en" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md dark:shadow-none ring-1 ring-slate-200/50" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all duration-300"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? "English" : "")} data-v-ed6729f8> EN </button></div>`);
      if (unref(isExplorer)) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("billing"),
          class: ["flex items-center rounded-xl transition-all duration-500 group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none mb-2", isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-2.5"],
          title: "Upgrade to Architect"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" data-v-ed6729f8${_scopeId}></div>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                name: "premium",
                size: "18",
                class: "shrink-0 relative z-10 animate-pulse"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-[10px] font-black uppercase tracking-widest relative z-10" data-v-ed6729f8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_upgrade_pro"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
                createVNode(_sfc_main$3, {
                  name: "premium",
                  size: "18",
                  class: "shrink-0 relative z-10 animate-pulse"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap text-[10px] font-black uppercase tracking-widest relative z-10"
                }, toDisplayString(_ctx.$t("nav_upgrade_pro")), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("settings.index"),
        prefetch: "",
        class: ["flex items-center rounded-xl transition-all duration-300 group", [
          _ctx.route().current("settings.*") ? "bg-white dark:bg-slate-800 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 font-bold" : "border border-transparent text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm dark:hover:shadow-none hover:text-slate-800 dark:hover:text-slate-100",
          isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2 gap-2.5"
        ]],
        title: isSidebarCollapsed.value ? _ctx.$t("nav_item_settings") : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              name: "settings",
              size: "18",
              class: "shrink-0"
            }, null, _parent2, _scopeId));
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="whitespace-nowrap text-xs font-bold" data-v-ed6729f8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_settings"))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$3, {
                name: "settings",
                size: "18",
                class: "shrink-0"
              }),
              !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "whitespace-nowrap text-xs font-bold"
              }, toDisplayString(_ctx.$t("nav_item_settings")), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="${ssrRenderClass([isSidebarCollapsed.value ? "flex-col gap-2" : "px-2 py-1", "flex items-center justify-between group"])}" data-v-ed6729f8><div class="flex items-center gap-2.5 min-w-0"${ssrRenderAttr("title", isSidebarCollapsed.value ? (_a = unref(user)) == null ? void 0 : _a.name : "")} data-v-ed6729f8>`);
      if ((_b = unref(user)) == null ? void 0 : _b.avatar_url) {
        _push(`<img${ssrRenderAttr("src", unref(user).avatar_url)}${ssrRenderAttr("alt", _ctx.$t("nav_avatar", "Avatar"))} class="w-8 h-8 rounded-full object-cover shadow-sm dark:shadow-none border border-white shrink-0" data-v-ed6729f8>`);
      } else {
        _push(`<div class="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-50 text-white flex items-center justify-center font-bold text-[10px] shadow-md dark:shadow-none shrink-0" data-v-ed6729f8>${ssrInterpolate(((_d = (_c = unref(user)) == null ? void 0 : _c.name) == null ? void 0 : _d.charAt(0).toUpperCase()) || "U")}</div>`);
      }
      if (!isSidebarCollapsed.value) {
        _push(`<div class="flex-1 min-w-0 overflow-hidden" data-v-ed6729f8><p class="text-[10px] font-bold text-slate-800 dark:text-slate-200 truncate" data-v-ed6729f8>${ssrInterpolate(((_e = unref(user)) == null ? void 0 : _e.name) || _ctx.$t("nav_user_fallback"))}</p><p class="text-[9px] font-bold text-slate-400 truncate uppercase tracking-widest" data-v-ed6729f8>${ssrInterpolate(_ctx.$t("nav_active_account"))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="button" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors shrink-0"${ssrRenderAttr("title", _ctx.$t("nav_logout", "Keluar"))} data-v-ed6729f8>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        name: "logout",
        size: "16",
        "stroke-width": "2.5"
      }, null, _parent));
      _push(`</button></div></div></aside><main class="flex-1 overflow-y-auto relative w-full bg-slate-50/50 dark:bg-slate-950 custom-scrollbar pb-32 md:pb-0 transition-colors duration-500" data-v-ed6729f8><div class="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border-t border-slate-100 dark:border-slate-800 safe-area-pb transition-colors duration-500 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]" data-v-ed6729f8><div class="flex items-center justify-around h-20 px-2 pt-1 pb-2" data-v-ed6729f8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "",
        class: ["flex flex-col items-center justify-center gap-1 transition-all flex-1", _ctx.route().current("dashboard") ? "text-indigo-600" : "text-slate-400"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              name: "dashboard",
              size: 20,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[9px] font-black" data-v-ed6729f8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_dashboard"))}</span>`);
          } else {
            return [
              createVNode(_sfc_main$3, {
                name: "dashboard",
                size: 20,
                "stroke-width": "2.5"
              }),
              createVNode("span", { class: "text-[9px] font-black" }, toDisplayString(_ctx.$t("nav_item_dashboard")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (showModule("habit")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          prefetch: "",
          class: ["flex flex-col items-center justify-center gap-1 transition-all flex-1", _ctx.route().current("habits.*") ? "text-indigo-600" : "text-slate-400"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                name: "habit",
                size: 20,
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-[9px] font-black" data-v-ed6729f8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_habit"))}</span>`);
            } else {
              return [
                createVNode(_sfc_main$3, {
                  name: "habit",
                  size: 20,
                  "stroke-width": "2.5"
                }),
                createVNode("span", { class: "text-[9px] font-black" }, toDisplayString(_ctx.$t("nav_item_habit")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="${ssrRenderClass([!unref(isAiEnabled) && !unref(isExplorer) ? "opacity-40 grayscale" : "", "relative -top-3 lg:-top-5 flex-1 flex flex-col items-center transition-all duration-500"])}" data-v-ed6729f8><div class="w-14 h-14 lg:w-[4.25rem] lg:h-[4.25rem] bg-slate-900 dark:bg-indigo-600 rounded-2xl lg:rounded-[1.75rem] flex items-center justify-center shadow-lg transition-all active:scale-90 border-[4px] border-white dark:border-slate-950 overflow-hidden group" data-v-ed6729f8><div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" data-v-ed6729f8></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        name: "sparkles",
        size: 20,
        class: "text-white relative z-10"
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-1 mt-1" data-v-ed6729f8><span class="text-[8px] font-bold text-indigo-600 dark:text-indigo-400 tracking-tight" data-v-ed6729f8>${ssrInterpolate(unref(isAiEnabled) ? "Neural OS" : "Platinum OS")}</span></div></button>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("more.index"),
        prefetch: "",
        class: ["flex flex-col items-center justify-center gap-1 transition-all flex-1", _ctx.route().current("more.index") ? "text-indigo-600" : "text-slate-400"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              name: "menu",
              size: 20,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[9px] font-black" data-v-ed6729f8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_more"))}</span>`);
          } else {
            return [
              createVNode(_sfc_main$3, {
                name: "menu",
                size: 20,
                "stroke-width": "2.5"
              }),
              createVNode("span", { class: "text-[9px] font-black" }, toDisplayString(_ctx.$t("nav_item_more")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("settings.index"),
        prefetch: "",
        class: ["flex flex-col items-center justify-center gap-1 transition-all flex-1", _ctx.route().current("settings.*") ? "text-indigo-600" : "text-slate-400"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              name: "settings",
              size: 20,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[9px] font-black" data-v-ed6729f8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_settings"))}</span>`);
          } else {
            return [
              createVNode(_sfc_main$3, {
                name: "settings",
                size: 20,
                "stroke-width": "2.5"
              }),
              createVNode("span", { class: "text-[9px] font-black" }, toDisplayString(_ctx.$t("nav_item_settings")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="w-full relative z-0" data-v-ed6729f8>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
      if (showLogoutModal.value) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" data-v-ed6729f8><div class="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm" data-v-ed6729f8></div><div class="relative bg-white dark:bg-slate-900 w-full max-sm rounded-[2.5rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300" data-v-ed6729f8><div class="p-8 text-center" data-v-ed6729f8><div class="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner" data-v-ed6729f8>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          name: "logout",
          size: "40",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</div><h3 class="text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2" data-v-ed6729f8>${ssrInterpolate(_ctx.$t("modal_logout_title", "Keluar Akun?"))}</h3><p class="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed" data-v-ed6729f8>${ssrInterpolate(_ctx.$t("modal_logout_subtitle", "Sesi Anda akan diakhiri."))}</p></div><div class="p-6 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3" data-v-ed6729f8><button class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-600 active:scale-[0.98] transition-all" data-v-ed6729f8>${ssrInterpolate(_ctx.$t("modal_logout_confirm", "Ya, Keluar"))}</button><button class="w-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold py-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-[0.98] transition-all" data-v-ed6729f8>${ssrInterpolate(_ctx.$t("modal_logout_cancel", "Batal"))}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!_ctx.route().current("coach.*")) {
        _push(`<button class="hidden md:block fixed bottom-10 right-10 z-[100] group" data-v-ed6729f8><div class="relative" data-v-ed6729f8><div class="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" data-v-ed6729f8></div><div class="${ssrRenderClass([!unref(isAiEnabled) && !unref(isExplorer) ? "grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" : "", "relative w-16 h-16 bg-slate-900 dark:bg-indigo-600 rounded-[1.8rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 active:scale-95 ring-4 ring-white dark:ring-slate-950 group-hover:ring-indigo-50 dark:group-hover:ring-indigo-500/20 overflow-hidden"])}" data-v-ed6729f8><div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" data-v-ed6729f8></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          name: "sparkles",
          size: "28",
          "stroke-width": "2",
          class: "text-white group-hover:rotate-[20deg] transition-transform duration-500 relative z-10"
        }, null, _parent));
        if (unref(isAiEnabled)) {
          _push(`<span class="absolute top-4 right-4 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse z-20" data-v-ed6729f8></span>`);
        } else {
          _push(`<span class="absolute top-4 right-4 w-2 h-2 bg-indigo-400 border border-white dark:border-slate-900 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.5)] z-20" data-v-ed6729f8></span>`);
        }
        _push(`</div><div class="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-5 py-3 rounded-2xl whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-2xl border border-white/10 flex items-center gap-2" data-v-ed6729f8><span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" data-v-ed6729f8></span> ${ssrInterpolate(_ctx.$t("nav_neural_active"))}</div></div></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(FeatureLockModal, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AuthenticatedLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ed6729f8"]]);
export {
  AuthenticatedLayout as A
};
