import { useForm, router } from '@inertiajs/vue3';
import dayjs from 'dayjs';

export function useFinanceForm() {
    
    // --- TRANSACTION ---
    const transactionForm = useForm({
        id: null,
        title: '',
        amount: '',
        type: 'expense',
        category: '',
        date: dayjs().format('YYYY-MM-DD'),
        notes: ''
    });

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
            onSuccess: () => {
                transactionForm.reset();
                if(onSuccessCallback) onSuccessCallback();
            },
            onError: () => alert('Gagal simpan transaksi.')
        });
    };

    const deleteTransaction = (id, onSuccessCallback) => {
        if(confirm('Hapus transaksi ini?')) {
            router.delete(route('finance.transaction.destroy', id), {
                preserveScroll: true,
                onSuccess: () => { if (onSuccessCallback) onSuccessCallback(); }
            });
        }
    };

    // --- BUDGET ---
    const budgetForm = useForm({
        id: null,
        category: '', // Slug
        name: '',     // Display Name (dikirim ke backend buat create/update category)
        icon: '💸',   // Icon
        limit_amount: '',
        month: ''
    });

    const submitBudget = (monthKey, onSuccessCallback) => {
        budgetForm.month = monthKey;
        // Generate slug dari nama jika kategori baru
        if (!budgetForm.category && budgetForm.name) {
            budgetForm.category = budgetForm.name.toLowerCase().replace(/\s+/g, '_');
        }

        const method = budgetForm.id ? 'put' : 'post';
        const url = budgetForm.id 
            ? route('finance.budget.update', budgetForm.id) 
            : route('finance.budget.store');

        budgetForm[method](url, {
            preserveScroll: true,
            onSuccess: () => {
                budgetForm.reset();
                if(onSuccessCallback) onSuccessCallback();
            },
            onError: (err) => {
                console.error(err);
                alert('Gagal simpan budget.');
            }
        });
    };

    const deleteBudget = (id, options = {}) => {
        router.delete(route('finance.budget.destroy', id), {
            preserveScroll: true,
            ...options
        });
    };

    const updateIncomeTarget = (month, amount) => {
        router.post(route('finance.income-target.update'), {
            month: month,
            amount: amount
        }, { preserveScroll: true });
    };

    return {
        transactionForm,
        setEditTransaction,
        submitTransaction,
        deleteTransaction,
        budgetForm,
        submitBudget,
        updateIncomeTarget,
        deleteBudget
    };
}