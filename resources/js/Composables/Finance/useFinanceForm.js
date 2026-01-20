// resources/js/Composables/Finance/useFinanceForm.js
import { useForm } from '@inertiajs/vue3';
import dayjs from 'dayjs';

export function useFinanceForm() {
    
    // Form Transaksi
    const transactionForm = useForm({
        title: '',
        amount: '',
        type: 'expense', // Default expense
        category: 'food',
        date: dayjs().format('YYYY-MM-DD'),
        notes: ''
    });

    const submitTransaction = (onSuccess) => {
        transactionForm.post(route('finance.transaction.store'), {
            preserveScroll: true,
            onSuccess: () => {
                transactionForm.reset('title', 'amount', 'notes'); // Reset sebagian aja
                if(onSuccess) onSuccess();
            }
        });
    };

    const deleteTransaction = (id) => {
        if(confirm('Yakin mau hapus transaksi ini?')) {
            router.delete(route('finance.transaction.destroy', id), {
                preserveScroll: true
            });
        }
    };

    // Form Budget
    const budgetForm = useForm({
        category: '',
        limit_amount: '',
        month: '' // Nanti diisi otomatis dari currentMonthKey
    });

    const submitBudget = (monthKey, onSuccess) => {
        budgetForm.month = monthKey;
        budgetForm.post(route('finance.budget.store'), {
            preserveScroll: true,
            onSuccess: () => {
                budgetForm.reset();
                if(onSuccess) onSuccess();
            }
        });
    };

    return {
        transactionForm,
        submitTransaction,
        deleteTransaction,
        budgetForm,
        submitBudget
    };
}