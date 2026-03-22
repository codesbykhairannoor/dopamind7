import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { u as useAppearance } from "./useAppearance-rDoGVD4_.js";
const _sfc_main = {
  __name: "AppearanceTab",
  __ssrInlineRender: true,
  props: { userSettings: Object },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    const props = __props;
    const { isDark } = useAppearance();
    const form = useForm({
      settings: {
        modules: {
          habit: ((_b = (_a = props.userSettings) == null ? void 0 : _a.modules) == null ? void 0 : _b.habit) ?? true,
          planner: ((_d = (_c = props.userSettings) == null ? void 0 : _c.modules) == null ? void 0 : _d.planner) ?? true,
          finance: ((_f = (_e = props.userSettings) == null ? void 0 : _e.modules) == null ? void 0 : _f.finance) ?? true,
          journal: ((_h = (_g = props.userSettings) == null ? void 0 : _g.modules) == null ? void 0 : _h.journal) ?? true,
          calendar: ((_j = (_i = props.userSettings) == null ? void 0 : _i.modules) == null ? void 0 : _j.calendar) ?? true,
          job: ((_l = (_k = props.userSettings) == null ? void 0 : _k.modules) == null ? void 0 : _l.job) ?? true,
          goal: ((_n = (_m = props.userSettings) == null ? void 0 : _m.modules) == null ? void 0 : _n.goal) ?? true
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12 pb-20" }, _attrs))}><div><div class="flex items-center justify-between mb-8"><div><h3 class="text-lg font-black text-slate-800 dark:text-white tracking-tight transition-colors duration-500">${ssrInterpolate(_ctx.$t("settings_theme_title", "Tema Aplikasi"))}</h3><p class="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("settings_theme_desc", "Pilih mode tampilan yang paling nyaman untuk matamu."))}</p></div></div><div class="grid grid-cols-2 gap-4"><button class="${ssrRenderClass([!unref(isDark) ? "border-indigo-600 bg-white shadow-xl shadow-indigo-100/50" : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700", "relative flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 transition-all duration-300 group overflow-hidden"])}"><div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div><div class="w-16 h-16 bg-amber-50 rounded-[1.5rem] flex items-center justify-center text-3xl mb-4 shadow-inner group-hover:scale-110 transition-transform relative z-10">☀️</div><span class="${ssrRenderClass([!unref(isDark) ? "text-indigo-600" : "text-slate-500 dark:text-slate-400", "font-black text-sm transition-colors duration-500 relative z-10"])}">${ssrInterpolate(_ctx.$t("theme_light", "Light Mode"))}</span>`);
      if (!unref(isDark)) {
        _push(`<div class="absolute top-4 right-4 text-indigo-600 bg-indigo-50 rounded-full p-1.5 shadow-sm z-10"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><button class="${ssrRenderClass([unref(isDark) ? "border-indigo-500 bg-slate-800 shadow-xl shadow-slate-950/40" : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700", "relative flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 transition-all duration-300 group overflow-hidden"])}"><div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div><div class="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-3xl mb-4 shadow-inner group-hover:scale-110 transition-transform relative z-10">🌙</div><span class="${ssrRenderClass([unref(isDark) ? "text-indigo-400" : "text-slate-500 dark:text-slate-400", "font-black text-sm transition-colors duration-500 relative z-10"])}">${ssrInterpolate(_ctx.$t("theme_dark", "Dark Mode"))}</span>`);
      if (unref(isDark)) {
        _push(`<div class="absolute top-4 right-4 text-indigo-400 bg-slate-900 rounded-full p-1.5 shadow-sm border border-slate-700 z-10"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></div><div><div class="mb-8"><h3 class="text-lg font-black text-slate-800 dark:text-white tracking-tight transition-colors duration-500">${ssrInterpolate(_ctx.$t("settings_modules_title", "Modul Aplikasi"))}</h3><p class="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("settings_modules_desc", "Aktifkan atau nonaktifkan fitur yang ingin kamu gunakan."))}</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(unref(form).settings.modules, (enabled, key) => {
        _push(`<div class="group flex items-center justify-between p-5 bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-500 transition-all"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-sm dark:shadow-none group-hover:scale-110 transition-transform">`);
        if (key === "habit") {
          _push(`<!--[-->🌱<!--]-->`);
        } else if (key === "planner") {
          _push(`<!--[-->📋<!--]-->`);
        } else if (key === "finance") {
          _push(`<!--[-->💸<!--]-->`);
        } else if (key === "journal") {
          _push(`<!--[-->📓<!--]-->`);
        } else if (key === "calendar") {
          _push(`<!--[-->📅<!--]-->`);
        } else if (key === "job") {
          _push(`<!--[-->💼<!--]-->`);
        } else if (key === "goal") {
          _push(`<!--[-->🎯<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div><h4 class="font-black text-slate-700 dark:text-slate-200 text-sm capitalize transition-colors duration-500">${ssrInterpolate(key)}</h4><p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-500">${ssrInterpolate(_ctx.$t("module_status_active", "Status Aktif"))}</p></div></div><label class="relative inline-flex items-center cursor-pointer"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules[key]) ? ssrLooseContain(unref(form).settings.modules[key], null) : unref(form).settings.modules[key]) ? " checked" : ""} class="sr-only peer"><div class="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 dark:after:border-slate-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner dark:shadow-none border border-slate-100 dark:border-slate-600"></div></label></div>`);
      });
      _push(`<!--]--></div></div>`);
      if (unref(form).recentlySuccessful) {
        _push(`<div class="text-center bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20 shadow-sm dark:shadow-none shadow-emerald-100/50 flex items-center justify-center gap-2"><span>✨</span> ${ssrInterpolate(_ctx.$t("settings_saved", "Tersimpan!"))}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Partials/AppearanceTab.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
