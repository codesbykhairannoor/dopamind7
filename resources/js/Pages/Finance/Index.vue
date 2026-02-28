<script setup>
import { ref, watch, reactive } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
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
import FinanceInsights from './FinanceInsights.vue'; 
import FinanceDatePicker from './FinanceDatePicker.vue';
import FinanceBatchModal from './FinanceBatchModal.vue';

// Composables
import { useFinanceBatch } from '@/Composables/Finance/useFinanceBatch';
import { useFinanceCalendar } from '@/Composables/Finance/useFinanceCalendar'; 
import { useFinanceForm } from '@/Composables/Finance/useFinanceForm';
import { useFinanceHistory } from '@/Composables/Finance/useFinanceHistory'; 
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat'; 

const props = defineProps({
    transactions: Array, budgets: Array, stats: Object, filters: Object, categories: Array, 
});

const page = usePage();
defineOptions({ layout: AuthenticatedLayout });

// 🔥 MAGIC OPTIMISTIC UI: Buat State Lokal (Memori Layar)
const localTransactions = ref([...props.transactions]);
const localBudgets = ref([...props.budgets]);
const localCategories = ref([...props.categories]);

// Sinkronkan otomatis saat server memberi update data asli 
watch(() => props.transactions, (newVal) => localTransactions.value = [...newVal], { deep: true });
watch(() => props.budgets, (newVal) => localBudgets.value = [...newVal], { deep: true });
watch(() => props.categories, (newVal) => localCategories.value = [...newVal], { deep: true });

// Bungkus props menjadi reactive agar History List membaca data instan
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
    updateIncomeTarget,
} = useFinanceForm();

const showTransactionModal = ref(false);
const showBudgetModal = ref(false); 
const showCategoryModal = ref(false);
const showFilterPicker = ref(false);

// 🔥 FIX ERROR DI SINI: Deklarasikan filterDateRef SEBELUM memanggil useFinanceBatch
const filterDateRef = ref(props.filters.date || dayjs().format('YYYY-MM-DD'));

const { 
    isBatchModalOpen, batchForm, globalConflictError, 
    openBatchModal, closeBatchModal, addBatchRow, removeBatchRow, submitBatch: executeBatch // <-- ubah jadikan alias
} = useFinanceBatch(filterDateRef);

// Oper magic prop ke Composables History
const { visibleStats, filterDate, isArchiveOpen, selectedDayData, openDetail } = useFinanceHistory(historyProps);
const { formatMoney } = useFinanceFormat();

// --- Handlers ---
const handleEdit = (trx) => { setEditTransaction(trx); showTransactionModal.value = true; };

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

// 🔥 EKSEKUSI OPTIMISTIC UI UNTUK TRANSAKSI
const submitNewTransaction = () => {
    submitTransaction({
        onOptimistic: (data, isEditing) => {
    showTransactionModal.value = false; // Langsung tutup 0ms

            if (isEditing) {
                const idx = localTransactions.value.findIndex(t => t.id === data.id);
                if (idx !== -1) Object.assign(localTransactions.value[idx], data);
            } else {
                localTransactions.value.unshift(data); 
            }
        },
        onError: (id, isEditing) => {
            if (!isEditing) localTransactions.value = localTransactions.value.filter(t => t.id !== id);
            showTransactionModal.value = true; 
        }
    });
};

const triggerDeleteTransaction = (id) => {
    isArchiveOpen.value = false; // Instan close modal archive
    deleteTransaction(id, {
        onOptimistic: (targetId) => {
            localTransactions.value = localTransactions.value.filter(t => t.id !== targetId);
        }
    });
};

// 🔥 EKSEKUSI OPTIMISTIC UI UNTUK BATCH TRANSAKSI
const triggerSubmitBatch = () => {
    executeBatch({
        onOptimistic: (newTransactionsArray) => {
            // Karena ini batch (array), kita unshift semuanya sekaligus ke paling atas memori UI
            localTransactions.value.unshift(...newTransactionsArray);
        },
        onError: (tempIdsArray) => {
            // Kalau server gagal, hapus id sementara dari array UI
            localTransactions.value = localTransactions.value.filter(t => !tempIdsArray.includes(t.id));
        }
    });
};


// 🔥 EKSEKUSI OPTIMISTIC UI UNTUK BUDGET
const submitNewBudget = () => {
    showBudgetModal.value = false; // Langsung tutup 0ms
    submitBudget(currentMonthKey.value, {
        onOptimistic: (data, isEditing) => {
            if (isEditing) {
                // 1. Update angka limit di list Budget
                const idx = localBudgets.value.findIndex(b => b.id === data.id);
                if (idx !== -1) Object.assign(localBudgets.value[idx], data);

                // 2. 🔥 FIX UTAMA: Update Master Kategori secara Instan!
                // Cari kategori berdasarkan slug lama, lalu tembak nama & icon barunya
                const catIdx = localCategories.value.findIndex(c => c.slug === data.category);
                if (catIdx !== -1) {
                    localCategories.value[catIdx].name = data.name;
                    localCategories.value[catIdx].icon = data.icon;
                }
            } else {
                localBudgets.value.push(data);
                // Jika bikin budget baru sekaligus kategori baru yg belum ada
                if (!localCategories.value.find(c => c.slug === data.category)) {
                    localCategories.value.push({ 
                        id: 'temp_' + Date.now(), 
                        slug: data.category, 
                        name: data.name, 
                        icon: data.icon, 
                        type: 'expense' 
                    });
                }
            }
        },
        onError: (id, isEditing) => {
            if (!isEditing) localBudgets.value = localBudgets.value.filter(b => b.id !== id);
            showBudgetModal.value = true; // Buka lagi kalau server error
        }
    });
};

// 🔥 EKSEKUSI OPTIMISTIC UI UNTUK KATEGORI (Income Source dll)
const submitNewCategory = () => {
    showCategoryModal.value = false; // Instan Tutup
    submitCategory({
        onOptimistic: (data, isEditing) => {
            if (isEditing) {
                const idx = localCategories.value.findIndex(c => c.id === data.id);
                if (idx !== -1) {
                    // 🔥 FIX: Hanya update Nama dan Icon saja!
                    // Jangan ubah slug-nya secara optimis, biar relasi history transaksi gak kedip/hilang
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
    deleteBudget(id, {
        onOptimistic: (targetId) => { localBudgets.value = localBudgets.value.filter(b => b.id !== targetId); }
    });
};



const triggerDeleteCategory = (cat) => {
    deleteCategory(cat, {
        onOptimistic: (targetId) => {
            localCategories.value = localCategories.value.filter(c => c.id !== targetId);
        }
    });
};

// Logic Switcher
const switchToBatch = () => {
    showTransactionModal.value = false; // Tutup mode single
    setTimeout(() => { openBatchModal(); }, 150); // Buka mode batch dengan sedikit delay untuk animasi
};

const switchToSingle = () => {
    closeBatchModal(); // Tutup batch
    setTimeout(() => { 
        transactionForm.reset(); transactionForm.id = null; 
        showTransactionModal.value = true; 
    }, 150);
};
</script>

<template>
    <Head title="Finance Plan" />
    <div>
        
        <FinanceHeader 
            :currentMonth="formattedMonth" 
            :currentMonthKey="currentMonthKey"
            :onChangeDate="(payload) => changeMonth(payload)"
            :onAddClick="() => { transactionForm.reset(); transactionForm.id = null; showTransactionModal = true; }"
        />

        <div class="w-full min-h-screen bg-slate-50/50 px-4 sm:px-6 lg:px-8 py-8">
            
            <div class="mb-8">
                <FinanceStats 
                    :stats="stats"
                    :onUpdateTarget="(amount) => updateIncomeTarget(currentMonthKey, amount)"
                />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                
                <div class="lg:col-span-3 space-y-8 w-full">
                    
                    <div class="space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div class="flex items-center gap-2">
                                <h3 class="text-lg font-bold text-slate-800">{{ $t('daily_history') }}</h3>
                                
                                <span v-if="!filterDate" class="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                                    {{ $t('last_5') }}
                                </span>
                                <span v-else class="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                                    {{ $t('search_result') }}
                                </span>
                            </div>

                            <div class="relative z-30"> 
                                <div class="flex items-center gap-2">
                                    <button 
                                        @click="showFilterPicker = !showFilterPicker"
                                        class="pl-3 pr-8 py-2 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 hover:ring-2 hover:ring-indigo-500/10 transition-all flex items-center gap-2 min-w-[150px] relative"
                                        :class="filterDate ? 'text-indigo-600 border-indigo-200' : 'text-slate-500'"
                                    >
                                        <span class="text-base">📅</span>
                                      <span>
    {{ filterDate ? dayjs(filterDate).locale($page.props.locale).format('DD MMM YYYY') : $t('date_filter') }}
</span>
                                        <span class="absolute right-3 text-slate-400 text-[10px]">
                                            {{ showFilterPicker ? '▲' : '▼' }}
                                        </span>
                                    </button>
                                    
                                    <button 
                                        v-if="filterDate" 
                                        @click.stop="filterDate = ''"
                                        class="text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-all border border-transparent hover:border-rose-100"
                                        title="Hapus Filter"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                               <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
>
    <div v-if="showFilterPicker" class="absolute right-0 top-full mt-2 z-50 origin-top-right">
        <FinanceDatePicker 
            :show="showFilterPicker"
            :modelValue="filterDate"
            :transactions="localTransactions"
            @update:modelValue="(val) => filterDate = val"
            @close="showFilterPicker = false"
        />
    </div>
</transition>
                            </div>
                        </div>

                        <div v-if="localTransactions.length === 0" class="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200">
                            <div class="text-3xl mb-2">📒</div>
                            <p class="text-slate-400 text-sm font-medium">{{ $t('no_transaction') }}</p>
                        </div>

                        <div v-else class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-50">
                            <div v-for="day in visibleStats" :key="day.date" 
                                @click="openDetail(day)"
                                class="group p-4 flex items-center justify-between hover:bg-indigo-50/50 transition-colors cursor-pointer"
                            >
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-white dark:bg-slate-900 transition-all shadow-sm">
                                        <span class="text-[10px] uppercase font-black text-slate-400 leading-none">{{ day.dateObj.format('MMM') }}</span>
                                        <span class="text-xl font-black leading-none text-slate-700 mt-0.5">{{ day.dateObj.format('DD') }}</span>
                                    </div>
                                    
                                    <div>
                                        <h4 class="font-bold text-slate-700 text-sm capitalize">{{ day.dateObj.format('dddd') }}</h4>
                                        <span class="text-[11px] text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 mt-1 inline-block">
                                            {{ $t('transaction_count', { count: day.transactions.length }) }}
                                        </span>
                                    </div>
                                </div>

                                <div class="flex items-center gap-6">
                                    <div class="pl-4 border-l border-slate-100 text-right">
                                        <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">{{ $t('daily_net') }}</span>
                                        <span class="text-sm font-black font-mono" :class="(day.total_income - day.total_expense) >= 0 ? 'text-indigo-600' : 'text-orange-500'">
                                            {{ (day.total_income - day.total_expense) >= 0 ? '+' : '' }}{{ formatMoney(day.total_income - day.total_expense) }}
                                        </span>
                                    </div>
                                    <span class="text-slate-300 group-hover:text-indigo-400 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            
                            <div v-if="!filterDate && visibleStats.length === 5" class="bg-slate-50/50 p-2.5 text-center border-t border-slate-100">
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ $t('old_data_hint') }}</p>
                            </div>
                        </div>

                        <ArchiveModal 
                            :show="isArchiveOpen" 
                            :dayData="selectedDayData" 
                            :categories="categories"
                            :close="() => isArchiveOpen = false"
                            :onDelete="triggerDeleteTransaction"
                            :onEdit="handleEdit" 
                        />
                    </div>

                   <DailyTrendChart 
    v-if="localTransactions.length" 
    :transactions="localTransactions" 
    :currentDate="filters.date"
    @day-click="openDetail" 
/>
                </div>

                <div class="lg:col-span-2 w-full md:sticky md:top-24 h-fit space-y-6"> 
                    <BudgetSidebar 
                        :budgets="localBudgets" 
                        :categories="localCategories" 
                        :expenseStats="stats.expense_by_category"
                        :incomeStats="stats.income_by_category"
                        @add="() => { budgetForm.reset(); budgetForm.id = null; showBudgetModal = true; }"
                        @delete-budget="triggerDeleteBudget"
                        @edit-budget="handleEditBudget"
                        @add-category="handleAddCategory"
                        @edit-category="handleEditCategory"
                        @delete-category="triggerDeleteCategory"
                    />

                    <FinanceInsights 
                        :expense-stats="stats.expense_by_category" 
                        :income-stats="stats.income_by_category" 
                        :budgets="localBudgets" 
                    />
                </div>

            </div>

            <TransactionModal 
                :show="showTransactionModal" 
                :form="transactionForm" 
                :budgets="localBudgets" 
                :categories="categories"
                :close="() => showTransactionModal = false" 
                :submit="submitNewTransaction" 
                @switch-to-batch="switchToBatch"
            />

           <FinanceBatchModal 
    :show="isBatchModalOpen"
    :form="batchForm"
    :categories="categories"
    :budgets="localBudgets"
    :conflictError="globalConflictError"
    :close="closeBatchModal"
    :submit="triggerSubmitBatch" :addRow="addBatchRow"
    :removeRow="removeBatchRow"
    :switchToSingle="switchToSingle"
/>

            <BudgetModal 
                :show="showBudgetModal" 
                :form="budgetForm" 
                :categories="categories"
                :close="() => showBudgetModal = false"
                :submit="submitNewBudget"
            />

            <CategoryModal
                :show="showCategoryModal"
                :form="categoryForm"
                :close="() => showCategoryModal = false"
                :submit="submitNewCategory"
            />
        </div>
    </div>
</template>