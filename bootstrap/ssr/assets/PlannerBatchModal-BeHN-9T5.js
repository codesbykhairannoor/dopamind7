import { mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, withDirectives, vModelText, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Modal-b6JySqy_.js";
import { _ as _sfc_main$2 } from "./TextInput-xTq3OG6l.js";
import { P as PrimaryButton } from "./PrimaryButton-DPmleQI_.js";
import { _ as _sfc_main$3 } from "./SecondaryButton-BgIg9sGF.js";
import { Zap, Sparkle, CheckCircle2, ArrowRight } from "lucide-vue-next";
import { u as useGating } from "./useGating-DZoi6H2L.js";
import { Link } from "@inertiajs/vue3";
import "./OneForMindIcon-BvGLCgx4.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "dayjs";
const _sfc_main = {
  __name: "PlannerBatchModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    form: Object,
    conflictError: String,
    close: Function,
    submit: Function,
    addRow: Function,
    removeRow: Function,
    switchToSingle: Function
  },
  setup(__props) {
    const { isExplorer } = useGating();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: __props.show,
        onClose: __props.close,
        maxWidth: "2xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white dark:bg-slate-900 rounded-[2.5rem] flex flex-col max-h-[90vh] relative overflow-hidden transition-all duration-500 border border-slate-100 dark:border-slate-800 shadow-2xl" data-v-42fe1a74${_scopeId}>`);
            if (__props.conflictError) {
              _push2(`<div class="absolute top-0 left-0 right-0 bg-rose-500 text-white text-[10px] font-black px-6 py-3.5 text-center animate-in slide-in-from-top-full z-50 shadow-lg flex items-center justify-center gap-2 tracking-[0.05em]" data-v-42fe1a74${_scopeId}><svg class="w-4 h-4 shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-42fe1a74${_scopeId}><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-42fe1a74${_scopeId}></path></svg><span data-v-42fe1a74${_scopeId}>${ssrInterpolate(__props.conflictError)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="${ssrRenderClass([{ "mt-12": __props.conflictError }, "px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0 z-20 transition-colors"])}" data-v-42fe1a74${_scopeId}><div class="flex items-center gap-4" data-v-42fe1a74${_scopeId}><div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-indigo-100" data-v-42fe1a74${_scopeId}> ✨ </div><div data-v-42fe1a74${_scopeId}><h2 class="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1 transition-colors" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("batch_mode_title"))}</h2><p class="text-[10px] text-slate-400 dark:text-slate-600 font-bold tracking-widest transition-colors" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("modal_new_simple_title", "Collective scheduling"))}</p></div></div><div class="flex items-center gap-3" data-v-42fe1a74${_scopeId}><button type="button" class="hidden sm:flex text-[10px] font-black tracking-widest px-4 py-2 rounded-xl border-2 border-slate-50 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all active:scale-95 items-center gap-2" data-v-42fe1a74${_scopeId}><span data-v-42fe1a74${_scopeId}>↩️</span> ${ssrInterpolate(_ctx.$t("btn_single_mode"))}</button><button class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold" data-v-42fe1a74${_scopeId}> ✕ </button></div></div><div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30 p-4 md:p-8 transition-colors relative" data-v-42fe1a74${_scopeId}>`);
            if (unref(isExplorer)) {
              _push2(`<div class="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 min-h-[500px]" data-v-42fe1a74${_scopeId}><button class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all z-50 font-bold" data-v-42fe1a74${_scopeId}>✕</button><div class="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" data-v-42fe1a74${_scopeId}></div><div class="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]" data-v-42fe1a74${_scopeId}></div><div class="relative z-10 max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700" data-v-42fe1a74${_scopeId}><div class="relative w-20 h-20 mx-auto" data-v-42fe1a74${_scopeId}><div class="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" data-v-42fe1a74${_scopeId}></div><div class="relative w-20 h-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-xl flex items-center justify-center" data-v-42fe1a74${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Zap), {
                size: 32,
                class: "text-indigo-600 dark:text-indigo-400",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div data-v-42fe1a74${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 shadow-sm" data-v-42fe1a74${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Sparkle), {
                size: 10,
                class: "text-indigo-500",
                fill: "currentColor"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("gating.lock_title_required"))}</span></div><h3 class="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter leading-tight" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("gating.planner_batch.title"))}</h3><p class="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("gating.planner_batch.description"))}</p></div><div class="space-y-3" data-v-42fe1a74${_scopeId}><!--[-->`);
              ssrRenderList([1, 2, 3], (i) => {
                _push2(`<div class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm" data-v-42fe1a74${_scopeId}><div class="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0" data-v-42fe1a74${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle2), { size: 12 }, null, _parent2, _scopeId));
                _push2(`</div><span class="text-[10px] font-black text-slate-700 dark:text-slate-300 tracking-tight" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("gating.planner_batch.benefit_" + i))}</span></div>`);
              });
              _push2(`<!--]--></div><div class="pt-4 space-y-3" data-v-42fe1a74${_scopeId}>`);
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
              _push2(`<button class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("gating.btn_stay"))}</button></div></div></div>`);
            } else {
              _push2(`<!--[--><div class="${ssrRenderClass([{ "mt-12": __props.conflictError }, "px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0 z-20 transition-colors"])}" data-v-42fe1a74${_scopeId}><div class="flex items-center gap-4" data-v-42fe1a74${_scopeId}><div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-indigo-100" data-v-42fe1a74${_scopeId}> ✨ </div><div data-v-42fe1a74${_scopeId}><h2 class="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1 transition-colors" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("batch_mode_title"))}</h2><p class="text-[10px] text-slate-400 dark:text-slate-600 font-bold tracking-widest transition-colors" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("modal_new_simple_title", "Collective scheduling"))}</p></div></div><div class="flex items-center gap-3" data-v-42fe1a74${_scopeId}><button type="button" class="hidden sm:flex text-[10px] font-black tracking-widest px-4 py-2 rounded-xl border-2 border-slate-50 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all active:scale-95 items-center gap-2" data-v-42fe1a74${_scopeId}><span data-v-42fe1a74${_scopeId}>↩️</span> ${ssrInterpolate(_ctx.$t("btn_single_mode"))}</button><button class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold" data-v-42fe1a74${_scopeId}> ✕ </button></div></div><div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30 p-4 md:p-8 transition-colors relative" data-v-42fe1a74${_scopeId}><div class="hidden md:grid grid-cols-12 gap-4 mb-4 px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest" data-v-42fe1a74${_scopeId}><div class="col-span-5 ml-1" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("col_activity"))} <span class="text-rose-500" data-v-42fe1a74${_scopeId}>*</span></div><div class="col-span-2 text-center" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("col_start"))}</div><div class="col-span-2 text-center" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("col_end"))}</div><div class="col-span-2 text-center" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("col_priority"))}</div><div class="col-span-1" data-v-42fe1a74${_scopeId}></div></div><div class="space-y-4 md:space-y-3 mt-2" data-v-42fe1a74${_scopeId}><!--[-->`);
              ssrRenderList(__props.form.tasks, (task, index) => {
                _push2(`<div class="bg-white dark:bg-slate-900 md:bg-transparent p-5 md:p-0 rounded-[2rem] md:rounded-none border border-slate-100 dark:border-slate-800 md:border-none shadow-sm md:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-500 group transition-colors" data-v-42fe1a74${_scopeId}><div class="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center md:bg-white md:dark:bg-slate-900 md:p-2.5 md:rounded-2xl md:border md:border-slate-200 md:dark:border-slate-800 md:shadow-sm" data-v-42fe1a74${_scopeId}><div class="col-span-12 md:col-span-5" data-v-42fe1a74${_scopeId}><label class="md:hidden text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 ml-1 block" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("col_activity"))}</label>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  modelValue: task.title,
                  "onUpdate:modelValue": ($event) => task.title = $event,
                  placeholder: _ctx.$t("placeholder_activity"),
                  class: ["w-full text-sm font-bold py-3 md:py-2.5 px-4 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-0 transition-all dark:text-white", { "!border-rose-300 !bg-rose-50 dark:!bg-rose-950/20": __props.form.errors[`tasks.${index}.title`] }]
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="col-span-12 md:col-span-4 grid grid-cols-2 gap-3 md:contents" data-v-42fe1a74${_scopeId}><div class="flex flex-col" data-v-42fe1a74${_scopeId}><label class="md:hidden text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 ml-1 block" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("col_start"))}</label><input type="time"${ssrRenderAttr("value", task.start_time)} class="${ssrRenderClass([{ "!border-rose-500 !bg-rose-50 dark:!bg-rose-950/20 !text-rose-700 dark:!text-rose-400": __props.form.errors[`tasks.${index}.start_time`] }, "w-full border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm py-3 md:py-2.5 px-1 text-center font-bold text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:ring-0 cursor-pointer transition-all shadow-sm"])}" data-v-42fe1a74${_scopeId}></div><div class="flex flex-col" data-v-42fe1a74${_scopeId}><label class="md:hidden text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 ml-1 block" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("col_end"))}</label><input type="time"${ssrRenderAttr("value", task.end_time)} class="${ssrRenderClass([{ "!border-rose-500 !bg-rose-50 dark:!bg-rose-950/20 !text-rose-700 dark:!text-rose-400": __props.form.errors[`tasks.${index}.end_time`] }, "w-full border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm py-3 md:py-2.5 px-1 text-center font-bold text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:ring-0 cursor-pointer transition-all shadow-sm"])}" data-v-42fe1a74${_scopeId}></div></div><div class="col-span-12 md:col-span-2" data-v-42fe1a74${_scopeId}><label class="md:hidden text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 ml-1 block" data-v-42fe1a74${_scopeId}>${ssrInterpolate(_ctx.$t("col_priority"))}</label><div class="relative" data-v-42fe1a74${_scopeId}><select class="${ssrRenderClass([{
                  "!text-rose-600 dark:!text-rose-400 !bg-rose-50 dark:!bg-rose-500/10": task.type == 1,
                  "!text-indigo-600 dark:!text-indigo-400 !bg-indigo-50 dark:!bg-indigo-500/10": task.type == 2,
                  "!text-emerald-600 dark:!text-emerald-400 !bg-emerald-50 dark:!bg-emerald-500/10": task.type == 3
                }, "w-full border-2 border-slate-200 dark:border-slate-800 rounded-xl text-[10px] py-3 md:py-2.5 pl-3 pr-8 font-bold text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:ring-0 bg-slate-50 dark:bg-slate-950 appearance-none cursor-pointer transition-all"])}" data-v-42fe1a74${_scopeId}><option${ssrRenderAttr("value", 1)} class="dark:bg-slate-900" data-v-42fe1a74${ssrIncludeBooleanAttr(Array.isArray(task.type) ? ssrLooseContain(task.type, 1) : ssrLooseEqual(task.type, 1)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(_ctx.$t("priority_urgent"))}</option><option${ssrRenderAttr("value", 2)} class="dark:bg-slate-900" data-v-42fe1a74${ssrIncludeBooleanAttr(Array.isArray(task.type) ? ssrLooseContain(task.type, 2) : ssrLooseEqual(task.type, 2)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(_ctx.$t("priority_work"))}</option><option${ssrRenderAttr("value", 3)} class="dark:bg-slate-900" data-v-42fe1a74${ssrIncludeBooleanAttr(Array.isArray(task.type) ? ssrLooseContain(task.type, 3) : ssrLooseEqual(task.type, 3)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(_ctx.$t("priority_normal"))}</option></select><div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400" data-v-42fe1a74${_scopeId}><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="4" data-v-42fe1a74${_scopeId}><path d="M19 9l-7 7-7-7" data-v-42fe1a74${_scopeId}></path></svg></div></div></div><div class="col-span-12 md:col-span-1 flex justify-center items-end md:items-center pt-2 md:pt-0 border-t border-slate-50 dark:border-slate-800 md:border-none mt-2 md:mt-0" data-v-42fe1a74${_scopeId}><button type="button"${ssrIncludeBooleanAttr(__props.form.tasks.length <= 1) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-0 pointer-events-none": __props.form.tasks.length <= 1 }, "w-full md:w-8 h-10 md:h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-95 gap-2"])}" data-v-42fe1a74${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-42fe1a74${_scopeId}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" data-v-42fe1a74${_scopeId}></path></svg><span class="md:hidden text-[10px] font-bold" data-v-42fe1a74${_scopeId}>Hapus baris ini</span></button></div></div></div>`);
              });
              _push2(`<!--]--></div><button type="button" class="mt-8 w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[1.5rem] text-slate-400 dark:text-slate-600 font-bold text-[10px] hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-sm" data-v-42fe1a74${_scopeId}><span class="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm" data-v-42fe1a74${_scopeId}>+</span> ${ssrInterpolate(_ctx.$t("btn_add_another"))}</button></div><div class="px-8 py-6 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 transition-colors" data-v-42fe1a74${_scopeId}><div class="text-[10px] font-bold text-slate-400 dark:text-slate-600 flex items-center gap-2" data-v-42fe1a74${_scopeId}><span class="w-2 h-2 rounded-full bg-indigo-500" data-v-42fe1a74${_scopeId}></span> ${ssrInterpolate(_ctx.$t("total_label"))} <span class="text-indigo-600 dark:text-indigo-400 text-sm font-black" data-v-42fe1a74${_scopeId}>${ssrInterpolate(__props.form.tasks.length)}</span> ${ssrInterpolate(_ctx.$t("total_suffix"))}</div><div class="flex gap-3 w-full sm:w-auto" data-v-42fe1a74${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                onClick: __props.close,
                class: "flex-1 !py-3.5 !rounded-[1.2rem] !text-[10px] !font-bold !border-2 !text-slate-400 hover:!text-slate-600"
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
                disabled: __props.form.processing || __props.conflictError,
                class: ["flex-[2] !bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-3.5 !px-8 shadow-xl shadow-indigo-100 dark:shadow-none transition-all transform active:scale-95 font-bold text-[10px]", { "!bg-slate-300 !text-slate-500 !cursor-not-allowed !shadow-none !transform-none": __props.conflictError }]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (__props.form.processing) {
                      _push3(`<span data-v-42fe1a74${_scopeId2}>${ssrInterpolate(_ctx.$t("btn_saving"))}</span>`);
                    } else {
                      _push3(`<span data-v-42fe1a74${_scopeId2}>${ssrInterpolate(_ctx.$t("btn_save_all"))}</span>`);
                    }
                  } else {
                    return [
                      __props.form.processing ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(_ctx.$t("btn_saving")), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.$t("btn_save_all")), 1))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div><!--]-->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white dark:bg-slate-900 rounded-[2.5rem] flex flex-col max-h-[90vh] relative overflow-hidden transition-all duration-500 border border-slate-100 dark:border-slate-800 shadow-2xl" }, [
                __props.conflictError ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute top-0 left-0 right-0 bg-rose-500 text-white text-[10px] font-black px-6 py-3.5 text-center animate-in slide-in-from-top-full z-50 shadow-lg flex items-center justify-center gap-2 tracking-[0.05em]"
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-4 h-4 shrink-0 animate-pulse",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    "stroke-width": "3"
                  }, [
                    createVNode("path", { d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" })
                  ])),
                  createVNode("span", null, toDisplayString(__props.conflictError), 1)
                ])) : createCommentVNode("", true),
                createVNode("div", {
                  class: ["px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0 z-20 transition-colors", { "mt-12": __props.conflictError }]
                }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-indigo-100" }, " ✨ "),
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1 transition-colors" }, toDisplayString(_ctx.$t("batch_mode_title")), 1),
                      createVNode("p", { class: "text-[10px] text-slate-400 dark:text-slate-600 font-bold tracking-widest transition-colors" }, toDisplayString(_ctx.$t("modal_new_simple_title", "Collective scheduling")), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("button", {
                      onClick: __props.switchToSingle,
                      type: "button",
                      class: "hidden sm:flex text-[10px] font-black tracking-widest px-4 py-2 rounded-xl border-2 border-slate-50 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all active:scale-95 items-center gap-2"
                    }, [
                      createVNode("span", null, "↩️"),
                      createTextVNode(" " + toDisplayString(_ctx.$t("btn_single_mode")), 1)
                    ], 8, ["onClick"]),
                    createVNode("button", {
                      onClick: __props.close,
                      class: "w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold"
                    }, " ✕ ", 8, ["onClick"])
                  ])
                ], 2),
                createVNode("div", { class: "flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30 p-4 md:p-8 transition-colors relative" }, [
                  unref(isExplorer) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 min-h-[500px]"
                  }, [
                    createVNode("button", {
                      onClick: __props.close,
                      class: "absolute top-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all z-50 font-bold"
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
                    createVNode("div", {
                      class: ["px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0 z-20 transition-colors", { "mt-12": __props.conflictError }]
                    }, [
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode("div", { class: "w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-indigo-100" }, " ✨ "),
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1 transition-colors" }, toDisplayString(_ctx.$t("batch_mode_title")), 1),
                          createVNode("p", { class: "text-[10px] text-slate-400 dark:text-slate-600 font-bold tracking-widest transition-colors" }, toDisplayString(_ctx.$t("modal_new_simple_title", "Collective scheduling")), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("button", {
                          onClick: __props.switchToSingle,
                          type: "button",
                          class: "hidden sm:flex text-[10px] font-black tracking-widest px-4 py-2 rounded-xl border-2 border-slate-50 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all active:scale-95 items-center gap-2"
                        }, [
                          createVNode("span", null, "↩️"),
                          createTextVNode(" " + toDisplayString(_ctx.$t("btn_single_mode")), 1)
                        ], 8, ["onClick"]),
                        createVNode("button", {
                          onClick: __props.close,
                          class: "w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold"
                        }, " ✕ ", 8, ["onClick"])
                      ])
                    ], 2),
                    createVNode("div", { class: "flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30 p-4 md:p-8 transition-colors relative" }, [
                      createVNode("div", { class: "hidden md:grid grid-cols-12 gap-4 mb-4 px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest" }, [
                        createVNode("div", { class: "col-span-5 ml-1" }, [
                          createTextVNode(toDisplayString(_ctx.$t("col_activity")) + " ", 1),
                          createVNode("span", { class: "text-rose-500" }, "*")
                        ]),
                        createVNode("div", { class: "col-span-2 text-center" }, toDisplayString(_ctx.$t("col_start")), 1),
                        createVNode("div", { class: "col-span-2 text-center" }, toDisplayString(_ctx.$t("col_end")), 1),
                        createVNode("div", { class: "col-span-2 text-center" }, toDisplayString(_ctx.$t("col_priority")), 1),
                        createVNode("div", { class: "col-span-1" })
                      ]),
                      createVNode("div", { class: "space-y-4 md:space-y-3 mt-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.form.tasks, (task, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "bg-white dark:bg-slate-900 md:bg-transparent p-5 md:p-0 rounded-[2rem] md:rounded-none border border-slate-100 dark:border-slate-800 md:border-none shadow-sm md:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-500 group transition-colors"
                          }, [
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center md:bg-white md:dark:bg-slate-900 md:p-2.5 md:rounded-2xl md:border md:border-slate-200 md:dark:border-slate-800 md:shadow-sm" }, [
                              createVNode("div", { class: "col-span-12 md:col-span-5" }, [
                                createVNode("label", { class: "md:hidden text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 ml-1 block" }, toDisplayString(_ctx.$t("col_activity")), 1),
                                createVNode(_sfc_main$2, {
                                  modelValue: task.title,
                                  "onUpdate:modelValue": ($event) => task.title = $event,
                                  placeholder: _ctx.$t("placeholder_activity"),
                                  class: ["w-full text-sm font-bold py-3 md:py-2.5 px-4 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-0 transition-all dark:text-white", { "!border-rose-300 !bg-rose-50 dark:!bg-rose-950/20": __props.form.errors[`tasks.${index}.title`] }]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "class"])
                              ]),
                              createVNode("div", { class: "col-span-12 md:col-span-4 grid grid-cols-2 gap-3 md:contents" }, [
                                createVNode("div", { class: "flex flex-col" }, [
                                  createVNode("label", { class: "md:hidden text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 ml-1 block" }, toDisplayString(_ctx.$t("col_start")), 1),
                                  withDirectives(createVNode("input", {
                                    type: "time",
                                    "onUpdate:modelValue": ($event) => task.start_time = $event,
                                    class: ["w-full border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm py-3 md:py-2.5 px-1 text-center font-bold text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:ring-0 cursor-pointer transition-all shadow-sm", { "!border-rose-500 !bg-rose-50 dark:!bg-rose-950/20 !text-rose-700 dark:!text-rose-400": __props.form.errors[`tasks.${index}.start_time`] }]
                                  }, null, 10, ["onUpdate:modelValue"]), [
                                    [vModelText, task.start_time]
                                  ])
                                ]),
                                createVNode("div", { class: "flex flex-col" }, [
                                  createVNode("label", { class: "md:hidden text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 ml-1 block" }, toDisplayString(_ctx.$t("col_end")), 1),
                                  withDirectives(createVNode("input", {
                                    type: "time",
                                    "onUpdate:modelValue": ($event) => task.end_time = $event,
                                    class: ["w-full border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm py-3 md:py-2.5 px-1 text-center font-bold text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:ring-0 cursor-pointer transition-all shadow-sm", { "!border-rose-500 !bg-rose-50 dark:!bg-rose-950/20 !text-rose-700 dark:!text-rose-400": __props.form.errors[`tasks.${index}.end_time`] }]
                                  }, null, 10, ["onUpdate:modelValue"]), [
                                    [vModelText, task.end_time]
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "col-span-12 md:col-span-2" }, [
                                createVNode("label", { class: "md:hidden text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 ml-1 block" }, toDisplayString(_ctx.$t("col_priority")), 1),
                                createVNode("div", { class: "relative" }, [
                                  withDirectives(createVNode("select", {
                                    "onUpdate:modelValue": ($event) => task.type = $event,
                                    class: ["w-full border-2 border-slate-200 dark:border-slate-800 rounded-xl text-[10px] py-3 md:py-2.5 pl-3 pr-8 font-bold text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:ring-0 bg-slate-50 dark:bg-slate-950 appearance-none cursor-pointer transition-all", {
                                      "!text-rose-600 dark:!text-rose-400 !bg-rose-50 dark:!bg-rose-500/10": task.type == 1,
                                      "!text-indigo-600 dark:!text-indigo-400 !bg-indigo-50 dark:!bg-indigo-500/10": task.type == 2,
                                      "!text-emerald-600 dark:!text-emerald-400 !bg-emerald-50 dark:!bg-emerald-500/10": task.type == 3
                                    }]
                                  }, [
                                    createVNode("option", {
                                      value: 1,
                                      class: "dark:bg-slate-900"
                                    }, toDisplayString(_ctx.$t("priority_urgent")), 1),
                                    createVNode("option", {
                                      value: 2,
                                      class: "dark:bg-slate-900"
                                    }, toDisplayString(_ctx.$t("priority_work")), 1),
                                    createVNode("option", {
                                      value: 3,
                                      class: "dark:bg-slate-900"
                                    }, toDisplayString(_ctx.$t("priority_normal")), 1)
                                  ], 10, ["onUpdate:modelValue"]), [
                                    [vModelSelect, task.type]
                                  ]),
                                  createVNode("div", { class: "absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400" }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "w-3 h-3",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24",
                                      "stroke-width": "4"
                                    }, [
                                      createVNode("path", { d: "M19 9l-7 7-7-7" })
                                    ]))
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "col-span-12 md:col-span-1 flex justify-center items-end md:items-center pt-2 md:pt-0 border-t border-slate-50 dark:border-slate-800 md:border-none mt-2 md:mt-0" }, [
                                createVNode("button", {
                                  onClick: ($event) => __props.removeRow(index),
                                  type: "button",
                                  class: ["w-full md:w-8 h-10 md:h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-95 gap-2", { "opacity-0 pointer-events-none": __props.form.tasks.length <= 1 }],
                                  disabled: __props.form.tasks.length <= 1
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    "stroke-width": "2.5"
                                  }, [
                                    createVNode("path", { d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" })
                                  ])),
                                  createVNode("span", { class: "md:hidden text-[10px] font-bold" }, "Hapus baris ini")
                                ], 10, ["onClick", "disabled"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ]),
                      createVNode("button", {
                        onClick: __props.addRow,
                        type: "button",
                        class: "mt-8 w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[1.5rem] text-slate-400 dark:text-slate-600 font-bold text-[10px] hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-sm"
                      }, [
                        createVNode("span", { class: "w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm" }, "+"),
                        createTextVNode(" " + toDisplayString(_ctx.$t("btn_add_another")), 1)
                      ], 8, ["onClick"])
                    ]),
                    createVNode("div", { class: "px-8 py-6 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 transition-colors" }, [
                      createVNode("div", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-600 flex items-center gap-2" }, [
                        createVNode("span", { class: "w-2 h-2 rounded-full bg-indigo-500" }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("total_label")) + " ", 1),
                        createVNode("span", { class: "text-indigo-600 dark:text-indigo-400 text-sm font-black" }, toDisplayString(__props.form.tasks.length), 1),
                        createTextVNode(" " + toDisplayString(_ctx.$t("total_suffix")), 1)
                      ]),
                      createVNode("div", { class: "flex gap-3 w-full sm:w-auto" }, [
                        createVNode(_sfc_main$3, {
                          onClick: __props.close,
                          class: "flex-1 !py-3.5 !rounded-[1.2rem] !text-[10px] !font-bold !border-2 !text-slate-400 hover:!text-slate-600"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("btn_cancel")), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(PrimaryButton, {
                          onClick: __props.submit,
                          disabled: __props.form.processing || __props.conflictError,
                          class: ["flex-[2] !bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-3.5 !px-8 shadow-xl shadow-indigo-100 dark:shadow-none transition-all transform active:scale-95 font-bold text-[10px]", { "!bg-slate-300 !text-slate-500 !cursor-not-allowed !shadow-none !transform-none": __props.conflictError }]
                        }, {
                          default: withCtx(() => [
                            __props.form.processing ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(_ctx.$t("btn_saving")), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.$t("btn_save_all")), 1))
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled", "class"])
                      ])
                    ])
                  ], 64))
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Planner/PlannerBatchModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PlannerBatchModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-42fe1a74"]]);
export {
  PlannerBatchModal as default
};
