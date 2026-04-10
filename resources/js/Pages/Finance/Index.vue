<script setup>
import { ref, watch, reactive, onMounted, nextTick } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { Head, usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';

// Components
import FinanceHeader from './FinanceHeader.vue';
import FinanceStats from './FinanceStats.vue';
import BudgetSidebar from './BudgetSidebar.vue';
import TransactionModal from './TransactionModal.vue';
import BudgetModal from './BudgetModal.vue'; 
import CategoryModal from './CategoryModal.vue'; 
import DailyTrendChart from './DailyTrendChart.vue'; 
import ArchiveModal from './ArchiveModal.vue'; 
import FullArchiveModal from './FullArchiveModal.vue';
import FinanceDatePicker from './FinanceDatePicker.vue';
import FinanceBatchModal from './FinanceBatchModal.vue';
import FinanceInsights from './FinanceInsights.vue'; 
import SavingCard from './SavingCard.vue';
import SavingModal from './SavingModal.vue';
import VaultTransactionModal from './VaultTransactionModal.vue';
import LockedFeatureWall from '@/Components/LockedFeatureWall.vue';
import PremiumPreviewModal from '@/Components/PremiumPreviewModal.vue';
import NeuralBridge from '@/Components/NeuralBridge.vue';
import { router } from '@inertiajs/vue3';
import { Plus, Wallet, Lock, TrendingUp, Zap, ArrowRight } from 'lucide-vue-next';

// Composables
import { useFinanceBatch } from '@/Composables/Finance/useFinanceBatch';
import { useFinanceCalendar } from '@/Composables/Finance/useFinanceCalendar'; 
import { useFinanceForm } from '@/Composables/Finance/useFinanceForm';
import { useFinanceHistory } from '@/Composables/Finance/useFinanceHistory'; 
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat'; 
import { useGating } from '@/Composables/useGating';

const { isExplorer, canUse } = useGating();

const props = defineProps({
    transactions: Array, budgets: Array, stats: Object, filters: Object, categories: Array, savings: Array
});

const page = usePage();
defineOptions({ layout: AuthenticatedLayout });

// 🔥 MAGIC OPTIMISTIC UI: Buat State Lokal
const localTransactions = ref([...(props.transactions || [])]);
const localBudgets = ref([...(props.budgets || [])]);
const localCategories = ref([...(props.categories || [])]);
const localSavings = ref([...(props.savings || [])]);
const localStats = ref(JSON.parse(JSON.stringify(props.stats || {}))); 

const showSavingModal = ref(false);
const activeSaving = ref(null);
const isSavingVault = ref(false);

const showVaultTxModal = ref(false);
const vaultTxType = ref('deposit'); 
const activeVault = ref(null);
const isProcessingVaultTx = ref(false);

const isPreviewOpen = ref(false);
const activePreviewModule = ref('Finance');

const openPremiumPreview = (module = 'Finance') => {
    activePreviewModule.value = module;
    isPreviewOpen.value = true;
};

const handleEditSaving = (saving = null) => {
    if (isExplorer.value) return openPremiumPreview('Finance');
    
    if (!saving) {
        activeSaving.value = { id: null, title: '', target_amount: '', icon: '🏦', color: '#6366f1' };
    } else {
        activeSaving.value = saving;
    }
    showSavingModal.value = true;
};

const handleStoreSaving = (form) => {
    const tempId = 'temp_' + Date.now();
    const originalSavings = [...localSavings.value];
    localSavings.value.push({ ...form, id: tempId, current_amount: 0 });
    isSavingVault.value = true;
    showSavingModal.value = false;

    router.post(route('finance.savings.store'), form, {
        preserveScroll: true,
        onSuccess: (page) => {
            localSavings.value = [...(page.props.savings || [])];
            localStorage.setItem('dfm_local_savings', JSON.stringify(localSavings.value));
        },
        onFinish: () => { isSavingVault.value = false; },
        onError: () => {
            showSavingModal.value = true;
            localSavings.value = originalSavings;
            isProcessingVaultTx.value = false;
        }
    });
};

const handleUpdateSaving = (form) => {
    const originalSavings = JSON.parse(JSON.stringify(localSavings.value));
    const idx = localSavings.value.findIndex(s => s.id === form.id);
    if (idx !== -1) localSavings.value[idx] = { ...localSavings.value[idx], ...form };
    showSavingModal.value = false;
    isSavingVault.value = true;

    router.put(route('finance.savings.update', form.id), form, {
        preserveScroll: true,
        onFinish: () => { isSavingVault.value = false; },
        onError: () => {
            showSavingModal.value = true;
            localSavings.value = originalSavings;
            isSavingVault.value = false;
        }
    });
};

const handleDeleteSaving = (saving) => {
    const msg = saving.current_amount > 0 
        ? page.props.words['vault_close_refund_confirm'].replace(':amount', formatMoney(saving.current_amount))
        : page.props.words['vault_close_confirm'];

    if (confirm(msg)) {
        const originalSavings = [...localSavings.value];
        const originalStats = JSON.parse(JSON.stringify(localStats.value));
        
        if (saving.current_amount > 0) {
            updateLocalStatsInstantly('income', 'saving', saving.current_amount, false);
            localStats.value.total_savings -= Number(saving.current_amount);
        }
        localSavings.value = localSavings.value.filter(s => s.id !== saving.id);
        
        router.delete(route('finance.savings.destroy', saving.id), {
            data: { date: dayjs().format('YYYY-MM-DD') },
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                localSavings.value = [...(page.props.savings || [])];
                localStorage.setItem('dfm_local_savings', JSON.stringify(localSavings.value));
            },
            onError: () => {
                localSavings.value = originalSavings;
                localStats.value = originalStats;
            }
        });
    }
};

const openVaultAction = (saving, action = 'deposit') => {
    if (isExplorer.value) return openPremiumPreview('Finance');
    activeVault.value = saving;
    vaultTxType.value = action;
    showVaultTxModal.value = false;
    nextTick(() => { showVaultTxModal.value = true; });
};

const handleVaultTransaction = (data) => {
    const saving = activeVault.value;
    const action = data.type;
    const numAmount = data.amount;
    const originalSavings = JSON.parse(JSON.stringify(localSavings.value));
    const originalStats = JSON.parse(JSON.stringify(localStats.value));
    
    const idx = localSavings.value.findIndex(s => s.id === saving.id);
    if (idx !== -1) {
        if (action === 'deposit') {
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
        amount: numAmount, date: data.date
    }, {
        onSuccess: (page) => {
            localSavings.value = [...(page.props.savings || [])];
            localStats.value = JSON.parse(JSON.stringify(page.props.stats || {}));
            localStorage.setItem('dfm_local_savings', JSON.stringify(localSavings.value));
        },
        onFinish: () => { isProcessingVaultTx.value = false; },
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
    get transactions() { return localTransactions.value; },
    get budgets() { return localBudgets.value; },
    get categories() { return localCategories.value; }
});

const { formattedMonth, changeMonth, currentMonthKey } = useFinanceCalendar(props.filters.date);
const { 
    transactionForm, setEditTransaction, submitTransaction, deleteTransaction, 
    budgetForm, submitBudget, deleteBudget, 
    categoryForm, setEditCategory, submitCategory, deleteCategory, 
    updateIncomeTarget
} = useFinanceForm();

const showTransactionModal = ref(false);
const showBudgetModal = ref(false); 
const showCategoryModal = ref(false);
const showFilterPicker = ref(false);
const showFullHistoryModal = ref(false);
const filterDateRef = ref(props.filters.date || dayjs().format('YYYY-MM-DD'));

const { 
    isBatchModalOpen, batchForm, globalConflictError, 
    openBatchModal, closeBatchModal, addBatchRow, removeBatchRow, submitBatch: executeBatch
} = useFinanceBatch(filterDateRef);

const { visibleStats, allStats, filterDate, isArchiveOpen, selectedDayData, openDetail } = useFinanceHistory(historyProps);
const { formatMoney } = useFinanceFormat();

const handleEdit = (trx) => { setEditTransaction(trx); showTransactionModal.value = true; };
const handleUpdateTarget = (newAmount) => {
    localStats.value.income_target = Number(newAmount);
    updateIncomeTarget(currentMonthKey.value, newAmount);
};

const handleEditBudget = (budget) => {
    const catDetail = localCategories.value.find(c => c.slug === budget.category);
    budgetForm.id = budget.id;
    budgetForm.category = budget.category;
    budgetForm.name = catDetail ? catDetail.name : budget.category; 
    budgetForm.icon = catDetail ? catDetail.icon : '💸'; 
    budgetForm.limit_amount = budget.limit_amount;
    budgetForm.month = budget.month || currentMonthKey.value;
    showBudgetModal.value = true;
};

const handleEditCategory = (cat) => { categoryForm.id = cat.id; setEditCategory(cat); showCategoryModal.value = true; };
const handleAddCategory = () => { categoryForm.reset(); categoryForm.id = null; showCategoryModal.value = true; };

const updateLocalStatsInstantly = (type, categorySlug, amount, isSubtract = false) => {
    const val = Number(amount) * (isSubtract ? -1 : 1);
    if (type === 'income') {
        localStats.value.total_income += val;
        localStats.value.balance += val;
        if (!localStats.value.income_by_category[categorySlug]) localStats.value.income_by_category[categorySlug] = 0;
        localStats.value.income_by_category[categorySlug] += val;
    } 
    else if (type === 'expense') {
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
    const oldTrx = transactionForm.id ? localTransactions.value.find(t => t.id === transactionForm.id) : null;
    const oldAmount = oldTrx ? Number(oldTrx.amount) : 0;
    const oldType = oldTrx ? oldTrx.type : null;
    const oldCategory = oldTrx ? oldTrx.category : null;

    submitTransaction({
        onOptimistic: (data, isEditing) => {
            showTransactionModal.value = false; 
            if (isEditing) {
                const idx = localTransactions.value.findIndex(t => t.id === data.id);
                if (idx !== -1) Object.assign(localTransactions.value[idx], data);
                if(oldType) updateLocalStatsInstantly(oldType, oldCategory, oldAmount, true);
                updateLocalStatsInstantly(data.type, data.category, data.amount, false);
            } else {
                localTransactions.value.unshift(data); 
                updateLocalStatsInstantly(data.type, data.category, data.amount, false);
            }
        },
        onError: () => { showTransactionModal.value = true; }
    });
};

const triggerDeleteTransaction = (id) => {
    isArchiveOpen.value = false;
    const target = localTransactions.value.find(t => t.id === id);
    deleteTransaction(id, {
        onOptimistic: (targetId) => {
            if(target) updateLocalStatsInstantly(target.type, target.category, target.amount, true);
            localTransactions.value = localTransactions.value.filter(t => t.id !== targetId);
        }
    });
};

const triggerSubmitBatch = () => {
    executeBatch({
        onOptimistic: (newTransactionsArray) => {
            localTransactions.value.unshift(...newTransactionsArray);
            newTransactionsArray.forEach(data => updateLocalStatsInstantly(data.type, data.category, data.amount, false));
        },
        onError: (tempIdsArray) => {
            localTransactions.value = localTransactions.value.filter(t => !tempIdsArray.includes(t.id));
        }
    });
};

const submitNewBudget = () => {
    showBudgetModal.value = false; 
    submitBudget(currentMonthKey.value, {
        onOptimistic: (data, isEditing) => {
            if (isEditing) {
                const idx = localBudgets.value.findIndex(b => b.id === data.id);
                if (idx !== -1) Object.assign(localBudgets.value[idx], data);
                const catIdx = localCategories.value.findIndex(c => c.slug === data.category);
                if (catIdx !== -1) {
                    localCategories.value[catIdx].name = data.name;
                    localCategories.value[catIdx].icon = data.icon;
                }
            } else {
                localBudgets.value.push(data);
                if (!localCategories.value.find(c => c.slug === data.category)) {
                    localCategories.value.push({ id: 'temp_' + Date.now(), slug: data.category, name: data.name, icon: data.icon, type: 'expense' });
                }
            }
        },
        onError: (id, isEditing) => {
            if (!isEditing) localBudgets.value = localBudgets.value.filter(b => b.id !== id);
            showBudgetModal.value = true;
        }
    });
};

const submitNewCategory = () => {
    showCategoryModal.value = false;
    submitCategory({
        onOptimistic: (data, isEditing) => {
            if (isEditing) {
                const idx = localCategories.value.findIndex(c => c.id === data.id);
                if (idx !== -1) {
                    localCategories.value[idx].name = data.name;
                    localCategories.value[idx].icon = data.icon;
                }
            } else {
                localCategories.value.push(data);
            }
        },
        onError: (id, isEditing) => {
            if (!isEditing) localCategories.value = localCategories.value.filter(c => c.id !== id);
            showCategoryModal.value = true;
        }
    });
};

const triggerDeleteBudget = (id) => {
    deleteBudget(id, { onOptimistic: (targetId) => { localBudgets.value = localBudgets.value.filter(b => b.id !== targetId); } });
};

const triggerDeleteCategory = (cat) => {
    deleteCategory(cat, { onOptimistic: (targetId) => { localCategories.value = localCategories.value.filter(c => c.id !== targetId); } });
};

const switchToBatch = () => {
    if (isExplorer.value) return openPremiumPreview('Finance');
    showTransactionModal.value = false;
    setTimeout(() => { openBatchModal(); }, 150);
};

const switchToSingle = () => {
    closeBatchModal();
    setTimeout(() => { transactionForm.reset(); transactionForm.id = null; showTransactionModal.value = true; }, 150);
};

const isMobile = ref(false);
onMounted(() => {
    isMobile.value = window.innerWidth < 1024;
    window.addEventListener('resize', () => { isMobile.value = window.innerWidth < 1024; });
    const storedSavings = localStorage.getItem('dfm_local_savings');
    if (storedSavings && localSavings.value.length === 0) localSavings.value = JSON.parse(storedSavings);
});

watch(() => props.savings, (newSavings) => {
    localSavings.value = [...(newSavings || [])];
    localStorage.setItem('dfm_local_savings', JSON.stringify(localSavings.value));
}, { deep: true });

watch(() => props.stats, (newStats) => { localStats.value = JSON.parse(JSON.stringify(newStats || {})); }, { deep: true });
</script>

<template>
    <div>
        <Head title="Finance Plan" />
        
        <FinanceHeader 
            :currentMonth="formattedMonth" 
            :currentMonthKey="currentMonthKey"
            :onAddClick="() => { transactionForm.reset(); transactionForm.id = null; showTransactionModal = true; }"
            :isExplorer="isExplorer"
            @open-preview="openPremiumPreview"
        />

        <div class="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950/50 px-3 sm:px-6 lg:px-8 py-6 transition-colors duration-500">
            <div class="mb-8 overflow-x-auto no-scrollbar -mx-3 px-3 lg:mx-0 lg:px-0">
                <FinanceStats :stats="localStats" :onUpdateTarget="handleUpdateTarget" />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
                <div class="lg:col-span-2 w-full lg:sticky lg:top-24 h-fit space-y-8 lg:space-y-6 order-1 lg:order-2">
                    <BudgetSidebar
                        :budgets="localBudgets"
                        :categories="localCategories"
                        :expenseStats="localStats.expense_by_category"
                        :incomeStats="localStats.income_by_category"
                        @add="() => { budgetForm.reset(); budgetForm.id = null; showBudgetModal = true; }"
                        @delete-budget="triggerDeleteBudget"
                        @edit-budget="handleEditBudget"
                        @add-category="handleAddCategory"
                        @edit-category="handleEditCategory"
                        @delete-category="triggerDeleteCategory"
                    />

                    <NeuralBridge module="Finance" />

                    <!-- Investment Lab (FinanceInsights) -->
                    <div class="relative">
                        <LockedFeatureWall v-if="isExplorer" @click="openPremiumPreview('Finance')" />
                        <FinanceInsights
                            :expense-stats="localStats.expense_by_category"
                            :income-stats="localStats.income_by_category"
                            :budgets="localBudgets"
                            :isExplorer="isExplorer"
                            @update-stats="handleOptimisticInvestment"
                        />
                    </div>
                </div>
                
                <div class="lg:col-span-3 space-y-8 w-full order-2 lg:order-1 pb-24 lg:pb-0">
                    <div class="space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 lg:px-0">
                            <div class="flex items-center gap-2">
                                <h3 class="text-base lg:text-lg font-bold text-slate-800 dark:text-white transition-colors duration-500">{{ $t('daily_history') }}</h3>
                                <span v-if="!filterDate" class="text-[9px] lg:text-[10px] font-bold text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">{{ $t('last_5') }}</span>
                                <span v-else class="text-[9px] lg:text-[10px] font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">{{ $t('search_result') }}</span>
                            </div>

                            <div class="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                                <button v-if="!filterDate" @click="showFullHistoryModal = true" class="text-[9px] lg:text-[10px] font-black text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1.5 transition-all active:scale-95 group">
                                    <span class="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
                                        <OneForMindIcon name="calendar-history" size="14" stroke-width="2.5" />
                                    </span>
                                    <span class="hidden sm:inline">{{ $t('view_full_archive', 'Arsip Lengkap') }}</span>
                                    <span class="sm:hidden">Archive</span>
                                </button>

                                <div class="flex items-center gap-2">
                                    <div class="relative">
                                        <button @click="showFilterPicker = !showFilterPicker" class="pl-3 pr-8 py-2 text-[10px] lg:text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-none hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:ring-2 hover:ring-indigo-500/10 transition-all flex items-center gap-2 min-w-[120px] lg:min-w-[150px] relative transition-colors duration-500" :class="filterDate ? 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30' : 'text-slate-500 dark:text-slate-400'">
                                            <span class="text-sm lg:text-base">📅</span>
                                            <span>{{ filterDate ? dayjs(filterDate).locale($page.props.locale).format('DD MMM YYYY') : $t('date_filter') }}</span>
                                            <span class="absolute right-3 text-slate-400 dark:text-slate-600 text-[10px]">{{ showFilterPicker ? '▲' : '▼' }}</span>
                                        </button>
                                        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
                                            <div v-if="showFilterPicker" class="absolute right-0 top-full mt-2 z-50 origin-top-right">
                                                <FinanceDatePicker :show="showFilterPicker" :modelValue="filterDate" :transactions="localTransactions" @update:modelValue="(val) => filterDate = val" @close="showFilterPicker = false"/>
                                            </div>
                                        </transition>
                                    </div>
                                    <button v-if="filterDate" @click.stop="filterDate = ''" class="text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-1.5 rounded-lg transition-all border border-transparent hover:border-rose-100 dark:hover:border-rose-500/20" title="Hapus Filter"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></button>
                                </div>
                            </div>
                        </div>

                        <div v-if="localTransactions.length === 0" class="py-16 lg:py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-sm dark:shadow-none mt-4 transition-colors duration-500">
                             <div class="flex flex-col items-center gap-4">
                                <span class="text-4xl lg:text-5xl animate-bounce">💸</span>
                                <p class="text-[10px] lg:text-sm font-bold text-slate-400 dark:text-slate-600 px-8">{{ $t('no_transaction', 'Belum ada transaksi di bulan ini') }}</p>
                                <button @click="() => { transactionForm.reset(); transactionForm.id = null; showTransactionModal = true; }" class="mt-2 bg-indigo-600 text-white font-black py-2 px-5 lg:py-2.5 lg:px-6 rounded-xl shadow-lg dark:shadow-none shadow-indigo-100 dark:shadow-indigo-900/40 hover:bg-indigo-700 active:scale-95 transition-all outline-none text-[10px] lg:text-xs">+ {{ $t('record_transaction', 'Catat Transaksi') }}</button>
                            </div>
                        </div>

                        <div v-else class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-50 dark:divide-slate-800/50 transition-colors duration-500">
                            <div v-for="day in visibleStats" :key="day.date" @click="openDetail(day)" class="group p-3 lg:p-4 flex items-center justify-between hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 transition-colors cursor-pointer">
                                <div class="flex items-center gap-3 lg:gap-4">
                                    <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center group-hover:bg-white dark:group-hover:bg-slate-700 transition-all shadow-sm"><span class="text-[8px] lg:text-[10px] font-black text-slate-400 dark:text-slate-600 leading-none">{{ day.dateObj.format('MMM') }}</span><span class="text-base lg:text-xl font-black leading-none text-slate-700 dark:text-slate-200 mt-0.5 transition-colors duration-500">{{ day.dateObj.format('DD') }}</span></div>
                                    <div><h4 class="font-bold text-slate-700 dark:text-white text-[11px] lg:text-sm capitalize transition-colors duration-500">{{ day.dateObj.format('dddd') }}</h4><span class="text-[9px] lg:text-[11px] text-slate-400 dark:text-slate-500 font-bold bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700 mt-0.5 inline-block transition-colors duration-500">{{ $t('transaction_count', { count: day.transactions.length }) }}</span></div>
                                </div>
                                <div class="flex items-center gap-3 lg:gap-6"><div class="pl-3 lg:pl-4 border-l border-slate-100 dark:border-slate-800 text-right"><span class="block text-[8px] font-bold text-slate-400 dark:text-slate-600 tracking-wider">{{ $t('daily_net') }}</span><span class="text-[11px] lg:text-sm font-black font-mono transition-colors duration-500" :class="(day.total_income - day.total_expense) >= 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-orange-500 dark:text-orange-400'">{{ (day.total_income - day.total_expense) >= 0 ? '+' : '' }}{{ formatMoney(day.total_income - day.total_expense) }}</span></div><span class="text-slate-300 dark:text-slate-700 group-hover:text-indigo-400 dark:group-hover:text-indigo-500 transition-colors"><OneForMindIcon name="chevron-right" size="16" /></span></div>
                            </div>
                        </div>

                        <ArchiveModal :show="isArchiveOpen" :dayData="selectedDayData" :categories="categories" :close="() => isArchiveOpen = false" :onDelete="triggerDeleteTransaction" :onEdit="handleEdit" />
                        <FullArchiveModal :show="showFullHistoryModal" :allStats="allStats" :categories="categories" :close="() => showFullHistoryModal = false" :onDelete="triggerDeleteTransaction" :onEdit="handleEdit" />
                    </div>

                    <!-- 🏦 The Vault (Savings) & 🧠 Neural Forecast -->
                    <div class="space-y-6 relative group">
                        <div class="flex items-center justify-between px-1 lg:px-0">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shadow-sm"><Wallet :size="20" /></div>
                                <div class="flex items-center gap-2">
                                    <div><h3 class="text-base lg:text-lg font-black text-slate-800 dark:text-white tracking-tight">The Vault</h3><p class="text-[9px] lg:text-[10px] font-black text-slate-400 tracking-widest leading-none mt-0.5">Your wealth manifestation</p></div>
                                    <Lock v-if="isExplorer" :size="12" class="text-orange-500 animate-pulse ml-0.5" />
                                </div>
                            </div>
                            <button @click="handleEditSaving()" class="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-[1.25rem] text-[10px] font-black tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none relative group/btn overflow-hidden"><div class="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div><Plus :size="16" stroke-width="3" /><span class="hidden sm:inline relative z-10">{{ isExplorer ? 'Unlock goal' : 'Create goal' }}</span><span class="sm:hidden relative z-10">Goal</span></button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                            <!-- Premium Lockdown Overlay for The Vault -->
                            <div v-if="isExplorer" @click="openPremiumPreview('Finance')" class="absolute inset-0 z-20 rounded-[3rem] overflow-hidden group/locked-vault cursor-pointer transition-all duration-700 border border-slate-100 dark:border-slate-800 shadow-2xl">
                                <div class="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl transition-all duration-700 group-hover/locked-vault:backdrop-blur-none"></div>
                                <div class="absolute inset-0 opacity-10 group-hover/locked-vault:opacity-20 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400 via-transparent to-transparent"></div>
                                <div class="relative z-10 h-full flex items-center justify-center p-8 text-center bg-white/50 dark:bg-slate-900/50">
                                    <div class="max-w-xs animate-in zoom-in duration-500">
                                        <div class="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-600 dark:from-orange-500 dark:to-amber-700 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white shadow-2xl rotate-3 group-hover/locked-vault:rotate-0 transition-transform"><Lock :size="40" stroke-width="2.5" /></div>
                                        <h4 class="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Vault architecture</h4>
                                        <p class="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-6">Manifest your wealth with automated accumulation protocols.</p>
                                        <div class="inline-flex items-center gap-2 text-[10px] font-black text-orange-600 dark:text-orange-400 tracking-widest uppercase"><span class="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping"></span>Unlock architect tier</div>
                                    </div>
                                </div>
                            </div>

                             <div v-if="localSavings.length === 0" class="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 p-10 text-center transition-colors col-span-1 border-2 border-slate-100 dark:border-slate-800 shadow-sm"><div class="mb-4 text-3xl transform group-hover:scale-110 transition-transform duration-500 animate-bounce">🏦</div><h4 class="text-slate-400 font-bold text-[10px] lg:text-sm mb-4">You have no active saving goals yet.</h4><button @click="handleEditSaving()" class="text-[9px] lg:text-[10px] font-black tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-6 py-2.5 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all active:scale-95 shadow-sm border border-indigo-100/50 dark:border-indigo-500/20">Start saving now</button></div>

                            <div v-else class="flex lg:grid overflow-x-auto lg:overflow-visible no-scrollbar gap-4 pb-4 lg:pb-0">
                                <div v-for="saving in localSavings" :key="saving.id" class="shrink-0 w-[260px] lg:w-full"><SavingCard :saving="saving" :onDeposit="(s) => openVaultAction(s, 'deposit')" :onWithdraw="(s) => openVaultAction(s, 'withdraw')" :onEdit="handleEditSaving" :onDelete="handleDeleteSaving" /></div>
                            </div>

                            <div @click="openPremiumPreview('Finance')" class="relative bg-slate-900 dark:bg-indigo-950 rounded-[2.5rem] p-8 overflow-hidden group/forecast cursor-pointer hover:scale-[1.02] transition-all duration-500 shadow-2xl">
                                <div class="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-slate-900 to-black"></div>
                                <div class="relative z-10 flex flex-col h-full">
                                    <div class="flex items-center justify-between mb-6"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"><TrendingUp :size="20" /></div><div><h4 class="text-xs font-black text-white tracking-widest">Neural forecast</h4><p class="text-[9px] font-bold text-indigo-300 tracking-tighter">AI wealth prediction</p></div></div><div class="px-2 py-1 rounded-md bg-indigo-500 text-white text-[8px] font-black tracking-widest shadow-lg">Elite</div></div>
                                    <div class="flex-1 flex items-end gap-1.5 h-24 mb-6 blur-[2px] group-hover:blur-0 transition-all duration-700 opacity-30"><div v-for="h in [30, 45, 35, 70, 85, 60, 100, 90, 110, 130]" :key="h" :style="{ height: h + '%' }" class="flex-1 bg-gradient-to-t from-indigo-400 to-transparent rounded-t-sm"></div></div>
                                    <div class="mt-auto flex items-center justify-between"><span class="text-[10px] font-black text-indigo-200 tracking-widest">Unlock predictions</span><ArrowRight :size="16" class="text-white group-hover:translate-x-1 transition-transform" /></div>
                                </div>
                                <div class="absolute inset-0 bg-white/5 backdrop-blur-[1px] opacity-20 transition-opacity group-hover:opacity-0"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Trend Chart Section -->
                    <div class="relative">
                        <LockedFeatureWall v-if="isExplorer" @click="openPremiumPreview('Finance')" />
                        <DailyTrendChart v-if="localTransactions.length" :transactions="localTransactions" :currentDate="filters.date" :isExplorer="isExplorer" @day-click="openDetail" />
                    </div>
                </div>
            </div>
        </div>

        <TransactionModal :show="showTransactionModal" :form="transactionForm" :budgets="localBudgets" :categories="categories" :close="() => showTransactionModal = false" :submit="submitNewTransaction" @switch-to-batch="switchToBatch" />
        <FinanceBatchModal :show="isBatchModalOpen" :form="batchForm" :categories="categories" :budgets="localBudgets" :conflictError="globalConflictError" :close="closeBatchModal" :submit="triggerSubmitBatch" :addRow="addBatchRow" :removeRow="removeBatchRow" :switchToSingle="switchToSingle" />
        <BudgetModal :show="showBudgetModal" :form="budgetForm" :categories="categories" :close="() => showBudgetModal = false" :submit="submitNewBudget" />
        <CategoryModal :show="showCategoryModal" :form="categoryForm" :close="() => showCategoryModal = false" :submit="submitNewCategory" />
        <SavingModal :show="showSavingModal" :saving="activeSaving" :processing="isSavingVault" @close="showSavingModal = false" @save="(form) => form.id ? handleUpdateSaving(form) : handleStoreSaving(form)" />
        <VaultTransactionModal :show="showVaultTxModal" :saving="activeVault" :type="vaultTxType" :processing="isProcessingVaultTx" @close="showVaultTxModal = false" @save="handleVaultTransaction" />
        <PremiumPreviewModal :isOpen="isPreviewOpen" :module="activePreviewModule" @close="isPreviewOpen = false" />
    </div>
</template>