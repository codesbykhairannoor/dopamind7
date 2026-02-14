import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { u as useFinanceFormat } from "./useFinanceFormat-DRbxJZsx.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "BudgetSidebar",
  __ssrInlineRender: true,
  props: {
    budgets: Array,
    categories: Array,
    expenseStats: Object,
    incomeStats: Object
  },
  emits: ["add", "delete-budget", "edit-budget", "add-category", "edit-category", "delete-category"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { formatMoney, getCategoryDetails } = useFinanceFormat();
    const getCat = (slug) => getCategoryDetails(slug, props.categories);
    const activeTab = ref("expense");
    const incomeList = computed(() => {
      return props.categories.filter((c) => c.type === "income").map((cat) => ({
        ...cat,
        amount: props.incomeStats[cat.slug] || 0
      })).sort((a, b) => b.amount - a.amount);
    });
    const totalBudget = computed(() => {
      return props.budgets.reduce((sum, b) => sum + Number(b.limit_amount), 0);
    });
    const totalBudgetExpense = computed(() => {
      return props.budgets.reduce((sum, b) => sum + Number(props.expenseStats[b.category] || 0), 0);
    });
    const getProgress = (cat, limit) => limit > 0 ? Math.min((props.expenseStats[cat] || 0) / limit * 100, 100) : 0;
    const getBarColor = (p) => p > 90 ? "bg-rose-500" : p > 75 ? "bg-orange-500" : "bg-indigo-500";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit flex flex-col gap-6" }, _attrs))}><div class="flex p-1 bg-slate-50 rounded-xl border border-slate-100"><button class="${ssrRenderClass([activeTab.value === "expense" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"])}">${ssrInterpolate(_ctx.$t("expense"))}</button><button class="${ssrRenderClass([activeTab.value === "income" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"])}">${ssrInterpolate(_ctx.$t("income"))}</button></div>`);
      if (activeTab.value === "expense") {
        _push(`<div class="space-y-6"><div class="flex justify-between items-center"><h3 class="font-bold text-slate-800 text-sm">${ssrInterpolate(_ctx.$t("budget_target"))}</h3><button class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition">+ ${ssrInterpolate(_ctx.$t("set_budget"))}</button></div>`);
        if (__props.budgets.length === 0) {
          _push(`<div class="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50"><span class="text-2xl block mb-2">🎯</span> ${ssrInterpolate(_ctx.$t("no_budget"))}</div>`);
        } else {
          _push(`<div class="space-y-4"><div class="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 flex justify-between items-center shadow-inner"><div class="flex flex-col"><span class="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Total Budget</span><span class="text-sm font-black text-slate-700 mt-0.5">${ssrInterpolate(unref(formatMoney)(totalBudget.value))}</span></div><div class="text-right flex flex-col"><span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Terpakai</span><span class="${ssrRenderClass([totalBudgetExpense.value > totalBudget.value ? "text-rose-500" : "text-indigo-600", "text-sm font-black mt-0.5"])}">${ssrInterpolate(unref(formatMoney)(totalBudgetExpense.value))}</span></div></div><div class="space-y-3"><!--[-->`);
          ssrRenderList(__props.budgets, (b) => {
            _push(`<div class="relative pb-3 border-b border-slate-100 last:border-0 last:pb-0"><div class="flex justify-between items-end text-sm mb-2"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center text-sm">${ssrInterpolate(getCat(b.category).icon)}</div><div class="flex flex-col"><span class="font-bold text-slate-700 capitalize text-sm leading-tight">${ssrInterpolate(getCat(b.category).name)}</span><span class="text-[10px] font-bold text-slate-400 mt-0.5">${ssrInterpolate(unref(formatMoney)(props.expenseStats[b.category] || 0))} / ${ssrInterpolate(unref(formatMoney)(b.limit_amount))}</span></div></div><div class="flex flex-col items-end gap-1"><div class="flex gap-1"><button class="text-[10px] font-bold text-indigo-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 px-1.5 py-0.5 rounded transition">✏️${ssrInterpolate(_ctx.$t("edit"))}</button><button class="text-[10px] font-bold text-rose-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 px-1.5 py-0.5 rounded transition">🗑️${ssrInterpolate(_ctx.$t("delete"))}</button></div><span class="${ssrRenderClass([getProgress(b.category, b.limit_amount) > 90 ? "text-rose-500" : "text-slate-400", "text-[10px] font-black font-mono"])}">${ssrInterpolate(Math.round(getProgress(b.category, b.limit_amount)))}% </span></div></div><div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner relative"><div class="${ssrRenderClass([getBarColor(getProgress(b.category, b.limit_amount)), "absolute top-0 left-0 h-full transition-all duration-1000 rounded-full"])}" style="${ssrRenderStyle({ width: `${getProgress(b.category, b.limit_amount)}%` })}"></div></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "income") {
        _push(`<div class="space-y-4"><div class="flex justify-between items-center"><h3 class="font-bold text-slate-800 text-sm">${ssrInterpolate(_ctx.$t("fund_source"))}</h3><button class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition">+ ${ssrInterpolate(_ctx.$t("add_category"))}</button></div>`);
        if (incomeList.value.length === 0) {
          _push(`<div class="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 bg-slate-50/50 rounded-xl"><span class="text-2xl block mb-2">💸</span> ${ssrInterpolate(_ctx.$t("no_fund_source"))}</div>`);
        } else {
          _push(`<div class="space-y-3"><!--[-->`);
          ssrRenderList(incomeList.value, (item) => {
            _push(`<div class="flex justify-between items-center pb-3 border-b border-slate-100 last:border-0 last:pb-0 relative"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shadow-inner border border-emerald-100">${ssrInterpolate(item.icon)}</div><div class="flex flex-col"><span class="font-bold text-slate-700 capitalize text-sm">${ssrInterpolate(item.name)}</span><span class="text-[10px] text-slate-400 font-medium">${ssrInterpolate(item.amount > 0 ? _ctx.$t("active") : _ctx.$t("empty"))}</span></div></div><div class="flex flex-col items-end gap-1"><span class="font-black text-emerald-600 text-sm tracking-wide">+${ssrInterpolate(unref(formatMoney)(item.amount))}</span><div class="flex gap-1"><button class="text-[10px] font-bold text-indigo-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 px-1.5 py-0.5 rounded transition">✏️${ssrInterpolate(_ctx.$t("edit"))}</button><button class="text-[10px] font-bold text-rose-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 px-1.5 py-0.5 rounded transition">🗑️${ssrInterpolate(_ctx.$t("delete"))}</button></div></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/BudgetSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
