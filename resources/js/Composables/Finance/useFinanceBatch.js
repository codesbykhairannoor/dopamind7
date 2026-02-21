import { ref, watch } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import Swal from 'sweetalert2';
import { useFinanceFormat } from './useFinanceFormat';
import { trans } from 'laravel-vue-i18n';

export function useFinanceBatch(currentDateRef) {
    const isBatchModalOpen = ref(false);
    const globalConflictError = ref(null);
    const { cleanAmount } = useFinanceFormat();

    const t = (key, fallback) => {
        const result = trans(key);
        return result !== key ? result : fallback;
    };

    // 🔥 ALERT DESIGN SAMA DENGAN SINGLE MODAL
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

    const batchForm = useForm({
        date: currentDateRef.value, 
        transactions: [
            { type: 'expense', category: '', title: '', amount: '' }
        ]
    });

    watch(() => currentDateRef.value, (newDate) => {
        if (!isBatchModalOpen.value) {
            batchForm.date = newDate;
        }
    });

    const openBatchModal = () => {
        batchForm.reset();
        batchForm.date = currentDateRef.value;
        batchForm.transactions = [{ type: 'expense', category: '', title: '', amount: '' }];
        batchForm.clearErrors();
        globalConflictError.value = null;
        isBatchModalOpen.value = true;
    };

    const closeBatchModal = () => {
        isBatchModalOpen.value = false;
        batchForm.reset();
        batchForm.clearErrors();
    };

    const addBatchRow = () => {
        batchForm.transactions.push({ type: 'expense', category: '', title: '', amount: '' });
    };

    const removeBatchRow = (index) => {
        if (batchForm.transactions.length > 1) {
            batchForm.transactions.splice(index, 1);
        }
    };

    const validateBatch = () => {
        batchForm.clearErrors();
        globalConflictError.value = null;
        let isValid = true;

        if (!batchForm.date) {
            fireToast('warning', t('warn_empty_date', 'Pilih tanggal transaksi!'));
            return false;
        }

        batchForm.transactions.forEach((trx, index) => {
            if (!trx.title) {
                batchForm.setError(`transactions.${index}.title`, t('warn_empty_title', 'Required'));
                isValid = false;
            }
            if (!trx.category) {
                batchForm.setError(`transactions.${index}.category`, t('warn_empty_category', 'Required'));
                isValid = false;
            }
            if (!trx.amount || cleanAmount(trx.amount) <= 0) {
                batchForm.setError(`transactions.${index}.amount`, t('warn_empty_amount', 'Required'));
                isValid = false;
            }
        });

        if (!isValid) {
            fireToast('warning', t('warn_empty_fields', 'Lengkapi semua baris transaksi!'));
        }
        return isValid;
    };

    const submitBatch = () => {
        if (!validateBatch()) return;

        const payload = {
            date: batchForm.date, 
            transactions: batchForm.transactions.map(t => ({
                ...t,
                amount: cleanAmount(t.amount)
            }))
        };

        fireToast('success', t('success_saved', 'Menyimpan Batch...'));

        router.post(route('finance.transaction.batchStore'), payload, {
            preserveScroll: true,
            preserveState: true,
            progress: false,
            only: ['transactions', 'stats', 'budgets', 'categories', 'errors'],
            onSuccess: () => {
                closeBatchModal();
            },
            onError: () => {
                fireToast('error', t('err_save_failed', 'Gagal menyimpan data!'));
            }
        });
    };

    return {
        isBatchModalOpen, batchForm, globalConflictError,
        openBatchModal, closeBatchModal, addBatchRow, removeBatchRow, submitBatch
    };
}