import { ref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, createCommentVNode, withDirectives, vModelText, Fragment, renderList, vModelRadio, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Modal-B2rYQMrj.js";
import { _ as _sfc_main$2 } from "./InputLabel-BgCYZe1F.js";
import { _ as _sfc_main$3 } from "./TextInput-BNWZnSh4.js";
import { P as PrimaryButton } from "./PrimaryButton-4NJ7Yqx3.js";
import { _ as _sfc_main$4 } from "./SecondaryButton-BgIg9sGF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "PlannerModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    form: Object,
    isEditing: Boolean,
    conflictError: String,
    close: Function,
    submit: Function,
    remove: Function
  },
  emits: ["switch-to-batch"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isConfirmingDeletion = ref(false);
    const handleClose = () => {
      isConfirmingDeletion.value = false;
      props.close();
    };
    const requestDelete = () => {
      isConfirmingDeletion.value = true;
    };
    const cancelDelete = () => {
      isConfirmingDeletion.value = false;
    };
    const confirmDelete = () => {
      props.remove(props.form.id);
      isConfirmingDeletion.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: __props.show,
        onClose: handleClose
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="bg-white rounded-2xl relative overflow-hidden transition-all duration-300 border border-slate-100 shadow-2xl"${_scopeId}>`);
            if (isConfirmingDeletion.value) {
              _push2(`<div class="p-8 text-center animate-in fade-in zoom-in duration-200"${_scopeId}><div class="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4"${_scopeId}><svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"${_scopeId}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg></div><h3 class="text-xl font-black text-slate-800 mb-2"${_scopeId}>${ssrInterpolate(_ctx.$t("delete_activity_title"))}</h3><p class="text-slate-500 text-sm mb-8 px-4 font-medium leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("delete_activity_desc", { title: __props.form.title || _ctx.$t("default_activity_name") }))}</p><div class="flex gap-3 justify-center"${_scopeId}><button class="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-400 font-bold hover:bg-slate-50 transition active:scale-95"${_scopeId}>${ssrInterpolate(_ctx.$t("btn_cancel"))}</button><button class="px-6 py-2.5 rounded-xl bg-rose-500 text-white font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition transform active:scale-95"${_scopeId}>${ssrInterpolate(_ctx.$t("btn_delete"))}</button></div></div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              if (__props.conflictError) {
                _push2(`<div class="absolute top-0 left-0 right-0 bg-rose-500 text-white text-[10px] font-black px-6 py-2.5 text-center animate-in slide-in-from-top-full z-50 shadow-md flex items-center justify-center gap-2 uppercase"${_scopeId}><svg class="w-4 h-4 shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"${_scopeId}><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(__props.conflictError)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="${ssrRenderClass([{ "mt-10": __props.conflictError }, "px-6 py-4 border-b border-slate-100 flex justify-between items-center mt-1"])}"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-indigo-100"${_scopeId}> ✨ </div><div${_scopeId}><h2 class="text-lg font-black text-slate-800 tracking-tight leading-none mb-1"${_scopeId}>${ssrInterpolate(__props.isEditing ? _ctx.$t("modal_title_edit") : _ctx.$t("modal_title_new"))}</h2><p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest"${_scopeId}>${ssrInterpolate(_ctx.$t("modal_new_simple_title"))}</p></div></div><div class="flex items-center gap-2"${_scopeId}>`);
              if (!__props.isEditing) {
                _push2(`<button type="button" class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition flex items-center gap-1 active:scale-95"${_scopeId}> Batch </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-500 transition font-bold"${_scopeId}>✕</button></div></div><div class="p-6 space-y-5 bg-white"${_scopeId}><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: _ctx.$t("label_activity"),
                class: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                modelValue: __props.form.title,
                "onUpdate:modelValue": ($event) => __props.form.title = $event,
                class: "w-full text-sm font-bold py-3 px-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 transition-all bg-white",
                placeholder: _ctx.$t("placeholder_activity"),
                autofocus: ""
              }, null, _parent2, _scopeId));
              if ((_a = __props.form.errors) == null ? void 0 : _a.title) {
                _push2(`<div class="text-rose-500 text-[10px] font-black mt-1 uppercase tracking-wide ml-1"${_scopeId}>${ssrInterpolate(__props.form.errors.title)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: _ctx.$t("label_start_time"),
                class: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1"
              }, null, _parent2, _scopeId));
              _push2(`<input type="time"${ssrRenderAttr("value", __props.form.start_time)} class="w-full border-2 border-slate-200 rounded-xl py-2.5 px-4 font-black text-slate-700 focus:border-indigo-500 focus:ring-0 transition-all cursor-pointer"${_scopeId}></div><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: _ctx.$t("label_end_time"),
                class: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1"
              }, null, _parent2, _scopeId));
              _push2(`<input type="time"${ssrRenderAttr("value", __props.form.end_time)} class="w-full border-2 border-slate-200 rounded-xl py-2.5 px-4 font-black text-slate-700 focus:border-indigo-500 focus:ring-0 transition-all cursor-pointer"${_scopeId}></div></div><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: _ctx.$t("label_priority"),
                class: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1"
              }, null, _parent2, _scopeId));
              _push2(`<div class="grid grid-cols-3 gap-3"${_scopeId}><!--[-->`);
              ssrRenderList([1, 2, 3], (type) => {
                _push2(`<label class="cursor-pointer group"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(__props.form.type, type)) ? " checked" : ""}${ssrRenderAttr("value", type)} class="hidden peer"${_scopeId}><div class="${ssrRenderClass([{
                  "peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-700": type === 1,
                  "peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-700": type === 2,
                  "peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700": type === 3
                }, "py-3 px-1 text-center rounded-xl border-2 border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all peer-checked:shadow-sm"])}"${_scopeId}>${ssrInterpolate(type === 1 ? _ctx.$t("priority_urgent") : type === 2 ? _ctx.$t("priority_work") : _ctx.$t("priority_normal"))}</div></label>`);
              });
              _push2(`<!--]--></div></div><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: _ctx.$t("label_notes"),
                class: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1"
              }, null, _parent2, _scopeId));
              _push2(`<textarea class="w-full border-2 border-slate-200 rounded-xl h-24 focus:border-indigo-500 focus:ring-0 resize-none p-4 text-sm font-medium text-slate-600 bg-white"${ssrRenderAttr("placeholder", _ctx.$t("placeholder_notes"))}${_scopeId}>${ssrInterpolate(__props.form.notes)}</textarea></div><div class="flex justify-between items-center mt-6 pt-4 border-t border-slate-100"${_scopeId}>`);
              if (__props.isEditing) {
                _push2(`<button type="button" class="text-rose-400 font-black text-[10px] uppercase tracking-widest hover:text-rose-600 transition px-2 flex items-center gap-1 active:scale-95"${_scopeId}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> ${ssrInterpolate(_ctx.$t("btn_delete"))}</button>`);
              } else {
                _push2(`<div${_scopeId}></div>`);
              }
              _push2(`<div class="flex gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                onClick: handleClose,
                class: "!rounded-xl !py-2.5 !px-6 !text-xs !font-black !uppercase !tracking-widest"
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
                class: ["!bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-2.5 !px-8 shadow-xl shadow-indigo-100 font-black uppercase tracking-widest text-xs transition-all active:scale-95", { "!bg-slate-300 !cursor-not-allowed !shadow-none": __props.conflictError }]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.isEditing ? _ctx.$t("btn_save") : _ctx.$t("btn_create"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.isEditing ? _ctx.$t("btn_save") : _ctx.$t("btn_create")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white rounded-2xl relative overflow-hidden transition-all duration-300 border border-slate-100 shadow-2xl" }, [
                isConfirmingDeletion.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "p-8 text-center animate-in fade-in zoom-in duration-200"
                }, [
                  createVNode("div", { class: "w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-10 h-10",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2.5"
                    }, [
                      createVNode("path", { d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" })
                    ]))
                  ]),
                  createVNode("h3", { class: "text-xl font-black text-slate-800 mb-2" }, toDisplayString(_ctx.$t("delete_activity_title")), 1),
                  createVNode("p", { class: "text-slate-500 text-sm mb-8 px-4 font-medium leading-relaxed" }, toDisplayString(_ctx.$t("delete_activity_desc", { title: __props.form.title || _ctx.$t("default_activity_name") })), 1),
                  createVNode("div", { class: "flex gap-3 justify-center" }, [
                    createVNode("button", {
                      onClick: cancelDelete,
                      class: "px-6 py-2.5 rounded-xl border border-slate-200 text-slate-400 font-bold hover:bg-slate-50 transition active:scale-95"
                    }, toDisplayString(_ctx.$t("btn_cancel")), 1),
                    createVNode("button", {
                      onClick: confirmDelete,
                      class: "px-6 py-2.5 rounded-xl bg-rose-500 text-white font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition transform active:scale-95"
                    }, toDisplayString(_ctx.$t("btn_delete")), 1)
                  ])
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  __props.conflictError ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "absolute top-0 left-0 right-0 bg-rose-500 text-white text-[10px] font-black px-6 py-2.5 text-center animate-in slide-in-from-top-full z-50 shadow-md flex items-center justify-center gap-2 uppercase"
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
                    class: ["px-6 py-4 border-b border-slate-100 flex justify-between items-center mt-1", { "mt-10": __props.conflictError }]
                  }, [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", { class: "w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-indigo-100" }, " ✨ "),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-lg font-black text-slate-800 tracking-tight leading-none mb-1" }, toDisplayString(__props.isEditing ? _ctx.$t("modal_title_edit") : _ctx.$t("modal_title_new")), 1),
                        createVNode("p", { class: "text-[9px] text-slate-400 font-bold uppercase tracking-widest" }, toDisplayString(_ctx.$t("modal_new_simple_title")), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      !__props.isEditing ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: ($event) => _ctx.$emit("switch-to-batch"),
                        type: "button",
                        class: "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition flex items-center gap-1 active:scale-95"
                      }, " Batch ", 8, ["onClick"])) : createCommentVNode("", true),
                      createVNode("button", {
                        onClick: handleClose,
                        class: "w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-500 transition font-bold"
                      }, "✕")
                    ])
                  ], 2),
                  createVNode("div", { class: "p-6 space-y-5 bg-white" }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, {
                        value: _ctx.$t("label_activity"),
                        class: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1"
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$3, {
                        modelValue: __props.form.title,
                        "onUpdate:modelValue": ($event) => __props.form.title = $event,
                        class: "w-full text-sm font-bold py-3 px-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 transition-all bg-white",
                        placeholder: _ctx.$t("placeholder_activity"),
                        autofocus: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                      ((_b = __props.form.errors) == null ? void 0 : _b.title) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-rose-500 text-[10px] font-black mt-1 uppercase tracking-wide ml-1"
                      }, toDisplayString(__props.form.errors.title), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$2, {
                          value: _ctx.$t("label_start_time"),
                          class: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1"
                        }, null, 8, ["value"]),
                        withDirectives(createVNode("input", {
                          type: "time",
                          "onUpdate:modelValue": ($event) => __props.form.start_time = $event,
                          class: "w-full border-2 border-slate-200 rounded-xl py-2.5 px-4 font-black text-slate-700 focus:border-indigo-500 focus:ring-0 transition-all cursor-pointer"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, __props.form.start_time]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$2, {
                          value: _ctx.$t("label_end_time"),
                          class: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1"
                        }, null, 8, ["value"]),
                        withDirectives(createVNode("input", {
                          type: "time",
                          "onUpdate:modelValue": ($event) => __props.form.end_time = $event,
                          class: "w-full border-2 border-slate-200 rounded-xl py-2.5 px-4 font-black text-slate-700 focus:border-indigo-500 focus:ring-0 transition-all cursor-pointer"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, __props.form.end_time]
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, {
                        value: _ctx.$t("label_priority"),
                        class: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1"
                      }, null, 8, ["value"]),
                      createVNode("div", { class: "grid grid-cols-3 gap-3" }, [
                        (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3], (type) => {
                          return createVNode("label", {
                            key: type,
                            class: "cursor-pointer group"
                          }, [
                            withDirectives(createVNode("input", {
                              type: "radio",
                              "onUpdate:modelValue": ($event) => __props.form.type = $event,
                              value: type,
                              class: "hidden peer"
                            }, null, 8, ["onUpdate:modelValue", "value"]), [
                              [vModelRadio, __props.form.type]
                            ]),
                            createVNode("div", {
                              class: ["py-3 px-1 text-center rounded-xl border-2 border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all peer-checked:shadow-sm", {
                                "peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-700": type === 1,
                                "peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-700": type === 2,
                                "peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700": type === 3
                              }]
                            }, toDisplayString(type === 1 ? _ctx.$t("priority_urgent") : type === 2 ? _ctx.$t("priority_work") : _ctx.$t("priority_normal")), 3)
                          ]);
                        }), 64))
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, {
                        value: _ctx.$t("label_notes"),
                        class: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1"
                      }, null, 8, ["value"]),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => __props.form.notes = $event,
                        class: "w-full border-2 border-slate-200 rounded-xl h-24 focus:border-indigo-500 focus:ring-0 resize-none p-4 text-sm font-medium text-slate-600 bg-white",
                        placeholder: _ctx.$t("placeholder_notes")
                      }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                        [vModelText, __props.form.notes]
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-between items-center mt-6 pt-4 border-t border-slate-100" }, [
                      __props.isEditing ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: requestDelete,
                        type: "button",
                        class: "text-rose-400 font-black text-[10px] uppercase tracking-widest hover:text-rose-600 transition px-2 flex items-center gap-1 active:scale-95"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-3.5 h-3.5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          })
                        ])),
                        createTextVNode(" " + toDisplayString(_ctx.$t("btn_delete")), 1)
                      ])) : (openBlock(), createBlock("div", { key: 1 })),
                      createVNode("div", { class: "flex gap-3" }, [
                        createVNode(_sfc_main$4, {
                          onClick: handleClose,
                          class: "!rounded-xl !py-2.5 !px-6 !text-xs !font-black !uppercase !tracking-widest"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("btn_cancel")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(PrimaryButton, {
                          onClick: __props.submit,
                          disabled: __props.form.processing || __props.conflictError,
                          class: ["!bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-2.5 !px-8 shadow-xl shadow-indigo-100 font-black uppercase tracking-widest text-xs transition-all active:scale-95", { "!bg-slate-300 !cursor-not-allowed !shadow-none": __props.conflictError }]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.isEditing ? _ctx.$t("btn_save") : _ctx.$t("btn_create")), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled", "class"])
                      ])
                    ])
                  ])
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Planner/PlannerModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
