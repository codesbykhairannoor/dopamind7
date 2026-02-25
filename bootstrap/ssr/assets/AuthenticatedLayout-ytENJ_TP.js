import { computed, ref, onMounted, watch, mergeProps, unref, withCtx, createVNode, Transition, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
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
    const isSidebarCollapsed = ref(false);
    onMounted(() => {
      const savedState = localStorage.getItem("sidebar_collapsed");
      if (savedState !== null) {
        isSidebarCollapsed.value = savedState === "true";
      }
    });
    const showModule = (moduleName) => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = user.value) == null ? void 0 : _a.settings) == null ? void 0 : _b.modules) == null ? void 0 : _c[moduleName]) !== false;
    };
    watch(() => page.url, () => {
      showingNavigationDropdown.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen bg-slate-50 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white relative" }, _attrs))} data-v-cbada496><aside class="${ssrRenderClass([isSidebarCollapsed.value ? "w-24" : "w-72", "bg-white border-r border-slate-100 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 transition-all duration-300 ease-in-out relative"])}" data-v-cbada496><button class="absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 shadow-sm transition-all z-30" data-v-cbada496>`);
      if (!isSidebarCollapsed.value) {
        _push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cbada496><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" data-v-cbada496></path></svg>`);
      } else {
        _push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cbada496><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" data-v-cbada496></path></svg>`);
      }
      _push(`</button><div class="${ssrRenderClass([isSidebarCollapsed.value ? "justify-center" : "justify-start px-8", "h-24 flex items-center px-6"])}" data-v-cbada496>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "group flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-200 shrink-0" data-v-cbada496${_scopeId}><img src="/favicon.svg?v=2" alt="Logo" class="w-6 h-6 brightness-0 invert" data-v-cbada496${_scopeId}></div>`);
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="text-xl font-black tracking-tighter text-slate-900 whitespace-nowrap" data-v-cbada496${_scopeId}> OneForMind<span class="text-indigo-600" data-v-cbada496${_scopeId}>.</span></span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-200 shrink-0" }, [
                createVNode("img", {
                  src: "/favicon.svg?v=2",
                  alt: "Logo",
                  class: "w-6 h-6 brightness-0 invert"
                })
              ]),
              createVNode(Transition, { name: "fade" }, {
                default: withCtx(() => [
                  !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-xl font-black tracking-tighter text-slate-900 whitespace-nowrap"
                  }, [
                    createTextVNode(" OneForMind"),
                    createVNode("span", { class: "text-indigo-600" }, ".")
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="${ssrRenderClass([isSidebarCollapsed.value ? "px-4" : "px-6", "flex-1 px-4 space-y-2 overflow-y-auto py-6 custom-scrollbar"])}" data-v-cbada496>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "hover",
        class: ["flex items-center rounded-2xl transition-all duration-300 group", [
          _ctx.route().current("dashboard") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
          isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
        ]],
        title: isSidebarCollapsed.value ? _ctx.$t("nav_dashboard") : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-xl" data-v-cbada496${_scopeId}>🏠</span>`);
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="whitespace-nowrap" data-v-cbada496${_scopeId}>${ssrInterpolate(_ctx.$t("nav_dashboard"))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("span", { class: "text-xl" }, "🏠"),
              !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "whitespace-nowrap"
              }, toDisplayString(_ctx.$t("nav_dashboard")), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (showModule("habit")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          prefetch: "hover",
          class: ["flex items-center rounded-2xl transition-all duration-300 group", [
            _ctx.route().current("habits.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("habit_page_title") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl" data-v-cbada496${_scopeId}>🌱</span>`);
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-cbada496${_scopeId}>${ssrInterpolate(_ctx.$t("habit_page_title"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("span", { class: "text-xl" }, "🌱"),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, toDisplayString(_ctx.$t("habit_page_title")), 1)) : createCommentVNode("", true)
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
          class: ["flex items-center rounded-2xl transition-all duration-300 group", [
            _ctx.route().current("planner.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? "Daily Planner" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl" data-v-cbada496${_scopeId}>📅</span>`);
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-cbada496${_scopeId}>Daily Planner</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("span", { class: "text-xl" }, "📅"),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, "Daily Planner")) : createCommentVNode("", true)
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
          class: ["flex items-center rounded-2xl transition-all duration-300 group", [
            _ctx.route().current("finance.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? "Finance" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl" data-v-cbada496${_scopeId}>💸</span>`);
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-cbada496${_scopeId}>Finance</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("span", { class: "text-xl" }, "💸"),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, "Finance")) : createCommentVNode("", true)
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
          class: ["flex items-center rounded-2xl transition-all duration-300 group", [
            _ctx.route().current("journal.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? "Journal" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl" data-v-cbada496${_scopeId}>📓</span>`);
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-cbada496${_scopeId}>Journal</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("span", { class: "text-xl" }, "📓"),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, "Journal")) : createCommentVNode("", true)
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
          href: _ctx.route("calendar.index"),
          prefetch: "hover",
          class: ["flex items-center rounded-2xl transition-all duration-300 group", [
            _ctx.route().current("calendar.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? "Calendar" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xl" data-v-cbada496${_scopeId}>📅</span>`);
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-cbada496${_scopeId}>Calendar</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("span", { class: "text-xl" }, "📅"),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, "Calendar")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="${ssrRenderClass([isSidebarCollapsed.value ? "px-3" : "px-6", "p-4 border-t border-slate-100 bg-slate-50/50 space-y-4"])}" data-v-cbada496>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("settings.index"),
        prefetch: "hover",
        class: ["flex items-center rounded-xl text-sm font-bold text-slate-500 hover:text-indigo-600 hover:bg-white transition border border-transparent hover:border-slate-200 hover:shadow-sm", isSidebarCollapsed.value ? "p-2 justify-center" : "px-4 py-2 gap-3"],
        title: isSidebarCollapsed.value ? _ctx.$t("nav_settings") : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-lg" data-v-cbada496${_scopeId}>⚙️</span>`);
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="whitespace-nowrap" data-v-cbada496${_scopeId}>${ssrInterpolate(_ctx.$t("nav_settings"))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("span", { class: "text-lg" }, "⚙️"),
              !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "whitespace-nowrap"
              }, toDisplayString(_ctx.$t("nav_settings")), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!isSidebarCollapsed.value) {
        _push(`<div class="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm" data-v-cbada496><button class="${ssrRenderClass([currentLang.value === "id" ? "bg-indigo-100 text-indigo-700 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all"])}" data-v-cbada496>🇮🇩 ID</button><button class="${ssrRenderClass([currentLang.value === "en" ? "bg-indigo-100 text-indigo-700 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all"])}" data-v-cbada496>🇬🇧 EN</button></div>`);
      } else {
        _push(`<div class="flex flex-col gap-2" data-v-cbada496><button class="w-full py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-bold text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all" title="Switch Language" data-v-cbada496>${ssrInterpolate(currentLang.value === "id" ? "🇮🇩" : "🇬🇧")}</button></div>`);
      }
      _push(`<div class="${ssrRenderClass([isSidebarCollapsed.value ? "justify-center" : "gap-3", "flex items-center pt-2 border-t border-slate-200/50"])}" data-v-cbada496><div class="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-200 shrink-0 cursor-pointer"${ssrRenderAttr("title", isSidebarCollapsed.value ? _ctx.$t("nav_logout") : "")} data-v-cbada496>${ssrInterpolate(((_b = (_a = user.value) == null ? void 0 : _a.name) == null ? void 0 : _b.charAt(0).toUpperCase()) || "U")}</div>`);
      if (!isSidebarCollapsed.value) {
        _push(`<div class="flex-1 overflow-hidden" data-v-cbada496><p class="text-xs font-bold text-indigo-950 truncate" data-v-cbada496>${ssrInterpolate(((_c = user.value) == null ? void 0 : _c.name) || "User")}</p><button type="button" class="text-[10px] text-rose-500 hover:text-rose-700 font-bold hover:underline transition uppercase tracking-wide text-left" data-v-cbada496>${ssrInterpolate(_ctx.$t("nav_logout"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></aside><main class="flex-1 overflow-y-auto relative w-full bg-slate-50/50 custom-scrollbar" data-v-cbada496><div class="md:hidden bg-white/90 backdrop-blur-xl h-16 flex items-center justify-between px-6 border-b border-slate-100 sticky top-0 z-50 shadow-sm" data-v-cbada496>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "group flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-200 shrink-0" data-v-cbada496${_scopeId}><img src="/favicon.svg?v=2" alt="Logo" class="w-6 h-6 brightness-0 invert" data-v-cbada496${_scopeId}></div>`);
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="text-xl font-black tracking-tighter text-slate-900 whitespace-nowrap" data-v-cbada496${_scopeId}> OneForMind<span class="text-indigo-600" data-v-cbada496${_scopeId}>.</span></span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-200 shrink-0" }, [
                createVNode("img", {
                  src: "/favicon.svg?v=2",
                  alt: "Logo",
                  class: "w-6 h-6 brightness-0 invert"
                })
              ]),
              createVNode(Transition, { name: "fade" }, {
                default: withCtx(() => [
                  !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-xl font-black tracking-tighter text-slate-900 whitespace-nowrap"
                  }, [
                    createTextVNode(" OneForMind"),
                    createVNode("span", { class: "text-indigo-600" }, ".")
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="text-slate-500 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-slate-50" data-v-cbada496>`);
      if (!showingNavigationDropdown.value) {
        _push(`<span class="text-2xl" data-v-cbada496>☰</span>`);
      } else {
        _push(`<span class="text-2xl font-bold" data-v-cbada496>✕</span>`);
      }
      _push(`</button></div><div class="md:hidden fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-lg overflow-y-auto" style="${ssrRenderStyle(showingNavigationDropdown.value ? null : { display: "none" })}" data-v-cbada496><div class="p-4 space-y-2 pb-24" data-v-cbada496>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "hover",
        class: ["block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg", _ctx.route().current("dashboard") ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"],
        onClick: ($event) => showingNavigationDropdown.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-cbada496${_scopeId}>🏠</span> ${ssrInterpolate(_ctx.$t("nav_dashboard"))}`);
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
              _push2(`<span data-v-cbada496${_scopeId}>🌱</span> ${ssrInterpolate(_ctx.$t("habit_page_title"))}`);
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
              _push2(`<span data-v-cbada496${_scopeId}>📅</span> Daily Planner `);
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
              _push2(`<span data-v-cbada496${_scopeId}>💸</span> Finance Management `);
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
              _push2(`<span data-v-cbada496${_scopeId}>📓</span> Journal `);
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
      if (showModule("calendar")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("calendar.index"),
          prefetch: "hover",
          class: ["block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg", _ctx.route().current("calendar.*") ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-cbada496${_scopeId}>📅</span> Calendar `);
            } else {
              return [
                createVNode("span", null, "📅"),
                createTextVNode(" Calendar ")
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
            _push2(`<span data-v-cbada496${_scopeId}>⚙️</span> ${ssrInterpolate(_ctx.$t("nav_settings"))}`);
          } else {
            return [
              createVNode("span", null, "⚙️"),
              createTextVNode(" " + toDisplayString(_ctx.$t("nav_settings")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="border-t border-slate-100 my-4 pt-4" data-v-cbada496><div class="flex gap-2 px-2 mb-6" data-v-cbada496><button prefetch="hover" class="${ssrRenderClass([currentLang.value === "id" ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "border-slate-100 text-slate-400", "flex-1 py-3 rounded-xl text-sm font-bold border transition"])}" data-v-cbada496>🇮🇩 INDONESIA</button><button prefetch="hover" class="${ssrRenderClass([currentLang.value === "en" ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "border-slate-100 text-slate-400", "flex-1 py-3 rounded-xl text-sm font-bold border transition"])}" data-v-cbada496>🇬🇧 ENGLISH</button></div><button type="button" class="w-full text-center py-4 text-rose-500 font-bold bg-rose-50 rounded-2xl hover:bg-rose-100 transition flex items-center justify-center gap-2" data-v-cbada496><span data-v-cbada496>🚪</span> ${ssrInterpolate(_ctx.$t("nav_logout"))}</button></div></div></div><div class="w-full relative z-0" data-v-cbada496>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
      if (showLogoutModal.value) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" data-v-cbada496><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" data-v-cbada496></div><div class="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300" data-v-cbada496><div class="p-8 text-center" data-v-cbada496><div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner" data-v-cbada496> 👋 </div><h3 class="text-2xl font-black text-slate-800 tracking-tight mb-2" data-v-cbada496>${ssrInterpolate(_ctx.$t("modal_logout_title"))}</h3><p class="text-slate-500 text-sm font-medium leading-relaxed" data-v-cbada496>${ssrInterpolate(_ctx.$t("modal_logout_subtitle"))}</p></div><div class="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-3" data-v-cbada496><button class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 hover:bg-rose-600 active:scale-[0.98] transition-all" data-v-cbada496>${ssrInterpolate(_ctx.$t("modal_logout_confirm"))}</button><button class="w-full bg-white text-slate-500 font-bold py-4 rounded-2xl border border-slate-200 hover:bg-slate-100 active:scale-[0.98] transition-all" data-v-cbada496>${ssrInterpolate(_ctx.$t("modal_logout_cancel"))}</button></div></div></div>`);
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
const AuthenticatedLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cbada496"]]);
export {
  AuthenticatedLayout as A
};
