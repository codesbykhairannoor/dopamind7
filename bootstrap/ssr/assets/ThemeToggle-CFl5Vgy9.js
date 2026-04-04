import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { u as useAppearance } from "./useAppearance-rDoGVD4_.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-CpE9XZu-.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ThemeToggle",
  __ssrInlineRender: true,
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { isDark } = useAppearance();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["group flex items-center gap-3 w-full rounded-xl transition-all duration-500 overflow-hidden relative", [
          unref(isDark) ? "bg-slate-800 text-amber-400 border-slate-700/50" : "bg-slate-50 text-slate-500 border-slate-100/50",
          __props.collapsed ? "p-2 justify-center" : "px-3 py-2.5 border"
        ]]
      }, _attrs))} data-v-e4d7632c><div class="${ssrRenderClass([unref(isDark) ? "translate-x-full group-hover:translate-x-0" : "-translate-x-full group-hover:translate-x-0", "absolute inset-0 transition-transform duration-700 ease-in-out -z-10 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100"])}" data-v-e4d7632c></div><div class="relative w-5 h-5 flex items-center justify-center shrink-0" data-v-e4d7632c>`);
      if (unref(isDark)) {
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sun",
          size: "18",
          "stroke-width": "2.5",
          class: "absolute"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "moon",
          size: "18",
          "stroke-width": "2.5",
          class: "absolute"
        }, null, _parent));
      }
      _push(`</div>`);
      if (!__props.collapsed) {
        _push(`<span class="text-xs font-bold whitespace-nowrap overflow-hidden" data-v-e4d7632c>${ssrInterpolate(unref(isDark) ? _ctx.$t("theme_light", "Light Mode") : _ctx.$t("theme_dark", "Dark Mode"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.collapsed) {
        _push(`<div class="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-1 group-hover:translate-x-0 z-50 whitespace-nowrap" data-v-e4d7632c>${ssrInterpolate(unref(isDark) ? "Light" : "Dark")}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ThemeToggle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ThemeToggle = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e4d7632c"]]);
export {
  ThemeToggle as T
};
