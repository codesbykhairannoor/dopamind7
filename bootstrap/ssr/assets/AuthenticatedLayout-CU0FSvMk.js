import { computed, ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    const currentLang = computed(() => page.props.locale || "id");
    const showingNavigationDropdown = ref(false);
    const showModule = (moduleName) => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = user.value) == null ? void 0 : _a.settings) == null ? void 0 : _b.modules) == null ? void 0 : _c[moduleName]) !== false;
    };
    watch(() => page.url, () => {
      showingNavigationDropdown.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen bg-slate-50 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white" }, _attrs))}><aside class="w-72 bg-white border-r border-slate-100 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 transition-all duration-300"><div class="h-24 flex items-center px-8">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "group flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-3xl transition-transform duration-500 group-hover:rotate-180 text-indigo-600"${_scopeId}>✦</span><span class="text-2xl font-black text-indigo-950 tracking-tighter"${_scopeId}>OneForMind.</span>`);
          } else {
            return [
              createVNode("span", { class: "text-3xl transition-transform duration-500 group-hover:rotate-180 text-indigo-600" }, "✦"),
              createVNode("span", { class: "text-2xl font-black text-indigo-950 tracking-tighter" }, "OneForMind.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="flex-1 px-6 space-y-2 overflow-y-auto py-6 custom-scrollbar">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: ["flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group", _ctx.route().current("dashboard") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-xl"${_scopeId}>🏠</span><span${_scopeId}>${ssrInterpolate(_ctx.$t("nav_dashboard"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "text-xl" }, "🏠"),
              createVNode("span", null, toDisplayString(_ctx.$t("nav_dashboard")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (showModule("habit")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          class: ["flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group", _ctx.route().current("habits.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl"${_scopeId}>🌱</span><span${_scopeId}>${ssrInterpolate(_ctx.$t("habit_page_title"))}</span>`);
            } else {
              return [
                createVNode("span", { class: "text-xl" }, "🌱"),
                createVNode("span", null, toDisplayString(_ctx.$t("habit_page_title")), 1)
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
          class: ["flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group", _ctx.route().current("planner.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl"${_scopeId}>📅</span><span${_scopeId}>Daily Planner</span>`);
            } else {
              return [
                createVNode("span", { class: "text-xl" }, "📅"),
                createVNode("span", null, "Daily Planner")
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
          class: ["flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group", _ctx.route().current("finance.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl"${_scopeId}>💸</span><span${_scopeId}>Finance</span>`);
            } else {
              return [
                createVNode("span", { class: "text-xl" }, "💸"),
                createVNode("span", null, "Finance")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("settings.index"),
        class: "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-indigo-600 hover:bg-white transition border border-transparent hover:border-slate-200 hover:shadow-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-lg"${_scopeId}>⚙️</span><span${_scopeId}>${ssrInterpolate(_ctx.$t("nav_settings"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "text-lg" }, "⚙️"),
              createVNode("span", null, toDisplayString(_ctx.$t("nav_settings")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm"><button class="${ssrRenderClass([currentLang.value === "id" ? "bg-indigo-100 text-indigo-700 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all"])}">🇮🇩 ID</button><button class="${ssrRenderClass([currentLang.value === "en" ? "bg-indigo-100 text-indigo-700 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all"])}">🇬🇧 EN</button></div><div class="flex items-center gap-3 pt-2 border-t border-slate-200/50"><div class="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-200">${ssrInterpolate(((_b = (_a = user.value) == null ? void 0 : _a.name) == null ? void 0 : _b.charAt(0).toUpperCase()) || "U")}</div><div class="flex-1 overflow-hidden"><p class="text-xs font-bold text-indigo-950 truncate">${ssrInterpolate(((_c = user.value) == null ? void 0 : _c.name) || "User")}</p><button type="button" class="text-[10px] text-rose-500 hover:text-rose-700 font-bold hover:underline transition uppercase tracking-wide text-left">${ssrInterpolate(_ctx.$t("nav_logout"))}</button></div></div></div></aside><main class="flex-1 overflow-y-auto relative w-full bg-slate-50/50"><div class="md:hidden bg-white/90 backdrop-blur-xl h-16 flex items-center justify-between px-6 border-b border-slate-100 sticky top-0 z-50 shadow-sm">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/favicon.svg?v=2" alt="OneForMind Logo" class="w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"${_scopeId}><span class="font-black text-indigo-950 text-lg tracking-tight"${_scopeId}>OneForMind.</span>`);
          } else {
            return [
              createVNode("img", {
                src: "/favicon.svg?v=2",
                alt: "OneForMind Logo",
                class: "w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
              }),
              createVNode("span", { class: "font-black text-indigo-950 text-lg tracking-tight" }, "OneForMind.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="text-slate-500 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-slate-50">`);
      if (!showingNavigationDropdown.value) {
        _push(`<span class="text-2xl">☰</span>`);
      } else {
        _push(`<span class="text-2xl font-bold">✕</span>`);
      }
      _push(`</button></div><div class="md:hidden fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-lg overflow-y-auto" style="${ssrRenderStyle(showingNavigationDropdown.value ? null : { display: "none" })}"><div class="p-4 space-y-2 pb-24">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "hover",
        class: ["block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg", _ctx.route().current("dashboard") ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"],
        onClick: ($event) => showingNavigationDropdown.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>🏠</span> ${ssrInterpolate(_ctx.$t("nav_dashboard"))}`);
          } else {
            return [
              createVNode("span", null, "🏠"),
              createTextVNode(" " + toDisplayString(_ctx.$t("nav_dashboard")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (showModule("habit")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          prefetch: "hover",
          class: ["block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg", _ctx.route().current("habits.*") ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>🌱</span> ${ssrInterpolate(_ctx.$t("habit_page_title"))}`);
            } else {
              return [
                createVNode("span", null, "🌱"),
                createTextVNode(" " + toDisplayString(_ctx.$t("habit_page_title")), 1)
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
          prefetch: "hover",
          class: ["block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg", _ctx.route().current("planner.*") ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>📅</span> Daily Planner `);
            } else {
              return [
                createVNode("span", null, "📅"),
                createTextVNode(" Daily Planner ")
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
          prefetch: "hover",
          class: ["block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg", _ctx.route().current("finance.*") ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>💸</span> Finance Management `);
            } else {
              return [
                createVNode("span", null, "💸"),
                createTextVNode(" Finance Management ")
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
        prefetch: "hover",
        class: ["block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg", _ctx.route().current("settings.*") ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"],
        onClick: ($event) => showingNavigationDropdown.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>⚙️</span> ${ssrInterpolate(_ctx.$t("nav_settings"))}`);
          } else {
            return [
              createVNode("span", null, "⚙️"),
              createTextVNode(" " + toDisplayString(_ctx.$t("nav_settings")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="border-t border-slate-100 my-4 pt-4"><div class="flex gap-2 px-2 mb-6"><button prefetch="hover" class="${ssrRenderClass([currentLang.value === "id" ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "border-slate-100 text-slate-400", "flex-1 py-3 rounded-xl text-sm font-bold border transition"])}">🇮🇩 INDONESIA</button><button prefetch="hover" class="${ssrRenderClass([currentLang.value === "en" ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "border-slate-100 text-slate-400", "flex-1 py-3 rounded-xl text-sm font-bold border transition"])}">🇬🇧 ENGLISH</button></div><button type="button" class="w-full text-center py-4 text-rose-500 font-bold bg-rose-50 rounded-2xl hover:bg-rose-100 transition flex items-center justify-center gap-2"><span>🚪</span> ${ssrInterpolate(_ctx.$t("nav_logout"))}</button></div></div></div><div class="w-full relative z-0">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
