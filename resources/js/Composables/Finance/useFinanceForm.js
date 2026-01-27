// resources/js/Composables/Finance/useFinanceForm.js
import { useForm, router } from '@inertiajs/vue3';
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

    const submitTransaction = (onSuccessCallback) => {
        transactionForm.post(route('finance.transaction.store'), {
            preserveScroll: true,
            preserveState: true,
            only: ['transactions', 'stats', 'budgets'],
            showProgress: false, 
            // Jurus Instan: Tutup modal duluan lewat callback sebelum request selesai 
            onBefore: () => {
                if(onSuccessCallback) onSuccessCallback();
            },
            onSuccess: () => {
                transactionForm.reset('title', 'amount', 'notes');
            },
            onError: () => {
                // Balikin modal kalau gagal (opsional)
                alert('Gagal simpan transaksi');
            }
        });
    };

    const deleteTransaction = (id) => {
        // Ganti confirm bawaan browser dengan custom UI nanti biar lebih mobile-feel
        if(confirm('Hapus transaksi?')) {
            router.delete(route('finance.transaction.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                only: ['transactions', 'stats', 'budgets'],
                showProgress: false,
                // Tanpa reload halaman sama sekali
            });
        }
    };

    const budgetForm = useForm({
        category: 'food',
        limit_amount: '',
        month: ''
    });

    const submitBudget = (monthKey, onSuccessCallback) => {
        budgetForm.month = monthKey;
        budgetForm.post(route('finance.budget.store'), {
            preserveScroll: true,
            showProgress: false,
            only: ['budgets', 'stats'],
            onBefore: () => {
                if(onSuccessCallback) onSuccessCallback();
            },
            onSuccess: () => {
                budgetForm.reset('limit_amount');
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