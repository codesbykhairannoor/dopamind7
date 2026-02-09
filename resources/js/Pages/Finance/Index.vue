<script setup>
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import Modal from '@/Components/Modal.vue';

import FinanceHeader from './FinanceHeader.vue';
import TransactionList from './TransactionList.vue'; 
import BudgetSidebar from './BudgetSidebar.vue';
import TransactionModal from './TransactionModal.vue';
import BudgetModal from './BudgetModal.vue'; 
import DailyTrendChart from './DailyTrendChart.vue'; // Asumsi file ini sudah ada/aman

import { useFinanceCalendar } from '@/Composables/Finance/useFinanceCalendar'; // Asumsi file ini aman
import { useFinanceForm } from '@/Composables/Finance/useFinanceForm';

const props = defineProps({
    transactions: Array, 
    budgets: Array, 
    stats: Object,
    filters: Object,
    categories: Array, // Data Kategori dari DB
});

const { formattedMonth, changeMonth, currentMonthKey } = useFinanceCalendar(props.filters.date);
const { 
    transactionForm, setEditTransaction, submitTransaction, deleteTransaction, 
    budgetForm, submitBudget, deleteBudget, updateIncomeTarget,
} = useFinanceForm();

const showTransactionModal = ref(false);
const showBudgetModal = ref(false); 
const deleteState = ref({ show: false, id: null, type: 'transaction' });

// --- HANDLERS ---
const handleEdit = (trx) => {
    setEditTransaction(trx);
    showTransactionModal.value = true;
};

const handleEditBudget = (budget) => {
    // Cari detail nama/icon dari kategori master
    const catDetail = props.categories.find(c => c.slug === budget.category);
    
    budgetForm.id = budget.id;
    budgetForm.category = budget.category;
    budgetForm.name = catDetail ? catDetail.name : budget.category; // Pre-fill nama
    budgetForm.icon = catDetail ? catDetail.icon : '💸'; // Pre-fill icon
    budgetForm.limit_amount = budget.limit_amount;
    budgetForm.month = budget.month || currentMonthKey.value;
    showBudgetModal.value = true;
};

const askDelete = (id, type = 'transaction') => {
    deleteState.value = { show: true, id, type };
};

const confirmDelete = () => {
    const callback = () => { deleteState.value.show = false; };
    if (deleteState.value.type === 'transaction') {
        deleteTransaction(deleteState.value.id, callback);
    } else {
        deleteBudget(deleteState.value.id, {
            onSuccess: callback,
            onError: (err) => { alert(err.error || 'Gagal hapus'); callback(); }
        });
    }
};

const submitNewTransaction = () => {
    submitTransaction(() => { showTransactionModal.value = false; });
};
</script>

<template>
    <Head title="Finance Plan" />
    <AuthenticatedLayout>
        <div class="max-w-7xl mx-auto px-4 py-8">
            <FinanceHeader 
                :currentMonth="formattedMonth" 
                :currentMonthKey="currentMonthKey"
                :stats="stats"
                :onAddClick="() => { transactionForm.reset(); transactionForm.id = null; showTransactionModal = true; }"
                :onUpdateTarget="(amount) => updateIncomeTarget(currentMonthKey, amount)"
                :onChangeDate="(payload) => changeMonth(payload)"
            />

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div class="lg:col-span-2 space-y-8">
                    <TransactionList 
                        :transactions="transactions" 
                        :categories="categories" 
                        :onDelete="askDelete" 
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
                        @delete-budget="(id) => askDelete(id, 'budget')"
                        @edit-budget="handleEditBudget"
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

            <Modal :show="deleteState.show" @close="deleteState.show = false" maxWidth="sm">
                <div class="p-6 text-center">
                    <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🗑️</div>
                    <h3 class="text-lg font-black text-slate-800">Yakin hapus?</h3>
                    <div class="flex gap-3 mt-6">
                        <button @click="deleteState.show = false" class="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl">Batal</button>
                        <button @click="confirmDelete" class="flex-1 py-3 font-bold bg-rose-500 text-white rounded-xl shadow-lg hover:bg-rose-600">Hapus</button>
                    </div>
                </div>
            </Modal>
        </div>
    </AuthenticatedLayout>
</template>