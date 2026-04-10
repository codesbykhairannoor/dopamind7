import { ref, computed, resolveComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, Transition, createCommentVNode, withDirectives, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
import dayjs from "dayjs";
import { _ as _sfc_main$1 } from "./Modal-b6JySqy_.js";
import { _ as _sfc_main$2 } from "./TextInput-xTq3OG6l.js";
import { P as PrimaryButton } from "./PrimaryButton-DPmleQI_.js";
import { _ as _sfc_main$3 } from "./SecondaryButton-BgIg9sGF.js";
import { TrendingUp, Sparkle, CheckCircle2, ArrowRight } from "lucide-vue-next";
import { u as useGating } from "./useGating-_5WV009x.js";
import { Link } from "@inertiajs/vue3";
import "./OneForMindIcon-XdjRmiFl.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
    const { isExplorer } = useGating();
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
      const _component_FinanceDatePicker = resolveComponent("FinanceDatePicker");
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: __props.show,
        onClose: __props.close,
        maxWidth: "2xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white dark:bg-slate-900 rounded-[2.5rem] flex flex-col max-h-[90vh] relative overflow-hidden transition-all duration-500 border border-slate-100 dark:border-slate-800 shadow-2xl dark:shadow-none" data-v-414ae13c${_scopeId}>`);
            if (unref(isExplorer)) {
              _push2(`<div class="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 min-h-[500px]" data-v-414ae13c${_scopeId}><button class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all z-50 font-bold" data-v-414ae13c${_scopeId}>✕</button><div class="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" data-v-414ae13c${_scopeId}></div><div class="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]" data-v-414ae13c${_scopeId}></div><div class="relative z-10 max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700" data-v-414ae13c${_scopeId}><div class="relative w-20 h-20 mx-auto" data-v-414ae13c${_scopeId}><div class="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full" data-v-414ae13c${_scopeId}></div><div class="relative w-20 h-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-xl flex items-center justify-center" data-v-414ae13c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(TrendingUp), {
                size: 32,
                class: "text-cyan-600 dark:text-cyan-400",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div data-v-414ae13c${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4 shadow-sm" data-v-414ae13c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Sparkle), {
                size: 10,
                class: "text-cyan-500",
                fill: "currentColor"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-[8px] font-black uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("gating.lock_title_required"))}</span></div><h3 class="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter leading-tight" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("gating.finance_trends.title"))}</h3><p class="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("gating.finance_trends.description"))}</p></div><div class="space-y-3 text-left" data-v-414ae13c${_scopeId}><!--[-->`);
              ssrRenderList([1, 2, 3], (i) => {
                _push2(`<div class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm" data-v-414ae13c${_scopeId}><div class="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0" data-v-414ae13c${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle2), { size: 12 }, null, _parent2, _scopeId));
                _push2(`</div><span class="text-[10px] font-black text-slate-700 dark:text-slate-300 tracking-tight" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("gating.finance_trends.benefit_" + i))}</span></div>`);
              });
              _push2(`<!--]--></div><div class="pt-4 space-y-3" data-v-414ae13c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("billing"),
                class: "w-full h-14 bg-slate-900 dark:bg-indigo-600 hover:scale-[1.01] text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest shadow-xl transition-all active:scale-95 group"
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
              _push2(`<button class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("gating.btn_stay"))}</button></div></div></div>`);
            } else {
              _push2(`<!--[--><div class="${ssrRenderClass([{ "mt-12": __props.conflictError }, "px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0 z-20 rounded-t-[2.5rem] transition-colors duration-500"])}" data-v-414ae13c${_scopeId}><div class="flex items-center gap-4" data-v-414ae13c${_scopeId}><div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg dark:shadow-none shadow-indigo-100 dark:shadow-indigo-900/20" data-v-414ae13c${_scopeId}> ✨ </div><div data-v-414ae13c${_scopeId}><h2 class="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1.5 transition-colors duration-500" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("batch_mode_title", "Batch finance"))}</h2><div class="relative" data-v-414ae13c${_scopeId}><button type="button" class="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border border-indigo-100 dark:border-indigo-500/20 rounded-lg px-2.5 py-1 transition-all tracking-widest flex items-center gap-2" data-v-414ae13c${_scopeId}><span data-v-414ae13c${_scopeId}>${ssrInterpolate(dateDisplay.value)}</span><span data-v-414ae13c${_scopeId}>📅</span></button>`);
              if (showDatePicker.value) {
                _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:top-full sm:left-0 sm:mt-2 sm:origin-top-left sm:block sm:inset-auto" data-v-414ae13c${_scopeId}><div class="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm sm:hidden" data-v-414ae13c${_scopeId}></div>`);
                _push2(ssrRenderComponent(_component_FinanceDatePicker, {
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
              _push2(`</div></div></div><div class="flex items-center gap-3" data-v-414ae13c${_scopeId}><button type="button" class="hidden sm:flex text-[10px] font-black tracking-widest px-4 py-2 rounded-xl border-2 border-slate-50 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-500/20 transition-all active:scale-95 items-center gap-2" data-v-414ae13c${_scopeId}><span data-v-414ae13c${_scopeId}>↩️</span> ${ssrInterpolate(_ctx.$t("btn_single_mode", "Single mode"))}</button><button class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold" data-v-414ae13c${_scopeId}> ✕ </button></div></div><div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-500" data-v-414ae13c${_scopeId}><div class="space-y-4" data-v-414ae13c${_scopeId}><!--[-->`);
              ssrRenderList(__props.form.transactions, (trx, index) => {
                _push2(`<div class="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none relative group animate-in fade-in slide-in-from-bottom-4 duration-300 transition-colors duration-500" data-v-414ae13c${_scopeId}><div class="flex justify-between items-center mb-4" data-v-414ae13c${_scopeId}><span class="${ssrRenderClass([trx.type === "expense" ? "bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400" : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 dark:text-emerald-400", "text-[10px] font-bold tracking-widest px-3 py-1 rounded-lg"])}" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("transaction", "Transaction"))} #${ssrInterpolate(index + 1)}</span><button type="button"${ssrIncludeBooleanAttr(__props.form.transactions.length <= 1) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": __props.form.transactions.length <= 1 }, "w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-500 dark:hover:text-rose-400 transition-all transition-colors duration-300"])}" data-v-414ae13c${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-414ae13c${_scopeId}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-414ae13c${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-414ae13c${_scopeId}><div class="space-y-4" data-v-414ae13c${_scopeId}><div data-v-414ae13c${_scopeId}><label class="text-[9px] font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 ml-1 block transition-colors duration-500" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("type", "Type"))}</label><div class="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl h-11 border border-slate-100 dark:border-slate-700 transition-colors duration-500" data-v-414ae13c${_scopeId}><button type="button" class="${ssrRenderClass([trx.type === "expense" ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm border border-slate-200 dark:border-slate-600" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300", "flex-1 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center tracking-wider"])}" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("out", "Out"))}</button><button type="button" class="${ssrRenderClass([trx.type === "income" ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200 dark:border-slate-600" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300", "flex-1 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center tracking-wider"])}" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("in", "In"))}</button></div></div><div data-v-414ae13c${_scopeId}><label class="text-[9px] font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 ml-1 block transition-colors duration-500" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("category", "Category"))}</label><div class="relative" data-v-414ae13c${_scopeId}><select class="${ssrRenderClass([[
                  __props.form.errors[`transactions.${index}.category`] ? "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400" : "",
                  trx.type === "expense" ? "focus:border-rose-400" : "focus:border-emerald-400"
                ], "w-full pl-3 pr-8 h-11 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 font-bold text-slate-700 dark:text-slate-200 capitalize text-xs appearance-none cursor-pointer transition-all transition-colors duration-500"])}" data-v-414ae13c${_scopeId}><option value="" disabled data-v-414ae13c${ssrIncludeBooleanAttr(Array.isArray(trx.category) ? ssrLooseContain(trx.category, "") : ssrLooseEqual(trx.category, "")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(_ctx.$t("select_placeholder", "Choose..."))}</option><!--[-->`);
                ssrRenderList(getCategoriesByType(trx.type), (catSlug) => {
                  _push2(`<option${ssrRenderAttr("value", catSlug)} data-v-414ae13c${ssrIncludeBooleanAttr(Array.isArray(trx.category) ? ssrLooseContain(trx.category, catSlug) : ssrLooseEqual(trx.category, catSlug)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(getDetail(catSlug).icon)} ${ssrInterpolate(getDetail(catSlug).name)}</option>`);
                });
                _push2(`<!--]--></select><div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-600" data-v-414ae13c${_scopeId}><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-414ae13c${_scopeId}><path d="M19 9l-7 7-7-7" data-v-414ae13c${_scopeId}></path></svg></div></div></div></div><div class="space-y-4" data-v-414ae13c${_scopeId}><div data-v-414ae13c${_scopeId}><label class="${ssrRenderClass([trx.type === "expense" ? "text-rose-400 dark:text-rose-400/80" : "text-emerald-400 dark:text-emerald-400/80", "text-[9px] font-bold tracking-widest mb-1.5 ml-1 block transition-colors duration-500"])}" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("amount", "Amount"))}</label><div class="relative group" data-v-414ae13c${_scopeId}><span class="${ssrRenderClass([trx.type === "expense" ? "text-rose-500 dark:text-rose-400" : "text-emerald-500 dark:text-emerald-400", "absolute left-3 top-1/2 -translate-y-1/2 font-black text-[12px] transition-colors duration-500"])}" data-v-414ae13c${_scopeId}>${ssrInterpolate(currencySymbol.value)}</span><input type="text"${ssrRenderAttr("value", formatDisplay(trx.amount))} placeholder="0" class="${ssrRenderClass([[
                  __props.form.errors[`transactions.${index}.amount`] ? "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400" : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200",
                  trx.type === "expense" ? "focus:border-rose-500" : "focus:border-emerald-500"
                ], "w-full h-11 pl-10 pr-3 !rounded-xl border-2 bg-white dark:bg-slate-900 focus:ring-0 font-black text-sm transition-all dark:text-white transition-colors duration-500"])}" data-v-414ae13c${_scopeId}></div></div><div data-v-414ae13c${_scopeId}><label class="text-[9px] font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 ml-1 block transition-colors duration-500" data-v-414ae13c${_scopeId}>${ssrInterpolate(_ctx.$t("description", "Description"))}</label>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  modelValue: trx.title,
                  "onUpdate:modelValue": ($event) => trx.title = $event,
                  placeholder: _ctx.$t("desc_placeholder", "Cth: Kopi..."),
                  class: ["w-full text-xs font-bold h-11 px-3 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-all focus:ring-0 text-slate-700 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-colors duration-500", [
                    __props.form.errors[`transactions.${index}.title`] ? "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400" : "",
                    trx.type === "expense" ? "focus:border-rose-400" : "focus:border-emerald-400"
                  ]]
                }, null, _parent2, _scopeId));
                _push2(`</div></div></div></div>`);
              });
              _push2(`<!--]--></div><button type="button" class="mt-8 w-full py-4 border-2 border-dashed border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-2xl text-indigo-500 dark:text-indigo-400 font-bold tracking-widest text-[10px] hover:border-indigo-400 dark:hover:border-indigo-500/40 hover:bg-indigo-100 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm dark:shadow-none transition-colors duration-500" data-v-414ae13c${_scopeId}><span class="w-5 h-5 rounded-md bg-indigo-200 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-200 flex items-center justify-center text-xs shadow-sm" data-v-414ae13c${_scopeId}>+</span> ${ssrInterpolate(_ctx.$t("btn_add_another_transaction", "Add more transaction"))}</button></div><div class="px-8 py-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 transition-colors" data-v-414ae13c${_scopeId}><div class="text-[10px] font-bold text-slate-400 dark:text-slate-600 flex items-center gap-2" data-v-414ae13c${_scopeId}><span class="w-2 h-2 rounded-full bg-indigo-500" data-v-414ae13c${_scopeId}></span> ${ssrInterpolate(_ctx.$t("total_label"))} <span class="text-indigo-600 dark:text-indigo-400 text-sm font-black" data-v-414ae13c${_scopeId}>${ssrInterpolate(__props.form.transactions.length)}</span></div><div class="flex gap-3 w-full sm:w-auto" data-v-414ae13c${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                onClick: __props.close,
                class: "flex-1 !py-3.5 !rounded-xl !text-[10px] !font-bold !border-2 !text-slate-400 hover:!text-slate-600"
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
                      _push3(`<span data-v-414ae13c${_scopeId2}>${ssrInterpolate(_ctx.$t("btn_saving"))}</span>`);
                    } else {
                      _push3(`<span data-v-414ae13c${_scopeId2}>${ssrInterpolate(_ctx.$t("btn_save_all"))}</span>`);
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
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white dark:bg-slate-900 rounded-[2.5rem] flex flex-col max-h-[90vh] relative overflow-hidden transition-all duration-500 border border-slate-100 dark:border-slate-800 shadow-2xl dark:shadow-none" }, [
                unref(isExplorer) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 min-h-[500px]"
                }, [
                  createVNode("button", {
                    onClick: __props.close,
                    class: "absolute top-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all z-50 font-bold"
                  }, "✕", 8, ["onClick"]),
                  createVNode("div", { class: "absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" }),
                  createVNode("div", { class: "absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]" }),
                  createVNode("div", { class: "relative z-10 max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700" }, [
                    createVNode("div", { class: "relative w-20 h-20 mx-auto" }, [
                      createVNode("div", { class: "absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full" }),
                      createVNode("div", { class: "relative w-20 h-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-xl flex items-center justify-center" }, [
                        createVNode(unref(TrendingUp), {
                          size: 32,
                          class: "text-cyan-600 dark:text-cyan-400",
                          "stroke-width": "2.5"
                        })
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4 shadow-sm" }, [
                        createVNode(unref(Sparkle), {
                          size: 10,
                          class: "text-cyan-500",
                          fill: "currentColor"
                        }),
                        createVNode("span", { class: "text-[8px] font-black uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400" }, toDisplayString(_ctx.$t("gating.lock_title_required")), 1)
                      ]),
                      createVNode("h3", { class: "text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter leading-tight" }, toDisplayString(_ctx.$t("gating.finance_trends.title")), 1),
                      createVNode("p", { class: "text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed" }, toDisplayString(_ctx.$t("gating.finance_trends.description")), 1)
                    ]),
                    createVNode("div", { class: "space-y-3 text-left" }, [
                      (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3], (i) => {
                        return createVNode("div", {
                          key: i,
                          class: "flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm"
                        }, [
                          createVNode("div", { class: "w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0" }, [
                            createVNode(unref(CheckCircle2), { size: 12 })
                          ]),
                          createVNode("span", { class: "text-[10px] font-black text-slate-700 dark:text-slate-300 tracking-tight" }, toDisplayString(_ctx.$t("gating.finance_trends.benefit_" + i)), 1)
                        ]);
                      }), 64))
                    ]),
                    createVNode("div", { class: "pt-4 space-y-3" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("billing"),
                        class: "w-full h-14 bg-slate-900 dark:bg-indigo-600 hover:scale-[1.01] text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest shadow-xl transition-all active:scale-95 group"
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
                    class: ["px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0 z-20 rounded-t-[2.5rem] transition-colors duration-500", { "mt-12": __props.conflictError }]
                  }, [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("div", { class: "w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg dark:shadow-none shadow-indigo-100 dark:shadow-indigo-900/20" }, " ✨ "),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1.5 transition-colors duration-500" }, toDisplayString(_ctx.$t("batch_mode_title", "Batch finance")), 1),
                        createVNode("div", { class: "relative" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showDatePicker.value = !showDatePicker.value,
                            class: "text-[10px] font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border border-indigo-100 dark:border-indigo-500/20 rounded-lg px-2.5 py-1 transition-all tracking-widest flex items-center gap-2"
                          }, [
                            createVNode("span", null, toDisplayString(dateDisplay.value), 1),
                            createVNode("span", null, "📅")
                          ], 8, ["onClick"]),
                          createVNode(Transition, {
                            "enter-active-class": "transition ease-out duration-[4200ms]",
                            "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-2",
                            "enter-to-class": "opacity-100 translate-y-0",
                            "leave-active-class": "transition ease-in duration-150",
                            "leave-from-class": "opacity-100 translate-y-0",
                            "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-2"
                          }, {
                            default: withCtx(() => [
                              showDatePicker.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:top-full sm:left-0 sm:mt-2 sm:origin-top-left sm:block sm:inset-auto"
                              }, [
                                createVNode("div", {
                                  class: "fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm sm:hidden",
                                  onClick: ($event) => showDatePicker.value = false
                                }, null, 8, ["onClick"]),
                                createVNode(_component_FinanceDatePicker, {
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
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("button", {
                        onClick: __props.switchToSingle,
                        type: "button",
                        class: "hidden sm:flex text-[10px] font-black tracking-widest px-4 py-2 rounded-xl border-2 border-slate-50 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-500/20 transition-all active:scale-95 items-center gap-2"
                      }, [
                        createVNode("span", null, "↩️"),
                        createTextVNode(" " + toDisplayString(_ctx.$t("btn_single_mode", "Single mode")), 1)
                      ], 8, ["onClick"]),
                      createVNode("button", {
                        onClick: __props.close,
                        class: "w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold"
                      }, " ✕ ", 8, ["onClick"])
                    ])
                  ], 2),
                  createVNode("div", { class: "flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-500" }, [
                    createVNode("div", { class: "space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.form.transactions, (trx, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none relative group animate-in fade-in slide-in-from-bottom-4 duration-300 transition-colors duration-500"
                        }, [
                          createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                            createVNode("span", {
                              class: ["text-[10px] font-bold tracking-widest px-3 py-1 rounded-lg", trx.type === "expense" ? "bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400" : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"]
                            }, toDisplayString(_ctx.$t("transaction", "Transaction")) + " #" + toDisplayString(index + 1), 3),
                            createVNode("button", {
                              onClick: ($event) => __props.removeRow(index),
                              type: "button",
                              class: ["w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-500 dark:hover:text-rose-400 transition-all transition-colors duration-300", { "opacity-50 cursor-not-allowed": __props.form.transactions.length <= 1 }],
                              disabled: __props.form.transactions.length <= 1
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
                          createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-4" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "text-[9px] font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 ml-1 block transition-colors duration-500" }, toDisplayString(_ctx.$t("type", "Type")), 1),
                                createVNode("div", { class: "flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl h-11 border border-slate-100 dark:border-slate-700 transition-colors duration-500" }, [
                                  createVNode("button", {
                                    type: "button",
                                    onClick: ($event) => changeType(index, "expense"),
                                    class: ["flex-1 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center tracking-wider", trx.type === "expense" ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm border border-slate-200 dark:border-slate-600" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"]
                                  }, toDisplayString(_ctx.$t("out", "Out")), 11, ["onClick"]),
                                  createVNode("button", {
                                    type: "button",
                                    onClick: ($event) => changeType(index, "income"),
                                    class: ["flex-1 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center tracking-wider", trx.type === "income" ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200 dark:border-slate-600" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"]
                                  }, toDisplayString(_ctx.$t("in", "In")), 11, ["onClick"])
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "text-[9px] font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 ml-1 block transition-colors duration-500" }, toDisplayString(_ctx.$t("category", "Category")), 1),
                                createVNode("div", { class: "relative" }, [
                                  withDirectives(createVNode("select", {
                                    "onUpdate:modelValue": ($event) => trx.category = $event,
                                    class: ["w-full pl-3 pr-8 h-11 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 font-bold text-slate-700 dark:text-slate-200 capitalize text-xs appearance-none cursor-pointer transition-all transition-colors duration-500", [
                                      __props.form.errors[`transactions.${index}.category`] ? "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400" : "",
                                      trx.type === "expense" ? "focus:border-rose-400" : "focus:border-emerald-400"
                                    ]]
                                  }, [
                                    createVNode("option", {
                                      value: "",
                                      disabled: ""
                                    }, toDisplayString(_ctx.$t("select_placeholder", "Choose...")), 1),
                                    (openBlock(true), createBlock(Fragment, null, renderList(getCategoriesByType(trx.type), (catSlug) => {
                                      return openBlock(), createBlock("option", {
                                        key: catSlug,
                                        value: catSlug
                                      }, toDisplayString(getDetail(catSlug).icon) + " " + toDisplayString(getDetail(catSlug).name), 9, ["value"]);
                                    }), 128))
                                  ], 10, ["onUpdate:modelValue"]), [
                                    [vModelSelect, trx.category]
                                  ]),
                                  createVNode("div", { class: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-600" }, [
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
                              ])
                            ]),
                            createVNode("div", { class: "space-y-4" }, [
                              createVNode("div", null, [
                                createVNode("label", {
                                  class: ["text-[9px] font-bold tracking-widest mb-1.5 ml-1 block transition-colors duration-500", trx.type === "expense" ? "text-rose-400 dark:text-rose-400/80" : "text-emerald-400 dark:text-emerald-400/80"]
                                }, toDisplayString(_ctx.$t("amount", "Amount")), 3),
                                createVNode("div", { class: "relative group" }, [
                                  createVNode("span", {
                                    class: ["absolute left-3 top-1/2 -translate-y-1/2 font-black text-[12px] transition-colors duration-500", trx.type === "expense" ? "text-rose-500 dark:text-rose-400" : "text-emerald-500 dark:text-emerald-400"]
                                  }, toDisplayString(currencySymbol.value), 3),
                                  createVNode("input", {
                                    type: "text",
                                    value: formatDisplay(trx.amount),
                                    onInput: (e) => onInputAmount(e, index),
                                    placeholder: "0",
                                    class: ["w-full h-11 pl-10 pr-3 !rounded-xl border-2 bg-white dark:bg-slate-900 focus:ring-0 font-black text-sm transition-all dark:text-white transition-colors duration-500", [
                                      __props.form.errors[`transactions.${index}.amount`] ? "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400" : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200",
                                      trx.type === "expense" ? "focus:border-rose-500" : "focus:border-emerald-500"
                                    ]]
                                  }, null, 42, ["value", "onInput"])
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "text-[9px] font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 ml-1 block transition-colors duration-500" }, toDisplayString(_ctx.$t("description", "Description")), 1),
                                createVNode(_sfc_main$2, {
                                  modelValue: trx.title,
                                  "onUpdate:modelValue": ($event) => trx.title = $event,
                                  placeholder: _ctx.$t("desc_placeholder", "Cth: Kopi..."),
                                  class: ["w-full text-xs font-bold h-11 px-3 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-all focus:ring-0 text-slate-700 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-colors duration-500", [
                                    __props.form.errors[`transactions.${index}.title`] ? "!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400" : "",
                                    trx.type === "expense" ? "focus:border-rose-400" : "focus:border-emerald-400"
                                  ]]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "class"])
                              ])
                            ])
                          ])
                        ]);
                      }), 128))
                    ]),
                    createVNode("button", {
                      onClick: __props.addRow,
                      type: "button",
                      class: "mt-8 w-full py-4 border-2 border-dashed border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-2xl text-indigo-500 dark:text-indigo-400 font-bold tracking-widest text-[10px] hover:border-indigo-400 dark:hover:border-indigo-500/40 hover:bg-indigo-100 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm dark:shadow-none transition-colors duration-500"
                    }, [
                      createVNode("span", { class: "w-5 h-5 rounded-md bg-indigo-200 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-200 flex items-center justify-center text-xs shadow-sm" }, "+"),
                      createTextVNode(" " + toDisplayString(_ctx.$t("btn_add_another_transaction", "Add more transaction")), 1)
                    ], 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "px-8 py-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 transition-colors" }, [
                    createVNode("div", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-600 flex items-center gap-2" }, [
                      createVNode("span", { class: "w-2 h-2 rounded-full bg-indigo-500" }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("total_label")) + " ", 1),
                      createVNode("span", { class: "text-indigo-600 dark:text-indigo-400 text-sm font-black" }, toDisplayString(__props.form.transactions.length), 1)
                    ]),
                    createVNode("div", { class: "flex gap-3 w-full sm:w-auto" }, [
                      createVNode(_sfc_main$3, {
                        onClick: __props.close,
                        class: "flex-1 !py-3.5 !rounded-xl !text-[10px] !font-bold !border-2 !text-slate-400 hover:!text-slate-600"
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
const FinanceBatchModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-414ae13c"]]);
export {
  FinanceBatchModal as default
};
