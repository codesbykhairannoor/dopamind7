<script setup>
import { ref, watch, reactive, onMounted } from 'vue';
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
import NeuralBridge from '@/Components/NeuralBridge.vue';
import { router } from '@inertiajs/vue3';
import { Plus, Wallet } from 'lucide-vue-next';

// Composables
import { useFinanceBatch } from '@/Composables/Finance/useFinanceBatch';
import { useFinanceCalendar } from '@/Composables/Finance/useFinanceCalendar'; 
import { useFinanceForm } from '@/Composables/Finance/useFinanceForm';
import { useFinanceHistory } from '@/Composables/Finance/useFinanceHistory'; 
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat'; 
import { useGating } from '@/Composables/useGating';

const { tier, canUse, isExplorer, isArchitect, isQuantum, isLegendary } = useGating();

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
const vaultTxType = ref('deposit'); // 'deposit' | 'withdraw'
const activeVault = ref(null);
const isProcessingVaultTx = ref(false);

const handleEditSaving = (saving = null) => {
    activeSaving.value = saving;
    showSavingModal.value = true;
};

const handleStoreSaving = (form) => {
    const tempId = 'temp_' + Date.now();
    const originalSavings = [...localSavings.value];
    
    // Add to local list Optimistically
    localSavings.value.push({ ...form, id: tempId, current_amount: 0 });
    
    isSavingVault.value = true;
    showSavingModal.value = false; // Close INSTANTLY

    router.post(route('finance.savings.store'), form, {
        preserveScroll: true,
        onSuccess: (page) => {
            // After success, localSavings will be replaced by the prop from the server
            // But we can also set the local list manually if needed to be 100% sure
            localSavings.value = [...(page.props.savings || [])];
        },
        onFinish: () => {
            isSavingVault.value = false;
        },
        onError: () => {
            showSavingModal.value = true; // Re-open on error
            localSavings.value = originalSavings;
            isProcessingVaultTx.value = false;
        }
    });
};

const handleUpdateSaving = (form) => {
    const originalSavings = JSON.parse(JSON.stringify(localSavings.value));
    const idx = localSavings.value.findIndex(s => s.id === form.id);
    if (idx !== -1) localSavings.value[idx] = { ...localSavings.value[idx], ...form };

    showSavingModal.value = false; // Close INSTANTLY
    isSavingVault.value = true;

    router.put(route('finance.savings.update', form.id), form, {
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
    const msg = saving.current_amount > 0 
        ? page.props.words['vault_close_refund_confirm'].replace(':amount', formatMoney(saving.current_amount))
        : page.props.words['vault_close_confirm'];

    if (confirm(msg)) {
        const originalSavings = [...localSavings.value];
        const originalStats = JSON.parse(JSON.stringify(localStats.value));
        
        // 🚀 OPTIMISTIC: Add income if amount > 0
        if (saving.current_amount > 0) {
            updateLocalStatsInstantly('income', 'saving', saving.current_amount, false);
            localStats.value.total_savings -= Number(saving.current_amount);
        }
        localSavings.value = localSavings.value.filter(s => s.id !== saving.id);
        
        router.delete(route('finance.savings.destroy', saving.id), {
            data: { date: dayjs().format('YYYY-MM-DD') },
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Flash message usually handled by Inertia
            },
            onError: () => {
                localSavings.value = originalSavings;
                localStats.value = originalStats;
            }
        });
    }
};

const openVaultAction = (saving, action = 'deposit') => {
    activeVault.value = saving;
    vaultTxType.value = action;
    showVaultTxModal.value = false; // Force re-render if needed
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
    
    // 🚀 OPTIMISTIC UPDATE
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

    showVaultTxModal.value = false; // Close INSTANTLY
    isProcessingVaultTx.value = true;

    router.post(route(`finance.savings.${action}`, saving.id), {
        amount: numAmount,
        date: data.date
    }, {
        preserveScroll: true,
        preserveState: true,
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

// --- Handlers Modal ---
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

// =========================================================================
// 🔥 MATEMATIKA INSTAN (0ms UI)
// =========================================================================
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

// Menerima Sinyal dari FinanceInsights (Anak)
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
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 1024;
    });
});
</script>

<template>
    <div>
        <Head title="Finance Plan" />
        
        <FinanceHeader 
            :currentMonth="formattedMonth" 
            :currentMonthKey="currentMonthKey"
            :onChangeDate="(payload) => changeMonth(payload)"
            :onAddClick="() => { transactionForm.reset(); transactionForm.id = null; showTransactionModal = true; }"
        />

        <div class="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950/50 px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-500">
            <div v-if="!isMobile" class="mb-8">
                <FinanceStats 
                    :stats="localStats"
                    :onUpdateTarget="handleUpdateTarget"
                />
            </div>

            <!-- 🖥️ DESKTOP VIEW -->
            <div v-if="!isMobile" class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                <div class="lg:col-span-3 space-y-8 w-full">
                    <div class="space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div class="flex items-center gap-2">
                                <h3 class="text-lg font-bold text-slate-800 dark:text-white transition-colors duration-500">{{ $t('daily_history') }}</h3>
                                <span v-if="!filterDate" class="text-[10px] font-bold text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">{{ $t('last_5') }}</span>
                                <span v-else class="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">{{ $t('search_result') }}</span>
                            </div>

                            <button 
                                v-if="!filterDate"
                                @click="showFullHistoryModal = true"
                                class="text-[10px] font-black text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 sm:ml-auto flex items-center gap-1.5 transition-all active:scale-95 group"
                            >
                                <span class="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
                                    <OneForMindIcon name="calendar-history" size="14" stroke-width="2.5" />
                                </span>
                                {{ $t('view_full_archive', 'Arsip Lengkap') }}
                            </button>

                            <div class="flex items-center gap-2">
                                <div class="relative">
                                    <button 
                                        @click="showFilterPicker = !showFilterPicker" 
                                        class="pl-3 pr-8 py-2 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-none hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:ring-2 hover:ring-indigo-500/10 transition-all flex items-center gap-2 min-w-[150px] relative transition-colors duration-500" :class="filterDate ? 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30' : 'text-slate-500 dark:text-slate-400'">
                                        <span class="text-base">📅</span>
                                        <span>{{ filterDate ? dayjs(filterDate).locale($page.props.locale).format('DD MMM YYYY') : $t('date_filter') }}</span>
                                        <span class="absolute right-3 text-slate-400 dark:text-slate-600 text-[10px]">{{ showFilterPicker ? '▲' : '▼' }}</span>
                                    </button>
                                    
                                    <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
                                        <div v-if="showFilterPicker" class="absolute right-0 top-full mt-2 z-50 origin-top-right">
                                            <FinanceDatePicker :show="showFilterPicker" :modelValue="filterDate" :transactions="localTransactions" @update:modelValue="(val) => filterDate = val" @close="showFilterPicker = false"/>
                                        </div>
                                    </transition>
                                </div>

                                <button v-if="filterDate" @click.stop="filterDate = ''" class="text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-1.5 rounded-lg transition-all border border-transparent hover:border-rose-100 dark:hover:border-rose-500/20" title="Hapus Filter">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                </button>
                            </div>
                        </div>

                        <div v-if="localTransactions.length === 0" class="py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-sm dark:shadow-none mt-4 transition-colors duration-500">
                <div class="flex flex-col items-center gap-4">
                    <span class="text-5xl animate-bounce">💸</span>
                    <p class="text-sm font-bold text-slate-400 dark:text-slate-600 px-8">
                        {{ $t('no_transaction', 'Belum ada transaksi di bulan ini') }}
                    </p>
                    <button @click="() => { transactionForm.reset(); transactionForm.id = null; showTransactionModal = true; }" class="mt-2 bg-indigo-600 text-white font-black py-2.5 px-6 rounded-xl shadow-lg dark:shadow-none shadow-indigo-100 dark:shadow-indigo-900/40 hover:bg-indigo-700 active:scale-95 transition-all outline-none">
                        + {{ $t('record_transaction', 'Catat Transaksi') }}
                    </button>
                </div>
            </div>

                        <div v-else class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-50 dark:divide-slate-800/50 transition-colors duration-500">
                            <div v-for="day in visibleStats" :key="day.date" @click="openDetail(day)" class="group p-4 flex items-center justify-between hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 transition-colors cursor-pointer">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center group-hover:bg-white dark:group-hover:bg-slate-700 transition-all shadow-sm">
                                        <span class="text-[10px] uppercase font-black text-slate-400 dark:text-slate-600 leading-none">{{ day.dateObj.format('MMM') }}</span>
                                        <span class="text-xl font-black leading-none text-slate-700 dark:text-slate-200 mt-0.5 transition-colors duration-500">{{ day.dateObj.format('DD') }}</span>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-slate-700 dark:text-white text-sm capitalize transition-colors duration-500">{{ day.dateObj.format('dddd') }}</h4>
                                        <span class="text-[11px] text-slate-400 dark:text-slate-500 font-bold bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700 mt-1 inline-block transition-colors duration-500">{{ $t('transaction_count', { count: day.transactions.length }) }}</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6">
                                    <div class="pl-4 border-l border-slate-100 dark:border-slate-800 text-right">
                                        <span class="block text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-wider">{{ $t('daily_net') }}</span>
                                        <span class="text-sm font-black font-mono transition-colors duration-500" :class="(day.total_income - day.total_expense) >= 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-orange-500 dark:text-orange-400'">
                                            {{ (day.total_income - day.total_expense) >= 0 ? '+' : '' }}{{ formatMoney(day.total_income - day.total_expense) }}
                                        </span>
                                    </div>
                                    <span class="text-slate-300 dark:text-slate-700 group-hover:text-indigo-400 dark:group-hover:text-indigo-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
                                    </span>
                                </div>
                            </div>
                            <div v-if="!filterDate && allStats.length > 5" class="bg-slate-50/50 dark:bg-slate-800/50 p-2.5 text-center border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
                                <p class="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">{{ $t('old_data_hint') }}</p>
                            </div>
                        </div>

                        <ArchiveModal :show="isArchiveOpen" :dayData="selectedDayData" :categories="categories" :close="() => isArchiveOpen = false" :onDelete="triggerDeleteTransaction" :onEdit="handleEdit" />
                        
                        <FullArchiveModal 
                            :show="showFullHistoryModal" 
                            :allStats="allStats" 
                            :categories="categories" 
                            :close="() => showFullHistoryModal = false" 
                            :onDelete="triggerDeleteTransaction" 
                            :onEdit="handleEdit" 
                        />
                    </div>

                    <!-- 🏦 THE VAULT (SAVINGS SECTION) - DESKTOP -->
                    <div class="space-y-6">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                    <Wallet :size="20" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">The Vault</h3>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-0.5">Your wealth manifestation</p>
                                </div>
                            </div>
                            <button @click="handleEditSaving()" class="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95">
                                <Plus :size="14" />
                                Create Goal
                            </button>
                        </div>

                        <div v-if="localSavings.length === 0" class="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center transition-colors">
                             <div class="mb-4 text-4xl transform group-hover:scale-110 transition-transform duration-500">🏦</div>
                             <h4 class="text-slate-400 font-bold text-sm mb-4">You have no active saving goals yet.</h4>
                             <button @click="handleEditSaving()" class="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 px-6 py-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all">
                                Start Saving Now
                             </button>
                        </div>

                        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <SavingCard 
                                v-for="saving in localSavings" :key="saving.id"
                                :saving="saving"
                                :onDeposit="(s) => openVaultAction(s, 'deposit')"
                                :onWithdraw="(s) => openVaultAction(s, 'withdraw')"
                                :onEdit="handleEditSaving"
                                :onDelete="handleDeleteSaving"
                            />
                        </div>
                    </div>

                   <DailyTrendChart v-if="localTransactions.length" :transactions="localTransactions" :currentDate="filters.date" @day-click="openDetail" />
                </div>
 
                <div class="lg:col-span-2 w-full md:sticky md:top-24 h-fit space-y-6"> 
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
 
                    <FinanceInsights 
                        :expense-stats="localStats.expense_by_category" 
                        :income-stats="localStats.income_by_category" 
                        :budgets="localBudgets" 
                        @update-stats="handleOptimisticInvestment"
                    />
                </div>
            </div>

            <!-- 📱 PREMIUM MOBILE WALLET EXPERIENCE -->
            <div v-else class="space-y-8 pb-40 px-2 lg:px-0">
                 <!-- 💳 The Master Wallet Card -->
                 <div id="mobile-finance-card" class="bg-indigo-600 p-8 rounded-[3rem] shadow-2xl shadow-indigo-200 dark:shadow-none text-white relative overflow-hidden group active:scale-95 transition-all duration-500">
                    <div class="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    <div class="absolute -left-12 -bottom-12 w-48 h-48 bg-black/20 rounded-full blur-2xl"></div>
                    
                    <div class="relative z-10">
                        <div class="flex justify-between items-start mb-10">
                            <div>
                                <p class="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Current Balance</p>
                                <h2 id="mobile-balance" class="text-4xl font-black tracking-tighter">{{ formatMoney(localStats.balance) }}</h2>
                            </div>
                            <div class="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                                <OneForMindIcon name="finance" size="24" stroke-width="2.5" />
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-white/10 p-5 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                                <p class="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Income</p>
                                <p class="text-lg font-black tracking-tight">{{ formatMoney(localStats.total_income) }}</p>
                            </div>
                            <div class="bg-white/10 p-5 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                                <p class="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Expense</p>
                                <p class="text-lg font-black text-rose-300 tracking-tight">{{ formatMoney(localStats.total_expense) }}</p>
                            </div>
                        </div>

                        <!-- Mini Goal Progress -->
                        <div class="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                            <span class="text-[10px] font-black uppercase tracking-widest opacity-60">Monthly Budget</span>
                            <div class="flex items-center gap-3">
                                <div class="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div class="bg-white h-full" :style="`width: ${Math.min(100, (localStats.total_expense / (localStats.total_income || 1)) * 100)}%`"></div>
                                </div>
                                <span class="text-[10px] font-black">{{ Math.round((localStats.total_expense / (localStats.total_income || 1)) * 100) }}%</span>
                            </div>
                        </div>
                    </div>
                 </div>

                 <!-- ⚡ Quick Categorical Insights (Horizontal Scroll) -->
                 <div class="space-y-4">
                    <div class="flex items-center justify-between px-2">
                        <h3 class="text-xs font-black uppercase tracking-widest text-slate-400">Spending By Group</h3>
                    </div>
                    <div class="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-2 px-2">
                        <div v-for="(amount, cat) in localStats.expense_by_category" :key="cat" class="shrink-0 bg-white dark:bg-slate-900 px-5 py-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3 active:scale-95 transition-all">
                            <div class="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg">
                                {{ categories.find(c => c.slug === cat)?.icon || '💸' }}
                            </div>
                            <div>
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-tight">{{ cat }}</p>
                                <p class="text-xs font-black text-slate-800 dark:text-slate-100 leading-none">{{ formatMoney(amount) }}</p>
                            </div>
                        </div>
                    </div>
                 </div>

                 <!-- 🕒 Visual Timeline of Transactions -->
                 <div class="space-y-4">
                    <div class="flex items-center justify-between px-2">
                        <h3 class="text-xs font-black uppercase tracking-widest text-slate-400">Activity Timeline</h3>
                        <button @click="showFullHistoryModal = true" class="text-[10px] font-black text-indigo-600">See All</button>
                    </div>
                    
                    <div v-if="localTransactions.length === 0" class="py-16 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                        <p class="text-sm font-black text-slate-400">No transactions recorded.</p>
                        <button @click="transactionForm.reset(); showTransactionModal = true" class="mt-4 text-[10px] bg-indigo-600 text-white px-6 py-2 rounded-full">Add First</button>
                    </div>
                    
                    <div v-else class="space-y-3">
                        <div v-for="trx in localTransactions.slice(0, 10)" :key="trx.id" :id="'mobile-trx-' + trx.id" @click="handleEdit(trx)" class="group bg-white dark:bg-slate-900 p-5 rounded-[2.2rem] border border-slate-50 dark:border-slate-800 flex items-center justify-between active:scale-[0.98] transition-all duration-300 hover:shadow-lg">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl transition-transform group-hover:scale-110">
                                    {{ trx.category_icon || '💸' }}
                                </div>
                                <div class="min-w-0">
                                    <h4 class="text-sm font-black text-slate-800 dark:text-white leading-tight truncate">{{ trx.title }}</h4>
                                    <p class="text-[10px] font-bold text-slate-400 capitalize tracking-tight">{{ dayjs(trx.date).format('DD MMM') }} • {{ trx.category_name }}</p>
                                </div>
                            </div>
                            <div class="text-right shrink-0 ml-4">
                                <p class="text-sm font-black font-mono tracking-tighter" :class="trx.type === 'income' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'">
                                    {{ trx.type === 'income' ? '+' : '-' }}{{ formatMoney(trx.amount) }}
                                </p>
                                <OneForMindIcon v-if="trx.type === 'expense'" name="chevron-right" size="10" class="text-slate-300 ml-auto mt-1" />
                            </div>
                        </div>
                    </div>
                 </div>

                 <!-- 🧠 AI Intelligence Insights -->
                 <FinanceInsights 
                    :expense-stats="localStats.expense_by_category" 
                    :income-stats="localStats.income_by_category" 
                    :budgets="localBudgets" 
                    @update-stats="handleOptimisticInvestment"
                 />
            </div>

        </div>

        <TransactionModal :show="showTransactionModal" :form="transactionForm" :budgets="localBudgets" :categories="categories" :close="() => showTransactionModal = false" :submit="submitNewTransaction" @switch-to-batch="switchToBatch" />
        <FinanceBatchModal :show="isBatchModalOpen" :form="batchForm" :categories="categories" :budgets="localBudgets" :conflictError="globalConflictError" :close="closeBatchModal" :submit="triggerSubmitBatch" :addRow="addBatchRow" :removeRow="removeBatchRow" :switchToSingle="switchToSingle" />
        <BudgetModal :show="showBudgetModal" :form="budgetForm" :categories="categories" :close="() => showBudgetModal = false" :submit="submitNewBudget" />
        <CategoryModal :show="showCategoryModal" :form="categoryForm" :close="() => showCategoryModal = false" :submit="submitNewCategory" />
        <SavingModal :show="showSavingModal"
                     :saving="activeSaving"
                     :processing="isSavingVault"
                     @close="showSavingModal = false"
                     @save="(form) => form.id ? handleUpdateSaving(form) : handleStoreSaving(form)" />

        <VaultTransactionModal :show="showVaultTxModal"
                              :saving="activeVault"
                              :type="vaultTxType"
                              :processing="isProcessingVaultTx"
                              @close="showVaultTxModal = false"
                              @save="handleVaultTransaction" />
    </div>
</template>