import { computed, ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    const currentLang = computed(() => page.props.locale || "id");
    const showingNavigationDropdown = ref(false);
    const showLogoutModal = ref(false);
    const showModule = (moduleName) => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = user.value) == null ? void 0 : _a.settings) == null ? void 0 : _b.modules) == null ? void 0 : _c[moduleName]) !== false;
    };
    watch(() => page.url, () => {
      showingNavigationDropdown.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen bg-slate-50 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white relative" }, _attrs))} data-v-671ffbc8><aside class="w-72 bg-white border-r border-slate-100 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 transition-all duration-300" data-v-671ffbc8><div class="h-24 flex items-center px-8" data-v-671ffbc8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "group flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-3xl transition-transform duration-500 group-hover:rotate-180 text-indigo-600" data-v-671ffbc8${_scopeId}>✦</span><span class="text-2xl font-black text-indigo-950 tracking-tighter" data-v-671ffbc8${_scopeId}>OneForMind.</span>`);
          } else {
            return [
              createVNode("span", { class: "text-3xl transition-transform duration-500 group-hover:rotate-180 text-indigo-600" }, "✦"),
              createVNode("span", { class: "text-2xl font-black text-indigo-950 tracking-tighter" }, "OneForMind.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="flex-1 px-6 space-y-2 overflow-y-auto py-6 custom-scrollbar" data-v-671ffbc8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "hover",
        class: ["flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group", _ctx.route().current("dashboard") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-xl" data-v-671ffbc8${_scopeId}>🏠</span><span data-v-671ffbc8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_dashboard"))}</span>`);
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
          prefetch: "hover",
          class: ["flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group", _ctx.route().current("habits.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl" data-v-671ffbc8${_scopeId}>🌱</span><span data-v-671ffbc8${_scopeId}>${ssrInterpolate(_ctx.$t("habit_page_title"))}</span>`);
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
          prefetch: "hover",
          class: ["flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group", _ctx.route().current("planner.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl" data-v-671ffbc8${_scopeId}>📅</span><span data-v-671ffbc8${_scopeId}>Daily Planner</span>`);
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
          prefetch: "hover",
          class: ["flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group", _ctx.route().current("finance.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl" data-v-671ffbc8${_scopeId}>💸</span><span data-v-671ffbc8${_scopeId}>Finance</span>`);
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
      if (showModule("journal")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("journal.index"),
          prefetch: "hover",
          class: ["flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group", _ctx.route().current("journal.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl" data-v-671ffbc8${_scopeId}>📓</span><span data-v-671ffbc8${_scopeId}>Journal</span>`);
            } else {
              return [
                createVNode("span", { class: "text-xl" }, "📓"),
                createVNode("span", null, "Journal")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4" data-v-671ffbc8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("settings.index"),
        prefetch: "hover",
        class: "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-indigo-600 hover:bg-white transition border border-transparent hover:border-slate-200 hover:shadow-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-lg" data-v-671ffbc8${_scopeId}>⚙️</span><span data-v-671ffbc8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_settings"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "text-lg" }, "⚙️"),
              createVNode("span", null, toDisplayString(_ctx.$t("nav_settings")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm" data-v-671ffbc8><button prefetch="hover" class="${ssrRenderClass([currentLang.value === "id" ? "bg-indigo-100 text-indigo-700 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all"])}" data-v-671ffbc8>🇮🇩 ID</button><button prefetch="hover" class="${ssrRenderClass([currentLang.value === "en" ? "bg-indigo-100 text-indigo-700 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all"])}" data-v-671ffbc8>🇬🇧 EN</button></div><div class="flex items-center gap-3 pt-2 border-t border-slate-200/50" data-v-671ffbc8><div class="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-200" data-v-671ffbc8>${ssrInterpolate(((_b = (_a = user.value) == null ? void 0 : _a.name) == null ? void 0 : _b.charAt(0).toUpperCase()) || "U")}</div><div class="flex-1 overflow-hidden" data-v-671ffbc8><p class="text-xs font-bold text-indigo-950 truncate" data-v-671ffbc8>${ssrInterpolate(((_c = user.value) == null ? void 0 : _c.name) || "User")}</p><button type="button" class="text-[10px] text-rose-500 hover:text-rose-700 font-bold hover:underline transition uppercase tracking-wide text-left" data-v-671ffbc8>${ssrInterpolate(_ctx.$t("nav_logout"))}</button></div></div></div></aside><main class="flex-1 overflow-y-auto relative w-full bg-slate-50/50" data-v-671ffbc8><div class="md:hidden bg-white/90 backdrop-blur-xl h-16 flex items-center justify-between px-6 border-b border-slate-100 sticky top-0 z-50 shadow-sm" data-v-671ffbc8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/favicon.svg?v=2" alt="OneForMind Logo" class="w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110" data-v-671ffbc8${_scopeId}><span class="font-black text-indigo-950 text-lg tracking-tight" data-v-671ffbc8${_scopeId}>OneForMind.</span>`);
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
      _push(`<button class="text-slate-500 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-slate-50" data-v-671ffbc8>`);
      if (!showingNavigationDropdown.value) {
        _push(`<span class="text-2xl" data-v-671ffbc8>☰</span>`);
      } else {
        _push(`<span class="text-2xl font-bold" data-v-671ffbc8>✕</span>`);
      }
      _push(`</button></div><div class="md:hidden fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-lg overflow-y-auto" style="${ssrRenderStyle(showingNavigationDropdown.value ? null : { display: "none" })}" data-v-671ffbc8><div class="p-4 space-y-2 pb-24" data-v-671ffbc8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "hover",
        class: ["block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg", _ctx.route().current("dashboard") ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"],
        onClick: ($event) => showingNavigationDropdown.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-671ffbc8${_scopeId}>🏠</span> ${ssrInterpolate(_ctx.$t("nav_dashboard"))}`);
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
              _push2(`<span data-v-671ffbc8${_scopeId}>🌱</span> ${ssrInterpolate(_ctx.$t("habit_page_title"))}`);
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
              _push2(`<span data-v-671ffbc8${_scopeId}>📅</span> Daily Planner `);
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
              _push2(`<span data-v-671ffbc8${_scopeId}>💸</span> Finance Management `);
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
      if (showModule("journal")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("journal.index"),
          prefetch: "hover",
          class: ["block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg", _ctx.route().current("journal.*") ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-671ffbc8${_scopeId}>📓</span> Journal `);
            } else {
              return [
                createVNode("span", null, "📓"),
                createTextVNode(" Journal ")
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
            _push2(`<span data-v-671ffbc8${_scopeId}>⚙️</span> ${ssrInterpolate(_ctx.$t("nav_settings"))}`);
          } else {
            return [
              createVNode("span", null, "⚙️"),
              createTextVNode(" " + toDisplayString(_ctx.$t("nav_settings")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="border-t border-slate-100 my-4 pt-4" data-v-671ffbc8><div class="flex gap-2 px-2 mb-6" data-v-671ffbc8><button prefetch="hover" class="${ssrRenderClass([currentLang.value === "id" ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "border-slate-100 text-slate-400", "flex-1 py-3 rounded-xl text-sm font-bold border transition"])}" data-v-671ffbc8>🇮🇩 INDONESIA</button><button prefetch="hover" class="${ssrRenderClass([currentLang.value === "en" ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "border-slate-100 text-slate-400", "flex-1 py-3 rounded-xl text-sm font-bold border transition"])}" data-v-671ffbc8>🇬🇧 ENGLISH</button></div><button type="button" class="w-full text-center py-4 text-rose-500 font-bold bg-rose-50 rounded-2xl hover:bg-rose-100 transition flex items-center justify-center gap-2" data-v-671ffbc8><span data-v-671ffbc8>🚪</span> ${ssrInterpolate(_ctx.$t("nav_logout"))}</button></div></div></div><div class="w-full relative z-0" data-v-671ffbc8>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
      if (showLogoutModal.value) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" data-v-671ffbc8><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" data-v-671ffbc8></div><div class="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300" data-v-671ffbc8><div class="p-8 text-center" data-v-671ffbc8><div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner" data-v-671ffbc8> 👋 </div><h3 class="text-2xl font-black text-slate-800 tracking-tight mb-2" data-v-671ffbc8>${ssrInterpolate(_ctx.$t("modal_logout_title"))}</h3><p class="text-slate-500 text-sm font-medium leading-relaxed" data-v-671ffbc8>${ssrInterpolate(_ctx.$t("modal_logout_subtitle"))}</p></div><div class="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-3" data-v-671ffbc8><button class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 hover:bg-rose-600 active:scale-[0.98] transition-all" data-v-671ffbc8>${ssrInterpolate(_ctx.$t("modal_logout_confirm"))}</button><button class="w-full bg-white text-slate-500 font-bold py-4 rounded-2xl border border-slate-200 hover:bg-slate-100 active:scale-[0.98] transition-all" data-v-671ffbc8>${ssrInterpolate(_ctx.$t("modal_logout_cancel"))}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
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
const AuthenticatedLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-671ffbc8"]]);
export {
  AuthenticatedLayout as A
};
