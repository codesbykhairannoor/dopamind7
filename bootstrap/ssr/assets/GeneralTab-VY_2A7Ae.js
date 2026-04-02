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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div><h3 class="text-lg font-black text-slate-800 dark:text-white tracking-tight transition-colors duration-500">${ssrInterpolate(_ctx.$t("settings_language_title", "Bahasa Aplikasi"))}</h3><p class="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("settings_language_desc", "Pilih bahasa antarmuka aplikasi."))}</p></div><div class="grid grid-cols-2 gap-4"><button class="${ssrRenderClass([currentLang.value === "id" ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10 shadow-md dark:shadow-none" : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800", "relative flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-300"])}"><span class="text-4xl mb-3 drop-shadow-sm">🇮🇩</span><span class="${ssrRenderClass([currentLang.value === "id" ? "text-indigo-800 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400", "font-black text-sm transition-colors duration-500"])}">Bahasa Indonesia</span>`);
      if (currentLang.value === "id") {
        _push(`<div class="absolute top-4 right-4 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm dark:shadow-none border border-indigo-100 dark:border-indigo-500/30 transition-colors duration-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><button class="${ssrRenderClass([currentLang.value === "en" ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10 shadow-md dark:shadow-none" : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800", "relative flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-300"])}"><span class="text-4xl mb-3 drop-shadow-sm">🇬🇧</span><span class="${ssrRenderClass([currentLang.value === "en" ? "text-indigo-800 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400", "font-black text-sm transition-colors duration-500"])}">English (UK)</span>`);
      if (currentLang.value === "en") {
        _push(`<div class="absolute top-4 right-4 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm dark:shadow-none border border-indigo-100 dark:border-indigo-500/30 transition-colors duration-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>`);
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
