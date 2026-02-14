import { computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-DEa2QkKf.js";
import { usePage, Head, Link } from "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const user = usePage().props.auth.user;
    const greetingKey = computed(() => {
      const hour = (/* @__PURE__ */ new Date()).getHours();
      if (hour < 11) return "dash_greet_morning";
      if (hour < 15) return "dash_greet_afternoon";
      if (hour < 19) return "dash_greet_evening";
      return "dash_greet_night";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("nav_dashboard")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto p-4 md:p-8 space-y-8"${_scopeId}><div class="relative overflow-hidden bg-indigo-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl shadow-indigo-200"${_scopeId}><div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-pulse"${_scopeId}></div><div class="relative z-10"${_scopeId}><h2 class="text-3xl md:text-5xl font-black tracking-tight mb-3"${_scopeId}>${ssrInterpolate(_ctx.$t(greetingKey.value))}, ${ssrInterpolate(unref(user).name)}! 👋 </h2><p class="text-indigo-100 text-lg md:text-xl font-medium max-w-2xl leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("dash_welcome_sub"))}</p></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("habits.index"),
              class: "group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"${_scopeId2}>🌱</div><h3 class="text-xl font-black text-slate-800 mb-2"${_scopeId2}>${ssrInterpolate(_ctx.$t("habit_page_title"))}</h3><p class="text-slate-500 text-sm font-medium mb-6 leading-relaxed"${_scopeId2}>${ssrInterpolate(_ctx.$t("dash_habit_desc"))}</p><div class="text-emerald-600 font-bold text-sm flex items-center gap-2"${_scopeId2}>${ssrInterpolate(_ctx.$t("dash_open_module"))} <span class="group-hover:translate-x-1 transition-transform"${_scopeId2}>→</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform" }, "🌱"),
                    createVNode("h3", { class: "text-xl font-black text-slate-800 mb-2" }, toDisplayString(_ctx.$t("habit_page_title")), 1),
                    createVNode("p", { class: "text-slate-500 text-sm font-medium mb-6 leading-relaxed" }, toDisplayString(_ctx.$t("dash_habit_desc")), 1),
                    createVNode("div", { class: "text-emerald-600 font-bold text-sm flex items-center gap-2" }, [
                      createTextVNode(toDisplayString(_ctx.$t("dash_open_module")) + " ", 1),
                      createVNode("span", { class: "group-hover:translate-x-1 transition-transform" }, "→")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("planner.index"),
              class: "group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"${_scopeId2}>📅</div><h3 class="text-xl font-black text-slate-800 mb-2"${_scopeId2}>Daily Planner</h3><p class="text-slate-500 text-sm font-medium mb-6 leading-relaxed"${_scopeId2}>${ssrInterpolate(_ctx.$t("dash_planner_desc"))}</p><div class="text-amber-600 font-bold text-sm flex items-center gap-2"${_scopeId2}>${ssrInterpolate(_ctx.$t("dash_open_module"))} <span class="group-hover:translate-x-1 transition-transform"${_scopeId2}>→</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform" }, "📅"),
                    createVNode("h3", { class: "text-xl font-black text-slate-800 mb-2" }, "Daily Planner"),
                    createVNode("p", { class: "text-slate-500 text-sm font-medium mb-6 leading-relaxed" }, toDisplayString(_ctx.$t("dash_planner_desc")), 1),
                    createVNode("div", { class: "text-amber-600 font-bold text-sm flex items-center gap-2" }, [
                      createTextVNode(toDisplayString(_ctx.$t("dash_open_module")) + " ", 1),
                      createVNode("span", { class: "group-hover:translate-x-1 transition-transform" }, "→")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("finance.index"),
              class: "group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"${_scopeId2}>💸</div><h3 class="text-xl font-black text-slate-800 mb-2"${_scopeId2}>Finance</h3><p class="text-slate-500 text-sm font-medium mb-6 leading-relaxed"${_scopeId2}>${ssrInterpolate(_ctx.$t("dash_finance_desc"))}</p><div class="text-blue-600 font-bold text-sm flex items-center gap-2"${_scopeId2}>${ssrInterpolate(_ctx.$t("dash_open_module"))} <span class="group-hover:translate-x-1 transition-transform"${_scopeId2}>→</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform" }, "💸"),
                    createVNode("h3", { class: "text-xl font-black text-slate-800 mb-2" }, "Finance"),
                    createVNode("p", { class: "text-slate-500 text-sm font-medium mb-6 leading-relaxed" }, toDisplayString(_ctx.$t("dash_finance_desc")), 1),
                    createVNode("div", { class: "text-blue-600 font-bold text-sm flex items-center gap-2" }, [
                      createTextVNode(toDisplayString(_ctx.$t("dash_open_module")) + " ", 1),
                      createVNode("span", { class: "group-hover:translate-x-1 transition-transform" }, "→")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30"${_scopeId}><span class="animate-pulse"${_scopeId}>✨</span></div><div${_scopeId}><p class="text-slate-400 text-xs font-bold uppercase tracking-widest"${_scopeId}>${ssrInterpolate(_ctx.$t("dash_status_label"))}</p><p class="text-xl font-black"${_scopeId}>Free Plan User</p></div></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("settings.index"),
              class: "bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-xl font-bold transition text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("nav_settings"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("nav_settings")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto p-4 md:p-8 space-y-8" }, [
                createVNode("div", { class: "relative overflow-hidden bg-indigo-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl shadow-indigo-200" }, [
                  createVNode("div", { class: "absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-pulse" }),
                  createVNode("div", { class: "relative z-10" }, [
                    createVNode("h2", { class: "text-3xl md:text-5xl font-black tracking-tight mb-3" }, toDisplayString(_ctx.$t(greetingKey.value)) + ", " + toDisplayString(unref(user).name) + "! 👋 ", 1),
                    createVNode("p", { class: "text-indigo-100 text-lg md:text-xl font-medium max-w-2xl leading-relaxed" }, toDisplayString(_ctx.$t("dash_welcome_sub")), 1)
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("habits.index"),
                    class: "group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform" }, "🌱"),
                      createVNode("h3", { class: "text-xl font-black text-slate-800 mb-2" }, toDisplayString(_ctx.$t("habit_page_title")), 1),
                      createVNode("p", { class: "text-slate-500 text-sm font-medium mb-6 leading-relaxed" }, toDisplayString(_ctx.$t("dash_habit_desc")), 1),
                      createVNode("div", { class: "text-emerald-600 font-bold text-sm flex items-center gap-2" }, [
                        createTextVNode(toDisplayString(_ctx.$t("dash_open_module")) + " ", 1),
                        createVNode("span", { class: "group-hover:translate-x-1 transition-transform" }, "→")
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("planner.index"),
                    class: "group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform" }, "📅"),
                      createVNode("h3", { class: "text-xl font-black text-slate-800 mb-2" }, "Daily Planner"),
                      createVNode("p", { class: "text-slate-500 text-sm font-medium mb-6 leading-relaxed" }, toDisplayString(_ctx.$t("dash_planner_desc")), 1),
                      createVNode("div", { class: "text-amber-600 font-bold text-sm flex items-center gap-2" }, [
                        createTextVNode(toDisplayString(_ctx.$t("dash_open_module")) + " ", 1),
                        createVNode("span", { class: "group-hover:translate-x-1 transition-transform" }, "→")
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("finance.index"),
                    class: "group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform" }, "💸"),
                      createVNode("h3", { class: "text-xl font-black text-slate-800 mb-2" }, "Finance"),
                      createVNode("p", { class: "text-slate-500 text-sm font-medium mb-6 leading-relaxed" }, toDisplayString(_ctx.$t("dash_finance_desc")), 1),
                      createVNode("div", { class: "text-blue-600 font-bold text-sm flex items-center gap-2" }, [
                        createTextVNode(toDisplayString(_ctx.$t("dash_open_module")) + " ", 1),
                        createVNode("span", { class: "group-hover:translate-x-1 transition-transform" }, "→")
                      ])
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30" }, [
                      createVNode("span", { class: "animate-pulse" }, "✨")
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-slate-400 text-xs font-bold uppercase tracking-widest" }, toDisplayString(_ctx.$t("dash_status_label")), 1),
                      createVNode("p", { class: "text-xl font-black" }, "Free Plan User")
                    ])
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("settings.index"),
                    class: "bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-xl font-bold transition text-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("nav_settings")), 1)
                    ]),
                    _: 1
                  }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
