<script setup>
import { ref, watch, reactive } from 'vue';
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
import FinanceDatePicker from './FinanceDatePicker.vue';
import FinanceBatchModal from './FinanceBatchModal.vue';
import FinanceInsights from './FinanceInsights.vue'; 

// Composables
import { useFinanceBatch } from '@/Composables/Finance/useFinanceBatch';
import { useFinanceCalendar } from '@/Composables/Finance/useFinanceCalendar'; 
import { useFinanceForm } from '@/Composables/Finance/useFinanceForm';
import { useFinanceHistory } from '@/Composables/Finance/useFinanceHistory'; 
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat'; 
import { useGating } from '@/Composables/useGating';

const { tier, canUse, isExplorer, isArchitect, isQuantum, isLegendary } = useGating();

const props = defineProps({
    transactions: Array, budgets: Array, stats: Object, filters: Object, categories: Array, 
});

const page = usePage();
defineOptions({ layout: AuthenticatedLayout });

// 🔥 MAGIC OPTIMISTIC UI: Buat State Lokal
const localTransactions = ref([...props.transactions]);
const localBudgets = ref([...props.budgets]);
const localCategories = ref([...props.categories]);
const localStats = ref(JSON.parse(JSON.stringify(props.stats))); 

watch(() => props.transactions, (newVal) => localTransactions.value = [...newVal], { deep: true });
watch(() => props.budgets, (newVal) => localBudgets.value = [...newVal], { deep: true });
watch(() => props.categories, (newVal) => localCategories.value = [...newVal], { deep: true });
watch(() => props.stats, (newVal) => localStats.value = JSON.parse(JSON.stringify(newVal)), { deep: true });

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

const filterDateRef = ref(props.filters.date || dayjs().format('YYYY-MM-DD'));

const { 
    isBatchModalOpen, batchForm, globalConflictError, 
    openBatchModal, closeBatchModal, addBatchRow, removeBatchRow, submitBatch: executeBatch
} = useFinanceBatch(filterDateRef);

const { visibleStats, filterDate, isArchiveOpen, selectedDayData, openDetail } = useFinanceHistory(historyProps);
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
            <div class="mb-8">
                <FinanceStats 
                    :stats="localStats"
                    :onUpdateTarget="handleUpdateTarget"
                />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                <div class="lg:col-span-3 space-y-8 w-full">
                    <div class="space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div class="flex items-center gap-2">
                                <h3 class="text-lg font-bold text-slate-800 dark:text-white transition-colors duration-500">{{ $t('daily_history') }}</h3>
                                <span v-if="!filterDate" class="text-[10px] font-bold text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">{{ $t('last_5') }}</span>
                                <span v-else class="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">{{ $t('search_result') }}</span>
                                                        <div class="relative shrink-0 transition-colors duration-500">
          <button 
            @click="showFilterPicker = !showFilterPicker" 
            class="pl-3 pr-8 py-2 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-none hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:ring-2 hover:ring-indigo-500/10 transition-all flex items-center gap-2 min-w-[150px] relative transition-colors duration-500" :class="filterDate ? 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30' : 'text-slate-500 dark:text-slate-400'">
                                        <span class="text-base">📅</span>
                                      <span>{{ filterDate ? dayjs(filterDate).locale($page.props.locale).format('DD MMM YYYY') : $t('date_filter') }}</span>
                                        <span class="absolute right-3 text-slate-400 dark:text-slate-600 text-[10px]">{{ showFilterPicker ? '▲' : '▼' }}</span>
                                    </button>
                                    <button v-if="filterDate" @click.stop="filterDate = ''" class="text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-1.5 rounded-lg transition-all border border-transparent hover:border-rose-100 dark:hover:border-rose-500/20" title="Hapus Filter">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                    </button>
                                </div>
                                <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
                                    <div v-if="showFilterPicker" class="absolute right-0 top-full mt-2 z-50 origin-top-right">
                                        <FinanceDatePicker :show="showFilterPicker" :modelValue="filterDate" :transactions="localTransactions" @update:modelValue="(val) => filterDate = val" @close="showFilterPicker = false"/>
                                    </div>
                                </transition>
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
                            <div v-if="!filterDate && visibleStats.length === 5" class="bg-slate-50/50 dark:bg-slate-800/50 p-2.5 text-center border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
                                <p class="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">{{ $t('old_data_hint') }}</p>
                            </div>
                        </div>

                        <ArchiveModal :show="isArchiveOpen" :dayData="selectedDayData" :categories="categories" :close="() => isArchiveOpen = false" :onDelete="triggerDeleteTransaction" :onEdit="handleEdit" />
                    </div>

                   <DailyTrendChart v-if="localTransactions.length && canUse('finance_charts')" :transactions="localTransactions" :currentDate="filters.date" @day-click="openDetail" />
                   
                   <!-- Locked Chart Placeholder for Explorer -->
                   <div v-else-if="isExplorer && localTransactions.length" class="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 text-center space-y-4">
                        <div class="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto text-3xl">📊</div>
                        <h4 class="font-bold text-slate-800 dark:text-white uppercase tracking-widest text-[10px]">{{ $t('premium_feature') }}</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium px-4">{{ $t('upgrade_for_charts', 'Upgrade ke Architect untuk melihat grafik tren pengeluaran Anda.') }}</p>
                        <Link :href="route('pricing.index')" class="inline-block bg-indigo-600 text-white text-[10px] font-black px-4 py-2 rounded-lg shadow-lg shadow-indigo-100 dark:shadow-none uppercase tracking-widest hover:bg-indigo-700 transition-all">{{ $t('upgrade_now') }}</Link>
                   </div>
                </div>

                <div class="lg:col-span-2 w-full md:sticky md:top-24 h-fit space-y-6"> 
                    <BudgetSidebar 
                        v-if="canUse('finance_budgeting')"
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

                    <!-- Locked Budget Sidebar for Explorer -->
                    <div v-else class="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-200 dark:shadow-none relative overflow-hidden">
                        <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                        <div class="relative z-10">
                            <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-2xl">🎯</div>
                            <h3 class="text-xl font-black mb-2 tracking-tight">Master Your Budget</h3>
                            <p class="text-sm font-medium text-indigo-100/80 mb-6 leading-relaxed">Set limits for every category and take control of your financial destiny.</p>
                            <Link :href="route('pricing.index')" class="flex items-center justify-center w-full bg-white text-indigo-600 font-black py-4 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest">
                                {{ $t('btn_unlock_architect', 'Unlock Architect') }}
                            </Link>
                        </div>
                    </div>

                    <FinanceInsights 
                        v-if="canUse('finance_ai_audit')"
                        :expense-stats="localStats.expense_by_category" 
                        :income-stats="localStats.income_by_category" 
                        :budgets="localBudgets" 
                        @update-stats="handleOptimisticInvestment"
                    />
                    
                    <!-- Locked AI Insights for Non-Quantum -->
                    <div v-else-if="tier < 3" class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none overflow-hidden relative group">
                        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <OneForMindIcon name="premium" size="100" />
                        </div>
                        <div class="relative z-10">
                            <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-full mb-4">
                                <span class="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Quantum Feature</span>
                            </div>
                            <h4 class="text-lg font-black text-slate-800 dark:text-white mb-2 leading-tight">AI Financial Pulse</h4>
                            <p class="text-xs text-slate-500 dark:text-slate-400 font-bold mb-6 leading-relaxed">Get predictive insights and automated audit of your spending patterns.</p>
                            <Link :href="route('pricing.index')" class="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                                Learn More about Quantum <OneForMindIcon name="chevron-right" size="12" stroke-width="3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <TransactionModal :show="showTransactionModal" :form="transactionForm" :budgets="localBudgets" :categories="categories" :close="() => showTransactionModal = false" :submit="submitNewTransaction" @switch-to-batch="switchToBatch" />
            <FinanceBatchModal :show="isBatchModalOpen" :form="batchForm" :categories="categories" :budgets="localBudgets" :conflictError="globalConflictError" :close="closeBatchModal" :submit="triggerSubmitBatch" :addRow="addBatchRow" :removeRow="removeBatchRow" :switchToSingle="switchToSingle" />
            <BudgetModal :show="showBudgetModal" :form="budgetForm" :categories="categories" :close="() => showBudgetModal = false" :submit="submitNewBudget" />
            <CategoryModal :show="showCategoryModal" :form="categoryForm" :close="() => showCategoryModal = false" :submit="submitNewCategory" />
        </div>
    </div>
</template>