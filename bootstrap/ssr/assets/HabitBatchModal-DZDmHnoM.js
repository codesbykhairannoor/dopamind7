import { ref, onMounted, onUnmounted, mergeProps, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, Fragment, renderList, withDirectives, vModelText, Transition, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Modal-B2rYQMrj.js";
import { P as PrimaryButton } from "./PrimaryButton-4NJ7Yqx3.js";
import { _ as _sfc_main$2 } from "./SecondaryButton-BgIg9sGF.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
            _push2(`<div class="bg-white flex flex-col max-h-[85vh] relative overflow-hidden transition-all duration-300 border border-slate-200 shadow-2xl rounded-[2.5rem]" data-v-14ffe019${_scopeId}><div class="px-6 md:px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white z-20 shrink-0" data-v-14ffe019${_scopeId}><div class="flex items-center gap-4" data-v-14ffe019${_scopeId}><div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-200 shrink-0" data-v-14ffe019${_scopeId}> ⚡ </div><div data-v-14ffe019${_scopeId}><h3 class="text-xl font-black text-slate-800 tracking-tight leading-none mb-1.5" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("batch_habit_title", "Batch Habit"))}</h3><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("batch_habit_subtitle", "Catat banyak habit sekaligus"))}</p></div></div><div class="flex items-center gap-3" data-v-14ffe019${_scopeId}><button type="button" class="hidden sm:flex text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border-2 border-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95 items-center gap-2" data-v-14ffe019${_scopeId}><span data-v-14ffe019${_scopeId}>↩️</span> ${ssrInterpolate(_ctx.$t("btn_single_mode", "Single Mode"))}</button><button class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90 flex items-center justify-center font-bold" data-v-14ffe019${_scopeId}> ✕ </button></div></div><div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-4 md:p-8" data-v-14ffe019${_scopeId}><div class="hidden md:grid grid-cols-12 gap-3 mb-3 px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]" data-v-14ffe019${_scopeId}><div class="col-span-4" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("habit_name", "Nama Habit"))}</div><div class="col-span-2 text-center" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("habit_icon", "Ikon"))}</div><div class="col-span-3 text-center" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("habit_color", "Warna"))}</div><div class="col-span-2 text-center" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("target", "Target"))}</div><div class="col-span-1 text-center" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("action", "Aksi"))}</div></div><div class="space-y-4 md:space-y-3" data-v-14ffe019${_scopeId}><!--[-->`);
            ssrRenderList(__props.form.habits, (trx, index) => {
              var _a, _b;
              _push2(`<div class="bg-white md:bg-transparent p-5 md:p-0 rounded-[2rem] md:rounded-none border border-slate-100 md:border-none shadow-sm md:shadow-none relative group animate-in fade-in slide-in-from-bottom-4 duration-300" data-v-14ffe019${_scopeId}><div class="flex justify-between items-center mb-4 md:hidden" data-v-14ffe019${_scopeId}><span class="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-indigo-50 text-indigo-500" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("habit_label", "Habit"))} #${ssrInterpolate(index + 1)}</span><button type="button"${ssrIncludeBooleanAttr(__props.form.habits.length <= 1) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": __props.form.habits.length <= 1 }, "w-8 h-8 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 transition-all"])}" data-v-14ffe019${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-14ffe019${_scopeId}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-14ffe019${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3 items-center md:bg-white md:p-2.5 md:rounded-2xl md:border md:border-slate-200 md:shadow-sm" data-v-14ffe019${_scopeId}><div class="col-span-1 md:col-span-4" data-v-14ffe019${_scopeId}><label class="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("habit_name", "Nama Habit"))}</label><input${ssrRenderAttr("value", trx.name)}${ssrRenderAttr("placeholder", _ctx.$t("habit_name_placeholder", "Cth: Lari Pagi..."))} class="${ssrRenderClass([{ "!border-rose-300 !bg-rose-50 placeholder-rose-300": (_a = __props.form.errors) == null ? void 0 : _a[`habits.${index}.name`] }, "w-full text-xs font-bold h-12 md:h-11 px-4 !rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 transition-all focus:ring-0"])}" data-v-14ffe019${_scopeId}></div><div class="col-span-1 md:col-span-2 relative icon-dropdown-container" data-v-14ffe019${_scopeId}><label class="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("habit_icon", "Ikon"))}</label><button type="button" class="${ssrRenderClass([openIconDropdown.value === index ? "border-indigo-500 ring-2 ring-indigo-100 bg-white" : "", "w-full h-12 md:h-11 flex items-center justify-center gap-2 border-2 border-slate-200 bg-slate-50 hover:bg-white rounded-xl transition-all focus:border-indigo-500"])}" data-v-14ffe019${_scopeId}><span class="text-xl" data-v-14ffe019${_scopeId}>${ssrInterpolate(trx.icon)}</span><svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-14ffe019${_scopeId}><path d="M19 9l-7 7-7-7" data-v-14ffe019${_scopeId}></path></svg></button>`);
              if (openIconDropdown.value === index) {
                _push2(`<div class="absolute z-[100] top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid grid-cols-4 gap-2 origin-top max-h-48 overflow-y-auto custom-scrollbar" data-v-14ffe019${_scopeId}><!--[-->`);
                ssrRenderList(__props.iconList, (icon) => {
                  _push2(`<button type="button" class="${ssrRenderClass([trx.icon === icon ? "bg-indigo-100 shadow-sm" : "opacity-70", "w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-indigo-50 hover:scale-110 transition-all"])}" data-v-14ffe019${_scopeId}>${ssrInterpolate(icon)}</button>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="col-span-1 md:col-span-3 flex justify-center" data-v-14ffe019${_scopeId}><label class="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block w-full text-left" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("habit_color", "Warna"))}</label><div class="flex flex-wrap justify-center gap-1.5 md:gap-1.5 p-1 bg-slate-50 rounded-xl border border-slate-100 w-full md:w-auto" data-v-14ffe019${_scopeId}><!--[-->`);
              ssrRenderList(__props.colorPalette, (c) => {
                _push2(`<button type="button" class="${ssrRenderClass([trx.color === c ? "ring-2 ring-offset-2 ring-indigo-500 scale-110" : "opacity-80", "w-6 h-6 md:w-5 md:h-5 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm"])}" style="${ssrRenderStyle({ backgroundColor: c })}" data-v-14ffe019${_scopeId}></button>`);
              });
              _push2(`<!--]--></div></div><div class="col-span-1 md:col-span-2" data-v-14ffe019${_scopeId}><label class="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block" data-v-14ffe019${_scopeId}>${ssrInterpolate(_ctx.$t("target_days", "Target (Hari)"))}</label><div class="relative flex items-center" data-v-14ffe019${_scopeId}><input type="number"${ssrRenderAttr("value", trx.monthly_target)} min="1" max="31" class="${ssrRenderClass([{ "!border-rose-300 !bg-rose-50 text-rose-600": (_b = __props.form.errors) == null ? void 0 : _b[`habits.${index}.monthly_target`] }, "w-full text-center text-xs font-black h-12 md:h-11 pl-2 pr-6 !rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 transition-all focus:ring-0 text-indigo-700"])}" data-v-14ffe019${_scopeId}><span class="absolute right-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest pointer-events-none" data-v-14ffe019${_scopeId}>Hr</span></div></div><div class="hidden md:flex col-span-1 justify-center items-center" data-v-14ffe019${_scopeId}><button type="button"${ssrIncludeBooleanAttr(__props.form.habits.length <= 1) ? " disabled" : ""} class="${ssrRenderClass([__props.form.habits.length <= 1 ? "opacity-0 pointer-events-none" : "text-slate-300 hover:text-rose-500", "w-10 h-10 rounded-xl flex items-center justify-center hover:bg-rose-50 transition-all active:scale-90"])}" data-v-14ffe019${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-14ffe019${_scopeId}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-14ffe019${_scopeId}></path></svg></button></div></div></div>`);
            });
            _push2(`<!--]--></div><button type="button" class="mt-6 w-full py-4 border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-2xl text-indigo-600 font-black uppercase tracking-widest text-[10px] hover:border-indigo-400 hover:bg-indigo-100 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm" data-v-14ffe019${_scopeId}><span class="w-5 h-5 rounded-md bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs shadow-sm" data-v-14ffe019${_scopeId}>+</span> ${ssrInterpolate(_ctx.$t("btn_add_habit_row", "Tambah Baris Habit"))}</button></div><div class="px-6 md:px-8 py-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 z-20 rounded-b-[2.5rem]" data-v-14ffe019${_scopeId}><div class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2" data-v-14ffe019${_scopeId}><span class="w-2 h-2 rounded-full bg-indigo-500" data-v-14ffe019${_scopeId}></span> ${ssrInterpolate(_ctx.$t("total_input", "Total Input:"))} <span class="text-indigo-600 text-sm font-black" data-v-14ffe019${_scopeId}>${ssrInterpolate(__props.form.habits.length)}</span></div><div class="flex gap-3 w-full sm:w-auto" data-v-14ffe019${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              onClick: __props.close,
              class: "flex-1 sm:flex-none !py-3.5 !rounded-xl !text-[11px] !font-black !uppercase !tracking-widest !border-2 !text-slate-400 hover:!text-slate-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("btn_cancel", "Batal"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("btn_cancel", "Batal")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(PrimaryButton, {
              onClick: __props.submit,
              disabled: __props.form.processing,
              class: "flex-[2] sm:flex-none !bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-3.5 !px-8 shadow-xl shadow-indigo-100 transition-all transform active:scale-95 font-black uppercase tracking-widest text-[11px]"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.form.processing) {
                    _push3(`<span class="flex items-center gap-2 justify-center" data-v-14ffe019${_scopeId2}><svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-14ffe019${_scopeId2}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-14ffe019${_scopeId2}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-14ffe019${_scopeId2}></path></svg></span>`);
                  } else {
                    _push3(`<span data-v-14ffe019${_scopeId2}>${ssrInterpolate(_ctx.$t("btn_save_batch", "Simpan Batch"))}</span>`);
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
                    ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.$t("btn_save_batch", "Simpan Batch")), 1))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white flex flex-col max-h-[85vh] relative overflow-hidden transition-all duration-300 border border-slate-200 shadow-2xl rounded-[2.5rem]" }, [
                createVNode("div", { class: "px-6 md:px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white z-20 shrink-0" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-200 shrink-0" }, " ⚡ "),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-xl font-black text-slate-800 tracking-tight leading-none mb-1.5" }, toDisplayString(_ctx.$t("batch_habit_title", "Batch Habit")), 1),
                      createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest" }, toDisplayString(_ctx.$t("batch_habit_subtitle", "Catat banyak habit sekaligus")), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("button", {
                      onClick: __props.switchToSingle,
                      type: "button",
                      class: "hidden sm:flex text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border-2 border-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95 items-center gap-2"
                    }, [
                      createVNode("span", null, "↩️"),
                      createTextVNode(" " + toDisplayString(_ctx.$t("btn_single_mode", "Single Mode")), 1)
                    ], 8, ["onClick"]),
                    createVNode("button", {
                      onClick: __props.close,
                      class: "w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90 flex items-center justify-center font-bold"
                    }, " ✕ ", 8, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-4 md:p-8" }, [
                  createVNode("div", { class: "hidden md:grid grid-cols-12 gap-3 mb-3 px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]" }, [
                    createVNode("div", { class: "col-span-4" }, toDisplayString(_ctx.$t("habit_name", "Nama Habit")), 1),
                    createVNode("div", { class: "col-span-2 text-center" }, toDisplayString(_ctx.$t("habit_icon", "Ikon")), 1),
                    createVNode("div", { class: "col-span-3 text-center" }, toDisplayString(_ctx.$t("habit_color", "Warna")), 1),
                    createVNode("div", { class: "col-span-2 text-center" }, toDisplayString(_ctx.$t("target", "Target")), 1),
                    createVNode("div", { class: "col-span-1 text-center" }, toDisplayString(_ctx.$t("action", "Aksi")), 1)
                  ]),
                  createVNode("div", { class: "space-y-4 md:space-y-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.form.habits, (trx, index) => {
                      var _a, _b;
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "bg-white md:bg-transparent p-5 md:p-0 rounded-[2rem] md:rounded-none border border-slate-100 md:border-none shadow-sm md:shadow-none relative group animate-in fade-in slide-in-from-bottom-4 duration-300"
                      }, [
                        createVNode("div", { class: "flex justify-between items-center mb-4 md:hidden" }, [
                          createVNode("span", { class: "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-indigo-50 text-indigo-500" }, toDisplayString(_ctx.$t("habit_label", "Habit")) + " #" + toDisplayString(index + 1), 1),
                          createVNode("button", {
                            onClick: ($event) => __props.removeRow(index),
                            type: "button",
                            class: ["w-8 h-8 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 transition-all", { "opacity-50 cursor-not-allowed": __props.form.habits.length <= 1 }],
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
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3 items-center md:bg-white md:p-2.5 md:rounded-2xl md:border md:border-slate-200 md:shadow-sm" }, [
                          createVNode("div", { class: "col-span-1 md:col-span-4" }, [
                            createVNode("label", { class: "md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block" }, toDisplayString(_ctx.$t("habit_name", "Nama Habit")), 1),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => trx.name = $event,
                              placeholder: _ctx.$t("habit_name_placeholder", "Cth: Lari Pagi..."),
                              class: ["w-full text-xs font-bold h-12 md:h-11 px-4 !rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 transition-all focus:ring-0", { "!border-rose-300 !bg-rose-50 placeholder-rose-300": (_a = __props.form.errors) == null ? void 0 : _a[`habits.${index}.name`] }]
                            }, null, 10, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, trx.name]
                            ])
                          ]),
                          createVNode("div", { class: "col-span-1 md:col-span-2 relative icon-dropdown-container" }, [
                            createVNode("label", { class: "md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block" }, toDisplayString(_ctx.$t("habit_icon", "Ikon")), 1),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => openIconDropdown.value = openIconDropdown.value === index ? null : index,
                              class: ["w-full h-12 md:h-11 flex items-center justify-center gap-2 border-2 border-slate-200 bg-slate-50 hover:bg-white rounded-xl transition-all focus:border-indigo-500", openIconDropdown.value === index ? "border-indigo-500 ring-2 ring-indigo-100 bg-white" : ""]
                            }, [
                              createVNode("span", { class: "text-xl" }, toDisplayString(trx.icon), 1),
                              (openBlock(), createBlock("svg", {
                                class: "w-3 h-3 text-slate-400",
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
                                  class: "absolute z-[100] top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid grid-cols-4 gap-2 origin-top max-h-48 overflow-y-auto custom-scrollbar"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.iconList, (icon) => {
                                    return openBlock(), createBlock("button", {
                                      type: "button",
                                      key: icon,
                                      onClick: ($event) => {
                                        trx.icon = icon;
                                        openIconDropdown.value = null;
                                      },
                                      class: ["w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-indigo-50 hover:scale-110 transition-all", trx.icon === icon ? "bg-indigo-100 shadow-sm" : "opacity-70"]
                                    }, toDisplayString(icon), 11, ["onClick"]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createVNode("div", { class: "col-span-1 md:col-span-3 flex justify-center" }, [
                            createVNode("label", { class: "md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block w-full text-left" }, toDisplayString(_ctx.$t("habit_color", "Warna")), 1),
                            createVNode("div", { class: "flex flex-wrap justify-center gap-1.5 md:gap-1.5 p-1 bg-slate-50 rounded-xl border border-slate-100 w-full md:w-auto" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.colorPalette, (c) => {
                                return openBlock(), createBlock("button", {
                                  type: "button",
                                  key: c,
                                  onClick: ($event) => trx.color = c,
                                  class: ["w-6 h-6 md:w-5 md:h-5 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm", trx.color === c ? "ring-2 ring-offset-2 ring-indigo-500 scale-110" : "opacity-80"],
                                  style: { backgroundColor: c }
                                }, null, 14, ["onClick"]);
                              }), 128))
                            ])
                          ]),
                          createVNode("div", { class: "col-span-1 md:col-span-2" }, [
                            createVNode("label", { class: "md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block" }, toDisplayString(_ctx.$t("target_days", "Target (Hari)")), 1),
                            createVNode("div", { class: "relative flex items-center" }, [
                              withDirectives(createVNode("input", {
                                type: "number",
                                "onUpdate:modelValue": ($event) => trx.monthly_target = $event,
                                min: "1",
                                max: "31",
                                class: ["w-full text-center text-xs font-black h-12 md:h-11 pl-2 pr-6 !rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 transition-all focus:ring-0 text-indigo-700", { "!border-rose-300 !bg-rose-50 text-rose-600": (_b = __props.form.errors) == null ? void 0 : _b[`habits.${index}.monthly_target`] }]
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, trx.monthly_target]
                              ]),
                              createVNode("span", { class: "absolute right-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest pointer-events-none" }, "Hr")
                            ])
                          ]),
                          createVNode("div", { class: "hidden md:flex col-span-1 justify-center items-center" }, [
                            createVNode("button", {
                              onClick: ($event) => __props.removeRow(index),
                              type: "button",
                              class: ["w-10 h-10 rounded-xl flex items-center justify-center hover:bg-rose-50 transition-all active:scale-90", __props.form.habits.length <= 1 ? "opacity-0 pointer-events-none" : "text-slate-300 hover:text-rose-500"],
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
                    class: "mt-6 w-full py-4 border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-2xl text-indigo-600 font-black uppercase tracking-widest text-[10px] hover:border-indigo-400 hover:bg-indigo-100 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm"
                  }, [
                    createVNode("span", { class: "w-5 h-5 rounded-md bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs shadow-sm" }, "+"),
                    createTextVNode(" " + toDisplayString(_ctx.$t("btn_add_habit_row", "Tambah Baris Habit")), 1)
                  ], 8, ["onClick"])
                ]),
                createVNode("div", { class: "px-6 md:px-8 py-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 z-20 rounded-b-[2.5rem]" }, [
                  createVNode("div", { class: "text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2" }, [
                    createVNode("span", { class: "w-2 h-2 rounded-full bg-indigo-500" }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("total_input", "Total Input:")) + " ", 1),
                    createVNode("span", { class: "text-indigo-600 text-sm font-black" }, toDisplayString(__props.form.habits.length), 1)
                  ]),
                  createVNode("div", { class: "flex gap-3 w-full sm:w-auto" }, [
                    createVNode(_sfc_main$2, {
                      onClick: __props.close,
                      class: "flex-1 sm:flex-none !py-3.5 !rounded-xl !text-[11px] !font-black !uppercase !tracking-widest !border-2 !text-slate-400 hover:!text-slate-600"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("btn_cancel", "Batal")), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(PrimaryButton, {
                      onClick: __props.submit,
                      disabled: __props.form.processing,
                      class: "flex-[2] sm:flex-none !bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-3.5 !px-8 shadow-xl shadow-indigo-100 transition-all transform active:scale-95 font-black uppercase tracking-widest text-[11px]"
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
                        ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.$t("btn_save_batch", "Simpan Batch")), 1))
                      ]),
                      _: 1
                    }, 8, ["onClick", "disabled"])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Habits/HabitBatchModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HabitBatchModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-14ffe019"]]);
export {
  HabitBatchModal as default
};
