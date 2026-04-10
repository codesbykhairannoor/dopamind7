import { ref, onMounted, onUnmounted, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, withDirectives, vModelText, Transition, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Modal-b6JySqy_.js";
import { P as PrimaryButton } from "./PrimaryButton-DPmleQI_.js";
import { _ as _sfc_main$2 } from "./SecondaryButton-BgIg9sGF.js";
import { Zap, Sparkle, CheckCircle2, ArrowRight } from "lucide-vue-next";
import { u as useGating } from "./useGating-_5WV009x.js";
import { Link } from "@inertiajs/vue3";
import "./OneForMindIcon-XdjRmiFl.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "dayjs";
const _sfc_main = {
  __name: "HabitBatchModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    form: Object,
    iconList: Array,
    colorPalette: Array,
    close: Function,
    submit: Function,
    addRow: Function,
    removeRow: Function,
    switchToSingle: Function
  },
  setup(__props) {
    const { isExplorer } = useGating();
    const openIconDropdown = ref(null);
    const closeDropdown = (e) => {
      if (!e.target.closest(".icon-dropdown-container")) {
        openIconDropdown.value = null;
      }
    };
    onMounted(() => {
      document.addEventListener("click", closeDropdown);
    });
    onUnmounted(() => {
      document.removeEventListener("click", closeDropdown);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: __props.show,
        onClose: __props.close,
        maxWidth: "2xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white dark:bg-slate-900 flex flex-col max-h-[85dvh] md:max-h-[85vh] relative overflow-hidden transition-all duration-300 border border-slate-100 dark:border-slate-800 shadow-2xl dark:shadow-none rounded-[2.5rem] w-full" data-v-587fc8cd${_scopeId}>`);
            if (unref(isExplorer)) {
              _push2(`<div class="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 min-h-[500px]" data-v-587fc8cd${_scopeId}><button class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all z-50" data-v-587fc8cd${_scopeId}>✕</button><div class="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" data-v-587fc8cd${_scopeId}></div><div class="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]" data-v-587fc8cd${_scopeId}></div><div class="relative z-10 max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700" data-v-587fc8cd${_scopeId}><div class="relative w-20 h-20 mx-auto" data-v-587fc8cd${_scopeId}><div class="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" data-v-587fc8cd${_scopeId}></div><div class="relative w-20 h-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-xl flex items-center justify-center" data-v-587fc8cd${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Zap), {
                size: 32,
                class: "text-indigo-600 dark:text-indigo-400",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div data-v-587fc8cd${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 shadow-sm" data-v-587fc8cd${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Sparkle), {
                size: 10,
                class: "text-indigo-500",
                fill: "currentColor"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("gating.lock_title_required"))}</span></div><h3 class="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter leading-tight" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("gating.planner_batch.title"))}</h3><p class="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("gating.planner_batch.description"))}</p></div><div class="space-y-3" data-v-587fc8cd${_scopeId}><!--[-->`);
              ssrRenderList([1, 2, 3], (i) => {
                _push2(`<div class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm" data-v-587fc8cd${_scopeId}><div class="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0" data-v-587fc8cd${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle2), { size: 12 }, null, _parent2, _scopeId));
                _push2(`</div><span class="text-[10px] font-black text-slate-700 dark:text-slate-300 tracking-tight" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("gating.planner_batch.benefit_" + i))}</span></div>`);
              });
              _push2(`<!--]--></div><div class="pt-4 space-y-3" data-v-587fc8cd${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("billing"),
                class: "w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest shadow-xl shadow-indigo-200 dark:shadow-none transition-all active:scale-95 group"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("gating.btn_upgrade"))} `);
                    _push3(ssrRenderComponent(unref(ArrowRight), {
                      size: 16,
                      "stroke-width": "3",
                      class: "group-hover:translate-x-1 transition-transform"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("gating.btn_upgrade")) + " ", 1),
                      createVNode(unref(ArrowRight), {
                        size: 16,
                        "stroke-width": "3",
                        class: "group-hover:translate-x-1 transition-transform"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<button class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("gating.btn_stay"))}</button></div></div></div>`);
            } else {
              _push2(`<!--[--><div class="px-6 md:px-8 py-5 md:py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 z-20 shrink-0" data-v-587fc8cd${_scopeId}><div class="flex items-center gap-3 md:gap-4" data-v-587fc8cd${_scopeId}><div class="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-lg shadow-indigo-200 dark:shadow-none shrink-0" data-v-587fc8cd${_scopeId}> ⚡ </div><div data-v-587fc8cd${_scopeId}><h3 class="text-lg md:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none mb-1" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("batch_habit_title"))}</h3><p class="text-[9px] md:text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("batch_habit_subtitle"))}</p></div></div><div class="flex items-center gap-2 md:gap-3" data-v-587fc8cd${_scopeId}><button type="button" class="hidden sm:flex text-[10px] font-black tracking-tight px-4 py-2.5 rounded-xl border-2 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all active:scale-95 items-center gap-2" data-v-587fc8cd${_scopeId}><span data-v-587fc8cd${_scopeId}>↩️</span> ${ssrInterpolate(_ctx.$t("btn_single_mode"))}</button><button class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold" data-v-587fc8cd${_scopeId}> ✕ </button></div></div><div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-950/50 p-4 md:p-8 relative" data-v-587fc8cd${_scopeId}><div class="hidden md:grid grid-cols-12 gap-3 mb-3 px-4 text-[9px] font-bold text-slate-400 tracking-tight" data-v-587fc8cd${_scopeId}><div class="col-span-4" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("habit_name"))}</div><div class="col-span-2 text-center" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("habit_icon"))}</div><div class="col-span-3 text-center" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("habit_color"))}</div><div class="col-span-2 text-center" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("target"))}</div><div class="col-span-1 text-center" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("action"))}</div></div><div class="space-y-4 md:space-y-3" data-v-587fc8cd${_scopeId}><!--[-->`);
              ssrRenderList(__props.form.habits, (trx, index) => {
                var _a, _b;
                _push2(`<div class="bg-white dark:bg-slate-900 md:bg-transparent p-5 md:p-0 rounded-[2rem] md:rounded-none border border-slate-100 dark:border-slate-800 md:border-none shadow-sm md:shadow-none relative group animate-in fade-in slide-in-from-bottom-4 duration-300" data-v-587fc8cd${_scopeId}><div class="flex justify-between items-center mb-4 md:hidden" data-v-587fc8cd${_scopeId}><span class="text-[10px] font-black tracking-widest px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-400" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("habit_label"))} #${ssrInterpolate(index + 1)}</span><button type="button"${ssrIncludeBooleanAttr(__props.form.habits.length <= 1) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": __props.form.habits.length <= 1 }, "w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-400 dark:text-rose-500 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 transition-all"])}" data-v-587fc8cd${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-587fc8cd${_scopeId}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-587fc8cd${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3 items-center md:bg-white md:dark:bg-slate-900 md:p-2.5 md:rounded-2xl md:border md:border-slate-200 md:dark:border-slate-800 md:shadow-sm" data-v-587fc8cd${_scopeId}><div class="col-span-1 md:col-span-4" data-v-587fc8cd${_scopeId}><label class="md:hidden text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 block" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("habit_name"))}</label><input${ssrRenderAttr("value", trx.name)}${ssrRenderAttr("placeholder", _ctx.$t("habit_name_placeholder"))} class="${ssrRenderClass([{ "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 placeholder-rose-300 dark:placeholder-rose-500/50": (_a = __props.form.errors) == null ? void 0 : _a[`habits.${index}.name`] }, "w-full text-xs font-bold h-12 md:h-11 px-4 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 dark:text-slate-100 transition-all focus:ring-0"])}" data-v-587fc8cd${_scopeId}></div><div class="grid grid-cols-2 gap-4 md:contents" data-v-587fc8cd${_scopeId}><div class="relative icon-dropdown-container" data-v-587fc8cd${_scopeId}><label class="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("habit_icon"))}</label><button type="button" class="${ssrRenderClass([openIconDropdown.value === index ? "border-indigo-500 ring-2 ring-indigo-100 dark:ring-indigo-500/20 bg-white dark:bg-slate-900" : "", "w-full h-12 md:h-11 flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-white dark:hover:bg-slate-900 rounded-xl transition-all focus:border-indigo-500"])}" data-v-587fc8cd${_scopeId}><span class="text-xl" data-v-587fc8cd${_scopeId}>${ssrInterpolate(trx.icon)}</span><svg class="w-3 h-3 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-587fc8cd${_scopeId}><path d="M19 9l-7 7-7-7" data-v-587fc8cd${_scopeId}></path></svg></button>`);
                if (openIconDropdown.value === index) {
                  _push2(`<div class="absolute z-[100] top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-none p-3 grid grid-cols-4 gap-2 origin-top max-h-48 overflow-y-auto custom-scrollbar" data-v-587fc8cd${_scopeId}><!--[-->`);
                  ssrRenderList(__props.iconList, (icon) => {
                    _push2(`<button type="button" class="${ssrRenderClass([trx.icon === icon ? "bg-indigo-100 dark:bg-indigo-500/30 shadow-sm" : "opacity-70", "w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/20 hover:scale-110 transition-all"])}" data-v-587fc8cd${_scopeId}>${ssrInterpolate(icon)}</button>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex flex-col" data-v-587fc8cd${_scopeId}><label class="md:hidden text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-tight mb-2 block w-full text-left" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("habit_color"))}</label><div class="flex flex-wrap items-center gap-1.5 p-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 h-12 md:h-11 justify-center md:bg-transparent md:border-none" data-v-587fc8cd${_scopeId}><!--[-->`);
                ssrRenderList(__props.colorPalette.slice(0, 6), (c) => {
                  _push2(`<button type="button" class="${ssrRenderClass([trx.color === c ? "ring-2 ring-offset-2 ring-indigo-500 scale-110" : "opacity-80", "w-5 h-5 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm"])}" style="${ssrRenderStyle({ backgroundColor: c })}" data-v-587fc8cd${_scopeId}></button>`);
                });
                _push2(`<!--]--></div></div></div><div class="col-span-1 md:col-span-2" data-v-587fc8cd${_scopeId}><label class="md:hidden text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 block" data-v-587fc8cd${_scopeId}>${ssrInterpolate(_ctx.$t("target_days"))}</label><div class="relative flex items-center" data-v-587fc8cd${_scopeId}><input type="number"${ssrRenderAttr("value", trx.monthly_target)} min="1" max="31" class="${ssrRenderClass([{ "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400": (_b = __props.form.errors) == null ? void 0 : _b[`habits.${index}.monthly_target`] }, "w-full text-center text-xs font-black h-12 md:h-11 pl-2 pr-6 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 transition-all focus:ring-0 text-indigo-700 dark:text-indigo-400"])}" data-v-587fc8cd${_scopeId}><span class="absolute right-3 text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-tight pointer-events-none" data-v-587fc8cd${_scopeId}>Hr</span></div></div><div class="hidden md:flex col-span-1 justify-center items-center" data-v-587fc8cd${_scopeId}><button type="button"${ssrIncludeBooleanAttr(__props.form.habits.length <= 1) ? " disabled" : ""} class="${ssrRenderClass([__props.form.habits.length <= 1 ? "opacity-0 pointer-events-none" : "text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400", "w-10 h-10 rounded-xl flex items-center justify-center hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-90"])}" data-v-587fc8cd${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-587fc8cd${_scopeId}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-587fc8cd${_scopeId}></path></svg></button></div></div></div>`);
              });
              _push2(`<!--]--></div><button type="button" class="mt-6 w-full py-4 border-2 border-dashed border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-2xl text-indigo-600 dark:text-indigo-400 font-black tracking-tight text-[10px] hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-500/10 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm dark:shadow-none" data-v-587fc8cd${_scopeId}><span class="w-5 h-5 rounded-md bg-indigo-200 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs shadow-sm" data-v-587fc8cd${_scopeId}>+</span> ${ssrInterpolate(_ctx.$t("btn_add_habit_row"))}</button></div><div class="px-6 md:px-8 py-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 z-20 pb-8 md:pb-6" data-v-587fc8cd${_scopeId}><div class="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-tight flex items-center gap-2" data-v-587fc8cd${_scopeId}><span class="w-2 h-2 rounded-full bg-indigo-500" data-v-587fc8cd${_scopeId}></span> ${ssrInterpolate(_ctx.$t("total_input"))} <span class="text-indigo-600 dark:text-indigo-400 text-sm font-black" data-v-587fc8cd${_scopeId}>${ssrInterpolate(__props.form.habits.length)}</span></div><div class="flex gap-3 w-full sm:w-auto" data-v-587fc8cd${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                onClick: __props.close,
                class: "flex-1 sm:flex-none !py-3 !md:py-3.5 !rounded-xl !text-[11px] !font-black !tracking-tight !border-2 !border-slate-100 dark:!border-slate-800 !text-slate-400 dark:!text-slate-500 hover:!text-slate-600 dark:hover:!text-slate-400"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("btn_cancel"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("btn_cancel")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(PrimaryButton, {
                onClick: __props.submit,
                disabled: __props.form.processing,
                class: "flex-[2] sm:flex-none !bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-3 !md:py-3.5 !px-8 shadow-xl shadow-indigo-100 dark:shadow-none transition-all transform active:scale-95 font-black tracking-tight text-[11px]"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (__props.form.processing) {
                      _push3(`<span class="flex items-center gap-2 justify-center" data-v-587fc8cd${_scopeId2}><svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-587fc8cd${_scopeId2}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-587fc8cd${_scopeId2}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-587fc8cd${_scopeId2}></path></svg></span>`);
                    } else {
                      _push3(`<span data-v-587fc8cd${_scopeId2}>${ssrInterpolate(_ctx.$t("btn_save_batch"))}</span>`);
                    }
                  } else {
                    return [
                      __props.form.processing ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "flex items-center gap-2 justify-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "animate-spin h-4 w-4 text-white",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("circle", {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                          }),
                          createVNode("path", {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          })
                        ]))
                      ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.$t("btn_save_batch")), 1))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div><!--]-->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white dark:bg-slate-900 flex flex-col max-h-[85dvh] md:max-h-[85vh] relative overflow-hidden transition-all duration-300 border border-slate-100 dark:border-slate-800 shadow-2xl dark:shadow-none rounded-[2.5rem] w-full" }, [
                unref(isExplorer) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 min-h-[500px]"
                }, [
                  createVNode("button", {
                    onClick: __props.close,
                    class: "absolute top-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all z-50"
                  }, "✕", 8, ["onClick"]),
                  createVNode("div", { class: "absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" }),
                  createVNode("div", { class: "absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]" }),
                  createVNode("div", { class: "relative z-10 max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700" }, [
                    createVNode("div", { class: "relative w-20 h-20 mx-auto" }, [
                      createVNode("div", { class: "absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" }),
                      createVNode("div", { class: "relative w-20 h-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-xl flex items-center justify-center" }, [
                        createVNode(unref(Zap), {
                          size: 32,
                          class: "text-indigo-600 dark:text-indigo-400",
                          "stroke-width": "2.5"
                        })
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 shadow-sm" }, [
                        createVNode(unref(Sparkle), {
                          size: 10,
                          class: "text-indigo-500",
                          fill: "currentColor"
                        }),
                        createVNode("span", { class: "text-[8px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400" }, toDisplayString(_ctx.$t("gating.lock_title_required")), 1)
                      ]),
                      createVNode("h3", { class: "text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter leading-tight" }, toDisplayString(_ctx.$t("gating.planner_batch.title")), 1),
                      createVNode("p", { class: "text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed" }, toDisplayString(_ctx.$t("gating.planner_batch.description")), 1)
                    ]),
                    createVNode("div", { class: "space-y-3" }, [
                      (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3], (i) => {
                        return createVNode("div", {
                          key: i,
                          class: "flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm"
                        }, [
                          createVNode("div", { class: "w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0" }, [
                            createVNode(unref(CheckCircle2), { size: 12 })
                          ]),
                          createVNode("span", { class: "text-[10px] font-black text-slate-700 dark:text-slate-300 tracking-tight" }, toDisplayString(_ctx.$t("gating.planner_batch.benefit_" + i)), 1)
                        ]);
                      }), 64))
                    ]),
                    createVNode("div", { class: "pt-4 space-y-3" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("billing"),
                        class: "w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest shadow-xl shadow-indigo-200 dark:shadow-none transition-all active:scale-95 group"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("gating.btn_upgrade")) + " ", 1),
                          createVNode(unref(ArrowRight), {
                            size: 16,
                            "stroke-width": "3",
                            class: "group-hover:translate-x-1 transition-transform"
                          })
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        onClick: __props.close,
                        class: "text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      }, toDisplayString(_ctx.$t("gating.btn_stay")), 9, ["onClick"])
                    ])
                  ])
                ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("div", { class: "px-6 md:px-8 py-5 md:py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 z-20 shrink-0" }, [
                    createVNode("div", { class: "flex items-center gap-3 md:gap-4" }, [
                      createVNode("div", { class: "w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-lg shadow-indigo-200 dark:shadow-none shrink-0" }, " ⚡ "),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-lg md:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none mb-1" }, toDisplayString(_ctx.$t("batch_habit_title")), 1),
                        createVNode("p", { class: "text-[9px] md:text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest" }, toDisplayString(_ctx.$t("batch_habit_subtitle")), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center gap-2 md:gap-3" }, [
                      createVNode("button", {
                        onClick: __props.switchToSingle,
                        type: "button",
                        class: "hidden sm:flex text-[10px] font-black tracking-tight px-4 py-2.5 rounded-xl border-2 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all active:scale-95 items-center gap-2"
                      }, [
                        createVNode("span", null, "↩️"),
                        createTextVNode(" " + toDisplayString(_ctx.$t("btn_single_mode")), 1)
                      ], 8, ["onClick"]),
                      createVNode("button", {
                        onClick: __props.close,
                        class: "w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold"
                      }, " ✕ ", 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-950/50 p-4 md:p-8 relative" }, [
                    createVNode("div", { class: "hidden md:grid grid-cols-12 gap-3 mb-3 px-4 text-[9px] font-bold text-slate-400 tracking-tight" }, [
                      createVNode("div", { class: "col-span-4" }, toDisplayString(_ctx.$t("habit_name")), 1),
                      createVNode("div", { class: "col-span-2 text-center" }, toDisplayString(_ctx.$t("habit_icon")), 1),
                      createVNode("div", { class: "col-span-3 text-center" }, toDisplayString(_ctx.$t("habit_color")), 1),
                      createVNode("div", { class: "col-span-2 text-center" }, toDisplayString(_ctx.$t("target")), 1),
                      createVNode("div", { class: "col-span-1 text-center" }, toDisplayString(_ctx.$t("action")), 1)
                    ]),
                    createVNode("div", { class: "space-y-4 md:space-y-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.form.habits, (trx, index) => {
                        var _a, _b;
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "bg-white dark:bg-slate-900 md:bg-transparent p-5 md:p-0 rounded-[2rem] md:rounded-none border border-slate-100 dark:border-slate-800 md:border-none shadow-sm md:shadow-none relative group animate-in fade-in slide-in-from-bottom-4 duration-300"
                        }, [
                          createVNode("div", { class: "flex justify-between items-center mb-4 md:hidden" }, [
                            createVNode("span", { class: "text-[10px] font-black tracking-widest px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-400" }, toDisplayString(_ctx.$t("habit_label")) + " #" + toDisplayString(index + 1), 1),
                            createVNode("button", {
                              onClick: ($event) => __props.removeRow(index),
                              type: "button",
                              class: ["w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-400 dark:text-rose-500 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 transition-all", { "opacity-50 cursor-not-allowed": __props.form.habits.length <= 1 }],
                              disabled: __props.form.habits.length <= 1
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                "stroke-width": "3"
                              }, [
                                createVNode("path", { d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" })
                              ]))
                            ], 10, ["onClick", "disabled"])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3 items-center md:bg-white md:dark:bg-slate-900 md:p-2.5 md:rounded-2xl md:border md:border-slate-200 md:dark:border-slate-800 md:shadow-sm" }, [
                            createVNode("div", { class: "col-span-1 md:col-span-4" }, [
                              createVNode("label", { class: "md:hidden text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 block" }, toDisplayString(_ctx.$t("habit_name")), 1),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => trx.name = $event,
                                placeholder: _ctx.$t("habit_name_placeholder"),
                                class: ["w-full text-xs font-bold h-12 md:h-11 px-4 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 dark:text-slate-100 transition-all focus:ring-0", { "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 placeholder-rose-300 dark:placeholder-rose-500/50": (_a = __props.form.errors) == null ? void 0 : _a[`habits.${index}.name`] }]
                              }, null, 10, ["onUpdate:modelValue", "placeholder"]), [
                                [vModelText, trx.name]
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-2 gap-4 md:contents" }, [
                              createVNode("div", { class: "relative icon-dropdown-container" }, [
                                createVNode("label", { class: "md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block" }, toDisplayString(_ctx.$t("habit_icon")), 1),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => openIconDropdown.value = openIconDropdown.value === index ? null : index,
                                  class: ["w-full h-12 md:h-11 flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-white dark:hover:bg-slate-900 rounded-xl transition-all focus:border-indigo-500", openIconDropdown.value === index ? "border-indigo-500 ring-2 ring-indigo-100 dark:ring-indigo-500/20 bg-white dark:bg-slate-900" : ""]
                                }, [
                                  createVNode("span", { class: "text-xl" }, toDisplayString(trx.icon), 1),
                                  (openBlock(), createBlock("svg", {
                                    class: "w-3 h-3 text-slate-400 dark:text-slate-500",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    "stroke-width": "3"
                                  }, [
                                    createVNode("path", { d: "M19 9l-7 7-7-7" })
                                  ]))
                                ], 10, ["onClick"]),
                                createVNode(Transition, {
                                  "enter-active-class": "transition ease-out duration-100",
                                  "enter-from-class": "opacity-0 scale-95",
                                  "enter-to-class": "opacity-100 scale-100",
                                  "leave-active-class": "transition ease-in duration-75",
                                  "leave-from-class": "opacity-100 scale-100",
                                  "leave-to-class": "opacity-0 scale-95"
                                }, {
                                  default: withCtx(() => [
                                    openIconDropdown.value === index ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "absolute z-[100] top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-none p-3 grid grid-cols-4 gap-2 origin-top max-h-48 overflow-y-auto custom-scrollbar"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.iconList, (icon) => {
                                        return openBlock(), createBlock("button", {
                                          type: "button",
                                          key: icon,
                                          onClick: ($event) => {
                                            trx.icon = icon;
                                            openIconDropdown.value = null;
                                          },
                                          class: ["w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/20 hover:scale-110 transition-all", trx.icon === icon ? "bg-indigo-100 dark:bg-indigo-500/30 shadow-sm" : "opacity-70"]
                                        }, toDisplayString(icon), 11, ["onClick"]);
                                      }), 128))
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              createVNode("div", { class: "flex flex-col" }, [
                                createVNode("label", { class: "md:hidden text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-tight mb-2 block w-full text-left" }, toDisplayString(_ctx.$t("habit_color")), 1),
                                createVNode("div", { class: "flex flex-wrap items-center gap-1.5 p-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 h-12 md:h-11 justify-center md:bg-transparent md:border-none" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.colorPalette.slice(0, 6), (c) => {
                                    return openBlock(), createBlock("button", {
                                      type: "button",
                                      key: c,
                                      onClick: ($event) => trx.color = c,
                                      class: ["w-5 h-5 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm", trx.color === c ? "ring-2 ring-offset-2 ring-indigo-500 scale-110" : "opacity-80"],
                                      style: { backgroundColor: c }
                                    }, null, 14, ["onClick"]);
                                  }), 128))
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "col-span-1 md:col-span-2" }, [
                              createVNode("label", { class: "md:hidden text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 block" }, toDisplayString(_ctx.$t("target_days")), 1),
                              createVNode("div", { class: "relative flex items-center" }, [
                                withDirectives(createVNode("input", {
                                  type: "number",
                                  "onUpdate:modelValue": ($event) => trx.monthly_target = $event,
                                  min: "1",
                                  max: "31",
                                  class: ["w-full text-center text-xs font-black h-12 md:h-11 pl-2 pr-6 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 transition-all focus:ring-0 text-indigo-700 dark:text-indigo-400", { "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400": (_b = __props.form.errors) == null ? void 0 : _b[`habits.${index}.monthly_target`] }]
                                }, null, 10, ["onUpdate:modelValue"]), [
                                  [vModelText, trx.monthly_target]
                                ]),
                                createVNode("span", { class: "absolute right-3 text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-tight pointer-events-none" }, "Hr")
                              ])
                            ]),
                            createVNode("div", { class: "hidden md:flex col-span-1 justify-center items-center" }, [
                              createVNode("button", {
                                onClick: ($event) => __props.removeRow(index),
                                type: "button",
                                class: ["w-10 h-10 rounded-xl flex items-center justify-center hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-90", __props.form.habits.length <= 1 ? "opacity-0 pointer-events-none" : "text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400"],
                                disabled: __props.form.habits.length <= 1
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "w-5 h-5",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "2.5"
                                }, [
                                  createVNode("path", { d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" })
                                ]))
                              ], 10, ["onClick", "disabled"])
                            ])
                          ])
                        ]);
                      }), 128))
                    ]),
                    createVNode("button", {
                      onClick: __props.addRow,
                      type: "button",
                      class: "mt-6 w-full py-4 border-2 border-dashed border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-2xl text-indigo-600 dark:text-indigo-400 font-black tracking-tight text-[10px] hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-500/10 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm dark:shadow-none"
                    }, [
                      createVNode("span", { class: "w-5 h-5 rounded-md bg-indigo-200 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs shadow-sm" }, "+"),
                      createTextVNode(" " + toDisplayString(_ctx.$t("btn_add_habit_row")), 1)
                    ], 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "px-6 md:px-8 py-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 z-20 pb-8 md:pb-6" }, [
                    createVNode("div", { class: "text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-tight flex items-center gap-2" }, [
                      createVNode("span", { class: "w-2 h-2 rounded-full bg-indigo-500" }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("total_input")) + " ", 1),
                      createVNode("span", { class: "text-indigo-600 dark:text-indigo-400 text-sm font-black" }, toDisplayString(__props.form.habits.length), 1)
                    ]),
                    createVNode("div", { class: "flex gap-3 w-full sm:w-auto" }, [
                      createVNode(_sfc_main$2, {
                        onClick: __props.close,
                        class: "flex-1 sm:flex-none !py-3 !md:py-3.5 !rounded-xl !text-[11px] !font-black !tracking-tight !border-2 !border-slate-100 dark:!border-slate-800 !text-slate-400 dark:!text-slate-500 hover:!text-slate-600 dark:hover:!text-slate-400"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("btn_cancel")), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(PrimaryButton, {
                        onClick: __props.submit,
                        disabled: __props.form.processing,
                        class: "flex-[2] sm:flex-none !bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-3 !md:py-3.5 !px-8 shadow-xl shadow-indigo-100 dark:shadow-none transition-all transform active:scale-95 font-black tracking-tight text-[11px]"
                      }, {
                        default: withCtx(() => [
                          __props.form.processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "flex items-center gap-2 justify-center"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "animate-spin h-4 w-4 text-white",
                              fill: "none",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("circle", {
                                class: "opacity-25",
                                cx: "12",
                                cy: "12",
                                r: "10",
                                stroke: "currentColor",
                                "stroke-width": "4"
                              }),
                              createVNode("path", {
                                class: "opacity-75",
                                fill: "currentColor",
                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              })
                            ]))
                          ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.$t("btn_save_batch")), 1))
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"])
                    ])
                  ])
                ], 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Habits/HabitBatchModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HabitBatchModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-587fc8cd"]]);
export {
  HabitBatchModal as default
};
