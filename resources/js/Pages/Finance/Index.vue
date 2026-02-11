<script setup>
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import dayjs from 'dayjs';

// Components
import FinanceHeader from './FinanceHeader.vue';
import FinanceStats from './FinanceStats.vue';
// TransactionList dihapus karena digantikan UI baru
import BudgetSidebar from './BudgetSidebar.vue';
import TransactionModal from './TransactionModal.vue';
import BudgetModal from './BudgetModal.vue'; 
import CategoryModal from './CategoryModal.vue'; 
import DailyTrendChart from './DailyTrendChart.vue'; 
import ArchiveModal from './ArchiveModal.vue'; // Import Baru

// Import Kalender Cantik Kita
import FinanceDatePicker from './FinanceDatePicker.vue'; // Import Baru

// Composables
import { useFinanceCalendar } from '@/Composables/Finance/useFinanceCalendar'; 
import { useFinanceForm } from '@/Composables/Finance/useFinanceForm';
import { useFinanceHistory } from '@/Composables/Finance/useFinanceHistory'; // Import Baru
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat'; // Import Baru

const props = defineProps({
    transactions: Array, 
    budgets: Array, 
    stats: Object,
    filters: Object,
    categories: Array, 
});

// --- Logic Lama (Calendar & Forms) ---
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

// --- Logic Baru (History & Format) ---
// Ambil logic tanggal dari useFinanceHistory
const { visibleStats, filterDate, isArchiveOpen, selectedDayData, openDetail } = useFinanceHistory(props);

// Ambil logic uang dari useFinanceFormat
const { formatMoney } = useFinanceFormat();

// State buat kontrol Popover Kalender
const showFilterPicker = ref(false);

// --- Handlers ---

// Handler Edit Transaction
const handleEdit = (trx) => {
    setEditTransaction(trx);
    showTransactionModal.value = true;
};

// Handler Edit Budget
const handleEditBudget = (budget) => {
    const catDetail = props.categories.find(c => c.slug === budget.category);
    budgetForm.id = budget.id;
    budgetForm.category = budget.category;
    budgetForm.name = catDetail ? catDetail.name : budget.category; 
    budgetForm.icon = catDetail ? catDetail.icon : '💸'; 
    budgetForm.limit_amount = budget.limit_amount;
    budgetForm.month = budget.month || currentMonthKey.value;
    showBudgetModal.value = true;
};

// Handler Edit Kategori 
const handleEditCategory = (cat) => {
    categoryForm.id = cat.id; 
    setEditCategory(cat);
    showCategoryModal.value = true;
};

// Handler Tambah Kategori
const handleAddCategory = () => {
    categoryForm.reset();
    categoryForm.id = null;
    showCategoryModal.value = true;
};

// Handler Delete Kategori
const handleDeleteCategory = (cat) => {
    deleteCategory(cat.id);
    showCategoryModal.value = false; 
};

const submitNewTransaction = () => {
    submitTransaction(() => { showTransactionModal.value = false; });
};
</script>

<template>
    <Head title="Finance Plan" />
    <AuthenticatedLayout>
        
        <FinanceHeader 
            :currentMonth="formattedMonth" 
            :currentMonthKey="currentMonthKey"
            :onChangeDate="(payload) => changeMonth(payload)"
            :onAddClick="() => { transactionForm.reset(); transactionForm.id = null; showTransactionModal = true; }"
        />

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <FinanceStats 
                :stats="stats"
                :onUpdateTarget="(amount) => updateIncomeTarget(currentMonthKey, amount)"
            />

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div class="lg:col-span-2 space-y-8">
                    
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
                                    class="pl-3 pr-8 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 hover:ring-2 hover:ring-indigo-500/10 transition-all flex items-center gap-2 min-w-[150px] relative"
                                    :class="filterDate ? 'text-indigo-600 border-indigo-200' : 'text-slate-500'"
                                >
                                    <span class="text-base">📅</span>
                                    <span>{{ filterDate ? dayjs(filterDate).locale('id').format('DD MMM YYYY') : 'Filter Tanggal' }}</span>
                                    
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
                                <div v-if="showFilterPicker" class="absolute right-0 top-full mt-2 z-50 origin-top-right shadow-2xl rounded-3xl">
                                    <FinanceDatePicker 
    :show="showFilterPicker" 
    :modelValue="filterDate"
    :transactions="transactions"  @update:modelValue="(val) => filterDate = val"
    @close="showFilterPicker = false"
/>
                                </div>
                            </transition>
                        </div>
                        </div>

                        <div v-if="transactions.length === 0" class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
                            <div class="text-3xl mb-2">📒</div>
                            <p class="text-slate-400 text-sm font-medium">{{ $t('no_transaction') }}</p>
                        </div>

                        <div v-else class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-50">
                            <div v-for="day in visibleStats" :key="day.date" 
                                @click="openDetail(day)"
                                class="group p-4 flex items-center justify-between hover:bg-indigo-50/50 transition-colors cursor-pointer"
                            >
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-white transition-all shadow-sm">
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
                            :onDelete="deleteTransaction"
                            :onEdit="handleEdit" 
                        />
                    </div>
                    <DailyTrendChart v-if="transactions.length" :transactions="transactions" :currentDate="filters.date" />
                </div>

                <div class="lg:col-span-1">
                    <BudgetSidebar 
                        :budgets="budgets" 
                        :categories="categories" 
                        :expenseStats="stats.expense_by_category"
                        :incomeStats="stats.income_by_category"
                        @add="() => { budgetForm.reset(); budgetForm.id = null; showBudgetModal = true; }"
                        @delete-budget="deleteBudget"
                        @edit-budget="handleEditBudget"
                        
                        @add-category="handleAddCategory"
                        @edit-category="handleEditCategory"
                        @delete-category="handleDeleteCategory"
                    />
                </div>
            </div>

            <TransactionModal 
                :show="showTransactionModal" 
                :form="transactionForm" 
                :budgets="budgets" 
                :categories="categories"
                :close="() => showTransactionModal = false" 
                :submit="submitNewTransaction" 
            />

            <BudgetModal 
                :show="showBudgetModal" 
                :form="budgetForm" 
                :categories="categories"
                :close="() => showBudgetModal = false"
                :submit="() => submitBudget(currentMonthKey, () => { showBudgetModal = false })"
            />

            <CategoryModal
                :show="showCategoryModal"
                :form="categoryForm"
                :close="() => showCategoryModal = false"
                :submit="() => submitCategory(categoryForm.id ? { id: categoryForm.id } : null, () => { showCategoryModal = false })"
            />

        </div>
    </AuthenticatedLayout>
</template>