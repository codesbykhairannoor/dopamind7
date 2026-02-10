import { useForm, router } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

export function useFinanceForm() {
    
    // --- HELPER ALERTS ---
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    const confirmDelete = (title, text) => {
        return Swal.fire({
            title: title || 'Yakin hapus?',
            text: text || "Data tidak bisa dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#cbd5e1',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-[2rem]',
                confirmButton: 'rounded-xl',
                cancelButton: 'rounded-xl'
            }
        });
    };

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
        // Validasi
        if (!transactionForm.title) {
            Swal.fire({ icon: 'warning', title: 'Judul Kosong', text: 'Kasih nama transaksinya dulu ya.' });
            return false;
        }
        if (!transactionForm.amount) {
            Swal.fire({ icon: 'warning', title: 'Nominal Kosong', text: 'Berapa duit nih?' });
            return false;
        }

        const method = transactionForm.id ? 'patch' : 'post';
        const url = transactionForm.id 
            ? route('finance.transaction.update', transactionForm.id) 
            : route('finance.transaction.store');

        transactionForm.transform((data) => ({
            ...data,
            amount: data.amount.toString().replace(/\./g, ''), 
        }))[method](url, {
            preserveScroll: true,
            onSuccess: () => {
                transactionForm.reset();
                transactionForm.date = dayjs().format('YYYY-MM-DD'); // Reset date to today
                toast.fire({ icon: 'success', title: 'Transaksi tersimpan' });
                if(onSuccessCallback) onSuccessCallback();
            },
            onError: (errors) => {
                const msg = Object.values(errors)[0];
                Swal.fire({ icon: 'error', title: 'Gagal', text: msg });
            }
        });
    };

    const deleteTransaction = (id, onSuccessCallback) => {
        confirmDelete('Hapus Transaksi?', 'Hilang selamanya nih.').then((result) => {
            if (result.isConfirmed) {
                router.delete(route('finance.transaction.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.fire({ icon: 'success', title: 'Terhapus' });
                        if (onSuccessCallback) onSuccessCallback();
                    }
                });
            }
        });
    };

    // --- BUDGET ---
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
            Swal.fire({ icon: 'warning', title: 'Nama Budget?', text: 'Isi dulu nama budgetnya.' });
            return false;
        }

        // Auto Slug jika category kosong (create mode)
        if (!budgetForm.category && budgetForm.name) {
            budgetForm.category = budgetForm.name.toLowerCase().replace(/\s+/g, '_');
        }

        const method = budgetForm.id ? 'put' : 'post';
        const url = budgetForm.id 
            ? route('finance.budget.update', budgetForm.id) 
            : route('finance.budget.store');

        budgetForm.transform((data) => ({
            ...data,
            limit_amount: data.limit_amount.toString().replace(/\./g, ''),
        }))[method](url, {
            preserveScroll: true,
            onSuccess: () => {
                budgetForm.reset();
                toast.fire({ icon: 'success', title: 'Budget disimpan' });
                if(onSuccessCallback) onSuccessCallback();
            },
            onError: (errors) => {
                const msg = Object.values(errors)[0];
                Swal.fire({ icon: 'error', title: 'Gagal', text: msg });
            }
        });
    };

    const deleteBudget = (id) => {
        confirmDelete('Hapus Budget?', 'Riwayat transaksi budget ini akan TETAP ADA, tapi target bulanannya dihapus.').then((result) => {
            if (result.isConfirmed) {
                router.delete(route('finance.budget.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => toast.fire({ icon: 'success', title: 'Budget dihapus' })
                });
            }
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