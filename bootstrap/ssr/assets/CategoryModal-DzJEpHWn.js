import { ssrRenderTeleport, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { ref, watch, useSSRContext } from "vue";
const _sfc_main = {
  __name: "CategoryModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    form: Object,
    close: Function,
    submit: Function
  },
  setup(__props) {
    const props = __props;
    const showIconGrid = ref(false);
    const iconPalette = ["💰", "💸", "🏦", "💎", "🎥", "🎤", "🚗", "🏠", "🎓", "🛒", "🔧", "🎨", "🖥️", "📱", "🪙", "💵"];
    watch(() => props.show, (val) => {
      if (val) {
        showIconGrid.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-[101] flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/30 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-200"></div><div class="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] shadow-2xl dark:shadow-none z-10 p-6 animate-in zoom-in-95 duration-200 border border-transparent dark:border-slate-800 transition-all duration-500 transition-colors duration-500"><div class="flex justify-between items-center mb-6"><h3 class="text-xl font-black text-slate-800 dark:text-white transition-colors duration-500">${ssrInterpolate(__props.form.id ? "✏️ " + _ctx.$t("edit_source") : "✨ " + _ctx.$t("add_source"))}</h3><button class="bg-slate-50 dark:bg-slate-800 p-2 rounded-full text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300">✕</button></div><form class="space-y-5"><div><label class="block text-[10px] font-black text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 transition-colors duration-500">${ssrInterpolate(_ctx.$t("name"))}</label><div class="flex gap-2"><div class="relative"><button type="button" class="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl text-2xl border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-95 duration-300">${ssrInterpolate(__props.form.icon)}</button>`);
          if (showIconGrid.value) {
            _push2(`<div class="absolute top-14 left-0 w-64 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-700 z-50 grid grid-cols-6 gap-2 animate-in fade-in zoom-in-95 duration-100"><!--[-->`);
            ssrRenderList(iconPalette, (icon) => {
              _push2(`<button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-lg transition-all duration-300">${ssrInterpolate(icon)}</button>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showIconGrid.value) {
            _push2(`<div class="fixed inset-0 z-40"></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><input${ssrRenderAttr("value", __props.form.name)} type="text"${ssrRenderAttr("placeholder", _ctx.$t("placeholder_name"))} class="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700 dark:text-slate-200 transition-all duration-500 placeholder:dark:text-slate-600"></div></div><div class="flex gap-2 pt-2"><button type="button" class="flex-1 py-3 text-slate-400 dark:text-slate-500 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 rounded-xl transition-all duration-300">${ssrInterpolate(_ctx.$t("cancel"))}</button><button type="submit" class="flex-[2] py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg dark:shadow-none shadow-emerald-200 dark:shadow-emerald-900/20 active:scale-95 transition-all duration-300"${ssrIncludeBooleanAttr(__props.form.processing) ? " disabled" : ""}>${ssrInterpolate(__props.form.processing ? _ctx.$t("saving") : _ctx.$t("save"))}</button></div></form></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/CategoryModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
