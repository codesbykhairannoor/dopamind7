import { computed, ref, onMounted, watch, mergeProps, unref, withCtx, createVNode, Transition, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./OneForMindIcon-Dwf7AvKJ.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen bg-slate-50 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white relative" }, _attrs))} data-v-57ff72a3><aside class="${ssrRenderClass([isSidebarCollapsed.value ? "w-24" : "w-72", "bg-white border-r border-slate-100 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 transition-all duration-300 ease-in-out relative"])}" data-v-57ff72a3><button class="absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 shadow-sm transition-all z-30" data-v-57ff72a3>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: !isSidebarCollapsed.value ? "chevron-left" : "chevron-right",
        size: "14",
        "stroke-width": "3"
      }, null, _parent));
      _push(`</button><div class="${ssrRenderClass([isSidebarCollapsed.value ? "justify-center" : "justify-start px-8", "h-24 flex items-center px-6"])}" data-v-57ff72a3>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "",
        class: "group flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-200 shrink-0" data-v-57ff72a3${_scopeId}><img src="/favicon.svg?v=2" alt="Logo" class="w-6 h-6 brightness-0 invert" data-v-57ff72a3${_scopeId}></div>`);
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="text-xl font-black tracking-tighter text-slate-900 whitespace-nowrap" data-v-57ff72a3${_scopeId}> OneForMind<span class="text-indigo-600" data-v-57ff72a3${_scopeId}>.</span></span>`);
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
      _push(`</div><nav class="${ssrRenderClass([isSidebarCollapsed.value ? "px-4" : "px-6", "flex-1 px-4 space-y-2 overflow-y-auto py-6 custom-scrollbar"])}" data-v-57ff72a3>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "mount",
        cacheFor: "1m",
        class: ["flex items-center rounded-2xl transition-all duration-300 group relative", [
          _ctx.route().current("dashboard") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
          isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
        ]],
        title: isSidebarCollapsed.value ? _ctx.$t("nav_dashboard") : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "dashboard",
              size: "20",
              class: "shrink-0"
            }, null, _parent2, _scopeId));
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="whitespace-nowrap" data-v-57ff72a3${_scopeId}>${ssrInterpolate(_ctx.$t("nav_dashboard", "Dashboard"))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.route().current("dashboard") && !isSidebarCollapsed.value) {
              _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full" data-v-57ff72a3${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$1, {
                name: "dashboard",
                size: "20",
                class: "shrink-0"
              }),
              !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "whitespace-nowrap"
              }, toDisplayString(_ctx.$t("nav_dashboard", "Dashboard")), 1)) : createCommentVNode("", true),
              _ctx.route().current("dashboard") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (showModule("habit")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          prefetch: "mount",
          cacheFor: "1m",
          class: ["flex items-center rounded-2xl transition-all duration-300 group relative", [
            _ctx.route().current("habits.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("habit_page_title") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "habit",
                size: "20",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-57ff72a3${_scopeId}>${ssrInterpolate(_ctx.$t("habit_page_title", "Habit Tracker"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("habits.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full" data-v-57ff72a3${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "habit",
                  size: "20",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, toDisplayString(_ctx.$t("habit_page_title", "Habit Tracker")), 1)) : createCommentVNode("", true),
                _ctx.route().current("habits.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"
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
          prefetch: "mount",
          cacheFor: "1m",
          class: ["flex items-center rounded-2xl transition-all duration-300 group relative", [
            _ctx.route().current("planner.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? "Daily Planner" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "20",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-57ff72a3${_scopeId}>Daily Planner</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("planner.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full" data-v-57ff72a3${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "planner",
                  size: "20",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, "Daily Planner")) : createCommentVNode("", true),
                _ctx.route().current("planner.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"
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
          prefetch: "mount",
          cacheFor: "1m",
          class: ["flex items-center rounded-2xl transition-all duration-300 group relative", [
            _ctx.route().current("finance.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? "Finance" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "finance",
                size: "20",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-57ff72a3${_scopeId}>Finance Plan</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("finance.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full" data-v-57ff72a3${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "finance",
                  size: "20",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, "Finance Plan")) : createCommentVNode("", true),
                _ctx.route().current("finance.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"
                })) : createCommentVNode("", true)
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
          prefetch: "mount",
          cacheFor: "1m",
          class: ["flex items-center rounded-2xl transition-all duration-300 group relative", [
            _ctx.route().current("journal.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? "Journal" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "journal",
                size: "20",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-57ff72a3${_scopeId}>Digital Journal</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("journal.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full" data-v-57ff72a3${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "journal",
                  size: "20",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, "Digital Journal")) : createCommentVNode("", true),
                _ctx.route().current("journal.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"
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
          href: _ctx.route("calendar.index"),
          prefetch: "mount",
          cacheFor: "1m",
          class: ["flex items-center rounded-2xl transition-all duration-300 group relative", [
            _ctx.route().current("calendar.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? "Calendar" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "calendar",
                size: "20",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-57ff72a3${_scopeId}>Calendar View</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("calendar.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full" data-v-57ff72a3${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "calendar",
                  size: "20",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, "Calendar View")) : createCommentVNode("", true),
                _ctx.route().current("calendar.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"
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
          href: _ctx.route("jobs.index"),
          prefetch: "mount",
          cacheFor: "1m",
          class: ["flex items-center rounded-2xl transition-all duration-300 group relative", [
            _ctx.route().current("jobs.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("job_tracker") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "job",
                size: "20",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-57ff72a3${_scopeId}>Job Tracker</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("jobs.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full" data-v-57ff72a3${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "job",
                  size: "20",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, "Job Tracker")) : createCommentVNode("", true),
                _ctx.route().current("jobs.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"
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
          href: _ctx.route("goals.index"),
          prefetch: "mount",
          cacheFor: "1m",
          class: ["flex items-center rounded-2xl transition-all duration-300 group relative", [
            _ctx.route().current("goals.*") ? "bg-indigo-50 text-indigo-700 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium",
            isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3.5 gap-4"
          ]],
          title: isSidebarCollapsed.value ? _ctx.$t("goal_page_title") : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "goal",
                size: "20",
                class: "shrink-0"
              }, null, _parent2, _scopeId));
              if (!isSidebarCollapsed.value) {
                _push2(`<span class="whitespace-nowrap" data-v-57ff72a3${_scopeId}>Goal Tracker</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.route().current("goals.*") && !isSidebarCollapsed.value) {
                _push2(`<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full" data-v-57ff72a3${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "goal",
                  size: "20",
                  class: "shrink-0"
                }),
                !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, "Goal Tracker")) : createCommentVNode("", true),
                _ctx.route().current("goals.*") && !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="${ssrRenderClass([isSidebarCollapsed.value ? "px-3" : "px-4", "p-4 border-t border-slate-100 bg-slate-50/50 space-y-2"])}" data-v-57ff72a3>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("settings.index"),
        prefetch: "",
        class: ["flex items-center rounded-2xl transition-all duration-300 group", [
          _ctx.route().current("settings.*") ? "bg-white shadow-sm border border-slate-200 text-indigo-600 font-bold" : "border border-transparent text-slate-500 hover:bg-white hover:border-slate-200 hover:shadow-sm hover:text-slate-800",
          isSidebarCollapsed.value ? "p-3 justify-center" : "px-4 py-3 gap-3"
        ]],
        title: isSidebarCollapsed.value ? _ctx.$t("nav_settings", "Pengaturan") : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "settings",
              size: "20",
              class: "shrink-0"
            }, null, _parent2, _scopeId));
            if (!isSidebarCollapsed.value) {
              _push2(`<span class="whitespace-nowrap" data-v-57ff72a3${_scopeId}>${ssrInterpolate(_ctx.$t("nav_settings", "Pengaturan"))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$1, {
                name: "settings",
                size: "20",
                class: "shrink-0"
              }),
              !isSidebarCollapsed.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "whitespace-nowrap"
              }, toDisplayString(_ctx.$t("nav_settings", "Pengaturan")), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="${ssrRenderClass([isSidebarCollapsed.value ? "flex-col gap-2" : "p-2", "flex items-center justify-between group"])}" data-v-57ff72a3>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("profile.edit"),
        prefetch: "",
        class: "flex items-center gap-3 hover:opacity-80 transition min-w-0",
        title: isSidebarCollapsed.value ? _ctx.$t("edit_profile", "Edit Profil") : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            if ((_a = user.value) == null ? void 0 : _a.avatar_url) {
              _push2(`<img${ssrRenderAttr("src", user.value.avatar_url)} alt="Avatar" class="w-10 h-10 rounded-full object-cover shadow-sm border-2 border-white shrink-0" data-v-57ff72a3${_scopeId}>`);
            } else {
              _push2(`<div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shrink-0" data-v-57ff72a3${_scopeId}>${ssrInterpolate(((_c = (_b = user.value) == null ? void 0 : _b.name) == null ? void 0 : _c.charAt(0).toUpperCase()) || "U")}</div>`);
            }
            if (!isSidebarCollapsed.value) {
              _push2(`<div class="flex-1 min-w-0 overflow-hidden" data-v-57ff72a3${_scopeId}><p class="text-xs font-black text-slate-800 truncate" data-v-57ff72a3${_scopeId}>${ssrInterpolate(((_d = user.value) == null ? void 0 : _d.name) || "User")}</p><p class="text-[11px] font-bold text-slate-400 truncate" data-v-57ff72a3${_scopeId}>${ssrInterpolate(_ctx.$t("edit_profile", "Edit Profil"))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              ((_e = user.value) == null ? void 0 : _e.avatar_url) ? (openBlock(), createBlock("img", {
                key: 0,
                src: user.value.avatar_url,
                alt: "Avatar",
                class: "w-10 h-10 rounded-full object-cover shadow-sm border-2 border-white shrink-0"
              }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shrink-0"
              }, toDisplayString(((_g = (_f = user.value) == null ? void 0 : _f.name) == null ? void 0 : _g.charAt(0).toUpperCase()) || "U"), 1)),
              !isSidebarCollapsed.value ? (openBlock(), createBlock("div", {
                key: 2,
                class: "flex-1 min-w-0 overflow-hidden"
              }, [
                createVNode("p", { class: "text-xs font-black text-slate-800 truncate" }, toDisplayString(((_h = user.value) == null ? void 0 : _h.name) || "User"), 1),
                createVNode("p", { class: "text-[11px] font-bold text-slate-400 truncate" }, toDisplayString(_ctx.$t("edit_profile", "Edit Profil")), 1)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors shrink-0"${ssrRenderAttr("title", _ctx.$t("nav_logout", "Keluar"))} data-v-57ff72a3>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "logout",
        size: "18",
        "stroke-width": "2.5"
      }, null, _parent));
      _push(`</button></div></div></aside><main class="flex-1 overflow-y-auto relative w-full bg-slate-50/50 custom-scrollbar" data-v-57ff72a3><div class="md:hidden bg-white/90 backdrop-blur-xl h-16 flex items-center justify-between px-6 border-b border-slate-100 sticky top-0 z-50 shadow-sm" data-v-57ff72a3>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "",
        class: "group flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shrink-0" data-v-57ff72a3${_scopeId}><img src="/favicon.svg?v=2" alt="Logo" class="w-6 h-6 brightness-0 invert" data-v-57ff72a3${_scopeId}></div><span class="text-lg font-black tracking-tighter text-slate-900" data-v-57ff72a3${_scopeId}>OneForMind<span class="text-indigo-600" data-v-57ff72a3${_scopeId}>.</span></span>`);
          } else {
            return [
              createVNode("div", { class: "w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shrink-0" }, [
                createVNode("img", {
                  src: "/favicon.svg?v=2",
                  alt: "Logo",
                  class: "w-6 h-6 brightness-0 invert"
                })
              ]),
              createVNode("span", { class: "text-lg font-black tracking-tighter text-slate-900" }, [
                createTextVNode("OneForMind"),
                createVNode("span", { class: "text-indigo-600" }, ".")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="text-slate-500 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-slate-50 focus:outline-none" data-v-57ff72a3>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: !showingNavigationDropdown.value ? "menu" : "x",
        size: "24",
        "stroke-width": "2.5"
      }, null, _parent));
      _push(`</button></div><div class="md:hidden fixed inset-0 top-16 z-40 bg-slate-50/95 backdrop-blur-2xl overflow-y-auto custom-scrollbar" style="${ssrRenderStyle(showingNavigationDropdown.value ? null : { display: "none" })}" data-v-57ff72a3><div class="p-6 space-y-6 pb-32" data-v-57ff72a3>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("profile.edit"),
        prefetch: "",
        onClick: ($event) => showingNavigationDropdown.value = false,
        class: "flex items-center gap-4 p-5 bg-white rounded-[2rem] shadow-sm border border-slate-100 active:scale-[0.98] transition-transform"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            if ((_a = user.value) == null ? void 0 : _a.avatar_url) {
              _push2(`<img${ssrRenderAttr("src", user.value.avatar_url)} alt="Avatar" class="w-14 h-14 rounded-full object-cover shadow-sm border-2 border-white shrink-0" data-v-57ff72a3${_scopeId}>`);
            } else {
              _push2(`<div class="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0" data-v-57ff72a3${_scopeId}>${ssrInterpolate(((_c = (_b = user.value) == null ? void 0 : _b.name) == null ? void 0 : _c.charAt(0).toUpperCase()) || "U")}</div>`);
            }
            _push2(`<div class="flex-1 min-w-0" data-v-57ff72a3${_scopeId}><p class="text-base font-black text-slate-800 truncate leading-tight mb-1" data-v-57ff72a3${_scopeId}>${ssrInterpolate(((_d = user.value) == null ? void 0 : _d.name) || "User")}</p><p class="text-[11px] font-bold uppercase tracking-widest text-indigo-500" data-v-57ff72a3${_scopeId}>${ssrInterpolate(_ctx.$t("edit_profile", "Edit Profil"))}</p></div><div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400" data-v-57ff72a3${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "chevron-right",
              size: "14",
              "stroke-width": "3"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              ((_e = user.value) == null ? void 0 : _e.avatar_url) ? (openBlock(), createBlock("img", {
                key: 0,
                src: user.value.avatar_url,
                alt: "Avatar",
                class: "w-14 h-14 rounded-full object-cover shadow-sm border-2 border-white shrink-0"
              }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0"
              }, toDisplayString(((_g = (_f = user.value) == null ? void 0 : _f.name) == null ? void 0 : _g.charAt(0).toUpperCase()) || "U"), 1)),
              createVNode("div", { class: "flex-1 min-w-0" }, [
                createVNode("p", { class: "text-base font-black text-slate-800 truncate leading-tight mb-1" }, toDisplayString(((_h = user.value) == null ? void 0 : _h.name) || "User"), 1),
                createVNode("p", { class: "text-[11px] font-bold uppercase tracking-widest text-indigo-500" }, toDisplayString(_ctx.$t("edit_profile", "Edit Profil")), 1)
              ]),
              createVNode("div", { class: "w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400" }, [
                createVNode(_sfc_main$1, {
                  name: "chevron-right",
                  size: "14",
                  "stroke-width": "3"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="bg-white rounded-[2rem] p-3 shadow-sm border border-slate-100 flex flex-col gap-1" data-v-57ff72a3>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "mount",
        cacheFor: "1m",
        class: ["px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base", _ctx.route().current("dashboard") ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 active:bg-slate-100"],
        onClick: ($event) => showingNavigationDropdown.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "dashboard",
              size: "20"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(_ctx.$t("nav_dashboard", "Dashboard"))}`);
          } else {
            return [
              createVNode(_sfc_main$1, {
                name: "dashboard",
                size: "20"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("nav_dashboard", "Dashboard")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (showModule("habit")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          prefetch: "mount",
          cacheFor: "1m",
          class: ["px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base", _ctx.route().current("habits.*") ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 active:bg-slate-100"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "habit",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(_ctx.$t("habit_page_title", "Habit Tracker"))}`);
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "habit",
                  size: "20"
                }),
                createTextVNode(" " + toDisplayString(_ctx.$t("habit_page_title", "Habit Tracker")), 1)
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
          prefetch: "mount",
          cacheFor: "1m",
          class: ["px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base", _ctx.route().current("planner.*") ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 active:bg-slate-100"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(` Daily Planner `);
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "planner",
                  size: "20"
                }),
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
          prefetch: "mount",
          cacheFor: "1m",
          class: ["px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base", _ctx.route().current("finance.*") ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 active:bg-slate-100"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "finance",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(` Finance Plan `);
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "finance",
                  size: "20"
                }),
                createTextVNode(" Finance Plan ")
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
          prefetch: "mount",
          cacheFor: "1m",
          class: ["px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base", _ctx.route().current("journal.*") ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 active:bg-slate-100"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "journal",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(` Digital Journal `);
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "journal",
                  size: "20"
                }),
                createTextVNode(" Digital Journal ")
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
          prefetch: "mount",
          cacheFor: "1m",
          class: ["px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base", _ctx.route().current("calendar.*") ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 active:bg-slate-100"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "calendar",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(` Calendar View `);
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "calendar",
                  size: "20"
                }),
                createTextVNode(" Calendar View ")
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
          href: _ctx.route("jobs.index"),
          prefetch: "mount",
          cacheFor: "1m",
          class: ["px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base", _ctx.route().current("jobs.*") ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 active:bg-slate-100"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "job",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(` Job Tracker `);
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "job",
                  size: "20"
                }),
                createTextVNode(" Job Tracker ")
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
          href: _ctx.route("goals.index"),
          prefetch: "mount",
          cacheFor: "1m",
          class: ["px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base", _ctx.route().current("goals.*") ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 active:bg-slate-100"],
          onClick: ($event) => showingNavigationDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "goal",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(` Goal Tracker `);
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "goal",
                  size: "20"
                }),
                createTextVNode(" Goal Tracker ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white rounded-[2rem] p-3 shadow-sm border border-slate-100 flex flex-col gap-1" data-v-57ff72a3>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("settings.index"),
        prefetch: "",
        class: ["px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base", _ctx.route().current("settings.*") ? "bg-slate-100 text-slate-800" : "text-slate-600 hover:bg-slate-50 active:bg-slate-100"],
        onClick: ($event) => showingNavigationDropdown.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "settings",
              size: "20"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(_ctx.$t("nav_settings", "Pengaturan"))}`);
          } else {
            return [
              createVNode(_sfc_main$1, {
                name: "settings",
                size: "20"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("nav_settings", "Pengaturan")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="h-px w-full bg-slate-100 my-1" data-v-57ff72a3></div><button type="button" class="w-full px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center justify-center gap-3 text-base text-rose-500 bg-rose-50 hover:bg-rose-100 active:scale-[0.98]" data-v-57ff72a3>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "logout",
        size: "20"
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.$t("nav_logout", "Keluar"))}</button></div></div></div><div class="w-full relative z-0" data-v-57ff72a3>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
      if (showLogoutModal.value) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" data-v-57ff72a3><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" data-v-57ff72a3></div><div class="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300" data-v-57ff72a3><div class="p-8 text-center" data-v-57ff72a3><div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner" data-v-57ff72a3>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "logout",
          size: "40",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</div><h3 class="text-2xl font-black text-slate-800 tracking-tight mb-2" data-v-57ff72a3>${ssrInterpolate(_ctx.$t("modal_logout_title", "Keluar Akun?"))}</h3><p class="text-slate-500 text-sm font-medium leading-relaxed" data-v-57ff72a3>${ssrInterpolate(_ctx.$t("modal_logout_subtitle", "Sesi Anda akan diakhiri."))}</p></div><div class="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-3" data-v-57ff72a3><button class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 hover:bg-rose-600 active:scale-[0.98] transition-all" data-v-57ff72a3>${ssrInterpolate(_ctx.$t("modal_logout_confirm", "Ya, Keluar"))}</button><button class="w-full bg-white text-slate-500 font-bold py-4 rounded-2xl border border-slate-200 hover:bg-slate-100 active:scale-[0.98] transition-all" data-v-57ff72a3>${ssrInterpolate(_ctx.$t("modal_logout_cancel", "Batal"))}</button></div></div></div>`);
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
const AuthenticatedLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-57ff72a3"]]);
export {
  AuthenticatedLayout as A
};
