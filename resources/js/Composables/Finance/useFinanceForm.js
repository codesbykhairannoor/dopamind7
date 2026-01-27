import { useForm, router } from '@inertiajs/vue3';
import dayjs from 'dayjs';

export function useFinanceForm() {
    
    // --- 1. TRANSACTION LOGIC ---
    const transactionForm = useForm({
        id: null,
        title: '',
        amount: '',
        type: 'expense',
        category: 'food',
        date: dayjs().format('YYYY-MM-DD'),
        notes: ''
    });

    // Fungsi sakti untuk memindahkan data dari list ke form saat edit
    const setEditTransaction = (trx) => {
        transactionForm.id = trx.id;
        transactionForm.title = trx.title;
        transactionForm.amount = trx.amount;
        transactionForm.type = trx.type;
        transactionForm.category = trx.category;
        transactionForm.date = trx.date;
        transactionForm.notes = trx.notes ?? '';
    };

    const submitTransaction = (onSuccessCallback) => {
        const method = transactionForm.id ? 'patch' : 'post';
        const url = transactionForm.id 
            ? route('finance.transaction.update', transactionForm.id) 
            : route('finance.transaction.store');

        transactionForm[method](url, {
            preserveScroll: true,
            preserveState: true,
            onBefore: () => {
                if(onSuccessCallback) onSuccessCallback();
            },
            onSuccess: () => {
                transactionForm.reset();
            },
            onError: () => {
                alert('Gagal memproses transaksi. Cek kembali inputan kamu.');
            }
        });
    };

    // Hapus id saja tanpa confirm() browser
    const deleteTransaction = (id, onSuccessCallback) => {
        router.delete(route('finance.transaction.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                if (onSuccessCallback) onSuccessCallback();
            }
        });
    };

    // --- 2. BUDGET LOGIC ---
    const budgetForm = useForm({
        id: null,
        category: 'food',
        limit_amount: '',
        month: ''
    });

    const submitBudget = (monthKey, onSuccessCallback) => {
        budgetForm.month = monthKey;
        const method = budgetForm.id ? 'put' : 'post';
        const url = budgetForm.id 
            ? route('finance.budget.update', budgetForm.id) 
            : route('finance.budget.store');

        budgetForm[method](url, {
            preserveScroll: true,
            onBefore: () => {
                if(onSuccessCallback) onSuccessCallback();
            },
            onSuccess: () => {
                budgetForm.reset();
            }
        });
    };

    const deleteBudget = (id) => {
        router.delete(route('finance.budget.destroy', id), {
            preserveScroll: true
        });
    };

    return {
        transactionForm,
        setEditTransaction,
        submitTransaction,
        deleteTransaction,
        budgetForm,
        submitBudget,
        deleteBudget
    };
}