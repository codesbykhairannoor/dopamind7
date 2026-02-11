<script setup>
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

import FinanceHeader from './FinanceHeader.vue';
import FinanceStats from './FinanceStats.vue';
import TransactionList from './TransactionList.vue'; 
import BudgetSidebar from './BudgetSidebar.vue';
import TransactionModal from './TransactionModal.vue';
import BudgetModal from './BudgetModal.vue'; 
import CategoryModal from './CategoryModal.vue'; // 1. Import CategoryModal
import DailyTrendChart from './DailyTrendChart.vue'; 

import { useFinanceCalendar } from '@/Composables/Finance/useFinanceCalendar'; 
import { useFinanceForm } from '@/Composables/Finance/useFinanceForm';

const props = defineProps({
    transactions: Array, 
    budgets: Array, 
    stats: Object,
    filters: Object,
    categories: Array, 
});

const { formattedMonth, changeMonth, currentMonthKey } = useFinanceCalendar(props.filters.date);

// 2. Ambil semua fungsi category dari useFinanceForm
const { 
    transactionForm, setEditTransaction, submitTransaction, deleteTransaction, 
    budgetForm, submitBudget, deleteBudget, 
    categoryForm, setEditCategory, submitCategory, deleteCategory, // Tambahan
    updateIncomeTarget,
} = useFinanceForm();

const showTransactionModal = ref(false);
const showBudgetModal = ref(false); 
const showCategoryModal = ref(false); // 3. State untuk Modal Kategori

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

// 4. Handler Edit Kategori (Akan dipanggil dari BudgetSidebar)
const handleEditCategory = (cat) => {
    categoryForm.id = cat.id; // Penting buat update
    setEditCategory(cat);
    showCategoryModal.value = true;
};

// 5. Handler Tambah Kategori
const handleAddCategory = () => {
    categoryForm.reset();
    categoryForm.id = null;
    showCategoryModal.value = true;
};

// 6. Handler Delete Kategori
const handleDeleteCategory = (cat) => {
    deleteCategory(cat.id);
    // Modal otomatis ketutup krn ini cuma alert, tapi kalau mau aman:
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
                    <TransactionList 
                        :transactions="transactions" 
                        :categories="categories" 
                        :onDelete="deleteTransaction" 
                        :onEdit="handleEdit" 
                    />
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