import { ref, computed, watch, reactive, unref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, withModifiers, Transition, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CDBs3MlT.js";
import { router, usePage, Head } from "@inertiajs/vue3";
import dayjs from "dayjs";
import FinanceHeader from "./FinanceHeader-CT14ESXS.js";
import _sfc_main$2 from "./FinanceStats-CszjiDeO.js";
import _sfc_main$5 from "./BudgetSidebar-B2P1x4ya.js";
import _sfc_main$6 from "./TransactionModal-DZ3y--1h.js";
import _sfc_main$7 from "./BudgetModal-CPSHdw4j.js";
import _sfc_main$8 from "./CategoryModal-DYpCHnR4.js";
import _sfc_main$4 from "./DailyTrendChart-CZScDsjQ.js";
import ArchiveModal from "./ArchiveModal-C7OlW1zb.js";
import { u as useFinanceForm, F as FinanceInsights } from "./FinanceInsights-VaiDV3_T.js";
import _sfc_main$3 from "./FinanceDatePicker-Br0HfQLf.js";
import { u as useFinanceFormat } from "./useFinanceFormat-DRbxJZsx.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { u as useFinanceHistory } from "./useFinanceHistory-YqpF_siy.js";
import "laravel-vue-i18n";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-chartjs";
import "chart.js";
import "./Modal-B2rYQMrj.js";
import "sweetalert2";
import "dayjs/plugin/localeData.js";
function useFinanceCalendar(initialDate) {
  const { activeLocale } = useFinanceFormat();
  const currentDate = ref(dayjs(initialDate));
  const localeCode = computed(() => {
    if (!activeLocale || !activeLocale.value) return "en";
    return activeLocale.value.split("-")[0];
  });
  const changeMonth = (input) => {
    let newDate;
    if (input === "next") {
      newDate = currentDate.value.add(1, "month");
    } else if (input === "prev") {
      newDate = currentDate.value.subtract(1, "month");
    } else {
      newDate = dayjs(`${input}-01`);
    }
    currentDate.value = newDate;
    router.get(
      route("finance.index"),
      { date: newDate.format("YYYY-MM-DD") },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        only: ["transactions", "budgets", "stats", "filters"]
      }
    );
  };
  const formattedMonth = computed(() => {
    return currentDate.value.locale(localeCode.value).format("MMMM YYYY");
  });
  const currentMonthKey = computed(() => currentDate.value.format("YYYY-MM"));
  return {
    currentDate,
    changeMonth,
    formattedMonth,
    currentMonthKey
  };
}
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    transactions: Array,
    budgets: Array,
    stats: Object,
    filters: Object,
    categories: Array
  },
  setup(__props) {
    const props = __props;
    usePage();
    const localTransactions = ref([...props.transactions]);
    const localBudgets = ref([...props.budgets]);
    const localCategories = ref([...props.categories]);
    watch(() => props.transactions, (newVal) => localTransactions.value = [...newVal], { deep: true });
    watch(() => props.budgets, (newVal) => localBudgets.value = [...newVal], { deep: true });
    watch(() => props.categories, (newVal) => localCategories.value = [...newVal], { deep: true });
    const historyProps = reactive({
      ...props,
      get transactions() {
        return localTransactions.value;
      },
      get budgets() {
        return localBudgets.value;
      },
      get categories() {
        return localCategories.value;
      }
    });
    const { formattedMonth, changeMonth, currentMonthKey } = useFinanceCalendar(props.filters.date);
    const {
      transactionForm,
      setEditTransaction,
      submitTransaction,
      deleteTransaction,
      budgetForm,
      submitBudget,
      deleteBudget,
      categoryForm,
      setEditCategory,
      submitCategory,
      deleteCategory,
      updateIncomeTarget
    } = useFinanceForm();
    const showTransactionModal = ref(false);
    const showBudgetModal = ref(false);
    const showCategoryModal = ref(false);
    const showFilterPicker = ref(false);
    const { visibleStats, filterDate, isArchiveOpen, selectedDayData, openDetail } = useFinanceHistory(historyProps);
    const { formatMoney } = useFinanceFormat();
    const handleEdit = (trx) => {
      setEditTransaction(trx);
      showTransactionModal.value = true;
    };
    const handleEditBudget = (budget) => {
      const catDetail = localCategories.value.find((c) => c.slug === budget.category);
      budgetForm.id = budget.id;
      budgetForm.category = budget.category;
      budgetForm.name = catDetail ? catDetail.name : budget.category;
      budgetForm.icon = catDetail ? catDetail.icon : "💸";
      budgetForm.limit_amount = budget.limit_amount;
      budgetForm.month = budget.month || currentMonthKey.value;
      showBudgetModal.value = true;
    };
    const handleEditCategory = (cat) => {
      categoryForm.id = cat.id;
      setEditCategory(cat);
      showCategoryModal.value = true;
    };
    const handleAddCategory = () => {
      categoryForm.reset();
      categoryForm.id = null;
      showCategoryModal.value = true;
    };
    const submitNewTransaction = () => {
      showTransactionModal.value = false;
      submitTransaction({
        onOptimistic: (data, isEditing) => {
          if (isEditing) {
            const idx = localTransactions.value.findIndex((t) => t.id === data.id);
            if (idx !== -1) Object.assign(localTransactions.value[idx], data);
          } else {
            localTransactions.value.unshift(data);
          }
        },
        onError: (id, isEditing) => {
          if (!isEditing) localTransactions.value = localTransactions.value.filter((t) => t.id !== id);
          showTransactionModal.value = true;
        }
      });
    };
    const triggerDeleteTransaction = (id) => {
      isArchiveOpen.value = false;
      deleteTransaction(id, {
        onOptimistic: (targetId) => {
          localTransactions.value = localTransactions.value.filter((t) => t.id !== targetId);
        }
      });
    };
    const submitNewBudget = () => {
      showBudgetModal.value = false;
      submitBudget(currentMonthKey.value, {
        onOptimistic: (data, isEditing) => {
          if (isEditing) {
            const idx = localBudgets.value.findIndex((b) => b.id === data.id);
            if (idx !== -1) Object.assign(localBudgets.value[idx], data);
          } else {
            localBudgets.value.push(data);
          }
        },
        onError: (id, isEditing) => {
          if (!isEditing) localBudgets.value = localBudgets.value.filter((b) => b.id !== id);
          showBudgetModal.value = true;
        }
      });
    };
    const triggerDeleteBudget = (id) => {
      deleteBudget(id, {
        onOptimistic: (targetId) => {
          localBudgets.value = localBudgets.value.filter((b) => b.id !== targetId);
        }
      });
    };
    const submitNewCategory = () => {
      showCategoryModal.value = false;
      submitCategory({
        onOptimistic: (data, isEditing) => {
          if (isEditing) {
            const idx = localCategories.value.findIndex((c) => c.id === data.id);
            if (idx !== -1) Object.assign(localCategories.value[idx], data);
          } else {
            localCategories.value.push(data);
          }
        },
        onError: (id, isEditing) => {
          if (!isEditing) localCategories.value = localCategories.value.filter((c) => c.id !== id);
          showCategoryModal.value = true;
        }
      });
    };
    const triggerDeleteCategory = (cat) => {
      deleteCategory(cat, {
        onOptimistic: (targetId) => {
          localCategories.value = localCategories.value.filter((c) => c.id !== targetId);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Finance Plan" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(FinanceHeader, {
              currentMonth: unref(formattedMonth),
              currentMonthKey: unref(currentMonthKey),
              onChangeDate: (payload) => unref(changeMonth)(payload),
              onAddClick: () => {
                unref(transactionForm).reset();
                unref(transactionForm).id = null;
                showTransactionModal.value = true;
              }
            }, null, _parent2, _scopeId));
            _push2(`<div class="w-full min-h-screen bg-slate-50/50 px-4 sm:px-6 lg:px-8 py-8"${_scopeId}><div class="mb-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              stats: __props.stats,
              onUpdateTarget: (amount) => unref(updateIncomeTarget)(unref(currentMonthKey), amount)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"${_scopeId}><div class="lg:col-span-3 space-y-8 w-full"${_scopeId}><div class="space-y-4"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><h3 class="text-lg font-bold text-slate-800"${_scopeId}>${ssrInterpolate(_ctx.$t("daily_history"))}</h3>`);
            if (!unref(filterDate)) {
              _push2(`<span class="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg"${_scopeId}>${ssrInterpolate(_ctx.$t("last_5"))}</span>`);
            } else {
              _push2(`<span class="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg"${_scopeId}>${ssrInterpolate(_ctx.$t("search_result"))}</span>`);
            }
            _push2(`</div><div class="relative z-30"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><button class="${ssrRenderClass([unref(filterDate) ? "text-indigo-600 border-indigo-200" : "text-slate-500", "pl-3 pr-8 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 hover:ring-2 hover:ring-indigo-500/10 transition-all flex items-center gap-2 min-w-[150px] relative"])}"${_scopeId}><span class="text-base"${_scopeId}>📅</span><span${_scopeId}>${ssrInterpolate(unref(filterDate) ? unref(dayjs)(unref(filterDate)).locale(_ctx.$page.props.locale).format("DD MMM YYYY") : _ctx.$t("date_filter"))}</span><span class="absolute right-3 text-slate-400 text-[10px]"${_scopeId}>${ssrInterpolate(showFilterPicker.value ? "▲" : "▼")}</span></button>`);
            if (unref(filterDate)) {
              _push2(`<button class="text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-all border border-transparent hover:border-rose-100" title="Hapus Filter"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (showFilterPicker.value) {
              _push2(`<div class="absolute right-0 top-full mt-2 z-50 origin-top-right"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                show: showFilterPicker.value,
                modelValue: unref(filterDate),
                transactions: localTransactions.value,
                "onUpdate:modelValue": (val) => filterDate.value = val,
                onClose: ($event) => showFilterPicker.value = false
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (localTransactions.value.length === 0) {
              _push2(`<div class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200"${_scopeId}><div class="text-3xl mb-2"${_scopeId}>📒</div><p class="text-slate-400 text-sm font-medium"${_scopeId}>${ssrInterpolate(_ctx.$t("no_transaction"))}</p></div>`);
            } else {
              _push2(`<div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-50"${_scopeId}><!--[-->`);
              ssrRenderList(unref(visibleStats), (day) => {
                _push2(`<div class="group p-4 flex items-center justify-between hover:bg-indigo-50/50 transition-colors cursor-pointer"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-white transition-all shadow-sm"${_scopeId}><span class="text-[10px] uppercase font-black text-slate-400 leading-none"${_scopeId}>${ssrInterpolate(day.dateObj.format("MMM"))}</span><span class="text-xl font-black leading-none text-slate-700 mt-0.5"${_scopeId}>${ssrInterpolate(day.dateObj.format("DD"))}</span></div><div${_scopeId}><h4 class="font-bold text-slate-700 text-sm capitalize"${_scopeId}>${ssrInterpolate(day.dateObj.format("dddd"))}</h4><span class="text-[11px] text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 mt-1 inline-block"${_scopeId}>${ssrInterpolate(_ctx.$t("transaction_count", { count: day.transactions.length }))}</span></div></div><div class="flex items-center gap-6"${_scopeId}><div class="pl-4 border-l border-slate-100 text-right"${_scopeId}><span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("daily_net"))}</span><span class="${ssrRenderClass([day.total_income - day.total_expense >= 0 ? "text-indigo-600" : "text-orange-500", "text-sm font-black font-mono"])}"${_scopeId}>${ssrInterpolate(day.total_income - day.total_expense >= 0 ? "+" : "")}${ssrInterpolate(unref(formatMoney)(day.total_income - day.total_expense))}</span></div><span class="text-slate-300 group-hover:text-indigo-400 transition-colors"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"${_scopeId}></path></svg></span></div></div>`);
              });
              _push2(`<!--]-->`);
              if (!unref(filterDate) && unref(visibleStats).length === 5) {
                _push2(`<div class="bg-slate-50/50 p-2.5 text-center border-t border-slate-100"${_scopeId}><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"${_scopeId}>${ssrInterpolate(_ctx.$t("old_data_hint"))}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(ssrRenderComponent(ArchiveModal, {
              show: unref(isArchiveOpen),
              dayData: unref(selectedDayData),
              categories: __props.categories,
              close: () => isArchiveOpen.value = false,
              onDelete: triggerDeleteTransaction,
              onEdit: handleEdit
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (localTransactions.value.length) {
              _push2(ssrRenderComponent(_sfc_main$4, {
                transactions: localTransactions.value,
                currentDate: __props.filters.date
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="lg:col-span-2 w-full md:sticky md:top-24 h-fit space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              budgets: localBudgets.value,
              categories: localCategories.value,
              expenseStats: __props.stats.expense_by_category,
              incomeStats: __props.stats.income_by_category,
              onAdd: () => {
                unref(budgetForm).reset();
                unref(budgetForm).id = null;
                showBudgetModal.value = true;
              },
              onDeleteBudget: triggerDeleteBudget,
              onEditBudget: handleEditBudget,
              onAddCategory: handleAddCategory,
              onEditCategory: handleEditCategory,
              onDeleteCategory: triggerDeleteCategory
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(FinanceInsights, {
              "expense-stats": __props.stats.expense_by_category,
              "income-stats": __props.stats.income_by_category,
              budgets: localBudgets.value
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              show: showTransactionModal.value,
              form: unref(transactionForm),
              budgets: localBudgets.value,
              categories: __props.categories,
              close: () => showTransactionModal.value = false,
              submit: submitNewTransaction
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              show: showBudgetModal.value,
              form: unref(budgetForm),
              categories: __props.categories,
              close: () => showBudgetModal.value = false,
              submit: submitNewBudget
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              show: showCategoryModal.value,
              form: unref(categoryForm),
              close: () => showCategoryModal.value = false,
              submit: submitNewCategory
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(FinanceHeader, {
                currentMonth: unref(formattedMonth),
                currentMonthKey: unref(currentMonthKey),
                onChangeDate: (payload) => unref(changeMonth)(payload),
                onAddClick: () => {
                  unref(transactionForm).reset();
                  unref(transactionForm).id = null;
                  showTransactionModal.value = true;
                }
              }, null, 8, ["currentMonth", "currentMonthKey", "onChangeDate", "onAddClick"]),
              createVNode("div", { class: "w-full min-h-screen bg-slate-50/50 px-4 sm:px-6 lg:px-8 py-8" }, [
                createVNode("div", { class: "mb-8" }, [
                  createVNode(_sfc_main$2, {
                    stats: __props.stats,
                    onUpdateTarget: (amount) => unref(updateIncomeTarget)(unref(currentMonthKey), amount)
                  }, null, 8, ["stats", "onUpdateTarget"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-8 items-start" }, [
                  createVNode("div", { class: "lg:col-span-3 space-y-8 w-full" }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("h3", { class: "text-lg font-bold text-slate-800" }, toDisplayString(_ctx.$t("daily_history")), 1),
                          !unref(filterDate) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg"
                          }, toDisplayString(_ctx.$t("last_5")), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg"
                          }, toDisplayString(_ctx.$t("search_result")), 1))
                        ]),
                        createVNode("div", { class: "relative z-30" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("button", {
                              onClick: ($event) => showFilterPicker.value = !showFilterPicker.value,
                              class: ["pl-3 pr-8 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 hover:ring-2 hover:ring-indigo-500/10 transition-all flex items-center gap-2 min-w-[150px] relative", unref(filterDate) ? "text-indigo-600 border-indigo-200" : "text-slate-500"]
                            }, [
                              createVNode("span", { class: "text-base" }, "📅"),
                              createVNode("span", null, toDisplayString(unref(filterDate) ? unref(dayjs)(unref(filterDate)).locale(_ctx.$page.props.locale).format("DD MMM YYYY") : _ctx.$t("date_filter")), 1),
                              createVNode("span", { class: "absolute right-3 text-slate-400 text-[10px]" }, toDisplayString(showFilterPicker.value ? "▲" : "▼"), 1)
                            ], 10, ["onClick"]),
                            unref(filterDate) ? (openBlock(), createBlock("button", {
                              key: 0,
                              onClick: withModifiers(($event) => filterDate.value = "", ["stop"]),
                              class: "text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-all border border-transparent hover:border-rose-100",
                              title: "Hapus Filter"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-4 w-4",
                                viewBox: "0 0 20 20",
                                fill: "currentColor"
                              }, [
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                                  "clip-rule": "evenodd"
                                })
                              ]))
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          createVNode(Transition, {
                            "enter-active-class": "transition ease-out duration-200",
                            "enter-from-class": "opacity-0 translate-y-2",
                            "enter-to-class": "opacity-100 translate-y-0",
                            "leave-active-class": "transition ease-in duration-150",
                            "leave-from-class": "opacity-100 translate-y-0",
                            "leave-to-class": "opacity-0 translate-y-2"
                          }, {
                            default: withCtx(() => [
                              showFilterPicker.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "absolute right-0 top-full mt-2 z-50 origin-top-right"
                              }, [
                                createVNode(_sfc_main$3, {
                                  show: showFilterPicker.value,
                                  modelValue: unref(filterDate),
                                  transactions: localTransactions.value,
                                  "onUpdate:modelValue": (val) => filterDate.value = val,
                                  onClose: ($event) => showFilterPicker.value = false
                                }, null, 8, ["show", "modelValue", "transactions", "onUpdate:modelValue", "onClose"])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      localTransactions.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200"
                      }, [
                        createVNode("div", { class: "text-3xl mb-2" }, "📒"),
                        createVNode("p", { class: "text-slate-400 text-sm font-medium" }, toDisplayString(_ctx.$t("no_transaction")), 1)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-50"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleStats), (day) => {
                          return openBlock(), createBlock("div", {
                            key: day.date,
                            onClick: ($event) => unref(openDetail)(day),
                            class: "group p-4 flex items-center justify-between hover:bg-indigo-50/50 transition-colors cursor-pointer"
                          }, [
                            createVNode("div", { class: "flex items-center gap-4" }, [
                              createVNode("div", { class: "w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-white transition-all shadow-sm" }, [
                                createVNode("span", { class: "text-[10px] uppercase font-black text-slate-400 leading-none" }, toDisplayString(day.dateObj.format("MMM")), 1),
                                createVNode("span", { class: "text-xl font-black leading-none text-slate-700 mt-0.5" }, toDisplayString(day.dateObj.format("DD")), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("h4", { class: "font-bold text-slate-700 text-sm capitalize" }, toDisplayString(day.dateObj.format("dddd")), 1),
                                createVNode("span", { class: "text-[11px] text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 mt-1 inline-block" }, toDisplayString(_ctx.$t("transaction_count", { count: day.transactions.length })), 1)
                              ])
                            ]),
                            createVNode("div", { class: "flex items-center gap-6" }, [
                              createVNode("div", { class: "pl-4 border-l border-slate-100 text-right" }, [
                                createVNode("span", { class: "block text-[9px] font-bold text-slate-400 uppercase tracking-wider" }, toDisplayString(_ctx.$t("daily_net")), 1),
                                createVNode("span", {
                                  class: ["text-sm font-black font-mono", day.total_income - day.total_expense >= 0 ? "text-indigo-600" : "text-orange-500"]
                                }, toDisplayString(day.total_income - day.total_expense >= 0 ? "+" : "") + toDisplayString(unref(formatMoney)(day.total_income - day.total_expense)), 3)
                              ]),
                              createVNode("span", { class: "text-slate-300 group-hover:text-indigo-400 transition-colors" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-5 w-5",
                                  viewBox: "0 0 20 20",
                                  fill: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "fill-rule": "evenodd",
                                    d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                                    "clip-rule": "evenodd"
                                  })
                                ]))
                              ])
                            ])
                          ], 8, ["onClick"]);
                        }), 128)),
                        !unref(filterDate) && unref(visibleStats).length === 5 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-slate-50/50 p-2.5 text-center border-t border-slate-100"
                        }, [
                          createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest" }, toDisplayString(_ctx.$t("old_data_hint")), 1)
                        ])) : createCommentVNode("", true)
                      ])),
                      createVNode(ArchiveModal, {
                        show: unref(isArchiveOpen),
                        dayData: unref(selectedDayData),
                        categories: __props.categories,
                        close: () => isArchiveOpen.value = false,
                        onDelete: triggerDeleteTransaction,
                        onEdit: handleEdit
                      }, null, 8, ["show", "dayData", "categories", "close"])
                    ]),
                    localTransactions.value.length ? (openBlock(), createBlock(_sfc_main$4, {
                      key: 0,
                      transactions: localTransactions.value,
                      currentDate: __props.filters.date
                    }, null, 8, ["transactions", "currentDate"])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "lg:col-span-2 w-full md:sticky md:top-24 h-fit space-y-6" }, [
                    createVNode(_sfc_main$5, {
                      budgets: localBudgets.value,
                      categories: localCategories.value,
                      expenseStats: __props.stats.expense_by_category,
                      incomeStats: __props.stats.income_by_category,
                      onAdd: () => {
                        unref(budgetForm).reset();
                        unref(budgetForm).id = null;
                        showBudgetModal.value = true;
                      },
                      onDeleteBudget: triggerDeleteBudget,
                      onEditBudget: handleEditBudget,
                      onAddCategory: handleAddCategory,
                      onEditCategory: handleEditCategory,
                      onDeleteCategory: triggerDeleteCategory
                    }, null, 8, ["budgets", "categories", "expenseStats", "incomeStats", "onAdd"]),
                    createVNode(FinanceInsights, {
                      "expense-stats": __props.stats.expense_by_category,
                      "income-stats": __props.stats.income_by_category,
                      budgets: localBudgets.value
                    }, null, 8, ["expense-stats", "income-stats", "budgets"])
                  ])
                ]),
                createVNode(_sfc_main$6, {
                  show: showTransactionModal.value,
                  form: unref(transactionForm),
                  budgets: localBudgets.value,
                  categories: __props.categories,
                  close: () => showTransactionModal.value = false,
                  submit: submitNewTransaction
                }, null, 8, ["show", "form", "budgets", "categories", "close"]),
                createVNode(_sfc_main$7, {
                  show: showBudgetModal.value,
                  form: unref(budgetForm),
                  categories: __props.categories,
                  close: () => showBudgetModal.value = false,
                  submit: submitNewBudget
                }, null, 8, ["show", "form", "categories", "close"]),
                createVNode(_sfc_main$8, {
                  show: showCategoryModal.value,
                  form: unref(categoryForm),
                  close: () => showCategoryModal.value = false,
                  submit: submitNewCategory
                }, null, 8, ["show", "form", "close"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
