import { computed, ref, onMounted, watch, resolveComponent, mergeProps, unref, withCtx, createVNode, Transition, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import { T as ThemeToggle } from "./ThemeToggle-ByQSx4Ee.js";
import { u as useAppearance } from "./useAppearance-rDoGVD4_.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
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
    const isExplorer = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.plan_type) === "explorer";
    });
    const isArchitect = computed(() => {
      var _a;
      return ["architect", "quantum", "legendary"].includes((_a = user.value) == null ? void 0 : _a.plan_type);
    });
    computed(() => {
      var _a;
      return ["quantum", "legendary"].includes((_a = user.value) == null ? void 0 : _a.plan_type);
    });
    const canAccess = (feature) => {
      const freeFeatures = ["dashboard", "habit", "planner", "finance"];
      if (freeFeatures.includes(feature)) return true;
      return isArchitect.value;
    };
    const currentLocale = computed(() => page.props.locale);
    watch(() => page.url, () => {
      showingNavigationDropdown.value = false;
    });
    const isPreviewOpen = ref(false);
    const activePreviewModule = ref("Coach");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_PremiumPreviewModal = resolveComponent("PremiumPreviewModal");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white relative transition-colors duration-500" }, _attrs))} data-v-a1fdbd78><aside class="${ssrRenderClass([isSidebarCollapsed.value ? "w-20" : "w-64", "bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none flex-shrink-0 transition-all duration-300 ease-in-out relative"])}" data-v-a1fdbd78><button class="absolute -right-3 top-8 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 shadow-sm dark:shadow-none transition-all z-30" data-v-a1fdbd78>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: !isSidebarCollapsed.value ? "chevron-left" : "chevron-right",
        size: "14",
        "stroke-width": "3"
      }, null, _parent));
      _push(`</button><div class="${ssrRenderClass([isSidebarCollapsed.value ? "justify-center" : "justify-start px-8", "h-20 flex items-center px-6 shrink-0"])}" data-v-a1fdbd78>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "",
        class: "group flex items-center gap-2.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-100 dark:shadow-none shrink-0" data-v-a1fdbd78${_scopeId}><img src="/favicon.svg" alt="Logo" class="w-5 h-5 brightness-0 invert" data-v-a1fdbd78${_scopeId}></div>`);
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="text-lg font-black tracking-tighter text-slate-900 dark:text-white whitespace-nowrap" data-v-a1fdbd78${_scopeId}> OneForMind </span>`);
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
      _push(`</div><nav class="${ssrRenderClass([isSidebarCollapsed.value ? "px-3" : "px-4", "flex-1 px-3 space-y-1 overflow-y-auto py-4 custom-scrollbar"])}" data-v-a1fdbd78><div class="px-3 pt-2 pb-1" data-v-a1fdbd78><span class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] ml-2" data-v-a1fdbd78>${ssrInterpolate(_ctx.$t("nav_core_modules", "System Core"))}</span></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "",
        class: ["flex items-center rounded-xl transition-all duration-300 group relative", [
          _ctx.route().current("dashboard") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm dark:shadow-none font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
          isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3"
        ]],
        title: isSidebarCollapsed.value ? _ctx.$t("nav_item_dashboard") : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "dashboard",
              size: "18",
              class: "shrink-0"
            }, null, _parent2, _scopeId));
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="whitespace-nowrap text-sm" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_dashboard"))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.route().current("dashboard") && !isSidebarCollapsed.value) {
              _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-a1fdbd78${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$1, {
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
            isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3"
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("nav_item_habit") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "habit",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-sm" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_habit"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("habits.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-a1fdbd78${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
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
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-sm" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_planner"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("planner.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-a1fdbd78${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
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
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "finance",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-sm" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_finance"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("finance.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-a1fdbd78${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
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
      _push(`<div class="px-3 pt-6 pb-1" data-v-a1fdbd78><span class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] ml-2" data-v-a1fdbd78>${ssrInterpolate(_ctx.$t("nav_platinum_suite", "Platinum Suite"))}</span></div>`);
      if (showModule("journal")) {
        _push(ssrRenderComponent(unref(Link), {
          href: canAccess("journal") ? _ctx.route("journal.index") : _ctx.route("billing"),
          prefetch: "",
          class: ["flex items-center rounded-xl transition-all duration-300 group relative", [
            _ctx.route().current("journal.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
            isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3",
            !canAccess("journal") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("nav_item_journal") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "journal",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-sm flex items-center justify-between w-full" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_journal"))} `);
                if (!canAccess("journal")) {
                  _push2(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-a1fdbd78${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("journal.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-a1fdbd78${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "journal",
                  size: "18",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap text-sm flex items-center justify-between w-full"
                }, [
                  createTextVNode(toDisplayString(_ctx.$t("nav_item_journal")) + " ", 1),
                  !canAccess("journal") ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"
                  })) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                _ctx.route().current("journal.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
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
      if (showModule("calendar")) {
        _push(ssrRenderComponent(unref(Link), {
          href: canAccess("calendar") ? _ctx.route("calendar.index") : _ctx.route("billing"),
          prefetch: "",
          class: ["flex items-center rounded-xl transition-all duration-300 group relative", [
            _ctx.route().current("calendar.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
            isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3",
            !canAccess("calendar") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("nav_item_calendar") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "calendar",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-sm flex items-center justify-between w-full" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_calendar"))} `);
                if (!canAccess("calendar")) {
                  _push2(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-a1fdbd78${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("calendar.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-a1fdbd78${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "calendar",
                  size: "18",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap text-sm flex items-center justify-between w-full"
                }, [
                  createTextVNode(toDisplayString(_ctx.$t("nav_item_calendar")) + " ", 1),
                  !canAccess("calendar") ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"
                  })) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                _ctx.route().current("calendar.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
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
      if (showModule("job")) {
        _push(ssrRenderComponent(unref(Link), {
          href: canAccess("job") ? _ctx.route("jobs.index") : _ctx.route("billing"),
          prefetch: "",
          class: ["flex items-center rounded-xl transition-all duration-300 group relative", [
            _ctx.route().current("jobs.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
            isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3",
            !canAccess("job") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("nav_item_jobs") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "job",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-sm flex items-center justify-between w-full" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_jobs"))} `);
                if (!canAccess("job")) {
                  _push2(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-a1fdbd78${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("jobs.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-a1fdbd78${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "job",
                  size: "18",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap text-sm flex items-center justify-between w-full"
                }, [
                  createTextVNode(toDisplayString(_ctx.$t("nav_item_jobs")) + " ", 1),
                  !canAccess("job") ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"
                  })) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                _ctx.route().current("jobs.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
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
      if (showModule("goal")) {
        _push(ssrRenderComponent(unref(Link), {
          href: canAccess("goal") ? _ctx.route("goals.index") : _ctx.route("billing"),
          prefetch: "",
          class: ["flex items-center rounded-xl transition-all duration-300 group relative", [
            _ctx.route().current("goals.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
            isSidebarCollapsed.value ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3",
            !canAccess("goal") ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("nav_item_goals") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "goal",
                size: "18",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap text-sm flex items-center justify-between w-full" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_goals"))} `);
                if (!canAccess("goal")) {
                  _push2(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" data-v-a1fdbd78${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("goals.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" data-v-a1fdbd78${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "goal",
                  size: "18",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap text-sm flex items-center justify-between w-full"
                }, [
                  createTextVNode(toDisplayString(_ctx.$t("nav_item_goals")) + " ", 1),
                  !canAccess("goal") ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"
                  })) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                _ctx.route().current("goals.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
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
      _push(`</nav><div class="px-4 py-3 shrink-0" data-v-a1fdbd78>`);
      _push(ssrRenderComponent(ThemeToggle, { collapsed: isSidebarCollapsed.value }, null, _parent));
      _push(`</div><div class="px-3 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 space-y-1 shrink-0" data-v-a1fdbd78><div class="${ssrRenderClass([isSidebarCollapsed.value ? "flex-col gap-1 w-10 mx-auto" : "mx-1 gap-1", "flex items-center p-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl mb-4 border border-slate-200/50 dark:border-slate-700/50 shadow-inner"])}" data-v-a1fdbd78><button class="${ssrRenderClass([currentLocale.value === "id" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md dark:shadow-none ring-1 ring-slate-200/50" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all duration-300"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? "Bahasa Indonesia" : "")} data-v-a1fdbd78> ID </button><button class="${ssrRenderClass([currentLocale.value === "en" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md dark:shadow-none ring-1 ring-slate-200/50" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all duration-300"])}"${ssrRenderAttr("title", isSidebarCollapsed.value ? "English" : "")} data-v-a1fdbd78> EN </button></div>`);
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
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "settings",
              size: "18",
              class: "shrink-0"
            }, null, _parent2, _scopeId));
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="whitespace-nowrap text-xs font-bold" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_settings"))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$1, {
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
      _push(`<div class="${ssrRenderClass([isSidebarCollapsed.value ? "flex-col gap-2" : "px-2 py-1", "flex items-center justify-between group"])}" data-v-a1fdbd78><div class="flex items-center gap-2.5 min-w-0"${ssrRenderAttr("title", isSidebarCollapsed.value ? (_a = user.value) == null ? void 0 : _a.name : "")} data-v-a1fdbd78>`);
      if ((_b = user.value) == null ? void 0 : _b.avatar_url) {
        _push(`<img${ssrRenderAttr("src", user.value.avatar_url)}${ssrRenderAttr("alt", _ctx.$t("nav_avatar", "Avatar"))} class="w-8 h-8 rounded-full object-cover shadow-sm dark:shadow-none border border-white shrink-0" data-v-a1fdbd78>`);
      } else {
        _push(`<div class="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold text-[10px] shadow-md dark:shadow-none shrink-0" data-v-a1fdbd78>${ssrInterpolate(((_d = (_c = user.value) == null ? void 0 : _c.name) == null ? void 0 : _d.charAt(0).toUpperCase()) || "U")}</div>`);
      }
      if (!isSidebarCollapsed.value) {
        _push(`<div class="flex-1 min-w-0 overflow-hidden" data-v-a1fdbd78><p class="text-[10px] font-black text-slate-800 dark:text-slate-200 truncate" data-v-a1fdbd78>${ssrInterpolate(((_e = user.value) == null ? void 0 : _e.name) || "User")}</p><p class="text-[9px] font-bold text-slate-400 truncate uppercase tracking-widest" data-v-a1fdbd78>${ssrInterpolate(_ctx.$t("nav_active_account", "Active Account"))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="button" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors shrink-0"${ssrRenderAttr("title", _ctx.$t("nav_logout", "Keluar"))} data-v-a1fdbd78>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "logout",
        size: "16",
        "stroke-width": "2.5"
      }, null, _parent));
      _push(`</button></div></div></aside><main class="flex-1 overflow-y-auto relative w-full bg-slate-50/50 dark:bg-slate-950 custom-scrollbar pb-32 md:pb-0 transition-colors duration-500" data-v-a1fdbd78><div class="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border-t border-slate-100 dark:border-slate-800 safe-area-pb transition-colors duration-500 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]" data-v-a1fdbd78><div class="flex items-center justify-around h-20 px-2 pt-1 pb-2" data-v-a1fdbd78>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "",
        class: ["flex flex-col items-center justify-center gap-1 transition-all flex-1", _ctx.route().current("dashboard") ? "text-indigo-600" : "text-slate-400"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "dashboard",
              size: 20,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[9px] font-black" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_dashboard"))}</span>`);
          } else {
            return [
              createVNode(_sfc_main$1, {
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
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "habit",
                size: 20,
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-[9px] font-black" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_habit"))}</span>`);
            } else {
              return [
                createVNode(_sfc_main$1, {
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
      _push(`<button class="${ssrRenderClass([!canAccess("ai") && !isExplorer.value ? "opacity-40 grayscale" : "", "relative -top-3 lg:-top-5 flex-1 flex flex-col items-center transition-all duration-500"])}" data-v-a1fdbd78><div class="w-14 h-14 lg:w-[4.25rem] lg:h-[4.25rem] bg-slate-900 dark:bg-indigo-600 rounded-2xl lg:rounded-[1.75rem] flex items-center justify-center shadow-lg transition-all active:scale-90 border-[4px] border-white dark:border-slate-950 overflow-hidden group" data-v-a1fdbd78><div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" data-v-a1fdbd78></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "sparkles",
        size: 20,
        class: "text-white relative z-10"
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-1 mt-1" data-v-a1fdbd78><span class="text-[8px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter" data-v-a1fdbd78>${ssrInterpolate(canAccess("ai") ? "Neural OS" : "Platinum OS")}</span></div></button>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("more.index"),
        prefetch: "",
        class: ["flex flex-col items-center justify-center gap-1 transition-all flex-1", _ctx.route().current("more.index") ? "text-indigo-600" : "text-slate-400"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "menu",
              size: 20,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[9px] font-black" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_more"))}</span>`);
          } else {
            return [
              createVNode(_sfc_main$1, {
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
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "settings",
              size: 20,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[9px] font-black" data-v-a1fdbd78${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_settings"))}</span>`);
          } else {
            return [
              createVNode(_sfc_main$1, {
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
      _push(`</div></div><div class="w-full relative z-0" data-v-a1fdbd78>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
      if (showLogoutModal.value) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" data-v-a1fdbd78><div class="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm" data-v-a1fdbd78></div><div class="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300" data-v-a1fdbd78><div class="p-8 text-center" data-v-a1fdbd78><div class="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner" data-v-a1fdbd78>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "logout",
          size: "40",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</div><h3 class="text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2" data-v-a1fdbd78>${ssrInterpolate(_ctx.$t("modal_logout_title", "Keluar Akun?"))}</h3><p class="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed" data-v-a1fdbd78>${ssrInterpolate(_ctx.$t("modal_logout_subtitle", "Sesi Anda akan diakhiri."))}</p></div><div class="p-6 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3" data-v-a1fdbd78><button class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-600 active:scale-[0.98] transition-all" data-v-a1fdbd78>${ssrInterpolate(_ctx.$t("modal_logout_confirm", "Ya, Keluar"))}</button><button class="w-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold py-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-[0.98] transition-all" data-v-a1fdbd78>${ssrInterpolate(_ctx.$t("modal_logout_cancel", "Batal"))}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!_ctx.route().current("coach.*")) {
        _push(`<button class="hidden md:block fixed bottom-10 right-10 z-[100] group" data-v-a1fdbd78><div class="relative" data-v-a1fdbd78><div class="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" data-v-a1fdbd78></div><div class="${ssrRenderClass([!canAccess("ai") && !isExplorer.value ? "grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" : "", "relative w-16 h-16 bg-slate-900 dark:bg-indigo-600 rounded-[1.8rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 active:scale-95 ring-4 ring-white dark:ring-slate-950 group-hover:ring-indigo-50 dark:group-hover:ring-indigo-500/20 overflow-hidden"])}" data-v-a1fdbd78><div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" data-v-a1fdbd78></div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "28",
          "stroke-width": "2",
          class: "text-white group-hover:rotate-[20deg] transition-transform duration-500 relative z-10"
        }, null, _parent));
        if (canAccess("ai")) {
          _push(`<span class="absolute top-4 right-4 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse z-20" data-v-a1fdbd78></span>`);
        } else {
          _push(`<span class="absolute top-4 right-4 w-2 h-2 bg-indigo-400 border border-white dark:border-slate-900 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.5)] z-20" data-v-a1fdbd78></span>`);
        }
        _push(`</div><div class="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-3 rounded-2xl whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-2xl border border-white/10 flex items-center gap-2" data-v-a1fdbd78><span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" data-v-a1fdbd78></span> NEURAL OS ONLINE </div></div></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_PremiumPreviewModal, {
        isOpen: isPreviewOpen.value,
        module: activePreviewModule.value,
        onClose: ($event) => isPreviewOpen.value = false
      }, null, _parent));
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
const AuthenticatedLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a1fdbd78"]]);
export {
  AuthenticatedLayout as A
};
