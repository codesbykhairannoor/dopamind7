import { useForm, router } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

export function useFinanceForm() {
    const { cleanAmount } = useFinanceFormat();

    /**
     * Helper Translasi Aman (Fallback ke English jika belum load)
     */
    const t = (key, fallback) => {
        if (typeof window.trans === 'function') {
            const result = window.trans(key);
            return result !== key ? result : fallback;
        }
        return fallback;
    };

    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });

    const confirmDelete = (titleKey, textKey, defTitle, defText) => {
        return Swal.fire({
            title: t(titleKey, defTitle),
            text: t(textKey, defText),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#cbd5e1',
            confirmButtonText: t('btn_yes_delete', 'Yes, Delete!'),
            cancelButtonText: t('btn_cancel', 'Cancel'),
            reverseButtons: true,
            customClass: {
                popup: 'rounded-[2rem]',
                confirmButton: 'rounded-xl',
                cancelButton: 'rounded-xl'
            }
        });
    };

    // --- 1. TRANSACTION LOGIC ---
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
        if (!transactionForm.title) {
            Swal.fire({ icon: 'warning', title: t('warn_empty_title', 'Title Required'), text: t('warn_empty_title_text', 'Please enter a title.') });
            return false;
        }
        if (!transactionForm.amount) {
            Swal.fire({ icon: 'warning', title: t('warn_empty_amount', 'Amount Required'), text: t('warn_empty_amount_text', 'How much?') });
            return false;
        }

        const method = transactionForm.id ? 'patch' : 'post';
        const url = transactionForm.id 
            ? route('finance.transaction.update', transactionForm.id) 
            : route('finance.transaction.store');

        transactionForm.transform((data) => ({
            ...data,
            amount: cleanAmount(data.amount), 
        }))[method](url, {
            preserveScroll: true,
            onSuccess: () => {
                transactionForm.reset();
                transactionForm.date = dayjs().format('YYYY-MM-DD');
                toast.fire({ icon: 'success', title: t('success_transaction_saved', 'Saved!') });
                if(onSuccessCallback) onSuccessCallback();
            },
            onError: (errors) => {
                const msg = Object.values(errors)[0];
                Swal.fire({ icon: 'error', title: t('error_title', 'Error'), text: msg });
            }
        });
    };

    const deleteTransaction = (id, onSuccessCallback) => {
        confirmDelete('delete_trx_title', 'delete_trx_text', 'Delete Transaction?', 'Gone forever.').then((result) => {
            if (result.isConfirmed) {
                router.delete(route('finance.transaction.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.fire({ icon: 'success', title: t('success_deleted', 'Deleted') });
                        if (onSuccessCallback) onSuccessCallback();
                    }
                });
            }
        });
    };

    // --- 2. BUDGET LOGIC ---
    const budgetForm = useForm({
        id: null,
        category: '', 
        name: '', 
        icon: '💸', 
        limit_amount: '',
        month: ''
    });

    const submitBudget = (monthKey, onSuccessCallback) => {
        budgetForm.month = monthKey;
        if (!budgetForm.name) {
            Swal.fire({ icon: 'warning', title: t('warn_empty_budget_name', 'Name Required'), text: t('warn_empty_budget_name_text', 'Enter name.') });
            return false;
        }
        if (!budgetForm.category && budgetForm.name) {
            budgetForm.category = budgetForm.name.toLowerCase().replace(/\s+/g, '_');
        }

        const method = budgetForm.id ? 'put' : 'post';
        const url = budgetForm.id ? route('finance.budget.update', budgetForm.id) : route('finance.budget.store');

        budgetForm.transform((data) => ({
            ...data,
            limit_amount: cleanAmount(data.limit_amount),
        }))[method](url, {
            preserveScroll: true,
            onSuccess: () => {
                budgetForm.reset();
                toast.fire({ icon: 'success', title: t('success_budget_saved', 'Saved!') });
                if(onSuccessCallback) onSuccessCallback();
            },
            onError: (errors) => {
                const msg = Object.values(errors)[0];
                Swal.fire({ icon: 'error', title: t('error_title', 'Error'), text: msg });
            }
        });
    };

    const deleteBudget = (id) => {
        confirmDelete('delete_budget_title', 'delete_budget_text', 'Delete Budget?', 'Target removed.').then((result) => {
            if (result.isConfirmed) {
                router.delete(route('finance.budget.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => toast.fire({ icon: 'success', title: t('success_deleted', 'Deleted') })
                });
            }
        });
    };

    // --- 3. CATEGORY LOGIC (BARU) ---
    const categoryForm = useForm({
        name: '',
        icon: '💰',
        type: 'income' // Default type
    });

    const setEditCategory = (cat) => {
        categoryForm.name = cat.name;
        categoryForm.icon = cat.icon;
        // Kita tidak ubah type saat edit biasanya, tapi bisa disesuaikan
    };

    const submitCategory = (categoryToEdit, onSuccessCallback) => {
        const url = categoryToEdit 
            ? route('finance.categories.update', categoryToEdit.id) 
            : route('finance.categories.store');
        const method = categoryToEdit ? 'put' : 'post';

        categoryForm[method](url, {
            preserveScroll: true,
            onSuccess: () => { 
                categoryForm.reset(); 
                toast.fire({ icon: 'success', title: t('success_saved', 'Saved successfully') });
                if (onSuccessCallback) onSuccessCallback();
            },
            onError: (errors) => {
                const msg = Object.values(errors)[0] || 'Error saving data.';
                Swal.fire({ icon: 'error', title: t('error_title', 'Error'), text: msg });
            }
        });
    };

    const deleteCategory = (id, onSuccessCallback) => {
        confirmDelete('confirm_delete_title', 'delete_confirm_msg', 'Are you sure?', 'Permanently deleted.').then((result) => {
            if (result.isConfirmed) {
                router.delete(route('finance.categories.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.fire({ icon: 'success', title: t('success_deleted', 'Deleted successfully') });
                        if (onSuccessCallback) onSuccessCallback();
                    },
                    onError: (errors) => {
                        const msg = errors.error || 'Failed to delete category.';
                        Swal.fire({ icon: 'error', title: t('error_title', 'Error'), text: msg });
                    }
                });
            }
        });
    };

    const updateIncomeTarget = (month, amount) => {
        router.post(route('finance.income-target.update'), { month, amount }, { preserveScroll: true });
    };

    return {
        // Transaction
        transactionForm, setEditTransaction, submitTransaction, deleteTransaction,
        // Budget
        budgetForm, submitBudget, deleteBudget,
        // Category (Unified)
        categoryForm, setEditCategory, submitCategory, deleteCategory,
        // Utils
        updateIncomeTarget,
        t // Export helper translasi jika butuh di komponen
    };
}