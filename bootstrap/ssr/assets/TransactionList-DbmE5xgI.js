import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import dayjs from "dayjs";
import { u as useFinanceHistory } from "./useFinanceHistory-BTN46c6X.js";
import { u as useFinanceFormat } from "./useFinanceFormat-CRSb1fg_.js";
import ArchiveModal from "./ArchiveModal-9Jsuj87o.js";
import _sfc_main$1 from "./FinanceDatePicker-St-Mq15S.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
import "./Modal-B2rYQMrj.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "dayjs/plugin/localeData.js";
const _sfc_main = {
  __name: "TransactionList",
  __ssrInlineRender: true,
  props: {
    transactions: Array,
    categories: Array,
    onDelete: Function,
    onEdit: Function
  },
  setup(__props) {
    const props = __props;
    const { visibleStats, filterDate, isArchiveOpen, selectedDayData } = useFinanceHistory(props);
    const { formatMoney } = useFinanceFormat();
    const showFilterPicker = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div class="flex items-center gap-2"><h3 class="text-lg font-bold text-slate-800">${ssrInterpolate(_ctx.$t("daily_history"))}</h3>`);
      if (!unref(filterDate)) {
        _push(`<span class="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">${ssrInterpolate(_ctx.$t("last_5"))}</span>`);
      } else {
        _push(`<span class="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">${ssrInterpolate(_ctx.$t("search_result"))}</span>`);
      }
      _push(`</div><div class="relative z-20"><div class="flex items-center"><button class="${ssrRenderClass([unref(filterDate) ? "text-indigo-600 border-indigo-200" : "text-slate-500", "pl-3 pr-8 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 hover:ring-2 hover:ring-indigo-500/10 transition-all flex items-center gap-2 min-w-[150px]"])}"><span class="text-base">📅</span><span>${ssrInterpolate(unref(filterDate) ? unref(dayjs)(unref(filterDate)).locale(_ctx.$page.props.locale).format("DD MMM YYYY") : _ctx.$t("date_filter"))}</span></button>`);
      if (unref(filterDate)) {
        _push(`<button class="absolute right-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-1 rounded-full transition-all" title="Hapus Filter"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="absolute right-0 top-full mt-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        show: showFilterPicker.value,
        modelValue: unref(filterDate),
        "onUpdate:modelValue": (val) => filterDate.value = val,
        onClose: ($event) => showFilterPicker.value = false
      }, null, _parent));
      _push(`</div></div></div>`);
      if (__props.transactions.length === 0) {
        _push(`<div class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200"><div class="text-3xl mb-2">📒</div><p class="text-slate-400 text-sm font-medium">${ssrInterpolate(_ctx.$t("no_transaction"))}</p></div>`);
      } else {
        _push(`<div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-50"><!--[-->`);
        ssrRenderList(unref(visibleStats), (day) => {
          _push(`<div class="group p-4 flex items-center justify-between hover:bg-indigo-50/50 transition-colors cursor-pointer"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-white transition-all shadow-sm"><span class="text-[10px] uppercase font-black text-slate-400 leading-none">${ssrInterpolate(day.dateObj.format("MMM"))}</span><span class="text-xl font-black leading-none text-slate-700 mt-0.5">${ssrInterpolate(day.dateObj.format("DD"))}</span></div><div><h4 class="font-bold text-slate-700 text-sm capitalize">${ssrInterpolate(day.dateObj.format("dddd"))}</h4><span class="text-[11px] text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 mt-1 inline-block">${ssrInterpolate(_ctx.$t("transaction_count", { count: day.transactions.length }))}</span></div></div><div class="flex items-center gap-6"><div class="pl-4 border-l border-slate-100 text-right"><span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">${ssrInterpolate(_ctx.$t("daily_net"))}</span><span class="${ssrRenderClass([day.total_income - day.total_expense >= 0 ? "text-indigo-600" : "text-orange-500", "text-sm font-black font-mono"])}">${ssrInterpolate(day.total_income - day.total_expense >= 0 ? "+" : "")}${ssrInterpolate(unref(formatMoney)(day.total_income - day.total_expense))}</span></div><span class="text-slate-300 group-hover:text-indigo-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></span></div></div>`);
        });
        _push(`<!--]-->`);
        if (!unref(filterDate) && unref(visibleStats).length === 5) {
          _push(`<div class="bg-slate-50/50 p-2.5 text-center border-t border-slate-100"><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${ssrInterpolate(_ctx.$t("old_data_hint"))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(ssrRenderComponent(ArchiveModal, {
        show: unref(isArchiveOpen),
        dayData: unref(selectedDayData),
        categories: __props.categories,
        close: () => isArchiveOpen.value = false,
        onDelete: __props.onDelete,
        onEdit: __props.onEdit
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/TransactionList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
