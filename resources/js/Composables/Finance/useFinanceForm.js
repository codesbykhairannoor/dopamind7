import { useForm, router } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
// 1. Import trans agar bahasa berubah instan tanpa refresh
import { trans } from 'laravel-vue-i18n'; 

export function useFinanceForm() {
    const { cleanAmount } = useFinanceFormat();

    // --- 1. HELPER TRANSLASI REAKTIF ---
    const t = (key, fallback) => {
        const result = trans(key);
        // Jika hasil sama dengan key, berarti translasi tidak ditemukan, pakai fallback
        return result !== key ? result : fallback;
    };

    // --- 2. CONFIG: TOAST NOTIFIKASI (SOLID INDIGO) ---
    const fireToast = (icon, message) => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            background: '#4f46e5', 
            iconColor: '#ffffff',
            icon: icon,
            title: `<span style="color: white; font-weight: 900; font-size: 14px; line-height: 1.2;">${message}</span>`,
            customClass: {
                container: '!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end',
                popup: '!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !m-0 !w-auto !min-w-[280px]',
                timerProgressBar: '!bg-white/40 !h-1 !rounded-b-full'
            }
        });
    };

    // --- 3. CONFIG: ALERT KONFIRMASI (STYLE DOPAMIND) ---
    const swalTheme = {
        customClass: {
            popup: 'rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl',
            title: 'text-2xl font-black text-slate-800 mb-2 font-sans',
            confirmButton: 'bg-indigo-600 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl active:scale-95 transition-all outline-none mx-2 tracking-wide',
            cancelButton: 'bg-slate-50 text-slate-400 font-bold py-3.5 px-8 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all outline-none mx-2 tracking-wide',
            actions: 'mt-6 gap-3',
        },
        buttonsStyling: false, 
        focusConfirm: false
    };

    const confirmDelete = (titleKey, defTitle) => {
        return Swal.fire({
            ...swalTheme,
            title: t(titleKey, defTitle),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t('btn_yes_delete', 'Yes, Delete!'),
            cancelButtonText: t('btn_cancel', 'Cancel'),
            customClass: {
                ...swalTheme.customClass,
                confirmButton: 'bg-rose-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl shadow-rose-200'
            }
        });
    };

    // ==========================================
    // 4. LOGIC DATA (CRUD)
    // ==========================================
    
    // --- TRANSAKSI ---
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
        transactionForm.title = trx.title ?? '';
        transactionForm.amount = trx.amount;
        transactionForm.type = trx.type;
        transactionForm.category = trx.category;
        transactionForm.date = trx.date;
        transactionForm.notes = trx.notes ?? '';
    };

    const submitTransaction = (onSuccessCallback) => {
        // 🔥 VALIDASI: WAJIB TITLE
        if (!transactionForm.title || transactionForm.title.trim() === '') {
            return fireToast('warning', t('warn_empty_title', 'Title is required!'));
        }

        if (!transactionForm.amount || cleanAmount(transactionForm.amount) <= 0) {
            return fireToast('warning', t('warn_empty_amount', 'Amount required!'));
        }

        if (!transactionForm.category) {
            return fireToast('warning', t('warn_empty_category', 'Please select a category!'));
        }

        if(onSuccessCallback) onSuccessCallback();

        const url = transactionForm.id ? route('finance.transaction.update', transactionForm.id) : route('finance.transaction.store');
        const method = transactionForm.id ? 'patch' : 'post';

        transactionForm.transform((data) => ({
            ...data,
            amount: cleanAmount(data.amount),
        }))[method](url, {
            preserveScroll: true,
            onSuccess: () => {
                transactionForm.reset();
                transactionForm.date = dayjs().format('YYYY-MM-DD');
                fireToast('success', t('success_saved', 'Saved successfully!'));
            },
            onError: (err) => fireToast('error', Object.values(err)[0])
        });
    };

    const deleteTransaction = (id, onSuccessCallback) => {
        confirmDelete('delete_trx_title', 'Delete Transaction?').then((res) => {
            if (res.isConfirmed) {
                if (onSuccessCallback) onSuccessCallback(); 
                router.delete(route('finance.transaction.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => fireToast('success', t('success_deleted', 'Deleted!'))
                });
            }
        });
    };

    // --- BUDGET ---
    const budgetForm = useForm({ id: null, category: '', name: '', icon: '💸', limit_amount: '', month: '' });

    const submitBudget = (monthKey, onSuccessCallback) => {
        budgetForm.month = monthKey;
        if (!budgetForm.name) return fireToast('warning', t('warn_empty_budget_name', 'Enter budget name!'));
        
        const cleanVal = cleanAmount(budgetForm.limit_amount);
        if (!cleanVal || cleanVal <= 0) return fireToast('warning', t('warn_empty_amount', 'Valid amount required!'));

        if (!budgetForm.category && budgetForm.name) {
            budgetForm.category = budgetForm.name.toLowerCase().replace(/\s+/g, '_');
        }

        if(onSuccessCallback) onSuccessCallback();

        const url = budgetForm.id ? route('finance.budget.update', budgetForm.id) : route('finance.budget.store');
        const method = budgetForm.id ? 'put' : 'post';

        budgetForm.transform((data) => ({
            ...data,
            limit_amount: cleanAmount(data.limit_amount),
        }))[method](url, {
            preserveScroll: true,
            onSuccess: () => {
                budgetForm.reset();
                fireToast('success', t('success_saved', 'Budget updated!'));
            },
            onError: (err) => fireToast('error', Object.values(err)[0])
        });
    };

    const deleteBudget = (id) => {
        confirmDelete('delete_budget_title', 'Delete Budget?').then((res) => {
            if (res.isConfirmed) {
                router.delete(route('finance.budget.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => fireToast('success', t('success_deleted', 'Budget removed!'))
                });
            }
        });
    };

    // --- KATEGORI ---
    const categoryForm = useForm({ name: '', icon: '💰', type: 'income' });

    const setEditCategory = (cat) => {
        categoryForm.name = cat.name;
        categoryForm.icon = cat.icon;
    };

    const submitCategory = (categoryToEdit, onSuccessCallback) => {
        if (!categoryForm.name) return fireToast('warning', t('warn_empty_category_name', 'Name required!'));
        if (onSuccessCallback) onSuccessCallback();

        const url = categoryToEdit ? route('finance.categories.update', categoryToEdit.id) : route('finance.categories.store');
        const method = categoryToEdit ? 'put' : 'post';

        categoryForm[method](url, {
            preserveScroll: true,
            onSuccess: () => { 
                categoryForm.reset(); 
                fireToast('success', t('success_saved', 'Category saved!'));
            },
            onError: (err) => fireToast('error', Object.values(err)[0])
        });
    };

    const deleteCategory = (id, onSuccessCallback) => {
        confirmDelete('confirm_delete_title', 'Are you sure?').then((res) => {
            if (res.isConfirmed) {
                if (onSuccessCallback) onSuccessCallback();
                router.delete(route('finance.categories.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => fireToast('success', t('success_deleted', 'Deleted!'))
                });
            }
        });
    };

    const updateIncomeTarget = (month, amount) => {
        router.post(route('finance.income-target.update'), { month, amount }, { preserveScroll: true });
    };

    return {
        transactionForm, setEditTransaction, submitTransaction, deleteTransaction,
        budgetForm, submitBudget, deleteBudget, 
        categoryForm, setEditCategory, submitCategory, deleteCategory,
        updateIncomeTarget, t
    };
}