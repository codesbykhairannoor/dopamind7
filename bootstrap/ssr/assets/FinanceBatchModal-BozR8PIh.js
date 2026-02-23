import { ref, computed, mergeProps, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, createCommentVNode, Transition, Fragment, renderList, withDirectives, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
import dayjs from "dayjs";
import { _ as _sfc_main$1 } from "./Modal-B2rYQMrj.js";
import { _ as _sfc_main$3 } from "./TextInput-BNWZnSh4.js";
import { P as PrimaryButton } from "./PrimaryButton-4NJ7Yqx3.js";
import { _ as _sfc_main$4 } from "./SecondaryButton-BgIg9sGF.js";
import { u as useFinanceFormat } from "./useFinanceFormat-CRSb1fg_.js";
import _sfc_main$2 from "./FinanceDatePicker-St-Mq15S.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
const _sfc_main = {
  __name: "FinanceBatchModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    form: Object,
    categories: Array,
    budgets: Array,
    conflictError: String,
    close: Function,
    submit: Function,
    addRow: Function,
    removeRow: Function,
    switchToSingle: Function
  },
  setup(__props) {
    const props = __props;
    const { activeCurrency, getCategoryDetails, appLocale } = useFinanceFormat();
    const showDatePicker = ref(false);
    const isDotSeparator = computed(() => ["IDR", "EUR", "de-DE"].includes(activeCurrency.value));
    const currencySymbol = computed(() => {
      const map = { IDR: "Rp", USD: "$", GBP: "£", EUR: "€", JPY: "¥" };
      return map[activeCurrency.value] || activeCurrency.value;
    });
    const dateDisplay = computed(() => {
      if (!props.form.date) return "";
      const loc = appLocale.value ? appLocale.value.split("-")[0] : "id";
      return dayjs(props.form.date).locale(loc).format("dddd, DD MMM YYYY");
    });
    const formatDisplay = (val) => {
      if (!val) return "";
      const str = val.toString();
      return isDotSeparator.value ? str.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const onInputAmount = (e, index) => {
      let cleanVal = isDotSeparator.value ? e.target.value.replace(/\./g, "") : e.target.value.replace(/,/g, "");
      if (!isNaN(cleanVal)) {
        props.form.transactions[index].amount = cleanVal;
      }
    };
    const getCategoriesByType = (type) => {
      if (type === "income") {
        return props.categories.filter((c) => c.type === "income").map((c) => c.slug);
      } else {
        return props.budgets.map((b) => b.category);
      }
    };
    const getDetail = (slug) => getCategoryDetails(slug, props.categories);
    const changeType = (index, type) => {
      props.form.transactions[index].type = type;
      props.form.transactions[index].category = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: __props.show,
        onClose: __props.close,
        maxWidth: "2xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white rounded-[2.5rem] flex flex-col max-h-[90vh] relative overflow-visible transition-all duration-300 border border-slate-100 shadow-2xl" data-v-c6c57530${_scopeId}>`);
            if (__props.conflictError) {
              _push2(`<div class="absolute top-0 left-0 right-0 bg-rose-500 text-white text-[10px] font-black px-6 py-3.5 text-center animate-in slide-in-from-top-full z-50 shadow-lg flex items-center justify-center gap-2 uppercase tracking-[0.1em] rounded-t-[2.5rem]" data-v-c6c57530${_scopeId}><svg class="w-4 h-4 shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-c6c57530${_scopeId}><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-c6c57530${_scopeId}></path></svg><span data-v-c6c57530${_scopeId}>${ssrInterpolate(__props.conflictError)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="${ssrRenderClass([{ "mt-12": __props.conflictError }, "px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white shrink-0 z-20 rounded-t-[2.5rem]"])}" data-v-c6c57530${_scopeId}><div class="flex items-center gap-4" data-v-c6c57530${_scopeId}><div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-indigo-100" data-v-c6c57530${_scopeId}> ✨ </div><div data-v-c6c57530${_scopeId}><h2 class="text-xl font-black text-slate-800 tracking-tight leading-none mb-1.5" data-v-c6c57530${_scopeId}>${ssrInterpolate(_ctx.$t("batch_mode_title", "Batch Finance"))}</h2><div class="relative" data-v-c6c57530${_scopeId}><button type="button" class="text-[10px] font-black text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg px-2.5 py-1 transition-all uppercase tracking-widest flex items-center gap-2" data-v-c6c57530${_scopeId}><span data-v-c6c57530${_scopeId}>${ssrInterpolate(dateDisplay.value)}</span><span data-v-c6c57530${_scopeId}>📅</span></button>`);
            if (showDatePicker.value) {
              _push2(`<div class="absolute top-full left-0 mt-2 z-[100] shadow-2xl rounded-3xl" data-v-c6c57530${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                show: true,
                modelValue: __props.form.date,
                "onUpdate:modelValue": (val) => __props.form.date = val,
                onClose: ($event) => showDatePicker.value = false
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="flex items-center gap-3" data-v-c6c57530${_scopeId}><button type="button" class="hidden sm:flex text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-2 border-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95 items-center gap-2" data-v-c6c57530${_scopeId}><span data-v-c6c57530${_scopeId}>↩️</span> ${ssrInterpolate(_ctx.$t("btn_single_mode", "Single Mode"))}</button><button class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90 flex items-center justify-center font-bold" data-v-c6c57530${_scopeId}> ✕ </button></div></div><div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-4 md:p-8" data-v-c6c57530${_scopeId}><div class="hidden md:grid grid-cols-12 gap-2 mb-4 px-1 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]" data-v-c6c57530${_scopeId}><div class="col-span-2 text-center" data-v-c6c57530${_scopeId}>${ssrInterpolate(_ctx.$t("type", "Tipe"))}</div><div class="col-span-3 ml-1" data-v-c6c57530${_scopeId}>${ssrInterpolate(_ctx.$t("category", "Kategori"))} <span class="text-rose-500" data-v-c6c57530${_scopeId}>*</span></div><div class="col-span-4 ml-1" data-v-c6c57530${_scopeId}>${ssrInterpolate(_ctx.$t("description", "Keterangan"))} <span class="text-rose-500" data-v-c6c57530${_scopeId}>*</span></div><div class="col-span-2" data-v-c6c57530${_scopeId}>${ssrInterpolate(_ctx.$t("amount", "Nominal"))} <span class="text-rose-500" data-v-c6c57530${_scopeId}>*</span></div><div class="col-span-1" data-v-c6c57530${_scopeId}></div></div><div class="space-y-4 md:space-y-3 mt-2" data-v-c6c57530${_scopeId}><!--[-->`);
            ssrRenderList(__props.form.transactions, (trx, index) => {
              _push2(`<div class="bg-white md:bg-transparent p-5 md:p-0 rounded-[2rem] md:rounded-none border border-slate-100 md:border-none shadow-sm md:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-300 group" data-v-c6c57530${_scopeId}><div class="grid grid-cols-12 gap-3 md:gap-2 items-center" data-v-c6c57530${_scopeId}><div class="col-span-12 md:col-span-2" data-v-c6c57530${_scopeId}><label class="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block" data-v-c6c57530${_scopeId}>${ssrInterpolate(_ctx.$t("type", "Tipe"))}</label><div class="flex bg-slate-100 p-1 rounded-[0.8rem] h-11" data-v-c6c57530${_scopeId}><button type="button" class="${ssrRenderClass([trx.type === "expense" ? "bg-white text-rose-600 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 rounded-lg text-[10px] font-black transition-all flex items-center justify-center tracking-wider uppercase"])}" data-v-c6c57530${_scopeId}> Out </button><button type="button" class="${ssrRenderClass([trx.type === "income" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 rounded-lg text-[10px] font-black transition-all flex items-center justify-center tracking-wider uppercase"])}" data-v-c6c57530${_scopeId}> In </button></div></div><div class="col-span-12 md:col-span-3" data-v-c6c57530${_scopeId}><label class="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block" data-v-c6c57530${_scopeId}>${ssrInterpolate(_ctx.$t("category", "Kategori"))}</label><div class="relative" data-v-c6c57530${_scopeId}><select class="${ssrRenderClass([{ "!border-rose-300 !bg-rose-50": __props.form.errors[`transactions.${index}.category`] }, "w-full pl-3 pr-8 h-11 !rounded-[0.8rem] border-2 border-slate-200 focus:border-indigo-500 bg-white font-bold text-slate-700 capitalize text-xs appearance-none cursor-pointer transition-all"])}" data-v-c6c57530${_scopeId}><option value="" disabled data-v-c6c57530${ssrIncludeBooleanAttr(Array.isArray(trx.category) ? ssrLooseContain(trx.category, "") : ssrLooseEqual(trx.category, "")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(_ctx.$t("select_placeholder", "Pilih..."))}</option><!--[-->`);
              ssrRenderList(getCategoriesByType(trx.type), (catSlug) => {
                _push2(`<option${ssrRenderAttr("value", catSlug)} data-v-c6c57530${ssrIncludeBooleanAttr(Array.isArray(trx.category) ? ssrLooseContain(trx.category, catSlug) : ssrLooseEqual(trx.category, catSlug)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(getDetail(catSlug).icon)} ${ssrInterpolate(getDetail(catSlug).name)}</option>`);
              });
              _push2(`<!--]--></select><div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" data-v-c6c57530${_scopeId}><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-c6c57530${_scopeId}><path d="M19 9l-7 7-7-7" data-v-c6c57530${_scopeId}></path></svg></div></div></div><div class="col-span-12 md:col-span-4" data-v-c6c57530${_scopeId}><label class="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block" data-v-c6c57530${_scopeId}>${ssrInterpolate(_ctx.$t("description", "Keterangan"))}</label>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                modelValue: trx.title,
                "onUpdate:modelValue": ($event) => trx.title = $event,
                placeholder: _ctx.$t("desc_placeholder", "Makan, Gaji..."),
                class: ["w-full text-xs font-bold h-11 px-3 !rounded-[0.8rem] border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 transition-all bg-white", { "!border-rose-300 !bg-rose-50": __props.form.errors[`transactions.${index}.title`] }]
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="col-span-10 md:col-span-2" data-v-c6c57530${_scopeId}><label class="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block" data-v-c6c57530${_scopeId}>${ssrInterpolate(_ctx.$t("amount", "Nominal"))}</label><div class="relative group" data-v-c6c57530${_scopeId}><span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[10px]" data-v-c6c57530${_scopeId}>${ssrInterpolate(currencySymbol.value)}</span><input type="text"${ssrRenderAttr("value", formatDisplay(trx.amount))} placeholder="0" class="${ssrRenderClass([{ "!border-rose-300 !bg-rose-50": __props.form.errors[`transactions.${index}.amount`] }, "w-full h-11 pl-8 pr-2 !rounded-[0.8rem] border-2 border-slate-200 focus:border-indigo-500 font-black text-xs text-slate-700 transition-all focus:ring-0 bg-white"])}" data-v-c6c57530${_scopeId}></div></div><div class="col-span-2 md:col-span-1 flex justify-center items-end md:items-center h-11 md:h-auto" data-v-c6c57530${_scopeId}><button type="button"${ssrIncludeBooleanAttr(__props.form.transactions.length <= 1) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-0 pointer-events-none": __props.form.transactions.length <= 1 }, "w-full h-11 md:w-8 md:h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90"])}" data-v-c6c57530${_scopeId}><svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-c6c57530${_scopeId}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-c6c57530${_scopeId}></path></svg></button></div></div></div>`);
            });
            _push2(`<!--]--></div><button type="button" class="mt-8 w-full py-3.5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-black uppercase tracking-widest text-[10px] hover:border-indigo-400 hover:text-indigo-600 hover:bg-white transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-sm" data-v-c6c57530${_scopeId}><span class="w-5 h-5 rounded-md bg-slate-100 text-slate-400 flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm" data-v-c6c57530${_scopeId}>+</span> ${ssrInterpolate(_ctx.$t("btn_add_another", "Tambah Baris"))}</button></div><div class="px-8 py-5 bg-white border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 rounded-b-[2.5rem]" data-v-c6c57530${_scopeId}><div class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2" data-v-c6c57530${_scopeId}><span class="w-2 h-2 rounded-full bg-indigo-500" data-v-c6c57530${_scopeId}></span> ${ssrInterpolate(_ctx.$t("total_label", "Total Input:"))} <span class="text-indigo-600 text-sm font-black" data-v-c6c57530${_scopeId}>${ssrInterpolate(__props.form.transactions.length)}</span></div><div class="flex gap-3 w-full sm:w-auto" data-v-c6c57530${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              onClick: __props.close,
              class: "flex-1 sm:flex-none !py-3 !rounded-xl !text-[10px] !font-black !uppercase !tracking-widest !border-2 !text-slate-400 hover:!text-slate-600"
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
              disabled: __props.form.processing || __props.conflictError,
              class: ["flex-[2] sm:flex-none !bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-3 !px-8 shadow-xl shadow-indigo-100 transition-all transform active:scale-95 font-black uppercase tracking-widest text-[10px]", { "!bg-slate-300 !text-slate-500 !cursor-not-allowed !shadow-none !transform-none": __props.conflictError }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.form.processing) {
                    _push3(`<span data-v-c6c57530${_scopeId2}>...</span>`);
                  } else {
                    _push3(`<span data-v-c6c57530${_scopeId2}>${ssrInterpolate(_ctx.$t("btn_save_all", "Simpan Batch"))}</span>`);
                  }
                } else {
                  return [
                    __props.form.processing ? (openBlock(), createBlock("span", { key: 0 }, "...")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.$t("btn_save_all", "Simpan Batch")), 1))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white rounded-[2.5rem] flex flex-col max-h-[90vh] relative overflow-visible transition-all duration-300 border border-slate-100 shadow-2xl" }, [
                __props.conflictError ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute top-0 left-0 right-0 bg-rose-500 text-white text-[10px] font-black px-6 py-3.5 text-center animate-in slide-in-from-top-full z-50 shadow-lg flex items-center justify-center gap-2 uppercase tracking-[0.1em] rounded-t-[2.5rem]"
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
                  class: ["px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white shrink-0 z-20 rounded-t-[2.5rem]", { "mt-12": __props.conflictError }]
                }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-indigo-100" }, " ✨ "),
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-xl font-black text-slate-800 tracking-tight leading-none mb-1.5" }, toDisplayString(_ctx.$t("batch_mode_title", "Batch Finance")), 1),
                      createVNode("div", { class: "relative" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => showDatePicker.value = !showDatePicker.value,
                          class: "text-[10px] font-black text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg px-2.5 py-1 transition-all uppercase tracking-widest flex items-center gap-2"
                        }, [
                          createVNode("span", null, toDisplayString(dateDisplay.value), 1),
                          createVNode("span", null, "📅")
                        ], 8, ["onClick"]),
                        createVNode(Transition, {
                          "enter-active-class": "transition ease-out duration-200",
                          "enter-from-class": "opacity-0 translate-y-2",
                          "enter-to-class": "opacity-100 translate-y-0",
                          "leave-active-class": "transition ease-in duration-150",
                          "leave-from-class": "opacity-100 translate-y-0",
                          "leave-to-class": "opacity-0 translate-y-2"
                        }, {
                          default: withCtx(() => [
                            showDatePicker.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "absolute top-full left-0 mt-2 z-[100] shadow-2xl rounded-3xl"
                            }, [
                              createVNode(_sfc_main$2, {
                                show: true,
                                modelValue: __props.form.date,
                                "onUpdate:modelValue": (val) => __props.form.date = val,
                                onClose: ($event) => showDatePicker.value = false
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "onClose"])
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("button", {
                      onClick: __props.switchToSingle,
                      type: "button",
                      class: "hidden sm:flex text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-2 border-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95 items-center gap-2"
                    }, [
                      createVNode("span", null, "↩️"),
                      createTextVNode(" " + toDisplayString(_ctx.$t("btn_single_mode", "Single Mode")), 1)
                    ], 8, ["onClick"]),
                    createVNode("button", {
                      onClick: __props.close,
                      class: "w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90 flex items-center justify-center font-bold"
                    }, " ✕ ", 8, ["onClick"])
                  ])
                ], 2),
                createVNode("div", { class: "flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-4 md:p-8" }, [
                  createVNode("div", { class: "hidden md:grid grid-cols-12 gap-2 mb-4 px-1 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]" }, [
                    createVNode("div", { class: "col-span-2 text-center" }, toDisplayString(_ctx.$t("type", "Tipe")), 1),
                    createVNode("div", { class: "col-span-3 ml-1" }, [
                      createTextVNode(toDisplayString(_ctx.$t("category", "Kategori")) + " ", 1),
                      createVNode("span", { class: "text-rose-500" }, "*")
                    ]),
                    createVNode("div", { class: "col-span-4 ml-1" }, [
                      createTextVNode(toDisplayString(_ctx.$t("description", "Keterangan")) + " ", 1),
                      createVNode("span", { class: "text-rose-500" }, "*")
                    ]),
                    createVNode("div", { class: "col-span-2" }, [
                      createTextVNode(toDisplayString(_ctx.$t("amount", "Nominal")) + " ", 1),
                      createVNode("span", { class: "text-rose-500" }, "*")
                    ]),
                    createVNode("div", { class: "col-span-1" })
                  ]),
                  createVNode("div", { class: "space-y-4 md:space-y-3 mt-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.form.transactions, (trx, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "bg-white md:bg-transparent p-5 md:p-0 rounded-[2rem] md:rounded-none border border-slate-100 md:border-none shadow-sm md:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-300 group"
                      }, [
                        createVNode("div", { class: "grid grid-cols-12 gap-3 md:gap-2 items-center" }, [
                          createVNode("div", { class: "col-span-12 md:col-span-2" }, [
                            createVNode("label", { class: "md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block" }, toDisplayString(_ctx.$t("type", "Tipe")), 1),
                            createVNode("div", { class: "flex bg-slate-100 p-1 rounded-[0.8rem] h-11" }, [
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => changeType(index, "expense"),
                                class: ["flex-1 rounded-lg text-[10px] font-black transition-all flex items-center justify-center tracking-wider uppercase", trx.type === "expense" ? "bg-white text-rose-600 shadow-sm" : "text-slate-400 hover:text-slate-600"]
                              }, " Out ", 10, ["onClick"]),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => changeType(index, "income"),
                                class: ["flex-1 rounded-lg text-[10px] font-black transition-all flex items-center justify-center tracking-wider uppercase", trx.type === "income" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"]
                              }, " In ", 10, ["onClick"])
                            ])
                          ]),
                          createVNode("div", { class: "col-span-12 md:col-span-3" }, [
                            createVNode("label", { class: "md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block" }, toDisplayString(_ctx.$t("category", "Kategori")), 1),
                            createVNode("div", { class: "relative" }, [
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => trx.category = $event,
                                class: ["w-full pl-3 pr-8 h-11 !rounded-[0.8rem] border-2 border-slate-200 focus:border-indigo-500 bg-white font-bold text-slate-700 capitalize text-xs appearance-none cursor-pointer transition-all", { "!border-rose-300 !bg-rose-50": __props.form.errors[`transactions.${index}.category`] }]
                              }, [
                                createVNode("option", {
                                  value: "",
                                  disabled: ""
                                }, toDisplayString(_ctx.$t("select_placeholder", "Pilih...")), 1),
                                (openBlock(true), createBlock(Fragment, null, renderList(getCategoriesByType(trx.type), (catSlug) => {
                                  return openBlock(), createBlock("option", {
                                    key: catSlug,
                                    value: catSlug
                                  }, toDisplayString(getDetail(catSlug).icon) + " " + toDisplayString(getDetail(catSlug).name), 9, ["value"]);
                                }), 128))
                              ], 10, ["onUpdate:modelValue"]), [
                                [vModelSelect, trx.category]
                              ]),
                              createVNode("div", { class: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" }, [
                                (openBlock(), createBlock("svg", {
                                  class: "w-3 h-3",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "3"
                                }, [
                                  createVNode("path", { d: "M19 9l-7 7-7-7" })
                                ]))
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "col-span-12 md:col-span-4" }, [
                            createVNode("label", { class: "md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block" }, toDisplayString(_ctx.$t("description", "Keterangan")), 1),
                            createVNode(_sfc_main$3, {
                              modelValue: trx.title,
                              "onUpdate:modelValue": ($event) => trx.title = $event,
                              placeholder: _ctx.$t("desc_placeholder", "Makan, Gaji..."),
                              class: ["w-full text-xs font-bold h-11 px-3 !rounded-[0.8rem] border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 transition-all bg-white", { "!border-rose-300 !bg-rose-50": __props.form.errors[`transactions.${index}.title`] }]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "class"])
                          ]),
                          createVNode("div", { class: "col-span-10 md:col-span-2" }, [
                            createVNode("label", { class: "md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block" }, toDisplayString(_ctx.$t("amount", "Nominal")), 1),
                            createVNode("div", { class: "relative group" }, [
                              createVNode("span", { class: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[10px]" }, toDisplayString(currencySymbol.value), 1),
                              createVNode("input", {
                                type: "text",
                                value: formatDisplay(trx.amount),
                                onInput: (e) => onInputAmount(e, index),
                                placeholder: "0",
                                class: ["w-full h-11 pl-8 pr-2 !rounded-[0.8rem] border-2 border-slate-200 focus:border-indigo-500 font-black text-xs text-slate-700 transition-all focus:ring-0 bg-white", { "!border-rose-300 !bg-rose-50": __props.form.errors[`transactions.${index}.amount`] }]
                              }, null, 42, ["value", "onInput"])
                            ])
                          ]),
                          createVNode("div", { class: "col-span-2 md:col-span-1 flex justify-center items-end md:items-center h-11 md:h-auto" }, [
                            createVNode("button", {
                              onClick: ($event) => __props.removeRow(index),
                              type: "button",
                              class: ["w-full h-11 md:w-8 md:h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90", { "opacity-0 pointer-events-none": __props.form.transactions.length <= 1 }],
                              disabled: __props.form.transactions.length <= 1
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4 md:w-5 md:h-5",
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
                    class: "mt-8 w-full py-3.5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-black uppercase tracking-widest text-[10px] hover:border-indigo-400 hover:text-indigo-600 hover:bg-white transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-sm"
                  }, [
                    createVNode("span", { class: "w-5 h-5 rounded-md bg-slate-100 text-slate-400 flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm" }, "+"),
                    createTextVNode(" " + toDisplayString(_ctx.$t("btn_add_another", "Tambah Baris")), 1)
                  ], 8, ["onClick"])
                ]),
                createVNode("div", { class: "px-8 py-5 bg-white border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 rounded-b-[2.5rem]" }, [
                  createVNode("div", { class: "text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2" }, [
                    createVNode("span", { class: "w-2 h-2 rounded-full bg-indigo-500" }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("total_label", "Total Input:")) + " ", 1),
                    createVNode("span", { class: "text-indigo-600 text-sm font-black" }, toDisplayString(__props.form.transactions.length), 1)
                  ]),
                  createVNode("div", { class: "flex gap-3 w-full sm:w-auto" }, [
                    createVNode(_sfc_main$4, {
                      onClick: __props.close,
                      class: "flex-1 sm:flex-none !py-3 !rounded-xl !text-[10px] !font-black !uppercase !tracking-widest !border-2 !text-slate-400 hover:!text-slate-600"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("btn_cancel", "Batal")), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(PrimaryButton, {
                      onClick: __props.submit,
                      disabled: __props.form.processing || __props.conflictError,
                      class: ["flex-[2] sm:flex-none !bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-3 !px-8 shadow-xl shadow-indigo-100 transition-all transform active:scale-95 font-black uppercase tracking-widest text-[10px]", { "!bg-slate-300 !text-slate-500 !cursor-not-allowed !shadow-none !transform-none": __props.conflictError }]
                    }, {
                      default: withCtx(() => [
                        __props.form.processing ? (openBlock(), createBlock("span", { key: 0 }, "...")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.$t("btn_save_all", "Simpan Batch")), 1))
                      ]),
                      _: 1
                    }, 8, ["onClick", "disabled", "class"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/FinanceBatchModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FinanceBatchModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c6c57530"]]);
export {
  FinanceBatchModal as default
};
