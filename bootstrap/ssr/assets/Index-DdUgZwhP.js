import { ref, watch, computed, reactive, onMounted, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DzWwanC6.js";
import { _ as _sfc_main$2 } from "./OneForMindIcon-XdjRmiFl.js";
import { useForm, router, usePage, Head } from "@inertiajs/vue3";
import dayjs from "dayjs";
import FinanceHeader from "./FinanceHeader-CoI5Nasa.js";
import _sfc_main$1 from "./FinanceStats-C0TUAz5n.js";
import _sfc_main$5 from "./BudgetSidebar-B0zBNxsz.js";
import TransactionModal from "./TransactionModal-L2LFmX15.js";
import _sfc_main$7 from "./BudgetModal-BYd_Qwgx.js";
import _sfc_main$8 from "./CategoryModal-DzJEpHWn.js";
import DailyTrendChart from "./DailyTrendChart-DC_TiQgJ.js";
import ArchiveModal from "./ArchiveModal-BYuAFBxR.js";
import FullArchiveModal from "./FullArchiveModal-CI0PCYS_.js";
import _sfc_main$3 from "./FinanceDatePicker-CxOhCf2w.js";
import FinanceBatchModal from "./FinanceBatchModal-Bd5fJvxn.js";
import { u as useFinanceForm, F as FinanceInsights } from "./FinanceInsights-26cNce9n.js";
import _sfc_main$4 from "./SavingCard-C3qPUs9X.js";
import _sfc_main$9 from "./SavingModal-DY2vbql9.js";
import _sfc_main$a from "./VaultTransactionModal-Bt0fhf-P.js";
import { _ as _sfc_main$6 } from "./NeuralBridge-CF2Ttk4F.js";
import { Wallet, Plus } from "lucide-vue-next";
import Swal from "sweetalert2";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import { trans } from "laravel-vue-i18n";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { u as useFinanceHistory } from "./useFinanceHistory-6kktt4HE.js";
import { u as useGating } from "./useGating-Dlt-HuEc.js";
import "./ThemeToggle-ByQSx4Ee.js";
import "./useAppearance-rDoGVD4_.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Modal-BOdkfMB5.js";
import "./PrimaryButton-DPmleQI_.js";
import "./SecondaryButton-BgIg9sGF.js";
import "vue-chartjs";
import "chart.js";
import "dayjs/plugin/localeData.js";
import "./TextInput-xTq3OG6l.js";
function useFinanceBatch(currentDateRef) {
  const isBatchModalOpen = ref(false);
  const globalConflictError = ref(null);
  const { cleanAmount } = useFinanceFormat();
  const t = (key, fallback) => {
    const result = trans(key);
    return result !== key ? result : fallback;
  };
  const fireToast = (icon, message) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2e3,
      timerProgressBar: true,
      background: "#4f46e5",
      iconColor: "#ffffff",
      icon,
      title: `<span style="color: white; font-weight: 900; font-size: 14px; line-height: 1.2;">${message}</span>`,
      customClass: {
        container: "!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end",
        popup: "!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !m-0 !w-auto !min-w-[280px]",
        timerProgressBar: "!bg-white/40 !h-1 !rounded-b-full"
      }
    });
  };
  const batchForm = useForm({
    date: currentDateRef.value,
    transactions: [
      { type: "expense", category: "", title: "", amount: "" }
    ]
  });
  watch(() => currentDateRef.value, (newDate) => {
    if (!isBatchModalOpen.value) {
      batchForm.date = newDate;
    }
  });
  const openBatchModal = () => {
    batchForm.reset();
    batchForm.date = currentDateRef.value;
    batchForm.transactions = [{ type: "expense", category: "", title: "", amount: "" }];
    batchForm.clearErrors();
    globalConflictError.value = null;
    isBatchModalOpen.value = true;
  };
  const closeBatchModal = () => {
    isBatchModalOpen.value = false;
    batchForm.reset();
    batchForm.clearErrors();
  };
  const addBatchRow = () => {
    batchForm.transactions.push({ type: "expense", category: "", title: "", amount: "" });
  };
  const removeBatchRow = (index) => {
    if (batchForm.transactions.length > 1) {
      batchForm.transactions.splice(index, 1);
    }
  };
  const validateBatch = () => {
    batchForm.clearErrors();
    globalConflictError.value = null;
    let isValid = true;
    if (!batchForm.date) {
      fireToast("warning", t("warn_empty_date", "Pilih tanggal transaksi!"));
      return false;
    }
    batchForm.transactions.forEach((trx, index) => {
      if (!trx.title) {
        batchForm.setError(`transactions.${index}.title`, t("warn_empty_title", "Required"));
        isValid = false;
      }
      if (!trx.category) {
        batchForm.setError(`transactions.${index}.category`, t("warn_empty_category", "Required"));
        isValid = false;
      }
      if (!trx.amount || cleanAmount(trx.amount) <= 0) {
        batchForm.setError(`transactions.${index}.amount`, t("warn_empty_amount", "Required"));
        isValid = false;
      }
    });
    if (!isValid) {
      fireToast("warning", t("warn_empty_fields", "Lengkapi semua baris transaksi!"));
    }
    return isValid;
  };
  const submitBatch = ({ onOptimistic, onSuccess, onError } = {}) => {
    if (!validateBatch()) return;
    const payload = {
      date: batchForm.date,
      transactions: batchForm.transactions.map((t2) => ({
        ...t2,
        amount: cleanAmount(t2.amount)
      }))
    };
    const optimisticTransactions = payload.transactions.map((t2, idx) => ({
      ...t2,
      id: "temp_batch_" + Date.now() + "_" + idx,
      // ID Sementara
      date: payload.date,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    }));
    if (onOptimistic) onOptimistic(optimisticTransactions);
    closeBatchModal();
    fireToast("success", t("success_saved", "Batch Saved!"));
    router.post(route("finance.transaction.batchStore"), payload, {
      preserveScroll: true,
      preserveState: true,
      progress: false,
      // Matikan loading bar atas
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
      onError: (err) => {
        if (onError) onError(optimisticTransactions.map((t2) => t2.id));
        batchForm.date = payload.date;
        batchForm.transactions = payload.transactions;
        isBatchModalOpen.value = true;
        fireToast("error", Object.values(err)[0] || t("err_save_failed", "Gagal menyimpan data!"));
      }
    });
  };
  return {
    isBatchModalOpen,
    batchForm,
    globalConflictError,
    openBatchModal,
    closeBatchModal,
    addBatchRow,
    removeBatchRow,
    submitBatch
  };
}
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
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AuthenticatedLayout }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    transactions: Array,
    budgets: Array,
    stats: Object,
    filters: Object,
    categories: Array,
    savings: Array
  },
  setup(__props) {
    const { tier, canUse, isExplorer, isArchitect, isQuantum, isLegendary } = useGating();
    const props = __props;
    const page = usePage();
    const localTransactions = ref([...props.transactions || []]);
    const localBudgets = ref([...props.budgets || []]);
    const localCategories = ref([...props.categories || []]);
    const localSavings = ref([...props.savings || []]);
    const localStats = ref(JSON.parse(JSON.stringify(props.stats || {})));
    const showSavingModal = ref(false);
    const activeSaving = ref(null);
    const isSavingVault = ref(false);
    const showVaultTxModal = ref(false);
    const vaultTxType = ref("deposit");
    const activeVault = ref(null);
    const isProcessingVaultTx = ref(false);
    const handleEditSaving = (saving = null) => {
      if (!saving) {
        activeSaving.value = {
          id: null,
          title: "",
          target_amount: "",
          icon: "🏦",
          color: "#6366f1"
        };
      } else {
        activeSaving.value = saving;
      }
      showSavingModal.value = true;
    };
    const handleStoreSaving = (form) => {
      const tempId = "temp_" + Date.now();
      const originalSavings = [...localSavings.value];
      localSavings.value.push({ ...form, id: tempId, current_amount: 0 });
      isSavingVault.value = true;
      showSavingModal.value = false;
      router.post(route("finance.savings.store"), form, {
        preserveScroll: true,
        onSuccess: (page2) => {
          localSavings.value = [...page2.props.savings || []];
          localStorage.setItem("dfm_local_savings", JSON.stringify(localSavings.value));
        },
        onFinish: () => {
          isSavingVault.value = false;
        },
        onError: () => {
          showSavingModal.value = true;
          localSavings.value = originalSavings;
          isProcessingVaultTx.value = false;
        }
      });
    };
    const handleUpdateSaving = (form) => {
      const originalSavings = JSON.parse(JSON.stringify(localSavings.value));
      const idx = localSavings.value.findIndex((s) => s.id === form.id);
      if (idx !== -1) localSavings.value[idx] = { ...localSavings.value[idx], ...form };
      showSavingModal.value = false;
      isSavingVault.value = true;
      router.put(route("finance.savings.update", form.id), form, {
        preserveScroll: true,
        onFinish: () => {
          isSavingVault.value = false;
        },
        onError: () => {
          showSavingModal.value = true;
          localSavings.value = originalSavings;
          isSavingVault.value = false;
        }
      });
    };
    const handleDeleteSaving = (saving) => {
      const msg = saving.current_amount > 0 ? page.props.words["vault_close_refund_confirm"].replace(":amount", formatMoney(saving.current_amount)) : page.props.words["vault_close_confirm"];
      if (confirm(msg)) {
        const originalSavings = [...localSavings.value];
        const originalStats = JSON.parse(JSON.stringify(localStats.value));
        if (saving.current_amount > 0) {
          updateLocalStatsInstantly("income", "saving", saving.current_amount, false);
          localStats.value.total_savings -= Number(saving.current_amount);
        }
        localSavings.value = localSavings.value.filter((s) => s.id !== saving.id);
        router.delete(route("finance.savings.destroy", saving.id), {
          data: { date: dayjs().format("YYYY-MM-DD") },
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page2) => {
            localSavings.value = [...page2.props.savings || []];
            localStorage.setItem("dfm_local_savings", JSON.stringify(localSavings.value));
          },
          onError: () => {
            localSavings.value = originalSavings;
            localStats.value = originalStats;
          }
        });
      }
    };
    const openVaultAction = (saving, action = "deposit") => {
      activeVault.value = saving;
      vaultTxType.value = action;
      showVaultTxModal.value = false;
      nextTick(() => {
        showVaultTxModal.value = true;
      });
    };
    const handleVaultTransaction = (data) => {
      const saving = activeVault.value;
      const action = data.type;
      const numAmount = data.amount;
      const originalSavings = JSON.parse(JSON.stringify(localSavings.value));
      const originalStats = JSON.parse(JSON.stringify(localStats.value));
      const idx = localSavings.value.findIndex((s) => s.id === saving.id);
      if (idx !== -1) {
        if (action === "deposit") {
          localSavings.value[idx].current_amount = Number(localSavings.value[idx].current_amount) + numAmount;
          localStats.value.balance -= numAmount;
          localStats.value.total_savings += numAmount;
        } else {
          localSavings.value[idx].current_amount = Number(localSavings.value[idx].current_amount) - numAmount;
          localStats.value.balance += numAmount;
          localStats.value.total_savings -= numAmount;
        }
      }
      showVaultTxModal.value = false;
      isProcessingVaultTx.value = true;
      router.post(route(`finance.savings.${action}`, saving.id), {
        amount: numAmount,
        date: data.date
      }, {
        onSuccess: (page2) => {
          localSavings.value = [...page2.props.savings || []];
          localStats.value = JSON.parse(JSON.stringify(page2.props.stats || {}));
          localStorage.setItem("dfm_local_savings", JSON.stringify(localSavings.value));
        },
        onFinish: () => {
          isProcessingVaultTx.value = false;
        },
        onError: () => {
          localSavings.value = originalSavings;
          localStats.value = originalStats;
          isProcessingVaultTx.value = false;
          showVaultTxModal.value = true;
        }
      });
    };
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
    const showFullHistoryModal = ref(false);
    const filterDateRef = ref(props.filters.date || dayjs().format("YYYY-MM-DD"));
    const {
      isBatchModalOpen,
      batchForm,
      globalConflictError,
      openBatchModal,
      closeBatchModal,
      addBatchRow,
      removeBatchRow,
      submitBatch: executeBatch
    } = useFinanceBatch(filterDateRef);
    const { visibleStats, allStats, filterDate, isArchiveOpen, selectedDayData, openDetail } = useFinanceHistory(historyProps);
    const { formatMoney } = useFinanceFormat();
    const handleEdit = (trx) => {
      setEditTransaction(trx);
      showTransactionModal.value = true;
    };
    const handleUpdateTarget = (newAmount) => {
      localStats.value.income_target = Number(newAmount);
      updateIncomeTarget(currentMonthKey.value, newAmount);
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
    const updateLocalStatsInstantly = (type, categorySlug, amount, isSubtract = false) => {
      const val = Number(amount) * (isSubtract ? -1 : 1);
      if (type === "income") {
        localStats.value.total_income += val;
        localStats.value.balance += val;
        if (!localStats.value.income_by_category[categorySlug]) localStats.value.income_by_category[categorySlug] = 0;
        localStats.value.income_by_category[categorySlug] += val;
      } else if (type === "expense") {
        localStats.value.total_expense += val;
        localStats.value.balance -= val;
        if (!localStats.value.expense_by_category[categorySlug]) localStats.value.expense_by_category[categorySlug] = 0;
        localStats.value.expense_by_category[categorySlug] += val;
      }
    };
    const handleOptimisticInvestment = (data) => {
      const optData = { id: `temp_${Date.now()}`, ...data };
      localTransactions.value.unshift(optData);
      updateLocalStatsInstantly(data.type, data.category, data.amount, false);
    };
    const submitNewTransaction = () => {
      const oldTrx = transactionForm.id ? localTransactions.value.find((t) => t.id === transactionForm.id) : null;
      const oldAmount = oldTrx ? Number(oldTrx.amount) : 0;
      const oldType = oldTrx ? oldTrx.type : null;
      const oldCategory = oldTrx ? oldTrx.category : null;
      submitTransaction({
        onOptimistic: (data, isEditing) => {
          showTransactionModal.value = false;
          if (isEditing) {
            const idx = localTransactions.value.findIndex((t) => t.id === data.id);
            if (idx !== -1) Object.assign(localTransactions.value[idx], data);
            if (oldType) updateLocalStatsInstantly(oldType, oldCategory, oldAmount, true);
            updateLocalStatsInstantly(data.type, data.category, data.amount, false);
          } else {
            localTransactions.value.unshift(data);
            updateLocalStatsInstantly(data.type, data.category, data.amount, false);
          }
        },
        onError: () => {
          showTransactionModal.value = true;
        }
      });
    };
    const triggerDeleteTransaction = (id) => {
      isArchiveOpen.value = false;
      const target = localTransactions.value.find((t) => t.id === id);
      deleteTransaction(id, {
        onOptimistic: (targetId) => {
          if (target) updateLocalStatsInstantly(target.type, target.category, target.amount, true);
          localTransactions.value = localTransactions.value.filter((t) => t.id !== targetId);
        }
      });
    };
    const triggerSubmitBatch = () => {
      executeBatch({
        onOptimistic: (newTransactionsArray) => {
          localTransactions.value.unshift(...newTransactionsArray);
          newTransactionsArray.forEach((data) => updateLocalStatsInstantly(data.type, data.category, data.amount, false));
        },
        onError: (tempIdsArray) => {
          localTransactions.value = localTransactions.value.filter((t) => !tempIdsArray.includes(t.id));
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
            const catIdx = localCategories.value.findIndex((c) => c.slug === data.category);
            if (catIdx !== -1) {
              localCategories.value[catIdx].name = data.name;
              localCategories.value[catIdx].icon = data.icon;
            }
          } else {
            localBudgets.value.push(data);
            if (!localCategories.value.find((c) => c.slug === data.category)) {
              localCategories.value.push({ id: "temp_" + Date.now(), slug: data.category, name: data.name, icon: data.icon, type: "expense" });
            }
          }
        },
        onError: (id, isEditing) => {
          if (!isEditing) localBudgets.value = localBudgets.value.filter((b) => b.id !== id);
          showBudgetModal.value = true;
        }
      });
    };
    const submitNewCategory = () => {
      showCategoryModal.value = false;
      submitCategory({
        onOptimistic: (data, isEditing) => {
          if (isEditing) {
            const idx = localCategories.value.findIndex((c) => c.id === data.id);
            if (idx !== -1) {
              localCategories.value[idx].name = data.name;
              localCategories.value[idx].icon = data.icon;
            }
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
    const triggerDeleteBudget = (id) => {
      deleteBudget(id, { onOptimistic: (targetId) => {
        localBudgets.value = localBudgets.value.filter((b) => b.id !== targetId);
      } });
    };
    const triggerDeleteCategory = (cat) => {
      deleteCategory(cat, { onOptimistic: (targetId) => {
        localCategories.value = localCategories.value.filter((c) => c.id !== targetId);
      } });
    };
    const switchToBatch = () => {
      showTransactionModal.value = false;
      setTimeout(() => {
        openBatchModal();
      }, 150);
    };
    const switchToSingle = () => {
      closeBatchModal();
      setTimeout(() => {
        transactionForm.reset();
        transactionForm.id = null;
        showTransactionModal.value = true;
      }, 150);
    };
    const isMobile = ref(false);
    onMounted(() => {
      isMobile.value = window.innerWidth < 1024;
      window.addEventListener("resize", () => {
        isMobile.value = window.innerWidth < 1024;
      });
      const storedSavings = localStorage.getItem("dfm_local_savings");
      if (storedSavings && localSavings.value.length === 0) {
        localSavings.value = JSON.parse(storedSavings);
      }
    });
    watch(() => props.savings, (newSavings) => {
      localSavings.value = [...newSavings || []];
      localStorage.setItem("dfm_local_savings", JSON.stringify(localSavings.value));
    }, { deep: true });
    watch(() => props.stats, (newStats) => {
      localStats.value = JSON.parse(JSON.stringify(newStats || {}));
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(Head), { title: "Finance Plan" }, null, _parent));
      _push(ssrRenderComponent(FinanceHeader, {
        currentMonth: unref(formattedMonth),
        currentMonthKey: unref(currentMonthKey),
        onChangeDate: (payload) => unref(changeMonth)(payload),
        onAddClick: () => {
          unref(transactionForm).reset();
          unref(transactionForm).id = null;
          showTransactionModal.value = true;
        },
        isExplorer: unref(isExplorer)
      }, null, _parent));
      _push(`<div class="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950/50 px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-500">`);
      if (!isMobile.value) {
        _push(`<div class="mb-8">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          stats: localStats.value,
          onUpdateTarget: handleUpdateTarget
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!isMobile.value) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"><div class="lg:col-span-3 space-y-8 w-full"><div class="space-y-4"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div class="flex items-center gap-2"><h3 class="text-lg font-bold text-slate-800 dark:text-white transition-colors duration-500">${ssrInterpolate(_ctx.$t("daily_history"))}</h3>`);
        if (!unref(filterDate)) {
          _push(`<span class="text-[10px] font-bold text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">${ssrInterpolate(_ctx.$t("last_5"))}</span>`);
        } else {
          _push(`<span class="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">${ssrInterpolate(_ctx.$t("search_result"))}</span>`);
        }
        _push(`</div>`);
        if (!unref(filterDate)) {
          _push(`<button class="text-[10px] font-black text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 sm:ml-auto flex items-center gap-1.5 transition-all active:scale-95 group"><span class="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">`);
          _push(ssrRenderComponent(_sfc_main$2, {
            name: "calendar-history",
            size: "14",
            "stroke-width": "2.5"
          }, null, _parent));
          _push(`</span> ${ssrInterpolate(_ctx.$t("view_full_archive", "Arsip Lengkap"))}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center gap-2"><div class="relative"><button class="${ssrRenderClass([unref(filterDate) ? "text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30" : "text-slate-500 dark:text-slate-400", "pl-3 pr-8 py-2 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-none hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:ring-2 hover:ring-indigo-500/10 transition-all flex items-center gap-2 min-w-[150px] relative transition-colors duration-500"])}"><span class="text-base">📅</span><span>${ssrInterpolate(unref(filterDate) ? unref(dayjs)(unref(filterDate)).locale(_ctx.$page.props.locale).format("DD MMM YYYY") : _ctx.$t("date_filter"))}</span><span class="absolute right-3 text-slate-400 dark:text-slate-600 text-[10px]">${ssrInterpolate(showFilterPicker.value ? "▲" : "▼")}</span></button>`);
        if (showFilterPicker.value) {
          _push(`<div class="absolute right-0 top-full mt-2 z-50 origin-top-right">`);
          _push(ssrRenderComponent(_sfc_main$3, {
            show: showFilterPicker.value,
            modelValue: unref(filterDate),
            transactions: localTransactions.value,
            "onUpdate:modelValue": (val) => filterDate.value = val,
            onClose: ($event) => showFilterPicker.value = false
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(filterDate)) {
          _push(`<button class="text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-1.5 rounded-lg transition-all border border-transparent hover:border-rose-100 dark:hover:border-rose-500/20" title="Hapus Filter"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (localTransactions.value.length === 0) {
          _push(`<div class="py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-sm dark:shadow-none mt-4 transition-colors duration-500"><div class="flex flex-col items-center gap-4"><span class="text-5xl animate-bounce">💸</span><p class="text-sm font-bold text-slate-400 dark:text-slate-600 px-8">${ssrInterpolate(_ctx.$t("no_transaction", "Belum ada transaksi di bulan ini"))}</p><button class="mt-2 bg-indigo-600 text-white font-black py-2.5 px-6 rounded-xl shadow-lg dark:shadow-none shadow-indigo-100 dark:shadow-indigo-900/40 hover:bg-indigo-700 active:scale-95 transition-all outline-none"> + ${ssrInterpolate(_ctx.$t("record_transaction", "Catat Transaksi"))}</button></div></div>`);
        } else {
          _push(`<div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-50 dark:divide-slate-800/50 transition-colors duration-500"><!--[-->`);
          ssrRenderList(unref(visibleStats), (day) => {
            _push(`<div class="group p-4 flex items-center justify-between hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 transition-colors cursor-pointer"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center group-hover:bg-white dark:group-hover:bg-slate-700 transition-all shadow-sm"><span class="text-[10px] uppercase font-black text-slate-400 dark:text-slate-600 leading-none">${ssrInterpolate(day.dateObj.format("MMM"))}</span><span class="text-xl font-black leading-none text-slate-700 dark:text-slate-200 mt-0.5 transition-colors duration-500">${ssrInterpolate(day.dateObj.format("DD"))}</span></div><div><h4 class="font-bold text-slate-700 dark:text-white text-sm capitalize transition-colors duration-500">${ssrInterpolate(day.dateObj.format("dddd"))}</h4><span class="text-[11px] text-slate-400 dark:text-slate-500 font-bold bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700 mt-1 inline-block transition-colors duration-500">${ssrInterpolate(_ctx.$t("transaction_count", { count: day.transactions.length }))}</span></div></div><div class="flex items-center gap-6"><div class="pl-4 border-l border-slate-100 dark:border-slate-800 text-right"><span class="block text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-wider">${ssrInterpolate(_ctx.$t("daily_net"))}</span><span class="${ssrRenderClass([day.total_income - day.total_expense >= 0 ? "text-indigo-600 dark:text-indigo-400" : "text-orange-500 dark:text-orange-400", "text-sm font-black font-mono transition-colors duration-500"])}">${ssrInterpolate(day.total_income - day.total_expense >= 0 ? "+" : "")}${ssrInterpolate(unref(formatMoney)(day.total_income - day.total_expense))}</span></div><span class="text-slate-300 dark:text-slate-700 group-hover:text-indigo-400 dark:group-hover:text-indigo-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></span></div></div>`);
          });
          _push(`<!--]-->`);
          if (!unref(filterDate) && unref(allStats).length > 5) {
            _push(`<div class="bg-slate-50/50 dark:bg-slate-800/50 p-2.5 text-center border-t border-slate-100 dark:border-slate-800 transition-colors duration-500"><p class="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">${ssrInterpolate(_ctx.$t("old_data_hint"))}</p></div>`);
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
          onDelete: triggerDeleteTransaction,
          onEdit: handleEdit
        }, null, _parent));
        _push(ssrRenderComponent(FullArchiveModal, {
          show: showFullHistoryModal.value,
          allStats: unref(allStats),
          categories: __props.categories,
          close: () => showFullHistoryModal.value = false,
          onDelete: triggerDeleteTransaction,
          onEdit: handleEdit
        }, null, _parent));
        _push(`</div><div class="space-y-6 relative group">`);
        if (unref(isExplorer)) {
          _push(`<div class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/20 dark:bg-slate-900/20 backdrop-blur-md rounded-[3rem] border border-slate-200 dark:border-slate-800 cursor-pointer group-hover:bg-white/40 dark:group-hover:bg-slate-900/40 transition-all duration-500"><div class="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-3xl mb-4 border border-slate-100 dark:border-slate-700">🔒</div><h4 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest tracking-tighter">The Vault (Wealth)</h4><p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">Architect Feature</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">`);
        _push(ssrRenderComponent(unref(Wallet), { size: 20 }, null, _parent));
        _push(`</div><div><h3 class="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">The Vault</h3><p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-0.5">Your wealth manifestation</p></div></div><button class="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95">`);
        _push(ssrRenderComponent(unref(Plus), { size: 14 }, null, _parent));
        _push(` Create Goal </button></div>`);
        if (localSavings.value.length === 0) {
          _push(`<div class="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center transition-colors"><div class="mb-4 text-4xl transform group-hover:scale-110 transition-transform duration-500">🏦</div><h4 class="text-slate-400 font-bold text-sm mb-4">You have no active saving goals yet.</h4><button class="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 px-6 py-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all"> Start Saving Now </button></div>`);
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
          ssrRenderList(localSavings.value, (saving) => {
            _push(ssrRenderComponent(_sfc_main$4, {
              key: saving.id,
              saving,
              onDeposit: (s) => openVaultAction(s, "deposit"),
              onWithdraw: (s) => openVaultAction(s, "withdraw"),
              onEdit: handleEditSaving,
              onDelete: handleDeleteSaving
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
        if (localTransactions.value.length) {
          _push(ssrRenderComponent(DailyTrendChart, {
            transactions: localTransactions.value,
            currentDate: __props.filters.date,
            isExplorer: unref(isExplorer),
            onDayClick: unref(openDetail)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="lg:col-span-2 w-full md:sticky md:top-24 h-fit space-y-6">`);
        _push(ssrRenderComponent(_sfc_main$5, {
          budgets: localBudgets.value,
          categories: localCategories.value,
          expenseStats: localStats.value.expense_by_category,
          incomeStats: localStats.value.income_by_category,
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
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$6, { module: "Finance" }, null, _parent));
        _push(ssrRenderComponent(FinanceInsights, {
          "expense-stats": localStats.value.expense_by_category,
          "income-stats": localStats.value.income_by_category,
          budgets: localBudgets.value,
          isExplorer: unref(isExplorer),
          onUpdateStats: handleOptimisticInvestment
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="space-y-8 pb-40 px-2 lg:px-0"><div id="mobile-finance-card" class="bg-indigo-600 p-8 rounded-[3rem] shadow-2xl shadow-indigo-200 dark:shadow-none text-white relative overflow-hidden group active:scale-95 transition-all duration-500"><div class="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div><div class="absolute -left-12 -bottom-12 w-48 h-48 bg-black/20 rounded-full blur-2xl"></div><div class="relative z-10"><div class="flex justify-between items-start mb-10"><div><p class="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Current Balance</p><h2 id="mobile-balance" class="text-4xl font-black tracking-tighter">${ssrInterpolate(unref(formatMoney)(localStats.value.balance))}</h2></div><div class="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          name: "finance",
          size: "24",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</div></div><div class="grid grid-cols-2 gap-4"><div class="bg-white/10 p-5 rounded-[2rem] border border-white/10 backdrop-blur-sm"><p class="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Income</p><p class="text-lg font-black tracking-tight">${ssrInterpolate(unref(formatMoney)(localStats.value.total_income))}</p></div><div class="bg-white/10 p-5 rounded-[2rem] border border-white/10 backdrop-blur-sm"><p class="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Expense</p><p class="text-lg font-black text-rose-300 tracking-tight">${ssrInterpolate(unref(formatMoney)(localStats.value.total_expense))}</p></div></div><div class="mt-8 pt-6 border-t border-white/10 flex items-center justify-between"><span class="text-[10px] font-black uppercase tracking-widest opacity-60">Monthly Budget</span><div class="flex items-center gap-3"><div class="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden"><div class="bg-white h-full" style="${ssrRenderStyle(`width: ${Math.min(100, localStats.value.total_expense / (localStats.value.total_income || 1) * 100)}%`)}"></div></div><span class="text-[10px] font-black">${ssrInterpolate(Math.round(localStats.value.total_expense / (localStats.value.total_income || 1) * 100))}%</span></div></div></div></div><div class="space-y-4"><div class="flex items-center justify-between px-2"><h3 class="text-xs font-black uppercase tracking-widest text-slate-400">Spending By Group</h3></div><div class="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-2 px-2"><!--[-->`);
        ssrRenderList(localStats.value.expense_by_category, (amount, cat) => {
          var _a;
          _push(`<div class="shrink-0 bg-white dark:bg-slate-900 px-5 py-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3 active:scale-95 transition-all"><div class="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg">${ssrInterpolate(((_a = __props.categories.find((c) => c.slug === cat)) == null ? void 0 : _a.icon) || "💸")}</div><div><p class="text-[9px] font-black text-slate-400 uppercase tracking-tight">${ssrInterpolate(cat)}</p><p class="text-xs font-black text-slate-800 dark:text-slate-100 leading-none">${ssrInterpolate(unref(formatMoney)(amount))}</p></div></div>`);
        });
        _push(`<!--]--></div></div><div class="space-y-4"><div class="flex items-center justify-between px-2"><h3 class="text-xs font-black uppercase tracking-widest text-slate-400">Activity Timeline</h3><button class="text-[10px] font-black text-indigo-600">See All</button></div>`);
        if (localTransactions.value.length === 0) {
          _push(`<div class="py-16 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800"><p class="text-sm font-black text-slate-400">No transactions recorded.</p><button class="mt-4 text-[10px] bg-indigo-600 text-white px-6 py-2 rounded-full">Add First</button></div>`);
        } else {
          _push(`<div class="space-y-3"><!--[-->`);
          ssrRenderList(localTransactions.value.slice(0, 10), (trx) => {
            _push(`<div${ssrRenderAttr("id", "mobile-trx-" + trx.id)} class="group bg-white dark:bg-slate-900 p-5 rounded-[2.2rem] border border-slate-50 dark:border-slate-800 flex items-center justify-between active:scale-[0.98] transition-all duration-300 hover:shadow-lg"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl transition-transform group-hover:scale-110">${ssrInterpolate(trx.category_icon || "💸")}</div><div class="min-w-0"><h4 class="text-sm font-black text-slate-800 dark:text-white leading-tight truncate">${ssrInterpolate(trx.title)}</h4><p class="text-[10px] font-bold text-slate-400 capitalize tracking-tight">${ssrInterpolate(unref(dayjs)(trx.date).format("DD MMM"))} • ${ssrInterpolate(trx.category_name)}</p></div></div><div class="text-right shrink-0 ml-4"><p class="${ssrRenderClass([trx.type === "income" ? "text-emerald-500" : "text-slate-900 dark:text-white", "text-sm font-black font-mono tracking-tighter"])}">${ssrInterpolate(trx.type === "income" ? "+" : "-")}${ssrInterpolate(unref(formatMoney)(trx.amount))}</p>`);
            if (trx.type === "expense") {
              _push(ssrRenderComponent(_sfc_main$2, {
                name: "chevron-right",
                size: "10",
                class: "text-slate-300 ml-auto mt-1"
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(FinanceInsights, {
          "expense-stats": localStats.value.expense_by_category,
          "income-stats": localStats.value.income_by_category,
          budgets: localBudgets.value,
          onUpdateStats: handleOptimisticInvestment
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(TransactionModal, {
        show: showTransactionModal.value,
        form: unref(transactionForm),
        budgets: localBudgets.value,
        categories: __props.categories,
        close: () => showTransactionModal.value = false,
        submit: submitNewTransaction,
        onSwitchToBatch: switchToBatch
      }, null, _parent));
      _push(ssrRenderComponent(FinanceBatchModal, {
        show: unref(isBatchModalOpen),
        form: unref(batchForm),
        categories: __props.categories,
        budgets: localBudgets.value,
        conflictError: unref(globalConflictError),
        close: unref(closeBatchModal),
        submit: triggerSubmitBatch,
        addRow: unref(addBatchRow),
        removeRow: unref(removeBatchRow),
        switchToSingle
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$7, {
        show: showBudgetModal.value,
        form: unref(budgetForm),
        categories: __props.categories,
        close: () => showBudgetModal.value = false,
        submit: submitNewBudget
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$8, {
        show: showCategoryModal.value,
        form: unref(categoryForm),
        close: () => showCategoryModal.value = false,
        submit: submitNewCategory
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        show: showSavingModal.value,
        saving: activeSaving.value,
        processing: isSavingVault.value,
        onClose: ($event) => showSavingModal.value = false,
        onSave: (form) => form.id ? handleUpdateSaving(form) : handleStoreSaving(form)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        show: showVaultTxModal.value,
        saving: activeVault.value,
        type: vaultTxType.value,
        processing: isProcessingVaultTx.value,
        onClose: ($event) => showVaultTxModal.value = false,
        onSave: handleVaultTransaction
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
