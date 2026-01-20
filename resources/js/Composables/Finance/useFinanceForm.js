// resources/js/Composables/Finance/useFinanceForm.js
import { useForm, router } from '@inertiajs/vue3'; // Tambahkan router di sini
import dayjs from 'dayjs';

export function useFinanceForm() {
    
    const transactionForm = useForm({
        title: '',
        amount: '',
        type: 'expense',
        category: 'food',
        date: dayjs().format('YYYY-MM-DD'),
        notes: ''
    });

    const submitTransaction = (onSuccess) => {
        transactionForm.post(route('finance.transaction.store'), {
            preserveScroll: true,
            preserveState: true,
            only: ['transactions', 'stats', 'budgets'], // 🔥 HANYA ambil data yang berubah
            showProgress: false, // 🔥 Matikan loading bar
            onSuccess: () => {
                transactionForm.reset('title', 'amount', 'notes');
                if(onSuccess) onSuccess();
            }
        });
    };

    const deleteTransaction = (id) => {
        if(confirm('Yakin mau hapus transaksi ini?')) {
            router.delete(route('finance.transaction.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                only: ['transactions', 'stats', 'budgets'], // 🔥 Optimasi di sini
                showProgress: false
            });
        }
    };

    const budgetForm = useForm({
        category: '',
        limit_amount: '',
        month: ''
    });

    const submitBudget = (monthKey, onSuccess) => {
        budgetForm.month = monthKey;
        budgetForm.post(route('finance.budget.store'), {
            preserveScroll: true,
            preserveState: true,
            only: ['budgets', 'stats'], // 🔥 Optimasi
            showProgress: false,
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