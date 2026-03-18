import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "AppearanceTab",
  __ssrInlineRender: true,
  props: { userSettings: Object },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    const props = __props;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div><h3 class="text-lg font-black text-slate-800 tracking-tight">${ssrInterpolate(_ctx.$t("settings_modules_title", "Modul Aplikasi"))}</h3><p class="text-xs font-bold text-slate-400 mt-1">${ssrInterpolate(_ctx.$t("settings_modules_desc", "Aktifkan atau nonaktifkan fitur yang ingin kamu gunakan."))}</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(unref(form).settings.modules, (enabled, key) => {
        _push(`<div class="group flex items-center justify-between p-5 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">`);
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
        _push(`</div><div><h4 class="font-black text-slate-700 text-sm capitalize">${ssrInterpolate(key)}</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${ssrInterpolate(_ctx.$t("module_status_active", "Status Aktif"))}</p></div></div><label class="relative inline-flex items-center cursor-pointer"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules[key]) ? ssrLooseContain(unref(form).settings.modules[key], null) : unref(form).settings.modules[key]) ? " checked" : ""} class="sr-only peer"><div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner border border-slate-100"></div></label></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(form).recentlySuccessful) {
        _push(`<div class="text-center bg-emerald-50 text-emerald-600 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm shadow-emerald-100/50 flex items-center justify-center gap-2"><span>✨</span> ${ssrInterpolate(_ctx.$t("settings_saved", "Tersimpan!"))}</div>`);
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
