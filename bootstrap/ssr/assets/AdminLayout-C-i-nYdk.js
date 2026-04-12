import { computed, ref, onMounted, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { usePage, router, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BiMr3Mnd.js";
import { u as useAppearance } from "./useAppearance-rDoGVD4_.js";
const _sfc_main = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    const { initTheme } = useAppearance();
    const isLoading = ref(false);
    ref(false);
    const navItems = [
      { name: "Blog Overview", icon: "dashboard", route: "admin.blog.index", active: "admin.blog.index" },
      { name: "Write Post", icon: "journal", route: "admin.blog.create", active: "admin.blog.create" },
      { name: "User Directory", icon: "goal", route: "admin.users.index", active: "admin.users.index" }
    ];
    const startLoading = () => {
      isLoading.value = true;
    };
    const stopLoading = () => {
      isLoading.value = false;
    };
    onMounted(() => {
      initTheme();
      router.on("start", startLoading);
      router.on("finish", stopLoading);
      router.on("error", stopLoading);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden transition-colors duration-500" }, _attrs))}><aside class="w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col z-20 shadow-sm relative"><div class="h-24 flex items-center px-8 border-b border-slate-100 dark:border-slate-700/50">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "sparkles",
              size: "20",
              class: "text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col"${_scopeId}><span class="text-lg font-bold text-slate-900 dark:text-white tracking-tight"${_scopeId}>OneForMind</span><span class="text-[10px] font-semibold text-slate-400 tracking-wide leading-none"${_scopeId}>Admin Console</span></div>`);
          } else {
            return [
              createVNode("div", { class: "w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none" }, [
                createVNode(_sfc_main$1, {
                  name: "sparkles",
                  size: "20",
                  class: "text-white"
                })
              ]),
              createVNode("div", { class: "flex flex-col" }, [
                createVNode("span", { class: "text-lg font-bold text-slate-900 dark:text-white tracking-tight" }, "OneForMind"),
                createVNode("span", { class: "text-[10px] font-semibold text-slate-400 tracking-wide leading-none" }, "Admin Console")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="flex-1 px-4 py-8 space-y-1 overflow-y-auto"><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route(item.route),
          class: ["flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group font-medium", [
            _ctx.route().current(item.active) ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100"
          ]]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: item.icon,
                size: "18",
                class: _ctx.route().current(item.active) ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-slate-600"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm truncate"${_scopeId}>${ssrInterpolate(item.name)}</span>`);
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: item.icon,
                  size: "18",
                  class: _ctx.route().current(item.active) ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-slate-600"
                }, null, 8, ["name", "class"]),
                createVNode("span", { class: "text-sm truncate" }, toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></nav><div class="p-4 border-t border-slate-100 dark:border-slate-700/50"><div class="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 flex items-center gap-3 border border-slate-200/50 dark:border-slate-700/30"><img${ssrRenderAttr("src", user.value.avatar_url)} class="w-10 h-10 rounded-xl object-cover shadow-sm"><div class="flex-1 min-w-0"><p class="text-slate-900 dark:text-white text-xs font-bold truncate">${ssrInterpolate(user.value.name)}</p><p class="text-[10px] text-slate-500 font-medium truncate italic">System Admin</p></div><button class="p-2 text-slate-400 hover:text-rose-500 transition-colors" title="Keluar">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "logout",
        size: "18"
      }, null, _parent));
      _push(`</button></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "mt-3 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 dark:bg-slate-700 text-[10px] font-bold tracking-wide text-white hover:bg-slate-800 transition-all shadow-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "chevron-left",
              size: "12"
            }, null, _parent2, _scopeId));
            _push2(` Exit to App `);
          } else {
            return [
              createVNode(_sfc_main$1, {
                name: "chevron-left",
                size: "12"
              }),
              createTextVNode(" Exit to App ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></aside><main class="flex-1 flex flex-col min-w-0 overflow-hidden relative">`);
      if (isLoading.value) {
        _push(`<div class="absolute inset-0 z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center"><div class="flex flex-col items-center gap-4"><div class="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div><span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wide animate-pulse">Syncing...</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between px-10 shrink-0"><div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-indigo-500"></div><h2 class="text-xs font-bold text-slate-500 tracking-wide">Active Session Control</h2></div><div class="flex items-center gap-4"><div class="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-full border border-emerald-100 dark:border-emerald-500/20"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span><span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wide">Operational</span></div></div></header><div class="flex-1 overflow-y-auto p-10 bg-slate-50/50 dark:bg-slate-900">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
