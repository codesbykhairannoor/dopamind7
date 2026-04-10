import { ref, computed, withCtx, unref, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BhDMLeZe.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import { _ as _sfc_main$2 } from "./PremiumPreviewModal-BdH6vUzw.js";
import { Gem, Target, Sparkles, BookText, Calendar, Briefcase, Settings, ArrowRight, ShieldCheck } from "lucide-vue-next";
import { u as useGating } from "./useGating-CUAohe3T.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ThemeToggle-ByQSx4Ee.js";
import "./useAppearance-rDoGVD4_.js";
import "dayjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isExplorer, isArchitect, isQuantum, isLegendary, canUse } = useGating();
    const isPreviewOpen = ref(false);
    const activePreviewModule = ref("Journal");
    const handleFeatureClick = (feature, targetRoute, moduleKey) => {
      if (canUse(feature)) {
        router.visit(targetRoute);
      } else {
        activePreviewModule.value = moduleKey;
        isPreviewOpen.value = true;
      }
    };
    const ctaConfig = computed(() => {
      if (isLegendary.value) return null;
      if (isQuantum.value) return {
        label: "Quantum Status Active",
        title: "Neural access granted.",
        desc: "You have full access to the OneForMind Neural Ecosystem.",
        btnText: "Manage Subscription",
        route: "billing"
      };
      if (isArchitect.value) return {
        label: "Upgrade to Quantum",
        title: "Unlock Neural Power.",
        desc: "Access AI-powered insights, neural forecasting, and automated manifest tools.",
        btnText: "Get Quantum Access",
        route: "billing"
      };
      return {
        label: "Become an Architect",
        title: "Desain Hidup Tanpa Batas.",
        desc: "Buka akses ke Platinum Suite dan ekosistem performa tinggi.",
        btnText: "Join the Elite Tier",
        route: "billing"
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AuthenticatedLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 animate-in fade-in duration-700 px-6 transition-colors duration-500" data-v-d60046ce${_scopeId}><div class="pt-16 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6" data-v-d60046ce${_scopeId}><div data-v-d60046ce${_scopeId}><div class="flex items-center gap-2 mb-3" data-v-d60046ce${_scopeId}><span class="w-8 h-[2px] bg-indigo-500 rounded-full" data-v-d60046ce${_scopeId}></span><p class="text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-[0.3em] text-[9px]" data-v-d60046ce${_scopeId}>${ssrInterpolate(unref(isLegendary) ? "Legendary OS" : unref(isQuantum) ? "Quantum OS" : unref(isArchitect) ? "Architect OS" : "Explorer OS")}</p></div><h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-500" data-v-d60046ce${_scopeId}> Universal Terminal </h1></div>`);
            if (unref(isLegendary)) {
              _push2(`<div class="flex items-center gap-3 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md cursor-default group" data-v-d60046ce${_scopeId}><div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-transform group-hover:scale-110" data-v-d60046ce${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Gem), {
                size: 20,
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="text-left" data-v-d60046ce${_scopeId}><p class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1" data-v-d60046ce${_scopeId}>Lifetime</p><p class="text-xs font-black text-slate-800 dark:text-white leading-none" data-v-d60046ce${_scopeId}>Legendary Tier</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-10" data-v-d60046ce${_scopeId}><div data-v-d60046ce${_scopeId}><div class="px-1 mb-5 flex items-center justify-between" data-v-d60046ce${_scopeId}><span class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2" data-v-d60046ce${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Target), { size: 12 }, null, _parent2, _scopeId));
            _push2(` Productivity Essentials </span></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-d60046ce${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("habits.index"),
              class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="absolute -right-4 -bottom-4 text-indigo-500/5 group-hover:scale-150 transition-transform duration-700" data-v-d60046ce${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    name: "habit",
                    size: "80"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-50 transition-all duration-300 relative z-10" data-v-d60046ce${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    name: "habit",
                    size: "24",
                    "stroke-width": "2.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="relative z-10" data-v-d60046ce${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1" data-v-d60046ce${_scopeId2}>Habits</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500" data-v-d60046ce${_scopeId2}>Architecture</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "absolute -right-4 -bottom-4 text-indigo-500/5 group-hover:scale-150 transition-transform duration-700" }, [
                      createVNode(_sfc_main$1, {
                        name: "habit",
                        size: "80"
                      })
                    ]),
                    createVNode("div", { class: "w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-50 transition-all duration-300 relative z-10" }, [
                      createVNode(_sfc_main$1, {
                        name: "habit",
                        size: "24",
                        "stroke-width": "2.5"
                      })
                    ]),
                    createVNode("div", { class: "relative z-10" }, [
                      createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1" }, "Habits"),
                      createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500" }, "Architecture")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("planner.index"),
              class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-150 transition-transform duration-700" data-v-d60046ce${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    name: "planner",
                    size: "80"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 dark:group-hover:bg-purple-50 transition-all duration-300 relative z-10" data-v-d60046ce${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    name: "planner",
                    size: "24",
                    "stroke-width": "2.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="relative z-10" data-v-d60046ce${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1" data-v-d60046ce${_scopeId2}>Planner</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500" data-v-d60046ce${_scopeId2}>Daily Flow</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-150 transition-transform duration-700" }, [
                      createVNode(_sfc_main$1, {
                        name: "planner",
                        size: "80"
                      })
                    ]),
                    createVNode("div", { class: "w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 dark:group-hover:bg-purple-50 transition-all duration-300 relative z-10" }, [
                      createVNode(_sfc_main$1, {
                        name: "planner",
                        size: "24",
                        "stroke-width": "2.5"
                      })
                    ]),
                    createVNode("div", { class: "relative z-10" }, [
                      createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1" }, "Planner"),
                      createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500" }, "Daily Flow")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("finance.index"),
              class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="absolute -right-4 -bottom-4 text-emerald-500/5 group-hover:scale-150 transition-transform duration-700" data-v-d60046ce${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    name: "finance",
                    size: "80"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-50 transition-all duration-300 relative z-10" data-v-d60046ce${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    name: "finance",
                    size: "24",
                    "stroke-width": "2.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="relative z-10" data-v-d60046ce${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1" data-v-d60046ce${_scopeId2}>Finance</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500" data-v-d60046ce${_scopeId2}>Asset Control</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "absolute -right-4 -bottom-4 text-emerald-500/5 group-hover:scale-150 transition-transform duration-700" }, [
                      createVNode(_sfc_main$1, {
                        name: "finance",
                        size: "80"
                      })
                    ]),
                    createVNode("div", { class: "w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-50 transition-all duration-300 relative z-10" }, [
                      createVNode(_sfc_main$1, {
                        name: "finance",
                        size: "24",
                        "stroke-width": "2.5"
                      })
                    ]),
                    createVNode("div", { class: "relative z-10" }, [
                      createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1" }, "Finance"),
                      createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500" }, "Asset Control")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative cursor-pointer" data-v-d60046ce${_scopeId}>`);
            if (unref(isExplorer)) {
              _push2(`<div class="absolute top-4 right-4 text-amber-500/40" data-v-d60046ce${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Gem), { size: 14 }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="absolute -right-4 -bottom-4 text-amber-500/5 group-hover:scale-150 transition-transform duration-700" data-v-d60046ce${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "goal",
              size: "80"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 dark:group-hover:bg-amber-50 transition-all duration-300 relative z-10" data-v-d60046ce${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "goal",
              size: "24",
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative z-10" data-v-d60046ce${_scopeId}><span class="block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1" data-v-d60046ce${_scopeId}>Goal Lab</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500" data-v-d60046ce${_scopeId}>Strategic Target</span></div></div></div></div><div data-v-d60046ce${_scopeId}><div class="px-1 mb-5 flex items-center justify-between" data-v-d60046ce${_scopeId}><span class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2" data-v-d60046ce${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Sparkles), { size: 12 }, null, _parent2, _scopeId));
            _push2(` Platinum Extensions </span></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-4" data-v-d60046ce${_scopeId}><div class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all cursor-pointer group active:scale-95" data-v-d60046ce${_scopeId}><div class="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" data-v-d60046ce${_scopeId}>`);
            _push2(ssrRenderComponent(unref(BookText), { size: 20 }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-d60046ce${_scopeId}><h4 class="text-sm font-black text-slate-800 dark:text-white leading-none mb-1" data-v-d60046ce${_scopeId}>Journal</h4><p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest" data-v-d60046ce${_scopeId}>Self Review</p></div>`);
            if (unref(isExplorer)) {
              _push2(`<div class="ml-auto opacity-30" data-v-d60046ce${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Gem), { size: 12 }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all cursor-pointer group active:scale-95" data-v-d60046ce${_scopeId}><div class="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" data-v-d60046ce${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { size: 20 }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-d60046ce${_scopeId}><h4 class="text-sm font-black text-slate-800 dark:text-white leading-none mb-1" data-v-d60046ce${_scopeId}>Schedule</h4><p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest" data-v-d60046ce${_scopeId}>Master Plan</p></div>`);
            if (unref(isExplorer)) {
              _push2(`<div class="ml-auto opacity-30" data-v-d60046ce${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Gem), { size: 12 }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all cursor-pointer group active:scale-95" data-v-d60046ce${_scopeId}><div class="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" data-v-d60046ce${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Briefcase), { size: 20 }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-d60046ce${_scopeId}><h4 class="text-sm font-black text-slate-800 dark:text-white leading-none mb-1" data-v-d60046ce${_scopeId}>Career</h4><p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest" data-v-d60046ce${_scopeId}>Job Tracker</p></div>`);
            if (unref(isExplorer)) {
              _push2(`<div class="ml-auto opacity-30" data-v-d60046ce${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Gem), { size: 12 }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("profile.edit"),
              class: "bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all group active:scale-95"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-12 h-12 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 dark:group-hover:bg-white dark:group-hover:text-slate-900 group-hover:text-white transition-all" data-v-d60046ce${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Settings), { size: 20 }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-d60046ce${_scopeId2}><h4 class="text-sm font-black text-slate-800 dark:text-white leading-none mb-1" data-v-d60046ce${_scopeId2}>Settings</h4><p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest" data-v-d60046ce${_scopeId2}>Configuration</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-12 h-12 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 dark:group-hover:bg-white dark:group-hover:text-slate-900 group-hover:text-white transition-all" }, [
                      createVNode(unref(Settings), { size: 20 })
                    ]),
                    createVNode("div", null, [
                      createVNode("h4", { class: "text-sm font-black text-slate-800 dark:text-white leading-none mb-1" }, "Settings"),
                      createVNode("p", { class: "text-[9px] font-bold text-slate-400 uppercase tracking-widest" }, "Configuration")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (ctaConfig.value) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route(ctaConfig.value.route),
                class: "bg-slate-900 dark:bg-indigo-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group active:scale-[0.98] transition-all duration-500 block border border-white/5"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-br from-indigo-600/30 via-transparent to-transparent opacity-60" data-v-d60046ce${_scopeId2}></div><div class="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" data-v-d60046ce${_scopeId2}></div><div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10" data-v-d60046ce${_scopeId2}><div class="max-w-xl" data-v-d60046ce${_scopeId2}><div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-black mb-6 uppercase tracking-[0.2em] backdrop-blur-md border border-indigo-500/30 animate-pulse" data-v-d60046ce${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Sparkles), { size: 12 }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-d60046ce${_scopeId2}>${ssrInterpolate(ctaConfig.value.label)}</span></div><h4 class="text-3xl md:text-4xl font-black mb-4 tracking-tighter leading-tight group-hover:translate-x-1 transition-transform" data-v-d60046ce${_scopeId2}>${ssrInterpolate(ctaConfig.value.title)}</h4><p class="text-indigo-200/60 text-sm font-bold leading-relaxed" data-v-d60046ce${_scopeId2}>${ssrInterpolate(ctaConfig.value.desc)}</p></div><div class="flex flex-col gap-4 shrink-0" data-v-d60046ce${_scopeId2}><div class="flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-[1.8rem] font-black text-sm shadow-2xl hover:bg-indigo-50 transition-all duration-300" data-v-d60046ce${_scopeId2}>${ssrInterpolate(ctaConfig.value.btnText)} `);
                    _push3(ssrRenderComponent(unref(ArrowRight), {
                      size: 18,
                      "stroke-width": "3",
                      class: "group-hover:translate-x-2 transition-transform duration-500"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "absolute inset-x-0 bottom-0 top-0 bg-gradient-to-br from-indigo-600/30 via-transparent to-transparent opacity-60" }),
                      createVNode("div", { class: "absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" }),
                      createVNode("div", { class: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10" }, [
                        createVNode("div", { class: "max-w-xl" }, [
                          createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-black mb-6 uppercase tracking-[0.2em] backdrop-blur-md border border-indigo-500/30 animate-pulse" }, [
                            createVNode(unref(Sparkles), { size: 12 }),
                            createVNode("span", null, toDisplayString(ctaConfig.value.label), 1)
                          ]),
                          createVNode("h4", { class: "text-3xl md:text-4xl font-black mb-4 tracking-tighter leading-tight group-hover:translate-x-1 transition-transform" }, toDisplayString(ctaConfig.value.title), 1),
                          createVNode("p", { class: "text-indigo-200/60 text-sm font-bold leading-relaxed" }, toDisplayString(ctaConfig.value.desc), 1)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-4 shrink-0" }, [
                          createVNode("div", { class: "flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-[1.8rem] font-black text-sm shadow-2xl hover:bg-indigo-50 transition-all duration-300" }, [
                            createTextVNode(toDisplayString(ctaConfig.value.btnText) + " ", 1),
                            createVNode(unref(ArrowRight), {
                              size: 18,
                              "stroke-width": "3",
                              class: "group-hover:translate-x-2 transition-transform duration-500"
                            })
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<div class="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border-2 border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group transition-all duration-500 flex flex-col items-center text-center" data-v-d60046ce${_scopeId}><div class="absolute inset-0 bg-gradient-to-b from-indigo-50/50 dark:from-indigo-500/5 to-transparent" data-v-d60046ce${_scopeId}></div><div class="relative z-10" data-v-d60046ce${_scopeId}><div class="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-indigo-200 dark:shadow-none mx-auto rotate-12 group-hover:rotate-0 transition-transform duration-700" data-v-d60046ce${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ShieldCheck), {
                size: 40,
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] mb-3" data-v-d60046ce${_scopeId}>Priority Protocol Active</p><h4 class="text-3xl font-black text-slate-800 dark:text-white mb-4 tracking-tight" data-v-d60046ce${_scopeId}>Access Granted, Legendary.</h4><p class="text-sm font-bold text-slate-400 dark:text-slate-500 max-w-sm mx-auto leading-relaxed" data-v-d60046ce${_scopeId}> You are operating at the highest architectural tier. Your lifecycle access is secured indefinitely. </p></div></div>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              isOpen: isPreviewOpen.value,
              module: activePreviewModule.value,
              onClose: ($event) => isPreviewOpen.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 animate-in fade-in duration-700 px-6 transition-colors duration-500" }, [
                createVNode("div", { class: "pt-16 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6" }, [
                  createVNode("div", null, [
                    createVNode("div", { class: "flex items-center gap-2 mb-3" }, [
                      createVNode("span", { class: "w-8 h-[2px] bg-indigo-500 rounded-full" }),
                      createVNode("p", { class: "text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-[0.3em] text-[9px]" }, toDisplayString(unref(isLegendary) ? "Legendary OS" : unref(isQuantum) ? "Quantum OS" : unref(isArchitect) ? "Architect OS" : "Explorer OS"), 1)
                    ]),
                    createVNode("h1", { class: "text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-500" }, " Universal Terminal ")
                  ]),
                  unref(isLegendary) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center gap-3 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md cursor-default group"
                  }, [
                    createVNode("div", { class: "w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-transform group-hover:scale-110" }, [
                      createVNode(unref(Gem), {
                        size: 20,
                        "stroke-width": "2.5"
                      })
                    ]),
                    createVNode("div", { class: "text-left" }, [
                      createVNode("p", { class: "text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1" }, "Lifetime"),
                      createVNode("p", { class: "text-xs font-black text-slate-800 dark:text-white leading-none" }, "Legendary Tier")
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "space-y-10" }, [
                  createVNode("div", null, [
                    createVNode("div", { class: "px-1 mb-5 flex items-center justify-between" }, [
                      createVNode("span", { class: "text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2" }, [
                        createVNode(unref(Target), { size: 12 }),
                        createTextVNode(" Productivity Essentials ")
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("habits.index"),
                        class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "absolute -right-4 -bottom-4 text-indigo-500/5 group-hover:scale-150 transition-transform duration-700" }, [
                            createVNode(_sfc_main$1, {
                              name: "habit",
                              size: "80"
                            })
                          ]),
                          createVNode("div", { class: "w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-50 transition-all duration-300 relative z-10" }, [
                            createVNode(_sfc_main$1, {
                              name: "habit",
                              size: "24",
                              "stroke-width": "2.5"
                            })
                          ]),
                          createVNode("div", { class: "relative z-10" }, [
                            createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1" }, "Habits"),
                            createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500" }, "Architecture")
                          ])
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("planner.index"),
                        class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-150 transition-transform duration-700" }, [
                            createVNode(_sfc_main$1, {
                              name: "planner",
                              size: "80"
                            })
                          ]),
                          createVNode("div", { class: "w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 dark:group-hover:bg-purple-50 transition-all duration-300 relative z-10" }, [
                            createVNode(_sfc_main$1, {
                              name: "planner",
                              size: "24",
                              "stroke-width": "2.5"
                            })
                          ]),
                          createVNode("div", { class: "relative z-10" }, [
                            createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1" }, "Planner"),
                            createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500" }, "Daily Flow")
                          ])
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("finance.index"),
                        class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "absolute -right-4 -bottom-4 text-emerald-500/5 group-hover:scale-150 transition-transform duration-700" }, [
                            createVNode(_sfc_main$1, {
                              name: "finance",
                              size: "80"
                            })
                          ]),
                          createVNode("div", { class: "w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-50 transition-all duration-300 relative z-10" }, [
                            createVNode(_sfc_main$1, {
                              name: "finance",
                              size: "24",
                              "stroke-width": "2.5"
                            })
                          ]),
                          createVNode("div", { class: "relative z-10" }, [
                            createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1" }, "Finance"),
                            createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500" }, "Asset Control")
                          ])
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("div", {
                        onClick: ($event) => handleFeatureClick("goal", _ctx.route("goals.index"), "Goal"),
                        class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative cursor-pointer"
                      }, [
                        unref(isExplorer) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "absolute top-4 right-4 text-amber-500/40"
                        }, [
                          createVNode(unref(Gem), { size: 14 })
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "absolute -right-4 -bottom-4 text-amber-500/5 group-hover:scale-150 transition-transform duration-700" }, [
                          createVNode(_sfc_main$1, {
                            name: "goal",
                            size: "80"
                          })
                        ]),
                        createVNode("div", { class: "w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 dark:group-hover:bg-amber-50 transition-all duration-300 relative z-10" }, [
                          createVNode(_sfc_main$1, {
                            name: "goal",
                            size: "24",
                            "stroke-width": "2.5"
                          })
                        ]),
                        createVNode("div", { class: "relative z-10" }, [
                          createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1" }, "Goal Lab"),
                          createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500" }, "Strategic Target")
                        ])
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("div", { class: "px-1 mb-5 flex items-center justify-between" }, [
                      createVNode("span", { class: "text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2" }, [
                        createVNode(unref(Sparkles), { size: 12 }),
                        createTextVNode(" Platinum Extensions ")
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, [
                      createVNode("div", {
                        onClick: ($event) => handleFeatureClick("journal", _ctx.route("journal.index"), "Journal"),
                        class: "bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all cursor-pointer group active:scale-95"
                      }, [
                        createVNode("div", { class: "w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" }, [
                          createVNode(unref(BookText), { size: 20 })
                        ]),
                        createVNode("div", null, [
                          createVNode("h4", { class: "text-sm font-black text-slate-800 dark:text-white leading-none mb-1" }, "Journal"),
                          createVNode("p", { class: "text-[9px] font-bold text-slate-400 uppercase tracking-widest" }, "Self Review")
                        ]),
                        unref(isExplorer) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "ml-auto opacity-30"
                        }, [
                          createVNode(unref(Gem), { size: 12 })
                        ])) : createCommentVNode("", true)
                      ], 8, ["onClick"]),
                      createVNode("div", {
                        onClick: ($event) => handleFeatureClick("calendar", _ctx.route("calendar.index"), "Calendar"),
                        class: "bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all cursor-pointer group active:scale-95"
                      }, [
                        createVNode("div", { class: "w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" }, [
                          createVNode(unref(Calendar), { size: 20 })
                        ]),
                        createVNode("div", null, [
                          createVNode("h4", { class: "text-sm font-black text-slate-800 dark:text-white leading-none mb-1" }, "Schedule"),
                          createVNode("p", { class: "text-[9px] font-bold text-slate-400 uppercase tracking-widest" }, "Master Plan")
                        ]),
                        unref(isExplorer) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "ml-auto opacity-30"
                        }, [
                          createVNode(unref(Gem), { size: 12 })
                        ])) : createCommentVNode("", true)
                      ], 8, ["onClick"]),
                      createVNode("div", {
                        onClick: ($event) => handleFeatureClick("job", _ctx.route("jobs.index"), "Jobs"),
                        class: "bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all cursor-pointer group active:scale-95"
                      }, [
                        createVNode("div", { class: "w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" }, [
                          createVNode(unref(Briefcase), { size: 20 })
                        ]),
                        createVNode("div", null, [
                          createVNode("h4", { class: "text-sm font-black text-slate-800 dark:text-white leading-none mb-1" }, "Career"),
                          createVNode("p", { class: "text-[9px] font-bold text-slate-400 uppercase tracking-widest" }, "Job Tracker")
                        ]),
                        unref(isExplorer) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "ml-auto opacity-30"
                        }, [
                          createVNode(unref(Gem), { size: 12 })
                        ])) : createCommentVNode("", true)
                      ], 8, ["onClick"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("profile.edit"),
                        class: "bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all group active:scale-95"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "w-12 h-12 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 dark:group-hover:bg-white dark:group-hover:text-slate-900 group-hover:text-white transition-all" }, [
                            createVNode(unref(Settings), { size: 20 })
                          ]),
                          createVNode("div", null, [
                            createVNode("h4", { class: "text-sm font-black text-slate-800 dark:text-white leading-none mb-1" }, "Settings"),
                            createVNode("p", { class: "text-[9px] font-bold text-slate-400 uppercase tracking-widest" }, "Configuration")
                          ])
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode(Transition, {
                    "enter-active-class": "transition-all duration-700 ease-out",
                    "enter-from-class": "opacity-0 translate-y-10 scale-95",
                    "enter-to-class": "opacity-100 translate-y-0 scale-100"
                  }, {
                    default: withCtx(() => [
                      ctaConfig.value ? (openBlock(), createBlock(unref(Link), {
                        key: 0,
                        href: _ctx.route(ctaConfig.value.route),
                        class: "bg-slate-900 dark:bg-indigo-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group active:scale-[0.98] transition-all duration-500 block border border-white/5"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "absolute inset-x-0 bottom-0 top-0 bg-gradient-to-br from-indigo-600/30 via-transparent to-transparent opacity-60" }),
                          createVNode("div", { class: "absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" }),
                          createVNode("div", { class: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10" }, [
                            createVNode("div", { class: "max-w-xl" }, [
                              createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-black mb-6 uppercase tracking-[0.2em] backdrop-blur-md border border-indigo-500/30 animate-pulse" }, [
                                createVNode(unref(Sparkles), { size: 12 }),
                                createVNode("span", null, toDisplayString(ctaConfig.value.label), 1)
                              ]),
                              createVNode("h4", { class: "text-3xl md:text-4xl font-black mb-4 tracking-tighter leading-tight group-hover:translate-x-1 transition-transform" }, toDisplayString(ctaConfig.value.title), 1),
                              createVNode("p", { class: "text-indigo-200/60 text-sm font-bold leading-relaxed" }, toDisplayString(ctaConfig.value.desc), 1)
                            ]),
                            createVNode("div", { class: "flex flex-col gap-4 shrink-0" }, [
                              createVNode("div", { class: "flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-[1.8rem] font-black text-sm shadow-2xl hover:bg-indigo-50 transition-all duration-300" }, [
                                createTextVNode(toDisplayString(ctaConfig.value.btnText) + " ", 1),
                                createVNode(unref(ArrowRight), {
                                  size: 18,
                                  "stroke-width": "3",
                                  class: "group-hover:translate-x-2 transition-transform duration-500"
                                })
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      }, 8, ["href"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "bg-white dark:bg-slate-900 rounded-[3rem] p-12 border-2 border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group transition-all duration-500 flex flex-col items-center text-center"
                      }, [
                        createVNode("div", { class: "absolute inset-0 bg-gradient-to-b from-indigo-50/50 dark:from-indigo-500/5 to-transparent" }),
                        createVNode("div", { class: "relative z-10" }, [
                          createVNode("div", { class: "w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-indigo-200 dark:shadow-none mx-auto rotate-12 group-hover:rotate-0 transition-transform duration-700" }, [
                            createVNode(unref(ShieldCheck), {
                              size: 40,
                              "stroke-width": "2.5"
                            })
                          ]),
                          createVNode("p", { class: "text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] mb-3" }, "Priority Protocol Active"),
                          createVNode("h4", { class: "text-3xl font-black text-slate-800 dark:text-white mb-4 tracking-tight" }, "Access Granted, Legendary."),
                          createVNode("p", { class: "text-sm font-bold text-slate-400 dark:text-slate-500 max-w-sm mx-auto leading-relaxed" }, " You are operating at the highest architectural tier. Your lifecycle access is secured indefinitely. ")
                        ])
                      ]))
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_sfc_main$2, {
                  isOpen: isPreviewOpen.value,
                  module: activePreviewModule.value,
                  onClose: ($event) => isPreviewOpen.value = false
                }, null, 8, ["isOpen", "module", "onClose"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/More/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d60046ce"]]);
export {
  Index as default
};
