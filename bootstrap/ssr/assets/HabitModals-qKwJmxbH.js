import { ssrRenderTeleport, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import HabitBatchModal from "./HabitBatchModal-DyWiXOmF.js";
import { useSSRContext } from "vue";
import "./Modal-DgPaO2OY.js";
import "./PrimaryButton-4NJ7Yqx3.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./SecondaryButton-BgIg9sGF.js";
const _sfc_main = {
  __name: "HabitModals",
  __ssrInlineRender: true,
  props: {
    // States Single
    showDeleteModal: Boolean,
    showCopyModal: Boolean,
    showCreateModal: Boolean,
    isEditing: Boolean,
    // States Batch 🔥
    showBatchModal: Boolean,
    batchForm: Object,
    // Data & Forms
    form: Object,
    habitToDelete: Object,
    iconList: Array,
    colorPalette: Array,
    // Actions Single
    closeModal: Function,
    submitHabit: Function,
    executeDelete: Function,
    executeCopy: Function,
    deleteFromEdit: Function,
    // Actions Batch 🔥
    closeBatchModal: Function,
    submitBatchHabit: Function,
    addBatchRow: Function,
    removeBatchRow: Function,
    switchToBatch: Function,
    switchToSingle: Function
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        var _a;
        if (__props.showDeleteModal) {
          _push2(`<div class="fixed inset-0 z-[60] flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div><div class="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 w-full max-w-sm relative z-10 shadow-2xl dark:shadow-none animate-in zoom-in-95 text-center overflow-hidden border border-slate-100 dark:border-slate-800"><div class="w-16 h-16 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm border border-rose-100 dark:border-rose-500/20">🗑️</div><h3 class="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">${ssrInterpolate(_ctx.$t("habit_delete_title"))}</h3><p class="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">${ssrInterpolate(_ctx.$t("habit_delete_desc"))} <br><span class="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">${ssrInterpolate((_a = __props.habitToDelete) == null ? void 0 : _a.name)}</span>? </p><div class="flex gap-3"><button class="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">${ssrInterpolate(_ctx.$t("habit_btn_cancel"))}</button><button class="flex-1 py-3 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200 dark:shadow-none transition transform hover:-translate-y-0.5">${ssrInterpolate(_ctx.$t("habit_btn_delete_confirm"))}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.showCopyModal) {
          _push2(`<div class="fixed inset-0 z-[60] flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div><div class="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 w-full max-w-sm relative z-10 shadow-2xl dark:shadow-none animate-in zoom-in-95 text-center overflow-hidden border border-slate-100 dark:border-slate-800"><div class="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm border border-indigo-100 dark:border-indigo-500/20">📂</div><h3 class="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">${ssrInterpolate(_ctx.$t("habit_copy_title"))}</h3><p class="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">${ssrInterpolate(_ctx.$t("habit_copy_desc"))}</p><div class="flex gap-3"><button class="flex-1 py-3.5 rounded-xl font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">${ssrInterpolate(_ctx.$t("habit_btn_cancel"))}</button><button class="flex-1 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition transform hover:-translate-y-0.5">${ssrInterpolate(_ctx.$t("habit_btn_copy_confirm"))}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.showCreateModal) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div><div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-8 w-full max-w-lg relative z-10 shadow-2xl dark:shadow-none animate-in zoom-in-95 border border-slate-100 dark:border-slate-800"><div class="flex justify-between items-center mb-6"><div><h3 class="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">${ssrInterpolate(__props.isEditing ? "Edit Habit" : _ctx.$t("habit_modal_title"))}</h3>`);
          if (!__props.isEditing) {
            _push2(`<button type="button" class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition flex items-center gap-1.5 active:scale-95 w-fit border border-indigo-100 dark:border-indigo-500/30 mt-2"><span>⚡</span> Batch Mode </button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><button class="bg-slate-100 dark:bg-slate-800 w-8 h-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition -mt-6">✕</button></div><form class="space-y-5"><div><label class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2 block">${ssrInterpolate(_ctx.$t("habit_modal_question"))}</label><input${ssrRenderAttr("value", __props.form.name)} class="w-full text-base md:text-lg font-bold py-3 px-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:border-indigo-500 transition" placeholder="Contoh: Lari Pagi" required></div><div><label class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2 block">${ssrInterpolate(_ctx.$t("habit_modal_icon"))}</label><div class="grid grid-cols-6 gap-2 bg-slate-50 dark:bg-slate-950/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800 max-h-32 md:max-h-40 overflow-y-auto custom-scrollbar"><!--[-->`);
          ssrRenderList(__props.iconList, (icon) => {
            _push2(`<button type="button" class="${ssrRenderClass([__props.form.icon === icon ? "bg-white dark:bg-slate-800 shadow-md ring-2 ring-indigo-500 scale-110" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100", "w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-lg md:text-xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition"])}">${ssrInterpolate(icon)}</button>`);
          });
          _push2(`<!--]--></div></div><div class="flex gap-4 md:gap-6"><div class="flex-1"><label class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2 block">${ssrInterpolate(_ctx.$t("habit_modal_color"))}</label><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(__props.colorPalette, (c) => {
            _push2(`<button type="button" class="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition hover:scale-110 shadow-sm" style="${ssrRenderStyle({ backgroundColor: c })}">`);
            if (__props.form.color === c) {
              _push2(`<span class="text-white font-bold text-xs">✓</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button>`);
          });
          _push2(`<!--]--></div></div><div class="flex-1"><label class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2 block">${ssrInterpolate(_ctx.$t("habit_modal_target"))}: ${ssrInterpolate(__props.form.monthly_target)}</label><input${ssrRenderAttr("value", __props.form.monthly_target)} type="range" min="1" max="31" class="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer mt-3"></div></div><div class="flex gap-3 pt-2">`);
          if (__props.isEditing) {
            _push2(`<button type="button" class="px-4 py-3 rounded-xl font-bold text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition flex items-center justify-center border border-rose-100 dark:border-rose-500/30" title="Hapus Habit"> 🗑️ </button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<button type="submit" class="flex-1 py-3 md:py-4 rounded-xl font-bold text-white bg-indigo-950 dark:bg-indigo-500 hover:bg-indigo-900 dark:hover:bg-indigo-600 shadow-xl dark:shadow-none transition transform hover:-translate-y-1"${ssrIncludeBooleanAttr(__props.form.processing) ? " disabled" : ""}>${ssrInterpolate(__props.isEditing ? "Update Habit" : _ctx.$t("habit_modal_btn_save"))}</button></div></form></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(ssrRenderComponent(HabitBatchModal, {
          show: __props.showBatchModal,
          form: __props.batchForm,
          iconList: __props.iconList,
          colorPalette: __props.colorPalette,
          close: __props.closeBatchModal,
          submit: __props.submitBatchHabit,
          addRow: __props.addBatchRow,
          removeRow: __props.removeBatchRow,
          switchToSingle: __props.switchToSingle
        }, null, _parent));
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Habits/HabitModals.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
