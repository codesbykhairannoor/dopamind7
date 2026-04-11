import { onMounted, onUnmounted, computed, ref, mergeProps, useSSRContext, unref, withCtx, renderSlot, createVNode, toDisplayString, createBlock, openBlock, resolveComponent, createTextVNode, watch, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Link, usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$5 } from "./OneForMindIcon-BvGLCgx4.js";
import { u as useAppearance } from "./useAppearance-rDoGVD4_.js";
import { u as useGating } from "./useGating-PcBpuO-w.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$4 = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      type: String,
      default: "right"
    },
    width: {
      type: String,
      default: "48"
    },
    contentClasses: {
      type: String,
      default: "py-1 bg-white dark:bg-slate-800"
    }
  },
  setup(__props) {
    const props = __props;
    const closeOnEscape = (e) => {
      if (open.value && e.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        48: "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "ltr:origin-top-left rtl:origin-top-right start-0";
      } else if (props.align === "right") {
        return "ltr:origin-top-right rtl:origin-top-left end-0";
      } else {
        return "origin-top";
      }
    });
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div class="fixed inset-0 z-40" style="${ssrRenderStyle(open.value ? null : { display: "none" })}"></div><div class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg dark:shadow-none"])}" style="${ssrRenderStyle([
        { "display": "none" },
        open.value ? null : { display: "none" }
      ])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5 dark:ring-slate-700"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: "block w-full px-4 py-2 text-start text-sm leading-5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800 transition duration-150 ease-in-out"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "GlobalHeader",
  __ssrInlineRender: true,
  props: {
    title: String,
    icon: String,
    isSidebarCollapsed: Boolean
  },
  emits: ["toggle-sidebar"],
  setup(__props, { emit: __emit }) {
    const page = usePage();
    const { isExplorer, user } = useGating();
    const { isDark, toggleTheme } = useAppearance();
    const props = __props;
    computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      if (props.title) return props.title;
      const routeName = route().current();
      if (routeName.startsWith("habits")) return ((_a = page.props.words) == null ? void 0 : _a.nav_item_habit) || "Habit Tracker";
      if (routeName.startsWith("finance")) return ((_b = page.props.words) == null ? void 0 : _b.nav_item_finance) || "Finance Plan";
      if (routeName.startsWith("planner")) return ((_c = page.props.words) == null ? void 0 : _c.nav_item_planner) || "Daily Planner";
      if (routeName.startsWith("journal")) return ((_d = page.props.words) == null ? void 0 : _d.nav_item_journal) || "Journal";
      if (routeName.startsWith("calendar")) return ((_e = page.props.words) == null ? void 0 : _e.nav_item_calendar) || "Calendar";
      if (routeName.startsWith("goals")) return ((_f = page.props.words) == null ? void 0 : _f.nav_item_goals) || "Goals";
      if (routeName.startsWith("jobs")) return ((_g = page.props.words) == null ? void 0 : _g.nav_item_jobs) || "Job Tracker";
      if (routeName === "dashboard") return ((_h = page.props.words) == null ? void 0 : _h.nav_item_dashboard) || "Dashboard";
      return "";
    });
    computed(() => {
      if (props.icon) return props.icon;
      const routeName = route().current();
      if (routeName.startsWith("habits")) return "habit";
      if (routeName.startsWith("finance")) return "finance";
      if (routeName.startsWith("planner")) return "planner";
      if (routeName.startsWith("journal")) return "journal";
      if (routeName.startsWith("calendar")) return "calendar";
      if (routeName.startsWith("goals")) return "goal";
      if (routeName.startsWith("jobs")) return "job";
      return "dashboard";
    });
    const currentLocale = computed(() => page.props.locale);
    const switchLang = (lang) => {
      if (lang === currentLocale.value) return;
      router.get(route("lang.switch", { locale: lang }));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[70] transition-colors duration-500" }, _attrs))}><div class="h-full px-4 flex items-center justify-between gap-4"><div class="flex items-center gap-3 min-w-0"><button class="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95" title="Toggle Sidebar">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        name: "menu",
        size: "20",
        "stroke-width": "2.5"
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "flex items-center gap-2.5 hover:opacity-80 transition-opacity"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none shrink-0 transition-transform duration-500"${_scopeId}><img src="/favicon.svg" alt="Logo" class="w-5 h-5 brightness-0 invert"${_scopeId}></div><span class="text-sm font-black text-slate-800 dark:text-white tracking-tighter hidden md:block"${_scopeId}>OneForMind</span>`);
          } else {
            return [
              createVNode("div", { class: "w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none shrink-0 transition-transform duration-500" }, [
                createVNode("img", {
                  src: "/favicon.svg",
                  alt: "Logo",
                  class: "w-5 h-5 brightness-0 invert"
                })
              ]),
              createVNode("span", { class: "text-sm font-black text-slate-800 dark:text-white tracking-tighter hidden md:block" }, "OneForMind")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div><div class="flex items-center gap-2 min-w-0"></div></div><div class="hidden md:flex items-center flex-1 max-w-lg group"><div class="relative w-full"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><input type="text" class="block w-full pl-10 pr-12 py-2 bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-700 transition-all outline-none transition-colors duration-500" placeholder="Search anything..."></div></div><div class="flex items-center gap-1 sm:gap-3">`);
      if (unref(isExplorer)) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("billing"),
          class: "hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-sm active:scale-95 group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-[10px] font-black capitalize tracking-wide"${_scopeId}>${ssrInterpolate(_ctx.$t("nav_see_plan", "See Plan"))}</span>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                name: "premium",
                size: "14",
                class: "animate-pulse"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", { class: "text-[10px] font-black capitalize tracking-wide" }, toDisplayString(_ctx.$t("nav_see_plan", "See Plan")), 1),
                createVNode(_sfc_main$5, {
                  name: "premium",
                  size: "14",
                  class: "animate-pulse"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-0.5"><button class="flex items-center justify-center w-9 h-9 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:scale-[1.05] transition-all relative overflow-hidden group shadow-lg active:scale-95 mr-1" title="Neural OS AI"><div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>`);
      _push(ssrRenderComponent(_sfc_main$5, {
        name: "sparkles",
        size: "18",
        class: "text-indigo-400 dark:text-indigo-600 animate-pulse"
      }, null, _parent));
      _push(`</button><button class="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 transition-all relative" title="Notifications">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        name: "notification",
        size: "18",
        "stroke-width": "2.5"
      }, null, _parent));
      _push(`<span class="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full"></span></button><button class="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 transition-all" title="Help">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        name: "help",
        size: "18",
        "stroke-width": "2.5"
      }, null, _parent));
      _push(`</button></div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        align: "right",
        width: "60"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<button class="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shrink-0 group"${_scopeId}><div class="relative"${_scopeId}>`);
            if ((_a = unref(user)) == null ? void 0 : _a.avatar_url) {
              _push2(`<img${ssrRenderAttr("src", unref(user).avatar_url)} class="w-8 h-8 rounded-lg border border-white dark:border-slate-800 shadow-sm"${_scopeId}>`);
            } else {
              _push2(`<div class="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-50 text-white dark:text-indigo-600 flex items-center justify-center text-[10px] font-black capitalize shadow-sm"${_scopeId}>${ssrInterpolate((_c = (_b = unref(user)) == null ? void 0 : _b.name) == null ? void 0 : _c.charAt(0))}</div>`);
            }
            _push2(`<div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"${_scopeId}></div></div><div class="hidden lg:block text-left leading-none px-1"${_scopeId}><p class="text-[11px] font-black text-slate-800 dark:text-slate-100 truncate max-w-[100px]"${_scopeId}>${ssrInterpolate((_d = unref(user)) == null ? void 0 : _d.name)}</p></div>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              name: "chevron-down",
              size: "12",
              "stroke-width": "4",
              class: "text-slate-400 group-hover:text-indigo-600 transition-colors"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shrink-0 group" }, [
                createVNode("div", { class: "relative" }, [
                  ((_e = unref(user)) == null ? void 0 : _e.avatar_url) ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: unref(user).avatar_url,
                    class: "w-8 h-8 rounded-lg border border-white dark:border-slate-800 shadow-sm"
                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-50 text-white dark:text-indigo-600 flex items-center justify-center text-[10px] font-black capitalize shadow-sm"
                  }, toDisplayString((_g = (_f = unref(user)) == null ? void 0 : _f.name) == null ? void 0 : _g.charAt(0)), 1)),
                  createVNode("div", { class: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" })
                ]),
                createVNode("div", { class: "hidden lg:block text-left leading-none px-1" }, [
                  createVNode("p", { class: "text-[11px] font-black text-slate-800 dark:text-slate-100 truncate max-w-[100px]" }, toDisplayString((_h = unref(user)) == null ? void 0 : _h.name), 1)
                ]),
                createVNode(_sfc_main$5, {
                  name: "chevron-down",
                  size: "12",
                  "stroke-width": "4",
                  class: "text-slate-400 group-hover:text-indigo-600 transition-colors"
                })
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="px-4 py-3 border-b border-slate-100 dark:border-slate-800"${_scopeId}><p class="text-[10px] font-black text-slate-400 capitalize tracking-wide mb-1"${_scopeId}>${ssrInterpolate(_ctx.$t("account_active"))}</p><p class="text-xs font-black text-slate-800 dark:text-white truncate"${_scopeId}>${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.name)}</p><p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate"${_scopeId}>${ssrInterpolate((_b = unref(user)) == null ? void 0 : _b.email)}</p></div><div class="p-2 border-b border-slate-100 dark:border-slate-800"${_scopeId}><p class="px-2 pb-1.5 text-[9px] font-bold text-slate-400 capitalize tracking-wide"${_scopeId}>${ssrInterpolate(_ctx.$t("nav_language"))}</p><div class="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-lg border border-slate-200/50 dark:border-slate-800/50"${_scopeId}><button class="${ssrRenderClass([currentLocale.value === "id" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 rounded-md text-[10px] font-black transition-all capitalize"])}"${_scopeId}>${ssrInterpolate(_ctx.$t("lang_id", "Bahasa"))}</button><button class="${ssrRenderClass([currentLocale.value === "en" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 rounded-md text-[10px] font-black transition-all capitalize"])}"${_scopeId}>${ssrInterpolate(_ctx.$t("lang_en", "English"))}</button></div></div><div class="p-1"${_scopeId}><button class="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="${ssrRenderClass([unref(isDark) ? "bg-amber-500/10 text-amber-500" : "bg-indigo-500/10 text-indigo-500", "w-7 h-7 rounded-lg flex items-center justify-center transition-colors"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              name: unref(isDark) ? "sun" : "moon",
              size: "16",
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="text-[11px] font-black text-slate-700 dark:text-slate-200 capitalize tracking-tight"${_scopeId}>${ssrInterpolate(unref(isDark) ? _ctx.$t("theme_light") : _ctx.$t("theme_dark"))}</span></div><div class="${ssrRenderClass([unref(isDark) ? "bg-indigo-500/30" : "", "w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700 relative transition-colors"])}"${_scopeId}><div class="${ssrRenderClass([unref(isDark) ? "bg-indigo-500 right-0.5" : "bg-white left-0.5", "absolute top-0.5 bottom-0.5 w-3 h-3 rounded-full transition-all duration-300 shadow-sm"])}"${_scopeId}></div></div></button></div><div class="border-t border-slate-100 dark:border-slate-800 p-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              href: _ctx.route("settings.index"),
              class: "flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    name: "settings",
                    size: "16",
                    "stroke-width": "2.5",
                    class: "text-slate-400"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-[11px] font-black text-slate-700 dark:text-slate-200 capitalize tracking-tight"${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_item_settings"))}</span>`);
                } else {
                  return [
                    createVNode(_sfc_main$5, {
                      name: "settings",
                      size: "16",
                      "stroke-width": "2.5",
                      class: "text-slate-400"
                    }),
                    createVNode("span", { class: "text-[11px] font-black text-slate-700 dark:text-slate-200 capitalize tracking-tight" }, toDisplayString(_ctx.$t("nav_item_settings")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-500 hover:text-rose-600 rounded-lg transition-all text-left"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              name: "logout",
              size: "16",
              "stroke-width": "3",
              class: "text-slate-400 group-hover:text-rose-500"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[11px] font-black capitalize tracking-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("nav_logout", "Keluar"))}</span></button></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 py-3 border-b border-slate-100 dark:border-slate-800" }, [
                createVNode("p", { class: "text-[10px] font-black text-slate-400 capitalize tracking-wide mb-1" }, toDisplayString(_ctx.$t("account_active")), 1),
                createVNode("p", { class: "text-xs font-black text-slate-800 dark:text-white truncate" }, toDisplayString((_c = unref(user)) == null ? void 0 : _c.name), 1),
                createVNode("p", { class: "text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate" }, toDisplayString((_d = unref(user)) == null ? void 0 : _d.email), 1)
              ]),
              createVNode("div", { class: "p-2 border-b border-slate-100 dark:border-slate-800" }, [
                createVNode("p", { class: "px-2 pb-1.5 text-[9px] font-bold text-slate-400 capitalize tracking-wide" }, toDisplayString(_ctx.$t("nav_language")), 1),
                createVNode("div", { class: "flex items-center gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-lg border border-slate-200/50 dark:border-slate-800/50" }, [
                  createVNode("button", {
                    onClick: ($event) => switchLang("id"),
                    class: ["flex-1 py-1.5 rounded-md text-[10px] font-black transition-all capitalize", currentLocale.value === "id" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-slate-400 hover:text-slate-600"]
                  }, toDisplayString(_ctx.$t("lang_id", "Bahasa")), 11, ["onClick"]),
                  createVNode("button", {
                    onClick: ($event) => switchLang("en"),
                    class: ["flex-1 py-1.5 rounded-md text-[10px] font-black transition-all capitalize", currentLocale.value === "en" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-slate-400 hover:text-slate-600"]
                  }, toDisplayString(_ctx.$t("lang_en", "English")), 11, ["onClick"])
                ])
              ]),
              createVNode("div", { class: "p-1" }, [
                createVNode("button", {
                  onClick: unref(toggleTheme),
                  class: "w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group"
                }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("div", {
                      class: ["w-7 h-7 rounded-lg flex items-center justify-center transition-colors", unref(isDark) ? "bg-amber-500/10 text-amber-500" : "bg-indigo-500/10 text-indigo-500"]
                    }, [
                      createVNode(_sfc_main$5, {
                        name: unref(isDark) ? "sun" : "moon",
                        size: "16",
                        "stroke-width": "2.5"
                      }, null, 8, ["name"])
                    ], 2),
                    createVNode("span", { class: "text-[11px] font-black text-slate-700 dark:text-slate-200 capitalize tracking-tight" }, toDisplayString(unref(isDark) ? _ctx.$t("theme_light") : _ctx.$t("theme_dark")), 1)
                  ]),
                  createVNode("div", {
                    class: ["w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700 relative transition-colors", unref(isDark) ? "bg-indigo-500/30" : ""]
                  }, [
                    createVNode("div", {
                      class: ["absolute top-0.5 bottom-0.5 w-3 h-3 rounded-full transition-all duration-300 shadow-sm", unref(isDark) ? "bg-indigo-500 right-0.5" : "bg-white left-0.5"]
                    }, null, 2)
                  ], 2)
                ], 8, ["onClick"])
              ]),
              createVNode("div", { class: "border-t border-slate-100 dark:border-slate-800 p-1" }, [
                createVNode(_sfc_main$3, {
                  href: _ctx.route("settings.index"),
                  class: "flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all"
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$5, {
                      name: "settings",
                      size: "16",
                      "stroke-width": "2.5",
                      class: "text-slate-400"
                    }),
                    createVNode("span", { class: "text-[11px] font-black text-slate-700 dark:text-slate-200 capitalize tracking-tight" }, toDisplayString(_ctx.$t("nav_item_settings")), 1)
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("button", {
                  onClick: ($event) => unref(router).post(_ctx.route("logout")),
                  class: "w-full flex items-center gap-3 px-3 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-500 hover:text-rose-600 rounded-lg transition-all text-left"
                }, [
                  createVNode(_sfc_main$5, {
                    name: "logout",
                    size: "16",
                    "stroke-width": "3",
                    class: "text-slate-400 group-hover:text-rose-500"
                  }),
                  createVNode("span", { class: "text-[11px] font-black capitalize tracking-tight" }, toDisplayString(_ctx.$t("nav_logout", "Keluar")), 1)
                ], 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/GlobalHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "NeuralBridge",
  __ssrInlineRender: true,
  props: {
    module: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const { isQuantum } = useGating();
    const synergy = ref(null);
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5" }, _attrs))}><div class="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity pointer-events-none">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        name: "sparkles",
        size: "80"
      }, null, _parent));
      _push(`</div><div class="flex items-start gap-4 relative z-10"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        name: "sparkles",
        size: "20",
        class: "text-white"
      }, null, _parent));
      _push(`</div><div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1"><span class="text-[10px] font-black text-indigo-500 capitalize tracking-wide">Neural Bridge</span>`);
      if (synergy.value) {
        _push(`<div class="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (loading.value) {
        _push(`<div class="space-y-2 py-1"><div class="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full animate-pulse"></div><div class="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3 animate-pulse"></div></div>`);
      } else if (synergy.value) {
        _push(`<div><p class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic"> &quot;${ssrInterpolate(synergy.value.bridge)}&quot; </p></div>`);
      } else {
        _push(`<div class="py-1">`);
        if (unref(isQuantum)) {
          _push(`<button class="text-xs font-black text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 capitalize tracking-wide flex items-center gap-2 transition-all active:scale-95"><span>Get Intelligence</span>`);
          _push(ssrRenderComponent(_sfc_main$5, {
            name: "chevron-right",
            size: "12",
            "stroke-width": "4"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<div class="flex items-center justify-between"><p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 capitalize tracking-wide">Neural insights require Quantum Plan</p>`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("billing"),
            class: "text-[10px] font-black text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 capitalize tracking-wide border-b border-indigo-200 dark:border-indigo-800 pb-0.5 transition-all"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Upgrade `);
              } else {
                return [
                  createTextVNode(" Upgrade ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NeuralBridge.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const { canUse, user } = useGating();
    const showLogoutModal = ref(false);
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
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
      localStorage.setItem("sidebar_collapsed", isSidebarCollapsed.value);
    };
    const showModule = (moduleName) => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = user.value) == null ? void 0 : _a.settings) == null ? void 0 : _b.modules) == null ? void 0 : _c[moduleName]) !== false;
    };
    watch(() => page.url, () => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white relative transition-colors duration-500" }, _attrs))} data-v-242c4b75>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "is-sidebar-collapsed": isSidebarCollapsed.value,
        onToggleSidebar: toggleSidebar
      }, null, _parent));
      _push(`<div class="flex flex-1 overflow-hidden relative" data-v-242c4b75><aside class="${ssrRenderClass([isSidebarCollapsed.value ? "w-20" : "w-64", "bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none flex-shrink-0 transition-all duration-300 ease-in-out relative"])}" data-v-242c4b75><nav class="${ssrRenderClass([isSidebarCollapsed.value ? "px-3" : "px-4", "flex-1 px-3 space-y-0.5 overflow-y-auto py-6 custom-scrollbar transition-all duration-500"])}" data-v-242c4b75><div class="px-3 pt-1 pb-2 flex items-center gap-2" data-v-242c4b75>`);
      if (isSidebarCollapsed.value) {
        _push(`<div class="h-px bg-slate-100 dark:bg-slate-800 w-full mb-2 transition-colors duration-500" data-v-242c4b75></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!isSidebarCollapsed.value) {
        _push(`<span class="text-[9px] font-black text-slate-400 dark:text-slate-600 capitalize tracking-widest ml-1 transition-colors duration-500" data-v-242c4b75>${ssrInterpolate(_ctx.$t("nav_core_modules", "Core System"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("dashboard"),
        prefetch: "",
        class: ["flex items-center rounded-xl transition-all duration-300 group relative mb-1", [
          _ctx.route().current("dashboard") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm dark:shadow-none font-black" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold",
          isSidebarCollapsed.value ? "p-2 justify-center" : "px-3 py-1.5 gap-3"
        ]],
        title: isSidebarCollapsed.value ? _ctx.$t("nav_item_dashboard") : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$5, {
              name: "dashboard",
              size: "18",
              class: "shrink-0"
            }, null, _parent2, _scopeId));
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="whitespace-nowrap text-xs capitalize tracking-tight" data-v-242c4b75${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_dashboard"))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.route().current("dashboard") && !isSidebarCollapsed.value) {
              _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-242c4b75${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$5, {
                name: "dashboard",
                size: "18",
                class: "shrink-0"
              }),
              !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "whitespace-nowrap text-xs capitalize tracking-tight"
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
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("habits.index"),
          prefetch: "",
          class: ["flex items-center rounded-xl transition-all duration-300 group relative mb-1", [
            _ctx.route().current("habits.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold",
            isSidebarCollapsed.value ? "p-2 justify-center" : "px-3 py-1.5 gap-3"
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("nav_item_habit") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                name: "habit",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-xs capitalize tracking-tight" data-v-242c4b75${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_habit"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("habits.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-242c4b75${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$5, {
                  name: "habit",
                  size: "18",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap text-xs capitalize tracking-tight"
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
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("planner.index"),
          prefetch: "",
          class: ["flex items-center rounded-xl transition-all duration-300 group relative mb-1", [
            _ctx.route().current("planner.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold",
            isSidebarCollapsed.value ? "p-2 justify-center" : "px-3 py-1.5 gap-2.5"
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("nav_item_planner") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                name: "planner",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-xs capitalize tracking-tight" data-v-242c4b75${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_planner"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("planner.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-242c4b75${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$5, {
                  name: "planner",
                  size: "18",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap text-xs capitalize tracking-tight"
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
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("finance.index"),
          prefetch: "",
          class: ["flex items-center rounded-xl transition-all duration-300 group relative mb-1", [
            _ctx.route().current("finance.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold",
            isSidebarCollapsed.value ? "p-1.5 justify-center" : "px-3 py-1.5 gap-2.5"
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("nav_item_finance") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                name: "finance",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-xs capitalize tracking-tight" data-v-242c4b75${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_finance"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("finance.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-242c4b75${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$5, {
                  name: "finance",
                  size: "18",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap text-xs capitalize tracking-tight"
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
      _push(`<div class="px-3 pt-6 pb-2" data-v-242c4b75>`);
      if (isSidebarCollapsed.value) {
        _push(`<div class="h-px bg-slate-100 dark:bg-slate-800 w-full mb-2 transition-colors duration-500" data-v-242c4b75></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!isSidebarCollapsed.value) {
        _push(`<span class="text-[9px] font-black text-slate-400 dark:text-slate-600 capitalize tracking-widest ml-1 transition-colors duration-500" data-v-242c4b75>${ssrInterpolate(_ctx.$t("nav_platinum_suite", "Platinum Suite"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showModule("journal")) {
        _push(`<div class="${ssrRenderClass([[
          _ctx.route().current("journal.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold",
          isSidebarCollapsed.value ? "p-1.5 justify-center" : "px-3 py-1.5 gap-2.5",
          !unref(canUse)("journal") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
        ], "flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer mb-1"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? _ctx.$t("nav_item_journal") : "")} data-v-242c4b75>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          name: "journal",
          size: "18",
          class: "shrink-0"
        }, null, _parent));
        if (!isSidebarCollapsed.value) {
          _push(`<span class="whitespace-nowrap text-xs capitalize tracking-tight flex items-center justify-between w-full" data-v-242c4b75>${ssrInterpolate(_ctx.$t("nav_item_journal"))} `);
          if (!unref(canUse)("journal")) {
            _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-242c4b75></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.route().current("journal.*") && !isSidebarCollapsed.value) {
          _push(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-242c4b75></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showModule("calendar")) {
        _push(`<div class="${ssrRenderClass([[
          _ctx.route().current("calendar.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold",
          isSidebarCollapsed.value ? "p-1.5 justify-center" : "px-3 py-1.5 gap-2.5",
          !unref(canUse)("calendar") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
        ], "flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer mb-1"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? _ctx.$t("nav_item_calendar") : "")} data-v-242c4b75>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          name: "calendar",
          size: "18",
          class: "shrink-0"
        }, null, _parent));
        if (!isSidebarCollapsed.value) {
          _push(`<span class="whitespace-nowrap text-xs capitalize tracking-tight flex items-center justify-between w-full" data-v-242c4b75>${ssrInterpolate(_ctx.$t("nav_item_calendar"))} `);
          if (!unref(canUse)("calendar")) {
            _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-242c4b75></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.route().current("calendar.*") && !isSidebarCollapsed.value) {
          _push(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-242c4b75></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showModule("job")) {
        _push(`<div class="${ssrRenderClass([[
          _ctx.route().current("jobs.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold",
          isSidebarCollapsed.value ? "p-1.5 justify-center" : "px-3 py-1.5 gap-2.5",
          !unref(canUse)("job") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
        ], "flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer mb-1"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? _ctx.$t("nav_item_jobs") : "")} data-v-242c4b75>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          name: "job",
          size: "18",
          class: "shrink-0"
        }, null, _parent));
        if (!isSidebarCollapsed.value) {
          _push(`<span class="whitespace-nowrap text-xs capitalize tracking-tight flex items-center justify-between w-full" data-v-242c4b75>${ssrInterpolate(_ctx.$t("nav_item_jobs"))} `);
          if (!unref(canUse)("job")) {
            _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-242c4b75></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.route().current("jobs.*") && !isSidebarCollapsed.value) {
          _push(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-242c4b75></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showModule("goal")) {
        _push(`<div class="${ssrRenderClass([[
          _ctx.route().current("goals.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold",
          isSidebarCollapsed.value ? "p-1.5 justify-center" : "px-3 py-1.5 gap-2.5",
          !unref(canUse)("goal") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
        ], "flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer mb-1"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? _ctx.$t("nav_item_goals") : "")} data-v-242c4b75>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          name: "goal",
          size: "18",
          class: "shrink-0"
        }, null, _parent));
        if (!isSidebarCollapsed.value) {
          _push(`<span class="whitespace-nowrap text-xs capitalize tracking-tight flex items-center justify-between w-full" data-v-242c4b75>${ssrInterpolate(_ctx.$t("nav_item_goals"))} `);
          if (!unref(canUse)("goal")) {
            _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-242c4b75></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.route().current("goals.*") && !isSidebarCollapsed.value) {
          _push(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-242c4b75></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="p-4 shrink-0 space-y-4" data-v-242c4b75>`);
      if (!isSidebarCollapsed.value) {
        _push(`<div class="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-indigo-300 transition-all" data-v-242c4b75><div class="flex items-center gap-3" data-v-242c4b75><div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-indigo-500 shadow-sm" data-v-242c4b75>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          name: "help",
          size: "14"
        }, null, _parent));
        _push(`</div><div data-v-242c4b75><p class="text-[10px] font-black text-slate-700 dark:text-slate-200 leading-none" data-v-242c4b75>Help Center</p><p class="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-tighter" data-v-242c4b75>Support &amp; Docs</p></div></div>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          name: "chevron-right",
          size: "12",
          class: "text-slate-300 group-hover:text-indigo-500 transition-colors"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!isSidebarCollapsed.value) {
        _push(ssrRenderComponent(_sfc_main$1, { module: "Dashboard" }, null, _parent));
      } else {
        _push(`<div class="w-12 h-12 mx-auto bg-slate-900 dark:bg-white rounded-[1.2rem] flex items-center justify-center text-white dark:text-slate-900 shadow-xl shadow-indigo-100/20 active:scale-95 transition-all cursor-pointer group" data-v-242c4b75>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          name: "sparkles",
          size: "20",
          class: "group-hover:rotate-12 transition-transform"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></aside><main class="flex-1 overflow-y-auto relative w-full bg-slate-50 dark:bg-slate-950 pb-32 md:pb-0 transition-colors duration-500 custom-scrollbar" data-v-242c4b75><div class="w-full relative z-0 px-0 pb-8 md:pb-10" data-v-242c4b75>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
      if (showLogoutModal.value) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" data-v-242c4b75><div class="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm" data-v-242c4b75></div><div class="relative bg-white dark:bg-slate-900 w-full max-sm rounded-[2.5rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300" data-v-242c4b75><div class="p-8 text-center" data-v-242c4b75><div class="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner" data-v-242c4b75>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          name: "logout",
          size: "40",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</div><h3 class="text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2" data-v-242c4b75>${ssrInterpolate(_ctx.$t("modal_logout_title", "Keluar Akun?"))}</h3><p class="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed" data-v-242c4b75>${ssrInterpolate(_ctx.$t("modal_logout_subtitle", "Sesi Anda akan diakhiri."))}</p></div><div class="p-6 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3" data-v-242c4b75><button class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-600 active:scale-[0.98] transition-all" data-v-242c4b75>${ssrInterpolate(_ctx.$t("modal_logout_confirm", "Ya, Keluar"))}</button><button class="w-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold py-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-[0.98] transition-all" data-v-242c4b75>${ssrInterpolate(_ctx.$t("modal_logout_cancel", "Batal"))}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!_ctx.route().current("coach.*")) {
        _push(`<button class="hidden md:block fixed bottom-10 right-10 z-[100] group" data-v-242c4b75><div class="relative" data-v-242c4b75><div class="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" data-v-242c4b75></div><div class="relative w-16 h-16 bg-slate-900 dark:bg-indigo-600 rounded-[1.8rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 active:scale-95 ring-4 ring-white dark:ring-slate-950 group-hover:ring-indigo-50 dark:group-hover:ring-indigo-500/20 overflow-hidden" data-v-242c4b75><div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" data-v-242c4b75></div>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          name: "sparkles",
          size: "28",
          "stroke-width": "2",
          class: "text-white group-hover:rotate-[20deg] transition-transform duration-500 relative z-10"
        }, null, _parent));
        _push(`<span class="absolute top-4 right-4 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse z-20" data-v-242c4b75></span></div><div class="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-5 py-3 rounded-2xl whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-2xl border border-white/10 flex items-center gap-2" data-v-242c4b75><span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" data-v-242c4b75></span> ${ssrInterpolate(_ctx.$t("nav_neural_active"))}</div></div></button>`);
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
const AuthenticatedLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-242c4b75"]]);
export {
  AuthenticatedLayout as A,
  _sfc_main$1 as _
};
