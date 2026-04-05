import { ref, computed, watch, mergeProps, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, createCommentVNode, withDirectives, vModelText, Fragment, renderList, vModelSelect, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import dayjs from "dayjs";
import { _ as _sfc_main$1 } from "./Modal-BOdkfMB5.js";
import { P as PrimaryButton } from "./PrimaryButton-DPmleQI_.js";
import { _ as _sfc_main$3 } from "./SecondaryButton-BgIg9sGF.js";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import _sfc_main$2 from "./FinanceDatePicker-CxOhCf2w.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
const _sfc_main = {
  __name: "TransactionModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    form: Object,
    budgets: Array,
    categories: Array,
    close: Function,
    submit: Function
  },
  emits: ["switch-to-batch"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { activeCurrency, getCategoryDetails, appLocale } = useFinanceFormat();
    const showDatePicker = ref(false);
    const availableCategories = computed(() => {
      if (props.form.type === "income") {
        return props.categories.filter((c) => c.type === "income").map((c) => c.slug);
      } else {
        return props.budgets.map((b) => b.category);
      }
    });
    const getDetail = (slug) => getCategoryDetails(slug, props.categories);
    watch(() => props.form.type, () => {
      props.form.category = "";
    });
    const isDotSeparator = computed(() => ["IDR", "EUR", "de-DE"].includes(activeCurrency.value));
    const currencySymbol = computed(() => {
      const map = { IDR: "Rp", USD: "$", GBP: "£", EUR: "€", JPY: "¥" };
      return map[activeCurrency.value] || activeCurrency.value;
    });
    const dateDisplay = computed(() => {
      if (!props.form.date) return "";
      const loc = appLocale.value ? appLocale.value.split("-")[0] : "id";
      return dayjs(props.form.date).locale(loc).format("DD MMM YYYY");
    });
    const formatDisplay = (val) => {
      if (!val) return "";
      const str = val.toString();
      return isDotSeparator.value ? str.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const onInput = (e) => {
      let rawValue = e.target.value;
      let cleanVal = isDotSeparator.value ? rawValue.replace(/\./g, "") : rawValue.replace(/,/g, "");
      if (!isNaN(cleanVal)) {
        props.form.amount = cleanVal;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: __props.show,
        onClose: __props.close,
        maxWidth: "md"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="bg-slate-50 dark:bg-slate-950 flex flex-col max-h-[85vh] relative overflow-visible transition-all duration-500 border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-none rounded-[2.5rem]" data-v-335f3e2c${_scopeId}><div class="px-6 md:px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 z-20 shrink-0 transition-colors duration-500" data-v-335f3e2c${_scopeId}><div class="flex items-center gap-4 transition-colors duration-500" data-v-335f3e2c${_scopeId}><div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg dark:shadow-none shadow-indigo-200 dark:shadow-indigo-900/20 shrink-0" data-v-335f3e2c${_scopeId}> ✨ </div><div data-v-335f3e2c${_scopeId}><h3 class="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-2 transition-colors duration-500" data-v-335f3e2c${_scopeId}>${ssrInterpolate(__props.form.id ? _ctx.$t("edit_transaction", "Edit Transaksi") : _ctx.$t("record_transaction", "Catat Transaksi"))}</h3>`);
            if (!__props.form.id) {
              _push2(`<button type="button" class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition duration-300 flex items-center gap-1.5 active:scale-95 w-fit border border-indigo-100 dark:border-indigo-500/20" data-v-335f3e2c${_scopeId}><span data-v-335f3e2c${_scopeId}>⚡</span> ${ssrInterpolate(_ctx.$t("batch_mode_title", "Batch Mode"))}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><button class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold" data-v-335f3e2c${_scopeId}> ✕ </button></div><div class="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-5" data-v-335f3e2c${_scopeId}><div class="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl transition-colors duration-500" data-v-335f3e2c${_scopeId}><button type="button" class="${ssrRenderClass([__props.form.type === "expense" ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm dark:shadow-none" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300", "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 transition-colors duration-300"])}" data-v-335f3e2c${_scopeId}>${ssrInterpolate(_ctx.$t("out", "Keluar"))}</button><button type="button" class="${ssrRenderClass([__props.form.type === "income" ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm dark:shadow-none" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300", "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 transition-colors duration-300"])}" data-v-335f3e2c${_scopeId}>${ssrInterpolate(_ctx.$t("in", "Masuk"))}</button></div><div data-v-335f3e2c${_scopeId}><label class="${ssrRenderClass([__props.form.type === "expense" ? "text-rose-400 dark:text-rose-400/80" : "text-emerald-400 dark:text-emerald-400/80", "block text-[10px] uppercase font-black tracking-widest mb-2 transition-colors duration-500"])}" data-v-335f3e2c${_scopeId}>${ssrInterpolate(_ctx.$t("amount", "Nominal"))}</label><div class="relative group" data-v-335f3e2c${_scopeId}><span class="${ssrRenderClass([__props.form.type === "expense" ? "text-rose-500 dark:text-rose-400" : "text-emerald-500 dark:text-emerald-400", "absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg transition-colors duration-500"])}" data-v-335f3e2c${_scopeId}>${ssrInterpolate(currencySymbol.value)}</span><input type="text"${ssrRenderAttr("value", formatDisplay(__props.form.amount))} placeholder="0" class="${ssrRenderClass([[
              ((_a = __props.form.errors) == null ? void 0 : _a.amount) ? "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400" : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200",
              __props.form.type === "expense" ? "focus:border-rose-500" : "focus:border-emerald-500"
            ], "w-full pl-12 pr-4 h-14 rounded-xl border-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-0 font-black text-2xl transition-all dark:text-white"])}" data-v-335f3e2c${_scopeId}></div></div><div data-v-335f3e2c${_scopeId}><label class="block text-[10px] uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest mb-2 transition-colors duration-500" data-v-335f3e2c${_scopeId}>${ssrInterpolate(_ctx.$t("description", "Keterangan"))}</label><input${ssrRenderAttr("value", __props.form.title)} type="text"${ssrRenderAttr("placeholder", _ctx.$t("desc_placeholder", "Cth: Kopi, Gaji..."))} class="${ssrRenderClass([{ "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400 placeholder-rose-300": (_b = __props.form.errors) == null ? void 0 : _b.title }, "w-full px-4 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-indigo-500 focus:ring-0 font-bold text-sm text-slate-700 dark:text-slate-200 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"])}" data-v-335f3e2c${_scopeId}></div><div class="grid grid-cols-2 gap-4" data-v-335f3e2c${_scopeId}><div data-v-335f3e2c${_scopeId}><label class="block text-[10px] uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest mb-2 transition-colors duration-500" data-v-335f3e2c${_scopeId}>${ssrInterpolate(_ctx.$t("category", "Kategori"))}</label><div class="relative" data-v-335f3e2c${_scopeId}><select class="${ssrRenderClass([{ "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400": (_c = __props.form.errors) == null ? void 0 : _c.category }, "w-full pl-4 pr-8 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-indigo-500 focus:ring-0 font-bold text-slate-700 dark:text-slate-200 capitalize text-sm appearance-none cursor-pointer transition-all"])}" data-v-335f3e2c${_scopeId}><option value="" disabled data-v-335f3e2c${ssrIncludeBooleanAttr(Array.isArray(__props.form.category) ? ssrLooseContain(__props.form.category, "") : ssrLooseEqual(__props.form.category, "")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(_ctx.$t("select_placeholder", "Pilih..."))}</option><!--[-->`);
            ssrRenderList(availableCategories.value, (catSlug) => {
              _push2(`<option${ssrRenderAttr("value", catSlug)} data-v-335f3e2c${ssrIncludeBooleanAttr(Array.isArray(__props.form.category) ? ssrLooseContain(__props.form.category, catSlug) : ssrLooseEqual(__props.form.category, catSlug)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(getDetail(catSlug).icon)} ${ssrInterpolate(getDetail(catSlug).name)}</option>`);
            });
            _push2(`<!--]--></select><div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-600" data-v-335f3e2c${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-335f3e2c${_scopeId}><path d="M19 9l-7 7-7-7" data-v-335f3e2c${_scopeId}></path></svg></div></div></div><div class="relative" data-v-335f3e2c${_scopeId}><label class="block text-[10px] uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest mb-2 transition-colors duration-500" data-v-335f3e2c${_scopeId}>${ssrInterpolate(_ctx.$t("date", "Tanggal"))}</label><button type="button" class="w-full px-4 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-500/40 font-bold text-slate-700 dark:text-slate-200 text-sm transition-all flex items-center justify-between transition-colors duration-500" data-v-335f3e2c${_scopeId}><span class="truncate" data-v-335f3e2c${_scopeId}>${ssrInterpolate(dateDisplay.value)}</span><span class="text-slate-400 dark:text-slate-600" data-v-335f3e2c${_scopeId}>📅</span></button>`);
            if (showDatePicker.value) {
              _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:bottom-full sm:right-0 sm:mb-2 sm:origin-bottom-right sm:block sm:inset-auto" data-v-335f3e2c${_scopeId}><div class="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm sm:hidden" data-v-335f3e2c${_scopeId}></div>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                show: true,
                modelValue: __props.form.date,
                "onUpdate:modelValue": (val) => __props.form.date = val,
                onClose: ($event) => showDatePicker.value = false,
                class: "relative z-10"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="px-6 md:px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-3 z-20 shrink-0 transition-colors duration-500" data-v-335f3e2c${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              onClick: __props.close,
              class: "flex-1 !py-3.5 !rounded-xl !text-[11px] !font-black !uppercase !tracking-widest !border-2 dark:!border-slate-700 !text-slate-400 dark:!text-slate-600 hover:!text-slate-600 dark:hover:!text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 transition-all duration-300"
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
              class: ["flex-[2] !rounded-xl !py-3.5 shadow-xl dark:shadow-none transition-all transform active:scale-95 font-black uppercase tracking-widest text-[11px] justify-center transition-all duration-300", __props.form.type === "expense" ? "!bg-rose-500 hover:!bg-rose-600 shadow-rose-200 dark:shadow-rose-900/40" : "!bg-emerald-500 hover:!bg-emerald-600 shadow-emerald-200 dark:shadow-emerald-900/40"]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.form.processing) {
                    _push3(`<span class="flex items-center gap-2" data-v-335f3e2c${_scopeId2}><svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-335f3e2c${_scopeId2}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-335f3e2c${_scopeId2}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-335f3e2c${_scopeId2}></path></svg></span>`);
                  } else {
                    _push3(`<span data-v-335f3e2c${_scopeId2}>${ssrInterpolate(_ctx.$t("btn_save", "Simpan Transaksi"))}</span>`);
                  }
                } else {
                  return [
                    __props.form.processing ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "flex items-center gap-2"
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
                    ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.$t("btn_save", "Simpan Transaksi")), 1))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-slate-50 dark:bg-slate-950 flex flex-col max-h-[85vh] relative overflow-visible transition-all duration-500 border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-none rounded-[2.5rem]" }, [
                createVNode("div", { class: "px-6 md:px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 z-20 shrink-0 transition-colors duration-500" }, [
                  createVNode("div", { class: "flex items-center gap-4 transition-colors duration-500" }, [
                    createVNode("div", { class: "w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg dark:shadow-none shadow-indigo-200 dark:shadow-indigo-900/20 shrink-0" }, " ✨ "),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-2 transition-colors duration-500" }, toDisplayString(__props.form.id ? _ctx.$t("edit_transaction", "Edit Transaksi") : _ctx.$t("record_transaction", "Catat Transaksi")), 1),
                      !__props.form.id ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: ($event) => _ctx.$emit("switch-to-batch"),
                        type: "button",
                        class: "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition duration-300 flex items-center gap-1.5 active:scale-95 w-fit border border-indigo-100 dark:border-indigo-500/20"
                      }, [
                        createVNode("span", null, "⚡"),
                        createTextVNode(" " + toDisplayString(_ctx.$t("batch_mode_title", "Batch Mode")), 1)
                      ], 8, ["onClick"])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("button", {
                    onClick: __props.close,
                    class: "w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold"
                  }, " ✕ ", 8, ["onClick"])
                ]),
                createVNode("div", { class: "flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-5" }, [
                  createVNode("div", { class: "flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl transition-colors duration-500" }, [
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => __props.form.type = "expense",
                      class: ["flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 transition-colors duration-300", __props.form.type === "expense" ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm dark:shadow-none" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"]
                    }, toDisplayString(_ctx.$t("out", "Keluar")), 11, ["onClick"]),
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => __props.form.type = "income",
                      class: ["flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 transition-colors duration-300", __props.form.type === "income" ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm dark:shadow-none" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"]
                    }, toDisplayString(_ctx.$t("in", "Masuk")), 11, ["onClick"])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", {
                      class: ["block text-[10px] uppercase font-black tracking-widest mb-2 transition-colors duration-500", __props.form.type === "expense" ? "text-rose-400 dark:text-rose-400/80" : "text-emerald-400 dark:text-emerald-400/80"]
                    }, toDisplayString(_ctx.$t("amount", "Nominal")), 3),
                    createVNode("div", { class: "relative group" }, [
                      createVNode("span", {
                        class: ["absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg transition-colors duration-500", __props.form.type === "expense" ? "text-rose-500 dark:text-rose-400" : "text-emerald-500 dark:text-emerald-400"]
                      }, toDisplayString(currencySymbol.value), 3),
                      createVNode("input", {
                        type: "text",
                        value: formatDisplay(__props.form.amount),
                        onInput,
                        placeholder: "0",
                        class: ["w-full pl-12 pr-4 h-14 rounded-xl border-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-0 font-black text-2xl transition-all dark:text-white", [
                          ((_d = __props.form.errors) == null ? void 0 : _d.amount) ? "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400" : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200",
                          __props.form.type === "expense" ? "focus:border-rose-500" : "focus:border-emerald-500"
                        ]]
                      }, null, 42, ["value"])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-[10px] uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest mb-2 transition-colors duration-500" }, toDisplayString(_ctx.$t("description", "Keterangan")), 1),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => __props.form.title = $event,
                      type: "text",
                      placeholder: _ctx.$t("desc_placeholder", "Cth: Kopi, Gaji..."),
                      class: ["w-full px-4 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-indigo-500 focus:ring-0 font-bold text-sm text-slate-700 dark:text-slate-200 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700", { "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400 placeholder-rose-300": (_e = __props.form.errors) == null ? void 0 : _e.title }]
                    }, null, 10, ["onUpdate:modelValue", "placeholder"]), [
                      [vModelText, __props.form.title]
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-[10px] uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest mb-2 transition-colors duration-500" }, toDisplayString(_ctx.$t("category", "Kategori")), 1),
                      createVNode("div", { class: "relative" }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => __props.form.category = $event,
                          class: ["w-full pl-4 pr-8 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-indigo-500 focus:ring-0 font-bold text-slate-700 dark:text-slate-200 capitalize text-sm appearance-none cursor-pointer transition-all", { "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400": (_f = __props.form.errors) == null ? void 0 : _f.category }]
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, toDisplayString(_ctx.$t("select_placeholder", "Pilih...")), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(availableCategories.value, (catSlug) => {
                            return openBlock(), createBlock("option", {
                              key: catSlug,
                              value: catSlug
                            }, toDisplayString(getDetail(catSlug).icon) + " " + toDisplayString(getDetail(catSlug).name), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, __props.form.category]
                        ]),
                        createVNode("div", { class: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-600" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2.5"
                          }, [
                            createVNode("path", { d: "M19 9l-7 7-7-7" })
                          ]))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "relative" }, [
                      createVNode("label", { class: "block text-[10px] uppercase font-black text-slate-400 dark:text-slate-600 tracking-widest mb-2 transition-colors duration-500" }, toDisplayString(_ctx.$t("date", "Tanggal")), 1),
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => showDatePicker.value = !showDatePicker.value,
                        class: "w-full px-4 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-500/40 font-bold text-slate-700 dark:text-slate-200 text-sm transition-all flex items-center justify-between transition-colors duration-500"
                      }, [
                        createVNode("span", { class: "truncate" }, toDisplayString(dateDisplay.value), 1),
                        createVNode("span", { class: "text-slate-400 dark:text-slate-600" }, "📅")
                      ], 8, ["onClick"]),
                      createVNode(Transition, {
                        "enter-active-class": "transition ease-out duration-200",
                        "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-2",
                        "enter-to-class": "opacity-100 translate-y-0",
                        "leave-active-class": "transition ease-in duration-150",
                        "leave-from-class": "opacity-100 translate-y-0",
                        "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-2"
                      }, {
                        default: withCtx(() => [
                          showDatePicker.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:bottom-full sm:right-0 sm:mb-2 sm:origin-bottom-right sm:block sm:inset-auto"
                          }, [
                            createVNode("div", {
                              class: "fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm sm:hidden",
                              onClick: ($event) => showDatePicker.value = false
                            }, null, 8, ["onClick"]),
                            createVNode(_sfc_main$2, {
                              show: true,
                              modelValue: __props.form.date,
                              "onUpdate:modelValue": (val) => __props.form.date = val,
                              onClose: ($event) => showDatePicker.value = false,
                              class: "relative z-10"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onClose"])
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "px-6 md:px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-3 z-20 shrink-0 transition-colors duration-500" }, [
                  createVNode(_sfc_main$3, {
                    onClick: __props.close,
                    class: "flex-1 !py-3.5 !rounded-xl !text-[11px] !font-black !uppercase !tracking-widest !border-2 dark:!border-slate-700 !text-slate-400 dark:!text-slate-600 hover:!text-slate-600 dark:hover:!text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 transition-all duration-300"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("btn_cancel", "Batal")), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(PrimaryButton, {
                    onClick: __props.submit,
                    disabled: __props.form.processing,
                    class: ["flex-[2] !rounded-xl !py-3.5 shadow-xl dark:shadow-none transition-all transform active:scale-95 font-black uppercase tracking-widest text-[11px] justify-center transition-all duration-300", __props.form.type === "expense" ? "!bg-rose-500 hover:!bg-rose-600 shadow-rose-200 dark:shadow-rose-900/40" : "!bg-emerald-500 hover:!bg-emerald-600 shadow-emerald-200 dark:shadow-emerald-900/40"]
                  }, {
                    default: withCtx(() => [
                      __props.form.processing ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "flex items-center gap-2"
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
                      ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.$t("btn_save", "Simpan Transaksi")), 1))
                    ]),
                    _: 1
                  }, 8, ["onClick", "disabled", "class"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/TransactionModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TransactionModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-335f3e2c"]]);
export {
  TransactionModal as default
};
