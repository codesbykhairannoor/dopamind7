import { computed, withCtx, unref, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-Dqz4LuVx.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-CpE9XZu-.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ThemeToggle-CFl5Vgy9.js";
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AuthenticatedLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 animate-in fade-in duration-700 px-6 transition-colors duration-500" data-v-959b3761${_scopeId}><div class="pt-16 pb-12" data-v-959b3761${_scopeId}><h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2 transition-colors duration-500" data-v-959b3761${_scopeId}>${ssrInterpolate(_ctx.$t("more_launcher_title"))}</h1><p class="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] transition-colors duration-500" data-v-959b3761${_scopeId}>${ssrInterpolate(_ctx.$t("more_launcher_subtitle"))}</p></div><div class="grid grid-cols-2 gap-4" data-v-959b3761${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("dashboard"),
              class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-all duration-300" data-v-959b3761${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    name: "dashboard",
                    size: "24",
                    "stroke-width": "2.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-959b3761${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_item_dashboard"))}</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" data-v-959b3761${_scopeId2}>Core Center</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-all duration-300" }, [
                      createVNode(_sfc_main$1, {
                        name: "dashboard",
                        size: "24",
                        "stroke-width": "2.5"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_dashboard")), 1),
                      createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, "Core Center")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (showModule("planner")) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("planner.index"),
                class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 transition-all duration-300" data-v-959b3761${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      name: "planner",
                      size: "24",
                      "stroke-width": "2.5"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div data-v-959b3761${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_item_planner"))}</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_desc_planner"))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "planner",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_planner")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_planner")), 1)
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
                    _push3(`<div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-all duration-300" data-v-959b3761${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      name: "finance",
                      size: "24",
                      "stroke-width": "2.5"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div data-v-959b3761${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_item_finance"))}</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" data-v-959b3761${_scopeId2}>Wealth Tracking</span></div>`);
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
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, "Wealth Tracking")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (showModule("journal")) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("journal.index"),
                class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center group-hover:bg-teal-600 dark:group-hover:bg-teal-500 transition-all duration-300" data-v-959b3761${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      name: "journal",
                      size: "24",
                      "stroke-width": "2.5"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div data-v-959b3761${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_item_journal"))}</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_desc_journal"))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center group-hover:bg-teal-600 dark:group-hover:bg-teal-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "journal",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_journal")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_journal")), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (showModule("calendar")) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("calendar.index"),
                class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 dark:group-hover:bg-rose-500 transition-all duration-300" data-v-959b3761${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      name: "calendar",
                      size: "24",
                      "stroke-width": "2.5"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div data-v-959b3761${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_item_calendar"))}</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_desc_calendar"))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 dark:group-hover:bg-rose-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "calendar",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_calendar")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_calendar")), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("coach.index"),
              class: "bg-slate-900 dark:bg-indigo-600 p-6 rounded-[2.2rem] shadow-xl shadow-indigo-200 dark:shadow-none border border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:text-indigo-600" data-v-959b3761${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    name: "sparkles",
                    size: "24",
                    "stroke-width": "2.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-959b3761${_scopeId2}><span class="block font-black text-white text-base leading-none mb-1 transition-colors duration-500" data-v-959b3761${_scopeId2}>Neural OS</span><span class="text-[10px] font-bold text-white/60 uppercase tracking-tight transition-colors duration-500" data-v-959b3761${_scopeId2}>AI Life Coach</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:text-indigo-600" }, [
                      createVNode(_sfc_main$1, {
                        name: "sparkles",
                        size: "24",
                        "stroke-width": "2.5"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "block font-black text-white text-base leading-none mb-1 transition-colors duration-500" }, "Neural OS"),
                      createVNode("span", { class: "text-[10px] font-bold text-white/60 uppercase tracking-tight transition-colors duration-500" }, "AI Life Coach")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (showModule("job")) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("jobs.index"),
                class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-all duration-300" data-v-959b3761${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      name: "job",
                      size: "24",
                      "stroke-width": "2.5"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div data-v-959b3761${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_item_jobs"))}</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_desc_jobs"))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "job",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_jobs")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_jobs")), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (showModule("goal")) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("goals.index"),
                class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 dark:group-hover:bg-amber-500 transition-all duration-300" data-v-959b3761${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      name: "goal",
                      size: "24",
                      "stroke-width": "2.5"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div data-v-959b3761${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_item_goals"))}</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_desc_goals"))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 dark:group-hover:bg-amber-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "goal",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_goals")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_goals")), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("settings.index"),
              class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group col-span-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-4" data-v-959b3761${_scopeId2}><div class="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-all duration-300" data-v-959b3761${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    name: "settings",
                    size: "24",
                    "stroke-width": "2.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div data-v-959b3761${_scopeId2}><span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" data-v-959b3761${_scopeId2}>System Settings</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" data-v-959b3761${_scopeId2}>Preferences &amp; Profile</span></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("div", { class: "w-12 h-12 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "settings",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, "System Settings"),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, "Preferences & Profile")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("pricing.index"),
              class: "mt-12 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-xl dark:shadow-none relative overflow-hidden group active:scale-[0.98] transition-all duration-300 block"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-500" data-v-959b3761${_scopeId2}></div><div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6" data-v-959b3761${_scopeId2}><div data-v-959b3761${_scopeId2}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[9px] font-black mb-4 uppercase tracking-[0.2em] backdrop-blur-md border border-white/10" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("more_upgrade_badge", "PREMIUM UPGRADE"))}</div><h4 class="text-2xl font-black mb-2 tracking-tight" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("more_upgrade_title", "Elevate to Elite Performance"))}</h4><p class="text-indigo-100 text-sm font-bold opacity-90 leading-relaxed max-w-md" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("more_upgrade_desc", "Unlock AI-powered life insights, advanced wealth tracking, and seamless external integrations."))}</p></div><div class="flex items-center gap-3 bg-white text-indigo-700 px-6 py-4 rounded-2xl font-black text-sm shadow-xl group-hover:shadow-indigo-500/50 transition-all duration-300" data-v-959b3761${_scopeId2}>${ssrInterpolate(_ctx.$t("more_upgrade_btn", "Upgrade Now"))} `);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    name: "arrow-right",
                    size: "18",
                    "stroke-width": "3"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-500" }),
                    createVNode("div", { class: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[9px] font-black mb-4 uppercase tracking-[0.2em] backdrop-blur-md border border-white/10" }, toDisplayString(_ctx.$t("more_upgrade_badge", "PREMIUM UPGRADE")), 1),
                        createVNode("h4", { class: "text-2xl font-black mb-2 tracking-tight" }, toDisplayString(_ctx.$t("more_upgrade_title", "Elevate to Elite Performance")), 1),
                        createVNode("p", { class: "text-indigo-100 text-sm font-bold opacity-90 leading-relaxed max-w-md" }, toDisplayString(_ctx.$t("more_upgrade_desc", "Unlock AI-powered life insights, advanced wealth tracking, and seamless external integrations.")), 1)
                      ]),
                      createVNode("div", { class: "flex items-center gap-3 bg-white text-indigo-700 px-6 py-4 rounded-2xl font-black text-sm shadow-xl group-hover:shadow-indigo-500/50 transition-all duration-300" }, [
                        createTextVNode(toDisplayString(_ctx.$t("more_upgrade_btn", "Upgrade Now")) + " ", 1),
                        createVNode(_sfc_main$1, {
                          name: "arrow-right",
                          size: "18",
                          "stroke-width": "3"
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
            return [
              createVNode("div", { class: "min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 animate-in fade-in duration-700 px-6 transition-colors duration-500" }, [
                createVNode("div", { class: "pt-16 pb-12" }, [
                  createVNode("h1", { class: "text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2 transition-colors duration-500" }, toDisplayString(_ctx.$t("more_launcher_title")), 1),
                  createVNode("p", { class: "text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] transition-colors duration-500" }, toDisplayString(_ctx.$t("more_launcher_subtitle")), 1)
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("dashboard"),
                    class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "dashboard",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_dashboard")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, "Core Center")
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  showModule("planner") ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("planner.index"),
                    class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "planner",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_planner")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_planner")), 1)
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
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, "Wealth Tracking")
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  showModule("journal") ? (openBlock(), createBlock(unref(Link), {
                    key: 2,
                    href: _ctx.route("journal.index"),
                    class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center group-hover:bg-teal-600 dark:group-hover:bg-teal-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "journal",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_journal")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_journal")), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  showModule("calendar") ? (openBlock(), createBlock(unref(Link), {
                    key: 3,
                    href: _ctx.route("calendar.index"),
                    class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 dark:group-hover:bg-rose-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "calendar",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_calendar")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_calendar")), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  createVNode(unref(Link), {
                    href: _ctx.route("coach.index"),
                    class: "bg-slate-900 dark:bg-indigo-600 p-6 rounded-[2.2rem] shadow-xl shadow-indigo-200 dark:shadow-none border border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:text-indigo-600" }, [
                        createVNode(_sfc_main$1, {
                          name: "sparkles",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-white text-base leading-none mb-1 transition-colors duration-500" }, "Neural OS"),
                        createVNode("span", { class: "text-[10px] font-bold text-white/60 uppercase tracking-tight transition-colors duration-500" }, "AI Life Coach")
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  showModule("job") ? (openBlock(), createBlock(unref(Link), {
                    key: 4,
                    href: _ctx.route("jobs.index"),
                    class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "job",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_jobs")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_jobs")), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  showModule("goal") ? (openBlock(), createBlock(unref(Link), {
                    key: 5,
                    href: _ctx.route("goals.index"),
                    class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 dark:group-hover:bg-amber-500 transition-all duration-300" }, [
                        createVNode(_sfc_main$1, {
                          name: "goal",
                          size: "24",
                          "stroke-width": "2.5"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_item_goals")), 1),
                        createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("nav_desc_goals")), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  createVNode(unref(Link), {
                    href: _ctx.route("settings.index"),
                    class: "bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group col-span-2"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode("div", { class: "w-12 h-12 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-all duration-300" }, [
                          createVNode(_sfc_main$1, {
                            name: "settings",
                            size: "24",
                            "stroke-width": "2.5"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500" }, "System Settings"),
                          createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight transition-colors duration-500" }, "Preferences & Profile")
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode(unref(Link), {
                  href: _ctx.route("pricing.index"),
                  class: "mt-12 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-xl dark:shadow-none relative overflow-hidden group active:scale-[0.98] transition-all duration-300 block"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-500" }),
                    createVNode("div", { class: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[9px] font-black mb-4 uppercase tracking-[0.2em] backdrop-blur-md border border-white/10" }, toDisplayString(_ctx.$t("more_upgrade_badge", "PREMIUM UPGRADE")), 1),
                        createVNode("h4", { class: "text-2xl font-black mb-2 tracking-tight" }, toDisplayString(_ctx.$t("more_upgrade_title", "Elevate to Elite Performance")), 1),
                        createVNode("p", { class: "text-indigo-100 text-sm font-bold opacity-90 leading-relaxed max-w-md" }, toDisplayString(_ctx.$t("more_upgrade_desc", "Unlock AI-powered life insights, advanced wealth tracking, and seamless external integrations.")), 1)
                      ]),
                      createVNode("div", { class: "flex items-center gap-3 bg-white text-indigo-700 px-6 py-4 rounded-2xl font-black text-sm shadow-xl group-hover:shadow-indigo-500/50 transition-all duration-300" }, [
                        createTextVNode(toDisplayString(_ctx.$t("more_upgrade_btn", "Upgrade Now")) + " ", 1),
                        createVNode(_sfc_main$1, {
                          name: "arrow-right",
                          size: "18",
                          "stroke-width": "3"
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["href"])
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-959b3761"]]);
export {
  Index as default
};
