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
import DailyTrendChart from './DailyTrendChart.vue';

import { useFinanceCalendar } from '@/Composables/Finance/useFinanceCalendar';
import { useFinanceForm } from '@/Composables/Finance/useFinanceForm';

const props = defineProps({
    transactions: Array, budgets: Array, stats: Object, filters: Object 
});

const { formattedMonth, changeMonth, currentMonthKey } = useFinanceCalendar(props.filters.date);
const { 
    transactionForm, setEditTransaction, submitTransaction, deleteTransaction, 
    budgetForm, submitBudget, deleteBudget 
} = useFinanceForm();

const showTransactionModal = ref(false);
const showBudgetModal = ref(false); 
const deleteState = ref({ show: false, id: null, type: 'transaction' });

// --- HANDLERS ---
const handleEdit = (trx) => {
    setEditTransaction(trx); // Isi form dengan data yang akan diedit
    showTransactionModal.value = true; // Munculkan Modal Form
};

// Edit budget handler (munculkan modal dan isi form)
const handleEditBudget = (budget) => {
    budgetForm.id = budget.id;
    budgetForm.category = budget.category;
    budgetForm.limit_amount = budget.limit_amount;
    budgetForm.month = budget.month || currentMonthKey.value;
    showBudgetModal.value = true;
};

const askDelete = (id, type = 'transaction') => {
    deleteState.value = { show: true, id, type };
};

const confirmDelete = () => {
    if (deleteState.value.type === 'transaction') deleteTransaction(deleteState.value.id);
    else deleteBudget(deleteState.value.id);
    deleteState.value.show = false;
};
</script>

<template>
    <Head title="Finance Plan" />
    <AuthenticatedLayout>
        <div class="max-w-7xl mx-auto px-4 py-8">
            <FinanceHeader 
                :currentMonth="formattedMonth" :stats="stats"
                :onPrev="() => changeMonth('prev')" :onNext="() => changeMonth('next')"
                :onAddClick="() => { transactionForm.reset(); transactionForm.id = null; showTransactionModal = true; }"
            />

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-8">
                    <TransactionList 
                        :transactions="transactions" 
                        :onDelete="askDelete" 
                        :onEdit="handleEdit" 
                    />
                    <DailyTrendChart :transactions="transactions" :currentDate="filters.date" />
                </div>
                <div class="lg:col-span-1">
                    <BudgetSidebar 
                        :budgets="budgets" :expenseStats="stats.expense_by_category"
                        @add="showBudgetModal = true"
                        @delete-budget="(id) => askDelete(id, 'budget')"
                        @edit-budget="handleEditBudget"
                    />
                </div>
            </div>

            <TransactionModal 
    :show="showTransactionModal" 
    :form="transactionForm" 
    :budgets="budgets"
    :close="() => showTransactionModal = false"
    :submit="() => submitTransaction(() => { showTransactionModal = false })"
/>

<BudgetModal 
    :show="showBudgetModal" 
    :form="budgetForm" 
    :budgets="budgets"
    :close="() => showBudgetModal = false"
    :submit="() => submitBudget(currentMonthKey, () => { showBudgetModal = false })"
/>

            <Modal :show="deleteState.show" @close="deleteState.show = false" maxWidth="sm">
                <div class="p-6 text-center">
                    <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🗑️</div>
                    <h3 class="text-lg font-black text-slate-800">Hapus Data?</h3>
                    <p class="text-slate-500 text-sm mt-2">Data ini akan hilang permanen.</p>
                    <div class="flex gap-3 mt-6">
                        <button @click="deleteState.show = false" class="flex-1 py-3 font-bold text-slate-500">Batal</button>
                        <button @click="confirmDelete" class="flex-1 py-3 font-bold bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-100">Hapus</button>
                    </div>
                </div>
            </Modal>
        </div>
    </AuthenticatedLayout>
</template>