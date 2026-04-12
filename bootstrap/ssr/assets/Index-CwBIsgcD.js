import { computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-1GGCUMc2.js";
import { Layers, Search, Zap, ChevronRight, TrendingUp, Target, Gem, BookText, Calendar, Briefcase, Info, LogOut, ShieldCheck, ArrowRight } from "lucide-vue-next";
import { u as useGating } from "./useGating-DZoi6H2L.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BiMr3Mnd.js";
import "./useAppearance-rDoGVD4_.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "dayjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isExplorer, isArchitect, isQuantum, isLegendary, demandAccess } = useGating();
    const handleFeatureClick = (feature, targetRoute) => {
      demandAccess(feature, targetRoute);
    };
    const tierStatus = computed(() => {
      if (isLegendary.value) return "legendary_os";
      if (isQuantum.value) return "quantum_terminal";
      if (isArchitect.value) return "architect_console";
      return "explorer_core";
    });
    const ctaConfig = computed(() => {
      if (isLegendary.value) return null;
      if (isQuantum.value) return {
        label: "Quantum Active",
        title: "Neural access granted.",
        desc: "You are operating within the full Neural Ecosystem.",
        btnText: "Subscription Console",
        route: "billing"
      };
      if (isArchitect.value) return {
        label: "Enhance to Quantum",
        title: "Unlock Synthetic Intelligence.",
        desc: "Access neural forecasting and automated workflow manifest tools.",
        btnText: "Quantum Upgrade",
        route: "billing"
      };
      return {
        label: "Architect Tier",
        title: "Design Without Limits.",
        desc: "Unlock the Platinum Suite and the high-performance ecosystem.",
        btnText: "Initiate Upgrade",
        route: "billing"
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("nav_more")
      }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-white dark:bg-slate-950 pb-40 transition-colors duration-500"${_scopeId}><div class="max-w-[700px] mx-auto pt-20 md:pt-32 px-6"${_scopeId}><div class="mb-16"${_scopeId}><div class="flex items-center gap-3 mb-6"${_scopeId}><div class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Layers), { size: 16 }, null, _parent2, _scopeId));
            _push2(`</div><p class="text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-[0.4em] text-[8px]"${_scopeId}>${ssrInterpolate(_ctx.$t(tierStatus.value))}</p></div><h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4"${_scopeId}>${ssrInterpolate(_ctx.$t("more_launcher_title"))}</h1><p class="text-sm font-bold text-slate-400 uppercase tracking-widest"${_scopeId}>${ssrInterpolate(_ctx.$t("more_launcher_subtitle"))}</p></div><div class="mb-16"${_scopeId}><div class="bg-indigo-50/30 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl flex items-center px-4 py-3 group focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), {
              size: 18,
              class: "text-slate-300 mr-3"
            }, null, _parent2, _scopeId));
            _push2(`<input type="text"${ssrRenderAttr("placeholder", _ctx.$t("quick_find"))} class="bg-transparent border-none focus:ring-0 w-full text-sm font-bold text-slate-600 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-700 uppercase tracking-widest"${_scopeId}><div class="ml-auto flex items-center gap-1 opacity-20 hidden sm:flex"${_scopeId}><span class="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px]"${_scopeId}>CMD</span><span class="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px]"${_scopeId}>K</span></div></div></div><div class="space-y-16"${_scopeId}><section${_scopeId}><div class="flex items-center gap-3 mb-8 px-1"${_scopeId}><div class="w-1 h-3 bg-indigo-500 rounded-full"${_scopeId}></div><h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]"${_scopeId}>${ssrInterpolate(_ctx.$t("section_architecture"))}</h2></div><div class="space-y-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("planner.index"),
              class: "group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-5"${_scopeId2}><div class="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-sm"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Zap), {
                    size: 20,
                    "stroke-width": "2.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight"${_scopeId2}>${ssrInterpolate(_ctx.$t("feature_planner_title"))}</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5"${_scopeId2}>${ssrInterpolate(_ctx.$t("feature_planner_desc"))}</p></div></div>`);
                  _push3(ssrRenderComponent(unref(ChevronRight), {
                    size: 16,
                    class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-5" }, [
                      createVNode("div", { class: "w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-sm" }, [
                        createVNode(unref(Zap), {
                          size: 20,
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "font-black text-slate-800 dark:text-white text-sm tracking-tight" }, toDisplayString(_ctx.$t("feature_planner_title")), 1),
                        createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5" }, toDisplayString(_ctx.$t("feature_planner_desc")), 1)
                      ])
                    ]),
                    createVNode(unref(ChevronRight), {
                      size: 16,
                      class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("finance.index"),
              class: "group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-5"${_scopeId2}><div class="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TrendingUp), {
                    size: 20,
                    "stroke-width": "2.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight"${_scopeId2}>${ssrInterpolate(_ctx.$t("feature_finance_title"))}</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5"${_scopeId2}>${ssrInterpolate(_ctx.$t("feature_finance_desc"))}</p></div></div>`);
                  _push3(ssrRenderComponent(unref(ChevronRight), {
                    size: 16,
                    class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-5" }, [
                      createVNode("div", { class: "w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm" }, [
                        createVNode(unref(TrendingUp), {
                          size: 20,
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "font-black text-slate-800 dark:text-white text-sm tracking-tight" }, toDisplayString(_ctx.$t("feature_finance_title")), 1),
                        createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5" }, toDisplayString(_ctx.$t("feature_finance_desc")), 1)
                      ])
                    ]),
                    createVNode(unref(ChevronRight), {
                      size: 16,
                      class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"${_scopeId}><div class="flex items-center gap-5"${_scopeId}><div class="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Target), {
              size: 20,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("feature_goal_title"))}</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5"${_scopeId}>${ssrInterpolate(_ctx.$t("feature_goal_desc"))}</p></div></div><div class="flex items-center gap-3"${_scopeId}>`);
            if (unref(isExplorer)) {
              _push2(ssrRenderComponent(unref(Gem), {
                size: 12,
                class: "text-amber-500 opacity-30"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(ChevronRight), {
              size: 16,
              class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></section><section${_scopeId}><div class="flex items-center gap-3 mb-8 px-1"${_scopeId}><div class="w-1 h-3 bg-rose-500 rounded-full"${_scopeId}></div><h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]"${_scopeId}>${ssrInterpolate(_ctx.$t("section_manifestation"))}</h2></div><div class="space-y-1"${_scopeId}><div class="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"${_scopeId}><div class="flex items-center gap-5"${_scopeId}><div class="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(BookText), {
              size: 20,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("feature_journal_title"))}</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5"${_scopeId}>${ssrInterpolate(_ctx.$t("feature_journal_desc"))}</p></div></div><div class="flex items-center gap-3"${_scopeId}>`);
            if (unref(isExplorer)) {
              _push2(ssrRenderComponent(unref(Gem), {
                size: 12,
                class: "text-rose-500 opacity-30"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(ChevronRight), {
              size: 16,
              class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"${_scopeId}><div class="flex items-center gap-5"${_scopeId}><div class="w-11 h-11 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shadow-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), {
              size: 20,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("feature_calendar_title"))}</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5"${_scopeId}>${ssrInterpolate(_ctx.$t("feature_calendar_desc"))}</p></div></div><div class="flex items-center gap-3"${_scopeId}>`);
            if (unref(isExplorer)) {
              _push2(ssrRenderComponent(unref(Gem), {
                size: 12,
                class: "text-violet-500 opacity-30"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(ChevronRight), {
              size: 16,
              class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"${_scopeId}><div class="flex items-center gap-5"${_scopeId}><div class="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Briefcase), {
              size: 20,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("feature_job_title"))}</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5"${_scopeId}>${ssrInterpolate(_ctx.$t("feature_job_desc"))}</p></div></div><div class="flex items-center gap-3"${_scopeId}>`);
            if (unref(isExplorer)) {
              _push2(ssrRenderComponent(unref(Gem), {
                size: 12,
                class: "text-blue-500 opacity-30"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(ChevronRight), {
              size: 16,
              class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></section><section${_scopeId}><div class="flex items-center gap-3 mb-8 px-1"${_scopeId}><div class="w-1 h-3 bg-slate-300 dark:bg-slate-700 rounded-full"${_scopeId}></div><h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]"${_scopeId}>${ssrInterpolate(_ctx.$t("section_system"))}</h2></div><div class="grid grid-cols-1 md:grid-cols-2 gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("billing"),
              class: "group flex items-center gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Gem), {
                    size: 18,
                    class: "text-indigo-400"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest"${_scopeId2}>${ssrInterpolate(_ctx.$t("sys_billing_title"))}</span>`);
                } else {
                  return [
                    createVNode(unref(Gem), {
                      size: 18,
                      class: "text-indigo-400"
                    }),
                    createVNode("span", { class: "text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest" }, toDisplayString(_ctx.$t("sys_billing_title")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("about"),
              class: "group flex items-center gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Info), {
                    size: 18,
                    class: "text-slate-400"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest"${_scopeId2}>${ssrInterpolate(_ctx.$t("sys_help_title"))}</span>`);
                } else {
                  return [
                    createVNode(unref(Info), {
                      size: 18,
                      class: "text-slate-400"
                    }),
                    createVNode("span", { class: "text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest" }, toDisplayString(_ctx.$t("sys_help_title")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "group flex items-center gap-4 p-5 rounded-2xl bg-rose-50 dark:bg-rose-500/5 border border-rose-100/50 dark:border-rose-500/10 transition-all hover:bg-rose-100 dark:hover:bg-rose-500/10 text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(LogOut), {
                    size: 18,
                    class: "text-rose-400"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-[10px] font-black text-rose-500 uppercase tracking-widest"${_scopeId2}>${ssrInterpolate(_ctx.$t("sys_logout_title"))}</span>`);
                } else {
                  return [
                    createVNode(unref(LogOut), {
                      size: 18,
                      class: "text-rose-400"
                    }),
                    createVNode("span", { class: "text-[10px] font-black text-rose-500 uppercase tracking-widest" }, toDisplayString(_ctx.$t("sys_logout_title")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></section></div>`);
            if (ctaConfig.value) {
              _push2(`<div class="mt-24 pt-12 border-t border-slate-100 dark:border-white/5"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route(ctaConfig.value.route),
                class: "group block p-8 rounded-[2.5rem] bg-slate-900 dark:bg-indigo-950 border border-white/5 relative overflow-hidden shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-1000"${_scopeId2}></div><div class="relative z-10"${_scopeId2}><div class="flex items-center gap-2 mb-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ShieldCheck), {
                      size: 14,
                      class: "text-indigo-400"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest"${_scopeId2}>${ssrInterpolate(ctaConfig.value.label)}</span></div><h3 class="text-2xl font-black text-white tracking-tight mb-2 leading-tight max-w-xs"${_scopeId2}>${ssrInterpolate(ctaConfig.value.title)}</h3><p class="text-xs font-bold text-slate-500 mb-8 max-w-xs leading-relaxed"${_scopeId2}>${ssrInterpolate(ctaConfig.value.desc)}</p><div class="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md"${_scopeId2}>${ssrInterpolate(ctaConfig.value.btnText)} `);
                    _push3(ssrRenderComponent(unref(ArrowRight), {
                      size: 14,
                      class: "group-hover:translate-x-1 transition-transform"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-1000" }),
                      createVNode("div", { class: "relative z-10" }, [
                        createVNode("div", { class: "flex items-center gap-2 mb-6" }, [
                          createVNode(unref(ShieldCheck), {
                            size: 14,
                            class: "text-indigo-400"
                          }),
                          createVNode("span", { class: "text-[9px] font-black text-indigo-400 uppercase tracking-widest" }, toDisplayString(ctaConfig.value.label), 1)
                        ]),
                        createVNode("h3", { class: "text-2xl font-black text-white tracking-tight mb-2 leading-tight max-w-xs" }, toDisplayString(ctaConfig.value.title), 1),
                        createVNode("p", { class: "text-xs font-bold text-slate-500 mb-8 max-w-xs leading-relaxed" }, toDisplayString(ctaConfig.value.desc), 1),
                        createVNode("div", { class: "inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md" }, [
                          createTextVNode(toDisplayString(ctaConfig.value.btnText) + " ", 1),
                          createVNode(unref(ArrowRight), {
                            size: 14,
                            class: "group-hover:translate-x-1 transition-transform"
                          })
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-24 pb-20 flex flex-col items-center opacity-10"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "logo",
              size: "32",
              class: "grayscale mb-4"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-[10px] font-black uppercase tracking-[0.5em]"${_scopeId}>OneForMind OS</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-white dark:bg-slate-950 pb-40 transition-colors duration-500" }, [
                createVNode("div", { class: "max-w-[700px] mx-auto pt-20 md:pt-32 px-6" }, [
                  createVNode("div", { class: "mb-16" }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-6" }, [
                      createVNode("div", { class: "w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500" }, [
                        createVNode(unref(Layers), { size: 16 })
                      ]),
                      createVNode("p", { class: "text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-[0.4em] text-[8px]" }, toDisplayString(_ctx.$t(tierStatus.value)), 1)
                    ]),
                    createVNode("h1", { class: "text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4" }, toDisplayString(_ctx.$t("more_launcher_title")), 1),
                    createVNode("p", { class: "text-sm font-bold text-slate-400 uppercase tracking-widest" }, toDisplayString(_ctx.$t("more_launcher_subtitle")), 1)
                  ]),
                  createVNode("div", { class: "mb-16" }, [
                    createVNode("div", { class: "bg-indigo-50/30 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl flex items-center px-4 py-3 group focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all" }, [
                      createVNode(unref(Search), {
                        size: 18,
                        class: "text-slate-300 mr-3"
                      }),
                      createVNode("input", {
                        type: "text",
                        placeholder: _ctx.$t("quick_find"),
                        class: "bg-transparent border-none focus:ring-0 w-full text-sm font-bold text-slate-600 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-700 uppercase tracking-widest"
                      }, null, 8, ["placeholder"]),
                      createVNode("div", { class: "ml-auto flex items-center gap-1 opacity-20 hidden sm:flex" }, [
                        createVNode("span", { class: "bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px]" }, "CMD"),
                        createVNode("span", { class: "bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px]" }, "K")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-16" }, [
                    createVNode("section", null, [
                      createVNode("div", { class: "flex items-center gap-3 mb-8 px-1" }, [
                        createVNode("div", { class: "w-1 h-3 bg-indigo-500 rounded-full" }),
                        createVNode("h2", { class: "text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]" }, toDisplayString(_ctx.$t("section_architecture")), 1)
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("planner.index"),
                          class: "group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-5" }, [
                              createVNode("div", { class: "w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-sm" }, [
                                createVNode(unref(Zap), {
                                  size: 20,
                                  "stroke-width": "2.5"
                                })
                              ]),
                              createVNode("div", null, [
                                createVNode("h4", { class: "font-black text-slate-800 dark:text-white text-sm tracking-tight" }, toDisplayString(_ctx.$t("feature_planner_title")), 1),
                                createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5" }, toDisplayString(_ctx.$t("feature_planner_desc")), 1)
                              ])
                            ]),
                            createVNode(unref(ChevronRight), {
                              size: 16,
                              class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
                            })
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("finance.index"),
                          class: "group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-5" }, [
                              createVNode("div", { class: "w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm" }, [
                                createVNode(unref(TrendingUp), {
                                  size: 20,
                                  "stroke-width": "2.5"
                                })
                              ]),
                              createVNode("div", null, [
                                createVNode("h4", { class: "font-black text-slate-800 dark:text-white text-sm tracking-tight" }, toDisplayString(_ctx.$t("feature_finance_title")), 1),
                                createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5" }, toDisplayString(_ctx.$t("feature_finance_desc")), 1)
                              ])
                            ]),
                            createVNode(unref(ChevronRight), {
                              size: 16,
                              class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
                            })
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("div", {
                          onClick: ($event) => handleFeatureClick("goal", _ctx.route("goals.index")),
                          class: "group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"
                        }, [
                          createVNode("div", { class: "flex items-center gap-5" }, [
                            createVNode("div", { class: "w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm" }, [
                              createVNode(unref(Target), {
                                size: 20,
                                "stroke-width": "2.5"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "font-black text-slate-800 dark:text-white text-sm tracking-tight" }, toDisplayString(_ctx.$t("feature_goal_title")), 1),
                              createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5" }, toDisplayString(_ctx.$t("feature_goal_desc")), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            unref(isExplorer) ? (openBlock(), createBlock(unref(Gem), {
                              key: 0,
                              size: 12,
                              class: "text-amber-500 opacity-30"
                            })) : createCommentVNode("", true),
                            createVNode(unref(ChevronRight), {
                              size: 16,
                              class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
                            })
                          ])
                        ], 8, ["onClick"])
                      ])
                    ]),
                    createVNode("section", null, [
                      createVNode("div", { class: "flex items-center gap-3 mb-8 px-1" }, [
                        createVNode("div", { class: "w-1 h-3 bg-rose-500 rounded-full" }),
                        createVNode("h2", { class: "text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]" }, toDisplayString(_ctx.$t("section_manifestation")), 1)
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("div", {
                          onClick: ($event) => handleFeatureClick("journal", _ctx.route("journal.index")),
                          class: "group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"
                        }, [
                          createVNode("div", { class: "flex items-center gap-5" }, [
                            createVNode("div", { class: "w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-sm" }, [
                              createVNode(unref(BookText), {
                                size: 20,
                                "stroke-width": "2.5"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "font-black text-slate-800 dark:text-white text-sm tracking-tight" }, toDisplayString(_ctx.$t("feature_journal_title")), 1),
                              createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5" }, toDisplayString(_ctx.$t("feature_journal_desc")), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            unref(isExplorer) ? (openBlock(), createBlock(unref(Gem), {
                              key: 0,
                              size: 12,
                              class: "text-rose-500 opacity-30"
                            })) : createCommentVNode("", true),
                            createVNode(unref(ChevronRight), {
                              size: 16,
                              class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
                            })
                          ])
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          onClick: ($event) => handleFeatureClick("calendar", _ctx.route("calendar.index")),
                          class: "group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"
                        }, [
                          createVNode("div", { class: "flex items-center gap-5" }, [
                            createVNode("div", { class: "w-11 h-11 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shadow-sm" }, [
                              createVNode(unref(Calendar), {
                                size: 20,
                                "stroke-width": "2.5"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "font-black text-slate-800 dark:text-white text-sm tracking-tight" }, toDisplayString(_ctx.$t("feature_calendar_title")), 1),
                              createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5" }, toDisplayString(_ctx.$t("feature_calendar_desc")), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            unref(isExplorer) ? (openBlock(), createBlock(unref(Gem), {
                              key: 0,
                              size: 12,
                              class: "text-violet-500 opacity-30"
                            })) : createCommentVNode("", true),
                            createVNode(unref(ChevronRight), {
                              size: 16,
                              class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
                            })
                          ])
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          onClick: ($event) => handleFeatureClick("job", _ctx.route("jobs.index")),
                          class: "group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"
                        }, [
                          createVNode("div", { class: "flex items-center gap-5" }, [
                            createVNode("div", { class: "w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm" }, [
                              createVNode(unref(Briefcase), {
                                size: 20,
                                "stroke-width": "2.5"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "font-black text-slate-800 dark:text-white text-sm tracking-tight" }, toDisplayString(_ctx.$t("feature_job_title")), 1),
                              createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5" }, toDisplayString(_ctx.$t("feature_job_desc")), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            unref(isExplorer) ? (openBlock(), createBlock(unref(Gem), {
                              key: 0,
                              size: 12,
                              class: "text-blue-500 opacity-30"
                            })) : createCommentVNode("", true),
                            createVNode(unref(ChevronRight), {
                              size: 16,
                              class: "text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all"
                            })
                          ])
                        ], 8, ["onClick"])
                      ])
                    ]),
                    createVNode("section", null, [
                      createVNode("div", { class: "flex items-center gap-3 mb-8 px-1" }, [
                        createVNode("div", { class: "w-1 h-3 bg-slate-300 dark:bg-slate-700 rounded-full" }),
                        createVNode("h2", { class: "text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]" }, toDisplayString(_ctx.$t("section_system")), 1)
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("billing"),
                          class: "group flex items-center gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Gem), {
                              size: 18,
                              class: "text-indigo-400"
                            }),
                            createVNode("span", { class: "text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest" }, toDisplayString(_ctx.$t("sys_billing_title")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("about"),
                          class: "group flex items-center gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Info), {
                              size: 18,
                              class: "text-slate-400"
                            }),
                            createVNode("span", { class: "text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest" }, toDisplayString(_ctx.$t("sys_help_title")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("logout"),
                          method: "post",
                          as: "button",
                          class: "group flex items-center gap-4 p-5 rounded-2xl bg-rose-50 dark:bg-rose-500/5 border border-rose-100/50 dark:border-rose-500/10 transition-all hover:bg-rose-100 dark:hover:bg-rose-500/10 text-left"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(LogOut), {
                              size: 18,
                              class: "text-rose-400"
                            }),
                            createVNode("span", { class: "text-[10px] font-black text-rose-500 uppercase tracking-widest" }, toDisplayString(_ctx.$t("sys_logout_title")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ]),
                  ctaConfig.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-24 pt-12 border-t border-slate-100 dark:border-white/5"
                  }, [
                    createVNode(unref(Link), {
                      href: _ctx.route(ctaConfig.value.route),
                      class: "group block p-8 rounded-[2.5rem] bg-slate-900 dark:bg-indigo-950 border border-white/5 relative overflow-hidden shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-1000" }),
                        createVNode("div", { class: "relative z-10" }, [
                          createVNode("div", { class: "flex items-center gap-2 mb-6" }, [
                            createVNode(unref(ShieldCheck), {
                              size: 14,
                              class: "text-indigo-400"
                            }),
                            createVNode("span", { class: "text-[9px] font-black text-indigo-400 uppercase tracking-widest" }, toDisplayString(ctaConfig.value.label), 1)
                          ]),
                          createVNode("h3", { class: "text-2xl font-black text-white tracking-tight mb-2 leading-tight max-w-xs" }, toDisplayString(ctaConfig.value.title), 1),
                          createVNode("p", { class: "text-xs font-bold text-slate-500 mb-8 max-w-xs leading-relaxed" }, toDisplayString(ctaConfig.value.desc), 1),
                          createVNode("div", { class: "inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md" }, [
                            createTextVNode(toDisplayString(ctaConfig.value.btnText) + " ", 1),
                            createVNode(unref(ArrowRight), {
                              size: 14,
                              class: "group-hover:translate-x-1 transition-transform"
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "mt-24 pb-20 flex flex-col items-center opacity-10" }, [
                    createVNode(_sfc_main$1, {
                      name: "logo",
                      size: "32",
                      class: "grayscale mb-4"
                    }),
                    createVNode("p", { class: "text-[10px] font-black uppercase tracking-[0.5em]" }, "OneForMind OS")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/More/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
