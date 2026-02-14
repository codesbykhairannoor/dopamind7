import { ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    const user = usePage().props.auth.user;
    const page = usePage();
    const currentLang = computed(() => page.props.locale || "id");
    const isActive = (routeName) => route().current(routeName);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-brand-500 selection:text-white" }, _attrs))}><nav class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all animate-in slide-in-from-top-full duration-700"><div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "group text-2xl font-black text-indigo-600 tracking-tighter flex items-center gap-2 hover:opacity-80 transition z-20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/favicon.ico?v=2" alt="OneForMind Logo" class="w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"${_scopeId}><span${_scopeId}>OneForMind<span class="text-indigo-400"${_scopeId}>.</span></span>`);
          } else {
            return [
              createVNode("img", {
                src: "/favicon.ico?v=2",
                alt: "OneForMind Logo",
                class: "w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
              }),
              createVNode("span", null, [
                createTextVNode("OneForMind"),
                createVNode("span", { class: "text-indigo-400" }, ".")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex items-center gap-2 font-medium text-sm absolute left-1/2 -translate-x-1/2">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        prefetch: "",
        class: ["px-5 py-2.5 rounded-full transition-all duration-300", isActive("home") ? "bg-brand-50 text-brand-600 font-bold shadow-sm ring-1 ring-brand-100" : "text-gray-500 hover:text-brand-600 hover:bg-gray-50"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav_home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav_home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("about"),
        prefetch: "",
        class: ["px-5 py-2.5 rounded-full transition-all duration-300", isActive("about") ? "bg-brand-50 text-brand-600 font-bold shadow-sm ring-1 ring-brand-100" : "text-gray-500 hover:text-brand-600 hover:bg-gray-50"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav_about"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav_about")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden md:flex items-center gap-5 z-20"><div class="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200"><button prefetch class="${ssrRenderClass([currentLang.value === "id" ? "bg-white text-brand-600 shadow-sm" : "text-gray-400 hover:text-gray-600", "px-3 py-1 rounded-full text-xs font-bold transition-all duration-300"])}"> ID </button><button prefetch class="${ssrRenderClass([currentLang.value === "en" ? "bg-white text-brand-600 shadow-sm" : "text-gray-400 hover:text-gray-600", "px-3 py-1 rounded-full text-xs font-bold transition-all duration-300"])}"> EN </button></div><div class="h-6 w-px bg-gray-200"></div>`);
      if (unref(user)) {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dashboard"),
          prefetch: "",
          class: "text-sm font-bold text-brand-600 border border-brand-100 px-5 py-2.5 rounded-full hover:bg-brand-50 transition shadow-sm hover:shadow-md"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("nav_dashboard"))} → `);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("nav_dashboard")) + " → ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          prefetch: "",
          class: "px-4 py-2 text-sm font-bold text-gray-900 hover:text-brand-600 transition"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("nav_login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("nav_login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          prefetch: "",
          class: "px-6 py-2.5 text-sm font-bold text-white bg-brand-600 rounded-full hover:bg-brand-700 shadow-lg shadow-brand-200 transition transform hover:-translate-y-0.5 active:scale-95"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("nav_register"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("nav_register")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div><button class="md:hidden text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition z-20">`);
      if (!mobileMenuOpen.value) {
        _push(`<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
      } else {
        _push(`<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      }
      _push(`</button></div><div class="md:hidden bg-white border-b border-gray-100 p-6 shadow-xl animate-in slide-in-from-top-5 duration-300" style="${ssrRenderStyle(mobileMenuOpen.value ? null : { display: "none" })}"><div class="flex flex-col gap-4 text-center font-bold text-gray-600">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: ["py-2 rounded-xl transition", isActive("home") ? "bg-brand-50 text-brand-600" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav_home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav_home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("about"),
        class: ["py-2 rounded-xl transition", isActive("about") ? "bg-brand-50 text-brand-600" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav_about"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav_about")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<hr class="border-gray-100 my-2"><div class="flex justify-center gap-4 py-2"><button class="${ssrRenderClass(currentLang.value === "id" ? "text-brand-600 font-bold" : "text-gray-400")}">🇮🇩 ID</button><span class="text-gray-200">|</span><button class="${ssrRenderClass(currentLang.value === "en" ? "text-brand-600 font-bold" : "text-gray-400")}">🇬🇧 EN</button></div>`);
      if (!unref(user)) {
        _push(`<div class="flex flex-col gap-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "py-2 text-gray-900"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("nav_login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("nav_login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: "py-3 bg-brand-600 text-white rounded-xl shadow-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("nav_register"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("nav_register")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dashboard"),
          class: "block py-3 bg-brand-50 text-brand-600 rounded-xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("nav_dashboard"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("nav_dashboard")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div></nav><main class="flex-grow pt-20">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-white border-t border-gray-100 py-10 mt-auto"><div class="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm animate-in fade-in duration-1000 delay-500"><p>© 2026 OneForMind. ${ssrInterpolate(_ctx.$t("footer_rights"))}</p></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
