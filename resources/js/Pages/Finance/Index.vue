<script setup>
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

import FinanceHeader from './FinanceHeader.vue';
import TransactionList from './TransactionList.vue';
import BudgetSidebar from './BudgetSidebar.vue';
import TransactionModal from './TransactionModal.vue';
import BudgetModal from './BudgetModal.vue'; // 🔥 IMPORT BARU

import { useFinanceCalendar } from '@/Composables/Finance/useFinanceCalendar';
import { useFinanceForm } from '@/Composables/Finance/useFinanceForm';

const props = defineProps({
    transactions: Array,
    budgets: Array,
    stats: Object,
    filters: Object 
});

// 1. Calendar Logic (Kita butuh currentMonthKey buat budget)
const { formattedMonth, changeMonth, currentMonthKey } = useFinanceCalendar(props.filters.date);

// 2. Form Logic
// Ambil budgetForm dan submitBudget dari composable
const { transactionForm, submitTransaction, deleteTransaction, budgetForm, submitBudget } = useFinanceForm();

// --- STATE MODALS ---
const showTransactionModal = ref(false);
const showBudgetModal = ref(false); // 🔥 State baru buat modal budget

// Fungsi Submit Budget
const handleBudgetSubmit = () => {
    // Kita kirim 'currentMonthKey' (misal: "2026-01") biar backend tau ini budget bulan apa
    submitBudget(currentMonthKey.value, () => {
        showBudgetModal.value = false; // Tutup kalau sukses
    });
};

const handleTransactionSubmit = () => {
    submitTransaction(() => {
        showTransactionModal.value = false;
    });
};
</script>

<template>
    <Head title="Finance Plan" />

    <AuthenticatedLayout>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <FinanceHeader 
                :currentMonth="formattedMonth"
                :stats="stats"
                :onPrev="() => changeMonth('prev')"
                :onNext="() => changeMonth('next')"
                :onAddClick="() => showTransactionModal = true"
            />

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                    <TransactionList 
                        :transactions="transactions"
                        :onDelete="deleteTransaction"
                    />
                </div>

                <div class="lg:col-span-1">
                    <BudgetSidebar 
                        :budgets="budgets"
                        :expenseStats="stats.expense_by_category"
                        @add="showBudgetModal = true"
                    />
                </div>
            </div>

            <TransactionModal 
                :show="showTransactionModal"
                :form="transactionForm"
                :close="() => showTransactionModal = false"
                :submit="handleTransactionSubmit"
            />

            <BudgetModal 
                :show="showBudgetModal"
                :form="budgetForm"
                :close="() => showBudgetModal = false"
                :submit="handleBudgetSubmit"
            />

        </div>
    </AuthenticatedLayout>
</template>