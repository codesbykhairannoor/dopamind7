import { ref, watch, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { X, CheckCircle2 } from "lucide-vue-next";
const _sfc_main = {
  __name: "SavingModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    saving: Object,
    onClose: Function,
    onSave: Function,
    onDelete: Function,
    processing: Boolean
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = ref({
      id: null,
      title: "",
      target_amount: 0,
      icon: "🏦",
      color: "#6366f1"
    });
    const colors = ["#6366f1", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6", "#0ea5e9", "#0f172a"];
    const icons = ["🏦", "💍", "🏠", "🚗", "🎓", "✈️", "💻", "👶", "🎁", "🏥", "🍱", "💼"];
    watch(() => props.saving, (newVal) => {
      if (newVal) {
        form.value = { ...newVal };
      } else {
        form.value = { id: null, title: "", target_amount: 0, icon: "🏦", color: "#6366f1" };
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        var _a, _b;
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md transition-opacity"></div><div class="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]"><div class="px-8 pt-8 flex items-center justify-between"><div><h2 class="text-2xl font-black text-slate-800 dark:text-white">${ssrInterpolate(((_a = __props.saving) == null ? void 0 : _a.id) ? "Edit saving goal" : "New saving goal")}</h2><p class="text-[10px] font-bold text-slate-400 mt-1">Configure your vault</p></div><button class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all active:scale-95">`);
          _push2(ssrRenderComponent(unref(X), { size: 20 }, null, _parent));
          _push2(`</button></div><div class="p-8 space-y-6 overflow-y-auto"><div class="space-y-2"><label class="text-[11px] font-bold text-slate-400 dark:text-slate-600">Goal name</label><input${ssrRenderAttr("value", form.value.title)} type="text" class="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl px-5 py-4 text-slate-700 dark:text-white font-bold focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm" placeholder="e.g. Dream Wedding, New Laptop..."></div><div class="space-y-2"><label class="text-[11px] font-bold text-slate-400 dark:text-slate-600">Target amount (IDR)</label><input${ssrRenderAttr("value", form.value.target_amount)} type="number" class="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl px-5 py-4 text-slate-700 dark:text-white font-bold focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm"></div><div class="space-y-2"><label class="text-[11px] font-bold text-slate-400 dark:text-slate-600">Icon</label><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(icons, (i) => {
            _push2(`<button class="${ssrRenderClass([form.value.icon === i ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700", "w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all active:scale-90"])}">${ssrInterpolate(i)}</button>`);
          });
          _push2(`<!--]--></div></div><div class="space-y-2"><label class="text-[11px] font-bold text-slate-400 dark:text-slate-600">Color theme</label><div class="flex flex-wrap gap-3"><!--[-->`);
          ssrRenderList(colors, (c) => {
            _push2(`<button style="${ssrRenderStyle({ backgroundColor: c })}" class="${ssrRenderClass([form.value.color === c ? "ring-4 ring-offset-4 dark:ring-offset-slate-900 ring-indigo-500/30" : "opacity-60 hover:opacity-100", "w-10 h-10 rounded-2xl transition-all flex items-center justify-center"])}">`);
            if (form.value.color === c) {
              _push2(ssrRenderComponent(unref(CheckCircle2), {
                size: 16,
                class: "text-white"
              }, null, _parent));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button>`);
          });
          _push2(`<!--]--></div></div></div><div class="p-8 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 transition-colors"><button class="text-[10px] font-bold text-slate-400 dark:text-slate-600 px-4 py-2 hover:text-rose-500 transition-colors"> Cancel </button><button${ssrIncludeBooleanAttr(__props.processing) ? " disabled" : ""} class="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black text-[11px] shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">${ssrInterpolate(__props.processing ? "Manifesting..." : ((_b = __props.saving) == null ? void 0 : _b.id) ? "Update vault" : "Create vault")}</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/SavingModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
