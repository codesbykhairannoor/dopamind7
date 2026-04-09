import { ref, onMounted, watch, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import { useForm, router } from "@inertiajs/vue3";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { trans } from "laravel-vue-i18n";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
function useFinanceForm() {
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
  const swalTheme = {
    customClass: {
      popup: "rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl",
      title: "text-2xl font-black text-slate-800 mb-2 font-sans",
      confirmButton: "bg-indigo-600 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl active:scale-95 transition-all outline-none mx-2 tracking-wide",
      cancelButton: "bg-slate-50 text-slate-400 font-bold py-3.5 px-8 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all outline-none mx-2 tracking-wide",
      actions: "mt-6 gap-3"
    },
    buttonsStyling: false,
    focusConfirm: false
  };
  const confirmDelete = (titleKey, defTitle) => {
    return Swal.fire({
      ...swalTheme,
      title: t(titleKey, defTitle),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("btn_yes_delete", "Yes, Delete!"),
      cancelButtonText: t("btn_cancel", "Cancel"),
      customClass: {
        ...swalTheme.customClass,
        confirmButton: "bg-rose-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl shadow-rose-200"
      }
    });
  };
  const transactionForm = useForm({
    id: null,
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: dayjs().format("YYYY-MM-DD"),
    notes: ""
  });
  const setEditTransaction = (trx) => {
    transactionForm.id = trx.id;
    transactionForm.title = trx.title ?? "";
    transactionForm.amount = trx.amount;
    transactionForm.type = trx.type;
    transactionForm.category = trx.category;
    transactionForm.date = trx.date;
    transactionForm.notes = trx.notes ?? "";
  };
  const submitTransaction = ({ onOptimistic, onSuccess, onError }) => {
    if (!transactionForm.title || transactionForm.title.trim() === "") return fireToast("warning", t("warn_empty_title", "Title is required!"));
    if (!transactionForm.amount || cleanAmount(transactionForm.amount) <= 0) return fireToast("warning", t("warn_empty_amount", "Amount required!"));
    if (!transactionForm.category) return fireToast("warning", t("warn_empty_category", "Please select a category!"));
    const payload = { ...transactionForm.data() };
    const isEditing = !!payload.id;
    if (isEditing && String(payload.id).startsWith("temp_")) {
      return fireToast("warning", t("warn_wait_sync", "Please wait for data to sync first."));
    }
    const tempId = isEditing ? payload.id : "temp_" + Date.now();
    const url = isEditing ? route("finance.transaction.update", payload.id) : route("finance.transaction.store");
    const method = isEditing ? "patch" : "post";
    if (onOptimistic) {
      onOptimistic({ ...payload, id: tempId, amount: cleanAmount(payload.amount), created_at: (/* @__PURE__ */ new Date()).toISOString() }, isEditing);
    }
    fireToast("success", t("success_saved", "Saved successfully!"));
    transactionForm.transform((data) => ({ ...data, amount: cleanAmount(data.amount) }))[method](url, {
      preserveScroll: true,
      preserveState: true,
      progress: false,
      // ✅ INI YANG BENER
      onSuccess: () => {
        transactionForm.reset();
        transactionForm.date = dayjs().format("YYYY-MM-DD");
        if (onSuccess) onSuccess();
      },
      onError: (err) => {
        if (onError) onError(tempId, isEditing);
        fireToast("error", Object.values(err)[0]);
      }
    });
  };
  const deleteTransaction = (id, { onOptimistic, onSuccess, onError }) => {
    if (String(id).startsWith("temp_")) {
      return fireToast("warning", t("warn_wait_sync", "Please wait for data to sync first."));
    }
    confirmDelete("delete_trx_title", "Delete Transaction?").then((res) => {
      if (res.isConfirmed) {
        if (onOptimistic) onOptimistic(id);
        fireToast("success", t("success_deleted", "Deleted!"));
        router.delete(route("finance.transaction.destroy", id), {
          preserveScroll: true,
          preserveState: true,
          progress: false,
          // ✅ INI YANG BENER
          onSuccess: () => {
            if (onSuccess) onSuccess();
          },
          onError: () => {
            if (onError) onError(id);
            fireToast("error", "Failed to delete data");
          }
        });
      }
    });
  };
  const budgetForm = useForm({ id: null, category: "", name: "", icon: "💸", limit_amount: "", month: "" });
  const submitBudget = (monthKey, { onOptimistic, onSuccess, onError }) => {
    budgetForm.month = monthKey;
    if (!budgetForm.name) return fireToast("warning", t("warn_empty_budget_name", "Enter budget name!"));
    const cleanVal = cleanAmount(budgetForm.limit_amount);
    if (!cleanVal || cleanVal <= 0) return fireToast("warning", t("warn_empty_amount", "Valid amount required!"));
    if (!budgetForm.category && budgetForm.name) budgetForm.category = budgetForm.name.toLowerCase().replace(/\s+/g, "_");
    const payload = { ...budgetForm.data() };
    const isEditing = !!payload.id;
    if (isEditing && String(payload.id).startsWith("temp_")) {
      return fireToast("warning", t("warn_wait_sync", "Please wait for data to sync first."));
    }
    const tempId = isEditing ? payload.id : "temp_" + Date.now();
    const url = isEditing ? route("finance.budget.update", payload.id) : route("finance.budget.store");
    const method = isEditing ? "put" : "post";
    if (onOptimistic) {
      onOptimistic({ ...payload, id: tempId, limit_amount: cleanVal }, isEditing);
    }
    fireToast("success", t("success_saved", "Budget updated!"));
    budgetForm.transform((data) => ({ ...data, limit_amount: cleanAmount(data.limit_amount) }))[method](url, {
      preserveScroll: true,
      preserveState: true,
      progress: false,
      // ✅ INI YANG BENER
      onSuccess: () => {
        budgetForm.reset();
        if (onSuccess) onSuccess();
      },
      onError: (err) => {
        if (onError) onError(tempId, isEditing);
        fireToast("error", Object.values(err)[0]);
      }
    });
  };
  const deleteBudget = (id, { onOptimistic, onSuccess, onError }) => {
    if (String(id).startsWith("temp_")) {
      return fireToast("warning", t("warn_wait_sync", "Please wait for data to sync first."));
    }
    confirmDelete("delete_budget_title", "Delete Budget?").then((res) => {
      if (res.isConfirmed) {
        if (onOptimistic) onOptimistic(id);
        fireToast("success", t("success_deleted", "Budget removed!"));
        router.delete(route("finance.budget.destroy", id), {
          preserveScroll: true,
          preserveState: true,
          progress: false,
          // ✅ INI YANG BENER
          onSuccess: () => {
            if (onSuccess) onSuccess();
          },
          onError: () => {
            if (onError) onError(id);
            fireToast("error", "Failed to delete budget");
          }
        });
      }
    });
  };
  const categoryForm = useForm({ id: null, name: "", icon: "💰", type: "income", slug: "" });
  const setEditCategory = (cat) => {
    categoryForm.id = cat.id;
    categoryForm.name = cat.name;
    categoryForm.icon = cat.icon;
    categoryForm.type = cat.type;
    categoryForm.slug = cat.slug;
  };
  const submitCategory = ({ onOptimistic, onSuccess, onError }) => {
    if (!categoryForm.name) return fireToast("warning", t("warn_empty_category_name", "Name required!"));
    const payload = { ...categoryForm.data() };
    const isEditing = !!payload.id;
    if (isEditing && String(payload.id).startsWith("temp_")) {
      return fireToast("warning", t("warn_wait_sync", "Please wait for data to sync first."));
    }
    const tempId = isEditing ? payload.id : "temp_" + Date.now();
    const url = isEditing ? route("finance.categories.update", payload.id) : route("finance.categories.store");
    const method = isEditing ? "put" : "post";
    if (!isEditing) payload.slug = payload.name.toLowerCase().replace(/\s+/g, "_");
    if (onOptimistic) {
      onOptimistic({ ...payload, id: tempId }, isEditing);
    }
    fireToast("success", t("success_saved", "Category saved!"));
    categoryForm[method](url, {
      preserveScroll: true,
      preserveState: true,
      progress: false,
      onSuccess: () => {
        categoryForm.reset();
        if (onSuccess) onSuccess();
      },
      onError: (err) => {
        if (onError) onError(tempId, isEditing);
        fireToast("error", Object.values(err)[0]);
      }
    });
  };
  const deleteCategory = (cat, { onOptimistic, onSuccess, onError }) => {
    if (String(cat.id).startsWith("temp_")) {
      return fireToast("warning", t("warn_wait_sync", "Please wait for data to sync first."));
    }
    confirmDelete("confirm_delete_title", "Are you sure?").then((res) => {
      if (res.isConfirmed) {
        if (onOptimistic) onOptimistic(cat.id);
        fireToast("success", t("success_deleted", "Deleted!"));
        router.delete(route("finance.categories.destroy", cat.id), {
          preserveScroll: true,
          preserveState: true,
          progress: false,
          onSuccess: () => {
            if (onSuccess) onSuccess();
          },
          onError: () => {
            if (onError) onError(cat.id);
            fireToast("error", "Failed to delete data");
          }
        });
      }
    });
  };
  const updateIncomeTarget = (month, amount) => {
    router.post(route("finance.income-target.update"), { month, amount }, {
      preserveScroll: true,
      preserveState: true,
      progress: false
      // ✅ INI YANG BENER
    });
  };
  return {
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
    updateIncomeTarget,
    t
  };
}
const _sfc_main = {
  __name: "FinanceInsights",
  __ssrInlineRender: true,
  props: {
    expenseStats: { type: Object, default: () => ({}) },
    incomeStats: { type: Object, default: () => ({}) },
    budgets: { type: Array, default: () => [] },
    isExplorer: Boolean
  },
  emits: ["update-stats"],
  setup(__props, { emit: __emit }) {
    const { formatMoney } = useFinanceFormat();
    useFinanceForm();
    const assets = ref([]);
    onMounted(() => {
      const saved = localStorage.getItem("OneForMind_assets");
      if (saved) assets.value = JSON.parse(saved);
    });
    watch(assets, (val) => localStorage.setItem("OneForMind_assets", JSON.stringify(val)), { deep: true });
    const portfolioSummary = computed(() => {
      const currentValue = assets.value.reduce((a, b) => a + Number(b.capital) * (1 + Number(b.percent) / 100), 0);
      const totalCapital = assets.value.reduce((a, b) => a + Number(b.capital), 0);
      return { currentValue, totalReturn: currentValue - totalCapital };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700" }, _attrs))} data-v-49215db1><div class="bg-indigo-900 dark:bg-slate-950 rounded-[2rem] p-1 shadow-2xl dark:shadow-none shadow-indigo-200/50 dark:shadow-indigo-900/20 relative overflow-hidden group transition-all duration-500" data-v-49215db1><div class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-900 dark:from-indigo-900 dark:to-slate-950 transition-all duration-500" data-v-49215db1></div><div class="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-1000" data-v-49215db1></div><div class="relative z-10 p-5" data-v-49215db1><div class="flex justify-between items-start mb-6" data-v-49215db1><div data-v-49215db1><div class="flex items-center gap-1.5 mb-1.5" data-v-49215db1><span class="text-lg" data-v-49215db1>🧪</span><p class="text-indigo-200 text-[9px] font-black uppercase tracking-[0.2em]" data-v-49215db1>${ssrInterpolate(_ctx.$t("investment_lab"))}</p></div><h4 class="text-2xl font-black text-white tracking-tighter" data-v-49215db1>${ssrInterpolate(unref(formatMoney)(portfolioSummary.value.currentValue))}</h4><div class="inline-flex items-center gap-1.5 mt-1 bg-black/20 px-2.5 py-1 rounded-md border border-white/5 backdrop-blur-sm" data-v-49215db1><span class="${ssrRenderClass([portfolioSummary.value.totalReturn >= 0 ? "bg-emerald-400" : "bg-rose-400", "w-1.5 h-1.5 rounded-full"])}" data-v-49215db1></span><p class="${ssrRenderClass([portfolioSummary.value.totalReturn >= 0 ? "text-emerald-300" : "text-rose-300", "text-[9px] font-bold"])}" data-v-49215db1>${ssrInterpolate(portfolioSummary.value.totalReturn >= 0 ? "+" : "")}${ssrInterpolate(unref(formatMoney)(portfolioSummary.value.totalReturn))} ${ssrInterpolate(_ctx.$t("total_pl"))}</p></div></div><button class="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-xl text-white border border-white/20 transition-all active:scale-95 shadow-md" data-v-49215db1> ＋ </button></div>`);
      if (assets.value.length > 0) {
        _push(`<div class="space-y-2 max-h-[350px] overflow-y-auto custom-scrollbar pr-1" data-v-49215db1><!--[-->`);
        ssrRenderList(assets.value, (asset) => {
          _push(`<div class="bg-indigo-950/50 dark:bg-black/20 border border-indigo-500/30 dark:border-white/5 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group/card hover:bg-indigo-800/80 dark:hover:bg-white/5 transition-all transition-colors duration-500" data-v-49215db1><div class="flex flex-col gap-2 flex-1 min-w-0" data-v-49215db1><div class="flex items-center gap-2" data-v-49215db1><h5 class="text-sm font-black text-white truncate" data-v-49215db1>${ssrInterpolate(asset.name)}</h5><span class="text-[8px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-500/30" data-v-49215db1>${ssrInterpolate(unref(formatMoney)(asset.capital))}</span></div><div class="flex items-center w-fit bg-black/30 rounded-lg border border-white/10 overflow-hidden focus-within:border-yellow-400/50 transition-all" data-v-49215db1><div class="bg-white/5 px-2 py-1 border-r border-white/10" data-v-49215db1><svg class="w-3 h-3 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-49215db1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-49215db1></path></svg></div><input type="number"${ssrRenderAttr("value", asset.percent)} class="w-16 bg-transparent border-none text-sm font-black text-center text-yellow-400 focus:outline-none focus:ring-0 py-1 px-1 placeholder:text-yellow-700/50" placeholder="0" data-v-49215db1><div class="bg-white/5 px-2 py-1 border-l border-white/10" data-v-49215db1><span class="text-[8px] font-bold text-indigo-200 uppercase" data-v-49215db1>${ssrInterpolate(_ctx.$t("growth"))}</span></div></div></div><div class="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-2 sm:pt-0 mt-1 sm:mt-0 border-t sm:border-none border-indigo-500/20 gap-2" data-v-49215db1><div class="text-left sm:text-right" data-v-49215db1><p class="text-[8px] text-indigo-300 mb-0.5 uppercase tracking-widest font-bold" data-v-49215db1>${ssrInterpolate(_ctx.$t("est_total"))}</p><p class="${ssrRenderClass([asset.percent >= 0 ? "text-emerald-400" : "text-rose-400", "text-sm font-black tracking-tight"])}" data-v-49215db1>${ssrInterpolate(unref(formatMoney)(asset.capital * (1 + asset.percent / 100)))}</p></div><button class="text-[9px] font-black tracking-widest text-white bg-rose-500/90 hover:bg-rose-500 px-4 py-1.5 rounded-lg transition-all shadow-sm active:scale-95" data-v-49215db1>${ssrInterpolate(_ctx.$t("quit"))}</button></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="py-8 flex flex-col items-center justify-center border border-dashed border-indigo-400/30 rounded-xl bg-indigo-950/30 mt-2" data-v-49215db1><span class="text-2xl mb-2 opacity-50 grayscale" data-v-49215db1>🕸️</span><p class="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em]" data-v-49215db1>${ssrInterpolate(_ctx.$t("lab_empty"))}</p></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/FinanceInsights.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FinanceInsights = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-49215db1"]]);
const FinanceInsights$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FinanceInsights
}, Symbol.toStringTag, { value: "Module" }));
export {
  FinanceInsights as F,
  FinanceInsights$1 as a,
  useFinanceForm as u
};
