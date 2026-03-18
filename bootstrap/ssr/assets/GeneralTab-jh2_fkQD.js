import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "GeneralTab",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const currentLang = computed(() => page.props.locale || "id");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div><h3 class="text-lg font-black text-slate-800 tracking-tight">${ssrInterpolate(_ctx.$t("settings_language_title", "Bahasa Aplikasi"))}</h3><p class="text-xs font-bold text-slate-400 mt-1">${ssrInterpolate(_ctx.$t("settings_language_desc", "Pilih bahasa antarmuka aplikasi."))}</p></div><div class="grid grid-cols-2 gap-4"><button class="${ssrRenderClass([currentLang.value === "id" ? "border-indigo-600 bg-indigo-50/50 shadow-md" : "border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50", "relative flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-300"])}"><span class="text-4xl mb-3 drop-shadow-sm">🇮🇩</span><span class="${ssrRenderClass([currentLang.value === "id" ? "text-indigo-800" : "text-slate-600", "font-black text-sm"])}">Bahasa Indonesia</span>`);
      if (currentLang.value === "id") {
        _push(`<div class="absolute top-4 right-4 text-indigo-600 bg-white rounded-full p-1 shadow-sm border border-indigo-100"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><button class="${ssrRenderClass([currentLang.value === "en" ? "border-indigo-600 bg-indigo-50/50 shadow-md" : "border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50", "relative flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-300"])}"><span class="text-4xl mb-3 drop-shadow-sm">🇬🇧</span><span class="${ssrRenderClass([currentLang.value === "en" ? "text-indigo-800" : "text-slate-600", "font-black text-sm"])}">English (UK)</span>`);
      if (currentLang.value === "en") {
        _push(`<div class="absolute top-4 right-4 text-indigo-600 bg-white rounded-full p-1 shadow-sm border border-indigo-100"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Partials/GeneralTab.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
