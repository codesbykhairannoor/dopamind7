import { computed, ref, withCtx, unref, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link, router } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DfNvF4k3.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import { _ as _sfc_main$2 } from "./PremiumPreviewModal-BdH6vUzw.js";
import { Gem, Sparkles, ArrowRight } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ThemeToggle-ByQSx4Ee.js";
import "./useAppearance-rDoGVD4_.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    const showModule = (moduleName) => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = user.value) == null ? void 0 : _a.settings) == null ? void 0 : _b.modules) == null ? void 0 : _c[moduleName]) !== false;
    };
    const isArchitect = computed(() => {
      var _a;
      return ["architect", "quantum", "legendary"].includes((_a = user.value) == null ? void 0 : _a.plan_type);
    });
    const canAccess = (feature) => {
      const freeFeatures = ["dashboard", "habit", "planner", "finance"];
      if (freeFeatures.includes(feature)) return true;
      return isArchitect.value;
    };
    const isPreviewOpen = ref(false);
    const activePreviewModule = ref("Journal");
    const handleFeatureClick = (feature, targetRoute, moduleKey) => {
      if (canAccess(feature)) {
        router.visit(targetRoute);
      } else {
        activePreviewModule.value = moduleKey;
        isPreviewOpen.value = true;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AuthenticatedLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 animate-in fade-in duration-700 px-6 transition-colors duration-500" data-v-cd69e04f${_scopeId}><div class="pt-16 pb-12" data-v-cd69e04f${_scopeId}><h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2 transition-colors duration-500" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("more_launcher_title"))}</h1><p class="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] transition-colors duration-500" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("more_launcher_subtitle"))}</p></div><div class="px-1 mb-4" data-v-cd69e04f${_scopeId}><span class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("more_core_tools", "Productivity Core"))}</span></div><div class="grid grid-cols-2 gap-4" data-v-cd69e04f${_scopeId}>`);
            if (showModule("planner")) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("planner.index"),
                class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-50 transition-all duration-300" data-v-cd69e04f${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      name: "planner",
                      size: "24",
                      "stroke-width": "2.5"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div data-v-cd69e04f${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-cd69e04f${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_item_planner"))}</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" data-v-cd69e04f${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_desc_planner"))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-50 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "planner",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_planner")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_planner")), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (showModule("finance")) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("finance.index"),
                class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-all duration-300" data-v-cd69e04f${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      name: "finance",
                      size: "24",
                      "stroke-width": "2.5"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div data-v-cd69e04f${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-cd69e04f${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_item_finance"))}</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" data-v-cd69e04f${_scopeId2}>Wealth Tracking</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "finance",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_finance")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" }, "Wealth Tracking")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="px-1 mt-10 mb-4" data-v-cd69e04f${_scopeId}><span class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("more_premium_tools", "Platinum Suite"))}</span></div><div class="grid grid-cols-2 gap-4" data-v-cd69e04f${_scopeId}>`);
            if (showModule("journal")) {
              _push2(`<div class="${ssrRenderClass([!canAccess("journal") ? "bg-indigo-50/10 dark:bg-indigo-500/5" : "", "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden"])}" data-v-cd69e04f${_scopeId}>`);
              if (!canAccess("journal")) {
                _push2(`<div class="absolute top-4 right-4 text-indigo-400 opacity-60" data-v-cd69e04f${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Gem), { size: 14 }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center group-hover:bg-teal-600 dark:group-hover:bg-teal-500 transition-all duration-300" data-v-cd69e04f${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "journal",
                size: "24",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-cd69e04f${_scopeId}><div class="flex items-center justify-between" data-v-cd69e04f${_scopeId}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_journal"))}</span>`);
              if (!canAccess("journal")) {
                _push2(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1" data-v-cd69e04f${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("nav_desc_journal"))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showModule("calendar")) {
              _push2(`<div class="${ssrRenderClass([!canAccess("calendar") ? "bg-rose-50/10 dark:bg-rose-500/5" : "", "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden"])}" data-v-cd69e04f${_scopeId}>`);
              if (!canAccess("calendar")) {
                _push2(`<div class="absolute top-4 right-4 text-rose-400 opacity-60" data-v-cd69e04f${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Gem), { size: 14 }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 dark:group-hover:bg-rose-500 transition-all duration-300" data-v-cd69e04f${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "calendar",
                size: "24",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-cd69e04f${_scopeId}><div class="flex items-center justify-between" data-v-cd69e04f${_scopeId}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_calendar"))}</span>`);
              if (!canAccess("calendar")) {
                _push2(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1" data-v-cd69e04f${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("nav_desc_calendar"))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showModule("job")) {
              _push2(`<div class="${ssrRenderClass([!canAccess("job") ? "bg-blue-50/10 dark:bg-blue-500/5" : "", "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden"])}" data-v-cd69e04f${_scopeId}>`);
              if (!canAccess("job")) {
                _push2(`<div class="absolute top-4 right-4 text-blue-400 opacity-60" data-v-cd69e04f${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Gem), { size: 14 }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-all duration-300" data-v-cd69e04f${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "job",
                size: "24",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-cd69e04f${_scopeId}><div class="flex items-center justify-between" data-v-cd69e04f${_scopeId}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_jobs"))}</span>`);
              if (!canAccess("job")) {
                _push2(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1" data-v-cd69e04f${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("nav_desc_jobs"))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showModule("goal")) {
              _push2(`<div class="${ssrRenderClass([!canAccess("goal") ? "bg-amber-50/10 dark:bg-amber-500/5" : "", "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden"])}" data-v-cd69e04f${_scopeId}>`);
              if (!canAccess("goal")) {
                _push2(`<div class="absolute top-4 right-4 text-amber-400 opacity-60" data-v-cd69e04f${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Gem), { size: 14 }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 dark:group-hover:bg-amber-500 transition-all duration-300" data-v-cd69e04f${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "goal",
                size: "24",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-cd69e04f${_scopeId}><div class="flex items-center justify-between" data-v-cd69e04f${_scopeId}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_goals"))}</span>`);
              if (!canAccess("goal")) {
                _push2(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1" data-v-cd69e04f${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" data-v-cd69e04f${_scopeId}>${ssrInterpolate(_ctx.$t("nav_desc_goals"))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("billing"),
              class: "mt-12 bg-slate-900 dark:bg-indigo-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group active:scale-[0.98] transition-all duration-500 block"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent opacity-50" data-v-cd69e04f${_scopeId2}></div><div class="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" data-v-cd69e04f${_scopeId2}></div><div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8" data-v-cd69e04f${_scopeId2}><div class="max-w-xl" data-v-cd69e04f${_scopeId2}><div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black mb-6 uppercase tracking-[0.2em] backdrop-blur-md border border-indigo-500/30" data-v-cd69e04f${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Sparkles), { size: 12 }, null, _parent3, _scopeId2));
                  _push3(`<span data-v-cd69e04f${_scopeId2}>Become an Architect</span></div><h4 class="text-3xl font-black mb-4 tracking-tighter leading-none" data-v-cd69e04f${_scopeId2}>Desain Hidup Tanpa Batas.</h4><p class="text-slate-400 text-sm font-bold opacity-90 leading-relaxed" data-v-cd69e04f${_scopeId2}> Buka akses ke Neural OS, Strategic Discovery, dan ekosistem performa tinggi yang dirancang khusus untuk manifestasi ambisi Anda. </p></div><div class="flex flex-col gap-4" data-v-cd69e04f${_scopeId2}><div class="flex items-center gap-3 bg-white text-slate-900 px-8 py-5 rounded-3xl font-black text-sm shadow-xl hover:scale-105 transition-all duration-300" data-v-cd69e04f${_scopeId2}> Join the Elite Tier `);
                  _push3(ssrRenderComponent(unref(ArrowRight), {
                    size: 18,
                    "stroke-width": "3"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center justify-center gap-1.5 opacity-40 text-[9px] font-black uppercase tracking-widest text-indigo-300" data-v-cd69e04f${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Gem), { size: 10 }, null, _parent3, _scopeId2));
                  _push3(`<span data-v-cd69e04f${_scopeId2}>Secure Checkout Enabled</span></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "absolute inset-x-0 bottom-0 top-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent opacity-50" }),
                    createVNode("div", { class: "absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" }),
                    createVNode("div", { class: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8" }, [
                      createVNode("div", { class: "max-w-xl" }, [
                        createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black mb-6 uppercase tracking-[0.2em] backdrop-blur-md border border-indigo-500/30" }, [
                          createVNode(unref(Sparkles), { size: 12 }),
                          createVNode("span", null, "Become an Architect")
                        ]),
                        createVNode("h4", { class: "text-3xl font-black mb-4 tracking-tighter leading-none" }, "Desain Hidup Tanpa Batas."),
                        createVNode("p", { class: "text-slate-400 text-sm font-bold opacity-90 leading-relaxed" }, " Buka akses ke Neural OS, Strategic Discovery, dan ekosistem performa tinggi yang dirancang khusus untuk manifestasi ambisi Anda. ")
                      ]),
                      createVNode("div", { class: "flex flex-col gap-4" }, [
                        createVNode("div", { class: "flex items-center gap-3 bg-white text-slate-900 px-8 py-5 rounded-3xl font-black text-sm shadow-xl hover:scale-105 transition-all duration-300" }, [
                          createTextVNode(" Join the Elite Tier "),
                          createVNode(unref(ArrowRight), {
                            size: 18,
                            "stroke-width": "3"
                          })
                        ]),
                        createVNode("div", { class: "flex items-center justify-center gap-1.5 opacity-40 text-[9px] font-black uppercase tracking-widest text-indigo-300" }, [
                          createVNode(unref(Gem), { size: 10 }),
                          createVNode("span", null, "Secure Checkout Enabled")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              isOpen: isPreviewOpen.value,
              module: activePreviewModule.value,
              onClose: ($event) => isPreviewOpen.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 animate-in fade-in duration-700 px-6 transition-colors duration-500" }, [
                createVNode("div", { class: "pt-16 pb-12" }, [
                  createVNode("h1", { class: "text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2 transition-colors duration-500" }, toDisplayString(_ctx.$t("more_launcher_title")), 1),
                  createVNode("p", { class: "text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] transition-colors duration-500" }, toDisplayString(_ctx.$t("more_launcher_subtitle")), 1)
                ]),
                createVNode("div", { class: "px-1 mb-4" }, [
                  createVNode("span", { class: "text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]" }, toDisplayString(_ctx.$t("more_core_tools", "Productivity Core")), 1)
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  showModule("planner") ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("planner.index"),
                    class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-50 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "planner",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_planner")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_planner")), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  showModule("finance") ? (openBlock(), createBlock(unref(Link), {
                    key: 1,
                    href: _ctx.route("finance.index"),
                    class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "finance",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_finance")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" }, "Wealth Tracking")
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "px-1 mt-10 mb-4" }, [
                  createVNode("span", { class: "text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]" }, toDisplayString(_ctx.$t("more_premium_tools", "Platinum Suite")), 1)
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  showModule("journal") ? (openBlock(), createBlock("div", {
                    key: 0,
                    onClick: ($event) => handleFeatureClick("journal", _ctx.route("journal.index"), "Journal"),
                    class: ["bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden", !canAccess("journal") ? "bg-indigo-50/10 dark:bg-indigo-500/5" : ""]
                  }, [
                    !canAccess("journal") ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute top-4 right-4 text-indigo-400 opacity-60"
                    }, [
                      createVNode(unref(Gem), { size: 14 })
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center group-hover:bg-teal-600 dark:group-hover:bg-teal-500 transition-all duration-300" }, [
                      createVNode(_sfc_main$1, {
                        name: "journal",
                        size: "24",
                        "stroke-width": "2.5"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_journal")), 1),
                        !canAccess("journal") ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1"
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_journal")), 1)
                    ])
                  ], 10, ["onClick"])) : createCommentVNode("", true),
                  showModule("calendar") ? (openBlock(), createBlock("div", {
                    key: 1,
                    onClick: ($event) => handleFeatureClick("calendar", _ctx.route("calendar.index"), "Calendar"),
                    class: ["bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden", !canAccess("calendar") ? "bg-rose-50/10 dark:bg-rose-500/5" : ""]
                  }, [
                    !canAccess("calendar") ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute top-4 right-4 text-rose-400 opacity-60"
                    }, [
                      createVNode(unref(Gem), { size: 14 })
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 dark:group-hover:bg-rose-500 transition-all duration-300" }, [
                      createVNode(_sfc_main$1, {
                        name: "calendar",
                        size: "24",
                        "stroke-width": "2.5"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_calendar")), 1),
                        !canAccess("calendar") ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1"
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_calendar")), 1)
                    ])
                  ], 10, ["onClick"])) : createCommentVNode("", true),
                  showModule("job") ? (openBlock(), createBlock("div", {
                    key: 2,
                    onClick: ($event) => handleFeatureClick("job", _ctx.route("jobs.index"), "Jobs"),
                    class: ["bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden", !canAccess("job") ? "bg-blue-50/10 dark:bg-blue-500/5" : ""]
                  }, [
                    !canAccess("job") ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute top-4 right-4 text-blue-400 opacity-60"
                    }, [
                      createVNode(unref(Gem), { size: 14 })
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-all duration-300" }, [
                      createVNode(_sfc_main$1, {
                        name: "job",
                        size: "24",
                        "stroke-width": "2.5"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_jobs")), 1),
                        !canAccess("job") ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1"
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_jobs")), 1)
                    ])
                  ], 10, ["onClick"])) : createCommentVNode("", true),
                  showModule("goal") ? (openBlock(), createBlock("div", {
                    key: 3,
                    onClick: ($event) => handleFeatureClick("goal", _ctx.route("goals.index"), "Goal"),
                    class: ["bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden", !canAccess("goal") ? "bg-amber-50/10 dark:bg-amber-500/5" : ""]
                  }, [
                    !canAccess("goal") ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute top-4 right-4 text-amber-400 opacity-60"
                    }, [
                      createVNode(unref(Gem), { size: 14 })
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 dark:group-hover:bg-amber-500 transition-all duration-300" }, [
                      createVNode(_sfc_main$1, {
                        name: "goal",
                        size: "24",
                        "stroke-width": "2.5"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_goals")), 1),
                        !canAccess("goal") ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1"
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_goals")), 1)
                    ])
                  ], 10, ["onClick"])) : createCommentVNode("", true)
                ]),
                createVNode(unref(Link), {
                  href: _ctx.route("billing"),
                  class: "mt-12 bg-slate-900 dark:bg-indigo-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group active:scale-[0.98] transition-all duration-500 block"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "absolute inset-x-0 bottom-0 top-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent opacity-50" }),
                    createVNode("div", { class: "absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" }),
                    createVNode("div", { class: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8" }, [
                      createVNode("div", { class: "max-w-xl" }, [
                        createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black mb-6 uppercase tracking-[0.2em] backdrop-blur-md border border-indigo-500/30" }, [
                          createVNode(unref(Sparkles), { size: 12 }),
                          createVNode("span", null, "Become an Architect")
                        ]),
                        createVNode("h4", { class: "text-3xl font-black mb-4 tracking-tighter leading-none" }, "Desain Hidup Tanpa Batas."),
                        createVNode("p", { class: "text-slate-400 text-sm font-bold opacity-90 leading-relaxed" }, " Buka akses ke Neural OS, Strategic Discovery, dan ekosistem performa tinggi yang dirancang khusus untuk manifestasi ambisi Anda. ")
                      ]),
                      createVNode("div", { class: "flex flex-col gap-4" }, [
                        createVNode("div", { class: "flex items-center gap-3 bg-white text-slate-900 px-8 py-5 rounded-3xl font-black text-sm shadow-xl hover:scale-105 transition-all duration-300" }, [
                          createTextVNode(" Join the Elite Tier "),
                          createVNode(unref(ArrowRight), {
                            size: 18,
                            "stroke-width": "3"
                          })
                        ]),
                        createVNode("div", { class: "flex items-center justify-center gap-1.5 opacity-40 text-[9px] font-black uppercase tracking-widest text-indigo-300" }, [
                          createVNode(unref(Gem), { size: 10 }),
                          createVNode("span", null, "Secure Checkout Enabled")
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["href"]),
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cd69e04f"]]);
export {
  Index as default
};
