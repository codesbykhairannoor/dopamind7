import { onMounted, onUnmounted, computed, ref, mergeProps, useSSRContext, unref, withCtx, renderSlot, createVNode, toDisplayString, watch, nextTick, createBlock, openBlock, createTextVNode, createCommentVNode, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttr, ssrRenderTeleport } from "vue/server-renderer";
import { Link, usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$8 } from "./OneForMindIcon-BiMr3Mnd.js";
import { u as useAppearance } from "./useAppearance-rDoGVD4_.js";
import { u as useGating } from "./useGating-DZoi6H2L.js";
import { trans } from "laravel-vue-i18n";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$7 = {
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    prefetch: {
      type: [String, Array, Boolean],
      default: false
    },
    viewTransition: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        prefetch: __props.prefetch,
        "view-transition": __props.viewTransition,
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "NotificationSettings",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const page = usePage();
    const user = page.props.auth.user;
    const preferences = ref({
      habit: { enabled: true, time: "07:00" },
      planner: { enabled: true, time: "08:00" },
      journal: { enabled: false, time: "20:00" },
      finance: { enabled: false, time: "09:00" }
    });
    onMounted(() => {
      if (user.notification_preferences) {
        preferences.value = JSON.parse(JSON.stringify(user.notification_preferences));
      }
    });
    const isSaving = ref(false);
    const currentView = ref("inbox");
    const modules = [
      { key: "habit", label: "Habit Tracker", icon: "habit", color: "text-orange-500" },
      { key: "planner", label: "Daily Planner", icon: "planner", color: "text-indigo-500" },
      { key: "journal", label: "Daily Journal", icon: "journal", color: "text-emerald-500" },
      { key: "finance", label: "Finance Manager", icon: "finance", color: "text-rose-500" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute right-0 top-full mt-2 z-[100] w-80 sm:w-96 origin-top-right" }, _attrs))}><div class="fixed inset-0 z-[-1]"></div><div class="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200"><div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between"><div class="flex items-center gap-2">`);
        if (currentView.value === "settings") {
          _push(`<button class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">`);
          _push(ssrRenderComponent(_sfc_main$8, {
            name: "chevron-left",
            size: "16",
            "stroke-width": "2.5"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 class="text-sm font-black text-slate-800 dark:text-white tracking-tight">${ssrInterpolate(currentView.value === "inbox" ? "Notifications" : "Email Reminders")}</h3></div><div class="flex items-center gap-1">`);
        if (currentView.value === "inbox") {
          _push(`<button class="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all" title="Reminder Settings">`);
          _push(ssrRenderComponent(_sfc_main$8, {
            name: "settings",
            size: "16"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">`);
        _push(ssrRenderComponent(_sfc_main$8, {
          name: "close",
          size: "16",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</button></div></div><div class="max-h-[400px] overflow-y-auto">`);
        if (currentView.value === "inbox") {
          _push(`<div class="p-10 flex flex-col items-center text-center"><div class="w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">`);
          _push(ssrRenderComponent(_sfc_main$8, {
            name: "notification",
            size: "48",
            "stroke-width": "1.5",
            class: "text-indigo-500 opacity-60"
          }, null, _parent));
          _push(`</div><h4 class="text-base font-bold text-slate-700 dark:text-slate-200 mb-1">No new notifications</h4><p class="text-[12px] text-slate-500 dark:text-slate-400 max-w-[200px] leading-relaxed"> Kami akan memberi tahu jika ada sesuatu yang perlu perhatianmu. </p></div>`);
        } else {
          _push(`<div class="p-5 space-y-4"><p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium px-1 mb-2"> Atur waktu pengiriman reminder harian ke email kamu: </p><!--[-->`);
          ssrRenderList(modules, (mod) => {
            _push(`<div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">`);
            _push(ssrRenderComponent(_sfc_main$8, {
              name: mod.icon,
              size: "16",
              class: mod.color
            }, null, _parent));
            _push(`</div><span class="text-[13px] font-bold text-slate-700 dark:text-slate-200">${ssrInterpolate(mod.label)}</span></div><label class="relative inline-flex cursor-pointer items-center"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(preferences.value[mod.key].enabled) ? ssrLooseContain(preferences.value[mod.key].enabled, null) : preferences.value[mod.key].enabled) ? " checked" : ""} class="peer sr-only"><div class="peer h-4 w-8 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:content-[&#39;&#39;] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-focus:outline-none"></div></label></div>`);
            if (preferences.value[mod.key].enabled) {
              _push(`<div class="mt-3 flex items-center gap-3 pl-11"><span class="text-[10px] font-black text-slate-400 tracking-wide">At:</span><input type="time"${ssrRenderAttr("value", preferences.value[mod.key].time)} class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-[11px] font-bold text-slate-700 dark:text-white focus:ring-1 focus:ring-indigo-500 outline-none"></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--><div class="pt-4 px-1"><button${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-[12px] uppercase tracking-wider transition-all active:scale-[0.97] flex items-center justify-center gap-2">`);
          if (isSaving.value) {
            _push(`<svg class="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(isSaving.value ? "Saving..." : "Save Changes")}</button></div></div>`);
        }
        _push(`</div>`);
        if (currentView.value === "inbox") {
          _push(`<div class="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center"><button class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Mark all as read</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NotificationSettings.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "CommandPalettePanel",
  __ssrInlineRender: true,
  props: {
    searchQuery: { type: String, required: true },
    activeFilter: { type: String, required: true },
    filters: { type: Array, required: true },
    filteredResults: { type: Array, required: true },
    isNarrow: { type: Boolean, default: false },
    searchPlaceholder: { type: String, default: "" }
  },
  emits: ["update:searchQuery", "update:activeFilter", "close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const inputEl = ref(null);
    __expose({
      focusInput: () => {
        var _a;
        return (_a = inputEl.value) == null ? void 0 : _a.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative z-10 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.2)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)]", __props.isNarrow ? "mx-auto w-full max-w-lg max-h-[min(78vh,calc(100dvh-5rem))]" : ""]
      }, _attrs))} data-v-822f389f><div class="border-b border-slate-100 p-4 dark:border-slate-800" data-v-822f389f><div class="relative" data-v-822f389f><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" data-v-822f389f>`);
      _push(ssrRenderComponent(_sfc_main$8, {
        name: "search",
        size: "16",
        class: "text-indigo-500"
      }, null, _parent));
      _push(`</div><input type="text" class="w-full rounded-xl border-transparent bg-slate-50 py-2.5 pl-10 pr-12 text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"${ssrRenderAttr("value", __props.searchQuery)}${ssrRenderAttr("placeholder", __props.searchPlaceholder)} data-v-822f389f></div><div class="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto pb-1" data-v-822f389f><!--[-->`);
      ssrRenderList(__props.filters, (filter) => {
        _push(`<button type="button" class="${ssrRenderClass([
          __props.activeFilter === filter.key ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none" : "border-slate-200 bg-white text-slate-500 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-700",
          "flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-black tracking-wide transition-all"
        ])}" data-v-822f389f>`);
        _push(ssrRenderComponent(_sfc_main$8, {
          name: filter.icon,
          size: "12"
        }, null, _parent));
        _push(` ${ssrInterpolate(filter.label)}</button>`);
      });
      _push(`<!--]--></div></div><div class="${ssrRenderClass([__props.isNarrow ? "max-h-[min(48vh,420px)] min-h-0 flex-1" : "max-h-[380px]", "overflow-y-auto py-2"])}" data-v-822f389f>`);
      if (__props.filteredResults.length > 0) {
        _push(`<div data-v-822f389f><!--[-->`);
        ssrRenderList(__props.filteredResults, (item) => {
          _push(ssrRenderComponent(unref(Link), {
            key: item.name,
            href: item.href,
            class: "group flex items-center gap-4 px-5 py-3.5 transition-all hover:bg-slate-50 dark:hover:bg-slate-800",
            onClick: ($event) => emit("close")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400 shadow-sm transition-all group-hover:bg-white group-hover:text-indigo-600 dark:bg-slate-800 dark:group-hover:bg-slate-700" data-v-822f389f${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$8, {
                  name: item.icon,
                  size: "18"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="flex-1" data-v-822f389f${_scopeId}><p class="text-[14px] font-bold leading-none text-slate-700 dark:text-slate-200" data-v-822f389f${_scopeId}>${ssrInterpolate(item.name)}</p><p class="mt-1 whitespace-nowrap text-[11px] text-slate-400" data-v-822f389f${_scopeId}>Go to ${ssrInterpolate(item.name)} component</p></div>`);
                _push2(ssrRenderComponent(_sfc_main$8, {
                  name: "arrow-right",
                  size: "14",
                  class: "-translate-x-2 text-slate-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode("div", { class: "flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400 shadow-sm transition-all group-hover:bg-white group-hover:text-indigo-600 dark:bg-slate-800 dark:group-hover:bg-slate-700" }, [
                    createVNode(_sfc_main$8, {
                      name: item.icon,
                      size: "18"
                    }, null, 8, ["name"])
                  ]),
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("p", { class: "text-[14px] font-bold leading-none text-slate-700 dark:text-slate-200" }, toDisplayString(item.name), 1),
                    createVNode("p", { class: "mt-1 whitespace-nowrap text-[11px] text-slate-400" }, "Go to " + toDisplayString(item.name) + " component", 1)
                  ]),
                  createVNode(_sfc_main$8, {
                    name: "arrow-right",
                    size: "14",
                    class: "-translate-x-2 text-slate-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="px-6 py-12 text-center" data-v-822f389f><div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800" data-v-822f389f>`);
        _push(ssrRenderComponent(_sfc_main$8, {
          name: "zap",
          size: "20",
          class: "text-slate-400 opacity-50"
        }, null, _parent));
        _push(`</div><p class="text-[13px] font-black text-slate-600 dark:text-slate-300" data-v-822f389f>No matching results</p><p class="mt-1 text-[11px] text-slate-400" data-v-822f389f>Try switching filters or different keywords.</p></div>`);
      }
      _push(`</div><div class="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-2.5 dark:border-slate-800 dark:bg-slate-800/50" data-v-822f389f><div class="flex items-center gap-4 text-[10px] font-bold tracking-wide text-slate-400" data-v-822f389f><span data-v-822f389f>↑↓ Navigate</span><span data-v-822f389f>⏎ Select</span></div><span class="text-[9px] font-black text-indigo-400 dark:text-indigo-500" data-v-822f389f>OneForMind</span></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CommandPalettePanel.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const CommandPalettePanel = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-822f389f"]]);
const _sfc_main$3 = {
  __name: "CommandPalette",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean,
    /** Optional placeholder override */
    searchPlaceholder: { type: String, default: "" }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isNarrowViewport = ref(false);
    let mediaQuery;
    const updateViewport = () => {
      isNarrowViewport.value = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    };
    const searchQuery = ref("");
    const activeFilter = ref("all");
    const panelRef = ref(null);
    const filters = [
      { key: "all", label: "All", icon: "search" },
      { key: "habit", label: "Habits", icon: "habit" },
      { key: "task", label: "Tasks", icon: "planner" },
      { key: "people", label: "People", icon: "avatar" }
    ];
    const navigation = [
      { name: "Dashboard", icon: "dashboard", href: route("dashboard"), type: "all" },
      { name: "Habit Tracker", icon: "habit", href: route("habits.index"), type: "habit" },
      { name: "Daily Planner", icon: "planner", href: route("planner.index"), type: "task" },
      { name: "Finance Manager", icon: "finance", href: route("finance.index"), type: "all" }
    ];
    const filteredResults = computed(() => {
      let items = navigation;
      if (activeFilter.value !== "all") {
        items = items.filter((i) => i.type === activeFilter.value);
      }
      if (!searchQuery.value) {
        return items;
      }
      return items.filter((item) => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });
    const placeholderText = computed(() => {
      if (props.searchPlaceholder) {
        return props.searchPlaceholder;
      }
      const t = trans("nav_search_placeholder");
      return t !== "nav_search_placeholder" ? t : "Search modules…";
    });
    watch(
      () => props.isOpen,
      (val) => {
        updateViewport();
        if (val) {
          nextTick(() => {
            setTimeout(() => {
              var _a;
              return (_a = panelRef.value) == null ? void 0 : _a.focusInput();
            }, 50);
          });
        } else {
          searchQuery.value = "";
          activeFilter.value = "all";
        }
      }
    );
    onMounted(() => {
      updateViewport();
      mediaQuery = window.matchMedia("(max-width: 767px)");
      mediaQuery.addEventListener("change", updateViewport);
    });
    onUnmounted(() => {
      mediaQuery == null ? void 0 : mediaQuery.removeEventListener("change", updateViewport);
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.isOpen) {
          _push2(`<div class="${ssrRenderClass([
            isNarrowViewport.value ? "fixed inset-x-0 bottom-0 top-16 z-[100] px-3 pt-3" : "absolute left-0 top-full z-[100] mt-2 w-full min-w-[320px] max-w-2xl origin-top transition-all duration-200",
            "flex flex-col"
          ])}"><div aria-hidden="true" class="${ssrRenderClass(
            isNarrowViewport.value ? "absolute inset-0 z-0 bg-slate-950/60" : "fixed inset-0 z-[90] bg-transparent"
          )}"></div>`);
          _push2(ssrRenderComponent(CommandPalettePanel, {
            ref_key: "panelRef",
            ref: panelRef,
            "search-query": searchQuery.value,
            "active-filter": activeFilter.value,
            filters,
            "filtered-results": filteredResults.value,
            "is-narrow": isNarrowViewport.value,
            "search-placeholder": placeholderText.value,
            class: "relative z-[100]",
            "onUpdate:searchQuery": (v) => searchQuery.value = v,
            "onUpdate:activeFilter": (v) => activeFilter.value = v,
            onClose: ($event) => emit("close")
          }, null, _parent));
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", !isNarrowViewport.value, _parent);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CommandPalette.vue");
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
    const statusOptions = [
      { key: "active", label: "Active", dot: "bg-emerald-500" },
      { key: "away", label: "Away", dot: "bg-amber-400" },
      { key: "busy", label: "Do Not Disturb", dot: "bg-rose-500" },
      { key: "offline", label: "Appear Offline", dot: "bg-slate-400" }
    ];
    const workingStatus = ref("active");
    const currentStatus = computed(() => statusOptions.find((s) => s.key === workingStatus.value) ?? statusOptions[0]);
    const todayStreak = computed(() => page.props.today_streak ?? 0);
    const todayLabel = computed(() => {
      const now = /* @__PURE__ */ new Date();
      return now.toLocaleDateString(page.props.locale === "id" ? "id-ID" : "en-US", {
        weekday: "short",
        day: "numeric",
        month: "short"
      });
    });
    const currentLocale = computed(() => page.props.locale);
    const switchLang = (lang) => {
      if (lang === currentLocale.value) return;
      router.get(route("lang.switch", { locale: lang }), {}, {
        preserveScroll: true,
        preserveState: true
      });
    };
    const showNotificationSettings = ref(false);
    const showCommandPalette = ref(false);
    const handleGlobalShortcuts = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        showCommandPalette.value = true;
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", handleGlobalShortcuts);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleGlobalShortcuts);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 sticky top-top z-[70] transition-all duration-500" }, _attrs))}><div class="flex h-full items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4"><div class="flex shrink-0 items-center gap-2 sm:gap-3"><button class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-slate-100 active:scale-95 dark:hover:bg-slate-800 dark:hover:text-slate-200" type="button"${ssrRenderAttr("title", _ctx.$t("nav_toggle_menu", "Menu"))}${ssrRenderAttr("aria-label", _ctx.$t("nav_toggle_menu", "Menu"))}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "hover",
        class: "flex items-center gap-2.5 hover:opacity-80 transition-opacity"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none shrink-0"${_scopeId}><img src="/favicon.svg" alt="Logo" class="w-5 h-5 brightness-0 invert"${_scopeId}></div><span class="text-base font-black text-slate-800 dark:text-white tracking-tight hidden lg:block"${_scopeId}>OneForMind</span>`);
          } else {
            return [
              createVNode("div", { class: "w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none shrink-0" }, [
                createVNode("img", {
                  src: "/favicon.svg",
                  alt: "Logo",
                  class: "w-5 h-5 brightness-0 invert"
                })
              ]),
              createVNode("span", { class: "text-base font-black text-slate-800 dark:text-white tracking-tight hidden lg:block" }, "OneForMind")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="relative hidden min-w-0 max-w-lg flex-1 px-1 md:block md:px-2"><button type="button" class="${ssrRenderClass([showCommandPalette.value ? "border-indigo-100 dark:border-indigo-500/30" : "", "flex w-full items-center gap-3 rounded-2xl border-2 border-transparent bg-slate-100/60 px-4 py-2.5 shadow-sm shadow-transparent transition-all hover:border-indigo-100 hover:bg-white hover:shadow-indigo-100/30 dark:bg-slate-800/60 dark:hover:border-indigo-500/20 dark:hover:bg-slate-800 dark:hover:shadow-none"])}"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_sfc_main$8, {
        name: "search",
        size: "14",
        class: "text-slate-400 transition-colors"
      }, null, _parent));
      _push(`<span class="text-[13px] font-bold text-slate-400 transition-colors dark:text-slate-500">${ssrInterpolate(_ctx.$t("nav_search_anything"))}</span></div></button>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "is-open": showCommandPalette.value,
        onClose: ($event) => showCommandPalette.value = false
      }, null, _parent));
      _push(`</div><div class="flex shrink-0 items-center gap-0.5 sm:gap-1"><button type="button" class="${ssrRenderClass([showCommandPalette.value ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400" : "", "flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-slate-100 active:scale-95 dark:hover:bg-slate-800 dark:hover:text-slate-200 md:hidden"])}"${ssrRenderAttr("title", _ctx.$t("nav_search"))}${ssrRenderAttr("aria-label", _ctx.$t("nav_search"))}>`);
      _push(ssrRenderComponent(_sfc_main$8, {
        name: "search",
        size: "18"
      }, null, _parent));
      _push(`</button><div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-transparent transition-all group mr-1.5 shadow-sm" title="Current Date"><svg class="text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg><span class="text-[11px] font-black text-slate-600 dark:text-slate-300 transition-colors whitespace-nowrap">${ssrInterpolate(todayLabel.value)}</span></div>`);
      if (todayStreak.value > 0) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          prefetch: "hover",
          class: "hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 dark:hover:bg-orange-500/20 border border-orange-100 dark:border-orange-500/20 transition-all group mr-1",
          title: "Habit Streak"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-sm leading-none"${_scopeId}>🔥</span><span class="text-[11px] font-black text-orange-600 dark:text-orange-400"${_scopeId}>${ssrInterpolate(todayStreak.value)}</span>`);
            } else {
              return [
                createVNode("span", { class: "text-sm leading-none" }, "🔥"),
                createVNode("span", { class: "text-[11px] font-black text-orange-600 dark:text-orange-400" }, toDisplayString(todayStreak.value), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(isExplorer)) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("billing"),
          prefetch: "hover",
          class: "hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg transition-all shadow-sm shadow-indigo-200 dark:shadow-none active:scale-95 mr-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"${_scopeId}><path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"${_scopeId}></path></svg><span class="text-[10px] font-black capitalize tracking-wide"${_scopeId}>Upgrade</span>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "11",
                  height: "11",
                  viewBox: "0 0 24 24",
                  fill: "currentColor"
                }, [
                  createVNode("path", { d: "M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" })
                ])),
                createVNode("span", { class: "text-[10px] font-black capitalize tracking-wide" }, "Upgrade")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative"><button class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all relative" title="Notifications">`);
      _push(ssrRenderComponent(_sfc_main$8, {
        name: "notification",
        size: "18"
      }, null, _parent));
      _push(`<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border-[1.5px] border-white dark:border-slate-900 rounded-full flex items-center justify-center"></span></button>`);
      _push(ssrRenderComponent(_sfc_main$5, {
        "is-open": showNotificationSettings.value,
        onClose: ($event) => showNotificationSettings.value = false
      }, null, _parent));
      _push(`</div><button class="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all" title="Help">`);
      _push(ssrRenderComponent(_sfc_main$8, {
        name: "help",
        size: "18"
      }, null, _parent));
      _push(`</button><button class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all"${ssrRenderAttr("title", unref(isDark) ? "Light Mode" : "Dark Mode")}>`);
      if (unref(isDark)) {
        _push(ssrRenderComponent(_sfc_main$8, {
          name: "sun",
          size: "17"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_sfc_main$8, {
          name: "moon",
          size: "17"
        }, null, _parent));
      }
      _push(`</button><div class="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1.5"></div>`);
      _push(ssrRenderComponent(_sfc_main$7, {
        align: "right",
        width: "64"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<button class="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"${_scopeId}><div class="relative"${_scopeId}>`);
            if ((_a = unref(user)) == null ? void 0 : _a.avatar_url) {
              _push2(`<img${ssrRenderAttr("src", unref(user).avatar_url)} class="w-7 h-7 rounded-lg border border-white dark:border-slate-700 shadow-sm object-cover"${_scopeId}>`);
            } else {
              _push2(`<div class="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black capitalize shadow-sm"${_scopeId}>${ssrInterpolate((_c = (_b = unref(user)) == null ? void 0 : _b.name) == null ? void 0 : _c.charAt(0))}</div>`);
            }
            _push2(`<div class="${ssrRenderClass([currentStatus.value.dot, "absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-[1.5px] border-white dark:border-slate-900 transition-colors"])}"${_scopeId}></div></div><span class="hidden lg:block text-[12px] font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[80px]"${_scopeId}>${ssrInterpolate((_e = (_d = unref(user)) == null ? void 0 : _d.name) == null ? void 0 : _e.split(" ")[0])}</span><svg class="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><polyline points="6 9 12 15 18 9"${_scopeId}></polyline></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group" }, [
                createVNode("div", { class: "relative" }, [
                  ((_f = unref(user)) == null ? void 0 : _f.avatar_url) ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: unref(user).avatar_url,
                    class: "w-7 h-7 rounded-lg border border-white dark:border-slate-700 shadow-sm object-cover"
                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black capitalize shadow-sm"
                  }, toDisplayString((_h = (_g = unref(user)) == null ? void 0 : _g.name) == null ? void 0 : _h.charAt(0)), 1)),
                  createVNode("div", {
                    class: ["absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-[1.5px] border-white dark:border-slate-900 transition-colors", currentStatus.value.dot]
                  }, null, 2)
                ]),
                createVNode("span", { class: "hidden lg:block text-[12px] font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[80px]" }, toDisplayString((_j = (_i = unref(user)) == null ? void 0 : _i.name) == null ? void 0 : _j.split(" ")[0]), 1),
                (openBlock(), createBlock("svg", {
                  class: "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "11",
                  height: "11",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, [
                  createVNode("polyline", { points: "6 9 12 15 18 9" })
                ]))
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(`<div class="px-3.5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5"${_scopeId}><div class="relative shrink-0"${_scopeId}>`);
            if ((_a = unref(user)) == null ? void 0 : _a.avatar_url) {
              _push2(`<img${ssrRenderAttr("src", unref(user).avatar_url)} class="w-8 h-8 rounded-lg border border-white dark:border-slate-700 object-cover"${_scopeId}>`);
            } else {
              _push2(`<div class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[11px] font-black capitalize"${_scopeId}>${ssrInterpolate((_c = (_b = unref(user)) == null ? void 0 : _b.name) == null ? void 0 : _c.charAt(0))}</div>`);
            }
            _push2(`</div><div class="min-w-0 flex-1"${_scopeId}><p class="text-[12px] font-black text-slate-800 dark:text-white truncate leading-none"${_scopeId}>${ssrInterpolate((_d = unref(user)) == null ? void 0 : _d.name)}</p><p class="text-[10px] text-slate-400 truncate mt-0.5"${_scopeId}>${ssrInterpolate((_e = unref(user)) == null ? void 0 : _e.email)}</p></div><span class="${ssrRenderClass([unref(isExplorer) ? "bg-slate-100 dark:bg-slate-800 text-slate-400" : "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400", "shrink-0 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full"])}"${_scopeId}>${ssrInterpolate(((_f = unref(user)) == null ? void 0 : _f.plan_type) || "Explorer")}</span></div><div class="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800"${_scopeId}><p class="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1.5"${_scopeId}>Working Status</p><div class="flex items-center gap-1.5 flex-wrap"${_scopeId}><!--[-->`);
            ssrRenderList(statusOptions, (s) => {
              _push2(`<button class="${ssrRenderClass([workingStatus.value === s.key ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white" : "border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800", "flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all border"])}"${_scopeId}><span class="${ssrRenderClass([s.dot, "w-2 h-2 rounded-full shrink-0"])}"${_scopeId}></span> ${ssrInterpolate(s.label)}</button>`);
            });
            _push2(`<!--]--></div></div><div class="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><p class="text-[9px] font-black text-slate-400 uppercase tracking-wider"${_scopeId}>Language</p><div class="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg"${_scopeId}><button class="${ssrRenderClass([currentLocale.value === "id" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-400 hover:text-slate-700", "px-2.5 py-1 rounded-md text-[10px] font-black transition-all"])}"${_scopeId}>ID</button><button class="${ssrRenderClass([currentLocale.value === "en" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-400 hover:text-slate-700", "px-2.5 py-1 rounded-md text-[10px] font-black transition-all"])}"${_scopeId}>EN</button></div></div></div><div class="p-1.5 space-y-0.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"${_scopeId2}></path><circle cx="12" cy="7" r="4"${_scopeId2}></circle></svg><span class="text-[12px] font-medium text-slate-700 dark:text-slate-200"${_scopeId2}>My Profile</span>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors shrink-0",
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "15",
                      height: "15",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createVNode("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                      createVNode("circle", {
                        cx: "12",
                        cy: "7",
                        r: "4"
                      })
                    ])),
                    createVNode("span", { class: "text-[12px] font-medium text-slate-700 dark:text-slate-200" }, "My Profile")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, {
              href: _ctx.route("settings.index"),
              class: "flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId2}><circle cx="12" cy="12" r="3"${_scopeId2}></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"${_scopeId2}></path></svg><span class="text-[12px] font-medium text-slate-700 dark:text-slate-200"${_scopeId2}>${ssrInterpolate(_ctx.$t("nav_item_settings", "Settings"))}</span>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors shrink-0",
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "15",
                      height: "15",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createVNode("circle", {
                        cx: "12",
                        cy: "12",
                        r: "3"
                      }),
                      createVNode("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })
                    ])),
                    createVNode("span", { class: "text-[12px] font-medium text-slate-700 dark:text-slate-200" }, toDisplayString(_ctx.$t("nav_item_settings", "Settings")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group"${_scopeId}>`);
            if (unref(isDark)) {
              _push2(`<svg class="text-amber-500 shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><circle cx="12" cy="12" r="5"${_scopeId}></circle><line x1="12" y1="1" x2="12" y2="3"${_scopeId}></line><line x1="12" y1="21" x2="12" y2="23"${_scopeId}></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"${_scopeId}></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"${_scopeId}></line><line x1="1" y1="12" x2="3" y2="12"${_scopeId}></line><line x1="21" y1="12" x2="23" y2="12"${_scopeId}></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"${_scopeId}></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"${_scopeId}></line></svg>`);
            } else {
              _push2(`<svg class="text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"${_scopeId}></path></svg>`);
            }
            _push2(`<span class="text-[12px] font-medium text-slate-700 dark:text-slate-200"${_scopeId}>${ssrInterpolate(unref(isDark) ? "Light Mode" : "Dark Mode")}</span></button></div>`);
            if (unref(isExplorer)) {
              _push2(`<div class="px-2 pb-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("billing"),
                class: "flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-black text-[11px] uppercase tracking-wide transition-all active:scale-95 shadow-sm shadow-indigo-200 dark:shadow-none"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"${_scopeId2}><path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"${_scopeId2}></path></svg> Upgrade to Architect `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "11",
                        height: "11",
                        viewBox: "0 0 24 24",
                        fill: "currentColor"
                      }, [
                        createVNode("path", { d: "M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" })
                      ])),
                      createTextVNode(" Upgrade to Architect ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="border-t border-slate-100 dark:border-slate-800 p-1.5"${_scopeId}><button class="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all text-left group"${_scopeId}><svg class="text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"${_scopeId}></path><polyline points="16 17 21 12 16 7"${_scopeId}></polyline><line x1="21" y1="12" x2="9" y2="12"${_scopeId}></line></svg><span class="text-[12px] font-medium text-slate-700 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors"${_scopeId}>${ssrInterpolate(_ctx.$t("nav_logout", "Log Out"))}</span></button></div>`);
          } else {
            return [
              createVNode("div", { class: "px-3.5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5" }, [
                createVNode("div", { class: "relative shrink-0" }, [
                  ((_g = unref(user)) == null ? void 0 : _g.avatar_url) ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: unref(user).avatar_url,
                    class: "w-8 h-8 rounded-lg border border-white dark:border-slate-700 object-cover"
                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[11px] font-black capitalize"
                  }, toDisplayString((_i = (_h = unref(user)) == null ? void 0 : _h.name) == null ? void 0 : _i.charAt(0)), 1))
                ]),
                createVNode("div", { class: "min-w-0 flex-1" }, [
                  createVNode("p", { class: "text-[12px] font-black text-slate-800 dark:text-white truncate leading-none" }, toDisplayString((_j = unref(user)) == null ? void 0 : _j.name), 1),
                  createVNode("p", { class: "text-[10px] text-slate-400 truncate mt-0.5" }, toDisplayString((_k = unref(user)) == null ? void 0 : _k.email), 1)
                ]),
                createVNode("span", {
                  class: ["shrink-0 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full", unref(isExplorer) ? "bg-slate-100 dark:bg-slate-800 text-slate-400" : "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"]
                }, toDisplayString(((_l = unref(user)) == null ? void 0 : _l.plan_type) || "Explorer"), 3)
              ]),
              createVNode("div", { class: "px-3.5 py-2 border-b border-slate-100 dark:border-slate-800" }, [
                createVNode("p", { class: "text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1.5" }, "Working Status"),
                createVNode("div", { class: "flex items-center gap-1.5 flex-wrap" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(statusOptions, (s) => {
                    return createVNode("button", {
                      key: s.key,
                      onClick: ($event) => workingStatus.value = s.key,
                      class: ["flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all border", workingStatus.value === s.key ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white" : "border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"]
                    }, [
                      createVNode("span", {
                        class: ["w-2 h-2 rounded-full shrink-0", s.dot]
                      }, null, 2),
                      createTextVNode(" " + toDisplayString(s.label), 1)
                    ], 10, ["onClick"]);
                  }), 64))
                ])
              ]),
              createVNode("div", { class: "px-3.5 py-2 border-b border-slate-100 dark:border-slate-800" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("p", { class: "text-[9px] font-black text-slate-400 uppercase tracking-wider" }, "Language"),
                  createVNode("div", { class: "flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg" }, [
                    createVNode("button", {
                      onClick: ($event) => switchLang("id"),
                      class: ["px-2.5 py-1 rounded-md text-[10px] font-black transition-all", currentLocale.value === "id" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-400 hover:text-slate-700"]
                    }, "ID", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => switchLang("en"),
                      class: ["px-2.5 py-1 rounded-md text-[10px] font-black transition-all", currentLocale.value === "en" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-400 hover:text-slate-700"]
                    }, "EN", 10, ["onClick"])
                  ])
                ])
              ]),
              createVNode("div", { class: "p-1.5 space-y-0.5" }, [
                createVNode(_sfc_main$6, {
                  href: _ctx.route("profile.edit"),
                  class: "flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock("svg", {
                      class: "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors shrink-0",
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "15",
                      height: "15",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createVNode("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                      createVNode("circle", {
                        cx: "12",
                        cy: "7",
                        r: "4"
                      })
                    ])),
                    createVNode("span", { class: "text-[12px] font-medium text-slate-700 dark:text-slate-200" }, "My Profile")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(_sfc_main$6, {
                  href: _ctx.route("settings.index"),
                  class: "flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock("svg", {
                      class: "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors shrink-0",
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "15",
                      height: "15",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createVNode("circle", {
                        cx: "12",
                        cy: "12",
                        r: "3"
                      }),
                      createVNode("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })
                    ])),
                    createVNode("span", { class: "text-[12px] font-medium text-slate-700 dark:text-slate-200" }, toDisplayString(_ctx.$t("nav_item_settings", "Settings")), 1)
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("button", {
                  onClick: unref(toggleTheme),
                  class: "w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group"
                }, [
                  unref(isDark) ? (openBlock(), createBlock("svg", {
                    key: 0,
                    class: "text-amber-500 shrink-0",
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "15",
                    height: "15",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    createVNode("circle", {
                      cx: "12",
                      cy: "12",
                      r: "5"
                    }),
                    createVNode("line", {
                      x1: "12",
                      y1: "1",
                      x2: "12",
                      y2: "3"
                    }),
                    createVNode("line", {
                      x1: "12",
                      y1: "21",
                      x2: "12",
                      y2: "23"
                    }),
                    createVNode("line", {
                      x1: "4.22",
                      y1: "4.22",
                      x2: "5.64",
                      y2: "5.64"
                    }),
                    createVNode("line", {
                      x1: "18.36",
                      y1: "18.36",
                      x2: "19.78",
                      y2: "19.78"
                    }),
                    createVNode("line", {
                      x1: "1",
                      y1: "12",
                      x2: "3",
                      y2: "12"
                    }),
                    createVNode("line", {
                      x1: "21",
                      y1: "12",
                      x2: "23",
                      y2: "12"
                    }),
                    createVNode("line", {
                      x1: "4.22",
                      y1: "19.78",
                      x2: "5.64",
                      y2: "18.36"
                    }),
                    createVNode("line", {
                      x1: "18.36",
                      y1: "5.64",
                      x2: "19.78",
                      y2: "4.22"
                    })
                  ])) : (openBlock(), createBlock("svg", {
                    key: 1,
                    class: "text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 shrink-0",
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "15",
                    height: "15",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    createVNode("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
                  ])),
                  createVNode("span", { class: "text-[12px] font-medium text-slate-700 dark:text-slate-200" }, toDisplayString(unref(isDark) ? "Light Mode" : "Dark Mode"), 1)
                ], 8, ["onClick"])
              ]),
              unref(isExplorer) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "px-2 pb-2"
              }, [
                createVNode(unref(Link), {
                  href: _ctx.route("billing"),
                  class: "flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-black text-[11px] uppercase tracking-wide transition-all active:scale-95 shadow-sm shadow-indigo-200 dark:shadow-none"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "11",
                      height: "11",
                      viewBox: "0 0 24 24",
                      fill: "currentColor"
                    }, [
                      createVNode("path", { d: "M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" })
                    ])),
                    createTextVNode(" Upgrade to Architect ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "border-t border-slate-100 dark:border-slate-800 p-1.5" }, [
                createVNode("button", {
                  onClick: ($event) => unref(router).post(_ctx.route("logout")),
                  class: "w-full flex items-center gap-2.5 px-3 py-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all text-left group"
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "text-slate-400 group-hover:text-rose-500 transition-colors shrink-0",
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "15",
                    height: "15",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    createVNode("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
                    createVNode("polyline", { points: "16 17 21 12 16 7" }),
                    createVNode("line", {
                      x1: "21",
                      y1: "12",
                      x2: "9",
                      y2: "12"
                    })
                  ])),
                  createVNode("span", { class: "text-[12px] font-medium text-slate-700 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors" }, toDisplayString(_ctx.$t("nav_logout", "Log Out")), 1)
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
  __name: "AppSidebarNav",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "sidebar",
      validator: (v) => ["sidebar", "drawer"].includes(v)
    },
    /** Desktop sidebar only: icon-only rail */
    collapsed: { type: Boolean, default: false },
    coreExpanded: { type: Boolean, default: true },
    platinumExpanded: { type: Boolean, default: true }
  },
  emits: ["toggle-core", "toggle-platinum", "navigate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { isExplorer, canUse, user } = useGating();
    const showModule = (moduleName) => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = user.value) == null ? void 0 : _a.settings) == null ? void 0 : _b.modules) == null ? void 0 : _c[moduleName]) !== false;
    };
    const isActive = (pattern) => route().current(pattern);
    const isDrawer = computed(() => props.variant === "drawer");
    const showLabels = computed(() => isDrawer.value || !props.collapsed);
    const itemLayout = computed(() => {
      if (isDrawer.value) return "px-3 py-3 gap-3 min-h-[48px]";
      if (props.collapsed) return "justify-center px-0 py-2.5";
      return "px-2.5 py-2 gap-3";
    });
    const onNav = () => {
      emit("navigate");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["space-y-0.5", isDrawer.value ? "px-1" : ""]
      }, _attrs))} data-v-046522b8><button type="button" class="${ssrRenderClass([[!isDrawer.value && __props.collapsed ? "justify-center" : "", isDrawer.value ? "px-3" : ""], "w-full flex items-center justify-between px-2 py-1.5 mb-0.5 rounded-lg group transition-all duration-200"])}" data-v-046522b8>`);
      if (!isDrawer.value && __props.collapsed) {
        _push(`<div class="h-px bg-slate-100 dark:bg-slate-800 w-full my-2" data-v-046522b8></div>`);
      } else {
        _push(`<!--[--><span class="text-[9px] font-black text-slate-400 dark:text-slate-600 tracking-wide ml-1 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors" data-v-046522b8>${ssrInterpolate(_ctx.$t("nav_core_modules", "System Core"))}</span><div class="${ssrRenderClass([__props.coreExpanded ? "" : "-rotate-90", "flex items-center justify-center w-4 h-4 text-slate-300 transition-transform duration-200"])}" data-v-046522b8><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-046522b8><polyline points="6 9 12 15 18 9" data-v-046522b8></polyline></svg></div><!--]-->`);
      }
      _push(`</button><div class="space-y-0.5" style="${ssrRenderStyle(__props.coreExpanded || !isDrawer.value && __props.collapsed ? null : { display: "none" })}" data-v-046522b8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        prefetch: "hover",
        "view-transition": "",
        class: ["nav-item group", [
          isActive("dashboard") ? "nav-item-active" : "nav-item-default",
          itemLayout.value
        ]],
        title: !showLabels.value ? _ctx.$t("nav_item_dashboard") : "",
        onClick: onNav
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([
              isActive("dashboard") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300",
              "nav-icon shrink-0"
            ])}" data-v-046522b8${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              name: "dashboard",
              size: "18"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (showLabels.value) {
              _push2(`<span class="text-[12px] font-semibold tracking-tight truncate" data-v-046522b8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_dashboard"))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (isActive("dashboard") && showLabels.value) {
              _push2(`<div class="nav-active-bar" data-v-046522b8${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                class: [
                  "nav-icon shrink-0",
                  isActive("dashboard") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                ]
              }, [
                createVNode(_sfc_main$8, {
                  name: "dashboard",
                  size: "18"
                })
              ], 2),
              showLabels.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "text-[12px] font-semibold tracking-tight truncate"
              }, toDisplayString(_ctx.$t("nav_item_dashboard")), 1)) : createCommentVNode("", true),
              isActive("dashboard") && showLabels.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "nav-active-bar"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (showModule("habit")) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          prefetch: "hover",
          "view-transition": "",
          class: ["nav-item group", [
            isActive("habits.*") ? "nav-item-active" : "nav-item-default",
            itemLayout.value
          ]],
          title: !showLabels.value ? _ctx.$t("nav_item_habit") : "",
          onClick: onNav
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([
                isActive("habits.*") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300",
                "nav-icon shrink-0"
              ])}" data-v-046522b8${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$8, {
                name: "habit",
                size: "18"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (showLabels.value) {
                _push2(`<span class="text-[12px] font-semibold tracking-tight truncate" data-v-046522b8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_habit"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (isActive("habits.*") && showLabels.value) {
                _push2(`<div class="nav-active-bar" data-v-046522b8${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", {
                  class: [
                    "nav-icon shrink-0",
                    isActive("habits.*") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                  ]
                }, [
                  createVNode(_sfc_main$8, {
                    name: "habit",
                    size: "18"
                  })
                ], 2),
                showLabels.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-[12px] font-semibold tracking-tight truncate"
                }, toDisplayString(_ctx.$t("nav_item_habit")), 1)) : createCommentVNode("", true),
                isActive("habits.*") && showLabels.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "nav-active-bar"
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
          prefetch: "hover",
          "view-transition": "",
          class: ["nav-item group", [
            isActive("planner.*") ? "nav-item-active" : "nav-item-default",
            itemLayout.value
          ]],
          title: !showLabels.value ? _ctx.$t("nav_item_planner") : "",
          onClick: onNav
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([
                isActive("planner.*") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300",
                "nav-icon shrink-0"
              ])}" data-v-046522b8${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$8, {
                name: "planner",
                size: "18"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (showLabels.value) {
                _push2(`<span class="text-[12px] font-semibold tracking-tight truncate" data-v-046522b8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_planner"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (isActive("planner.*") && showLabels.value) {
                _push2(`<div class="nav-active-bar" data-v-046522b8${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", {
                  class: [
                    "nav-icon shrink-0",
                    isActive("planner.*") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                  ]
                }, [
                  createVNode(_sfc_main$8, {
                    name: "planner",
                    size: "18"
                  })
                ], 2),
                showLabels.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-[12px] font-semibold tracking-tight truncate"
                }, toDisplayString(_ctx.$t("nav_item_planner")), 1)) : createCommentVNode("", true),
                isActive("planner.*") && showLabels.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "nav-active-bar"
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
          prefetch: "hover",
          "view-transition": "",
          class: ["nav-item group", [
            isActive("finance.*") ? "nav-item-active" : "nav-item-default",
            itemLayout.value
          ]],
          title: !showLabels.value ? _ctx.$t("nav_item_finance") : "",
          onClick: onNav
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([
                isActive("finance.*") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300",
                "nav-icon shrink-0"
              ])}" data-v-046522b8${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$8, {
                name: "finance",
                size: "18"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (showLabels.value) {
                _push2(`<span class="text-[12px] font-semibold tracking-tight truncate" data-v-046522b8${_scopeId}>${ssrInterpolate(_ctx.$t("nav_item_finance"))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (isActive("finance.*") && showLabels.value) {
                _push2(`<div class="nav-active-bar" data-v-046522b8${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", {
                  class: [
                    "nav-icon shrink-0",
                    isActive("finance.*") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                  ]
                }, [
                  createVNode(_sfc_main$8, {
                    name: "finance",
                    size: "18"
                  })
                ], 2),
                showLabels.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-[12px] font-semibold tracking-tight truncate"
                }, toDisplayString(_ctx.$t("nav_item_finance")), 1)) : createCommentVNode("", true),
                isActive("finance.*") && showLabels.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "nav-active-bar"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="h-3" data-v-046522b8></div><button type="button" class="${ssrRenderClass([[!isDrawer.value && __props.collapsed ? "justify-center" : "", isDrawer.value ? "px-3" : ""], "w-full flex items-center justify-between px-2 py-1.5 mb-0.5 rounded-lg group transition-all duration-200"])}" data-v-046522b8>`);
      if (!isDrawer.value && __props.collapsed) {
        _push(`<div class="h-px bg-slate-100 dark:bg-slate-800 w-full my-2" data-v-046522b8></div>`);
      } else {
        _push(`<!--[--><div class="flex items-center gap-1.5 ml-1" data-v-046522b8><span class="text-[9px] font-black text-slate-400 dark:text-slate-600 tracking-wide group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors" data-v-046522b8>${ssrInterpolate(_ctx.$t("nav_platinum_suite", "Platinum Suite"))}</span>`);
        if (unref(isExplorer)) {
          _push(`<div class="w-3 h-3 text-slate-300 dark:text-slate-700" data-v-046522b8><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-046522b8><rect x="3" y="11" width="18" height="11" rx="2" ry="2" data-v-046522b8></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-v-046522b8></path></svg></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="${ssrRenderClass([__props.platinumExpanded ? "" : "-rotate-90", "flex items-center justify-center w-4 h-4 text-slate-300 transition-transform duration-200"])}" data-v-046522b8><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-046522b8><polyline points="6 9 12 15 18 9" data-v-046522b8></polyline></svg></div><!--]-->`);
      }
      _push(`</button><div class="space-y-0.5" style="${ssrRenderStyle(__props.platinumExpanded || !isDrawer.value && __props.collapsed ? null : { display: "none" })}" data-v-046522b8>`);
      if (showModule("journal")) {
        _push(`<div class="${ssrRenderClass([[
          isActive("journal.*") ? "nav-item-active" : "nav-item-default",
          itemLayout.value,
          !unref(canUse)("journal") ? "opacity-60" : ""
        ], "nav-item group cursor-pointer"])}"${ssrRenderAttr("title", !showLabels.value ? _ctx.$t("nav_item_journal") : "")} data-v-046522b8><div class="${ssrRenderClass([
          isActive("journal.*") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300",
          "nav-icon shrink-0"
        ])}" data-v-046522b8>`);
        _push(ssrRenderComponent(_sfc_main$8, {
          name: "journal",
          size: "18"
        }, null, _parent));
        _push(`</div>`);
        if (showLabels.value) {
          _push(`<span class="text-[12px] font-semibold tracking-tight truncate flex-1" data-v-046522b8>${ssrInterpolate(_ctx.$t("nav_item_journal"))}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(canUse)("journal") && showLabels.value) {
          _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]" data-v-046522b8></div>`);
        } else {
          _push(`<!---->`);
        }
        if (isActive("journal.*") && showLabels.value) {
          _push(`<div class="nav-active-bar" data-v-046522b8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showModule("calendar")) {
        _push(`<div class="${ssrRenderClass([[
          isActive("calendar.*") ? "nav-item-active" : "nav-item-default",
          itemLayout.value,
          !unref(canUse)("calendar") ? "opacity-60" : ""
        ], "nav-item group cursor-pointer"])}"${ssrRenderAttr("title", !showLabels.value ? _ctx.$t("nav_item_calendar") : "")} data-v-046522b8><div class="${ssrRenderClass([
          isActive("calendar.*") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300",
          "nav-icon shrink-0"
        ])}" data-v-046522b8>`);
        _push(ssrRenderComponent(_sfc_main$8, {
          name: "calendar",
          size: "18"
        }, null, _parent));
        _push(`</div>`);
        if (showLabels.value) {
          _push(`<span class="text-[12px] font-semibold tracking-tight truncate flex-1" data-v-046522b8>${ssrInterpolate(_ctx.$t("nav_item_calendar"))}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(canUse)("calendar") && showLabels.value) {
          _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]" data-v-046522b8></div>`);
        } else {
          _push(`<!---->`);
        }
        if (isActive("calendar.*") && showLabels.value) {
          _push(`<div class="nav-active-bar" data-v-046522b8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showModule("job")) {
        _push(`<div class="${ssrRenderClass([[
          isActive("jobs.*") ? "nav-item-active" : "nav-item-default",
          itemLayout.value,
          !unref(canUse)("job") ? "opacity-60" : ""
        ], "nav-item group cursor-pointer"])}"${ssrRenderAttr("title", !showLabels.value ? _ctx.$t("nav_item_jobs") : "")} data-v-046522b8><div class="${ssrRenderClass([
          isActive("jobs.*") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300",
          "nav-icon shrink-0"
        ])}" data-v-046522b8>`);
        _push(ssrRenderComponent(_sfc_main$8, {
          name: "job",
          size: "18"
        }, null, _parent));
        _push(`</div>`);
        if (showLabels.value) {
          _push(`<span class="text-[12px] font-semibold tracking-tight truncate flex-1" data-v-046522b8>${ssrInterpolate(_ctx.$t("nav_item_jobs"))}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(canUse)("job") && showLabels.value) {
          _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]" data-v-046522b8></div>`);
        } else {
          _push(`<!---->`);
        }
        if (isActive("jobs.*") && showLabels.value) {
          _push(`<div class="nav-active-bar" data-v-046522b8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showModule("goal")) {
        _push(`<div class="${ssrRenderClass([[
          isActive("goals.*") ? "nav-item-active" : "nav-item-default",
          itemLayout.value,
          !unref(canUse)("goal") ? "opacity-60" : ""
        ], "nav-item group cursor-pointer"])}"${ssrRenderAttr("title", !showLabels.value ? _ctx.$t("nav_item_goals") : "")} data-v-046522b8><div class="${ssrRenderClass([
          isActive("goals.*") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300",
          "nav-icon shrink-0"
        ])}" data-v-046522b8>`);
        _push(ssrRenderComponent(_sfc_main$8, {
          name: "goal",
          size: "18"
        }, null, _parent));
        _push(`</div>`);
        if (showLabels.value) {
          _push(`<span class="text-[12px] font-semibold tracking-tight truncate flex-1" data-v-046522b8>${ssrInterpolate(_ctx.$t("nav_item_goals"))}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(canUse)("goal") && showLabels.value) {
          _push(`<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]" data-v-046522b8></div>`);
        } else {
          _push(`<!---->`);
        }
        if (isActive("goals.*") && showLabels.value) {
          _push(`<div class="nav-active-bar" data-v-046522b8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="h-3" data-v-046522b8></div>`);
      if (!unref(isExplorer)) {
        _push(`<!--[--><div class="${ssrRenderClass([isDrawer.value ? "px-3" : "", "px-2 py-1.5 mb-0.5"])}" data-v-046522b8>`);
        if (!isDrawer.value && __props.collapsed) {
          _push(`<div class="h-px bg-slate-100 dark:bg-slate-800 w-full my-2" data-v-046522b8></div>`);
        } else {
          _push(`<span class="text-[9px] font-black text-indigo-400/80 dark:text-indigo-600/80 tracking-wide ml-1" data-v-046522b8> Neural OS </span>`);
        }
        _push(`</div><div class="${ssrRenderClass([[
          isActive("coach.*") ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" : "text-slate-500 dark:text-slate-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 hover:text-indigo-700 dark:hover:text-indigo-300",
          itemLayout.value
        ], "nav-item group cursor-pointer relative overflow-hidden"])}"${ssrRenderAttr("title", !showLabels.value ? _ctx.$t("nav_item_coach", "AI Coach") : "")} data-v-046522b8><div class="shrink-0 text-indigo-500" data-v-046522b8>`);
        _push(ssrRenderComponent(_sfc_main$8, {
          name: "sparkles",
          size: "18"
        }, null, _parent));
        _push(`</div>`);
        if (showLabels.value) {
          _push(`<span class="text-[12px] font-semibold tracking-tight truncate flex-1" data-v-046522b8>${ssrInterpolate(_ctx.$t("nav_item_coach", "AI Coach"))}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (showLabels.value) {
          _push(`<span class="text-[8px] font-black text-indigo-500 uppercase bg-indigo-100 dark:bg-indigo-500/20 px-1.5 py-0.5 rounded-full shrink-0" data-v-046522b8>AI</span>`);
        } else {
          _push(`<!---->`);
        }
        if (isActive("coach.*") && showLabels.value) {
          _push(`<div class="nav-active-bar bg-indigo-500" data-v-046522b8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AppSidebarNav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppSidebarNav = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-046522b8"]]);
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const { user } = useGating();
    const showLogoutModal = ref(false);
    const isSidebarCollapsed = ref(false);
    const isMdUp = ref(false);
    const isMobileDrawerOpen = ref(false);
    let mediaQueryListener;
    let mdMediaQuery;
    const syncBreakpoint = () => {
      if (typeof window === "undefined") {
        return;
      }
      const mq = window.matchMedia("(min-width: 768px)");
      isMdUp.value = mq.matches;
      if (mq.matches) {
        isMobileDrawerOpen.value = false;
      }
    };
    const coreExpanded = ref(true);
    const platinumExpanded = ref(true);
    const { initTheme } = useAppearance();
    onMounted(() => {
      if (!user.value) {
        window.location.href = route("login");
        return;
      }
      initTheme();
      const savedState = localStorage.getItem("sidebar_collapsed");
      if (savedState !== null) isSidebarCollapsed.value = savedState === "true";
      const savedCore = localStorage.getItem("sidebar_core_expanded");
      if (savedCore !== null) coreExpanded.value = savedCore !== "false";
      const savedPlatinum = localStorage.getItem("sidebar_platinum_expanded");
      if (savedPlatinum !== null) platinumExpanded.value = savedPlatinum !== "false";
      syncBreakpoint();
      mdMediaQuery = window.matchMedia("(min-width: 768px)");
      mediaQueryListener = () => syncBreakpoint();
      mdMediaQuery.addEventListener("change", mediaQueryListener);
    });
    onUnmounted(() => {
      mdMediaQuery == null ? void 0 : mdMediaQuery.removeEventListener("change", mediaQueryListener);
      document.body.style.overflow = "";
    });
    const closeMobileDrawer = () => {
      isMobileDrawerOpen.value = false;
    };
    const toggleSidebar = () => {
      if (isMdUp.value) {
        isSidebarCollapsed.value = !isSidebarCollapsed.value;
        localStorage.setItem("sidebar_collapsed", isSidebarCollapsed.value);
      } else {
        isMobileDrawerOpen.value = !isMobileDrawerOpen.value;
      }
    };
    const toggleCore = () => {
      if (isMdUp.value && isSidebarCollapsed.value) {
        return;
      }
      coreExpanded.value = !coreExpanded.value;
      localStorage.setItem("sidebar_core_expanded", coreExpanded.value);
    };
    const togglePlatinum = () => {
      if (isMdUp.value && isSidebarCollapsed.value) {
        return;
      }
      platinumExpanded.value = !platinumExpanded.value;
      localStorage.setItem("sidebar_platinum_expanded", platinumExpanded.value);
    };
    watch(() => page.url, () => {
      closeMobileDrawer();
    });
    watch(isMobileDrawerOpen, (open) => {
      if (typeof document === "undefined") {
        return;
      }
      document.body.style.overflow = open ? "hidden" : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white relative transition-colors duration-500" }, _attrs))} data-v-b6576338>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "is-sidebar-collapsed": isSidebarCollapsed.value,
        onToggleSidebar: toggleSidebar
      }, null, _parent));
      _push(`<div class="flex flex-1 overflow-hidden relative" data-v-b6576338><aside class="${ssrRenderClass([isSidebarCollapsed.value ? "w-[68px]" : "w-[232px]", "bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none flex-shrink-0 transition-all duration-300 ease-in-out relative"])}" data-v-b6576338><nav class="${ssrRenderClass([isSidebarCollapsed.value ? "px-2" : "px-2.5", "flex-1 overflow-y-auto py-3 custom-scrollbar space-y-0.5"])}" data-v-b6576338>`);
      _push(ssrRenderComponent(AppSidebarNav, {
        variant: "sidebar",
        collapsed: isSidebarCollapsed.value,
        "core-expanded": coreExpanded.value,
        "platinum-expanded": platinumExpanded.value,
        onToggleCore: toggleCore,
        onTogglePlatinum: togglePlatinum
      }, null, _parent));
      _push(`</nav></aside>`);
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="md:hidden" data-v-b6576338>`);
        if (isMobileDrawerOpen.value) {
          _push2(`<div class="fixed inset-0 top-16 z-[60] bg-slate-950/50 backdrop-blur-sm" aria-hidden="true" data-v-b6576338></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (isMobileDrawerOpen.value) {
          _push2(`<aside class="fixed left-0 top-16 z-[61] flex h-[calc(100dvh-4rem)] w-[min(300px,92vw)] flex-col border-r border-slate-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-none" data-v-b6576338><div class="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800" data-v-b6576338><span class="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400" data-v-b6576338>${ssrInterpolate(_ctx.$t("nav_menu_title"))}</span><button type="button" class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"${ssrRenderAttr("aria-label", _ctx.$t("nav_close_menu"))} data-v-b6576338><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-b6576338><path d="M18 6L6 18M6 6l12 12" data-v-b6576338></path></svg></button></div><nav class="custom-scrollbar flex-1 overflow-y-auto py-2" data-v-b6576338>`);
          _push2(ssrRenderComponent(AppSidebarNav, {
            variant: "drawer",
            collapsed: false,
            "core-expanded": coreExpanded.value,
            "platinum-expanded": platinumExpanded.value,
            onToggleCore: toggleCore,
            onTogglePlatinum: togglePlatinum,
            onNavigate: closeMobileDrawer
          }, null, _parent));
          _push2(`</nav></aside>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      }, "body", false, _parent);
      _push(`<main class="flex-1 overflow-y-auto relative w-full bg-slate-50 dark:bg-slate-950 pb-32 md:pb-0 transition-colors duration-500 custom-scrollbar" data-v-b6576338><div class="w-full relative z-0 px-0 pb-8 md:pb-10" data-v-b6576338>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
      if (showLogoutModal.value) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" data-v-b6576338><div class="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm" data-v-b6576338></div><div class="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden" data-v-b6576338><div class="p-8 text-center" data-v-b6576338><div class="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner" data-v-b6576338>`);
        _push(ssrRenderComponent(_sfc_main$8, {
          name: "logout",
          size: "40",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</div><h3 class="text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2" data-v-b6576338>${ssrInterpolate(_ctx.$t("modal_logout_title", "Keluar Akun?"))}</h3><p class="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed" data-v-b6576338>${ssrInterpolate(_ctx.$t("modal_logout_subtitle", "Sesi Anda akan diakhiri."))}</p></div><div class="p-6 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3" data-v-b6576338><button class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-600 active:scale-[0.98] transition-all" data-v-b6576338>${ssrInterpolate(_ctx.$t("modal_logout_confirm", "Ya, Keluar"))}</button><button class="w-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold py-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-[0.98] transition-all" data-v-b6576338>${ssrInterpolate(_ctx.$t("modal_logout_cancel", "Batal"))}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!_ctx.route().current("coach.*")) {
        _push(`<button class="hidden md:block fixed bottom-10 right-10 z-[100] group" data-v-b6576338><div class="relative" data-v-b6576338><div class="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" data-v-b6576338></div><div class="relative w-14 h-14 bg-slate-900 dark:bg-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 active:scale-95 ring-4 ring-white dark:ring-slate-950 group-hover:ring-indigo-50 dark:group-hover:ring-indigo-500/20 overflow-hidden" data-v-b6576338><div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" data-v-b6576338></div>`);
        _push(ssrRenderComponent(_sfc_main$8, {
          name: "sparkles",
          size: "24",
          "stroke-width": "2",
          class: "text-white group-hover:rotate-[20deg] transition-transform duration-500 relative z-10"
        }, null, _parent));
        _push(`<span class="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse z-20" data-v-b6576338></span></div><div class="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-4 py-2.5 rounded-2xl whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-2xl border border-white/10 flex items-center gap-2" data-v-b6576338><span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" data-v-b6576338></span> ${ssrInterpolate(_ctx.$t("nav_neural_active"))}</div></div></button>`);
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
const AuthenticatedLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b6576338"]]);
export {
  AuthenticatedLayout as A
};
